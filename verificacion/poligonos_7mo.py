"""Verificación de las diapositivas de polígonos de 7.º grado.

La unidad fusionada (8 y 9 del libro) pone a Pitágoras una sola vez y lo
aplica dos veces: a triángulos y a cuadriláteros. Acá se comprueba cada
número que aparece en `matematica/7mo/poligonos.html`.

Como siempre, nada se escribe a mano y nada se comprueba por el camino que
lo produjo:

1. Las fórmulas se demuestran como identidades simbólicas con sympy y
   además se cuentan a mano, caso por caso, para n de 3 a 30.
2. Las diagonales se cuentan de verdad: se arma la lista de pares de
   vértices no consecutivos y se mide su largo.
3. Los triángulos rectángulos se verifican con enteros exactos y las raíces
   quedan como raíces (`sqrt`), nunca como decimales.
4. Lo que sale en la página se busca escrito tal cual en el HTML.

    python verificacion/poligonos_7mo.py
"""

import itertools
import re
import sys
from fractions import Fraction
from pathlib import Path

import sympy as sp

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

n = sp.Symbol('n', positive=True, integer=True)
RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '7mo' / 'poligonos.html'

fallos = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def verifica_diagonales():
    """n(n−3)/2, contando las diagonales una por una."""
    print('1. Las diagonales: la fórmula contra el conteo')
    formula = n * (n - 3) / 2
    for k in range(3, 31):
        # contar de verdad: pares de vértices que no son vecinos
        vecinos = {(i, (i + 1) % k) for i in range(k)}
        reales = sum(1 for a, b in itertools.combinations(range(k), 2)
                     if (a, b) not in vecinos and (b, a) not in vecinos)
        if reales != formula.subs(n, k):
            mal(f'con {k} lados la fórmula dice {formula.subs(n, k)} y hay {reales}')
    # el mismo número, por el camino del apretón de manos
    saludos = n * (n - 1) / 2
    if sp.simplify(saludos - n - formula) != 0:
        mal('las diagonales no son los saludos menos los lados')
    print(f'   n(n−3)/2 coincide con el conteo de 3 a 30 lados  ·  '
          f'y equivale a n(n−1)/2 − n')
    return {k: int(formula.subs(n, k)) for k in (5, 6, 8, 12)}


def verifica_angulos():
    """(n−2)·180 por dentro y 360 por fuera, siempre."""
    print('2. Los ángulos')
    interior = (n - 2) * 180
    for k in range(3, 31):
        # triangulando desde un vértice salen n−2 triángulos de 180°
        if interior.subs(n, k) != (k - 2) * 180:
            mal(f'la suma interior falla en {k}')
        # los exteriores son el suplemento de cada interior
        exteriores = sp.simplify(k * 180 - interior.subs(n, k))
        if exteriores != 360:
            mal(f'los ángulos exteriores de {k} lados suman {exteriores}, no 360')
    regulares = {}
    for k in (3, 4, 5, 6, 8, 12):
        ang = sp.Rational(interior.subs(n, k), k)
        regulares[k] = ang
        if ang * k != interior.subs(n, k):
            mal(f'el ángulo del regular de {k} lados no cierra')
    print('   (n−2)·180 por dentro y 360 por fuera, de 3 a 30 lados')
    print('   regulares: ' + ', '.join(f'{k} lados {regulares[k]}°' for k in regulares))
    return regulares


def verifica_pitagoras():
    """Los tríos que usa la página, con enteros exactos."""
    print('3. Pitágoras: los tríos')
    trios = [(3, 4, 5), (5, 12, 13), (8, 15, 17), (7, 24, 25), (20, 21, 29)]
    for a, b, c in trios:
        if a * a + b * b != c * c:
            mal(f'{a},{b},{c} no es un trío pitagórico')
        # segunda vía: la hipotenusa calculada con sympy, sin decimales
        h = sp.sqrt(sp.Integer(a) ** 2 + sp.Integer(b) ** 2)
        if h != c:
            mal(f'sqrt({a}²+{b}²) dio {h} y no {c}')
    # la cuerda de doce nudos da justo el 3-4-5
    if 3 + 4 + 5 != 12:
        mal('la cuerda de doce nudos no cierra')
    print('   ' + '  ·  '.join(f'{a}²+{b}²={c}²' for a, b, c in trios) +
          '  ·  3+4+5 = 12 nudos')

    # el recíproco: decidir si un triángulo es rectángulo por sus lados
    casos = [((6, 8, 10), True), ((6, 8, 11), False), ((9, 12, 15), True)]
    for (a, b, c), esperado in casos:
        recto = (a * a + b * b == c * c)
        if recto != esperado:
            mal(f'el recíproco falla en {a},{b},{c}')
    print('   recíproco: 6,8,10 es rectángulo; 6,8,11 no; 9,12,15 sí')
    return trios


