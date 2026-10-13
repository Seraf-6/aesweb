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
  {'codigo': '4a-01', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Paula D.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-01.m4a', 'problema': '4a-01-problema.jpg', 'solucion': '4a-01-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-02', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Emma G.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-02.m4a', 'problema': None, 'solucion': None, 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-03', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Carla G.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-03.m4a', 'problema': '4a-03-problema.jpg', 'solucion': '4a-03-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-04', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Jimena G.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-04.m4a', 'problema': '4a-04-problema.jpg', 'solucion': '4a-04-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-05', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Guillermo I.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-05.m4a', 'problema': None, 'solucion': None, 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-06', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Benjamín L.',
   'titulo': None, 'dificultad': None,
   'audio': None, 'problema': None, 'solucion': None, 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-07', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Francesca M.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-07.m4a', 'problema': '4a-07-problema.jpg', 'solucion': '4a-07-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-08', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Enzo M.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-08.m4a', 'problema': None, 'solucion': None, 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-09', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Pedro Ignacio M.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-09.m4a', 'problema': '4a-09-problema.jpg', 'solucion': '4a-09-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-10', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Constantino O.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-10.m4a', 'problema': '4a-10-problema.jpg', 'solucion': '4a-10-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-11', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Marcelo S.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-11.m4a', 'problema': '4a-11-problema.jpg', 'solucion': '4a-11-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-12', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Jeremías S.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-12.m4a', 'problema': '4a-12-problema.jpg', 'solucion': '4a-12-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-13', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Guillermina S.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-13.m4a', 'problema': '4a-13-problema.jpg', 'solucion': '4a-13-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-14', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Valeria Monserrat T.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-14.m4a', 'problema': '4a-14-problema.jpg', 'solucion': '4a-14-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-15', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Luisa Giuliana T.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-15.m4a', 'problema': '4a-15-problema.jpg', 'solucion': '4a-15-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
  {'codigo': '4a-16', 'grado': '4.º', 'seccion': 'A', 'nombre': 'Mauro Sebastián V.',
   'titulo': None, 'dificultad': None,
   'audio': '4a-16.m4a', 'problema': '4a-16-problema.jpg', 'solucion': '4a-16-solucion.jpg', 'respuesta': None,
   'pared': None, 'fila': None, 'orden': None},
]
