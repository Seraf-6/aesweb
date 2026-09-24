# AESWeb

Sitio estático con el material de clase de Matemática del Tercer Ciclo del
Albert Einstein School, más un módulo de preparación para la OMAPA.

Docentes: Eduardo Ovelar / Juan Serafini. Año lectivo 2026.

---

## Cómo se usa

No hay que compilar nada para verlo: son archivos HTML sueltos. Se puede
abrir `index.html` con doble clic, servirlo desde GitHub Pages, o descargar
la carpeta entera y usarla **sin conexión**.

Para regenerar las páginas de índice después de tocar el contenido:

```bash
python build.py
```

No necesita instalar nada: solo Python 3. En Windows el comando es `python`;
en Linux y macOS suele ser `python3`.

---

## Estructura

```
index.html                  portada
matematica/
  index.html                los tres grados
  7mo|8vo|9no/index.html    las unidades de cada grado   ← los genera build.py
  7mo/ecuaciones.html       diapositivas                 ← escritas a mano
  7mo/poligonos.html        diapositivas                 ← escritas a mano
  8vo/factoreo.html         diapositivas                 ← escritas a mano
  8vo/sistemas.html         diapositivas                 ← escritas a mano
fichas/
  index.html                listado                      ← lo genera build.py
  pdf/<grado>/Ficha_NN.pdf  los archivos
omapa/index.html            módulo de olimpiada          ← lo genera build.py
progreso/index.html         progreso del tramo           ← escrita a mano
assets/
  base.css                  colores, tipografía, notación, panel de proyección
  clase.css                 los componentes de las páginas de clase
  sitio.css                 navegación y portadas
  proyeccion.js             el panel de proyección
  clase.js                  los botones Observador y Notas de las clases
  timer.js                  el timer de pantalla completa, con música generada
  img/                      logos
citas.md                    las citas de las tapas, con su fuente
contenido.py                EL ÍNDICE DEL SITIO: grados, unidades, material
build.py                    genera las páginas de índice desde contenido.py
```

**Regla de oro de la estructura:** `contenido.py` es la única fuente de verdad
del índice. Para agregar una unidad o un material nuevo se edita ese archivo y
se corre `build.py`. Nunca se edita a mano una página de índice: el generador
la pisa.

Las páginas de clase (las diapositivas) sí se escriben a mano, porque cada una
tiene su propio contenido y sus propios componentes. `build.py` las lista al
final para que se vea cuáles hay.

---

## Cómo es una clase

Esto salió de la revisión de la unidad 7 de 7.º, que es el modelo para todas
las demás: `matematica/7mo/ecuaciones.html`. Una página de clase no es un
resumen con comentarios al costado: **es una clase**. Las fichas van aparte,
impresas; la página es lo que se proyecta y se explica.

**Se sigue el libro.** Los temas de la clase son los del libro, en su orden y
con sus nombres, y como mínimo tiene que estar todo lo que trae cada página.
Antes de escribir una clase se lee la unidad entera del libro. Los PDF están
en `Proyecto OMAPA/06-planes semanales/Libros/`, escaneados sin texto: se
renderizan con PyMuPDF a imagen y se miran. Se cita siempre la página
impresa, y el PDF está corrido: en 7.º y 8.º, PDF = impresa + 1; en 9.º, +3
hasta la 74, +2 entre la 76 y la 222, y +1 de la 224 en adelante. Los
ejemplos de la clase son **propios**: los del libro quedan para que los
trabajen los alumnos.

