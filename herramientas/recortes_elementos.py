"""Saca de los escaneos las páginas que muestra el prólogo de Zamorano
(omapa/elementos/img/). Antes recortaba también el texto de cada
entrada; Juan prefirió el texto con letra antigua (elementos/antiguo.css).

    python herramientas/recortes_elementos.py

Los escaneos no van al repositorio: están en ../fuentes/ (al lado de
aesweb). Cada recorte es un rectángulo de una página, en los puntos del PDF
(el origen arriba a la izquierda). Se guarda en escala de grises, en WebP,
al doble de la resolución con que se ve en pantalla.
"""
import io
import pathlib
import sys

import pymupdf
from PIL import Image

RAIZ = pathlib.Path(__file__).resolve().parent.parent
FUENTES = RAIZ.parent / 'fuentes'
ESCANEOS = {
    'e1774': FUENTES / 'euclides-1774' / 'Euclides_1774.pdf',
    'zam': FUENTES / 'zamorano-1576' / 'Zamorano_1576_libro_I.pdf',
}
DESTINO = RAIZ / 'omapa' / 'elementos' / 'img'

# id del recorte: (escaneo, página del escaneo contando desde 1, (x0, y0, x1, y1)
# o None para la página entera)
RECORTES = {
    # Zamorano, 1576: las páginas enteras de la dedicatoria y el prólogo
    'zam-p04':      ('zam', 4, None),
    'zam-p05':      ('zam', 5, None),
    'zam-p06':      ('zam', 6, None),
    'zam-p07':      ('zam', 7, None),
    'zam-p08':      ('zam', 8, None),
    'zam-p09':      ('zam', 9, None),
    'zam-p10':      ('zam', 10, None),
    'zam-p11':      ('zam', 11, None),
    'zam-p12':      ('zam', 12, None),
    'zam-p13':      ('zam', 13, None),
    'zam-p14':      ('zam', 14, None),
}

# de los puntos del PDF a los píxeles del recorte: el escaneo de Zamorano
# tiene páginas de 1000 puntos de ancho, el de 1774 de 500
ZOOM = {'e1774': 2.6, 'zam': 1.1}


def recorta(clave, solo=None):
    fuente, pagina, rect = RECORTES[clave]
    doc = pymupdf.open(ESCANEOS[fuente])
    pag = doc[pagina - 1]
    if rect is None:   # la página entera, a 700 píxeles de ancho
        z = 700 / pag.rect.width
        pix = pag.get_pixmap(matrix=pymupdf.Matrix(z, z))
    else:
        pix = pag.get_pixmap(matrix=pymupdf.Matrix(ZOOM[fuente], ZOOM[fuente]), clip=pymupdf.Rect(*rect))
    im = Image.open(io.BytesIO(pix.tobytes('png'))).convert('L')
    DESTINO.mkdir(parents=True, exist_ok=True)
    dest = DESTINO / f'{clave}.webp'
    im.save(dest, 'WEBP', quality=72, method=6)
    return dest, im.size


def main(claves):
    faltan = [f for f in ESCANEOS.values() if not f.exists()]
    if faltan:
        sys.exit(f'faltan los escaneos: {faltan}')
    total = 0
    for clave in claves or RECORTES:
        dest, tam = recorta(clave)
        kb = dest.stat().st_size / 1024
        total += kb
        print(f'   {dest.name:20} {tam[0]}×{tam[1]}  {kb:5.1f} KB')
    print(f'   en total {total:.0f} KB')


if __name__ == '__main__':
    main(sys.argv[1:])
