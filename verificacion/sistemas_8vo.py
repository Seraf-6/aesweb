"""Verificación de las diapositivas de sistemas de ecuaciones de 8.º grado.

Cada sistema de `matematica/8vo/sistemas.html` se resuelve con sympy y la
solución se comprueba por otro camino: reemplazando en las dos ecuaciones
con fracciones exactas, y con la regla de Cramer. Los sistemas sin
solución o con infinitas se clasifican por el determinante y por el rango.
Al final se busca en la página cada respuesta escrita tal cual.

    python verificacion/sistemas_8vo.py
"""

import re
import sys
from fractions import Fraction as F
from pathlib import Path

import sympy as sp

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '8vo' / 'sistemas.html'
x, y, k = sp.symbols('x y k')

fallos = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


# (tema, (a1, b1, c1), (a2, b2, c2), solución esperada, texto de la respuesta)
# cada ecuación es a·x + b·y = c
CON_SOLUCION = [
 (1, (1, 1, 5), (1, -1, 1), (3, 2), '(3, 2) cumple las dos'),
 (1, (1, 2, 4), (3, -1, 5), (2, 1), 'la solución es (2, 1)'),
 (2, (-2, 1, 1), (1, 1, 4), (1, 3), 'una sola solución: (1, 3)'),
 (3, (1, 1, 6), (1, -1, 2), (4, 2), 'la solución es (4, 2)'),
 (3, (-2, 1, -1), (1, 1, 5), (2, 3), 'la solución es (2, 3)'),
 (3, (2, 1, 1), (1, -1, -4), (-1, 3), 'la solución es (−1, 3)'),
 (4, (-2, 1, 0), (1, 1, 12), (4, 8), '<i>x</i> = 4 e <i>y</i> = 8'),
 (4, (1, 3, 10), (2, -1, 6), (4, 2), '<i>x</i> = 4 e <i>y</i> = 2'),
 (4, (3, -2, 1), (4, 1, 16), (3, 4), '<i>x</i> = 3 e <i>y</i> = 4'),
 (4, (1, 1, 3), (1, -1, 0), (F(3, 2), F(3, 2)), "exactos"),
 (5, (-3, 1, -2), (-1, 1, 4), (3, 7), '<i>x</i> = 3 e <i>y</i> = 7'),
 (5, (1, 1, 7), (1, -2, 1), (5, 2), '<i>x</i> = 5 e <i>y</i> = 2'),
 (5, (2, 1, 8), (3, -1, 7), (3, 2), '<i>x</i> = 3 e <i>y</i> = 2'),
 (5, (2, 3, 13), (3, -2, 0), (2, 3), '<i>x</i> = 2 e <i>y</i> = 3'),
 (6, (1, 1, 9), (1, -1, 3), (6, 3), '<i>x</i> = 6 e <i>y</i> = 3'),
 (6, (3, 2, 16), (5, -2, 0), (2, 5), '<i>x</i> = 2 e <i>y</i> = 5'),
 (6, (2, 3, 13), (1, 1, 5), (2, 3), '<i>x</i> = 2 e <i>y</i> = 3'),
 (6, (3, 4, 10), (2, -3, 1), (2, 1), '<i>x</i> = 2 e <i>y</i> = 1'),
 (7, (1, 1, 20), (2, 4, 56), (12, 8), 'hay 12 gallinas y 8 chanchos'),
 (7, (1, 1, 40), (1, -1, 12), (26, 14), 'los números son 26 y 14'),
 (7, (3, 2, 21000), (2, 3, 19000), (5000, 3000), 'la empanada cuesta ₲ 5000 y la gaseosa ₲ 3000'),
 (7, (2, 2, 34), (1, -1, 5), (11, 6), 'el largo mide 11 m y el ancho 6 m'),
 (7, (1, -3, 0), (1, -2, 5), (15, 5), 'Ana tiene 15 años y su hermano 5'),
]

# (tema, ecuación 1, ecuación 2, 'ninguna' o 'infinitas', texto)
SIN_UNICA = [
 (2, (2, 1, 3), (2, 1, 7), 'ninguna', 'no tiene solución: las rectas son paralelas'),
 (2, (1, -1, 2), (3, -3, 6), 'infinitas', 'tiene infinitas soluciones'),
 (2, (1, -1, 2), (3, -3, 9), 'ninguna', 'no tiene solución: las rectas son paralelas'),
]


