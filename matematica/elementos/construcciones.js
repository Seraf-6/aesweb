/* ═══════════════════════════════════════════════════════════════
   Construcciones con regla y compás, paso a paso
   La figura de una demostración se arma con «Siguiente», como en el
   pizarrón: lo que hace cada paso aparece haciéndose, con su herramienta.

     const c = new Construccion(svg, datos);
     c.ir(k, animar)   muestra los k primeros pasos; si animar, el último
                       se dibuja haciéndose

   datos = { vb, puntos:{ A:[x,y], … }, rotulos:{ A:[dx,dy], … },
             pasos:[ [accion, …], … ] }   (un arreglo de acciones por paso)

   Las acciones, y cómo aparecen:
     { t:'punto', p:'A' }                 el punto se marca
     { t:'segmento', a:'A', b:'B' }       la regla se apoya y el lápiz traza
     { t:'circulo', c:'A', por:'B' }      el compás se abre de A a B, gira
                                          una vuelta entera y se retira
       con aux:true, la circunferencia es una ayuda de una proposición
       anterior: se traza tenue y rápido, y solo se ve en su paso
   Cualquier acción puede ser una ayuda (aux): se dibuja tenue y no queda.
   Con aux:true se ve solo en su paso; con aux:N (un número de paso), se ve
   hasta el paso N inclusive. Así se muestran los pasos de una proposición
   anterior (la construcción de la I.2 dentro de la I.3) y después se borran.
   Con hasta:N, la acción se dibuja normal pero deja de verse después del
   paso N: lo que era parte de una suposición que resultó imposible (el
   punto D de la proposición 6).
   Un segmento con sinRegla:true aparece sin la regla: es lo que queda de
   una construcción que ya estaba hecha.
     { t:'prolonga', desde:'D', por:'A', largo:170 }
                                          la regla se apoya en DA y el lápiz
                                          sigue de A hasta largo desde D
     { t:'destaca', a:'A', b:'L' }        la respuesta: el segmento queda
                                          marcado en rojo
     { t:'copia', de:['C','C2'], a:'A', hacia:'D' }
                                          lo que hace la proposición 2: un
                                          fantasma del segmento dado viaja
                                          hasta A y queda como el segmento AD
     { t:'angulo', v:'A', a:'B', b:'C', color:1 }
                                          el ángulo BAC marcado con un arco y
                                          su cuña pintada: los ángulos iguales
                                          llevan el mismo color (1 a 4) y el
                                          mismo radio. Nada de arcos dobles o
                                          triples: Juan los encontró confusos, y
                                          los triples se ven más grandes. r:30
                                          aleja el arco del vértice, cuando en
                                          un mismo punto hay un ángulo adentro
                                          de otro; cuna:false deja solo el arco,
                                          para el ángulo entero cuando sus partes
                                          van pintadas adentro; recto:true dibuja
                                          la escuadrita del ángulo recto
     { t:'mueve', pts:['A','B','C'], hacia:['D','E','F'], fase:'traslada' }
                                          una copia del triángulo ABC se
                                          desliza hasta poner A sobre D; con
                                          fase:'gira', después gira alrededor
                                          de D hasta caer sobre DEF (la
                                          superposición de la proposición 4)
     { t:'curva', a:'E', b:'F', comba:28 } una línea curva de E a F, tachada:
                                          lo que no puede pasar
   En { t:'igual' }, rayas:2 o 3 pone dos o tres rayitas, para distinguir
   pares de iguales distintos en la misma figura.
   Un rótulo [dx, dy, 'C'] pone otra letra que la del nombre: cuando una
   demostración tiene dos casos con dos figuras (la proposición 7), el C del
   segundo caso es el punto C2 de los datos.
   En { t:'igual' }, supuesto:true marca una igualdad que se supone en una
   demostración por el absurdo: la figura no puede cumplirla, y el
   verificador no la mide.
   Un punto cuyo rótulo es null no lleva letra (el otro extremo de un
   segmento que Euclides nombra con una sola letra, como «la recta C»).
     { t:'igual', seg:[['A','C'], …] }    los segmentos se resaltan mientras
                                          el paso es el actual, y quedan con
                                          su rayita de iguales; con
                                          marca:false, solo se resaltan (para
                                          igualdades de paso, que no son la
                                          respuesta: las rayitas se mezclarían)
     { t:'relleno', pts:['A','B','C'] }   la figura se pinta; con tono:2, de
                                          otro color (dos triángulos a comparar)

   Lo que ya estaba no se mueve: solo se anima lo del paso nuevo. Con
   «reducir movimiento» en el sistema, nada se anima. Si se aprieta otra
   vez antes de que termine, la animación se corta y queda el dibujo final.
   ═══════════════════════════════════════════════════════════════ */
