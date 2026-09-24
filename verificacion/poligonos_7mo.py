"""Verificación de las diapositivas de polígonos de 7.º grado.

La unidad fusionada (8 y 9 del libro) sigue sus quince temas, con
Pitágoras una sola vez y aplicado después a triángulos y cuadriláteros.
Acá se comprueba cada número que aparece en `matematica/7mo/poligonos.html`.

Como siempre, nada se escribe a mano y nada se comprueba por el camino que
lo produjo:

1. Las fórmulas se demuestran como identidades con sympy y además se
   cuentan a mano, caso por caso (las diagonales, pares de vértices).
2. Los ángulos se resuelven con sympy y se controlan sumando.
3. Los triángulos rectángulos se verifican con enteros exactos, y las
   raíces quedan como raíces; la aproximación se controla aparte.
4. Las áreas se calculan por la fórmula y por otro corte de la figura.
5. Lo que sale en la página se busca escrito tal cual en el HTML.

    python verificacion/poligonos_7mo.py
"""

import itertools
import re
import sys
from fractions import Fraction as F
from pathlib import Path

import sympy as sp

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

n, x = sp.symbols('n x')
RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '7mo' / 'poligonos.html'

fallos = []
esperados = []          # (texto que tiene que aparecer en la página, de dónde sale)


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def aparece(texto, origen):
    esperados.append((texto, origen))


def diagonales_contadas(k):
    """Pares de vértices que no son vecinos."""
    return sum(1 for a, b in itertools.combinations(range(k), 2) if (b - a) % k not in (1, k - 1))


def por_tipo(k):
    """Diagonales agrupadas por cuántos vértices saltan (la cuenta de los controles)."""
    tipos = {}
    for a, b in itertools.combinations(range(k), 2):
        s = min((b - a) % k, (a - b) % k)
        if s > 1:
            tipos[s] = tipos.get(s, 0) + 1
    return tipos


def aprox(v, dec=2):
    """El número con coma, redondeado, como lo escribe la página."""
    return f'{float(v):.{dec}f}'.replace('.', ',')


# ══════════════════════════════════════════════════════════════════
def tema1():
    print('Tema 1 · Polígonos')
    formula = n * (n - 3) / 2
    for k in range(3, 31):
        if diagonales_contadas(k) != formula.subs(n, k):
            mal(f'con {k} lados la fórmula no coincide con el conteo')
    # pentágono: 5 de cada cosa
    if diagonales_contadas(5) != 5:
        mal('el pentágono no tiene 5 diagonales')
    aparece('5 lados, 5 vértices, 5 ángulos interiores y 5 diagonales', 'tema 1, pentágono')
    # hexágono: 3 desde un vértice y 9 en total, que por tipo son 6 + 3
    if 6 - 3 != 3 or 6 * 3 // 2 != diagonales_contadas(6):
        mal('el hexágono no cierra')
    if por_tipo(6) != {2: 6, 3: 3}:
        mal(f'el hexágono por tipo da {por_tipo(6)}')
    aparece('desde un vértice del hexágono salen 3 diagonales', 'tema 1, hexágono')
    aparece('el hexágono tiene 9 diagonales', 'tema 1, hexágono')
    aparece('6 + 3 = 9 ✓', 'tema 1, control por tipo')
    # octógono: 20, que por tipo son 8 + 8 + 4
    if formula.subs(n, 8) != 20 or diagonales_contadas(8) != 20:
        mal('el octógono no tiene 20 diagonales')
    if por_tipo(8) != {2: 8, 3: 8, 4: 4}:
        mal(f'el octógono por tipo da {por_tipo(8)}')
    aparece('el octógono tiene 20 diagonales', 'tema 1, octógono')
    aparece('8 + 8 + 4 = 20 ✓', 'tema 1, control por tipo')
    # el exterior de 125°
    beta = sp.solve(sp.Eq(125 + x, 180), x)[0]
    if beta != 55 or 125 + beta != 180:
        mal('el exterior de 125° no es 55°')
    aparece('el ángulo exterior mide 55°', 'tema 1, exterior')
    print('   n(n−3)/2 = conteo de 3 a 30 · hexágono 3 y 9 (6+3) · octógono 20 (8+8+4) · exterior 55°')


