/* ═══════════════════════════════════════════════════════════════
   AESWeb · la pizarra: el motor de las páginas de clase

   Una página de clase trae solo sus datos (los temas, los ejemplos, las
   preguntas del observador, las notas) y llama a Pizarra.unidad(). Todo
   lo demás vive acá y es igual en todas las clases:

   - la notación: I(), M(), Q(), N(), A() y P();
   - las fracciones exactas y el plano cartesiano;
   - la pizarra de cada ejemplo, sus botones y su movimiento;
   - el armado de la unidad: concepto, ejemplos, taller, ficha, desafío,
     el navegador y lo que necesitan los botones de assets/clase.js.

   La pizarra es como en los videos de Khan Academy: a la izquierda el
   enunciado, lo que queda fijo y lo que se dice en este paso, que se
   borra y se reescribe en el mismo lugar; a la derecha, grande, lo que se
   va acumulando: el cuaderno con la resolución, o el plano. Nada empuja
   nada: cambia solo lo que tiene que cambiar.

   Se carga sin defer, antes del guion de la página:
     <script src="../../assets/pizarra.js"></script>
   ═══════════════════════════════════════════════════════════════ */

/* ═══ la notación ═══
   M() pone en cursiva las letras sueltas y envuelve en .ec; Q() arma una
   fracción apilada, como las del libro. Las letras son x, y, a, b, c, d;
   una página que use otras las cambia antes de escribir sus datos:
     Pizarra.letras = /[xyn]/g;
   M() e I() se usan solo con matemática pura: en "1 y 13" la y es una
   palabra, y quedaría en cursiva. */
const Pizarra = { letras:/[xyabcd]/g, lienzos:{} };

const I = s => String(s).split(/(<[^>]+>)/)
  .map(t => t.startsWith('<') ? t : t.replace(Pizarra.letras, '<i>$&</i>')).join('');
const M = s => '<span class="ec">' + I(s) + '</span>';
const Q = (n, d) => `<span class="fr"><span>${I(String(n))}</span><span>${I(String(d))}</span></span>`;

/* N() resalta lo nuevo: lo que se agrega a los dos miembros, el valor que
   se reemplaza, la palabra que cambió respecto del ejemplo anterior. Va
   siempre adentro de M(), de A() o de un .ec: no pone cursivas. */
const N = s => `<span class="nuevo">${s}</span>`;

/* A() alinea una cadena de igualdades: una por renglón y todos los signos
   = en la misma columna, como en el cuaderno. Cada fila es una igualdad
   ('3(1 + 2) = 3 · 1 + 6'), una continuación (' = 9'), o un par
   ['rótulo', '3(1 + 2) = 9'] con un rótulo a la izquierda ("izquierda",
   "con x = 1"). También acepta ≠, cuando los dos miembros no coinciden.
   El rótulo es texto: no pasa por I(). */
function celdas(f, n, cls = '', extra = ''){
  const [rot, e] = Array.isArray(f) ? f : ['', f];
  const m = / (=|≠) /.exec(' ' + e);
  const izq = m ? e.slice(0, Math.max(0, m.index - 1)) : '';
  const sig = m ? m[1] : '';
  const der = m ? e.slice(m.index + m[0].length - 1) : e;
  const at = k => ` class="${k}${cls ? ' ' + cls : ''}" style="--f:${n}"${extra}`;
  return `<span${at('al-rot')}>${rot}</span><span${at('al-izq')}>${I(izq)}</span>` +
         `<span${at('al-sig')}>${sig}</span><span${at('al-der')}>${I(der)}</span>`;
}
function A(...filas){
  return '<div class="alineado">' + filas.map((f, n) => celdas(f, n)).join('') + '</div>';
}

/* P() es un paso que escribe en el cuaderno: a la izquierda queda solo lo
   que se dice ("Sumo 5 a los dos miembros"), y los renglones van al
   cuaderno de la derecha, alineados con todo lo anterior.
     P('Sumo 5 a los dos miembros.', `6x − 5 ${N('+ 5')} = 25 ${N('+ 5')}`, '6x = 30')
   Un paso que es solo un texto se da como texto, sin P(). */
const P = (t, ...q) => ({ t, q });

/* ═══ fracciones exactas ═══
   Nada de decimales: una ecuación con enteros puede dar 16/5, y
   escribirlo redondeado sería perder exactitud sin necesidad. */
const mcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b){ [a, b] = [b, a % b]; } return a || 1; };
function fr(n, d = 1){
  if (d === 0) return null;
  if (d < 0){ n = -n; d = -d; }
  const g = mcd(n, d);
  return { n: n / g, d: d / g };
}
const suma  = (p, q) => fr(p.n * q.d + q.n * p.d, p.d * q.d);
const resta = (p, q) => fr(p.n * q.d - q.n * p.d, p.d * q.d);
const prod  = (p, q) => fr(p.n * q.n, p.d * q.d);
const coc   = (p, q) => (q.n === 0 ? null : fr(p.n * q.d, p.d * q.n));
const cero  = p => p.n === 0;
const igual = (p, q) => p.n === q.n && p.d === q.d;
const valor = p => p.n / p.d;

/* el signo va adelante, como en todo el material de la casa */
function txt(p){
  const s = p.n < 0 ? '−' : '';
  const a = Math.abs(p.n);
  return p.d === 1 ? s + a : s + Q(a, p.d);
}
/* dentro de un SVG no hay HTML: la fracción va con barra */
function txtPlano(p){
  const s = p.n < 0 ? '−' : '';
  return p.d === 1 ? s + Math.abs(p.n) : s + Math.abs(p.n) + '/' + p.d;
}

/* lee 3, −5, 3/2, 2x, −x */
function lee(bruto){
  let t = String(bruto).trim().replace(/−/g, '-').replace(/\s+/g, '');
  const esx = /x$/i.test(t);
  if (esx) t = t.slice(0, -1);
  if (t === '' || t === '+') t = '1';
  if (t === '-') t = '-1';
  const m = t.match(/^(-?\d+)\/(\d+)$/);
  if (m) return { f:fr(Number(m[1]), Number(m[2])), esx };
  if (/^-?\d+$/.test(t)) return { f:fr(Number(t)), esx };
  return null;
}
/* un número: 3, −2, 1/2 y también 2,5 */
function leeNumero(bruto){
  const r = lee(bruto);
  if (r && !r.esx) return r.f;
  const m = String(bruto).trim().replace(/−/g, '-').match(/^(-?)(\d+)[.,](\d+)$/);
  if (!m) return null;
  const den = Math.pow(10, m[3].length);
  const num = Number(m[2]) * den + Number(m[3]);
  return fr(m[1] ? -num : num, den);
}

/* un miembro de una ecuación: a·x + b */
function lado(a, b){
  if (cero(a)) return txt(b);
  let s;
  if (igual(a, fr(1))) s = '<i>x</i>';
  else if (igual(a, fr(-1))) s = '−<i>x</i>';
  else s = txt(a) + '<i>x</i>';
  if (cero(b)) return s;
  return s + (b.n > 0 ? ' + ' + txt(b) : ' − ' + txt(fr(-b.n, b.d)));
}
const ecuacion = e => lado(e.a, e.b) + ' = ' + lado(e.c, e.d);

/* ═══ el plano cartesiano ═══
   Una recta y = ax + b recortada al recuadro, con sus puntos rotulados.
   op, para animar: pop = [[índice, retraso]] de los puntos que caen;
   guia = índice del punto con sus guías (animaGuia: si suben ahora);
   dibujaRecta = si la recta se traza sola, desde retrasoRecta. Con
   anterior = {a, b}, la recta de antes queda en punteado. */
