/* ═══════════════════════════════════════════════════════════════
   AESWeb · el timer del aula

   Un botón en toda página: se elige cuántos minutos y la cuenta
   regresiva toma la pantalla entera, con números grandes para que se
   lean desde el fondo. Usa los mismos colores que el panel de
   proyección, así que acompaña la paleta que esté puesta.

   La música se genera acá, con Web Audio: no hay ningún archivo de
   sonido en el repositorio. No es una decisión técnica sino de
   derechos — subir una canción sería publicarla — y de paso el timer
   funciona sin conexión.

   Nombres de atributo: todos empiezan con data-tmr. `proyeccion.js`
   escucha los clics de todos los botones y reacciona a data-paso,
   data-solo, data-zoom y otros; pisarle uno rompería el panel.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (document.getElementById('tmr-btn')) return;

  var CLAVE = 'aesweb-timer';
  var PRESETS = [1, 3, 5, 10, 15, 20];
  var estado = { min: 5, melodia: 'caja', vol: 0.5 };

  try {
    var g = JSON.parse(localStorage.getItem(CLAVE) || '{}');
    if (g && typeof g === 'object') {
      if (g.min > 0) estado.min = g.min;
      if (typeof g.melodia === 'string') estado.melodia = g.melodia;
      if (typeof g.musica === 'boolean' && !g.musica) estado.melodia = 'silencio';
      if (typeof g.vol === 'number') estado.vol = g.vol;
    }
  } catch (e) { /* sin localStorage el timer anda igual */ }

  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) {}
  }

  // ── la marcha del reloj ──
  // El tiempo restante se calcula contra el reloj real y no sumando
  // ticks: si la computadora se traba un segundo, el timer no miente.
  var fin = 0, restante = 0, corriendo = false, latido = null;

  // ══════════════════ el sonido ══════════════════
  var audio = null, maestro = null, eco = null, sembrador = null;
  var sonando = [];          // lo ya programado, para poder cortarlo al pausar

  /* Una nota es un nombre y una duración en tiempos. Las melodías son
     cortas y se repiten: la idea no es entretener sino marcar que el
     tiempo corre. Las tres llevan acompañamiento de bajo. */
  var SEMI = { C:0, 'C#':1, D:2, 'D#':3, E:4, F:5, 'F#':6, G:7, 'G#':8, A:9, 'A#':10, B:11 };
  function frec(nombre) {
    if (!nombre) return 0;
    var m = /^([A-G]#?)(-?\d)$/.exec(nombre);
    if (!m) return 0;
    return 440 * Math.pow(2, (12 * (Number(m[2]) + 1) + SEMI[m[1]] - 69) / 12);
  }

  var MELODIAS = {
    caja: {
      nombre: 'Caja de música', bpm: 74, timbre: 'campana',
      melodia: [['E5',1],['G5',1],['A5',1], ['G5',1.5],['E5',.5],['D5',1],
                ['C5',1],['D5',1],['E5',1], ['G5',2],[null,1],
                ['A5',1],['C6',1],['A5',1], ['G5',1.5],['E5',.5],['D5',1],
                ['E5',1],['C5',1],['D5',1], ['C5',2],[null,1]],
      bajo:    [['C3',3],['G2',3],['C3',3],['G2',3],
                ['A2',3],['G2',3],['F2',3],['C3',3]]
    },
    canon: {
      nombre: 'Canon', bpm: 64, timbre: 'cuerda',
      melodia: [['F#5',2],['E5',2],['D5',2],['C#5',2],
                ['B4',2],['A4',2],['B4',2],['C#5',2]],
      bajo:    [['D3',2],['A2',2],['B2',2],['F#2',2],
                ['G2',2],['D2',2],['G2',2],['A2',2]]
    },
    paseo: {
      nombre: 'Paseo', bpm: 92, timbre: 'redonda',
      melodia: [['A4',1],['C5',1],['D5',1],['E5',1],
                ['G5',1.5],['E5',.5],['D5',1],['C5',1],
                ['A4',1],['C5',1],['E5',1],['D5',1],
                ['C5',2],['A4',2]],
      bajo:    [['A2',4],['F2',4],['C3',4],['E2',4]]
    },
    ambiente: { nombre: 'Sin melodía', ambiente: true }
  };

  // la de antes: notas sueltas de una pentatónica, sin melodía
  var ESCALA = [146.83, 164.81, 185.00, 220.00, 246.94,
                293.66, 329.63, 369.99, 440.00, 493.88];

  function abreAudio() {
    if (audio) return true;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    try { audio = new AC(); } catch (e) { return false; }
    maestro = audio.createGain();
    maestro.gain.value = 0;
    maestro.connect(audio.destination);

    // un eco largo y apagado: da sensación de sala, no de instrumento
    eco = audio.createDelay(2);
    eco.delayTime.value = 0.47;
    var realim = audio.createGain(); realim.gain.value = 0.3;
    var filtro = audio.createBiquadFilter();
    filtro.type = 'lowpass'; filtro.frequency.value = 1500;
    eco.connect(realim); realim.connect(eco);
    eco.connect(filtro); filtro.connect(maestro);
    return true;
  }

  /* Cada timbre es una suma de osciladores con su propia envolvente.
     La campana lleva armónicos y se apaga rápido; la cuerda entra
     despacio y se sostiene. */
  function nota(f, cuando, dur, gan, timbre) {
    if (!f) return;
    var voces = timbre === 'campana'
        ? [{ onda: 'sine', mult: 1, g: 1 }, { onda: 'sine', mult: 2, g: 0.34 },
           { onda: 'sine', mult: 3.01, g: 0.12 }]
      : timbre === 'cuerda'
        ? [{ onda: 'triangle', mult: 1, g: 1 }, { onda: 'triangle', mult: 1.005, g: 0.7 }]
        : [{ onda: 'triangle', mult: 1, g: 1 }];
    var ataque = timbre === 'cuerda' ? 0.14 : 0.012;
    voces.forEach(function (v) {
      var osc = audio.createOscillator();
      var vol = audio.createGain();
      osc.type = v.onda;
      osc.frequency.value = f * v.mult;
      vol.gain.setValueAtTime(0.0001, cuando);
      vol.gain.exponentialRampToValueAtTime(gan * v.g, cuando + ataque);
      vol.gain.exponentialRampToValueAtTime(0.0001, cuando + dur);
      osc.connect(vol); vol.connect(maestro); vol.connect(eco);
      osc.start(cuando);
      osc.stop(cuando + dur + 0.05);
      sonando.push(osc);
      osc.onended = function () {
        var i = sonando.indexOf(osc); if (i >= 0) sonando.splice(i, 1);
      };
    });
  }

  /* Se programa una vuelta entera de la melodía y se pide la siguiente
     para cuando termine. Con estos tempos alcanza y sobra, y así los
     tiempos los lleva el reloj del audio, que no se desfasa. */
  function vuelta(clave) {
    var m = MELODIAS[clave];
    if (!audio || !m || m.ambiente) return 0;
    var t = 60 / m.bpm, t0 = audio.currentTime + 0.08, cursor = 0, i;
    for (i = 0; i < m.melodia.length; i++) {
      var dur = m.melodia[i][1] * t;
      nota(frec(m.melodia[i][0]), t0 + cursor, Math.min(dur * 2.6, 2.8), 0.1, m.timbre);
      cursor += dur;
    }
    var cb = 0;
    for (i = 0; i < m.bajo.length; i++) {
      var db = m.bajo[i][1] * t;
      nota(frec(m.bajo[i][0]), t0 + cb, db * 1.5, 0.055, m.timbre);
      cb += db;
    }
    return Math.max(cursor, cb) * 1000;
  }

  function siembraAmbiente() {
    if (!audio) return;
    var ahora = audio.currentTime + 0.05;
    var cuantas = Math.random() < 0.25 ? 2 : 1;
    for (var i = 0; i < cuantas; i++) {
      var f = ESCALA[Math.floor(Math.random() * ESCALA.length)];
      nota(f, ahora + i * 0.42, 2.6 + Math.random(), 0.09, 'redonda');
    }
    if (Math.random() < 0.3) nota(73.42, ahora, 4.5, 0.05, 'redonda');
  }

  function suena(clave) {
    if (clave === 'silencio' || !abreAudio()) return;
    if (audio.state === 'suspended') audio.resume();
    maestro.gain.cancelScheduledValues(audio.currentTime);
    maestro.gain.setValueAtTime(Math.max(0.0001, maestro.gain.value), audio.currentTime);
    maestro.gain.linearRampToValueAtTime(estado.vol * 0.3, audio.currentTime + 1.2);
    clearTimeout(sembrador); clearInterval(sembrador);
    if (MELODIAS[clave] && MELODIAS[clave].ambiente) {
      siembraAmbiente();
      sembrador = setInterval(siembraAmbiente, 2300);
    } else {
      var otra = function () {
        var dura = vuelta(clave);
        sembrador = setTimeout(otra, dura || 4000);
      };
      otra();
    }
  }

  function musicaOn() { suena(estado.melodia); }

  function musicaOff(rapido) {
    clearTimeout(sembrador); clearInterval(sembrador); sembrador = null;
    if (!audio) return;
    maestro.gain.cancelScheduledValues(audio.currentTime);
    maestro.gain.setValueAtTime(maestro.gain.value, audio.currentTime);
    maestro.gain.linearRampToValueAtTime(0.0001, audio.currentTime + (rapido ? 0.2 : 1.2));
    if (rapido) {
      // cortar lo ya programado, o seguiría sonando solo
      var t = audio.currentTime + 0.3;
      sonando.slice().forEach(function (o) { try { o.stop(t); } catch (e) {} });
    }
  }

  /* Probar una melodía sin arrancar el timer: nueve segundos y para. */
  var corteprueba = null;
  function prueba(clave) {
    suena(clave);
    clearTimeout(corteprueba);
    corteprueba = setTimeout(function () { if (!corriendo) musicaOff(); }, 9000);
  }

  /* El aviso del final suena aunque la música esté apagada: es el único
     sonido imprescindible. */
  function campana() {
    if (!abreAudio()) return;
    musicaOff(true);
    if (audio.state === 'suspended') audio.resume();
    setTimeout(function () {
      maestro.gain.cancelScheduledValues(audio.currentTime);
      maestro.gain.setValueAtTime(0.0001, audio.currentTime);
      maestro.gain.linearRampToValueAtTime(Math.max(0.25, estado.vol * 0.45), audio.currentTime + 0.05);
      var t = audio.currentTime + 0.08;
      [587.33, 880.00, 1174.66].forEach(function (f, i) {
        nota(f, t + i * 0.16, 2.2 - i * 0.2, 0.22, 'campana');
      });
      setTimeout(function () { musicaOff(); }, 2600);
    }, 260);
  }

  // ══════════════════ la pantalla ══════════════════
  var btn = document.createElement('button');
  btn.id = 'tmr-btn';
  btn.className = 'tmr-btn';
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.textContent = 'Timer';

  var panel = document.createElement('div');
  panel.className = 'tmr-panel';
  panel.hidden = true;
  panel.innerHTML =
    '<h5>Minutos</h5>' +
    '<div class="tmr-fila">' +
      PRESETS.map(function (m) {
        return '<button class="tmr-op" type="button" data-tmr-min="' + m + '">' + m + '</button>';
      }).join('') +
    '</div>' +
    '<div class="tmr-fila tmr-otro">' +
      '<label for="tmr-otro">otro</label>' +
      '<input id="tmr-otro" type="number" min="1" max="180" step="1" value="' + estado.min + '">' +
      '<button class="tmr-op tmr-empezar" type="button" data-tmr-accion="empezar">Empezar</button>' +
    '</div>' +
    '<h5>Música</h5>' +
    '<div class="tmr-fila tmr-musicas">' +
      Object.keys(MELODIAS).map(function (k) {
        return '<button class="tmr-op" type="button" data-tmr-melodia="' + k + '">' +
               MELODIAS[k].nombre + '</button>';
      }).join('') +
      '<button class="tmr-op" type="button" data-tmr-melodia="silencio">En silencio</button>' +
    '</div>' +
    '<input class="tmr-vol" id="tmr-vol" type="range" min="0" max="100" step="5" ' +
      'aria-label="Volumen" value="' + Math.round(estado.vol * 100) + '">' +
    '<p class="tmr-nota">Tocá una melodía para escucharla. Al terminar el timer suena un ' +
      'aviso, aunque esté en silencio.</p>';

  var telon = document.createElement('div');
  telon.className = 'tmr-telon';
  telon.hidden = true;
  telon.innerHTML =
    '<div class="tmr-reloj" id="tmr-reloj" role="timer" aria-live="off">00:00</div>' +
    '<div class="tmr-cartel" id="tmr-cartel" hidden>¡Se acabó el tiempo!</div>' +
    '<div class="tmr-mandos">' +
      '<button class="tmr-mando" type="button" data-tmr-accion="pausa">Pausar</button>' +
      '<button class="tmr-mando" type="button" data-tmr-accion="mas">+ 1 min</button>' +
      '<button class="tmr-mando" type="button" data-tmr-accion="reinicia">Reiniciar</button>' +
      '<button class="tmr-mando" type="button" data-tmr-accion="pantalla">Pantalla completa</button>' +
      '<button class="tmr-mando tmr-cerrar" type="button" data-tmr-accion="cerrar">Cerrar</button>' +
    '</div>' +
    '<div class="tmr-barra"><span id="tmr-barra-int"></span></div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);
  document.body.appendChild(telon);

  var reloj = document.getElementById('tmr-reloj');
  var cartel = document.getElementById('tmr-cartel');
  var barra = document.getElementById('tmr-barra-int');
  var otro = document.getElementById('tmr-otro');
  var vol = document.getElementById('tmr-vol');

  function dosCifras(n) { return (n < 10 ? '0' : '') + n; }

  function pinta() {
    var total = estado.min * 60000;
    var ms = corriendo ? Math.max(0, fin - Date.now()) : restante;
    var seg = Math.ceil(ms / 1000);
    reloj.textContent = dosCifras(Math.floor(seg / 60)) + ':' + dosCifras(seg % 60);
    telon.classList.toggle('ultimo', ms > 0 && ms <= 60000);
    barra.style.width = (total ? Math.max(0, ms / total) * 100 : 0) + '%';
    panel.querySelectorAll('[data-tmr-min]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(Number(b.dataset.tmrMin) === estado.min));
    });
    panel.querySelectorAll('[data-tmr-melodia]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.tmrMelodia === estado.melodia));
    });
    var p = telon.querySelector('[data-tmr-accion="pausa"]');
    p.textContent = corriendo ? 'Pausar' : 'Seguir';
  }

  function tic() {
    if (!corriendo) return;
    if (Date.now() >= fin) {
      corriendo = false; restante = 0;
      clearInterval(latido); latido = null;
      pinta();
      cartel.hidden = false;
      telon.classList.add('terminado');
      campana();
      return;
    }
    pinta();
  }

  function arranca(min) {
    estado.min = min; guardar();
    restante = min * 60000;
    fin = Date.now() + restante;
    corriendo = true;
    cartel.hidden = true;
    telon.classList.remove('terminado');
    telon.hidden = false;
    document.body.classList.add('tmr-abierto');
    panel.hidden = true; btn.setAttribute('aria-expanded', 'false');
    clearInterval(latido); latido = setInterval(tic, 200);
    pinta();
    musicaOn();
  }

  function pausa() {
    if (corriendo) {
      restante = Math.max(0, fin - Date.now());
      corriendo = false;
      clearInterval(latido); latido = null;
      musicaOff(true);
    } else if (restante > 0) {
      fin = Date.now() + restante;
      corriendo = true;
      clearInterval(latido); latido = setInterval(tic, 200);
      musicaOn();
    }
    pinta();
  }

  function cierra() {
    corriendo = false;
    clearInterval(latido); latido = null;
    musicaOff(true);
    telon.hidden = true;
    telon.classList.remove('terminado');
    cartel.hidden = true;
    document.body.classList.remove('tmr-abierto');
    if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
  }

  // ── interacción ──
  btn.addEventListener('click', function () {
    var abierto = panel.hidden;
    panel.hidden = !abierto;
    btn.setAttribute('aria-expanded', String(abierto));
    if (abierto) pinta();
    else if (!corriendo) musicaOff(true);
  });

  panel.addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (!b) return;
    if (b.dataset.tmrMin) { arranca(Number(b.dataset.tmrMin)); return; }
    if (b.dataset.tmrMelodia) {
      estado.melodia = b.dataset.tmrMelodia; guardar();
      pinta();
      if (estado.melodia === 'silencio') musicaOff(true);
      else if (corriendo) musicaOn();
      else prueba(estado.melodia);      // elegir es, también, escucharla
      return;
    }
    if (b.dataset.tmrAccion === 'empezar') {
      var m = Math.min(180, Math.max(1, Math.round(Number(otro.value) || estado.min)));
      arranca(m);
    }
  });

  otro.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      arranca(Math.min(180, Math.max(1, Math.round(Number(otro.value) || estado.min))));
    }
  });

  vol.addEventListener('input', function () {
    estado.vol = Number(vol.value) / 100; guardar();
    if (audio && sembrador) {
      maestro.gain.cancelScheduledValues(audio.currentTime);
      maestro.gain.linearRampToValueAtTime(estado.vol * 0.3, audio.currentTime + 0.2);
    }
  });

  telon.addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (!b) return;
    var a = b.dataset.tmrAccion;
    if (a === 'pausa') pausa();
    if (a === 'mas') {
      restante = (corriendo ? Math.max(0, fin - Date.now()) : restante) + 60000;
      estado.min += 1;                       // para que la barra siga siendo honesta
      if (corriendo) fin = Date.now() + restante;
      else if (cartel.hidden === false) { cartel.hidden = true; telon.classList.remove('terminado'); pausa(); }
      pinta();
    }
    if (a === 'reinicia') arranca(estado.min);
    if (a === 'cerrar') cierra();
    if (a === 'pantalla') {
      if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
      else if (telon.requestFullscreen) telon.requestFullscreen().catch(function () {});
    }
  });

  document.addEventListener('keydown', function (ev) {
    if (telon.hidden) return;
    if (ev.key === 'Escape') { cierra(); return; }
    var t = ev.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA') return;
    if (ev.key === ' ') { ev.preventDefault(); pausa(); }
  });

  pinta();
})();