**Cuando el libro salta, se tiende un puente.** Seguir el libro no quiere decir
copiar sus huecos. Si entre un tema y el siguiente hay un salto que un alumno
observador preguntaría ("¿de dónde salió la y?"), va un bloque puente entre
los dos, con la misma anatomía de un tema y marcado "no está en el libro".
En la unidad 7 de 7.º hay uno entre el tema 3 y el 4: arranca por
`y = 2x − 3` y por lo que pregunta —¿cuáles son todos los valores que puede
tomar `2x − 3`?—; la tabla se llena con x = 0, 1, 2, −1/2 y 5 mientras a la
derecha, en un plano vacío, aparece un punto por paso, y la recta aparece
recién con la respuesta. La pregunta del observador es "¿cómo pasamos de
tener puntos a una línea entera?". En los datos del guion es un tema con
`puente:true` y un `id` propio, y el ejemplo lleva `construye:` en lugar de
`grafica:`: el plano se ve desde el principio y crece paso a paso, para
adelante y para atrás.

**Cada tema tiene dos partes en pantalla y dos en botones:**

1. **Concepto.** La fórmula o el vocabulario en grande (una `forma` o
   cajitas) y entre dos y cuatro líneas cortas. Nada de párrafos: lo que el
   docente dice en voz alta no se proyecta.
2. **Ejemplos resueltos.** Entre cuatro y cinco, cada uno con su control.
   Van **en secuencia**: cada ejemplo cambia una sola cosa respecto del
   anterior, el título dice cuál ("cambio el signo de la pendiente") y el
   enunciado la muestra **resaltada**. Dentro de un tema no se repite una
   respuesta: si se repite, el ejemplo nuevo no está mostrando nada. El
   verificador lo controla.
3. **Observador** (botón flotante). Las preguntas que haría un alumno que
   está mirando con cuidado, para cuando nadie pregunta: "veamos qué
   preguntaría alguien observador". Se muestran de a una, con la respuesta
   tapada hasta que se pide. Tienen la voz de un alumno y apuntan a **algo
   que se ve en los ejemplos**: "¿por qué cuando multiplicamos pusimos
   paréntesis y cuando sumamos no?", "las rectas 1 y 2 pasan las dos por
   (1, 1), ¿es casualidad?". Respuestas de una a tres líneas.
4. **Notas** (botón flotante). Todo el texto largo, para el docente: por qué
   el tema se da así, qué errores esperar, cómo usar el taller, qué
   preguntar antes de avanzar.

Si corresponde, un **taller** interactivo después de los ejemplos, y al final
de la unidad un **desafío** que junte todo. La unidad abre con una pregunta
para arrancar y el recorrido de los temas. La introducción y el desafío
también tienen sus notas y sus preguntas de observador.

**En el modo "una a la vez" cada parte en pantalla es una diapositiva**, y
cada ejemplo también:

```html
<body data-diapos=".intro, .concepto, .ejemplo-diapo, .taller-diapo, .desafio">
```

La unidad 7 de 7.º queda en 44 diapositivas.

**Los talleres dejan experimentar, y muestran el cambio.** Si algo se puede
variar, tiene botones + y − además del campo, y lo anterior queda a la vista:
en el taller de la recta, la recta de antes queda en punteado y un cartel
dice qué pasó ("la recta gira alrededor de (0, −1) y queda más empinada").
Donde el taller elige valores solo, hay también un modo manual para que el
docente pruebe los que surjan en clase.

**Los botones Observador y Notas** los pone `assets/clase.js`, en fila con el
del timer. Saben en qué tema está la clase —la diapositiva activa, o lo que
está en pantalla si se hace scroll— y abren ese tema; con las flechas se va a
los temas vecinos. Mientras no se usen las flechas, el panel abierto acompaña
a la clase cuando cambia de tema. Con zona libre para escribir, los paneles
se abren adentro de esa zona y no tapan la clase. La página les pasa el
contenido así:

```js
window.CLASE = { secciones: [
  { id:'3', titulo:'Tema 3 · Ecuaciones lineales', notas:'<p>…</p>',
    preguntas:[{ p:'…', r:'…' }] }, … ] };
```

y marca cada bloque con `data-tema="3"` (la introducción es `unidad`, el
desafío `desafio`).

**Los pasos van y vuelven.** Cada ejemplo tiene "← Anterior", un contador
("2 / 4") y "Siguiente →". Al llegar al final se puede volver: nunca queda un
botón muerto.

