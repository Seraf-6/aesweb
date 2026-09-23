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
  var estado = { min: 5, musica: true, vol: 0.5 };

  try {
    var g = JSON.parse(localStorage.getItem(CLAVE) || '{}');
    if (g && typeof g === 'object') {
      if (g.min > 0) estado.min = g.min;
      if (typeof g.musica === 'boolean') estado.musica = g.musica;
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
  var ESCALA = [146.83, 164.81, 185.00, 220.00, 246.94,   // re mi fa# la si
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
    var realim = audio.createGain(); realim.gain.value = 0.34;
    var filtro = audio.createBiquadFilter();
    filtro.type = 'lowpass'; filtro.frequency.value = 1400;
    eco.connect(realim); realim.connect(eco);
    eco.connect(filtro); filtro.connect(maestro);
    return true;
  }

  function nota(frec, cuando, dur, gan) {
    var osc = audio.createOscillator();
    var vol = audio.createGain();
    osc.type = 'triangle';
    osc.frequency.value = frec;
    vol.gain.setValueAtTime(0.0001, cuando);
    vol.gain.exponentialRampToValueAtTime(gan, cuando + 0.09);
    vol.gain.exponentialRampToValueAtTime(0.0001, cuando + dur);
    osc.connect(vol);
    vol.connect(maestro);
    vol.connect(eco);
    osc.start(cuando);
    osc.stop(cuando + dur + 0.05);
  }

  /* Notas sueltas de una escala pentatónica: cualquier combinación suena
     bien, así que no hace falta una melodía. Es a propósito: una melodía
     se aprende, y lo aprendido distrae. */
  function siembra() {
    if (!audio) return;
    var ahora = audio.currentTime + 0.05;
    var cuantas = Math.random() < 0.25 ? 2 : 1;
    for (var i = 0; i < cuantas; i++) {
      var f = ESCALA[Math.floor(Math.random() * ESCALA.length)];
      nota(f, ahora + i * 0.42, 2.6 + Math.random(), 0.09);
    }
    if (Math.random() < 0.3) nota(73.42, ahora, 4.5, 0.05);   // un re grave de fondo
  }

  function musicaOn() {
    if (!estado.musica || !abreAudio()) return;
    if (audio.state === 'suspended') audio.resume();
    maestro.gain.cancelScheduledValues(audio.currentTime);
    maestro.gain.setValueAtTime(Math.max(0.0001, maestro.gain.value), audio.currentTime);
    maestro.gain.linearRampToValueAtTime(estado.vol * 0.3, audio.currentTime + 1.5);
    if (!sembrador) { siembra(); sembrador = setInterval(siembra, 2300); }
  }

  function musicaOff(rapido) {
    clearInterval(sembrador); sembrador = null;
    if (!audio) return;
    maestro.gain.cancelScheduledValues(audio.currentTime);
    maestro.gain.setValueAtTime(maestro.gain.value, audio.currentTime);
    maestro.gain.linearRampToValueAtTime(0.0001, audio.currentTime + (rapido ? 0.25 : 1.2));
  }

  /* El aviso del final suena aunque la música esté apagada: es el único
     sonido imprescindible. */
  function campana() {
    if (!abreAudio()) return;
    if (audio.state === 'suspended') audio.resume();
    maestro.gain.cancelScheduledValues(audio.currentTime);
    maestro.gain.setValueAtTime(0.0001, audio.currentTime);
    maestro.gain.linearRampToValueAtTime(Math.max(0.25, estado.vol * 0.45), audio.currentTime + 0.05);
    var t = audio.currentTime + 0.08;
    [587.33, 880.00, 1174.66].forEach(function (f, i) {
      nota(f, t + i * 0.16, 2.2 - i * 0.2, 0.22);
    });
    setTimeout(function () { musicaOff(); }, 2600);
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
    '<div class="tmr-fila">' +
      '<button class="tmr-op" type="button" data-tmr-musica="1">Con música</button>' +
      '<button class="tmr-op" type="button" data-tmr-musica="0">En silencio</button>' +
    '</div>' +
    '<input class="tmr-vol" id="tmr-vol" type="range" min="0" max="100" step="5" ' +
      'aria-label="Volumen" value="' + Math.round(estado.vol * 100) + '">' +
    '<p class="tmr-nota">Al terminar suena un aviso, aunque esté en silencio.</p>';

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
    panel.querySelectorAll('[data-tmr-musica]').forEach(function (b) {
      b.setAttribute('aria-pressed', String((b.dataset.tmrMusica === '1') === estado.musica));
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
  });

  panel.addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (!b) return;
    if (b.dataset.tmrMin) { arranca(Number(b.dataset.tmrMin)); return; }
    if (b.dataset.tmrMusica) {
      estado.musica = b.dataset.tmrMusica === '1'; guardar();
      if (!estado.musica) musicaOff(true); else if (corriendo) musicaOn();
      pinta(); return;
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
