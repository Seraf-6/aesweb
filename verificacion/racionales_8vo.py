"""Verificación de las diapositivas de expresiones algebraicas racionales de 8.º.

Cada ejemplo de `matematica/8vo/racionales.html` es una operación con
fracciones algebraicas y su resultado. Acá se comprueba, por caminos
distintos del que lo produjo:

1. Con sympy: el enunciado menos el resultado da 0, y el resultado está
   reducido (el numerador y el denominador no tienen factores en común).
2. Con fracciones exactas: el enunciado y el resultado valen lo mismo en el
   punto del control, y ese valor es el que escribe la página; además valen
   lo mismo en veinte puntos al azar (lejos de los que anulan algún
   denominador).
3. Los valores que anulan el denominador (el puente) son las raíces reales
   del denominador, ni una más ni una menos.
4. El MCD divide a cada expresión y el MCM es múltiplo de cada una, y son el
   mayor y el menor con esa propiedad (sympy.gcd / sympy.lcm).
5. Dentro de un tema no se repite una respuesta, y la página tiene escritos
   tal cual cada resultado y cada valor del control.

    python verificacion/racionales_8vo.py
"""

import random
import re
import sys
from fractions import Fraction as F
from pathlib import Path

import sympy as sp
from sympy.parsing.sympy_parser import (parse_expr, standard_transformations,
                                        implicit_multiplication_application, convert_xor)

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '8vo' / 'racionales.html'
TR = standard_transformations + (implicit_multiplication_application, convert_xor)
LETRAS = {k: sp.Symbol(k) for k in 'abnxy'}

fallos = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def ex(s):
    """La expresión escrita con / y paréntesis, con − y · como en la página."""
    s = s.replace('−', '-').replace('·', '*').replace(':', '/')
    return parse_expr(s, local_dict=LETRAS, transformations=TR)


def frac(v):
    v = sp.nsimplify(v)
    return F(int(sp.fraction(v)[0]), int(sp.fraction(v)[1]))


def valor(e, punto):
    return frac(e.subs({LETRAS[k]: sp.Rational(v) for k, v in punto.items()}))


# ── las operaciones: (tema, enunciado, resultado, como lo escribe la página,
#     punto del control, valor del control) ──
OPS = [
 # tema 2 · simplificación
 (2, '(12x^3y)/(18x y^2)', '(2x^2)/(3y)', "R('2x^2', '3y')", {'x': 2, 'y': 1}, F(8, 3)),
 (2, '(5x^2 + 10x)/(5x)', 'x + 2', "M('x + 2')", {'x': 10}, F(12)),
 (2, '(x^2 − 25)/(x + 5)', 'x − 5', "M('x − 5')", {'x': 10}, F(5)),
 (2, '(x^2 + 5x + 6)/(x^2 − 4)', '(x + 3)/(x − 2)', "R('x + 3', 'x − 2')", {'x': 10}, F(13, 8)),
 (2, '(6 − 2x)/(x^2 − 9)', '(−2)/(x + 3)', "R('−2', 'x + 3')", {'x': 10}, F(-2, 13)),
 # tema 3 · multiplicación
 (3, '(3x)/(4y) · (8y^2)/(9x^2)', '(2y)/(3x)', "R('2y', '3x')", {'x': 2, 'y': 1}, F(1, 3)),
 (3, '(x + 2)/3 · 6/(x^2 − 4)', '2/(x − 2)', "R('2', 'x − 2')", {'x': 10}, F(1, 4)),
 (3, '(x^2 − 9)/(x^2 + 2x) · x/(x − 3)', '(x + 3)/(x + 2)', "R('x + 3', 'x + 2')", {'x': 10}, F(13, 12)),
 (3, '(x^2 + 5x + 6)/(x^2 − 1) · (x − 1)/(x + 2)', '(x + 3)/(x + 1)', "R('x + 3', 'x + 1')", {'x': 10}, F(13, 11)),
 (3, '(x − 4)/(x + 1) · (x^2 − 1)/(8 − 2x)', '(1 − x)/2', "R('1 − x', '2')", {'x': 10}, F(-9, 2)),
 # tema 4 · división
 (4, '((2x)/3) / ((4x^2)/9)', '3/(2x)', "R('3', '2x')", {'x': 3}, F(1, 2)),
 (4, '((x^2 − 4)/x) / ((x + 2)/x^2)', 'x(x − 2)', "M('x(x − 2)')", {'x': 10}, F(80)),
 (4, '((x^2 − x − 6)/(x + 1)) / ((x − 3)/(x^2 − 1))', '(x + 2)(x − 1)', "M('(x + 2)(x − 1)')", {'x': 10}, F(108)),
 (4, '((a^2 − 1)/a) / ((a + 1)/a^2)', 'a(a − 1)', "M('a(a − 1)')", {'a': 10}, F(90)),
 # tema 5 · suma y resta con igual denominador
 (5, '(3x + 1)/(x − 2) + (x − 9)/(x − 2)', '4', "M('4')", {'x': 10}, F(4)),
 (5, '(3x + 1)/(x − 2) − (x − 9)/(x − 2)', '(2(x + 5))/(x − 2)', "R('2(x + 5)', 'x − 2')", {'x': 10}, F(15, 4)),
 (5, '(x^2 + 2x)/(x + 1) + (x + 2)/(x + 1)', 'x + 2', "M('x + 2')", {'x': 10}, F(12)),
 (5, '(2x^2 + 3)/(x − 1) − (x^2 + 4)/(x − 1)', 'x + 1', "M('x + 1')", {'x': 10}, F(11)),
 # tema 6 · suma y resta con distinto denominador
 (6, '(x + 1)/(4x) + (x − 2)/(6x)', '(5x − 1)/(12x)', "R('5x − 1', '12x')", {'x': 1}, F(1, 3)),
 (6, '3/x − 2/(x + 1)', '(x + 3)/(x(x + 1))', "R('x + 3', 'x(x + 1)')", {'x': 1}, F(2)),
 (6, '1/(x − 2) + 4/(x^2 − 4)', '(x + 6)/((x + 2)(x − 2))', "R('x + 6', '(x + 2)(x − 2)')", {'x': 3}, F(9, 5)),
 (6, 'x/(x − 2) − 4/(x^2 − 2x)', '(x + 2)/x', "R('x + 2', 'x')", {'x': 4}, F(3, 2)),
 (6, '5/(x − 3) + 2/(3 − x)', '3/(x − 3)', "R('3', 'x − 3')", {'x': 4}, F(3)),
 # tema 7 · operaciones combinadas
 (7, '(1 + 1/x) · x/(x + 1)', '1', "M('1')", {'x': 4}, F(1)),
 (7, '(x/y − y/x) / (1/y − 1/x)', 'x + y', "M('x + y')", {'x': 3, 'y': 1}, F(4)),
 (7, '(1 − 1/x^2) / (1 + 1/x)', '(x − 1)/x', "R('x − 1', 'x')", {'x': 2}, F(1, 2)),
 (7, '(1/(x − 1) + 1/(x + 1)) / (2/(x^2 − 1))', 'x', "M('x')", {'x': 3}, F(3)),
 # el arranque: (x + 2)/x no es 3
 (1, '(x + 2)/x', '(x + 2)/x', None, {'x': 2}, F(2)),
]

