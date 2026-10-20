"""Open House 2026 · el generador del módulo.

Lo llama `build.py`. Lee `piezas.py` y `salas.py` y escribe todo open-2026/:

    open-2026/index.html             portada: qué es la obra, cómo recorrerla, buscador
    open-2026/p/<codigo>/index.html  una por pieza            ← su QR está en la pared
    open-2026/sala/<n>/index.html    el texto de sala de cada grado  ← su QR, en el panel
    open-2026/paneles/index.html     los paneles de sala, en A3 para imprimir
    open-2026/qr/index.html          la hoja de etiquetas QR, en A4 para imprimir
    open-2026/qr/svg/*.svg           los QR (se generan una vez y quedan commiteados)
    open-2026/qr/manifest.json       codigo → url → archivo, para el verificador
    open-2026/mapa/index.html        qué pieza va en qué pared
    open-2026/estilo.css             los estilos de las páginas web del módulo

Nunca se edita a mano nada de open-2026/ salvo los audios y las fotos: el
generador lo pisa. Tampoco borra nada: una pieza que sale de piezas.py deja su
página, porque su QR puede seguir pegado en alguna pared.

Los QR se hacen con segno solo si falta el SVG. Si segno no está instalado y
no falta ninguno, el sitio se construye igual.
"""
import html
import json
import pathlib
import re
import struct

# La dirección pública del módulo. Está impresa en todos los QR: no se cambia.
URL_BASE = 'https://seraf-6.github.io/aesweb/open-2026/'
CARPETA = 'open-2026'
ROBOTS = '<meta name="robots" content="noindex, nofollow">'
FUENTES = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
           '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
           '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya:'
           'ital,wght@0,500;0,700;0,800;1,500&family=IBM+Plex+Mono:wght@600&display=swap">')
ESTRELLA, ESTRELLA_VACIA = '★', '☆'
# El código de una pieza: <grado>-<nn>. El colegio no tiene secciones.
CODIGO = re.compile(r'^([2-9])-(\d{2})$')


# ─────────────────── ayudas ───────────────────
def e(s):
    return html.escape(str(s), quote=True)


