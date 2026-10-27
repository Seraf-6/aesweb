/* ═══════════════════════════════════════════════════════════════
   AESWeb · los paneles de una página de clase

   Botones flotantes, en fila con el del timer:

   · Observador  lo que preguntaría un alumno observador, de a una
                 pregunta, con la respuesta tapada hasta que se pide
   · ☰ (menú)    a dónde volver (el grado, Matemática, el inicio: la misma
                 ruta de la barra de arriba, que en el modo "una a la vez"
                 no se ve) y las notas del docente

   Los dos saben en qué tema está la clase —la diapositiva activa en el
   modo "una a la vez", o lo que está en pantalla si se hace scroll— y
   abren ese tema. Con las flechas se va a los temas vecinos; mientras
   no se usen, el panel acompaña a la clase cuando cambia de tema.

   La página declara, antes de cargar este guion:

     window.CLASE = { secciones: [
       { id:'3', titulo:'Tema 3 · Ecuaciones lineales',
         notas:'<p>…</p>', preguntas:[{ p:'…', r:'…' }, …] }, … ] }

   y marca con data-tema="<id>" el bloque de cada sección.

   Los atributos propios empiezan con data-cls: proyeccion.js escucha
   los clics de todos los botones y reacciona a data-paso, data-solo,
   data-zoom y otros, y pisarle uno rompería el panel de proyección.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  var C = window.CLASE;
  if (!C || !C.secciones || !C.secciones.length) return;
  var S = C.secciones;

  function indice(id) {
    for (var i = 0; i < S.length; i++) if (S[i].id === String(id)) return i;
    return 0;
  }

  // ── en qué tema está la clase ──
  function temaActual() {
    var activa = document.querySelector('.diapo.activa');
    if (document.body.getAttribute('data-solo') === '1' && activa) {
      var t = activa.closest('[data-tema]');
      if (t) return t.getAttribute('data-tema');
    }
    // con scroll: la última sección que ya pasó el 40 % de la pantalla. Para
    // que la última sección también pueda llegar hasta ahí, clase.css deja
    // espacio después de los créditos.
    var corte = window.innerHeight * 0.4;
    var actual = null;
    document.querySelectorAll('[data-tema]').forEach(function (e) {
      if (e.getBoundingClientRect().top < corte) actual = e.getAttribute('data-tema');
    });
    return actual || S[0].id;
  }

  // ── los botones, en fila con el del timer: Observador, Timer y el menú ──
  var dock = document.createElement('div');
  dock.className = 'dock';
  function boton(texto, clave) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'dock-btn';
    b.setAttribute('data-cls-abre', clave);
    b.setAttribute('aria-expanded', 'false');
    b.textContent = texto;
    return b;
  }
  var bObs = boton('Observador', 'obs');
  var bMenu = boton('☰', 'menu');
  bMenu.classList.add('dock-menu');
  bMenu.setAttribute('aria-label', 'Menú: ir a otra página y notas del docente');
  dock.appendChild(bObs);
  var tmr = document.getElementById('tmr-btn');
  if (tmr) dock.appendChild(tmr);
  dock.appendChild(bMenu);
  document.body.appendChild(dock);
  var bNot = bMenu;                       // las notas se abren desde el menú

  // ── el menú: a dónde volver (la misma ruta de la barra de arriba, que en
  //    el modo "una a la vez" no se ve) y las notas del docente ──
  var pMenu = document.createElement('div');
  pMenu.className = 'cls-panel cls-menu';
  pMenu.hidden = true;
  pMenu.setAttribute('role', 'dialog');
  pMenu.setAttribute('aria-label', 'Menú');
  var ruta = Array.prototype.slice.call(document.querySelectorAll('.sitio-ruta a'));
  var aqui = document.querySelector('.sitio-ruta span:last-child');
  pMenu.innerHTML = '<div class="cls-cab"><div class="cls-tit"><span class="cls-rot">Menú</span>' +
      '<b>' + (aqui ? aqui.textContent : document.title) + '</b></div>' +
      '<button class="cls-cerrar" type="button" data-cls="cerrar" aria-label="Cerrar">×</button></div>' +
    '<div class="cls-cuerpo">' +
      '<p class="menu-rot">Ir a</p><nav class="menu-ruta">' +
      ruta.map(function (a, k) {
        return '<a href="' + a.getAttribute('href') + '">' + a.textContent + '</a>';
      }).reverse().join('') + '</nav>' +
      '<p class="menu-rot">Para el docente</p>' +
      '<button class="menu-op" type="button" data-cls="notas">Notas del tema que se está viendo</button>' +
    '</div>';
  document.body.appendChild(pMenu);

  // la barra de temas no queda debajo de los botones de arriba
  var barra = document.querySelector('.nav');
  function haceLugar() {
    if (!barra) return;
    barra.style.removeProperty('--dock-tapa');
    var tapa = barra.getBoundingClientRect().right - dock.getBoundingClientRect().left + 12;
    if (tapa > 0) barra.style.setProperty('--dock-tapa', tapa + 'px');
  }
  window.addEventListener('resize', haceLugar);
  window.addEventListener('load', haceLugar);
  haceLugar();

  // ── los paneles ──
  function cabecera(rotulo, idTit) {
    return '<div class="cls-cab">' +
      '<button class="cls-flecha" type="button" data-cls="ant" aria-label="Tema anterior">←</button>' +
      '<div class="cls-tit"><span class="cls-rot">' + rotulo + '</span><b id="' + idTit + '"></b></div>' +
      '<button class="cls-flecha" type="button" data-cls="sig" aria-label="Tema siguiente">→</button>' +
      '<button class="cls-cerrar" type="button" data-cls="cerrar" aria-label="Cerrar">×</button>' +
    '</div>';
  }

  var pNot = document.createElement('div');
  pNot.className = 'cls-panel cls-notas';
  pNot.hidden = true;
  pNot.setAttribute('role', 'dialog');
  pNot.setAttribute('aria-label', 'Notas del docente');
  pNot.innerHTML = cabecera('Notas del docente', 'cls-notas-tit') +
    '<div class="cls-cuerpo" id="cls-notas-cuerpo"></div>';

  var pObs = document.createElement('div');
  pObs.className = 'cls-panel cls-obs';
  pObs.hidden = true;
  pObs.setAttribute('role', 'dialog');
  pObs.setAttribute('aria-label', 'Preguntas de un alumno observador');
  pObs.innerHTML = cabecera('Un alumno observador preguntaría…', 'cls-obs-tit') +
    '<div class="cls-cuerpo">' +
      '<p class="obs-pregunta" id="cls-obs-p"></p>' +
      '<button class="obs-ver" type="button" data-cls="ver">Ver la respuesta</button>' +
      '<div class="obs-respuesta" id="cls-obs-r" hidden></div>' +
    '</div>' +
    '<div class="cls-pie">' +
      '<button class="cls-paso" type="button" data-cls="p-ant">← anterior</button>' +
      '<span id="cls-obs-cuenta"></span>' +
      '<button class="cls-paso" type="button" data-cls="p-sig">siguiente →</button>' +
    '</div>';

  document.body.appendChild(pNot);
  document.body.appendChild(pObs);

  var estado = { notas: 0, obs: 0, preg: 0, siguiendo: true };

  function pintaNotas() {
    var s = S[estado.notas];
    document.getElementById('cls-notas-tit').textContent = s.titulo;
    document.getElementById('cls-notas-cuerpo').innerHTML = s.notas || '<p>Sin notas para esta parte.</p>';
    pNot.querySelector('[data-cls="ant"]').disabled = estado.notas === 0;
    pNot.querySelector('[data-cls="sig"]').disabled = estado.notas === S.length - 1;
  }

  function pintaObs() {
    var s = S[estado.obs];
    var qs = s.preguntas || [];
    document.getElementById('cls-obs-tit').textContent = s.titulo;
    var p = document.getElementById('cls-obs-p');
    var r = document.getElementById('cls-obs-r');
    var ver = pObs.querySelector('[data-cls="ver"]');
    if (!qs.length) {
      p.textContent = 'Para esta parte no hay preguntas preparadas.';
      r.hidden = true; ver.hidden = true;
    } else {
      estado.preg = Math.max(0, Math.min(qs.length - 1, estado.preg));
      p.innerHTML = qs[estado.preg].p;
      r.innerHTML = '<p>' + qs[estado.preg].r + '</p>';
      r.hidden = true; ver.hidden = false;
    }
    document.getElementById('cls-obs-cuenta').textContent =
      qs.length ? (estado.preg + 1) + ' de ' + qs.length : '';
    pObs.querySelector('[data-cls="p-ant"]').disabled = estado.preg <= 0;
    pObs.querySelector('[data-cls="p-sig"]').disabled = estado.preg >= qs.length - 1;
    pObs.querySelector('[data-cls="ant"]').disabled = estado.obs === 0;
    pObs.querySelector('[data-cls="sig"]').disabled = estado.obs === S.length - 1;
  }

  // un panel abierto por vez: el menú, las notas (se llega desde el menú) o el observador
  function cierraTodo() {
    pNot.hidden = true; pObs.hidden = true; pMenu.hidden = true;
    bMenu.setAttribute('aria-expanded', 'false');
    bObs.setAttribute('aria-expanded', 'false');
  }
  function abre(clave) {
    var panel = { notas: pNot, obs: pObs, menu: pMenu }[clave];
    var yaAbierto = !panel.hidden;
    // el menú, abierto sobre las notas, las cierra
    if (clave === 'menu' && !pNot.hidden) yaAbierto = true;
    cierraTodo();
    if (yaAbierto) return;
    estado.siguiendo = true;
    var i = indice(temaActual());
    if (clave === 'notas') { estado.notas = i; pintaNotas(); }
    if (clave === 'obs') { if (estado.obs !== i) estado.preg = 0; estado.obs = i; pintaObs(); }
    panel.hidden = false;
    (clave === 'obs' ? bObs : bMenu).setAttribute('aria-expanded', 'true');
  }

  dock.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-cls-abre]');
    if (b) abre(b.getAttribute('data-cls-abre'));
  });
  pMenu.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-cls]');
    if (!b) return;
    if (b.getAttribute('data-cls') === 'cerrar') cierraTodo();
    if (b.getAttribute('data-cls') === 'notas') abre('notas');
  });

  function mueve(panel, paso) {
    estado.siguiendo = false;            // se eligió otro tema a mano
    if (panel === pNot) {
      estado.notas = Math.max(0, Math.min(S.length - 1, estado.notas + paso));
      pintaNotas();
    } else {
      estado.obs = Math.max(0, Math.min(S.length - 1, estado.obs + paso));
      estado.preg = 0;
      pintaObs();
    }
  }

  [pNot, pObs].forEach(function (panel) {
    panel.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-cls]');
      if (!b) return;
      var a = b.getAttribute('data-cls');
      if (a === 'cerrar') cierraTodo();
      if (a === 'ant') mueve(panel, -1);
      if (a === 'sig') mueve(panel, 1);
      if (a === 'ver') { document.getElementById('cls-obs-r').hidden = false; b.hidden = true; }
      if (a === 'p-ant') { estado.preg--; pintaObs(); }
      if (a === 'p-sig') { estado.preg++; pintaObs(); }
    });
  });

  // ── acompañar a la clase cuando cambia de tema ──
  var ultimo = temaActual();
  function refresco() {
    var t = temaActual();
    if (t === ultimo) return;
    ultimo = t;
    if (!estado.siguiendo) return;
    var i = indice(t);
    if (!pNot.hidden) { estado.notas = i; pintaNotas(); }
    if (!pObs.hidden && estado.obs !== i) { estado.obs = i; estado.preg = 0; pintaObs(); }
  }
  var pedido = false;
  function pide() {
    if (pedido) return;
    pedido = true;
    window.requestAnimationFrame(function () { pedido = false; refresco(); });
  }
  window.addEventListener('scroll', pide, { passive: true });
  document.addEventListener('click', function () { setTimeout(pide, 0); });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') { cierraTodo(); return; }
    setTimeout(pide, 0);
  });
})();