(function(){
'use strict';
const NS = 'http://www.w3.org/2000/svg';
const quieto = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
const f = v => +v.toFixed(2);
function el(tag, attrs, padre){
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (padre) padre.appendChild(e);
  return e;
}
/* una animación: llama a paso(t) con t de 0 a 1 durante ms. Cada cuadro se
   pide al navegador y, de respaldo, a un reloj: con la ventana tapada el
   navegador deja de dar cuadros, y la figura quedaba a medio hacer. Lo que
   llegue primero dibuja; el otro se cancela. */
function anima(ms, paso, vivo){
  return new Promise(listo => {
    const t0 = performance.now();
    let raf = 0, reloj = 0, hecho = false;
    function cuadro(){
      if (hecho) return;
      cancelAnimationFrame(raf); clearTimeout(reloj);
      if (!vivo()){ hecho = true; return listo(false); }
      const t = Math.min(1, (performance.now() - t0) / ms);
      paso(t);
      if (t >= 1){ hecho = true; return listo(true); }
      raf = requestAnimationFrame(cuadro);
      reloj = setTimeout(cuadro, 80);
    }
    cuadro();
  });
}
const suave = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const espera = (ms, vivo) => new Promise(r => setTimeout(() => r(vivo()), ms));

/* el arco de centro c y radio r, de a0 a a1 (radianes, en la pantalla) */
function arco(c, r, a0, a1){
  const p = a => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  const d = a1 - a0;
  return `M ${f(x0)} ${f(y0)} A ${f(r)} ${f(r)} 0 ${Math.abs(d) > Math.PI ? 1 : 0} ${d > 0 ? 1 : 0} ${f(x1)} ${f(y1)}`;
}

class Construccion {
  constructor(svg, datos){
    this.svg = svg; this.d = datos; this.P = datos.puntos;
    this.k = 0; this.version = 0;
    svg.setAttribute('viewBox', datos.vb);
    this.capas = {};
    ['fondo', 'trazos', 'resaltes', 'marcas', 'puntos', 'herramientas'].forEach(n => this.capas[n] = el('g', { class:`c-${n}` }, svg));
  }
  limpia(){ Object.values(this.capas).forEach(g => { g.textContent = ''; }); this.marcados = new Set(); }

  /* una ayuda se ve en su paso (aux:true) o hasta el paso aux (un número) */
  seVe(a, i){
    if (a.hasta !== undefined && i !== undefined && this.k > a.hasta) return false;
    if (a.aux === undefined || i === undefined) return true;
    return a.aux === true ? i === this.k - 1 : this.k <= a.aux;
  }

  /* ── el dibujo quieto de una acción (i: el paso al que pertenece) ── */
  pone(a, actual, i){
    const P = this.P, C = this.capas;
    if (!this.seVe(a, i)) return null;
    const aux = a.aux !== undefined ? ' c-auxlinea' : '';
    if (a.t === 'punto'){
      const [x, y] = P[a.p], rot = (this.d.rotulos || {})[a.p];
      const g = el('g', { class:'c-punto' + (aux ? ' c-auxpunto' : '') }, C.puntos);
      el('circle', { cx:x, cy:y, r:4.5 }, g);
      if (rot !== null){
        const [dx, dy, letra] = rot || [12, -12];
        el('text', { x:f(x + dx), y:f(y + dy), 'text-anchor':'middle', 'dominant-baseline':'middle' }, g).textContent = letra || a.p;
      }
      return g;
    }
    if (a.t === 'segmento'){
      const [x1, y1] = P[a.a], [x2, y2] = P[a.b];
      return el('line', { class:'c-seg' + aux, x1, y1, x2, y2 }, C.trazos);
    }
    if (a.t === 'circulo'){
      const c = P[a.c];
      return el('circle', { class:a.aux ? 'c-circ c-aux' : 'c-circ', cx:c[0], cy:c[1], r:f(dist(c, P[a.por])) }, C.trazos);
    }
    if (a.t === 'prolonga'){
      const [q, r] = this.prolongacion(a);
      return el('line', { class:'c-seg c-prol' + aux, x1:f(q[0]), y1:f(q[1]), x2:f(r[0]), y2:f(r[1]) }, C.trazos);
    }
    if (a.t === 'copia'){
      const [x1, y1] = P[a.a], [x2, y2] = P[a.hacia];
      return el('line', { class:'c-seg' + aux, x1, y1, x2, y2 }, C.trazos);
    }
    if (a.t === 'destaca'){
      const [x1, y1] = P[a.a], [x2, y2] = P[a.b];
      return el('line', { class:'c-destaca', x1, y1, x2, y2 }, C.resaltes);
    }
    if (a.t === 'igual'){
      const hechos = [];
      a.seg.forEach(([m, n]) => {
        const p = P[m], q = P[n], clave = [m, n].sort().join('');
        if (actual) hechos.push(el('line', { class:'c-resalta', x1:p[0], y1:p[1], x2:q[0], y2:q[1] }, C.resaltes));
        if (a.marca === false || this.marcados.has(clave)) return;
        this.marcados.add(clave);
        const L = dist(p, q), u = [(q[0] - p[0]) / L, (q[1] - p[1]) / L];
        const nr = a.rayas || 1;
        for (let j = 0; j < nr; j++){
          const o = (j - (nr - 1) / 2) * 6, mx = (p[0] + q[0]) / 2 + u[0] * o, my = (p[1] + q[1]) / 2 + u[1] * o;
          hechos.push(el('line', { class:'c-raya', x1:f(mx - u[1] * 8), y1:f(my + u[0] * 8), x2:f(mx + u[1] * 8), y2:f(my - u[0] * 8) }, C.marcas));
        }
      });
      return hechos;
    }
    if (a.t === 'angulo'){
      const v = P[a.v], a1 = Math.atan2(P[a.a][1] - v[1], P[a.a][0] - v[0]), a2 = Math.atan2(P[a.b][1] - v[1], P[a.b][0] - v[0]);
      let d = a2 - a1;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      const g = el('g', { class:`c-ang c-ang${a.color || 1}` }, C.marcas), r = a.r || 22, borde = arco(v, r, a1, a1 + d);
      if (a.recto){       // la escuadrita del ángulo recto, como en las diapositivas
        const t = r * .7, p1 = [v[0] + t * Math.cos(a1), v[1] + t * Math.sin(a1)], p3 = [v[0] + t * Math.cos(a1 + d), v[1] + t * Math.sin(a1 + d)];
        const p2 = [p1[0] + p3[0] - v[0], p1[1] + p3[1] - v[1]], q = x => x.map(f).join(' ');
        el('path', { class:'c-cuna', d:`M ${q(v)} L ${q(p1)} L ${q(p2)} L ${q(p3)} Z` }, g);
        el('path', { class:'c-arco', d:`M ${q(p1)} L ${q(p2)} L ${q(p3)}` }, g);
        return g;
      }
      if (a.cuna !== false) el('path', { class:'c-cuna', d:`M ${f(v[0])} ${f(v[1])} L${borde.slice(1)} Z` }, g);
      el('path', { class:'c-arco', d:borde }, g);
      return g;
    }
    if (a.t === 'mueve'){
      return el('polygon', { class:'c-copia', points:this.mueve(a, 1).map(q => q.map(f).join(',')).join(' ') }, C.resaltes);
    }
    if (a.t === 'curva'){
      const p = P[a.a], q = P[a.b], L = dist(p, q), n = [(q[1] - p[1]) / L, -(q[0] - p[0]) / L];
      const c = [(p[0] + q[0]) / 2 + n[0] * a.comba * 2, (p[1] + q[1]) / 2 + n[1] * a.comba * 2];
      const t = [(p[0] + q[0]) / 2 + n[0] * a.comba, (p[1] + q[1]) / 2 + n[1] * a.comba];
      const g = el('g', { class:'c-curva' }, C.resaltes);
      el('path', { d:`M ${f(p[0])} ${f(p[1])} Q ${f(c[0])} ${f(c[1])} ${f(q[0])} ${f(q[1])}` }, g);
      el('path', { class:'c-tacha', d:`M ${f(t[0] - 9)} ${f(t[1] - 9)} L ${f(t[0] + 9)} ${f(t[1] + 9)} M ${f(t[0] + 9)} ${f(t[1] - 9)} L ${f(t[0] - 9)} ${f(t[1] + 9)}` }, g);
      return g;
    }
    if (a.t === 'relleno'){
      return el('polygon', { class:a.tono === 2 ? 'c-relleno c-relleno2' : 'c-relleno', points:a.pts.map(n => P[n].join(',')).join(' ') }, C.fondo);
    }
  }

  /* dónde está la copia que se mueve, con s de 0 a 1 dentro de su fase.
     La copia se desliza (A va hacia D) y después gira alrededor de D, sin
     deformarse, hasta que AB queda sobre DE. */
  mueve(a, s){
    const P = this.P, [A, B] = a.pts.map(n => P[n]), [D, E] = a.hacia.map(n => P[n]);
    let th = Math.atan2(E[1] - D[1], E[0] - D[0]) - Math.atan2(B[1] - A[1], B[0] - A[0]);
    while (th > Math.PI) th -= 2 * Math.PI;
    while (th < -Math.PI) th += 2 * Math.PI;
    const tr = a.fase === 'traslada' ? s : 1, rot = a.fase === 'traslada' ? 0 : s;
    const c = Math.cos(th * rot), sn = Math.sin(th * rot);
    const O = [A[0] + (D[0] - A[0]) * tr, A[1] + (D[1] - A[1]) * tr];
    return a.pts.map(n => { const x = P[n][0] - A[0], y = P[n][1] - A[1]; return [O[0] + x * c - y * sn, O[1] + x * sn + y * c]; });
  }

  /* de dónde a dónde va una prolongación: de «por» hasta «largo» desde «desde» */
  prolongacion(a){
    const d = this.P[a.desde], q = this.P[a.por], L = dist(d, q);
    return [q, [d[0] + (q[0] - d[0]) / L * a.largo, d[1] + (q[1] - d[1]) / L * a.largo]];
  }

  /* ── las herramientas ── */
  compas(){
    const g = el('g', { class:'c-compas', opacity:0 }, this.capas.herramientas);
    return { g, aguja:el('line', { class:'c-pata' }, g), lapiz:el('line', { class:'c-pata' }, g),
             punta:el('circle', { class:'c-mina', r:3.2 }, g), eje:el('circle', { class:'c-eje', r:5 }, g),
             mango:el('line', { class:'c-mango' }, g) };
  }
  ubicaCompas(k, N, Pp){
    const L = dist(N, Pp) || 1, u = [(Pp[0] - N[0]) / L, (Pp[1] - N[1]) / L];
    const h = Math.max(34, Math.min(80, .6 * L)), n = [u[1], -u[0]];   // la bisagra, a un costado
    const H = [(N[0] + Pp[0]) / 2 + n[0] * h, (N[1] + Pp[1]) / 2 + n[1] * h];
    const set = (e, a, b) => { e.setAttribute('x1', f(a[0])); e.setAttribute('y1', f(a[1])); e.setAttribute('x2', f(b[0])); e.setAttribute('y2', f(b[1])); };
    set(k.aguja, H, N); set(k.lapiz, H, Pp);
    set(k.mango, H, [H[0] + n[0] * 16, H[1] + n[1] * 16]);
    k.eje.setAttribute('cx', f(H[0])); k.eje.setAttribute('cy', f(H[1]));
    k.punta.setAttribute('cx', f(Pp[0])); k.punta.setAttribute('cy', f(Pp[1]));
  }
  regla(p, q){
    const L = dist(p, q), ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI;
    const g = el('g', { class:'c-regla', opacity:0, transform:`translate(${f(p[0])} ${f(p[1])}) rotate(${f(ang)})` }, this.capas.herramientas);
    el('rect', { x:-24, y:4, width:f(L + 48), height:18, rx:2 }, g);
    for (let x = -16; x < L + 24; x += 12) el('line', { class:'c-regla-raya', x1:f(x), y1:4, x2:f(x), y2:x % 36 === 8 ? 12 : 9 }, g);
    return g;
  }

  /* ── una acción, haciéndose ── */
  async hace(a, vivo){
    const P = this.P;
    if (a.t === 'punto'){
      const g = this.pone(a); g.classList.add('c-aparece');
      return espera(this.k === 1 ? 180 : 380, vivo);
    }
    if (a.t === 'segmento' && a.sinRegla){
      this.pone(a).classList.add('c-aparece-suave');
      return espera(160, vivo);
    }
    if (a.t === 'segmento' || a.t === 'prolonga'){
      const [p, q] = a.t === 'segmento' ? [P[a.a], P[a.b]] : this.prolongacion(a), L = dist(p, q);
      const r = a.t === 'segmento' ? this.regla(p, q) : this.regla(P[a.desde], q);
      if (!await anima(220, t => r.setAttribute('opacity', t), vivo)) return false;
      const lin = this.pone(a);
      lin.style.strokeDasharray = `${f(L)}`; lin.style.strokeDashoffset = `${f(L)}`;
      const lapiz = el('circle', { class:'c-mina', r:3.2 }, this.capas.herramientas);
      const ok = await anima(Math.max(450, L * 4.5), t => {
        const s = suave(t);
        lin.style.strokeDashoffset = `${f(L * (1 - s))}`;
        lapiz.setAttribute('cx', f(p[0] + (q[0] - p[0]) * s)); lapiz.setAttribute('cy', f(p[1] + (q[1] - p[1]) * s));
      }, vivo);
      lin.style.strokeDasharray = ''; lin.style.strokeDashoffset = '';
      lapiz.remove();
      if (!ok) return false;
      return anima(220, t => r.setAttribute('opacity', 1 - t), vivo).then(v => { r.remove(); return v; });
    }
    if (a.t === 'circulo'){
      const c = P[a.c], por = P[a.por], R = dist(c, por), a0 = Math.atan2(por[1] - c[1], por[0] - c[0]);
      const k = this.compas();
      this.ubicaCompas(k, c, por);
      // primero se ve el compás abierto de A a B: la abertura es el radio
      if (!await anima(a.aux === true ? 150 : 260, t => k.g.setAttribute('opacity', a.aux === true ? .6 * t : t), vivo)) return false;
      if (!await espera(a.aux === true ? 150 : 450, vivo)) return false;
      const traza = el('path', { class:a.aux ? 'c-circ c-aux' : 'c-circ' }, this.capas.trazos);
      const ok = await anima(a.aux === true ? 800 : 1700, t => {
        const a1 = a0 - 2 * Math.PI * suave(t);   // contra el reloj, como en el transportador
        if (t < 1) traza.setAttribute('d', arco(c, R, a0, a1));
        this.ubicaCompas(k, c, [c[0] + R * Math.cos(a1), c[1] + R * Math.sin(a1)]);
      }, vivo);
      traza.remove();
      if (!ok) { k.g.remove(); return false; }
      this.pone(a, true);
      return anima(260, t => k.g.setAttribute('opacity', 1 - t), vivo).then(v => { k.g.remove(); return v; });
    }
    if (a.t === 'copia'){
      // el segmento dado viaja: su punta va de un extremo a A y gira hasta
      // apuntar a D, sin cambiar de largo
      const [p0, p1] = a.de.map(n => P[n]), q0 = P[a.a], q1 = P[a.hacia];
      const L = dist(p0, p1), ang0 = Math.atan2(p1[1] - p0[1], p1[0] - p0[0]);
      let dAng = Math.atan2(q1[1] - q0[1], q1[0] - q0[0]) - ang0;
      while (dAng > Math.PI) dAng -= 2 * Math.PI;
      while (dAng < -Math.PI) dAng += 2 * Math.PI;
      const fan = el('line', { class:'c-fantasma' }, this.capas.herramientas);
      const ok = await anima(1300, t => {
        const s = suave(t), o = [p0[0] + (q0[0] - p0[0]) * s, p0[1] + (q0[1] - p0[1]) * s], an = ang0 + dAng * s;
        fan.setAttribute('x1', f(o[0])); fan.setAttribute('y1', f(o[1]));
        fan.setAttribute('x2', f(o[0] + L * Math.cos(an))); fan.setAttribute('y2', f(o[1] + L * Math.sin(an)));
      }, vivo);
      fan.remove();
      if (!ok) return false;
      this.pone(a).classList.add('c-aparece-suave');
      return espera(300, vivo);
    }
    if (a.t === 'igual'){
      [].concat(this.pone(a, true)).forEach(e => e.classList.add('c-aparece-suave'));
      return espera(500, vivo);
    }
    if (a.t === 'relleno' || a.t === 'destaca'){
      this.pone(a).classList.add('c-aparece-suave');
      return espera(500, vivo);
    }
    if (a.t === 'angulo'){
      this.pone(a).classList.add('c-aparece-suave');
      return espera(250, vivo);
    }
    if (a.t === 'curva'){
      this.pone(a).classList.add('c-aparece-suave');
      return espera(900, vivo);
    }
    if (a.t === 'mueve'){
      const pol = this.pone(a);
      const ok = await anima(a.fase === 'traslada' ? 1400 : 1600,
        t => pol.setAttribute('points', this.mueve(a, suave(t)).map(q => q.map(f).join(',')).join(' ')), vivo);
      return ok && espera(250, vivo);
    }
  }

  async ir(k, animar){
    const v = ++this.version, vivo = () => v === this.version;
    const pasos = this.d.pasos;
    k = Math.max(0, Math.min(pasos.length, k));
    const conAnimacion = animar && !quieto() && k > 0;
    this.limpia();
    this.k = k;
    const hasta = conAnimacion ? k - 1 : k;
    for (let i = 0; i < hasta; i++) pasos[i].forEach(a => this.pone(a, i === k - 1, i));
    if (!conAnimacion) return;
    for (const a of pasos[k - 1]){
      if (!await this.hace(a, vivo)) return;
      if (!await espera(k === 1 ? 0 : 120, vivo)) return;
    }
  }
}
window.Construccion = Construccion;
})();
