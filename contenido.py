"""AESWeb · el contenido del sitio.

Este archivo es la única fuente de verdad del índice: los grados, sus
unidades y qué material tiene cada una. `build.py` lo lee y arma las
páginas. Para agregar algo nuevo se toca acá, no el HTML.

Cada material es un dict:
    tipo     'diapositiva' | 'ficha' | 'pendiente'
    titulo   cómo se ve en la tarjeta
    desc     una línea de qué es
    url      ruta relativa a la raíz del sitio (sin url -> queda como pendiente)
"""

SITIO = {
    'nombre': 'AESWeb',
    'subtitulo': 'Material de clase · Albert Einstein School',
    'docentes': 'Eduardo Ovelar / Juan Serafini',
    'anio': '2026',
}

# ══════════════════════════════════════════════════════════════════
#  Matemática · Tercer Ciclo
# ══════════════════════════════════════════════════════════════════
GRADOS = [
 {'id': '7mo', 'nombre': '7.º grado', 'libro': 'Matemática 7 · En Alianza',
  'unidades': [
    {'n': 7, 'titulo': 'Ecuaciones lineales', 'pags': '132–150',
     'nota': 'Se dicta con enseñanza entre pares.',
     'material': [
       {'tipo': 'diapositiva', 'titulo': 'Ecuaciones lineales',
        'desc': 'Los siete temas del libro, cada uno con su concepto y varios ejemplos '
                'resueltos paso a paso. Botones de notas del docente y de preguntas de un '
                'alumno observador. Con la balanza, la tabla de valores y Diofanto.',
        'url': 'matematica/7mo/ecuaciones.html'},
       {'tipo': 'ficha', 'titulo': 'Fichas de la unidad',
        'desc': 'Igualdades, expresión algebraica, ecuaciones lineales y con fracciones, '
                'simbolizaciones y resolución de problemas.',
        'url': 'fichas/index.html#7mo'},
     ]},
    {'n': '8+9', 'titulo': 'Polígonos', 'pags': '152–192',
     'nota': 'Unidades 8 y 9 fusionadas en una sola, con sus quince temas.',
     'material': [
       {'tipo': 'diapositiva', 'titulo': 'Polígonos',
        'desc': 'Los quince temas del libro, con Pitágoras una sola vez y aplicado '
                'después a triángulos y a cuadriláteros. Cada ejemplo arma su figura.',
        'url': 'matematica/7mo/poligonos.html'},
       {'tipo': 'ficha', 'titulo': 'Polígonos y clasificación',
        'desc': 'Ficha 10.', 'url': 'fichas/index.html#7mo'},
       {'tipo': 'ficha', 'titulo': 'Triángulos y sus ángulos',
        'desc': 'Ficha 11.', 'url': 'fichas/index.html#7mo'},
     ]},
    {'n': 10, 'titulo': 'Estadística', 'pags': '194–212',
     'nota': 'Proyecto de Google Forms, compartido con 8.º y 9.º.',
     'material': [
       {'tipo': 'pendiente', 'titulo': 'Guía del proyecto',
        'desc': 'Forms → Sheets → QR, cronograma y rúbrica de la exposición.'},
     ]},
  ]},

 {'id': '8vo', 'nombre': '8.º grado', 'libro': 'Matemática 8 · En Alianza',
  'unidades': [
    {'n': '5+6', 'titulo': 'Factorización de expresiones algebraicas', 'pags': '94–134',
     'material': [
       {'tipo': 'diapositiva', 'titulo': 'Factorización',
        'desc': 'Los catorce temas de las unidades 5 y 6, cada caso con ejemplos paso a paso '
                'y su control, y los trucos de cálculo en las preguntas del observador.',
        'url': 'matematica/8vo/factoreo.html'},
       {'tipo': 'ficha', 'titulo': 'Fichas de factoreo',
        'desc': 'Cinco fichas, de un caso por vez hasta la miscelánea.',
        'url': 'fichas/index.html#8vo'},
     ]},
    {'n': 7, 'titulo': 'Operaciones con expresiones algebraicas racionales', 'pags': '136–154',
     'material': [
       {'tipo': 'ficha', 'titulo': 'Expresiones racionales',
        'desc': '94 ejercicios en ocho bloques de dificultad creciente, del dominio '
                'a las operaciones combinadas.',
        'url': 'fichas/index.html#8vo'},
     ]},
    {'n': 9, 'titulo': 'Sistemas de dos ecuaciones de primer grado', 'pags': '178–196',
     'nota': 'Se adelanta: va antes que la circunferencia.',
     'material': [
       {'tipo': 'diapositiva', 'titulo': 'Sistemas de ecuaciones',
        'desc': 'Los siete temas de la unidad: los tres casos, el método gráfico, los tres métodos algebraicos y problemas.',
        'url': 'matematica/8vo/sistemas.html'},
       {'tipo': 'pendiente', 'titulo': 'Ficha de sistemas',
        'desc': 'Los cuatro métodos, con problemas de planteo.'},
     ]},
    {'n': 10, 'titulo': 'Estadística', 'pags': '198–218',
     'nota': 'Proyecto de Google Forms. El libro trae el laboratorio en la pág. 213.',
     'material': [
       {'tipo': 'pendiente', 'titulo': 'Guía del proyecto',
        'desc': 'Compartida con 7.º y 9.º.'},
     ]},
    {'n': 8, 'titulo': 'Circunferencia', 'pags': '156–176',
     'nota': 'Pasa al final del año: cierra enlazando con lo gráfico de la unidad 9.',
     'material': [
       {'tipo': 'pendiente', 'titulo': 'Material de circunferencia',
        'desc': 'Posiciones relativas, polígonos inscriptos, perímetro y área.'},
     ]},
  ]},

 {'id': '9no', 'nombre': '9.º grado', 'libro': 'Matemática 9 · En Alianza',
  'unidades': [
    {'n': '5+6', 'titulo': 'Ecuaciones de segundo grado', 'pags': '98–148',
     'material': [
       {'tipo': 'ficha', 'titulo': 'Fichas de cuadráticas',
        'desc': 'Ocho fichas: de las incompletas al discriminante y la gráfica.',
        'url': 'fichas/index.html#9no'},
       {'tipo': 'diapositiva', 'titulo': 'Ecuaciones de segundo grado',
        'desc': 'Los dieciséis temas de las unidades 5 y 6: de las incompletas a la fórmula, '
                'los radicales, el discriminante, completar el cuadrado y la parábola, con un '
                'taller para ver qué hace cada coeficiente.',
        'url': 'matematica/9no/cuadraticas.html'},
     ]},
    {'n': '7+8+9', 'titulo': 'Cuerpos geométricos', 'pags': '150–218',
     'nota': 'Unidades 7, 8 y 9 fusionadas y reordenadas por cuerpo: cada uno se ve '
             'una sola vez y completo.',
     'material': [
       {'tipo': 'pendiente', 'titulo': 'Diapositivas de cuerpos',
        'desc': 'Prisma, cubo, pirámide, cilindro, cono y esfera, con los tres patrones '
                'que aparecen al ordenarlo así.'},
     ]},
    {'n': 10, 'titulo': 'Estadística y probabilidades', 'pags': '220–240',
     'nota': 'Proyecto de Google Forms. El libro trae el laboratorio en la pág. 237.',
     'material': [
       {'tipo': 'pendiente', 'titulo': 'Guía del proyecto',
        'desc': 'Compartida con 7.º y 8.º.'},
     ]},
  ]},
]