function lienzoRecta(a, b, puntos, R = 8, tam = 400, destacado = 2, conRecta = true, anterior = null, op = {}){
  const M_ = 22, U = (tam - 2 * M_) / (2 * R);
  const px = u => M_ + (u + R) * U;
  const py = v => M_ + (R - v) * U;
  let g = '';
  for (let i = -R; i <= R; i++){
    const cls = (i % 4 === 0) ? 'grilla-fuerte' : 'grilla';
    g += `<line class="${cls}" x1="${px(i)}" y1="${py(-R)}" x2="${px(i)}" y2="${py(R)}"/>`;
    g += `<line class="${cls}" x1="${px(-R)}" y1="${py(i)}" x2="${px(R)}" y2="${py(i)}"/>`;
  }
  g += `<line class="eje" x1="${px(-R)}" y1="${py(0)}" x2="${px(R)}" y2="${py(0)}"/>`;
  g += `<line class="eje" x1="${px(0)}" y1="${py(-R)}" x2="${px(0)}" y2="${py(R)}"/>`;
  for (let i = -R; i <= R; i += 2){
    if (i === 0) continue;
    g += `<text class="rotulo-eje" x="${px(i)}" y="${py(0) + 14}" text-anchor="middle">${i}</text>`;
    g += `<text class="rotulo-eje" x="${px(0) - 6}" y="${py(i) + 4}" text-anchor="end">${i}</text>`;
  }
  const dentro = t => t >= -R - 1e-9 && t <= R + 1e-9;
  const segmento = (av, bv, cls, traza = false) => {
    const pts = [];
    for (const xx of [-R, R]){ const yy = av * xx + bv; if (dentro(yy)) pts.push([xx, yy]); }
    if (av !== 0) for (const yy of [-R, R]){ const xx = (yy - bv) / av; if (dentro(xx)) pts.push([xx, yy]); }
    const u = pts.filter((p, i) => pts.findIndex(q => Math.abs(q[0] - p[0]) < 1e-9 && Math.abs(q[1] - p[1]) < 1e-9) === i);
    if (u.length < 2) return '';
    u.sort((p, q) => p[0] - q[0]);          // se traza desde la izquierda
    const [x1, y1, x2, y2] = [px(u[0][0]), py(u[0][1]), px(u[1][0]), py(u[1][1])];
    const estilo = traza
      ? ` style="--largo:${Math.hypot(x2 - x1, y2 - y1).toFixed(1)}; animation-delay:${op.retrasoRecta || 0}s"` : '';
    return `<line class="${cls}${traza ? ' dibuja' : ''}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${estilo}/>`;
  };
  if (anterior) g += segmento(valor(anterior.a), valor(anterior.b), 'recta-anterior');
  if (conRecta) g += segmento(valor(a), valor(b), 'recta1', !!op.dibujaRecta);
  // las guías del punto del momento: desde su x en el eje, sube a su altura
  if (op.guia != null && puntos[op.guia]){
    const X = valor(puntos[op.guia][0]), Y = valor(puntos[op.guia][1]);
    if (dentro(X) && dentro(Y)){
      const an = op.animaGuia;
      g += `<line class="guia${an ? ' sube' : ''}" x1="${px(X)}" y1="${py(0)}" x2="${px(X)}" y2="${py(Y)}"
               style="transform-origin:${px(X)}px ${py(0)}px"/>`;
      g += `<line class="guia${an ? ' cruza' : ''}" x1="${px(X)}" y1="${py(Y)}" x2="${px(0)}" y2="${py(Y)}"
               style="transform-origin:${px(X)}px ${py(Y)}px"/>`;
      g += `<circle class="marca-x${an ? ' late' : ''}" cx="${px(X)}" cy="${py(0)}" r="4"
               style="transform-origin:${px(X)}px ${py(0)}px"/>`;
    }
  }
  puntos.forEach((p, i) => {
    const X = valor(p[0]), Y = valor(p[1]);
    if (!dentro(X) || !dentro(Y)) return;
    const cae = (op.pop || []).find(q => q[0] === i);
    const origen = `transform-origin:${px(X)}px ${py(Y)}px`;
    if (cae) g += `<circle class="onda" cx="${px(X)}" cy="${py(Y)}" r="6.5" style="${origen}; animation-delay:${cae[1] + .05}s"/>`;
    g += `<circle class="${i === destacado ? 'punto-control' : 'punto-tabla'}${cae ? ' aparece' : ''}" cx="${px(X)}" cy="${py(Y)}" r="6.5"
             style="${origen}${cae ? `; animation-delay:${cae[1]}s` : ''}"/>`;
    const etiqueta = `(${txtPlano(p[0])}, ${txtPlano(p[1])})`;
    // abajo del eje, el rótulo va abajo del punto: arriba se pisaría con los
    // números del eje; cerca del borde derecho, va a la izquierda
    const yRot = Y < 0 ? py(Y) + 20 : py(Y) - 9;
    const aLaIzq = X > R - 3;
    g += `<text class="rotulo-punto${cae ? ' aparece-rot' : ''}" x="${aLaIzq ? px(X) - 9 : px(X) + 9}" y="${yRot}"${aLaIzq ? ' text-anchor="end"' : ''}${cae ? ` style="animation-delay:${cae[1] + .12}s"` : ''}>${etiqueta}</text>`;
  });
  return g;
}