# el puente: (denominador, valores que lo anulan)
PUENTE = [
 ('x − 3', [3]),
 ('x^2 − 9', [-3, 3]),
 ('x^2 − 5x + 6', [2, 3]),
 ('x^2 + 4', []),
]

# tema 1: (tipo, expresiones, resultado, como lo escribe la página, punto del control)
MCDM = [
 ('MCD', ['12x^2y', '18x y^3'], '6x y', "M('6xy')", {'x': 2, 'y': 1}),
 ('MCM', ['12x^2y', '18x y^3'], '36x^2y^3', "M('36x^2y^3')", {'x': 2, 'y': 1}),
 ('MCD', ['x^2 − 9', 'x^2 + 6x + 9'], 'x + 3', "M('x + 3')", {'x': 10}),
 ('MCM', ['x^2 − 9', 'x^2 + 6x + 9'], '(x + 3)^2(x − 3)', "M('(x + 3)^2(x − 3)')", {'x': 10}),
 ('MCM', ['x^2 − 4', 'x^2 + 4x + 4', '2x + 4'], '2(x + 2)^2(x − 2)', "M('2(x + 2)^2(x − 2)')", {'x': 10}),
]

# el desafío: 1/(1·2) + 1/(2·3) + … + 1/(99·100)
DESAFIO = F(99, 100)


