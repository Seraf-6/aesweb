/* Verificador del editor de valoraciones: lo que el motor no puede ver.

   Levanta index.html, saca el bloque <script id="nucleo"> (la lógica
   pura, sin DOM) y lo corre en Node junto con motor.js. Después arma
   las hojas y controla:

   · que las dos filas tengan exactamente los mismos ítems en distinto lugar;
   · que ninguna respuesta aparezca en el enunciado de su propio ítem;
   · que la hoja del alumno no tenga nada de la clave;
   · que el total impreso sea la suma de los pts;
   · que la rejilla final tenga 3 × 5 casillas;
   · que no haya background pintado en lo que se imprime.

   En el repositorio no hay valoraciones (ver CLAUDE.md), así que se
   prueba con una valoración ficticia que se genera acá mismo. Para
   controlar las de verdad, se le pasa un respaldo exportado:

       node valoraciones/prueba_pagina.js "C:/…/Respaldo valoraciones.json"
*/
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const leer = (f) => fs.readFileSync(path.join(DIR, f), 'utf8');

let fallas = 0;
const ok = (c, m) => { if (!c) { fallas++; console.log('FALLA ·', m); } };

// ── levantar la página ─────────────────────────────────────────
const html = leer('index.html');
const css = leer('editor.css');
const bloque = html.match(/<script id="nucleo">\r?\n([\s\S]*?)<\/script>/);
if (!bloque) { console.log('FALLA · no encuentro <script id="nucleo"> en index.html'); process.exit(1); }
const ctx = vm.createContext({ console });
vm.runInContext(`${leer('motor.js')}\n${bloque[1]}\n;globalThis.N = NUCLEO; globalThis.M = MOTOR;`, ctx);
const N = ctx.N;

// ── una valoración ficticia, generada ──────────────────────────
// Nada de esto es una prueba real: son ecuaciones que salen de una
// semilla, con enunciados de relleno.
function ficticia(n) {
  let s = 7;
  const azar = (a, b) => { s = (s * 1103515245 + 12345) % 2147483648; return a + (s % (b - a + 1)); };
  const its = [];
  for (let i = 0; i < n; i++) {
    const tipo = ['resolver', 'cuadratica', 'factorizar', 'valor', 'redactado'][i % 5];
    const it = N.itemVacio();
    Object.assign(it, { tema: `Tema ficticio ${i + 1}`, indicador: `Indicador ficticio ${i + 1}.`, tipo,
      pts: N.PTS[i % N.PTS.length], espacio: 2 + (i % 3),
      clave: `DESARROLLO-SECRETO-${i + 1}: paso ficticio.` });
    const a = azar(2, 9), r = azar(2, 40) + i * 50, b = azar(1, 30);
    switch (tipo) {
      case 'resolver':
        it.enunciado = `Ítem de prueba ${i + 1}. Resolvé: {1}`;
        it.formulas = [`${a}(x - ${b}) = ${a * (r - b)}`];
        break;
      case 'cuadratica':
        it.enunciado = `Ítem de prueba ${i + 1}. Hallá las raíces de {1}`;
        it.formulas = [`y = x^2 - ${r + r + 1}x + ${r * (r + 1)}`];
        it.pide = { raices: true, vertice: true };
        break;
      case 'factorizar':
        it.enunciado = `Ítem de prueba ${i + 1}. Factorizá: {1}`;
        it.formulas = [`x^2 - ${(r + 3) * (r + 3)}`, `(x - ${r + 3})(x + ${r + 3})`];
        break;
      case 'valor':
        it.enunciado = `Ítem de prueba ${i + 1}. Calculá el valor de {1} para {2}`;
        it.formulas = [`${a}x^2 + x`, `x = -${r}`];
        break;
      default:
        it.enunciado = `Ítem de prueba ${i + 1}. Explicá la diferencia.`;
        it.respuesta = `Respuesta redactada ficticia número ${i + 1}`;
        it.formulas = [];
    }
    its.push(it);
  }
  return Object.assign(N.nuevaValoracion(), { titulo: 'Unidad ficticia', items: its });
}