/* ═══════════════════════════════════════════════════════════════
   La pizarra de un ejemplo
   Un ejemplo es { titulo, enun, prosa?, fija?, inicio?, pasos, final,
   control?, construye? }:
   - pasos: textos o P(); el orden es siempre pasos, respuesta, control;
   - fija: cuántos pasos del principio quedan escritos arriba (la
     pregunta, la incógnita con nombre);
   - inicio: los renglones con que arranca el cuaderno (la ecuación);
   - construye: { a, b, xs, desde, control } si a la derecha va el plano
     en lugar del cuaderno: cada paso desde `desde` agrega un renglón a la
     tabla y un punto al plano, la recta aparece con la respuesta y el
     punto de control con el control;
   - lienzo: { tipo, … } para un dibujo propio de la página, registrado en
     Pizarra.lienzos[tipo] = (clave, ej, k, avanzando, div) => {…}.
   El atributo de los botones NO puede llamarse data-paso: el panel de
   proyección usa ese nombre para cambiar de diapositiva.
   ═══════════════════════════════════════════════════════════════ */
const BLOQUES = {};        // clave → ejemplo
const avance = {};         // clave → cuántos pasos se mostraron

/* El orden es siempre: los pasos, la respuesta, y después el control. El
   control no puede ir antes: controla una respuesta que todavía no está. */
function totalPasos(ej){ return ej.pasos.length + 1 + (ej.control ? 1 : 0); }
const textoPaso = p => typeof p === 'string' ? p : p.t;
const filasPaso = p => typeof p === 'string' ? [] : (p.q || []);
const usaCuaderno = ej => !ej.construye && !ej.lienzo &&
  ((ej.inicio && [].concat(ej.inicio).length) || ej.pasos.some(p => filasPaso(p).length));

function navPasos(clave, total){
  return `<div class="pasos-nav abajo" data-nav="${clave}">
      <button class="boton" type="button" data-accion="atras" data-bloque="${clave}" disabled>← Anterior</button>
      <span class="pasos-cuenta">${total} pasos</span>
      <button class="boton" type="button" data-accion="revelar" data-bloque="${clave}">Siguiente →</button>
    </div>`;
}

/* o: { rotulo, cinta, clase ('ejemplo-diapo'), id ('e-clave'), attrs } */
function bloque(clave, ej, o = {}){
  BLOQUES[clave] = ej;
  const derecha = ej.construye || ej.lienzo || usaCuaderno(ej);
  return `
  <section class="${o.clase || 'ejemplo-diapo'} pizarra" id="${o.id || 'e-' + clave}"${o.attrs ? ' ' + o.attrs : ''}>
    ${o.cinta ? `<p class="cinta">${o.cinta}</p>` : ''}
    <div class="ejemplo-cab">
      <h4 class="ej-titulo">${o.rotulo ? `<span class="num">${o.rotulo}</span>` : ''}${ej.titulo}</h4>
    </div>
    <div class="pizarra-grid${derecha ? '' : ' sola'}${ej.prosa && !ej.construye ? ' prosa' : ''}">
      <div class="pizarra-izq">
        <div class="pizarra-cab">
          <div class="enunciado${ej.prosa ? ' frase' : ''}">${ej.enun}</div>
          ${ej.construye ? `<div class="tabla-mini" id="tabla-${clave}"></div>` : ''}
        </div>
        <div class="pizarra-fija" id="fija-${clave}"></div>
        <div class="pizarra-trabajo" id="trabajo-${clave}">${navPasos(clave, totalPasos(ej))}</div>
      </div>
      ${derecha ? `<div class="pizarra-der" id="der-${clave}"></div>` : ''}
    </div>
  </section>`;
}

/* ═══ el movimiento ═══
   Lo que ya está se queda quieto; lo nuevo aparece en su lugar. Con
   "reducir movimiento" en el sistema, nada se anima. */
const movimiento = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SUAVE = 'cubic-bezier(.22,.8,.24,1)';

/* Lo que ordena la página al terminar una animación (borrar la cuenta
   vieja, soltar un alto fijo) no puede depender solo del aviso de fin: si
   la ventana no está dibujando, ese aviso se demora. Un reloj lo respalda,
   y lo que sea que llegue primero lo hace, una sola vez. */
function alTerminar(anim, ms, fn){
  let hecho = false;
  const una = () => { if (!hecho){ hecho = true; fn(); } };
  anim.onfinish = una;
  setTimeout(una, ms + 80);
}

/* Lleva un elemento a la vista, lo justo y con suavidad, sin dejarlo
   debajo de los botones flotantes. Si la ventana no está dibujando (el
   proyector en otra pantalla) el desplazamiento suave no avanza: a los
   700 ms se corrige de una. */
