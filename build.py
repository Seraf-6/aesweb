#!/usr/bin/env python3
"""AESWeb · generador del sitio.

Lee `contenido.py` y escribe las páginas de índice. Las páginas de clase
(las diapositivas) se escriben a mano en matematica/<grado>/ y este
script no las toca: solo las enlaza.

    python3 build.py

No necesita ninguna biblioteca externa.
"""
import html
import os
import pathlib
import shutil

from contenido import SITIO, GRADOS, OMAPA, FICHAS

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
<title>{html.escape(titulo)} · {SITIO['nombre']}</title>
<meta name="description" content="{html.escape(descripcion)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,500;0,700;0,800;1,500&family=Alegreya+Sans:ital,wght@0,400;0,500;0,700;1,400&family=IBM+Plex+Mono:wght@400;600&display=swap">{hojas}
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
    <a class="sitio-marca" href="{sube}index.html">{SITIO['nombre']}</a>
    <div class="sitio-ruta">{''.join(migas)}</div>
  </div>
</nav>"""


def pie(prof):
    return f"""<footer class="pie-sitio">
  <div class="envoltura ancha">
    {SITIO['subtitulo']} · Año lectivo {SITIO['anio']} · Docentes: {SITIO['docentes']}<br>
    Las claves de corrección no forman parte de este sitio.
  </div>
</footer>"""


def tarjeta(m, prof):
    """Una tarjeta de material."""
    sube = '../' * prof
    et = {'diapositiva': ('diapo-et', 'Diapositivas'),
          'ficha': ('ficha-et', 'Ficha'),
          'pendiente': ('pend', 'En preparación')}[m['tipo']]
    interior = (f'<span class="etiqueta {et[0]}">{et[1]}</span>'
                f'<h3>{html.escape(m["titulo"])}</h3>'
                f'<p>{html.escape(m["desc"])}</p>')
    if m.get('url'):
        return f'<a class="tarjeta" href="{sube}{m["url"]}">{interior}</a>'
    return f'<div class="tarjeta vacia">{interior}</div>'


# ─────────────────── páginas ───────────────────
def portada():
    cuerpo = [barra(0, [])]
    cuerpo.append('<div class="envoltura ancha">')
    cuerpo.append(f"""<header class="portada">
  <p class="sello">Albert Einstein School · Tercer Ciclo</p>
  <h1>{SITIO['nombre']}</h1>
  <p class="bajada">El material de clase en un solo lugar: las diapositivas para
    proyectar, las fichas de ejercitación y la preparación para la olimpiada.</p>
  <div class="pie">
    <span>Año lectivo {SITIO['anio']}</span>
    <span>Docentes: {SITIO['docentes']}</span>
  </div>
</header>""")

    cuerpo.append('<section class="bloque"><p class="eyebrow">Por dónde entrar</p>')
    cuerpo.append('<h2>Los módulos</h2>')
    cuerpo.append('<div class="tarjetas">')
    cuerpo.append("""<a class="tarjeta" href="matematica/index.html">
      <span class="rotulo">7.º · 8.º · 9.º grado</span>
      <h3>Matemática</h3>
      <p>Las unidades del año, con sus diapositivas y sus fichas.</p></a>""")
    cuerpo.append("""<a class="tarjeta" href="omapa/index.html">
      <span class="rotulo">2.º a 9.º grado</span>
      <h3>OMAPA</h3>
      <p>Preparación para la olimpiada, agrupada por idea y no por unidad.</p></a>""")
    cuerpo.append("""<a class="tarjeta" href="fichas/index.html">
      <span class="rotulo">Todas juntas</span>
      <h3>Fichas de ejercitación</h3>
      <p>Las fichas de los tres grados, en PDF, para imprimir.</p></a>""")
    cuerpo.append("""<a class="tarjeta" href="progreso/index.html">
      <span class="rotulo">Para el docente</span>
      <h3>Progreso del tramo</h3>
      <p>Cuántos puntos tiene el tramo final, dónde cae cada nota, las reglas para
        dictar y la carrera del curso para proyectar.</p></a>""")
    cuerpo.append('</div></section>')

    cuerpo.append("""<section class="bloque">
  <p class="eyebrow">Cómo se usa en el aula</p>
  <h2>Las diapositivas se proyectan</h2>
  <p>Cada página de clase tiene abajo a la derecha un botón <b>Proyección</b>. Desde ahí
    se elige el contraste, el color de letra, el tamaño, la cuadrícula, y se puede reservar
    una franja de pantalla en blanco para escribir en la pizarra. También está el modo
    <b>una diapositiva a la vez</b>, que se pasa con las flechas del teclado.</p>
  <p>Arriba a la derecha, en cualquier página, está el botón <b>Timer</b>: se elige de
    cuántos minutos y la cuenta regresiva toma la pantalla entera, con música de fondo si
    se quiere. Al llegar a cero suena un aviso.</p>
  <div class="aviso"><strong>Probado en el aula:</strong> sobre pizarra blanca gana el
    fondo crema, que es el que viene puesto por defecto. Conviene abrir la página en
    pantalla completa con F11 antes de empezar.</div>
</section>""")

    cuerpo.append('</div>')
    cuerpo.append(pie(0))
    return pagina(SITIO['nombre'], '\n'.join(cuerpo), prof=0,
                  descripcion='Material de clase de Matemática del Tercer Ciclo.')


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
        cuerpo.append(f'<p class="eyebrow">Unidad {u["n"]} · págs. {u["pags"]}</p>')
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
    cuerpo.append('<section class="bloque"><h2>Por edad</h2><div class="tarjetas">')
    for n in OMAPA['niveles']:
        cuerpo.append(f"""<div class="tarjeta vacia">
      <span class="etiqueta pend">En preparación</span>
      <h3>{html.escape(n['nombre'])}</h3>
      <p>{html.escape(n['desc'])}</p></div>""")
    cuerpo.append('</div></section>')
    cuerpo.append("""<section class="bloque">
  <p class="eyebrow">Criterio</p>
  <h2>Agrupado por idea, no por contenido</h2>
  <p>En la olimpiada el problema no avisa de qué tema es. Por eso el material se organiza
    por la herramienta que hace falta —paridad, principio del palomar, invariantes,
    conteo ordenado— y no por la unidad del libro donde apareció.</p>
</section></div>""")
    cuerpo.append(pie(1))
    return pagina('OMAPA', '\n'.join(cuerpo), prof=1)


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
        escribe('omapa/index.html', indice_omapa()),
        escribe('fichas/index.html', indice_fichas()),
    ]
    for g in GRADOS:
        hechas.append(escribe(f'matematica/{g["id"]}/index.html', indice_grado(g)))

    for r in hechas:
        print('  ', r)
    print(f'{len(hechas)} páginas generadas.')
    sueltas = sorted(p.relative_to(RAIZ).as_posix() for p in RAIZ.rglob('*.html')
                     if p.relative_to(RAIZ).as_posix() not in hechas)
    if sueltas:
        print('Páginas escritas a mano (no las toca el generador):')
        for s in sueltas:
            print('  ', s)


if __name__ == '__main__':
    main()
