"""Verificación de las diapositivas de ecuaciones de segundo grado de 9.º.

Cada ecuación de `matematica/9no/cuadraticas.html` se resuelve con sympy y
cada solución se comprueba por otro camino: reemplazándola con fracciones
exactas (o con sympy, si tiene raíces) en la ecuación ORIGINAL. Las
soluciones que la página descarta se comprueban al revés: cumplen la
ecuación elevada al cuadrado, o anulan un denominador, pero no la original.
Las parábolas se controlan con el vértice por −b/2a y por completar el
cuadrado. Al final se busca cada respuesta escrita tal cual en el HTML.

    python verificacion/cuadraticas_9no.py
"""

import re
import sys
from pathlib import Path

import sympy as sp

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '9no' / 'cuadraticas.html'
x, k, m = sp.symbols('x k m')
R = sp.Rational
S = sp.sqrt

fallos = []
esperados = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def aparece(texto, origen):
    esperados.append((texto, origen))


def cumple(izq, der, v):
    """La solución v cumple la ecuación original izq = der (con v real)."""
    try:
        a, b = sp.nsimplify(izq.subs(x, v)), sp.nsimplify(der.subs(x, v))
    except ZeroDivisionError:
        return False
    if a.has(sp.zoo, sp.nan) or b.has(sp.zoo, sp.nan) or not (a.is_real and b.is_real):
        return False
    return sp.simplify(a - b) == 0


def caso(origen, izq, der, validas, descartadas=(), final=None):
    """validas: las soluciones de la página; descartadas: las que tacha."""
    izq, der = sp.sympify(izq), sp.sympify(der)
    sol = sp.solve(sp.Eq(izq, der), x)
    reales = sorted([s for s in sol if s.is_real], key=float)
    if sorted(validas, key=lambda v: float(v)) != reales:
        mal(f'{origen}: sympy da {reales} y la página {list(validas)}')
    for v in validas:
        if not cumple(izq, der, v):
            mal(f'{origen}: {v} no cumple la ecuación original')
    for v in descartadas:
        if cumple(izq, der, v):
            mal(f'{origen}: {v} se descarta pero cumple la original')
    if final:
        aparece(final, origen)


def dos(a, b):
    return f'x1 = {a} y x2 = {b}'


