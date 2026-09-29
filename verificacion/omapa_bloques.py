"""Verificación de las clases de OMAPA (omapa/clases/bloque-1.html a bloque-7.html).

Cada problema se resuelve acá por un camino distinto del que muestra la
página: casi siempre por fuerza bruta, recorriendo todos los casos. Después
se busca en cada página la respuesta escrita tal cual. También se controla
que en omapa/ no haya ninguna clave de respuestas y que todos los enlaces de
omapa/index.html lleguen a un archivo.

    python verificacion/omapa_bloques.py
"""

import itertools
import math
import re
import sys
from fractions import Fraction as F
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = Path(__file__).resolve().parent.parent
fallos = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def primo(n):
    return n > 1 and all(n % d for d in range(2, int(n ** .5) + 1))


def divisores(n):
    return [d for d in range(1, n + 1) if n % d == 0]


def area(ps):
    return abs(sum(F(ps[i][0]) * ps[i - 1][1] - F(ps[i - 1][0]) * ps[i][1] for i in range(len(ps)))) / 2


def calcula():
    """(bloque, respuesta calculada, respuesta esperada, texto en la página)"""
    c = []
    B = lambda n, calc, esp, txt: c.append((n, calc, esp, txt))
    # 1 · contar bien
    B(1, sum(str(n).count('1') for n in range(100, 151)), 66, 'Pedro escribió 66 veces el dígito 1')
    B(1, sum(str(n).count('1') for n in range(1, 101)), 21, 'María escribe 21 veces el dígito 1')
    imp = {''.join(p) for k in (1, 2, 3) for p in itertools.permutations('147', k) if int(p[-1]) % 2}
    B(1, len(imp), 10, 'Laura puede construir 10 números impares')
    B(1, len(list(itertools.product(range(3), range(3), range(2)))), 18, 'Julia se puede vestir de 18 maneras')
    B(1, sum(1 for n in range(10, 101) if len(set(str(n))) == 2), 82, "final:'82 números'")
    B(1, sum(1 for g in itertools.combinations('ABCDE', 3) if not {'A', 'B'} <= set(g)), 7, "final:'7 formas'")
    lista = [1, 4, 6, 8, 9, 10, 12, 14, 15]
    B(1, sum(1 for a, b in itertools.combinations(lista, 2) if primo(a + b)), 11, "final:'11 maneras'")
    B(1, sum(1 for t in itertools.product('BNA', repeat=4) if all(t[i] != t[i + 1] for i in range(3))), 24, "final:'24 torres'")
    # 2 · relaciones
    B(2, [t for t in range(101) if t + 2 * (100 - 60) == 100 and t + (100 - 60) == 60][0], 20, 'el tanque vacío pesa 20 kg')
    B(2, F(1, 2) * F(1, 2), F(1, 4), 'un cuarto del jugo')
    B(2, [x for x in range(1, 40) if 5 * x + 3 * F(x, 2) == 39][0], 6, 'el balde mayor tiene capacidad para 6 litros')
    B(2, [m for m in range(1, 60) if 4 * m == m + 24][0], 8, 'Miguel tiene 8 años')
    B(2, 2 * (20 + 20 + 12), 104, 'Luisa tiene 104 figuritas')
    B(2, 666 - 140 - 280, 246, 'el tercer sumando es 246')
    B(2, [v for v in range(11) if v - (10 - v) == 2][0], 6, 'son 6 varones')
    B(2, [e for e in range(16) if 8 * (15 - e) + 6 * e == 110][0], 5, 'Matilde tiene 5 escarabajos')
    # 3 · patrones (el 1 de agosto es viernes; los días se cuentan desde el lunes = 0)
    dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
    primero = next(d for d in range(1, 100) if d % 4 == 0 and d % 6 == 0)
    B(3, dias[(5 + primero) % 7], 'jueves', 'se vuelven a encontrar el jueves')
    B(3, sum(1 for d in range(1, 32) if (d - 1) % 7 in (0, 1)), 10, 'llevó 10 serenatas')
    fecha = next(d for d in range(1, 100) if d % 4 == 0 and d % 7 == 0) + 5 - 30
    B(3, fecha, 3, 'el miércoles 3 de octubre')
    m = next(t for t in range(1, 1000) if t % 30 == 0 and t % 50 == 0)
    B(3, f'{8 + m // 60}:{m % 60:02d}', '10:30', 'vuelven a las 10:30')
    B(3, max(next(list(range(n, n + 5)) for n in range(100) if 5 * n + 10 == 100)), 22, 'el mayor es 22')
    B(3, next(list(range(n, n + 4)) for n in range(-50, 50) if sum(range(n, n + 4)) == 58), [13, 14, 15, 16], "final:'13, 14, 15 y 16'")
    B(3, 39 + 40, 79, 'suman 79')
    L = list(range(33, 33 + 488))
    B(3, sum(L[239:249]), 2765, 'suman 2765')
    # 4 · números
    B(4, len(divisores(80)), 10, '80 tiene 10 divisores')
    B(4, len(set(divisores(36)) & set(divisores(40))), 3, 'tienen 3 números en común')
    B(4, 42 // 21 + 21 // 7, 5, 'suman 5')
    B(4, next(n for n in range(3, 100) if n % 3 == 2 and n % 5 == 2), 17, "final:'17 bombones'")
    B(4, sum(n for n in range(11, 20) if primo(n)), 60, 'la suma es 60')
    her = [(a, b) for a in range(10, 17) for b in range(a + 1, 17) if primo(a) and primo(b)]
    B(4, sum(her[0]) if len(her) == 1 else None, 24, 'suman 24 años')
    B(4, [n for n in range(10, 21) if n % sum(map(int, str(n))) == 0], [10, 12, 18, 20], '4 números: 10, 12, 18 y 20')
    B(4, [d for d in range(1, 10) if all(n % d == 0 for n in (111, 222, 333, 555, 777))], [1, 3], '2 divisores: el 1 y el 3')
    # 5 · estrategias
    B(5, (4 * 1, 4 * 6), (4, 24), 'la menor cantidad es 4 y la mayor, 24')
    B(5, next(n for n in range(3, 50) if n - 3 == 11), 14, 'el polígono tiene 14 lados')
    B(5, [(a, b) for a in range(2, 6) for b in range(a + 1, 6) if 7 + a + b == 15], [(3, 5)], "final:'3 y 5'")
    mejor = min((c5 + c2 + (48 - 5 * c5 - 2 * c2), c2) for c5 in range(10) for c2 in range(25) if 48 - 5 * c5 - 2 * c2 >= 0)
    B(5, mejor[1], 1, 'usará 1 botella de 2 litros')
    B(5, max(k for k in range(1, 20) if k * (k + 1) // 2 <= 43), 8, "final:'8 sumandos'")
    bis = lambda y: y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)
    B(5, max(sum(366 if bis(y) else 365 for y in range(a, a + 10)) for a in range(1901, 2090)), 3653, "final:'3653 días'")
    B(5, sum(1 for n in range(10, 100) if sum(map(int, str(n))) > 13), 15, "final:'15 números'")
    # 6 · ideas potentes
    B(6, len([a for a in range(1, 21) if 20 % a == 0 and a <= 20 // a]), 3, '3 pares: 1 y 20, 2 y 10, 4 y 5')
    B(6, (2013 - 1999) + (2013 - 2001), 26, 'suman 26 años')
    B(6, len([(a, b) for a in range(3) for b in range(5) if 1000 * a + 500 * b == 2000]), 3, "final:'3 maneras'")
    B(6, len({a + b for a in range(1, 7) for b in range(1, 7)}), 11, '11 resultados diferentes')
    B(6, max(min(q) for q in itertools.combinations(range(10), 4) if sum(q) == 30), 6, "final:'6 votos'")
    filas = set()
    for f in itertools.product(range(1, 13), repeat=5):
        if sum(f) == 12:
            cuenta = {v: f.count(v) for v in f}
            if sorted(cuenta.values()) == [1, 1, 1, 2]:
                filas.add(next(v for v, k in cuenta.items() if k == 2))
    B(6, sorted(filas), [1, 2], '1 alumno o 2 alumnos por fila')
    B(6, max(c_ for c_ in range(14) for w in range(14) if c_ + w <= 13 and 2 * c_ - w == 10), 7, '7 respuestas correctas')
    rects = [(a, b) for a in range(1, 15) for b in range(a, 15) if a * b <= 14]
    B(6, max(k for k in range(1, 7) for comb in itertools.combinations(rects, k) if sum(a * b for a, b in comb) == 14), 5, "final:'5 rectángulos'")
    # 7 · geometría
    ocultas = sorted(7 - v for v in (6, 2, 3))
    B(7, (ocultas[1] + ocultas[2]) * ocultas[0], 9, 'obtiene 9')
    B(7, 12 - 6, 6, '6 aristas más que caras')
    B(7, len(list(itertools.product(range(3), repeat=3))), 27, "final:'27 cubitos'")
    lado = 36 // 6
    B(7, 3 * lado + 2 * lado, 30, 'el perímetro de ABCF es 30 cm')
    f1 = [(2, 5), (3, 5), (4, 4), (5, 4), (5, 3), (4, 2), (4, 1), (3, 1), (2, 2), (1, 2), (1, 3), (2, 4)]
    f2 = [(2, 5), (3, 5), (4, 4), (6, 4), (4, 2), (4, 1), (3, 1), (2, 2), (0, 2), (2, 4)]
    f3 = [(1, 4), (2, 4), (3, 5), (4, 4), (6, 4), (5, 3), (5, 2), (4, 2), (3, 1), (2, 2), (0, 2), (1, 3)]
    B(7, [i + 1 for i, f in enumerate((f1, f2, f3)) if area(f) == 11], [2, 3], 'las figuras 2 y 3')
    s = F(272) / (2 * (4 + F(1, 4)))
    B(7, s, 32, 'el lado mide 32 cm')
    B(7, len([(a, 18 - a) for a in range(1, 18) if a <= 18 - a]), 9, "final:'9 rectángulos'")
    B(7, (50 // 10) ** 3, 125, "final:'125 cubitos'")
    return c


def verifica():
    print('Los problemas, por fuerza bruta')
    paginas = {n: (RAIZ / 'omapa' / 'clases' / f'bloque-{n}.html').read_text(encoding='utf-8') for n in range(1, 8)}
    casos = calcula()
    for n, calc, esp, txt in casos:
        if calc != esp:
            mal(f'bloque {n}: la cuenta da {calc} y la página dice {esp} («{txt}»)')
        if txt not in paginas[n]:
            mal(f'bloque {n}: la página no contiene «{txt}»')
    print(f'   {len(casos)} problemas calculados y buscados en sus páginas')
    for n, html in paginas.items():
        for pieza in ('assets/pizarra.js', 'assets/clase.js', 'Pizarra.unidad(', 'preguntas:', 'notas:', 'fte('):
            if pieza not in html:
                mal(f'bloque {n}: falta «{pieza}»')
        # cada problema dice de dónde viene
        if html.count('enun:`«') != html.count("${fte('"):
            mal(f'bloque {n}: hay un problema sin su fuente')
        renglones = html.splitlines()
        for k in range(1, len(renglones)):
            if renglones[k].lstrip().startswith('control:') and not renglones[k - 1].rstrip().endswith(','):
                mal(f'bloque {n}, línea {k + 1}: falta la coma antes de «control:»')


def verifica_sitio():
    print('Las fichas y los enlaces')
    omapa = RAIZ / 'omapa'
    claves = [p for p in omapa.rglob('*') if re.search(r'RESPUESTA|CLAVE', p.name, re.I)]
    if claves:
        mal(f'hay claves publicadas: {claves}')
    indice = omapa / 'index.html'
    t = indice.read_text(encoding='utf-8')
    enlaces = [h for h in re.findall(r'href="([^"#]+)"', t) if not h.startswith('http')]
    rotos = [h for h in enlaces if not (indice.parent / h).resolve().exists()]
    if rotos:
        mal(f'enlaces rotos en omapa/index.html: {rotos}')
    print(f'   {len(enlaces)} enlaces, ninguna clave en omapa/')


def main():
    verifica()
    verifica_sitio()
    print()
    if fallos:
        print(f'{len(fallos)} problema(s). Las clases de OMAPA NO están verificadas.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