**Lo nuevo va resaltado** con `N()`: lo que se agrega a los dos miembros (el
`+ 5`, el `· 2`, el m.c.m. adelante de cada término), el valor que se
reemplaza en la letra, la palabra que cambió respecto del ejemplo anterior.
Es un color con fondo, porque el proyector lava los colores y el fondo no.

**No se saltea ningún paso.** La operación se escribe en los dos miembros
antes de resolverla (`6x − 5 + 5 = 25 + 5`, y recién después `6x = 30`),
igual que en la balanza.

**El orden de un ejemplo es siempre: pasos, respuesta, control.** El
control no es un paso de la resolución: controla una respuesta, así que
no puede aparecer antes que ella. En el guion va en su propio campo
(`control:`), y la página lo muestra después de la respuesta, con su
marca ✓. Todo ejemplo que termina en un número tiene su control.

**Cuando una cuenta sigue, sigue en el renglón de abajo, con los `=`
alineados**, como en el cuaderno:

```
Reemplazo x por 1:
    3(1 + 2) = 3 · 1 + 6
           9 = 9
```

Nunca se encadenan dos igualdades en el mismo renglón con un punto, una
coma, "o sea" o "queda": el punto se confunde con el de multiplicar y la
cadena no se lee. En el guion de la página eso lo hace `A()`: cada
argumento es una igualdad, una continuación (`' = −1'`) o un par
`['izquierda', '3(1 + 2) = 9']` para cuando se calcula cada miembro por
separado. Si los dos miembros no coinciden se usa `≠`, nunca un `=` falso.
El verificador rechaza la página si encuentra una cadena en un renglón.

**La notación es la del libro.** `·` para multiplicar, `:` para dividir,
fracciones apiladas (`Q(numerador, denominador)` en el guion de la página) y
`₲` para los guaraníes. Los contextos, locales: tapitas para reciclar,
cuadernos en guaraníes, San Lorenzo antes que Nueva York.

**Tamaños en proyección.** El enunciado del ejemplo es lo más grande de la
pantalla y la respuesta final lo segundo. Lo único que puede ser chico es la
cinta de arriba, que dice dónde estamos ("Tema 3 · ejemplo 2 de 5").

**Cómo se habla de los errores.** Se nombra al alumno: "la mayoría de los
alumnos de 7.º se traba acá", "muchos chicos reparten a medias". Nunca "hay
una trampa que casi nadie ve". Y no se inventan estadísticas: "6 de cada 10"
solo si hay de dónde sacarlo.

**Las respuestas finales se escriben en el archivo**, no se arman en tiempo de
ejecución con una función: el verificador lee el HTML, no la página
renderizada, y una respuesta que no está escrita no se puede controlar.

**El `·` nunca separa.** Acaban de aprender que multiplica. Para separar
elementos se usan cajitas; si hace falta un separador en línea, una barra.

**Las citas de la tapa** salen de `citas.md` (ver más abajo).

---

## Verificar las cuentas de una página

Cada página de clase tiene su guion en `verificacion/`, que se corre solo:

```bash
python verificacion/ecuaciones_7mo.py
```

El guion calcula con `sympy`, comprueba **por un camino distinto** (sustituir
con `Fraction`, probar en puntos al azar, volver a la situación del enunciado)
y al final abre el HTML y exige que cada respuesta verificada esté escrita tal
cual. Así una respuesta no puede quedar mal tipeada en la página aunque la
cuenta esté bien. Después de tocar una página de clase hay que volver a
correrlo.

Falta el de `factoreo.html` y el de `sistemas.html`: son anteriores a esta
carpeta.

Las páginas de clase enlazan `assets/clase.css`, que tiene los componentes
compartidos (la tapa, la ficha de cada paso, el enunciado, los ganchos, los
laboratorios). En su `<style>` propio va solo lo que es de esa página.

---

## Dos nombres reservados

