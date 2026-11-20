#!/usr/bin/env python3
"""SeraWeb · generador del sitio.

Lee `contenido.py` y escribe las páginas de índice. Las páginas de clase
(las diapositivas) se escriben a mano en matematica/<grado>/ y este
script no las toca: solo las enlaza.

También genera el módulo Open House 2026 (open-2026/) desde
`open2026/piezas.py` y `open2026/salas.py`: ver `open2026/generar.py`.

    python3 build.py

No necesita ninguna biblioteca externa.
"""
import html
import os
import pathlib
import shutil

# La política de seguridad de cada página: solo se cargan archivos del
# propio sitio (o de la carpeta, sin conexión), y ninguna página hace
# pedidos de red. Las páginas escritas a mano llevan la misma línea.
CSP = ('<meta http-equiv="Content-Security-Policy" content="'
       "default-src 'self' file:; script-src 'self' file: 'unsafe-inline'; style-src 'self' file: 'unsafe-inline'; img-src 'self' file: data:; font-src 'self' file:; media-src 'self' file:; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'"
       '">')
from contenido import SITIO, PORTADA, GRADOS, OMAPA, FICHAS, QUIMICA, CURSILLO, FISICA
from open2026 import generar as open2026

RAIZ = pathlib.Path(__file__).resolve().parent


# ─────────────────── plantilla ───────────────────
def pagina(titulo, cuerpo, prof=0, css_extra=(), descripcion=''):
    """Un documento completo. `prof` es cuántos niveles hay hasta la raíz."""
    sube = '../' * prof
    hojas = ''.join(
        '\n  <link rel="stylesheet" href="%s%s">' % (sube, h)
        for h in ('assets/base.css', 'assets/sitio.css') + tuple(css_extra))
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(titulo) + ' · ' + SITIO['nombre'] if titulo != SITIO['nombre'] else SITIO['nombre']}</title>
<meta name="description" content="{html.escape(descripcion)}">
<link rel="icon" href="{sube}assets/img/seraweb.svg" type="image/svg+xml">
{CSP}
<script src="{sube}assets/acceso.js"></script>{hojas}
</head>
<body>
{cuerpo}
<script src="{sube}assets/proyeccion.js" defer></script>
<script src="{sube}assets/timer.js" defer></script>
</body>
</html>
"""


def barra(prof, ruta):
    """La barra de arriba: marca y migas de pan."""
    sube = '../' * prof
    migas = ['<a href="%sindex.html">Inicio</a>' % sube]
    for texto, destino in ruta:
        migas.append('<span class="sep">/</span>')
        migas.append('<a href="%s%s">%s</a>' % (sube, destino, html.escape(texto))
                     if destino else '<span>%s</span>' % html.escape(texto))
    return f"""<nav class="sitio-nav">
  <div class="sitio-nav-int">
    <a class="sitio-marca" href="{sube}index.html">Sera<span>Web</span></a>
    <div class="sitio-ruta">{''.join(migas)}</div>
  </div>
</nav>"""


def pie(prof, firma=True):
    linea = (f"{SITIO['subtitulo']} · Año lectivo {SITIO['anio']} · "
             f"Docente: {SITIO['docentes']}<br>\n    ") if firma else ''
    return f"""<footer class="pie-sitio">
  <div class="envoltura ancha">
    {linea}Las claves de corrección no forman parte de este sitio.
  </div>
