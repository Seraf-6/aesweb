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
  7mo/angulos.html          diapositivas                 ← escritas a mano
  7mo/euclides-angulos.html diapositivas (geometría griega, bloque A) ← escritas a mano
  7mo/poligonos.html        diapositivas                 ← escritas a mano
  8vo/factoreo.html         diapositivas                 ← escritas a mano
  8vo/sistemas.html         diapositivas                 ← escritas a mano
  9no/cuadraticas.html      diapositivas                 ← escritas a mano
fichas/
  index.html                listado                      ← lo genera build.py
  pdf/<grado>/Ficha_NN.pdf  los archivos
omapa/index.html            módulo de olimpiada          ← lo genera build.py
omapa/clases/bloque-N.html  clases por herramienta       ← escritas a mano
omapa/fichas/               fichas de alumno OMAPA y Kanguro (sin claves)
progreso/index.html         progreso del tramo           ← escrita a mano
open-2026/                  Open House 2026: piezas, salas, QR  ← lo genera build.py
open2026/                   las piezas y las salas (la fuente), el generador, el verificador
herramientas/               cargar la lista de alumnos, preparar audios y fotos
assets/
  base.css                  colores, tipografía, notación, panel de proyección
  clase.css                 los componentes de las páginas de clase
  sitio.css                 navegación y portadas
  proyeccion.js             el panel de proyección
  pizarra.js                el motor de las clases: la pizarra, los pasos, el movimiento
  clase.js                  los botones Observador y Notas de las clases
  timer.js                  el timer de pantalla completa, con música generada
  img/                      logos
citas.md                    las citas de las tapas, con su fuente
contenido.py                EL ÍNDICE DEL SITIO: grados, unidades, material
build.py                    genera las páginas de índice desde contenido.py
verificacion/               un guion por página de clase, que comprueba sus cuentas
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
`puente:true`, un `id` propio y `entre:'el tema 3 y el 4'`.

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

La unidad 7 de 7.º queda en 46 diapositivas.

**Los talleres dejan experimentar, y muestran el cambio.** Si algo se puede
variar, tiene botones + y − además del campo, y lo anterior queda a la vista:
en el taller de la recta, la recta de antes queda en punteado y un cartel
dice qué pasó ("la recta gira alrededor de (0, −1) y queda más empinada").
Donde el taller elige valores solo, hay también un modo manual para que el
docente pruebe los que surjan en clase.

**Los botones Observador, Timer y ☰** los pone `assets/clase.js`, en fila
arriba a la derecha. El ☰ abre un menú con la ruta para volver (el grado,
Matemática, el inicio: en «una a la vez» la barra del sitio no se ve) y las
Notas, que se usan menos. En una clase la barra del sitio no queda pegada
arriba: la que queda es la de los temas, y deja lugar para los botones.
El modo «una a la vez» queda guardado, pero solo se aplica en páginas con
diapositivas: un índice nunca pierde su barra. Observador y Notas Saben en qué tema está la clase —la diapositiva activa, o lo que
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

**Todo ejemplo es una pizarra, haya o no un gráfico.** Es la regla más
importante de la clase, y salió de ver funcionar el puente. Como en los
videos de Khan Academy, la pantalla se parte en dos:

- **A la izquierda**, chicos: el enunciado, lo que queda fijo (la pregunta,
  la incógnita con su nombre: `fija: 1` deja escrito el primer paso) y lo
  que se dice en este paso. Lo que se dice **se borra y se reescribe en el
  mismo lugar**, como en el pizarrón: no se apila debajo del anterior.
- **A la derecha**, grande, **lo que se va acumulando**, más de la mitad de
  la pantalla (en proyección la diapositiva usa todo el ancho):
  - **el cuaderno**: la resolución entera, un renglón nuevo por paso y
    todos los `=` en una columna, como la escribe el alumno. Arranca con la
    ecuación (`inicio:`); los renglones del paso de ahora se escriben de a
    uno y los de antes quedan, más tenues. En el tema 2 el cuaderno son los
    valores que se prueban; en el 6, la traducción de palabras a letras;
  - **el plano**, si el ejemplo dibuja (`construye:`): vacío al principio,
    un punto por paso, con su renglón en la tabla chica de la izquierda; la
    recta aparece recién con la respuesta y el control es un punto más;
  - **el plano con varias rectas** (`lienzo:{ tipo:'plano' }`): las rectas,
    las parábolas, los ejes de simetría y los puntos aparecen por capas,
    paso a paso. Es el de los sistemas y el de la parábola de 9.º;
  - **una figura** (`lienzo:{ tipo:'figura' }`): un dibujo por capas, cada
    una con el paso en que aparece. El triángulo, sus alturas, la
    circunferencia; los cuadrados de Pitágoras; las piezas de un trinomio.
    Para dibujarla, el motor trae `Geo` (polígonos regulares, ángulos con su
    arco, escuadritas, rayitas de lados iguales, pies de perpendiculares).

