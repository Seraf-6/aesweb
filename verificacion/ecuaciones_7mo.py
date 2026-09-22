"""Verificación de las diapositivas de ecuaciones lineales de 7.º grado.

Ningún resultado de `matematica/7mo/ecuaciones.html` se escribe a mano: cada
uno se calcula acá con sympy y se verifica **por un camino distinto del que lo
produjo**, con aritmética exacta (`Fraction`, nunca `float`).

Los tres controles:

1. sympy resuelve; la comprobación sustituye la raíz en la ecuación original
   evaluada con `Fraction` y exige que los dos lados den lo mismo.
2. Las identidades y los casos imposibles se prueban en 120 racionales al azar,
   no por manipulación simbólica.
3. El problema del rectángulo se verifica **en la situación** (¿el largo supera
   al ancho en 4?, ¿el perímetro da 52?), no en la ecuación que lo modela: si
   el planteo estuviera mal, la ecuación cerraría igual y la situación no.

Al final se abre el HTML y se exige que cada respuesta verificada aparezca
escrita tal cual. Así una respuesta no puede quedar mal tipeada en la página
aunque la cuenta de acá esté bien.

    python verificacion/ecuaciones_7mo.py
"""

import random
import re
import sys
from fractions import Fraction
from pathlib import Path

import sympy as sp

# la consola de Windows viene en cp1252 y se atraganta con los signos
# matemáticos; sin esto el guion falla al imprimir, no al verificar
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

x = sp.Symbol('x')
RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '7mo' / 'ecuaciones.html'

fallos = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


# ══════════════════════════════════════════════════════════════════
#  Las ecuaciones de la página
#  (rótulo, izquierda, derecha, cómo se muestra la respuesta en el HTML)
#  Las dos expresiones se escriben como funciones de Fraction para poder
#  evaluarlas sin pasar por sympy: esa es la segunda vía.
# ══════════════════════════════════════════════════════════════════
ECUACIONES = [
    ('paso 3 · la balanza',
     3 * x + 5, sp.Integer(20),
     lambda v: 3 * v + 5, lambda v: Fraction(20),
     '<i>x</i> = 5'),

    ('paso 4 · paréntesis',
     2 * (x + 5), sp.Integer(26),
     lambda v: 2 * (v + 5), lambda v: Fraction(26),
     '<i>x</i> = 8'),

    ('paso 4 · el atajo falso',
     2 * x + 5, sp.Integer(26),
     lambda v: 2 * v + 5, lambda v: Fraction(26),
     None),

    ('paso 5 · incógnita de los dos lados',
     7 * x - 4, 3 * x + 20,
     lambda v: 7 * v - 4, lambda v: 3 * v + 20,
     '<i>x</i> = 6'),

    ('paso 6 · fracciones',
     (x + 1) / 2 - (x - 3) / 5, sp.Integer(2),
     lambda v: Fraction(v + 1, 2) - Fraction(v - 3, 5), lambda v: Fraction(2),
     '<i>x</i> = 3'),

    ('paso 8 · el rectángulo',
     2 * x + 2 * (x + 4), sp.Integer(52),
     lambda v: 2 * v + 2 * (v + 4), lambda v: Fraction(52),
     '<i>x</i> = 11'),

    ('cierre · 3x = 5x',
     3 * x, 5 * x,
     lambda v: 3 * v, lambda v: 5 * v,
     '<i>x</i> = 0'),
]


def verifica_ecuaciones():
    print('1. Ecuaciones: sympy resuelve, Fraction comprueba')
    for rotulo, izq, der, f_izq, f_der, _ in ECUACIONES:
        soluciones = sp.solve(sp.Eq(izq, der), x)
        if len(soluciones) != 1:
            mal(f'{rotulo}: sympy no devolvió una única solución ({soluciones})')
            continue
        raiz = soluciones[0]
        if not raiz.is_rational:
            mal(f'{rotulo}: la raíz no es racional ({raiz})')
            continue

        # segunda vía: sustituir en la ecuación original, sin sympy
        v = Fraction(int(sp.fraction(raiz)[0]), int(sp.fraction(raiz)[1]))
        if f_izq(v) != f_der(v):
            mal(f'{rotulo}: al sustituir {v} los dos lados no coinciden '
                f'({f_izq(v)} ≠ {f_der(v)})')
            continue
        print(f'   {rotulo}: x = {v}  ·  sustituida, los dos lados dan {f_izq(v)}')


