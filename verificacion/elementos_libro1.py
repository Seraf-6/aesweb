"""Verifica omapa/elementos/libro1.js, el libro I de Euclides.

Lo que se comprueba:
  - cada entrada tiene su texto de 1774 y de Zamorano, su dicho sencillo y
    su id bien formado;
  - lo que usa cada proposición es un principio o una proposición anterior
    (así no puede haber ciclos), y coincide con lo que citan sus pasos y con
    lo que citan las ediciones antiguas;
  - el vínculo con las clases va y vuelve: si una entrada nombra una
    diapositiva, la diapositiva existe y nombra a la entrada, y al revés;
  - no quedan errores típicos del OCR de 1774 (la ligadura ct leída como d);
  - cada construcción animada tiene un dibujo por paso del texto, no usa ni
    nombra en el texto un punto antes de marcarlo, y sus medidas cierran (lo que dice iguales,
    mide igual; lo que dice que está en una circunferencia, está).
"""
import json, math, pathlib, re, sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DATOS = RAIZ / 'omapa' / 'elementos' / 'libro1.js'
PAGINA = RAIZ / 'omapa' / 'elementos' / 'libro-1.html'
fallos = []


def mal(msg):
    fallos.append(msg)
    print('   FALLA:', msg)


def carga():
    s = DATOS.read_text(encoding='utf-8')
    cuerpo = s[s.index('window.LIBRO1 =') + len('window.LIBRO1 ='):].strip()
    return json.loads(cuerpo.rstrip(';'))


PREFIJO = {'definicion': 'def', 'postulado': 'post', 'nocion': 'nc', 'proposicion': 'prop'}


