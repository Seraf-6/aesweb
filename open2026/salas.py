"""Open House 2026 · los textos de sala.

Una entrada por sala (una por grado) y el panel de entrada de toda la obra.
`build.py` genera con esto las dos salidas: la página web de cada sala
(open-2026/sala/<grado>/) y los paneles A3 para imprimir (open-2026/paneles/).

El texto viene de Textos_de_sala.md y está copiado tal cual. Dentro de un
texto, **así** sale en negrita y *así* en cursiva.

`encontramos` arranca en None en las ocho salas: se escribe recién cuando los
problemas estén escaneados y leídos (ver «Cómo escribir el punto 4» en
Textos_de_sala.md). Mientras sea None, la sección no se muestra, ni en la web
ni en el panel. No se rellena con nada.

Máximo 150 palabras por panel, contando todas sus secciones: el verificador
dice cuántas le quedan a cada sala para el párrafo de `encontramos`.
"""

ENTRADA = {
    # Las tres opciones de Textos_de_sala.md: «Adentro de su cabeza»,
    # «Pensá como ella pensó» y «Museo de problemas · AES 2026».
    'titulo': 'Adentro de su cabeza',
    'texto': [
        'Durante tres semanas, cada alumno del colegio, de 2.º a 9.º grado, hizo algo '
        'que no se les suele pedir: en vez de resolver un problema de matemática, '
        'inventó uno.',
        'Parece lo mismo y no lo es. Para que un problema funcione hay que dar todos '
        'los datos necesarios y ninguno de más, y que tenga una sola respuesta. Casi '
        'todos descubrieron, escribiendo, que su primer problema tenía dos respuestas o '
        'le faltaba un dato. Ese descubrimiento es lo que vinieron a aprender.',
        'Lo que está colgado acá es de ellos: el dibujo, la letra, el razonamiento y la '
        'voz.',
    ],
    'pasos': [
        '**1 · Intentalo.** Antes de levantar nada.',
        '**2 · Levantá la hoja.** Abajo está la solución, con la letra del autor.',
        '**3 · Escaneá el código.** Vas a escuchar al autor contando cómo se le ocurrió.',
    ],
    'pie': 'el recorrido va de 2.º a 9.º grado; la dificultad sube a medida que avanzás',
}