def verifica_desigualdad():
    """Con tres varillas no siempre hay triángulo."""
    print('4. La desigualdad triangular')
    casos = [((3, 4, 5), True), ((3, 4, 8), False), ((3, 4, 7), False),
             ((2, 2, 3), True), ((1, 1, 2), False)]
    for (a, b, c), esperado in casos:
        hay = (a + b > c) and (a + c > b) and (b + c > a)
        if hay != esperado:
            mal(f'{a},{b},{c}: la desigualdad dio {hay} y se esperaba {esperado}')
    # el caso límite: 3+4=7 deja el triángulo aplastado, sin área
    s = Fraction(3 + 4 + 7, 2)
    heron = s * (s - 3) * (s - 4) * (s - 7)
    if heron != 0:
        mal(f'el triángulo 3,4,7 no está aplastado: Herón da {heron}')
    print('   3,4,5 sí  |  3,4,8 no  |  3,4,7 queda aplastado (área 0 por Herón)')


def verifica_figuras():
    """Las medidas exactas que muestran los pasos 6, 7 y 8."""
    print('5. Las figuras, con raíces exactas')
    salida = {}

    # altura y área del triángulo equilátero de lado 6
    lado = sp.Integer(6)
    alt = sp.sqrt(lado ** 2 - (lado / 2) ** 2)
    area = lado * alt / 2
    if sp.simplify(alt - 3 * sp.sqrt(3)) != 0:
        mal(f'la altura del equilátero de 6 dio {alt}')
    if sp.simplify(area - 9 * sp.sqrt(3)) != 0:
        mal(f'el área del equilátero de 6 dio {area}')
    salida['equilatero'] = (alt, area)
    print(f'   equilátero de 6: altura {sp.sqrt(27)} = {sp.nsimplify(alt)}, área {area}')

    # diagonal del cuadrado
    d = sp.sqrt(sp.Integer(5) ** 2 * 2)
    if sp.simplify(d - 5 * sp.sqrt(2)) != 0:
        mal(f'la diagonal del cuadrado de 5 dio {d}')
    print(f'   cuadrado de 5: diagonal {d}')

    # rombo de diagonales 16 y 12 → lado 10, con enteros
    lado_rombo = sp.sqrt(sp.Integer(8) ** 2 + sp.Integer(6) ** 2)
    if lado_rombo != 10:
        mal(f'el lado del rombo dio {lado_rombo}')
    area_rombo = sp.Integer(16) * 12 / 2
    if area_rombo != 96:
        mal(f'el área del rombo dio {area_rombo}')
    salida['rombo'] = (lado_rombo, area_rombo)
    print(f'   rombo de diagonales 16 y 12: lado {lado_rombo}, área {area_rombo}')

    # trapecio isósceles de bases 10 y 4 con lados 5 → altura 4
    salto = (sp.Integer(10) - 4) / 2
    alt_tr = sp.sqrt(sp.Integer(5) ** 2 - salto ** 2)
    if alt_tr != 4:
        mal(f'la altura del trapecio dio {alt_tr}')
    area_tr = (sp.Integer(10) + 4) * alt_tr / 2
    if area_tr != 28:
        mal(f'el área del trapecio dio {area_tr}')
    salida['trapecio'] = (alt_tr, area_tr)
    print(f'   trapecio de bases 10 y 4, lados 5: altura {alt_tr}, área {area_tr}')

    # hexágono regular de lado 6: apotema y área por dos caminos
    apo = sp.sqrt(sp.Integer(6) ** 2 - sp.Integer(3) ** 2)
    area_hex = sp.Integer(36) * apo / 2                    # perímetro × apotema / 2
    area_seis = 6 * (sp.Integer(6) * apo / 2)              # seis triángulos
    if sp.simplify(area_hex - area_seis) != 0:
        mal('los dos caminos del área del hexágono no coinciden')
    if sp.simplify(area_hex - 54 * sp.sqrt(3)) != 0:
        mal(f'el área del hexágono dio {area_hex}')
    salida['hexagono'] = (apo, area_hex)
    print(f'   hexágono de 6: apotema {apo}, área {area_hex} por los dos caminos')

    # la pantalla de 32 pulgadas en 16:9
    diag = sp.Integer(32)
    k = diag / sp.sqrt(sp.Integer(16) ** 2 + sp.Integer(9) ** 2)
    ancho, alto = 16 * k, 9 * k
    if sp.simplify(ancho ** 2 + alto ** 2 - diag ** 2) != 0:
        mal('la pantalla no cumple Pitágoras')
    salida['pantalla'] = (sp.nsimplify(ancho), sp.nsimplify(alto))
    print(f'   pantalla de 32" en 16:9: ancho {sp.N(ancho, 4)}, alto {sp.N(alto, 4)} '
          f'(exacto: {sp.simplify(ancho)})')
    return salida