function llevaAlaVista(el){
  const r = el.getBoundingClientRect();
  const abajo = innerHeight - 90, arriba = 80;
  let delta = 0;
  if (r.bottom > abajo) delta = r.bottom - abajo;
  else if (r.top < arriba) delta = r.top - arriba;
  if (!delta) return;
  const destino = window.scrollY + delta;
  window.scrollTo({ top:destino, behavior: movimiento() ? 'smooth' : 'auto' });
  setTimeout(() => { if (Math.abs(window.scrollY - destino) > 4) window.scrollTo(0, destino); }, 700);
}

/* una caja nueva se abre desde alto cero: no empuja todo de golpe */
function abreCaja(el){
  if (!movimiento() || !el.animate) return;
  const alto = el.getBoundingClientRect().height;
  const cs = getComputedStyle(el);
  el.style.overflow = 'hidden';
  alTerminar(el.animate([
    { height:'0px', paddingTop:'0px', paddingBottom:'0px', opacity:0 },
    { height:alto + 'px', paddingTop:cs.paddingTop, paddingBottom:cs.paddingBottom, opacity:1 }
  ], { duration:420, easing:SUAVE }), 420, () => { el.style.overflow = ''; });
}

/* y se cierra igual, antes de irse */
function cierraCaja(el, listo){
  if (!movimiento() || !el.animate){ listo(); return; }
  const alto = el.getBoundingClientRect().height;
  el.style.overflow = 'hidden';
  alTerminar(el.animate([
    { height:alto + 'px', opacity:1 },
    { height:'0px', paddingTop:'0px', paddingBottom:'0px', marginTop:'0px', opacity:0 }
  ], { duration:320, easing:'cubic-bezier(.4,0,.6,1)', fill:'forwards' }), 320, listo);
}

/* una caja que cambia de alto lo hace despacio */
function acompanaAlto(el, antes){
  const despues = el.getBoundingClientRect().height;
  if (!movimiento() || !el.animate || Math.abs(antes - despues) < 2) return;
  el.style.overflow = 'hidden';
  alTerminar(el.animate([{ height:antes + 'px' }, { height:despues + 'px' }],
               { duration:380, easing:SUAVE }), 380, () => { el.style.overflow = ''; });
}

function actualizaNav(clave){
  const total = totalPasos(BLOQUES[clave]);
  const i = avance[clave] || 0;
  const nav = document.querySelector(`[data-nav="${clave}"]`);
  nav.querySelector('[data-accion="atras"]').disabled = (i === 0);
  nav.querySelector('[data-accion="revelar"]').disabled = (i >= total);
  nav.querySelector('.pasos-cuenta').textContent = i ? `paso ${i} de ${total}` : `${total} pasos`;
}

/* ═══ la izquierda: lo que se dice en este paso ═══ */
function laminaDe(ej, k){
  const s = k - 1;
  if (s < ej.pasos.length) return { cls:'', html:`<div class="t">${textoPaso(ej.pasos[s])}</div>` };
  if (s === ej.pasos.length) return { cls:'final', html:`<span class="n">=</span><span class="final-txt">${ej.final}</span>` };
  return { cls:'control', html:`<span class="n">✓</span><div class="t">${ej.control}</div>` };
}

function nuevaLamina(lam){
  const d = document.createElement('div');
  d.className = `lamina ${lam.cls} recien`;
  d.innerHTML = lam.html;
  return d;
}

/* la cuenta anterior se borra en su lugar y la nueva se escribe encima */
function cambiaTrabajo(clave, lam){
  const zona = document.getElementById('trabajo-' + clave);
  const nav = zona.querySelector('.pasos-nav');
  const antes = zona.getBoundingClientRect().height;
  zona.querySelectorAll(':scope > .lamina:not(.saliendo)').forEach(v => {
    v.classList.add('saliendo');
    if (!movimiento() || !v.animate){ v.remove(); return; }
    Object.assign(v.style, { position:'absolute', top:v.offsetTop + 'px', left:v.offsetLeft + 'px',
                             width:v.offsetWidth + 'px', margin:'0' });
    alTerminar(v.animate([{ opacity:1 }, { opacity:0, transform:'translateY(-10px)' }],
              { duration:240, easing:'ease-in', fill:'forwards' }), 240, () => v.remove());
  });
  if (lam) zona.insertBefore(nuevaLamina(lam), nav);
  acompanaAlto(zona, antes);
}