def md(s):
    """Texto de sala: se escapa y **esto** sale en negrita, *esto* en cursiva."""
    s = e(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    return re.sub(r'\*(.+?)\*', r'<em>\1</em>', s)


def num_grado(grado):
    """'3.º' → '3'."""
    return re.match(r'\d', grado).group(0)


def clave(p):
    """El orden de las piezas: grado y número."""
    g, n = CODIGO.match(p['codigo']).groups()
    return (int(g), int(n))


def cuantas(n):
    return f'{n} pieza' if n == 1 else f'{n} piezas'


def nombre_pila(p):
    return p['nombre'].split()[0]


def url_pieza(codigo):
    return f'{URL_BASE}p/{codigo}/'


def url_sala(grado):
    return f'{URL_BASE}sala/{num_grado(grado)}/'


def tam_jpeg(ruta):
    """Ancho y alto de un JPEG, leyendo el marcador SOF. None si no se puede."""
    try:
        datos = ruta.read_bytes()
    except OSError:
        return None
    i = 2
    while i + 9 < len(datos):
        if datos[i] != 0xFF:
            return None
        marca = datos[i + 1]
        largo = struct.unpack('>H', datos[i + 2:i + 4])[0]
        if marca in (0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7, 0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF):
            alto, ancho = struct.unpack('>HH', datos[i + 5:i + 9])
            return ancho, alto
        i += 2 + largo
    return None


def documento(titulo, cuerpo, prof, extra_head='', clase_body='', css=True):
    """Una página del módulo. `prof` = niveles hasta la raíz del sitio."""
    sube = '../' * prof
    hoja = (f'\n<link rel="stylesheet" href="{"../" * (prof - 1)}estilo.css">' if css else '')
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
{ROBOTS}
<meta name="referrer" content="no-referrer">
<title>{e(titulo)}</title>
<link rel="stylesheet" href="{sube}assets/base.css">{hoja}{extra_head}
</head>
<body{f' class="{clase_body}"' if clase_body else ''}>
{cuerpo}
</body>
</html>
"""


# ─────────────────── estilos de las páginas web ───────────────────
ESTILO = """/* Open House 2026 · lo genera open2026/generar.py: no se edita a mano.
   Las páginas se usan de pie, con una mano y poca luz: letra de 18 px,
   áreas táctiles de 48 px y nada arriba del audio salvo quién y qué. */
body{background-image:none; font-size:18px; line-height:1.5}
.o-env{max-width:640px; margin:0 auto; padding:14px 16px 40px}
.o-sello{font-size:17px; color:var(--lapiz); margin:0}
h1{margin:.1em 0 0; line-height:1.15}
a{color:var(--acento)}

/* la pieza */
.p-grado{font-size:18px; color:var(--lapiz); margin:0}
.p-nombre{font-size:32px}
.p-titulo{font-family:var(--serif); font-size:24px; line-height:1.25; margin:.2em 0 0}
.p-estrellas{font-size:18px; color:var(--dest); margin:.25em 0 0}
.p-estrellas span{color:var(--lapiz); font-size:17px}
.p-audio{margin:14px 0 22px}
.p-audio audio{display:block; width:100%; min-height:54px}
.p-audio .rotulo{font-size:17px; color:var(--lapiz); margin:0 0 6px}
.p-espera{font-size:19px; background:var(--papel-2); border:1px solid var(--linea-fuerte);
  border-radius:10px; padding:14px 16px; margin:0}
.p-respuesta{margin-top:-8px}
.p-cual{font-size:22px; margin:26px 0 4px; padding-top:14px; border-top:2px solid var(--linea-fuerte)}
.p-cual:first-child{border-top:0; padding-top:0; margin-top:10px}
.p-hoja{margin:0 0 18px}
.p-hoja img{display:block; width:100%; border:1px solid var(--linea-fuerte); border-radius:6px;
  background:#fff}
.p-hoja figcaption{font-size:17px; color:var(--lapiz); margin-top:6px}
.p-falta{font-size:17px; color:var(--lapiz)}
.p-solucion{margin:0 0 26px}
.p-solucion summary{display:flex; align-items:center; justify-content:center; min-height:56px;
  padding:10px 16px; border-radius:10px; border:2px solid var(--acento2); color:var(--acento2);
  font-weight:700; font-size:19px; cursor:pointer; list-style:none; text-align:center}
.p-solucion summary::-webkit-details-marker{display:none}
.p-solucion[open] summary{margin-bottom:12px}
.p-solucion img{display:block; width:100%; border:1px solid var(--linea-fuerte); border-radius:6px;
  background:#fff}

/* navegación de a pie: anterior / siguiente y la portada */
.o-nav{display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:8px}
.o-nav a, .o-boton{display:flex; align-items:center; justify-content:center; min-height:52px;
  padding:8px 12px; border:1px solid var(--linea-fuerte); border-radius:10px; background:var(--papel-2);
  color:var(--tinta); text-decoration:none; font-weight:600; text-align:center; line-height:1.2}
.o-nav .ancho{grid-column:1 / -1}
.o-nav .vacio{visibility:hidden}
.o-pie{font-size:17px; color:var(--lapiz); margin-top:28px}

/* listas de piezas */
.o-lista{list-style:none; padding:0; margin:0}
.o-lista li{border-bottom:1px solid var(--linea)}
.o-lista a{display:flex; gap:12px; align-items:baseline; min-height:52px; padding:10px 4px;
  color:var(--tinta); text-decoration:none}
.o-lista .cod{font-family:var(--mono); font-size:16px; color:var(--lapiz); flex:none; min-width:4.6em}
.o-lista .tit{color:var(--lapiz)}

/* portada */
.o-buscar{margin:18px 0 8px}
.o-buscar label{display:block; font-weight:700; margin-bottom:6px}
.o-buscar input{width:100%; min-height:52px; font-size:19px; padding:10px 14px; border-radius:10px;
  border:2px solid var(--linea-fuerte); background:var(--papel); color:var(--tinta)}
.o-buscar input:focus{outline:3px solid var(--acento2); outline-offset:1px}
.o-ayuda{font-size:17px; color:var(--lapiz); margin:6px 0 0}
.o-pasos{padding-left:0; list-style:none}
.o-pasos li{margin:0 0 10px}
.o-salas{display:grid; gap:10px; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr))}

/* sala */
.s-seccion h2{font-size:21px; margin:1.1em 0 .2em}
.s-seccion p{margin:0}

/* mapa */
.m-tabla{width:100%; border-collapse:collapse; font-size:17px}
.m-tabla th, .m-tabla td{text-align:left; padding:6px 8px; border-bottom:1px solid var(--linea)}
.m-tabla .falta{color:var(--acento); font-weight:700}
.m-resumen{display:flex; flex-wrap:wrap; gap:8px 18px; padding:0; list-style:none}
.o-env.ancha{max-width:1000px}
.o-scroll{overflow-x:auto}
@media print{ .no-imprimir{display:none!important} body{font-size:11pt} }
"""


# ─────────────────── la pieza ───────────────────
def pagina_pieza(p, ant, sig, raiz_mod):
    cod = p['codigo']
    pila = nombre_pila(p)
    titulo = p.get('titulo')
    cab = [f'<p class="p-grado">{e(p["grado"])} grado</p>',
           f'<h1 class="p-nombre">{e(p["nombre"])}</h1>']
    if titulo:
        cab.append(f'<p class="p-titulo">{e(titulo)}</p>')
    if p.get('dificultad'):
        d = int(p['dificultad'])
        cab.append(f'<p class="p-estrellas" aria-label="Dificultad {d} de 5">'
                   f'{ESTRELLA * d}{ESTRELLA_VACIA * (5 - d)} <span>según su autor</span></p>')

    def reproductor(archivo, rotulo, clase=''):
        src = f'../../audio/{e(archivo)}'
        return (f'<section class="p-audio {clase}">\n'
                f'  <p class="rotulo">{rotulo}</p>\n'
                f'  <audio controls preload="none"><source src="{src}" type="audio/mp4">'
                f'<a href="{src}">Escuchar el audio</a></audio>\n</section>')

    def foto(archivo, alt, diferida):
        tam = tam_jpeg(raiz_mod / 'img' / archivo)
        wh = f' width="{tam[0]}" height="{tam[1]}"' if tam else ''
        # La hoja está en la primera pantalla: se pide enseguida. La solución
        # espera a que se abra el botón.
        carga = ' loading="lazy"' if diferida else ''
        return f'<img src="../../img/{e(archivo)}" alt="{alt}"{wh}{carga} decoding="async">'

    # Un alumno puede tener más de un problema (`mas`): cada uno con su audio,
    # su hoja y su solución, en ese orden.
    problemas = [p] + list(p.get('mas') or [])
    bloques = []
    for k, q in enumerate(problemas, 1):
        partes = []
        if len(problemas) > 1:
            partes.append(f'<h2 class="p-cual">Problema {k}</h2>')
        if q.get('audio'):
            rot = f'{e(pila)} cuenta cómo se le ocurrió' + (f' el problema {k}' if len(problemas) > 1 else '')
            partes.append(reproductor(q['audio'], rot))
        elif k == 1:
            partes.append(f'<section class="p-audio"><p class="p-espera">{e(pila)} todavía está grabando '
                          f'su explicación.</p></section>')
        # Reservado: el audio con que respondió la familia. Hoy siempre es None.
        if k == 1 and p.get('respuesta'):
            partes.append(reproductor(p['respuesta'], 'lo que le respondió su familia', 'p-respuesta'))
        if q.get('problema'):
            partes.append(f'<figure class="p-hoja"><a href="../../img/{e(q["problema"])}">'
                          f'{foto(q["problema"], "La hoja del problema, dibujada por " + e(pila), k > 1)}</a>'
                          f'<figcaption>Tocá la foto para verla entera.</figcaption></figure>')
        else:
            partes.append('<p class="p-falta">La foto de la hoja todavía no está cargada.</p>')
        if q.get('solucion'):
            partes.append(f'<details class="p-solucion"><summary>Ver cómo se resuelve</summary>'
                          f'{foto(q["solucion"], "La solución, con la letra de " + e(pila), True)}</details>')
        bloques.append(chr(10).join(partes))

    nav = ['<nav class="o-nav" aria-label="Otras piezas">']
    nav.append(f'<a href="../{ant["codigo"]}/index.html">← {e(ant["codigo"])}</a>' if ant
               else '<span class="vacio"></span>')
    nav.append(f'<a href="../{sig["codigo"]}/index.html">{e(sig["codigo"])} →</a>' if sig
               else '<span class="vacio"></span>')
    nav.append(f'<a href="../../sala/{num_grado(p["grado"])}/index.html">Sala de {e(p["grado"])} grado</a>')
    nav.append('<a href="../../index.html">Todas las piezas</a>')
    nav.append('</nav>')

    cuerpo = f"""<main class="o-env">
<header>
{chr(10).join(cab)}
</header>
{chr(10).join(bloques)}
{''.join(nav)}
<p class="o-pie">Pieza {e(cod)} · Open House 2026 · Albert Einstein School</p>
</main>"""
    tit = f'{p["nombre"]} · {titulo}' if titulo else f'{p["nombre"]} · {p["grado"]} grado'
    return documento(tit, cuerpo, prof=3)


# ─────────────────── portada ───────────────────
def portada(piezas, salas, entrada):
    datos = [[p['codigo'], p['nombre'], p['grado'], p.get('titulo') or '']
             for p in piezas]
    pasos = ''.join(f'<li>{md(x)}</li>' for x in entrada['pasos'])
    texto = ''.join(f'<p>{md(x)}</p>' for x in entrada['texto'])
    lista_salas = ''.join(
        f'<a class="o-boton" href="sala/{num_grado(s["grado"])}/index.html">{e(s["grado"])} grado</a>'
        for s in salas)
    cuerpo = f"""<main class="o-env">
<header>
<p class="o-sello">Museo de problemas · Open House 2026</p>
<h1>{e(entrada['titulo'])}</h1>
</header>
<form class="o-buscar" role="search" onsubmit="return false">
  <label for="q">Buscar una pieza</label>
  <input id="q" type="search" autocomplete="off" autocapitalize="off" spellcheck="false"
         placeholder="Nombre o código, por ejemplo 3-07" enterkeyhint="go">
  <p class="o-ayuda">El código está escrito debajo del QR de cada hoja.</p>
</form>
<ul class="o-lista" id="resultados" aria-live="polite"></ul>
<section>
{texto}
<ol class="o-pasos">{pasos}</ol>
<p><em>{md(entrada['pie'])}</em></p>
</section>
<section>
<h2>Las salas</h2>
<div class="o-salas">{lista_salas}</div>
</section>
<p class="o-pie">Albert Einstein School · sábado 24 de octubre de 2026</p>
</main>
<script>
(function () {{
  var P = {json.dumps(datos, ensure_ascii=False)};
  var q = document.getElementById('q'), out = document.getElementById('resultados');
  function norm(s) {{ return s.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, ''); }}
  function comoCodigo(s) {{
    // «3-07», «3 7», «307»; también los códigos viejos con sección, «3a-07»
    var m = norm(s).replace(/\\s+/g, '-').match(/^([2-9])a?-?(\\d{{1,2}})$/);
    return m ? m[1] + '-' + (m[2].length < 2 ? '0' : '') + m[2] : null;
  }}
  function buscar() {{
    var t = q.value.trim(), cod = comoCodigo(t), palabras = norm(t).split(/\\s+/).filter(Boolean);
    out.textContent = '';
    if (!t) return [];
    var hall = P.filter(function (p) {{
      if (cod) return p[0] === cod;
      var h = norm(p.join(' ') + ' ' + p[2].replace('.º', ''));
      // acá solo está la inicial del apellido: «gomez» coincide con «G.»
      var iniciales = norm(p[1]).split(/\\s+/).filter(function (x) {{ return /^.\\.$/.test(x); }})
        .map(function (x) {{ return x.charAt(0); }});
      return palabras.every(function (w, i) {{
        return h.indexOf(w) >= 0 || (i > 0 && w.length > 1 && iniciales.indexOf(w.charAt(0)) >= 0);
      }});
    }});
    hall.slice(0, 40).forEach(function (p) {{
      var li = document.createElement('li'), a = document.createElement('a');
      a.href = 'p/' + p[0] + '/index.html';
      var c = document.createElement('span'); c.className = 'cod'; c.textContent = p[0];
      var n = document.createElement('span'); n.textContent = p[1] + ' · ' + p[2] + ' grado';
      a.appendChild(c); a.appendChild(n);
      if (p[3]) {{ var s = document.createElement('span'); s.className = 'tit'; s.textContent = p[3]; n.appendChild(document.createElement('br')); n.appendChild(s); }}
      li.appendChild(a); out.appendChild(li);
    }});
    if (!hall.length) {{
      var li = document.createElement('li'); li.className = 'o-ayuda';
      li.textContent = 'No encontramos esa pieza. Probá con el nombre, o mirá la sala del grado.';
      out.appendChild(li);
    }}
    return hall;
  }}
  q.addEventListener('input', buscar);
  q.addEventListener('keydown', function (ev) {{
    if (ev.key !== 'Enter') return;
    var h = buscar();
    if (h.length === 1) location.href = 'p/' + h[0][0] + '/index.html';
  }});
}})();
</script>"""
    return documento(entrada['titulo'] + ' · Open House 2026', cuerpo, prof=1)


# ─────────────────── sala ───────────────────
def secciones_sala(s):
    """Las secciones de una sala, en orden. `encontramos` None no sale."""
    out = [(f'Qué sabe hacer un chico de {s["grado"]}', s['sabe_hacer']),
           ('Qué les pedimos', s['les_pedimos'])]
    if s.get('encontramos'):
        out.append(('Lo que encontramos al leerlos', s['encontramos']))
    out.append(('Mirá esto', s['mira_esto']))
    return out


def pagina_sala(s, piezas):
    secc = ''.join(f'<section class="s-seccion"><h2>{e(t)}</h2><p>{md(x)}</p></section>'
                   for t, x in secciones_sala(s))
    items = ''.join(
        f'<li><a href="../../p/{p["codigo"]}/index.html"><span class="cod">{p["codigo"]}</span>'
        f'<span>{e(p["nombre"])}'
        + (f'<br><span class="tit">{e(p["titulo"])}</span>' if p.get('titulo') else '')
        + '</span></a></li>' for p in piezas)
    cuerpo = f"""<main class="o-env">
