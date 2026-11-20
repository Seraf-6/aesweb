# Editor de valoraciones · herramienta para AESWeb

Hay que construir una herramienta dentro de este repositorio para armar,
editar e imprimir las valoraciones escritas de Matemática del Tercer Ciclo.
Hoy las valoraciones se componen con LaTeX desde fuera del repo, y para
cambiarle una palabra o un coeficiente a un ítem hay que recompilar todo.
La idea es que Juan abra una página, edite el texto y las ecuaciones,
vea el resultado al instante y mande a imprimir.

**El motor de cálculo ya está escrito y probado. No lo reescribas.** Está en
`valoraciones/motor.js` y sus pruebas en `valoraciones/prueba_motor.js`
(`node valoraciones/prueba_motor.js` → 0 discrepancias). Tu trabajo es la
página: el editor y las vistas de impresión.

---

## 1. La regla dura: ningún contenido de valoración entra al repositorio

El repositorio es público. Las pruebas y sus claves no pueden estar acá, ni
siquiera como ejemplo o como semilla.

- **Lo que se versiona es la herramienta vacía**: el HTML, el motor, el CSS.
- **El contenido vive en el navegador de Juan** (`localStorage`), y se
  respalda exportando un `.json` que él guarda fuera del repo.
- No escribas valoraciones de ejemplo en el código. Si la herramienta
  necesita algo para no abrir en blanco, que sea **un ítem de muestra
  evidentemente ficticio** (una ecuación cualquiera), nunca una prueba real.
- Agregá al `.gitignore`, junto al bloque que ya existe para las claves:

  ```
  # El contenido de las valoraciones (enunciados, respuestas, claves) se
  # queda en el navegador y en los respaldos .json del docente.
  valoraciones/*.json
  valoraciones/respaldos/
  ```

Si en algún momento dudás de si algo va al repo: si tiene un enunciado o una
respuesta adentro, no va.

---

## 2. Dónde va

```
valoraciones/index.html      la herramienta (escrita a mano)
valoraciones/motor.js        el motor exacto — YA ESTÁ, no lo toques
valoraciones/prueba_motor.js sus pruebas — YA ESTÁN
valoraciones/editor.css      los estilos de pantalla y de impresión
```

Seguí las convenciones del repo: sin dependencias externas, sin paso de
compilación, se abre con doble clic y anda sin conexión. Reutilizá
`assets/base.css` si sirve, pero la hoja impresa tiene que verse como el
documento del colegio, no como el sitio.

Los logos ya están en `assets/img/aes.png` y `assets/img/einstein.png`.

**No la agregues al índice del sitio.** Es una herramienta del docente, no
material de alumno: no toques `contenido.py` ni la portada. Se entra por URL.
Sí dejala documentada en el `CLAUDE.md` del repo, en la sección de
estructura, para que no se pierda.

---

## 3. El motor que ya existe

Todo exacto con `BigInt`: nunca un `float`. Cubre lo que se da en 7.º, 8.º y
9.º y nada más — no es un CAS general y no hay que convertirlo en uno.

```js
MOTOR.analizar(texto)              // "3(x-1) = 2x+7" → árbol
MOTOR.html(arbol)                  // → HTML con fracciones y exponentes
MOTOR.tex(arbol)                   // → LaTeX (por si algún día hace falta)
MOTOR.CSS_MATEMATICA               // la hoja de estilo que ese HTML necesita

MOTOR.resolver("3(x-1) = 2x+7")
// → { tipo, incognita, grado, raices:[S], verificadas:[bool], texto, delta }

MOTOR.cuadratica("y = -2x^2 + 4x + 6")
// → { a,b,c, delta, raices, vertice:[x,y], ordenada, suma, producto,
//     abre:'arriba'|'abajo', extremo:'máximo'|'mínimo' }

MOTOR.factorizacion("x^5 - x", "x(x^2+1)(x-1)(x+1)")  // → { ok: true }
MOTOR.valorNumerico("2x^2 + x", "x = -3")             // → S (vale 15)
MOTOR.htmlS(valor)                                    // un resultado en HTML
```

Dos cosas que importan de cómo está hecho, y que hay que respetar:

