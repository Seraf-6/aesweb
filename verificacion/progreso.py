"""Verificación del módulo de progreso (`progreso/index.html`).

La página calcula en JavaScript cuántos puntos tiene el tramo final y dónde
caen los cortes de cada nota. Este guion es el mismo modelo escrito en
Python, con enteros, para tener un segundo camino:

1. Lee de la página los valores sugeridos (semanas, clases, fichas,
   proyectos, escala, redondeo) y recalcula el total y los cortes de cada
   grado. Si alguien cambia un número de la página, esto lo recalcula.
2. Controla la calibración: el alumno que viene a todas las clases y
   entrega todas las fichas, sin ningún proyecto, tiene que llegar al 2.
   Si no llega, la escala está mal armada.
3. Controla el redondeo con los casos que ya fallaron con punto flotante:
   0,60 · 350 da 209,999… en coma flotante, y redondeado hacia abajo de a 5
   daba 205 en lugar de 210.

Los cortes se calculan en centésimos de punto y con enteros, igual que la
página, así que los dos caminos no pueden discrepar por redondeo.

    python verificacion/progreso.py
"""

import re
import sys
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / 'progreso' / 'index.html'

fallos = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


# ═══════════════ el modelo ═══════════════
def redondea(cent, paso, modo):
    """cent son centésimos de punto; devuelve el corte en puntos enteros."""
    if paso <= 1:
        return -(-cent // 100)                         # techo: el mínimo que alcanza
    d = 100 * paso
    if modo == 'arriba':
        return -(-cent // d) * paso
    if modo == 'cercano':
        return ((2 * cent + d) // (2 * d)) * paso
    return (cent // d) * paso                          # 'abajo'


def calcula(s, gid):
    g = s['grados'][gid]
    clases = max(0, s['semanas'] * g['clasesSem'] - g['descuento'])
    pts_cla = clases * s['ptsClase']
    pts_fic = g['fichas'] * s['ptsFicha']
    pts_proy = sum(p for _, p in s['proyectos'])
    total = g['previo'] + pts_cla + pts_fic + pts_proy
    cortes = [(i + 2, pc, redondea(pc * total, s['paso'], s['modo']))
              for i, pc in enumerate(s['escala'])]
    return dict(clases=clases, pts_cla=pts_cla, pts_fic=pts_fic,
                pts_proy=pts_proy, total=total, cortes=cortes)


def puntos_perfil(perfil, r, previo):
    cent = perfil[0] * r['pts_cla'] + perfil[1] * r['pts_fic'] + perfil[2] * r['pts_proy']
    return (cent + 50) // 100 + previo


def nota_de(pts, cortes):
    n = 1
    for nota, _, dicho in cortes:
        if pts >= dicho:
            n = nota
    return n


# ═══════════════ leer la página ═══════════════
def lee_sugerido(html):
    """Saca de la página los valores de SUGERIDO. Si la forma cambia, falla
    en voz alta en lugar de verificar otra cosa."""
    bloque = re.search(r'var SUGERIDO = \{(.*?)\n\};', html, re.S)
    if not bloque:
        raise ValueError('no encontré SUGERIDO en la página')
    b = bloque.group(1)

    def entero(nombre):
        m = re.search(nombre + r'\s*:\s*(\d+)', b)
        if not m:
            raise ValueError(f'no encontré {nombre}')
        return int(m.group(1))

    s = dict(semanas=entero('semanas'), ptsClase=entero('ptsClase'),
             ptsFicha=entero('ptsFicha'), paso=entero('paso'))
    s['modo'] = re.search(r"modo\s*:\s*'(\w+)'", b).group(1)
    s['escala'] = [int(v) for v in re.search(r'escala\s*:\s*\[([^\]]+)\]', b).group(1).split(',')]
    s['grados'] = {}
    for gid, cs, desc, fich, prev in re.findall(
            r"'(\w+)'\s*:\s*\{nombre:'[^']*',\s*clasesSem:(\d+),\s*descuento:(\d+),"
            r"\s*fichas:(\d+),\s*previo:(\d+)\}", b):
        s['grados'][gid] = dict(clasesSem=int(cs), descuento=int(desc),
                                fichas=int(fich), previo=int(prev))
    s['proyectos'] = [(n, int(p)) for n, p in re.findall(r"\['([^']+)',\s*(\d+)\]", b)]
    return s


def lee_perfiles(html):
    bloque = re.search(r'var PERFILES = \[(.*?)\n\];', html, re.S).group(1)
    return [(nombre, int(a), int(b), int(c), int(clave)) for nombre, a, b, c, clave in
            re.findall(r"\['([^']+)',\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d)\]", bloque)]


def main():
    print(f'Verificando {PAGINA.relative_to(RAIZ).as_posix()}\n')
    if not PAGINA.exists():
        mal('no existe la página')
        return 1
    html = PAGINA.read_text(encoding='utf-8')
    s = lee_sugerido(html)
    perfiles = lee_perfiles(html)
    if len(s['grados']) != 3 or not s['proyectos'] or len(perfiles) < 5:
        mal('no pude leer los grados, los proyectos o los perfiles de la página')

    print('1. El redondeo, con los casos que fallaban en coma flotante')
    casos = [((60 * 350, 5, 'abajo'), 210), ((60 * 350, 1, 'abajo'), 210),
             ((70 * 176, 5, 'abajo'), 120), ((70 * 176, 5, 'cercano'), 125),
             ((70 * 176, 5, 'arriba'), 125), ((60 * 199, 1, 'abajo'), 120)]
    for (cent, paso, modo), esperado in casos:
        if redondea(cent, paso, modo) != esperado:
            mal(f'redondea({cent}, {paso}, {modo}) dio {redondea(cent, paso, modo)}, no {esperado}')
    print('   0,60 · 350 de a 5 hacia abajo da 210, no 205 · y los demás casos cierran')

    print('2. El total y los cortes de cada grado, con los valores sugeridos')
    for gid in ('7mo', '8vo', '9no'):
        r = calcula(s, gid)
        # el total por el otro camino: sumando las partes una por una
        partes = (s['grados'][gid]['previo'] + r['clases'] * s['ptsClase'] +
                  s['grados'][gid]['fichas'] * s['ptsFicha'] +
                  sum(p for _, p in s['proyectos']))
        if partes != r['total']:
            mal(f'{gid}: el total no coincide con la suma de sus partes')
        # los cortes van en orden y nunca piden más que el porcentaje (hacia abajo)
        dichos = [d for _, _, d in r['cortes']]
        if dichos != sorted(dichos):
            mal(f'{gid}: los cortes no están en orden: {dichos}')
        if s['modo'] == 'abajo' and s['paso'] > 1:
            for nota, pc, dicho in r['cortes']:
                if dicho * 100 > pc * r['total']:
                    mal(f'{gid}: el corte del {nota} pide más que el {pc} %')
        print(f'   {gid}: {r["clases"]} clases · {r["pts_cla"]} + {r["pts_fic"]} + '
              f'{r["pts_proy"]} = {r["total"]} puntos · cortes ' +
              ', '.join(f'{n}→{d}' for n, _, d in r['cortes']))

    print('3. La calibración: quien viene y entrega todo llega al 2')
    for gid in ('7mo', '8vo', '9no'):
        r = calcula(s, gid)
        previo = s['grados'][gid]['previo']
        clave = [p for p in perfiles if p[4]] or [perfiles[1]]
        pts = puntos_perfil(clave[0][1:4], r, previo)
        n = nota_de(pts, r['cortes'])
        if n < 2:
            mal(f'{gid}: «{clave[0][0]}» junta {pts} y saca 1 — la escala está mal armada')
        linea = ' · '.join(f'{p[0].split(",")[0][:22]}: {nota_de(puntos_perfil(p[1:4], r, previo), r["cortes"])}'
                           for p in perfiles)
        print(f'   {gid}: el perfil clave junta {pts} y saca {n}  |  {linea}')

    print('4. Los nombres de los alumnos no salen de la computadora')
    if 'fetch(' in html or 'XMLHttpRequest' in html or 'sendBeacon' in html:
        mal('la página hace pedidos de red: los nombres podrían salir de la computadora')
    guarda = re.search(r'function guardaHash\(\)\{(.*?)\n\}', html, re.S)
    if not guarda or 'alumnos' in guarda.group(1):
        mal('la dirección de la página podría guardar los nombres de los alumnos')
    if re.search(r"localStorage\.setItem\([^)]*alumnos", html):
        mal('los nombres se guardan en el navegador')
    print('   sin pedidos de red; en la dirección solo viaja la calibración, no los nombres')

    print()
    if fallos:
        print(f'{len(fallos)} problema(s). El módulo NO está verificado.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
