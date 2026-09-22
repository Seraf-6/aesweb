/* ═══════════════════════════════════════════════════════════════
   AESWeb · panel de proyección
   Se incluye en cualquier página de clase con:
       <script src="../assets/proyeccion.js" defer></script>
   y, si la página tiene diapositivas, declarándolas en el body:
       <body data-diapos=".intro, .caso, .cierre">
   Si no hay data-diapos, el modo "una a la vez" no se ofrece.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var PALETAS = [['normal','Normal'], ['alto','Blanco'], ['crema','Crema'],
                 ['celeste','Celeste'], ['oscuro','Oscuro'], ['pizarra','Pizarra']];
  var MUESTRAS = {normal:'#FAFBFC', alto:'#FFFFFF', crema:'#FFF6DC',
                  celeste:'#E9F4FB', oscuro:'#04070B', pizarra:'#103629'};

  // Dos juegos de tinta: una oscura sobre fondo oscuro no se ve, y una
  // clara sobre fondo claro tampoco. El panel muestra el que corresponde.
  var TINTAS_CLARO = [['auto','Automático'], ['negro','Negro'], ['azul','Azul'],
                      ['verde','Verde'], ['bordo','Bordó'], ['violeta','Violeta']];
  var TINTAS_OSCURO = [['auto','Automático'], ['blanco','Blanco'], ['amarillo','Amarillo'],
                       ['celeste','Celeste'], ['verdecl','Verde claro'], ['rosa','Rosa']];
  var MUESTRA_TINTA = {auto:'linear-gradient(135deg,#000 50%,#fff 50%)',
    negro:'#000000', azul:'#0A2A5C', verde:'#0E3B1D', bordo:'#570A13', violeta:'#2C0A4A',
    blanco:'#FFFFFF', amarillo:'#FFE187', celeste:'#9FD9FF', verdecl:'#A9F0B9', rosa:'#FFB6C9'};
  var OSCURAS = ['oscuro','pizarra'];

  var LIBRES = [['0','Ninguna'], ['25%','Der. 1/4'], ['33%','Der. 1/3'],
                ['50%','Der. 1/2'], ['izq33','Izq. 1/3']];
  var ZOOMS = [0.8, 0.9, 1, 1.15, 1.3, 1.5, 1.75, 2];

  var raiz = document.documentElement;
  var cuerpo = document.body;

  // Crema es el valor probado en el aula: es lo que gana en pizarra blanca.
  var estado = {paleta:'crema', tintaC:'auto', tintaO:'auto',
                grilla:'1', zoom:2, libre:'0', solo:0, i:0};

  var selector = cuerpo.dataset.diapos || '';
  var diapos = selector
    ? Array.prototype.slice.call(document.querySelectorAll(selector)) : [];
  diapos.forEach(function(d){ d.classList.add('diapo'); });

  function guardar(){
    try{ localStorage.setItem('aesweb-proy', JSON.stringify(estado)); }catch(e){}
  }
  function cargar(){
    try{
      var g = JSON.parse(localStorage.getItem('aesweb-proy') || 'null');
      if (g && typeof g === 'object'){ Object.assign(estado, g); estado.i = 0; }
    }catch(e){}
  }

  // ── la interfaz ──
  var marca = document.createElement('div');
  marca.className = 'marca-libre';
  marca.innerHTML = '<span>zona para la pizarra</span>';

  var nav = document.createElement('div');
  nav.className = 'proy-nav';
  nav.hidden = true;
  nav.innerHTML =
    '<button type="button" data-paso="-1" aria-label="Anterior">&#8592;</button>' +
    '<span id="proy-pos"></span>' +
    '<button type="button" data-paso="1" aria-label="Siguiente">&#8594;</button>';

  var btn = document.createElement('button');
  btn.className = 'proy-btn';
  btn.type = 'button';
  btn.id = 'proy-btn';
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'proy-panel');
  btn.textContent = 'Proyección';

  var panel = document.createElement('div');
  panel.className = 'proy-panel';
  panel.id = 'proy-panel';
  panel.hidden = true;
  panel.innerHTML =
    '<div class="proy-grupo"><h5>Contraste</h5>' +
      '<div class="proy-fila" id="proy-paletas"></div></div>' +
    '<div class="proy-grupo"><h5>Color de letra</h5>' +
      '<div class="proy-fila" id="proy-tintas"></div>' +
      '<p class="proy-nota" id="proy-aviso"></p></div>' +
    '<div class="proy-grupo"><h5>Tamaño</h5><div class="proy-fila">' +
      '<button class="proy-op" type="button" data-zoom="-1" aria-label="Achicar el texto">A &minus;</button>' +
      '<button class="proy-op" type="button" data-zoom="0">100%</button>' +
      '<button class="proy-op" type="button" data-zoom="1" aria-label="Agrandar el texto">A +</button>' +
    '</div></div>' +
    '<div class="proy-grupo"><h5>Cuadrícula</h5><div class="proy-fila">' +
      '<button class="proy-op" type="button" data-grilla-op="1">Normal</button>' +
      '<button class="proy-op" type="button" data-grilla-op="2">Grande</button>' +
      '<button class="proy-op" type="button" data-grilla-op="0">Sin</button>' +
    '</div></div>' +
    (diapos.length > 1
      ? '<div class="proy-grupo"><h5>Cuánto se muestra</h5><div class="proy-fila">' +
        '<button class="proy-op" type="button" data-solo="0">Todo seguido</button>' +
        '<button class="proy-op" type="button" data-solo="1">Una a la vez</button>' +
        '</div></div>'
      : '') +
    '<div class="proy-grupo"><h5>Zona libre para escribir</h5>' +
      '<div class="proy-fila" id="proy-libre"></div></div>' +
    '<p class="proy-nota">Lo que elijas queda guardado en esta computadora.</p>';

  cuerpo.appendChild(marca);
  cuerpo.appendChild(nav);
  cuerpo.appendChild(btn);
  cuerpo.appendChild(panel);

  document.getElementById('proy-paletas').innerHTML = PALETAS.map(function(p){
    return '<button class="proy-op" type="button" data-paleta="' + p[0] + '" aria-pressed="false">'
      + '<span class="proy-muestra" style="background:' + MUESTRAS[p[0]] + '"></span>'
      + p[1] + '</button>';
  }).join('');
  document.getElementById('proy-libre').innerHTML = LIBRES.map(function(l){
    return '<button class="proy-op" type="button" data-libre-op="' + l[0] + '" aria-pressed="false">'
      + l[1] + '</button>';
  }).join('');

  // ── aplicar el estado ──
  function aplicar(){
    if (estado.paleta === 'normal') raiz.removeAttribute('data-proy');
    else raiz.setAttribute('data-proy', estado.paleta);

    cuerpo.setAttribute('data-grilla', estado.grilla);
    document.querySelectorAll('[data-grilla-op]').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.grillaOp === estado.grilla));
    });

    var fondoOscuro = OSCURAS.indexOf(estado.paleta) >= 0;
    var juego = fondoOscuro ? TINTAS_OSCURO : TINTAS_CLARO;
    var elegida = fondoOscuro ? estado.tintaO : estado.tintaC;
    if (elegida === 'auto') raiz.removeAttribute('data-tinta');
    else raiz.setAttribute('data-tinta', elegida);

    var fila = document.getElementById('proy-tintas');
    if (fila.dataset.juego !== (fondoOscuro ? 'o' : 'c')){
      fila.dataset.juego = fondoOscuro ? 'o' : 'c';
      fila.innerHTML = juego.map(function(t){
        return '<button class="proy-op" type="button" data-tinta-op="' + t[0] + '" aria-pressed="false">'
          + '<span class="proy-muestra" style="background:' + MUESTRA_TINTA[t[0]] + '"></span>'
          + t[1] + '</button>';
      }).join('');
    }
    document.getElementById('proy-aviso').textContent = fondoOscuro
      ? 'Colores claros, para el fondo oscuro.'
      : 'Colores oscuros, para el fondo claro.';
    fila.querySelectorAll('[data-tinta-op]').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.tintaOp === elegida));
    });

    var z = ZOOMS[Math.max(0, Math.min(ZOOMS.length - 1, estado.zoom))];
    document.querySelectorAll('.envoltura').forEach(function(el){ el.style.zoom = z; });
    document.querySelectorAll('[data-zoom="0"]').forEach(function(b){
      b.textContent = Math.round(z * 100) + '%';
    });

    var lado = (estado.libre === 'izq33') ? 'izq' : (estado.libre === '0' ? '0' : 'der');
    var ancho = (estado.libre === 'izq33') ? '33%' : estado.libre;
    cuerpo.setAttribute('data-libre', lado);
    raiz.style.setProperty('--libre', ancho);
    if (lado === 'der') marca.style.cssText = 'right:' + ancho + ';left:auto';
    else if (lado === 'izq') marca.style.cssText = 'left:' + ancho + ';right:auto';
    document.querySelectorAll('[data-libre-op]').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.libreOp === estado.libre));
    });

    cuerpo.setAttribute('data-solo', String(estado.solo));
    nav.hidden = !estado.solo || diapos.length < 2;
    if (estado.solo && diapos.length){
      estado.i = Math.max(0, Math.min(diapos.length - 1, estado.i));
      diapos.forEach(function(d, k){ d.classList.toggle('activa', k === estado.i); });
      document.getElementById('proy-pos').textContent = (estado.i + 1) + ' / ' + diapos.length;
      nav.querySelector('[data-paso="-1"]').disabled = (estado.i === 0);
      nav.querySelector('[data-paso="1"]').disabled = (estado.i === diapos.length - 1);
    } else {
      diapos.forEach(function(d){ d.classList.remove('activa'); });
    }
    document.querySelectorAll('button[data-solo]').forEach(function(b){
      b.setAttribute('aria-pressed', String(Number(b.dataset.solo) === estado.solo));
    });

    document.querySelectorAll('[data-paleta]').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.dataset.paleta === estado.paleta));
    });
    guardar();
  }

  // ── interacción ──
  document.addEventListener('click', function(ev){
    var b = ev.target.closest('button');
    if (b){
      if (b.dataset.paleta){ estado.paleta = b.dataset.paleta; aplicar(); return; }
      if (b.dataset.tintaOp){
        if (OSCURAS.indexOf(estado.paleta) >= 0) estado.tintaO = b.dataset.tintaOp;
        else estado.tintaC = b.dataset.tintaOp;
        aplicar(); return;
      }
      if (b.dataset.grillaOp){ estado.grilla = b.dataset.grillaOp; aplicar(); return; }
      if (b.dataset.libreOp){ estado.libre = b.dataset.libreOp; aplicar(); return; }
      if (b.dataset.solo !== undefined){
        estado.solo = Number(b.dataset.solo); estado.i = 0; aplicar();
        window.scrollTo(0, 0); return;
      }
      if (b.dataset.paso !== undefined){
        estado.i += Number(b.dataset.paso); aplicar(); window.scrollTo(0, 0); return;
      }
      if (b.dataset.zoom !== undefined){
        var d = Number(b.dataset.zoom);
        estado.zoom = (d === 0) ? 2 : Math.max(0, Math.min(ZOOMS.length - 1, estado.zoom + d));
        aplicar(); return;
      }
    }
    // con una diapositiva a la vez, los chips del navegador cambian de diapositiva
    var c = ev.target.closest('a.chip');
    if (c && estado.solo){
      var destino = document.querySelector(c.getAttribute('href'));
      var k = diapos.indexOf(destino);
      if (k >= 0){ estado.i = k; aplicar(); window.scrollTo(0, 0); ev.preventDefault(); }
    }
  });

  btn.addEventListener('click', function(){
    var abierto = panel.hidden;
    panel.hidden = !abierto;
    btn.setAttribute('aria-expanded', String(abierto));
  });

  document.addEventListener('keydown', function(ev){
    if (ev.key === 'Escape' && !panel.hidden){
      panel.hidden = true; btn.focus(); btn.setAttribute('aria-expanded','false'); return;
    }
    if (!estado.solo) return;
    var t = ev.target.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA') return;   // no robar las flechas de un campo
    if (ev.key === 'ArrowRight' || ev.key === 'PageDown'){
      estado.i++; aplicar(); window.scrollTo(0, 0); ev.preventDefault();
    }
    if (ev.key === 'ArrowLeft' || ev.key === 'PageUp'){
      estado.i--; aplicar(); window.scrollTo(0, 0); ev.preventDefault();
    }
  });

  cargar();
  aplicar();
})();