</footer>"""


def tarjeta(m, prof):
    """Una tarjeta de material."""
    sube = '../' * prof
    et = {'diapositiva': ('diapo-et', 'Diapositivas'),
          'ficha': ('ficha-et', 'Ficha'),
          'lectura': ('diapo-et', 'Lectura'),
          'interactivo': ('diapo-et', 'Demostraciones paso a paso'),
          'pendiente': ('pend', 'En preparación')}[m['tipo']]
    interior = (f'<span class="etiqueta {et[0]}">{et[1]}</span>'
                f'<h3>{html.escape(m["titulo"])}</h3>'
                f'<p>{html.escape(m["desc"])}</p>')
    if m.get('url'):
        return f'<a class="tarjeta" href="{sube}{m["url"]}">{interior}</a>'
    return f'<div class="tarjeta vacia">{interior}</div>'


# ─────────────────── páginas ───────────────────
def plural(n, uno, varios):
    return f'{n} {uno if n == 1 else varios}'


def cuenta_materia(bloques):
    return sum(1 for b in bloques for m in b['material'] if m['tipo'] == 'diapositiva')


def rotulo_modulo(mod):
    """El rótulo de una tarjeta de la portada: el material contado, para que
    no quede viejo. Devuelve (texto, hay_material)."""
    i = mod['id']
    if i == 'matematica':
        n = sum(1 for g in GRADOS for u in g['unidades'] for m in u['material']
                if m['tipo'] == 'diapositiva')
        f = sum(len(v) for v in FICHAS.values())
        return f"7.º a 9.º · {plural(n, 'clase', 'clases')} · {plural(f, 'ficha', 'fichas')}", n > 0
    if i == 'omapa':
        n = len(OMAPA['clases'])
        f = sum(len(t) for k in ('fichas_olimpiada', 'fichas_kanguro', 'fichas_nandu')
                for _, _, t in OMAPA.get(k, []))
        return f"2.º a 9.º · {plural(n, 'clase', 'clases')} · {plural(f, 'ficha', 'fichas')}", n > 0
    materias = {'quimica': QUIMICA, 'fisica': FISICA, 'cursillo': CURSILLO}
    if i in materias:
        n = cuenta_materia(materias[i])
        return (plural(n, 'clase', 'clases'), True) if n else ('En preparación', False)
    return mod['rotulo'], True


def tarjeta_modulo(mod):
    rot, hay = rotulo_modulo(mod)
    cab = (f'<span class="rotulo">{html.escape(rot)}</span>'
           f'<h3>{html.escape(mod["titulo"])}</h3>'
           f'<p>{html.escape(mod["desc"])}</p>')
    if not hay:
        return f'<div class="tarjeta vacia">{cab}</div>'
    if mod.get('extra'):
        # Un enlace adentro de otro no vale: la tarjeta es un div y su enlace
        # principal la cubre entera (.cubre), con el enlace chico por encima.
        texto, url = mod['extra']
        return (f'<div class="tarjeta con-extra">'
                f'<span class="rotulo">{html.escape(rot)}</span>'
                f'<h3><a class="cubre" href="{mod["url"]}">{html.escape(mod["titulo"])}</a></h3>'
                f'<p>{html.escape(mod["desc"])}</p>'
                f'<a class="extra" href="{url}">{html.escape(texto)} →</a></div>')
    return f'<a class="tarjeta" href="{mod["url"]}">{cab}</a>'


def portada():
    cuerpo = [barra(0, [])]
    cuerpo.append('<div class="envoltura ancha">')
    cuerpo.append(f"""<header class="portada">
  <h1>Sera<span>Web</span></h1>
  <p class="bajada">Material de clase de {SITIO['docentes']} · {SITIO['anio']}</p>
</header>""")
    for sec in PORTADA:
        clase = 'bloque chica' if sec.get('chica') else 'bloque'
        cuerpo.append(f'<section class="{clase}"><p class="eyebrow">{html.escape(sec["eyebrow"])}</p>')
        cuerpo.append(f'<h2>{html.escape(sec["titulo"])}</h2>')
        cuerpo.append('<div class="tarjetas en-portada">')
        for mod in sec['modulos']:
            cuerpo.append(tarjeta_modulo(mod))
        cuerpo.append('</div></section>')

    cuerpo.append("""<details class="como-se-usa">
  <summary>Cómo se usa en el aula</summary>
  <p>Cada clase tiene abajo a la derecha el botón <b>Proyección</b> (contraste, letra,
    tamaño, cuadrícula, zona libre para escribir y el modo <b>una diapositiva a la vez</b>,
    con las flechas) y arriba el <b>Timer</b>. Sobre pizarra blanca gana el fondo crema,
    que viene por defecto; conviene abrir la página con F11.</p>
</details>""")
    cuerpo.append('</div>')
    cuerpo.append(pie(0, firma=False))
    return pagina(SITIO['nombre'], '\n'.join(cuerpo), prof=0,
                  descripcion='Material de clase de Juan Serafini: Matemática, OMAPA, '
                              'Química, Física y Cursillo.')


def indice_matematica():
    cuerpo = [barra(1, [('Matemática', None)])]
    cuerpo.append('<div class="envoltura ancha">')
    cuerpo.append("""<header class="portada">
  <p class="sello">Tercer Ciclo</p>
  <h1>Matemática</h1>
  <p class="bajada">Las unidades tal como se dictan, no como vienen numeradas en el libro:
    algunas están fusionadas y otras cambiadas de orden.</p>