Cuando la derecha es un dibujo (el plano o una figura), las cuentas del paso
van a la izquierda, debajo de lo que se dice: abajo del dibujo no entran, y
la izquierda tiene lugar de sobra. Un cuaderno largo (más de nueve
renglones) usa letra más chica desde el principio, para entrar entero.

En el guion, un paso que escribe en el cuaderno es
`P('Sumo 5 a los dos miembros.', '6x − 5 + 5 = 25 + 5', '6x = 30')`: el
texto va a la izquierda y los renglones al cuaderno. Un paso que es solo un
texto se escribe como texto. En un ejemplo con plano, la cuenta del punto
va a la izquierda, con `A()`, porque la derecha es el plano.

La respuesta reemplaza al último paso a la izquierda, y el control se
escribe **debajo** de la respuesta, que se queda: el control controla algo
que tiene que estar a la vista.

**Los pasos van y vuelven.** Cada ejemplo tiene "← Anterior", un contador
("paso 2 de 4") y "Siguiente →". Al llegar al final se puede volver: nunca
queda un botón muerto. Los botones van en la esquina de la caja de la
izquierda, la de lo que se dice en este paso, que no se mueve de lugar: no
hay que ir a buscarlos. Si quedan fuera de la pantalla, la página se corre
lo justo para mostrarlos, sin dejarlos debajo de los botones flotantes.

**El movimiento dice qué cambió y qué quedó igual**, a la manera de las
animaciones de 3Blue1Brown:

- Nada empuja nada de golpe: una caja que cambia de alto lo hace despacio,
  y la página se corre suave, lo justo.
- Lo que se dice en el paso anterior se borra en su lugar, y lo nuevo se
  escribe encima.
- En el cuaderno, lo anterior no desaparece: se apaga un poco. Los
  renglones nuevos se escriben de a uno, y lo resaltado con `N()` se
  enciende después, cuando ya se leyó el renglón.
- En el plano, el punto sube desde la x por sus guías, aparece con un pulso,
  y el renglón nuevo de la tabla se ilumina al mismo tiempo. La recta se
  traza de punta a punta, recién con la respuesta.
- Para atrás es el mismo movimiento al revés: lo que sobra se apaga y se va.
- Con "reducir movimiento" del sistema operativo no hay animaciones, solo el
  estado final.

**La pizarra, los botones y el movimiento son de la arquitectura, no de
cada página.** Viven en `assets/pizarra.js` (y sus estilos en
`assets/clase.css`). Una página de clase trae **solo sus datos** —los
temas, los ejemplos, las preguntas del observador, las notas, los
talleres— y termina con:

```js
Pizarra.unidad({ TEMAS, DESAFIO, PREGUNTA_INICIAL, UNIDAD, LABS, grado:'7mo', temasLibro:7 });
```

Si algo de la pizarra se cambia, se cambia en el motor y cambia en todas
las clases a la vez. Para escribir, el motor trae además: `x^2` para los
exponentes (dentro de `M()`, `A()` y `P()`), `S('x + y = 5', 'x − y = 1')`
para un sistema con su llave, y los ángulos con sombrero (Â, B̂) que se
escriben tal cual y se dibujan bien aunque la letra no exista armada.
Las raíces se escriben `√25`, `3√3` o `√(x^2 + 9)` y se dibujan como en el
pizarrón: la raya de arriba cubre todo lo de adentro (los paréntesis se
sacan). En una figura, una capa puede llegar deslizándose desde otro lugar
(`{ desde:[dx, dy] }`), como una pieza que se mueve a su lugar: así se arma
el cuadrado de x² + 6x + 9 con sus piezas sueltas. O puede llegar girando
alrededor de un punto (`{ gira:[grados, x, y] }`, positivo es el sentido del
reloj): así el lado de un ángulo gira desde el otro lado, y el opuesto por el
vértice aparece dando media vuelta. Si la capa trae un arco con `.traza`, el
arco se dibuja al mismo ritmo que el giro. El nombre de un ángulo con
sombrero (AÔB) no se corta entre dos renglones, y el sombrero se mide desde
la letra y no desde el renglón: con el interlineado grande de los
enunciados quedaba casi en el renglón de arriba.
Lo que se simplifica se tacha con `tacha('(x + 2)')`: en el cuaderno, una raya
roja que se dibuja después de escribir el renglón (las fracciones algebraicas de 8.º).
Cada página elige sus letras en cursiva con `Pizarra.letras`. Toda limpieza que espera el final de una animación
tiene además un temporizador de respaldo (`alTerminar`): con la ventana
oculta o el navegador ocupado el aviso de fin puede no llegar, y las cajas
viejas quedaban acumuladas.

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
Los renglones del cuaderno (los de `P()`) siguen la misma regla: cada uno
es una igualdad, una continuación o un par con rótulo. El verificador
rechaza la página si encuentra una cadena en un renglón.

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