/* el control se escribe debajo de la respuesta, que se queda */
function agregaLamina(clave, lam){
  const zona = document.getElementById('trabajo-' + clave);
  const d = nuevaLamina(lam);
  zona.insertBefore(d, zona.querySelector('.pasos-nav'));
  abreCaja(d);
}
function quitaUltimaLamina(clave){
  const vivas = [...document.getElementById('trabajo-' + clave).querySelectorAll(':scope > .lamina:not(.saliendo)')];
  const u = vivas[vivas.length - 1];
  if (!u) return;
  u.classList.add('saliendo');
  cierraCaja(u, () => u.remove());
}

/* ═══ la derecha: lo que se acumula ═══ */

/* El cuaderno: la resolución entera, con todos los = en una columna. Los
   renglones del paso de ahora se escriben de a uno; los de antes quedan,
   un poco más tenues. */
function filasHasta(ej, k){
  const filas = [].concat(ej.inicio || []).map(f => ({ f, paso:0 }));
  ej.pasos.slice(0, Math.min(k, ej.pasos.length))
    .forEach((p, i) => filasPaso(p).forEach(f => filas.push({ f, paso:i + 1 })));
  return filas;
}

function pintaCuaderno(clave, avanzando, borrados = false){
  const ej = BLOQUES[clave];
  const div = document.getElementById('der-' + clave);
  const k = avance[clave] || 0;
  const filas = filasHasta(ej, k);
  // al volver, los renglones que sobran se borran antes de redibujar
  const sobran = [...div.querySelectorAll('[data-cu]')].filter(s => Number(s.dataset.cu) > k);
  if (!avanzando && !borrados && sobran.length && movimiento() && sobran[0].animate){
    if (div.dataset.borrando) return;
    div.dataset.borrando = '1';
    let ultima;
    sobran.forEach(s => { ultima = s.animate([{ opacity:1 }, { opacity:0 }], { duration:220, fill:'forwards' }); });
    alTerminar(ultima, 220, () => { delete div.dataset.borrando; pintaCuaderno(clave, false, true); });
    return;
  }
  const ultimo = filas.length ? filas[filas.length - 1].paso : 0;
  // los renglones que hasta recién eran los últimos se apagan despacio
  const hayNuevas = avanzando && ultimo === k && k > 0;
  const previo = Math.max(-1, ...filas.filter(r => r.paso < ultimo).map(r => r.paso));
  let n = 0;
  const cuerpo = filas.map(({ f, paso }) => {
    const nueva = hayNuevas && paso === k;
    const cls = [nueva ? 'cu-nueva' : '', paso < ultimo ? 'cu-antes' : '',
                 hayNuevas && paso === previo ? 'cu-atenua' : ''].join(' ').trim();
    return celdas(f, nueva ? n++ : 0, cls, ` data-cu="${paso}"`);
  }).join('');
  const antes = div.getBoundingClientRect().height;
  div.innerHTML = `<div class="cuaderno"><span class="cu-rot">${ej.rotCuaderno || 'en el cuaderno'}</span>
      <div class="alineado">${cuerpo}</div></div>`;
  acompanaAlto(div, antes);
}

/* El plano: está vacío al principio; desde el paso `desde`, cada paso
   agrega un renglón a la tabla y un punto al plano; con la respuesta
   aparece la recta, y con el control, el punto que nadie calculó. */
function pintaConstruccion(clave, avanzando = false){
  const ej = BLOQUES[clave], c = ej.construye;
  const k = avance[clave] || 0;
  const a = fr(...c.a), b = fr(...c.b);
  const X = v => Array.isArray(v) ? fr(v[0], v[1]) : fr(v);
  const hechos = Math.max(0, Math.min(c.xs.length, k - c.desde + 1));
  const conRecta = k >= ej.pasos.length + 1;
  const conControl = ej.control && c.control != null && k >= ej.pasos.length + 2;
  const puntos = c.xs.slice(0, hechos).map(v => [X(v), suma(prod(a, X(v)), b)]);
  if (conControl) puntos.push([X(c.control), suma(prod(a, X(c.control)), b)]);
  const ultimo = puntos.length - 1;

  // qué acaba de pasar, para animar solo eso
  const recienPunto = avanzando && !conRecta && hechos > 0 && k - c.desde + 1 === hechos;
  const recienRecta = avanzando && k === ej.pasos.length + 1;
  const recienControl = avanzando && conControl && k === ej.pasos.length + 2;
  const op = {};
  if ((!conRecta && hechos > 0) || conControl){
    op.guia = ultimo;
    op.animaGuia = recienPunto || recienControl;
    if (op.animaGuia) op.pop = [[ultimo, .82]];
  }
  if (recienRecta){ op.dibujaRecta = true; op.retrasoRecta = .1; }

  const filas = puntos.map((p, i) => {
    const cls = [conControl && i === ultimo ? 'control' : '',
                 (recienPunto || recienControl) && i === ultimo ? 'fila-nueva' : ''].join(' ');
    return `<tr class="${cls}"><td>${txt(p[0])}</td><td>${txt(p[1])}</td></tr>`;
  }).join('');
  document.getElementById('tabla-' + clave).innerHTML =
    `<table class="t-mini"><tr><th>x</th><th>y</th></tr>${filas ||
      '<tr class="vacia"><td colspan="2">sin valores</td></tr>'}</table>`;
  document.getElementById('der-' + clave).innerHTML = `<div class="lienzo"><svg viewBox="0 0 400 400" role="img"
      aria-label="El plano cartesiano con los puntos de la tabla">${
      lienzoRecta(a, b, puntos, 8, 400, conControl ? ultimo : -1, conRecta, null, op)}</svg></div>`;
}