def unidad5():
    print('Unidad 5')
    # tema 1
    for texto in ('<i>a</i> = 3, <i>b</i> = −5 y <i>c</i> = 2: es completa',
                  '<i>a</i> = 1, <i>b</i> = 4 y <i>c</i> = −7: es completa',
                  '<i>a</i> = 2, <i>b</i> = −5 y <i>c</i> = 3: es completa',
                  '<i>a</i> = 5, <i>b</i> = 0 y <i>c</i> = −20: es incompleta'):
        aparece(texto, 'tema 1')
    if sp.Poly(sp.expand(2 * x**2 + 3 - 5 * x), x).all_coeffs() != [2, -5, 3]:
        mal('tema 1: 2x² + 3 = 5x no da 2, −5, 3')
    caso('tema 1, ¿cuáles cumplen?', x**2 - 2 * x - 3, 0, [-1, 3], [2],
         'la cumplen 3 y −1: una ecuación de segundo grado puede tener dos soluciones')
    # tema 2
    caso('tema 2, x² − 49', x**2 - 49, 0, [-7, 7], (), dos('7', '−7'))
    caso('tema 2, 3x² − 75', 3 * x**2 - 75, 0, [-5, 5], (), dos('5', '−5'))
    caso('tema 2, x² + 16', x**2 + 16, 0, [], (), 'no tiene solución en los números reales')
    caso('tema 2, x² − 5x', x**2 - 5 * x, 0, [0, 5], (), dos('0', '5'))
    caso('tema 2, 4x² + 6x', 4 * x**2 + 6 * x, 0, [R(-3, 2), 0], (), dos('0', '−3/2'))
    # tema 3
    caso('tema 3, x² + 7x + 10', x**2 + 7 * x + 10, 0, [-5, -2], (), dos('−2', '−5'))
    caso('tema 3, x² − 2x − 15', x**2 - 2 * x - 15, 0, [-3, 5], (), dos('5', '−3'))
    caso('tema 3, x² + 12 = 7x', x**2 + 12, 7 * x, [3, 4], (), dos('3', '4'))
    caso('tema 3, 2x² + 5x − 3', 2 * x**2 + 5 * x - 3, 0, [-3, R(1, 2)], (), dos('−3', '1/2'))
    caso('tema 3, x² − 10x + 25', x**2 - 10 * x + 25, 0, [5], (), 'una sola solución: <i>x</i> = 5, que se llama raíz doble')
    # tema 4
    caso('tema 4, x² − 5x + 6', x**2 - 5 * x + 6, 0, [2, 3], (), dos('3', '2'))
    caso('tema 4, 2x² + 3x − 2', 2 * x**2 + 3 * x - 2, 0, [-2, R(1, 2)], (), dos('1/2', '−2'))
    caso('tema 4, x² − 4x + 1', x**2 - 4 * x + 1, 0, [2 - S(3), 2 + S(3)], (), dos('2 + √3', '2 − √3'))
    caso('tema 4, 3x² − 2x − 8', 3 * x**2 - 2 * x - 8, 0, [R(-4, 3), 2], (), dos('2', '−4/3'))
    # tema 5
    caso('tema 5, x(x + 3) = 10', x * (x + 3), 10, [-5, 2], (), dos('−5', '2'))
    caso('tema 5, (x + 2)² = 3x + 10', (x + 2)**2, 3 * x + 10, [-3, 2], (), dos('−3', '2'))
    caso('tema 5, (x − 1)(x + 4) = 3x', (x - 1) * (x + 4), 3 * x, [-2, 2], (), dos('2', '−2'))
    caso('tema 5, 3x² − 5 = (x + 1)² − 2', 3 * x**2 - 5, (x + 1)**2 - 2, [-1, 2], (), dos('2', '−1'))
    # tema 6
    caso('tema 6, x²/4 − x/2 = 2', x**2 / 4 - x / 2, 2, [-2, 4], (), dos('4', '−2'))
    caso('tema 6, 3/x + x/2 = 5/2', 3 / x + x / 2, R(5, 2), [2, 3], (), dos('2', '3'))
    caso('tema 6, 1/(x − 1) + 1/(x + 1) = 4/3', 1 / (x - 1) + 1 / (x + 1), R(4, 3), [R(-1, 2), 2], (), dos('2', '−1/2'))
    caso('tema 6, x²/(x − 2) = 4/(x − 2)', x**2 / (x - 2), 4 / (x - 2), [-2], [2],
         'la única solución es <i>x</i> = −2; el 2 se descarta')
    # tema 7: las descartadas cumplen la ecuación elevada al cuadrado
    caso('tema 7, √(x + 3) = 4', S(x + 3), 4, [13], (), '<i>x</i> = 13')
    caso('tema 7, x − √(x + 1) = 5', x - S(x + 1), 5, [8], [3], 'la solución es <i>x</i> = 8; el 3 se descarta')
    caso('tema 7, √(2x + 3) = x', S(2 * x + 3), x, [3], [-1], 'la solución es <i>x</i> = 3; el −1 se descarta')
    caso('tema 7, √(5x − 1) = x + 1', S(5 * x - 1), x + 1, [1, 2], (), dos('1', '2') + ': esta vez sirven las dos')
    caso('tema 7, √(x² + 9) = x + 1', S(x**2 + 9), x + 1, [4], (), '<i>x</i> = 4')
    for eq, falsas in (((x - 5)**2 - (x + 1), [3]), (x**2 - (2 * x + 3), [-1])):
        for v in falsas:
            if eq.subs(x, v) != 0:
                mal(f'tema 7: {v} no aparece al elevar al cuadrado')
    # tema 8
    caso('tema 8, √(x + 5) = √(2x − 1)', S(x + 5), S(2 * x - 1), [6], (), '<i>x</i> = 6')
    caso('tema 8, √(x + 7) − √x = 1', S(x + 7) - S(x), 1, [9], (), '<i>x</i> = 9')
    caso('tema 8, √(x + 4) + √(x − 1) = 5', S(x + 4) + S(x - 1), 5, [5], (), '<i>x</i> = 5')
    caso('tema 8, √(2x + 1) + √(x − 3) = 4', S(2 * x + 1) + S(x - 3), 4, [4], [84], 'la solución es <i>x</i> = 4; el 84 se descarta')
    if sp.solve(x**2 - 88 * x + 336, x) != [4, 84]:
        mal('tema 8: x² − 88x + 336 no da 4 y 84')
    print('   temas 1 a 8: cada solución reemplazada en la original, y cada descartada controlada')