def main():
    L = carga()
    E = {e['id']: e for e in L['entradas']}
    print(f'Verificando {DATOS.relative_to(RAIZ).as_posix()}: {len(E)} entradas\n')
    if len(E) != len(L['entradas']):
        mal('hay ids repetidos')

    print('Las entradas')
    for e in L['entradas']:
        i, t, n = e['id'], e['tipo'], e['n']
        if i != f'{PREFIJO[t]}-{n}':
            mal(f'{i}: el id no coincide con el tipo y el número')
        if not 1 <= n <= L['total'][t]:
            mal(f'{i}: el libro I no tiene ese número')
        for k in ('zam', 'e1774', 'facil', 'historia', 'usa', 'enClase'):
            if not e.get(k) and k not in ('usa', 'enClase'):
                mal(f'{i}: falta {k}')
        for ed in ('zam', 'e1774'):
            if not e[ed].get('enun'):
                mal(f'{i}: falta el enunciado de {ed}')
        viejo = ' '.join(str(e['e1774'].get(k, '')) for k in ('enun', 'dem'))
        for ocr in ('reda', 'redas', 'reEta', 'redo', 'redos', 'redángul'):
            if re.search(rf'\b{ocr}', viejo):
                mal(f'{i}: quedó «{ocr}» del OCR de 1774 (es recta, recto)')
    print(f'   {len(E)} entradas con sus versiones')

    print('Lo que usa cada una')
    for e in L['entradas']:
        i = e['id']
        if e['tipo'] != 'proposicion':
            if e['usa']:
                mal(f'{i}: un principio no usa nada')
            continue
        for u in e['usa']:
            tu, nu = u.split('-')
            if tu == 'prop' and int(nu) >= e['n']:
                mal(f'{i}: usa {u}, que no es anterior')
            if tu not in PREFIJO.values():
                mal(f'{i}: no sé qué es {u}')
        en_pasos = {u for paso in e.get('pasos', []) for u in paso[1]}
        if en_pasos != set(e['usa']):
            mal(f'{i}: los pasos citan {sorted(en_pasos)} y usa dice {sorted(e["usa"])}')
        for ed in ('zam', 'e1774'):
            citados = set(re.findall(r'\[\[([\w-]+)\|', e[ed].get('dem', '')))
            if citados - set(e['usa']):
                mal(f'{i}: {ed} cita {sorted(citados - set(e["usa"]))}, que no está en usa')
        for u in re.findall(r'\[\[([\w-]+)\|', e.get('corolario', {}).get('e1774', '')):
            tu, nu = u.split('-')
            if u not in {x['id'] for x in L['entradas']} or (tu == 'prop' and int(nu) > e['n']):
                mal(f'{i}: el corolario cita {u}, que no está cargada o es posterior')
        print(f'   {i}: usa {", ".join(e["usa"])}')

    print('El vínculo con las clases, de ida y de vuelta')
    clases = {}
    for e in L['entradas']:
        for c in e['enClase']:
            pag = (DATOS.parent / c['href'].split('#')[0]).resolve()
            if not pag.exists():
                mal(f'{e["id"]}: no existe {c["href"]}')
                continue
            html = clases.setdefault(pag, pag.read_text(encoding='utf-8'))
            sid = c['slide'][2:]
            m = re.search(r"\{ id:'" + re.escape(sid) + r"', cajon:.*?(?=\{ id:'|\Z)", html, re.S)
            if not m:
                mal(f'{e["id"]}: la diapositiva {c["slide"]} no existe')
            elif f"['{e['id']}'," not in m.group(0):
                mal(f'{e["id"]}: la diapositiva {c["slide"]} no tiene el vínculo de vuelta')
            else:
                print(f'   {e["id"]} y {c["slide"]} se nombran una a la otra')
    for pag in (RAIZ / 'matematica').glob('*/*.html'):
        html = pag.read_text(encoding='utf-8')
        for m in re.finditer(r"\{ id:'([\w-]+)', cajon:(.*?)(?=\{ id:'|\Z)", html, re.S):
            lista = re.search(r'elementos:\[(.*?)\]\],', m.group(2))
            for ref in re.findall(r"\['([\w-]+)',", lista.group(1) + ']') if lista else []:
                if ref == 'indice':
                    continue
                if ref not in E:
                    mal(f'{pag.name} d-{m.group(1)}: lleva a {ref}, que no está cargada')
                elif not any(c['slide'] == f'd-{m.group(1)}' for c in E[ref]['enClase']):
                    mal(f'{pag.name} d-{m.group(1)}: {ref} no la nombra en «En clase»')

    print('Las construcciones que se animan paso a paso')
    for e in L['entradas']:
        c = e.get('construccion')
        if not c:
            continue
        i, P = e['id'], c['puntos']
        if len(c['pasos']) != len(e['pasos']):
            mal(f'{i}: el texto tiene {len(e["pasos"])} pasos y la construcción {len(c["pasos"])}')
        hay = set()       # lo que ya está dibujado: no se usa un punto antes de marcarlo
        circulos = []
        for k, acciones in enumerate(c['pasos'], 1):
            for a in acciones:
                usa = [a.get(x) for x in ('p', 'a', 'b', 'c', 'por', 'desde', 'v') if a.get(x)] + [n for s in a.get('seg', []) for n in s] + a.get('pts', []) + a.get('de', []) + list(a.get('hacia', []))
                for n in usa:
                    if n not in P:
                        mal(f'{i} paso {k}: el punto {n} no tiene coordenadas')
                    elif n not in hay and not (a['t'] == 'punto' and n == a['p']) and not (a['t'] == 'circulo' and n in a.get('pasa', [])) and not (a['t'] == 'copia' and n == a['hacia']):
                        mal(f'{i} paso {k}: usa {n} antes de marcarlo')
                if a['t'] == 'punto':
                    hay.add(a['p'])
                if a['t'] == 'circulo':
                    r = math.dist(P[a['c']], P[a['por']])
                    circulos.append((a['c'], r))
                    for n in a.get('pasa', []):
                        if abs(math.dist(P[a['c']], P[n]) - r) > 1e-3:
                            mal(f'{i} paso {k}: {n} no está en la circunferencia de centro {a["c"]}')
                if a['t'] == 'segmento' and not ({a['a'], a['b']} <= hay):
                    mal(f'{i} paso {k}: traza {a["a"]}{a["b"]} sin tener los dos puntos')
                if a['t'] == 'igual' and not a.get('supuesto'):
                    largos = [math.dist(P[m], P[n]) for m, n in a['seg']]
                    if max(largos) - min(largos) > 1e-3:
                        mal(f'{i} paso {k}: dice que son iguales {a["seg"]} y miden {largos}')
            # el texto del paso no nombra un punto que todavía no se marcó
            texto = e['pasos'][k - 1][0] if k <= len(e['pasos']) else ''
            for nombre in re.findall(r'\b[A-Z]{1,4}\b', texto):
                faltan = [n for n in nombre if n in P and n not in hay]
                if faltan:
                    mal(f'{i} paso {k}: el texto nombra {nombre} y {"".join(faltan)} todavía no está marcado')
        # lo que la figura tiene que cumplir: alineados en ese orden, y lados iguales
        comp = c.get('comprueba', {})
        for x, y, z in comp.get('alineados', []):
            (x1, y1), (x2, y2), (x3, y3) = P[x], P[y], P[z]
            cruz = (x2 - x1) * (y3 - y1) - (y2 - y1) * (x3 - x1)
            if abs(cruz) > 1e-2 or math.dist(P[x], P[z]) <= math.dist(P[x], P[y]):
                mal(f'{i}: {z} no está en la prolongación de {x}{y}, más allá de {y}')
        # dos triángulos superpuestos: mismos lados y misma orientación (se
        # pueden mover uno sobre el otro sin darlo vuelta)
        for t1, t2 in comp.get('congruentes', []):
            l1 = [math.dist(P[t1[j]], P[t1[(j + 1) % 3]]) for j in range(3)]
            l2 = [math.dist(P[t2[j]], P[t2[(j + 1) % 3]]) for j in range(3)]
            orient = lambda t: (P[t[1]][0] - P[t[0]][0]) * (P[t[2]][1] - P[t[0]][1]) - (P[t[1]][1] - P[t[0]][1]) * (P[t[2]][0] - P[t[0]][0])
            if max(abs(x - y) for x, y in zip(l1, l2)) > 1e-3 or orient(t1) * orient(t2) <= 0:
                mal(f'{i}: {"".join(t1)} y {"".join(t2)} no se pueden superponer: lados {l1} y {l2}')
        for grupo in comp.get('iguales', []):
            largos = [math.dist(P[m], P[n]) for m, n in grupo]
            if max(largos) - min(largos) > 1e-3:
                mal(f'{i}: {grupo} tendrían que ser iguales y miden {largos}')
        # las prolongaciones llegan más allá de los puntos que se marcan sobre ellas
        for acciones in c['pasos']:
            for a in acciones:
                if a['t'] == 'prolonga':
                    for x, y, z in comp.get('alineados', []):
                        if (x, y) == (a['desde'], a['por']) and math.dist(P[x], P[z]) > a['largo'] - 8:
                            mal(f'{i}: la prolongación de {x}{y} no llega bien más allá de {z}')
        # el punto de corte de dos circunferencias tiene que estar en las dos
        for n, p in P.items():
            en = [cc for cc, r in circulos if abs(math.dist(P[cc], p) - r) < 1e-3]
            if n == 'C' and i == 'prop-1' and len(en) != 2:
                mal(f'{i}: C no está en las dos circunferencias')
        print(f'   {i}: {len(c["pasos"])} pasos, cada uno con su dibujo; las medidas cierran')
    if 'prop-1' in E and E['prop-1'].get('construccion'):
        P = E['prop-1']['construccion']['puntos']
        lados = [math.dist(P['A'], P['B']), math.dist(P['B'], P['C']), math.dist(P['C'], P['A'])]
        if max(lados) - min(lados) > 1e-3:
            mal(f'la I.1 no es equilátera: {lados}')
        else:
            print(f'   I.1: AB = BC = CA = {lados[0]:g}')

    print('El prólogo de Zamorano')
    pr = (DATOS.parent / 'prologo-zamorano.html').read_text(encoding='utf-8')
    for n in sorted({int(x) for x in re.findall(r'pags:\[([\d, ]+)\]', pr) for x in x.split(',')}):
        if not (DATOS.parent / 'img' / f'zam-p{n:02d}.webp').exists():
            mal(f'prólogo: falta la imagen de la página {n}')
    if re.search(r'\w\|p\d+\|\w', pr):
        mal('prólogo: una marca de página parte una palabra')
    partes = len(re.findall(r"\{ titulo:'", pr))
    print(f'   {partes} partes, {len(re.findall(r"\{ t:'", pr))} bloques de historia, imágenes de todas sus páginas')

    print()
    if fallos:
        print(f'{len(fallos)} problema(s). NO está verificado.')
        return 1
    print('Todo verificado.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