Hay uno por cada página de clase (ecuaciones, ángulos, polígonos y el bloque A de la geometría griega de 7.º,
factoreo, expresiones racionales y sistemas de 8.º, ecuaciones de segundo grado de 9.º), uno para
las siete clases de OMAPA y uno para el módulo de progreso. El Open House
tiene el suyo: `open2026/verificar.py`.

Las páginas de clase cargan `assets/pizarra.js` (sin `defer`, antes de su
propio guion) y enlazan `assets/clase.css`, que tiene los componentes
compartidos: la tapa, el concepto, la pizarra, el cuaderno, el plano, los
laboratorios. En su `<style>` propio va solo lo que es de esa página, como
los controles de un taller.

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

## El módulo de OMAPA

`omapa/index.html` (lo genera `build.py` desde `OMAPA` en `contenido.py`)
tiene tres partes:

- **Las herramientas**: una clase por bloque del cuadernillo de herramientas,
  en `omapa/clases/bloque-1.html` a `bloque-7.html`. Son páginas de clase
  como las de Matemática, sobre el mismo motor de la pizarra. Cada una tiene
  dos temas: la herramienta de la Olimpiada Infantil (3.º a 6.º) y la de la
  Juvenil (7.º a 9.º). Cada tema empieza con el problema "para explicar en
  clase" del cuadernillo, sigue con los "para entrenar" y con otros del banco
  que se resuelven con la misma idea.
- **Las fichas**: las de alumno de OMAPA (por grado) y de Kanguro (por
  nivel), en `omapa/fichas/`, y los dos cuadernillos.
- El criterio: agrupado por idea, no por unidad.

**Los problemas son reales**, de las olimpiadas de OMAPA y del Kanguro, y
cada uno dice de qué ronda, año y grado es (`fte()` en el guion de la
página). Las resoluciones y las explicaciones son propias. Juan decidió
publicar las fichas de alumno (septiembre de 2026); **las claves no se
publican nunca**: el verificador falla si encuentra un archivo con
RESPUESTAS o CLAVE en el nombre dentro de `omapa/`.

Todo sale del proyecto hermano `Proyecto OMAPA` (fuera del repositorio): el
banco de problemas, las figuras recortadas, el generador de fichas y el
análisis de arquetipos (`03-curricula`). Para publicar una tanda nueva de
fichas se copian solo los PDF de alumno a `omapa/fichas/olimpiada/` o
`omapa/fichas/kanguro/`, se agrega la tanda en `OMAPA['fichas_olimpiada']`
o `OMAPA['fichas_kanguro']` y se corre `build.py`.

Las páginas de las clases se generaron con un script, pero se mantienen a
mano como el resto: cada una trae sus datos y llama a `Pizarra.unidad()`.
Algunas diferencias con las de Matemática:

- No hay letras en cursiva (`Pizarra.letras = /(?!)/g`): los problemas son de
  números y los renglones del cuaderno tienen palabras.
- En el cuaderno los renglones pueden cortar (la última columna es flexible).
- Los problemas con figura usan la imagen recortada del examen
  (`omapa/clases/img/`) o una figura redibujada con `Geo`.
- Si el enunciado es ambiguo o el banco no trae clave, la respuesta se cuenta
  por computadora y la ambigüedad se dice en el observador o en las notas.

Las cuentas se verifican con `verificacion/omapa_bloques.py`, por fuerza
bruta: recorre todos los casos de cada problema.