- **Lo que se imprime es lo que se escribió.** Si Juan escribe `3(x-1)`, se
  imprime `3(x-1)`, no `3x-3`. El motor no normaliza nada.
- **La verificación va por otro camino que el cálculo.** `resolver` saca la
  raíz con la fórmula y después la sustituye en la ecuación *tal como está
  escrita*; `verificadas` dice si cerró. Para raíces irracionales la
  sustitución se hace en Q(√k), también exacta. Mostrá ese estado en la
  interfaz: si un ítem no verifica, tiene que verse.

La sintaxis de entrada es la que escribiría cualquiera: `3x`, `2(x-1)`,
`(x-3)/4`, `x^2`, `[` y `{` como agrupadores, `=` para la ecuación.

Cuando el texto está mal, el motor tira una excepción con un mensaje en
castellano pensado para que lo lea Juan («falta el signo =», «no entiendo el
símbolo «@»»). Mostralos tal cual, al lado del campo, sin convertirlos en
«Error».

---

## 4. El modelo de datos

```js
{
  grados: [{
    id: '7mo',
    nombre: '7.º grado',
    unidad: 'Unidad 7',
    numero: '7',                 // el que va en el título: UNIDAD N.º 7
    titulo: 'Ecuaciones lineales',
    capacidades: '…',            // texto largo, copiado del libro
    items: [ … ]
  }]
}

// un ítem
{
  id: 'a1b2',
  tema: 'T3 · Ecuaciones con paréntesis',
  indicador: 'Resuelve una ecuación lineal con paréntesis y verifica…',
  tipo: 'resolver',              // ver abajo
  enunciado: 'Resolvé y verificá tu resultado: {1}',
  formulas: ['9(x-1) - 4(x-3) = 2x + 18'],
  respuesta: '',                 // la calcula el motor, salvo en 'redactado'
  clave: 'Se distribuye…',        // el desarrollo, lo escribe Juan
  pts: 1.5,                      // 1 · 1,5 · 2 · 3
  espacio: 3.2                   // cm de espacio en blanco para resolver
}
```

`enunciado` es **prosa con marcadores `{1}`, `{2}`…** que se reemplazan por
las fórmulas renderizadas. Esto es lo que hace que Juan pueda editar «el
lenguaje» y «las ecuaciones» por separado, que es exactamente lo que pidió:
dos campos distintos, cada uno con su caja.

---

## 5. Los tipos de ítem

| tipo | qué pone Juan | qué hace el motor |
|---|---|---|
| `resolver` | una ecuación | la resuelve, la verifica por sustitución y escribe la respuesta |
| `cuadratica` | `ax²+bx+c=0` o `y=ax²+bx+c` | Δ, raíces, vértice, ordenada, suma y producto, máximo/mínimo |
| `factorizar` | la expresión **y** la forma factorizada | expande las dos y confirma que son idénticas |
| `valor` | una expresión y una sustitución (`x = -3`) | calcula el valor numérico |
| `redactado` | la respuesta a mano | nada: es un ítem conceptual («detectá el error», «¿cuál es la identidad?») |

En los cuatro primeros **la respuesta no se escribe a mano nunca**: sale del
motor y se muestra en vivo mientras Juan edita. En `redactado` el campo de
respuesta se habilita y queda marcado como «sin verificación automática», con
un color distinto, para que se vea cuáles dependen de él.

Para `cuadratica` el motor devuelve más datos de los que el ítem suele pedir.
Dejá que Juan elija con casillas cuáles entran en la respuesta final (raíces,
vértice, ordenada, Δ, suma y producto): un ítem pide las raíces y otro pide
el vértice, y la casilla del recuadro final tiene que traer solo lo que se
pidió.

---

## 6. El editor

Una sola pantalla, lista de ítems a la izquierda y el ítem abierto a la
derecha (o apilado en vertical si la pantalla es angosta: Juan a veces abre
esto desde el celular).

Por cada ítem, editable: tema, indicador, tipo, enunciado, fórmulas,
respuesta (solo si es `redactado`), clave, puntaje, espacio.