function pintaDerecha(clave, avanzando){
  const ej = BLOQUES[clave];
  if (ej.construye) return pintaConstruccion(clave, avanzando);
  if (ej.lienzo){
    const f = Pizarra.lienzos[ej.lienzo.tipo];
    if (f) f(clave, ej, avance[clave] || 0, avanzando, document.getElementById('der-' + clave));
    return;
  }
  if (document.getElementById('der-' + clave)) pintaCuaderno(clave, avanzando);
}

/* ═══ un paso, para adelante (dir = 1) o para atrás (dir = −1) ═══ */
function paso(clave, dir){
  const ej = BLOQUES[clave];
  const k0 = avance[clave] || 0, k = k0 + dir;
  if (k < 0 || k > totalPasos(ej)) return;
  avance[clave] = k;
  const nP = ej.pasos.length, fija = ej.fija || 0;
  const zonaFija = document.getElementById('fija-' + clave);
  if (dir > 0 && k <= fija){
    const lam = nuevaLamina(laminaDe(ej, k));
    zonaFija.appendChild(lam);
    abreCaja(lam);
  }
  if (dir < 0 && k0 <= fija){
    const vivas = [...zonaFija.querySelectorAll(':scope > .lamina:not(.saliendo)')];
    const u = vivas[vivas.length - 1];
    if (u){ u.classList.add('saliendo'); cierraCaja(u, () => u.remove()); }
  }
  if (k > fija || k0 > fija){
    if (dir > 0 && k === nP + 2) agregaLamina(clave, laminaDe(ej, k));
    else if (dir < 0 && k0 === nP + 2) quitaUltimaLamina(clave);
    else cambiaTrabajo(clave, k > fija ? laminaDe(ej, k) : null);
  }
  pintaDerecha(clave, dir > 0);
  llevaAlaVista(document.querySelector(`[data-nav="${clave}"]`));
  actualizaNav(clave);
}
Pizarra.paso = paso;

document.addEventListener('click', ev => {
  const b = ev.target.closest('[data-accion]');
  if (!b || !b.dataset.bloque) return;
  if (b.dataset.accion === 'revelar') paso(b.dataset.bloque, 1);
  if (b.dataset.accion === 'atras') paso(b.dataset.bloque, -1);
});

/* después de poner en la página los bloques: cada uno en su estado 0 */
Pizarra.inicia = () => {
  Object.keys(BLOQUES).forEach(k => {
    if (!document.getElementById('trabajo-' + k)) return;
    pintaDerecha(k, false);
    actualizaNav(k);
  });
};

/* ═══════════════════════════════════════════════════════════════
   El armado de una unidad
   Pizarra.unidad({ TEMAS, DESAFIO, PREGUNTA_INICIAL, UNIDAD, LABS,
                    grado:'7mo', temasLibro:7 })
   La página tiene #temas, #nav y, en la introducción, #recorrido.
   Un tema es { n, corto, titulo, pag, ficha?, concepto, ejemplos,
   taller?, preguntas, notas }. Un puente (un bloque que no está en el
   libro) lleva puente:true, un id propio y entre:'el tema 3 y el 4'.
   ═══════════════════════════════════════════════════════════════ */
function caja(c){
  const cont = c.ec ? M(c.ec) : c.html ? c.html : `<span class="caja-txt">${c.txt}</span>`;
  return `<div class="caja"><span class="caja-rot">${c.rot}</span>${cont}</div>`;
}