---

## El módulo Open House 2026

La muestra del sábado 24 de octubre de 2026 es un pasillo con una hoja A4
por alumno, de 2.º a 9.º grado: cada uno inventó un problema de olimpiada, lo
ilustró a mano y grabó treinta segundos contando cómo se le ocurrió. Cada
hoja lleva impreso un QR que lleva a **su** pieza: el padre está parado
frente a la hoja de su hijo, con una mano ocupada, y no puede ponerse a
buscar entre doscientos nombres.

```
open-2026/index.html          portada: qué es la obra, cómo recorrerla, buscador
open-2026/p/<codigo>/         una página por pieza            ← su QR, en la hoja
open-2026/sala/<n>/           el texto de sala de cada grado   ← su QR, en el panel
open-2026/qr/                 la hoja de etiquetas QR, A4
open-2026/paneles/            los nueve paneles de sala, A3
open-2026/mapa/               qué pieza va en qué pared
open-2026/audio/  img/        los .m4a y .jpg ya preparados
open-2026/qr/svg/             los QR, commiteados
open-2026/qr/manifest.json    codigo → url → archivo, para el verificador
open2026/piezas.py            LA FUENTE: una entrada por pieza
open2026/salas.py             los textos de sala y el panel de entrada
open2026/generar.py           el generador (lo llama build.py)
open2026/verificar.py         el verificador
herramientas/                 cargar la lista, preparar audios y fotos
```

**`open2026/piezas.py` y `open2026/salas.py` son la única fuente de verdad
del módulo.** `build.py` genera todo `open-2026/` con `open2026/generar.py`
y nada de ahí adentro se edita a mano: los audios y las fotos los dejan las
herramientas. El módulo no está en `contenido.py`: la portada del sitio lo
enlaza directo.

**El código de una pieza no cambia nunca.** Es `<grado><sección>-<nn>`
(`3a-07`), no lleva el nombre, y la dirección de la pieza depende solo de él:
`https://seraf-6.github.io/aesweb/open-2026/p/3a-07/`. Si cambia el audio, el
título o la foto, la dirección sigue igual. Reimprimir doscientas etiquetas
porque se movió un archivo es el error caro de este módulo. Por lo mismo:

- Los QR se hacen con `segno` **una sola vez**, cuando falta el SVG, y quedan
  commiteados. Con los SVG en el repositorio el sitio se construye sin segno.
- Una pieza que sale de `piezas.py` deja su página: su QR puede seguir
  pegado en una pared. `build.py` avisa cuáles quedaron así.
- La dirección base (`URL_BASE` en `generar.py`) está impresa en todos los
  QR. El verificador la tiene escrita aparte, a propósito.

**Los nombres.** En los datos (piezas.py, las páginas, las etiquetas) va
solo el nombre y la inicial del apellido («Ana G.»); las fotos de las hojas
se publican como las escribieron los chicos, y los audios enteros, sin cortar. La planilla con los nombres completos vive en la
computadora del docente; `cargar_piezas.py` se niega a leerla si está
adentro del repositorio, y `.gitignore` rechaza las planillas y los audios y
fotos crudos. No hay analítica ni nada que registre quién escanea.

### Cómo se carga

1. **La lista**, una vez: `python herramientas/cargar_piezas.py <planilla>`.
   Lee un CSV o XLSX con grado, sección y nombre y apellido (o una columna
   «alumno» con «Apellido, Nombre»); título, dificultad y pared/fila/orden
   son opcionales. Asigna los códigos y devuelve la planilla como
   `<planilla>_con_codigos.csv`, al lado de la original: esa es la que se
   guarda. Recargarla no cambia ningún código ni pierde audios ni fotos; si
   se le pasa la vieja, sin códigos, se niega.
2. `python build.py` e imprimir `open-2026/qr/` en A4 al 100 %. Las
   etiquetas dependen solo de los códigos: se imprimen el primer día y no se
   vuelven a tocar. Para reponer una que se despegó, la misma hoja deja
   imprimir solo esa.