def resuelve(e1, e2):
    s = sp.solve([sp.Eq(e1[0] * x + e1[1] * y, e1[2]), sp.Eq(e2[0] * x + e2[1] * y, e2[2])], [x, y], dict=True)
    return s


def verifica():
    print('Los sistemas con una solución')
    for tema, e1, e2, (sx, sy), texto in CON_SOLUCION:
        sol = resuelve(e1, e2)
        if len(sol) != 1 or (sol[0][x], sol[0][y]) != (sx, sy):
            mal(f'tema {tema}: {e1}, {e2} dio {sol} y no ({sx}, {sy})')
            continue
        # otro camino: reemplazar con fracciones, y Cramer
        for a, b, c in (e1, e2):
            if a * F(sx) + b * F(sy) != c:
                mal(f'tema {tema}: ({sx}, {sy}) no cumple {a}x + {b}y = {c}')
        D = e1[0] * e2[1] - e2[0] * e1[1]
        if D == 0 or F(e1[2] * e2[1] - e2[2] * e1[1], D) != sx or F(e1[0] * e2[2] - e2[0] * e1[2], D) != sy:
            mal(f'tema {tema}: Cramer no coincide')
    print(f'   {len(CON_SOLUCION)} sistemas, por sympy, reemplazando y por Cramer')

    print('Los sistemas sin una única solución')
    for tema, e1, e2, tipo, texto in SIN_UNICA:
        D = e1[0] * e2[1] - e2[0] * e1[1]
        rango = sp.Matrix([list(e1), list(e2)]).rank()
        real = 'infinitas' if D == 0 and rango == 1 else 'ninguna' if D == 0 else 'una'
        if real != tipo:
            mal(f'tema {tema}: {e1}, {e2} es «{real}» y no «{tipo}»')
    print('   2 incompatibles y 1 equivalente, por el determinante y el rango')

    # el desafío: 2x + ky = 4 y x + 3y = 2 son la misma recta solo con k = 6
    ks = sp.solve(sp.Eq(2 * 3 - 1 * k, 0), k)
    if ks != [6] or sp.Matrix([[2, 6, 4], [1, 3, 2]]).rank() != 1:
        mal(f'el desafío dio k = {ks}')
    for px, py in ((2, 0), (-1, 1)):
        if 2 * px + 6 * py != 4 or px + 3 * py != 2:
            mal(f'el punto ({px}, {py}) del control del desafío no está en la recta')
    # la pregunta de arranque: una incógnita
    g = sp.solve(sp.Eq(x + x + 20000, 80000), x)[0]
    if (g, g + 20000) != (30000, 50000):
        mal('la pregunta de arranque no da 30 000 y 50 000')
    print(f'   desafío k = 6 · arranque: gorra {g}, remera {g + 20000}')


def miles(v):
    return f'{v:,}'.replace(',', ' ') if abs(v) >= 10000 else str(v)


def verifica_pagina():
    print('La página dice lo mismo que esta verificación')
    html = PAGINA.read_text(encoding='utf-8')
    cuerpo = re.sub(r'(?s)<style>.*?</style>', '', html)
    cuerpo = re.sub(r"\$\{N\('([^']*)'\)\}", r'\1', cuerpo)
    buscados = [t for *_, t in CON_SOLUCION] + [t for *_, t in SIN_UNICA] + [
        'con <i>k</i> = 6', 'la gorra cuesta ₲ 30 000 y la remera ₲ 50 000', "Q('3','2')"]
    for t in buscados:
        if t not in cuerpo:
            mal(f'la página no contiene «{t}»')
    print(f'   {len(buscados)} respuestas buscadas en el HTML')
    for pieza in ('assets/pizarra.js', 'assets/clase.js', 'Pizarra.unidad(', 'preguntas:', 'notas:'):
        if pieza not in cuerpo:
            mal(f'falta «{pieza}»')
    renglones = html.splitlines()
    for n in range(1, len(renglones)):
        if renglones[n].lstrip().startswith('control:') and not renglones[n - 1].rstrip().endswith(','):
            mal(f'línea {n + 1}: falta la coma antes de «control:»')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    verifica()
    verifica_pagina()
    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
