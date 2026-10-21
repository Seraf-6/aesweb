"""Verificación de las diapositivas de ángulos de 7.º grado.

La unidad 6 del libro (Geometría plana II) sigue sus seis temas, con dos
puentes que no están en el libro: punto, recta y semirrecta antes del tema
1, y qué es un grado entre el tema 1 y el 2. Acá se comprueba cada número
que aparece en `matematica/7mo/angulos.html`.

Nada se escribe a mano y nada se comprueba por el camino que lo produjo:

1. Los ángulos con x se resuelven con sympy y se controlan reemplazando
   x en cada expresión, con enteros.
2. El sistema sexagesimal se cuenta en segundos (enteros): las sumas y
   restas de la página, hechas columna por columna con sus préstamos, se
   comparan con la cuenta en segundos y con la operación inversa.
3. Las conversiones con coma se hacen con Fraction, nunca con float.
4. Las rectas paralelas se dibujan con coordenadas: los ocho ángulos se
   miden con atan2 sobre la figura y se comparan con los de la página.
5. Lo que sale en la página se busca escrito tal cual en el HTML, y dentro
   de un tema no se repite una respuesta.

    python verificacion/angulos_7mo.py
"""

import math
import re
import sys
from fractions import Fraction as F
from pathlib import Path

import sympy as sp

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

x = sp.symbols('x')
RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '7mo' / 'angulos.html'

fallos = []
esperados = []          # (texto que tiene que aparecer en la página, de dónde sale)


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def aparece(texto, origen):
    esperados.append((texto, origen))


# ═══ el sistema sexagesimal, en segundos ═══
def seg(g=0, m=0, s=0):
    return (g * 60 + m) * 60 + s


def gms(total):
    g, r = divmod(total, 3600)
    m, s = divmod(r, 60)
    return g, m, s


def txt_gms(total):
    """Como lo escribe la página: 44° 16′ 25″, sin las unidades en cero del final."""
    g, m, s = gms(total)
    t = f'{g}°'
    if m or s:
        t += f' {m}′'
    if s:
        t += f' {s}″'
    return t


def columnas(a, b, signo):
    """La cuenta como en el cuaderno: columna por columna, con sus pasajes.
    Devuelve los renglones intermedios; el último es el resultado."""
    (g1, m1, s1), (g2, m2, s2) = a, b
    if signo == '+':
        g, m, s = g1 + g2, m1 + m2, s1 + s2
        renglones = [(g, m, s)]
        while s >= 60:
            s -= 60; m += 1
        renglones.append((g, m, s))
        while m >= 60:
            m -= 60; g += 1
        renglones.append((g, m, s))
        return renglones
    # resta: se pide prestado de la unidad de arriba
    g, m, s = g1, m1, s1
    renglones = []
    if s < s2:
        m -= 1; s += 60
    if m < m2:
        g -= 1; m += 60
    renglones.append((g, m, s))
    renglones.append((g - g2, m - m2, s - s2))
    return renglones


# ══════════════════════════════════════════════════════════════════
def arranque():
    print('Pregunta inicial · el minutero')
    por_minuto = F(360, 60)
    en_20 = 20 * por_minuto
    if por_minuto != 6 or en_20 != 120:
        mal(f'el minutero da {por_minuto} y {en_20}')
    # otro camino: 20 minutos son un tercio de hora
    if F(20, 60) * 360 != en_20 or F(360, 3) != en_20:
        mal('el tercio de vuelta no da lo mismo')
    aparece('el minutero gira 120°', 'pregunta inicial')
    aparece("'360° : 3 = 120° ✓'", 'pregunta inicial, control')
    print('   6° por minuto · 120° en 20 minutos = un tercio de 360°')


def puente_base():
    print('Puente · punto, recta, semirrecta y segmento')
    a, b = 2, 8
    largo = b - a
    saltos = len(range(a + 1, b + 1))           # 3, 4, 5, 6, 7, 8
    if largo != 6 or saltos != largo:
        mal(f'el segmento da {largo} y se cuentan {saltos} saltos')
    aparece('el segmento AB mide 6 cm', 'puente base, regla')
    aparece("'8 − 2 = 6'", 'puente base, regla')
    print('   AB de 2 a 8: 8 − 2 = 6 = seis saltos de un centímetro')