Mientras escribe, abajo del campo tiene que verse **el ítem renderizado como
va a salir impreso** y **la respuesta recalculada**, las dos en vivo.

Hace falta además:

- Agregar un ítem, duplicarlo y borrarlo (con confirmación propia en la
  página, nada de `confirm()`).
- Reordenar, arrastrando o con flechas arriba/abajo.
- **El puntaje total se recalcula solo**: es la suma de los `pts`, nunca un
  número fijo. Mostralo siempre visible.
- Exportar e importar el `.json` completo, para respaldo y para pasar de una
  computadora a otra.
- Guardado automático en `localStorage` después de cada cambio, envuelto en
  `try/catch` (puede fallar en ventana privada y la página tiene que seguir
  andando).

Avisos que tiene que dar, porque son errores que ya pasaron de verdad:

- Dos ítems con la misma respuesta final (confunde al corregir la rejilla).
- Un ítem cuya fórmula no parsea o cuya verificación no cierra.
- Un «justificá» o «explicá» en el enunciado de un ítem cuya respuesta es un
  número pelado: suele ser una justificación decorativa.
- La respuesta de un ítem escrita dentro de su propio enunciado.

---

## 7. Las dos filas

De cada valoración salen **dos filas, A y B, con exactamente los mismos
ítems** — no son dos pruebas distintas, es la misma movida de lugar.

La fila B rota los ítems de a tres: el grupo (a, b, c) sale (c, a, b); si
sobran dos, se intercambian. Así todos cambian de número y de altura en la
hoja, pero ninguno se corre más de dos lugares, así que la progresión de
dificultad se conserva y las dos filas siguen siendo la misma prueba.

```js
function orden(n, fila) {
  const idx = [...Array(n).keys()];
  if (fila !== 'B') return idx;
  let i = 0;
  for (; i + 3 <= n; i += 3) {
    [idx[i], idx[i+1], idx[i+2]] = [idx[i+2], idx[i], idx[i+1]];
  }
  if (n - i === 2) [idx[i], idx[i+1]] = [idx[i+1], idx[i]];
  return idx;
}
```

Los indicadores del encabezado se numeran según el orden de **cada fila**.

---

## 8. Las vistas de impresión

Tres: **Fila A**, **Fila B** y **Clave**. Se imprimen con Ctrl+P del
navegador y se guardan como PDF. Esta es la parte que más importa que salga
bien, porque es lo que termina en la mano del alumno.

### El formato es el del colegio y no se inventa

Hay un PDF de referencia que hay que mirar antes de maquetar:
`Proyecto OMAPA/04-valoraciones/Valoraciones septiembre/Valoración U5 - 7mo grado.pdf`,
y las reglas completas están en `Proyecto OMAPA/04-valoraciones/CLAUDE.md`
(sección «Formato institucional» y «Cómo tiene que ser una valoración escrita
de unidad»). Si esa carpeta no está conectada, pedile a Juan que la conecte.

Encabezado, de arriba hacia abajo:

1. Logo AES a la izquierda, logo Albert Einstein School a la derecha, y en el
   medio el bloque institucional centrado: **ALBERT EINSTEIN SCHOOL** /
   *Tercer Ciclo de la Educación Escolar Básica* / *Año lectivo 2026*.
2. Título en rojo: **VALORACIÓN ESCRITA — UNIDAD N.º _n_**.
3. Subtítulo en negrita: *Unidad n — Nombre de la unidad*.
4. Una línea: `Materia: Matemática • Grado: 7.º grado • Docentes: Eduardo Ovelar / Juan Serafini`.
   **Los docentes van siempre. La página del libro no va.**

Datos del alumno, dos renglones sin recuadro:

```
Nombre y apellido: ______________   Fila: ____   Fecha: ___/___/2026
T. P.: 25 puntos     P. O.: ______     Nota: ______
```

Va **«Fila», no «Sección»**. El puntaje es la suma de los `pts`.

Después:

5. **Capacidades e indicadores** en un recuadro de línea y en **letra muy
   chica** (~6,6 pt). Es información que coordinación pide pero que nadie
   lee: no se acorta el texto, se achica la letra. Cada indicador lleva entre
   paréntesis el número del ítem que lo evalúa, según el orden de esa fila.