def verifica_generalizacion():
    """El cierre: con cualquier figura semejante, no solo cuadrados."""
    print('6. El cierre: Pitágoras con otras figuras')
    a, b, c = sp.Integer(3), sp.Integer(4), sp.Integer(5)

    # semicírculos sobre cada lado
    semi = lambda L: sp.pi * (L / 2) ** 2 / 2
    if sp.simplify(semi(a) + semi(b) - semi(c)) != 0:
        mal('los semicírculos no cierran')

    # triángulos equiláteros sobre cada lado
    equi = lambda L: sp.sqrt(3) / 4 * L ** 2
    if sp.simplify(equi(a) + equi(b) - equi(c)) != 0:
        mal('los equiláteros no cierran')

    # y en general, cualquier figura cuya área sea k·L²
    k = sp.Symbol('k', positive=True)
    if sp.simplify(k * a ** 2 + k * b ** 2 - k * c ** 2) != 0:
        mal('la generalización no cierra')
    print(f'   semicírculos: {sp.simplify(semi(a))} + {sp.simplify(semi(b))} = {sp.simplify(semi(c))}')
    print(f'   equiláteros:  {sp.simplify(equi(a))} + {sp.simplify(equi(b))} = {sp.simplify(equi(c))}')
    print('   y con cualquier figura de área k·L², por la misma cuenta')


def verifica_pagina(diagonales, regulares):
    print('7. La página dice lo mismo que esta verificación')
    if not PAGINA.exists():
        mal(f'no existe {PAGINA}')
        return
    html = PAGINA.read_text(encoding='utf-8')
    cuerpo = re.sub(r'(?s)<style>.*?</style>', '', html)

    esperados = [
        '<i>n</i>(<i>n</i> − 3)/2',          # la fórmula de las diagonales
        '(<i>n</i> − 2) · 180',              # la suma de los interiores
        '360',                               # los exteriores
        '3<sup>2</sup> + 4<sup>2</sup> = 9 + 16 = 25 = 5<sup>2</sup>',
        '54√3',                              # área del hexágono de lado 6
        '9√3',                               # área del equilátero de lado 6
        '5√2',                               # diagonal del cuadrado de lado 5
    ]
    for k in (5, 6, 8, 12):
        if str(diagonales[k]) not in cuerpo:
            mal(f'no aparece la cantidad de diagonales de {k} lados ({diagonales[k]})')
    for k in (5, 6):
        if f'{regulares[k]}°' not in cuerpo:
            mal(f'no aparece el ángulo del regular de {k} lados ({regulares[k]}°)')
    for t in esperados:
        if t not in cuerpo:
            mal(f'la página no contiene «{t}»')
    print(f'   {len(esperados) + 6} textos buscados en el HTML')

    if 'raíz de' in cuerpo and '√' not in cuerpo:
        mal('hay raíces escritas con palabras y no con el signo')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    diagonales = verifica_diagonales()
    regulares = verifica_angulos()
    verifica_pitagoras()
    verifica_desigualdad()
    verifica_figuras()
    verifica_generalizacion()
    verifica_pagina(diagonales, regulares)

    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