def tema1():
    print('Tema 1 · Ángulo')
    # medir: la escala de este lado y la del otro suman 180
    for medida in (50, 125):
        otra = 180 - medida
        if medida + otra != 180:
            mal(f'las escalas no suman 180 con {medida}')
    aparece('el ángulo mide 50°', 'tema 1, transportador')
    aparece("'180° − 130° = 50° ✓'", 'tema 1, control de la otra escala')
    aparece('el ángulo mide 125°', 'tema 1, ángulo abierto')
    aparece("'125° > 90° ✓'", 'tema 1, control')
    # la bisectriz de 125°: no da entero, y eso abre el tema 2
    mitad = F(125, 2)
    if mitad != F(125, 2) or 2 * mitad != 125 or mitad.denominator != 2:
        mal('la mitad de 125 no es 62,5')
    if seg(62, 30) * 2 != seg(125):
        mal('62° 30′ no es la mitad de 125°')
    aparece('cada mitad mide 62,5°', 'tema 1, bisectriz')
    aparece("'62,5° + 62,5° = 125° ✓'", 'tema 1, control de la bisectriz')
    print('   50° (otra escala 130) · 125° · bisectriz 62,5° = 62° 30′')


def puente_grado():
    print('Puente · un ángulo es un giro')
    casos = [(2, 180, 'media vuelta son 180°'), (4, 90, 'un cuarto de vuelta son 90°'),
             (8, 45, 'cada porción mide 45°'), (12, 30, 'de una hora a la siguiente hay 30°')]
    for partes, esperado, final in casos:
        v = F(360, partes)
        if v != esperado or partes * v != 360:
            mal(f'360 : {partes} = {v}')
        aparece(final, f'puente grado, {partes} partes')
        aparece(f"'{partes} · {esperado}° = 360° ✓'", f'puente grado, control de {partes}')
    # 360 tiene muchos divisores: por eso se eligió
    divisores = [d for d in range(1, 361) if 360 % d == 0]
    if len(divisores) != 24:
        mal(f'360 tiene {len(divisores)} divisores')
    print(f'   180 · 90 · 45 · 30 · 360 tiene {len(divisores)} divisores')


def tema2():
    print('Tema 2 · Sistema sexagesimal')
    # 3° a minutos
    if 3 * 60 != 180 or F(180, 60) != 3:
        mal('3° no son 180′')
    aparece('3° = 180′', 'tema 2, ej 1')
    aparece("'180 : 60 = 3 ✓'", 'tema 2, ej 1 control')
    # 3° 25′ a minutos, y al revés con resto
    t = 3 * 60 + 25
    q, r = divmod(t, 60)
    if t != 205 or (q, r) != (3, 25):
        mal(f'3° 25′ = {t}′')
    aparece('3° 25′ = 205′', 'tema 2, ej 2')
    aparece("'205 = 3 · 60 + 25 ✓'", 'tema 2, ej 2 control')
    # 2,4° a grados y minutos, con Fraction
    d = F(24, 10)
    ent = d.numerator // d.denominator
    mins = (d - ent) * 60
    if ent != 2 or mins != 24:
        mal(f'2,4° = {ent}° {mins}′')
    if F(ent * 60 + mins, 60) != d or ent * 60 + mins != 144:
        mal('2° 24′ no vuelve a 2,4°')
    aparece('2,4° = 2° 24′', 'tema 2, ej 3')
    aparece("'144 : 60 = 2,4 ✓'", 'tema 2, ej 3 control')
    # la suma, columna por columna
    a, b = (25, 40, 35), (18, 35, 50)
    filas = columnas(a, b, '+')
    if filas != [(43, 75, 85), (43, 76, 25), (44, 16, 25)]:
        mal(f'la suma da los renglones {filas}')
    total = seg(*a) + seg(*b)
    if gms(total) != filas[-1]:
        mal('la suma en columnas no coincide con la suma en segundos')
    # el control: la resta de vuelta, también en columnas
    vuelta = columnas(filas[-1], b, '−')
    if vuelta[-1] != a:
        mal(f'la resta de control da {vuelta[-1]}')
    aparece('25° 40′ 35″ + 18° 35′ 50″ = 43° 75′ 85″', 'tema 2, suma')
    aparece("' = 43° 76′ 25″'", 'tema 2, suma, pasaje de segundos')
    aparece("' = 44° 16′ 25″'", 'tema 2, suma, pasaje de minutos')
    aparece('la suma es 44° 16′ 25″', 'tema 2, suma')
    aparece('44° 16′ 25″ − 18° 35′ 50″ = 25° 40′ 35″ ✓', 'tema 2, control de la suma')
    # la resta desde 90°, pidiendo prestado
    r90 = columnas((90, 0, 0), (35, 47, 20), '−')
    if r90 != [(89, 59, 60), (54, 12, 40)]:
        mal(f'la resta da {r90}')
    if seg(90) - seg(35, 47, 20) != seg(54, 12, 40) or seg(54, 12, 40) + seg(35, 47, 20) != seg(90):
        mal('90° − 35° 47′ 20″ no da 54° 12′ 40″ en segundos')
    aparece('89° 59′ 60″ − 35° 47′ 20″ = 54° 12′ 40″', 'tema 2, resta')
    aparece('la resta es 54° 12′ 40″', 'tema 2, resta')
    aparece("'54° 12′ 40″ + 35° 47′ 20″ = 89° 59′ 60″'", 'tema 2, control de la resta')
    print('   180′ · 205′ · 2° 24′ · 44° 16′ 25″ · 54° 12′ 40″ (columnas = segundos = inversa)')


