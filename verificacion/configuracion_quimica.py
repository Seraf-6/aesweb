"""Verificación de la clase de química: números cuánticos y configuración electrónica.

Cada resultado de `quimica/configuracion.html` se recalcula acá, y el lugar
en la tabla se comprueba por dos caminos que no se tocan:

1. Por la configuración: el orden de llenado (regla n + l, a igual n + l
   primero el de menor n), el período es el mayor n, el bloque es el último
   subnivel, y el grupo sale de los electrones de valencia.
2. Por el armado de la tabla: dónde empieza cada período (1, 3, 11, 19, 37,
   55, 87) y cuántas columnas tiene, sin mirar ninguna configuración.

Los dos tienen que coincidir para Z = 1 a 54 (salvo el helio, que la tabla
pone en el grupo 18 aunque sea del bloque s). Además:

3. Los números cuánticos del último electrón (el diferencial) salen de llenar
   las cajitas con la convención de la clase: orbitales de m = −l a +l, de
   izquierda a derecha, primero todos ↑ (+½) y después ↓ (−½).
4. Los problemas inversos (dado el último electrón, hallar el elemento)
   tienen una sola respuesta entre Z = 1 y 54, y es la de la página.
5. La página tiene escritos tal cual cada configuración, cada cuarteto de
   números cuánticos y cada elemento.

    python verificacion/configuracion_quimica.py
"""

import re
import sys
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'quimica' / 'configuracion.html'
fallos = []


def mal(m):
    fallos.append(m)
    print('   FALLA:', m)


SIMBOLOS = ('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn '
            'Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe').split()
LETRA = 'spdf'
# los que en la realidad no siguen el orden de llenado (Z ≤ 54); la clase los nombra
EXCEPCIONES = {24: 'Cr', 29: 'Cu', 41: 'Nb', 42: 'Mo', 44: 'Ru', 45: 'Rh', 46: 'Pd', 47: 'Ag'}


# ── 1. la configuración por el orden de llenado ──
def orden():
    subs = [(n, l) for n in range(1, 8) for l in range(0, min(n, 4))]
    return sorted(subs, key=lambda s: (s[0] + s[1], s[0]))


def config(Z):
    out, quedan = [], Z
    for n, l in orden():
        if quedan == 0:
            break
        e = min(quedan, 2 * (2 * l + 1))
        out.append((n, l, e))
        quedan -= e
    return out


def texto(cfg):
    return ' '.join(f'{n}{LETRA[l]}^{e}' for n, l, e in cfg)


GASES = {2: 'He', 10: 'Ne', 18: 'Ar', 36: 'Kr'}


def abreviada(Z):
    g = max([k for k in GASES if k < Z], default=None)
    if g is None:
        return texto(config(Z))
    resto = config(Z)[len(config(g)):]
    return f'[{GASES[g]}] ' + texto(resto)


def por_configuracion(Z):
    cfg = config(Z)
    periodo = max(n for n, l, e in cfg)
    n, l, e = cfg[-1]
    bloque = LETRA[l]
    s = sum(e for nn, ll, e in cfg if nn == periodo and ll == 0)
    if bloque == 's':
        grupo = s
    elif bloque == 'p':
        grupo = 10 + s + sum(e for nn, ll, e in cfg if nn == periodo and ll == 1)
    else:
        grupo = s + sum(e for nn, ll, e in cfg if nn == periodo - 1 and ll == 2)
    return periodo, grupo, bloque


# ── 2. el lugar por el armado de la tabla ──
def por_tabla(Z):
    comienzos = [1, 3, 11, 19, 37, 55, 87, 119]
    p = max(k for k in range(7) if comienzos[k] <= Z) + 1
    i = Z - comienzos[p - 1]
    largo = comienzos[p] - comienzos[p - 1]
    if largo == 2:
        return p, (1 if i == 0 else 18)
    if largo == 8:
        return p, (i + 1 if i < 2 else i + 11)
    if largo == 18:
        return p, i + 1
    raise ValueError('período 6 o 7')


# ── 3. el electrón diferencial ──
def diferencial(Z):
    n, l, e = config(Z)[-1]
    k = 2 * l + 1
    if e <= k:
        return n, l, -l + e - 1, '+½'
    return n, l, -l + e - k - 1, '−½'


def cuarteto(q):
    n, l, m, s = q
    ms = '0' if m == 0 else (f'+{m}' if m > 0 else f'−{-m}')
    return f'({n}, {l}, {ms}, {s})'