3. **Los audios**, a medida que llegan:
   `python herramientas/preparar_audio.py <archivo> 3a-07`. Necesita ffmpeg
   (`winget install Gyan.FFmpeg`). Mide el volumen, recorta el silencio del
   principio y del final con un umbral 20 dB por debajo de la voz (con un
   umbral fijo, al susurro normalizado no se le iba el silencio), normaliza
   con `loudnorm` en dos pasadas a −16 LUFS y codifica AAC mono a 40 kbps
   (32 si pasa de 400 kB), en `.m4a`: Opus en `.ogg` no suena en iPhones
   viejos. Una grabación muda la rechaza. Los audios llegan con nombres
   como «Doctor Moises Santiago Bertoni 33» (el nombre que les pone el
   iPhone según la calle donde se grabó) y con varias tomas por alumno:
   para saber de quién es cada uno y cuál es la buena, en 4.º se
   transcribieron todos en la computadora con faster-whisper (modelo
   `small`, el audio decodificado con ffmpeg). Nada de eso va al
   repositorio.
4. **Las fotos**: `python herramientas/preparar_imagen.py <foto> 3a-07 problema`
   (o `solucion`). Necesita Pillow. La endereza según el EXIF del celular,
   la achica a 1600 px de ancho, JPEG calidad 82, y la guarda **sin EXIF**,
   que trae la ubicación GPS de dónde se sacó. Las hojas escaneadas de
   costado se enderezan con `--girar 90|180|270` (sentido horario). Las fotos
   **se publican tal cual**, con el nombre y apellido que el chico escribió en
   la hoja: lo decidió Juan (octubre de 2026). `--tapar` queda para algo puntual.
   Un alumno con dos problemas (en 2.º hubo dos tandas, V1 y V2) los tiene los
   dos en su página: `--numero 2` en las dos herramientas.
5. Las herramientas anotan el archivo en `piezas.py`; después, `build.py` y
   el verificador.
6. **Los paneles se imprimen al final**, cuando cada sala tenga su párrafo
   de `encontramos`. Sus QR ya existen desde el primer día.

### La página de una pieza

Se usa de pie, con una mano, con poca luz y a veces con mala señal. Arriba
van el grado, el nombre y el título; enseguida el `<audio controls
preload="none">` nativo; después la foto del problema y la solución detrás
de un `<details>` («Ver cómo se resuelve»), que no se descarga hasta que se
abre; al pie, la pieza anterior y la siguiente, la sala y la portada. Letra
de 18 px, áreas táctiles de 52 px, modo oscuro del sistema. Usa `base.css` y
no lleva la barra del sitio, el panel de proyección, el timer ni las fuentes
de Google: con mala señal, una hoja de estilos externa demora el primer
dibujo.

Si `audio` es None la página existe igual y dice «Ana todavía está grabando
su explicación»: el QR ya está pegado. El campo `respuesta` está reservado
para un audio de la familia: si algún día tiene valor, sale un segundo
reproductor rotulado «lo que le respondió su familia». Recibir esos audios
necesitaría un servicio aparte: GitHub Pages no recibe archivos.

El buscador de la portada encuentra por código (`3a7`, `3A-07`) o por
nombre, sin tildes. Como en el repositorio solo está la inicial, un apellido
escrito entero coincide con su inicial.

### Las salas y los paneles

Un texto por grado más el panel de entrada. `encontramos` arranca en None y
se escribe después de leer los problemas (ver `Textos_de_sala.md`, «Cómo
escribir el punto 4»): mientras sea None, la sección no sale ni en la web
ni en el panel. **Nunca se rellena.** Cada panel tiene como máximo 150
palabras, contando el título y todas sus secciones; el verificador dice
cuántas le quedan a cada sala.

Los paneles: A3 vertical con 18 mm de margen, título de 66 pt, subtítulos de
28, cuerpo de 24 (nunca menos: se lee a un metro, parado), interlineado 1,35
y renglones de entre 45 y 55 caracteres. Texto oscuro sobre blanco y el QR
de la sala abajo a la derecha, a 35 mm. Se imprimen desde Chrome o Edge al
100 %, sin encabezados.

### Verificar

```bash
python open2026/verificar.py
```

Falla si hay códigos repetidos o mal formados, un nombre que no termina en
la inicial del apellido, un archivo que no existe, un audio de más de 400 kB,
de menos de 3 s, que no es AAC o que no es mono, una foto de más de 1600 px
o con EXIF, un QR que falta, dos piezas en el mismo lugar de la pared, una
página sin `noindex`, un panel de más de 150 palabras o sin su QR, un grado
con piezas y sin sala o una sala sin piezas. Lo hace por caminos distintos
de los que produjeron cada cosa: **los QR se leen** (un lector de QR en
Python puro, sin segno, que decodifica cada SVG y compara la dirección con
la esperada y con el manifiesto), la duración de los audios sale del
encabezado del `.m4a` y no de ffmpeg, y las fotos se leen como JPEG. Lo que
falta y no es un error (audios sin grabar, fotos sin subir, el párrafo de
`encontramos`) lo lista aparte.