def tema3():
    print('Tema 3 · Según su medida')
    def clase(a):
        if a == 0: return 'nulo'
        if a < 90: return 'agudo'
        if a == 90: return 'recto'
        if a < 180: return 'obtuso'
        if a == 180: return 'llano'
        if a == 360: return 'completo'
        return 'mayor que un llano'
    for a in (35, 90, 140, 180, 360):
        aparece(f'{a}° es un ángulo {clase(a)}', f'tema 3, {a}°')
    if [clase(a) for a in (0, 35, 90, 140, 180, 360)] != ['nulo', 'agudo', 'recto', 'obtuso', 'llano', 'completo']:
        mal('la clasificación no da')
    aparece("'0° < 35° < 90° ✓'", 'tema 3, control agudo')
    aparece("'90° < 140° < 180° ✓'", 'tema 3, control obtuso')
    print('   35 agudo · 90 recto · 140 obtuso · 180 llano · 360 completo')


def tema4():
    print('Tema 4 · Según su posición')
    # consecutivos: se suman
    if 40 + 35 != 75 or 75 - 35 != 40:
        mal('40 + 35')
    aparece('AÔC mide 75°', 'tema 4, consecutivos')
    aparece("'75° − 35° = 40° ✓'", 'tema 4, control consecutivos')
    # adyacentes
    ady = sp.solve(sp.Eq(40 + x, 180), x)[0]
    if ady != 140 or 40 + ady != 180:
        mal(f'adyacente de 40 = {ady}')
    aparece('BÔC mide 140°', 'tema 4, adyacentes')
    # dos rectas que se cortan: los cuatro
    cuatro = [40, 180 - 40, 40, 180 - 40]
    if sum(cuatro) != 360 or cuatro != [40, 140, 40, 140]:
        mal(f'los cuatro ángulos {cuatro}')
    aparece('los cuatro ángulos miden 40°, 140°, 40° y 140°', 'tema 4, dos rectas')
    aparece("'40° + 140° + 40° + 140° = 360° ✓'", 'tema 4, control dos rectas')
    # opuestos con x
    s1 = sp.solve(sp.Eq(3 * x + 10, 70), x)[0]
    if s1 != 20 or 3 * 20 + 10 != 70:
        mal(f'opuestos x = {s1}')
    aparece('<i>x</i> = 20, y los dos ángulos miden 70°', 'tema 4, opuestos con x')
    aparece("'3 · 20 + 10 = 70 ✓'", 'tema 4, control opuestos')
    # adyacentes con x
    s2 = sp.solve(sp.Eq(x + (2 * x + 30), 180), x)[0]
    if s2 != 50 or 50 + (2 * 50 + 30) != 180:
        mal(f'adyacentes x = {s2}')
    aparece('<i>x</i> = 50: los ángulos miden 50° y 130°', 'tema 4, adyacentes con x')
    aparece("'50° + 130° = 180° ✓'", 'tema 4, control adyacentes')
    print(f'   75 · 140 · 40/140/40/140 · x = {s1} (70) · x = {s2} (50 y 130)')


