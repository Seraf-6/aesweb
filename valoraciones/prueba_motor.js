/* Cruce contra las respuestas que sympy ya verificó en contenido.py.
   Si el motor del navegador y sympy no coinciden, uno de los dos está
   mal y no se publica nada. */
const M = require('./motor.js');

let fallas = 0;
const ok = (c, m) => { if (!c) { fallas++; console.log('FALLA ·', m); } };

function esperaRaices(src, esperado) {
  try {
    const r = M.resolver(src);
    const txt = r.raices.map(x => x.toString()).sort().join(' · ');
    const esp = esperado.slice().sort().join(' · ');
    ok(txt === esp, `${src}\n        dio ${txt || r.texto}, se esperaba ${esp}`);
    ok(r.verificadas.every(Boolean), `${src}: la verificación por sustitución no cierra`);
  } catch (e) { ok(false, `${src}: explotó · ${e.message}`); }
}

function esperaFactor(expr, fact, debe = true) {
  try {
    const r = M.factorizacion(expr, fact);
    ok(r.ok === debe, `${expr} = ${fact} → ${r.ok}, se esperaba ${debe}`);
  } catch (e) { ok(false, `${expr}: explotó · ${e.message}`); }
}

console.log('── 7.º · ecuaciones lineales');
esperaRaices('3x - 6 = 9', ['5']);
esperaRaices('2(x + 3) = 2x + 6', []);                       // identidad
esperaRaices('4x - 9 = 2x + 3', ['6']);
esperaRaices('9(x - 1) - 4(x - 3) = 2x + 18', ['5']);
esperaRaices('8 - [3x - (2x + 7)] = 4x + 5', ['2']);
esperaRaices('5x + 8 = 3x - 4', ['-6']);
esperaRaices('2x - 3 = 0', ['3/2']);
esperaRaices('x/2 + x/5 = 7', ['10']);
esperaRaices('(x-3)/4 + (x+1)/6 = 1', ['19/5']);
esperaRaices('2x - 6 = x/2 + 3', ['6']);
esperaRaices('(x+5)/2 = 11', ['17']);
esperaRaices('x/2 + 5 = 11', ['12']);

console.log('── 7.º · problemas (la ecuación que plantea el alumno)');
esperaRaices('3(x + 30000) + 2x = 410000', ['64000']);        // gorra
esperaRaices('(56 - x) + 8 = 3(x + 8)', ['10']);              // hijo

console.log('── 8.º · factorización');
esperaFactor('25a^2 + 20ab + 4b^2', '(5a + 2b)^2');
esperaFactor('4x^2 + 10x + 25', '(2x + 5)^2', false);
esperaFactor('x^2 + 18x + 80', '(x + 8)(x + 10)');
esperaFactor('m^2 - 15m + 14', '(m - 14)(m - 1)');
esperaFactor('10x^2 + 11x - 6', '(5x - 2)(2x + 3)');
esperaFactor('4x^2 + 8x + 3', '(4x + 3)(x + 1)', false);
esperaFactor('4x^2 + 8x + 3', '(2x + 1)(2x + 3)');
esperaFactor('27x^3 + 54x^2y + 36xy^2 + 8y^3', '(3x + 2y)^3');
esperaFactor('8x^3 - 36x^2 + 54x - 27', '(2x - 3)^3');
esperaFactor('x^2y - y^3', 'y(x - y)(x + y)');
esperaFactor('3x^3 + 12x^2 + 12x', '3x(x + 2)^2');
esperaFactor('x^3 + 2x^2 - 9x - 18', '(x + 2)(x - 3)(x + 3)');
esperaFactor('2x^3 - 8x', '2x(x - 2)(x + 2)');
esperaFactor('x^5 - x', 'x(x^2 + 1)(x - 1)(x + 1)');
esperaFactor('2x^4 + 2x^3 - 24x^2', '2x^2(x + 4)(x - 3)');
esperaFactor('8a^3 + 27', '(2a + 3)(4a^2 - 6a + 9)');

console.log('── 9.º · cuadráticas');
esperaRaices('(x - 3)(x + 5) = 9', ['4', '-6']);
esperaRaices('2x(x - 1) = (x + 3)(x - 4) + 24', ['4', '-3']);
esperaRaices('x^2 + 10x - 24 = 0', ['2', '-12']);
esperaRaices('x^2 + 5x - 6 = 0', ['1', '-6']);
esperaRaices('2x^2 - 5x - 3 = 0', ['3', '-1/2']);
esperaRaices('3x^2 + 12x - 15 = 0', ['1', '-5']);

console.log('── 9.º · discriminante, vértice, suma y producto');
function cuad(src, f) { try { f(M.cuadratica(src)); } catch (e) { ok(false, `${src}: ${e.message}`); } }