Antes de imprimir las etiquetas por primera vez se probó además la hoja
impresa a PDF: OpenCV leyó todos sus QR, y medían 40 mm.

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

**Los nombres completos de los alumnos.** Ni en el módulo de progreso ni
en el Open House: ahí va solo el nombre y la inicial del apellido. La
planilla del docente, los audios y las fotos crudas tampoco (`.gitignore`
rechaza `.csv`, `.xlsx`, `.opus`, `.ogg` y `.heic`).

**Material con derechos de autor.** Nada de escanear ni reproducir páginas de
libros de texto. Los problemas de olimpiada son la excepción decidida por Juan:
se publican con su fuente (ver "El módulo de OMAPA"), nunca sus claves. Si hace falta ejercitación al estilo de un libro, se generan
series originales propias.

---

## Cómo agregar cosas

### Una ficha nueva

1. Poner el PDF en `fichas/pdf/<grado>/Ficha_NN.pdf`.
2. Agregar `(NN, 'Título')` a `FICHAS[<grado>]` en `contenido.py`.
3. `python build.py`.

### Diapositivas nuevas

1. Leer la unidad en el libro, entera (ver "Cómo es una clase").
2. Copiar `matematica/7mo/ecuaciones.html` como punto de partida. La página
   es solo datos: se reemplazan `TEMAS`, `DESAFIO`, `PREGUNTA_INICIAL`,
   `UNIDAD` y los talleres. La plantilla, los pasos y el movimiento están
   en `assets/pizarra.js` y no se copian: si hace falta algo nuevo para
   todas las clases (un tipo de dibujo, un comportamiento), va ahí.
3. Escribir primero el verificador (`verificacion/<tema>_<grado>.py`) con
   todos los ejemplos, correrlo, y recién después escribir la página con los
   números que dio.
4. Agregar la entrada en `contenido.py`, dentro del `material` de la unidad
   que corresponda, con `'tipo': 'diapositiva'` y su `url`.
5. `python build.py` y el verificador otra vez.

Las seis clases que hay (ecuaciones, ángulos y polígonos de 7.º, factoreo
y sistemas de 8.º, ecuaciones de segundo grado de 9.º) siguen esta anatomía
y usan el mismo motor.

Una página de clase no puede declarar arriba de todo un nombre que ya usa
`pizarra.js` (`lee`, `paso`, `suma`, `caja`, `bloque`…): el navegador corta
el guion entero con "Identifier has already been declared" y la página queda
en blanco. Pasó con `lee` en ángulos.

### Una unidad nueva

Se agrega el dict a `GRADOS[...]['unidades']` en `contenido.py` y se corre el
generador. Una unidad que no sigue el libro (la geometría griega de 7.º) no
tiene páginas: lleva `'eyebrow'` con su propio rótulo y `build.py` lo usa en
lugar de «Unidad N · págs.». Mientras no haya material, se ponen entradas con
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

Hecho: portada, índices de los tres grados, listado de fichas con 29 PDF,
las diapositivas de 7.º (ecuaciones lineales, ángulos y polígonos, y el bloque A de la
geometría a la manera de los griegos, con su ficha 13) y las tres de 8.º
(factoreo, expresiones racionales y sistemas), la de ecuaciones de segundo grado de 9.º
(unidades 5 y 6), todas sobre el motor de la pizarra, con su
verificador; el panel de proyección, el timer de aula y el módulo de
progreso; y en OMAPA, las siete clases del cuadernillo de herramientas y las
fichas de alumno de OMAPA y Kanguro; y el módulo del Open House 2026, con
sus herramientas y su verificador, esperando la lista de alumnos.

Pendiente: los bloques B (construcciones) y C (triángulos) de la geometría griega de 7.º
(la currícula está en `Curricula_Geometria_7mo.md`, fuera del repositorio), el proyecto de estadística compartido por los tres grados (falta
definir el tema), las diapositivas de cuerpos geométricos de 9.º, el
material de circunferencia de 8.º,
las clases de OMAPA para los 25 arquetipos (hoy están los 7 bloques del
cuadernillo) y el etiquetado de los problemas que quedaron sin clasificar.