def unidad6():
    print('Unidad 6')
    # tema 9: discriminante
    for c_, n in ((5, 2), (9, 1), (13, 0)):
        D = 36 - 4 * c_
        if (D > 0) + (D >= 0) != n:
            mal(f'tema 9: x² − 6x + {c_} no tiene {n} soluciones')
    caso('tema 9, x² − 6x + 5', x**2 - 6 * x + 5, 0, [1, 5], (), dos('5', '1') + ': dos soluciones')
    caso('tema 9, x² − 6x + 9', x**2 - 6 * x + 9, 0, [3], (), 'una sola solución, <i>x</i> = 3: raíz doble')
    caso('tema 9, x² − 6x + 13', x**2 - 6 * x + 13, 0, [], (), 'no tiene soluciones reales')
    caso('tema 9, 4x² − 12x + 9', 4 * x**2 - 12 * x + 9, 0, [R(3, 2)], (), 'una sola solución, <i>x</i> = 3/2')
    if sorted(sp.solve(k**2 - 64, k)) != [-8, 8] or sp.discriminant(x**2 + 8 * x + 16, x) != 0:
        mal('tema 9: el valor de k no es ±8')
    aparece('<i>k</i> = 8 o <i>k</i> = −8', 'tema 9, k')
    # tema 10 y 11: completar el cuadrado
    caso('tema 10, x² + 6x = 16', x**2 + 6 * x, 16, [-8, 2], (), dos('2', '−8'))
    if sp.expand((x + 3)**2 - 25 - (x**2 + 6 * x - 16)) != 0:
        mal('tema 10: (x + 3)² = 25 no es x² + 6x = 16')
    caso('tema 10, x² − 4x − 5', x**2 - 4 * x - 5, 0, [-1, 5], (), dos('5', '−1'))
    caso('tema 10, x² + 8x + 7', x**2 + 8 * x + 7, 0, [-7, -1], (), dos('−1', '−7'))
    caso('tema 10, x² + 2x − 4', x**2 + 2 * x - 4, 0, [-1 - S(5), -1 + S(5)], (), dos('−1 + √5', '−1 − √5'))
    caso('tema 10, x² + 3x − 10', x**2 + 3 * x - 10, 0, [-5, 2], (), dos('2', '−5'))
    if sp.expand((x + R(3, 2))**2 - R(49, 4) - (x**2 + 3 * x - 10)) != 0:
        mal('tema 10: (x + 3/2)² = 49/4 no es x² + 3x − 10 = 0')
    caso('tema 11, 2x² + 4x − 16', 2 * x**2 + 4 * x - 16, 0, [-4, 2], (), dos('2', '−4'))
    caso('tema 11, 3x² − 12x + 9', 3 * x**2 - 12 * x + 9, 0, [1, 3], (), dos('3', '1'))
    caso('tema 11, 2x² − 5x + 2', 2 * x**2 - 5 * x + 2, 0, [R(1, 2), 2], (), dos('2', '1/2'))
    a, b, c = sp.symbols('a b c', nonzero=True)
    formula = sp.solve(a * x**2 + b * x + c, x)
    esperada = [(-b - S(b**2 - 4 * a * c)) / (2 * a), (-b + S(b**2 - 4 * a * c)) / (2 * a)]
    if sp.simplify(sum(formula) - sum(esperada)) != 0 or sp.simplify(formula[0] * formula[1] - c / a) != 0:
        mal('tema 11: la deducción no llega a la fórmula')
    if sp.simplify((x + b / (2 * a))**2 - (b**2 - 4 * a * c) / (4 * a**2) - (x**2 + b / a * x + c / a)) != 0:
        mal('tema 11: completar el cuadrado con letras no cierra')
    # temas 12 y 13: las parábolas, vértice por −b/2a y completando el cuadrado
    parabolas = [(1, -4, 3, (2, -1), [1, 3], 'una parábola cóncava con vértice (2, −1), que es un mínimo'),
                 (-1, 4, -3, (2, 1), [1, 3], 'una parábola convexa con vértice (2, 1), que es un máximo'),
                 (1, 2, -3, (-1, -4), [-3, 1], 'una parábola cóncava con vértice (−1, −4)'),
                 (1, -2, 3, (1, 2), [], 'una parábola cóncava con vértice (1, 2), que no toca el eje x'),
                 (1, 0, 0, (0, 0), [0], 'una parábola cóncava con vértice en el origen'),
                 (1, 0, -4, (0, -4), [-2, 2], 'la parábola de y = x², bajada 4 lugares: vértice (0, −4)'),
                 (-1, 2, 0, (1, 1), [0, 2], 'una parábola convexa con vértice (1, 1), que es un máximo')]
    for a_, b_, c_, V, raices, texto in parabolas:
        h = R(-b_, 2 * a_)
        if (h, a_ * h**2 + b_ * h + c_) != V:
            mal(f'parábola {a_}, {b_}, {c_}: el vértice no es {V}')
        forma = a_ * (x - V[0])**2 + V[1]
        if sp.expand(forma - (a_ * x**2 + b_ * x + c_)) != 0:
            mal(f'parábola {a_}, {b_}, {c_}: completando el cuadrado no da el mismo vértice')
        if sorted(s for s in sp.solve(a_ * x**2 + b_ * x + c_, x) if s.is_real) != raices:
            mal(f'parábola {a_}, {b_}, {c_}: las raíces no son {raices}')
        aparece(texto, 'temas 12 y 13')
    # los puntos de las tablas y los simétricos
    for (a_, b_, c_), pts in (((1, -4, 3), [(0, 3), (4, 3)]), ((-1, 4, -3), [(0, -3), (4, -3)]),
                              ((1, 2, -3), [(0, -3), (-2, -3)]), ((1, -2, 3), [(0, 3), (2, 3), (-1, 6), (3, 6)]),
                              ((1, 0, 0), [(1, 1), (-1, 1), (2, 4), (-2, 4)]), ((2, 0, 0), [(1, 2), (-1, 2), (2, 8), (-2, 8)]),
                              ((-1, 2, 0), [(-1, -3), (3, -3)])):
        for px, py in pts:
            if a_ * px**2 + b_ * px + c_ != py:
                mal(f'el punto ({px}, {py}) no está en y = {a_}x² + {b_}x + {c_}')
    # tema 14
    caso('tema 14, x² − 7x + 12', x**2 - 7 * x + 12, 0, [3, 4], (), 'las raíces suman 7 y su producto es 12: son ' + dos('3', '4'))
    r = sp.solve(2 * x**2 + x - 6, x)
    if sum(r) != R(-1, 2) or r[0] * r[1] != -3:
        mal('tema 14: 2x² + x − 6 no suma −1/2 o no multiplica −3')
    aparece('suman −1/2 y su producto es −3', 'tema 14')
    if sorted(sp.solve(x**2 - 2 * x - 15, x)) != [-3, 5]:
        mal('tema 14: 5 y −3 no son raíces')
    if sorted(sp.solve(x**2 + 2 * x - 8, x)) != [-4, 2]:
        mal('tema 14: las raíces de x² + 2x − 8 no son −4 y 2')
    aparece('no: el producto coincide pero la suma no; las raíces son −4 y 2', 'tema 14')
    mm = sp.solve((x**2 - m * x + 18).subs(x, 3), m)
    if mm != [9] or sorted(sp.solve(x**2 - 9 * x + 18, x)) != [3, 6]:
        mal('tema 14: m no es 9')
    aparece('<i>m</i> = 9 y la otra raíz es 6', 'tema 14')
    # tema 15: reconstrucción
    for raices, ecu in (([2, 5], x**2 - 7 * x + 10), ([-3, 4], x**2 - x - 12), ([R(1, 2), -3], 2 * x**2 + 5 * x - 3),
                        ([8, -2], x**2 - 6 * x - 16), ([5], x**2 - 10 * x + 25)):
        if sorted(sp.solve(ecu, x)) != sorted(raices):
            mal(f'tema 15: {ecu} no tiene raíces {raices}')
    for texto in ("M('x^2 − 7x + 10 = 0')", "M('x^2 − x − 12 = 0')", "M('2x^2 + 5x − 3 = 0')",
                  "con raíces 8 y −2", "M('x^2 − 10x + 25 = 0')"):
        aparece(texto, 'tema 15')
    # tema 16: problemas
    caso('tema 16, terreno', x * (13 - x), 40, [5, 8], ())
    aparece('los lados miden 8 m y 5 m', 'tema 16')
    caso('tema 16, consecutivos', x * (x + 1), 132, [-12, 11], ())
    aparece('los números son 11 y 12', 'tema 16')
    caso('tema 16, edades', x + 3, (x - 3)**2, [1, 6], ())
    aparece('Lucas tiene 6 años', 'tema 16')
    caso('tema 16, pelota', 20 * x - 5 * x**2, 15, [1, 3], ())
    aparece('al segundo 1, subiendo, y al segundo 3, bajando', 'tema 16')
    caso('tema 16, torta', 120000 / x - 120000 / (x + 2), 5000, [-8, 6], ())
    if 120000 / 6 != 20000 or 120000 / 8 != 15000:
        mal('tema 16: la torta no da 20 000 y 15 000')
    aparece('son 6 amigos, y cada uno paga ₲ 20 000', 'tema 16')
    # desafío y arranque
    caso('desafío', (x / 8)**2 + 12, x, [16, 48], ())
    aparece('había 48 monos, o 16: las dos cumplen el enunciado', 'desafío')
    caso('arranque', x * (x + 3), 40, [-8, 5], ())
    aparece('el ancho mide 5 m y el largo 8 m', 'arranque')
    print('   temas 9 a 16, desafío y arranque')