- **`data-paso` en un botón es del panel de proyección**: mueve de diapositiva.
  Una página de clase que quiera sus propios botones tiene que usar otro
  nombre (`data-bloque`, por ejemplo) o el clic va a saltar de lámina.
- **`.ec` no corta la línea** (`white-space:nowrap`). Es para notación, no para
  frases: una oración entera adentro de un `.ec` desborda la pantalla del
  teléfono.

---

## El panel de proyección

Toda página de clase incluye:

```html
<link rel="stylesheet" href="../../assets/base.css">
<body data-diapos=".intro, .caso, .cierre">
<script src="../../assets/proyeccion.js" defer></script>
```

`data-diapos` es el selector de los bloques que funcionan como diapositivas en
el modo "una a la vez". Si no se declara, ese modo no se ofrece.

El panel da: contraste (6 paletas), color de letra (dos juegos, uno para fondo
claro y otro para oscuro), tamaño (80 % a 200 %), cuadrícula (dos pasos o sin),
una diapositiva a la vez, y zona libre para escribir en la pizarra. Todo queda
guardado en `localStorage` de esa computadora.

**El valor por defecto es el fondo crema.** No es capricho: se probó proyectando
sobre la pizarra blanca del aula y es el que mejor aguanta el tinte verdoso del
proyector. No cambiarlo sin volver a probar en el aula.

---

## El módulo de progreso

`progreso/index.html` es una herramienta del docente para el tramo final
del año, con tres pestañas:

- **Calibrar**: cuántos puntos tiene el tramo (clases, fichas, proyectos) y
  dónde cae cada nota según la escala del MEC. Una tabla de perfiles de
  alumno controla la calibración: si el que viene a todas las clases y
  entrega todas las fichas no llega al 2, avisa. Los valores viajan en la
  dirección de la página, así que se guardan copiando el enlace.
- **Para dictar**: las reglas y los cuatro números que van al cuaderno.
- **La carrera**: se pegan del Excel dos columnas —nombre y puntos— y se
  proyecta una carrera con las líneas de cada nota. Hay modos para no
  mostrar nombres completos (iniciales, códigos).

**Los nombres de los alumnos no salen de la computadora**: se pegan, se
dibujan y se pierden al cerrar. No viajan en la dirección, no se guardan en
el navegador y la página no hace ningún pedido de red. Se escriben como
texto, nunca como HTML. El verificador controla las tres cosas.

Usa `base.css`, el panel de Proyección y el timer como el resto del sitio:
el contraste y la cuadrícula se eligen desde Proyección, con el crema medido
en el aula. Es una página escrita a mano, como las de clase: `build.py` no la
toca, solo la enlaza desde la portada.

Las cuentas se verifican con `verificacion/progreso.py`, que lee los valores
sugeridos de la página y recalcula todo en Python con enteros.

---

## Las citas de las tapas

Cada página de clase abre con una cita en vez de una explicación. La lista
está en `citas.md`, con la fuente de cada una, cuáles son atribuidas y cuáles
se le cuelgan a Einstein sin serlo. **La firma dice la verdad sobre la
fuente**: `Albert Einstein` si está documentada, `atribuida a Albert Einstein`
si no.

Ahí también está qué cita va en cada unidad, para no repetir.

---

## El timer del aula

`assets/timer.js` pone un botón **Timer** arriba a la derecha de **todas** las
páginas, generadas y escritas a mano. Se elige de cuántos minutos y la cuenta
regresiva toma la pantalla entera, con los colores de la paleta que esté
puesta. Espacio pausa, Escape cierra.

**La música se genera en el navegador**, con Web Audio: notas sueltas de una
escala pentatónica, sin melodía, a volumen bajo. No hay ningún archivo de
sonido en el repositorio y no debería haberlo: subir una canción sería
publicarla. Si alguna vez se quiere usar un archivo propio, va en
`assets/audio/` y solo si se tienen los derechos.

El aviso del final suena aunque la música esté apagada.

Los atributos del timer empiezan todos con `data-tmr` a propósito: ver la
sección "Dos nombres reservados".