def main():
    print('Química · números cuánticos y configuración electrónica')
    html = PAGINA.read_text(encoding='utf-8') if PAGINA.exists() else ''
    if not html:
        mal('no existe la página')

    # los dos caminos coinciden
    for Z in range(1, 55):
        a = por_configuracion(Z)[:2]
        b = por_tabla(Z)
        if Z == 2:
            if b != (1, 18) or a != (1, 2):
                mal('el helio no está donde se espera')
            continue
        if a != b:
            mal(f'Z = {Z} ({SIMBOLOS[Z - 1]}): por la configuración {a}, por la tabla {b}')
    print('   ok  Z = 1 a 54: período y grupo coinciden por los dos caminos (salvo el helio, grupo 18)')

    # ── los ejemplos de la página: (Z, lo que tiene que estar escrito) ──
    def esta(t, donde):
        if html and t not in html:
            mal(f'{donde}: la página no tiene escrito «{t}»')

    # tema 1: orbitales y electrones por nivel o subnivel
    for n, orb, e in ((1, 1, 2), (2, 4, 8), (3, 9, 18), (4, 16, 32)):
        o = sum(2 * l + 1 for l in range(n))
        if (o, 2 * o, 2 * n * n) != (orb, e, e):
            mal(f'tema 1: n = {n} tiene {o} orbitales')
        esta(f'{orb} orbital{"es" if orb > 1 else ""} y {e} electrones', 'tema 1')
    if (2 * 2 + 1, 2 * (2 * 2 + 1)) != (5, 10) or 12 - 3 + 1 != 10:
        mal('tema 1: la 4d')
    esta('5 orbitales y 10 electrones', 'tema 1')
    print('   ok  tema 1: n = 1, 2, 3, 4 → 1, 4, 9, 16 orbitales y 2n² electrones; 4d → 5 y 10')

    # tema 2: ¿existe el electrón? (n, l, m_l): l de 0 a n − 1, m_l de −l a +l
    def existe(n, l, m):
        return 0 <= l <= n - 1 and -l <= m <= l
    for q, si, escrito in (((2, 1, 0), True, 'existe: es un electrón 2p'),
                         ((2, 2, 0), False, 'no existe: la capa 2 no tiene subcapa d'),
                         ((3, 2, 0), True, 'existe: es un electrón 3d'),
                         ((3, 2, -3), False, 'no existe: la 3d tiene solo 5 orbitales')):
        if existe(*q) != si:
            mal(f'tema 2: {q}')
        esta(escrito, 'tema 2')
    print('   ok  tema 2: (2, 1, 0) sí, 2p; (2, 2, 0) no; (3, 2, 0) sí, 3d; (3, 2, −3) no')

    # tema 2 y 4: configuraciones completas y abreviadas
    for Z in (8, 17, 19, 26, 35):
        esta(texto(config(Z)), f'tema 3, Z = {Z}')
    for Z in (11, 17, 19, 38, 26):
        esta(abreviada(Z), f'tema 5, Z = {Z}')
    print('   ok  tema 3 y 5: configuraciones escritas tal cual')

    # tema 4: el diferencial
    for Z in (7, 8, 11, 17, 26):
        esta(cuarteto(diferencial(Z)), f'tema 4, Z = {Z}')
        print(f'   ok  tema 4: {SIMBOLOS[Z - 1]} → último electrón {cuarteto(diferencial(Z))}')
    # con cajitas de +l a −l (otra convención), el oxígeno da otro cuarteto
    n, l, m, s = diferencial(8)
    if cuarteto((n, l, -m, s)) != '(2, 1, +1, −½)':
        mal('tema 4: el oxígeno con la otra convención')
    esta('(2, 1, +1, −½)', 'notas del tema 4')

    # tema 6: del lugar en la tabla a la configuración y al revés
    for Z in (16, 20, 26, 33, 53):
        p, g, b = por_configuracion(Z)
        if (p, g) != por_tabla(Z):
            mal(f'tema 5: Z = {Z}')
        esta(f'grupo {g}', f'tema 5, Z = {Z}'); esta(f'período {p}', f'tema 5, Z = {Z}')
        esta(abreviada(Z), f'tema 5, Z = {Z}')
        print(f'   ok  tema 6: {SIMBOLOS[Z - 1]} (Z = {Z}) → período {p}, grupo {g}, bloque {b}')

    # tema 7: hallar el elemento desde el último electrón: una sola respuesta
    for q, esperado in (((3, 1, 0, '−½'), 17), ((4, 0, 0, '+½'), 19), ((3, 2, -1, '−½'), 27)):
        hall = [Z for Z in range(1, 55) if diferencial(Z) == q]
        if hall != [esperado]:
            mal(f'tema 7: {cuarteto(q)} da {hall}, no [{esperado}]')
        esta(cuarteto(q), 'tema 7'); esta(f'{SIMBOLOS[esperado - 1]}: ', 'tema 7')
        esta(abreviada(esperado), 'tema 7')
        print(f'   ok  tema 7: {cuarteto(q)} → solo Z = {esperado} ({SIMBOLOS[esperado - 1]})')
    # con −½ primero, (3, 1, 0, −½) sería el segundo del 3p: el silicio
    if [Z for Z in range(1, 55) if config(Z)[-1][:2] == (3, 1) and config(Z)[-1][2] == 2] != [14]:
        mal('tema 7: la otra convención')
    esta('el silicio', 'observador del tema 7')
    # tres desapareados con el último electrón en el nivel 2
    def desapareados(Z):
        n, l, e = config(Z)[-1]
        k = 2 * l + 1
        return e if e <= k else 2 * k - e
    hall = [Z for Z in range(1, 55) if config(Z)[-1][0] == 2 and desapareados(Z) == 3]
    if hall != [7]:
        mal(f'tema 7: tres desapareados en el nivel 2 da {hall}')
    esta('el nitrógeno, N: ', 'tema 7'); esta(texto(config(7)), 'tema 7')
    print('   ok  tema 7: tres electrones desapareados, último en el nivel 2 → solo N')
    # el ion: X²⁻ con la configuración del argón: X tiene 2 electrones menos
    hall = [Z for Z in range(1, 55) if Z + 2 == 18]
    if hall != [16] or abreviada(16).replace('3p^4', '3p^6') != '[Ne] 3s^2 3p^6' or texto(config(18)).split()[-1] != '3p^6':
        mal(f'tema 7: el ion da {hall}')
    esta('el azufre: el ion es S<sup>2−</sup>', 'tema 7')
    print('   ok  tema 7: X²⁻ con la configuración del argón → S')

    # el desafío: período 4, último electrón con m = 0 y s = −½
    hall = [Z for Z in range(19, 37) if diferencial(Z)[2:] == (0, '−½')]
    if hall != [20, 28, 35]:
        mal(f'desafío: {hall}')
    esta('el calcio (Ca), el níquel (Ni) y el bromo (Br)', 'desafío')
    print(f'   ok  desafío: período 4, m = 0 y s = −½ → {", ".join(SIMBOLOS[Z - 1] for Z in hall)}')
    # las preguntas del observador: con +½ en el período 4, y con −½ en el período 3
    hall = [Z for Z in range(19, 37) if diferencial(Z)[2:] == (0, '+½')]
    if hall != [19, 23, 32]:
        mal(f'desafío, observador: +½ da {hall}')
    esta('el potasio (4s con 1), el vanadio (3d con 3) y el germanio (4p con 2)', 'observador del desafío')
    hall = [Z for Z in range(11, 19) if diferencial(Z)[2:] == (0, '−½')]
    if hall != [12, 17]:
        mal(f'desafío, observador: período 3 da {hall}')
    esta('el magnesio (3s con 2) y el cloro (3p con 5)', 'observador del desafío')
    print('   ok  desafío, observador: con +½ → K, V, Ge; en el período 3 → Mg, Cl')

    # el arranque: el potasio empieza el período 4 porque 4s va antes que 3d
    if orden().index((4, 0)) > orden().index((3, 2)):
        mal('4s no va antes que 3d')
    print('   ok  arranque: 4s (n + l = 4) se llena antes que 3d (n + l = 5)')

    # el taller usa la misma regla: se comprueba que la tabla de excepciones de la página es la de acá
    if html:
        m = re.search(r'const EXCEPCIONES = \{([^}]*)\}', html)
        zs = sorted(int(k) for k in re.findall(r'(\d+):', m.group(1))) if m else []
        if zs != sorted(EXCEPCIONES):
            mal(f'las excepciones del taller son {zs}, y tendrían que ser {sorted(EXCEPCIONES)}')
        else:
            print('   ok  taller: las ocho excepciones hasta Z = 54 (Cr, Cu, Nb, Mo, Ru, Rh, Pd, Ag)')

    print()
    if fallos:
        print(f'{len(fallos)} fallas.')
        sys.exit(1)
    print('Todo verificado.')


if __name__ == '__main__':
    main()
