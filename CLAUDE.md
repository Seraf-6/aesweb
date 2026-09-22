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
  8vo/factoreo.html         diapositivas                 ← escritas a mano
  8vo/sistemas.html         diapositivas                 ← escritas a mano
fichas/
  index.html                listado                      ← lo genera build.py
  pdf/<grado>/Ficha_NN.pdf  los archivos
omapa/index.html            módulo de olimpiada          ← lo genera build.py
assets/
  base.css                  colores, tipografía, notación, panel de proyección
  sitio.css                 navegación y portadas
  proyeccion.js             el panel de proyección
  img/                      logos
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

1. Copiar `matematica/8vo/factoreo.html` como punto de partida: ya tiene la
   barra de navegación, los enlaces a los assets y el `data-diapos`.
2. Escribir el contenido. Los componentes que ya existen y conviene reusar:
   `.caso`, `.forma`, `.pasos`, `.gancho`, `.lab`, `.ec`, `.cuenta`.
3. Agregar la entrada en `contenido.py`, dentro del `material` de la unidad
   que corresponda, con `'tipo': 'diapositiva'` y su `url`.
4. `python build.py`.

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
las diapositivas de ecuaciones lineales de 7.º,
dos juegos de diapositivas de 8.º (factoreo y sistemas), el panel de proyección.

Pendiente: el proyecto de estadística compartido por los tres grados (falta
definir el tema), diapositivas de Pitágoras para 7.º, de cuerpos geométricos
para 9.º, de la parábola para 9.º, y todo el contenido de OMAPA.
