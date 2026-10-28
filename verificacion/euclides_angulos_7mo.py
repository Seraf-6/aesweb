"""Verificación de las diapositivas del bloque A de la geometría griega de 7.º.

`matematica/7mo/euclides-angulos.html` es la primera página de la unidad
«Geometría a la manera de los griegos» (ver Curricula_Geometria_7mo.md, fuera
del repositorio): los dos hechos de ángulos que valen la pena, los opuestos
por el vértice (clase A1) y las paralelas cortadas por una secante (A2).

Nada se escribe a mano y nada se comprueba por el camino que lo produjo:

1. Cada respuesta sale de la cuenta que hace el alumno, con enteros o
   Fraction.
2. La figura se arma con coordenadas (números complejos) a partir de los
   datos del enunciado, y el ángulo pedido se mide con atan2. Tiene que dar
   lo mismo que la cuenta.
3. Lo que sale en la página se busca escrito tal cual en el HTML, y dentro
   de un tema no se repite una respuesta.

    python verificacion/euclides_angulos_7mo.py
"""

import cmath
import math
import re
import sys
from fractions import Fraction as F
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'matematica' / '7mo' / 'euclides-angulos.html'

fallos = []
esperados = []          # (texto que tiene que aparecer en la página, de dónde sale)


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def aparece(texto, origen):
    esperados.append((texto, origen))


# ═══ geometría con números complejos ═══
def dirp(p, a, L=1.0):
    """el punto a distancia L de p, en la dirección de a grados"""
    return p + L * cmath.exp(1j * math.radians(a))


def ang(a, v, b):
    """el ángulo a-v-b, en grados, entre 0 y 180"""
    z = (a - v).conjugate() * (b - v)
    return abs(math.degrees(math.atan2(z.imag, z.real)))


def corte(p, q, r, s):
    d1, d2 = q - p, s - r
    den = d1.real * d2.imag - d1.imag * d2.real
    t = ((r - p).real * d2.imag - (r - p).imag * d2.real) / den
    return p + t * d1


def refleja(p, a, b):
    """el simétrico de p respecto de la recta ab: lo que hace un doblez"""
    d = (b - a) / abs(b - a)
    return a + d * d * (p - a).conjugate()


def igual(nombre, medido, cuenta, tol=1e-7):
    if abs(medido - float(cuenta)) > tol:
        mal(f'{nombre}: la figura mide {medido:.6f} y la cuenta da {cuenta}')
    else:
        print(f'   {nombre}: {cuenta} · medido {medido:.6f}')


# ══════════════════════════════════════════════════════════════════
def arranque():
    print('Para arrancar · x + y con el ángulo de 153°')
    x = 180 - 153
    y = 180 - 153
    O = 0j
    # dos rectas casi horizontales: arriba forman 153°, x queda a la izquierda e y a la derecha
    m = (180 - 153) / 2
    igual('el de arriba', ang(dirp(O, m), O, dirp(O, 180 - m)), 153)
    igual('x (el que abre hacia la izquierda)', ang(dirp(O, 180 - m), O, dirp(O, 180 + m)), x)
    igual('y (el que abre hacia la derecha)', ang(dirp(O, -m), O, dirp(O, m)), y)
    aparece("'x + y = 27° + 27°'", 'arranque')
    aparece('x + y = 54°', 'arranque')
    if x + y != 54:
        mal('x + y no da 54')