cuad('3x^2 - 5x + 4 = 0', c => {
  ok(c.delta.toString() === '-23', `Δ de 3x²-5x+4 dio ${c.delta}`);
  ok(c.raices.length === 0, 'no debería tener raíces reales');
});
cuad('x^2 - 6x + 4 = 0', c => {
  ok(c.delta.toString() === '20', `Δ de x²-6x+4 dio ${c.delta}`);
  ok(c.irracional, 'las raíces de x²-6x+4 son irracionales');
  ok(c.raices[0].toString() === '3 + √5', `raíz dio ${c.raices[0]}`);
});
cuad('y = -2x^2 + 4x + 6', c => {
  ok(c.raices.map(String).sort().join() === ['3', '-1'].sort().join(),
     `raíces dieron ${c.raices.map(String)}`);
  ok(`${c.vertice[0]},${c.vertice[1]}` === '1,8', `vértice dio ${c.vertice}`);
  ok(c.ordenada.toString() === '6', `ordenada dio ${c.ordenada}`);
  ok(c.extremo === 'máximo', `extremo dio ${c.extremo}`);
});
cuad('y = x^2 - 4x', c => {
  ok(c.raices.map(String).sort().join() === ['0', '4'].sort().join(), 'raíces de x²-4x');
  ok(`${c.vertice[0]},${c.vertice[1]}` === '2,-4', `vértice dio ${c.vertice}`);
});
cuad('y = x^2 - 2x - 3', c => {
  ok(`${c.vertice[0]},${c.vertice[1]}` === '1,-4', `vértice dio ${c.vertice}`);
  ok(c.raices.map(String).sort().join() === ['-1', '3'].sort().join(), 'raíces');
});
cuad('5x^2 - 13x + 6 = 0', c => {
  ok(c.suma.toString() === '13/5', `suma dio ${c.suma}`);
  ok(c.producto.toString() === '6/5', `producto dio ${c.producto}`);
});
cuad('x^2 + 3x + 10 = 0', c => {
  ok(c.suma.toString() === '-3', `suma dio ${c.suma}`);
  ok(c.producto.toString() === '10', `producto dio ${c.producto}`);
  ok(c.delta.signo() < 0, 'Δ tiene que ser negativo');
});
cuad('x^2 - 5x - 14 = 0', c => {
  ok(c.raices.map(String).sort().join() === ['7', '-2'].sort().join(),
     `raíces dieron ${c.raices.map(String)}`);
});
cuad('x^2 - 8x + 16 = 0', c => {
  ok(c.delta.esCero(), 'Δ de x²-8x+16 tiene que ser 0');
});

console.log('── valor numérico');
ok(M.valorNumerico('2x^2 + x', 'x = -3').toString() === '15', 'valor numérico 2x²+x en -3');
ok(M.valorNumerico('2x - 3', 'x = -1').toString() === '-5', 'y = 2x-3 en x=-1');
ok(M.valorNumerico('8a - 3b + 5 - 2a + 7b - 9', 'a = 1, b = 1').toString() === '6',
   'reducción 8a-3b+5-2a+7b-9 en a=b=1');

console.log('── el renderizado respeta lo que se escribió');
const casos = [
  ['9(x - 1) - 4(x - 3) = 2x + 18', '9(x - 1) - 4(x - 3) = 2x + 18'],
  ['(x+2)(x-5) = 8', '(x + 2)(x - 5) = 8'],
  ['8 - [3x - (2x + 7)] = 4x + 5', '8 - [3x - (2x + 7)] = 4x + 5'],
  // con fracción adentro sí se estiran, que es para lo que sirven
  ['2(x/2 + 1) = 5', '2\\left(\\dfrac{x}{2} + 1\\right) = 5'],
  ['(x-3)/4 + (x+1)/6 = 1', '\\dfrac{x - 3}{4} + \\dfrac{x + 1}{6} = 1'],
  ['x^2 + 18x + 80', 'x^{2} + 18x + 80'],
];
for (const [src, esp] of casos) {
  const got = M.tex(M.analizar(src));
  ok(got === esp, `tex(${src})\n        dio ${got}\n        esp ${esp}`);
}

console.log('── el signo va afuera del exponente');
// Lo encontró el cruce contra sympy al armar el ejercitario de 9.º: el
// parser leía «-x^2» como «(-x)^2» y la parábola salía al revés.
ok(M.P.iguales(M.aPoli(M.analizar('-x^2')), M.aPoli(M.analizar('0 - x^2'))),
   '-x^2 tiene que ser -(x^2), no (-x)^2');
ok(!M.P.iguales(M.aPoli(M.analizar('-x^2')), M.aPoli(M.analizar('x^2'))),
   '-x^2 no puede dar x^2');
ok(M.tex(M.analizar('-x^2')) === '-x^{2}', `tex(-x^2) dio ${M.tex(M.analizar('-x^2'))}`);
cuad('y = -x^2 + 2x + 3', c => {
  ok(c.raices.map(String).sort().join() === ['3', '-1'].sort().join(),
     `raíces de -x²+2x+3 dieron ${c.raices.map(String)}`);
  ok(`${c.vertice[0]},${c.vertice[1]}` === '1,4', `vértice dio ${c.vertice}`);
  ok(c.extremo === 'máximo', `extremo dio ${c.extremo}`);
});
cuad('y = -2x^2 + 4x + 6', c => {
  ok(`${c.vertice[0]},${c.vertice[1]}` === '1,8', `vértice dio ${c.vertice}`);
});
esperaRaices('-x^2 + 5x - 6 = 0', ['2', '3']);
esperaFactor('-x^2 + 4', '-(x - 2)(x + 2)');

console.log('── errores que tienen que avisar, no romper');
for (const malo of ['3x + = 5', '2x + 1 = ', 'x^2 + @', '1/0', 'x³ = 8']) {
  let aviso = null;
  try { M.resolver(malo); } catch (e) { aviso = e.message; }
  ok(aviso, `«${malo}» tendría que dar un aviso claro`);
}

console.log(`\n${fallas} discrepancias`);
process.exit(fallas ? 1 : 0);