def verifica_pagina():
    print('La página dice lo mismo que esta verificación')
    html = PAGINA.read_text(encoding='utf-8')
    cuerpo = re.sub(r'(?s)<style>.*?</style>', '', html)
    cuerpo = cuerpo.replace('${R1}', 'x1 = ').replace('${R2}', 'x2 = ')
    cuerpo = re.sub(r"\$\{N\('([^']*)'\)\}", r'\1', cuerpo)
    for texto, origen in esperados:
        if texto not in cuerpo:
            mal(f'la página no contiene «{texto}» ({origen})')
    print(f'   {len(esperados)} respuestas buscadas en el HTML')
    for pieza in ('assets/pizarra.js', 'assets/clase.js', 'Pizarra.unidad(', 'preguntas:', 'notas:'):
        if pieza not in cuerpo:
            mal(f'falta «{pieza}»')
    renglones = html.splitlines()
    for n in range(1, len(renglones)):
        if renglones[n].lstrip().startswith('control:') and not renglones[n - 1].rstrip().endswith(','):
            mal(f'línea {n + 1}: falta la coma antes de «control:»')
    # nada de igualdades encadenadas en un renglón de cuenta ('a = b = c'): se
    # miran las cadenas de una línea que son cuentas, no frases (sin palabras
    # de cuatro letras o más)
    for fila in re.findall(r"'([^'`\n]{3,90})'", cuerpo):
        partes = re.split(r' (?:o|y) ', fila)          # «k = 8 o k = −8» son dos respuestas
        if any(p.count(' = ') >= 2 for p in partes) and not re.search(r'[a-záéíóúñ]{4,}', fila):
            mal(f'hay una cadena de igualdades en un renglón: «{fila}»')
    for frase in re.findall(r"Δ = [^,.'`]* = ", cuerpo):
        mal(f'hay una cadena de igualdades en una frase: «{frase}»')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    unidad5()
    unidad6()
    verifica_pagina()
    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