def tema1():
    print('A1 · opuestos por el vértice')
    # ejemplo 1: la demostración, y su control con el β de la figura (rectas a 20° y a 80°)
    beta = 200 - 80
    alfa, gama = 180 - beta, 180 - beta
    O = 0j
    igual('ej. 1 · β', ang(dirp(O, 80), O, dirp(O, 200)), beta)
    igual('ej. 1 · α', ang(dirp(O, 20), O, dirp(O, 80)), alfa)
    igual('ej. 1 · γ, el opuesto', ang(dirp(O, 200), O, dirp(O, 260)), gama)
    aparece("'α = 180° − 120°'", 'A1 ej. 1, control')

    # ejemplo 2: la tira de papel doblada. El doblez forma 50° con el borde.
    x = 180 - 2 * 50
    Fp = 0j
    pliegue = dirp(Fp, 50)
    borde_doblado = refleja(dirp(Fp, 0), Fp, pliegue)
    igual('ej. 2 · el doblez copia el ángulo', ang(pliegue, Fp, borde_doblado), 50)
    igual('ej. 2 · x', ang(dirp(Fp, 180), Fp, borde_doblado), x)
    aparece('x mide 80°', 'A1 ej. 2')
    aparece("'80° + 50° + 50° = 180° ✓'", 'A1 ej. 2, control')

    # ejemplo 3: recto, 32° y la bisectriz de BÔC
    boc = 90 - 32
    alfa = F(boc, 2)
    O = 0j
    C = dirp(O, 90 - 32)
    Pb = dirp(O, 0) / 1 + C          # la suma de los unitarios va por la bisectriz
    igual('ej. 3 · BÔC', ang(dirp(O, 0), O, C), boc)
    igual('ej. 3 · α', ang(dirp(O, 0), O, Pb), alfa)
    aparece('α mide 29°', 'A1 ej. 3')
    aparece("'29° + 29° + 32° = 90° ✓'", 'A1 ej. 3, control')

    # ejemplo 4: dos consecutivos que suman 136° (en la figura, 96° y 40°)
    a, b = 96, 40
    medio = F(a + b, 2)
    O = 0j
    b1 = dirp(O, 0) + dirp(O, a)
    b2 = dirp(O, a) + dirp(O, a + b)
    igual('ej. 4 · el ángulo entre las bisectrices', ang(b1, O, b2), medio)
    for a_, b_ in ((100, 36), (70, 66)):
        if F(a_, 2) + F(b_, 2) != medio:
            mal('ej. 4 · con otro par que suma 136 no da 68')
    aparece('las bisectrices forman 68°', 'A1 ej. 4')
    aparece("'48° + 20° = 68° ✓'", 'A1 ej. 4, control')

    # ejemplo 5: OMA 2022 Intercolegial N1 P3. AÔB = BÔC/5 = CÔD/4 = DÔE/2
    xx = F(180, 1 + 5 + 4 + 2)
    medidas = [xx, 5 * xx, 4 * xx, 2 * xx]
    O = 0j
    rayos, acum = [dirp(O, 180)], 0
    for m in medidas:
        acum += m
        rayos.append(dirp(O, 180 - float(acum)))
    for i, m in enumerate(medidas):
        igual(f'ej. 5 · ángulo {i + 1}', ang(rayos[i], O, rayos[i + 1]), m)
    if not (medidas[0] == medidas[1] / 5 == medidas[2] / 4 == medidas[3] / 2):
        mal('ej. 5 · no se cumplen las razones del enunciado')
    aparece('AÔB = 15°, BÔC = 75°, CÔD = 60° y DÔE = 30°', 'A1 ej. 5')
    aparece("'15° + 75° + 60° + 30° = 180° ✓'", 'A1 ej. 5, control')


def tema2():
    print('A2 · paralelas y secante')
    # ejemplos 1 y 2: la demostración de T2, con la secante a 65°
    r1, r2 = 0j, 0j + 1j * -3            # r: y = 0, s: y = −3
    X1 = r1
    X2 = corte(X1, dirp(X1, 245), r2, r2 + 1)
    alfa = ang(dirp(X1, 180), X1, dirp(X1, 245))       # abajo a la izquierda, en r
    gama = ang(dirp(X2, 0), X2, dirp(X2, 65))           # arriba a la derecha, en s
    delta = ang(dirp(X1, 0), X1, dirp(X1, 65))          # arriba a la derecha, en r
    eps = ang(dirp(X2, 65), X2, dirp(X2, 180))          # arriba a la izquierda, en s
    igual('ej. 1 · α = γ (alternos internos)', alfa, gama)
    igual('ej. 1 · δ = γ (correspondientes)', delta, gama)
    igual('ej. 2 · α + ε (conjugados)', alfa + eps, 180)
    aparece("'115° + 65° = 180° ✓'", 'A2 ej. 2, control')

    # ejemplo 3: el zigzag de los 100 problemas. 120° en P y 35° en B
    x = (180 - 120) + 35
    P = 0j
    A = dirp(P, 300, 2)
    B = corte(A, dirp(A, 215), -4j, -4j + 1)            # s: y = −4
    igual('ej. 3 · el ángulo de 120° en P', ang(dirp(P, 180), P, A), 120)
    igual('ej. 3 · el de 35° en B', ang(A, B, B + 1), 35)
    igual('ej. 3 · x', ang(P, A, B), x)
    aparece('x mide 95°', 'A2 ej. 3')
    aparece("'95° + 120° + 145° = 360° ✓'", 'A2 ej. 3, control')
    if x + (180 - 60) + (180 - 35) != 360:
        mal('ej. 3 · la vuelta alrededor de A no da 360')

    # ejemplo 4: OMA 2020 Zonal N1 P3. ACB = 68°, CBS = 27° → QAC
    qac = 68 - 27
    B = 0j
    C = dirp(B, 27, 2)
    A = corte(C, dirp(C, 207 - 68), 2j, 2j + 1)         # PQ: y = 2
    igual('ej. 4 · ACB', ang(A, C, B), 68)
    igual('ej. 4 · QÂC', ang(A + 1, A, C), qac)
    aparece('QÂC mide 41°', 'A2 ej. 4')
    aparece("'41° + 27° = 68° ✓'", 'A2 ej. 4, control')

    # ejemplo 5: alternos internos de 72° y 72° → paralelas (T2 al revés)
    X1 = 0j
    X2 = dirp(X1, 252, 3)
    # s pasa por X2 formando 72° con la secante, del otro lado: sale paralela a r
    s_dir = dirp(X2, 72 - 72) - X2
    igual('ej. 5 · el alterno de abajo', ang(X2 + s_dir, X2, X1), 72)
    igual('ej. 5 · el de arriba', ang(dirp(X1, 180), X1, X2), 72)
    if abs((s_dir / 1).imag) > 1e-12:
        mal('ej. 5 · s no salió paralela a r')
    aparece('sí: r y s son paralelas', 'A2 ej. 5')
    aparece("'72° + 108° = 180° ✓'", 'A2 ej. 5, control')


