"""Open House 2026 · las piezas de la obra.

Una entrada por alumno: su hoja A4 en la pared. Es la única fuente de verdad
del módulo: `build.py` lee esto y genera todas las páginas de open-2026/.

    {
      'codigo': '3a-07',              # <grado><sección>-<nn>: NO CAMBIA NUNCA
      'grado': '3.º', 'seccion': 'A',
      'nombre': 'Ana G.',             # nombre y la inicial del apellido, nunca más
      'titulo': 'El problema de los caramelos',   # o None si todavía no está
      'dificultad': 3,                # las estrellitas que puso el autor, 1 a 5, o None
      'audio': '3a-07.m4a',           # en open-2026/audio/, o None si todavía no grabó
      'problema': '3a-07-problema.jpg',   # en open-2026/img/, o None
      'solucion': '3a-07-solucion.jpg',   # en open-2026/img/, o None
      'respuesta': None,              # reservado: el audio de respuesta de la familia
      'pared': 'norte', 'fila': 1, 'orden': 7,    # dónde va en el pasillo, o None
    },

El código está impreso en el QR pegado en la pared: la dirección de la pieza
depende solo de él. Si cambia el audio, el título o la foto, el código queda.
El nombre y apellido completos no entran al repositorio: viven en la planilla
del docente.

Cómo se llena:
  · la lista de alumnos:  python herramientas/cargar_piezas.py <planilla.csv|xlsx>
  · un audio:             python herramientas/preparar_audio.py <archivo> 3a-07
  · una foto:             python herramientas/preparar_imagen.py <archivo> 3a-07 problema
Las tres herramientas escriben en este archivo; también se puede tocar a mano.
"""

PIEZAS = [
]