def tema2():
    print('Tema 2 · Convexos, cóncavos, regulares')
    # el rombo dibujado: diagonales de 260 y 150 dan ángulos de casi 120° y 60°
    import math
    ang = 2 * math.degrees(math.atan(130 / 75))
    if abs(ang - 120) > 0.2:
        mal(f'el rombo dibujado tiene {ang:.2f}° y no 120°')
    # el hexágono regular: cada ángulo (6 − 2)·180 / 6
    if sp.Rational(4 * 180, 6) != 120:
        mal('el ángulo del hexágono regular no es 120°')
    aparece('es convexo', 'tema 2, hexágono')
    aparece('es cóncavo', 'tema 2, hexágono hundido')
    aparece('convexo y regular: lados y ángulos iguales', 'tema 2, cuadrado')
    print(f'   hexágono regular 120° · rombo dibujado {ang:.2f}° y {180 - ang:.2f}°')


def tema3():
    print('Tema 3 · Nombres')
    for texto in ('octógono regular convexo', 'hexágono irregular cóncavo',
                  'decágono irregular cóncavo', 'dodecágono regular convexo'):
        aparece(texto, 'tema 3')
    # la estrella tiene 10 lados; la L, 6
    if 5 * 2 != 10:
        mal('la estrella no tiene 10 lados')
    print('   estrella 10 lados · L 6 lados')


def tema4():
    print('Tema 4 · Triángulo')
    casos = [((4, 5, 7), True), ((4, 5, 10), False), ((4, 5, 9), False)]
    for (a, b, c), esperado in casos:
        hay = a + b > c and a + c > b and b + c > a
        if hay != esperado:
            mal(f'{a},{b},{c}: la desigualdad dio {hay}')
    # 4, 5, 9 queda aplastado: área 0 por Herón
    s = F(4 + 5 + 9, 2)
    if s * (s - 4) * (s - 5) * (s - 9) != 0:
        mal('4, 5 y 9 no queda aplastado')
    aparece('sí se puede: 7 es menor que 4 + 5', 'tema 4, 4-5-7')
    aparece('no se puede: 4 + 5 no llega a 10', 'tema 4, 4-5-10')
    aparece('tampoco se puede: el triángulo queda aplastado', 'tema 4, 4-5-9')
    tercero = sp.solve(sp.Eq(x + 50 + 60, 180), x)[0]
    if tercero != 70 or 50 + 60 + tercero != 180:
        mal('el ángulo que falta no es 70°')
    aparece('el tercer ángulo mide 70°', 'tema 4, ángulo')
    print('   4-5-7 sí · 4-5-10 no · 4-5-9 aplastado (Herón 0) · 180 − 50 − 60 = 70')


def tema5():
    print('Tema 5 · Clases de triángulos')
    # 3-4-5 es rectángulo; 7-8-9 es acutángulo (el mayor al cuadrado < suma)
    if 3 ** 2 + 4 ** 2 != 5 ** 2:
        mal('3-4-5 no es rectángulo')
    if not 9 ** 2 < 7 ** 2 + 8 ** 2:
        mal('7-8-9 no es acutángulo')
    # 6, 6 y 120°: el tercer lado² = 36 + 36 − 2·36·cos120 = 108 > 72: obtuso
    tercero2 = 36 + 36 - 2 * 36 * sp.cos(sp.pi * 2 / 3)
    if not tercero2 > 72:
        mal('el isósceles de 120° no es obtusángulo')
    for texto in ('equilátero y acutángulo', 'isósceles y rectángulo', 'isósceles y obtusángulo',
                  'escaleno y rectángulo', 'escaleno y acutángulo'):
        aparece(texto, 'tema 5')
    print('   3-4-5 rectángulo · 7-8-9 acutángulo · 6-6-120° obtusángulo')