def desafio():
    print('Desafío · OMA 2007 Intercolegial N1 P3')
    x = F(90, 4 - 1)                       # 4x = x + 90
    aon = 4 * x
    bom = 180 - x
    boq = bom / 2
    qon = boq - (180 - aon)
    O = 0j
    pos = {'A': 180, 'M': 180 - x, 'P': 180 - 2 * x, 'N': 180 - aon, 'B': 0}
    pos['Q'] = boq
    pt = {k: dirp(O, float(v)) for k, v in pos.items()}
    igual('MÔN', ang(pt['M'], O, pt['N']), 90)
    igual('OP bisectriz de AÔN', ang(pt['A'], O, pt['P']) - ang(pt['P'], O, pt['N']), 0)
    igual('OQ bisectriz de BÔM', ang(pt['B'], O, pt['Q']) - ang(pt['Q'], O, pt['M']), 0)
    igual('OM bisectriz de AÔP', ang(pt['A'], O, pt['M']) - ang(pt['M'], O, pt['P']), 0)
    igual('QÔN', ang(pt['Q'], O, pt['N']), qon)
    if not (pos['A'] > pos['M'] > pos['N'] > pos['B']):
        mal('M no quedó en el arco AN')
    aparece('QÔN mide 15°', 'desafío')
    aparece("'MÔQ + QÔN = 75° + 15°'", 'desafío, control')


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
    guion = cuerpo[cuerpo.index('const TEMAS'):cuerpo.index('const DESAFIO')]
    for t in re.split(r'\n/\* ─+ .* ─+ \*/\n', guion):
        finales = re.findall(r"final:'([^']*)'", t)
        repetidos = {f for f in finales if finales.count(f) > 1}
        if repetidos:
            mal(f'respuesta repetida en un tema: {repetidos}')
    for encadenado in ('o sea ${M(', 'queda ${M(', 'Queda ${M('):
        if encadenado in cuerpo:
            mal(f'hay cuentas encadenadas en un mismo renglón («{encadenado}»): van en un A()')
    renglones = html.splitlines()
    for k in range(1, len(renglones)):
        if renglones[k].lstrip().startswith('control:') and not renglones[k - 1].rstrip().endswith(','):
            mal(f'línea {k + 1}: falta la coma antes de «control:», y la página no carga')
    if re.search(r'<button[^>]*data-paso', cuerpo):
        mal('un botón usa data-paso: el panel de proyección lo toma para cambiar de lámina')
    # los nombres que ya usa pizarra.js no se pueden redeclarar
    for nombre in ('lee', 'paso', 'suma', 'caja', 'bloque'):
        if re.search(rf'^(const|let|function) {nombre}\b', html, re.M):
            mal(f'la página redeclara «{nombre}», que ya está en pizarra.js')


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    arranque(); tema1(); tema2(); desafio()
    verifica_pagina()
    print()
    if fallos:
        print(f'{len(fallos)} problema(s). La página NO está verificada.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
