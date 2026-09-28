"""Verificación de las diapositivas de factorización de 8.º grado.

Cada ejemplo de `matematica/8vo/factoreo.html` es una expresión y su
factorización. Acá se comprueba, por dos caminos distintos:

1. Con sympy: la factorización, expandida, es la expresión original.
2. Con fracciones exactas: las dos valen lo mismo en veinte puntos al
   azar, y también en el punto del control que muestra la página.

Además se comprueba que la factorización sea completa (sympy no la puede
partir más, salvo lo que el ejemplo dice que no se parte) y que la página
tenga escritos tal cual la expresión, la factorización y el valor del
control.

    python verificacion/factoreo_8vo.py
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
PAGINA = RAIZ / 'matematica' / '8vo' / 'factoreo.html'
TR = standard_transformations + (implicit_multiplication_application, convert_xor)
LETRAS = {k: sp.Symbol(k) for k in 'abmnxyz'}

fallos = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def expr(s):
    """La expresión escrita como en la página (x^2, −, ·) para sympy."""
    s = s.replace('−', '-').replace('·', '*')
    return parse_expr(s, local_dict=LETRAS, transformations=TR)


# (tema, expresión, factorización, punto del control, valor del control)
# Las dos cadenas están escritas como en el guion de la página.
CASOS = [
 (1, '6x + 9', '3(2x + 3)', {'x': 10}, 69),
 (1, '6x^2 + 9x', '3x(2x + 3)', {'x': 10}, 690),
 (1, '10a^3b − 15a^2b^2 + 5a^2b', '5a^2b(2a − 3b + 1)', {'a': 2, 'b': 1}, 40),
 (1, '−4m^2 − 12m', '−4m(m + 3)', {'m': 10}, -520),
 (2, 'a(x + 2) + 3(x + 2)', '(x + 2)(a + 3)', {'a': 10, 'x': 10}, 156),
 (2, 'a(x + 2) − (x + 2)', '(x + 2)(a − 1)', {'a': 10, 'x': 10}, 108),
 (2, 'm(y − 3) + 2(3 − y)', '(y − 3)(m − 2)', {'m': 10, 'y': 10}, 56),
 (2, 'x(a + b) + (a + b)^2', '(a + b)(x + a + b)', {'a': 2, 'b': 1, 'x': 10}, 39),
 (3, 'ax + ay + 3x + 3y', '(x + y)(a + 3)', {'a': 10, 'x': 2, 'y': 1}, 39),
 (3, 'mx − my + 2x − 2y', '(x − y)(m + 2)', {'m': 10, 'x': 3, 'y': 1}, 24),
 (3, 'ab − 3a + 2b − 6', '(b − 3)(a + 2)', {'a': 10, 'b': 10}, 84),
 (3, 'ax + ay + az + 2x + 2y + 2z', '(x + y + z)(a + 2)', {'a': 10, 'x': 3, 'y': 2, 'z': 1}, 72),
 (3, '2x^2 − 6x − x + 3', '(x − 3)(2x − 1)', {'x': 10}, 133),
 (4, 'x^2 − 25', '(x + 5)(x − 5)', {'x': 10}, 75),
 (4, '9a^2 − 16b^2', '(3a + 4b)(3a − 4b)', {'a': 2, 'b': 1}, 20),
 (4, '(a + 1)^2 − 4', '(a + 3)(a − 1)', {'a': 10}, 117),
 (4, 'x^4 − 1', '(x^2 + 1)(x + 1)(x − 1)', {'x': 10}, 9999),
 (5, 'x^3 + 8', '(x + 2)(x^2 − 2x + 4)', {'x': 10}, 1008),
 (5, 'x^3 − 8', '(x − 2)(x^2 + 2x + 4)', {'x': 10}, 992),
 (5, '27a^3 + 1', '(3a + 1)(9a^2 − 3a + 1)', {'a': 10}, 27001),
 (5, '8m^3 − 125n^3', '(2m − 5n)(4m^2 + 10mn + 25n^2)', {'m': 10, 'n': 1}, 7875),
 (6, 'x^5 + 1', '(x + 1)(x^4 − x^3 + x^2 − x + 1)', {'x': 10}, 100001),
 (6, 'x^5 + 32', '(x + 2)(x^4 − 2x^3 + 4x^2 − 8x + 16)', {'x': 10}, 100032),
 (6, 'a^7 + b^7', '(a + b)(a^6 − a^5b + a^4b^2 − a^3b^3 + a^2b^4 − ab^5 + b^6)', {'a': 2, 'b': 1}, 129),
 (7, 'x^5 − 1', '(x − 1)(x^4 + x^3 + x^2 + x + 1)', {'x': 10}, 99999),
 (7, 'x^5 − 32', '(x − 2)(x^4 + 2x^3 + 4x^2 + 8x + 16)', {'x': 10}, 99968),
 (7, 'x^4 − 81', '(x^2 + 9)(x + 3)(x − 3)', {'x': 10}, 9919),
 (7, 'a^6 − 1', '(a + 1)(a^2 − a + 1)(a − 1)(a^2 + a + 1)', {'a': 2}, 63),
 (8, 'x^2 + 6x + 9', '(x + 3)^2', {'x': 10}, 169),
 (8, 'x^2 − 10x + 25', '(x − 5)^2', {'x': 10}, 25),
 (8, '4a^2 + 12ab + 9b^2', '(2a + 3b)^2', {'a': 2, 'b': 1}, 49),
 (8, '(a + b)^2 + 2(a + b) + 1', '(a + b + 1)^2', {'a': 2, 'b': 1}, 16),
 (9, 'x^2 + 5x + 6', '(x + 2)(x + 3)', {'x': 10}, 156),
 (9, 'x^2 − 7x + 12', '(x − 3)(x − 4)', {'x': 10}, 42),
 (9, 'x^2 + 2x − 15', '(x + 5)(x − 3)', {'x': 10}, 105),
 (9, 'x^2 − x − 20', '(x − 5)(x + 4)', {'x': 10}, 70),
 (10, '2x^2 + 7x + 3', '(x + 3)(2x + 1)', {'x': 10}, 273),
 (10, '3x^2 − 5x − 2', '(x − 2)(3x + 1)', {'x': 10}, 248),
 (10, '6x^2 + x − 2', '(3x + 2)(2x − 1)', {'x': 10}, 608),
 (10, '4x^2 + 4x − 3', '(2x + 3)(2x − 1)', {'x': 10}, 437),
 (11, 'x^3 + 3x^2 + 3x + 1', '(x + 1)^3', {'x': 10}, 1331),
 (11, 'x^3 + 6x^2 + 12x + 8', '(x + 2)^3', {'x': 10}, 1728),
 (11, 'x^3 − 9x^2 + 27x − 27', '(x − 3)^3', {'x': 10}, 343),
 (11, '8a^3 + 12a^2b + 6ab^2 + b^3', '(2a + b)^3', {'a': 2, 'b': 1}, 125),
 (12, '5x^2 + 20x + 20', '5(x + 2)^2', {'x': 10}, 720),
 (12, 'x^3 + x^2 + 4x + 4', '(x + 1)(x^2 + 4)', {'x': 10}, 1144),
 (12, 'x^2 − y^2 − 2y − 1', '(x + y + 1)(x − y − 1)', {'x': 10, 'y': 2}, 91),
 (13, '2x^2 − 18', '2(x + 3)(x − 3)', {'x': 10}, 182),
 (13, '3a^3 − 12a^2 + 12a', '3a(a − 2)^2', {'a': 10}, 1920),
 (13, 'x^3 − x', 'x(x + 1)(x − 1)', {'x': 10}, 990),
 (13, '5x^2 − 5x − 30', '5(x − 3)(x + 2)', {'x': 10}, 420),
 (14, '2x^4 − 32', '2(x^2 + 4)(x + 2)(x − 2)', {'x': 10}, 19968),
 (14, 'x^4 − 5x^2 + 4', '(x + 1)(x − 1)(x + 2)(x − 2)', {'x': 10}, 9504),
 (14, 'x^5 − x', 'x(x^2 + 1)(x + 1)(x − 1)', {'x': 10}, 99990),
 (0, 'n^4 + 4', '(n^2 − 2n + 2)(n^2 + 2n + 2)', {'n': 5}, 629),
]

# los que la página dice que no se factorizan (o que no son del caso)
NO_ES = [
 ('x^2 + 9', 'suma de cuadrados'),
 ('x^2 + 4x + 16', 'no es trinomio cuadrado perfecto'),
 ('x^3 + 3x^2 + 6x + 8', 'no es cuatrinomio cubo perfecto'),
]


def miles(v):
    """Como escribe la página los números grandes: 100 000."""
    v = int(v)
    s = f'{abs(v):,}'.replace(',', ' ')
    if abs(v) < 10000:
        s = str(abs(v))
    return ('−' if v < 0 else '') + s


def verifica_casos():
    print('Las factorizaciones')
    rnd = random.Random(8)
    for tema, e, f, punto, valor in CASOS:
        E, Fa = expr(e), expr(f)
        # 1. expandida, es la original
        if sp.expand(E - Fa) != 0:
            mal(f'tema {tema}: {f} no es {e}')
            continue
        # 2. en veinte puntos al azar, con fracciones exactas
        for _ in range(20):
            sub = {s: F(rnd.randint(-40, 40), rnd.randint(1, 9)) for s in E.free_symbols | Fa.free_symbols}
            if E.subs(sub) != Fa.subs(sub):
                mal(f'tema {tema}: {e} y {f} difieren en {sub}')
                break
        # el punto del control de la página
        sub = {LETRAS[k]: v for k, v in punto.items()}
        if E.subs(sub) != valor or Fa.subs(sub) != valor:
            mal(f'tema {tema}: el control de {e} no da {valor}')
        # completa: cada factor ya no se parte con enteros
        for factor in sp.Mul.make_args(Fa):
            base = factor.base if factor.is_Pow else factor
            if base.is_polynomial() and not base.is_number:
                partes = sp.factor_list(base)[1]
                if len(partes) > 1 or (partes and partes[0][1] > 1):
                    mal(f'tema {tema}: el factor {base} de {f} todavía se factoriza')
    print(f'   {len(CASOS)} factorizaciones: expandidas, en 20 puntos al azar, en el control y completas')

    for e, que in NO_ES:
        E = expr(e)
        if e == 'x^2 + 9':
            if len(sp.factor_list(E)[1]) != 1:
                mal('x^2 + 9 se factoriza')
        else:
            # no es el cuadrado ni el cubo de un binomio
            f2 = sp.factor(E)
            if f2.is_Pow and f2.exp in (2, 3):
                mal(f'{e} sí es {que}')
    print('   x^2 + 9, x^2 + 4x + 16 y x^3 + 3x^2 + 6x + 8 no son del caso, como dice la página')


def verifica_pagina():
    print('La página dice lo mismo que esta verificación')
    if not PAGINA.exists():
        mal(f'no existe {PAGINA}')
        return
    html = PAGINA.read_text(encoding='utf-8')
    cuerpo = re.sub(r'(?s)<style>.*?</style>', '', html)
    # lo resaltado con N() se lee sin el resaltado: ${N('−')} es −
    cuerpo = re.sub(r"\$\{N\('([^']*)'\)\}", r'\1', cuerpo)
    buscados = 0
    for tema, e, f, punto, valor in CASOS:
        for texto in (e, f, f'= {miles(valor)}'):
            buscados += 1
            if texto not in cuerpo:
                mal(f'tema {tema}: la página no contiene «{texto}»')
    for e, que in NO_ES:
        for texto in (e, que):
            buscados += 1
            if texto not in cuerpo:
                mal(f'la página no contiene «{texto}»')
    # las fracciones del tema 1 y del tema 4, escritas con Q()
    for texto in ("Q('2','9')}<i>x</i>(3<i>x</i> − 2)", "Q('14','3')", "Q('80','9')"):
        buscados += 1
        if texto not in cuerpo:
            mal(f'la página no contiene «{texto}»')
    print(f'   {buscados} textos buscados en el HTML')
    for pieza in ('assets/pizarra.js', 'assets/clase.js', 'Pizarra.unidad(', 'preguntas:', 'notas:'):
        if pieza not in cuerpo:
            mal(f'falta «{pieza}»')
    renglones = html.splitlines()
    for k in range(1, len(renglones)):
        if renglones[k].lstrip().startswith('control:') and not renglones[k - 1].rstrip().endswith(','):
            mal(f'línea {k + 1}: falta la coma antes de «control:», y la página no carga')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    verifica_casos()
    verifica_pagina()
    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