<header>
<p class="o-sello">{e(s['grado'])} grado · Museo de problemas</p>
<h1>{e(s['titulo'])}</h1>
</header>
{secc}
<h2>Las piezas de esta sala</h2>
<ul class="o-lista">{items}</ul>
<nav class="o-nav"><a class="ancho" href="../../index.html">Todas las salas y el buscador</a></nav>
<p class="o-pie">Open House 2026 · Albert Einstein School</p>
</main>"""
    return documento(f'{s["grado"]} grado · {s["titulo"]}', cuerpo, prof=3)


# ─────────────────── paneles A3 ───────────────────
PANEL_CSS = """
<style>
/* Paneles de sala · A3 vertical. Se leen a un metro, parado: el cuerpo
   nunca baja de 24 pt. Texto oscuro sobre blanco: el panel no es la obra. */
@page{size:A3 portrait; margin:18mm}
:root{color-scheme:light}
body{background:#fff; background-image:none; color:#111; margin:0;
  font-family:'Alegreya', Georgia, 'Times New Roman', serif}
.instrucciones{font-family:system-ui, sans-serif; font-size:16px; background:#f3f3f3;
  border-bottom:1px solid #ccc; padding:12px 16px; line-height:1.5}
.instrucciones b{font-weight:700}
.panel{box-sizing:border-box; width:261mm; height:384mm; position:relative; overflow:hidden;
  font-size:24pt; line-height:1.35; break-after:page; page-break-after:always}
.panel:last-child{break-after:auto; page-break-after:auto}
.panel .grado{font-size:28pt; font-weight:700; margin:0; letter-spacing:.02em}
.panel h1{font-size:66pt; line-height:1.05; font-weight:800; margin:4mm 0 12mm; max-width:240mm}
.panel h2{font-size:28pt; font-weight:700; margin:9mm 0 1.5mm}
.panel p{margin:0; max-width:20.8em}
.panel .entrada-texto p{margin-bottom:5mm}
.panel .pasos{list-style:none; padding:0; margin:10mm 0 0}
.panel .pasos li{font-size:32pt; line-height:1.3; margin:0 0 5mm; max-width:17em}
.panel .pie-entrada{margin-top:8mm; font-style:italic}
.panel .qr{position:absolute; right:0; bottom:0; display:flex; align-items:flex-end; gap:6mm}
.panel .qr img{width:35mm; height:35mm; display:block}
.panel .qr span{font-size:24pt; line-height:1.2; text-align:right}
@media screen{
  body{background:#ddd}
  .panel{background:#fff; margin:12mm auto; padding:18mm; width:297mm; height:420mm;
    box-shadow:0 2px 10px rgba(0,0,0,.25)}
  .panel .qr{right:18mm; bottom:18mm}
  @media (max-width:1200px){ .panel{zoom:.5} }
  @media (max-width:640px){ .panel{zoom:.3} }
}
@media print{ .instrucciones{display:none} }
</style>"""


def paneles(salas, entrada):
    hojas = []
    entrada_txt = ''.join(f'<p>{md(x)}</p>' for x in entrada['texto'])
    pasos = ''.join(f'<li>{md(x)}</li>' for x in entrada['pasos'])
    sello = ('' if entrada['titulo'] == 'Museo de problemas · AES 2026'
             else '<p class="grado">Museo de problemas · AES 2026</p>')
    hojas.append(f"""<article class="panel" id="panel-entrada">
{sello}
<h1>{e(entrada['titulo'])}</h1>
<div class="entrada-texto">{entrada_txt}</div>
<ol class="pasos">{pasos}</ol>
<p class="pie-entrada">{md(entrada['pie'])}</p>
<div class="qr"><span>Todas las piezas<br>en tu celular</span><img src="../qr/svg/entrada.svg" alt="QR de la portada"></div>
</article>""")
    for s in salas:
        n = num_grado(s['grado'])
        secc = ''.join(f'<h2>{e(t)}</h2><p>{md(x)}</p>' for t, x in secciones_sala(s))
        hojas.append(f"""<article class="panel" id="panel-{n}">
<p class="grado">{e(s['grado'])} grado</p>
<h1>{e(s['titulo'])}</h1>
{secc}
<div class="qr"><span>Esta sala<br>en tu celular</span><img src="../qr/svg/sala-{n}.svg" alt="QR de la sala de {e(s['grado'])} grado"></div>
</article>""")
    faltan = [s['grado'] for s in salas if not s.get('encontramos')]
    aviso = ('' if not faltan else
             f'<br><b>Todavía no:</b> a {len(faltan)} sala(s) les falta el párrafo de «Lo que '
             f'encontramos al leerlos» ({", ".join(faltan)}). El panel sale bien sin él, pero '
             'conviene imprimirlos cuando esté escrito.')
    cuerpo = f"""<div class="instrucciones">
<b>Paneles de sala · {len(hojas)} hojas A3.</b> Imprimir desde Chrome o Edge: Ctrl+P →
Tamaño del papel <b>A3</b>, vertical, Márgenes <b>predeterminados</b>, Escala <b>100 %</b>, sin
encabezados ni pies de página. Cada panel sale en su hoja.{aviso}
</div>
{chr(10).join(hojas)}"""
    return documento('Paneles de sala · Open House 2026', cuerpo, prof=2,
                     extra_head='\n' + FUENTES + PANEL_CSS, css=False)


# ─────────────────── hoja de QR A4 ───────────────────
QR_CSS = """
<style>
/* Etiquetas QR · A4, 20 por hoja (4 × 5), el QR a 40 mm. Las líneas punteadas
   son para cortar. */
@page{size:A4 portrait; margin:10mm}
:root{color-scheme:light}
body{background:#fff; background-image:none; color:#000; margin:0; font-family:system-ui, 'Segoe UI', sans-serif}
.instrucciones{font-size:16px; background:#f3f3f3; border-bottom:1px solid #ccc; padding:12px 16px; line-height:1.5}
.instrucciones label{font-weight:700}
.instrucciones input{font-size:16px; padding:6px 8px; width:min(100%, 28em)}
.hoja{width:190mm; height:275mm; display:grid; grid-template-columns:repeat(4, 47.5mm);
  grid-template-rows:repeat(5, 55mm); align-content:start;
  break-after:page; page-break-after:always}
.hoja:last-child{break-after:auto; page-break-after:auto}
.et{box-sizing:border-box; outline:.3mm dashed #888; outline-offset:-.15mm;
  display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;
  overflow:hidden; padding:.5mm}
.et img{width:40mm; height:40mm; display:block}
/* el nombre, lo más grande posible: los cortos en un renglón; los largos, en dos
   renglones parejos antes que en letra chica */
.et .quien{font-weight:700; line-height:1; margin-top:.7mm; max-width:46mm; white-space:nowrap}
.et .q1{font-size:17pt} .et .q2{font-size:15pt} .et .q3{font-size:13pt}
.et .q4{font-size:13pt; white-space:normal; text-wrap:balance; max-height:2.1em; overflow:hidden}
.et .cod{font-size:8.5pt; line-height:1.1; margin-top:.4mm; color:#333}
.et .cod b{font-family:'IBM Plex Mono', ui-monospace, Consolas, monospace}
@media screen{
  body{background:#ddd}
  .hoja{background:#fff; margin:10mm auto; outline:10mm solid #fff; box-shadow:0 0 0 10mm #fff, 0 2px 14px 10mm rgba(0,0,0,.15)}
  @media (max-width:820px){ .hoja{zoom:.45} }
}
@media print{ .instrucciones{display:none} }
</style>"""


def hoja_qr(piezas):
    def etiqueta(p):
        # El nombre, lo más grande que entre en un renglón de 45 mm.
        n = len(p['nombre'])
        tam = 'q1' if n <= 11 else 'q2' if n <= 14 else 'q3' if n <= 17 else 'q4'
        return (f'<div class="et" data-c="{p["codigo"]}"><img src="svg/{p["codigo"]}.svg" alt="">'
                f'<div class="quien {tam}">{e(p["nombre"])}</div>'
                f'<div class="cod">{e(p["grado"])} grado · <b>{p["codigo"]}</b></div></div>')
    ets = [etiqueta(p) for p in piezas]
    hojas = ''.join('<section class="hoja">' + ''.join(ets[i:i + 20]) + '</section>'
                    for i in range(0, len(ets), 20))
    cuerpo = f"""<div class="instrucciones">
<b>Etiquetas QR · {cuantas(len(piezas))}, {(len(piezas) + 19) // 20} hoja(s) A4.</b> Imprimir desde Chrome o
Edge: Ctrl+P → A4, Márgenes <b>predeterminados</b>, Escala <b>100 %</b> (no «ajustar a la página»), sin
encabezados. El QR tiene que medir 40 mm en el papel: medilo en la primera hoja antes de imprimir el resto.
<br><label for="solo">Imprimir solo algunas</label> (para reponer una que se despegó): códigos o grados separados
por coma, por ejemplo <code>3-07, 5-12</code>, o un grado entero: <code>4</code>. Vacío = todas.<br>
<input id="solo" type="text" autocomplete="off" spellcheck="false">
</div>
<div id="hojas">{hojas}</div>
<script>
(function () {{
  var todas = Array.prototype.slice.call(document.querySelectorAll('.et'));
  var caja = document.getElementById('hojas'), solo = document.getElementById('solo');
  function armar() {{
    var f = solo.value.toLowerCase().split(/[\\s,;]+/).filter(Boolean);
    var sel = todas.filter(function (et) {{
      var c = et.getAttribute('data-c');
      return !f.length || f.some(function (x) {{ return c === x || c === x.replace('a-', '-') || c.indexOf(x + '-') === 0; }});
    }});
    caja.textContent = '';
    for (var i = 0; i < sel.length; i += 20) {{
      var h = document.createElement('section'); h.className = 'hoja';
      sel.slice(i, i + 20).forEach(function (et) {{ h.appendChild(et); }});
      caja.appendChild(h);
    }}
  }}
  solo.addEventListener('input', armar);
}})();
</script>"""
    return documento('Etiquetas QR · Open House 2026', cuerpo, prof=2,
                     extra_head='\n' + QR_CSS, css=False)


# ─────────────────── mapa de la obra ───────────────────
def mapa(piezas, raiz_mod):
    def hay(archivo, carpeta):
        return bool(archivo) and (raiz_mod / carpeta / archivo).is_file()

    def fila_tabla(p):
        ok = lambda b: '✓' if b else '<span class="falta">falta</span>'
        return (f'<tr><td>{p.get("fila") if p.get("fila") is not None else ""}</td>'
                f'<td>{p.get("orden") if p.get("orden") is not None else ""}</td>'
                f'<td><a href="../p/{p["codigo"]}/index.html">{p["codigo"]}</a></td>'
                f'<td>{e(p["nombre"])}</td><td>{e(p.get("titulo") or "")}</td>'
                f'<td>{ok(hay(p.get("audio"), "audio"))}</td>'
                f'<td>{ok(hay(p.get("problema"), "img"))}</td>'
                f'<td>{ok(hay(p.get("solucion"), "img"))}</td></tr>')

    paredes = {}
    for p in piezas:
        paredes.setdefault(p.get('pared') or '', []).append(p)
    cab = ('<thead><tr><th>Fila</th><th>Orden</th><th>Código</th><th>Autor</th><th>Título</th>'
           '<th>Audio</th><th>Problema</th><th>Solución</th></tr></thead>')
    bloques = []
    # las paredes en el orden del recorrido: primero la que tiene el grado más chico
    for pared in sorted(paredes, key=lambda x: (x == '', min(clave(p) for p in paredes[x]))):
        ps = sorted(paredes[pared], key=lambda p: (p.get('fila') or 0, p.get('orden') or 0, clave(p)))
        nombre = f'Pared {e(pared)}' if pared else 'Sin ubicar todavía'
        bloques.append(f'<h2>{nombre} · {cuantas(len(ps))}</h2><div class="o-scroll"><table class="m-tabla">'
                       f'{cab}<tbody>{"".join(fila_tabla(p) for p in ps)}</tbody></table></div>')
    n = len(piezas)
    con = lambda campo, carpeta: sum(hay(p.get(campo), carpeta) for p in piezas)
    resumen = (f'<ul class="m-resumen"><li><b>{n}</b> piezas</li>'
               f'<li><b>{con("audio", "audio")}</b> con audio</li>'
               f'<li><b>{con("problema", "img")}</b> con foto del problema</li>'
               f'<li><b>{con("solucion", "img")}</b> con foto de la solución</li>'
               f'<li><b>{sum(1 for p in piezas if not p.get("pared"))}</b> sin ubicar</li></ul>')
    cuerpo = f"""<main class="o-env ancha">
<p class="o-sello">Open House 2026 · para armar la obra</p>
<h1>Mapa de la obra</h1>
<p>Las piezas por pared, fila y orden. Para reponer una hoja que se despegó, la hoja de etiquetas
deja imprimir solo esa: <a href="../qr/index.html">etiquetas QR</a>.</p>
{resumen}
{''.join(bloques)}
</main>"""
    return documento('Mapa de la obra · Open House 2026', cuerpo, prof=2)


# ─────────────────── códigos viejos ───────────────────
def redireccion(viejo, nuevo):
    """La página de un código que ya no existe: lleva a la pieza nueva, sin 404."""
    destino = f'../{nuevo}/index.html'
    cuerpo = f"""<main class="o-env">
<p>Esta pieza ahora está en <a href="{destino}">{e(nuevo)}</a>.</p>
</main>"""
    return documento(f'Pieza {nuevo}', cuerpo, prof=3,
                     extra_head=f'\n<meta http-equiv="refresh" content="0; url={destino}">')


# ─────────────────── QR y manifiesto ───────────────────
def qr_svg(url, destino):
    """Hace el SVG del QR si no existe. Devuelve True si lo escribió."""
    if destino.exists():
        return False
    import segno  # solo hace falta para los QR nuevos
    qr = segno.make_qr(url, error='q', boost_error=False)
    destino.parent.mkdir(parents=True, exist_ok=True)
    qr.save(str(destino), kind='svg', border=4, scale=1, xmldecl=False, omitsize=True,
            dark='#000', light='#fff')
    return True


def objetivos_qr(piezas, salas):
    """Todo lo que lleva QR: (clave, url, archivo svg, página que tiene que existir)."""
    out = [('entrada', URL_BASE, 'svg/entrada.svg', 'index.html')]
    for s in salas:
        n = num_grado(s['grado'])
        out.append((f'sala-{n}', url_sala(s['grado']), f'svg/sala-{n}.svg', f'sala/{n}/index.html'))
    for p in piezas:
        out.append((p['codigo'], url_pieza(p['codigo']), f'svg/{p["codigo"]}.svg',
                    f'p/{p["codigo"]}/index.html'))
    return out


# ─────────────────── escritura ───────────────────
def escribir(raiz, piezas=None, salas=None, entrada=None):
    """Escribe el módulo debajo de `raiz` (la raíz del sitio). Devuelve las rutas escritas."""
    if piezas is None:
        from open2026.piezas import PIEZAS as piezas
        from open2026.piezas import ANTES as antes
    else:
        antes = {}
    if salas is None or entrada is None:
        from open2026.salas import SALAS as salas, ENTRADA as entrada
    raiz = pathlib.Path(raiz)
    mod = raiz / CARPETA
    # Una pieza con el código o el grado mal escritos no se genera: la nombra
    # build.py y el verificador dice qué tiene.
    invalidas = [str(p.get('codigo')) for p in piezas
                 if not CODIGO.match(str(p.get('codigo'))) or not re.match(r'^[2-9]\.º$', str(p.get('grado')))]
    piezas = sorted((p for p in piezas if str(p.get('codigo')) not in invalidas), key=clave)
    hechas = []

    def escribe(rel, texto):
        d = mod / rel
        d.parent.mkdir(parents=True, exist_ok=True)
        d.write_text(texto, encoding='utf-8')
        hechas.append(f'{CARPETA}/{rel}')

    escribe('estilo.css', ESTILO)
    escribe('index.html', portada(piezas, salas, entrada))
    for i, p in enumerate(piezas):
        ant = piezas[i - 1] if i > 0 else None
        sig = piezas[i + 1] if i + 1 < len(piezas) else None
        escribe(f'p/{p["codigo"]}/index.html', pagina_pieza(p, ant, sig, mod))
    for s in salas:
        n = num_grado(s['grado'])
        escribe(f'sala/{n}/index.html',
                pagina_sala(s, [p for p in piezas if num_grado(p['grado']) == n]))
    actuales = {p['codigo'] for p in piezas}
    for viejo, nuevo in sorted(antes.items()):
        if nuevo in actuales and viejo not in actuales:
            escribe(f'p/{viejo}/index.html', redireccion(viejo, nuevo))
    escribe('paneles/index.html', paneles(salas, entrada))
    escribe('qr/index.html', hoja_qr(piezas))
    escribe('mapa/index.html', mapa(piezas, mod))

    nuevos, sin_segno = 0, []
    manifiesto = {'base': URL_BASE, 'piezas': {}, 'salas': {}, 'entrada': None}
    for k, url, archivo, pagina in objetivos_qr(piezas, salas):
        try:
            nuevos += qr_svg(url, mod / 'qr' / archivo)
        except ImportError:
            sin_segno.append(k)
        fila = {'url': url, 'archivo': f'qr/{archivo}', 'pagina': pagina}
        if k == 'entrada':
            manifiesto['entrada'] = fila
        elif k.startswith('sala-'):
            manifiesto['salas'][k[5:]] = fila
        else:
            manifiesto['piezas'][k] = fila
    escribe('qr/manifest.json', json.dumps(manifiesto, ensure_ascii=False, indent=1) + '\n')

    huerfanas = sorted(d.name for d in (mod / 'p').glob('*')
                       if d.is_dir() and d.name not in actuales and d.name not in antes) \
        if (mod / 'p').is_dir() else []
    return hechas, {'qr_nuevos': nuevos, 'sin_segno': sin_segno, 'huerfanas': huerfanas,
                    'invalidas': invalidas}