// ── herramientas para leer el HTML de una hoja ─────────────────
const posiciones = (h) => [...h.matchAll(/<section class="item" data-item="([^"]+)"/g)].map((m) => m[1]);
const sinEtiquetas = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');
function rejillas(h) {
  return [...h.matchAll(/<table class="rejilla">([\s\S]*?)<\/table>/g)].map((m) =>
    [...m[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((f) => (f[1].match(/<td>/g) || []).length));
}

function controlar(val, nombre) {
  const its = val.items, n = its.length;
  const suma = Math.round(its.reduce((s, it) => s + (+it.pts || 0), 0) * 100) / 100;
  const A = N.hoja(val, 'A'), B = N.hoja(val, 'B'), K = N.clave(val);

  // las dos filas: mismos ítems, en distinto lugar, nadie a más de dos lugares
  const pa = posiciones(A), pb = posiciones(B);
  ok(pa.length === n && pb.length === n, `${nombre}: las hojas tienen ${pa.length} y ${pb.length} ítems, no ${n}`);
  ok([...pa].sort().join() === [...pb].sort().join(), `${nombre}: las filas A y B no tienen los mismos ítems`);
  ok(new Set(pa).size === n, `${nombre}: hay ítems repetidos en la fila A`);
  pa.forEach((id, i) => {
    const j = pb.indexOf(id);
    const ultimoSolo = n % 3 === 1 && i === n - 1;     // con 3k+1 ítems el último no se mueve
    if (n > 1 && !ultimoSolo) ok(i !== j, `${nombre}: el ítem ${i + 1} queda en el mismo lugar en las dos filas`);
    ok(Math.abs(i - j) <= 2, `${nombre}: el ítem ${i + 1} se corre ${Math.abs(i - j)} lugares`);
  });
  // los indicadores se numeran con el orden de cada fila
  for (const [hoja, orden, fila] of [[A, pa, 'A'], [B, pb, 'B']]) {
    orden.forEach((id, p) => {
      const ind = its.find((x) => x.id === id).indicador;
      if (ind) ok(hoja.includes(`<b>(${p + 1})</b> ${N.escH(ind)}`), `${nombre}: en la fila ${fila} el indicador del ítem ${p + 1} no lleva (${p + 1})`);
    });
  }

  // ninguna respuesta en el enunciado de su propio ítem
  its.forEach((it, i) => {
    const en = N.respuestaEnEnunciado(it);
    // el número suelto en la prosa puede ser casualidad: se informa, no falla
    if (en && en.suelto) console.log(`   nota · ${nombre}: el número ${en.s}, respuesta del ítem ${i + 1}, aparece en su enunciado`);
    else ok(!en, `${nombre}: la respuesta del ítem ${i + 1} (${en && en.s}) está escrita en su enunciado`);
  });

  // la hoja del alumno no tiene nada de la clave
  for (const [h, fila] of [[A, 'A'], [B, 'B']]) {
    const plano = sinEtiquetas(h);
    its.forEach((it, i) => {
      const des = String(it.clave || '').trim();
      if (des.length >= 8) ok(!plano.includes(sinEtiquetas(N.prosaCorrida(des)).trim()), `${nombre}: el desarrollo del ítem ${i + 1} aparece en la fila ${fila}`);
      if (it.tipo === 'redactado' && it.respuesta.trim().length >= 3)
        ok(!plano.includes(sinEtiquetas(N.prosaCorrida(it.respuesta)).trim()), `${nombre}: la respuesta redactada del ítem ${i + 1} aparece en la fila ${fila}`);
    });
    ok(!/Respuesta:|CLAVE|Uso exclusivo/.test(h), `${nombre}: la fila ${fila} tiene rótulos de la clave`);
    ok(!/class="rj-r">[^<]/.test(h), `${nombre}: la rejilla de la fila ${fila} trae algo escrito`);
  }
  // y la clave sí trae el desarrollo
  its.forEach((it, i) => {
    if (String(it.clave || '').trim().length >= 8) ok(sinEtiquetas(K).includes(sinEtiquetas(N.prosaCorrida(it.clave)).trim()), `${nombre}: la clave no trae el desarrollo del ítem ${i + 1}`);
  });

  // el total impreso es la suma de los pts
  for (const [h, q] of [[A, 'fila A'], [B, 'fila B'], [K, 'clave']]) {
    const m = h.match(/<span data-total>([\d,]+)<\/span>/);
    ok(m && m[1] === N.fmtNum(suma), `${nombre}: el total de la ${q} dice ${m && m[1]}, la suma de los pts es ${N.fmtNum(suma)}`);
  }

  // la rejilla: 3 filas de 5 casillas (en la clave, una por fila)
  const filasEsperadas = Math.max(3, Math.ceil(n / 5));
  for (const [h, q, cuantas] of [[A, 'fila A', 1], [B, 'fila B', 1], [K, 'clave', 2]]) {
    const r = rejillas(h);
    ok(r.length === cuantas, `${nombre}: la ${q} tiene ${r.length} rejillas, se esperaban ${cuantas}`);
    for (const t of r) ok(t.length === filasEsperadas && t.every((c) => c === 5), `${nombre}: una rejilla de la ${q} es ${t.join('/')} y no ${filasEsperadas}×5`);
  }
  // la rejilla de la clave trae la respuesta correcta en el lugar de cada fila
  const celdasK = [...K.matchAll(/<span class="rj-n">(\d+)\.<\/span><span class="rj-r">([\s\S]*?)<\/span><\/td>/g)];
  ok(celdasK.length === 2 * n, `${nombre}: la clave tiene ${celdasK.length} casillas con número, se esperaban ${2 * n}`);

  // nada de fondos en las hojas
  ok(!/background/i.test(A + B + K), `${nombre}: una hoja trae un background en línea`);
  return { A, B, K };
}

// ── 1. las filas, para cualquier cantidad de ítems ─────────────
console.log('── el orden de las dos filas');
for (let n = 0; n <= 30; n++) {
  const a = N.orden(n, 'A'), b = N.orden(n, 'B');
  ok(a.join() === [...Array(n).keys()].join(), `orden A con ${n} ítems`);
  ok([...b].sort((x, y) => x - y).join() === a.join(), `orden B con ${n} ítems no es una permutación`);
  b.forEach((k, p) => ok(Math.abs(k - p) <= 2, `con ${n} ítems, el de la posición ${p + 1} se corre más de dos`));
}
ok(N.orden(6, 'B').join() === '2,0,1,5,3,4', 'el grupo (a, b, c) tiene que salir (c, a, b)');
ok(N.orden(5, 'B').join() === '2,0,1,4,3', 'si sobran dos se intercambian');

// ── 2. las hojas de una valoración ficticia ────────────────────
console.log('── hojas de una valoración ficticia de 15 ítems');
const v15 = ficticia(15);
v15.items.forEach((it, i) => {
  const c = N.calcular(it);
  ok(['ok', 'manual'].includes(c.estado), `ítem ficticio ${i + 1} (${it.tipo}): ${c.estado} · ${c.mensaje}`);
});
const errores = N.avisos(v15).filter((a) => a.nivel === 'error');
ok(errores.length === 0, `la ficticia no debería tener errores: ${errores.map((a) => a.texto).join(' | ')}`);
controlar(v15, 'ficticia de 15');
for (const n of [1, 2, 4, 7, 14, 16]) controlar(ficticia(n), `ficticia de ${n}`);

// ── 3. los avisos se disparan cuando tienen que dispararse ─────
console.log('── los avisos');
const avisa = (val, re) => N.avisos(val).some((a) => re.test(a.texto));
{
  const v = ficticia(3);
  v.items[0].enunciado = `Comprobá que ${v.items[0].formulas[0].includes('x') ? 'x' : 'y'} = ${N.calcular(v.items[0]).texto.split('= ')[1]} es la solución de {1}`;
  ok(N.respuestaEnEnunciado(v.items[0]), 'no detecta la respuesta escrita en el enunciado (resolver)');

  const s = ficticia(3).items[0];               // el número solo, en la prosa: aviso, no error
  s.enunciado = `Restale ${N.calcular(s).texto.split('= ')[1]} al resultado. Resolvé: {1}`;
  const es = N.respuestaEnEnunciado(s);
  ok(es && es.suelto, 'no distingue el número suelto en la prosa');
  const vs = ficticia(3); vs.items[0] = s;
  ok(avisa(vs, /fijate que no la delate/) && !N.avisos(vs).some((a) => a.nivel === 'error' && /enunciado/.test(a.texto)),
     'el número suelto en la prosa tendría que ser un aviso, no un error');
  ok(avisa(v, /propio enunciado/), 'no avisa la respuesta escrita en el enunciado');

  const f = ficticia(3).items[2];               // factorizar
  f.enunciado = 'Comprobá que {1} = {2}';
  ok(N.respuestaEnEnunciado(f), 'no detecta la forma factorizada en el enunciado');

  const d = ficticia(6);
  d.items[3].formulas = [...d.items[0].formulas];
  d.items[3].tipo = 'resolver';
  ok(avisa(d, /misma respuesta final/), 'no avisa dos ítems con la misma respuesta');

  const j = ficticia(5);
  j.items[3].enunciado += ' Justificá tu respuesta.';
  ok(avisa(j, /número pelado/), 'no avisa el «justificá» con un número pelado');

  const e = ficticia(2);
  e.items[0].formulas = ['3x + = 5'];
  ok(avisa(e, /no se entiende/), 'no avisa una fórmula que no parsea');
  ok(N.avisos(e).some((a) => /«=»|esperaba|cortada/.test(a.texto)), 'el aviso no trae el mensaje del motor tal cual');

  const fx = ficticia(3).items[2];
  fx.formulas[1] = '(x - 1)(x + 2)';
  ok(N.calcular(fx).estado === 'falla', 'una factorización mal hecha tendría que no verificar');

  const z = ficticia(2);
  z.items[0].enunciado = 'Resolvé {1} y {2}';
  ok(avisa(z, /no hay fórmula 2/), 'no avisa un marcador sin fórmula');
}

// ── 4. lo que se imprime no lleva fondos ───────────────────────
console.log('── la impresión es en blanco y negro');
/** Saca los bloques @media screen { … } contando llaves. */
function sinScreen(src) {
  let out = '', i = 0;
  const re = /@media\s+screen\b[^{]*\{/g;
  let m;
  while ((m = re.exec(src))) {
    out += src.slice(i, m.index);
    let prof = 1, k = re.lastIndex;
    while (prof && k < src.length) { if (src[k] === '{') prof++; else if (src[k] === '}') prof--; k++; }
    i = k; re.lastIndex = k;
  }
  return out + src.slice(i);
}
const cssSinComentarios = css.replace(/\/\*[\s\S]*?\*\//g, '');
const imprimible = sinScreen(cssSinComentarios);
for (const m of imprimible.matchAll(/background(?:-color|-image)?\s*:\s*([^;}]+)/g))
  ok(/^(none|transparent)\s*(!important)?$/.test(m[1].trim()), `editor.css pinta un fondo que se imprime: background: ${m[1].trim()}`);
ok(!/print-color-adjust/.test(cssSinComentarios), 'editor.css toca print-color-adjust');
ok(!/background/.test(ctx.M.CSS_MATEMATICA), 'la hoja de la matemática pinta un fondo');
const print = cssSinComentarios.match(/@media\s+print\s*\{[\s\S]*$/);
ok(print && /\.ui\s*\{\s*display:\s*none/.test(print[0]), 'en @media print la interfaz (.ui) no se oculta');
ok(/@page\s*\{[^@]*size:\s*A4;[^@]*margin:\s*1\.3cm 1\.6cm 1\.7cm;/.test(cssSinComentarios), '@page no es A4 con 1,3 / 1,6 / 1,7 cm');
ok(/break-inside:\s*avoid/.test(print ? print[0] : ''), 'los ítems pueden partirse entre dos páginas');

// ── 5. el contenido no entra al repositorio ────────────────────
console.log('── el contenido se queda fuera del repositorio');
const gi = fs.readFileSync(path.join(DIR, '..', '.gitignore'), 'utf8');
ok(/^valoraciones\/\*\.json$/m.test(gi) && /^valoraciones\/respaldos\/$/m.test(gi), '.gitignore no rechaza valoraciones/*.json y valoraciones/respaldos/');
ok(!/<script id="nucleo">[\s\S]*?"grados"\s*:/.test(html), 'index.html parece traer una valoración escrita adentro');
const sueltos = fs.readdirSync(DIR).filter((f) => /\.json$/i.test(f));
if (sueltos.length) console.log(`   (hay ${sueltos.length} .json en valoraciones/: .gitignore los deja afuera)`);

// ── 6. un respaldo de verdad, si se pasa uno ───────────────────
if (process.argv[2]) {
  console.log(`── el respaldo ${path.basename(process.argv[2])}`);
  const d = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const grados = (Array.isArray(d.grados) ? d.grados : [d]).map(N.normalizar);
  for (const v of grados) {
    const nombre = `${v.nombre} · ${v.unidad}`;
    controlar(v, nombre);
    for (const a of N.avisos(v)) {
      const txt = `${nombre}${a.n ? ` · ítem ${a.n}` : ''}: ${a.texto.replace(/<[^>]+>/g, '')}`;
      if (a.nivel === 'error') ok(false, txt); else console.log('   aviso ·', txt);
    }
  }
}

console.log(`\n${fallas} discrepancias`);
process.exit(fallas ? 1 : 0);