def tema6():
    print('Tema 6 · Ángulos del triángulo')
    a = sp.solve(sp.Eq(3 * x, 180), x)[0]
    b = sp.solve(sp.Eq(2 * x + 40, 180), x)[0]
    if a != 60 or b != 70:
        mal(f'equilátero {a}, isósceles {b}')
    aparece('cada ángulo mide 60°', 'tema 6, equilátero')
    aparece('los otros dos ángulos miden 70°', 'tema 6, isósceles')
    # exterior en B con Â = 70 y Ĉ = 50, y control por el interior
    ext = 70 + 50
    if ext != 120 or (180 - 70 - 50) + ext != 180:
        mal('el exterior no es 120°')
    aparece('el ángulo exterior en B mide 120°', 'tema 6, exterior')
    # con x: (x + 20) + 3x = 140
    sol = sp.solve(sp.Eq((x + 20) + 3 * x, 140), x)[0]
    A_, B_, C_ = sol + 20, 3 * sol, 180 - 140
    if sol != 30 or (A_, B_, C_) != (50, 90, 40) or A_ + B_ + C_ != 180:
        mal(f'el de x dio x = {sol} y {A_}, {B_}, {C_}')
    aparece('<i>x</i> = 30°, y los ángulos miden 50°, 90° y 40°', 'tema 6, con x')
    aparece('50° + 90° + 40° = 180° ✓', 'tema 6, control')
    print(f'   equilátero 60 · isósceles 70 · exterior 120 · x = {sol}: 50, 90, 40')