def verifica_siempre_y_nunca():
    """Identidad y caso imposible, probados en puntos al azar."""
    print('2. Identidad y ecuación imposible: 120 racionales al azar')
    rnd = random.Random(7)

    def puntos():
        for _ in range(120):
            yield Fraction(rnd.randint(-400, 400), rnd.randint(1, 60))

    # identidad: 2(x+3) = 2x+6, cierta para todos
    fallas = [p for p in puntos() if 2 * (p + 3) != 2 * p + 6]
    if fallas:
        mal(f'2(x+3) = 2x+6 falló en {fallas[:3]}')
    else:
        print('   2(x+3) = 2x + 6 se cumplió en los 120 puntos: es identidad')

    # imposible: x + 1 = x, falsa para todos
    aciertos = [p for p in puntos() if p + 1 == p]
    if aciertos:
        mal(f'x+1 = x resultó cierta en {aciertos[:3]}')
    else:
        print('   x + 1 = x falló en los 120 puntos: no tiene solución')

    # 0x = 0 vale siempre; 0x = 7 nunca
    if any(0 * p != 0 for p in puntos()):
        mal('0x = 0 no se cumplió en algún punto')
    if any(0 * p == 7 for p in puntos()):
        mal('0x = 7 se cumplió en algún punto')
    print('   0x = 0 vale en los 120; 0x = 7 en ninguno')


def verifica_ambiguedad():
    """Paso 2: las dos lecturas de 'el doble de un número aumentado en 5'."""
    print('3. Las dos lecturas de la frase, evaluadas en x = 4')
    v = Fraction(4)
    a = 2 * v + 5          # el doble de un número, aumentado en 5
    b = 2 * (v + 5)        # el doble de (un número aumentado en 5)
    esperado_a = sp.Integer(2 * 4 + 5)
    esperado_b = sp.Integer(2 * (4 + 5))
    if a != int(esperado_a) or b != int(esperado_b):
        mal(f'las lecturas no dan lo calculado por sympy ({a}, {b})')
    if a == b:
        mal('las dos lecturas dieron lo mismo: el ejemplo no muestra nada')
    print(f'   2x + 5 = {a}   ·   2(x + 5) = {b}   ·   difieren en {b - a}')


def verifica_atajo_falso():
    """Paso 4: sacar el paréntesis mal da otra raíz, y la original la rechaza."""
    print('4. El atajo falso del paso 4 se rechaza solo')
    bien = sp.solve(sp.Eq(2 * (x + 5), 26), x)[0]
    mal_ = sp.solve(sp.Eq(2 * x + 5, 26), x)[0]
    if bien == mal_:
        mal('el atajo falso da la misma raíz: el ejemplo no muestra nada')
    v = Fraction(int(sp.fraction(mal_)[0]), int(sp.fraction(mal_)[1]))
    izq = 2 * (v + 5)
    if izq == 26:
        mal(f'la raíz del atajo falso ({v}) satisface la ecuación original')
    print(f'   correcta x = {bien}  ·  del atajo x = {v}, y 2(x+5) da {izq}, no 26')


def verifica_ganchos():
    """Lo que afirman los recuadros ámbar, que también son respuestas."""
    print('5. Las afirmaciones de los ganchos')

    # paso 1: la identidad 3(x−2) = 3x−6 como atajo de cálculo mental.
    # El truco se comprueba con enteros de Python, que son exactos, y la
    # identidad en sí con sympy: dos caminos distintos para lo mismo.
    identidad = sp.expand(3 * (x - 2)) - (3 * x - 6)
    if sp.simplify(identidad) != 0:
        mal('3(x−2) no es 3x−6')
    atajos = [(3, 98, 100), (6, 99, 100), (4, 102, 100)]
    for k, n, redondo in atajos:
        derecho = k * n
        atajo = k * redondo + k * (n - redondo)
        if derecho != atajo:
            mal(f'el atajo de {k} · {n} no da lo mismo ({derecho} ≠ {atajo})')
        if int(sp.Integer(k) * sp.Integer(n)) != derecho:
            mal(f'sympy no coincide en {k} · {n}')
    print('   3(x−2) = 3x−6 y los atajos: ' +
          ', '.join(f'{k}·{n} = {k * n}' for k, n, _ in atajos))

    # paso 4: dividir primero por 2 lleva al mismo lugar
    otro = sp.solve(sp.Eq(x + 5, 13), x)[0]
    if otro != sp.solve(sp.Eq(2 * (x + 5), 26), x)[0]:
        mal('dividir primero por 2 no da la misma raíz')
    print(f'   2(x+5) = 26 dividido primero por 2 da x + 5 = 13, y de ahí x = {otro}')

    # paso 5: restar 7x en vez de 3x llega al mismo x
    camino_largo = sp.solve(sp.Eq(-4, -4 * x + 20), x)[0]
    if camino_largo != sp.solve(sp.Eq(7 * x - 4, 3 * x + 20), x)[0]:
        mal('el camino con negativos del paso 5 no da la misma raíz')
    print(f'   −4 = −4x + 20 da x = {camino_largo}: el mismo que el camino corto')

    # paso 6: la distribución del menos, como identidad
    izq = 5 * (x + 1) - 2 * (x - 3)
    if sp.simplify(izq - (3 * x + 11)) != 0:
        mal(f'5(x+1) − 2(x−3) no es 3x + 11 sino {sp.expand(izq)}')
    if sp.simplify(izq - (3 * x - 1)) == 0:
        mal('el error del menos daría lo mismo: el gancho no muestra nada')
    print(f'   5(x+1) − 2(x−3) = {sp.expand(izq)}  ·  con el menos mal repartido daría 3x − 1')

    # paso 6: en x = 3 el segundo término se anula
    if Fraction(3 - 3, 5) != 0:
        mal('en x = 3 el segundo término no se anula')
    print('   en x = 3 el término (x−3)/5 vale 0: el control más barato')