</header>""")
    cuerpo.append('<section class="bloque"><h2>Elegí el grado</h2><div class="tarjetas">')
    for g in GRADOS:
        n_dia = sum(1 for u in g['unidades'] for m in u['material']
                    if m['tipo'] == 'diapositiva')
        n_fic = len(FICHAS.get(g['id'], []))
        cuerpo.append(f"""<a class="tarjeta" href="{g['id']}/index.html">
      <span class="rotulo">{html.escape(g['libro'])}</span>
      <h3>{html.escape(g['nombre'])}</h3>
      <p>{len(g['unidades'])} unidades · {n_dia} juego{'s' if n_dia != 1 else ''} de
         diapositivas · {n_fic} fichas</p></a>""")
    cuerpo.append('</div></section></div>')
    cuerpo.append(pie(1))
    return pagina('Matemática', '\n'.join(cuerpo), prof=1)


def indice_materia(nombre, bloques, sello, bajada, descripcion):
    """El índice de una materia que no es Matemática: un bloque por sección."""
    cuerpo = [barra(1, [(nombre, None)])]
    cuerpo.append('<div class="envoltura ancha">')
    cuerpo.append(f"""<header class="portada">
  <p class="sello">{html.escape(sello)}</p>
  <h1>{html.escape(nombre)}</h1>
  <p class="bajada">{bajada}</p>
</header>""")
    for b in bloques:
        cuerpo.append('<section class="bloque">')
        cuerpo.append(f'<p class="eyebrow">{html.escape(b["eyebrow"])}</p>')
        cuerpo.append(f'<h2>{html.escape(b["titulo"])}</h2>')
        if b.get('nota'):
            cuerpo.append(f'<p>{html.escape(b["nota"])}</p>')
        cuerpo.append('<div class="tarjetas">')
        for m in b['material']:
            cuerpo.append(tarjeta(m, prof=1))
        cuerpo.append('</div></section>')
    cuerpo.append('</div>')
    cuerpo.append(pie(1))
    return pagina(nombre, '\n'.join(cuerpo), prof=1, descripcion=descripcion)


def indice_quimica():
    return indice_materia(
        'Química', QUIMICA, 'Clases para proyectar',
        """Clases para proyectar, sobre el mismo motor que las de Matemática:
    cada ejemplo, paso a paso y con su control.""",
        'Material de clase de Química: números cuánticos y configuración electrónica.')


def indice_fisica():
    return indice_materia(
        'Física', FISICA, 'Clases para proyectar',
        """Clases para proyectar, sobre el mismo motor que las de Matemática:
    cada ejemplo, paso a paso y con su control.""",
        'Material de clase de Física.')


def indice_cursillo():
    return indice_materia(
        'Cursillo', CURSILLO, 'Ingreso a la facultad',
        """La preparación para el examen de ingreso: las clases para proyectar,
    tema por tema.""",
        'Cursillo de preparación para el ingreso a la facultad.')


def indice_grado(g):
    cuerpo = [barra(2, [('Matemática', 'matematica/index.html'), (g['nombre'], None)])]
    cuerpo.append('<div class="envoltura ancha">')
    cuerpo.append(f"""<header class="portada">
  <p class="sello">{html.escape(g['libro'])}</p>
  <h1>{html.escape(g['nombre'])}</h1>
  <p class="bajada">Las unidades en el orden en que se dictan. Las páginas indicadas son
    las <b>impresas</b> en el libro del alumno.</p>
</header>""")
    for u in g['unidades']:
        cuerpo.append('<section class="bloque">')
        rotulo = u.get('eyebrow') or f'Unidad {u["n"]} · págs. {u["pags"]}'
        cuerpo.append(f'<p class="eyebrow">{html.escape(rotulo)}</p>')
        cuerpo.append(f'<h2>{html.escape(u["titulo"])}</h2>')
        if u.get('nota'):
            cuerpo.append(f'<p>{html.escape(u["nota"])}</p>')
        cuerpo.append('<div class="tarjetas">')
        for m in u['material']:
            cuerpo.append(tarjeta(m, prof=2))
        cuerpo.append('</div></section>')
    cuerpo.append('</div>')
    cuerpo.append(pie(2))
    return pagina(g['nombre'], '\n'.join(cuerpo), prof=2)


def indice_omapa():
    cuerpo = [barra(1, [('OMAPA', None)])]
    cuerpo.append('<div class="envoltura ancha">')
    cuerpo.append(f"""<header class="portada">
  <p class="sello">Olimpiada</p>
  <h1>{html.escape(OMAPA['titulo'])}</h1>
  <p class="bajada">{html.escape(OMAPA['bajada'])}</p>