def tema5():
    print('Tema 5 · Según su suma')
    c = 90 - 62
    s = 180 - 62
    if c != 28 or s != 118 or s - c != 90:
        mal(f'complemento {c}, suplemento {s}')
    aparece('el complemento de 62° es 28°', 'tema 5, complemento')
    aparece("'62° + 28° = 90° ✓'", 'tema 5, control complemento')
    aparece('el suplemento de 62° es 118°', 'tema 5, suplemento')
    aparece("'62° + 118° = 180° ✓'", 'tema 5, control suplemento')
    # con minutos
    filas = columnas((180, 0, 0), (62, 42, 0), '−')
    sup = seg(180) - seg(62, 42)
    if gms(sup) != (117, 18, 0) or filas[-1] != (117, 18, 0):
        mal(f'suplemento de 62° 42′ = {gms(sup)} / {filas}')
    if columnas((62, 42, 0), (117, 18, 0), '+')[-1] != (180, 0, 0):
        mal('el control del suplemento con minutos no da 180°')
    aparece('179° 60′ − 62° 42′ = 117° 18′', 'tema 5, suplemento con minutos')
    aparece('el suplemento de 62° 42′ es 117° 18′', 'tema 5, suplemento con minutos')
    aparece("'62° 42′ + 117° 18′ = 179° 60′'", 'tema 5, control con minutos')
    # el suplemento es el triple
    a = sp.solve(sp.Eq(x + 3 * x, 180), x)[0]
    if a != 45 or 3 * a != 135 or a + 3 * a != 180:
        mal(f'triple: {a}')
    aparece('el ángulo mide 45° y su suplemento, 135°', 'tema 5, triple')
    aparece("'45° + 135° = 180° ✓'", 'tema 5, control triple')
    # el suplemento es 20° más que el triple
    b = sp.solve(sp.Eq(x + (3 * x + 20), 180), x)[0]
    if b != 40 or 3 * b + 20 != 140 or b + 140 != 180:
        mal(f'triple más 20: {b}')
    aparece('el ángulo mide 40° y su suplemento, 140°', 'tema 5, triple más 20')
    aparece("'3 · 40 + 20 = 140 ✓'", 'tema 5, control triple más 20')
    print(f'   28 · 118 · 117° 18′ · {a} y 135 · {b} y 140')


# ═══ las paralelas, con coordenadas ═══
def ocho(inclinacion_t, inclinacion_s=0.0):
    """Los ocho ángulos medidos en la figura: r es horizontal, s tiene la
    inclinación dada y t sube con su inclinación (en grados). Numeración del
    libro: arriba 1 (arriba izq.), 2 (arriba der.), 3 (abajo izq.),
    4 (abajo der.); abajo 5, 6, 7, 8 en el mismo orden."""
    def dir_(g):
        return (math.cos(math.radians(g)), math.sin(math.radians(g)))
    def entre(u, v):
        a = math.degrees(math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1]))
        return abs(a)
    t_arriba, t_abajo = dir_(inclinacion_t), dir_(inclinacion_t + 180)
    res = {}
    for base, (der, izq) in ((0, (dir_(0), dir_(180))),
                             (4, (dir_(inclinacion_s), dir_(inclinacion_s + 180)))):
        res[base + 1] = entre(t_arriba, izq)
        res[base + 2] = entre(t_arriba, der)
        res[base + 3] = entre(t_abajo, izq)
        res[base + 4] = entre(t_abajo, der)
    return {k: round(v, 9) for k, v in res.items()}


def tema6():
    print('Tema 6 · Paralelas y secante')
    a = ocho(65)
    if [a[k] for k in (1, 2, 3, 4)] != [115, 65, 65, 115]:
        mal(f'arriba {a}')
    if [a[k] for k in (5, 6, 7, 8)] != [115, 65, 65, 115]:
        mal(f'abajo {a}')
    # las reglas del libro, medidas sobre la figura
    for p, q, rel in ((3, 6, '='), (4, 5, '='), (1, 8, '='), (2, 7, '='),
                      (2, 6, '='), (4, 8, '='), (1, 5, '='), (3, 7, '='),
                      (3, 5, '+'), (4, 6, '+'), (2, 8, '+'), (1, 7, '+')):
        ok = a[p] == a[q] if rel == '=' else a[p] + a[q] == 180
        if not ok:
            mal(f'la figura no cumple {p} {rel} {q}')
    aparece('arriba: 1 = 115°, 2 = 65°, 3 = 65° y 4 = 115°', 'tema 6, ej 1')
    aparece("'115° + 65° = 180° ✓'", 'tema 6, control ej 1')
    aparece('abajo: 5 = 115°, 6 = 65°, 7 = 65° y 8 = 115°', 'tema 6, ej 2')
    # alternos internos con x: 4 = 3x − 5 y 5 = 2x + 30
    s1 = sp.solve(sp.Eq(3 * x - 5, 2 * x + 30), x)[0]
    if s1 != 35 or 3 * 35 - 5 != 100 or 2 * 35 + 30 != 100:
        mal(f'alternos internos x = {s1}')
    b = ocho(80)
    if b[4] != 100 or b[5] != 100:
        mal(f'la figura del ej 3 no tiene 4 = 5 = 100: {b}')
    aparece('<i>x</i> = 35, y los dos ángulos miden 100°', 'tema 6, alternos con x')
    aparece("'2 · 35 + 30 = 100 ✓'", 'tema 6, control alternos')
    # conjugados internos con x: 4 = 3x − 5 y 6 = 2x + 35
    s2 = sp.solve(sp.Eq((3 * x - 5) + (2 * x + 35), 180), x)[0]
    if s2 != 30 or 3 * 30 - 5 != 85 or 2 * 30 + 35 != 95:
        mal(f'conjugados x = {s2}')
    c = ocho(95)
    if c[4] != 85 or c[6] != 95:
        mal(f'la figura del ej 4 no tiene 4 = 85 y 6 = 95: {c}')
    aparece('<i>x</i> = 30: los ángulos miden 85° y 95°', 'tema 6, conjugados con x')
    aparece("'85° + 95° = 180° ✓'", 'tema 6, control conjugados')
    # no paralelas: con s inclinada −10°, el 2 sigue en 65 y el 6 pasa a 75
    d = ocho(65, -10)
    if d[2] != 65 or d[6] != 75:
        mal(f'la figura del ej 5 no tiene 2 = 65 y 6 = 75: {d}')
    aparece('r y s no son paralelas', 'tema 6, no paralelas')
    print(f'   65/115 arriba y abajo · x = {s1} (100) · x = {s2} (85 y 95) · 65 ≠ 75')


