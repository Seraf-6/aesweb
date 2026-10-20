"""Leer y escribir open2026/piezas.py desde las herramientas.

El archivo se reescribe entero, con las piezas ordenadas por código y un
formato fijo, y conserva el comentario de arriba tal como esté.
"""
import importlib.util
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
ARCHIVO = RAIZ / 'open2026' / 'piezas.py'
MODULO = RAIZ / 'open-2026'
CODIGO = re.compile(r'^([2-9])-(\d{2})$')


def lee():
    spec = importlib.util.spec_from_file_location('piezas_actuales', ARCHIVO)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return [dict(p) for p in m.PIEZAS]


def clave(p):
    g, n = CODIGO.match(p['codigo']).groups()
    return (int(g), int(n))


def _entrada(p):
    r = lambda k: repr(p.get(k))
    return ("  {"
            f"'codigo': {r('codigo')}, 'grado': {r('grado')}, 'nombre': {r('nombre')},\n"
            f"   'titulo': {r('titulo')}, 'dificultad': {r('dificultad')},\n"
            f"   'audio': {r('audio')}, 'problema': {r('problema')}, 'solucion': {r('solucion')}, "
            f"'respuesta': {r('respuesta')},\n"
            f"   'pared': {r('pared')}, 'fila': {r('fila')}, 'orden': {r('orden')}}},\n")


def escribe(piezas):
    texto = ARCHIVO.read_text(encoding='utf-8')
    i = texto.index('PIEZAS = [')
    j = texto.index('\n]\n', i) + 3          # lo que viene después de la lista (ANTES) se conserva
    cuerpo = ''.join(_entrada(p) for p in sorted(piezas, key=clave))
    ARCHIVO.write_text(texto[:i] + 'PIEZAS = [\n' + cuerpo + ']\n' + texto[j:], encoding='utf-8')


def pone(codigo, campo, valor):
    """Cambia un campo de una pieza. Devuelve el valor anterior."""
    piezas = lee()
    for p in piezas:
        if p['codigo'] == codigo:
            antes = p.get(campo)
            p[campo] = valor
            escribe(piezas)
            return antes
    raise KeyError(codigo)


def existe(codigo):
    return any(p['codigo'] == codigo for p in lee())


def utf8():
    for flujo in (sys.stdout, sys.stderr):
        try:
            flujo.reconfigure(encoding='utf-8')
        except Exception:
            pass