</header>""")

    cuerpo.append("""<section class="bloque">
  <p class="eyebrow">Clases para proyectar</p>
  <h2>Las herramientas</h2>
  <p>Una clase por bloque del cuadernillo de herramientas. Cada una tiene la herramienta de
    la Olimpiada Infantil (3.º a 6.º) y la de la Juvenil (7.º a 9.º), con problemas reales
    de OMAPA resueltos paso a paso.</p>
  <div class="tarjetas">""")
    for n, titulo, desc in OMAPA['clases']:
        cuerpo.append(tarjeta({'tipo': 'diapositiva', 'titulo': f'{n}. {titulo}', 'desc': desc,
                               'url': f'omapa/clases/bloque-{n}.html'}, prof=1))
    cuerpo.append('</div></section>')

    cuerpo.append("""<section class="bloque" id="elementos">
  <p class="eyebrow">Geometría</p>
  <h2>Los Elementos de Euclides</h2>
  <p>El libro I completo, para entrar a la geometría como la pensaron los griegos: definiciones,
    postulados y cada proposición demostrada paso a paso a partir de las anteriores.</p>
  <div class="tarjetas">""")
    for m in OMAPA['elementos']:
        cuerpo.append(tarjeta(m, prof=1))
    cuerpo.append('</div></section>')

    cuerpo.append("""<section class="bloque" id="fichas">
  <p class="eyebrow">Para imprimir</p>
  <h2>Fichas de entrenamiento OMAPA</h2>
  <p>Cinco problemas, 40 minutos, individual. Cada ficha sube de ronda: los primeros
    problemas son de rondas iniciales y el último, de la ronda más alta del grado.</p>
  <ul class="lista-fichas">""")
    for cod, nombre, tandas in OMAPA['fichas_olimpiada']:
        enlaces = ' '.join(f'<a href="fichas/olimpiada/ficha-{cod}-{t}.pdf">{t}</a>' for t in tandas)
        cuerpo.append(f"""<li><span class="num">{cod}</span>
      <span class="nombre">{html.escape(nombre)} · fichas {enlaces}</span></li>""")
    cuerpo.append('</ul></section>')

    cuerpo.append("""<section class="bloque" id="kanguro">
  <h2>Fichas de competencia Kanguro</h2>
  <p>En parejas, como se rinde el Kanguro: ocho problemas de opción múltiple que valen 3, 4
    o 5 puntos según su dificultad.</p>
  <ul class="lista-fichas">""")
    for cod, nombre, tandas in OMAPA['fichas_kanguro']:
        enlaces = ' '.join(f'<a href="fichas/kanguro/ficha-kanguro-{cod}-{t}.pdf">{t}</a>' for t in tandas)
        cuerpo.append(f"""<li><span class="num">K</span>
      <span class="nombre">{html.escape(nombre)} · fichas {enlaces}</span></li>""")
    cuerpo.append('</ul></section>')

    cuerpo.append("""<section class="bloque" id="nandu">
  <h2>Fichas de competencia Ñandú</h2>
  <p>La olimpiada Ñandú de la OMA (Argentina), para la primaria: tres problemas de
    respuesta abierta en 40 minutos, como en el Certamen Interescolar.</p>
  <ul class="lista-fichas">""")
    for cod, nombre, tandas in OMAPA['fichas_nandu']:
        enlaces = ' '.join(f'<a href="fichas/nandu/ficha-nandu-{cod}-{t}.pdf">{t}</a>' for t in tandas)
        cuerpo.append(f"""<li><span class="num">Ñ</span>
      <span class="nombre">{html.escape(nombre)} · fichas {enlaces}</span></li>""")
    cuerpo.append('</ul></section>')

    cuerpo.append("""<section class="bloque" id="cuadernillos">
  <h2>Cuadernillos de herramientas</h2>
  <ul class="lista-fichas">
    <li><span class="num">I</span><span class="nombre"><a href="fichas/cuadernillos/cuadernillo-infantil.pdf">Infantil</a> · problemas de Fiesta Matemática, un bloque por herramienta</span></li>
    <li><span class="num">J</span><span class="nombre"><a href="fichas/cuadernillos/cuadernillo-juvenil.pdf">Juvenil</a> · problemas de Ronda Departamental, Nivel 1</span></li>
  </ul>