def desafio():
    print('Desafío · el zigzag entre paralelas')
    a, b = 40, 35
    p = a + b
    if p != 75:
        mal('40 + 35')
    # otro camino: con coordenadas, el ángulo en P medido con atan2
    A, B = (0.0, 0.0), (0.0, -200.0)                  # r: y = 0, s: y = −200
    # P está donde se cruzan la semirrecta desde A (bajando 40°) y la de B (subiendo 35°)
    ta, tb = math.tan(math.radians(a)), math.tan(math.radians(b))
    px = 200 / (ta + tb)
    P = (px, -px * ta)
    u = (A[0] - P[0], A[1] - P[1]); v = (B[0] - P[0], B[1] - P[1])
    medido = math.degrees(math.acos((u[0] * v[0] + u[1] * v[1]) / (math.hypot(*u) * math.hypot(*v))))
    if abs(medido - p) > 1e-9:
        mal(f'el ángulo en P medido da {medido}')
    # el control de la página: la vuelta entera alrededor de P
    if p + (180 - a) + (180 - b) != 360:
        mal('la vuelta alrededor de P no da 360')
    aparece('el ángulo en P mide 75°', 'desafío')
    aparece("'75° + 140° + 145° = 360° ✓'", 'desafío, control')
    print(f'   40 + 35 = 75 · medido con coordenadas {medido:.6f} · 75 + 140 + 145 = 360')


# ══════════════════════════════════════════════════════════════════
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
    # dentro de un tema no se repite una respuesta
    guion = cuerpo[cuerpo.index('const TEMAS'):cuerpo.index('const DESAFIO')]
    temas = re.split(r'\n/\* ─+ .* ─+ \*/\n', guion)
    for t in temas:
        finales = re.findall(r"final:'([^']*)'", t)
        repetidos = {f for f in finales if finales.count(f) > 1}
        if repetidos:
            mal(f'respuesta repetida en un tema: {repetidos}')
    # alineados: nunca dos igualdades encadenadas con "o sea", "queda" o un punto
    for encadenado in ('o sea ${M(', 'queda ${M(', 'Queda ${M('):
        if encadenado in cuerpo:
            mal(f'hay cuentas encadenadas en un mismo renglón («{encadenado}»): van en un A()')
    renglones = html.splitlines()
    for n_, linea in enumerate(renglones, 1):
        if re.match(r"^( {8}| {4})[`']Control", linea):
            mal(f'línea {n_}: un control quedó entre los pasos, antes de la respuesta')
    for k in range(1, len(renglones)):
        if renglones[k].lstrip().startswith('control:') and not renglones[k - 1].rstrip().endswith(','):
            mal(f'línea {k + 1}: falta la coma antes de «control:», y la página no carga')
    # data-paso es del panel de proyección
    if re.search(r'<button[^>]*data-paso', cuerpo):
        mal('un botón usa data-paso: el panel de proyección lo toma para cambiar de lámina')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    arranque(); puente_base(); tema1(); puente_grado(); tema2(); tema3(); tema4(); tema5()
    tema6(); desafio()
    verifica_pagina()
    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
