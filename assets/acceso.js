/* ═══════════════════════════════════════════════════════════════
   AESWeb · pantalla de acceso
   Pide usuario y contraseña antes de mostrar la página.

   NO ES SEGURIDAD. El contenido está en el HTML y el repositorio es
   público: quien abra el código fuente o entre a GitHub lo lee igual.
   La pantalla solo desalienta el uso sin permiso. Lo que sí cuida es
   que la contraseña no quede escrita en ningún lado: acá hay solo una
   huella (SHA-256 repetido muchas veces, con una sal por cuenta), y de
   la huella no se vuelve a la contraseña.

   Las cuentas se agregan, cambian y quitan con
       python herramientas/clave.py
   que reescribe el bloque CUENTAS. No se edita a mano.

   Se carga sin defer, arriba de todo, en todas las páginas menos las
   del Open House (open-2026/), que se abren desde los QR de la muestra.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* CUENTAS:inicio */
  var VUELTAS = 100000;
  var CUENTAS = {
    "docente": ["c66e783d10ae2455", "0892ebd35e33d50de9c35744c962c043f651ef0dba1b07df5c12ecd0dd392c3c"]
  };
  /* CUENTAS:fin */

  var LLAVE = 'aesweb-acceso';
  var raiz = document.documentElement;

  /* ── SHA-256, en JavaScript puro ──────────────────────────────
     Sin crypto.subtle: no existe fuera de https, y el sitio también
     se abre con doble clic desde una carpeta. */
  var K = [];
  (function(){
    var n = 2, c = 0;
    function frac(x){ return ((x - Math.floor(x)) * 4294967296) | 0; }
    while (c < 64){
      var primo = true;
      for (var d = 2; d * d <= n; d++) if (n % d === 0){ primo = false; break; }
      if (primo){ K[c++] = frac(Math.pow(n, 1/3)); }
      n++;
    }
  })();
  var H0 = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];

  function sha256(bytes){            // bytes: array de enteros 0–255
    var largo = bytes.length, m = bytes.slice();
    m.push(0x80);
    while (m.length % 64 !== 56) m.push(0);
    var bits = largo * 8;
    for (var i = 7; i >= 0; i--) m.push(i > 3 ? 0 : (bits >>> (i * 8)) & 255);
    var h = H0.slice(), w = new Array(64);
    for (var b = 0; b < m.length; b += 64){
      for (var t = 0; t < 16; t++)
        w[t] = (m[b+4*t] << 24) | (m[b+4*t+1] << 16) | (m[b+4*t+2] << 8) | m[b+4*t+3];
      for (t = 16; t < 64; t++){
        var x = w[t-15], y = w[t-2];
        var s0 = ((x>>>7)|(x<<25)) ^ ((x>>>18)|(x<<14)) ^ (x>>>3);
        var s1 = ((y>>>17)|(y<<15)) ^ ((y>>>19)|(y<<13)) ^ (y>>>10);
        w[t] = (w[t-16] + s0 + w[t-7] + s1) | 0;
      }
      var a=h[0], bb=h[1], c=h[2], d=h[3], e=h[4], f=h[5], g=h[6], hh=h[7];
      for (t = 0; t < 64; t++){
        var S1 = ((e>>>6)|(e<<26)) ^ ((e>>>11)|(e<<21)) ^ ((e>>>25)|(e<<7));
        var t1 = (hh + S1 + ((e & f) ^ (~e & g)) + K[t] + w[t]) | 0;
        var S0 = ((a>>>2)|(a<<30)) ^ ((a>>>13)|(a<<19)) ^ ((a>>>22)|(a<<10));
        var t2 = (S0 + ((a & bb) ^ (a & c) ^ (bb & c))) | 0;
        hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = bb; bb = a; a = (t1 + t2) | 0;
      }
      h[0]=(h[0]+a)|0; h[1]=(h[1]+bb)|0; h[2]=(h[2]+c)|0; h[3]=(h[3]+d)|0;
      h[4]=(h[4]+e)|0; h[5]=(h[5]+f)|0; h[6]=(h[6]+g)|0; h[7]=(h[7]+hh)|0;
    }
    var out = [];
    for (i = 0; i < 8; i++) out.push((h[i]>>>24)&255, (h[i]>>>16)&255, (h[i]>>>8)&255, h[i]&255);
    return out;
  }
  function utf8(s){
    var e = unescape(encodeURIComponent(s)), r = [];
    for (var i = 0; i < e.length; i++) r.push(e.charCodeAt(i));
    return r;
  }
  function hex(b){
    var s = '';
    for (var i = 0; i < b.length; i++) s += (b[i] < 16 ? '0' : '') + b[i].toString(16);
    return s;
  }
  /* La huella: sha256(sal | usuario | contraseña), y después sha256 de
     eso, VUELTAS veces. herramientas/clave.py hace la misma cuenta. */
  function huella(usuario, clave, sal){
    var h = sha256(utf8(sal + '|' + usuario + '|' + clave));
    for (var i = 1; i < VUELTAS; i++) h = sha256(h);
    return hex(h);
  }
  function normaliza(u){ return String(u || '').trim().toLowerCase(); }

  /* ── lo guardado ─────────────────────────────────────────────── */
  function lee(almacen){
    try { return JSON.parse(window[almacen].getItem(LLAVE) || 'null'); } catch(e){ return null; }
  }
  function valido(g){
    return !!(g && CUENTAS.hasOwnProperty(g.u) && CUENTAS[g.u][1] === g.h);
  }
  if (valido(lee('localStorage')) || valido(lee('sessionStorage'))) return;

  /* ── tapar la página hasta que entre ─────────────────────────── */
  raiz.classList.add('acceso-pendiente');
  var estilo = document.createElement('style');
  estilo.textContent =
    'html.acceso-pendiente body{visibility:hidden; overflow:hidden}' +
    '.acceso{visibility:visible; position:fixed; inset:0; z-index:2147483000; display:grid;' +
    ' place-items:center; padding:16px; background:var(--papel,#FAFBFC); color:var(--tinta,#16283A);' +
    ' font-family:var(--sans,system-ui,sans-serif)}' +
    '.acceso form{width:min(100%,360px); display:grid; gap:14px; padding:28px 26px;' +
    ' background:var(--papel-2,#F1F4F7); border:1px solid var(--linea,#DBE4EA); border-radius:10px}' +
    '.acceso h1{margin:0; font-family:var(--serif,Georgia,serif); font-size:28px; line-height:1.15}' +
    '.acceso p{margin:0; font-size:15px; color:var(--lapiz,#5D7080)}' +
    '.acceso label{display:grid; gap:5px; font-size:14px; font-weight:700}' +
    '.acceso input[type=text],.acceso input[type=password]{font:inherit; font-size:17px; font-weight:400;' +
    ' padding:10px 12px; border:1px solid var(--linea-fuerte,#C3D0D9); border-radius:6px;' +
    ' background:var(--papel,#fff); color:inherit}' +
    '.acceso .recordar{display:flex; align-items:center; gap:8px; font-weight:400}' +
    '.acceso button{font:inherit; font-size:17px; font-weight:700; padding:11px; border:0;' +
    ' border-radius:6px; background:var(--acento,#C8102E); color:#fff; cursor:pointer}' +
    '.acceso button[disabled]{opacity:.6; cursor:wait}' +
    '.acceso .error{color:var(--acento,#C8102E); font-weight:700; min-height:1.4em}' +
    '.acceso input:focus-visible,.acceso button:focus-visible{outline:2px solid var(--acento2,#0B6E75); outline-offset:2px}';
  document.head.appendChild(estilo);

  function arma(){
    var caja = document.createElement('div');
    caja.className = 'acceso';
    caja.setAttribute('role', 'dialog');
    caja.setAttribute('aria-modal', 'true');
    caja.setAttribute('aria-labelledby', 'acceso-titulo');
    caja.innerHTML =
      '<form novalidate>' +
      '<h1 id="acceso-titulo">Material de clase</h1>' +
      '<p>Para usar el sitio, entrá con el usuario y la contraseña que te dio tu docente.</p>' +
      '<label>Usuario<input type="text" name="u" autocomplete="username" autocapitalize="none" spellcheck="false" required></label>' +
      '<label>Contraseña<input type="password" name="c" autocomplete="current-password" required></label>' +
      '<label class="recordar"><input type="checkbox" name="r" checked> Recordar en esta computadora</label>' +
      '<button type="submit">Entrar</button>' +
      '<p class="error" role="alert" aria-live="assertive"></p>' +
      '</form>';
    document.body.appendChild(caja);
    var form = caja.querySelector('form'), error = caja.querySelector('.error'),
        boton = caja.querySelector('button');
    // Que las teclas no lleguen a los atajos de la clase (flechas, espacio del timer).
    caja.addEventListener('keydown', function(e){ e.stopPropagation(); });
    form.u.focus();
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var u = normaliza(form.u.value), c = form.c.value;
      error.textContent = '';
      boton.disabled = true; boton.textContent = 'Comprobando…';
      setTimeout(function(){        // deja dibujar el «Comprobando…» antes de la cuenta
        var cuenta = CUENTAS.hasOwnProperty(u) ? CUENTAS[u] : null;
        var h = huella(u, c, cuenta ? cuenta[0] : 'sin-cuenta');
        boton.disabled = false; boton.textContent = 'Entrar';
        if (!cuenta || cuenta[1] !== h){
          error.textContent = 'Usuario o contraseña incorrectos.';
          form.c.value = ''; form.c.focus();
          return;
        }
        var g = JSON.stringify({ u: u, h: h });
        try { window[form.r.checked ? 'localStorage' : 'sessionStorage'].setItem(LLAVE, g); } catch(e2){}
        caja.remove();
        raiz.classList.remove('acceso-pendiente');
      }, 30);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arma);
  else arma();

  /* Para salir: AESAcceso.salir() desde la consola, o el enlace «Salir»
     que agregue una página. */
  window.AESAcceso = { salir: function(){
    try { localStorage.removeItem(LLAVE); sessionStorage.removeItem(LLAVE); } catch(e){}
    location.reload();
  }};
})();
