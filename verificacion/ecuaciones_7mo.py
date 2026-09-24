"""Verificación de la clase de ecuaciones lineales de 7.º grado.

Cubre `matematica/7mo/ecuaciones.html`, que sigue los siete temas de la
unidad 7 del libro (págs. 132–150): igualdades, expresión algebraica,
ecuaciones lineales, representación gráfica, ecuaciones con fracciones,
simbolizaciones y resolución de problemas. Los ejemplos son propios; los
del libro no se copian.

Ningún resultado se escribe a mano. Cada uno se calcula con sympy y se
comprueba **por un camino distinto del que lo produjo**:

1. sympy resuelve la ecuación; la comprobación sustituye la raíz en la
   ecuación original evaluada con `Fraction`, sin pasar por sympy.
2. Las identidades y las ecuaciones imposibles se prueban en 120 racionales
   al azar, no por manipulación simbólica.
3. Los puntos de las gráficas se calculan con Fraction y se controla que
   estén alineados con un tercero, como pide el libro.
4. Los problemas se verifican **en la situación del enunciado**, no en la
   ecuación que los modela: si el planteo estuviera mal, la ecuación
   cerraría igual y la situación no.
5. Dentro de cada tema, dos ejemplos no pueden dar la misma respuesta: cada
   uno cambia una sola cosa respecto del anterior, y ese cambio tiene que
   mostrar algo nuevo.
6. Al final se abre el HTML y se exige que cada respuesta verificada esté
   escrita tal cual.

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

x, y = sp.symbols('x y')
RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '7mo' / 'ecuaciones.html'
F = Fraction

fallos = []
esperados = []          # (texto que tiene que aparecer en la página, de dónde sale)


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def aparece(texto, origen):
    esperados.append((texto, origen))


def frac(valor):
    num, den = sp.fraction(sp.nsimplify(valor))
    return F(int(num), int(den))


def resuelve(izq, der, f_izq, f_der, rotulo):
    """sympy resuelve; Fraction comprueba en la ecuación original."""
    sol = sp.solve(sp.Eq(izq, der), x)
    if len(sol) != 1:
        mal(f'{rotulo}: sympy no dio una única solución ({sol})')
        return None
    v = frac(sol[0])
    if f_izq(v) != f_der(v):
        mal(f'{rotulo}: al sustituir {v} los miembros dan {f_izq(v)} y {f_der(v)}')
        return None
    return v


def sin_repetir(tema, respuestas):
    vistos = {}
    for rotulo, v in respuestas:
        if v in vistos:
            mal(f'tema {tema}: «{rotulo}» y «{vistos[v]}» dan lo mismo ({v})')
        vistos[v] = rotulo


def html_num(v):
    """Cómo escribe la página un racional: negativos con −, fracciones con /."""
    v = F(v)
    signo = '−' if v < 0 else ''
    a = abs(v)
    return signo + (str(a.numerator) if a.denominator == 1
                    else f'{a.numerator}/{a.denominator}')


# ══════════════════════════════════════════════════════════════════
#  Tema 1 · Igualdades (págs. 134–135)
#  La misma igualdad, 2 · 6 + 3 = 15, y una propiedad distinta cada vez.
# ══════════════════════════════════════════════════════════════════
def tema1():
    print('Tema 1 · Igualdades')
    izq, der = 2 * 6 + 3, 15
    if izq != der:
        mal('la igualdad de partida no es cierta')
    casos = [
        ('sumar 5',         izq + 5,  der + 5),
        ('multiplicar por 2', izq * 2, der * 2),
        ('dividir por 3',   F(izq, 3), F(der, 3)),
        ('elevar al cuadrado', izq ** 2, der ** 2),
    ]
    for rotulo, a, b in casos:
        if a != b:
            mal(f'tema 1, {rotulo}: {a} ≠ {b}')
        aparece(f'{html_num(a)} = {html_num(b)}', f'tema 1, {rotulo}')
    print('   2 · 6 + 3 = 15 → ' + ' · '.join(f'{r}: {a} = {b}' for r, a, b in casos))

    # el recuadro: 4 · 7 + 2 = 5 · □
    falta = sp.solve(sp.Eq(4 * 7 + 2, 5 * x), x)[0]
    if 4 * 7 + 2 != 5 * frac(falta):
        mal('el recuadro no cierra')
    aparece(f'el número que falta es {falta}', 'tema 1, recuadro')
    print(f'   4 · 7 + 2 = 5 · □ → □ = {falta}')

    # la pregunta del observador: sin paréntesis el · 2 solo le toca al 3
    sin_parentesis = 2 * 6 + 3 * 2
    if sin_parentesis == (2 * 6 + 3) * 2:
        mal('sin paréntesis da lo mismo: la pregunta del observador no muestra nada')
    aparece(f'da {sin_parentesis}, no {(2 * 6 + 3) * 2}', 'tema 1, observador: paréntesis')
    print(f'   2 · 6 + 3 · 2 = {sin_parentesis}, no {(2 * 6 + 3) * 2}: el paréntesis hace falta')

    # dividir por cero no es una propiedad: con 0 · 3 = 0 · 5 se llegaría a 3 = 5
    if 0 * 3 != 0 * 5 or 3 == 5:
        mal('el ejemplo del cero no muestra lo que dice')
    print('   0 · 3 = 0 · 5 es cierta, y dividir por 0 daría 3 = 5')


# ══════════════════════════════════════════════════════════════════
#  Tema 2 · Expresión algebraica (págs. 136–137)
#  Tres igualdades que difieren en un solo número: identidad, imposible,
#  ecuación. Después, una por simple inspección.
# ══════════════════════════════════════════════════════════════════
def tema2():
    print('Tema 2 · Expresión algebraica')
    rnd = random.Random(7)
    puntos = [F(rnd.randint(-400, 400), rnd.randint(1, 60)) for _ in range(120)]

    # 3(x + 2) = 3x + 6 : se cumple siempre
    if any(3 * (p + 2) != 3 * p + 6 for p in puntos):
        mal('3(x+2) = 3x+6 falló en algún punto')
    for v in (1, 2, -2):
        aparece(f'{html_num(3 * (v + 2))} = {html_num(3 * v + 6)}', f'tema 2, identidad en {v}')
    aparece('es una identidad', 'tema 2, ejemplo 1')

    # 3(x + 2) = 3x + 2 : no se cumple nunca (6 = 2 disfrazado)
    if any(3 * (p + 2) == 3 * p + 2 for p in puntos):
        mal('3(x+2) = 3x+2 se cumplió en algún punto')
    aparece('no se cumple para ningún número', 'tema 2, ejemplo 2')

    # 3(x + 2) = 2x + 6 : solo en x = 0
    v = resuelve(3 * (x + 2), 2 * x + 6, lambda t: 3 * (t + 2), lambda t: 2 * t + 6,
                 'tema 2, ejemplo 3')
    if v != 0:
        mal(f'3(x+2) = 2x+6 no da x = 0 sino {v}')
    aparece('se cumple solo si <i>x</i> = 0', 'tema 2, ejemplo 3')

    # por simple inspección: x + 7 = 2x + 4
    w = resuelve(x + 7, 2 * x + 4, lambda t: t + 7, lambda t: 2 * t + 4, 'tema 2, inspección')
    aparece(f'<i>x</i> = {html_num(w)}', 'tema 2, inspección')

    # el contraejemplo de las preguntas: 2x + 3 no es 5x
    if 2 * 10 + 3 == 5 * 10:
        mal('2x + 3 y 5x coinciden en 10')
    aparece('23', 'tema 2, pregunta de 2x + 3')
    print(f'   3(x+2) = 3x+6 siempre · = 3x+2 nunca · = 2x+6 solo en x = {v} · '
          f'x + 7 = 2x + 4 → x = {w}')


# ══════════════════════════════════════════════════════════════════
#  Tema 3 · Ecuaciones lineales (págs. 138–139)
#  Las tres formas del libro, y después el paréntesis y el menos.
# ══════════════════════════════════════════════════════════════════
def tema3():
    print('Tema 3 · Ecuaciones lineales')
    ejemplos = [
        ('ax = b',             6 * x, sp.Integer(42),
         lambda t: 6 * t, lambda t: F(42)),
        ('ax + b = c',         6 * x - 5, sp.Integer(25),
         lambda t: 6 * t - 5, lambda t: F(25)),
        ('ax + b = cx + d',    6 * x - 5, 2 * x + 11,
         lambda t: 6 * t - 5, lambda t: 2 * t + 11),
        ('con paréntesis',     3 * (x - 2), x + 10,
         lambda t: 3 * (t - 2), lambda t: t + 10),
        ('menos adelante',     10 - (x + 4), 2 * x,
         lambda t: 10 - (t + 4), lambda t: 2 * t),
    ]
    res = []
    for rotulo, i, d, fi, fd in ejemplos:
        v = resuelve(i, d, fi, fd, f'tema 3, {rotulo}')
        res.append((rotulo, v))
        aparece(f'<i>x</i> = {html_num(v)}', f'tema 3, {rotulo}')
    sin_repetir(3, res)

    # el menos delante del paréntesis
    if sp.expand(-(x + 4)) != -x - 4:
        mal('−(x + 4) no es −x − 4')

    # equivalentes: 6x − 5 = 25 y 6x = 30 (los del ejemplo 2) tienen la misma solución
    a = sp.solve(sp.Eq(6 * x - 5, 25), x)[0]
    b = sp.solve(sp.Eq(6 * x, 30), x)[0]
    if a != b:
        mal('las ecuaciones equivalentes no tienen la misma solución')

    # la trampa de simplificar la x: 3x = 5x
    c = resuelve(3 * x, 5 * x, lambda t: 3 * t, lambda t: 5 * t, 'tema 3, 3x = 5x')
    if c != 0:
        mal('3x = 5x no da 0')
    aparece('<i>x</i> = 0', 'tema 3, pregunta de 3x = 5x')
    print('   ' + ' · '.join(f'{r} → x = {v}' for r, v in res) + f' · 3x = 5x → x = {c}')


# ══════════════════════════════════════════════════════════════════
#  Puente entre el tema 3 y el 4 · no está en el libro
#  y = 2x − 3: ¿cuáles son todos los valores que puede tomar 2x − 3?
#  La tabla se arma con x = 0, 1, 2, −1/2 y 5; los puntos van al plano
#  de a uno, y al final aparece la recta. El control es x = 3.
# ══════════════════════════════════════════════════════════════════
def puente():
    print('Puente · de la ecuación a la función')
    f = lambda t: 2 * t - 3
    xs = [F(0), F(1), F(2), F(-1, 2), F(5)]
    tabla = []
    for xv in xs:
        yv = f(xv)
        # segunda vía: la y que dice sympy, con la ecuación despejada de otra forma
        otra = sp.solve(sp.Eq(y - 2 * x, -3), y)[0].subs(x, sp.Rational(xv.numerator, xv.denominator))
        if sp.Rational(yv.numerator, yv.denominator) != otra:
            mal(f'puente: en x = {xv} la y no da lo mismo por los dos caminos')
        tabla.append((xv, yv))
        aparece(f'({html_num(xv)}, {html_num(yv)})', f'puente, x = {xv}')

    # todos los puntos en la misma recta, también el de x = −1/2
    (x0, y0), (x1, y1) = tabla[0], tabla[1]
    for xv, yv in tabla[2:]:
        if (yv - y0) * (x1 - x0) != (y1 - y0) * (xv - x0):
            mal(f'puente: el punto ({xv}, {yv}) no está alineado')

    # el control: un valor que no se calculó cae sobre la recta
    c = (F(3), f(F(3)))
    if c != (3, 3):
        mal(f'puente: el control con x = 3 da {c}, no (3, 3)')
    aparece('(3, 3)', 'puente, control')

    # la pregunta del observador que vuelve al tema 3: con y = 5, 2x − 3 = 5
    x5 = frac(sp.solve(sp.Eq(2 * x - 3, 5), x)[0])
    if f(x5) != 5 or x5 != 4:
        mal(f'puente: 2x − 3 = 5 no da x = 4 sino {x5}')
    aparece('(4, 5)', 'puente, observador')

    print('   y = 2x − 3 · tabla ' + ', '.join(f'({a}, {b})' for a, b in tabla) +
          ' · alineados · control (3, 3) · con y = 5 queda x = 4')


# ══════════════════════════════════════════════════════════════════
#  Tema 4 · Representación gráfica (págs. 140–141)
#  Tabla de valores, dos puntos y un tercero para controlar.
# ══════════════════════════════════════════════════════════════════
def tema4():
    print('Tema 4 · Representación gráfica')
    todos = []
    # (rótulo, ecuación general en sympy, la despejada como función de Fraction, xs)
    ejemplos = [
        ('y = 2x − 1',          sp.Eq(y, 2 * x - 1),       lambda t: 2 * t - 1,        (0, 2, 1)),
        ('y = −2x + 3',         sp.Eq(y, -2 * x + 3),      lambda t: -2 * t + 3,       (0, 2, 1)),
        ('3x + y − 5 = 0',      sp.Eq(3 * x + y - 5, 0),   lambda t: -3 * t + 5,       (0, 1, 2)),
        ('2x + 3y − 6 = 0',     sp.Eq(2 * x + 3 * y - 6, 0), lambda t: F(-2, 3) * t + 2, (0, 3, 6)),
    ]
    for rotulo, ec, f, xs in ejemplos:
        despejada = sp.solve(ec, y)[0]
        pts = []
        for xv in xs:
            yv = f(F(xv))
            # segunda vía: el punto tiene que cumplir la ecuación original
            if ec.lhs.subs({x: xv, y: sp.Rational(yv.numerator, yv.denominator)}) != \
               ec.rhs.subs({x: xv, y: sp.Rational(yv.numerator, yv.denominator)}):
                mal(f'tema 4, {rotulo}: el punto ({xv}, {yv}) no cumple la ecuación')
            if sp.nsimplify(despejada.subs(x, xv)) != sp.Rational(yv.numerator, yv.denominator):
                mal(f'tema 4, {rotulo}: la despejada no da {yv} en x = {xv}')
            pts.append((F(xv), yv))
        # el tercero, alineado con los dos primeros
        (x1, y1), (x2, y2), (x3, y3) = pts
        if (y2 - y1) * (x3 - x1) != (y3 - y1) * (x2 - x1):
            mal(f'tema 4, {rotulo}: el tercer punto no está alineado')
        for px_, py_ in pts:
            aparece(f'({html_num(px_)}, {html_num(py_)})', f'tema 4, {rotulo}')
        todos.append((rotulo, f))
        print(f'   {rotulo} → y = {despejada} · puntos ' +
              ', '.join(f'({a}, {b})' for a, b in pts) + ' · alineados')


def tema4_cruce():
    """La pregunta del observador: las rectas 1 y 2 pasan las dos por (1, 1)."""
    sol = sp.solve([sp.Eq(y, 2 * x - 1), sp.Eq(y, -2 * x + 3)], [x, y])
    if (sol[x], sol[y]) != (1, 1):
        mal(f'las rectas de los ejemplos 1 y 2 se cortan en {sol}, no en (1, 1)')
    if 2 * F(1) - 1 != 1 or -2 * F(1) + 3 != 1:
        mal('(1, 1) no cumple las dos ecuaciones')
    print('   y = 2x − 1 e y = −2x + 3 se cortan en (1, 1)')


# ══════════════════════════════════════════════════════════════════
#  Tema 5 · Ecuaciones con fracciones (págs. 142–143)
# ══════════════════════════════════════════════════════════════════
def tema5():
    print('Tema 5 · Ecuaciones con fracciones')
    ejemplos = [
        ('ax = b',                 x / 4, sp.Integer(3),
         lambda t: t / 4, lambda t: F(3)),
        ('ax + b = c',             x / 2 + sp.Rational(1, 3), sp.Rational(5, 6),
         lambda t: t / 2 + F(1, 3), lambda t: F(5, 6)),
        ('ax + b = cx + d',        sp.Rational(3, 4) * x - 1, x / 2 + 1,
         lambda t: F(3, 4) * t - 1, lambda t: t / 2 + 1),
        ('numeradores con paréntesis', (x + 1) / 2 - (x - 3) / 5, sp.Integer(2),
         lambda t: (t + 1) / 2 - (t - 3) / 5, lambda t: F(2)),
        ('fracción de los dos lados', (2 * x - 1) / 3, (x + 4) / 4,
         lambda t: (2 * t - 1) / 3, lambda t: (t + 4) / 4),
    ]
    res = []
    for rotulo, i, d, fi, fd in ejemplos:
        v = resuelve(i, d, fi, fd, f'tema 5, {rotulo}')
        res.append((rotulo, v))
        aparece(f'<i>x</i> = {html_num(v)}', f'tema 5, {rotulo}')
    sin_repetir(5, res)

    # los controles del ejemplo 4 y del 5, tal como los muestra la página
    if F(3 + 1, 2) - F(3 - 3, 5) != 2:
        mal('el control del ejemplo 4 no da 2')
    v16 = F(16, 5)
    izq, der = (2 * v16 - 1) / 3, (v16 + 4) / 4
    if not (2 * v16 - 1 == F(27, 5) and v16 + 4 == F(36, 5) and izq == der == F(9, 5)):
        mal(f'el control del ejemplo 5 no da 9/5 de los dos lados ({izq}, {der})')
    print(f'   controles: ejemplo 4 da 2 · ejemplo 5 da {izq} de los dos lados')

    # el menos que se reparte en el ejemplo 4
    if sp.expand(5 * (x + 1) - 2 * (x - 3)) != 3 * x + 11:
        mal('5(x+1) − 2(x−3) no es 3x + 11')
    # los mcm que usa la página
    for dens, m in [((2, 3, 6), 6), ((4, 2), 4), ((2, 5), 10), ((3, 4), 12)]:
        if sp.ilcm(*dens) != m:
            mal(f'el mcm de {dens} no es {m}')
    print('   ' + ' · '.join(f'{r} → x = {v}' for r, v in res))


# ══════════════════════════════════════════════════════════════════
#  Tema 6 · Simbolizaciones algebraicas (págs. 144–145)
#  Una palabra cambia por vez; en x = 10 se ve que cada cambio importa.
# ══════════════════════════════════════════════════════════════════
def tema6():
    print('Tema 6 · Simbolizaciones')
    v = F(10)
    lecturas = [
        ('el triple de un número',                  3 * v),
        ('el triple de un número, menos 4',         3 * v - 4),
        ('el triple de la diferencia con 4',        3 * (v - 4)),
        ('la tercera parte de un número, menos 4',  v / 3 - 4),
    ]
    valores = [b for _, b in lecturas]
    if len(set(valores)) != len(valores):
        mal('dos lecturas del tema 6 dan lo mismo en x = 10')
    for rotulo, b in lecturas:
        aparece(html_num(b), f'tema 6, {rotulo}')
    print('   en x = 10: ' + ' · '.join(f'{r} = {b}' for r, b in lecturas))


# ══════════════════════════════════════════════════════════════════
#  Tema 7 · Resolución de problemas (págs. 146–147)
#  Cada problema se comprueba en su situación.
# ══════════════════════════════════════════════════════════════════
def tema7():
    print('Tema 7 · Problemas, verificados en la situación')
    res = []

    # compra: 3 cuadernos iguales y una regla de 8 000 salieron 47 000
    c = frac(sp.solve(sp.Eq(3 * x + 8000, 47000), x)[0])
    if 3 * c + 8000 != 47000 or c <= 0 or c.denominator != 1:
        mal(f'la compra no cierra con {c}')
    aparece('₲ 13 000', 'tema 7, compra'); res.append(('compra', c))

    # tres consecutivos que suman 51
    p = frac(sp.solve(sp.Eq(x + (x + 1) + (x + 2), 51), x)[0])
    tres = [p, p + 1, p + 2]
    if sum(tres) != 51 or any(tres[i + 1] - tres[i] != 1 for i in range(2)):
        mal(f'los consecutivos no cierran: {tres}')
    aparece(f'{tres[0]}, {tres[1]} y {tres[2]}', 'tema 7, consecutivos'); res.append(('consecutivos', p))

    # rectángulo: el largo supera en 4 al ancho, perímetro 52
    a = frac(sp.solve(sp.Eq(2 * x + 2 * (x + 4), 52), x)[0])
    largo = a + 4
    if largo - a != 4 or 2 * (a + largo) != 52 or a <= 0:
        mal('el rectángulo no cierra')
    aparece(f'{a} m', 'tema 7, ancho'); aparece(f'{largo} m', 'tema 7, largo')
    res.append(('rectángulo', a))

    # la diferencia entre un número y su cuarta parte es 18
    n = frac(sp.solve(sp.Eq(x - x / 4, 18), x)[0])
    if n - n / 4 != 18:
        mal('lo de la cuarta parte no cierra')
    aparece(f'el número es {n}', 'tema 7, cuarta parte'); res.append(('cuarta parte', n))

    # dentro de 4 años Sofía tendrá el triple de la edad que tenía hace 4
    s = frac(sp.solve(sp.Eq(x + 4, 3 * (x - 4)), x)[0])
    if s + 4 != 3 * (s - 4) or s - 4 <= 0:
        mal('las edades de Sofía no cierran')
    aparece(f'Sofía tiene {s} años', 'tema 7, edades'); res.append(('edades', s))
    sin_repetir(7, res)

    print(f'   cuaderno ₲ {c} · consecutivos {tres} · rectángulo {a} y {largo} · '
          f'número {n} · Sofía {s} (hace 4: {s - 4}, dentro de 4: {s + 4})')


# ══════════════════════════════════════════════════════════════════
#  Desafío final · el epitafio de Diofanto
# ══════════════════════════════════════════════════════════════════
def diofanto():
    print('Desafío final · Diofanto')
    partes = sp.Rational(1, 6) + sp.Rational(1, 12) + sp.Rational(1, 7) + sp.Rational(1, 2)
    vida = frac(sp.solve(sp.Eq(x * partes + 5 + 4, x), x)[0])
    # en la situación: cada etapa entera en años, y todo suma la vida
    etapas = [vida / 6, vida / 12, vida / 7, F(5), vida / 2, F(4)]
    if sum(etapas) != vida:
        mal(f'las etapas no suman la vida: {sum(etapas)} ≠ {vida}')
    if any(e.denominator != 1 for e in etapas):
        mal(f'alguna etapa no da un número entero de años: {etapas}')
    if sp.ilcm(6, 12, 7, 2) != 84:
        mal('el mcm de 6, 12, 7 y 2 no es 84')
    aparece(f'vivió {vida} años', 'Diofanto')
    print(f'   vivió {vida} años · etapas {[int(e) for e in etapas]} · mcm 84')


def arranque():
    print('La pregunta para arrancar')
    t = frac(sp.solve(sp.Eq(3 * x + 12, 147), x)[0])
    if 3 * t + 12 != 147 or t.denominator != 1 or t <= 0:
        mal(f'las tapitas no cierran: {t}')
    aparece(f'cada bolsa trae {t} tapitas', 'arranque')
    print(f'   3x + 12 = 147 → {t} tapitas por bolsa')


def diofanto_por_84():
    """El paso que muestra la página: todo multiplicado por 84."""
    izq = sp.expand(84 * (x / 6 + x / 12 + x / 7 + 5 + x / 2 + 4))
    if izq != 75 * x + 756:
        mal(f'84 por el primer miembro da {izq}, no 75x + 756')
    for termino, esperado in [(x / 6, 14 * x), (x / 12, 7 * x), (x / 7, 12 * x),
                              (5, 420), (x / 2, 42 * x), (4, 336)]:
        if sp.expand(84 * termino) != esperado:
            mal(f'84 · {termino} no es {esperado}')
    print('   84 · (x/6 + x/12 + x/7 + 5 + x/2 + 4) = 75x + 756')


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

    # una respuesta exacta nunca aparece redondeada
    for sospechoso in ('3,2', '3.2 ', '0,66', '0.66', '10,5'):
        if sospechoso in cuerpo:
            mal(f'una respuesta exacta quedó escrita como decimal: «{sospechoso}»')

    # la anatomía de cada tema: concepto, ejemplos, preguntas y notas
    for parte in ('concepto', 'ejemplos', 'preguntas', 'notas'):
        if f'{parte}:' not in cuerpo:
            mal(f'los temas no declaran la parte «{parte}»')
    # la pizarra, los botones y el movimiento son del motor compartido
    # (assets/pizarra.js); las notas y el observador, de assets/clase.js
    for pieza in ('assets/pizarra.js', 'assets/clase.js', 'Pizarra.unidad('):
        if pieza not in cuerpo:
            mal(f'falta «{pieza}» en la página')
    motor = (RAIZ / 'assets' / 'pizarra.js').read_text(encoding='utf-8')
    for pieza in ('window.CLASE', 'data-tema=', 'function A(', 'function totalPasos(',
                  'data-accion="atras"'):
        if pieza not in motor:
            mal(f'falta «{pieza}» en assets/pizarra.js')
    # cuando una cuenta sigue, sigue en el renglón de abajo (A()), con los =
    # alineados: nunca dos igualdades encadenadas con "o sea", "queda" o un punto
    for encadenado in ('o sea ${M(', 'queda ${M(', 'Queda ${M('):
        if encadenado in cuerpo:
            mal(f'hay cuentas encadenadas en un mismo renglón («{encadenado}»): van en un A()')

    # el control va después de la respuesta: nunca es un paso de la resolución
    for n, linea in enumerate(html.splitlines(), 1):
        if re.match(r"^( {8}| {4})[`']Control", linea):
            mal(f'línea {n}: un control quedó entre los pasos, antes de la respuesta')
    # una propiedad sin coma antes de «control:» rompe todo el guion de la página
    # (este guion lee el archivo, no ejecuta el JavaScript: por eso se mira acá)
    renglones = html.splitlines()
    for n in range(1, len(renglones)):
        if renglones[n].lstrip().startswith('control:') and not renglones[n - 1].rstrip().endswith(','):
            mal(f'línea {n + 1}: falta la coma antes de «control:», y la página no carga')
    # el dato que el motor ya no lee no puede quedar suelto
    if 'grafica:{' in cuerpo:
        mal('un ejemplo usa «grafica:», que ya no existe: el plano se arma con «construye:»')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    arranque(); tema1(); tema2(); tema3(); puente(); tema4(); tema4_cruce(); tema5(); tema6(); tema7()
    diofanto(); diofanto_por_84()
    verifica_pagina()
    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