def main():
    random.seed(8)
    print('Expresiones algebraicas racionales · 8.º')
    html = PAGINA.read_text(encoding='utf-8') if PAGINA.exists() else ''
    if not html:
        mal('no existe la página ' + str(PAGINA))

    # ── las operaciones ──
    vistos = {}
    for tema, enun, res, escrito, punto, ctrl in OPS:
        e, r = ex(enun), ex(res)
        if sp.simplify(e - r) != 0:
            mal(f'tema {tema}: {enun} no da {res}')
            continue
        if tema != 1:
            n, d = sp.fraction(sp.cancel(sp.together(r)))
            if sp.gcd(n, d).free_symbols:
                mal(f'tema {tema}: {res} no está reducido')
        # el control, con fracciones exactas
        ve, vr = valor(e, punto), valor(r, punto)
        if not (ve == vr == ctrl):
            mal(f'tema {tema}: en {punto}, {enun} = {ve}, {res} = {vr}, la página dice {ctrl}')
        # veinte puntos al azar, lejos de los que anulan algo
        sims = sorted(e.free_symbols, key=str)
        ok = 0
        for _ in range(60):
            p = {s: sp.Rational(random.randint(-40, 40), random.randint(1, 9)) for s in sims}
            try:
                a, b = e.subs(p), r.subs(p)
            except ZeroDivisionError:
                continue
            if a.has(sp.zoo, sp.nan) or b.has(sp.zoo, sp.nan):
                continue
            if sp.nsimplify(a - b) != 0:
                mal(f'tema {tema}: {enun} y {res} difieren en {p}')
                break
            ok += 1
            if ok == 20:
                break
        if tema != 1:
            clave = (tema, sp.simplify(r))
            if clave in vistos:
                mal(f'tema {tema}: la respuesta {res} se repite')
            vistos[clave] = enun
        if escrito and html and escrito not in html:
            mal(f'la página no tiene escrito {escrito} (tema {tema})')
        if html and tema != 1:
            signo = '−' if ctrl < 0 else ''
            txt = (f'{signo}{abs(ctrl.numerator)}' if ctrl.denominator == 1 else
                   f"Q('{signo}{abs(ctrl.numerator)}', '{ctrl.denominator}')")
            if txt not in html:
                mal(f'la página no escribe el valor del control {ctrl} (tema {tema}: {enun})')
        print(f'   ok  tema {tema}: {enun}  →  {res}   (control {punto}: {ctrl})')

    # ── el arranque: (x + 2)/x vale 3 solo para x = 1 ──
    x = LETRAS['x']
    if sp.solve(sp.Eq(ex('(x + 2)/x'), 3), x) != [1]:
        mal('el arranque: (x + 2)/x = 3 no tiene como única solución x = 1')
    else:
        print('   ok  arranque: (x + 2)/x = 3 solo si x = 1; con x = 2 da 2')

    # ── el puente ──
    for den, raices in PUENTE:
        rr = sorted(int(v) for v in sp.solve(ex(den), x) if v.is_real)
        if rr != sorted(raices):
            mal(f'puente: {den} se anula en {rr}, no en {raices}')
        else:
            print(f'   ok  puente: {den} se anula en {rr or "ningún número"}')
        for v in raices:
            if ex(den).subs(x, v) != 0:
                mal(f'puente: {den} no vale 0 en {v}')

    # ── tema 1: MCD y MCM ──
    for tipo, exps, res, escrito, punto in MCDM:
        ps = [ex(s) for s in exps]
        g = ps[0]
        for q in ps[1:]:
            g = sp.gcd(g, q) if tipo == 'MCD' else sp.lcm(g, q)
        r = ex(res)
        if sp.expand(g - r) != 0 and sp.expand(g + r) != 0:
            mal(f'tema 1: {tipo}{exps} es {sp.factor(g)}, no {res}')
            continue
        # el control con números: el MCD divide a cada valor, el MCM es múltiplo de cada uno
        vr = valor(r, punto)
        vs = [valor(q, punto) for q in ps]
        if tipo == 'MCD' and any(v % vr for v in vs):
            mal(f'tema 1: con {punto}, {vr} no divide a {vs}')
        if tipo == 'MCM' and any(vr % v for v in vs):
            mal(f'tema 1: con {punto}, {vr} no es múltiplo de {vs}')
        if html and escrito not in html:
            mal(f'la página no tiene escrito {escrito} (tema 1)')
        if html and str(vr) not in html:
            mal(f'la página no escribe el valor del control {vr} (tema 1)')
        print(f'   ok  tema 1: {tipo} de {" | ".join(exps)}  =  {res}   (con {punto}: {vr} y {vs})')

    # ── el desafío ──
    s = sum(F(1, n * (n + 1)) for n in range(1, 100))
    n = sp.Symbol('n')
    if sp.simplify(1 / n - 1 / (n + 1) - 1 / (n * (n + 1))) != 0 or s != DESAFIO:
        mal(f'desafío: la suma da {s}')
    else:
        print(f'   ok  desafío: 1/n − 1/(n + 1) = 1/(n(n + 1)), y la suma hasta 99 · 100 da {s}')
    if html and "R('99', '100')" not in html:
        mal('la página no escribe el resultado del desafío')

    # ── forma: los renglones del cuaderno no encadenan dos igualdades ──
    if html:
        for m in re.finditer(r"P\(([^\n]*)", html):
            for cad in re.findall(r"'([^']*)'|`([^`]*)`", m.group(1)):
                c = cad[0] or cad[1]
                if c.count(' = ') > 1:
                    mal(f'un renglón encadena dos igualdades: {c[:70]}')

    print()
    if fallos:
        print(f'{len(fallos)} fallas.')
        sys.exit(1)
    print(f'{len(OPS) + len(PUENTE) + len(MCDM) + 1} ejemplos verificados. Todo verificado.')


if __name__ == '__main__':
    main()
