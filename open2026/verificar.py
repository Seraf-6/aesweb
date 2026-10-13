"""Open House 2026 · verificador del módulo.

    python open2026/verificar.py

Comprueba open2026/piezas.py, open2026/salas.py y lo que build.py generó en
open-2026/, por caminos distintos de los que lo produjeron:

  · los QR se LEEN: cada SVG se decodifica acá mismo (un lector de QR en
    Python puro, sin segno) y la dirección leída se compara con la esperada,
    que este guion arma por su cuenta, y con el manifiesto;
  · la duración de los audios se lee del encabezado del .m4a (la caja mvhd),
    sin ffmpeg; el tamaño y los canales también;
  · las fotos se leen como JPEG: ancho y metadatos EXIF (que traen el GPS).

Sale con código 1 si encuentra alguna discrepancia. Lo que todavía falta y no
es un error (audios sin grabar, fotos sin subir, el párrafo de «encontramos»)
se lista aparte como pendiente.

Para probarlo con otros datos: --datos ruta/a/piezas.py --raiz ruta/al/sitio
"""
import argparse
import importlib.util
import json
import pathlib
import re
import struct
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
BASE = 'https://seraf-6.github.io/aesweb/open-2026/'   # escrita acá a propósito, no importada
CODIGO = re.compile(r'^([2-9])([a-z])-(\d{2})$')
GRADO = re.compile(r'^([2-9])\.º$')
INICIAL = re.compile(r'^[A-ZÁÉÍÓÚÑ]\.$')
CAMPOS = ('codigo', 'grado', 'seccion', 'nombre', 'titulo', 'dificultad', 'audio', 'problema',
          'solucion', 'respuesta', 'pared', 'fila', 'orden')
MAX_AUDIO = 400 * 1024
MIN_SEG = 3.0
MAX_ANCHO = 1600
MAX_PALABRAS = 150


def carga(ruta, nombre):
    spec = importlib.util.spec_from_file_location(nombre, ruta)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


# ═══════════════════ lector de QR (Python puro) ═══════════════════
# Bloques de corrección por versión y nivel: (códigos de corrección por bloque,
# [(cantidad de bloques, códigos de datos por bloque), ...]). Versiones 1 a 8.
ECC = {
    1: {'L': (7, [(1, 19)]), 'M': (10, [(1, 16)]), 'Q': (13, [(1, 13)]), 'H': (17, [(1, 9)])},
    2: {'L': (10, [(1, 34)]), 'M': (16, [(1, 28)]), 'Q': (22, [(1, 22)]), 'H': (28, [(1, 16)])},
    3: {'L': (15, [(1, 55)]), 'M': (26, [(1, 44)]), 'Q': (18, [(2, 17)]), 'H': (22, [(2, 13)])},
    4: {'L': (20, [(1, 80)]), 'M': (18, [(2, 32)]), 'Q': (26, [(2, 24)]), 'H': (16, [(4, 9)])},
    5: {'L': (26, [(1, 108)]), 'M': (24, [(2, 43)]), 'Q': (18, [(2, 15), (2, 16)]),
        'H': (22, [(2, 11), (2, 12)])},
    6: {'L': (18, [(2, 68)]), 'M': (16, [(4, 27)]), 'Q': (24, [(4, 19)]), 'H': (28, [(4, 15)])},
    7: {'L': (20, [(2, 78)]), 'M': (18, [(4, 31)]), 'Q': (18, [(2, 14), (4, 15)]),
        'H': (26, [(4, 13), (1, 14)])},
    8: {'L': (24, [(2, 97)]), 'M': (22, [(2, 38), (2, 39)]), 'Q': (22, [(4, 18), (2, 19)]),
        'H': (26, [(4, 14), (2, 15)])},
}
ALINEACION = {1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34],
              7: [6, 22, 38], 8: [6, 24, 42]}