6. Las consignas generales, breves.
7. Los ítems, numerados, cada uno con su puntaje al margen entre paréntesis
   (`(1 pto)`, `(1,5 ptos)`) y su espacio en blanco debajo, de la altura que
   dice `espacio`.
8. Al pie de la última hoja, el **recuadro de respuestas finales**: una
   rejilla de **3 filas de 5 casillas**, cada casilla con **solo el número
   del ítem** y el hueco. Sin rótulos del tipo `x =`: adelantan la forma del
   resultado, que muchas veces es la mitad de lo que se evalúa.

**No va tabla de conversión de puntaje a nota.** La conversión la hace Juan
al corregir.

### Impresión en blanco y negro

Las valoraciones se fotocopian. **Ningún recuadro con fondo pintado**: un
bloque gris sale como una mancha que compite con la letra y se come el tóner.
Todo recuadro es de línea; lo que se destaca va en negro y negrita. El único
color es el título del membrete. En CSS: `print-color-adjust` no se toca y no
se usan fondos que dependan de que el navegador los imprima.

### Lo que tiene que hacer el CSS de impresión

- `@page { size: A4; margin: 1.3cm 1.6cm 1.7cm; }`
- Que un ítem no se parta entre dos páginas: `break-inside: avoid`.
- Que el recuadro de respuestas no quede solo en una página huérfana.
- Pie de página con `Dpto. de Evaluación` / número / `Coordinación`.
- Que no se impriman los controles del editor: todo lo de la interfaz con
  `display: none` en `@media print`.

### La clave

Documento aparte, marcado **Uso exclusivo del docente**. Lleva cada ítem con
su tema, su indicador, su puntaje, su enunciado, la respuesta y el desarrollo,
y al final **las dos rejillas de respuestas ya completas, una por fila**, para
corregir comparando de un vistazo.

---

## 9. El verificador

El repo tiene la costumbre de que cada página traiga un guion que comprueba
sus cuentas (`verificacion/`). Esta no es la excepción, pero acá la mitad ya
está hecha: `valoraciones/prueba_motor.js` cubre el motor.

Agregá `valoraciones/prueba_pagina.js` (Node, sin dependencias) que levante
el HTML y compruebe lo que el motor no puede:

- Que las dos filas tengan exactamente los mismos ítems en distinto lugar.
- Que ninguna respuesta aparezca en el enunciado de su propio ítem.
- Que la vista de alumno no contenga ningún desarrollo de la clave.
- Que el total impreso sea la suma de los `pts`.
- Que la rejilla final tenga 3×5 casillas.
- Que no haya `background` pintado en las reglas de `@media print`.

---

## 10. Alcance: lo que NO hay que hacer

- No generar PDF por código (ni jsPDF ni html2canvas): se imprime con Ctrl+P
  y sale texto de verdad, no una imagen.
- No agregar bibliotecas. Ni KaTeX, ni MathJax, ni frameworks. El motor
  renderiza la matemática en HTML y CSS, y así la herramienta anda sin
  conexión.
- No tocar `motor.js` salvo que encuentres un error real; si lo encontrás,
  agregá primero el caso a `prueba_motor.js`.
- No extender el motor a trigonometría, logaritmos, sistemas ni grado 3:
  fuera del programa del ciclo.
- No subir contenido al repositorio. Ver la sección 1.
- No conectar esto con ningún servicio: sin cuentas, sin nube, sin API.

---

## 11. Cómo saber que está terminado

1. `node valoraciones/prueba_motor.js` y `node valoraciones/prueba_pagina.js`
   dan 0 discrepancias.
2. Abrir `valoraciones/index.html` con doble clic, **sin conexión**, y que
   ande completo.
3. Cargar un ítem de cada uno de los cinco tipos, editarle una ecuación y ver
   la respuesta recalcularse sola.
4. Imprimir las tres vistas a PDF y comparar el encabezado contra
   `Valoración U5 - 7mo grado.pdf`: tienen que coincidir.
5. `git status` limpio de cualquier `.json` con contenido.
