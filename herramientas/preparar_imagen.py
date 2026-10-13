"""Prepara una foto de una pieza del Open House 2026.

    python herramientas/preparar_imagen.py <foto> <codigo> problema
    python herramientas/preparar_imagen.py <foto> <codigo> solucion

Deja open-2026/img/<codigo>-problema.jpg (o -solucion.jpg):

  · enderezada según cómo se sacó la foto (el celular lo guarda en el EXIF);
  · de 1600 px de ancho como máximo;
  · JPEG calidad 82;
  · sin metadatos EXIF, que además de pesar traen la ubicación GPS de dónde
    se sacó la foto.

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


def main():
    _piezas.utf8()
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('foto')
    ap.add_argument('codigo')
    ap.add_argument('tipo', choices=('problema', 'solucion'))
    ap.add_argument('--no-anotar', action='store_true', help='no tocar piezas.py')
    a = ap.parse_args()
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
        sys.exit(f'«{cod}» no es un código (por ejemplo 3a-07)')
    if not a.no_anotar and not _piezas.existe(cod):
        sys.exit(f'{cod} no está en open2026/piezas.py. ¿Está bien escrito el código?')
    try:
        im = Image.open(foto)
    except Exception as ex:
        sys.exit(f'No pude abrir {foto.name}: {ex}\n(¿Es .heic? pip install pillow-heif, o exportala como JPEG.)')
    original = im.size
    im = ImageOps.exif_transpose(im)          # enderezar antes de borrar el EXIF
    im = im.convert('RGB')
    if im.width > MAX_ANCHO:
        im = im.resize((MAX_ANCHO, round(im.height * MAX_ANCHO / im.width)), Image.LANCZOS)
    destino = _piezas.MODULO / 'img' / f'{cod}-{a.tipo}.jpg'
    destino.parent.mkdir(parents=True, exist_ok=True)
    # Sin exif= ni icc_profile=: Pillow no copia ningún metadato.
    im.save(destino, 'JPEG', quality=CALIDAD, optimize=True, progressive=True)
    kb = destino.stat().st_size / 1024
    print(f'{cod}: {foto.name} ({original[0]}×{original[1]}) → '
          f'{destino.relative_to(_piezas.RAIZ).as_posix()} ({im.width}×{im.height}, {kb:.0f} kB)')
    if not a.no_anotar:
        antes = _piezas.pone(cod, a.tipo, destino.name)
        print(f'  piezas.py: {a.tipo} {antes!r} → {destino.name!r}. Falta correr build.py.')


if __name__ == '__main__':
    main()