Pizarra.unidad = cfg => {
  const { TEMAS, DESAFIO, PREGUNTA_INICIAL, UNIDAD, LABS = {}, grado, temasLibro = TEMAS.length } = cfg;
  const idT = t => t.id || String(t.n);
  const etiqueta = t => t.puente ? 'Puente' : `Tema ${t.n}`;

  document.getElementById('temas').innerHTML = TEMAS.map(t => {
    const c = t.concepto;
    const total = t.ejemplos.length;
    return `
<article class="tema${t.puente ? ' puente' : ''}" id="tema${idT(t)}" data-tema="${idT(t)}">
  <section class="concepto" id="t${idT(t)}">
    <p class="cinta">${t.puente ? `<b>Puente entre ${t.entre}</b> · no está en el libro` : `<b>Tema ${t.n} de ${temasLibro}</b> · ${t.pag}`}</p>
    <div class="caso-cab">
      <div class="numero">${t.puente ? '→' : t.n}</div>
      <div class="caso-tit"><h3>${t.titulo}</h3></div>
    </div>
    ${c.forma ? `<div class="forma"><span class="rotulo">${c.formaRot}</span>${M(c.forma)}</div>` : ''}
    ${c.formaTxt ? `<div class="forma"><span class="rotulo">la idea</span><span class="forma-txt">${c.formaTxt}</span></div>` : ''}
    ${c.serie ? `<div class="serie">${c.serie.map(caja).join('')}</div>` : ''}
    ${c.figura ? `<div class="concepto-figura">${c.figura}</div>` : ''}
    <ul class="puntos">${c.puntos.map(p => `<li>${p}</li>`).join('')}</ul>
  </section>

  <div class="ejemplos">
    ${t.ejemplos.map((ej, i) => bloque(`${idT(t)}-${i + 1}`, ej, {
        rotulo:`Ejemplo ${i + 1}.`,
        cinta:`<b>${etiqueta(t)}</b> · ${t.corto} · ejemplo ${i + 1} de ${total}` })).join('')}
  </div>

  ${t.taller ? [].concat(t.taller).map(lab => `<section class="taller-diapo">
    <p class="cinta"><b>${etiqueta(t)}</b> · ${t.corto} · taller</p>
    ${LABS[lab]}
  </section>`).join('') : ''}

  ${t.ficha ? `<p class="ficha-link">Para practicar:
    <a href="../../fichas/pdf/${grado}/Ficha_${String(t.ficha).padStart(2, '0')}.pdf">Ficha ${t.ficha}</a></p>` : ''}
</article>`;
  }).join('') + (DESAFIO ? bloque('desafio', DESAFIO, {
      cinta:'<b>Desafío final</b> · toda la unidad junta', clase:'desafio', id:'desafio',
      attrs:'data-tema="desafio"' }) : '');

  /* la pregunta de arranque, en la introducción */
  const recorrido = document.getElementById('recorrido');
  if (PREGUNTA_INICIAL){
    recorrido.insertAdjacentHTML('beforebegin',
      bloque('inicial', { titulo:'Para arrancar', ...PREGUNTA_INICIAL }, { clase:'arranque', id:'arranque' }));
  }

  /* el recorrido de la unidad y el navegador */
  recorrido.innerHTML = TEMAS.map(t =>
    `<a href="#t${idT(t)}"><span class="n">${etiqueta(t)}</span><span class="t">${t.corto}</span></a>`).join('');
  document.getElementById('nav').innerHTML =
    TEMAS.map(t => `<a class="chip" href="#t${idT(t)}">${t.puente ? String(t.n).replace('→', ' → ') : t.n + '.'} ${t.corto}</a>`).join('') +
    (DESAFIO ? '<a class="chip" href="#desafio">Desafío</a>' : '');

  /* las notas y el observador viven en los botones flotantes de assets/clase.js */
  window.CLASE = { secciones: [
    { id:'unidad', titulo:'La unidad', notas:UNIDAD.notas, preguntas:UNIDAD.preguntas },
    ...TEMAS.map(t => ({ id:idT(t), titulo:t.puente ? `Puente · ${t.titulo.toLowerCase()}` : `Tema ${t.n} · ${t.corto}`,
                          notas:t.notas, preguntas:t.preguntas })),
    ...(DESAFIO ? [{ id:'desafio', titulo:'Desafío final', notas:DESAFIO.notas, preguntas:DESAFIO.preguntas }] : []),
  ]};

  Pizarra.inicia();
};