def tema7_8():
    print('Temas 7 y 8 · Elementos notables')
    # el baricentro parte la mediana en 2 a 1: mediana 12 → 8 y 4
    gm = sp.solve(sp.Eq(3 * x, 12), x)[0]
    ag = 2 * gm
    if (ag, gm) != (8, 4) or ag + gm != 12:
        mal(f'la mediana de 12 dio {ag} y {gm}')
    aparece('G está a 8 cm de A y a 4 cm de M', 'tema 8, baricentro')
    # comprobación con coordenadas: el baricentro está a 2/3 de la mediana
    A, B, C = (sp.Rational(175), sp.Rational(40)), (sp.Rational(335), sp.Rational(245)), (sp.Rational(55), sp.Rational(245))
    G = ((A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3)
    M = ((B[0] + C[0]) / 2, (B[1] + C[1]) / 2)
    if (G[0] - A[0], G[1] - A[1]) != (sp.Rational(2, 3) * (M[0] - A[0]), sp.Rational(2, 3) * (M[1] - A[1])):
        mal('el baricentro no está a 2/3 de la mediana')
    if 70 / 2 != 35:
        mal('la bisectriz de 70 no da 35')
    aparece('la bisectriz deja dos ángulos de 35°', 'tema 8, bisectriz')
    aparece('M está a 4 cm de B y a 4 cm de C', 'tema 7, circuncentro')
    print('   mediana 12 → 8 y 4 (G a 2/3, con coordenadas) · bisectriz 35°')


def tema9_11():
    print('Temas 9 a 11 · Cuadriláteros')
    d = sp.solve(sp.Eq(x + 90 + 90 + 70, 360), x)[0]
    if d != 110:
        mal(f'el cuarto ángulo dio {d}')
    aparece('el cuarto ángulo mide 110°', 'tema 9')
    if 3 * 180 != 540:
        mal('el pentágono no suma 540')
    aparece('los ángulos de un pentágono suman 540°', 'tema 9, pentágono')
    if 4 * (4 - 3) // 2 != diagonales_contadas(4):
        mal('el cuadrilátero no tiene 2 diagonales')
    # paralelogramo de 70°
    if (70 + (180 - 70)) * 2 != 360:
        mal('el paralelogramo no suma 360')
    aparece('los ángulos miden 70°, 110°, 70° y 110°', 'tema 10')
    aparece('cuatro triángulos rectángulos de catetos 4 y 3', 'tema 10, rombo')
    # trapecios
    b1 = sp.solve(sp.Eq(x + 90 + 90 + 60, 360), x)[0]
    a2 = sp.solve(sp.Eq(2 * x + 65 + 65, 360), x)[0]
    if b1 != 120 or b1 + 60 != 180:
        mal(f'el trapecio rectángulo dio {b1}')
    if a2 != 115 or a2 + 65 != 180:
        mal(f'el trapecio isósceles dio {a2}')
    if (180 - 80, 180 - 55) != (100, 125) or 80 + 55 + 125 + 100 != 360:
        mal('el trapecio escaleno no cierra')
    aparece('B̂ mide 120°', 'tema 11')
    aparece('los ángulos miden 65°, 65°, 115° y 115°', 'tema 11')
    aparece('los ángulos miden 80°, 55°, 125° y 100°', 'tema 11')
    print(f'   cuarto ángulo 110 · pentágono 540 · trapecios {b1}, {a2}, 100 y 125')


def pitagoras(b, c):
    """La hipotenusa exacta, por sympy, y comprobada con enteros."""
    h = sp.sqrt(sp.Integer(b) ** 2 + sp.Integer(c) ** 2)
    if h.is_Integer and h * h != b * b + c * c:
        mal(f'la hipotenusa de {b} y {c} no cierra')
    return h


def tema12():
    print('Tema 12 · Pitágoras')
    if pitagoras(3, 4) != 5 or pitagoras(8, 15) != 17:
        mal('3-4-5 u 8-15-17 no cierran')
    c = sp.sqrt(sp.Integer(13) ** 2 - 5 ** 2)
    if c != 12 or 5 ** 2 + 12 ** 2 != 13 ** 2:
        mal('el cateto de 13 y 5 no es 12')
    if 9 ** 2 + 12 ** 2 != 15 ** 2 or 9 ** 2 + 12 ** 2 == 16 ** 2:
        mal('el recíproco no distingue 9-12-15 de 9-12-16')
    aparece('la hipotenusa mide 5', 'tema 12')
    aparece('la hipotenusa mide 17', 'tema 12')
    aparece('el otro cateto mide 12', 'tema 12')
    aparece('sí es rectángulo', 'tema 12, recíproco')
    aparece('no es rectángulo', 'tema 12, recíproco')
    aparece('225 ≠ 256', 'tema 12, recíproco')
    print('   3-4-5 · 8-15-17 · 5-12-13 · 9-12-15 sí · 9-12-16 no')


def tema13():
    print('Tema 13 · Pitágoras en triángulos')
    h = sp.sqrt(sp.Integer(17) ** 2 - 8 ** 2)
    if h != 15:
        mal(f'la altura del isósceles dio {h}')
    P, A = 17 + 17 + 16, F(16 * 15, 2)
    if (P, A) != (50, 120) or 2 * F(8 * 15, 2) != A:
        mal(f'el isósceles dio P {P} y A {A}')
    aparece('la altura mide 15', 'tema 13')
    aparece('perímetro 50 y área 120', 'tema 13')
    # equilátero de 6: por Pitágoras y por la fórmula del libro
    h6 = sp.sqrt(sp.Integer(6) ** 2 - 3 ** 2)
    if sp.simplify(h6 - 3 * sp.sqrt(3)) != 0 or sp.simplify(sp.sqrt(3) / 2 * 6 - h6) != 0:
        mal(f'la altura del equilátero de 6 dio {h6}')
    a6 = 6 * h6 / 2
    if sp.simplify(a6 - 9 * sp.sqrt(3)) != 0:
        mal(f'el área del equilátero de 6 dio {a6}')
    aparece(f'altura 3√3 ≈ {aprox(h6)} y área 9√3 ≈ {aprox(a6)}', 'tema 13, equilátero de 6')
    # equilátero de 10
    h10 = sp.sqrt(3) / 2 * 10
    a10 = 10 * h10 / 2
    if sp.simplify(h10 ** 2 + 5 ** 2 - 100) != 0:
        mal('la altura del equilátero de 10 no cumple Pitágoras')
    aparece(f'altura 5√3 ≈ {aprox(h10)}, área 25√3 ≈ {aprox(a10)} y perímetro 30', 'tema 13, equilátero de 10')
    print(f'   isósceles h 15, P 50, A 120 · equilátero 6: {h6} ≈ {aprox(h6)}, {a6} · equilátero 10: {h10}, {a10}')


def tema14():
    print('Tema 14 · Problemas')
    for (hip, cat, busca, texto) in ((10, 6, 8, 'la escalera llega a 8 m de altura'),
                                     (25, 7, 24, 'el barrilete vuela a 24 m de altura')):
        if sp.sqrt(sp.Integer(hip) ** 2 - cat ** 2) != busca or cat ** 2 + busca ** 2 != hip ** 2:
            mal(texto)
        aparece(texto, 'tema 14')
    if pitagoras(12, 9) != 15:
        mal('la sombra no da 15')
    aparece('hay 15 m de punta a punta', 'tema 14')
    # los dos catetos iguales: 2x² = 100
    sol = [s for s in sp.solve(sp.Eq(2 * x ** 2, 100), x) if s > 0][0]
    if sp.simplify(sol - 5 * sp.sqrt(2)) != 0 or sp.simplify(2 * sol ** 2 - 100) != 0:
        mal(f'el cateto dio {sol}')
    aparece(f'cada cateto mide 5√2 ≈ {aprox(sol)} cm', 'tema 14, ecuación')
    print(f'   escalera 8 · sombra 15 · barrilete 24 · catetos iguales {sol} ≈ {aprox(sol)}')


def tema15():
    print('Tema 15 · Pitágoras en cuadriláteros')
    if pitagoras(8, 6) != 10 or 2 * (8 + 6) != 28 or 8 * 6 != 48:
        mal('el rectángulo no cierra')
    aparece('diagonal 10, perímetro 28 y área 48', 'tema 15')
    d = pitagoras(5, 5)
    if sp.simplify(d - 5 * sp.sqrt(2)) != 0:
        mal(f'la diagonal del cuadrado dio {d}')
    aparece(f'la diagonal mide 5√2 ≈ {aprox(d)}', 'tema 15')
    lado = pitagoras(4, 3)
    if lado != 5 or 4 * lado != 20 or F(8 * 6, 2) != 24 or 4 * F(4 * 3, 2) != 24:
        mal('el rombo no cierra')
    aparece('lado 5, perímetro 20 y área 24', 'tema 15')
    ob = pitagoras(8, 11 - 5)
    if ob != 10 or 11 + 5 + 8 + ob != 34 or F((11 + 5) * 8, 2) != 64 or 5 * 8 + F(6 * 8, 2) != 64:
        mal('el trapecio rectángulo no cierra')
    aparece('lado oblicuo 10, perímetro 34 y área 64', 'tema 15')
    h = sp.sqrt(sp.Integer(10) ** 2 - F(16 - 4, 2) ** 2)
    if h != 8 or F((16 + 4) * 8, 2) != 80 or 4 * 8 + 2 * F(6 * 8, 2) != 80:
        mal('el trapecio isósceles no cierra')
    aparece('altura 8, perímetro 40 y área 80', 'tema 15')
    print(f'   rectángulo 10, 28, 48 · cuadrado {d} · rombo 5, 20, 24 · trapecios 10, 34, 64 y 8, 40, 80')


def desafio():
    print('Desafío · el hexágono de lado 4')
    h = sp.sqrt(sp.Integer(4) ** 2 - 2 ** 2)
    area = 6 * (4 * h / 2)
    otra = 2 * ((8 + 4) * h / 2)                 # dos trapecios isósceles
    if sp.simplify(area - 24 * sp.sqrt(3)) != 0 or sp.simplify(area - otra) != 0:
        mal(f'el hexágono dio {area} y {otra}')
    aparece(f'el área del hexágono es 24√3 ≈ {aprox(area)}', 'desafío')
    # la soga de 12 nudos del arranque
    if 3 + 4 + 5 != 12 or 3 ** 2 + 4 ** 2 != 5 ** 2:
        mal('la soga de doce nudos no cierra')
    print(f'   seis triángulos y dos trapecios: {area} ≈ {aprox(area)} · soga 3+4+5 = 12')


def verifica_pagina():
    print('La página dice lo mismo que esta verificación')
    if not PAGINA.exists():
        mal(f'no existe {PAGINA}')
        return
    html = PAGINA.read_text(encoding='utf-8')
    cuerpo = re.sub(r'(?s)<style>.*?</style>', '', html)
    for texto, origen in esperados:
        if texto not in cuerpo:
            mal(f'la página no contiene «{texto}» ({origen})')
    print(f'   {len(esperados)} respuestas buscadas en el HTML')
    for pieza in ('assets/pizarra.js', 'assets/clase.js', 'Pizarra.unidad(', 'preguntas:', 'notas:'):
        if pieza not in cuerpo:
            mal(f'falta «{pieza}»')
    if re.search(r'raíz de \d', cuerpo):
        mal('hay raíces escritas con palabras y no con el signo')
    for n_, linea in enumerate(html.splitlines(), 1):
        if re.match(r"^( {8}| {4})[`']Control", linea):
            mal(f'línea {n_}: un control quedó entre los pasos, antes de la respuesta')
    renglones = html.splitlines()
    for k in range(1, len(renglones)):
        if renglones[k].lstrip().startswith('control:') and not renglones[k - 1].rstrip().endswith(','):
            mal(f'línea {k + 1}: falta la coma antes de «control:», y la página no carga')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    tema1(); tema2(); tema3(); tema4(); tema5(); tema6(); tema7_8(); tema9_11()
    tema12(); tema13(); tema14(); tema15(); desafio()
    verifica_pagina()
    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