---

## Lo que NO va en este repositorio

**Las claves de corrección.** Se decidió a propósito. En un repositorio público
cualquier contraseña de JavaScript se esquiva leyendo el código, así que una
"sección secreta" daría una falsa sensación de seguridad. Las claves quedan como
PDF en la computadora del docente.

Si alguna vez hace falta publicarlas, la única opción honesta es cifrado real
del lado del cliente (AES-GCM con clave derivada por PBKDF2), no un `if
(password === "...")`.

**Material con derechos de autor.** Nada de escanear ni reproducir páginas de
libros de texto. Si hace falta ejercitación al estilo de un libro, se generan
series originales propias.

---

## Cómo agregar cosas

### Una ficha nueva

1. Poner el PDF en `fichas/pdf/<grado>/Ficha_NN.pdf`.
2. Agregar `(NN, 'Título')` a `FICHAS[<grado>]` en `contenido.py`.
3. `python build.py`.

### Diapositivas nuevas

1. Leer la unidad en el libro, entera (ver "Cómo es una clase").
2. Copiar `matematica/7mo/ecuaciones.html` como punto de partida: tiene la
   anatomía completa. Se reemplaza el arreglo `TEMAS`, y la plantilla que lo
   dibuja no se toca.
3. Escribir primero el verificador (`verificacion/<tema>_<grado>.py`) con
   todos los ejemplos, correrlo, y recién después escribir la página con los
   números que dio.
4. Agregar la entrada en `contenido.py`, dentro del `material` de la unidad
   que corresponda, con `'tipo': 'diapositiva'` y su `url`.
5. `python build.py` y el verificador otra vez.

`factoreo.html`, `sistemas.html` y `poligonos.html` son anteriores a esta
anatomía y todavía no la siguen.

### Una unidad nueva

Se agrega el dict a `GRADOS[...]['unidades']` en `contenido.py` y se corre el
generador. Mientras no haya material, se ponen entradas con
`'tipo': 'pendiente'` y sin `url`: salen como tarjetas punteadas, que es la
forma honesta de decir "todavía no está".

---

## Reglas de contenido matemático

Estas vienen de cómo se viene trabajando y conviene no aflojarlas:

- **Ninguna respuesta se escribe a mano.** Todo resultado que aparezca en una
  ficha, una clave o una diapositiva se calcula con `sympy` y se verifica por un
  camino distinto del que lo produjo: sustituir la raíz en la ecuación original,
  evaluar en puntos al azar con `fractions.Fraction`, re-multiplicar la
  factorización. Nunca `float` para aritmética exacta.
- **La consigna no delata la respuesta ni el método.** Si el enunciado dice
  "escribí la fila correcta", ya avisó que la del alumno está mal.
- **Citar la página impresa del libro**, no la del PDF escaneado.
- Terminología de la casa: "control de cuaderno", nunca "control de carpeta".

---

## Tipografía y modo sin conexión

Las fuentes (Alegreya, Alegreya Sans, IBM Plex Mono) se cargan desde Google
Fonts. Sin conexión el sitio funciona igual, pero cae a las alternativas
del sistema (Georgia y la sans del sistema operativo).

Para que también la tipografía ande sin conexión: bajar los `.woff2`, ponerlos
en `assets/fuentes/`, agregar las reglas `@font-face` al principio de
`base.css` y sacar el `<link>` de Google de las plantillas en `build.py` y de
las páginas de clase.

---

## Estado actual

Hecho: portada, índices de los tres grados, listado de fichas con 26 PDF,
las diapositivas de 7.º (ecuaciones lineales y polígonos), las dos de 8.º
(factoreo y sistemas), el panel de proyección y el timer de aula.

Pendiente: el proyecto de estadística compartido por los tres grados (falta
definir el tema), las diapositivas de cuerpos geométricos y de la parábola
para 9.º, el material de circunferencia de 8.º, la ficha de sistemas de 8.º
y todo el contenido de OMAPA.