</section>""")

    cuerpo.append("""<section class="bloque">
  <p class="eyebrow">Criterio</p>
  <h2>Agrupado por idea, no por contenido</h2>
  <p>En la olimpiada el problema no avisa de qué tema es. Por eso el material se organiza
    por la herramienta que hace falta —contar bien, comparar, patrones, paridad, casos
    extremos— y no por la unidad del libro donde apareció.</p>
  <div class="aviso"><strong>Los problemas son de OMAPA, del Kanguro y del Ñandú.</strong> Cada ficha
    indica al pie de qué ronda y año es cada problema. Las claves de respuestas no están en
    este sitio.</div>
</section></div>""")
    cuerpo.append(pie(1))
    return pagina('OMAPA', '\n'.join(cuerpo), prof=1,
                  descripcion='Entrenamiento para la olimpiada: clases por herramienta y fichas por grado.')


def indice_fichas():
    nombres = {'7mo': '7.º grado', '8vo': '8.º grado', '9no': '9.º grado'}
    cuerpo = [barra(1, [('Fichas', None)])]
    cuerpo.append('<div class="envoltura ancha">')
    cuerpo.append("""<header class="portada">
  <p class="sello">Para imprimir</p>
  <h1>Fichas de ejercitación</h1>
  <p class="bajada">Todas en PDF. Cada ficha tiene su clave de corrección, que no está
    publicada acá.</p>
</header>""")
    for gid, lista in FICHAS.items():
        cuerpo.append(f'<section class="bloque" id="{gid}">')
        cuerpo.append(f'<h2>{nombres[gid]}</h2>')
        cuerpo.append('<ul class="lista-fichas">')
        for num, titulo in lista:
            archivo = f'pdf/{gid}/Ficha_{num:02d}.pdf'
            cuerpo.append(f"""<li>
        <span class="num">{num:02d}</span>
        <span class="nombre"><a href="{archivo}">{html.escape(titulo)}</a></span>
      </li>""")
        cuerpo.append('</ul></section>')
    cuerpo.append("""<section class="bloque">
  <div class="aviso"><strong>Las claves no están en este sitio.</strong> Se decidió a
    propósito: en un repositorio público cualquier contraseña de JavaScript se puede
    esquivar leyendo el código. Las claves quedan en la computadora del docente.</div>
</section></div>""")
    cuerpo.append(pie(1))
    return pagina('Fichas de ejercitación', '\n'.join(cuerpo), prof=1)


# ─────────────────── escritura ───────────────────
def escribe(ruta_rel, contenido):
    destino = RAIZ / ruta_rel
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(contenido, encoding='utf-8')
    return ruta_rel


def main():
    hechas = [
        escribe('index.html', portada()),
        escribe('matematica/index.html', indice_matematica()),
        escribe('quimica/index.html', indice_quimica()),
        escribe('fisica/index.html', indice_fisica()),
        escribe('cursillo/index.html', indice_cursillo()),
        escribe('omapa/index.html', indice_omapa()),
        escribe('fichas/index.html', indice_fichas()),
    ]
    for g in GRADOS:
        hechas.append(escribe(f'matematica/{g["id"]}/index.html', indice_grado(g)))

    for r in hechas:
        print('  ', r)
    print(f'{len(hechas)} páginas generadas.')

    del_modulo, info = open2026.escribir(RAIZ)
    hechas += del_modulo
    print(f'Open House 2026: {len(del_modulo)} archivos en open-2026/, '
          f'{info["qr_nuevos"]} QR nuevos.')
    if info['sin_segno']:
        print(f'  ¡Ojo! Faltan {len(info["sin_segno"])} QR y segno no está instalado '
              f'(pip install segno): {", ".join(info["sin_segno"][:8])}…')
    if info['invalidas']:
        print('  ¡Ojo! Piezas con el código o el grado mal escritos (no se generaron): '
              + ', '.join(info['invalidas']) + '. Ver open2026/verificar.py.')
    if info['huerfanas']:
        print('  Páginas de piezas que ya no están en piezas.py (se dejan, por si su QR '
              'sigue pegado): ' + ', '.join(info['huerfanas']))
    sueltas = sorted(p.relative_to(RAIZ).as_posix() for p in RAIZ.rglob('*.html')
                     if p.relative_to(RAIZ).as_posix() not in hechas)
    if sueltas:
        print('Páginas escritas a mano (no las toca el generador):')
        for s in sueltas:
            print('  ', s)


if __name__ == '__main__':
    main()
