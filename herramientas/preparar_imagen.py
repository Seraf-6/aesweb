"""Prepara una foto de una pieza del Open House 2026.

    python herramientas/preparar_imagen.py <foto> <codigo> problema
    python herramientas/preparar_imagen.py <foto> <codigo> solucion

Deja open-2026/img/<codigo>-problema.jpg (o -solucion.jpg):

  · enderezada según cómo se sacó la foto (el celular lo guarda en el EXIF);
  · de 1600 px de ancho como máximo;
  · JPEG calidad 82;
  · sin metadatos EXIF, que además de pesar traen la ubicación GPS de dónde
    se sacó la foto;
  · con lo que no se publica tapado: el apellido completo que el alumno
    escribió en la hoja, o una anotación del docente. Cada --tapar es un
    rectángulo en porcentajes de la hoja (izquierda,arriba,derecha,abajo) y
    se pinta del color del papel de alrededor:

    python herramientas/preparar_imagen.py hoja.jpg 4a-07 problema --tapar 31,0,57,5

Después anota la foto en open2026/piezas.py. Hace falta Pillow
(pip install Pillow); para fotos .heic de iPhone, también pillow-heif.
"""
import argparse
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import _piezas  # noqa: E402

MAX_ANCHO = 1600
CALIDAD = 82


def tapa(im, caja):
    """Pinta el rectángulo del color del papel: la mediana de un marco alrededor."""
    from PIL import ImageDraw
    W, H = im.size
    x0, y0, x1, y1 = (round(v / 100 * L) for v, L in zip(caja, (W, H, W, H)))
    m = max(6, round(0.01 * W))
    marco = [im.getpixel((x, y)) for x in range(max(0, x0 - m), min(W, x1 + m), 3)
             for y in (max(0, y0 - m), min(H - 1, y1 + m))]
    marco += [im.getpixel((x, y)) for y in range(max(0, y0 - m), min(H, y1 + m), 3)
              for x in (max(0, x0 - m), min(W - 1, x1 + m))]
    color = tuple(sorted(c[i] for c in marco)[len(marco) // 2] for i in range(3))
    ImageDraw.Draw(im).rectangle([x0, y0, x1, y1], fill=color)


def main():
    _piezas.utf8()
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('foto')
    ap.add_argument('codigo')
    ap.add_argument('tipo', choices=('problema', 'solucion'))
    ap.add_argument('--no-anotar', action='store_true', help='no tocar piezas.py')
    ap.add_argument('--numero', type=int, default=1,
                    help='2 para la hoja del segundo problema del mismo alumno')
    ap.add_argument('--girar', type=int, default=0, choices=(0, 90, 180, 270),
                    help='grados en sentido horario, para una hoja escaneada de costado')
    ap.add_argument('--tapar', action='append', default=[], metavar='X0,Y0,X1,Y1',
                    help='rectángulo a tapar, en %% de la hoja; se puede repetir')
    a = ap.parse_args()
    cajas = []
    for t in a.tapar:
        try:
            x0, y0, x1, y1 = (float(v) for v in t.split(','))
        except ValueError:
            sys.exit(f'--tapar {t}: tienen que ser cuatro números separados por comas')
        if not (0 <= x0 < x1 <= 100 and 0 <= y0 < y1 <= 100):
            sys.exit(f'--tapar {t}: izquierda < derecha y arriba < abajo, entre 0 y 100')
        cajas.append((x0, y0, x1, y1))
    try:
        from PIL import Image, ImageOps
    except ImportError:
        sys.exit('Hace falta Pillow: pip install Pillow')
    try:
        import pillow_heif
        pillow_heif.register_heif_opener()
    except ImportError:
        pass
    foto = pathlib.Path(a.foto)
    cod = a.codigo.strip().lower()
    if not foto.is_file():
        sys.exit(f'No existe {foto}')
    if not _piezas.CODIGO.match(cod):
        sys.exit(f'«{cod}» no es un código (por ejemplo 3-07)')
    if not a.no_anotar and not _piezas.existe(cod):
        sys.exit(f'{cod} no está en open2026/piezas.py. ¿Está bien escrito el código?')
    try:
        im = Image.open(foto)
    except Exception as ex:
        sys.exit(f'No pude abrir {foto.name}: {ex}\n(¿Es .heic? pip install pillow-heif, o exportala como JPEG.)')
    original = im.size
    im = ImageOps.exif_transpose(im)          # enderezar antes de borrar el EXIF
    im = im.convert('RGB')
    if a.girar:                               # --tapar se mide sobre la hoja ya derecha
        im = im.rotate(-a.girar, expand=True)
    for caja in cajas:
        tapa(im, caja)
    if im.width > MAX_ANCHO:
        im = im.resize((MAX_ANCHO, round(im.height * MAX_ANCHO / im.width)), Image.LANCZOS)
    destino = _piezas.MODULO / 'img' / _piezas.nombre_archivo(cod, a.numero, f'-{a.tipo}.jpg')
    destino.parent.mkdir(parents=True, exist_ok=True)
    # Sin exif= ni icc_profile=: Pillow no copia ningún metadato.
    im.save(destino, 'JPEG', quality=CALIDAD, optimize=True, progressive=True)
    kb = destino.stat().st_size / 1024
    print(f'{cod}: {foto.name} ({original[0]}×{original[1]}) → '
          f'{destino.relative_to(_piezas.RAIZ).as_posix()} ({im.width}×{im.height}, {kb:.0f} kB)')
    if not a.no_anotar:
        antes = _piezas.pone(cod, a.tipo, destino.name, a.numero)
        print(f'  piezas.py: {a.tipo} {antes!r} → {destino.name!r}. Falta correr build.py.')


if __name__ == '__main__':
    main()