SALAS = [
  {
    'grado': '2.º',
    'titulo': 'Contar es más difícil de lo que parece',
    'sabe_hacer': 'Suma y resta hasta 100, y empieza a confiar en los números sin tener '
                  'que dibujar todo. Todavía piensa con objetos: caramelos, figuritas, '
                  'hermanos. Si no puede imaginar la escena, no puede resolverla.',
    'les_pedimos': 'Que su problema no se resolviera con una sola cuenta. Que hubiera algo '
                   'que probar: dos o tres posibilidades, y decidir cuál sirve.',
    'encontramos': None,
    'mira_esto': 'Fijate en cuántos problemas tienen un dibujo que ya contiene la '
                 'respuesta, sin que el autor se diera cuenta.',
  },
  {
    'grado': '3.º',
    'titulo': 'Lo que sobra también cuenta',
    'sabe_hacer': 'Multiplica, divide, y aprende que una división puede dejar resto. Ese '
                  'resto suele tratarse como un estorbo: algo que se anota al costado y '
                  'se olvida.',
    'les_pedimos': 'Que el resto importara. Un problema donde repartir en partes iguales no '
                   'alcanza, y lo que sobra cambia la respuesta: cuántas cajas hacen falta, '
                   'cuántos quedan afuera, a quién le toca de más.',
    'encontramos': None,
    'mira_esto': 'Buscá dos problemas con la misma cuenta y distinta respuesta, solo por '
                 'lo que cada autor decidió hacer con lo que sobraba.',
  },
  {
    'grado': '4.º',
    'titulo': 'Contar sin contar',
    'sabe_hacer': 'Maneja la multiplicación con soltura y puede organizar información: '
                  'tablas, listas, agrupaciones. Si le dan tiempo, cuenta cualquier cosa '
                  'escribiendo todos los casos.',
    'les_pedimos': 'Un problema donde escribir todos los casos no sea posible. Donde haya '
                   'que encontrar la manera de contar sin listar. Es el primer momento en '
                   'que la matemática deja de ser hacer la cuenta y pasa a ser encontrar el '
                   'atajo.',
    'encontramos': None,
    'mira_esto': 'En las soluciones, mirá cuáles cuentan agrupando y cuáles todavía '
                 'necesitan escribir la lista entera.',
  },
  {
    'grado': '5.º',
    'titulo': 'La parte y el todo',
    'sabe_hacer': 'Trabaja con fracciones y empieza a comparar proporciones: la mitad de '
                  'algo grande contra el todo de algo chico. Es la edad en que «más» deja '
                  'de ser una sola cosa.',
    'les_pedimos': 'Que la respuesta no se viera hasta comparar dos partes entre sí. Nada '
                   'de calcular una fracción y listo: hay que ponerlas una al lado de la '
                   'otra para que aparezca.',
    'encontramos': None,
    'mira_esto': 'Cuántos eligieron comida para explicar fracciones, y cuántos se animaron '
                 'a otra cosa.',
  },
  {
    'grado': '6.º',
    'titulo': 'Cuando hay una regla, no hace falta la cuenta',
    'sabe_hacer': 'Conoce múltiplos, divisores y los criterios de divisibilidad. Sabe que '
                  'un número puede decirte cosas de sí mismo sin que lo dividas: si termina '
                  'en cero, si sus cifras suman nueve.',
    'les_pedimos': 'Un problema que se resolviera con un criterio y no con una cuenta. '
                   'Donde la respuesta correcta sea «no puede ser» o «siempre va a pasar», '
                   'y haya que explicar por qué.',
    'encontramos': None,
    'mira_esto': 'Las soluciones que dicen *siempre* o *nunca*. Esas son las primeras '
                 'demostraciones de sus autores.',
  },
  {
    'grado': '7.º',
    'titulo': 'El enunciado está en el dibujo',
    'sabe_hacer': 'Plantea ecuaciones: traduce una situación a una letra y una igualdad. Y '
                  'trabaja con polígonos, ángulos y el teorema de Pitágoras.',
    'les_pedimos': 'Que ningún dato estuviera escrito en el texto. Todos tenían que vivir '
                   'adentro de la ilustración: un plano, un mapa, un croquis. El visitante '
                   'tiene que leer el dibujo para poder empezar.',
    'encontramos': None,
    'mira_esto': 'Probá tapar el título de una hoja. Si el dibujo está bien hecho, el '
                 'problema se entiende igual.',
  },
  {
    'grado': '8.º',
    'titulo': 'La intuición se equivoca',
    'sabe_hacer': 'Maneja porcentajes y proporciones, factoriza expresiones y resuelve '
                  'situaciones con dos condiciones al mismo tiempo. Puede comparar dos '
                  'opciones y decir cuál conviene, y desde cuándo.',
    'les_pedimos': 'Un problema donde la primera respuesta que a uno se le ocurre sea la '
                   'equivocada. Lo difícil no era la cuenta: era construir la trampa y '
                   'saber exactamente por qué funciona.',
    'encontramos': None,
    'mira_esto': 'Contestá mentalmente antes de levantar la hoja. Anotá cuántas veces te '
                 'equivocaste. No va a ser ninguna, va a ser varias.',
  },
  {
    'grado': '9.º',
    'titulo': 'Probar que no hay nada mejor',
    'sabe_hacer': 'Resuelve ecuaciones de segundo grado, las grafica, y entiende que una '
                  'parábola tiene un punto más alto o más bajo que todos los demás. Calcula '
                  'áreas y volúmenes.',
    'les_pedimos': 'Lo más duro de la muestra: un problema cuya respuesta sea la mejor '
                   'posible, y que el autor demuestre que **ninguna otra la supera**. '
                   'Encontrar una respuesta es fácil; probar que no hay otra mejor es otra '
                   'cosa.',
    'encontramos': None,
    'mira_esto': 'En las soluciones, buscá la frase donde el autor descarta todas las '
                 'demás posibilidades. Ahí es donde deja de calcular y empieza a demostrar.',
  },
]