def verifica_rectangulo():
    """Paso 8: se comprueba en la situación, no en la ecuación."""
    print('6. El rectángulo, verificado en la situación')
    ancho = sp.solve(sp.Eq(2 * x + 2 * (x + 4), 52), x)[0]
    a = Fraction(int(ancho))
    largo = a + 4
    if largo - a != 4:
        mal('el largo no supera al ancho en 4 m')
    if 2 * (a + largo) != 52:
        mal(f'el perímetro no da 52 sino {2 * (a + largo)}')
    if a <= 0:
        mal('el ancho no es positivo: no sirve como medida')
    print(f'   ancho {a} m, largo {largo} m  ·  {largo} − {a} = 4  ·  '
          f'2({a} + {largo}) = {2 * (a + largo)}')
    return a, largo


def verifica_grafica():
    """Paso 7: el cruce de y = 2x − 1 con y = 5 es la raíz de 2x − 1 = 5."""
    print('7. La gráfica: el cruce es la solución')
    raiz = sp.solve(sp.Eq(2 * x - 1, 5), x)[0]
    v = Fraction(int(raiz))
    altura = 2 * v - 1
    if altura != 5:
        mal(f'en x = {v} la recta no pasa por 5 sino por {altura}')
    print(f'   y = 2x − 1 vale {altura} en x = {v}: ahí cruza a y = 5')
    return v


def verifica_pagina(rect, cruce):
    """Que la página muestre exactamente lo verificado."""
    print('8. La página dice lo mismo que esta verificación')
    if not PAGINA.exists():
        mal(f'no existe {PAGINA}')
        return
    html = PAGINA.read_text(encoding='utf-8')

    esperados = [t for *_, t in ECUACIONES if t]
    ancho, largo = rect
    esperados += [
        f'{ancho} m', f'{largo} m',
        f'<i>x</i> = {cruce}',
        '21/2',    # la raíz del atajo falso del paso 4, escrita como fracción
        '31',      # lo que da la ecuación original con esa raíz
        '300 − 6 = <b>294</b>',   # el atajo de cálculo del paso 1
    ]
    for t in esperados:
        if t not in html:
            mal(f'la página no contiene la respuesta verificada «{t}»')
    print(f'   {len(esperados)} respuestas buscadas en el HTML')

    # La raíz del atajo falso es 21/2 y así tiene que estar escrita: si aparece
    # como decimal, alguien redondeó una respuesta exacta. (Se mira solo el
    # cuerpo de la página: en el CSS los 10.5px son tamaños, no respuestas.)
    cuerpo = re.sub(r'(?s)<style>.*?</style>', '', html)
    for sospechoso in ('10.5', '10,5'):
        if sospechoso in cuerpo:
            mal(f'una respuesta exacta quedó escrita como decimal: «{sospechoso}»')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    verifica_ecuaciones()
    verifica_siempre_y_nunca()
    verifica_ambiguedad()
    verifica_atajo_falso()
    verifica_ganchos()
    rect = verifica_rectangulo()
    cruce = verifica_grafica()
    verifica_pagina(rect, cruce)

    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