NIVEL_BITS = {1: 'L', 0: 'M', 3: 'Q', 2: 'H'}
MASCARAS = [
    lambda x, y: (x + y) % 2 == 0, lambda x, y: y % 2 == 0, lambda x, y: x % 3 == 0,
    lambda x, y: (x + y) % 3 == 0, lambda x, y: (x // 3 + y // 2) % 2 == 0,
    lambda x, y: x * y % 2 + x * y % 3 == 0, lambda x, y: (x * y % 2 + x * y % 3) % 2 == 0,
    lambda x, y: ((x + y) % 2 + x * y % 3) % 2 == 0,
]
ALFANUM = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'


def formato_valido(nivel, mascara):
    datos = nivel << 3 | mascara
    resto = datos
    for _ in range(10):
        resto = (resto << 1) ^ ((resto >> 9) * 0x537)
    return (datos << 10 | resto) ^ 0x5412


def matriz_svg(svg):
    """Los módulos oscuros del SVG de segno (escala 1): matriz de booleanos."""
    vb = re.search(r'viewBox="0 0 (\d+) (\d+)"', svg)
    trazo = re.search(r'<path[^>]*stroke="[^"]+"[^>]*\sd="([^"]+)"', svg) or \
        re.search(r'<path[^>]*\sd="([^"]+)"[^>]*stroke=', svg)
    if not vb or not trazo:
        raise ValueError('el SVG no tiene el formato de segno')
    oscuros = set()
    x = y = 0.0
    for cmd, args in re.findall(r'([MmHhVv])\s*([-\d.\s]+)', trazo.group(1)):
        n = [float(a) for a in args.split()]
        if cmd == 'M':
            x, y = n[0], n[1]
        elif cmd == 'm':
            x, y = x + n[0], y + n[1]
        elif cmd in 'Hh':
            x2 = n[0] if cmd == 'H' else x + n[0]
            for c in range(int(round(min(x, x2))), int(round(max(x, x2)))):
                oscuros.add((int(y), c))
            x = x2
        else:
            raise ValueError('trazo vertical inesperado en el SVG')
    fil = [r for r, _ in oscuros]
    col = [c for _, c in oscuros]
    r0, c0 = min(fil), min(col)
    n = max(max(fil) - r0, max(col) - c0) + 1
    return [[(r0 + r, c0 + c) in oscuros for c in range(n)] for r in range(n)]


def lee_qr(m):
    """Decodifica una matriz de QR limpia. Devuelve (texto, versión, nivel)."""
    n = len(m)
    version = (n - 17) // 4
    if (n - 17) % 4 or version not in ECC:
        raise ValueError(f'tamaño {n} no corresponde a una versión 1–8')
    # formato: la copia de arriba a la izquierda (bit i según la norma)
    pos = [(i, 8) for i in range(6)] + [(7, 8), (8, 8), (8, 7)] + [(8, 14 - i) for i in range(9, 15)]
    leido = sum(m[r][c] << i for i, (r, c) in enumerate(pos))
    mejor = min(((bin(leido ^ formato_valido(nv, mk)).count('1'), nv, mk)
                 for nv in range(4) for mk in range(8)))
    if mejor[0] > 3:
        raise ValueError('la información de formato no se puede leer')
    nivel, mascara = NIVEL_BITS[mejor[1]], mejor[2]
    # qué módulos son de función
    fun = [[False] * n for _ in range(n)]
    def marca(r0, c0, alto, ancho):
        for r in range(max(r0, 0), min(r0 + alto, n)):
            for c in range(max(c0, 0), min(c0 + ancho, n)):
                fun[r][c] = True
    marca(0, 0, 9, 9); marca(0, n - 8, 9, 8); marca(n - 8, 0, 8, 9)
    marca(6, 0, 1, n); marca(0, 6, n, 1)
    al = ALINEACION[version]
    for a in al:
        for b in al:
            if (a, b) in ((6, 6), (6, al[-1]), (al[-1], 6)):
                continue
            marca(a - 2, b - 2, 5, 5)
    if version >= 7:
        marca(0, n - 11, 6, 3); marca(n - 11, 0, 3, 6)
    # leer los bits en zigzag, de abajo a la derecha
    bits = []
    derecha = n - 1
    while derecha >= 1:
        if derecha == 6:
            derecha = 5
        sube = ((derecha + 1) & 2) == 0
        for v in range(n):
            y = n - 1 - v if sube else v
            for j in range(2):
                x = derecha - j
                if not fun[y][x]:
                    bits.append(m[y][x] ^ MASCARAS[mascara](x, y))
        derecha -= 2
    cods = [int(''.join('1' if b else '0' for b in bits[i:i + 8]), 2)
            for i in range(0, len(bits) - 7, 8)]
    ec, grupos = ECC[version][nivel]
    tamanos = [d for cant, d in grupos for _ in range(cant)]
    bloques = [[] for _ in tamanos]
    k = 0
    for i in range(max(tamanos)):
        for b, t in enumerate(tamanos):
            if i < t:
                bloques[b].append(cods[k]); k += 1
    datos = [c for b in bloques for c in b]
    flujo = ''.join(f'{c:08b}' for c in datos)
    i, texto = 0, bytearray()
    def toma(cant):
        nonlocal i
        v = int(flujo[i:i + cant] or '0', 2); i += cant
        return v
    while i + 4 <= len(flujo):
        modo = toma(4)
        if modo == 0:
            break
        if modo == 4:                                   # bytes
            for _ in range(toma(8 if version < 10 else 16)):
                texto.append(toma(8))
        elif modo == 2:                                 # alfanumérico
            cant = toma(9 if version < 10 else 11)
            for _ in range(cant // 2):
                v = toma(11); texto += (ALFANUM[v // 45] + ALFANUM[v % 45]).encode()
            if cant % 2:
                texto += ALFANUM[toma(6)].encode()
        elif modo == 1:                                 # numérico
            cant = toma(10 if version < 10 else 12)
            while cant >= 3:
                texto += f'{toma(10):03d}'.encode(); cant -= 3
            if cant == 2:
                texto += f'{toma(7):02d}'.encode()
            elif cant == 1:
                texto += f'{toma(4):d}'.encode()
        else:
            raise ValueError(f'modo {modo} no soportado')
    try:
        return texto.decode('utf-8'), version, nivel
    except UnicodeDecodeError:                          # segno usa Latin-1 si alcanza
        return texto.decode('latin-1'), version, nivel


# ═══════════════════ audio y fotos ═══════════════════
def cajas(datos, ini=0, fin=None):
    fin = len(datos) if fin is None else fin
    i = ini
    while i + 8 <= fin:
        tam, tipo = struct.unpack('>I4s', datos[i:i + 8])
        cab = 8
        if tam == 1:
            tam = struct.unpack('>Q', datos[i + 8:i + 16])[0]; cab = 16
        elif tam == 0:
            tam = fin - i
        if tam < cab:
            return
        yield tipo.decode('latin-1'), i + cab, i + tam
        i += tam


def info_m4a(ruta):
    """Duración (segundos), canales y códec de un .m4a, leyendo sus cajas."""
    d = ruta.read_bytes()
    tipos = {t for t, _, _ in cajas(d)}
    if 'ftyp' not in tipos or 'moov' not in tipos:
        raise ValueError('no es un archivo MP4/M4A')
    dur = canales = codec = None
    def recorre(a, b):
        nonlocal dur, canales, codec
        for t, x, y in cajas(d, a, b):
            if t == 'mvhd':
                v = d[x]
                if v == 1:
                    escala, larga = struct.unpack('>IQ', d[x + 20:x + 32])
                else:
                    escala, larga = struct.unpack('>II', d[x + 12:x + 20])
                dur = larga / escala if escala else None
            elif t in ('moov', 'trak', 'mdia', 'minf', 'stbl'):
                recorre(x, y)
            elif t == 'stsd':
                for t2, x2, _ in cajas(d, x + 8, y):
                    codec = t2
                    if t2 == 'mp4a':
                        canales = struct.unpack('>H', d[x2 + 16:x2 + 18])[0]
    recorre(0, len(d))
    return dur, canales, codec


def info_jpeg(ruta):
    """(ancho, alto, tiene_exif) de un JPEG, leyendo sus marcadores."""
    d = ruta.read_bytes()
    if d[:2] != b'\xff\xd8':
        raise ValueError('no es un JPEG')
    i, exif, tam = 2, False, None
    while i + 4 <= len(d):
        if d[i] != 0xFF:
            break
        marca = d[i + 1]
        if marca == 0xD9 or marca == 0xDA:
            break
        largo = struct.unpack('>H', d[i + 2:i + 4])[0]
        seg = d[i + 4:i + 2 + largo]
        if marca == 0xE1 and (seg.startswith(b'Exif') or b'GPS' in seg[:64]):
            exif = True
        if marca in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
            alto, ancho = struct.unpack('>HH', seg[1:5])
            tam = (ancho, alto)
        i += 2 + largo
    if not tam:
        raise ValueError('no encontré el tamaño')
    return tam[0], tam[1], exif


def palabras(s):
    s = re.sub(r'[*«»]', '', s or '')
    return len(re.findall(r'[\wºª.]+', s))


# ═══════════════════ la verificación ═══════════════════
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--datos', default=str(RAIZ / 'open2026' / 'piezas.py'))
    ap.add_argument('--raiz', default=str(RAIZ))
    a = ap.parse_args()
    raiz = pathlib.Path(a.raiz)
    mod = raiz / 'open-2026'
    PIEZAS = carga(a.datos, 'piezas_a_verificar').PIEZAS
    salas_m = carga(RAIZ / 'open2026' / 'salas.py', 'salas_a_verificar')
    SALAS, ENTRADA = salas_m.SALAS, salas_m.ENTRADA

    mal, pendiente = [], {}
    def falta(que, cod):
        pendiente.setdefault(que, []).append(cod)
    def falla(donde, que):
        mal.append(f'{donde}: {que}')

    # ── las piezas: códigos, campos, nombres ──
    vistos, lugares = {}, {}
    for idx, p in enumerate(PIEZAS):
        cod = p.get('codigo')
        donde = cod or f'pieza #{idx + 1}'
        faltan = [c for c in CAMPOS if c not in p]
        if faltan:
            falla(donde, f'le faltan los campos {", ".join(faltan)}')
        m = CODIGO.match(cod or '')
        if not m:
            falla(donde, 'el código no respeta <grado><sección>-<nn> (por ejemplo 3a-07)')
        if cod in vistos:
            falla(donde, f'código repetido (también la pieza #{vistos[cod] + 1})')
        vistos.setdefault(cod, idx)
        g = GRADO.match(p.get('grado') or '')
        if not g:
            falla(donde, f'grado «{p.get("grado")}» no tiene la forma 3.º')
        if m and g and m.group(1) != g.group(1):
            falla(donde, f'el código dice {m.group(1)}.º y el grado dice {p.get("grado")}')
        sec = p.get('seccion') or ''
        if not re.fullmatch(r'[A-Z]', sec):
            falla(donde, f'sección «{sec}» no es una letra mayúscula')
        elif m and m.group(2) != sec.lower():
            falla(donde, f'el código dice sección {m.group(2)} y la pieza dice {sec}')
        # nombre: el de pila y la inicial del apellido, nunca más
        pal = (p.get('nombre') or '').split()
        sin_punto = [w for w in pal[1:] if not w.endswith('.')]
        if len(pal) < 2 or not INICIAL.match(pal[-1]):
            falla(donde, f'el nombre «{p.get("nombre")}» no termina en la inicial del apellido (Ana G.)')
        elif len(sin_punto) > 1 or any(not INICIAL.match(w) for w in pal[1:] if w.endswith('.')):
            falla(donde, f'el nombre «{p.get("nombre")}» parece tener un apellido completo')
        dif = p.get('dificultad')
        if dif is not None and (not isinstance(dif, int) or not 1 <= dif <= 5):
            falla(donde, f'dificultad {dif!r}: tiene que ser de 1 a 5, o None')
        # dónde va en la pared
        ubic = (p.get('pared'), p.get('fila'), p.get('orden'))
        if all(v is not None for v in ubic):
            if not (isinstance(ubic[1], int) and isinstance(ubic[2], int)):
                falla(donde, 'fila y orden tienen que ser números enteros')
            if ubic in lugares:
                falla(donde, f'cae en el mismo lugar que {lugares[ubic]} '
                             f'(pared {ubic[0]}, fila {ubic[1]}, orden {ubic[2]})')
            lugares.setdefault(ubic, cod)
        elif any(v is not None for v in ubic):
            falla(donde, 'tiene pared, fila y orden a medias')
        else:
            falta('sin ubicar en la pared', donde)

        # ── los archivos ──
        for campo in ('audio', 'respuesta'):
            arch = p.get(campo)
            if not arch:
                if campo == 'audio':
                    falta('sin audio', donde)
                continue
            ruta = mod / 'audio' / arch
            if not arch.endswith('.m4a'):
                falla(donde, f'{campo} {arch}: tiene que ser .m4a (AAC); pasalo por preparar_audio.py')
            if not ruta.is_file():
                falla(donde, f'{campo} {arch} no existe en open-2026/audio/')
                continue
            peso = ruta.stat().st_size
            if peso > MAX_AUDIO:
                falla(donde, f'{campo} {arch} pesa {peso // 1024} kB (máximo 400 kB)')
            try:
                dur, canales, codec = info_m4a(ruta)
            except Exception as ex:
                falla(donde, f'{campo} {arch} no se puede leer: {ex}')
                continue
            if dur is None or dur < MIN_SEG:
                falla(donde, f'{campo} {arch} dura {dur or 0:.1f} s: parece una grabación cortada')
            if codec != 'mp4a':
                falla(donde, f'{campo} {arch} no es AAC (códec {codec})')
            elif canales != 1:
                falla(donde, f'{campo} {arch} tiene {canales} canales: tiene que ser mono')
        for campo in ('problema', 'solucion'):
            arch = p.get(campo)
            if not arch:
                falta('sin foto de la solución' if campo == 'solucion' else 'sin foto del problema', donde)
                continue
            ruta = mod / 'img' / arch
            if not ruta.is_file():
                falla(donde, f'la foto {arch} no existe en open-2026/img/')
                continue
            try:
                ancho, alto, exif = info_jpeg(ruta)
            except Exception as ex:
                falla(donde, f'la foto {arch} no se puede leer: {ex}')
                continue
            if ancho > MAX_ANCHO:
                falla(donde, f'la foto {arch} mide {ancho} px de ancho (máximo {MAX_ANCHO})')
            if exif:
                falla(donde, f'la foto {arch} tiene metadatos EXIF (pueden traer el GPS)')

        # ── la página de la pieza ──
        if m:
            pag = mod / 'p' / cod / 'index.html'
            if not pag.is_file():
                falla(donde, 'no tiene página generada (corré build.py)')
            else:
                h = pag.read_text(encoding='utf-8')
                if p.get('audio'):
                    au = h.find('<audio controls preload="none">')
                    if au < 0 or f'audio/{p["audio"]}' not in h:
                        falla(donde, 'la página no tiene el reproductor con su audio')
                    elif '<img' in h and h.find('<img') < au:
                        falla(donde, 'en la página hay una foto antes del audio')
                elif 'todavía está grabando' not in h:
                    falla(donde, 'la página no avisa que el audio todavía no está')
                if p.get('respuesta') and 'lo que le respondió su familia' not in h:
                    falla(donde, 'la página no muestra el audio de respuesta')
                if p.get('solucion'):
                    sol = h.find(f'img/{p["solucion"]}')
                    if sol < 0 or h.rfind('<details', 0, sol) < 0:
                        falla(donde, 'la solución no está escondida detrás del botón')
                if p['nombre'] not in h.replace('&#x27;', "'"):
                    falla(donde, 'la página no muestra el nombre')

    # ── los QR y el manifiesto ──
    esperado = {'entrada': BASE}
    for s in SALAS:
        n = (GRADO.match(s['grado']) or re.match('(.)', '?')).group(1)
        esperado[f'sala-{n}'] = f'{BASE}sala/{n}/'
    for p in PIEZAS:
        if CODIGO.match(p.get('codigo') or ''):
            esperado[p['codigo']] = f'{BASE}p/{p["codigo"]}/'
    man_ruta = mod / 'qr' / 'manifest.json'
    try:
        man = json.loads(man_ruta.read_text(encoding='utf-8'))
    except Exception as ex:
        falla('qr/manifest.json', f'no se puede leer: {ex}')
        man = {'piezas': {}, 'salas': {}, 'entrada': None}
    filas = dict(man.get('piezas', {}))
    for n, f in man.get('salas', {}).items():
        filas[f'sala-{n}'] = f
    if man.get('entrada'):
        filas['entrada'] = man['entrada']
    codigos_piezas = {p.get('codigo') for p in PIEZAS}
    sobran = set(man.get('piezas', {})) - codigos_piezas
    faltan = codigos_piezas - set(man.get('piezas', {}))
    for c in sorted(sobran):
        falla(c, 'está en el manifiesto de QR pero no en piezas.py')
    for c in sorted(x for x in faltan if x):
        falla(c, 'no está en el manifiesto de QR (corré build.py)')
    leidos = 0
    for k, url in esperado.items():
        f = filas.get(k)
        if not f:
            if k not in faltan:
                falla(k, 'no está en el manifiesto de QR')
            continue
        if f.get('url') != url:
            falla(k, f'el manifiesto dice {f.get("url")} y tendría que ser {url}')
        # la dirección del manifiesto tiene que ser una página generada
        murl = f.get('url') or ''
        if not murl.startswith(BASE) or not (mod / murl[len(BASE):] / 'index.html').is_file():
            falla(k, f'la dirección del manifiesto {murl} no corresponde a una página generada')
        svg = mod / (f.get('archivo') or '')
        if not f.get('archivo') or not svg.is_file():
            falla(k, f'falta el SVG del QR ({f.get("archivo")})')
            continue
        try:
            texto, version, nivel = lee_qr(matriz_svg(svg.read_text(encoding='utf-8')))
        except Exception as ex:
            falla(k, f'el QR {svg.name} no se puede leer: {ex}')
            continue
        leidos += 1
        if texto != url:
            falla(k, f'el QR {svg.name} dice {texto} y tendría que decir {url}')
        if version > 6:
            falla(k, f'el QR es de versión {version}: demasiado denso para 40 mm')

    # ── noindex y nada que registre visitas ──
    htmls = sorted(mod.rglob('*.html')) if mod.is_dir() else []
    for h in htmls:
        t = h.read_text(encoding='utf-8')
        rel = h.relative_to(mod).as_posix()
        if '<meta name="robots" content="noindex, nofollow">' not in t:
            falla(rel, 'le falta el noindex')
        if re.search(r'<script[^>]+src=["\']https?:|gtag|google-analytics|googletagmanager|analytics',
                     t, re.I):
            falla(rel, 'tiene un guion externo o de analítica')

    # ── las salas y los paneles ──
    grados_salas = {}
    for s in SALAS:
        g = GRADO.match(s.get('grado') or '')
        if not g:
            falla(f'sala {s.get("grado")}', 'el grado no tiene la forma 3.º')
            continue
        n = g.group(1)
        grados_salas[n] = s
        donde = f'sala {s["grado"]}'
        total = palabras(s['titulo']) + sum(palabras(s.get(c)) for c in
                                            ('sabe_hacer', 'les_pedimos', 'encontramos', 'mira_esto'))
        if total > MAX_PALABRAS:
            falla(donde, f'el panel tiene {total} palabras (máximo {MAX_PALABRAS})')
        if not s.get('encontramos'):
            falta('salas sin «lo que encontramos» (entre paréntesis, las palabras que le quedan)',
                  f'{s["grado"]} ({MAX_PALABRAS - total})')
        if not (mod / 'sala' / n / 'index.html').is_file():
            falla(donde, 'no tiene su página')
    pan = mod / 'paneles' / 'index.html'
    ph = pan.read_text(encoding='utf-8') if pan.is_file() else ''
    if not ph:
        falla('paneles', 'no existe la página de paneles')
    bloques = re.findall(r'<article class="panel" id="panel-([^"]+)">(.*?)</article>', ph, re.S)
    hechos = {k: v for k, v in bloques}
    for n, s in grados_salas.items():
        b = hechos.get(n)
        if b is None:
            falla(f'sala {s["grado"]}', 'no tiene panel')
            continue
        if f'src="../qr/svg/sala-{n}.svg"' not in b or not (mod / 'qr' / 'svg' / f'sala-{n}.svg').is_file():
            falla(f'sala {s["grado"]}', 'al panel le falta el QR')
        if not s.get('encontramos') and 'Lo que encontramos' in b:
            falla(f'sala {s["grado"]}', 'el panel muestra «encontramos» vacío')
    if 'entrada' not in hechos or 'qr/svg/entrada.svg' not in hechos.get('entrada', ''):
        falla('paneles', 'falta el panel de entrada o su QR')
    if '@page{size:A3 portrait; margin:18mm}' not in ph:
        falla('paneles', 'la hoja no está en A3 vertical con 18 mm de margen')

    grados_piezas = {}
    for p in PIEZAS:
        g = GRADO.match(p.get('grado') or '')
        if g:
            grados_piezas.setdefault(g.group(1), 0)
            grados_piezas[g.group(1)] += 1
    for n in sorted(set(grados_piezas) - set(grados_salas)):
        cant = grados_piezas[n]
        falla(f'{n}.º', f'tiene {cant} pieza{"s" if cant > 1 else ""} y ninguna sala')
    for n in sorted(set(grados_salas) - set(grados_piezas)):
        falla(f'sala {n}.º', 'no tiene ninguna pieza')

    # ── archivos sueltos (no es error: se avisan) ──
    usados = {p.get(c) for p in PIEZAS for c in ('audio', 'respuesta', 'problema', 'solucion')}
    sueltos = [f'{c}/{x.name}' for c in ('audio', 'img') if (mod / c).is_dir()
               for x in sorted((mod / c).iterdir()) if x.is_file() and x.name not in usados]

    # ── informe ──
    print(f'Revisé {len(PIEZAS)} piezas, {len(SALAS)} salas, {leidos} códigos QR leídos '
          f'y {len(htmls)} páginas.')
    if pendiente:
        print('\nPendiente (no son errores):')
        for que, cods in pendiente.items():
            muestra = ', '.join(cods[:10]) + (f', … y {len(cods) - 10} más' if len(cods) > 10 else '')
            print(f'  · {len(cods)} {que}: {muestra}')
    if sueltos:
        print('\nArchivos que ninguna pieza usa: ' + ', '.join(sueltos))
    print(f'\n{len(mal)} discrepancias.')
    for x in mal:
        print('  ✗', x)
    if mal:
        sys.exit(1)
    print('Todo verificado.')


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    main()
