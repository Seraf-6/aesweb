"""Carga la lista de alumnos en open2026/piezas.py.

    python herramientas/cargar_piezas.py <planilla.csv | planilla.xlsx>

La planilla es la del docente y NO va al repositorio (si está adentro, la
herramienta se niega). Una fila por alumno; los encabezados pueden estar en
cualquier orden, con o sin tildes:

    grado | nombre | apellido | codigo | titulo | dificultad | pared | fila | orden

  · grado: 2 a 9 (sirve «3», «3.º», «3ro»). El colegio no tiene secciones.
  · nombre y apellido en dos columnas, o una sola columna «alumno» con la
    forma de las listas del colegio: «Apellido Apellido, Nombre Nombre».
  · codigo, titulo, dificultad, pared, fila y orden son opcionales.

A piezas.py llega solo el primer nombre y la inicial del primer apellido
(«Ana G.»). Nada más de la planilla entra al repositorio.

Los códigos se asignan una sola vez. A quien no tiene código se le da el
siguiente número libre de su grado, y la planilla se devuelve como
<planilla>_con_codigos.csv, al lado de la original, con la columna codigo
llena: esa es la que hay que guardar, porque los QR se imprimen con esos
códigos. Volver a cargar una planilla que ya tiene códigos no cambia
ninguno, y no se pierden los audios ni las fotos ya anotados.
"""
import argparse
import csv
import pathlib
import re
import sys
import unicodedata

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import _piezas  # noqa: E402


