/* ════════════════════════════════════════════════════════════════
   MOTOR EXACTO · aritmética racional para el Tercer Ciclo

   Todo con BigInt: nunca un float. 0.1 + 0.2 no da 0.3 y una prueba
   de matemática no se puede permitir eso.

   Cubre exactamente lo que se da en 7.º, 8.º y 9.º:
   ecuaciones lineales y cuadráticas con coeficientes racionales,
   discriminante, vértice, suma y producto de raíces, y verificación
   de factorizaciones por expansión. Nada más — no es un CAS general
   y no pretende serlo.

   La regla de la casa vale igual acá: la respuesta se verifica por un
   camino distinto del que la produjo. Resolver usa la fórmula; la
   verificación sustituye la raíz en la expresión TAL COMO ESTÁ ESCRITA
   y comprueba que los dos miembros den lo mismo. Para raíces
   irracionales la sustitución se hace en Q(√k), también exacta.
   ════════════════════════════════════════════════════════════════ */

// ── fracciones exactas ──────────────────────────────────────────
function mcd(a, b) {
  a = a < 0n ? -a : a; b = b < 0n ? -b : b;
  while (b) { const t = a % b; a = b; b = t; }
  return a;
}

class F {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('división por cero');
    if (d < 0n) { n = -n; d = -d; }
    const g = mcd(n, d) || 1n;
    this.n = n / g; this.d = d / g;
  }
  static de(x) { return x instanceof F ? x : new F(x); }
  add(o) { return new F(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new F(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new F(this.n * o.n, this.d * o.d); }
  div(o) {
    if (o.n === 0n) throw new Error('división por cero');
    return new F(this.n * o.d, this.d * o.n);
  }
  neg() { return new F(-this.n, this.d); }
  esCero() { return this.n === 0n; }
  esEntero() { return this.d === 1n; }
  igual(o) { return this.n === o.n && this.d === o.d; }
  signo() { return this.n < 0n ? -1 : this.n > 0n ? 1 : 0; }
  toString() { return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`; }
}
const F0 = new F(0n), F1 = new F(1n);

// ── raíz entera y parte libre de cuadrados ──────────────────────
function raizEntera(n) {
  if (n < 2n) return n;
  let x = n, y = (x + 1n) / 2n;
  while (y < x) { x = y; y = (x + n / x) / 2n; }
  return x;
}

/** N = f² · k con k libre de cuadrados. Devuelve [f, k]. */
function sacaCuadrados(N) {
  let f = 1n, k = N;
  for (let i = 2n; i * i <= k; i++) {
    while (k % (i * i) === 0n) { k /= i * i; f *= i; }
    if (i > 100000n) break;          // los discriminantes del ciclo son chicos
  }
  return [f, k];
}

// ── Q(√k): a + b√k, exacto ──────────────────────────────────────
// Sustituir una raíz irracional en la ecuación impresa cae acá, y la
// comparación sigue siendo exacta.
class S {
  constructor(a, b = F0, k = 0n) {
    this.a = a; this.b = b.esCero() ? F0 : b; this.k = b.esCero() ? 0n : k;
  }
  static de(x) { return x instanceof S ? x : new S(F.de(x)); }
  static mismoK(p, q) {
    if (p.k === 0n || q.k === 0n || p.k === q.k) return p.k || q.k;
    throw new Error('dos radicales distintos en la misma cuenta');
  }
  add(o) { const k = S.mismoK(this, o); return new S(this.a.add(o.a), this.b.add(o.b), k); }
  sub(o) { const k = S.mismoK(this, o); return new S(this.a.sub(o.a), this.b.sub(o.b), k); }
  neg() { return new S(this.a.neg(), this.b.neg(), this.k); }
  mul(o) {
    const k = S.mismoK(this, o);
    return new S(this.a.mul(o.a).add(this.b.mul(o.b).mul(new F(k))),
                 this.a.mul(o.b).add(this.b.mul(o.a)), k);
  }
  div(o) {
    if (!o.b.esCero()) {                       // racionalizar el denominador
      const conj = new S(o.a, o.b.neg(), o.k);
      return this.mul(conj).div(o.mul(conj));
    }
    return new S(this.a.div(o.a), this.b.div(o.a), this.k);
  }
  pot(e) { let r = S.de(F1); for (let i = 0; i < e; i++) r = r.mul(this); return r; }
  esCero() { return this.a.esCero() && this.b.esCero(); }
  igual(o) { return this.sub(o).esCero(); }
  esRacional() { return this.b.esCero(); }
  toString() {
    if (this.esRacional()) return this.a.toString();
    const neg = this.b.signo() < 0, abs = neg ? this.b.neg() : this.b;
    const coef = abs.igual(F1) ? `√${this.k}` : `${abs}√${this.k}`;
    if (this.a.esCero()) return (neg ? '-' : '') + coef;
    return `${this.a} ${neg ? '-' : '+'} ${coef}`;
  }
  tex() {
    if (this.esRacional()) return texF(this.a);
    const r = `\\sqrt{${this.k}}`;
    const coef = this.b.igual(F1) ? r
      : this.b.igual(F1.neg()) ? `-${r}`
      : this.b.esEntero() ? `${this.b}${r}`
      : `\\dfrac{${this.b.n}${r}}{${this.b.d}}`;
    if (this.a.esCero()) return coef;
    const signo = this.b.signo() < 0 ? '' : '+';
    return `${texF(this.a)} ${signo} ${coef}`.replace('+ -', '- ');
  }
}

function texF(f) {
  if (f.esEntero()) return conMiles(f.n);
  return f.n < 0n ? `-\\dfrac{${-f.n}}{${f.d}}` : `\\dfrac{${f.n}}{${f.d}}`;
}
function conMiles(n) {
  const s = String(n < 0n ? -n : n);
  const sep = s.length > 4 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : s;
  return (n < 0n ? '-' : '') + sep;
}

// ── analizador: del texto que escribe Juan al árbol ─────────────
// Sintaxis tal como la escribiría cualquiera: 3x, 2(x-1), (x-3)/4,
// x^2, corchetes y llaves como agrupadores.
const CIERRA = { '(': ')', '[': ']', '{': '}' };

function tokenizar(src) {
  const t = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      const txt = src.slice(i, j);
      if ((txt.match(/\./g) || []).length > 1) throw new Error(`número raro: ${txt}`);
      t.push({ t: 'num', v: txt }); i = j; continue;
    }
    if (/[a-zA-Z]/.test(c)) { t.push({ t: 'var', v: c }); i++; continue; }
    if ('+-*/^=()[]{}'.includes(c)) { t.push({ t: c }); i++; continue; }
    if (c === '·') { t.push({ t: '*' }); i++; continue; }
    if (c === '−') { t.push({ t: '-' }); i++; continue; }
    throw new Error(`no entiendo el símbolo «${c}»`);
  }
  return t;
}

/** Decimal a fracción exacta: "2.5" → 5/2. Nunca pasa por float. */
function numAF(txt) {
  const p = txt.split('.');
  if (p.length === 1) return new F(BigInt(p[0]));
  const dec = p[1];
  return new F(BigInt(p[0] + dec), 10n ** BigInt(dec.length));
}

function analizar(src) {
  const t = tokenizar(src);
  let i = 0;
  const mira = () => t[i];
  const come = (tipo) => {
    if (!t[i] || t[i].t !== tipo) throw new Error(`falta «${tipo}»`);
    return t[i++];
  };

  function expr() {
    let a = termino();
    while (mira() && (mira().t === '+' || mira().t === '-')) {
      const op = t[i++].t;
      a = { t: op, a, b: termino() };
    }
    return a;
  }
  function termino() {
    let a = potencia();
    for (;;) {
      const m = mira();
      if (!m) break;
      if (m.t === '*' || m.t === '/') { i++; a = { t: m.t, a, b: potencia() }; continue; }
      // multiplicación implícita: 3x · 2(x+1) · x(x+1) · (x+1)(x-1)
      if (m.t === 'num' || m.t === 'var' || m.t === '(' || m.t === '[' || m.t === '{') {
        a = { t: '*', a, b: potencia(), impl: true }; continue;
      }
      break;
    }
    return a;
  }
  function potencia() {
    // El signo tiene que quedar AFUERA del exponente: «-x^2» es «-(x^2)»,
    // no «(-x)^2». Por eso el menos se toma acá y no en un nivel más
    // profundo que el ^, que es lo que lo rompía.
    if (mira() && mira().t === '-') { i++; return { t: 'neg', a: potencia() }; }
    if (mira() && mira().t === '+') { i++; return potencia(); }
    const a = atomo();
    if (mira() && mira().t === '^') { i++; return { t: '^', a, b: potencia() }; }
    return a;
  }
  function atomo() {
    const m = mira();
    if (!m) throw new Error('la expresión queda cortada');
    if (m.t === 'num') { i++; return { t: 'num', v: numAF(m.v) }; }
    if (m.t === 'var') { i++; return { t: 'var', v: m.v }; }
    if (m.t === '(' || m.t === '[' || m.t === '{') {
      const ab = m.t; i++;
      const dentro = expr();
      come(CIERRA[ab]);
      return { t: 'par', a: dentro, k: ab };
    }
    throw new Error(`no esperaba «${m.t}» acá`);
  }

  const izq = expr();
  if (mira() && mira().t === '=') {
    i++;
    const der = expr();
    if (i < t.length) throw new Error('sobra texto al final');
    return { t: 'eq', a: izq, b: der };
  }
  if (i < t.length) throw new Error('sobra texto al final');
  return izq;
}

// ── polinomios multivariados con coeficientes racionales ────────
// Un polinomio es un Map clave→{c, m}: m es {x:2, y:1}, la clave su
// forma canónica. Alcanza para expandir y comparar, que es todo lo
// que necesitamos.
function claveMon(m) {
  return Object.keys(m).filter(v => m[v] > 0).sort()
    .map(v => (m[v] === 1 ? v : `${v}^${m[v]}`)).join('*');
}
const P = {
  cero: () => new Map(),
  cte: (f) => (f.esCero() ? new Map() : new Map([['', { c: f, m: {} }]])),
  vari: (v) => new Map([[v, { c: F1, m: { [v]: 1 } }]]),
  add(p, q) {
    const r = new Map(p);
    for (const [k, t] of q) {
      const a = r.get(k);
      if (!a) r.set(k, { c: t.c, m: t.m });
      else { const c = a.c.add(t.c); c.esCero() ? r.delete(k) : r.set(k, { c, m: t.m }); }
    }
    return r;
  },
  neg(p) {
    const r = new Map();
    for (const [k, t] of p) r.set(k, { c: t.c.neg(), m: t.m });
    return r;
  },
  sub(p, q) { return P.add(p, P.neg(q)); },
  mul(p, q) {
    let r = new Map();
    for (const [, a] of p) for (const [, b] of q) {
      const m = { ...a.m };
      for (const v in b.m) m[v] = (m[v] || 0) + b.m[v];
      const k = claveMon(m), c = a.c.mul(b.c);
      const vi = r.get(k);
      if (!vi) { if (!c.esCero()) r.set(k, { c, m }); }
      else { const s = vi.c.add(c); s.esCero() ? r.delete(k) : r.set(k, { c: s, m }); }
    }
    return r;
  },
  pot(p, e) { let r = P.cte(F1); for (let i = 0; i < e; i++) r = P.mul(r, p); return r; },
  esCte(p) { return [...p.keys()].every(k => k === ''); },
  valorCte(p) { return p.get('') ? p.get('').c : F0; },
  iguales(p, q) { return P.sub(p, q).size === 0; },
  variables(p) {
    const s = new Set();
    for (const [, t] of p) for (const v in t.m) if (t.m[v] > 0) s.add(v);
    return [...s].sort();
  },
  /** coeficientes [c0, c1, c2…] si el polinomio es de una sola variable */
  coefs(p, v) {
    const c = [];
    for (const [, t] of p) {
      const otras = Object.keys(t.m).filter(x => x !== v && t.m[x] > 0);
      if (otras.length) return null;
      const g = t.m[v] || 0;
      while (c.length <= g) c.push(F0);
      c[g] = c[g].add(t.c);
    }
    while (c.length && c[c.length - 1].esCero()) c.pop();
    return c;
  },
};

function aPoli(n) {
  switch (n.t) {
    case 'num': return P.cte(n.v);
    case 'var': return P.vari(n.v);
    case 'par': return aPoli(n.a);
    case 'neg': return P.neg(aPoli(n.a));
    case '+': return P.add(aPoli(n.a), aPoli(n.b));
    case '-': return P.sub(aPoli(n.a), aPoli(n.b));
    case '*': return P.mul(aPoli(n.a), aPoli(n.b));
    case '/': {
      const d = aPoli(n.b);
      if (!P.esCte(d)) throw new Error('solo se puede dividir por un número');
      const k = P.valorCte(d);
      if (k.esCero()) throw new Error('división por cero');
      return P.mul(aPoli(n.a), P.cte(F1.div(k)));
    }
    case '^': {
      const e = aPoli(n.b);
      if (!P.esCte(e) || !P.valorCte(e).esEntero() || P.valorCte(e).n < 0n)
        throw new Error('el exponente tiene que ser un entero mayor o igual que 0');
      return P.pot(aPoli(n.a), Number(P.valorCte(e).n));
    }
    case 'eq': throw new Error('acá no va una igualdad');
    default: throw new Error('expresión que no entiendo');
  }
}

// ── evaluación exacta en Q(√k) ──────────────────────────────────
function evaluar(n, env) {
  switch (n.t) {
    case 'num': return S.de(n.v);
    case 'var': {
      if (!(n.v in env)) throw new Error(`no sé cuánto vale ${n.v}`);
      return S.de(env[n.v]);
    }
    case 'par': return evaluar(n.a, env);
    case 'neg': return evaluar(n.a, env).neg();
    case '+': return evaluar(n.a, env).add(evaluar(n.b, env));
    case '-': return evaluar(n.a, env).sub(evaluar(n.b, env));
    case '*': return evaluar(n.a, env).mul(evaluar(n.b, env));
    case '/': return evaluar(n.a, env).div(evaluar(n.b, env));
    case '^': {
      const e = evaluar(n.b, env);
      if (!e.esRacional() || !e.a.esEntero() || e.a.n < 0n)
        throw new Error('exponente no entero');
      return evaluar(n.a, env).pot(Number(e.a.n));
    }
    default: throw new Error('no se puede evaluar');
  }
}

// ── del árbol al LaTeX, respetando lo que Juan escribió ─────────
// No se normaliza nada: si escribió 3(x-1) se imprime 3(x-1), no
// 3x-3. Lo que se verifica es literalmente lo que lee el alumno.
/** La barra de fracción ya agrupa: los paréntesis que envuelven todo el
    numerador o todo el denominador sobran al imprimir. */
const pelar = (n) => (n.t === 'par' && n.k === '(' ? n.a : n);

/** ¿El grupo necesita delimitadores que se estiren? Solo si adentro hay
    una fracción. Con `\left(...\right)` en todos lados, dos paréntesis
    seguidos —`(x+2)(x-5)`— salen separados por un hueco feo, porque TeX
    los trata como \mathinner. */
function hayFraccion(n) {
  if (!n || typeof n !== 'object') return false;
  if (n.t === '/') return true;
  return hayFraccion(n.a) || hayFraccion(n.b);
}

function tex(n) {
  switch (n.t) {
    case 'num': return texF(n.v);
    case 'var': return n.v;
    case 'par': {
      const d = tex(n.a);
      const [ab, ce] = n.k === '[' ? ['[', ']']
        : n.k === '{' ? ['\\{', '\\}'] : ['(', ')'];
      return hayFraccion(n.a) ? `\\left${ab}${d}\\right${ce}` : `${ab}${d}${ce}`;
    }
    case 'neg': return `-${tex(n.a)}`;
    case '+': return `${tex(n.a)} + ${tex(n.b)}`;
    case '-': return `${tex(n.a)} - ${tex(n.b)}`;
    case '*': return n.impl ? `${tex(n.a)}${tex(n.b)}` : `${tex(n.a)} \\cdot ${tex(n.b)}`;
    case '/': return `\\dfrac{${tex(pelar(n.a))}}{${tex(pelar(n.b))}}`;
    case '^': return `${tex(n.a)}^{${tex(n.b)}}`;
    case 'eq': return `${tex(n.a)} = ${tex(n.b)}`;
    default: return '?';
  }
}

// ── resolver ────────────────────────────────────────────────────
function raicesDeCoefs(c) {
  // c = [c0, c1, c2]; devuelve {grado, raices:[S], delta?}
  if (c.length === 0) return { grado: -1, raices: [], nota: 'identidad: se cumple siempre' };
  if (c.length === 1) return { grado: 0, raices: [], nota: 'no tiene solución' };
  if (c.length === 2) return { grado: 1, raices: [S.de(c[0].neg().div(c[1]))] };
  if (c.length > 3) throw new Error('grado mayor que 2: fuera del programa del ciclo');
  const [cc, bb, aa] = c;
  const delta = bb.mul(bb).sub(new F(4n).mul(aa).mul(cc));
  if (delta.signo() < 0) return { grado: 2, raices: [], delta, nota: 'no tiene raíces reales' };
  // √delta exacto: delta = n/d = (n·d)/d²  ⇒  √delta = √(n·d)/d
  const N = delta.n * delta.d;
  const [f, k] = sacaCuadrados(N);
  const dosA = new F(2n).mul(aa);
  if (k === 1n) {
    const r = new F(f, delta.d);
    return {
      grado: 2, delta,
      raices: [S.de(bb.neg().add(r).div(dosA)), S.de(bb.neg().sub(r).div(dosA))],
    };
  }
  const base = bb.neg().div(dosA);
  const coef = new F(f, delta.d).div(dosA);
  return {
    grado: 2, delta, irracional: true,
    raices: [new S(base, coef, k), new S(base, coef.neg(), k)],
  };
}

/** Resuelve la ecuación y la verifica sustituyendo en lo impreso. */
function resolver(src) {
  const a = analizar(src);
  if (a.t !== 'eq') throw new Error('falta el signo = : esto no es una ecuación');
  const p = P.sub(aPoli(a.a), aPoli(a.b));
  const vars = P.variables(p);
  if (vars.length === 0) {
    const esIdent = P.esCte(p) && P.valorCte(p).esCero();
    return {
      tipo: esIdent ? 'identidad' : 'imposible',
      raices: [], verificadas: [], incognita: null, grado: esIdent ? -1 : 0,
      texto: esIdent ? 'identidad: se cumple para cualquier valor de la incógnita'
                     : 'no tiene solución',
    };
  }
  if (vars.length > 1) throw new Error(`hay más de una incógnita (${vars.join(', ')})`);
  const v = vars[0];
  const c = P.coefs(p, v);
  const r = raicesDeCoefs(c);

  // verificación: sustituir en la ecuación TAL COMO ESTÁ ESCRITA
  const verif = r.raices.map((x) => {
    try {
      const izq = evaluar(a.a, { [v]: x }), der = evaluar(a.b, { [v]: x });
      return izq.igual(der);
    } catch { return false; }
  });

  return {
    tipo: r.grado === 1 ? 'lineal' : r.grado === 2 ? 'cuadratica' : 'degenerada',
    incognita: v, grado: r.grado, delta: r.delta, irracional: !!r.irracional,
    raices: r.raices, verificadas: verif, nota: r.nota,
    texto: r.raices.length
      ? r.raices.map((x, i) => `${v}${r.raices.length > 1 ? sub(i + 1) : ''} = ${x}`).join(' · ')
      : (r.nota || 'sin solución real'),
  };
}
const sub = (i) => '₁₂₃'[i - 1] || String(i);

/** Datos de una cuadrática: Δ, raíces, vértice, ordenada, suma y producto. */
function cuadratica(src) {
  const a = analizar(src);
  let p;
  if (a.t === 'eq') {
    const vi = P.variables(aPoli(a.a)), vd = P.variables(aPoli(a.b));
    // y = ax²+bx+c  ·  o bien  ax²+bx+c = 0
    const ladoY = vi.length === 1 && vi[0] === 'y' ? a.b : vd.length === 1 && vd[0] === 'y' ? a.a : null;
    p = ladoY ? aPoli(ladoY) : P.sub(aPoli(a.a), aPoli(a.b));
  } else p = aPoli(a);
  const vars = P.variables(p).filter(v => v !== 'y');
  if (vars.length !== 1) throw new Error('necesito una sola variable');
  const v = vars[0];
  const c = P.coefs(p, v);
  while (c.length < 3) c.push(F0);
  if (c.length > 3) throw new Error('no es de segundo grado');
  const [cc, bb, aa] = c;
  if (aa.esCero()) throw new Error('el coeficiente cuadrático es 0: no es una parábola');
  const r = raicesDeCoefs(c);
  const xv = bb.neg().div(new F(2n).mul(aa));
  const yv = cc.sub(bb.mul(bb).div(new F(4n).mul(aa)));
  return {
    variable: v, a: aa, b: bb, c: cc,
    delta: r.delta, raices: r.raices, irracional: !!r.irracional,
    vertice: [xv, yv], ordenada: cc,
    suma: bb.neg().div(aa), producto: cc.div(aa),
    abre: aa.signo() > 0 ? 'arriba' : 'abajo',
    extremo: aa.signo() > 0 ? 'mínimo' : 'máximo',
  };
}

/** ¿La factorización es correcta? Se expande y se compara, exacto. */
function factorizacion(expresion, factorizada) {
  const pe = aPoli(analizar(expresion));
  const pf = aPoli(analizar(factorizada));
  return { ok: P.iguales(pe, pf), expandida: pf };
}

/** Valor numérico de una expresión en una sustitución ("x=-3"). */
function valorNumerico(expresion, sustitucion) {
  const env = {};
  for (const trozo of sustitucion.split(/[,;·]/)) {
    const m = trozo.trim().match(/^([a-zA-Z])\s*=\s*(.+)$/);
    if (!m) throw new Error(`no entiendo «${trozo.trim()}» (se escribe x = -3)`);
    env[m[1]] = evaluar(analizar(m[2]), {});
  }
  return evaluar(analizar(expresion), env);
}

// ── polinomio a texto, para mostrar la forma desarrollada ───────
function poliATex(p, orden) {
  if (p.size === 0) return '0';
  const vs = orden || P.variables(p);
  const t = [...p.values()].sort((x, y) => {
    for (const v of vs) {
      const d = (y.m[v] || 0) - (x.m[v] || 0);
      if (d) return d;
    }
    return 0;
  });
  let s = '';
  for (const { c, m } of t) {
    const mono = Object.keys(m).filter(v => m[v] > 0).sort()
      .map(v => (m[v] === 1 ? v : `${v}^{${m[v]}}`)).join('');
    const neg = c.signo() < 0;
    const abs = neg ? c.neg() : c;
    const coef = abs.igual(F1) && mono ? '' : texF(abs);
    s += (s === '' ? (neg ? '-' : '') : (neg ? ' - ' : ' + ')) + coef + mono;
  }
  return s;
}

// ── del árbol al HTML, para la pantalla y para la hoja impresa ──
// Sin KaTeX ni ninguna otra biblioteca: la matemática del Tercer Ciclo
// son fracciones, exponentes, paréntesis y raíces, y eso se dibuja con
// CSS. Así la herramienta sigue andando sin conexión —que es justo
// cuando uno está por imprimir en el colegio— y el PDF sale limpio,
// con texto de verdad y no una imagen.
const esc = (s) => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function htmlF(f) {
  if (f.esEntero()) return esc(conMiles(f.n).replace(/\\,/g, ' '));
  const signo = f.n < 0n ? '−' : '';
  const n = f.n < 0n ? -f.n : f.n;
  return `${signo}<span class="frac"><span class="num">${n}</span>` +
         `<span class="den">${f.d}</span></span>`;
}

function html(n) {
  switch (n.t) {
    case 'num': return htmlF(n.v);
    case 'var': return `<i>${esc(n.v)}</i>`;
    case 'par': {
      const d = html(n.a);
      const [ab, ce] = n.k === '[' ? ['[', ']'] : n.k === '{' ? ['{', '}'] : ['(', ')'];
      return `<span class="par">${ab}${d}${ce}</span>`;
    }
    case 'neg': return `−${html(n.a)}`;
    case '+': return `${html(n.a)} + ${html(n.b)}`;
    case '-': return `${html(n.a)} − ${html(n.b)}`;
    case '*': return n.impl ? `${html(n.a)}${html(n.b)}`
                            : `${html(n.a)} · ${html(n.b)}`;
    case '/': return `<span class="frac"><span class="num">${html(pelar(n.a))}</span>` +
                     `<span class="den">${html(pelar(n.b))}</span></span>`;
    case '^': return `${html(n.a)}<sup>${html(n.b)}</sup>`;
    case 'eq': return `${html(n.a)} = ${html(n.b)}`;
    default: return '?';
  }
}

/** Un valor de Q(√k) en HTML. */
function htmlS(s) {
  if (s.esRacional()) return htmlF(s.a);
  const neg = s.b.signo() < 0, abs = neg ? s.b.neg() : s.b;
  const raiz = `<span class="raiz"><span class="radicando">${s.k}</span></span>`;
  const coef = abs.igual(F1) ? raiz : `${htmlF(abs)}${raiz}`;
  if (s.a.esCero()) return (neg ? '−' : '') + coef;
  return `${htmlF(s.a)} ${neg ? '−' : '+'} ${coef}`;
}

/** La hoja de estilo que necesita todo lo de arriba. Vive acá, al lado
    del renderizador, para que nadie los desincronice. */
const CSS_MATEMATICA = `
.mat { font-family: Georgia, "Times New Roman", serif; white-space: nowrap; }
.mat i { font-style: italic; }
.frac { display: inline-flex; flex-direction: column; vertical-align: -0.5em;
        text-align: center; margin: 0 .15em; }
.frac > .num { padding: 0 .25em; }
.frac > .den { padding: 0 .25em; border-top: 1px solid currentColor; }
.par { white-space: nowrap; }
sup { font-size: .72em; vertical-align: .45em; line-height: 0; }
.raiz { display: inline-block; border-top: 1px solid currentColor;
        margin-left: .1em; padding: 0 .15em 0 .1em; }
.raiz::before { content: "\\221A"; display: inline-block;
                margin: 0 .05em 0 -.35em; border-top: 0; }
`;

const MOTOR = {
  F, S, P, analizar, aPoli, evaluar, tex, texF, poliATex,
  html, htmlF, htmlS, CSS_MATEMATICA,
  resolver, cuadratica, factorizacion, valorNumerico,
};
if (typeof module !== 'undefined') module.exports = MOTOR;