# ══════════════════════════════════════════════════════════════════
#  OMAPA · del 2.º al 9.º grado
# ══════════════════════════════════════════════════════════════════
OMAPA = {
  'titulo': 'OMAPA',
  'bajada': 'Preparación para la olimpiada, del 2.º al 9.º grado. Los problemas no se '
            'agrupan por unidad del libro sino por la idea que hace falta para resolverlos.',
  # Las clases: una por bloque del cuadernillo de herramientas. Cada una tiene la
  # herramienta de la Olimpiada Infantil y la de la Juvenil.
  'clases': [
    (1, 'Contar bien', 'Separar por posición y listar en orden; casos disjuntos y el complemento.'),
    (2, 'Relaciones entre cantidades', 'Comparar dos estados; traducir "más que" y "el doble"; suponer y corregir.'),
    (3, 'Patrones', 'Ciclos, restos y mcm; consecutivos y el término del centro.'),
    (4, 'Números', 'Divisores de a pares, mcd y mcm; primos y cotas.'),
    (5, 'Estrategias', 'Construir el caso extremo; elegir siempre lo mejor.'),
    (6, 'Ideas potentes', 'Agotar todos los casos; el principio del extremo.'),
    (7, 'Geometría', 'Descomponer la figura; áreas en cuadrícula; cortar y rearmar.'),
  ],
  # Las fichas de alumno, en omapa/fichas/. Las claves NO se publican.
  # (código del archivo, nombre, tandas publicadas)
  'fichas_olimpiada': [
    ('2G', '2.º grado', ['02', '03', '04']),
    ('3G', '3.º grado', ['01', '02', '03', '04']),
    ('4G', '4.º grado', ['01', '02', '03']),
    ('5G', '5.º grado', ['01', '02', '03']),
    ('6G', '6.º grado', ['01', '02', '03']),
    ('N1', '7.º grado · Nivel 1', ['01', '02', '03']),
    ('N2', '8.º y 9.º grado · Nivel 2', ['01', '02', '03']),
  ],
  'fichas_kanguro': [
    ('escolar-2', '2.º grado · Escolar', ['01', '02', '03']),
    ('escolar-3', '3.º y 4.º grado · Escolar', ['01', '02', '03']),
    ('benjamin-5', '5.º y 6.º grado · Benjamín', ['01', '02', '03']),
    ('cadete-7', '7.º y 8.º grado · Cadete', ['01', '02', '03']),
    ('junior-9', '9.º grado · Junior', ['01', '02', '03']),
  ],
}