def sin_tildes(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')


def clave_col(s):
    return re.sub(r'[^a-z]', '', sin_tildes(str(s or '')).lower())


def lee_planilla(ruta):
    if ruta.suffix.lower() in ('.xlsx', '.xlsm'):
        try:
            import openpyxl
        except ImportError:
            sys.exit('Para leer .xlsx hace falta openpyxl (pip install openpyxl), o guardala como CSV.')
        hoja = openpyxl.load_workbook(ruta, read_only=True, data_only=True).active
        filas = [['' if c is None else str(c).strip() for c in f] for f in hoja.iter_rows(values_only=True)]
    else:
        texto = ruta.read_text(encoding='utf-8-sig')
        delim = ';' if texto.split('\n', 1)[0].count(';') > texto.split('\n', 1)[0].count(',') else ','
        filas = [[c.strip() for c in f] for f in csv.reader(texto.splitlines(), delimiter=delim)]
    filas = [f for f in filas if any(f)]
    if not filas:
        sys.exit('La planilla está vacía.')
    return filas[0], filas[1:]


def capital(palabra):
    return palabra[:1].upper() + palabra[1:].lower()


def nombre_corto(fila):
    """'Ana G.': el primer nombre y la inicial del primer apellido."""
    if fila.get('alumno'):
        if ',' not in fila['alumno']:
            raise ValueError(f'«alumno» tiene que ser «Apellido, Nombre»: {fila["alumno"]!r}')
        ape, nom = fila['alumno'].split(',', 1)
    else:
        nom, ape = fila.get('nombre', ''), fila.get('apellido', '')
    nom, ape = nom.split(), ape.split()
    if not nom or not ape:
        raise ValueError('falta el nombre o el apellido')
    return f'{capital(nom[0])} {ape[0][0].upper()}.'


def entero(v):
    v = str(v or '').strip()
    return int(float(v)) if re.fullmatch(r'\d+(\.0+)?', v) else None


def main():
    _piezas.utf8()
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('planilla')
    ap.add_argument('--agregar', action='store_true',
                    help='permitir alumnos sin código en grados que ya tienen piezas cargadas')
    a = ap.parse_args()
    ruta = pathlib.Path(a.planilla).resolve()
    if not ruta.is_file():
        sys.exit(f'No existe {ruta}')
    if _piezas.RAIZ in ruta.parents:
        sys.exit('La planilla está adentro del repositorio: los nombres completos no van ahí. '
                 'Movela fuera de la carpeta aesweb y volvé a correr.')

    encabezado, filas = lee_planilla(ruta)
    cols = [clave_col(c) for c in encabezado]
    alias = {'grado': 'grado', 'nombre': 'nombre', 'nombres': 'nombre',
             'apellido': 'apellido', 'apellidos': 'apellido', 'alumno': 'alumno', 'alumnoa': 'alumno',
             'codigo': 'codigo', 'titulo': 'titulo', 'dificultad': 'dificultad', 'estrellas': 'dificultad',
             'pared': 'pared', 'fila': 'fila', 'orden': 'orden'}
    campos = [alias.get(c) for c in cols]
    for falta in ('grado',):
        if falta not in campos:
            sys.exit(f'Falta la columna «{falta}». Encabezados leídos: {encabezado}')
    if 'alumno' not in campos and not {'nombre', 'apellido'} <= set(campos):
        sys.exit('Faltan las columnas «nombre» y «apellido» (o una sola «alumno»).')

    actuales = {p['codigo']: p for p in _piezas.lee()}
    usados = {}
    for c in actuales:
        g, n = _piezas.CODIGO.match(c).groups()
        usados.setdefault(g, set()).add(int(n))
    leidas, errores = [], []
    for i, f in enumerate(filas, start=2):
        fila = {k: (f[j] if j < len(f) else '') for j, k in enumerate(campos) if k}
        try:
            g = re.search(r'[2-9]', fila.get('grado', ''))
            if not g:
                raise ValueError(f'el grado {fila.get("grado")!r} no se entiende')
            cod = fila.get('codigo', '').strip().lower()
            if cod and not _piezas.CODIGO.match(cod):
                raise ValueError(f'el código {cod!r} no tiene la forma 3-07')
            if cod and cod[0] != g.group(0):
                raise ValueError(f'el código {cod} no es de {g.group(0)}.º')
            leidas.append((i, f, fila, g.group(0), cod, nombre_corto(fila)))
            if cod:
                usados.setdefault(cod[0], set()).add(int(cod[2:]))
        except ValueError as ex:
            errores.append(f'fila {i}: {ex}')
    if errores:
        sys.exit('No cargué nada. Hay que arreglar la planilla:\n  ' + '\n  '.join(errores))

    repetidos = {}
    for _, _, _, _, cod, _ in leidas:
        if cod:
            repetidos[cod] = repetidos.get(cod, 0) + 1
    repetidos = [c for c, k in repetidos.items() if k > 1]
    if repetidos:
        sys.exit('No cargué nada: códigos repetidos en la planilla: ' + ', '.join(repetidos))
    grados_cargados = {c[0] for c in actuales}
    sin_codigo = {g for _, _, _, g, cod, _ in leidas if not cod}
    choque = sorted(sin_codigo & grados_cargados)
    if choque and not a.agregar:
        sys.exit('No cargué nada. Hay alumnos sin código en grados que ya tienen piezas: '
                 + ', '.join(choque) + '.\nSi la planilla es la vieja, usá la _con_codigos.csv. '
                 'Si de verdad son alumnos nuevos, volvé a correr con --agregar.')

    nuevos, salida = 0, []
    piezas = dict(actuales)
    for i, f, fila, g, cod, corto in leidas:
        if not cod:
            n = max(usados.get(g, {0})) + 1
            if n > 99:
                sys.exit(f'{g}.º pasa de 99 alumnos.')
            usados.setdefault(g, set()).add(n)
            cod = f'{g}-{n:02d}'
            nuevos += 1
        p = piezas.get(cod) or {'codigo': cod, 'titulo': None, 'dificultad': None, 'audio': None,
                                'problema': None, 'solucion': None, 'respuesta': None,
                                'pared': None, 'fila': None, 'orden': None}
        p.update({'grado': f'{g}.º', 'nombre': corto})
        if fila.get('titulo'):
            p['titulo'] = fila['titulo']
        if entero(fila.get('dificultad')):
            p['dificultad'] = entero(fila['dificultad'])
        if fila.get('pared'):
            p['pared'] = fila['pared'].strip().lower()
        for k in ('fila', 'orden'):
            if entero(fila.get(k)) is not None:
                p[k] = entero(fila[k])
        piezas[cod] = p
        salida.append((f, cod))

    _piezas.escribe(list(piezas.values()))

    # la planilla con los códigos, al lado de la original (fuera del repositorio)
    con = ruta.with_name(ruta.stem + '_con_codigos.csv')
    j = campos.index('codigo') if 'codigo' in campos else None
    with con.open('w', encoding='utf-8-sig', newline='') as fh:
        w = csv.writer(fh, delimiter=';')
        w.writerow(encabezado if j is not None else encabezado + ['codigo'])
        for f, cod in salida:
            f = list(f) + [''] * (len(encabezado) - len(f))
            if j is not None:
                f[j] = cod
            else:
                f.append(cod)
            w.writerow(f)

    sobran = sorted(set(actuales) - {cod for _, cod in salida})
    por_sec = {}
    for _, cod in salida:
        por_sec[cod[0]] = por_sec.get(cod[0], 0) + 1
    print(f'Cargué {len(salida)} alumnos ({nuevos} códigos nuevos) en open2026/piezas.py.')
    print('  Por grado: ' + ', '.join(f'{k}.º {v}' for k, v in sorted(por_sec.items())))
    print(f'  La planilla con los códigos: {con}')
    print('  Guardá esa: los QR se imprimen con esos códigos y no cambian nunca.')
    dobles = {}
    for p in piezas.values():
        dobles.setdefault((p['codigo'][0], p['nombre']), []).append(p['codigo'])
    for (sec, nom), cods in sorted(dobles.items()):
        if len(cods) > 1:
            print(f'  Aviso: en {sec}.º hay {len(cods)} «{nom}» ({", ".join(cods)}). '
                  'En la etiqueta los distingue el código.')
    if sobran:
        print(f'  Aviso: {len(sobran)} piezas de piezas.py no están en esta planilla y se dejaron '
              f'como estaban: {", ".join(sobran[:12])}')
    print('Falta correr build.py.')


if __name__ == '__main__':
    main()