# ══════════════════════════════════════════════════════════════════
#  Fichas de ejercitación
#  Los PDF se copian a fichas/pdf/<grado>/ al construir el sitio.
#  Las CLAVES no van al repositorio: quedan en la computadora del docente.
# ══════════════════════════════════════════════════════════════════
FICHAS = {
 '7mo': [
  (1,  'Potenciación con racionales'),
  (2,  'Igualdades'),
  (3,  'Expresión algebraica'),
  (4,  'Ecuaciones lineales'),
  (5,  'Representación gráfica'),
  (6,  'Ecuaciones con fracciones'),
  (7,  'Simbolizaciones algebraicas'),
  (8,  'Resolución de problemas'),
  (9,  'Operaciones con racionales'),
  (10, 'Polígonos y clasificación'),
  (11, 'Triángulos y sus ángulos'),
 ],
 '8vo': [
  (1,  'Miscelánea de factoreo'),
  (2,  'Trinomio cuadrado perfecto'),
  (3,  'Casos de factoreo'),
  (4,  'Trinomios y cuatrinomio'),
  (5,  'Combinación de casos'),
  (6,  'Expresiones racionales'),
  (10, 'Expresiones racionales — 94 ejercicios graduados'),
 ],
 '9no': [
  (1,  'Cuadráticas sin denominadores'),
  (2,  'Cuadráticas con denominadores'),
  (3,  'Ecuaciones de segundo grado'),
  (4,  'Secuencias cuadráticas'),
  (5,  'Diagnóstico de cuadráticas'),
  (6,  'Ecuaciones con radicales'),
  (7,  'Discriminante y completación'),
  (8,  'Gráfica de la función cuadrática'),
 ],
}
