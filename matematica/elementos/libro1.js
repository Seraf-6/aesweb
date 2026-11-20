/* Los Elementos de Euclides, libro I: los datos.
   Lo que sigue al signo igual es JSON puro: verificacion/elementos_libro1.py
   lo lee tal cual. Cada entrada trae el texto de la edición de 1774 y un dicho más
   sencillo; el de Zamorano (1576) va en la historia. También la demostración paso
   a paso, lo que usa (usa), dónde aparece en clase (enClase) y, en las
   proposiciones, la construcción que se anima paso a paso (construccion,
   ver construcciones.js).
   Las citas de las ediciones antiguas se marcan [[id|texto]]: el texto es el
   del libro, y lleva a la entrada citada.
   Transcripción: ortografía original. En Zamorano, la ſ larga va como s, las
   abreviaturas se desarrollan (q̃ = que, cõ = con) y se sacan los puntos que
   rodeaban las letras de las figuras (.A B. = AB). */
window.LIBRO1 = {
  "fuentes": {
    "zam": {
      "nombre": "Rodrigo Zamorano, 1576",
      "titulo": "Los seis libros primeros de la geometría de Euclides",
      "lugar": "Sevilla, en casa de Alonso de la Barrera",
      "url": "https://commons.wikimedia.org/wiki/File:Los_Elementos_de_Euclides_(1576)_-_Libro_I.pdf"
    },
    "e1774": {
      "nombre": "Edición de 1774",
      "titulo": "Los seis primeros libros, y el undécimo, y duodécimo de los Elementos de Euclides, traducidos de nuevo sobre la versión latina de Federico Comandino, con las notas de Roberto Simson",
      "lugar": "Madrid, por D. Joachin Ibarra",
      "url": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Los_seis_primeros_libros_y_el_undecimo%2C_y_duodecimo_de_los_elementos_de_Euclides.pdf"
    }
  },
  "total": {
    "definicion": 23,
    "postulado": 5,
    "nocion": 5,
    "proposicion": 48
  },
  "entradas": [
    {
      "id": "def-1",
      "tipo": "definicion",
      "n": 1,
      "titulo": "El punto",
      "zam": {
        "num": "Definición 1",
        "escaneo": 15,
        "enun": "Punto es, cuya parte es ninguna."
      },
      "e1774": {
        "num": "Definición I",
        "pag": 1,
        "escaneo": 25,
        "enun": "Punto, ó signo es lo que no tiene partes, ó lo que no tiene magnitud."
      },
      "facil": "Un punto marca un lugar, y nada más: no tiene largo, ni ancho, ni espesor.",
      "usa": [],
      "historia": [
        "Euclides usa la palabra σημεῖον (semeîon), que quiere decir «señal» o «marca». Por eso la edición de 1774 dice «punto, ó signo».",
        "Es la definición más famosa del libro, y también la más discutida: dice lo que un punto no tiene, pero no dice lo que es."
      ],
      "enClase": []
    },
    {
      "id": "def-15",
      "tipo": "definicion",
      "n": 15,
      "titulo": "El círculo",
      "zam": {
        "num": "Definición 15",
        "escaneo": 16,
        "enun": "Circulo es vna figura llana contenida de vna linea, que se llama circunferencia, asta la qual todas las lineas que salieren de vn punto que este dentro cayendo en la circunferencia del mismo circulo son entre si yguales."
      },
      "e1774": {
        "num": "Definición XV",
        "pag": 3,
        "escaneo": 27,
        "enun": "Círculo es una figura plana contenida por una sola linea llamada circunferencia, á la qual todas las rectas tiradas de un punto, que está dentro de la figura, son iguales entre sí."
      },
      "facil": "Todos los puntos de la circunferencia están a la misma distancia de un punto de adentro. Ese punto es el centro (definición 16).",
      "usa": [],
      "historia": [
        "Para Euclides, el círculo es la figura entera, con lo de adentro; la línea que lo rodea es la circunferencia. En clase usamos «circunferencia» para la línea.",
        "Zamorano dice «figura llana» y la edición de 1774, «figura plana»: dos siglos después, la misma palabra ya se decía de otra manera."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-circunferencia",
          "slide": "d-circunferencia",
          "txt": "Geometría griega · bloque A · diapositiva «Circunferencia»"
        }
      ]
    },
    {
      "id": "post-1",
      "tipo": "postulado",
      "n": 1,
      "titulo": "La regla",
      "zam": {
        "num": "Petición 1",
        "escaneo": 20,
        "enun": "Tirar vna linea recta desde qualquier puncto asta qualquier puncto."
      },
      "e1774": {
        "num": "Postulado I",
        "pag": 5,
        "escaneo": 29,
        "enun": "Tirar una recta de qualquier punto á qualquier otro punto."
      },
      "facil": "Dos puntos siempre se pueden unir con la regla.",
      "usa": [],
      "historia": [
        "Euclides llamó a los postulados αἰτήματα (aitémata), «pedidos»: lo que se le pide al lector que acepte para poder empezar. Por eso Zamorano los llama «peticiones». «Postulado» viene del latín postulare, que también quiere decir pedir.",
        "Los tres primeros postulados son lo que hacen la regla y el compás. Con ellos se construye todo el libro.",
        "Euclides lo usa también en el sentido de que la recta que une dos puntos es una sola: en la proposición 4, si entre los mismos dos puntos hubiera dos rectas distintas, «encerrarían un espacio». La edición de 1774 lo cita como su axioma X, «dos líneas rectas no encierran espacio», y Zamorano como su décima común sentencia; las ediciones modernas lo consideran un agregado posterior a Euclides, y lo leen dentro de este postulado."
      ],
      "enClase": []
    },
    {
      "id": "post-3",
      "tipo": "postulado",
      "n": 3,
      "titulo": "El compás",
      "zam": {
        "num": "Petición 3",
        "escaneo": 20,
        "enun": "Sobre qualquier centro y distancia describir vn circulo."
      },
      "e1774": {
        "num": "Postulado III",
        "pag": 5,
        "escaneo": 29,
        "enun": "Con qualquier centro, é intervalo describir un círculo."
      },
      "facil": "Con el compás se dibuja una circunferencia con el centro y la abertura que uno quiera.",
      "usa": [],
      "historia": [
        "Se suele decir que el compás de Euclides se cierra al levantarlo del papel: sirve para trazar una circunferencia, pero no para llevar una medida de un lugar a otro. Por eso la proposición 2 enseña a copiar un segmento con un compás así."
      ],
      "enClase": []
    },
    {
      "id": "nc-1",
      "tipo": "nocion",
      "n": 1,
      "titulo": "Iguales a lo mismo",
      "zam": {
        "num": "Común sentencia 1",
        "escaneo": 21,
        "enun": "Las cosas que a vna misma son yguales tambien entre si son yguales."
      },
      "e1774": {
        "num": "Axioma I",
        "pag": 5,
        "escaneo": 29,
        "enun": "Las cantidades iguales á una misma son iguales entre sí."
      },
      "facil": "Si a = c y b = c, entonces a = b.",
      "usa": [],
      "historia": [
        "Euclides las llamó κοιναὶ ἔννοιαι, «nociones comunes»: verdades que valen para cualquier cantidad, no solo en geometría. Zamorano las llama «comunes sentencias» y la edición de 1774, «axiomas».",
        "Zamorano trae diez y la edición de 1774, doce (entre ellas, el postulado de las paralelas). Hoy se cuentan cinco: las demás se consideran agregados de copistas y editores posteriores."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-n1",
          "slide": "d-n1",
          "txt": "Geometría griega · bloque A · diapositiva «Iguales a lo mismo» (N1)"
        }
      ]
    },
    {
      "id": "prop-1",
      "tipo": "proposicion",
      "n": 1,
      "clase": "problema",
      "titulo": "El triángulo equilátero",
      "zam": {
        "num": "Problema primero, proposition primera",
        "escaneo": 23,
        "enun": "Sobre vna linea recta dada terminada hazer vn triangulo equilatero.",
        "dem": "Sea la linea recta dada terminada AB, conuiene descreuir sobre AB vn triangulo equilatero. Sobre el centro A y segun el espacio AB descriuase el circulo BCD [[post-3|(por la tercera petition)]]. Y tambien [[post-3|(por la misma)]] sobre el centro B y en el espacio BA descriuase el otro circulo ACE. Y [[post-1|(por la primera petition)]] desde el puncto C, donde los circulos se cortan, tirense las lineas rectas CA, CB asta los punctos A, B. Y porque el puncto A es centro del circulo CBD, sera ygual la linea AC a la linea AB [[def-15|(por la decima quinta definition)]]. Item porque el puncto B es centro del circulo CAE, sera ygual la linea BC a la linea AB; luego ambas CA y la CB son yguales a la linea AB. Y las cosas que a vna son yguales, entre si son yguales [[nc-1|(por la primera comun sentencia)]]; luego la linea AC es ygual a la linea CB; luego las tres lineas CA, AB, BC son yguales entre si. Sera pues equilatero el triangulo ABC, y fabricado sobre la linea recta dada terminada AB, lo qual conuino hazerse."
      },
      "e1774": {
        "num": "Proposición I. Problema",
        "pag": 7,
        "escaneo": 31,
        "enun": "Sobre una recta* dada terminada construir un triángulo equilátero.",
        "dem": "Sea la recta dada terminada AB; y háyase de construir sobre ella un triángulo equilátero. Con centro A, é intervalo AB descríbase un círculo BCD [[post-3|a Postulado 3]]; asimismo con centro B, é intervalo BA descríbase el círculo ACE; y desde el punto C, donde se cortan mutuamente las circunferencias de los círculos, tírense las rectas CA, CB [[post-1|b Post. 1]] á los puntos A, B; y resultará el triángulo equilátero ABC. Porque siendo el punto A centro del círculo BCD, será igual la recta AC á la AB [[def-15|c Definición 15]]: asimismo siendo el punto B centro del círculo CAE, será la recta BC igual á la recta BA: y yá está demostrado, que la recta CA es igual á la AB; luego ambas rectas CA, y CB son iguales á AB: es así que las cantidades iguales á una misma son iguales entre sí [[nc-1|d Axioma 1]]: luego la recta CA es igual á la CB. Luego las tres rectas CA, AB, BC son iguales entre sí. Por consiguiente será ABC un triángulo equilátero, y estará construido sobre la recta dada terminada AB. Lo que debia hacerse.",
        "nota": "* N. T. Usamos promiscuamente de las voces linea, y recta para expresar la linea recta."
      },
      "facil": "Con la regla y el compás, sobre cualquier segmento se puede hacer un triángulo de tres lados iguales.",
      "pasos": [
        [
          "Sea AB el segmento dado.",
          []
        ],
        [
          "Con centro A y radio AB trazo la circunferencia. Hay una sola: un centro y un radio la determinan.",
          [
            "post-3"
          ]
        ],
        [
          "Con centro B y radio BA trazo la otra circunferencia.",
          [
            "post-3"
          ]
        ],
        [
          "Las dos circunferencias se cortan. Llamo C a uno de los puntos de corte, y trazo los segmentos CA y CB.",
          [
            "post-1"
          ]
        ],
        [
          "A es el centro de la primera circunferencia, y B y C están en ella: AC = AB.",
          [
            "def-15"
          ]
        ],
        [
          "B es el centro de la segunda circunferencia, y A y C están en ella: BC = BA.",
          [
            "def-15"
          ]
        ],
        [
          "CA y CB son iguales a AB, así que son iguales entre sí: CA = CB.",
          [
            "nc-1"
          ]
        ],
        [
          "Los tres lados CA, AB y BC son iguales: el triángulo ABC es equilátero, y está construido sobre AB.",
          []
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "post-3",
        "post-1",
        "def-15",
        "nc-1"
      ],
      "historia": [
        "Es la primera proposición del libro, y es una construcción, no un teorema. Por eso termina con «lo que debía hacerse» (en latín, quod erat faciendum). Los teoremas terminan con «lo que se quería demostrar», quod erat demonstrandum: de ahí viene el Q.E.D.",
        "Euclides no explica por qué las dos circunferencias se cortan en C: lo da por visto en el dibujo. Ese hueco se notó mucho después, y se cubrió con los axiomas de continuidad que se agregaron a la geometría entre los siglos XIX y XX.",
        "Euclides nombra cada circunferencia con tres de sus puntos: «el círculo BCD», «el círculo ACE». Por eso en su texto C aparece en el nombre antes de que se diga dónde está, y D y E son puntos que no se usan para nada más. En nuestra versión, como un centro y un radio alcanzan para determinar la circunferencia, la nombramos así y el punto C aparece recién cuando las dos se cortan."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 60 340 240",
        "puntos": {
          "A": [
            140,
            180
          ],
          "B": [
            240,
            180
          ],
          "C": [
            190,
            93.3975
          ]
        },
        "rotulos": {
          "A": [
            -6,
            20
          ],
          "B": [
            6,
            20
          ],
          "C": [
            0,
            -17
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B"
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "B",
              "pasa": [
                "B",
                "C"
              ]
            }
          ],
          [
            {
              "t": "circulo",
              "c": "B",
              "por": "A",
              "pasa": [
                "A",
                "C"
              ]
            }
          ],
          [
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "A"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "B"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "A",
                  "B"
                ]
              ]
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "B",
                  "A"
                ]
              ]
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "A"
                ],
                [
                  "C",
                  "B"
                ]
              ]
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ]
            }
          ]
        ]
      }
    },
    {
      "id": "def-20",
      "tipo": "definicion",
      "n": 20,
      "titulo": "Los triángulos según sus lados",
      "zam": {
        "num": "Definición 24",
        "escaneo": 18,
        "enun": "Otrosi de las figuras de tres lados triangulo equilatero es el que se contiene debajo de tres lados yguales."
      },
      "e1774": {
        "num": "Definiciones XXIV a XXVI",
        "pag": 3,
        "escaneo": 27,
        "enun": "De las figuras triláteras, triángulo equilátero es el que tiene todos sus lados iguales. Isósceles el que tiene solamente dos lados iguales. Escaleno el que tiene los tres lados desiguales."
      },
      "facil": "Un triángulo es equilátero si sus tres lados son iguales, isósceles si tiene solo dos iguales y escaleno si los tres son distintos.",
      "usa": [],
      "historia": [
        "Las tres palabras son griegas. «Isósceles» quiere decir «de piernas iguales» (ísos, igual, y skélos, pierna): los dos lados iguales son las piernas del triángulo. «Escaleno» viene de skalenós, «desparejo», «rengo».",
        "Para Euclides, un isósceles tiene «solamente» dos lados iguales: un equilátero no es isósceles. Hoy muchos libros dicen «al menos dos lados iguales», y entonces todo equilátero es también isósceles. Cuando se lee un problema hay que fijarse qué definición usa.",
        "Euclides junta las tres en una sola definición, la 20. Zamorano y la edición de 1774 las cuentan por separado: para ellos son la 24, la 25 y la 26.",
        "En el ejemplar de Zamorano que está escaneado, un lector de la época escribió notas a mano en el margen de estas definiciones: agrega nombres, como «polígonos», que el libro no trae."
      ],
      "enClase": []
    },
    {
      "id": "post-2",
      "tipo": "postulado",
      "n": 2,
      "titulo": "Prolongar",
      "zam": {
        "num": "Petición 2",
        "escaneo": 20,
        "enun": "Vna linea recta terminada estenderla continua y derechamente."
      },
      "e1774": {
        "num": "Postulado II",
        "pag": 5,
        "escaneo": 29,
        "enun": "Prolongar al infinito, y directamente una recta terminada."
      },
      "facil": "Un segmento siempre se puede alargar en línea recta, todo lo que haga falta.",
      "usa": [],
      "historia": [
        "Para Euclides, una «recta» es lo que hoy llamamos segmento: tiene principio y fin. Este postulado dice que siempre se puede alargar, con la regla, en la misma dirección.",
        "La edición de 1774 dice «al infinito», pero Euclides no lo dice: dice que se puede prolongar de manera continua, todo lo que haga falta. Los griegos evitaban hablar de líneas infinitas ya terminadas. La versión de Zamorano, «continua y derechamente», está más cerca del original."
      ],
      "enClase": []
    },
    {
      "id": "nc-3",
      "tipo": "nocion",
      "n": 3,
      "titulo": "Restar lo mismo",
      "zam": {
        "num": "Común sentencia 3",
        "escaneo": 21,
        "enun": "Y si de cosas yguales, se quitan cosas yguales las que quedaren seran yguales."
      },
      "e1774": {
        "num": "Axioma III",
        "pag": 6,
        "escaneo": 30,
        "enun": "Si de cantidades iguales se quitan cantidades iguales, los residuos serán iguales."
      },
      "facil": "Si a dos cosas iguales les saco lo mismo, lo que queda es igual: si a = b, entonces a − c = b − c.",
      "usa": [],
      "historia": [
        "Es lo que hacemos al resolver una ecuación: restar lo mismo de los dos lados del igual. La segunda noción común es la misma idea con la suma.",
        "En las clases del bloque A, la noción común N2 junta la segunda y la tercera de Euclides: «lo mismo de los dos lados»."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-n2",
          "slide": "d-n2",
          "txt": "Geometría griega · bloque A · diapositiva «Lo mismo de los dos lados» (N2)"
        }
      ]
    },
    {
      "id": "prop-2",
      "tipo": "proposicion",
      "n": 2,
      "clase": "problema",
      "titulo": "Copiar un segmento",
      "zam": {
        "num": "Problema segundo, proposition secunda",
        "escaneo": 24,
        "enun": "Hazer vna linea recta ygual a otra linea recta dada, desde vn puncto señalado.",
        "dem": "Sea el puncto señalado A y la linea recta dada BC, es menester desde el punto A tirar vna linea recta ygual a la linea recta BC. Tirese desde el puncto A asta el puncto B la linea recta AB [[post-1|(por la primera petition)]] y hagase sobre ella [[prop-1|(por la primera proposicion)]] vn triangulo equilatero, y sea DAB, y estiendanse les a la DA y a la DB las lineas AZ, BE derechamente [[post-2|(por la segunda petition)]] y sobre el centro B y en el espacio BC describase [[post-3|(por la tercera petition)]] el circulo CIT. Y tambien [[post-3|(por la misma)]] sobre el centro D y en el espacio DI describase el circulo IKL. Pues porque el puncto B es centro del circulo CIT, sera [[def-15|(por la decima quinta definition)]] la linea BC ygual a la linea BI, y porque el puncto D es centro del circulo IKL, sera [[def-15|(por la misma)]] ygual la linea DL a la linea DI, de las quales DA es ygual a la misma DB [[prop-1|(por la proposition precedente)]] luego la linea restante AL es ygual a la linea BI que resta [[nc-3|(por la tercera comun sententia)]] y esta demostrado que BC es ygual a la BI, luego la vna y la otra AL y BC es ygual a la BI, y las cosas que a vna misma son yguales [[nc-1|(por la primera comun sententia)]] son tambien entre si yguales, luego la linea AL es ygual a la BC. Hase pues tirado desde el punto dado A la linea recta AL ygual a la linea recta dada BC. Lo qual conuino hazerse."
      },
      "e1774": {
        "num": "Proposición II. Problema",
        "pag": 7,
        "escaneo": 31,
        "enun": "De un punto dado tirar una recta igual á otra dada.",
        "dem": "Sea el punto dado A, y la recta dada BC; y háyase de tirar desde dicho punto una recta igual á la BC. Tírese desde el punto A al punto B la recta AB [[post-1|a Post. 1]], y constrúyase sobre ella un triángulo equilátero DAB [[prop-1|b 1. I.]]: prolónguense DA, y DB [[post-2|c Post. 2]]; y con centro B, é intervalo BC descríbase el círculo CGH [[post-3|d Post. 3]]. Descríbase tambien con centro D, é intervalo DG el círculo GKL, y será AL la recta que se pide. Porque siendo el punto B centro del círculo CGH, será la recta BC igual á la BG [[def-15|e Def. 15]]. Y siendo del mismo modo D centro del círculo GKL, será la recta DL igual á la DG, de las quales la parte DA es igual á la parte DB; luego la restante AL será igual á la restante BG [[nc-3|f Axi. 3]]: pero ya queda demostrado, que la BC es igual á la BG: luego una y otra AL, y BC son iguales á la recta BG: es así que las cantidades iguales á una misma son iguales entre sí: luego tambien la recta AL es igual á la BC. Por consiguiente se ha tirado del punto dado A la recta AL igual á la recta dada BC: L. Q. D. H."
      },
      "facil": "Desde cualquier punto se puede trazar un segmento igual a uno dado, aunque el compás se cierre al levantarlo del papel.",
      "pasos": [
        [
          "Sean A el punto dado y BC el segmento dado.",
          []
        ],
        [
          "Trazo el segmento AB.",
          [
            "post-1"
          ]
        ],
        [
          "Sobre AB construyo un triángulo equilátero, como en la proposición 1. Llamo D a su tercer vértice.",
          [
            "prop-1"
          ]
        ],
        [
          "Prolongo DA más allá de A, y DB más allá de B.",
          [
            "post-2"
          ]
        ],
        [
          "Con centro B y radio BC trazo la circunferencia. Corta a la prolongación de DB en un punto: lo llamo G.",
          [
            "post-3"
          ]
        ],
        [
          "Con centro D y radio DG trazo la circunferencia. Corta a la prolongación de DA en un punto: lo llamo L.",
          [
            "post-3"
          ]
        ],
        [
          "B es el centro de la primera circunferencia, y C y G están en ella: BC = BG.",
          [
            "def-15"
          ]
        ],
        [
          "D es el centro de la segunda, y G y L están en ella: DL = DG.",
          [
            "def-15"
          ]
        ],
        [
          "El triángulo DAB es equilátero: DA = DB.",
          [
            "def-20"
          ]
        ],
        [
          "A DL y a DG, que son iguales, les saco DA y DB, que también son iguales: lo que queda es igual, AL = BG.",
          [
            "nc-3"
          ]
        ],
        [
          "AL y BC son iguales a BG, así que son iguales entre sí: AL = BC.",
          [
            "nc-1"
          ]
        ],
        [
          "AL sale del punto A y es igual a BC: es el segmento que se pedía.",
          []
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "post-1",
        "prop-1",
        "post-2",
        "post-3",
        "def-15",
        "def-20",
        "nc-3",
        "nc-1"
      ],
      "historia": [
        "¿Para qué tanto trabajo, si alcanza con abrir el compás en BC y llevarlo hasta A? Porque el postulado 3 solo permite trazar una circunferencia con un centro y un punto por donde pasa: no dice que el compás guarde la abertura al levantarlo. Muchos lo leen como un compás que se cierra solo. La proposición 2 muestra que con ese compás igual se puede copiar un segmento, y desde entonces se puede usar como si no se cerrara.",
        "Zamorano justifica que DA = DB «por la proposition precedente», la proposición 1. La edición de 1774 no da ninguna razón para ese paso. Nosotros lo apoyamos en la definición de triángulo equilátero.",
        "Proclo, un filósofo griego que comentó el libro I unos 750 años después de Euclides, ya notaba que la figura cambia según dónde esté el punto A respecto de BC, y analizaba los distintos casos."
      ],
      "enClase": [],
      "construccion": {
        "vb": "40 -38 330 335",
        "puntos": {
          "A": [
            250.0,
            150.0
          ],
          "B": [
            205.0,
            178.0
          ],
          "C": [
            117.0,
            178.0
          ],
          "D": [
            203.2513,
            125.0289
          ],
          "G": [
            207.9035,
            265.9521
          ],
          "L": [
            327.6205,
            191.4615
          ]
        },
        "rotulos": {
          "A": [
            14,
            -8
          ],
          "B": [
            -12,
            16
          ],
          "C": [
            -14,
            -2
          ],
          "D": [
            -14,
            -8
          ],
          "G": [
            15,
            6
          ],
          "L": [
            10,
            -14
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "D",
              "B",
              "G"
            ],
            [
              "D",
              "A",
              "L"
            ]
          ],
          "iguales": [
            [
              [
                "D",
                "A"
              ],
              [
                "D",
                "B"
              ],
              [
                "A",
                "B"
              ]
            ],
            [
              [
                "A",
                "L"
              ],
              [
                "B",
                "C"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C"
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "B"
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "B",
              "aux": true,
              "pasa": [
                "B",
                "D"
              ]
            },
            {
              "t": "circulo",
              "c": "B",
              "por": "A",
              "aux": true,
              "pasa": [
                "A",
                "D"
              ]
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "A"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "B"
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "D",
              "por": "A",
              "largo": 158
            },
            {
              "t": "prolonga",
              "desde": "D",
              "por": "B",
              "largo": 158
            }
          ],
          [
            {
              "t": "circulo",
              "c": "B",
              "por": "C",
              "pasa": [
                "C",
                "G"
              ]
            },
            {
              "t": "punto",
              "p": "G"
            }
          ],
          [
            {
              "t": "circulo",
              "c": "D",
              "por": "G",
              "pasa": [
                "G",
                "L"
              ]
            },
            {
              "t": "punto",
              "p": "L"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "B",
                  "G"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "L"
                ],
                [
                  "D",
                  "G"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "A"
                ],
                [
                  "D",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "L"
                ],
                [
                  "B",
                  "G"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "L"
                ],
                [
                  "B",
                  "C"
                ]
              ]
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "L"
            }
          ]
        ]
      },
      "desafio": {
        "enun": "Demostrar que el segmento AL que construye esta proposición forma siempre un ángulo de 120° con AB: el ángulo BAL mide 120°, esté donde esté el punto A.",
        "explora": "Construila en GeoGebra y arrastrá A, y después C. ¿Qué cambia en AL y qué se mantiene? ¿Se mantiene también el ángulo que forma AL con BC?",
        "geogebra": [
          "B = (0, 0)",
          "C = (4, 1)",
          "A = (2, 4)",
          "bc = Segmento(B, C)",
          "ab = Segmento(A, B)",
          "D = Rota(B, 60°, A)",
          "da = Segmento(D, A)",
          "db = Segmento(D, B)",
          "c3 = Circunferencia(B, C)",
          "G = B + Distancia(B, C) * VectorUnitario(Vector(D, B))",
          "c4 = Circunferencia(D, G)",
          "L = D + Distancia(D, G) * VectorUnitario(Vector(D, A))",
          "al = Segmento(A, L)",
          "α = Ángulo(L, A, B)",
          "SetLineStyle(c3, 1)",
          "SetLineStyle(c4, 1)"
        ],
        "necesita": [
          [
            "prop-1",
            "DAB es un triángulo equilátero."
          ],
          [
            "prop-5",
            "por su corolario, el equilátero tiene los tres ángulos iguales."
          ],
          [
            "prop-13",
            "si una recta cae sobre otra, los dos ángulos que forma suman dos rectos (180°)."
          ],
          [
            "prop-32",
            "los tres ángulos de un triángulo suman dos rectos (180°)."
          ]
        ],
        "pista": "L está en la prolongación de DA, más allá de A. ¿Qué ángulo forman entonces AD y AL? ¿Y cuánto mide el ángulo DAB?",
        "solucion": [
          "Por construcción, L está en la prolongación de DA más allá de A: D, A y L están alineados.",
          "La recta AB cae sobre la recta DL en el punto A. Por la proposición 13, los ángulos DAB y BAL suman dos rectos, 180°.",
          "DAB es un ángulo del triángulo equilátero DAB. Sus tres ángulos son iguales (corolario de la proposición 5) y suman 180° (proposición 32): cada uno mide 60°.",
          "Entonces BAL = 180° − 60° = 120°. No depende de dónde esté A, y tampoco de C: C solo decide el largo de AL, que es igual a BC.",
          "Con BC no pasa lo mismo: el ángulo entre AL y BC cambia según dónde estén A y C. Y si el equilátero se construye del otro lado de AB, AL sale girado 120° hacia el otro lado; si se une A con C en vez de con B, AL forma 120° con AC.",
          "Euclides no podría haberlo dicho en la proposición 2: las proposiciones 13 y 32 vienen mucho después. Por eso es un desafío para volver cuando lleguemos ahí."
        ]
      }
    },
    {
      "id": "prop-3",
      "tipo": "proposicion",
      "n": 3,
      "clase": "problema",
      "titulo": "Cortar un segmento igual a otro",
      "zam": {
        "num": "Problema tercero, proposicion tercera",
        "escaneo": 25,
        "enun": "Dadas dos lineas rectas desiguales, cortar de la mayor vna linea recta ygual a la menor.",
        "dem": "Sean dos lineas rectas dadas desiguales AB y C de las quales sea AB la mayor, conuiene cortar de la AB mayor vna linea recta ygual a la C menor. Tirese [[prop-2|(por la ʒ proposicion)]] desde el puncto A vna linea ygual a la linea recta C y sobre el centro A y la distantia AD dese [[post-3|(por la tercera peticion)]] el circulo DEZ. Y porque el puncto A es centro del circulo DEZ es ygual la linea AE a la AD, y la linea C es ygual a la misma AD, luego ambas AE y la C son yguales a la misma AD por lo qual tambien la linea AE es gual a la C. Dadas pues las dos lineas rectas desiguales AB, C se ha cortado de la AB mayor, la AE ygual a la C menor lo qual conuenia hazerse."
      },
      "e1774": {
        "num": "Proposición III. Problema",
        "pag": 8,
        "escaneo": 32,
        "enun": "Dadas dos rectas desiguales; cortar de la mayor una parte igual á la menor.",
        "dem": "Sean las dos rectas desiguales: AB la mayor, y C la menor; y háyase de cortar de la AB una parte igual á C. Tírese del punto A la recta AD [[prop-2|a 2. I.]] igual á la recta C; y con centro A, é intervalo AD descríbase un círculo DEF [[post-3|b Post. 3]], y será AE la parte que se pedia. Porque siendo A centro del círculo DEF, será igual la recta AE á la AD: tambien la recta C es igual á la AD: luego las dos AE, y C son iguales á la AD; por lo qual la recta AE es igual á la C. Dadas pues las dos rectas desiguales AB, y C, se ha cortado de la mayor AB una parte igual á la menor C. L. Q. D. H."
      },
      "facil": "De un segmento largo se puede cortar un pedazo igual a otro segmento más corto.",
      "pasos": [
        [
          "Sean AB y MN dos segmentos desiguales, y AB el mayor.",
          []
        ],
        [
          "Desde A tengo que trazar un segmento igual a MN. Lo hago con la construcción de la proposición 2:",
          [
            "prop-2"
          ]
        ],
        [
          "Trazo AM.",
          [
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Sobre AM construyo un triángulo equilátero, como en la proposición 1, y llamo P a su tercer vértice.",
          [
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Prolongo PA más allá de A, y PM más allá de M.",
          [
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro M y radio MN trazo la circunferencia. Corta a la prolongación de PM en un punto: lo llamo Q.",
          [
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro P y radio PQ trazo la circunferencia. Corta a la prolongación de PA en un punto: lo llamo D.",
          [
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Ya no necesito las ayudas: queda AD, igual a MN. Fijate que AD no quedó en la dirección de MN: el compás que se cierra no lleva el segmento de un lugar a otro, lo construye de nuevo, girado.",
          [
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro A y radio AD trazo la circunferencia. Como AD es más corto que AB, la circunferencia corta a AB: llamo E al punto de corte.",
          [
            "post-3"
          ]
        ],
        [
          "A es el centro de la circunferencia, y D y E están en ella: AE = AD.",
          [
            "def-15"
          ]
        ],
        [
          "AD es igual a MN: es lo que construimos en el paso 2.",
          []
        ],
        [
          "AE y MN son iguales a AD, así que son iguales entre sí: AE = MN.",
          [
            "nc-1"
          ]
        ],
        [
          "AE es el pedazo de AB igual a MN que se pedía.",
          []
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "prop-2",
        "post-3",
        "def-15",
        "nc-1"
      ],
      "historia": [
        "Euclides llama a este segmento «la recta C», con una sola letra, como si fuera una medida suelta. Nosotros le ponemos dos letras, MN, para que se vea dónde empieza y dónde termina.",
        "Esta es la primera vez que Euclides usa que un segmento es más corto que otro. Si MN fuera más largo que AB, la circunferencia pasaría por afuera de B y no cortaría a AB: por eso el enunciado pide que AB sea el mayor.",
        "En el paso 2 se ve lo que hace la proposición 2: el segmento AD no queda paralelo a MN, sino girado. Con un compás que se cierra al levantarlo no se puede «llevar» un segmento; hay que construirlo de nuevo. Con la proposición 2 y esta, ese compás ya hace todo lo que hace un compás común, y desde acá Euclides lo usa sin volver a explicarlo.",
        "Zamorano escribe «por la ʒ proposicion»: en la imprenta del siglo XVI, el 2 tenía esa forma, parecida a una z. Y al final se le escapó una errata: «es gual» por «es ygual». Las dos están así en el libro.",
        "Ninguna de las dos ediciones dice por qué AE = AD ni por qué AE = C: son la definición 15 y la primera noción común, que Euclides ya había usado en la proposición 1 y da por sabidas."
      ],
      "enClase": [],
      "construccion": {
        "vb": "28 12 404 316",
        "puntos": {
          "A": [
            150.0,
            215.0
          ],
          "B": [
            400.0,
            215.0
          ],
          "M": [
            130.0,
            160.0
          ],
          "N": [
            130.0,
            80.0
          ],
          "P": [
            187.6314,
            170.1795
          ],
          "Q": [
            51.2195,
            146.0849
          ],
          "D": [
            98.5589,
            276.2684
          ],
          "E": [
            230.0,
            215.0
          ]
        },
        "rotulos": {
          "A": [
            4,
            20
          ],
          "B": [
            12,
            16
          ],
          "M": [
            -15,
            4
          ],
          "N": [
            0,
            -16
          ],
          "P": [
            13,
            -10
          ],
          "Q": [
            -12,
            -13
          ],
          "D": [
            -14,
            10
          ],
          "E": [
            10,
            16
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "P",
              "A",
              "D"
            ],
            [
              "P",
              "M",
              "Q"
            ],
            [
              "A",
              "E",
              "B"
            ]
          ],
          "iguales": [
            [
              [
                "P",
                "A"
              ],
              [
                "P",
                "M"
              ],
              [
                "A",
                "M"
              ]
            ],
            [
              [
                "A",
                "D"
              ],
              [
                "M",
                "N"
              ],
              [
                "A",
                "E"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B"
            },
            {
              "t": "punto",
              "p": "M"
            },
            {
              "t": "punto",
              "p": "N"
            },
            {
              "t": "segmento",
              "a": "M",
              "b": "N"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "M",
                  "N"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "M",
              "aux": 7
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "M",
              "aux": true,
              "pasa": [
                "M",
                "P"
              ]
            },
            {
              "t": "circulo",
              "c": "M",
              "por": "A",
              "aux": true,
              "pasa": [
                "A",
                "P"
              ]
            },
            {
              "t": "punto",
              "p": "P",
              "aux": 7
            },
            {
              "t": "segmento",
              "a": "P",
              "b": "A",
              "aux": 7
            },
            {
              "t": "segmento",
              "a": "P",
              "b": "M",
              "aux": 7
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "P",
              "por": "A",
              "largo": 156.5,
              "aux": 7
            },
            {
              "t": "prolonga",
              "desde": "P",
              "por": "M",
              "largo": 156.5,
              "aux": 7
            }
          ],
          [
            {
              "t": "circulo",
              "c": "M",
              "por": "N",
              "aux": 7,
              "pasa": [
                "N",
                "Q"
              ]
            },
            {
              "t": "punto",
              "p": "Q",
              "aux": 7
            }
          ],
          [
            {
              "t": "circulo",
              "c": "P",
              "por": "Q",
              "aux": 7,
              "pasa": [
                "Q",
                "D"
              ]
            },
            {
              "t": "punto",
              "p": "D"
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "D"
                ],
                [
                  "M",
                  "N"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "D",
              "pasa": [
                "D",
                "E"
              ]
            },
            {
              "t": "punto",
              "p": "E"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "E"
                ],
                [
                  "A",
                  "D"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "D"
                ],
                [
                  "M",
                  "N"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "E"
                ],
                [
                  "M",
                  "N"
                ]
              ]
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "E"
            }
          ]
        ]
      }
    },
    {
      "id": "nc-4",
      "tipo": "nocion",
      "n": 4,
      "titulo": "Lo que coincide es igual",
      "zam": {
        "num": "Común sentencia 8",
        "escaneo": 22,
        "enun": "Las que entre si conuienen son yguales entre si."
      },
      "e1774": {
        "num": "Axioma VIII",
        "pag": 6,
        "escaneo": 30,
        "enun": "Las cantidades que mutuamente se ajustan, son iguales entre sí."
      },
      "facil": "Si una figura, puesta encima de otra, la cubre justo, sin que sobre ni falte nada, las dos son iguales.",
      "usa": [],
      "historia": [
        "Es la noción común que permite comparar figuras moviéndolas: se pone una encima de la otra y se mira si coinciden. Es la idea de la proposición 4.",
        "Zamorano dice «las que entre sí convienen»: convenir, en el castellano de entonces, era coincidir, encajar. La edición de 1774 dice «se ajustan».",
        "Mover una figura no es algo que se pueda hacer con regla y compás, y por eso muchos geómetras desconfiaron de esta noción. Euclides casi no la usa: casi solo en las proposiciones 4 y 8. En 1899 David Hilbert, al reescribir los fundamentos de la geometría, dejó de usar el movimiento y aceptó como axioma casi todo el contenido de la proposición 4."
      ],
      "enClase": []
    },
    {
      "id": "prop-4",
      "tipo": "proposicion",
      "n": 4,
      "clase": "teorema",
      "titulo": "Dos lados y el ángulo entre ellos",
      "zam": {
        "num": "Thorema primero, proposition quarta",
        "escaneo": 25,
        "enun": "Si dos triangulos tuuieren los dos lados yguales a los dos lados el vno y el otro al otro y al otro, y el angulo ygual al angulo contenido debajo de yguales lineas rectas, tendran la basis ygual a la basis, y el vn triangulo sera ygual al otro triangulo: y los de mas angulos seran yguales a los de mas angulos el vno al otro debajo de los quales se estienden yguales lados.",
        "dem": "Sean dos triangulos ABC, DEZ que tengan los dos lados, conuiene a saber AB, AC yguales a los dos lados que son DE, DZ el vno al otro, esto es, AB a la DE y AC a la DZ y el angulo BAC ygual al angulo EDZ. Digo que tambien la basis BC es ygual a la basis EZ. Y el triangulo ABC sera ygual al triangulo DEZ. Y los de mas angulos seran yguales a los demas angulos debaxo de los quales se estienden yguales lados, el vno al otro, esto es que el angulo ABC sera ygual al angulo DEZ. Y el ACB al angulo DZE. Porque sobrepuesto el triangulo ABC al triangulo DEZ y puesto el punto A sobre D y la linea recta AB sobre DE caera el puncto B tambien sobre el puncto E porque la linea AB es ygual a la DE (por la suposicion) y poniendo la linea AB sobre la linea DE caera tambien la linea recta AC sobre la linea DZ porque el angulo BAC es ygual al angulo EDZ (por la supposicion) Y porque la linea AC es ygual a la DZ (por la supposicion) caera pues el puncto C sobre el punto Z. Iten porque el puncto C cae sobre el puncto Z y el puncto B sobre el puncto E luego la basis BC cae sobre la basis EZ porque si cayendo B sobre E y C sobre Z la basis BC no cayese sobre la basis EZ dos lineas rectas cerrarian superficie: lo qual [[post-1|(por la 10 comun sententia)]] es imposible, luego cae la basis BC sobre la basis EZ y le es ygual por lo qual todo el triangulo ABC cae sobre todo el triangulo DEZ [[nc-4|(por la 8 comun sententia)]] y le es ygual y caeran tambien los de mas angulos [[nc-4|(por la misma)]] sobre los de mas angulos y les seran yguales, esto es el angulo ABC al angulo DEZ y el angulo ACB al angulo DEZ. Luego quando dos triangulos tuuieren los dos lados yguales a los dos lados el vno al otro y el angulo ygual al angulo contenido de yguales lineas rectas, tendran tambien la basis ygual a la basis, y el vn triangulo sera ygual al otro triangulo: y los de mas angulos seran yguales a los de mas angulos el vno al otro, debajo de los quales se estienden yguales lados, lo qual conuino demonstrarse."
      },
      "e1774": {
        "num": "Proposición IV. Teorema",
        "pag": 9,
        "escaneo": 33,
        "enun": "Si dos triángulos tienen dos lados del uno respectivamente iguales á dos lados del otro, é iguales los ángulos contenidos por estos lados, tendrán las bases iguales: el un triángulo será igual al otro; y los demas ángulos opuestos á lados iguales serán tambien iguales.",
        "dem": "Sean dos triángulos ABC, DEF, que tengan los dos lados AB, AC respectivamente iguales á los dos DE, DF; es á saber el lado AB igual al DE, y el AC al DF; y el ángulo BAC igual al EDF. Digo, que tambien la base BC será igual á la base EF, el triángulo ABC igual al triángulo DEF, é iguales los demás ángulos opuestos á lados iguales; esto es, que el ángulo ABC será igual al DEF, y el ACB al DFE. Porque sobrepuesto el triángulo ABC al DEF, y colocado el punto A sobre el D, y la recta AB sobre la DE, caerá tambien el punto B sobre el E, por ser la linea AB igual á la DE; y por consiguiente caerá del mismo modo la recta AC sobre la DF, pues el ángulo BAC es igual al EDF; por cuya razon el punto C caerá sobre el F, siendo la recta AC igual á la DF: ademas de esto el punto B coincide con el E: consiguientemente la base BC cae sobre la base EF; porque si cayendo el punto B sobre el E, y el C sobre el F, no cayera la base BC sobre la EF, dos rectas encerrarian espacio, lo qual es imposible [[post-1|a Axi. 10]]: por conseqüencia todo el triángulo ABC se ajustará al triángulo DEF, y será igual á él; y los ángulos restantes se ajustarán á los restantes, siendo al mismo tiempo iguales á ellos: es á saber el ángulo ABC al DEF, y el ACB al DFE. Luego si dos triángulos tuvieren &c. Lo que debia demostrarse."
      },
      "facil": "Si dos triángulos tienen dos lados iguales y también el ángulo que forman esos dos lados, son iguales en todo: el tercer lado y los otros dos ángulos también son iguales.",
      "pasos": [
        [
          "Sean ABC y DEF dos triángulos con AB = DE, AC = DF y el ángulo BAC igual al ángulo EDF.",
          []
        ],
        [
          "Muevo el triángulo ABC sin deformarlo, y pongo el punto A sobre el punto D.",
          [
            "nc-4"
          ]
        ],
        [
          "Lo giro alrededor de D hasta que AB quede sobre DE. Como AB = DE, el punto B cae justo sobre E.",
          [
            "nc-4"
          ]
        ],
        [
          "Como el ángulo BAC es igual al EDF, el lado AC cae sobre DF; y como AC = DF, el punto C cae justo sobre F.",
          [
            "nc-4"
          ]
        ],
        [
          "B está sobre E y C sobre F, así que BC cae sobre EF. Si no cayera, entre E y F habría dos rectas distintas, y por dos puntos pasa una sola recta.",
          [
            "post-1"
          ]
        ],
        [
          "Los dos triángulos coinciden por completo: son iguales. Entonces BC = EF, el ángulo ABC es igual al DEF y el ACB es igual al DFE.",
          [
            "nc-4"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "nc-4",
        "post-1"
      ],
      "historia": [
        "Es el primer teorema del libro: las tres proposiciones anteriores eran problemas, construcciones. Por eso es la primera que termina con «lo que se quería demostrar», en latín quod erat demonstrandum: de ahí viene el Q.E.D. que todavía se escribe al final de las demostraciones.",
        "Es lo que hoy se llama el criterio LAL (lado, ángulo, lado): alcanza con saber dos lados y el ángulo que forman para saber todo el triángulo.",
        "Euclides lo demuestra moviendo un triángulo hasta ponerlo encima del otro. Durante siglos se discutió si eso vale: con regla y compás no se puede «mover» una figura. En 1899 David Hilbert, al reescribir los fundamentos de la geometría, aceptó como axioma casi todo este teorema.",
        "Para decir que BC cae sobre EF, la edición de 1774 cita su axioma X, «dos líneas rectas no encierran espacio», y Zamorano su décima común sentencia. Las ediciones modernas no lo cuentan entre las nociones comunes de Euclides; nosotros lo leemos en el postulado 1: entre dos puntos hay una sola recta.",
        "Zamorano escribe «Thorema» en el título, y al final se le escapó una errata: «el angulo ACB al angulo DEZ», cuando tendría que decir DZE. Están así en el libro."
      ],
      "enClase": [],
      "construccion": {
        "vb": "7 22 422 220",
        "puntos": {
          "A": [
            85.0,
            50.0
          ],
          "B": [
            35.0,
            190.0
          ],
          "C": [
            160.0,
            175.0
          ],
          "D": [
            282.0,
            62.0
          ],
          "E": [
            293.2659,
            210.2332
          ],
          "F": [
            401.358,
            145.6879
          ]
        },
        "rotulos": {
          "A": [
            0,
            -16
          ],
          "B": [
            -13,
            10
          ],
          "C": [
            14,
            8
          ],
          "D": [
            0,
            -16
          ],
          "E": [
            -14,
            8
          ],
          "F": [
            14,
            8
          ]
        },
        "comprueba": {
          "congruentes": [
            [
              [
                "A",
                "B",
                "C"
              ],
              [
                "D",
                "E",
                "F"
              ]
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "D",
                "E"
              ]
            ],
            [
              [
                "A",
                "C"
              ],
              [
                "D",
                "F"
              ]
            ],
            [
              [
                "B",
                "C"
              ],
              [
                "E",
                "F"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "D",
                  "E"
                ]
              ]
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "D",
                  "F"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 1
            }
          ],
          [
            {
              "t": "mueve",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hacia": [
                "D",
                "E",
                "F"
              ],
              "fase": "traslada",
              "aux": true
            }
          ],
          [
            {
              "t": "mueve",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hacia": [
                "D",
                "E",
                "F"
              ],
              "fase": "gira"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "curva",
              "a": "E",
              "b": "F",
              "comba": 30,
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "E",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "E",
                  "F"
                ]
              ],
              "rayas": 3
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 2
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "F",
              "b": "D",
              "color": 2
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 3
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "D",
              "b": "E",
              "color": 3
            }
          ]
        ]
      }
    },
    {
      "id": "prop-5",
      "tipo": "proposicion",
      "n": 5,
      "clase": "teorema",
      "titulo": "Los ángulos de la base del isósceles",
      "zam": {
        "num": "Theorema ʒ, Proposition 5",
        "escaneo": 27,
        "enun": "Los angulos de los triangulos ysosceles que estan sobre la basis son entre si yguales. Y estendidas las lineas rectas yguales, seran tambien yguales entre si los angulos que estan debajo de la basis.",
        "dem": "Sea el triangulo ysosceles ABC que tenga el lado AB ygual al lado AC y estiendanse derechamente [[post-2|(por la segunda petition)]] las lineas BD, CE a las lineas AB, AC, digo que el angulo ABC es ygual al angulo ACB y el angulo CBD al angulo BCE. Tomese en la linea BD vn punto a caso y sea Z y cortese de la linea AE mayor [[prop-3|(por la tercera proposicion)]] vna ygual a la AZ menor y sea AI y juntense ZC y IB. Y porque AZ a la AI y AB a la AC son yguales, luego las dos ZA, AC son yguales a las dos IA, AB la vna a la otra, y cierran el angulo comun que es contenido debajo de ZAI luego la basis ZC es [[prop-4|(por la 4 proposicion)]] ygual a la basis IB y el triangulo AZC sera ygual al triangulo AIB y los demas angulos a los de mas angulos el vno al otro seran yguales, debajo de los quales se estienden yguales lados, esto es el angulo ACZ al angulo ABI, y el angulo AZC al angulo AIB. Y porque toda la AZ es ygual a toda la AI, de las quales la linea AB es ygual a la linea AC luego la que resta BZ es ygual [[nc-3|(por la 3 comun sentencia)]] a la CI que resta. Y esta demostrado que ZC es ygual a la misma BI luego las dos BZ, ZC son yguales a las dos CI, IB la vna a la otra, y el angulo BZC es ygual al angulo CIB [[prop-4|(por la 4 proposicion)]] y la BC es basis comun, luego el triangulo BZC sera ygual al triangulo CIB y los demas angulos a los demas angulos el vno al otro seran tambien yguales debaxo de los quales se estienden yguales lados [[prop-4|(por la misma)]] luego el angulo ZBC es ygual al angulo ICB y el angulo BCZ al angulo CBI son yguales. Pues porque todo el angulo ABI como esta demostrado es ygual a todo el angulo ACZ, de los quales CBI es ygual al angulo BCZ luego el angulo ABC que resta es ygual [[nc-3|(por la 3 comun sentencia)]] al angulo restante ACB y son sobre la basis del triangulo ABC, pero esta demostrado, que el angulo ZBC es ygual al angulo ICB, y esta debaxo de la basis. Luego de los triangulos ysosceles los angulos que estan sobre la basis son yguales entre si, y estendidas las lineas rectas yguales seran tambien yguales entre si los angulos que estan debaxo de la basis lo qual se auia de demostrar."
      },
      "e1774": {
        "num": "Proposición V. Teorema",
        "pag": 10,
        "escaneo": 34,
        "enun": "Los ángulos en la base del triángulo isósceles son iguales entre sí; y prolongados sus lados, serán tambien entre sí iguales los ángulos, que están debaxo de la base.",
        "dem": "Sea isósceles el triángulo ABC, y tenga el lado AB igual al AC; y prolónguense AB, AC. Digo, que el ángulo ABC será igual al ACB, y el CBD al BCE. Porque tómese qualquier punto F de la recta BD, y córtese de la linea mayor AE la parte AG [[prop-3|a 3. I.]] igual á AF menor, y tírense las rectas FC, GB. Siendo pues la AF igual á la AG, y la AB á la AC, las dos rectas FA, AC son respectivamente iguales á las dos GA, AB, y contienen el ángulo comun FAG: por conseqüencia la base FC será igual [[prop-4|b 4. I.]] á la base GB, el triángulo AFC igual al AGB, é iguales entre sí los ángulos ACF, ABG opuestos á los lados iguales AF, AG, como tambien los ángulos AFC, AGB opuestos á los lados AC, AB. Y por quanto la recta AF entera es igual á la AG, y su parte AB igual á la AC, será tambien la BF restante igual á la CG restante [[nc-3|c Axi. 3.]]; pero ya está demostrado, que FC es igual á GB: luego las dos BF, FC son respectivamente iguales á las dos CG, GB, y el ángulo BFC igual al CGB, y la BC base comun á ambos. Será pues el triángulo BFC igual al CGB, y los demas ángulos opuestos á lados iguales, respectivamente iguales entre sí: luego el ángulo FBC es igual al GCB, y están debaxo de la base; y el ángulo BCF igual al CBG. Así estando ya demostrada la igualdad del ángulo ABG total al total ACF, de los quales la parte CBG es igual á la BCF, serán por consiguiente los ángulos ABC, ACB iguales entre sí; y están sobre la base del triángulo ABC. Por consiguiente los ángulos &c. L. Q. D. D."
      },
      "facil": "En un triángulo isósceles, los dos ángulos de la base son iguales. Y si se prolongan los dos lados iguales, los ángulos que quedan debajo de la base también son iguales.",
      "corolario": {
        "e1774": "Todo triángulo equilátero es tambien equiángulo.",
        "facil": "Si un triángulo tiene los tres lados iguales, también tiene los tres ángulos iguales: es isósceles mirado desde cualquiera de sus vértices, así que cada par de ángulos es igual."
      },
      "pasos": [
        [
          "Sea ABC un triángulo isósceles, con AB = AC.",
          [
            "def-20"
          ]
        ],
        [
          "Prolongo AB más allá de B hasta un punto D, y AC más allá de C hasta un punto E.",
          [
            "post-2"
          ]
        ],
        [
          "Marco un punto cualquiera F en BD.",
          []
        ],
        [
          "Sobre AE corto un segmento igual a AF. Lo hago con la construcción de la proposición 3:",
          [
            "prop-3"
          ]
        ],
        [
          "AF ya sale de A, así que no hace falta llevarlo con la proposición 2: con centro A y radio AF trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "La circunferencia corta a AE en un punto: lo llamo G. F y G están en la circunferencia de centro A, así que AG = AF.",
          [
            "def-15"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo FC y GB.",
          [
            "post-1"
          ]
        ],
        [
          "Miro los triángulos AFC y AGB. Tienen AF = AG y AC = AB, y el ángulo en A es el mismo para los dos.",
          []
        ],
        [
          "Por la proposición 4, los dos triángulos son iguales: FC = GB, el ángulo AFC es igual al AGB, y el ángulo ACF es igual al ABG.",
          [
            "prop-4"
          ]
        ],
        [
          "AF es igual a AG. Si a cada uno le saco las partes iguales AB y AC, lo que queda también es igual: BF = CG.",
          [
            "nc-3"
          ]
        ],
        [
          "Miro ahora los triángulos BFC y CGB. Tienen BF = CG y FC = GB, y el ángulo BFC es igual al CGB: son los mismos ángulos AFC y AGB del paso 7.",
          []
        ],
        [
          "Por la proposición 4, también estos dos triángulos son iguales: el ángulo FBC es igual al GCB, y el ángulo BCF es igual al CBG.",
          [
            "prop-4"
          ]
        ],
        [
          "El ángulo ABG es igual al ACF, por el paso 7. Si a cada uno le saco los ángulos iguales CBG y BCF, lo que queda también es igual: el ángulo ABC es igual al ACB.",
          [
            "nc-3"
          ]
        ],
        [
          "Los ángulos de la base, ABC y ACB, son iguales. Y los que quedan debajo de la base, FBC y GCB, también: son los ángulos CBD y BCE del enunciado.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "def-20",
        "post-1",
        "post-2",
        "post-3",
        "def-15",
        "nc-3",
        "prop-3",
        "prop-4"
      ],
      "historia": [
        "Según Proclo, que escribió un comentario a este libro en el siglo V, el primero en notar que los ángulos de la base del isósceles son iguales fue Tales de Mileto, unos tres siglos antes de Euclides. Tales los llamaba «semejantes», no «iguales».",
        "En la Edad Media se la llamó «el puente de los asnos» (en latín, pons asinorum). Se suele explicar así: la figura, con los lados prolongados, parece un puente de caballetes, y ahí se quedaban los alumnos que no lograban cruzar al resto del libro.",
        "Hay un camino mucho más corto, que Proclo atribuye a Pappus de Alejandría: comparar el triángulo ABC con el mismo triángulo dado vuelta, ACB. Tienen AB = AC, AC = AB y el ángulo en A común, así que por la proposición 4 son iguales, y el ángulo B es igual al C. Euclides no lo hizo así, y no sabemos bien por qué; quizás no quería comparar un triángulo consigo mismo. Dio esta vuelta más larga, con dos pares de triángulos distintos.",
        "La segunda parte, la de los ángulos debajo de la base, parece sobrar: el enunciado no la necesita. Euclides la usa en la proposición 7. Y para la primera parte necesita igual pasar por debajo de la base: los triángulos BFC y CGB.",
        "En el paso 4, Euclides cita la proposición 3 entera, pero acá alcanza con el último paso: AF ya empieza en A, así que no hay que llevar ningún segmento, y basta un compás con centro A.",
        "En griego los puntos se llaman Ζ y Η, las letras sexta y séptima. En latín pasaron a ser F y G, también sexta y séptima: así los llama la edición de 1774. Zamorano, que tradujo del griego, puso Z por la Ζ e I por la Η: en el griego de su tiempo la eta se pronunciaba «i», y eso explicaría su elección.",
        "Zamorano cita la segunda petición para prolongar los lados, y la tercera común sentencia en las dos restas, la de segmentos y la de ángulos. La edición de 1774 no cita el postulado al prolongar y cita el axioma 3 solo en la resta de segmentos. Y el corolario del equilátero está en la edición de 1774, pero Zamorano no lo trae."
      ],
      "enClase": [],
      "construccion": {
        "vb": "40 8 320 275",
        "puntos": {
          "A": [
            200.0,
            30.0
          ],
          "B": [
            155.0,
            138.0
          ],
          "C": [
            245.0,
            138.0
          ],
          "D": [
            105.0,
            258.0
          ],
          "E": [
            295.0,
            258.0
          ],
          "F": [
            125.0,
            210.0
          ],
          "G": [
            275.0,
            210.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -15,
            -6
          ],
          "C": [
            15,
            -6
          ],
          "D": [
            -17,
            -4
          ],
          "E": [
            17,
            -4
          ],
          "F": [
            -15,
            -2
          ],
          "G": [
            15,
            -2
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "B",
              "F"
            ],
            [
              "A",
              "B",
              "D"
            ],
            [
              "A",
              "C",
              "G"
            ],
            [
              "A",
              "C",
              "E"
            ],
            [
              "A",
              "F",
              "D"
            ],
            [
              "A",
              "G",
              "E"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "A",
                "C"
              ]
            ],
            [
              [
                "A",
                "F"
              ],
              [
                "A",
                "G"
              ]
            ],
            [
              [
                "B",
                "F"
              ],
              [
                "C",
                "G"
              ]
            ],
            [
              [
                "F",
                "C"
              ],
              [
                "G",
                "B"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "A",
                  "C"
                ]
              ]
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "A",
              "por": "B",
              "largo": 257.0
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "prolonga",
              "desde": "A",
              "por": "C",
              "largo": 257.0
            },
            {
              "t": "punto",
              "p": "E"
            }
          ],
          [
            {
              "t": "punto",
              "p": "F"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "F",
              "aux": 6,
              "pasa": [
                "F",
                "G"
              ]
            }
          ],
          [
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "G"
                ],
                [
                  "A",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "segmento",
              "a": "F",
              "b": "C"
            },
            {
              "t": "segmento",
              "a": "G",
              "b": "B"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "F",
                "C"
              ],
              "aux": 9
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "G",
                "B"
              ],
              "tono": 2,
              "aux": 9
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "F"
                ],
                [
                  "A",
                  "G"
                ]
              ],
              "marca": false
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "F",
              "b": "G",
              "r": 26,
              "aux": 9,
              "color": 4
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "C"
                ],
                [
                  "G",
                  "B"
                ]
              ],
              "rayas": 3
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "A",
              "b": "C",
              "aux": 11,
              "color": 1
            },
            {
              "t": "angulo",
              "v": "G",
              "a": "B",
              "b": "A",
              "aux": 11,
              "color": 1
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "F",
              "r": 34,
              "aux": 11,
              "color": 2
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "G",
              "b": "A",
              "r": 34,
              "aux": 11,
              "color": 2
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "F"
                ],
                [
                  "C",
                  "G"
                ]
              ],
              "rayas": 2
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "B",
                "F",
                "C"
              ],
              "aux": 12
            },
            {
              "t": "relleno",
              "pts": [
                "C",
                "G",
                "B"
              ],
              "tono": 2,
              "aux": 12
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "F",
              "b": "C",
              "color": 3,
              "r": 20,
              "aux": 12
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "G",
              "color": 3,
              "r": 20,
              "aux": 12
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "F",
              "b": "B",
              "color": 4,
              "r": 36,
              "aux": 12
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "G",
              "color": 4,
              "r": 36,
              "aux": 12
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "F",
              "color": 2,
              "r": 40,
              "cuna": false,
              "aux": 13
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "G",
              "b": "A",
              "color": 2,
              "r": 40,
              "cuna": false,
              "aux": 13
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "F",
              "b": "B",
              "color": 4,
              "r": 24,
              "aux": 13
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "G",
              "color": 4,
              "r": 24,
              "aux": 13
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 24,
              "aux": 13
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "A",
              "color": 1,
              "r": 24,
              "aux": 13
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 1
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "A",
              "color": 1
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "F",
              "b": "C",
              "color": 3
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "G",
              "color": 3
            }
          ]
        ]
      }
    },
    {
      "id": "nc-5",
      "tipo": "nocion",
      "n": 5,
      "titulo": "El todo es mayor que la parte",
      "zam": {
        "num": "Común sentencia 9",
        "escaneo": 22,
        "enun": "El todo es mayor que su parte"
      },
      "e1774": {
        "num": "Axioma IX",
        "pag": 6,
        "escaneo": 30,
        "enun": "El todo es mayor que su parte."
      },
      "facil": "Una cosa entera es más grande que cualquier pedazo suyo: si a algo le falta un pedazo, ya no es igual al entero.",
      "usa": [],
      "historia": [
        "De las cinco nociones comunes que hoy se consideran de Euclides, es la única que no habla de cosas iguales sino de una mayor que otra.",
        "Es la que sostiene las demostraciones por el absurdo del libro: si un razonamiento termina en que una parte es igual al todo, algo de lo que se supuso era falso. La primera vez es en la proposición 6.",
        "Las dos ediciones la ponen novena: la de 1774 como axioma IX y Zamorano como su novena común sentencia. Entre medio, las dos tienen nociones que las ediciones modernas consideran agregadas después de Euclides."
      ],
      "enClase": []
    },
    {
      "id": "prop-6",
      "tipo": "proposicion",
      "n": 6,
      "clase": "teorema",
      "titulo": "Ángulos iguales, lados iguales",
      "zam": {
        "num": "Theorema 3, Proposiciou 6",
        "escaneo": 28,
        "enun": "Si los dos angulos del triangulo fueren yguales entre si, tambien los lados que estan debaxo de yguales angulos seran yguales entre si.",
        "dem": "Sea el triangulo ABC que tenga al angulo ABC ygual al angulo ACB, digo que tambien el lado AB es ygual al lado AC porque si no es ygual el lado AB al lado AC el vno dellos sera mayor, sea AB mayor y [[prop-3|(por la 3 proposicion)]] cortese del mayor AB vna linea ygual a la AC y esta sea DB y tirese la linea DC [[post-1|(por la 3 peticion)]]. Pues porque el lado DB es ygual al lado AC y comun la linea BC, luego los dos lados DB, BC son yguales a los dos lados AC, CB el vno al otro, y el angulo DBC al angulo ACB por la supposicion, luego la basis DC [[prop-4|(por la 4 proposicion)]] es ygual a la basis AB y el triangulo DBC sera ygual, [[prop-4|por la misma]], al triangulo ACB, es a saber el menor al mayor, lo qual es impossible. Luego el lado AB no es desigual al lado AC. Sera pues ygual. Luego si los dos angulos de vn triangulo fueren yguales entre si, tambien seran yguales los lados entre si, que se estienden debaxo de yguales angulos, lo qual se hauia de demostrar."
      },
      "e1774": {
        "num": "Proposición VI. Teorema",
        "pag": 11,
        "escaneo": 35,
        "enun": "Si dos ángulos de un triángulo fuesen entre sí iguales, tambien lo serán los lados opuestos á ellos.",
        "dem": "Sea el triángulo ABC, que tenga el ángulo ABC igual al ACB. Digo, que tambien el lado AB será igual al lado AC. Porque si la recta AB no es igual á la AC, una de las dos será mayor. Séalo AB, y córtese de ella BD igual á la recta menor AC, y tírese DC: siendo DB igual á AC, y BC comun, las dos DB, BC serían iguales respectivamente á las dos AC, CB, y el ángulo DBC igual al ACB: luego la base DC sería igual á la base AB, y el triángulo DBC igual [[prop-4|a 4. I.]] al ACB, el menor al mayor; lo qual es absurdo: luego la recta AB no es desigual á la AC. Será pues igual. Por consiguiente si dos &c. L. Q. D. D."
      },
      "facil": "Si un triángulo tiene dos ángulos iguales, los lados opuestos a esos ángulos también son iguales: el triángulo es isósceles. Es la proposición 5 dada vuelta.",
      "corolario": {
        "e1774": "Todo triángulo equiángulo es equilátero.",
        "facil": "Si un triángulo tiene los tres ángulos iguales, también tiene los tres lados iguales. Junto con el corolario de la proposición 5: un triángulo es equilátero justo cuando es equiángulo."
      },
      "pasos": [
        [
          "Sea ABC un triángulo con el ángulo ABC igual al ACB.",
          []
        ],
        [
          "Supongo que AB y AC no son iguales. Entonces uno de los dos es mayor: digamos AB. Dibujo la figura así, como si fuera cierto, para ver adónde lleva.",
          []
        ],
        [
          "De AB corto un segmento igual a AC, desde B. Lo hago con la construcción de la proposición 3:",
          [
            "prop-3"
          ]
        ],
        [
          "Desde B trazo un segmento BM igual a AC, con la construcción de la proposición 2.",
          [
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro B y radio BM trazo la circunferencia. Corta a BA en un punto: lo llamo D. BD = BM y BM = AC, así que BD = AC.",
          [
            "post-3",
            "def-15",
            "nc-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo DC.",
          [
            "post-1"
          ]
        ],
        [
          "Miro los triángulos DBC y ACB. Tienen DB = AC y el lado BC en común; y el ángulo DBC, que es el mismo ABC, es igual al ACB.",
          []
        ],
        [
          "Por la proposición 4, los dos triángulos serían iguales.",
          [
            "prop-4"
          ]
        ],
        [
          "Pero el triángulo DBC es solo una parte del ACB: le falta el pedazo ADC. Una parte no puede ser igual al todo.",
          [
            "nc-5"
          ]
        ],
        [
          "Suponer que AB es mayor que AC lleva a algo imposible: entonces no lo es. Con el mismo razonamiento, AC tampoco es mayor que AB. Así que AB = AC, y la figura no se podía dibujar como la dibujamos.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-3",
        "prop-2",
        "post-3",
        "def-15",
        "nc-1",
        "post-1",
        "prop-4",
        "nc-5"
      ],
      "historia": [
        "Es la primera demostración por el absurdo del libro (en latín, reductio ad absurdum): se supone lo contrario de lo que se quiere probar y se razona hasta llegar a algo imposible. Si el razonamiento está bien hecho, lo que estaba mal era la suposición.",
        "Por eso la figura está mal a propósito: dibuja un triángulo con AB más largo que AC y los ángulos en B y en C iguales, que es justo lo que no puede pasar. La de Euclides también es así.",
        "Es también la primera recíproca de los Elementos: la proposición 5 va de los lados iguales a los ángulos iguales, y esta va de vuelta, de los ángulos a los lados.",
        "Ninguna de las dos ediciones cita por qué es imposible que «el menor» sea igual «al mayor»: es la noción común 5, el todo es mayor que su parte.",
        "La edición de 1774 no cita la proposición 3 para cortar BD; Zamorano sí. En el paso 3 se ve la construcción de la proposición 3, y su primer paso, el de la proposición 2, se muestra con el segmento AC que viaja hasta B. Como en la proposición 3, queda girado.",
        "Zamorano escribe «Proposiciou» en el título: en la imprenta se dio vuelta una n, que quedó como u. Y para trazar DC cita «la 3 peticion», que es la de la circunferencia; la que corresponde es la primera."
      ],
      "enClase": [],
      "construccion": {
        "vb": "10 4 380 304",
        "puntos": {
          "A": [
            220.0,
            40.0
          ],
          "B": [
            94.0,
            208.0
          ],
          "C": [
            290.0,
            208.0
          ],
          "D": [
            203.2,
            62.4
          ],
          "M": [
            262.0,
            278.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -15
          ],
          "B": [
            -14,
            8
          ],
          "C": [
            14,
            8
          ],
          "D": [
            -15,
            -4
          ],
          "M": [
            14,
            8
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "D",
              "A"
            ]
          ],
          "iguales": [
            [
              [
                "B",
                "D"
              ],
              [
                "A",
                "C"
              ],
              [
                "B",
                "M"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 1
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "A",
              "color": 1
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "copia",
              "de": [
                "A",
                "C"
              ],
              "a": "B",
              "hacia": "M",
              "aux": 5
            },
            {
              "t": "punto",
              "p": "M",
              "aux": 5
            }
          ],
          [
            {
              "t": "circulo",
              "c": "B",
              "por": "M",
              "aux": true,
              "pasa": [
                "M",
                "D"
              ]
            },
            {
              "t": "punto",
              "p": "D",
              "hasta": 9
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "D"
                ],
                [
                  "A",
                  "C"
                ]
              ],
              "hasta": 9
            }
          ],
          [
            {
              "t": "segmento",
              "a": "D",
              "b": "C",
              "hasta": 9
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "C",
                "B"
              ],
              "aux": 8
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C"
              ],
              "tono": 2,
              "aux": 8
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "B"
                ],
                [
                  "A",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C"
              ],
              "tono": 2,
              "aux": 9
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "D",
                "C"
              ],
              "aux": 9
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "B"
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-7",
      "tipo": "proposicion",
      "n": 7,
      "clase": "teorema",
      "titulo": "No hay dos triángulos iguales del mismo lado",
      "zam": {
        "num": "Theorema 4, Proposition 7",
        "escaneo": 29,
        "enun": "Sobre vna misma linea recta no se daran dos lineas rectas yguales a otras dos lineas rectas, la vna a la otra que concurran en otro puncto diuerso, teniendo vnos mismos terminos con las primeras lineas rectas.",
        "dem": "Porque si es possible, dese sobre vna misma linea recta AB a las dos lineas rectas AC, CB otras dos lineas rectas AD, DB yguales la vna a la otra que concurran en diuersos punctos que sean C, D hazia vnas mismas partes, conuiene a saber hazia CD teniendo vnos mismos terminos que son AB. De manera que CA sea ygual a la DA teniendo el mismo termino que es A y la CB a la DB teniendo el mismo termino que es B, juntese CD [[post-1|(por la 1 peticion)]]. Pues porque AC es ygual a la AD, sera tambien ygual el angulo ACD al angulo ADC. Es pues el angulo ADC menor que el angulo BDC, luego menor es el angulo ACD que el angulo BDC. Sera pues mucho menor el angulo BCD que el angulo BDC, luego mucho es menor el angulo BCD que el angulo BDC. De mas desto porque BC es ygual a la DB, es luego ygual tambien el angulo BCD al angulo CDB, y esta ya demostrado que es mucho menor, lo qual es impossible. Luego sobre vna misma recta linea, a dos mismas lineas rectas no se daran otras dos lineas rectas yguales la vna a la otra que concurran en diuersos punctos hazia vnas mismas partes, teniendo los mismos terminos con las primeras lineas rectas. Lo qual conuino demonstrarse."
      },
      "e1774": {
        "num": "Proposición VII. Teorema",
        "pag": 11,
        "escaneo": 35,
        "enun": "Sobre una misma base, y ácia una misma parte no se pueden construir dos triángulos, que tengan entre sí iguales cada dos lados, que salen de un extremo de ella.",
        "dem": "Si se pudiesen construir, sean sobre la misma base AB, y ácia una misma parte los dos triángulos ACB, ADB, que tengan iguales entre sí los lados CA, DA, y los CB, DB. Tírese la recta CD: ó el vértice del un triángulo estaría dentro del otro triángulo, ó fuera de él. Supóngase primeramente, que esté fuera; entonces por quanto el lado AC es igual al AD, será tambien el ángulo ACD igual al ADC [[prop-5|a 5. I.]]: es así que el ACD es mayor que el BCD: luego el ADC es mayor que el BCD: por conseqüencia el ángulo BDC será mucho mayor que el BCD. Ademas siendo el lado CB igual al DB, sería tambien el ángulo BDC igual [[prop-5|b 5. I.]] al BCD; lo qual es imposible, pues queda demostrado ser mayor. Pero supóngase, que el vértice de uno de los dos triángulos, por exemplo el D, esté dentro del otro: prolónguense AC, AD hasta E, F; y en tal caso siendo el lado AC igual al AD, serán iguales entre sí los ángulos ECD, FDC debaxo de la base: es así que el ángulo ECD es mayor que el BCD, y por consiguiente el ángulo FDC mayor que el BCD: luego es mucho mayor el ángulo BDC que el BCD. A mas, como se ha supuesto el lado CB igual al DB, será el ángulo BDC igual al BCD: es así que esto es imposible, pues ya se ha demostrado ser el ángulo BDC mayor que el BCD: y el caso en que el vértice de un triángulo cae en uno de los lados del otro, no necesita de demostracion. Por consiguiente sobre &c. L. Q. D. D."
      },
      "facil": "Sobre un mismo segmento AB, y del mismo lado del plano, no puede haber dos triángulos distintos con los lados que salen de A iguales y los que salen de B iguales. Dicho de otra manera: si se conocen los tres lados, el triángulo queda fijo.",
      "pasos": [
        [
          "Supongo que sobre la base AB, y del mismo lado, hay dos triángulos ACB y ADB, con AC = AD y BC = BD. Dibujo la figura como si fuera posible, para ver adónde lleva.",
          []
        ],
        [
          "Puede ser que el vértice de cada uno quede afuera del otro triángulo, o que uno quede adentro. Primero, afuera: trazo CD.",
          [
            "post-1"
          ]
        ],
        [
          "En el triángulo ACD, AC = AD. Por la proposición 5, el ángulo ACD es igual al ADC.",
          [
            "prop-5"
          ]
        ],
        [
          "El ángulo ADC es una parte del BDC, así que es menor. Entonces ACD, que es igual al ADC, también es menor que BDC.",
          [
            "nc-5"
          ]
        ],
        [
          "Y BCD es una parte de ACD, así que es todavía más chico: BCD es mucho menor que BDC.",
          [
            "nc-5"
          ]
        ],
        [
          "Pero BC = BD: por la proposición 5, en el triángulo BCD el ángulo BCD es igual al BDC. No puede ser igual y mucho menor a la vez: este caso es imposible.",
          [
            "prop-5"
          ]
        ],
        [
          "Ahora el otro caso: el vértice D queda adentro del triángulo ACB. Vuelvo a dibujar la figura así, otra vez con AC = AD y BC = BD.",
          []
        ],
        [
          "Trazo CD. Prolongo AC más allá de C hasta un punto E, y AD más allá de D hasta un punto F.",
          [
            "post-1",
            "post-2"
          ]
        ],
        [
          "En el triángulo ACD, AC = AD. Por la proposición 5, los ángulos que quedan debajo de la base CD son iguales: ECD es igual a FDC.",
          [
            "prop-5"
          ]
        ],
        [
          "BCD es una parte de ECD, así que es menor que ECD, y por lo tanto menor que FDC. Y FDC es una parte de BDC: BCD es mucho menor que BDC.",
          [
            "nc-5"
          ]
        ],
        [
          "Pero BC = BD: por la proposición 5, el ángulo BCD es igual al BDC. Otra vez, imposible.",
          [
            "prop-5"
          ]
        ],
        [
          "Falta el caso en que D cae justo sobre un lado del otro triángulo, por ejemplo sobre CB: entonces BD es solo una parte de BC, y no puede ser igual. En ningún caso pueden existir los dos triángulos.",
          [
            "nc-5"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-1",
        "post-2",
        "prop-5",
        "nc-5"
      ],
      "historia": [
        "Es una proposición de paso: Euclides la necesita solo para demostrar la siguiente, la 8, que dice que dos triángulos con los tres lados iguales son iguales. Por eso el dicho más sencillo termina con «el triángulo queda fijo».",
        "Las dos figuras están mal a propósito, como en la proposición 6: dibujan lo que la demostración prueba que no puede pasar. En las nuestras, AC = AD se cumple, pero BC y BD no miden lo mismo, aunque estén marcados como iguales.",
        "Zamorano trae un solo caso, el de los vértices afuera, como el texto griego de Euclides. El caso del vértice adentro ya lo discute Proclo en su comentario, y la edición de 1774 lo trae. Usa la segunda parte de la proposición 5, la de los ángulos debajo de la base: para eso sirve.",
        "El enunciado de Zamorano habla de líneas, no de triángulos: «sobre una misma línea recta no se darán dos líneas rectas iguales a otras dos». Así es el enunciado griego, bastante enredado. La edición de 1774 lo dice con triángulos, que se entiende mejor.",
        "Zamorano no cita la proposición 5 en ningún momento, aunque la usa dos veces; la edición de 1774 la cita las dos veces en el primer caso, y ninguna en el segundo.",
        "Ninguna de las dos ediciones cita por qué una parte de un ángulo es menor que el ángulo entero: es la noción común 5, el todo es mayor que su parte."
      ],
      "enClase": [],
      "construccion": {
        "vb": "30 66 290 214",
        "puntos": {
          "A": [
            60,
            260
          ],
          "B": [
            280,
            260
          ],
          "C": [
            86,
            92
          ],
          "D": [
            162,
            124
          ],
          "C2": [
            196,
            158
          ],
          "D2": [
            228,
            234
          ],
          "E": [
            250.4,
            117.2
          ],
          "F": [
            295.2,
            223.6
          ],
          "D3": [
            238.0,
            209.0
          ]
        },
        "rotulos": {
          "A": [
            -12,
            10
          ],
          "B": [
            12,
            10
          ],
          "C": [
            -12,
            -10
          ],
          "D": [
            12,
            -10
          ],
          "C2": [
            -13,
            -9,
            "C"
          ],
          "D2": [
            0,
            16,
            "D"
          ],
          "E": [
            10,
            -9
          ],
          "F": [
            12,
            -8
          ],
          "D3": [
            12,
            -8,
            "D"
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "C2",
              "E"
            ],
            [
              "A",
              "D2",
              "F"
            ],
            [
              "C2",
              "D3",
              "B"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "C"
              ],
              [
                "A",
                "D"
              ]
            ],
            [
              [
                "A",
                "C2"
              ],
              [
                "A",
                "D2"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C",
              "hasta": 6
            },
            {
              "t": "punto",
              "p": "D",
              "hasta": 6
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true,
              "hasta": 6
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "B",
              "sinRegla": true,
              "hasta": 6
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D",
              "sinRegla": true,
              "hasta": 6
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "B",
              "sinRegla": true,
              "hasta": 6
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "A",
                  "D"
                ]
              ],
              "hasta": 6
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "B",
                  "D"
                ]
              ],
              "rayas": 2,
              "supuesto": true,
              "hasta": 6
            }
          ],
          [
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "hasta": 6
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "C",
                "D"
              ],
              "aux": true
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "D",
              "color": 1,
              "hasta": 4
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "C",
              "b": "A",
              "color": 1,
              "hasta": 6
            }
          ],
          [
            {
              "t": "angulo",
              "v": "D",
              "a": "C",
              "b": "B",
              "color": 2,
              "r": 40,
              "cuna": false,
              "hasta": 6
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "D",
              "color": 1,
              "r": 36,
              "cuna": false,
              "hasta": 6
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "D",
              "b": "B",
              "color": 3,
              "r": 36,
              "hasta": 6
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "B",
                "C",
                "D"
              ],
              "aux": true
            }
          ],
          [
            {
              "t": "punto",
              "p": "C2"
            },
            {
              "t": "punto",
              "p": "D2",
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C2",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "C2",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D2",
              "sinRegla": true,
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "D2",
              "b": "B",
              "sinRegla": true,
              "hasta": 11
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C2"
                ],
                [
                  "A",
                  "D2"
                ]
              ],
              "hasta": 11
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C2"
                ],
                [
                  "B",
                  "D2"
                ]
              ],
              "rayas": 2,
              "supuesto": true,
              "hasta": 11
            }
          ],
          [
            {
              "t": "segmento",
              "a": "C2",
              "b": "D2",
              "hasta": 11
            },
            {
              "t": "prolonga",
              "desde": "A",
              "por": "C2",
              "largo": 249.99999999999997,
              "hasta": 11
            },
            {
              "t": "punto",
              "p": "E",
              "hasta": 11
            },
            {
              "t": "prolonga",
              "desde": "A",
              "por": "D2",
              "largo": 249.99999999999997,
              "hasta": 11
            },
            {
              "t": "punto",
              "p": "F",
              "hasta": 11
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C2",
              "a": "E",
              "b": "D2",
              "color": 1,
              "hasta": 9
            },
            {
              "t": "angulo",
              "v": "D2",
              "a": "F",
              "b": "C2",
              "color": 1,
              "hasta": 11
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C2",
              "a": "E",
              "b": "D2",
              "color": 1,
              "r": 40,
              "cuna": false,
              "hasta": 11
            },
            {
              "t": "angulo",
              "v": "C2",
              "a": "D2",
              "b": "B",
              "color": 3,
              "r": 40,
              "hasta": 11
            },
            {
              "t": "angulo",
              "v": "D2",
              "a": "B",
              "b": "C2",
              "color": 2,
              "r": 32,
              "cuna": false,
              "hasta": 11
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "B",
                "C2",
                "D2"
              ],
              "aux": true
            }
          ],
          [
            {
              "t": "punto",
              "p": "D3"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D3"
            },
            {
              "t": "destaca",
              "a": "B",
              "b": "D3"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-8",
      "tipo": "proposicion",
      "n": 8,
      "clase": "teorema",
      "titulo": "Los tres lados iguales",
      "zam": {
        "num": "Theorema 5, Proposicion 8",
        "escaneo": 30,
        "enun": "Si dos triangulos tuuieren los dos lados yguales a los dos lados, el vno al otro: y la basis tambien ygual a la basis, tendran tambien el angulo contenido de yguales lineas rectas ygual al angulo.",
        "dem": "Sean dos triangulos ABC, DEZ que tenga los dos lados BC, AC yguales a los lados EZ, DZ el vno al otro esto es CB a la ZE y AC a la DZ y tengan la basis BA ygual a la basis ED, digo que el angulo BCA es ygual al angulo EZD porque puesto el triangulo ABC sobre el triangulo DEZ y puesto el punto B sobre el punto E y la linea recta BA sobre ED cae tambien el punto C sobre el punto Z porque BC es ygual a la EZ, caen tambien CA, AB sobre EZ, DZ porque si la basis BA eac sobre la basis ED pero los lados BC, AC no caen sobre los lados EZ, DZ sino que si difieren como EZ, EC, DZ, DC darse han sobre vna misma linea recta dos lineas rectas yguales a otras dos lineas rectas la vna a la otra que concurran en differentes puntos hazia vna misma parte teniendo vnos mismos terminos. Pero no se dan estas [[prop-7|(por la 7 proposicion)]] luego cayendo la basis BA sobre la basis ED caeran tambien los lados BC, AC sobre los lados EZ, DZ por lo qual tambien el angulo BCA caera sobre el angulo EZD y le sera ygual. Luego si dos triangulos tuuieren los dos lados yguales a los dos lados el vno al otro y la basis tambien ygual a la basis, tendran el angulo tambien ygual al angulo contenido de yguales rectas lineas, que era lo que se auia de demostrar."
      },
      "e1774": {
        "num": "Proposición VIII. Teorema",
        "pag": 12,
        "escaneo": 36,
        "enun": "Si dos triángulos tienen los dos lados del uno respectivamente iguales á los dos lados del otro, y las dos bases iguales; tendrán tambien iguales los ángulos comprehendidos por los lados.",
        "dem": "Sean dos triángulos ABC, DEF, que tengan el lado AB igual al DE, el AC igual al DF, y la base BC igual á la EF. Digo, que el ángulo BAC será tambien igual al EDF. Porque sobrepuesto el triángulo ABC al DEF, el punto B al E, y la recta BC á la EF; caerá tambien el punto C sobre el F; porque la BC es igual á la EF; y por consiguiente caerán tambien las rectas BA, AC sobre las ED, DF; pues si cayendo la base BC sobre la base EF, los lados BA, AC no cayesen sobre los lados ED, DF, sino que estuviesen en otra situacion, como EG, GF, se formarian ya sobre una misma base EF, y ácia una misma parte dos triángulos EDF, EGF, que tendrian iguales entre sí cada dos lados, que salen de un extremo de ella: pero no se pueden construir [[prop-7|a 7. I.]]: luego cayendo la base BC sobre la EF, caerán los lados BA, AC sobre los ED, DF: luego se ajustarán; por lo qual el ángulo BAC caerá sobre el EDF, y será igual á él [[nc-4|b Axi. 8.]]. Por consiguiente si dos triángulos &c. L. Q. D. D."
      },
      "facil": "Si dos triángulos tienen los tres lados iguales, también tienen iguales los ángulos: son iguales en todo. Con los tres lados, el triángulo ya no se puede deformar.",
      "pasos": [
        [
          "Sean ABC y DEF dos triángulos con AB = DE, AC = DF y BC = EF.",
          []
        ],
        [
          "Muevo el triángulo ABC sin deformarlo, y pongo el punto B sobre el punto E.",
          [
            "nc-4"
          ]
        ],
        [
          "Lo giro alrededor de E hasta que BC quede sobre EF. Como BC = EF, el punto C cae justo sobre F.",
          [
            "nc-4"
          ]
        ],
        [
          "¿Y el punto A? Supongo que no cae sobre D, sino en otro punto G, del mismo lado de EF. Como AB = DE y AC = DF, sería EG = ED y FG = FD.",
          []
        ],
        [
          "Entonces sobre la base EF, y del mismo lado, habría dos triángulos, EDF y EGF, con los lados que salen de E iguales y los que salen de F iguales. La proposición 7 dice que eso no puede pasar.",
          [
            "prop-7"
          ]
        ],
        [
          "Así que A cae sobre D, y los lados BA y AC caen sobre ED y DF. Los triángulos coinciden: el ángulo BAC es igual al EDF.",
          [
            "nc-4"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "nc-4",
        "prop-7"
      ],
      "historia": [
        "Es lo que hoy se llama el criterio LLL (lado, lado, lado): si dos triángulos tienen los tres lados iguales, son iguales. Junto con la proposición 4, el criterio LAL, es de lo más usado en toda la geometría.",
        "Dice algo que se ve en las construcciones: un triángulo hecho con tres varillas no se puede deformar sin doblarlas. Un cuadrilátero sí: se aplasta. Por eso los puentes de hierro, las grúas y los techos se arman con triángulos.",
        "Es la otra proposición, con la 4, donde Euclides mueve un triángulo hasta ponerlo encima del otro. Acá además necesita la 7: el movimiento lleva B a E y C a F, pero lo que obliga a A a caer en D es que no puede haber dos triángulos así del mismo lado.",
        "Euclides solo concluye que el ángulo BAC es igual al EDF, el ángulo entre los lados. Con eso, por la proposición 4, los triángulos son iguales en todo. Esta proposición se usa enseguida, en la 9, para partir un ángulo por la mitad.",
        "En la demostración de Zamorano las letras se enredan: dice que «cae el punto C sobre el punto Z porque BC es igual a la EZ», cuando lo que cae ahí es A sobre D, porque BA es igual a ED. Y tiene una errata de imprenta, «eac» por «cae». Están así en el libro."
      ],
      "enClase": [],
      "construccion": {
        "vb": "10 20 420 230",
        "puntos": {
          "A": [
            95.0,
            55.0
          ],
          "B": [
            40.0,
            205.0
          ],
          "C": [
            178.0,
            188.0
          ],
          "D": [
            380.9829,
            83.3788
          ],
          "E": [
            262.0,
            190.0
          ],
          "F": [
            391.8278,
            239.777
          ],
          "G": [
            337.3407,
            49.1143
          ]
        },
        "rotulos": {
          "A": [
            0,
            -15
          ],
          "B": [
            -13,
            8
          ],
          "C": [
            14,
            8
          ],
          "D": [
            12,
            -12
          ],
          "E": [
            -13,
            8
          ],
          "F": [
            14,
            8
          ],
          "G": [
            -13,
            -6
          ]
        },
        "comprueba": {
          "congruentes": [
            [
              [
                "A",
                "B",
                "C"
              ],
              [
                "D",
                "E",
                "F"
              ]
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "D",
                "E"
              ],
              [
                "G",
                "E"
              ]
            ],
            [
              [
                "A",
                "C"
              ],
              [
                "D",
                "F"
              ]
            ],
            [
              [
                "B",
                "C"
              ],
              [
                "E",
                "F"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "D",
                  "E"
                ]
              ]
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "D",
                  "F"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "E",
                  "F"
                ]
              ],
              "rayas": 3
            }
          ],
          [
            {
              "t": "mueve",
              "pts": [
                "B",
                "C",
                "A"
              ],
              "hacia": [
                "E",
                "F",
                "D"
              ],
              "fase": "traslada",
              "aux": true
            }
          ],
          [
            {
              "t": "mueve",
              "pts": [
                "B",
                "C",
                "A"
              ],
              "hacia": [
                "E",
                "F",
                "D"
              ],
              "fase": "gira"
            }
          ],
          [
            {
              "t": "punto",
              "p": "G",
              "aux": 5
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "G",
              "aux": 5
            },
            {
              "t": "segmento",
              "a": "G",
              "b": "F",
              "aux": 5
            },
            {
              "t": "igual",
              "seg": [
                [
                  "E",
                  "G"
                ],
                [
                  "E",
                  "D"
                ]
              ],
              "marca": false,
              "hasta": 4
            },
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "G"
                ],
                [
                  "F",
                  "D"
                ]
              ],
              "marca": false,
              "supuesto": true,
              "hasta": 4
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "E",
                "D",
                "F"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "G",
                "F"
              ],
              "tono": 2,
              "aux": true
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 1
            }
          ]
        ]
      }
    },
    {
      "id": "prop-9",
      "tipo": "proposicion",
      "n": 9,
      "clase": "problema",
      "titulo": "Partir un ángulo por la mitad",
      "zam": {
        "num": "Problema 4, Proposition 9",
        "escaneo": 31,
        "enun": "Diuidir vn angulo dado rectilineo en dos partes yguales.",
        "dem": "Sea el angulo rectilineo dado BAC conuiene diuidirle en dos partes yguales. Tomese en la linea AB vn puncto a caso y sea D. Y de la linea AC [[prop-3|(por la 3 proposicion)]] cortese AE ygual a la AD, y [[post-1|(por la 1 peticion)]] tirese la linea DE y hagase [[prop-1|(por la 1 proposicion)]] vn triangulo de yguales lados sobre DE y sea DZE, y [[post-1|(por la 1 peticion)]] tirese la AZ. Digo que el angulo BAC es cortado con la linea AZ en dos partes yguales. Porque AD es ygual a la AE y comun la AZ, luego las dos DA, AZ son yguales a las dos EA, AZ la vna a la otra, y la basis DZ es ygual [[prop-1|(por la 1 proposicion)]] a la basis EZ, luego [[prop-8|(por la 8)]] el angulo DAZ es ygual al angulo ZAE. Esta luego cortado en dos partes yguales con la linea AZ el angulo dado de lineas rectas BAC, lo qual conuino assi hazerse."
      },
      "e1774": {
        "num": "Proposición IX. Problema",
        "pag": 13,
        "escaneo": 37,
        "enun": "Dividir en dos partes iguales un ángulo rectilineo dado.",
        "dem": "Sea el ángulo rectilineo dado BAC; y háyase de dividir en dos partes iguales. Tómese en AB un punto qualquiera D, córtese de la recta AC la AE [[prop-3|a 3. I.]] igual á la AD, tírese DE, y constrúyase sobre ella el triángulo equilátero [[prop-1|b 1. I.]] DEF, y tírese AF. Digo, que la recta AF dividirá en dos partes iguales al ángulo BAC. Porque siendo la linea AD igual á la AE, y la AF comun, las dos DA, AF son respectivamente iguales á las EA, AF, y la base DF igual á la base EF: luego el ángulo DAF, será igual [[prop-8|c 8. I.]] al ángulo EAF. Por consiguiente queda dividido &c. L. Q. D. H."
      },
      "facil": "Con regla y compás se puede partir cualquier ángulo en dos ángulos iguales. La recta que lo parte se llama bisectriz.",
      "pasos": [
        [
          "Sea BAC el ángulo que hay que partir en dos partes iguales.",
          []
        ],
        [
          "Marco un punto cualquiera D en AB.",
          []
        ],
        [
          "En AC corto un segmento igual a AD. Lo hago con la construcción de la proposición 3:",
          [
            "prop-3"
          ]
        ],
        [
          "AD ya sale de A, así que no hace falta llevarlo con la proposición 2: con centro A y radio AD trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "La circunferencia corta a AC en un punto: lo llamo E. D y E están en la circunferencia de centro A, así que AE = AD.",
          [
            "def-15"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo DE.",
          [
            "post-1"
          ]
        ],
        [
          "Sobre DE construyo un triángulo equilátero, del lado contrario a A. Lo hago con la construcción de la proposición 1:",
          [
            "prop-1"
          ]
        ],
        [
          "Con centro D y radio DE trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro E y radio ED trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las dos circunferencias se cortan en dos puntos. Llamo F al que queda del lado contrario a A, y trazo DF y EF: DEF es equilátero.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo AF. Esta es la recta que parte el ángulo.",
          [
            "post-1"
          ]
        ],
        [
          "Miro los triángulos ADF y AEF. Tienen AD = AE, el lado AF en común, y DF = EF porque DEF es equilátero.",
          []
        ],
        [
          "Por la proposición 8, los dos triángulos tienen los ángulos iguales: el ángulo DAF es igual al EAF. AF parte el ángulo BAC por la mitad.",
          [
            "prop-8"
          ]
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "prop-3",
        "post-3",
        "def-15",
        "post-1",
        "prop-1",
        "prop-8"
      ],
      "historia": [
        "Es la bisectriz: la construcción que todavía se enseña para partir un ángulo con regla y compás. En los libros de hoy se hace casi igual, con dos arcos en vez de dos circunferencias enteras.",
        "Euclides no dice de qué lado de DE hay que tomar F, pero importa. Si el ángulo BAC mide 60°, el triángulo ADE ya es equilátero, y el punto de corte del lado de A es el mismo A: la recta AF no existiría. Por eso tomamos F del lado contrario.",
        "Se puede partir un ángulo en dos, y repitiendo, en cuatro, en ocho… Pero partirlo en tres partes iguales con regla y compás no se puede: es uno de los tres problemas famosos de los griegos, la trisección del ángulo. Lo intentaron durante más de dos mil años, hasta que en 1837 Pierre Wantzel demostró que es imposible.",
        "Como en la proposición 5, la construcción de la proposición 3 se hace en un solo paso, porque AD ya empieza en A: basta un compás con centro A.",
        "La edición de 1774 cita las proposiciones 3, 1 y 8; Zamorano cita además la primera petición las dos veces que traza una recta, y la proposición 1 de nuevo para decir que DF es igual a EF."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 0 340 280",
        "puntos": {
          "A": [
            50.0,
            250.0
          ],
          "B": [
            330.0,
            250.0
          ],
          "C": [
            150.0,
            10.0
          ],
          "D": [
            180.0,
            250.0
          ],
          "E": [
            100.0,
            130.0
          ],
          "F": [
            243.923,
            120.718
          ]
        },
        "rotulos": {
          "A": [
            -12,
            8
          ],
          "B": [
            10,
            14
          ],
          "C": [
            -14,
            6
          ],
          "D": [
            2,
            16
          ],
          "E": [
            -14,
            -4
          ],
          "F": [
            12,
            -10
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "D",
              "B"
            ],
            [
              "A",
              "E",
              "C"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "D"
              ],
              [
                "A",
                "E"
              ]
            ],
            [
              [
                "D",
                "E"
              ],
              [
                "D",
                "F"
              ],
              [
                "E",
                "F"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            }
          ],
          [
            {
              "t": "punto",
              "p": "D"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "D"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "D",
              "aux": 5,
              "pasa": [
                "D",
                "E"
              ]
            }
          ],
          [
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "E"
                ],
                [
                  "A",
                  "D"
                ]
              ]
            }
          ],
          [
            {
              "t": "segmento",
              "a": "D",
              "b": "E"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "E"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "D",
              "por": "E",
              "aux": 10,
              "pasa": [
                "E",
                "F"
              ]
            }
          ],
          [
            {
              "t": "circulo",
              "c": "E",
              "por": "D",
              "aux": 10,
              "pasa": [
                "D",
                "F"
              ]
            }
          ],
          [
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F"
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "F"
                ],
                [
                  "E",
                  "F"
                ]
              ],
              "rayas": 2
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "F"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "D",
                "F"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "E",
                "F"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "D",
              "b": "F",
              "color": 1,
              "r": 46
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "F",
              "b": "E",
              "color": 1,
              "r": 46
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "F"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-10",
      "tipo": "proposicion",
      "n": 10,
      "clase": "problema",
      "titulo": "Partir un segmento por la mitad",
      "zam": {
        "num": "Problema 5, Proposicion 10",
        "escaneo": 32,
        "enun": "Diuidir en dos partes yguales vna linea recta dada terminada.",
        "dem": "Sea dada la linea recta terminada AB conuiene diuidir la linea AB en dos partes yguales, hagase [[prop-1|(por la 1 proposicion)]] sobre ella el triangulo de yguales lados ABC [[prop-9|(y por la 9 proposicion)]] cortese en dos partes yguales el angulo ACB con la linea recta CD, digo que la linea recta AB es cortada en dos partes yguales en el puncto D, porque [[prop-1|(por la 1 proposicion)]] AC es ygual a la CB y la CD es comun, luego las dos AC, CD son yguales a las dos BC, CD la vna a la otra, y el angulo ACD es ygual al angulo BCD. Luego [[prop-4|(por la 4)]] la basis AD es ygual a la basis DB. Esta pues cortada la linea AB recta dada terminada en dos yguales partes en el puncto D que era lo que se hauia de hazer."
      },
      "e1774": {
        "num": "Proposición X. Problema",
        "pag": 13,
        "escaneo": 37,
        "enun": "Dividir en dos partes iguales una recta dada terminada.",
        "dem": "Sea AB la recta dada terminada; y háyase de dividir en dos partes iguales. Constrúyase sobre ella un triángulo equilátero [[prop-1|a 1. I.]] ABC, y divídase en dos partes iguales el ángulo ACB por la recta CD [[prop-9|b 9. I.]]. Digo, que la recta AB quedará dividida en dos partes iguales en el punto D. Porque siendo AC igual á CB, y CD comun, las dos AC, CD son respectivamente iguales á las dos BC, CD, y el ángulo ACD igual al BCD: luego la base AD es igual á la base DB. Por consiguiente queda dividida en dos partes iguales la recta AB en el punto D. L. Q. D. H."
      },
      "facil": "Con regla y compás se puede encontrar el punto medio de cualquier segmento: el punto que lo parte en dos partes iguales.",
      "pasos": [
        [
          "Sea AB el segmento que hay que partir por la mitad.",
          []
        ],
        [
          "Sobre AB construyo un triángulo equilátero. Lo hago con la construcción de la proposición 1:",
          [
            "prop-1"
          ]
        ],
        [
          "Con centro A y radio AB trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro B y radio BA trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan arriba de AB en un punto: lo llamo C, y trazo CA y CB. ABC es equilátero: AC = BC.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Parto el ángulo ACB por la mitad. Lo hago con la construcción de la proposición 9:",
          [
            "prop-9"
          ]
        ],
        [
          "Marco un punto cualquiera E en CA.",
          [],
          {
            "sub": true
          }
        ],
        [
          "Con centro C y radio CE trazo la circunferencia. Corta a CB en un punto: lo llamo F. CF = CE.",
          [
            "post-3",
            "def-15"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo EF.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro E y radio EF, y con centro F y radio FE, trazo dos circunferencias. Se cortan en dos puntos: llamo G al que queda del lado contrario a C, y trazo EG y FG. EFG es equilátero.",
          [
            "post-3",
            "prop-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo CG: parte el ángulo ACB por la mitad. Corta a AB en un punto: lo llamo D.",
          [
            "post-1",
            "prop-8"
          ],
          {
            "sub": true
          }
        ],
        [
          "Miro los triángulos ACD y BCD. Tienen AC = BC, el lado CD en común, y el ángulo ACD igual al BCD.",
          []
        ],
        [
          "Por la proposición 4, los dos triángulos son iguales: AD = DB. D parte el segmento AB por la mitad.",
          [
            "prop-4"
          ]
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "prop-1",
        "post-3",
        "post-1",
        "prop-9",
        "def-15",
        "prop-8",
        "prop-4"
      ],
      "historia": [
        "Es el punto medio. Hoy se suele buscar con la mediatriz: dos arcos de centros A y B, y la recta que une sus dos cortes. Las dos circunferencias de la proposición 1 ya dan esos dos cortes, pero Euclides no los une: para probar que esa recta pasa por el medio usa justamente lo que ya tenía, la bisectriz de la proposición 9 y la proposición 4.",
        "Acá aparece el caso del que avisa la historia de la proposición 9: el ángulo ACB es de un equilátero, y la construcción de la bisectriz arma otro equilátero, CEF. Por eso el punto G tiene que tomarse del lado contrario a C; del otro lado, el corte sería el mismo C.",
        "Proclo comenta que esta proposición muestra que todo segmento se puede partir, por chico que sea. Lo usa contra los filósofos de su tiempo que creían en líneas indivisibles, una especie de átomos de longitud.",
        "La edición de 1774 cita las proposiciones 1 y 9, pero no la 4 al final, cuando dice que AD es igual a DB; Zamorano sí la cita, y cita de nuevo la proposición 1 para decir que AC es igual a CB."
      ],
      "enClase": [],
      "construccion": {
        "vb": "30 15 340 300",
        "puntos": {
          "A": [
            80.0,
            250.0
          ],
          "B": [
            320.0,
            250.0
          ],
          "C": [
            200.0,
            42.153903
          ],
          "D": [
            200.0,
            250.0
          ],
          "E": [
            128.0,
            166.861561
          ],
          "F": [
            272.0,
            166.861561
          ],
          "G": [
            200.0,
            291.569219
          ]
        },
        "rotulos": {
          "A": [
            -12,
            8
          ],
          "B": [
            12,
            8
          ],
          "C": [
            0,
            -14
          ],
          "D": [
            12,
            14
          ],
          "E": [
            -14,
            -4
          ],
          "F": [
            14,
            -4
          ],
          "G": [
            12,
            8
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "C",
              "E",
              "A"
            ],
            [
              "C",
              "F",
              "B"
            ],
            [
              "A",
              "D",
              "B"
            ],
            [
              "C",
              "D",
              "G"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "A",
                "C"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "C",
                "E"
              ],
              [
                "C",
                "F"
              ],
              [
                "E",
                "F"
              ],
              [
                "E",
                "G"
              ],
              [
                "F",
                "G"
              ]
            ],
            [
              [
                "A",
                "D"
              ],
              [
                "D",
                "B"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "B",
              "pasa": [
                "B",
                "C"
              ],
              "aux": 5
            }
          ],
          [
            {
              "t": "circulo",
              "c": "B",
              "por": "A",
              "pasa": [
                "A",
                "C"
              ],
              "aux": 5
            }
          ],
          [
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "A"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "B"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "A"
                ],
                [
                  "C",
                  "B"
                ]
              ]
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 2,
              "r": 34,
              "aux": true
            }
          ],
          [
            {
              "t": "punto",
              "p": "E",
              "aux": 11
            }
          ],
          [
            {
              "t": "circulo",
              "c": "C",
              "por": "E",
              "pasa": [
                "E",
                "F"
              ],
              "aux": true
            },
            {
              "t": "punto",
              "p": "F",
              "aux": 11
            }
          ],
          [
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "aux": 11
            }
          ],
          [
            {
              "t": "circulo",
              "c": "E",
              "por": "F",
              "pasa": [
                "F",
                "G"
              ],
              "aux": 10
            },
            {
              "t": "circulo",
              "c": "F",
              "por": "E",
              "pasa": [
                "E",
                "G"
              ],
              "aux": 10
            },
            {
              "t": "punto",
              "p": "G",
              "aux": 11
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "G",
              "aux": 11
            },
            {
              "t": "segmento",
              "a": "F",
              "b": "G",
              "aux": 11
            }
          ],
          [
            {
              "t": "segmento",
              "a": "C",
              "b": "G",
              "aux": 11
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "D",
              "color": 1,
              "r": 40
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "D",
              "b": "B",
              "color": 1,
              "r": 40
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "C",
                "D"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "B",
                "C",
                "D"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "D"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "D"
                ],
                [
                  "D",
                  "B"
                ]
              ],
              "rayas": 2
            }
          ]
        ]
      }
    },
    {
      "id": "def-10",
      "tipo": "definicion",
      "n": 10,
      "titulo": "Ángulo recto y perpendicular",
      "zam": {
        "num": "Definición 10",
        "escaneo": 16,
        "enun": "Quando estando vna linea recta sobre otra linea recta hiziere angulos de ambas partes yguales entre si, es recto cada vno delos angulos yguales, y la linea que sobre esta, se dize perpendicular sobre la que estuuiere."
      },
      "e1774": {
        "num": "Definición X",
        "pag": 2,
        "escaneo": 26,
        "enun": "Quando una linea recta insistiendo sobre otra forma los ángulos contiguos iguales entre sí, son rectos ambos, y la recta, que insiste, se llama perpendicular á la otra."
      },
      "facil": "Si una recta cae sobre otra y forma a los dos lados ángulos iguales, cada uno de esos ángulos es recto, y la recta que cae es perpendicular a la otra.",
      "usa": [],
      "historia": [
        "Euclides define el ángulo recto sin medir nada: no dice 90°, dice que los dos ángulos que quedan a los lados son iguales. En todo el libro no usa grados; mide los ángulos comparándolos con el recto.",
        "«Perpendicular» viene del latín perpendiculum, la plomada de los albañiles: un hilo con una pesa colgando, que marca la vertical. Una pared bien hecha es perpendicular al piso.",
        "La edición de 1774 dice que la recta «insiste» sobre la otra: insistir, en latín, es apoyarse, estar parada encima. Zamorano dice «estando una línea recta sobre otra»."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-recto",
          "slide": "d-recto",
          "txt": "Geometría griega · bloque A · diapositiva «Ángulo recto y perpendiculares»"
        }
      ]
    },
    {
      "id": "prop-11",
      "tipo": "proposicion",
      "n": 11,
      "clase": "problema",
      "titulo": "Levantar una perpendicular",
      "zam": {
        "num": "Problema 6, Proposicion 11",
        "escaneo": 32,
        "enun": "Dada vna linea recta, sacar desde vn puncto en ella señalado vna recta linea en angulos rectos.",
        "dem": "Sea la linea recta dada AB y el puncto señalado en ella sea C, conuiene desde el mismo puncto C de la misma linea recta AB sacar vna linea recta en angulos rectos. Tomese en la misma AB vn puncto a caso y sea D y pongase [[prop-3|(por la tercera proposicion)]] la linea CE ygual a la DC y sobre DE [[prop-1|(por la 1 proposicion)]] hagase el triangulo de lados yguales ZDE, y tirese la linea ZC. Digo que la linea recta ZC sale de la linea AB en angulos rectos desde el puncto señalado en ella que es C. Porque DC es ygual a la CE y la linea ZC es comun, luego las dos DC, CZ son yguales a los dos EC, CZ la vna a la otra y la basis DZ [[prop-1|(por la 1 proposicion)]] es ygual a la basis EZ, luego el angulo DCZ es ygual [[prop-8|(por la 8 proposicion)]] al angulo ECZ, y estan de vna y otra parte. Y quando estando vna linea recta sobre otra linea recta hiziere de vna y otra parte angulos entre si yguales, cada vno de los angulos yguales es recto [[def-10|(por la 10 definicion)]] luego el angulo DCZ y el angulo ZCE son rectos. Luego sacose la linea recta ZC en angulos rectos de la linea recta AB y desde el puncto C señalado en ella, que conuino hazerse."
      },
      "e1774": {
        "num": "Proposición XI. Problema",
        "pag": 14,
        "escaneo": 38,
        "enun": "Elevar una perpendicular á una recta dada en un punto dado.",
        "dem": "Sea la recta dada AB, y C el punto donde se haya de elevar la perpendicular. Tómese qualquier punto D de la AC, y CE igual [[prop-3|a 3. I.]] á CD; sobre DE constrúyase un triángulo equilátero [[prop-1|b 1. I.]] DFE, y tírese la linea FC. Digo, que esta será perpendicular á AB en el punto C. Porque siendo el lado DC igual al CE, el FC comun, y la base DF igual á la base FE, será el ángulo DCF igual al ángulo ECF [[prop-8|c 8. I.]]; pero estos dos ángulos iguales están formados por una recta FC, que encuentra á otra AB; y quando una recta insiste sobre otra, formando los dos ángulos entre sí iguales, es perpendicular á esta [[def-10|d Def. 10.]]: luego FC será perpendicular á AB en el punto dado C. L. Q. D. H."
      },
      "facil": "Con regla y compás se puede trazar la perpendicular a una recta en cualquier punto de ella.",
      "corolario": {
        "e1774": "De aquí se sigue, que dos rectas no pueden tener un segmento comun. Porque si fuera posible, supongamos que las dos rectas ABC, ABD tuviesen el segmento comun AB: en el punto B tírese la linea BE formando ángulos rectos con la AB; siendo pues recta la ABC, será el ángulo CBE igual al ángulo EBA; y del mismo modo, siendo recta la ABD, será igual el ángulo DBE al EBA: luego el ángulo DBE será igual al CBE; el menor al mayor, lo qual es imposible: por consiguiente dos rectas no pueden tener un comun segmento.",
        "facil": "Dos rectas distintas no pueden compartir un pedazo. Si coinciden en un tramo, aunque sea corto, son la misma recta: no pueden separarse después."
      },
      "pasos": [
        [
          "Sea AB la recta dada, y C el punto de AB donde hay que levantar la perpendicular.",
          []
        ],
        [
          "Marco un punto cualquiera D en CA.",
          []
        ],
        [
          "En CB corto un segmento igual a CD. Lo hago con la construcción de la proposición 3:",
          [
            "prop-3"
          ]
        ],
        [
          "CD ya sale de C, así que no hace falta llevarlo con la proposición 2: con centro C y radio CD trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "La circunferencia corta a CB en un punto: lo llamo E. D y E están en la circunferencia de centro C, así que CE = CD.",
          [
            "def-15"
          ],
          {
            "sub": true
          }
        ],
        [
          "Sobre DE construyo un triángulo equilátero. Lo hago con la construcción de la proposición 1:",
          [
            "prop-1"
          ]
        ],
        [
          "Con centro D y radio DE trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro E y radio ED trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan arriba de AB en un punto: lo llamo F, y trazo FD y FE. DEF es equilátero: DF = EF.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo FC.",
          [
            "post-1"
          ]
        ],
        [
          "Miro los triángulos DCF y ECF. Tienen DC = CE, el lado CF en común, y DF = EF.",
          []
        ],
        [
          "Por la proposición 8, el ángulo DCF es igual al ECF.",
          [
            "prop-8"
          ]
        ],
        [
          "FC cae sobre AB y forma a los dos lados ángulos iguales: por la definición 10, los dos son rectos, y FC es perpendicular a AB.",
          [
            "def-10"
          ]
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "prop-3",
        "post-3",
        "def-15",
        "prop-1",
        "post-1",
        "prop-8",
        "def-10"
      ],
      "historia": [
        "Es la misma idea que la proposición 9: un punto a cada lado a la misma distancia, un equilátero encima, y la proposición 8. Acá el ángulo que se parte por la mitad es un ángulo llano, y cada mitad es un recto.",
        "Los albañiles y carpinteros hacen algo parecido sin compás: con una cuerda de 12 nudos arman un triángulo de lados 3, 4 y 5, que tiene un ángulo recto. Se cuenta que así lo hacían los «tendedores de cuerdas» del antiguo Egipto, aunque no hay pruebas firmes de que fuera así.",
        "El corolario, que dos rectas no pueden tener un pedazo en común, no está en Zamorano: lo agregó Simson. Es lo que usamos en la proposición 4 al leer el postulado 1 como «entre dos puntos pasa una sola recta».",
        "La edición de 1774 cita las proposiciones 3, 1 y 8 y la definición 10. Zamorano cita las mismas, y además cita de nuevo la proposición 1 para decir que DZ es igual a EZ."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 30 360 240",
        "puntos": {
          "A": [
            40.0,
            230.0
          ],
          "B": [
            360.0,
            230.0
          ],
          "C": [
            200.0,
            230.0
          ],
          "D": [
            110.0,
            230.0
          ],
          "E": [
            290.0,
            230.0
          ],
          "F": [
            200.0,
            74.115427
          ]
        },
        "rotulos": {
          "A": [
            -4,
            16
          ],
          "B": [
            4,
            16
          ],
          "C": [
            10,
            16
          ],
          "D": [
            -4,
            16
          ],
          "E": [
            4,
            16
          ],
          "F": [
            0,
            -14
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "D",
              "C"
            ],
            [
              "A",
              "C",
              "B"
            ],
            [
              "C",
              "E",
              "B"
            ]
          ],
          "iguales": [
            [
              [
                "C",
                "D"
              ],
              [
                "C",
                "E"
              ]
            ],
            [
              [
                "D",
                "E"
              ],
              [
                "D",
                "F"
              ],
              [
                "E",
                "F"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            }
          ],
          [
            {
              "t": "punto",
              "p": "D"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "D"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "C",
              "por": "D",
              "pasa": [
                "D",
                "E"
              ],
              "aux": 5
            }
          ],
          [
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "E"
                ],
                [
                  "C",
                  "D"
                ]
              ]
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "E"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "D",
              "por": "E",
              "pasa": [
                "E",
                "F"
              ],
              "aux": 9
            }
          ],
          [
            {
              "t": "circulo",
              "c": "E",
              "por": "D",
              "pasa": [
                "D",
                "F"
              ],
              "aux": 9
            }
          ],
          [
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "F",
              "b": "D"
            },
            {
              "t": "segmento",
              "a": "F",
              "b": "E"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "D"
                ],
                [
                  "F",
                  "E"
                ]
              ],
              "rayas": 2
            }
          ],
          [
            {
              "t": "segmento",
              "a": "F",
              "b": "C"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "D",
                "C",
                "F"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "C",
                "F"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "D",
              "b": "F",
              "color": 1,
              "r": 34,
              "aux": true
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "F",
              "b": "E",
              "color": 1,
              "r": 34,
              "aux": true
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "D",
              "b": "F",
              "color": 1,
              "r": 26,
              "recto": true
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "F",
              "b": "E",
              "color": 1,
              "r": 26,
              "recto": true
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "F"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-12",
      "tipo": "proposicion",
      "n": 12,
      "clase": "problema",
      "titulo": "Bajar una perpendicular",
      "zam": {
        "num": "Ploblema 7, Proposicion 12",
        "escaneo": 33,
        "enun": "Tirar vna linea recta perpendicular sobre vna linea recta dada infinita desde vn puncto que no este en ella.",
        "dem": "Sea vna linea recta infinita, y sea esta AB y el puncto dado que no este en ella sea C, conuiene sobre la linea recta dada infinita AB desde el puncto C que no esta en ella tirar vna linea recta perpendicular. Tomese en la vna parte de la misma linea recta AB vn puncto a caso y sea E y sobre la C como centro y segun la distancia CE desse [[post-3|(por la 3 peticion)]] el circulo EZI y cortese [[prop-10|(por la 10 proposicion)]] EI en dos partes yguales en el puncto T y tirense [[post-1|(por la 1 peticion)]] las lineas rectas CI, CE, CT. Digo que la linea recta CT esta tirada perpendicular sobre la linea recta dada infinita AB desde el puncto dado C que no esta en ella. Porque IT es ygual a la TE y la TC es comun, luego las dos IT, CT son yguales a las dos ET, CT la vna a la otra, y la basis CI a la basis CE es ygual [[def-15|(por la difinicion quinze)]] luego el angulo CTI es ygual [[prop-8|(por la 8 proposicion)]] al angulo CTE. Y estan de vna y otra parte. Y quando estando vna linea recta sobre otra linea recta hiziere de vna y otra parte angulos entre si yguales, cada vno de los yguales angulos es recto [[def-10|(por la 10 dificion)]] y la linea recta que esta encima se llama perpendicular. Luego sobre la linea recta dada infinita AB desde el punto C dado que no esta en ella, esta tirada la perpendicular CT, que conuino hazerse."
      },
      "e1774": {
        "num": "Proposición XII. Problema",
        "pag": 15,
        "escaneo": 39,
        "enun": "De un punto dado fuera de una recta indefinida baxar á ella una perpendicular.",
        "dem": "Sea AB la recta dada indefinida, y C el punto dado fuera de ella, de donde se le ha de baxar la perpendicular. Tómese de la otra parte de la recta AB qualquier punto D, y con centro C, é intervalo CD descríbase el arco [[post-3|a Post. 3.]] EGF, que corte á la recta AB en los puntos F, G; y divídase [[prop-10|b 10. I.]] en dos partes iguales la FG en el punto H: del punto C al H tírese la CH, y será esta perpendicular á AB desde el punto dado C. Tírense CF, CG. Siendo pues iguales los lados FH, y HG, el HC comun, y la base CF igual á la CG [[def-15|c Def. 15.]], será el ángulo CHF igual al CHG [[prop-8|d 8. I.]]: pero estos dos ángulos iguales están formados por una recta CH, que encuentra á otra AB; y quando una recta insistiendo sobre otra forma dos ángulos iguales, es perpendicular á ella. Luego la recta CH, que se ha tirado del punto dado C á la recta indefinida dada AB, es perpendicular á ella. L. Q. D. H."
      },
      "facil": "Desde un punto que está afuera de una recta, con regla y compás se puede trazar la perpendicular a esa recta.",
      "pasos": [
        [
          "Sea AB la recta dada, que se puede prolongar todo lo que haga falta, y C un punto que no está en ella.",
          []
        ],
        [
          "Del otro lado de AB marco un punto cualquiera D.",
          []
        ],
        [
          "Con centro C y radio CD trazo la circunferencia. Como D está del otro lado de AB, la circunferencia corta a AB en dos puntos: los llamo F y G.",
          [
            "post-3"
          ]
        ],
        [
          "Parto FG por la mitad. Lo hago con la construcción de la proposición 10:",
          [
            "prop-10"
          ]
        ],
        [
          "Con centro F y radio FG, y con centro G y radio GF, trazo dos circunferencias. Se cortan del lado contrario a C en un punto: lo llamo K. FGK es equilátero.",
          [
            "post-3",
            "prop-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Parto el ángulo FKG por la mitad, como en la proposición 9. Marco un punto L en KF y, con centro K y radio KL, trazo la circunferencia: corta a KG en un punto M.",
          [
            "prop-9",
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro L y radio LM, y con centro M y radio ML, trazo dos circunferencias. Se cortan del lado contrario a K en un punto: lo llamo N.",
          [
            "post-3",
            "prop-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo KN. Corta a FG en un punto H, que la parte por la mitad: FH = HG.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo CF, CH y CG.",
          [
            "post-1"
          ]
        ],
        [
          "Miro los triángulos CHF y CHG. Tienen FH = HG, el lado CH en común, y CF = CG, porque F y G están en la circunferencia de centro C.",
          [
            "def-15"
          ]
        ],
        [
          "Por la proposición 8, el ángulo CHF es igual al CHG.",
          [
            "prop-8"
          ]
        ],
        [
          "CH cae sobre AB y forma a los dos lados ángulos iguales: por la definición 10, son rectos. CH es la perpendicular que se pedía.",
          [
            "def-10"
          ]
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "post-3",
        "prop-10",
        "prop-1",
        "prop-9",
        "post-1",
        "def-15",
        "prop-8",
        "def-10"
      ],
      "historia": [
        "La proposición 11 levanta una perpendicular desde un punto de la recta; esta la baja desde un punto de afuera. Las dos terminan igual: dos ángulos iguales a los lados, y la definición 10.",
        "Es la primera vez que Euclides pide una recta «infinita» (la edición de 1774 dice «indefinida»): tiene que poder alargarse lo necesario para que la circunferencia la corte. Y por eso toma D del otro lado de AB: así la circunferencia, que pasa por D, seguro cruza la recta.",
        "Zamorano no toma el punto del otro lado: lo toma sobre la misma recta AB, y la circunferencia pasa por él. También funciona, siempre que ese punto no sea justo el pie de la perpendicular.",
        "Adentro va la construcción entera de la proposición 10: un equilátero sobre FG y la bisectriz de su vértice, que a su vez arma otro equilátero. La mostramos en cuatro subpasos; en el dibujo, las ayudas se borran al terminar.",
        "La edición de 1774 traza solo un «arco» de la circunferencia, el que hace falta. Zamorano escribe «Ploblema» en el título y «por la 10 dificion» al final: dos erratas de la imprenta."
      ],
      "enClase": [],
      "construccion": {
        "vb": "16 62 368 286",
        "puntos": {
          "A": [
            40.0,
            180.0
          ],
          "B": [
            360.0,
            180.0
          ],
          "C": [
            200.0,
            100.0
          ],
          "D": [
            250.0,
            201.488916
          ],
          "F": [
            120.0,
            180.0
          ],
          "G": [
            280.0,
            180.0
          ],
          "H": [
            200.0,
            180.0
          ],
          "K": [
            200.0,
            318.564065
          ],
          "L": [
            152.0,
            235.425626
          ],
          "M": [
            248.0,
            235.425626
          ],
          "N": [
            200.0,
            152.287187
          ]
        },
        "rotulos": {
          "A": [
            -4,
            16
          ],
          "B": [
            4,
            16
          ],
          "C": [
            0,
            -14
          ],
          "D": [
            12,
            8
          ],
          "F": [
            -12,
            -10
          ],
          "G": [
            12,
            -10
          ],
          "H": [
            12,
            14
          ],
          "K": [
            0,
            15
          ],
          "L": [
            -12,
            4
          ],
          "M": [
            12,
            4
          ],
          "N": [
            12,
            -6
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "F",
              "H"
            ],
            [
              "F",
              "H",
              "G"
            ],
            [
              "H",
              "G",
              "B"
            ],
            [
              "K",
              "L",
              "F"
            ],
            [
              "K",
              "M",
              "G"
            ],
            [
              "K",
              "H",
              "N"
            ]
          ],
          "iguales": [
            [
              [
                "C",
                "D"
              ],
              [
                "C",
                "F"
              ],
              [
                "C",
                "G"
              ]
            ],
            [
              [
                "F",
                "G"
              ],
              [
                "F",
                "K"
              ],
              [
                "G",
                "K"
              ]
            ],
            [
              [
                "K",
                "L"
              ],
              [
                "K",
                "M"
              ]
            ],
            [
              [
                "L",
                "M"
              ],
              [
                "L",
                "N"
              ],
              [
                "M",
                "N"
              ]
            ],
            [
              [
                "F",
                "H"
              ],
              [
                "H",
                "G"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            }
          ],
          [
            {
              "t": "punto",
              "p": "D",
              "aux": 3
            }
          ],
          [
            {
              "t": "circulo",
              "c": "C",
              "por": "D",
              "pasa": [
                "D",
                "F",
                "G"
              ],
              "aux": 4
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "punto",
              "p": "G"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "G"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "F",
              "por": "G",
              "pasa": [
                "G",
                "K"
              ],
              "aux": 5
            },
            {
              "t": "circulo",
              "c": "G",
              "por": "F",
              "pasa": [
                "F",
                "K"
              ],
              "aux": 5
            },
            {
              "t": "punto",
              "p": "K",
              "aux": 8
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "F",
              "aux": 8
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "G",
              "aux": 8
            }
          ],
          [
            {
              "t": "punto",
              "p": "L",
              "aux": 8
            },
            {
              "t": "circulo",
              "c": "K",
              "por": "L",
              "pasa": [
                "L",
                "M"
              ],
              "aux": 6
            },
            {
              "t": "punto",
              "p": "M",
              "aux": 8
            }
          ],
          [
            {
              "t": "circulo",
              "c": "L",
              "por": "M",
              "pasa": [
                "M",
                "N"
              ],
              "aux": 7
            },
            {
              "t": "circulo",
              "c": "M",
              "por": "L",
              "pasa": [
                "L",
                "N"
              ],
              "aux": 7
            },
            {
              "t": "punto",
              "p": "N",
              "aux": 8
            }
          ],
          [
            {
              "t": "segmento",
              "a": "K",
              "b": "N",
              "aux": 8
            },
            {
              "t": "punto",
              "p": "H"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "H"
                ],
                [
                  "H",
                  "G"
                ]
              ],
              "rayas": 2
            }
          ],
          [
            {
              "t": "segmento",
              "a": "C",
              "b": "F"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "H"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "G"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "C",
                "H",
                "F"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "C",
                "H",
                "G"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "F"
                ],
                [
                  "C",
                  "G"
                ]
              ]
            }
          ],
          [
            {
              "t": "angulo",
              "v": "H",
              "a": "F",
              "b": "C",
              "color": 1,
              "r": 30,
              "aux": true
            },
            {
              "t": "angulo",
              "v": "H",
              "a": "C",
              "b": "G",
              "color": 1,
              "r": 30,
              "aux": true
            }
          ],
          [
            {
              "t": "angulo",
              "v": "H",
              "a": "F",
              "b": "C",
              "color": 1,
              "r": 22,
              "recto": true
            },
            {
              "t": "angulo",
              "v": "H",
              "a": "C",
              "b": "G",
              "color": 1,
              "r": 22,
              "recto": true
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "H"
            }
          ]
        ]
      }
    },
    {
      "id": "nc-2",
      "tipo": "nocion",
      "n": 2,
      "titulo": "Sumar lo mismo",
      "zam": {
        "num": "Común sentencia 2",
        "escaneo": 21,
        "enun": "Si a cosas yguales se les añaden cosas yguales, los todos seran yguales."
      },
      "e1774": {
        "num": "Axioma II",
        "pag": 5,
        "escaneo": 29,
        "enun": "Si á cantidades iguales se añaden cantidades iguales, los todos serán iguales."
      },
      "facil": "Si a dos cosas iguales les sumo lo mismo, siguen siendo iguales: si a = b, entonces a + c = b + c.",
      "usa": [],
      "historia": [
        "Es la hermana de la noción común 3, la de restar. Juntas son lo que hacemos al resolver una ecuación: lo mismo de los dos lados del igual.",
        "Euclides la usa sobre todo con ángulos: «añádase a ambos el ángulo común», como en la proposición 13. Zamorano dice «póngase por común».",
        "En las clases del bloque A, la noción común N2 junta la segunda y la tercera de Euclides: «lo mismo de los dos lados»."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-n2",
          "slide": "d-n2",
          "txt": "Geometría griega · bloque A · diapositiva «Lo mismo de los dos lados» (N2)"
        }
      ]
    },
    {
      "id": "prop-13",
      "tipo": "proposicion",
      "n": 13,
      "clase": "teorema",
      "titulo": "Dos ángulos que forman un llano",
      "zam": {
        "num": "Theorema 6, Proposition 13",
        "escaneo": 34,
        "enun": "Quando estando vna linea recta sobre otra linea recta hiziere angulos, o hara dos rectos o yguales a dos rectos.",
        "dem": "Estando vna linea recta AB sobre la linea recta CD haga los angulos CBA, ABD, digo que los angulos CBA, ABD o son dos rectos, o yguales a dos rectos. Si el angulo CBA es ygual al angulo ABD seran ya dos rectos. Pero si no saquese [[prop-11|(por la 11 proposicion)]] desde el puncto B dado en la linea CD, la linea BE en angulos rectos. Assi que los angulos CBE, EBD [[def-10|(por la difinition 10)]] seran rectos. Y porque el angulo CBE es ygual a los dos angulos CBA, ABE, pongase por comun el angulo DBE, luego los angulos CBE, EBD son yguales a los tres angulos que son CBA, ABE, EBD. De mas desto porque el angulo DBA es ygual a los dos angulos DBE, EBA, pongase por comun el angulo ABC, luego los angulos DBA, ABC son yguales a los tres angulos DBE, EBA, ABC, y esta demonstrado que los angulos CBE, EBD son yguales a los mismos tres, y las cosas que a vna misma son yguales [[nc-1|(por la 1 comun sententia)]] son entre si yguales: luego los angulos CBE, EBD son yguales a los angulos DBA, ABC, y los angulos DBE, CBE son dos rectos, luego tambien los angulos DBA, ABC son yguales a dos rectos. Luego quando estando vna linea recta sobre otra linea recta hiziere angulos, o hara dos rectos o yguales a dos rectos, lo qual fue conueniente demonstrarse."
      },
      "e1774": {
        "num": "Proposición XIII. Teorema",
        "pag": 16,
        "escaneo": 40,
        "enun": "Quando una recta insiste sobre otra, forma dos ángulos; los quales serán, ó dos rectos, ó juntos iguales á dos rectos.",
        "dem": "Supóngase, que insiste la recta AB sobre la recta CD, y forma los ángulos CBA, ABD. Digo, que estos serán dos rectos; ò juntos iguales á dos rectos. Porque si el ángulo CBA es igual al ABD, ya son dos rectos [[def-10|a Def. 10.]]: si no, tírese del punto B dado en la linea CD la BE [[prop-11|b 11. I.]] perpendicular á la CD: luego los ángulos CBE, EBD son dos rectos [[def-10|c Def. 10.]]: pero siendo el ángulo CBE igual á los dos CBA, ABE juntos, añádase á ambos el ángulo comun EBD, y resultarán los ángulos CBE, EBD iguales á los CBA, ABE, EBD [[nc-2|d Axi. 2.]]. Asimismo siendo el ángulo DBA igual á los dos DBE, EBA, añádase el ángulo comun ABC, y resultarán los ángulos DBA, ABC iguales á los tres DBE, EBA, ABC: es así que queda demostrada la igualdad de los ángulos CBE, EBD á los mismos tres ángulos; y las cantidades iguales á una misma son iguales entre sí [[nc-1|e Axi. 1.]]: luego tambien los ángulos CBE, EBD son iguales á los DBA, ABC: pero los CBE, EBD son rectos: luego los ángulos DBA, ABC son iguales á dos rectos. Por consiguiente quando una recta &c. L. Q. D. D."
      },
      "facil": "Si una recta cae sobre otra, los dos ángulos que forma suman dos rectos: hoy decimos que dos ángulos adyacentes suman 180°.",
      "pasos": [
        [
          "La recta AB cae sobre la recta CD en el punto B, y forma los ángulos CBA y ABD.",
          []
        ],
        [
          "Si los dos ángulos son iguales, por la definición 10 ya son dos rectos. Si no, por B levanto la perpendicular a CD. Lo hago con la construcción de la proposición 11:",
          [
            "def-10",
            "prop-11"
          ]
        ],
        [
          "Marco un punto F en BD y, con centro B y radio BF, trazo la circunferencia: corta a BC en un punto, G.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro F y radio FG, y con centro G y radio GF, trazo dos circunferencias. Se cortan arriba de CD en un punto: lo llamo E.",
          [
            "post-3",
            "prop-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo BE: es perpendicular a CD, y los ángulos CBE y EBD son rectos.",
          [
            "post-1",
            "def-10"
          ],
          {
            "sub": true
          }
        ],
        [
          "El ángulo CBE está hecho de dos pedazos, CBA y ABE. Si a los dos lados les sumo EBD: CBE + EBD = CBA + ABE + EBD.",
          [
            "nc-2"
          ]
        ],
        [
          "Del mismo modo, el ángulo DBA está hecho de DBE y EBA. Si a los dos lados les sumo ABC: DBA + ABC = DBE + EBA + ABC.",
          [
            "nc-2"
          ]
        ],
        [
          "Las dos sumas son iguales a los mismos tres ángulos, así que son iguales entre sí: DBA + ABC = CBE + EBD.",
          [
            "nc-1"
          ]
        ],
        [
          "CBE y EBD son dos rectos. Entonces DBA y ABC, juntos, son iguales a dos rectos.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "def-10",
        "prop-11",
        "post-3",
        "prop-1",
        "post-1",
        "nc-2",
        "nc-1"
      ],
      "historia": [
        "Es lo que hoy decimos «dos ángulos adyacentes suman 180°». Euclides nunca usa grados: dice «dos rectos». Que un recto mida 90° es una convención posterior, que viene de dividir la vuelta entera en 360 partes.",
        "Es de las proposiciones más usadas del libro. Con ella salen enseguida la 15, los ángulos opuestos por el vértice son iguales, y mucho después la 32, los ángulos de un triángulo suman dos rectos.",
        "Con esta proposición ya se puede resolver la mitad del desafío de la proposición 2: D, A y L están alineados, así que los ángulos DAB y BAL suman dos rectos.",
        "El truco de la demostración es comparar las dos sumas con una tercera: la de los tres ángulos CBA, ABE y EBD. Las dos son iguales a esa, y por la noción común 1 son iguales entre sí.",
        "La edición de 1774 cita la segunda noción común las dos veces que suma; Zamorano no la cita: dice «póngase por común el ángulo» y sigue."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-consecutivos",
          "slide": "d-consecutivos",
          "txt": "Geometría griega · bloque A · diapositiva «Consecutivos y adyacentes»"
        }
      ],
      "construccion": {
        "vb": "20 50 360 210",
        "puntos": {
          "A": [
            275.0,
            90.096189
          ],
          "B": [
            200.0,
            220.0
          ],
          "C": [
            360.0,
            220.0
          ],
          "D": [
            40.0,
            220.0
          ],
          "E": [
            200.0,
            81.435935
          ],
          "F": [
            120.0,
            220.0
          ],
          "G": [
            280.0,
            220.0
          ]
        },
        "rotulos": {
          "A": [
            12,
            -8
          ],
          "B": [
            0,
            18
          ],
          "C": [
            6,
            16
          ],
          "D": [
            -6,
            16
          ],
          "E": [
            -12,
            -8
          ],
          "F": [
            0,
            16
          ],
          "G": [
            0,
            16
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "D",
              "F",
              "B"
            ],
            [
              "B",
              "G",
              "C"
            ]
          ],
          "iguales": [
            [
              [
                "B",
                "F"
              ],
              [
                "B",
                "G"
              ]
            ],
            [
              [
                "F",
                "G"
              ],
              [
                "F",
                "E"
              ],
              [
                "G",
                "E"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "A",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 1,
              "r": 30,
              "hasta": 2
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 4,
              "r": 30,
              "hasta": 2
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "punto",
              "p": "F",
              "aux": 5
            },
            {
              "t": "circulo",
              "c": "B",
              "por": "F",
              "pasa": [
                "F",
                "G"
              ],
              "aux": true
            },
            {
              "t": "punto",
              "p": "G",
              "aux": 5
            }
          ],
          [
            {
              "t": "circulo",
              "c": "F",
              "por": "G",
              "pasa": [
                "G",
                "E"
              ],
              "aux": true
            },
            {
              "t": "circulo",
              "c": "G",
              "por": "F",
              "pasa": [
                "F",
                "E"
              ],
              "aux": true
            },
            {
              "t": "punto",
              "p": "E",
              "hasta": 8
            }
          ],
          [
            {
              "t": "segmento",
              "a": "B",
              "b": "E",
              "hasta": 8
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "E",
              "color": 3,
              "r": 22,
              "recto": true,
              "hasta": 5
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "E",
              "b": "D",
              "color": 3,
              "r": 22,
              "recto": true,
              "hasta": 5
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "E",
              "color": 3,
              "r": 46,
              "cuna": false,
              "hasta": 6
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 1,
              "r": 34,
              "hasta": 6
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "E",
              "color": 2,
              "r": 34,
              "hasta": 6
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "E",
              "b": "D",
              "color": 3,
              "r": 22,
              "recto": true,
              "hasta": 6
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 4,
              "r": 46,
              "cuna": false,
              "hasta": 7
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "E",
              "b": "D",
              "color": 3,
              "r": 22,
              "recto": true,
              "hasta": 7
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "E",
              "color": 2,
              "r": 34,
              "hasta": 7
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 1,
              "r": 34,
              "hasta": 7
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 4,
              "r": 34,
              "hasta": 8
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 1,
              "r": 34,
              "hasta": 8
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "E",
              "color": 3,
              "r": 16,
              "recto": true,
              "hasta": 8
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "E",
              "b": "D",
              "color": 3,
              "r": 16,
              "recto": true,
              "hasta": 8
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 4,
              "r": 34
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 1,
              "r": 34
            },
            {
              "t": "destaca",
              "a": "D",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "post-4",
      "tipo": "postulado",
      "n": 4,
      "titulo": "Todos los rectos son iguales",
      "zam": {
        "num": "Petición 4",
        "escaneo": 20,
        "enun": "Todos los angulos rectos ser entre si yguales."
      },
      "e1774": {
        "num": "Axioma XI",
        "pag": 6,
        "escaneo": 30,
        "enun": "Todos los ángulos rectos son iguales entre sí."
      },
      "facil": "Un ángulo recto mide siempre lo mismo, esté donde esté y como esté girado.",
      "usa": [],
      "historia": [
        "Parece obvio, pero no se puede demostrar con lo anterior, y por eso Euclides lo pide. Dice que el recto es una medida fija, la misma en todas partes: por eso sirve para comparar ángulos, como una unidad. Euclides mide los ángulos en «rectos», no en grados.",
        "La edición de 1774 no lo cuenta entre los postulados: tiene solo tres, los de construir (trazar una recta, prolongarla y trazar una circunferencia), y lo pone como su axioma XI. Zamorano lo tiene como cuarta petición, como el texto griego.",
        "La primera vez que hace falta es en la proposición 14, aunque ninguna de las dos ediciones lo cita ahí: «dos rectos» de un lado son iguales a «dos rectos» del otro."
      ],
      "enClase": []
    },
    {
      "id": "prop-14",
      "tipo": "proposicion",
      "n": 14,
      "clase": "teorema",
      "titulo": "Si suman dos rectos, forman una recta",
      "zam": {
        "num": "Thorema 7, Proposicion 14",
        "escaneo": 35,
        "enun": "Si de alguna linea recta, y de vn puncto suyo tiradas dos lineas rectas hazia diuersas partes de vna y otra parte hizieren angulos yguales a dos rectos, ellas entre si seran en derecho de linea recta.",
        "dem": "De alguna linea recta AB y de vn punto en ella B, las dos lineas rectas BC, BD no tiradas hazia vna misma parte hagan de vna y otra parte los angulos ABC, ABD yguales a dos rectos. Digo que la linea recta BD esta en derecho de la linea CB porque si a la linea BD no le esta en derecho la linea BC estele a la DB la linea BE puesta en derecho. Pues porque la linea recta AB cayo sobre la linea recta DBE luego los angulos ABD, ABE son yguales a dos rectos [[prop-13|(por la 13 proposicion)]] po los angulos ABC, ABD son yguales a dos rectos, luego las angulos DBA, ABE son yguales a los angulos CBA, ABD y quitado el angulo comun ABD luego el angulo que resta ABE es ygual al angulo que resta ABC el menor al mayor, lo qual es impossible. Luego la linea BE no esta en derecho a la linea BD. Tambien de la misma manera demostraremos que ni otra linea fuera de la linea BC, luego a la linea DB estale en derecho la linea BC. Luego si de alguna linea recta y de vn punto suyo, tiradas dos lineas rectas acia diuersas partes, hizieren angulos de vna y otra parte yguales a dos rectos, ellas entre si estaran en derecho de linea recta, que conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XIV. Teorema",
        "pag": 17,
        "escaneo": 41,
        "enun": "Si de un punto de una recta qualquiera se tiran otras dos ácia diferentes partes, haciendo con ella los ángulos contiguos iguales á dos rectos; estarán estas dos lineas directamente; esto es, formarán una recta.",
        "dem": "Supóngase, que las dos rectas BC, BD tiradas del punto B de la recta AB ácia diferentes partes, forman los dos ángulos contiguos ABC, ABD iguales á dos rectos. Digo, que las dos lineas BC, BD formarán una recta. Porque á no ser así, otra linea BE formaria una recta con la CB: é insistiendo la recta AB sobre la recta CBE, los ángulos ABC, ABE serian iguales á dos rectos [[prop-13|a 13. I.]]. Tambien los ángulos ABC, ABD son iguales á dos rectos: luego los ángulos CBA, ABE serian iguales á los CBA, ABD: y quitando el ángulo comun CBA, resultaria el restante ABE igual al restante ABD [[nc-3|b Axi. 3.]], el menor al mayor, lo qual es imposible: luego la linea BE no forma una recta con la BC. De la misma manera se demostrará, que ninguna otra linea, sino es la BD, forma una recta con la BC: luego las lineas CB, BD forman una recta. Por consiguiente si de un punto &c. L. Q. D. D."
      },
      "facil": "Si dos segmentos salen de un mismo punto hacia lados distintos de una recta, y los dos ángulos que forman con ella suman dos rectos (180°), los dos segmentos forman una sola recta.",
      "pasos": [
        [
          "Del punto B de la recta AB salen BC y BD, hacia lados distintos, y los ángulos ABC y ABD juntos son iguales a dos rectos.",
          []
        ],
        [
          "Supongo que BD no sigue a CB en línea recta, y que lo que sigue a CB es otra recta, BE. La dibujo así para ver adónde lleva.",
          [
            "post-2"
          ]
        ],
        [
          "AB cae sobre la recta que forman CB y BE: por la proposición 13, los ángulos ABC y ABE juntos son dos rectos.",
          [
            "prop-13"
          ]
        ],
        [
          "También ABC y ABD juntos son dos rectos. Todos los ángulos rectos son iguales, así que ABC + ABE = ABC + ABD.",
          [
            "post-4",
            "nc-1"
          ]
        ],
        [
          "Les saco a los dos lados el ángulo ABC: queda ABE = ABD.",
          [
            "nc-3"
          ]
        ],
        [
          "Pero ABE es solo una parte de ABD: una parte sería igual al todo, y eso es imposible.",
          [
            "nc-5"
          ]
        ],
        [
          "Así que ninguna otra recta sigue a CB: la que la sigue es BD. CB y BD forman una sola recta.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-2",
        "prop-13",
        "post-4",
        "nc-1",
        "nc-3",
        "nc-5"
      ],
      "historia": [
        "Es la recíproca de la proposición 13. Aquella dice: si forman una recta, los ángulos suman dos rectos. Esta dice al revés: si suman dos rectos, forman una recta.",
        "Sirve para probar que tres puntos están alineados, algo que a simple vista engaña: basta ver que los dos ángulos suman dos rectos. Euclides la usa así, por ejemplo, en la proposición 47, el teorema de Pitágoras.",
        "Otra demostración por el absurdo: la figura dibuja una recta BE que no existe, la «otra prolongación» de CB. Al final se borra, y queda la única: BD.",
        "Para decir que ABC + ABE es igual a ABC + ABD hace falta que todos los rectos sean iguales, el postulado 4. Ninguna de las dos ediciones lo cita: lo dan por sabido.",
        "Zamorano vuelve a escribir «Thorema», y se le escapan «las angulos» y un «po» suelto. Están así en el libro."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 30 360 200",
        "puntos": {
          "A": [
            170.0,
            50.0
          ],
          "B": [
            200.0,
            200.0
          ],
          "C": [
            40.0,
            200.0
          ],
          "D": [
            360.0,
            200.0
          ],
          "E": [
            355.247316,
            161.292497
          ]
        },
        "rotulos": {
          "A": [
            -12,
            -6
          ],
          "B": [
            0,
            18
          ],
          "C": [
            -6,
            16
          ],
          "D": [
            6,
            16
          ],
          "E": [
            10,
            -10
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "C",
              "B",
              "D"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "A",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 30,
              "hasta": 4
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 2,
              "r": 30,
              "hasta": 1
            }
          ],
          [
            {
              "t": "punto",
              "p": "E",
              "hasta": 6
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "E",
              "hasta": 6
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "E",
              "color": 3,
              "r": 30,
              "hasta": 6
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 2,
              "r": 46,
              "cuna": false,
              "hasta": 6
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "E"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "B",
                "E",
                "D"
              ],
              "aux": true
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 30
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 2,
              "r": 30
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "D"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-15",
      "tipo": "proposicion",
      "n": 15,
      "clase": "teorema",
      "titulo": "Los ángulos opuestos por el vértice",
      "zam": {
        "num": "Theorema 8, Proposicion 15",
        "escaneo": 36,
        "enun": "Si dos lineas rectas se cortaren entre si, haran los angulos contrarios yguales entre si.",
        "dem": "Cortense entre si las dos lineas rectas AB, CD en el punto E, digo que el angulo AEC es ygual al angulo DEB, porque cayendo la linea recta AE sobre la linea recta CD haze los angulos CEA, AED, luego los angulos CEA, AED son yguales a dos rectos [[prop-13|(por la 13 proposicion)]]. Item, porque la linea recta DE cae sobre la linea recta AB haziendo los angulos AED, DEB luego los angulos AED, DEB son yguales a dos rectos [[prop-13|(por la misma 13 proposicion)]] y esta demostrado que los angulos CEA, AED son yguales a dos rectos, luego los angulos CEA, AED son yguales a los angulos AED, DEB, quitado pues el comun AED, el angulo CEA que resta, es ygual al angulo que resta DEB. De la misma forma se demostrara que tambien los angulos CEB, DEA son yguales. Luego si dos lineas rectas se cortaren entre si, haran los angulos contrarios yguales entre si, que conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XV. Teorema",
        "pag": 17,
        "escaneo": 41,
        "enun": "Si dos rectas se cortan mutuamente; formarán los ángulos verticales iguales entre sí.",
        "dem": "Córtense mutuamente las dos rectas AB, CD en el punto E. Digo, que el ángulo AEC será igual al DEB, y el CEB igual al AED. Porque insistiendo la recta AE sobre la recta CD, forma los ángulos CEA, AED, que juntos, son iguales á dos rectos [[prop-13|a 13. I.]]: é insistiendo asimismo la recta DE sobre la AB, forma los ángulos AED, DEB iguales á dos rectos [[prop-13|a 13. I.]]: luego los ángulos CEA, AED son iguales á los AED, DEB: quítese ahora el ángulo comun AED; y el restante CEA será igual al restante BED. De la misma manera se demostrará la igualdad de los ángulos CEB, AED. Por consiguiente si dos rectas &c. L. Q. D. D."
      },
      "facil": "Cuando dos rectas se cortan, los ángulos opuestos por el vértice son iguales.",
      "corolario": {
        "e1774": "Cor. 1. Dos rectas, que se cortan mutuamente, forman en el punto en que se cortan ángulos iguales á quatro rectos. Cor. 2. Todos los ángulos formados al rededor de un punto son iguales á quatro rectos.",
        "facil": "Los cuatro ángulos que forman dos rectas al cortarse suman cuatro rectos, es decir, 360°. Y todos los ángulos alrededor de un punto, sean cuantos sean, suman lo mismo: la vuelta entera."
      },
      "pasos": [
        [
          "Las rectas AB y CD se cortan en el punto E. Hay que ver si el ángulo AEC es igual al DEB.",
          []
        ],
        [
          "AE cae sobre la recta CD: por la proposición 13, los ángulos CEA y AED juntos son dos rectos.",
          [
            "prop-13"
          ]
        ],
        [
          "DE cae sobre la recta AB: por la proposición 13, los ángulos AED y DEB juntos también son dos rectos.",
          [
            "prop-13"
          ]
        ],
        [
          "Todos los rectos son iguales, así que CEA + AED = AED + DEB.",
          [
            "post-4",
            "nc-1"
          ]
        ],
        [
          "Les saco a los dos lados el ángulo AED: queda CEA = DEB.",
          [
            "nc-3"
          ]
        ],
        [
          "Del mismo modo, mirando el ángulo CEB, se prueba que CEB = AED: los opuestos por el vértice son iguales.",
          [
            "prop-13",
            "nc-3"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-13",
        "post-4",
        "nc-1",
        "nc-3"
      ],
      "historia": [
        "Proclo cuenta, siguiendo a Eudemo, que el primero en descubrirlo fue Tales de Mileto, y que la demostración rigurosa recién la dio el autor de los Elementos. Tales es el mismo de los ángulos de la base del isósceles, la proposición 5.",
        "Hoy decimos «opuestos por el vértice». Zamorano dice «ángulos contrarios»; la edición de 1774, «verticales», de vértice: así se los sigue llamando en inglés, vertical angles.",
        "En las clases de 7.º es el Teorema 1 (T1), y su demostración es esta misma: dos veces la proposición 13 (en clase, N3), los rectos iguales (N1) y restar lo mismo (N2).",
        "La edición de 1774 trae dos corolarios: los cuatro ángulos que forman dos rectas que se cortan suman cuatro rectos, y lo mismo todos los ángulos alrededor de un punto. Es la vuelta entera, que hoy llamamos 360°. Zamorano no los trae.",
        "Ninguna de las dos ediciones cita el postulado 4 ni la noción común 3, aunque la demostración los usa: dos rectos son iguales a dos rectos, y después se resta el ángulo común."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-t1",
          "slide": "d-t1",
          "txt": "Geometría griega · bloque A · diapositiva «Teorema 1» (T1)"
        }
      ],
      "construccion": {
        "vb": "20 4 360 272",
        "puntos": {
          "A": [
            40.0,
            140.0
          ],
          "B": [
            360.0,
            140.0
          ],
          "C": [
            111.611652,
            51.611652
          ],
          "D": [
            288.388348,
            228.388348
          ],
          "E": [
            200.0,
            140.0
          ]
        },
        "rotulos": {
          "A": [
            -6,
            16
          ],
          "B": [
            6,
            16
          ],
          "C": [
            -10,
            -10
          ],
          "D": [
            10,
            12
          ],
          "E": [
            6,
            -32
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "E",
              "B"
            ],
            [
              "C",
              "E",
              "D"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 36,
              "hasta": 1
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "D",
              "b": "B",
              "color": 2,
              "r": 36,
              "hasta": 1
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "D"
                ]
              ],
              "marca": false
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 36,
              "hasta": 4
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "D",
              "b": "A",
              "color": 3,
              "r": 22,
              "hasta": 4
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "D",
              "b": "B",
              "color": 2,
              "r": 36,
              "hasta": 4
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "D"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "angulo",
              "v": "E",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 36
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "D",
              "b": "B",
              "color": 1,
              "r": 36
            }
          ],
          [
            {
              "t": "angulo",
              "v": "E",
              "a": "C",
              "b": "B",
              "color": 3,
              "r": 22
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "A",
              "b": "D",
              "color": 3,
              "r": 22
            }
          ]
        ]
      }
    },
    {
      "id": "prop-16",
      "tipo": "proposicion",
      "n": 16,
      "clase": "teorema",
      "titulo": "El ángulo exterior",
      "zam": {
        "num": "Theorema 9, Proposicion 16",
        "escaneo": 37,
        "enun": "Estendido vn lado de qualquier triangulo el angulo exterior es mayor que qualquiera de los angulos interiores oppuestos.",
        "dem": "Sea el triangulo ABC y estiendase vn lado suyo y sea BC hasta en D, digo que el angulo exterior ACD es mayor que qualquiera interior que este puesto en la parte contraria, esto es, que el angulo CBA o BAC. Cortese la linea AC en dos partes yguales [[prop-10|(por la 10 proposicion)]] en el puncto E, y estendida la linea BE [[post-2|(por la ʒ peticion)]] tirese asta el puncto Z, y [[prop-3|(por la ʒ proposicion)]] desse la linea EZ ygual a la BE, y tirese ZC [[post-1|(por la primera peticion)]] y estiendase [[post-2|(por la ʒ peticion)]] la linea AC asta en I. Pues porque AE es ygual a la EC, y la BE a la EZ, luego las dos AE, EB son yguales a las dos CE, EZ la vna a la otra, y el angulo AEB [[prop-15|(por la decima quinta proposicion)]] al angulo ZEC por ser opuestos. Luego la basis AB es ygual a la basis ZC, y el triangulo ABE ygual al triangulo ZEC, y los de mas angulos son yguales a los demas angulos el vno al otro debajo de los quales se estienden yguales lados [[prop-4|(por la 4 proposicion)]] luego el angulo BAE es ygual al angulo ECZ, pero el angulo ECD es mayor que el angulo ECZ. Luego mayor es el angulo ACD que el angulo BAI. De la misma forma si se corta en dos partes yguales la linea BC se demostrara que el angulo BCI, conuiene a saber que el angulo ACD es mayor que el angulo ABD. Luego estendido el vn lado de qualquier triangulo, es mayor el angulo exterior que qualquiera de los interiores oppuestos, que es lo que se hauia de demostrar."
      },
      "e1774": {
        "num": "Proposición XVI. Teorema",
        "pag": 18,
        "escaneo": 42,
        "enun": "Prolongado un lado de qualquier triángulo; el ángulo externo es mayor que qualquiera de los internos opuestos.",
        "dem": "Sea el triángulo ABC, y prolónguese el lado BC hasta el punto D. Digo, que el ángulo externo ACD será mayor que qualquiera de los internos opuestos, esto es CBA, BAC. Córtese en dos partes iguales [[prop-10|a 10. I.]] AC en el punto E, y tirada la BE, prolónguese hasta el punto F, de manera que sea EF igual á BE, tírese asimismo FC, y prolónguese AC hasta el punto G. Porque siendo AE igual á EC, y BE á EF, las dos AE, EB son respectivamente iguales á las dos CE, EF, y el ángulo AEB igual [[prop-15|b 15. I.]] al CEF, por ser verticales: luego la base AB es igual á la base CF, y el triángulo AEB igual al CEF, y los demas angulos iguales [[prop-4|c 4. I.]] entre sí, á los quales están opuestos lados iguales: luego el ángulo BAE es igual al ECF: es así que el ECD es mayor que el ECF; por consiguiente el ACD será mayor que el BAE. De la misma manera dividida en dos partes iguales la recta BC, se demostrará, que el ángulo BCG, esto es el ACD [[prop-15|d 15. I.]], es mayor que el ABC. Luego prolongado, &c. L. Q. D. D."
      },
      "facil": "Si se prolonga un lado de un triángulo, el ángulo de afuera que se forma (el ángulo exterior) es mayor que cada uno de los dos ángulos de adentro que no lo tocan.",
      "pasos": [
        [
          "Sea ABC un triángulo. Prolongo BC más allá de C hasta un punto D: el ángulo ACD, que queda afuera, es el ángulo exterior.",
          [
            "post-2"
          ]
        ],
        [
          "Parto AC por la mitad. Lo hago con la construcción de la proposición 10:",
          [
            "prop-10"
          ]
        ],
        [
          "Con centro A y radio AC, y con centro C y radio CA, trazo dos circunferencias. Se cortan, del lado contrario a B, en un punto: lo llamo K. ACK es equilátero.",
          [
            "post-3",
            "prop-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Parto el ángulo AKC por la mitad, como en la proposición 9. Marco un punto L en KA y, con centro K y radio KL, trazo la circunferencia: corta a KC en un punto M.",
          [
            "prop-9",
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro L y radio LM, y con centro M y radio ML, trazo dos circunferencias. Se cortan del lado contrario a K en un punto: lo llamo N.",
          [
            "post-3",
            "prop-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo KN. Corta a AC en un punto E, que la parte por la mitad: AE = EC.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo BE y lo prolongo más allá de E. Con centro E y radio EB trazo la circunferencia: corta a la prolongación en un punto F, y EF = EB.",
          [
            "post-1",
            "post-2",
            "prop-3"
          ]
        ],
        [
          "Trazo FC.",
          [
            "post-1"
          ]
        ],
        [
          "Miro los triángulos AEB y CEF. Tienen AE = EC y EB = EF, y los ángulos AEB y CEF son iguales porque son opuestos por el vértice.",
          [
            "prop-15"
          ]
        ],
        [
          "Por la proposición 4, los dos triángulos son iguales: el ángulo BAE es igual al ECF.",
          [
            "prop-4"
          ]
        ],
        [
          "Pero ECF es solo una parte del ángulo ECD, que es el exterior ACD. Así que ACD es mayor que ECF, y por lo tanto mayor que BAC.",
          [
            "nc-5"
          ]
        ],
        [
          "Del mismo modo, partiendo BC por la mitad, se prueba que el ángulo BCG, con G en la prolongación de AC, es mayor que ABC. Y BCG es igual a ACD, porque son opuestos por el vértice: ACD también es mayor que ABC.",
          [
            "post-2",
            "prop-15"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-2",
        "prop-10",
        "post-3",
        "prop-1",
        "prop-9",
        "post-1",
        "prop-3",
        "prop-15",
        "prop-4",
        "nc-5"
      ],
      "historia": [
        "Es la primera desigualdad entre ángulos del libro, y una de las más usadas: con ella sale enseguida la 17, que dos ángulos de un triángulo suman menos que dos rectos.",
        "Más adelante, en la proposición 32, Euclides demuestra algo más fuerte: el ángulo exterior es igual a la suma de los dos interiores opuestos. Pero para eso necesita el postulado 5, el de las paralelas. Esta proposición no lo usa, y por eso vale también en la geometría hiperbólica, donde las paralelas se comportan distinto. En cambio, falla sobre una esfera: allí las «rectas» (los círculos máximos) son finitas y se cierran, y al prolongar BE hasta el doble se puede dar la vuelta.",
        "El paso clave es prolongar BE hasta el doble, hasta F: así el triángulo CEF es una copia del AEB, dada vuelta, y el ángulo en A aparece copiado junto a C, adentro del ángulo exterior.",
        "Zamorano dibuja las dos mitades de la demostración en una sola figura, dada vuelta, con dos puntos E y dos Z. Y para hacer EZ igual a BE cita «la ʒ proposición», la 2, cuando lo que hace falta es la 3.",
        "La edición de 1774 cita la proposición 10, la 15 dos veces y la 4; no cita nada para decir que el ángulo ECD es mayor que su parte ECF: es la noción común 5."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 24 370 300",
        "puntos": {
          "A": [
            150.0,
            90.0
          ],
          "B": [
            60.0,
            230.0
          ],
          "C": [
            230.0,
            230.0
          ],
          "D": [
            360.0,
            230.0
          ],
          "E": [
            190.0,
            160.0
          ],
          "F": [
            320.0,
            90.0
          ],
          "G": [
            266.0,
            293.0
          ],
          "K": [
            311.243557,
            90.717968
          ],
          "L": [
            222.5596,
            90.323085
          ],
          "M": [
            266.5596,
            167.323085
          ],
          "N": [
            177.875644,
            166.928203
          ]
        },
        "rotulos": {
          "A": [
            -10,
            -12
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            -4,
            18
          ],
          "D": [
            6,
            16
          ],
          "E": [
            -14,
            -2
          ],
          "F": [
            12,
            -8
          ],
          "G": [
            12,
            8
          ],
          "K": [
            12,
            -6
          ],
          "L": [
            -6,
            -12
          ],
          "M": [
            14,
            4
          ],
          "N": [
            -12,
            6
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "C",
              "D"
            ],
            [
              "B",
              "E",
              "F"
            ],
            [
              "A",
              "C",
              "G"
            ],
            [
              "A",
              "E",
              "C"
            ],
            [
              "K",
              "L",
              "A"
            ],
            [
              "K",
              "M",
              "C"
            ],
            [
              "K",
              "E",
              "N"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "E"
              ],
              [
                "E",
                "C"
              ]
            ],
            [
              [
                "B",
                "E"
              ],
              [
                "E",
                "F"
              ]
            ],
            [
              [
                "A",
                "C"
              ],
              [
                "A",
                "K"
              ],
              [
                "C",
                "K"
              ]
            ],
            [
              [
                "K",
                "L"
              ],
              [
                "K",
                "M"
              ]
            ],
            [
              [
                "L",
                "M"
              ],
              [
                "L",
                "N"
              ],
              [
                "M",
                "N"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "prolonga",
              "desde": "B",
              "por": "C",
              "largo": 312
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "D",
              "color": 1,
              "r": 30,
              "hasta": 10
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "C",
              "pasa": [
                "C",
                "K"
              ],
              "aux": 3
            },
            {
              "t": "circulo",
              "c": "C",
              "por": "A",
              "pasa": [
                "A",
                "K"
              ],
              "aux": 3
            },
            {
              "t": "punto",
              "p": "K",
              "aux": 6
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "A",
              "aux": 6
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "C",
              "aux": 6
            }
          ],
          [
            {
              "t": "punto",
              "p": "L",
              "aux": 6
            },
            {
              "t": "circulo",
              "c": "K",
              "por": "L",
              "pasa": [
                "L",
                "M"
              ],
              "aux": 4
            },
            {
              "t": "punto",
              "p": "M",
              "aux": 6
            }
          ],
          [
            {
              "t": "circulo",
              "c": "L",
              "por": "M",
              "pasa": [
                "M",
                "N"
              ],
              "aux": 5
            },
            {
              "t": "circulo",
              "c": "M",
              "por": "L",
              "pasa": [
                "L",
                "N"
              ],
              "aux": 5
            },
            {
              "t": "punto",
              "p": "N",
              "aux": 6
            }
          ],
          [
            {
              "t": "segmento",
              "a": "K",
              "b": "N",
              "aux": 6
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "E"
                ],
                [
                  "E",
                  "C"
                ]
              ]
            }
          ],
          [
            {
              "t": "segmento",
              "a": "B",
              "b": "E"
            },
            {
              "t": "prolonga",
              "desde": "B",
              "por": "E",
              "largo": 307.296
            },
            {
              "t": "circulo",
              "c": "E",
              "por": "B",
              "pasa": [
                "B",
                "F"
              ],
              "aux": true
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "E"
                ],
                [
                  "E",
                  "F"
                ]
              ],
              "rayas": 2
            }
          ],
          [
            {
              "t": "segmento",
              "a": "F",
              "b": "C"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "E",
                "B"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "C",
                "E",
                "F"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "A",
              "b": "B",
              "color": 2,
              "r": 18,
              "aux": true
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "C",
              "b": "F",
              "color": 2,
              "r": 18,
              "aux": true
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "E",
              "color": 3,
              "r": 30,
              "hasta": 11
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "E",
              "b": "F",
              "color": 3,
              "r": 22,
              "hasta": 11
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "E",
              "b": "D",
              "color": 1,
              "r": 42,
              "cuna": false,
              "hasta": 11
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "F",
              "b": "D",
              "color": 2,
              "r": 22,
              "hasta": 11
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "A",
              "por": "C",
              "largo": 245.805
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "D",
              "color": 1,
              "r": 30
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "G",
              "color": 1,
              "r": 30
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 4,
              "r": 30
            }
          ]
        ]
      }
    },
    {
      "id": "prop-17",
      "tipo": "proposicion",
      "n": 17,
      "clase": "teorema",
      "titulo": "Dos ángulos de un triángulo, menos de dos rectos",
      "zam": {
        "num": "Theorema 10, Proposicion 17",
        "escaneo": 37,
        "enun": "Tomados de qualquiera suerte los dos angulos de qualquier triangulo son menores que dos rectos.",
        "dem": "Sea el triangulo ABC, digo que los dos angulos del mismo triangulo ABC tomados de qualquier manera, son menores que dos rectos. Porque estiendase [[post-2|(por la ʒ petition]] el lado BC asta en D, y porque del triangulo ABC [[prop-16|(por la precedente)]] el angulo exterior que es ACD es mayor que el angulo ABC interior. Admitase el angulo comun ACB, son pues los angulos ACD, ACB mayores que los angulos ABC, BCA. Y [[prop-13|(por la 13 proposition)]] los angulos ACD, ACB son yguales a dos rectos. Luego los angulos ABC, ACB son menores que dos rectos. De la misma forma mostraremos tambien que los angulos BAC, ACB son menores que dos rectos, y tambien los angulos CAB, ABC. Luego tomados de qualquiera suerte los dos angulos de qualquier triangulo son menores que dos rectos. Lo qual conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XVII. Teorema",
        "pag": 19,
        "escaneo": 43,
        "enun": "Dos ángulos qualesquiera de todo triángulo tomados juntos, son menores que dos rectos.",
        "dem": "Sea el triángulo ABC. Digo, que qualesquiera de sus dos ángulos tomados juntos, serán menores que dos rectos. Prolónguese BC hasta D, y siendo ACD el ángulo externo del triángulo ABC, será mayor que el ángulo interno opuesto ABC [[prop-16|a 16. I.]]: júntese á dichos dos el ACB; y resultará, que los ángulos ACD, ACB son mayores que los ABC, ACB: es así que los ACD, ACB son iguales á dos rectos [[prop-13|b 13. I.]]: luego los ángulos ABC, BCA son menores que dos rectos. Con el mismo método se demostrará, que los ángulos BAC, ACB, y tambien los CAB, ABC son menores que dos rectos. Por consiguiente dos ángulos, &c. L. Q. D. D."
      },
      "facil": "En cualquier triángulo, dos de sus ángulos, sean cuales sean, suman menos que dos rectos (menos de 180°).",
      "pasos": [
        [
          "Sea ABC un triángulo. Hay que ver que los ángulos ABC y ACB, juntos, son menos que dos rectos.",
          []
        ],
        [
          "Prolongo BC más allá de C hasta un punto D.",
          [
            "post-2"
          ]
        ],
        [
          "Por la proposición 16, el ángulo exterior ACD es mayor que el interior opuesto ABC.",
          [
            "prop-16"
          ]
        ],
        [
          "A los dos les sumo el ángulo ACB: ACD + ACB es mayor que ABC + ACB.",
          []
        ],
        [
          "Pero ACD y ACB juntos son dos rectos, por la proposición 13. Entonces ABC + ACB es menos que dos rectos.",
          [
            "prop-13"
          ]
        ],
        [
          "Del mismo modo, prolongando otro lado, se ve que BAC + ACB y que BAC + ABC también son menos que dos rectos.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-2",
        "prop-16",
        "prop-13"
      ],
      "historia": [
        "Es un paso hacia la proposición 32. Allí, con el postulado 5, Euclides prueba que los tres ángulos de un triángulo suman exactamente dos rectos. Acá, sin las paralelas, solo puede decir que dos de ellos suman menos.",
        "Es la recíproca del postulado 5, como ya notaba Proclo. El postulado dice: si dos rectas cortadas por una tercera forman de un lado ángulos que suman menos de dos rectos, se encuentran de ese lado. Esta proposición dice: si se encuentran, formando un triángulo, esos ángulos suman menos de dos rectos.",
        "Para sumarles ACB a dos ángulos desiguales hace falta saber que si a cosas desiguales se les suma lo mismo, siguen desiguales. No es una de las cinco nociones comunes de Euclides; la edición de 1774 la tiene como su axioma IV y Zamorano como su cuarta común sentencia, pero ninguno de los dos la cita acá.",
        "Zamorano cita la proposición anterior como «la precedente», y deja abierto un paréntesis: «(por la ʒ petition». Está así en el libro."
      ],
      "enClase": [],
      "construccion": {
        "vb": "24 36 370 210",
        "puntos": {
          "A": [
            190.0,
            60.0
          ],
          "B": [
            50.0,
            220.0
          ],
          "C": [
            250.0,
            220.0
          ],
          "D": [
            370.0,
            220.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            -2,
            18
          ],
          "D": [
            6,
            16
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "C",
              "D"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 4,
              "r": 30
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 3,
              "r": 30,
              "hasta": 5
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "B",
              "por": "C",
              "largo": 332
            },
            {
              "t": "punto",
              "p": "D"
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "D",
              "color": 1,
              "r": 30,
              "hasta": 5
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "D",
              "hasta": 5
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 2,
              "r": 30
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 3,
              "r": 30
            }
          ]
        ]
      }
    },
    {
      "id": "prop-18",
      "tipo": "proposicion",
      "n": 18,
      "clase": "teorema",
      "titulo": "Al lado mayor, el ángulo mayor",
      "zam": {
        "num": "Theorema 11, Proposicion 18",
        "escaneo": 38,
        "enun": "El mayor lado de todo triangulo se estiende debaxo del mayor angulo.",
        "dem": "Sea el triangulo ABC que tenga el lado AC mayor que el lado AB, digo que tambien el angulo ABC es mayor que el angulo BCA, porque AC es mayor que AB, hagasse ygual la linea AD a la AB [[prop-3|(por la 3 proposicion)]] y [[post-1|(por la 1 peticion)]] tirese la linea BD, y porque del triangulo BDC el angulo exterior ADB [[prop-16|(por la proposicion 16)]] es mayor que el angulo oppuesto y interior DCB, y es ygual [[prop-5|(por la 5 proposicion)]] el angulo ADB al angulo ABD porque el lado AB es ygual al AD, luego mayor es el angulo ABD que el angulo ACB, luego mucho mayor es el angulo ABC que el angulo ACB, luego el mayor lado de todo triangulo se estiende debaxo de mayor angulo, que conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XVIII. Teorema",
        "pag": 19,
        "escaneo": 43,
        "enun": "En todo triángulo, el ángulo opuesto á mayor lado es mayor.",
        "dem": "Sea el triángulo ABC, que tenga el lado AC mayor que el AB. Digo, que el ángulo ABC será mayor que el BCA. Siendo el lado AC mayor que el AB, tómese la parte AD [[prop-3|a 3. I.]] igual á AB, y tírese la recta BD: el ángulo externo ADB es mayor que el interno opuesto DCB [[prop-16|b 16. I.]] del triángulo BDC; pero el ángulo ADB es igual al ABD, por ser el lado AB igual al AD [[prop-5|c 5. I.]]: luego tambien el ángulo ABD será mayor que el ACB; y por consiguiente el ABC mucho mayor que el ACB. Luego en todo, &c. L. Q. D. D."
      },
      "facil": "En un triángulo, frente al lado más largo está el ángulo más grande: si un lado es mayor que otro, el ángulo opuesto al primero es mayor que el opuesto al segundo.",
      "pasos": [
        [
          "Sea ABC un triángulo con el lado AC mayor que el AB. Hay que ver que el ángulo ABC, opuesto a AC, es mayor que el ACB, opuesto a AB.",
          []
        ],
        [
          "En AC corto un segmento igual a AB. Lo hago con la construcción de la proposición 3:",
          [
            "prop-3"
          ]
        ],
        [
          "AB ya sale de A, así que no hace falta llevarlo con la proposición 2: con centro A y radio AB trazo la circunferencia.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Como AC es mayor que AB, la circunferencia corta a AC en un punto: lo llamo D. B y D están en la circunferencia de centro A, así que AD = AB.",
          [
            "def-15"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo BD.",
          [
            "post-1"
          ]
        ],
        [
          "En el triángulo BDC, el ángulo ADB es exterior. Por la proposición 16, es mayor que el interior opuesto DCB, que es el ángulo ACB.",
          [
            "prop-16"
          ]
        ],
        [
          "En el triángulo ABD, AB = AD. Por la proposición 5, el ángulo ADB es igual al ABD. Entonces ABD también es mayor que ACB.",
          [
            "prop-5"
          ]
        ],
        [
          "Y ABD es solo una parte del ángulo ABC: con más razón, ABC es mayor que ACB.",
          [
            "nc-5"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-3",
        "post-3",
        "def-15",
        "post-1",
        "prop-16",
        "prop-5",
        "nc-5"
      ],
      "historia": [
        "Hoy se resume como «a mayor lado se opone mayor ángulo». La proposición 19 es la recíproca: a mayor ángulo, mayor lado.",
        "Zamorano dice que el lado «se extiende debajo» del ángulo, y la edición de 1774 que el ángulo es «opuesto» al lado. Es la manera antigua de decir opuesto: el lado queda debajo del ángulo, como si el ángulo lo mirara desde arriba.",
        "La demostración junta dos ideas anteriores: copiar AB sobre AC para tener un isósceles, como en la proposición 5, y el ángulo exterior de la 16.",
        "Las dos ediciones citan las proposiciones 3, 16 y 5. Ninguna cita nada para el último paso, «mucho mayor»: es la noción común 5, una parte es menor que el todo."
      ],
      "enClase": [],
      "construccion": {
        "vb": "30 26 340 220",
        "puntos": {
          "A": [
            150.0,
            50.0
          ],
          "B": [
            60.0,
            220.0
          ],
          "C": [
            340.0,
            220.0
          ],
          "D": [
            293.350029,
            178.260552
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            12,
            10
          ],
          "D": [
            10,
            -10
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "D",
              "C"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "A",
                "D"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 4,
              "r": 30,
              "hasta": 1
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 3,
              "r": 30
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "B",
              "aux": 4,
              "pasa": [
                "B",
                "D"
              ]
            }
          ],
          [
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "D"
                ],
                [
                  "A",
                  "B"
                ]
              ]
            }
          ],
          [
            {
              "t": "segmento",
              "a": "B",
              "b": "D"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "B",
                "D",
                "C"
              ],
              "aux": true
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "A",
              "b": "B",
              "color": 1,
              "r": 24
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "D"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 1,
              "r": 24
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 4,
              "r": 40,
              "cuna": false
            }
          ]
        ]
      }
    },
    {
      "id": "prop-19",
      "tipo": "proposicion",
      "n": 19,
      "clase": "teorema",
      "titulo": "Al ángulo mayor, el lado mayor",
      "zam": {
        "num": "Thorema 12, Proposicion 19",
        "escaneo": 39,
        "enun": "Debaxo del mayor angulo de todo triangulo se estiende mayor lado.",
        "dem": "Sea el triangulo ABC que tenga el angulo ABC mayor que el angulo BCA, digo que el lado AC es mayor que el lado AB porque sino lo es, o sera el lado AC ygual al lado AB o menor que el. Ygual no lo es el lado AC al lado AB que seria [[prop-5|(por la 5 proposicion)]] ygual el angulo ABC al angulo ACB, no es ygual, luego el lado AC en ninguna manera es ygual al lado AB. Tampoco el lado AC es menor que el lado AB porque el angulo ABC seria menor que el angulo ACB, pero no lo es, luego el lado AC en ninguna manera es menor que el lado AB. Luego mayor es el lado AC que el lado AB, luego debaxo del mayor angulo de todo triangulo se estiende mayor lado. Lo qual conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XIX. Teorema",
        "pag": 20,
        "escaneo": 44,
        "enun": "En todo triángulo el lado opuesto á mayor ángulo es mayor.",
        "dem": "Sea el triángulo ABC, que tenga el ángulo ABC mayor que el BCA. Digo, que tambien el lado AC será mayor que el AB. Porque si no fuera así, ó el lado AC sería igual al AB, ó menor: no es igual; pues para esto sería necesario, que el ángulo ABC fuese tambien igual [[prop-5|a 5. I.]] al ACB, lo que no es así: tampoco es menor; pues en tal caso el ángulo ABC sería necesariamente menor que el ACB [[prop-18|b 18. I.]]; pero es al contrario: luego el lado AC no es menor que el AB: y por otra parte queda demostrado no serle igual: luego es mayor. Por consiguiente en todo, &c. L. Q. D. D."
      },
      "facil": "En un triángulo, frente al ángulo más grande está el lado más largo: si un ángulo es mayor que otro, el lado opuesto al primero es mayor que el opuesto al segundo.",
      "pasos": [
        [
          "Sea ABC un triángulo con el ángulo ABC mayor que el ACB. Hay que ver que AC, el lado opuesto a ABC, es mayor que AB, el opuesto a ACB.",
          []
        ],
        [
          "Si AC no fuera mayor que AB, sería igual o menor. Veo los dos casos.",
          []
        ],
        [
          "Igual no puede ser: si AC = AB, por la proposición 5 los ángulos ABC y ACB serían iguales, y ABC es mayor.",
          [
            "prop-5"
          ]
        ],
        [
          "Menor tampoco: si AC fuera menor que AB, por la proposición 18 el ángulo opuesto a AC, que es ABC, sería menor que el ACB, y es mayor.",
          [
            "prop-18"
          ]
        ],
        [
          "Queda una sola posibilidad: AC es mayor que AB.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-5",
        "prop-18"
      ],
      "historia": [
        "Es la recíproca de la proposición 18. Juntas dicen que en un triángulo los lados y los ángulos opuestos van en el mismo orden: el lado más largo está frente al ángulo más grande, y el más corto frente al más chico.",
        "La demostración no construye nada: descarta. Entre dos segmentos hay solo tres posibilidades, mayor, igual o menor; si dos llevan a algo imposible, queda la tercera.",
        "Un ejemplo que se usa mucho: en un triángulo rectángulo, por la proposición 17, los otros dos ángulos son menores que el recto. Entonces, por esta, la hipotenusa, que está frente al recto, es el lado más largo.",
        "Zamorano cita la proposición 5 en el caso «igual», pero no cita la 18 en el caso «menor». La edición de 1774 cita las dos. La figura de Zamorano es un triángulo rectángulo."
      ],
      "enClase": [],
      "construccion": {
        "vb": "30 26 340 220",
        "puntos": {
          "A": [
            150.0,
            50.0
          ],
          "B": [
            60.0,
            220.0
          ],
          "C": [
            340.0,
            220.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            12,
            10
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 4,
              "r": 30
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 3,
              "r": 30
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ]
              ],
              "marca": false
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "A",
                  "B"
                ]
              ],
              "supuesto": true,
              "hasta": 3
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-20",
      "tipo": "proposicion",
      "n": 20,
      "clase": "teorema",
      "titulo": "Dos lados juntos, mayores que el tercero",
      "zam": {
        "num": "Theorema 13, Proposicion 20",
        "escaneo": 39,
        "enun": "Los dos lados de todo triangulo tomados en qualquier manera son mayores que el que resta.",
        "dem": "Sea el triangulo ABC. Digo que los lados del mismo triangulo ABC son mayores que el que resta de qualquier manera que se tomen, es a saber BA, AC mayores que BC y BC, AB que AC y BC, CA que el mismo AB. Estiendase [[post-2|(por la ʒ peticion)]] BA hasta el punto D, y [[prop-3|(por la ʒ proposicion)]] pongase AD ygual a la AC y tirese DC. Pues porque DA es ygual a la AC es ygual el angulo ADC [[prop-5|(por la 5 proposicion)]] al angulo ACD y el angulo BCD es mayor que el angulo ACD, luego el angulo BCD es mayor que el angulo ADC y porque es el triangulo DCB que tiene mayor el angulo BCD que el angulo ADC y al mayor angulo se le estiende mayor lado [[prop-19|(por la 18 proposicion)]] luego DB es mayor que BC, po es ygual DB a las dos AC, AB, luego mayores son los lados BA, AC que el mismo BC. De la misma forma demostraremos que tambien los lados AB, BC son mayores que CA y tambien BC, CA que AB, luego los dos lados de todo triangulo tomados en qualquier manera son mayores que el que resta, lo qual conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XX. Teorema",
        "pag": 20,
        "escaneo": 44,
        "enun": "Dos lados qualesquiera de todo triángulo tomados juntos son mayores que el otro.",
        "dem": "Sea el triángulo ABC. Digo, que dos lados qualesquiera de él juntos, serán mayores que el otro: esto es, que los lados BA, AC son mayores que el BC; y los AB, BC mayores que el AC, y BC, CA mayores que AB. Prolónguese el lado BA hasta D; de suerte, que sea AD [[prop-3|a 3. I.]] igual á CA, y tírese DC. Siendo, pues, DA igual á AC, será tambien el ángulo ADC igual [[prop-5|b 5. I.]] al ACD; pero el ángulo BCD es mayor que el ACD: luego BCD es mayor que ADC. Siendo, pues, el ángulo BCD de un triángulo DCB mayor que otro BDC, el lado DB opuesto al mayor ángulo será mayor que el BC: es así que el DB es igual á los BA, AC: luego BA, AC juntos son mayores que el BC. De la misma suerte demostrarémos, que, los lados AB, BC son mayores que el CA; y los BC, CA juntos mayores que el AB. Por consiguiente dos, &c. L. Q. D. D."
      },
      "facil": "En cualquier triángulo, dos lados juntos son más largos que el tercero. Por eso el camino recto entre dos puntos es más corto que cualquier desvío por un tercero.",
      "pasos": [
        [
          "Sea ABC un triángulo. Hay que ver que BA y AC, juntos, son mayores que BC; con los otros pares es igual.",
          []
        ],
        [
          "Prolongo BA más allá de A, y sobre la prolongación corto un segmento igual a AC. Lo hago con la construcción de la proposición 3:",
          [
            "post-2",
            "prop-3"
          ]
        ],
        [
          "AC ya sale de A, así que no hace falta llevarlo con la proposición 2: con centro A y radio AC trazo la circunferencia. Corta a la prolongación en un punto: lo llamo D, y AD = AC.",
          [
            "post-3",
            "def-15"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo DC.",
          [
            "post-1"
          ]
        ],
        [
          "En el triángulo ACD, AD = AC. Por la proposición 5, el ángulo ADC es igual al ACD.",
          [
            "prop-5"
          ]
        ],
        [
          "El ángulo ACD es solo una parte del BCD. Entonces BCD es mayor que ACD, y por lo tanto mayor que ADC, que es el mismo BDC.",
          [
            "nc-5"
          ]
        ],
        [
          "En el triángulo DBC, el ángulo BCD es mayor que el BDC. Por la proposición 19, el lado opuesto al mayor, DB, es mayor que BC.",
          [
            "prop-19"
          ]
        ],
        [
          "Pero DB es BA más AD, y AD = AC: DB es BA más AC. Así que BA y AC juntos son mayores que BC.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-2",
        "prop-3",
        "post-3",
        "def-15",
        "post-1",
        "prop-5",
        "nc-5",
        "prop-19"
      ],
      "historia": [
        "Es lo que hoy se llama la desigualdad triangular. Es tan importante que, en la matemática de hoy, cualquier manera de medir distancias tiene que cumplirla.",
        "Proclo cuenta que los epicúreos se burlaban de esta proposición: decían que hasta un burro lo sabe, porque si se le pone pasto en una punta va derecho, sin dar la vuelta por los otros dos lados. Proclo responde que una cosa es que se vea y otra que esté demostrada.",
        "La proposición 22 la necesita: tres segmentos forman un triángulo solo si cada dos juntos son mayores que el tercero.",
        "Zamorano cita «la ʒ proposición» para cortar AD, cuando corresponde la 3, y «la 18» para el último paso, cuando es la 19, la de al mayor ángulo el mayor lado. También se le escapa un «po» suelto. La edición de 1774 no cita nada en ese paso."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 4 390 246",
        "puntos": {
          "A": [
            250.0,
            110.0
          ],
          "B": [
            50.0,
            230.0
          ],
          "C": [
            330.0,
            230.0
          ],
          "D": [
            373.669388,
            35.798367
          ]
        },
        "rotulos": {
          "A": [
            -12,
            -8
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            10,
            12
          ],
          "D": [
            10,
            -8
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "A",
              "D"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "D"
              ],
              [
                "A",
                "C"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "B",
              "por": "A",
              "largo": 391.46
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "C",
              "pasa": [
                "C",
                "D"
              ],
              "aux": true
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "D"
                ],
                [
                  "A",
                  "C"
                ]
              ]
            }
          ],
          [
            {
              "t": "segmento",
              "a": "D",
              "b": "C"
            }
          ],
          [
            {
              "t": "angulo",
              "v": "D",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 30,
              "hasta": 7
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "D",
              "b": "A",
              "color": 1,
              "r": 30,
              "hasta": 7
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "D",
              "color": 2,
              "r": 46,
              "cuna": false,
              "hasta": 7
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "B"
                ]
              ],
              "marca": false
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "A"
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-21",
      "tipo": "proposicion",
      "n": 21,
      "clase": "teorema",
      "titulo": "Un camino por adentro del triángulo",
      "zam": {
        "num": "Theorema 14, Proposicion 21",
        "escaneo": 40,
        "enun": "Si de los terminos del vn lado de vn triangulo se dieren dentro del dos lineas rectas: las que se dieren seran menores que los dos lados del triangulo y contendran mayor angulo.",
        "dem": "Sobre el lado BC del triangulo ABC desde los terminos de la misma BC dense dos lineas rectas dentro del BD, CD digo que BD, CD son menores que los lados BA, AC que restan del triangulo, y que el angulo BDC es mayor que BAC porque estiendase [[post-2|(por la ʒ peticion)]] la linea BD asta E y porque [[prop-20|(por la 20 proposicion)]] los dos lados de todo triangulo son mas largos que el restante, seran los dos lados AB, AE del triangulo ABE mayores que BE y puesta comun la linea EC luego las lineas BA, AC son mayores que las lineas BE, EC. Y porque por la misma los dos lados CE, ED del triangulo CED son mayores que DC, puesta pues comun BD seran mayores las lineas CE, EB que las lineas CD, DB y esta demostrado que BA, AC son mayores que BE, EC. Luego mucho mayores son BA, AC que las lineas BD, DC. Demas desto porque [[prop-16|(por la 16 proposicion)]] el angulo exterior de qualquiera triangulo es mayor que el opuesto interior, luego el angulo BDC exterior del triangulo CDE es mayor que el angulo CED. Por lo qual tambien el angulo exterior CEB del triangulo ABE es mayor que el angulo BAC. Pero esta demostrado que el angulo BDC es mayor que CEB. Luego mucho mayor es el angulo BDC que el angulo BAC. Luego si de los terminos del vn lado de vn triangulo se dieren dentro del dos lineas rectas las que se dieren seran menores que los dos lados que restan del triangulo, y contendran mayor angulo. Lo qual conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XXI. Teorema",
        "pag": 21,
        "escaneo": 45,
        "enun": "Si de los extremos de qualquier lado de un triángulo se tiran dos rectas á un punto dentro de él, serán menores que los otros dos lados del triángulo; y el ángulo contenido por ellas será mayor que el comprehendido por dichos lados.",
        "dem": "Sobre el lado BC del triángulo ABC de los extremos B, C tírense á un punto D dentro del triángulo dos rectas BD, DC. Digo, que los lados BD, DC serán menores que los BA, AC, y que el ángulo BDC será mayor que el BAC. Prolónguese la recta BD hasta encontrar el lado AC en E; y siendo los dos lados juntos de un triángulo mayores que el otro [[prop-20|a 20. I.]], serán los dos lados BA, AE del triángulo ABE mayores que el lado BE: añádase EC, y resultarán BA, AC mayores que BE, EC b Ax. 4. Además de esto, siendo los dos lados CE, ED del triángulo CED mayores que el lado CD; añadiendo DB, resultarán CE, EB mayores que CD, DB c Ax. 4.; pero se ha demostrado que BA, AC son mayores que BE, EC: luego los lados BA, AC son mucho mayores que los BD, DC. Además, siendo el ángulo externo de qualquier triángulo mayor que el interno opuesto [[prop-16|d 16. I.]], será el ángulo externo BDC del triángulo CDE mayor que el ángulo CED; pero el ángulo externo CEB es mayor que el BAC: luego el BDC será mucho mayor que el BAC. Por consiguiente si de los, &c. L. Q. D. D."
      },
      "facil": "Si desde los extremos de un lado de un triángulo se va hasta un punto de adentro, ese camino es más corto que el que va por los otros dos lados, pero el ángulo que se forma adentro es más abierto que el ángulo del triángulo.",
      "pasos": [
        [
          "Sea ABC un triángulo y D un punto adentro. Trazo BD y DC. Hay que ver que BD y DC juntos son menores que BA y AC, y que el ángulo BDC es mayor que el BAC.",
          [
            "post-1"
          ]
        ],
        [
          "Prolongo BD más allá de D hasta que corte a AC en un punto: lo llamo E.",
          [
            "post-2"
          ]
        ],
        [
          "En el triángulo ABE, por la proposición 20, BA y AE juntos son mayores que BE. A los dos les sumo EC: BA y AC juntos son mayores que BE y EC.",
          [
            "prop-20"
          ]
        ],
        [
          "En el triángulo CED, por la misma proposición, CE y ED juntos son mayores que CD. A los dos les sumo DB: CE y EB juntos son mayores que CD y DB.",
          [
            "prop-20"
          ]
        ],
        [
          "Entonces BA y AC son mayores que BE y EC, que a su vez son mayores que BD y DC: con más razón, BD y DC juntos son menores que BA y AC.",
          []
        ],
        [
          "Ahora los ángulos. En el triángulo CDE, el ángulo BDC es exterior: por la proposición 16, es mayor que el interior CED.",
          [
            "prop-16"
          ]
        ],
        [
          "En el triángulo ABE, el ángulo CEB, que es el mismo CED, es exterior: por la misma proposición, es mayor que BAC. Así que, con más razón, BDC es mayor que BAC.",
          [
            "prop-16"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-1",
        "post-2",
        "prop-20",
        "prop-16"
      ],
      "historia": [
        "Dice dos cosas que van en sentido contrario: el camino por adentro es más corto, pero el ángulo es más abierto. Cuanto más se acerca D al lado BC, más corto es el camino BDC y más se abre el ángulo, hasta llegar a un llano cuando D cae sobre BC.",
        "Para sumarle lo mismo a dos cosas desiguales, la edición de 1774 cita dos veces su axioma IV, «si á cantidades desiguales se añaden cantidades iguales, los todos serán desiguales». No es una de las cinco nociones comunes que hoy se consideran de Euclides, y por eso la cita no lleva enlace.",
        "Las dos ediciones usan el mismo truco que en la proposición 16: prolongar una recta para que un ángulo quede como exterior de otro triángulo."
      ],
      "enClase": [],
      "construccion": {
        "vb": "26 30 340 220",
        "puntos": {
          "A": [
            170.0,
            50.0
          ],
          "B": [
            50.0,
            230.0
          ],
          "C": [
            340.0,
            230.0
          ],
          "D": [
            190.0,
            175.0
          ],
          "E": [
            261.519537,
            146.903039
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            12,
            10
          ],
          "D": [
            -4,
            18
          ],
          "E": [
            12,
            -6
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "D",
              "E"
            ],
            [
              "A",
              "E",
              "C"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "D"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "C"
            }
          ],
          [
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "E"
              ],
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "E",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "C",
                "E",
                "D"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "D",
              "aux": true
            },
            {
              "t": "destaca",
              "a": "D",
              "b": "C",
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "A"
                ]
              ],
              "marca": false
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "angulo",
              "v": "D",
              "a": "B",
              "b": "C",
              "color": 1,
              "r": 24
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "C",
              "b": "D",
              "color": 2,
              "r": 24
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 4,
              "r": 30
            }
          ]
        ]
      }
    },
    {
      "id": "prop-22",
      "tipo": "proposicion",
      "n": 22,
      "clase": "problema",
      "titulo": "Un triángulo con tres lados dados",
      "zam": {
        "num": "Problema 8, Proposicion 22",
        "escaneo": 41,
        "enun": "Hazer vn triangulo de tres lineas rectas que sean yguales a tres lineas rectas dadas: pero conuiene que las dos lineas sean mayores que la que resta tomadas de qualquier manera, porque los dos lados de todo triangulo tomados de qualquier manera son mayores que el restante.",
        "dem": "Sean tres lineas rectas dadas A, B, C dos de las quales tomadas en qualquier manera sean mayores que la restante, es a saber A, B mayor que C y A, C mayor que B y CB mayor que A, conuiene de tres lineas rectas yguales a las tres A, B, C hazer vn triangulo. Desse vna linea terminada de la parte D pero no terminada por la parte T y [[prop-3|(por la 3 proposicion)]] pongase la linea DZ ygual a la A y a la B la linea ZI. Pero a la C la linea TI, y sobre el centro Z y espacio ZD [[post-3|(por la 3 peticion)]] describase el circulo LKD y tambien sobre el centro I y el espacio IT [[post-3|(por la misma peticion)]] desse el circulo TLK y tirese [[post-1|(por la primera peticion)]] ZK, IK. Digo que el triangulo KZI se ha hecho de tres lineas rectas yguales a las tres A, B, C. Porque el puncto Z es centro del circulo DKL es ygual [[def-15|(por la 15 definicion)]] ZD a la ZK y la A es ygual a la ZD luego tambien ZK es ygual [[nc-1|(por la 1 comun sentencia)]] a la A. Item porque el puncto I es centro del circulo LKT es ygual IK a la IT y la C es ygual a la IT luego la IK es ygual [[nc-1|(por la 1 comun sentencia)]] a la C, y la ZI es ygual a la B (por la supposicion) luego las tres lineas rectas IZ, ZK, KI son yguales a las tres A, B, C luego de tres lineas rectas que son IZ, ZK, KI que son yguales a las tres lineas dadas A, B, C esta hecho el triangulo KZI lo qual fue conueniente hazerse."
      },
      "e1774": {
        "num": "Proposición XXII. Problema",
        "pag": 22,
        "escaneo": 46,
        "enun": "Construir un triángulo, que tenga los lados iguales á tres rectas dadas, con tal que cada dos juntas sean mayores que la otra.",
        "dem": "Sean las tres rectas dadas A, B, C; y cada dos de ellas juntas mayores que la otra; esto es, las A, B mayores que la C, y las A, C mayores que la B; como asimismo las B, C mayores que la A: y háyase de construir un triángulo, que tenga los lados iguales á estas tres lineas. Sea la recta DE terminada por la parte D, é indefinida por la E: tómese DF igual [[prop-3|a 3. I.]] á A, FG igual á B, y GH á C; y con centro F, é intervalo FD descríbase un círculo [[post-3|b Post. 3.]] DKL. Además de esto, con centro G, é intervalo GH descríbase otro círculo KLH, y tírense las lineas KF, KG. Digo, que resultará el triángulo KFG formado por tres rectas iguales á las dadas A, B, C. Porque siendo el punto F centro del círculo DKL, el radio FD será igual al FK [[def-15|c Def. 15.]]; pero el FD es igual á la recta A: luego el FK será tambien igual á A. Además, siendo el punto G centro del círculo LKH, el radio GH será igual al GK [[def-15|d Def. 15.]]; pero GH es igual á C: luego tambien GK será igual á C, y tambien FG es igual á B: luego son iguales las tres rectas KF, FG, GK á las tres dadas A, B, C. Por consiguiente, &c. L. Q. D. H."
      },
      "facil": "Con regla y compás se puede construir un triángulo con tres lados dados, siempre que cada dos juntos sean más largos que el tercero.",
      "pasos": [
        [
          "Sean MN, PQ y RS los tres segmentos dados. Cada dos juntos tienen que ser mayores que el tercero: si no, por la proposición 20, no habría triángulo.",
          [
            "prop-20"
          ]
        ],
        [
          "Trazo una recta DE, tan larga como haga falta, y sobre ella pongo, uno detrás del otro, tres segmentos iguales a los dados. Lo hago con la construcción de la proposición 3:",
          [
            "post-1",
            "prop-3"
          ]
        ],
        [
          "Llevo MN hasta D con la proposición 2 y lo corto sobre DE: queda DF = MN.",
          [
            "prop-2",
            "prop-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Lo mismo con PQ, a continuación de F: queda FG = PQ.",
          [
            "prop-2",
            "prop-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Y con RS, a continuación de G: queda GH = RS.",
          [
            "prop-2",
            "prop-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro F y radio FD trazo la circunferencia.",
          [
            "post-3"
          ]
        ],
        [
          "Con centro G y radio GH trazo la circunferencia. Las dos circunferencias se cortan en un punto: lo llamo K.",
          [
            "post-3"
          ]
        ],
        [
          "Trazo KF y KG.",
          [
            "post-1"
          ]
        ],
        [
          "F es el centro de la primera circunferencia, y D y K están en ella: FK = FD. Como FD = MN, también FK = MN.",
          [
            "def-15",
            "nc-1"
          ]
        ],
        [
          "G es el centro de la segunda, y H y K están en ella: GK = GH. Como GH = RS, también GK = RS.",
          [
            "def-15",
            "nc-1"
          ]
        ],
        [
          "Y FG = PQ. El triángulo KFG tiene los tres lados iguales a los tres segmentos dados.",
          []
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "prop-20",
        "post-1",
        "prop-3",
        "prop-2",
        "post-3",
        "def-15",
        "nc-1"
      ],
      "historia": [
        "Es la construcción que se sigue enseñando para dibujar un triángulo con tres lados dados: un lado sobre la recta, y desde sus extremos dos arcos con los otros dos lados como radio.",
        "La condición de la proposición 20 es justo la que hace falta para que las dos circunferencias se corten. Pero Euclides no demuestra que se cortan: lo da por visto, como en la proposición 1. Recién en el siglo XIX se agregó un principio de continuidad que asegura que dos circunferencias así se cortan.",
        "Es la otra cara de la proposición 8: aquella dice que con tres lados el triángulo queda fijo, y esta dice que, si los lados cumplen la condición, el triángulo existe.",
        "Euclides nombra los segmentos dados con una sola letra, A, B y C; nosotros les ponemos dos, MN, PQ y RS. Zamorano llama Z, I y T a los puntos que en 1774 son F, G y H, y el triángulo es KZI."
      ],
      "enClase": [],
      "construccion": {
        "vb": "10 25 425 305",
        "puntos": {
          "M": [
            290.0,
            45.0
          ],
          "N": [
            410.0,
            45.0
          ],
          "P": [
            260.0,
            75.0
          ],
          "Q": [
            410.0,
            75.0
          ],
          "R": [
            310.0,
            105.0
          ],
          "S": [
            410.0,
            105.0
          ],
          "D": [
            30.0,
            230.0
          ],
          "E": [
            425.0,
            230.0
          ],
          "F": [
            150.0,
            230.0
          ],
          "G": [
            300.0,
            230.0
          ],
          "H": [
            400.0,
            230.0
          ],
          "K": [
            239.666667,
            150.251088
          ]
        },
        "rotulos": {
          "M": [
            -12,
            0
          ],
          "N": [
            12,
            0
          ],
          "P": [
            -12,
            0
          ],
          "Q": [
            12,
            0
          ],
          "R": [
            -12,
            0
          ],
          "S": [
            12,
            0
          ],
          "D": [
            -2,
            16
          ],
          "E": [
            2,
            16
          ],
          "F": [
            -8,
            16
          ],
          "G": [
            8,
            16
          ],
          "H": [
            -8,
            16
          ],
          "K": [
            0,
            -14
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "D",
              "F",
              "G"
            ],
            [
              "F",
              "G",
              "H"
            ],
            [
              "G",
              "H",
              "E"
            ]
          ],
          "iguales": [
            [
              [
                "D",
                "F"
              ],
              [
                "M",
                "N"
              ],
              [
                "F",
                "K"
              ]
            ],
            [
              [
                "F",
                "G"
              ],
              [
                "P",
                "Q"
              ]
            ],
            [
              [
                "G",
                "H"
              ],
              [
                "R",
                "S"
              ],
              [
                "G",
                "K"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "M"
            },
            {
              "t": "punto",
              "p": "N"
            },
            {
              "t": "segmento",
              "a": "M",
              "b": "N",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "P"
            },
            {
              "t": "punto",
              "p": "Q"
            },
            {
              "t": "segmento",
              "a": "P",
              "b": "Q",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "R"
            },
            {
              "t": "punto",
              "p": "S"
            },
            {
              "t": "segmento",
              "a": "R",
              "b": "S",
              "sinRegla": true
            }
          ],
          [
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E"
            }
          ],
          [
            {
              "t": "copia",
              "de": [
                "M",
                "N"
              ],
              "a": "D",
              "hacia": "F"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "F"
                ],
                [
                  "M",
                  "N"
                ]
              ]
            }
          ],
          [
            {
              "t": "copia",
              "de": [
                "P",
                "Q"
              ],
              "a": "F",
              "hacia": "G"
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "G"
                ],
                [
                  "P",
                  "Q"
                ]
              ],
              "rayas": 2
            }
          ],
          [
            {
              "t": "copia",
              "de": [
                "R",
                "S"
              ],
              "a": "G",
              "hacia": "H"
            },
            {
              "t": "punto",
              "p": "H"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "G",
                  "H"
                ],
                [
                  "R",
                  "S"
                ]
              ],
              "rayas": 3
            }
          ],
          [
            {
              "t": "circulo",
              "c": "F",
              "por": "D",
              "pasa": [
                "D",
                "K"
              ]
            }
          ],
          [
            {
              "t": "circulo",
              "c": "G",
              "por": "H",
              "pasa": [
                "H",
                "K"
              ]
            },
            {
              "t": "punto",
              "p": "K"
            }
          ],
          [
            {
              "t": "segmento",
              "a": "K",
              "b": "F"
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "G"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "K"
                ],
                [
                  "F",
                  "D"
                ]
              ]
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "G",
                  "K"
                ],
                [
                  "G",
                  "H"
                ]
              ],
              "rayas": 3
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "K",
                "F",
                "G"
              ]
            },
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "G"
                ]
              ],
              "marca": false
            }
          ]
        ]
      }
    },
    {
      "id": "prop-23",
      "tipo": "proposicion",
      "n": 23,
      "clase": "problema",
      "titulo": "Copiar un ángulo",
      "zam": {
        "num": "Ploblema 9, Proposicion 23",
        "escaneo": 42,
        "enun": "Sobre vna linea recta y en vn puncto en ella señalado hazer vn angulo de lineas rectas ygual a vn angulo dado de lineas rectas.",
        "dem": "Sea la linea dada AB y el puncto dado en ella sea A y el angulo dado rectilineo sea DCE conuiene poner en la linea recta dada AB y en el puncto en ella dado A vn angulo rectilineo ygual al angulo rectilineo dado DCE. Sean a caso en la vna y otra linea CD, CE vnos punctos, y sean estos D, E y tirese DE [[post-1|(por la 1 peticion)]] Y de las tres lineas rectas ZA, ZI, IA, que son yguales a las tres lineas rectas dadas CD, DE, EC hagase [[prop-22|(por la precedente)]] vn triangulo, y sea AZI. De manera que la linea CD sea ygual a la linea AZ y CE a la linea AI y tambien DE a la ZI y porque las dos lineas DC, CE son yguales a las dos lineas ZA, AI, la vna a la otra, y la basis DE (por la supposition) a la basis ZI. Luego el angulo DCE es ygual al angulo ZAI [[prop-8|(por la 8 proposicion)]] luego en la linea recta dada AB y en el puncto en ella señalado A esta dado el angulo rectilineo ZAI ygual al angulo rectilineo DCE que conuino hazerse."
      },
      "e1774": {
        "num": "Proposición XXIII. Problema",
        "pag": 22,
        "escaneo": 46,
        "enun": "En un punto dado de una recta dada construir sobre ella un ángulo rectilineo igual á otro dado.",
        "dem": "Sea la recta dada AB, A el punto, y DCE el ángulo, y háyase de construir sobre la AB, y en dicho punto un ángulo rectilineo igual al dado. Tómense en ambos lados CD, CE dos puntos qualesquiera D, E, y júntense por la DE; y con tres rectas iguales á las tres CD, DE, EC constrúyase [[prop-22|a 22. I.]] un triángulo AFG; de tal manera, que la AF sea igual á CD, la AG á CE, y la FG á DE. Porque siendo las dos lineas DC, CE respectivamente iguales á las dos FA, AG, y la base DE igual á la FG, será el ángulo DCE igual al FAG [[prop-8|b 8. I.]]. Luego sobre la recta dada AB, y en el punto A resulta construido el ángulo rectilineo FAG igual al dado DCE. L. Q. D. H."
      },
      "facil": "Con regla y compás se puede copiar un ángulo: construir, en cualquier punto de una recta, un ángulo igual a uno dado.",
      "pasos": [
        [
          "Sea AB la recta dada, A el punto de ella, y un ángulo dado con vértice en C.",
          []
        ],
        [
          "Marco un punto cualquiera D en un lado del ángulo y E en el otro, y trazo DE. El ángulo dado es DCE.",
          [
            "post-1"
          ]
        ],
        [
          "Construyo un triángulo con los lados iguales a CD, CE y DE, con un vértice en A y un lado sobre AB. Lo hago con la construcción de la proposición 22:",
          [
            "prop-22"
          ]
        ],
        [
          "Prolongo BA más allá de A, y llevo hasta allí un segmento igual a CE: queda AH = CE.",
          [
            "post-2",
            "prop-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Sobre AB llevo un segmento igual a CD: queda AF = CD.",
          [
            "prop-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "A continuación de F llevo un segmento igual a DE: queda FK = DE.",
          [
            "prop-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro A y radio AH, y con centro F y radio FK, trazo dos circunferencias. Se cortan en un punto: lo llamo G.",
          [
            "post-3"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo AG y FG. Como en la proposición 22, AG = CE, AF = CD y FG = DE.",
          [
            "post-1",
            "prop-22"
          ],
          {
            "sub": true
          }
        ],
        [
          "Miro los triángulos DCE y FAG: tienen CD = AF, CE = AG y DE = FG.",
          []
        ],
        [
          "Por la proposición 8, el ángulo FAG es igual al DCE: en el punto A, sobre AB, quedó construido un ángulo igual al dado.",
          [
            "prop-8"
          ]
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "post-1",
        "prop-22",
        "post-2",
        "prop-3",
        "post-3",
        "prop-8"
      ],
      "historia": [
        "Es la construcción que se enseña hoy para copiar un ángulo con compás: un arco con centro en el vértice, otro igual en el punto nuevo, y la abertura entre los dos cortes. Es la misma idea con menos trazos: un triángulo con los tres lados iguales, y la proposición 8.",
        "Proclo cuenta, citando a Eudemo, que este problema lo encontró Enópides de Quíos, un geómetra del siglo V antes de Cristo, más de cien años antes de Euclides.",
        "Euclides no dice de qué lado de AB va el ángulo: hay dos soluciones, una a cada lado de la recta.",
        "Zamorano vuelve a escribir «Ploblema». Llama Z e I a los puntos que en 1774 son F y G, y nombra la proposición 22 como «la precedente»."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 40 425 280",
        "puntos": {
          "A": [
            200.0,
            270.0
          ],
          "B": [
            430.0,
            270.0
          ],
          "C": [
            60.0,
            160.0
          ],
          "D": [
            111.621879,
            86.276316
          ],
          "E": [
            190.0,
            160.0
          ],
          "P1": [
            131.697055,
            57.605994
          ],
          "P2": [
            225.0,
            160.0
          ],
          "F": [
            290.0,
            270.0
          ],
          "G": [
            274.564937,
            163.510234
          ],
          "H": [
            70.0,
            270.0
          ],
          "K": [
            397.602562,
            270.0
          ]
        },
        "rotulos": {
          "A": [
            -2,
            16
          ],
          "B": [
            6,
            16
          ],
          "C": [
            -12,
            6
          ],
          "D": [
            -13,
            -2
          ],
          "E": [
            2,
            16
          ],
          "P1": null,
          "P2": null,
          "F": [
            2,
            16
          ],
          "G": [
            0,
            -14
          ],
          "H": [
            -2,
            16
          ],
          "K": [
            -2,
            16
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "C",
              "D",
              "P1"
            ],
            [
              "C",
              "E",
              "P2"
            ],
            [
              "B",
              "A",
              "H"
            ],
            [
              "A",
              "F",
              "K"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "H"
              ],
              [
                "C",
                "E"
              ],
              [
                "A",
                "G"
              ]
            ],
            [
              [
                "A",
                "F"
              ],
              [
                "C",
                "D"
              ]
            ],
            [
              [
                "F",
                "K"
              ],
              [
                "D",
                "E"
              ],
              [
                "F",
                "G"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "P1"
            },
            {
              "t": "punto",
              "p": "P2"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "P1",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "P2",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "P2",
              "b": "P1",
              "color": 1,
              "r": 28
            }
          ],
          [
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "B",
              "por": "A",
              "largo": 374.0,
              "aux": 8
            },
            {
              "t": "copia",
              "de": [
                "C",
                "E"
              ],
              "a": "A",
              "hacia": "H",
              "aux": 8
            },
            {
              "t": "punto",
              "p": "H",
              "aux": 8
            }
          ],
          [
            {
              "t": "copia",
              "de": [
                "C",
                "D"
              ],
              "a": "A",
              "hacia": "F"
            },
            {
              "t": "punto",
              "p": "F"
            }
          ],
          [
            {
              "t": "copia",
              "de": [
                "D",
                "E"
              ],
              "a": "F",
              "hacia": "K",
              "aux": 8
            },
            {
              "t": "punto",
              "p": "K",
              "aux": 8
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "H",
              "pasa": [
                "H",
                "G"
              ],
              "aux": 8
            },
            {
              "t": "circulo",
              "c": "F",
              "por": "K",
              "pasa": [
                "K",
                "G"
              ],
              "aux": 8
            },
            {
              "t": "punto",
              "p": "G"
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "G"
            },
            {
              "t": "segmento",
              "a": "F",
              "b": "G"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "G"
                ],
                [
                  "C",
                  "E"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "F"
                ],
                [
                  "C",
                  "D"
                ]
              ]
            },
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "G"
                ],
                [
                  "D",
                  "E"
                ]
              ],
              "rayas": 3
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "D",
                "C",
                "E"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "F",
                "A",
                "G"
              ],
              "tono": 2,
              "aux": true
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "F",
              "b": "G",
              "color": 1,
              "r": 28
            }
          ]
        ]
      }
    },
    {
      "id": "prop-24",
      "tipo": "proposicion",
      "n": 24,
      "clase": "teorema",
      "titulo": "A mayor ángulo, mayor base",
      "zam": {
        "num": "Problema 15, Propositio 24",
        "escaneo": 43,
        "enun": "Si dos triangulos tuuieren los dos lados yguales a los dos lados, el vno al otro, pero mayor el vn angulo contenido de yguales lineas rectas que el angulo, tendran tambien la basis mayor que la basis.",
        "dem": "Sean los dos triangulos ABC, DEZ que tengan los dos lados AB, AC yguales a los dos lados DE, DZ el vno al otro, conuiene saber, el lado AB al lado DE y el lado AC al lado DZ pero el angulo BAC sea mayor que el angulo EDZ. Digo que tambien la basis BC es mayor que la basis EZ porque siendo el angulo BAC mayor que el angulo EDZ pongase [[prop-23|(por la proposicion 23)]] en la linea recta DE y en el puncto D en ella el angulo EDI ygual al angulo BAC y pongase la DI ygual a la vna de las dos AC, DZ y tirense [[post-1|(por la priBera peticion)]] IE, ZI. Pues porque AB es ygual a la DE y AC a la DI son yguales las dos lineas BA, AC a las dos lineas ED, DI la vna a la otra, y el angulo BAC [[prop-23|(por la veynte y tres proposicion)]] ygual al angulo EDI. Luego la basis BC [[prop-4|(por la quarta proposicion)]] es ygual a la basis EI. Iten porque es ygual DI a la DZ luego el angulo DIZ es ygual al angulo DZI. Luego el angulo DZI es mayor que el angulo EIZ, es pues mucho mayor el angulo EZI que el angulo EIZ. Y porque es el triangulo EZI que tiene el angulo EZI mayor el angulo EIZ. Y el mayor angulo tiene opuesto mayor lado [[prop-19|(por la 18 proposicion)]] luego mayor es el lado EI que el lado EZ y es ygual el lado EI al lado BC. luego el lado BC mayor es que el lado EZ, luego si dos triangulos tuuieren los dos lados yguales a los dos lados, y lo que de mas se sigue como en la proposicion. Lo qual conuino demostrar."
      },
      "e1774": {
        "num": "Proposición XXIV. Teorema",
        "pag": 23,
        "escaneo": 47,
        "enun": "Si dos triángulos tienen dos lados del uno respectivamente iguales á dos lados del otro, y desiguales los ángulos comprehendidos; el que tenga mayor ángulo tendrá mayor base.",
        "dem": "Sean dos triángulos ABC, DEF, que tengan los dos lados AB, AC respectivamente iguales á los dos DE, DF; pero el ángulo BAC mayor que el EDF. Digo, que la base BC será tambien mayor que la base EF. Supóngase, que de las rectas DE, DF es DE la mayor; constrúyase sobre ella en D el ángulo EDG [[prop-23|a 23. I.]] igual al BAC, y tírese la DG [[prop-3|b 3. I.]] igual á qualquiera de las dos AC, DF: y júntense los puntos E, G, F. Porque siendo AB igual á DE, y AC á DG, los dos BA, AC serán respectivamente iguales á los dos ED, DG; y el ángulo BAC igual al EDG: luego la base BC será igual [[prop-4|c 4. I.]] á la EG. A mas, siendo igual DG á DF, será tambien igual [[prop-5|d 5. I.]] el ángulo DFG al DGF; pero el ángulo DGF es mayor que el EGF: por consiguiente el DFG será mayor que el EGF: luego es mucho mayor el ángulo EFG que el EGF; y teniendo el triángulo EFG el ángulo EFG mayor que el EGF, el lado EG opuesto al ángulo EFG será mayor que el lado EF opuesto al ángulo EGF: es así que el lado EG es igual al BC: luego tambien el BC será mayor que el EF. Por consiguiente si dos, &c. L. Q. D. D."
      },
      "facil": "Si dos triángulos tienen dos lados iguales, pero el ángulo entre ellos es más abierto en uno, ese tiene el tercer lado más largo. Como un compás: cuanto más se abre, más lejos quedan las puntas.",
      "pasos": [
        [
          "Sean ABC y DEF dos triángulos con AB = DE y AC = DF, y el ángulo BAC mayor que el EDF. Hay que ver que BC es mayor que EF.",
          []
        ],
        [
          "De DE y DF, tomo DE como el mayor (si no, cambio los nombres). En D, sobre DE, construyo un ángulo igual al BAC con la proposición 23, y en su lado corto un segmento igual a AC con la proposición 3: lo llamo DG.",
          [
            "prop-23",
            "prop-3"
          ]
        ],
        [
          "Trazo EG y GF.",
          [
            "post-1"
          ]
        ],
        [
          "Los triángulos ABC y DEG tienen AB = DE, AC = DG y el ángulo BAC igual al EDG. Por la proposición 4, BC = EG.",
          [
            "prop-4"
          ]
        ],
        [
          "DG y DF son iguales a AC, así que son iguales entre sí. En el triángulo DFG, por la proposición 5, el ángulo DFG es igual al DGF.",
          [
            "nc-1",
            "prop-5"
          ]
        ],
        [
          "El ángulo DGF es mayor que su parte EGF; entonces DFG también es mayor que EGF. Y DFG es una parte de EFG: con más razón, EFG es mayor que EGF.",
          [
            "nc-5"
          ]
        ],
        [
          "En el triángulo EFG, el ángulo EFG es mayor que el EGF. Por la proposición 19, el lado opuesto al mayor, EG, es mayor que EF. Y EG = BC: BC es mayor que EF.",
          [
            "prop-19"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-23",
        "prop-3",
        "post-1",
        "prop-4",
        "nc-1",
        "prop-5",
        "nc-5",
        "prop-19"
      ],
      "historia": [
        "Hoy se la conoce como el teorema de la bisagra: dos varillas fijas unidas por una bisagra, como las patas de un compás. Cuanto más se abre el ángulo, más se separan las puntas.",
        "La frase «supóngase que DE es la mayor» no está en Zamorano ni en el texto griego: la agregó Simson. Sin ella, el punto F podría caer en otro lugar y el último razonamiento no funcionaría; Euclides solo dibuja el caso en que funciona. Simson lo explica en sus notas al libro I.",
        "Es la primera vez que se usa la proposición 23: para copiar el ángulo BAC en D.",
        "Zamorano titula esta proposición «Problema 15», cuando es un teorema: la anterior de su numeración era el Theorema 14. También cita «la 18» donde corresponde la 19, como en la proposición 20, y se le escapa «priBera» por «primera». Están así en el libro."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 34 440 190",
        "puntos": {
          "A": [
            110.0,
            60.0
          ],
          "B": [
            46.607261,
            195.946168
          ],
          "C": [
            216.489766,
            134.564937
          ],
          "D": [
            330.0,
            60.0
          ],
          "E": [
            266.607261,
            195.946168
          ],
          "F": [
            384.940374,
            177.820012
          ],
          "G": [
            436.489766,
            134.564937
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            10,
            12
          ],
          "D": [
            0,
            -14
          ],
          "E": [
            -12,
            10
          ],
          "F": [
            4,
            17
          ],
          "G": [
            12,
            -4
          ]
        },
        "comprueba": {
          "congruentes": [
            [
              [
                "A",
                "B",
                "C"
              ],
              [
                "D",
                "E",
                "G"
              ]
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "D",
                "E"
              ]
            ],
            [
              [
                "A",
                "C"
              ],
              [
                "D",
                "F"
              ],
              [
                "D",
                "G"
              ]
            ],
            [
              [
                "B",
                "C"
              ],
              [
                "E",
                "G"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "D",
                  "E"
                ]
              ]
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "D",
                  "F"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1,
              "r": 34
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 2,
              "r": 28
            }
          ],
          [
            {
              "t": "copia",
              "de": [
                "A",
                "C"
              ],
              "a": "D",
              "hacia": "G"
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "G",
              "color": 1,
              "r": 42,
              "cuna": false
            },
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "G"
                ],
                [
                  "A",
                  "C"
                ]
              ],
              "rayas": 2
            }
          ],
          [
            {
              "t": "segmento",
              "a": "E",
              "b": "G"
            },
            {
              "t": "segmento",
              "a": "G",
              "b": "F"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "G"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "E",
                  "G"
                ]
              ],
              "rayas": 3
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "D",
                "F",
                "G"
              ],
              "aux": true
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "D",
              "b": "G",
              "color": 3,
              "r": 26,
              "hasta": 6
            },
            {
              "t": "angulo",
              "v": "G",
              "a": "F",
              "b": "D",
              "color": 3,
              "r": 26,
              "hasta": 6
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "E",
              "b": "F",
              "color": 4,
              "r": 40
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "E",
              "b": "G",
              "color": 3,
              "r": 40,
              "cuna": false
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "E",
                  "F"
                ]
              ],
              "marca": false
            },
            {
              "t": "destaca",
              "a": "B",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-25",
      "tipo": "proposicion",
      "n": 25,
      "clase": "teorema",
      "titulo": "A mayor base, mayor ángulo",
      "zam": {
        "num": "Theorema 16, Proposicion 25",
        "escaneo": 44,
        "enun": "Si dos triangulos tuuieren los dos lados yguales a los dos lados el vno al otro: pero la basis mayor que la basis tendra tambien el angulo contenido de yguales lineas rectas mayor que el angulo.",
        "dem": "Siendo dos triangulos ABC, DEZ que tengan los dos lados AB, AC yguales a los dos lados DE, DZ el vno al otro esto es AB al mismo DE y AC al mismo DZ pero la basis BC sea mayor que la basis EZ. Digo que el angulo BAC es mayor que el angulo EDZ porque sino, o es ygual a el, o menor que el, ygual no lo es el angulo BAC al angulo EDZ. Porque si fuesse ygual, la basis tambien BC [[prop-4|(por la 4 proposicion)]] seria ygual a la basis EZ, pero no lo es, luego el angulo BAC en ninguna manera es ygual al angulo EDZ ni tampoco es menor el angulo BAC que el angulo EDZ. Porque la basis BC seria menor que la basis EZ. Pero no lo es, luego el angulo BAC no es menor que el angulo EDZ. Y esta demostrado que ni ygual. Luego mayor es el angulo BAC que el angulo EDZ. Luego si dos triangulos tuuieren y lo que se sigue como en el theorema que conuino demostrar."
      },
      "e1774": {
        "num": "Proposición XXV. Teorema",
        "pag": 24,
        "escaneo": 48,
        "enun": "Si dos triángulos tienen dos lados del uno respectivamente iguales á dos lados del otro, y desiguales las bases; el que tenga mayor base tendrá mayor ángulo comprehendido por los lados.",
        "dem": "Sean dos triángulos ABC, DEF, que tengan los lados AB, AC respectivamente iguales á los lados DE, DF, y sea la base BC mayor que la EF. Digo, que el ángulo BAC será mayor que el EDF. Porque á no ser así, sería igual, ó menor: igual no lo es; pues en tal caso la base BC fuera igual á la EF [[prop-4|a 4. I.]]; lo que no es así: menor tampoco; porque entonces sería menor la base BC que la EF [[prop-24|b 24. I.]]; lo qual es al contrario; y queda antes demostrado no ser igual: luego el ángulo BAC será mayor que el EDF. Por consiguiente si dos, &c. L. Q. D. D."
      },
      "facil": "Si dos triángulos tienen dos lados iguales, el que tiene el tercer lado más largo tiene más abierto el ángulo entre esos dos lados. Es la proposición 24 dada vuelta.",
      "pasos": [
        [
          "Sean ABC y DEF dos triángulos con AB = DE y AC = DF, y la base BC mayor que la EF. Hay que ver que el ángulo BAC es mayor que el EDF.",
          []
        ],
        [
          "Si no fuera mayor, sería igual o menor. Veo los dos casos.",
          []
        ],
        [
          "Igual no puede ser: si el ángulo BAC fuera igual al EDF, por la proposición 4 las bases BC y EF serían iguales, y BC es mayor.",
          [
            "prop-4"
          ]
        ],
        [
          "Menor tampoco: si el ángulo BAC fuera menor que el EDF, por la proposición 24 la base BC sería menor que la EF, y es mayor.",
          [
            "prop-24"
          ]
        ],
        [
          "Queda una sola posibilidad: el ángulo BAC es mayor que el EDF.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-4",
        "prop-24"
      ],
      "historia": [
        "Es la recíproca de la proposición 24, y se demuestra igual que la 19, que era la recíproca de la 18: se descartan los casos «igual» y «menor», y queda «mayor».",
        "Con la 24 y esta se puede pensar en un compás de patas fijas: la abertura del ángulo y la distancia entre las puntas crecen juntas. Si se sabe cuál de dos distancias es mayor, se sabe cuál de las dos aberturas es mayor.",
        "Zamorano cita la proposición 4 en el caso «igual», pero no la 24 en el caso «menor»; la edición de 1774 cita las dos. Y Zamorano termina con «y lo que se sigue como en el theorema», sin repetir el enunciado."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 34 410 190",
        "puntos": {
          "A": [
            110.0,
            60.0
          ],
          "B": [
            46.607261,
            195.946168
          ],
          "C": [
            216.489766,
            134.564937
          ],
          "D": [
            330.0,
            60.0
          ],
          "E": [
            266.607261,
            195.946168
          ],
          "F": [
            384.940374,
            177.820012
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            10,
            12
          ],
          "D": [
            0,
            -14
          ],
          "E": [
            -12,
            10
          ],
          "F": [
            10,
            12
          ]
        },
        "comprueba": {
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "D",
                "E"
              ]
            ],
            [
              [
                "A",
                "C"
              ],
              [
                "D",
                "F"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "D",
                  "E"
                ]
              ]
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "D",
                  "F"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ]
              ],
              "marca": false
            },
            {
              "t": "igual",
              "seg": [
                [
                  "E",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1,
              "r": 32,
              "hasta": 2
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 2,
              "r": 32,
              "hasta": 2
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 3,
              "r": 32,
              "hasta": 3
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 3,
              "r": 32,
              "hasta": 3
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ]
              ],
              "marca": false
            },
            {
              "t": "igual",
              "seg": [
                [
                  "E",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1,
              "r": 32,
              "hasta": 4
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 2,
              "r": 32,
              "hasta": 4
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ]
              ],
              "marca": false
            },
            {
              "t": "igual",
              "seg": [
                [
                  "E",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1,
              "r": 32
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 2,
              "r": 32
            },
            {
              "t": "destaca",
              "a": "B",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-26",
      "tipo": "proposicion",
      "n": 26,
      "clase": "teorema",
      "titulo": "Dos ángulos y un lado",
      "zam": {
        "num": "Theorema 17, Propositio 26",
        "escaneo": 45,
        "enun": "Si dos triangulos tuuieren los dos angulos yguales a los dos angulos: el vno al otro: y el vn lado ygual al vn lado: aora el que esta entre los dos angulos yguales: o el que se opone al vno de los yguales angulos tendran tambien los demas lados yguales a los demas lados el vno al otro: y el angulo restante al angulo restante.",
        "dem": "Sean los dos triangulos ABC, DEZ que tengan los dos angulos ABC, BCA yguales a los dos angulos DEZ, EZD el vno al otro, es a saber, el angulo ABC al angulo DEZ y el angulo BCA al angulo EZD y el vn lado ygual al vn lado y quanto a lo primero sea el que esta entre los dos angulos, esto es, el lado BC al lado EZ. Digo que los demas lados los tendran tambien yguales a los demas lados, el vno al otro, esto es el lado AB al lado DE. Y el lado AC al lado DZ. y el angulo que resta ygual al angulo que resta, es a saber BAC al mismo EDC. Porque si AB no es ygual a DE sera la vna mayor, sea mayor AB, y pongase [[prop-3|(por la 3 proposicion)]] la linea IB ygual a la linea DE, y tirese IC. pues porque IB es ygual a la DE y la BC a la EZ, luego las dos lineas IB, BC son yguales a las dos DE, EZ la vna a la otra, y el angulo IBC al angulo DEZ es ygual, luego la basis IC [[prop-4|(por la 4 proposicion)]] es ygual a la basis DZ y el triangulo IBC es ygual al triangulo DEZ. Y los demas angulos seran yguales a los demas angulos debajo de los quales se tieden yguales lados. Luego ygual es el angulo ICB al angulo DZE. Y el angulo DZE se supone ser ygual al mismo BCA. Luego el angulo BCI [[nc-1|(por la 1 comun sentencia)]] es ygual al angulo BCA, el menor al mayor, que es impossible. Luego AB no es desigual a la DE, sera pues ygual. y es tambien BC ygual a la EZ. Luego ya AB, BC son yguales a DE, EZ la vna a la otra, y el angulo ABC es ygual al angulo DEZ. Luego [[prop-4|(por la 4 propositio)]] la basis AC sera ygual a la basis DZ, y el angulo BAC restante ygual al angulo EDZ restante. Demas desto sean yguales los lados que se estieden a yguales angulos, y sean AB, DE. Digo otra vez que los demas lados seran yguales a los demas lados, es a saber, el lado AC al lado DZ y el lado BC al lado EZ, y demas desto el angulo restante BAC al angulo que resta EDZ sera ygual. Porque si BC no es ygual a EZ el vno dellos sera mayor. Sea pues mayor si es possible el lado BC, y [[prop-3|(por la 3 proposicion)]] pongase ygual la linea BT a la linea EZ. Y tirese [[post-1|(por la 1 peticion)]] AT. Y porque BT es ygual a la EZ y AB a la DE, luego las dos AB, BT son yguales a las dos DE, EZ la vna a la otra, y contienen yguales angulos. Luego la basis AT [[prop-4|(por la 4 proposicion)]] es ygual a la basis DZ y el triangulo ABT al trinngulo DEZ es ygual. Y los de mas angulos son yguales a los demas angulos debajo de los quales se estienden yguales lados, Luego el angulo BTA es ygual al angulo DZE. Y el angulo EZD es ygual al angulo BCA. sera pues el angulo BTA ygual al angulo BCA, luego el angulo exterior BTA del triangulo ATC es ygual al angulo interior y opuesto BCA. Lo qual [[prop-16|(por la 16 proposicion)]] es impossible. Luego el lado EZ no es desigual al lado BC, y es AB ygual a la DE. Luego las dos AB, BC son yguales a las dos DE, EZ la vna a la otra y contienen yguales angulos, luego la basis AC [[prop-4|(por la 4 proposicion)]] es ygual a la basis DZ. Y el triangulo ABC al triangulo DEZ, y el angulo que resta BAC es ygual al angulo EDZ que resta. Luego si dos triangulos tuuieren los dos angulos yguales a los dos angulos, y lo de mas como en el theorema. Lo qual conuenia demostrarse."
      },
      "e1774": {
        "num": "Proposición XXVI. Teorema",
        "pag": 25,
        "escaneo": 49,
        "enun": "Si dos triángulos tuvieren dos ángulos del uno respectivamente iguales á dos ángulos del otro, y un lado igual á un lado, siendo estos los adyacentes á los ángulos iguales, ó los opuestos á ángulos iguales; tendrán tambien los otros lados respectivamente iguales entre sí; y el otro ángulo igual al otro ángulo.",
        "dem": "Sean dos triángulos ABC, DEF, que tengan los dos ángulos ABC, BCA respectivamente iguales á los dos DEF, EFD, y un lado igual á otro; primeramente el adyacente á ángulos iguales, esto es el lado BC igual al EF. Digo, que serán los demás lados AB igual á DE, AC igual á DF, y el ángulo BAC igual al otro EDF. Porque si la recta AB fuese desigual á la DE, una de las dos sería mayor: séalo AB, tómese la parte BG igual al lado DE, y tírese GC: siendo, pues, BG igual á DE, y BC á EF, las dos lineas GB, BC serían respectivamente iguales á las dos DE, EF, y el ángulo GBC igual al DEF: luego la base GC sería igual [[prop-4|a 4. I.]] á la DF, y el triángulo GBC igual al DEF, y los demás ángulos opuestos á lados iguales serían iguales entre sí: luego el ángulo GCB sería igual al DFE: es así que este último se supuso igual al BCA: por consiguiente el BCG sería igual al BCA, el menor al mayor, lo qual es imposible: luego no puede ser desigual AB á DE: luego será igual: es así que BC es igual á EF; consiguientemente los dos AB, BC son respectivamente iguales á los dos DE, EF, y el ángulo ABC igual al DEF: luego la basa AC es igual á la DF, y el ángulo BAC al EDF [[prop-4|a 4. I.]]. Sean en segundo lugar los lados iguales los opuestos á ángulos iguales, como el AB, y el DE; serán tambien los demás lados iguales entre sí, esto es AC á DF, y BC á EF; y el ángulo BAC igual al EDF. Porque si la linea BC fuese desigual á la EF, una de ellas sería mayor: séalo BC, supóngase BH igual á EF, y tírese AH: siendo, pues, la linea BH igual á la EF, y AB á DE, las dos AB, BH resultarían respectivamente iguales á las dos DE, EF: y comprehenden ángulos iguales: luego la base AH sería igual á la DF, el triángulo ABH al DEF, y los demás ángulos opuestos á lados iguales, iguales entre sí: luego será igual el ángulo BHA al EFD; pero el EFD es igual al BCA b Por la hipótesis.: luego tambien el ángulo BHA sería igual al BCA; esto es, el ángulo externo del triángulo AHC sería igual al ángulo interno opuesto BCA; lo qual es imposible [[prop-16|c 16. I.]]: por conseqüencia la linea BC no es desigual á la EF; luego será igual: es así que la AB es igual á la DE: luego las dos AB, BC son respectivamente iguales á las dos DE, EF, y contienen ángulos iguales: así la base AC es igual á la DF, y el ángulo BAC igual al DEF. Por consiguiente si dos, &c. L. Q. D. D."
      },
      "facil": "Si dos triángulos tienen dos ángulos iguales y también un lado igual, son iguales en todo. Vale si el lado es el que está entre los dos ángulos, y también si está frente a uno de ellos.",
      "pasos": [
        [
          "Sean ABC y DEF dos triángulos con el ángulo ABC igual al DEF y el BCA igual al EFD. Primer caso: el lado que está entre esos ángulos es igual, BC = EF.",
          []
        ],
        [
          "Supongo que AB no es igual a DE, y que AB es el mayor. Sobre BA corto BG igual a DE, con la proposición 3, y trazo GC.",
          [
            "prop-3",
            "post-1"
          ]
        ],
        [
          "Los triángulos GBC y DEF tienen GB = DE, BC = EF y el ángulo en B igual al de E. Por la proposición 4 son iguales: el ángulo GCB es igual al DFE.",
          [
            "prop-4"
          ]
        ],
        [
          "Pero DFE es igual a BCA. Entonces GCB sería igual a BCA, y GCB es solo una parte de BCA: imposible. Así que AB = DE.",
          [
            "nc-1",
            "nc-5"
          ]
        ],
        [
          "Ahora AB = DE, BC = EF y el ángulo en B es igual al de E. Por la proposición 4, AC = DF y el ángulo BAC es igual al EDF.",
          [
            "prop-4"
          ]
        ],
        [
          "Segundo caso: el lado igual está frente a uno de los ángulos iguales, AB = DE. Supongo que BC es mayor que EF: sobre BC corto BH igual a EF, con la proposición 3, y trazo AH.",
          [
            "prop-3",
            "post-1"
          ]
        ],
        [
          "Los triángulos ABH y DEF tienen AB = DE, BH = EF y el ángulo en B igual al de E. Por la proposición 4, el ángulo BHA es igual al EFD, que es igual al BCA.",
          [
            "prop-4"
          ]
        ],
        [
          "Pero BHA es un ángulo exterior del triángulo AHC: por la proposición 16 es mayor que el interior opuesto BCA. No pueden ser iguales: BC = EF.",
          [
            "prop-16"
          ]
        ],
        [
          "Ahora AB = DE, BC = EF y el ángulo en B es igual al de E. Por la proposición 4, AC = DF y el ángulo BAC es igual al EDF.",
          [
            "prop-4"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-3",
        "post-1",
        "prop-4",
        "nc-1",
        "nc-5",
        "prop-16"
      ],
      "historia": [
        "Son dos criterios en uno: el que hoy se llama ALA (ángulo, lado, ángulo), con el lado entre los dos ángulos, y el LAA, con el lado frente a uno de ellos. Con la 4 (LAL) y la 8 (LLL) completan los criterios de igualdad de triángulos del libro.",
        "Proclo cuenta que Eudemo le atribuía este teorema a Tales: según él, Tales lo habría usado para medir la distancia de un barco en el mar desde la costa. Es uno de los relatos más citados sobre Tales, aunque no se sabe cómo era exactamente su método.",
        "Las dos partes se demuestran por el absurdo, con un punto que no puede existir: G en el primer caso y H en el segundo. En el segundo hace falta la proposición 16, la del ángulo exterior.",
        "Hoy muchas veces el LAA se deduce del ALA usando que los ángulos de un triángulo suman 180°: si dos ángulos son iguales, el tercero también. Euclides no puede hacerlo así, porque eso recién llega en la proposición 32.",
        "En las dos ediciones hay erratas al nombrar ángulos: Zamorano escribe «EDC» por EDZ y «trinngulo»; la edición de 1774 termina con «el ángulo BAC igual al DEF» cuando debería decir EDF, y escribe «la basa AC»."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 46 420 204",
        "puntos": {
          "A": [
            80.0,
            70.0
          ],
          "B": [
            50.0,
            220.0
          ],
          "C": [
            200.0,
            220.0
          ],
          "D": [
            300.0,
            70.0
          ],
          "E": [
            270.0,
            220.0
          ],
          "F": [
            420.0,
            220.0
          ],
          "G": [
            68.6,
            127.0
          ],
          "H": [
            149.0,
            220.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -12,
            10
          ],
          "C": [
            10,
            12
          ],
          "D": [
            0,
            -14
          ],
          "E": [
            -12,
            10
          ],
          "F": [
            10,
            12
          ],
          "G": [
            -12,
            -4
          ],
          "H": [
            0,
            16
          ]
        },
        "comprueba": {
          "congruentes": [
            [
              [
                "A",
                "B",
                "C"
              ],
              [
                "D",
                "E",
                "F"
              ]
            ]
          ],
          "alineados": [
            [
              "B",
              "G",
              "A"
            ],
            [
              "B",
              "H",
              "C"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "A",
              "color": 1,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "F",
              "b": "D",
              "color": 1,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 2,
              "r": 30
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "D",
              "b": "E",
              "color": 2,
              "r": 30
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "E",
                  "F"
                ]
              ],
              "rayas": 3,
              "hasta": 5
            }
          ],
          [
            {
              "t": "punto",
              "p": "G",
              "hasta": 4
            },
            {
              "t": "segmento",
              "a": "G",
              "b": "C",
              "hasta": 4
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "G"
                ],
                [
                  "D",
                  "E"
                ]
              ],
              "supuesto": true,
              "hasta": 4
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "G",
                "B",
                "C"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "G",
              "b": "B",
              "color": 2,
              "r": 44,
              "hasta": 4
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "G",
                "C"
              ],
              "aux": true
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "D",
                  "E"
                ]
              ],
              "hasta": 5
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "D",
                  "F"
                ]
              ],
              "rayas": 2,
              "hasta": 5
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 3,
              "r": 26,
              "hasta": 5
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 3,
              "r": 26,
              "hasta": 5
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "D",
                  "E"
                ]
              ]
            },
            {
              "t": "punto",
              "p": "H",
              "hasta": 8
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "H",
              "hasta": 8
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "H"
                ],
                [
                  "E",
                  "F"
                ]
              ],
              "supuesto": true,
              "hasta": 7
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "H"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "angulo",
              "v": "H",
              "a": "B",
              "b": "A",
              "color": 2,
              "r": 24,
              "hasta": 8
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "H",
                "C"
              ],
              "aux": true
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "E",
                  "F"
                ]
              ],
              "rayas": 3
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "D",
                  "F"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 3,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "E",
              "b": "F",
              "color": 3,
              "r": 26
            }
          ]
        ]
      }
    },
    {
      "id": "def-23",
      "tipo": "definicion",
      "n": 23,
      "titulo": "Paralelas",
      "zam": {
        "num": "Definición 35",
        "escaneo": 19,
        "enun": "Lineas rectas parallelas son las que estando en vn mismo llano, y estendidas de ambas partes en infinito, en ninguna parte concurren."
      },
      "e1774": {
        "num": "Definición XXXV",
        "pag": 5,
        "escaneo": 29,
        "enun": "Paralelas, ó equidistantes son las rectas que estando en un mismo plano, prolongadas por ambas partes al infinito, jamás se encontrarán."
      },
      "facil": "Dos rectas de un mismo plano son paralelas si, prolongadas todo lo que se quiera hacia los dos lados, nunca se cortan.",
      "usa": [],
      "historia": [
        "Euclides define las paralelas por lo que no pasa: nunca se encuentran. No dice que estén siempre a la misma distancia. La edición de 1774 agrega «ó equidistantes», pero que dos paralelas estén siempre a la misma distancia no es parte de la definición: se puede demostrar recién con el postulado 5.",
        "En el ejemplar de Zamorano que se escaneó, un lector de la época escribió a mano, en el margen, otra definición: las paralelas son las que por todas partes «distan igualmente» entre sí, y que aunque se alarguen infinitamente nunca se juntan. Es la idea de la equidistancia, la misma que agrega la edición de 1774.",
        "Hoy se cuenta como la definición 23, la última del libro. Zamorano y la edición de 1774 la numeran 35, porque separan en varias algunas definiciones de figuras. Zamorano la cita como «la última definición».",
        "«Paralelo» viene del griego: «una al lado de la otra»."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-paralelas",
          "slide": "d-paralelas",
          "txt": "Geometría griega · bloque A · diapositiva «Paralelas y secante»"
        }
      ]
    },
    {
      "id": "prop-27",
      "tipo": "proposicion",
      "n": 27,
      "clase": "teorema",
      "titulo": "Alternos iguales, rectas paralelas",
      "zam": {
        "num": "Theorema 18, Proposicion 27",
        "escaneo": 47,
        "enun": "Si cayendo vna linea recta sobre dos lineas rectas hiziere los angulos alternos entre si yguales las mismas lineas rectas seran entre si parallelas.",
        "dem": "Porque cayendo la linea EZ sobre las dos lineas rectas AB, CD haga entre si yguales los angulos alternos AEZ, EZD. Digo que es paralella AB a la CD. Porque sino, estendidas se juntaran, o hacia las partes BD o hacia AC. Estiendanse pues y concurran hacia las partes BD en el puncto I si es possible. Luego el angulo exterior AEZ del triangulo IEZ es ygual al angulo EZI interior, y oppuesto. Lo qual [[prop-16|(por la 16 proposicion)]] es impossible. Luego AB, CD estendidas hacia las partes BD en ninguna manera concurren. Tambien de la misma suerte se demostrara que ni hacia las partes AC y las lineas que en ninguna parte concurren son parallelas [[def-23|(por la vltima difinicion)]] luego AB es paralella a la CD. Luego si cayendo vna linea recta, y lo demas como en el tneorema que se hauia de demostrar."
      },
      "e1774": {
        "num": "Proposición XXVII. Teorema",
        "pag": 26,
        "escaneo": 50,
        "enun": "Si una recta cayendo sobre otras dos forma los ángulos alternos iguales entre sí; estas rectas serán entre sí paralelas.",
        "dem": "Supóngase, que cayendo la recta EF sobre las rectas AB, CD forma los dos ángulos alternos AEF, EFD entre sí iguales. Digo, que la recta AB será paralela á la CD. Porque si no lo fuese, prolongadas las lineas AB, CD, se encontrarian ácia BD, ó AC: prolónguense, y encuéntrense ácia BD en el punto G, y resultaria el ángulo externo AEF del triángulo GEF mayor que el ángulo interno opuesto EFG [[prop-16|a 16. I.]]; lo que es imposible por haberse supuesto igual: luego prolongadas las lineas AB, CD no se encontrarán ácia BD. Semejantemente se demostrará, que tampoco se encontrarian ácia AC: es así que las que nunca se encuentran son paralelas [[def-23|b Def. 35.]]: luego AB es paralela á CD. Por consiguiente si una &c. L. Q. D. D."
      },
      "facil": "Si una recta corta a otras dos y forma ángulos alternos internos iguales, esas dos rectas son paralelas.",
      "pasos": [
        [
          "La recta EF corta a AB en E y a CD en F, y forma los ángulos alternos AEF y EFD iguales. Hay que ver que AB y CD son paralelas.",
          []
        ],
        [
          "Supongo que no lo son. Entonces, prolongadas, se cortan de algún lado: digamos hacia B y D, en un punto G. Las dibujo así, derechas y cortándose.",
          [
            "post-2"
          ]
        ],
        [
          "Queda un triángulo GEF. Su ángulo exterior AEF es mayor que el interior opuesto EFG, por la proposición 16. Y EFG es el mismo EFD.",
          [
            "prop-16"
          ]
        ],
        [
          "Pero se supuso que AEF y EFD son iguales: es imposible. En el dibujo se ve: para cortarse, las rectas tuvieron que girar, y los dos ángulos dejaron de ser iguales. AB y CD no se cortan hacia B y D.",
          []
        ],
        [
          "Vuelvo a las rectas del principio. Del mismo modo se ve que tampoco se cortan hacia A y C. No se cortan nunca: por la definición 23, son paralelas.",
          [
            "def-23"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-2",
        "prop-16",
        "def-23"
      ],
      "historia": [
        "Es la primera proposición sobre paralelas, y todavía no usa el postulado 5: alcanza con la proposición 16. Por eso vale también en la geometría hiperbólica, donde por un punto pasan muchas paralelas a una recta. El postulado 5 aparece recién en la proposición 29, que es su recíproca: si las rectas son paralelas, los alternos son iguales.",
        "Sobre una esfera, en cambio, no vale: allí dos «rectas» (dos círculos máximos) siempre se cortan, y no hay paralelas. Es lo mismo que pasaba con la proposición 16.",
        "Las dos ediciones dibujan las rectas quebradas en B y en D para que lleguen a encontrarse en G sin dejar de formar ángulos iguales. Así la figura parece un pentágono, aunque B y D no son vértices: están sobre los lados EG y FG del triángulo. Acá las dibujamos derechas, cortándose en G. Entonces los ángulos ya no se ven iguales, y eso es justamente lo que la demostración prueba: si las rectas se cortan, los alternos no pueden ser iguales.",
        "Zamorano escribe «parallelas» y también «paralella», y al final «tneorema» por «theorema». La edición de 1774 cita la definición de paralelas como la 35, igual que Zamorano: es la que hoy se numera 23."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-alternos",
          "slide": "d-alternos",
          "txt": "Geometría griega · bloque A · diapositiva «Alternos internos y conjugados internos»"
        },
        {
          "href": "../7mo/euclides-angulos.html#d-t2",
          "slide": "d-t2",
          "txt": "Geometría griega · bloque A · diapositiva «Teorema 2» (T2)"
        }
      ],
      "construccion": {
        "vb": "20 22 410 236",
        "puntos": {
          "A": [
            40.0,
            90.0
          ],
          "B": [
            320.0,
            90.0
          ],
          "C": [
            40.0,
            200.0
          ],
          "D": [
            320.0,
            200.0
          ],
          "E": [
            160.0,
            90.0
          ],
          "F": [
            220.0,
            200.0
          ],
          "P1": [
            133.0,
            40.5
          ],
          "P2": [
            247.0,
            249.5
          ],
          "G": [
            400.0,
            145.0
          ],
          "A2": [
            40.0,
            62.5
          ],
          "B2": [
            280.0,
            117.5
          ],
          "C2": [
            70.0,
            245.833333
          ],
          "D2": [
            310.0,
            172.5
          ]
        },
        "rotulos": {
          "A": [
            -4,
            -14
          ],
          "B": [
            4,
            -14
          ],
          "C": [
            -4,
            16
          ],
          "D": [
            4,
            16
          ],
          "E": [
            12,
            -12
          ],
          "F": [
            -12,
            14
          ],
          "P1": null,
          "P2": null,
          "G": [
            12,
            -8
          ],
          "A2": [
            -4,
            -14,
            "A"
          ],
          "B2": [
            4,
            -14,
            "B"
          ],
          "C2": [
            -14,
            2,
            "C"
          ],
          "D2": [
            4,
            16,
            "D"
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "E",
              "B"
            ],
            [
              "C",
              "F",
              "D"
            ],
            [
              "P1",
              "E",
              "F"
            ],
            [
              "E",
              "F",
              "P2"
            ],
            [
              "A2",
              "E",
              "B2"
            ],
            [
              "E",
              "B2",
              "G"
            ],
            [
              "C2",
              "F",
              "D2"
            ],
            [
              "F",
              "D2",
              "G"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A",
              "hasta": 1
            },
            {
              "t": "punto",
              "p": "B",
              "hasta": 1
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true,
              "hasta": 1
            },
            {
              "t": "punto",
              "p": "C",
              "hasta": 1
            },
            {
              "t": "punto",
              "p": "D",
              "hasta": 1
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true,
              "hasta": 1
            },
            {
              "t": "punto",
              "p": "P1"
            },
            {
              "t": "punto",
              "p": "P2"
            },
            {
              "t": "segmento",
              "a": "P1",
              "b": "P2",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "A",
              "b": "F",
              "color": 1,
              "r": 28,
              "hasta": 1
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "D",
              "b": "E",
              "color": 1,
              "r": 28,
              "hasta": 1
            }
          ],
          [
            {
              "t": "punto",
              "p": "A2",
              "hasta": 4
            },
            {
              "t": "punto",
              "p": "B2",
              "hasta": 4
            },
            {
              "t": "punto",
              "p": "C2",
              "hasta": 4
            },
            {
              "t": "punto",
              "p": "D2",
              "hasta": 4
            },
            {
              "t": "punto",
              "p": "G",
              "hasta": 4
            },
            {
              "t": "segmento",
              "a": "A2",
              "b": "G",
              "sinRegla": true,
              "hasta": 4
            },
            {
              "t": "segmento",
              "a": "C2",
              "b": "G",
              "sinRegla": true,
              "hasta": 4
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "E",
                "G",
                "F"
              ],
              "aux": 4
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "A2",
              "b": "F",
              "color": 1,
              "r": 28,
              "hasta": 4
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "G",
              "b": "E",
              "color": 2,
              "r": 28,
              "hasta": 4
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "E",
                  "F"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "A",
              "b": "F",
              "color": 1,
              "r": 28
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "D",
              "b": "E",
              "color": 1,
              "r": 28
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "B"
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "D"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-28",
      "tipo": "proposicion",
      "n": 28,
      "clase": "teorema",
      "titulo": "Otras dos maneras de ver que son paralelas",
      "zam": {
        "num": "Theorema 19, Proposicion 28",
        "escaneo": 48,
        "enun": "Si cayendo vna linea recta sobre dos lineas rectas hizieren el angulo exterior ygual al interior y oppuesto hacia vnas mismas partes, o los interiores hacia vnas mismas partes ygualee a dos rectos, seran parallelas entre si las mismas lineas rectas.",
        "dem": "Si cayendo la linea recta EZ sobre las dos lineas rectas AB, CD hicieren el angulo exterior EIB ygual al angulo interior y oppuesto ITD o los interiores hacia vna misma parte, es a saber BIT, ITD yguales a dos rectos. Digo que es parallella la linea AB a la linea CD. Porque el angulo EIB (por la suposicion) es ygual al angulo ITD y el angulo EIB [[prop-15|(por la 15)]] es ygual al angulo AIT luego el angulo AIT es ygual al angulo ITD y son alternos [[prop-27|(por la veynte y siete proposicion)]] luego es paralella AB a la CD. Demas desto porque los angulos BIT, ITD son yguales a dos rectos (por la supposicion) y los angulos AIT, BIT [[prop-13|(por la treze proposicion)]] son yguales a dos rectos. Luego los angulos AIT, BIT son yguales a los angulos BIT, ITD. Quitese el angulo comun BIT luego el restante AIT es ygual al restante ITD y son alternos. Luego parallela es AB a la CD. luego si cayendo vna linea recta sobre dos lineas rectas, y lo demas como en la proposicion, que es lo que se auia de demostrar."
      },
      "e1774": {
        "num": "Proposición XXVIII. Teorema",
        "pag": 27,
        "escaneo": 51,
        "enun": "Si una recta cayendo sobre otras dos forma el ángulo externo igual al interno opuesto ácia la misma parte, ó bien los ángulos internos de una misma parte iguales á dos rectos; serán las dos lineas paralelas.",
        "dem": "Supuesto, que la recta EF cayendo sobre las rectas AB, CD forme el ángulo externo EGB igual al interno opuesto ácia la misma parte GHD, ó que forme los ángulos internos de la misma parte BGH, GHD iguales á dos rectos: digo, que la recta AB será paralela á la recta CD. Porque siendo el ángulo EGB igual al GHD, y el EGB al AGH [[prop-15|a 15. I.]]; tambien será igual el ángulo AGH al GHD, y son alternos: luego la linea AB es paralela [[prop-27|b 27. I.]] á la CD: ademas de esto siendo los ángulos BGH, GHD iguales á dos rectos c Por la hipot., tambien los ángulos AGH, BGH son iguales á dos rectos [[prop-13|d 13. I.]]: resultarán pues los ángulos AGH, BGH iguales á los BGH, GHD: quítese el ángulo comun BGH, y quedará el AGH igual al GHD: y son tambien alternos: luego la linea AB será paralela á la CD. Por consiguiente si una &c. L. Q. D. D."
      },
      "facil": "Si una recta corta a otras dos y forma ángulos correspondientes iguales, o ángulos conjugados internos que suman dos rectos (180°), esas dos rectas son paralelas.",
      "pasos": [
        [
          "La recta EF corta a AB en G y a CD en H. Primer caso: el ángulo exterior EGB es igual al interior GHD, que está del mismo lado (hoy decimos que son correspondientes).",
          []
        ],
        [
          "El ángulo EGB es igual al AGH, porque son opuestos por el vértice.",
          [
            "prop-15"
          ]
        ],
        [
          "Entonces AGH es igual a GHD, y son alternos: por la proposición 27, AB y CD son paralelas.",
          [
            "prop-27"
          ]
        ],
        [
          "Segundo caso: los dos ángulos interiores del mismo lado, BGH y GHD, juntos son iguales a dos rectos (hoy decimos que son conjugados internos).",
          []
        ],
        [
          "AGH y BGH también suman dos rectos, por la proposición 13. Como todos los rectos son iguales, AGH + BGH = BGH + GHD.",
          [
            "prop-13",
            "post-4",
            "nc-1"
          ]
        ],
        [
          "Les saco a los dos lados el ángulo BGH: queda AGH = GHD, y son alternos. Por la proposición 27, AB y CD son paralelas.",
          [
            "nc-3",
            "prop-27"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-15",
        "prop-27",
        "prop-13",
        "post-4",
        "nc-1",
        "nc-3"
      ],
      "historia": [
        "Junto con la 27, da tres maneras de reconocer paralelas: alternos iguales, correspondientes iguales, o conjugados internos que suman dos rectos (180°). Las dos que trae esta se reducen a la primera.",
        "Todavía no usa el postulado 5. La proposición 29 hace el camino de vuelta: si las rectas son paralelas, los ángulos cumplen las tres cosas. Esa vuelta es la que necesita el postulado.",
        "Euclides no tiene nombres para estos ángulos: dice «el externo igual al interno opuesto de la misma parte» y «los internos de la misma parte». «Correspondientes» y «conjugados» son nombres posteriores; «alternos» sí es de Euclides.",
        "Zamorano escribe «ygualee» en el enunciado, y vuelve a alternar «parallela» y «paralella». La edición de 1774, para decir que BGH y GHD suman dos rectos, no cita una proposición sino «por la hipótesis»: es lo que se supone."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-correspondientes",
          "slide": "d-correspondientes",
          "txt": "Geometría griega · bloque A · diapositiva «Ángulos correspondientes»"
        }
      ],
      "construccion": {
        "vb": "20 8 360 256",
        "puntos": {
          "A": [
            40.0,
            90.0
          ],
          "B": [
            360.0,
            90.0
          ],
          "C": [
            40.0,
            200.0
          ],
          "D": [
            360.0,
            200.0
          ],
          "G": [
            170.0,
            90.0
          ],
          "H": [
            230.0,
            200.0
          ],
          "E": [
            137.0,
            29.5
          ],
          "F": [
            263.0,
            260.5
          ]
        },
        "rotulos": {
          "A": [
            -4,
            -14
          ],
          "B": [
            4,
            -14
          ],
          "C": [
            -4,
            16
          ],
          "D": [
            4,
            16
          ],
          "G": [
            -14,
            -12
          ],
          "H": [
            14,
            16
          ],
          "E": [
            -12,
            -4
          ],
          "F": [
            14,
            -4
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "G",
              "B"
            ],
            [
              "C",
              "H",
              "D"
            ],
            [
              "E",
              "G",
              "H"
            ],
            [
              "G",
              "H",
              "F"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "punto",
              "p": "H"
            },
            {
              "t": "angulo",
              "v": "G",
              "a": "E",
              "b": "B",
              "color": 1,
              "r": 26,
              "hasta": 3
            },
            {
              "t": "angulo",
              "v": "H",
              "a": "G",
              "b": "D",
              "color": 1,
              "r": 26,
              "hasta": 3
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "A",
              "b": "H",
              "color": 1,
              "r": 26,
              "hasta": 3
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "B",
              "hasta": 3
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "D",
              "hasta": 3
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "B",
              "b": "H",
              "color": 2,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "H",
              "a": "G",
              "b": "D",
              "color": 3,
              "r": 26
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "A",
              "b": "H",
              "color": 4,
              "r": 26,
              "hasta": 5
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "A",
              "b": "H",
              "color": 3,
              "r": 26
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "B"
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "D"
            }
          ]
        ]
      }
    },
    {
      "id": "post-5",
      "tipo": "postulado",
      "n": 5,
      "titulo": "El postulado de las paralelas",
      "zam": {
        "num": "Petición 5",
        "escaneo": 20,
        "enun": "Si cayendo vna linea recta sobre dos lineas rectas hiziere los angulos interiores y de vna misma parte menores que dos rectos, aquellas lineas rectas estendidas en infinito, es necessario que concurran azia aquella parte en la qual estan los angulos menores que dos rectos."
      },
      "e1774": {
        "num": "Axioma XII",
        "pag": 6,
        "escaneo": 30,
        "enun": "Si una recta cayendo sobre otras dos forma los ángulos internos á la misma parte menores que dos rectos; prolongadas concurrirán ácia aquella parte, donde hacen los ángulos menores que dos rectos. Véanse las notas á la Proposicion 29 del Libro I."
      },
      "facil": "Si una recta corta a otras dos y los dos ángulos de adentro de un mismo lado suman menos que dos rectos (menos de 180°), esas dos rectas, alargadas, se cortan de ese lado.",
      "usa": [],
      "historia": [
        "Es mucho más largo y complicado que los otros cuatro postulados, y por eso durante más de dos mil años muchos pensaron que no era un principio sino un teorema, y trataron de demostrarlo con lo anterior. Proclo ya cuenta un intento de Ptolomeo, y él mismo propone otro.",
        "Euclides lo usa por primera vez recién en la proposición 29. Las 28 anteriores no lo necesitan: hoy se llama geometría absoluta a todo lo que se puede demostrar sin él.",
        "En el siglo XIX, Lobachevski y Bolyai construyeron geometrías en las que no vale, y en 1868 Beltrami mostró que esas geometrías son tan coherentes como la de Euclides. Así se supo que el postulado 5 no se puede demostrar con los otros: hay que aceptarlo o no. Las geometrías donde no vale se llaman no euclidianas.",
        "Hoy se lo dice casi siempre de otra manera, que es equivalente: por un punto que no está en una recta pasa una sola paralela a ella. Se la conoce como el axioma de Playfair, por el libro de John Playfair de 1795.",
        "La edición de 1774 no lo pone entre los postulados sino como su axioma XII, entre comillas, y remite a las notas de Simson a la proposición 29. Zamorano lo trae como su quinta petición, como el texto griego.",
        "En la clase de 7.º, P5 lo dice de una forma más fácil de ver: dos rectas cortadas por una secante son paralelas si y solo si los correspondientes son iguales. La vuelta de esa frase es la proposición 28; la ida, que necesita el postulado, es la 29."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-p5",
          "slide": "d-p5",
          "txt": "Geometría griega · bloque A · diapositiva «El postulado de las paralelas» (P5)"
        }
      ]
    },
    {
      "id": "prop-29",
      "tipo": "proposicion",
      "n": 29,
      "clase": "teorema",
      "titulo": "Lo que pasa entre dos paralelas",
      "zam": {
        "num": "Theorema 20, Proposicion 29",
        "escaneo": 49,
        "enun": "Cayendo vna linea recta sobre dos lineas rectas paralellas, hara los angulos alternos entre si yguales: y el exterior ygual al interior y opuesto hacia vnas mismas partes: y los dos interiores hacia vnas mismas partes yguales a dos rectos.",
        "dem": "Caya sobre las lineas rectas parallelas AB, CD la linea recta EZ. Digo, que hace yguales los angulos alternos AIT y ITD, y el angulo exterior EIB al interior y opuesto hacia vnas mismas partes, esto es, al angulo ITD, y los interiores y acia vnas mismas partes que son BIT, ITD yguales a dos rectos. Porque si AIT no es ygual a ITD el vno dellos es mayor, sea mayor AIT. Pues porque AIT es mayor que ITD pongase por comun el angulo BIT, luego los angulos AIT, BIT son mayores que BIT, ITD y los angulos AIT, TIB [[prop-13|(por la 13 proposicion)]] son yguales a dos rectos, luego los angulos BIT, ITD son menores que dos rectos y [[post-5|(por la quinta peticion)]] las lineas que haziendo menores que dos rectos se estienden en infinito, concurren, y estas por ser paralellas no concurren (por la suposicion) luego el angulo AIT no es desigual al angulo ITD. Luego sera ygual. Y el angulo AIT [[prop-15|(por la 15 proposicion)]] es ygual al angulo EIB. Luego el angulo EIB [[nc-1|(Por la 1 comun sentencia)]] es ygual al angulo ITD. Pongase por comun BIT. Luego los angulos FIB, BIT son yguales a los angulos BET, ITD. y los angulos EIB, BIT son yguales a dos rectos [[prop-13|(por la 13 proposicion)]] luego los angulos BIT, ITD son yguales a dos rectos. Luego cayendo vna linea recta sobre dos lineas rectas paralellas, y lo de mas como en la proposicion, que conuenia demostrar."
      },
      "e1774": {
        "num": "Proposición XXIX. Teorema",
        "pag": 28,
        "escaneo": 52,
        "enun": "Cayendo una recta sobre dos paralelas, formará los ángulos alternos iguales entre sí; el externo igual á su interno opuesto de la misma parte; y los internos de la misma parte iguales á dos rectos.",
        "dem": "Cayga la recta EF sobre las rectas paralelas AB, CD. Digo, que formará los ángulos alternos AGH, GHD iguales entre sí; el externo EGB igual al interno opuesto de la misma parte GHD: últimamente los internos de la misma parte BGH, GHD iguales á dos rectos. Porque si el ángulo AGH fuera desigual al GHD, uno de ellos sería mayor. Séalo el AGH, y júnteseles el BGH: resultarán los ángulos AGH, BGH mayores que los BGH, GHD: es así que los ángulos AGH, BGH son iguales á dos rectos [[prop-13|a 13. I.]]: luego los BGH, GHD serían menores que dos rectos: pero las rectas, que con otra forman los ángulos internos de la misma parte menores que dos rectos prolongadas al infinito, se encuentran [[post-5|* Ax. 12.]]: luego las rectas AB, CD prolongadas al infinito se encontrarian: es así, que no se encuentran, pues se supusieron paralelas: luego el ángulo AGH no puede ser desigual al GHD: luego será igual. Tambien el ángulo AGH es igual al EGB [[prop-15|b 15. I.]]: luego el EGB será igual al GHD: añádase el ángulo BGH, y resultarán los ángulos EGB, BGH iguales á los BGH, GHD: es así que los EGB, BGH son iguales [[prop-13|c 13. I.]] á dos rectos: luego serán asimismo iguales á dos rectos los ángulos BGH, GHD. Por consiguiente cayendo &c. L. Q. D. D."
      },
      "facil": "Si una recta corta a dos paralelas, los alternos internos son iguales, los correspondientes son iguales, y los conjugados internos suman dos rectos (180°).",
      "pasos": [
        [
          "AB y CD son paralelas, y la recta EF las corta en G y en H. Hay que ver que los alternos AGH y GHD son iguales, que el exterior EGB es igual al interior GHD, y que BGH y GHD suman dos rectos.",
          []
        ],
        [
          "Supongo que AGH y GHD no son iguales, y que AGH es el mayor. Les sumo BGH a los dos: AGH y BGH juntos son mayores que BGH y GHD.",
          []
        ],
        [
          "Pero AGH y BGH juntos son dos rectos, por la proposición 13. Entonces BGH y GHD suman menos que dos rectos.",
          [
            "prop-13"
          ]
        ],
        [
          "Por el postulado 5, AB y CD, alargadas, se cortarían del lado de B y D. Pero son paralelas y no se cortan nunca: es imposible. Así que AGH = GHD.",
          [
            "post-5",
            "def-23"
          ]
        ],
        [
          "El ángulo EGB es igual al AGH, porque son opuestos por el vértice. Entonces EGB = GHD.",
          [
            "prop-15",
            "nc-1"
          ]
        ],
        [
          "Les sumo BGH a los dos: EGB y BGH juntos son iguales a BGH y GHD. Como EGB y BGH son dos rectos, por la proposición 13, también BGH y GHD suman dos rectos.",
          [
            "nc-2",
            "prop-13",
            "nc-1"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-13",
        "post-5",
        "def-23",
        "prop-15",
        "nc-1",
        "nc-2"
      ],
      "historia": [
        "Es la primera proposición del libro que usa el postulado 5. Hace el camino de vuelta de la 27 y la 28: aquellas dicen que si los ángulos son iguales las rectas son paralelas, y esta dice que si las rectas son paralelas los ángulos son iguales.",
        "En una geometría donde no vale el postulado 5, como la hiperbólica, esta proposición es falsa: dos rectas pueden no cortarse nunca y formar, igual, alternos distintos.",
        "En la clase de 7.º es el Teorema 2 (T2): los alternos internos son iguales y los conjugados suman 180°. La clase lo demuestra a partir de P5, que ya dice que los correspondientes son iguales.",
        "Para pasar de «el ángulo AGH es mayor» a «AGH y BGH son mayores que BGH y GHD», las dos ediciones suman lo mismo a cosas desiguales sin citar nada: es lo que la edición de 1774 llama su axioma IV.",
        "Zamorano escribe al final «los ángulos FIB, BIT son iguales a los ángulos BET, ITD», cuando quiere decir EIB y BIT: dos erratas de imprenta en la misma frase."
      ],
      "enClase": [
        {
          "href": "../7mo/euclides-angulos.html#d-t2",
          "slide": "d-t2",
          "txt": "Geometría griega · bloque A · diapositiva «Teorema 2» (T2)"
        }
      ],
      "construccion": {
        "vb": "20 8 440 256",
        "puntos": {
          "A": [
            40.0,
            90.0
          ],
          "B": [
            360.0,
            90.0
          ],
          "C": [
            40.0,
            200.0
          ],
          "D": [
            360.0,
            200.0
          ],
          "G": [
            170.0,
            90.0
          ],
          "H": [
            230.0,
            200.0
          ],
          "E": [
            137.0,
            29.5
          ],
          "F": [
            263.0,
            260.5
          ],
          "K": [
            440.0,
            145.0
          ]
        },
        "rotulos": {
          "A": [
            -4,
            -14
          ],
          "B": [
            4,
            -14
          ],
          "C": [
            -4,
            16
          ],
          "D": [
            4,
            16
          ],
          "G": [
            -14,
            -12
          ],
          "H": [
            14,
            16
          ],
          "E": [
            -12,
            -4
          ],
          "F": [
            14,
            -4
          ],
          "K": [
            12,
            -8
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "G",
              "B"
            ],
            [
              "C",
              "H",
              "D"
            ],
            [
              "E",
              "G",
              "H"
            ],
            [
              "G",
              "H",
              "F"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "punto",
              "p": "H"
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "A",
              "b": "H",
              "color": 1,
              "r": 34,
              "hasta": 4
            },
            {
              "t": "angulo",
              "v": "H",
              "a": "G",
              "b": "D",
              "color": 2,
              "r": 26,
              "hasta": 4
            },
            {
              "t": "angulo",
              "v": "G",
              "a": "B",
              "b": "H",
              "color": 3,
              "r": 24,
              "hasta": 4
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ]
              ],
              "marca": false
            }
          ],
          [
            {
              "t": "punto",
              "p": "K",
              "hasta": 4
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "K",
              "hasta": 4
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "K",
              "hasta": 4
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "A",
              "b": "H",
              "color": 1,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "H",
              "a": "G",
              "b": "D",
              "color": 1,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "G",
              "a": "E",
              "b": "B",
              "color": 1,
              "r": 26
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "B",
              "b": "H",
              "color": 3,
              "r": 24
            }
          ]
        ]
      }
    },
    {
      "id": "prop-30",
      "tipo": "proposicion",
      "n": 30,
      "clase": "teorema",
      "titulo": "Paralelas a una misma recta",
      "zam": {
        "num": "Theorema 21, Proposition 30",
        "escaneo": 50,
        "enun": "Las lineas rectas que a vna misma son parallelas entre si son paralellas.",
        "dem": "Sean AB, CD paralellas a la EZ, digo que AB es paralella a la CD. caya sobre ellas la linea recta ITK, y porque la linea recta ITK cae sobre las lineas rectas paralelas AB, EZ luego sera ygual el angulo AIT al angulo ITZ [[prop-29|(por la 29 proposicion)]] Item porque sobre las lineas rectas parallelas EZ, CD cae la linea recta IK, es [[prop-29|por la misma]], ygual ITZ al IKD. Y esta declarado que AIT es ygual al angulo ITZ, y que IKD es ygual a ITZ. luego AIK es ygual a IKD y son alternos, luego paralella es AB a la CD que es lo que se auia de demostrar."
      },
      "e1774": {
        "num": "Proposición XXX. Teorema",
        "pag": 29,
        "escaneo": 53,
        "enun": "Las rectas, que son paralelas á una misma recta, son paralelas entre sí.",
        "dem": "Sean las dos lineas AB, CD paralelas á la EF. Digo, que tambien AB será paralela á CD. Supóngase, que cae sobre estas la recta GHK; por quanto la recta GK cae sobre las rectas paralelas AB, EF, el ángulo AGH será igual [[prop-29|a 29. I.]] al GHF. Ademas cayendo la misma recta GK sobre las rectas paralelas EF, CD, el ángulo GHF resulta igual al GKD [[prop-29|b 29. I.]]: y ya está demostrada la igualdad del ángulo AGK al GHF: luego tambien el ángulo AGK será igual al GKD: pero estos son tambien alternos: luego la linea AB es paralela á la CD [[prop-27|c 27. I.]]. Por consiguiente las rectas &c. L. Q. D. D."
      },
      "facil": "Si dos rectas son paralelas a una tercera, son paralelas entre sí.",
      "pasos": [
        [
          "AB y CD son paralelas a EF. Hay que ver que AB y CD son paralelas entre sí.",
          []
        ],
        [
          "Trazo una recta que corta a las tres: a AB en G, a EF en H y a CD en K.",
          [
            "post-1"
          ]
        ],
        [
          "AB y EF son paralelas: por la proposición 29, los alternos AGH y GHF son iguales.",
          [
            "prop-29"
          ]
        ],
        [
          "EF y CD son paralelas: por la proposición 29, el ángulo GHF es igual al GKD, que está del mismo lado (son correspondientes).",
          [
            "prop-29"
          ]
        ],
        [
          "AGK y GKD son iguales a GHF, así que son iguales entre sí; y son alternos. Por la proposición 27, AB y CD son paralelas.",
          [
            "nc-1",
            "prop-27"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-1",
        "prop-29",
        "nc-1",
        "prop-27"
      ],
      "historia": [
        "Dice que «ser paralelas» funciona como «ser iguales» en la noción común 1: dos rectas paralelas a una misma son paralelas entre sí. Así se pueden trazar muchas paralelas y saber que todas lo son unas con otras, como las líneas de un cuaderno.",
        "Usa la proposición 29, y por lo tanto el postulado 5. En la geometría hiperbólica no vale: dos rectas pueden no cortar a una tercera y cortarse entre ellas.",
        "Euclides solo demuestra el caso en que EF queda en el medio. Si EF está afuera, por encima o por debajo de las otras dos, la demostración es casi la misma.",
        "Esta proposición vale para rectas de un mismo plano. Para rectas en el espacio, Euclides la vuelve a demostrar en el libro XI.",
        "Zamorano no cita la proposición 27 al final, cuando dice que los alternos iguales dan paralelas; la edición de 1774 sí. Y Zamorano vuelve a alternar «parallelas» y «paralellas»."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 14 360 270",
        "puntos": {
          "A": [
            40.0,
            60.0
          ],
          "B": [
            360.0,
            60.0
          ],
          "C": [
            40.0,
            220.0
          ],
          "D": [
            360.0,
            220.0
          ],
          "E": [
            40.0,
            140.0
          ],
          "F": [
            360.0,
            140.0
          ],
          "G": [
            150.0,
            60.0
          ],
          "H": [
            190.0,
            140.0
          ],
          "K": [
            230.0,
            220.0
          ],
          "P1": [
            130.0,
            20.0
          ],
          "P2": [
            250.0,
            260.0
          ]
        },
        "rotulos": {
          "A": [
            -4,
            -14
          ],
          "B": [
            4,
            -14
          ],
          "E": [
            -4,
            -14
          ],
          "F": [
            4,
            -14
          ],
          "C": [
            -4,
            16
          ],
          "D": [
            4,
            16
          ],
          "G": [
            13,
            -12
          ],
          "H": [
            -14,
            14
          ],
          "K": [
            -14,
            14
          ],
          "P1": null,
          "P2": null
        },
        "comprueba": {
          "alineados": [
            [
              "P1",
              "G",
              "H"
            ],
            [
              "G",
              "H",
              "K"
            ],
            [
              "H",
              "K",
              "P2"
            ],
            [
              "A",
              "G",
              "B"
            ],
            [
              "E",
              "H",
              "F"
            ],
            [
              "C",
              "K",
              "D"
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            }
          ],
          [
            {
              "t": "punto",
              "p": "P1"
            },
            {
              "t": "punto",
              "p": "P2"
            },
            {
              "t": "segmento",
              "a": "P1",
              "b": "P2"
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "punto",
              "p": "H"
            },
            {
              "t": "punto",
              "p": "K"
            }
          ],
          [
            {
              "t": "angulo",
              "v": "G",
              "a": "A",
              "b": "H",
              "color": 1,
              "r": 24
            },
            {
              "t": "angulo",
              "v": "H",
              "a": "G",
              "b": "F",
              "color": 1,
              "r": 24
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "F",
                "E"
              ],
              "aux": true
            }
          ],
          [
            {
              "t": "angulo",
              "v": "K",
              "a": "G",
              "b": "D",
              "color": 1,
              "r": 24
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "F",
                "D",
                "C"
              ],
              "tono": 2,
              "aux": true
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "B"
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "D"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-31",
      "tipo": "proposicion",
      "n": 31,
      "clase": "problema",
      "titulo": "Trazar una paralela",
      "zam": {
        "num": "Problema 10, Propositio 31",
        "escaneo": 51,
        "enun": "Por vn puncto dado tirar vna linea recta parallela a vna linea recta dada.",
        "dem": "Sea A el puncto dado, y la linea recta dada sea BC. conuiene por el puncto dado A tirar vna linea recta paralella a la linea recta BC. Tomese vn puncto a caso en la misma linea recta BC y sea D y tirese [[post-1|(por la 1 peticion)]] la linea AD, y [[prop-23|(por la proposicion 23)]] hagase sobre la linea recta dada AD, y en el puncto A señalado en ella, el angulo DAZ ygual al angulo dado ADB y estiendasele la linea AZ derechamente a la linea AE [[post-2|(por la 2 peticion)]]. Y porque cayendo la recta linea AD sobre las lineas rectas BC, EZ hizo entre si yguales los angulos alternos EAD, ADC, sera pues EZ paralella a la BC [[prop-27|(por la proposicion 27)]] luego por el puncto dado A se tiro la linea recta EAZ paralella a la linea recta BC. Lo qual conuino hazerse."
      },
      "e1774": {
        "num": "Proposición XXXI. Problema",
        "pag": 29,
        "escaneo": 53,
        "enun": "Por un punto dado, tirar una paralela á una recta dada.",
        "dem": "Sea A el punto dado, y BC la recta dada, y háyase de tirar una paralela por el punto A á la recta BC. Tómese en la linea BC qualquier punto D: júntense A, y D; constrúyase en el punto A de la recta DA el ángulo DAE [[prop-23|a 23. I.]] igual al ADC, y prolónguese la recta EA; esto es tírese AF directamente á EA. Formando pues la recta AD, que cae sobre las rectas BC, EF, ángulos alternos iguales entre sí, resulta que la linea EF será paralela á BC. Por consiguiente se ha tirado &c. L. Q. D. H."
      },
      "facil": "Con regla y compás se puede trazar, por un punto que está afuera de una recta, una paralela a esa recta.",
      "pasos": [
        [
          "Sea BC la recta dada y A un punto que no está en ella.",
          []
        ],
        [
          "Marco un punto cualquiera D en BC y trazo AD.",
          [
            "post-1"
          ]
        ],
        [
          "En A, sobre AD, construyo un ángulo igual a ADC, del lado contrario a C. Lo hago con la construcción de la proposición 23:",
          [
            "prop-23"
          ]
        ],
        [
          "Marco un punto M en DC y trazo AM. El ángulo ADM es el mismo ADC.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro A y radio igual a DM, y con centro D y radio igual a AM, trazo dos circunferencias; esas medidas se llevan con la proposición 2.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de AD contrario a M, en un punto: lo llamo E. Trazo AE.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Los triángulos DAM y ADE tienen AD en común, DM = AE y AM = DE. Por la proposición 8, el ángulo DAE es igual al ADM, que es el ADC.",
          [
            "def-15",
            "prop-8"
          ],
          {
            "sub": true
          }
        ],
        [
          "Prolongo EA más allá de A hasta un punto F.",
          [
            "post-2"
          ]
        ],
        [
          "AD corta a BC y a EF, y forma los alternos DAE y ADC iguales. Por la proposición 27, EF es paralela a BC.",
          [
            "prop-27"
          ]
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "post-1",
        "prop-23",
        "post-3",
        "prop-2",
        "def-15",
        "prop-8",
        "post-2",
        "prop-27"
      ],
      "historia": [
        "Es la manera de trazar paralelas del libro, y la proposición 32 la usa enseguida: para probar que los ángulos de un triángulo suman dos rectos, traza por un vértice la paralela al lado de enfrente.",
        "No usa el postulado 5: alcanza con la proposición 27. Lo que necesita el postulado es saber que esa paralela es la única que pasa por A. Esa es justamente la forma del postulado que hoy se enseña, el axioma de Playfair.",
        "En el paso 3, la proposición 23 se hace tomando el mismo punto A sobre uno de los lados del ángulo: así el triángulo que se copia, DAM, comparte el lado AD con la copia, ADE. Euclides toma dos puntos cualesquiera, uno en cada lado; la idea es la misma.",
        "En el escaneo, el texto de Zamorano está partido en renglones cortos al lado de la figura, y la imprenta mezcló algunos («con- … uiene», «li- … nea»). Acá lo damos en el orden en que se lee.",
        "La edición de 1774 dice que los alternos iguales dan paralelas sin citar la proposición 27; Zamorano sí la cita. En la figura de Zamorano las letras están al revés: C a la izquierda y B a la derecha, y la paralela es EAZ."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 50 370 180",
        "puntos": {
          "A": [
            260.0,
            80.0
          ],
          "B": [
            40.0,
            200.0
          ],
          "C": [
            360.0,
            200.0
          ],
          "D": [
            170.0,
            200.0
          ],
          "M": [
            300.0,
            200.0
          ],
          "E": [
            130.0,
            80.0
          ],
          "F": [
            360.0,
            80.0
          ]
        },
        "rotulos": {
          "A": [
            2,
            -16
          ],
          "B": [
            -4,
            16
          ],
          "C": [
            4,
            16
          ],
          "D": [
            -4,
            16
          ],
          "M": [
            4,
            16
          ],
          "E": [
            -6,
            -14
          ],
          "F": [
            6,
            -14
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "D",
              "C"
            ],
            [
              "D",
              "M",
              "C"
            ],
            [
              "E",
              "A",
              "F"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "E"
              ],
              [
                "D",
                "M"
              ]
            ],
            [
              [
                "D",
                "E"
              ],
              [
                "A",
                "M"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            }
          ],
          [
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D"
            }
          ],
          [
            {
              "t": "angulo",
              "v": "D",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 26
            }
          ],
          [
            {
              "t": "punto",
              "p": "M",
              "aux": 7
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "M",
              "aux": 7
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "E",
              "pasa": [
                "E"
              ],
              "aux": 6
            },
            {
              "t": "circulo",
              "c": "D",
              "por": "E",
              "pasa": [
                "E"
              ],
              "aux": 6
            }
          ],
          [
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "E"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "D",
                "A",
                "M"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "D",
                "E"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "E"
                ],
                [
                  "D",
                  "M"
                ]
              ],
              "hasta": 7
            },
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "E"
                ],
                [
                  "A",
                  "M"
                ]
              ],
              "rayas": 2,
              "hasta": 7
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "D",
              "b": "E",
              "color": 1,
              "r": 26
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "E",
              "por": "A",
              "largo": 242.0
            },
            {
              "t": "punto",
              "p": "F"
            }
          ],
          [
            {
              "t": "destaca",
              "a": "E",
              "b": "F"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-32",
      "tipo": "proposicion",
      "n": 32,
      "clase": "teorema",
      "titulo": "Los ángulos del triángulo suman dos rectos",
      "zam": {
        "num": "Theorema 22, Proposicion 32",
        "escaneo": 51,
        "enun": "Estendido el vn lado de todo triangulo el angulo exterior es vgual a los dos interiores de la parte contraria: y los tres interiores angulos del triangulo son yguales a dos rectos.",
        "dem": "Sea el triangulo ABC y estiendase vn lado suyo, y sea BC asta en D. digo que el angulo ACD exterior es ygual a los dos CAB, ABC interiores de la parte contraria: y los tres angulos interiores ABC, CBA, BAC del triangulo son yguales a dos rectos. Tirese [[prop-31|(por la precedente)]] por el puncto C la linea CE parallela a la linea recta AB. Y porque AB es parallela a la CE, y sobre las mismas lineas cae AC los angulos alternos BAC, ACE son entre si yguales. De mas desto porque AB es parallela a la CE y sobre ellas cae la linea recta BD el angulo exterior ECD [[prop-29|(por las 27. 28. 29. proposiciones)]] es ygual al angulo interior ABC oppuesto. y demostrose, que ACE es ygual al angulo BAC. Luego todo el angulo exterior ACD es ygual a los dos interiores y oppuestos, que son BAC, ABC. Y pongase por comun el angulo ACB. Luego ACD, ACB son yguales a los tres angulos ABC, BCA, CAB. Pero ACD, ACB [[prop-13|(por la 13 proposicion)]] son yguales a dos rectos, luego los angulos ACB, CAB, CBA son yguales a dos rectos. Luego estendido el vn lado de todo triangulo, y lo de mas que se sigue como en el theorema, que conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XXXII. Teorema",
        "pag": 30,
        "escaneo": 54,
        "enun": "En todo triángulo, prolongado uno de sus lados, el ángulo externo es igual á los dos internos opuestos: y los tres ángulos internos de todo triángulo son iguales á dos rectos.",
        "dem": "Sea el triángulo ABC; y uno de sus lados BC prolónguese hasta D. Digo, que el ángulo externo ACD será igual á los internos opuestos CAB, ABC; y que los tres ángulos internos ABC, BCA, CAB del triángulo serán iguales á dos rectos. Tírese por el punto C la CE paralela [[prop-31|a 31. I.]] á la recta AB: siendo estas dos lineas paralelas, y cayendo sobre ellas la AC, los ángulos alternos BAC, ACE resultan entre sí iguales [[prop-29|b 29. I.]]. Ademas, como AB es paralela á CE, y sobre ambas cae la recta BD, el ángulo externo ECD es igual [[prop-29|c 29. I.]] al interno opuesto ABC: luego el ángulo externo ACD es igual á los dos internos opuestos CAB, ABC. Añádase á ambos el ángulo ACB; y resultarán iguales los ángulos ACD, ACB á los tres CBA, BAC, ACB: es así que los ángulos ACD, ACB son iguales á dos rectos [[prop-13|d 13. I.]]: luego tambien los ángulos CBA, BAC, ACB son iguales á dos rectos. Por consiguiente en todo &c. L. Q. D. D."
      },
      "facil": "En todo triángulo, si se prolonga un lado, el ángulo exterior que se forma es igual a los dos interiores que no lo tocan, juntos. Y los tres ángulos de un triángulo suman dos rectos, es decir, 180°.",
      "corolario": {
        "e1774": "Cor. 1. Juntos todos los ángulos internos de qualquiera figura rectilinea con quatro ángulos rectos componen dos veces tantos rectos, quantos son los lados de la figura. Porque qualquiera figura rectilinea, como la ABCDE, es divisible en tantos triángulos, quantos son sus lados, tirando rectas de un punto F de dentro de la figura á todos sus ángulos: es así que juntos todos los ángulos de los triángulos son (segun la Proposicion precedente) iguales á dos veces tantos rectos, quantos son los triángulos, esto es quantos son los lados de la figura: y los mismos ángulos son todos iguales á los ángulos de la figura juntos con los ángulos, que concurren en F vértice comun de los triángulos; esto es juntos con quatro rectos [[prop-15|a 2. Cor. 15. I.]]: luego todos los ángulos de la figura juntos con quatro rectos son iguales á dos veces tantos rectos, quantos son los lados. Cor. 2. Todos los ángulos externos de qualquiera figura rectilinea juntos son iguales á quatro rectos. Porque el ángulo interno ABC junto con el externo adyacente ABD es igual [[prop-13|b 13. I.]] á dos rectos: luego todos los internos juntos con los externos serán iguales á dos veces tantos rectos, quantos son los lados de la figura: esto es (conforme al Corolario anterior) á todos los ángulos internos de la figura juntos á quatro rectos. Por consiguiente los externos son iguales á quatro rectos.",
        "facil": "Primero: los ángulos interiores de un polígono de n lados suman 2n − 4 rectos, es decir, (n − 2) · 180°. Se une un punto de adentro con todos los vértices: quedan n triángulos, que suman n veces dos rectos, y a eso se le descuentan los cuatro rectos (la vuelta entera) que quedan alrededor del punto. Segundo: los ángulos exteriores de un polígono, uno en cada vértice, suman siempre cuatro rectos, 360°, tenga los lados que tenga."
      },
      "pasos": [
        [
          "Sea ABC un triángulo.",
          []
        ],
        [
          "Prolongo BC más allá de C hasta un punto D. Hay que ver que el ángulo exterior ACD es igual a los dos interiores CAB y ABC juntos, y que los tres ángulos del triángulo suman dos rectos.",
          [
            "post-2"
          ]
        ],
        [
          "Por C trazo la paralela a AB, con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "La proposición 31 toma un punto de AB y lo une con C: tomo A, que ya está unido con C. Hay que copiar en C, sobre CA y del lado contrario a B, el ángulo CAB; lo hago con la proposición 23.",
          [
            "prop-23"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro C y radio igual a AB, y con centro A y radio igual a CB, trazo dos circunferencias; esas medidas se llevan con la proposición 2.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de AC contrario a B, en un punto: lo llamo E. Trazo CE.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Los triángulos CAB y ACE tienen AC en común, CE = AB y AE = CB. Por la proposición 8, el ángulo ACE es igual al CAB. Son alternos: por la proposición 27, CE es paralela a AB.",
          [
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Ahora miro CE solo como una paralela a AB. AC corta a las dos: por la proposición 29, los alternos BAC y ACE son iguales.",
          [
            "prop-29"
          ]
        ],
        [
          "BD también corta a las dos paralelas: por la proposición 29, el ángulo exterior ECD es igual al interior ABC, que está del mismo lado (son correspondientes).",
          [
            "prop-29"
          ]
        ],
        [
          "El ángulo ACD está hecho de ACE y ECD, así que es igual a BAC y ABC juntos: el ángulo exterior es igual a los dos interiores opuestos.",
          [
            "nc-2"
          ]
        ],
        [
          "Les sumo a los dos el ángulo ACB: ACD y ACB juntos son iguales a los tres ángulos del triángulo, ABC, BCA y CAB.",
          [
            "nc-2"
          ]
        ],
        [
          "Pero ACD y ACB juntos son dos rectos, por la proposición 13. Como todos los rectos son iguales, los tres ángulos del triángulo suman dos rectos (180°).",
          [
            "prop-13",
            "post-4",
            "nc-1"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-2",
        "prop-31",
        "prop-23",
        "post-3",
        "prop-2",
        "post-1",
        "def-15",
        "prop-8",
        "prop-27",
        "prop-29",
        "nc-2",
        "prop-13",
        "post-4",
        "nc-1"
      ],
      "historia": [
        "Es la proposición más conocida del libro, y la primera consecuencia grande del postulado 5, que le llega a través de la proposición 29. Sin el postulado no vale: en la geometría hiperbólica los ángulos de un triángulo suman menos de dos rectos, y cuanto más grande es el triángulo, menos suman; sobre una esfera, suman más.",
        "La proposición 16 decía que el ángulo exterior es mayor que cada interior opuesto; esta dice exactamente cuánto: es igual a los dos juntos.",
        "Proclo cuenta, citando a Eudemo, que el teorema ya lo conocían los pitagóricos, y que ellos lo demostraban trazando por el vértice A la paralela al lado BC: los tres ángulos quedan uno al lado del otro sobre esa recta. Euclides traza la paralela por C, el vértice donde está el ángulo exterior, y así prueba las dos cosas de una vez.",
        "Euclides no dice cómo se traza la paralela: cita la proposición 31. Acá su construcción se hace en subpasos, y queda un detalle lindo: el punto que la 31 toma en AB es el mismo A, y el triángulo que se copia es el propio CAB. Al final, ABCE es un paralelogramo.",
        "Los dos corolarios no están en el texto griego que se conserva: son agregados de editores posteriores, y la edición de 1774 los trae de Simson. Zamorano no los tiene. El primero necesita un punto de adentro desde el que se vean todos los vértices, y el segundo, que el polígono sea convexo: con un ángulo entrante, el «exterior» de ese vértice no existe.",
        "Zamorano escribe «es vgual» en el enunciado, con v por y, y en la demostración no cita nada para los alternos BAC y ACE. Para el ángulo exterior ECD cita «las 27. 28. 29. proposiciones», pero la que sirve es la 29: las otras dos son las recíprocas. La edición de 1774 cita la 29 las dos veces.",
        "Esta proposición resuelve el desafío de la proposición 2: con ella y con la 13 se demuestra que AL forma siempre 120° con AB."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 60 340 165",
        "puntos": {
          "A": [
            110.0,
            90.0
          ],
          "B": [
            40.0,
            200.0
          ],
          "C": [
            200.0,
            200.0
          ],
          "D": [
            330.0,
            200.0
          ],
          "E": [
            270.0,
            90.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -6,
            16
          ],
          "C": [
            0,
            18
          ],
          "D": [
            6,
            16
          ],
          "E": [
            6,
            -14
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "C",
              "D"
            ]
          ],
          "iguales": [
            [
              [
                "C",
                "E"
              ],
              [
                "A",
                "B"
              ]
            ],
            [
              [
                "A",
                "E"
              ],
              [
                "C",
                "B"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "A"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B"
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "B",
              "por": "C",
              "largo": 302.0
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "D",
              "color": 4,
              "r": 44,
              "cuna": false
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "B",
              "hasta": 3
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1,
              "r": 26
            }
          ],
          [
            {
              "t": "circulo",
              "c": "C",
              "por": "E",
              "pasa": [
                "E"
              ],
              "aux": 6
            },
            {
              "t": "circulo",
              "c": "A",
              "por": "E",
              "pasa": [
                "E"
              ],
              "aux": 6
            }
          ],
          [
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "E"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "C",
                "A",
                "B"
              ],
              "aux": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "C",
                "E"
              ],
              "tono": 2,
              "aux": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "E",
              "aux": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "E"
                ],
                [
                  "A",
                  "B"
                ]
              ],
              "hasta": 7
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "E"
                ],
                [
                  "C",
                  "B"
                ]
              ],
              "rayas": 2,
              "hasta": 7
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "E",
              "color": 1,
              "r": 26
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "C",
              "hasta": 8
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 2,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "E",
              "b": "D",
              "color": 2,
              "r": 26
            },
            {
              "t": "destaca",
              "a": "B",
              "b": "D",
              "hasta": 9
            }
          ],
          [
            {
              "t": "destaca",
              "a": "C",
              "b": "A",
              "hasta": 10
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "D",
              "hasta": 10
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "A",
              "color": 3,
              "r": 26
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "D"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-33",
      "tipo": "proposicion",
      "n": 33,
      "clase": "teorema",
      "titulo": "Unir dos segmentos iguales y paralelos",
      "zam": {
        "num": "Theorema 23, Proposicion 33",
        "escaneo": 52,
        "enun": "Las lineas rectas que juntan a yguales lineas rectas y parallelas hacia vnas mismas partes, ellas mismas tambien son yguales y parallelas.",
        "dem": "Sean las lineas rectas yguales y parallelas AB, CD. y junten las hacia vnas mismas partes las lineas rectas AC, BD. digo que AC y BD son yguales y parallelas. Tire se [[post-1|(por la primera peticion)]] la linea BC. Y assi porque AB a la CD es parallela y sobre ellas cae BC los angulos alternos ABC, BCD son entre si yguales [[prop-29|(por la 29 proposicion)]] y porque AB es ygual a la CD y comun BC luego las dos AB, BC son yguales a las dos BC, CD. Y el angulo ABC es ygual al angulo BCD. luego la basis DB [[prop-4|(por la 4 proposicion)]] es ygual a la basis AC y el triangulo ABC es ygual al triangulo BCD y los de mas angulos son yguales a los de mas angulos el vno al otro debajo de los quales se tienden yguales lados. Luego el angulo ACB es ygual al angulo CBD y el angulo BAC al angulo BCD. Y porque sobre las dos lineas rectas AC, BD cae la linea recta BC haziendo yguales los angulos alternos ACB, CBD entre si, luego AC parallela es a la BD [[prop-27|(por la 27 proposicion)]] y esta demostrado que tambien le es ygual. Luego las lineas rectas que juntan a yguales lineas rectas y parallelas hacia vnas mismas partes, ellas mesmas tambien son yguales y parallelas, lo qual conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XXXIII. Teorema",
        "pag": 31,
        "escaneo": 55,
        "enun": "Las rectas, que juntan ácia una misma parte los extremos de dos rectas iguales, y paralelas, son tambien iguales, y paralelas entre sí.",
        "dem": "Sean iguales, y paralelas las lineas AB, CD, y júntense sus extremos ácia una misma parte por las rectas AC, BD. Digo, que las lineas AC, DB serán iguales, y paralelas. Tírese la linea BC; y por quanto AB es paralela á CD, y cae sobre ellas BC, los ángulos alternos ABC, BCD serán iguales [[prop-29|a 29. I.]]: y siendo AB igual á CD, y BC comun, las dos AB, BC serán iguales á las dos DC, CB, y el ángulo ABC igual al BCD: luego la base AC será igual á la BD, el triángulo ABC al BCD, y los demas ángulos opuestos á lados iguales son iguales [[prop-4|b 4. I.]]; pero la recta BC cayendo sobre las rectas AC, BD forma los ángulos alternos ACB, CBD entre sí iguales: luego será AC paralela á BD [[prop-27|c 27. I.]]: y por otra parte queda ya demostrada su igualdad. Por consiguiente las rectas &c. L. Q. D. D."
      },
      "facil": "Si dos segmentos son iguales y paralelos, y se unen sus extremos del mismo lado, los dos segmentos que se forman también son iguales y paralelos.",
      "pasos": [
        [
          "AB y CD son iguales y paralelas, y AC y BD unen sus extremos del mismo lado. Hay que ver que AC y BD también son iguales y paralelas.",
          []
        ],
        [
          "Trazo BC.",
          [
            "post-1"
          ]
        ],
        [
          "AB y CD son paralelas y BC las corta: por la proposición 29, los alternos ABC y BCD son iguales.",
          [
            "prop-29"
          ]
        ],
        [
          "Los triángulos ABC y DCB tienen AB = DC, el lado BC en común y el ángulo ABC igual al BCD. Por la proposición 4, AC = BD, y los ángulos ACB y CBD también son iguales.",
          [
            "prop-4"
          ]
        ],
        [
          "BC corta a AC y a BD, y forma los alternos ACB y CBD iguales: por la proposición 27, AC y BD son paralelas. Y ya se vio que son iguales.",
          [
            "prop-27"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-1",
        "prop-29",
        "prop-4",
        "prop-27"
      ],
      "historia": [
        "La figura ABDC es un paralelogramo, pero Euclides todavía no usa la palabra: aparece recién en la proposición siguiente. Esta dice cómo se fabrica uno: se toman dos segmentos iguales y paralelos y se unen sus extremos.",
        "Importa que se unan «hacia una misma parte», A con C y B con D. Si se unen cruzados, A con D y B con C, salen las diagonales: se cortan entre sí, así que no son paralelas, y en general tampoco son iguales.",
        "Usa la proposición 29, y por lo tanto el postulado 5.",
        "Zamorano se equivoca en una letra: dice que el ángulo BAC es igual al BCD, cuando el que corresponde es el BDC. En su figura las letras están cambiadas de lugar: B arriba a la izquierda y A a la derecha, D abajo a la izquierda y C a la derecha. Y escribe «basis» por base, como en latín.",
        "Las dos ediciones terminan igual: el paralelismo se demuestra al final, y la igualdad de AC y BD «ya está demostrada» desde la proposición 4."
      ],
      "enClase": [],
      "construccion": {
        "vb": "30 50 320 175",
        "puntos": {
          "A": [
            60.0,
            80.0
          ],
          "B": [
            260.0,
            80.0
          ],
          "C": [
            120.0,
            200.0
          ],
          "D": [
            320.0,
            200.0
          ]
        },
        "rotulos": {
          "A": [
            -6,
            -14
          ],
          "B": [
            6,
            -14
          ],
          "C": [
            -6,
            16
          ],
          "D": [
            6,
            16
          ]
        },
        "comprueba": {
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "C",
                "D"
              ]
            ],
            [
              [
                "A",
                "C"
              ],
              [
                "B",
                "D"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "C",
                  "D"
                ]
              ]
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "D",
              "sinRegla": true
            }
          ],
          [
            {
              "t": "segmento",
              "a": "B",
              "b": "C"
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "D",
              "color": 1,
              "r": 26
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "aux": 4
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "C",
                "B"
              ],
              "tono": 2,
              "aux": 4
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "B",
                  "D"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 2,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "D",
              "color": 2,
              "r": 26
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "C"
            },
            {
              "t": "destaca",
              "a": "B",
              "b": "D"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-34",
      "tipo": "proposicion",
      "n": 34,
      "clase": "teorema",
      "titulo": "Lados y ángulos opuestos del paralelogramo",
      "zam": {
        "num": "Theorema 24, Propositio 34",
        "escaneo": 53,
        "enun": "Los lados oppuestos y los angulos de los espacios de lados parallelos, son yguales entre si: y la diagonal los corta en dos partes yguales.",
        "dem": "Sea el espacio de lineas parallelas ACDB y su diagonal sea BC. digo que los lados y los angulos contrarios del espacio ACDB de lados parallelos son entre si yguales, y la diagonal BC le diuide en dos yguales partes. Porque por ser AB parallela a la CD y sobre ellas cae la linea recta BC [[prop-29|(por la 29 proposicion)]] los angulos alternos ABC, BCD son entre si yguales, Demas desto porque AC es parallela a la BD, y sobre ellas cae la linea recta BC los angulos alternos ACB, CBD son entre si yguales, Luego son los dos triangulos ABC, BCD que tienen los dos angulos ABC, ACB, yguales a los dos angulos BCD, CBD el vno al otro, y el vn lado entre los dos angulos yguales ygual al vn lado y comun BC a entrambos, luego [[prop-26|(por la 26 proposicion)]] los lados restantes seran yguales a los lados restantes el vno al otro, y el angulo que resta ygual al angnlo que resta. Luego el lado AB es ygual al lado CD y el lado AC al lado BD y el angulo BAC es ygual al angulo BDC. Y porque el angulo ABC es ygual al angulo BCD, y el angulo CBD al angulo ACB. Luego todo el angulo ABD es ygual a todo el angulo ACD [[nc-2|(por la 2 comun sentencia)]] y esta demostrado que el angulo BAC es ygual al angulo CDB luego los lados oppuestos y los angulos de los espacios de lados paralelos son yguales entre si. Digo tambien que la diagonal le diuide en dos partes yguales. Porque AB es ygual a la CD y la BC es comun, luego las dos AB, BC son yguales a las dos BC, CD la vna a la otra, y el angulo ABC es ygual al angulo BCD. luego [[prop-4|(por la 4 proposicion)]] la basis AC es ygual a la basis BD y el triangulo ABC es ygual al triangulo BCD luego la diagonal BC en dos partes yguales diuide al parallelogramo ABDC que era lo que se hauia de demostrar."
      },
      "e1774": {
        "num": "Proposición XXXIV. Teorema",
        "pag": 32,
        "escaneo": 56,
        "enun": "Los lados, y los ángulos opuestos del paralelogramo son entre sí iguales: y la diagonal divide al paralelogramo en dos partes iguales.",
        "dem": "Sea el paralelogramo ABDC, y tenga por diagonal á la linea BC. Digo, que los lados, y ángulos opuestos del paralelogramo serán entre sí iguales; y que la diagonal BC lo dividirá en dos partes iguales. Porque siendo la linea AB paralela á CD, y cayendo sobre ellas la recta BC, los ángulos alternos ABC, BCD serán entre sí iguales [[prop-29|a 29. I.]]. Ademas de esto, como la linea AC es paralela á BD, y sobre ellas cae BC, tambien serán entre sí iguales [[prop-29|b 29. I.]] los ángulos alternos ACB, CBD: luego ABC, CBD son dos triángulos, que tienen los dos ángulos ABC, BCA respectivamente iguales á los dos BCD, CBD, y un lado comun BC adyacente á estos ángulos iguales: luego tendrán los demas lados respectivamente iguales entre sí, y el ángulo restante igual al restante [[prop-26|c 26. I.]]: luego el lado AB será igual al CD: el AC al BD; y el ángulo BAC igual al BDC: y por quanto el ángulo ABC es igual al BCD, y este al ACB, será el ángulo ABD total igual al ACD total: es así que ya está demostrada la igualdad del ángulo BAC al BDC: luego los lados, y ángulos opuestos del paralelogramo son entre sí iguales. A mas de esto la diagonal dividirá en dos partes iguales al paralelogramo: porque siendo la linea AB igual á la CD, y la BC comun, las dos AB, BC son respectivamente iguales á las dos DC, CB, y el ángulo ABC igual al BCD: luego el triángulo ABC será igual [[prop-4|d 4. I.]] al BCD. Por consiguiente la diagonal BC divide en dos partes iguales al paralelogramo ACDB. L. Q. D. D."
      },
      "facil": "En un paralelogramo, los lados opuestos son iguales y los ángulos opuestos son iguales. Y cada diagonal lo parte en dos triángulos iguales.",
      "pasos": [
        [
          "Sea ABDC un paralelogramo: AB es paralela a CD, y AC es paralela a BD. BC es una diagonal. Hay que ver que los lados y los ángulos opuestos son iguales, y que BC lo parte en dos partes iguales.",
          []
        ],
        [
          "AB y CD son paralelas y BC las corta: por la proposición 29, los alternos ABC y BCD son iguales.",
          [
            "prop-29"
          ]
        ],
        [
          "AC y BD también son paralelas y BC las corta: por la proposición 29, los alternos ACB y CBD son iguales.",
          [
            "prop-29"
          ]
        ],
        [
          "Los triángulos ABC y DCB tienen dos ángulos iguales, cada uno a cada uno, y en común el lado BC, que está entre ellos. Por la proposición 26, AB = CD, AC = BD y el ángulo BAC es igual al BDC.",
          [
            "prop-26"
          ]
        ],
        [
          "El ángulo ABD está hecho de ABC y CBD, y el ACD, de BCD y ACB, que son iguales a aquellos. Juntando iguales, ABD y ACD son iguales.",
          [
            "nc-2"
          ]
        ],
        [
          "Y como AB = CD, BC es común y el ángulo ABC es igual al BCD, por la proposición 4 el triángulo ABC es igual al DCB: la diagonal BC parte al paralelogramo en dos partes iguales.",
          [
            "prop-4"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-29",
        "prop-26",
        "nc-2",
        "prop-4"
      ],
      "historia": [
        "Es la primera vez que aparece la palabra «paralelogramo». Euclides no la define antes: dice algo como «espacio de líneas paralelas», que es lo que traduce Zamorano, y de ahí sale el nombre. Proclo comenta que la palabra la inventó el mismo Euclides; eso no es seguro.",
        "Dice que la diagonal parte al paralelogramo «en dos partes iguales», y lo que prueba es que los dos triángulos son iguales. Desde acá, «igual» empieza a querer decir también «de la misma área»: las proposiciones que siguen comparan figuras que tienen distinta forma y la misma área.",
        "Usa la proposición 29, y por lo tanto el postulado 5.",
        "La edición de 1774 tiene dos descuidos: dice «ABC, CBD son dos triángulos», donde son ABC y BCD, y «el ángulo ABC es igual al BCD, y este al ACB», cuando lo que quiere decir es que CBD es igual a ACB. Tampoco cita la noción común 2 para juntar los ángulos; Zamorano sí.",
        "Zamorano escribe «angnlo» una vez, por angulo, y llama a la figura ACDB al principio y ABDC al final. La edición de 1774 hace lo mismo al revés: ABDC al principio y ACDB al final."
      ],
      "enClase": [],
      "construccion": {
        "vb": "30 40 360 190",
        "puntos": {
          "A": [
            60.0,
            70.0
          ],
          "B": [
            300.0,
            70.0
          ],
          "C": [
            120.0,
            200.0
          ],
          "D": [
            360.0,
            200.0
          ]
        },
        "rotulos": {
          "A": [
            -6,
            -14
          ],
          "B": [
            6,
            -14
          ],
          "C": [
            -6,
            16
          ],
          "D": [
            6,
            16
          ]
        },
        "comprueba": {
          "iguales": [
            [
              [
                "A",
                "B"
              ],
              [
                "C",
                "D"
              ]
            ],
            [
              [
                "A",
                "C"
              ],
              [
                "B",
                "D"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "C",
              "color": 1,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "B",
              "b": "D",
              "color": 1,
              "r": 26
            }
          ],
          [
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 2,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "C",
              "b": "D",
              "color": 2,
              "r": 26
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "aux": 4
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "C",
                "B"
              ],
              "tono": 2,
              "aux": 4
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "C",
                  "D"
                ]
              ]
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "C"
                ],
                [
                  "B",
                  "D"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 3,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "C",
              "b": "B",
              "color": 3,
              "r": 26
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "D",
              "color": 4,
              "r": 44,
              "cuna": false
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "D",
              "color": 4,
              "r": 44,
              "cuna": false
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "C",
                "B"
              ],
              "tono": 2
            },
            {
              "t": "destaca",
              "a": "B",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-35",
      "tipo": "proposicion",
      "n": 35,
      "clase": "teorema",
      "titulo": "Paralelogramos con la misma base",
      "zam": {
        "num": "Theorema 25, Proposition 35",
        "escaneo": 54,
        "enun": "Los parallelogramos que estan en vna misma basis y en vnas mismas lineas parallelas son yguales entre si.",
        "dem": "Sean los parallelogramos ABCD, EBCZ que estan en vna misma basis, esto es, BC y en vnas mismas parallelas, es a saber AZ, BC. Digo que el paralelogramo ABCD es ygual al parallelogramo EBCZ. Por que es parallelogramo, ABCD es ygual AD a la BC [[prop-34|(por la 34 proposicion)]] y por la misma razon tambien EZ es ygual a la BC y assi tambien AD es ygual a la EZ y es comun la DE luego toda la AE es ygual a toda la DZ. Y la AB es ygual a la DC. Luego las dos EA, AB son yguales a las dos ZD, DC la vna a la otra, y el angulo ZDC es ygual al angulo EAB el exterior al interior. luego [[prop-4|(por la 4 proposicion)]] la basis EB es ygual a la basis ZC y el triangulo EAB es ygual al triangulo ZDC. quitese el comun triangulo DIE. Luego el trapezio EICZ es ygual al trapezio ABID. Pongase pues comun el triangulo IBC. Luego todo el parallelogramo ABCD es ygual a todo el parallelogramo EBCZ. Luego los parallelogramos que estan en vna misma basis, y lo de mas que se sigue, lo qual conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XXXV. Teorema",
        "pag": 33,
        "escaneo": 57,
        "enun": "Los paralelogramos, que tienen una misma base, y están en unas mismas paralelas, son iguales entre sí.",
        "dem": "Sean los paralelogramos ABCD, EBCF, que tengan la misma base BC, y estén en las mismas paralelas AF, BC. Digo, que el paralelogramo ABCD será igual al EBCF. Porque si los lados AD, DF opuestos á la base BC de los paralelogramos ABCD, DBCF se terminan en D, es manifiesto, que ambos paralelogramos son duplos del triángulo BDC [[prop-34|a 34. I.]], y por consiguiente entre sí iguales. Pero supongamos, que los lados AD, EF opuestos á la base de los paralelogramos ABCD, EBCF no se terminan en un mismo punto: en tal caso, siendo ABCD un paralelogramo, la linea AD será igual á BC [[prop-34|b 34. I.]], y por la misma razon la linea EF será igual á BC: luego AD será tambien igual á EF [[nc-1|c Axi. 1.]]; y quitando, ó añadiendo la DE, resultará AE igual á DF [[nc-2|d Axi. 2.]] [[nc-3|y 3.]]: asimismo la linea AB es igual á DC: siendo las dos EA, AB respectivamente iguales á las dos FD, DC, y el ángulo FDC igual al EAB, el externo al interno [[prop-29|e 29. I.]]: será la base EB igual á la FC, y el triángulo EAB igual [[prop-4|f 4. I.]] al FDC: quítese el triángulo FDC del trapecio ABCF, y del mismo quítese el triángulo EAB, y resultará el paralelogramo ABCD igual al paralelogramo EBCF [[nc-3|g Axi. 3.]]. Por consiguiente los paralelogramos, &c. L. Q. D. D."
      },
      "facil": "Dos paralelogramos que tienen la misma base y están entre las mismas dos paralelas tienen la misma área, aunque tengan distinta forma.",
      "pasos": [
        [
          "ABCD y EBCF son paralelogramos con la misma base BC, y sus lados de arriba están sobre la misma recta AF, paralela a BC. Hay que ver que son iguales: que tienen la misma área.",
          []
        ],
        [
          "Los lados opuestos de un paralelogramo son iguales (proposición 34): AD = BC y EF = BC. Entonces AD = EF.",
          [
            "prop-34",
            "nc-1"
          ]
        ],
        [
          "Les sumo DE a los dos: AE = DF.",
          [
            "nc-2"
          ]
        ],
        [
          "Además AB = DC, por la proposición 34, y el ángulo exterior FDC es igual al interior EAB, porque AB y DC son paralelas (proposición 29). Por la proposición 4, los triángulos EAB y FDC son iguales.",
          [
            "prop-34",
            "prop-29",
            "prop-4"
          ]
        ],
        [
          "Miro el trapecio ABCF. Si le saco el triángulo FDC, queda el paralelogramo ABCD; si le saco el triángulo EAB, queda el paralelogramo EBCF.",
          []
        ],
        [
          "A la misma figura le saqué dos triángulos iguales: por la noción común 3, lo que queda es igual. ABCD y EBCF son iguales.",
          [
            "nc-3"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-34",
        "nc-1",
        "nc-2",
        "prop-29",
        "prop-4",
        "nc-3"
      ],
      "historia": [
        "Acá «iguales» ya no quiere decir que una figura se puede poner encima de la otra y coincidir: los dos paralelogramos tienen distinta forma. Quiere decir que tienen la misma área. Euclides no mide áreas con números; las compara sacando y agregando pedazos iguales.",
        "Hoy lo decimos con la fórmula: el área de un paralelogramo es base por altura. Los dos tienen la misma base, BC, y la misma altura, la distancia entre las dos paralelas. Es como inclinar una pila de cartas: cambia la forma, no el área.",
        "Hay tres casos, según dónde cae E: justo en D, más allá de D o entre A y D, y entonces los lados AB, DC, EB y FC se cruzan de otra manera. La demostración griega hace uno solo, el de E más allá de D; Proclo comenta los otros. Simson la rehízo para que sirviera para todos («quitando, ó añadiendo la DE»), y la edición de 1774 trae su versión, con una figura para cada caso. La animación muestra el caso del medio.",
        "Zamorano sigue la demostración griega: llama I al punto donde se cortan DC y EB, le saca a los dos triángulos iguales el triángulo DIE, y a los dos trapecios que quedan les agrega el triángulo IBC. Escribe «trapezio», y en «es ygual AD a la BC» le falta la a de «a la».",
        "Usa la proposición 29, y por lo tanto el postulado 5. En la geometría hiperbólica, dos paralelogramos así no tienen por qué tener la misma área."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 50 400 175",
        "puntos": {
          "A": [
            80.0,
            80.0
          ],
          "B": [
            40.0,
            200.0
          ],
          "C": [
            160.0,
            200.0
          ],
          "D": [
            200.0,
            80.0
          ],
          "E": [
            270.0,
            80.0
          ],
          "F": [
            390.0,
            80.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "B": [
            -6,
            16
          ],
          "C": [
            6,
            16
          ],
          "D": [
            0,
            -14
          ],
          "E": [
            0,
            -14
          ],
          "F": [
            6,
            -14
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "D",
              "E"
            ],
            [
              "D",
              "E",
              "F"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "D"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "E",
                "F"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "A",
                "E"
              ],
              [
                "D",
                "F"
              ]
            ],
            [
              [
                "A",
                "B"
              ],
              [
                "D",
                "C"
              ]
            ],
            [
              [
                "E",
                "B"
              ],
              [
                "F",
                "C"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "F",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C",
                "D"
              ],
              "hasta": 1
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C",
                "F"
              ],
              "tono": 2,
              "hasta": 1
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "D"
                ],
                [
                  "E",
                  "F"
                ],
                [
                  "B",
                  "C"
                ]
              ],
              "hasta": 2
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "E"
                ],
                [
                  "D",
                  "F"
                ]
              ]
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "B"
                ],
                [
                  "D",
                  "C"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "E",
              "b": "B",
              "color": 1,
              "r": 26
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "F",
              "b": "C",
              "color": 1,
              "r": 26
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "A",
                "B"
              ],
              "aux": 4
            },
            {
              "t": "relleno",
              "pts": [
                "F",
                "D",
                "C"
              ],
              "tono": 2,
              "aux": 4
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C",
                "F"
              ],
              "aux": 5
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "F",
              "hasta": 5
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C",
                "D"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C",
                "F"
              ],
              "tono": 2
            }
          ]
        ]
      }
    },
    {
      "id": "prop-36",
      "tipo": "proposicion",
      "n": 36,
      "clase": "teorema",
      "titulo": "Paralelogramos con bases iguales",
      "zam": {
        "num": "Theorema 26, Proposicion 36",
        "escaneo": 55,
        "enun": "Los parallelogramos que estan en yguales basis y en vnas mismas parallelas son yguales entre si.",
        "dem": "Sean los parallelogramos ABCD, EZIT puestos en las yguales bases BC, ZI y en vnas mismas parallelas AT, BI. digo que el parallelogramo ABCD es ygual al parallelogramo EZIT. Tirense BE, TC. Y porque es ygual BC a la ZI y la ZI es ygual a la ET. Luego tambien BC es ygual a la ET y son parallelas, y juntan las la BE, CT. y las lineas que juntan a lineas yguales y parallelas son ellas tambien yguales y parallelas [[prop-33|(por la proposicion 33)]] Luego EB, TC son yguales y parallelas. Es pues el parallelogramo EBCT ygual al parallelogramo ABCD. porque tiene la misma basis, esto es BC y en vnas mismas paralellas a saber BC, ET y tambien por esto EZIT es ygual a EBCT, por lo qual el paralelogramo ABCD es ygual al parallelogramo EZIT. luego los parallelogramos que estan en yguales bases, y lo de mas que se sigue como en el theorema que era lo que se hauia de demostrar."
      },
      "e1774": {
        "num": "Proposición XXXVI. Teorema",
        "pag": 34,
        "escaneo": 58,
        "enun": "Los paralelogramos, que tienen bases iguales, y están en unas mismas paralelas, son iguales entre sí.",
        "dem": "Sean los paralelogramos ABCD, EFGH, que tengan las bases BC, FG iguales, y estén en las mismas paralelas AH, BG. Digo, que el paralelogramo ABCD será igual al EFGH. Tírense las lineas BE, CH: por quanto BC es igual á FG, y FG á EH [[prop-34|a 34. I.]], será tambien BC igual á EH; y son paralelas, y las juntan BE, CH: es así que las lineas, que juntan los extremos de lineas iguales, y paralelas, ácia una misma parte, son iguales, y paralelas [[prop-33|b 33. I.]]: luego tambien las lineas EB, CH son iguales, y paralelas: así EBCH es un paralelogramo igual al ABCD [[prop-35|c 35. I.]]; por tener la misma base BC, y estár en las mismas paralelas BC, AH: por la misma razon el paralelogramo EBCH es igual al EFGH: luego ABCD es igual á EFGH. Por consiguiente los paralelogramos, &c. L. Q. D. D."
      },
      "facil": "Dos paralelogramos que tienen bases iguales y están entre las mismas dos paralelas tienen la misma área, aunque las bases estén en distintos lugares.",
      "pasos": [
        [
          "ABCD y EFGH son paralelogramos con bases iguales, BC = FG, y están entre las mismas paralelas AH y BG. Hay que ver que son iguales: que tienen la misma área.",
          []
        ],
        [
          "Trazo BE y CH.",
          [
            "post-1"
          ]
        ],
        [
          "FG = EH, porque son lados opuestos del paralelogramo EFGH (proposición 34). Como BC = FG, también BC = EH.",
          [
            "prop-34",
            "nc-1"
          ]
        ],
        [
          "BC y EH son iguales y paralelas, y BE y CH unen sus extremos del mismo lado: por la proposición 33, BE y CH también son iguales y paralelas. Así, EBCH es un paralelogramo.",
          [
            "prop-33"
          ]
        ],
        [
          "EBCH y ABCD tienen la misma base BC y están entre las mismas paralelas: por la proposición 35, son iguales.",
          [
            "prop-35"
          ]
        ],
        [
          "EBCH y EFGH tienen la misma base EH, la de arriba, y están entre las mismas paralelas: por la proposición 35, también son iguales.",
          [
            "prop-35"
          ]
        ],
        [
          "ABCD y EFGH son iguales a EBCH, así que son iguales entre sí.",
          [
            "nc-1"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-1",
        "prop-34",
        "nc-1",
        "prop-33",
        "prop-35"
      ],
      "historia": [
        "Generaliza la proposición 35: las bases ya no tienen que ser la misma, alcanza con que sean iguales. Con las dos juntas, el área de un paralelogramo depende solo de lo largo de su base y de la distancia entre las paralelas: base por altura, aunque Euclides no lo diga con números.",
        "La idea es un paralelogramo intermedio, EBCH, que comparte una base con cada uno: BC con ABCD, y EH con EFGH. Dos veces la proposición 35, y listo.",
        "Zamorano cita solo la proposición 33. Que ZI es igual a ET y que los paralelogramos son iguales los da sin citar; la edición de 1774 cita la 34 y la 35.",
        "Las letras de Zamorano, EZIT, parecen las griegas E, Z, H, Θ leídas a su manera: la H griega (eta) como I, y la Θ (theta) como T. La edición de 1774 usa E, F, G, H."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 50 370 175",
        "puntos": {
          "A": [
            80.0,
            80.0
          ],
          "B": [
            40.0,
            200.0
          ],
          "C": [
            140.0,
            200.0
          ],
          "D": [
            180.0,
            80.0
          ],
          "E": [
            250.0,
            80.0
          ],
          "F": [
            270.0,
            200.0
          ],
          "G": [
            370.0,
            200.0
          ],
          "H": [
            350.0,
            80.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "D": [
            0,
            -14
          ],
          "E": [
            0,
            -14
          ],
          "H": [
            6,
            -14
          ],
          "B": [
            -6,
            16
          ],
          "C": [
            0,
            16
          ],
          "F": [
            0,
            16
          ],
          "G": [
            6,
            16
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "D",
              "E"
            ],
            [
              "D",
              "E",
              "H"
            ],
            [
              "B",
              "C",
              "F"
            ],
            [
              "C",
              "F",
              "G"
            ]
          ],
          "iguales": [
            [
              [
                "B",
                "C"
              ],
              [
                "F",
                "G"
              ]
            ],
            [
              [
                "F",
                "G"
              ],
              [
                "E",
                "H"
              ]
            ],
            [
              [
                "E",
                "B"
              ],
              [
                "H",
                "C"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "H"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "H",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "G",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "H",
              "b": "G",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C",
                "D"
              ],
              "hasta": 1
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "F",
                "G",
                "H"
              ],
              "tono": 2,
              "hasta": 1
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "F",
                  "G"
                ]
              ],
              "hasta": 2
            }
          ],
          [
            {
              "t": "segmento",
              "a": "B",
              "b": "E"
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "H"
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "F",
                  "G"
                ],
                [
                  "E",
                  "H"
                ]
              ]
            }
          ],
          [
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "E"
                ],
                [
                  "C",
                  "H"
                ]
              ],
              "rayas": 2
            },
            {
              "t": "destaca",
              "a": "B",
              "b": "E",
              "hasta": 4
            },
            {
              "t": "destaca",
              "a": "C",
              "b": "H",
              "hasta": 4
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C",
                "D"
              ],
              "hasta": 5
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C",
                "H"
              ],
              "tono": 2,
              "hasta": 6
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "E",
                "F",
                "G",
                "H"
              ],
              "hasta": 6
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C",
                "D"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "F",
                "G",
                "H"
              ]
            }
          ]
        ]
      }
    },
    {
      "id": "prop-37",
      "tipo": "proposicion",
      "n": 37,
      "clase": "teorema",
      "titulo": "Triángulos con la misma base",
      "zam": {
        "num": "Theorema 27, Proposicion 37",
        "escaneo": 56,
        "enun": "Los triangulos que estan en vna misma basis y en vnas mismas paralelas: son yguales entre si.",
        "dem": "Esten los triangulos ABC, DBC puestos en vna misma basis BC y en las mismas lineas parallelas AD, BC. digo que el triangulo ABC es ygual al triangulo DBC. estienda se [[post-2|(por la 2 peticion)]] AD de vna y otra parte asta en E, Z. y por el puncto B tirese la linea BE parallella a la CA [[prop-31|(por la proposicion 31.)]] y por el puncto C tirese CZ [[prop-31|(por la misma)]] que sea parallela a la BD. Son pues parallelogramos EBCA, DBCZ. [[prop-35|(y por la 35 proposicion)]] es ygual el parallelogramo EBCA al paralelogramo DBCZ porque estan en vna misma basis BC y en las mismas parallelas BC, EZ. y el triangulo ABC es la mitad del parallelogramo EBCA [[prop-34|(por la 34 proposicion)]] porque la diagonal AB le diuide por medio, y el triangulo DBC es [[prop-34|(por la misma)]] la mitad del parallelogramo DBCZ porque la diagonal DC le diuide por medio y las cosas que son mitad de cosas yguales, entre si son yguales (por la 7 comun sentencia) luego el triangulo ABC es ygual al triangulo DBC. Luego los triangulos que estan en vnas mismas basis, y lo que se sigue como en el theorema que era lo que se hauia de demostrar."
      },
      "e1774": {
        "num": "Proposición XXXVII. Teorema",
        "pag": 34,
        "escaneo": 58,
        "enun": "Los triángulos, que tienen una misma base, y están en unas mismas paralelas, son iguales entre sí.",
        "dem": "Sean los triángulos ABC, DBC, que tengan la misma base BC, y estén en las mismas paralelas AD, BC. Digo, que el triángulo ABC será igual al triángulo DBC. Prolónguese por ambas partes la linea AD hasta los puntos E, F; y por B tírese la linea BE paralela á CA, y por C la CF [[prop-31|a 31. I.]] paralela á BD: y resultarán una y otra figura EBCA, DBCF paralelogramos; y el paralelogramo EBCA igual al DBCF [[prop-35|b 35. I.]], porque tienen una misma base BC, y están en las mismas paralelas BC, EF; pero el triángulo [[prop-34|c 34. I.]] ABC es la mitad del paralelogramo EBCA, por dividirlo la diagonal AB en dos partes iguales; tambien el triángulo DBC [[prop-34|c 34. I.]] es la mitad del paralelogramo DBCF, por dividirlo la diagonal DC en dos partes iguales: es así que las mitades de cantidades iguales son entre sí iguales e Ax. 7.: luego el triángulo ABC es igual al triángulo DBC. Por consiguiente los triángulos, &c. L. Q. D. D."
      },
      "facil": "Dos triángulos que tienen la misma base y cuyos vértices de arriba están sobre una misma recta paralela a la base tienen la misma área.",
      "pasos": [
        [
          "ABC y DBC son triángulos con la misma base BC, y sus vértices A y D están sobre una recta paralela a BC. Hay que ver que son iguales: que tienen la misma área.",
          []
        ],
        [
          "Prolongo AD hacia los dos lados.",
          [
            "post-2"
          ]
        ],
        [
          "Por B trazo la paralela a CA, con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "La proposición 31 toma un punto de CA y lo une con B: tomo A, que ya está unido con B. Hay que copiar en B, sobre BA y del lado contrario a C, el ángulo BAC; lo hago con la proposición 23.",
          [
            "prop-23"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro B y radio igual a AC, y con centro A y radio igual a BC, trazo dos circunferencias; esas medidas se llevan con la proposición 2.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de AB contrario a C, en un punto. Trazo la recta que va de B a ese punto.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "El triángulo que quedó del otro lado de AB tiene sus lados iguales a los de BAC: por la proposición 8, el ángulo que se formó en B es igual al BAC. Son alternos: por la proposición 27, la recta nueva es paralela a CA.",
          [
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Esa paralela llega a la prolongación de AD: el punto donde la toca lo llamo E. EBCA es un paralelogramo.",
          []
        ],
        [
          "Del mismo modo, por C trazo la paralela a BD:",
          [
            "prop-31"
          ]
        ],
        [
          "Tomo D, que ya está unido con C, y copio en C el ángulo CDB, del lado contrario a B: con centro C y radio igual a DB, y con centro D y radio igual a CB, trazo dos circunferencias.",
          [
            "prop-23",
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Se cortan, del lado de CD contrario a B, en un punto. Trazo la recta que va de C a ese punto.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Por la proposición 8, el ángulo que se formó en C es igual al CDB. Son alternos: por la proposición 27, la recta nueva es paralela a BD.",
          [
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Llega a la prolongación de AD: el punto donde la toca lo llamo F. DBCF es un paralelogramo.",
          []
        ],
        [
          "EBCA y DBCF tienen la misma base BC y están entre las mismas paralelas: por la proposición 35, son iguales.",
          [
            "prop-35"
          ]
        ],
        [
          "La diagonal AB parte a EBCA en dos partes iguales, y la diagonal DC parte a DBCF en dos partes iguales (proposición 34). ABC es la mitad de EBCA, y DBC es la mitad de DBCF.",
          [
            "prop-34"
          ]
        ],
        [
          "Las mitades de cosas iguales son iguales: ABC y DBC son iguales.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-2",
        "prop-31",
        "prop-23",
        "post-3",
        "prop-2",
        "post-1",
        "def-15",
        "prop-8",
        "prop-27",
        "prop-35",
        "prop-34"
      ],
      "historia": [
        "Si el vértice de un triángulo se desliza sobre una recta paralela a la base, el triángulo cambia de forma pero no de área. Hoy lo decimos con la fórmula: base por altura dividido 2, y ni la base ni la altura cambian.",
        "El último paso usa que las mitades de cosas iguales son iguales. No es una de las cinco nociones comunes que hoy se aceptan como de Euclides: el texto griego lo usa sin decir de dónde sale. Algunas ediciones antiguas lo agregaron a la lista, y por eso la edición de 1774 cita el «Ax. 7.» y Zamorano la «7 comun sentencia». Esa cita no lleva enlace: aquí no hay una entrada para ella.",
        "La demostración traza dos paralelas con la proposición 31, así que la animación hace dos veces su construcción. En la segunda, los pasos que ya se vieron van juntos.",
        "Euclides llama E al punto donde la paralela por B toca a la recta AD prolongada, y F al de la paralela por C. En la animación esos puntos coinciden con donde se cortan las circunferencias: no es casualidad, pero probarlo llevaría otra demostración, así que el texto los nombra recién cuando la paralela llega a la recta.",
        "En la figura de Zamorano las letras están al revés: C a la izquierda, B a la derecha, y arriba Z, D, A, E. Y escribe «paralelas», «parallelas» y «parallella» en el mismo párrafo."
      ],
      "enClase": [],
      "construccion": {
        "vb": "10 40 410 185",
        "puntos": {
          "A": [
            150.0,
            90.0
          ],
          "B": [
            120.0,
            200.0
          ],
          "C": [
            240.0,
            200.0
          ],
          "D": [
            280.0,
            90.0
          ],
          "E": [
            30.0,
            90.0
          ],
          "F": [
            400.0,
            90.0
          ],
          "P": [
            30.0,
            90.0
          ],
          "Q": [
            400.0,
            90.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "D": [
            0,
            -14
          ],
          "B": [
            -6,
            16
          ],
          "C": [
            6,
            16
          ],
          "E": [
            0,
            -14
          ],
          "F": [
            0,
            -14
          ],
          "P": null,
          "Q": null
        },
        "comprueba": {
          "alineados": [
            [
              "E",
              "A",
              "D"
            ],
            [
              "A",
              "D",
              "F"
            ]
          ],
          "iguales": [
            [
              [
                "B",
                "P"
              ],
              [
                "A",
                "C"
              ]
            ],
            [
              [
                "A",
                "P"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "C",
                "Q"
              ],
              [
                "D",
                "B"
              ]
            ],
            [
              [
                "D",
                "Q"
              ],
              [
                "C",
                "B"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hasta": 1
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C"
              ],
              "tono": 2,
              "hasta": 1
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "D",
              "por": "A",
              "largo": 262.0
            },
            {
              "t": "prolonga",
              "desde": "A",
              "por": "D",
              "largo": 262.0
            }
          ],
          [
            {
              "t": "destaca",
              "a": "C",
              "b": "A",
              "hasta": 3
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1,
              "r": 24,
              "hasta": 7
            }
          ],
          [
            {
              "t": "circulo",
              "c": "B",
              "por": "P",
              "pasa": [
                "P"
              ],
              "aux": 6
            },
            {
              "t": "circulo",
              "c": "A",
              "por": "P",
              "pasa": [
                "P"
              ],
              "aux": 6
            }
          ],
          [
            {
              "t": "punto",
              "p": "P",
              "aux": 7
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "P"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "B",
                "A",
                "C"
              ],
              "aux": 7
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "P"
              ],
              "tono": 2,
              "aux": 7
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "P"
                ],
                [
                  "A",
                  "C"
                ]
              ],
              "hasta": 7
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "P"
                ],
                [
                  "B",
                  "C"
                ]
              ],
              "rayas": 2,
              "hasta": 7
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "P",
              "color": 1,
              "r": 24,
              "hasta": 7
            }
          ],
          [
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C",
                "A"
              ],
              "aux": 8
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "D",
              "hasta": 9
            }
          ],
          [
            {
              "t": "angulo",
              "v": "D",
              "a": "C",
              "b": "B",
              "color": 2,
              "r": 24,
              "hasta": 12
            },
            {
              "t": "circulo",
              "c": "C",
              "por": "Q",
              "pasa": [
                "Q"
              ],
              "aux": 10
            },
            {
              "t": "circulo",
              "c": "D",
              "por": "Q",
              "pasa": [
                "Q"
              ],
              "aux": 10
            }
          ],
          [
            {
              "t": "punto",
              "p": "Q",
              "aux": 12
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "Q"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "C",
                "D",
                "B"
              ],
              "aux": 12
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "C",
                "Q"
              ],
              "tono": 2,
              "aux": 12
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "Q"
                ],
                [
                  "D",
                  "B"
                ]
              ],
              "hasta": 12
            },
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "Q"
                ],
                [
                  "C",
                  "B"
                ]
              ],
              "rayas": 2,
              "hasta": 12
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "D",
              "b": "Q",
              "color": 2,
              "r": 24,
              "hasta": 12
            }
          ],
          [
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C",
                "F"
              ],
              "tono": 2,
              "aux": 13
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C",
                "A"
              ],
              "hasta": 14
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C",
                "F"
              ],
              "tono": 2,
              "hasta": 14
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hasta": 15
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C"
              ],
              "tono": 2,
              "hasta": 15
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "B",
              "hasta": 15
            },
            {
              "t": "destaca",
              "a": "D",
              "b": "C",
              "hasta": 15
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C"
              ]
            }
          ]
        ]
      }
    },
    {
      "id": "prop-38",
      "tipo": "proposicion",
      "n": 38,
      "clase": "teorema",
      "titulo": "Triángulos con bases iguales",
      "zam": {
        "num": "Theorema 28, Proposicion 38",
        "escaneo": 57,
        "enun": "Los triangulos que estan en yguales bases y en vnas mismas parallelas son yguales entre si.",
        "dem": "Esten los triangulos ABC, DEZ en bases yguales, esto es, en BC, EZ y en vnas mismas parallelas, es a saber BZ, AD. Digo que el triangulo ABC es ygual al triangulo EDZ. estienda se [[post-2|(por la 2 peticion)]] AD de vna y otra parte asta en I, T. y por el puncto B tire se BI parallela a la CA [[prop-31|(por la 31 proposicion)]] y por el puncto Z tirese ZT parallela a la DE [[prop-31|(por la misma)]] luego parallelogramo es IBCA y tambien DEZT. y [[prop-36|(por la 36.)]] el parallelogramo IBCA es ygual al parallelogramo DEZT, porque estan en yguales bases, esto es, BC, EZ y en vnas mismas parallelas que son BZ, IT. y el triangulo ABC es [[prop-34|(por la 34 proposicion)]] mitad del parallelogramo IBCA. Porque la diagonal AB le diuide por medio, y el triangulo DEZ es [[prop-34|(por la misma)]] mitad del parallelogramo DEZT. Porque la diagonal DZ le diuide por medio, y las cosas que son mitad de cosas yguales, son yguales entre si (por la 7 comun sentencia) luego el triangulo ABC es ygual al triangulo DEZ. Luego los triangulos que estan en yguales bases y en vnas mismas parallelas son yguales entre si, que conuino demostrarse."
      },
      "e1774": {
        "num": "Proposición XXXVIII. Teorema",
        "pag": 35,
        "escaneo": 59,
        "enun": "Los triángulos, que tienen bases iguales, y están en unas mismas paralelas, son iguales entre sí.",
        "dem": "Sean los triángulos ABC, DEF, que tengan las bases BC, EF iguales, y estén en las mismas paralelas BF, AD. Digo, que el triángulo ABC será igual al DEF. Prolónguese la linea AD por ambas partes hasta los puntos G, H, y por B tírese BG paralela á CA, como asimismo por F FH [[prop-31|a 31. I.]] paralela á ED; resultarán ambas figuras GBCA, y DEFH paralelogramos; el primero igual al segundo [[prop-36|b 36. I.]], por estár sobre iguales bases BC, EF, y en las mismas paralelas BF, GH: es así que el triángulo ABC es la mitad del paralelogramo GBCA, pues la diagonal AB lo divide en dos partes iguales [[prop-34|c 34. I.]], y el triángulo DEF es la mitad del paralelogramo DEFH, como que la diagonal DF lo divide en dos partes iguales: luego el triángulo ABC es igual al DEF. Por consiguiente los triángulos, &c. L. Q. D. D."
      },
      "facil": "Dos triángulos con bases iguales sobre una misma recta, y con los vértices de arriba sobre una recta paralela a ella, tienen la misma área.",
      "pasos": [
        [
          "ABC y DEF son triángulos con bases iguales, BC = EF, sobre la recta BF, y sus vértices A y D están sobre una recta paralela a BF. Hay que ver que son iguales: que tienen la misma área.",
          []
        ],
        [
          "Prolongo AD hacia los dos lados.",
          [
            "post-2"
          ]
        ],
        [
          "Por B trazo la paralela a CA, con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "La proposición 31 toma un punto de CA y lo une con B: tomo A, que ya está unido con B. Hay que copiar en B, sobre BA y del lado contrario a C, el ángulo BAC; lo hago con la proposición 23.",
          [
            "prop-23"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro B y radio igual a AC, y con centro A y radio igual a BC, trazo dos circunferencias; esas medidas se llevan con la proposición 2.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de AB contrario a C, en un punto. Trazo la recta que va de B a ese punto.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "El triángulo que quedó del otro lado de AB tiene sus lados iguales a los de BAC: por la proposición 8, el ángulo que se formó en B es igual al BAC. Son alternos: por la proposición 27, la recta nueva es paralela a CA.",
          [
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Esa paralela llega a la prolongación de AD: el punto donde la toca lo llamo G. GBCA es un paralelogramo.",
          []
        ],
        [
          "Del mismo modo, por F trazo la paralela a ED:",
          [
            "prop-31"
          ]
        ],
        [
          "Tomo D, que ya está unido con F, y copio en F el ángulo FDE, del lado contrario a E: con centro F y radio igual a DE, y con centro D y radio igual a FE, trazo dos circunferencias.",
          [
            "prop-23",
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Se cortan, del lado de DF contrario a E, en un punto. Trazo la recta que va de F a ese punto.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Por la proposición 8, el ángulo que se formó en F es igual al FDE. Son alternos: por la proposición 27, la recta nueva es paralela a ED.",
          [
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Llega a la prolongación de AD: el punto donde la toca lo llamo H. DEFH es un paralelogramo.",
          []
        ],
        [
          "GBCA y DEFH tienen bases iguales, BC y EF, y están entre las mismas paralelas: por la proposición 36, son iguales.",
          [
            "prop-36"
          ]
        ],
        [
          "La diagonal AB parte a GBCA en dos partes iguales, y la diagonal DF parte a DEFH en dos partes iguales (proposición 34). ABC es la mitad de GBCA, y DEF es la mitad de DEFH.",
          [
            "prop-34"
          ]
        ],
        [
          "Las mitades de cosas iguales son iguales: ABC y DEF son iguales.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-2",
        "prop-31",
        "prop-23",
        "post-3",
        "prop-2",
        "post-1",
        "def-15",
        "prop-8",
        "prop-27",
        "prop-36",
        "prop-34"
      ],
      "historia": [
        "Es a la proposición 37 lo que la 36 es a la 35: las bases ya no tienen que ser la misma, alcanza con que sean iguales. Con eso, el área de un triángulo depende solo de su base y de su altura: base por altura dividido 2.",
        "La demostración es la de la 37 cambiando una palabra: en lugar de la proposición 35 usa la 36. La edición de 1774 ni siquiera vuelve a citar las mitades de cosas iguales; Zamorano sí, otra vez como «7 comun sentencia», y otra vez sin enlace (ver la proposición 37).",
        "De acá sale algo que se usa mucho: la mediana de un triángulo lo parte en dos triángulos de la misma área, porque las dos mitades tienen bases iguales y el mismo vértice.",
        "Zamorano llama al segundo triángulo DEZ y, una línea después, EDZ: son las mismas letras en otro orden. Sus puntos nuevos son I y T, que en 1774 son G y H."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 40 390 185",
        "puntos": {
          "A": [
            150.0,
            90.0
          ],
          "B": [
            60.0,
            200.0
          ],
          "C": [
            170.0,
            200.0
          ],
          "D": [
            270.0,
            90.0
          ],
          "E": [
            250.0,
            200.0
          ],
          "F": [
            360.0,
            200.0
          ],
          "G": [
            40.0,
            90.0
          ],
          "H": [
            380.0,
            90.0
          ],
          "P": [
            40.0,
            90.0
          ],
          "Q": [
            380.0,
            90.0
          ]
        },
        "rotulos": {
          "A": [
            0,
            -14
          ],
          "D": [
            0,
            -14
          ],
          "B": [
            -6,
            16
          ],
          "C": [
            0,
            16
          ],
          "E": [
            0,
            16
          ],
          "F": [
            6,
            16
          ],
          "G": [
            0,
            -14
          ],
          "H": [
            0,
            -14
          ],
          "P": null,
          "Q": null
        },
        "comprueba": {
          "alineados": [
            [
              "G",
              "A",
              "D"
            ],
            [
              "A",
              "D",
              "H"
            ],
            [
              "B",
              "C",
              "E"
            ],
            [
              "C",
              "E",
              "F"
            ]
          ],
          "iguales": [
            [
              [
                "B",
                "C"
              ],
              [
                "E",
                "F"
              ]
            ],
            [
              [
                "B",
                "P"
              ],
              [
                "A",
                "C"
              ]
            ],
            [
              [
                "A",
                "P"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "F",
                "Q"
              ],
              [
                "D",
                "E"
              ]
            ],
            [
              [
                "D",
                "Q"
              ],
              [
                "F",
                "E"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hasta": 1
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F"
              ],
              "tono": 2,
              "hasta": 1
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "E",
                  "F"
                ]
              ]
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "D",
              "por": "A",
              "largo": 242.0
            },
            {
              "t": "prolonga",
              "desde": "A",
              "por": "D",
              "largo": 242.0
            }
          ],
          [
            {
              "t": "destaca",
              "a": "C",
              "b": "A",
              "hasta": 3
            }
          ],
          [
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "C",
              "color": 1,
              "r": 24,
              "hasta": 7
            }
          ],
          [
            {
              "t": "circulo",
              "c": "B",
              "por": "P",
              "pasa": [
                "P"
              ],
              "aux": 6
            },
            {
              "t": "circulo",
              "c": "A",
              "por": "P",
              "pasa": [
                "P"
              ],
              "aux": 6
            }
          ],
          [
            {
              "t": "punto",
              "p": "P",
              "aux": 7
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "P"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "B",
                "A",
                "C"
              ],
              "aux": 7
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "P"
              ],
              "tono": 2,
              "aux": 7
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "P"
                ],
                [
                  "A",
                  "C"
                ]
              ],
              "rayas": 2,
              "hasta": 7
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "P"
                ],
                [
                  "B",
                  "C"
                ]
              ],
              "hasta": 7
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "P",
              "color": 1,
              "r": 24,
              "hasta": 7
            }
          ],
          [
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "relleno",
              "pts": [
                "G",
                "B",
                "C",
                "A"
              ],
              "aux": 8
            }
          ],
          [
            {
              "t": "destaca",
              "a": "E",
              "b": "D",
              "hasta": 9
            }
          ],
          [
            {
              "t": "angulo",
              "v": "D",
              "a": "F",
              "b": "E",
              "color": 2,
              "r": 24,
              "hasta": 12
            },
            {
              "t": "circulo",
              "c": "F",
              "por": "Q",
              "pasa": [
                "Q"
              ],
              "aux": 10
            },
            {
              "t": "circulo",
              "c": "D",
              "por": "Q",
              "pasa": [
                "Q"
              ],
              "aux": 10
            }
          ],
          [
            {
              "t": "punto",
              "p": "Q",
              "aux": 12
            },
            {
              "t": "segmento",
              "a": "F",
              "b": "Q"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "F",
                "D",
                "E"
              ],
              "aux": 12
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "F",
                "Q"
              ],
              "tono": 2,
              "aux": 12
            },
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "Q"
                ],
                [
                  "D",
                  "E"
                ]
              ],
              "rayas": 2,
              "hasta": 12
            },
            {
              "t": "igual",
              "seg": [
                [
                  "D",
                  "Q"
                ],
                [
                  "F",
                  "E"
                ]
              ],
              "hasta": 12
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "D",
              "b": "Q",
              "color": 2,
              "r": 24,
              "hasta": 12
            }
          ],
          [
            {
              "t": "punto",
              "p": "H"
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F",
                "H"
              ],
              "tono": 2,
              "aux": 13
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "G",
                "B",
                "C",
                "A"
              ],
              "hasta": 14
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F",
                "H"
              ],
              "tono": 2,
              "hasta": 14
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hasta": 15
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F"
              ],
              "tono": 2,
              "hasta": 15
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "B",
              "hasta": 15
            },
            {
              "t": "destaca",
              "a": "D",
              "b": "F",
              "hasta": 15
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F"
              ]
            }
          ]
        ]
      }
    },
    {
      "id": "prop-39",
      "tipo": "proposicion",
      "n": 39,
      "clase": "teorema",
      "titulo": "Triángulos iguales sobre la misma base",
      "zam": {
        "num": "Theorema 29, Proposicion 39",
        "escaneo": 57,
        "enun": "Los triangulos yguales que estan en vna misma basis: y hacia vnas mismas partes estan en vnas mismas parallelas.",
        "dem": "Esten los dos triangulos yguales ABC, DCB en la misma basis BC y hacia vna mismas partes. Digo que estan en vnas mismas parallelas, Tirese la linea AD. digo que, AD es parallela a la BC, porque sino, tire se por el punto, A, la linea AE paralela a la BC [[prop-31|(por la proposicion 31)]] y tirese EC. luego el triangulo EBC [[prop-37|(por la 37 proposicion)]] es ygual al triangulo ABC porque estan en vna misma basis BC y en vnas mismas parallelas AE, BC y el triangulo DBC es (por la supposicion) ygual al triangulo ABC luego el triangulo DBC es ygual el triangulo EBC conuiene saber el mayor al menor, que es impossible, luego AE en ninguna manera es paralella con la BC. De la misma manera demostraremos que ninguna otra fuera de AD luego AD parallela es a la BC luego los triangulos yguales, y lo que se sigue que se hauia de demostrar."
      },
      "e1774": {
        "num": "Proposición XXXIX. Teorema",
        "pag": 35,
        "escaneo": 59,
        "enun": "Los triángulos iguales, que tienen una misma base, y sus vértices ácia una misma parte, están en unas mismas paralelas.",
        "dem": "Sean los triángulos iguales ABC, DBC, que tengan la misma base BC, y los vértices A, D ácia la misma parte. Digo, que estarán en unas mismas paralelas. Júntense los vértices por la recta AD, y será esta paralela á BC: si no lo fuese, sea la recta AE tirada por el punto A [[prop-31|a 31. I.]] paralela á BC, y tírese la linea EC: resultará el triángulo ABC igual al EBC [[prop-37|b 37. I.]], por estár sobre la misma base BC, y en las mismas paralelas BC, AE: es así que el triángulo ABC es igual al DBC: luego tambien el DBC será igual al EBC, el mayor al menor, lo qual es imposible: consiguientemente AE no es paralela á BC: semejantemente demostrarémos, que ninguna otra linea es paralela, sino AD: luego esta es paralela á BC. Por consiguiente los triángulos, &c. L. Q. D. D."
      },
      "facil": "Si dos triángulos tienen la misma base y la misma área, y están del mismo lado de la base, sus vértices están sobre una recta paralela a la base: tienen la misma altura.",
      "pasos": [
        [
          "ABC y DBC son triángulos iguales, de la misma área, con la misma base BC, y sus vértices A y D están del mismo lado de BC. Hay que ver que están entre las mismas paralelas: que AD es paralela a BC.",
          []
        ],
        [
          "Trazo AD.",
          [
            "post-1"
          ]
        ],
        [
          "Supongo que AD no es paralela a BC. Entonces D queda más arriba o más abajo que la paralela a BC que pasa por A. Digamos más arriba, y lo dibujo así.",
          []
        ],
        [
          "Por A trazo la paralela a BC, con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "La proposición 31 toma un punto de BC y lo une con A: tomo C, que ya está unido con A. Hay que copiar en A, sobre AC y del lado contrario a B, el ángulo ACB; lo hago con la proposición 23.",
          [
            "prop-23"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro A y radio igual a BC, y con centro C y radio igual a AB, trazo dos circunferencias; esas medidas se llevan con la proposición 2.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de AC contrario a B, en un punto. Trazo la recta que va de A a ese punto.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "El triángulo que quedó del otro lado de AC tiene sus lados iguales a los de ACB: por la proposición 8, el ángulo que se formó en A es igual al ACB. Son alternos: por la proposición 27, la recta nueva es paralela a BC.",
          [
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Esa paralela corta a BD en un punto: lo llamo E. Trazo EC.",
          [
            "post-1"
          ]
        ],
        [
          "EBC y ABC tienen la misma base BC y están entre las mismas paralelas AE y BC: por la proposición 37, son iguales.",
          [
            "prop-37"
          ]
        ],
        [
          "Pero DBC es igual a ABC: así se supuso al principio. Entonces DBC es igual a EBC. Y EBC es solo una parte de DBC, porque E está sobre BD: una parte sería igual al todo, y eso es imposible.",
          [
            "nc-1",
            "nc-5"
          ]
        ],
        [
          "Si D quedara más abajo que la paralela, se razona igual: la paralela cortaría a BD prolongada, y la parte sería DBC. Entonces D no está ni más arriba ni más abajo: está sobre la paralela que pasa por A, y esa paralela es AD.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-1",
        "prop-31",
        "prop-23",
        "post-3",
        "prop-2",
        "def-15",
        "prop-8",
        "prop-27",
        "prop-37",
        "nc-1",
        "nc-5"
      ],
      "historia": [
        "Es la recíproca de la proposición 37. Aquella dice que si los vértices están sobre una paralela a la base, los triángulos son iguales; esta, que si los triángulos son iguales, los vértices están sobre una paralela a la base. Con alturas: dos triángulos con la misma base y la misma área tienen la misma altura.",
        "Se demuestra por el absurdo, como la 27. Las dos ediciones dibujan AD derecha y la supuesta paralela AE inclinada hacia abajo. Acá hacemos al revés: AE derecha, como tiene que ser una paralela, y D más arriba, que es lo que se supone. El dibujo es imposible a propósito: DBC se ve más grande que ABC, y eso es justamente lo que la demostración prueba.",
        "Las dos ediciones hacen solo el caso en que la paralela corta a BD entre B y D, y despachan lo demás con «semejantemente demostrarémos» y «De la misma manera demostraremos». El otro caso, con D más abajo, es el mismo con los papeles cambiados.",
        "Ninguna de las dos cita por qué es imposible que el mayor sea igual al menor: es la noción común 5, el todo es mayor que su parte.",
        "Zamorano escribe «ygual el triangulo EBC» donde va «al», «hacia vna mismas partes» y, en la misma página, «parallela» y «paralella». Su «ninguna otra fuera de AD» deja la frase sin terminar: falta «es parallela»."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 30 290 215",
        "puntos": {
          "A": [
            90.0,
            90.0
          ],
          "B": [
            40.0,
            220.0
          ],
          "C": [
            240.0,
            220.0
          ],
          "D": [
            200.0,
            90.0
          ],
          "D2": [
            200.0,
            55.0
          ],
          "E": [
            166.060606,
            90.0
          ],
          "P": [
            290.0,
            90.0
          ]
        },
        "rotulos": {
          "A": [
            -4,
            -14
          ],
          "B": [
            -6,
            16
          ],
          "C": [
            6,
            16
          ],
          "D": [
            4,
            -14
          ],
          "D2": [
            4,
            -14,
            "D"
          ],
          "E": [
            -9,
            -9
          ],
          "P": null
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "E",
              "D2"
            ],
            [
              "A",
              "E",
              "P"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "P"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "C",
                "P"
              ],
              [
                "A",
                "B"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "D",
              "hasta": 2
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "B",
              "sinRegla": true,
              "hasta": 2
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "C",
              "sinRegla": true,
              "hasta": 2
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hasta": 1
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C"
              ],
              "tono": 2,
              "hasta": 1
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "D",
              "hasta": 2
            }
          ],
          [
            {
              "t": "punto",
              "p": "D2",
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "D2",
              "b": "B",
              "sinRegla": true,
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "D2",
              "b": "C",
              "sinRegla": true,
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D2",
              "sinRegla": true,
              "hasta": 11
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "C",
              "hasta": 4
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "C",
              "hasta": 5
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 1,
              "r": 24,
              "hasta": 8
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "P",
              "pasa": [
                "P"
              ],
              "aux": 7
            },
            {
              "t": "circulo",
              "c": "C",
              "por": "P",
              "pasa": [
                "P"
              ],
              "aux": 7
            }
          ],
          [
            {
              "t": "punto",
              "p": "P",
              "aux": 8
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "P",
              "hasta": 11
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "C",
                "B"
              ],
              "aux": 8
            },
            {
              "t": "relleno",
              "pts": [
                "C",
                "A",
                "P"
              ],
              "tono": 2,
              "aux": 8
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "P"
                ],
                [
                  "B",
                  "C"
                ]
              ],
              "hasta": 8
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "P"
                ],
                [
                  "A",
                  "B"
                ]
              ],
              "rayas": 2,
              "hasta": 8
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "C",
              "b": "P",
              "color": 1,
              "r": 24,
              "hasta": 8
            }
          ],
          [
            {
              "t": "punto",
              "p": "E",
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "C",
              "hasta": 11
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "aux": 10
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C"
              ],
              "tono": 2,
              "aux": 10
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "D2",
                "B",
                "C"
              ],
              "tono": 2,
              "hasta": 11
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C"
              ],
              "hasta": 11
            },
            {
              "t": "destaca",
              "a": "B",
              "b": "D2",
              "hasta": 11
            }
          ],
          [
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "D"
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "B",
                "C"
              ]
            }
          ]
        ]
      }
    },
    {
      "id": "prop-40",
      "tipo": "proposicion",
      "n": 40,
      "clase": "teorema",
      "titulo": "Triángulos iguales sobre bases iguales",
      "zam": {
        "num": "Theorema 30, Proposition 40",
        "escaneo": 58,
        "enun": "Los triangulos yguales que estan sobre basis yguales: y fabricados hazia vnas mismas partes, estan en vnas mismas parallelas.",
        "dem": "Sean yguales los triangulos ABC, CDE esten en bases yguales que es en BC, CE y hacia las partes AD. Digo que estan en vnas mismas parallelas tirese AD, [[post-1|por la 1 peticion]], Digo que AD es parallela a la BE. Porque si no tirese por el puncto A la linea AZ parallela a la BE, [[prop-31|por la 31 proposicion]], y tire se ZE luego el triangulo ABC, es ygual al triangulo ZCE [[prop-38|(por la 38)]] porque estan en vnas mismas basis yguales BC, CE y en vnas mismas parallelas BE, AZ. Y el triangulo ABC es ygual al triangulo DCE luego el triangulo DCE es ygual al triangulo ZCE, el mayor al menor que es impossible. Luego AZ en ninguna manera es parallela a la BE y de la misma manera demostraremos que otra ninguna fuera de AD luego AD parallela es a la BE que conuenia demostrarse."
      },
      "e1774": {
        "num": "Proposición XL. Teorema",
        "pag": 36,
        "escaneo": 60,
        "enun": "Los triángulos iguales, que tienen las bases iguales, y directamente, ó en linea recta, y sus vértices ácia una misma parte, están en unas mismas paralelas.",
        "dem": "Tengan los triángulos iguales ABC, DEF las bases iguales BC, EF, y los vértices ácia una misma parte. Digo, que estarán en unas mismas paralelas; esto es, tirada la linea AD, será paralela á BF; y si no, sea AG [[prop-31|a 31. I.]] la paralela á BF tirada por el punto A: júntense los puntos G, F; y resultará el triángulo ABC igual [[prop-38|b 38. I.]] al GEF, porque tienen las bases iguales BC, EF, y están en unas mismas paralelas BF, AG: es así que el triángulo ABC es igual al DEF: luego tambien el DEF será igual al GEF, el mayor al menor, lo qual es absurdo: luego AG no es paralela á BF: semejantemente se demostrará, que ninguna otra linea, fuera de AD es paralela: luego esta es paralela á BF. Por consiguiente los triángulos, &c. L. Q. D. D."
      },
      "facil": "Si dos triángulos tienen la misma área y bases iguales sobre una misma recta, y están del mismo lado, sus vértices están sobre una recta paralela a la de las bases: tienen la misma altura.",
      "pasos": [
        [
          "ABC y DEF son triángulos iguales, de la misma área, con bases iguales, BC = EF, sobre la misma recta BF, y sus vértices A y D están del mismo lado. Hay que ver que están entre las mismas paralelas: que AD es paralela a BF.",
          []
        ],
        [
          "Trazo AD.",
          [
            "post-1"
          ]
        ],
        [
          "Supongo que AD no es paralela a BF. Entonces D queda más arriba o más abajo que la paralela a BF que pasa por A. Digamos más arriba, y lo dibujo así.",
          []
        ],
        [
          "Por A trazo la paralela a BF, con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "La proposición 31 toma un punto de BF y lo une con A: tomo C, que ya está unido con A. Hay que copiar en A, sobre AC y del lado contrario a B, el ángulo ACB; lo hago con la proposición 23.",
          [
            "prop-23"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro A y radio igual a BC, y con centro C y radio igual a AB, trazo dos circunferencias; esas medidas se llevan con la proposición 2.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de AC contrario a B, en un punto. Trazo la recta que va de A a ese punto.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "El triángulo que quedó del otro lado de AC tiene sus lados iguales a los de ACB: por la proposición 8, el ángulo que se formó en A es igual al ACB. Son alternos: por la proposición 27, la recta nueva es paralela a BF.",
          [
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Prolongo la paralela hasta que corte a ED: el punto donde la corta lo llamo G. Trazo GF.",
          [
            "post-2",
            "post-1"
          ]
        ],
        [
          "GEF y ABC tienen bases iguales, EF y BC, y están entre las mismas paralelas AG y BF: por la proposición 38, son iguales.",
          [
            "prop-38"
          ]
        ],
        [
          "Pero DEF es igual a ABC: así se supuso al principio. Entonces DEF es igual a GEF. Y GEF es solo una parte de DEF, porque G está sobre ED: una parte sería igual al todo, y eso es imposible.",
          [
            "nc-1",
            "nc-5"
          ]
        ],
        [
          "Si D quedara más abajo que la paralela, se razona igual: la paralela cortaría a ED prolongada, y la parte sería DEF. Entonces D no está ni más arriba ni más abajo: está sobre la paralela que pasa por A, y esa paralela es AD.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-1",
        "prop-31",
        "prop-23",
        "post-3",
        "prop-2",
        "def-15",
        "prop-8",
        "prop-27",
        "post-2",
        "prop-38",
        "nc-1",
        "nc-5"
      ],
      "historia": [
        "Es la recíproca de la proposición 38, como la 39 lo es de la 37. La demostración es la de la 39, cambiando la proposición 37 por la 38: dos triángulos con bases iguales y la misma área tienen la misma altura.",
        "La edición de 1774 agrega en cursiva «y directamente, ó en linea recta»: las bases tienen que estar sobre una misma recta, porque si no, no hay una sola paralela de la que hablar. El enunciado de Zamorano no lo dice, aunque su figura las pone así.",
        "Un papiro hallado en el Fayum, en Egipto, con un pedazo del libro I pasa de la proposición 39 a la 41. Por eso Heiberg, el editor del texto griego, pensó que la 40 la agregó alguien después de Euclides, para completar el juego: la 35 y la 36, la 37 y la 38, y sus recíprocas.",
        "Como en la 39, las dos ediciones hacen solo el caso en que la paralela corta a ED entre E y D, y ninguna cita la noción común 5 para «el mayor al menor».",
        "En Zamorano los triángulos son ABC y CDE, con las bases BC y CE pegadas en C, y el punto nuevo es Z; la edición de 1774 los separa y lo llama G. Debajo de la figura de Zamorano quedaron sueltas las letras «E z». Y otra vez la frase «otra ninguna fuera de AD» queda sin el «es parallela»."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 30 320 215",
        "puntos": {
          "A": [
            100.0,
            90.0
          ],
          "B": [
            40.0,
            220.0
          ],
          "C": [
            150.0,
            220.0
          ],
          "D": [
            280.0,
            90.0
          ],
          "E": [
            200.0,
            220.0
          ],
          "F": [
            310.0,
            220.0
          ],
          "D2": [
            280.0,
            55.0
          ],
          "G": [
            263.030303,
            90.0
          ],
          "P": [
            210.0,
            90.0
          ]
        },
        "rotulos": {
          "A": [
            -4,
            -14
          ],
          "B": [
            -6,
            16
          ],
          "C": [
            0,
            16
          ],
          "E": [
            0,
            16
          ],
          "F": [
            6,
            16
          ],
          "D": [
            4,
            -14
          ],
          "D2": [
            4,
            -14,
            "D"
          ],
          "G": [
            -9,
            -9
          ],
          "P": null
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "C",
              "E"
            ],
            [
              "C",
              "E",
              "F"
            ],
            [
              "E",
              "G",
              "D2"
            ],
            [
              "A",
              "P",
              "G"
            ]
          ],
          "iguales": [
            [
              [
                "B",
                "C"
              ],
              [
                "E",
                "F"
              ]
            ],
            [
              [
                "A",
                "P"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "C",
                "P"
              ],
              [
                "A",
                "B"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "D",
              "hasta": 2
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "sinRegla": true,
              "hasta": 2
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F",
              "sinRegla": true,
              "hasta": 2
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hasta": 1
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F"
              ],
              "tono": 2,
              "hasta": 1
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "C"
                ],
                [
                  "E",
                  "F"
                ]
              ]
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "D",
              "hasta": 2
            }
          ],
          [
            {
              "t": "punto",
              "p": "D2",
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "D2",
              "b": "E",
              "sinRegla": true,
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "D2",
              "b": "F",
              "sinRegla": true,
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D2",
              "sinRegla": true,
              "hasta": 11
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "F",
              "hasta": 4
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "C",
              "hasta": 5
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "B",
              "color": 1,
              "r": 24,
              "hasta": 8
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "P",
              "pasa": [
                "P"
              ],
              "aux": 7
            },
            {
              "t": "circulo",
              "c": "C",
              "por": "P",
              "pasa": [
                "P"
              ],
              "aux": 7
            }
          ],
          [
            {
              "t": "punto",
              "p": "P",
              "aux": 8
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "P",
              "hasta": 11
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "C",
                "B"
              ],
              "aux": 8
            },
            {
              "t": "relleno",
              "pts": [
                "C",
                "A",
                "P"
              ],
              "tono": 2,
              "aux": 8
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "P"
                ],
                [
                  "B",
                  "C"
                ]
              ],
              "hasta": 8
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "P"
                ],
                [
                  "A",
                  "B"
                ]
              ],
              "rayas": 2,
              "hasta": 8
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "C",
              "b": "P",
              "color": 1,
              "r": 24,
              "hasta": 8
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "A",
              "por": "P",
              "largo": 177.03,
              "hasta": 11
            },
            {
              "t": "punto",
              "p": "G",
              "hasta": 11
            },
            {
              "t": "segmento",
              "a": "G",
              "b": "F",
              "hasta": 11
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "aux": 10
            },
            {
              "t": "relleno",
              "pts": [
                "G",
                "E",
                "F"
              ],
              "tono": 2,
              "aux": 10
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "D2",
                "E",
                "F"
              ],
              "tono": 2,
              "hasta": 11
            },
            {
              "t": "relleno",
              "pts": [
                "G",
                "E",
                "F"
              ],
              "hasta": 11
            },
            {
              "t": "destaca",
              "a": "E",
              "b": "D2",
              "hasta": 11
            }
          ],
          [
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "D"
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "D",
                "E",
                "F"
              ]
            }
          ]
        ]
      }
    },
    {
      "id": "prop-41",
      "tipo": "proposicion",
      "n": 41,
      "clase": "teorema",
      "titulo": "El paralelogramo es el doble del triángulo",
      "zam": {
        "num": "Theorema 31, Proposicion 41",
        "escaneo": 59,
        "enun": "Si vn parallelogramo y vn triangulo tuuieren vna misma basis: y estuuieren en vnas mismas parallelas: el parallelogramo sera el doblo del triangulo.",
        "dem": "El parallelogramo ABCD y el triangulo EBC tengan la misma basis BC y esten en las mismas parallelas BC, AE. Digo que el parallelogramo ABCD es el doblo del triangulo EBC. tirese [[post-1|(por la 1 peticion)]] la linea AC. Luego el triangulo ABC [[prop-37|(por la 37)]] es ygual al triangulo EBC. Porque estan en la misma basis BC, y en las mismas parallelas BC, AE y el parallelogramo ABCD es doblado al triangulo ABC [[prop-34|(por la 34 proposicion)]] porque la diagonal AC le diuide en dos yguales partes, por lo qual el parallelogramo ABCD es el doblo del triangulo EBC luego si vn parallelogramo y vn triangulo, y lo que se sigue restante, que se auia de demostrar."
      },
      "e1774": {
        "num": "Proposición XLI. Teorema",
        "pag": 37,
        "escaneo": 61,
        "enun": "Si un paralelogramo, y un triángulo tienen una misma base, y están en unas mismas paralelas; el paralelogramo será duplo del triángulo.",
        "dem": "Tengan el paralelogramo ABCD, y el triángulo EBC, la misma base BC, y estén en unas mismas paralelas BC, AE. Digo, que el paralelogramo ABCD será duplo del triángulo EBC. Porque tirada la diagonal AC, resultará el triángulo ABC igual [[prop-37|a 37. I.]] al EBC, por estár sobre la misma base BC, y en las mismas paralelas BC, AE: es así que el paralelogramo ABCD es duplo del triángulo ABC [[prop-34|b 34. I.]], pues la diagonal AC lo divide por medio: luego tambien será el mismo paralelogramo duplo el triángulo EBC. Por consiguiente si un, &c. L. Q. D. D."
      },
      "facil": "Si un paralelogramo y un triángulo tienen la misma base y están entre las mismas dos paralelas, el paralelogramo tiene el doble de área que el triángulo.",
      "pasos": [
        [
          "ABCD es un paralelogramo y EBC un triángulo, con la misma base BC, y están entre las mismas paralelas BC y AE. Hay que ver que el paralelogramo es el doble del triángulo.",
          []
        ],
        [
          "Trazo la diagonal AC.",
          [
            "post-1"
          ]
        ],
        [
          "ABC y EBC tienen la misma base BC y están entre las mismas paralelas: por la proposición 37, son iguales.",
          [
            "prop-37"
          ]
        ],
        [
          "La diagonal AC parte al paralelogramo en dos partes iguales (proposición 34): ABCD es el doble de ABC.",
          [
            "prop-34"
          ]
        ],
        [
          "Como ABC es igual a EBC, ABCD es también el doble de EBC.",
          []
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "post-1",
        "prop-37",
        "prop-34"
      ],
      "historia": [
        "De acá sale la fórmula del área del triángulo. Si el área del paralelogramo es base por altura, la del triángulo, con la misma base y la misma altura, es la mitad: base por altura dividido 2.",
        "En el último paso se usa que el doble de cosas iguales es igual, igual que en la 37 se usaban las mitades. Ninguna de las dos ediciones lo cita, y queda sin enlace.",
        "Las dos ediciones dicen «duplo» o «doblo» y no «doble». La de 1774 tiene un descuido al final: «duplo el triángulo EBC», por «duplo del».",
        "La figura de Zamorano está al revés que la de 1774: E queda a la izquierda, C abajo a la izquierda y B a la derecha. Y no tiene trazada la diagonal AC, que es justamente la que pide la demostración."
      ],
      "enClase": [],
      "construccion": {
        "vb": "40 60 320 175",
        "puntos": {
          "A": [
            100.0,
            90.0
          ],
          "B": [
            60.0,
            210.0
          ],
          "C": [
            190.0,
            210.0
          ],
          "D": [
            230.0,
            90.0
          ],
          "E": [
            340.0,
            90.0
          ]
        },
        "rotulos": {
          "A": [
            -4,
            -14
          ],
          "D": [
            0,
            -14
          ],
          "E": [
            6,
            -14
          ],
          "B": [
            -6,
            16
          ],
          "C": [
            6,
            16
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "D",
              "E"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "D"
              ],
              [
                "B",
                "C"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C",
                "D"
              ],
              "hasta": 1
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C"
              ],
              "tono": 2,
              "hasta": 1
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "C"
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "aux": 3
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "C"
              ],
              "tono": 2,
              "aux": 3
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hasta": 4
            },
            {
              "t": "relleno",
              "pts": [
                "C",
                "D",
                "A"
              ],
              "tono": 2,
              "hasta": 4
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "C",
              "hasta": 4
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "C",
                "D",
                "A"
              ]
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "C"
            },
            {
              "t": "destaca",
              "a": "E",
              "b": "B"
            },
            {
              "t": "destaca",
              "a": "E",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-42",
      "tipo": "proposicion",
      "n": 42,
      "clase": "problema",
      "titulo": "Un paralelogramo igual a un triángulo",
      "zam": {
        "num": "Problema 11, Proposicion 42",
        "escaneo": 59,
        "enun": "Sobre vn angulo dado rectilineo hazer vn parallelogramo ygual a vn triangulo dado,",
        "dem": "Sea el triangulo ABC y el angulo rectilino dado sea D. conuiene pues hazer en vn angulo rectilineo ygual al angulo D vn pallelogramo ygual al mismo triangulo ABC cortese [[prop-10|(por la 10 proposicion)]] la linea BC en dos yguales partes en el puncto E, y tirese [[post-1|(por la 1 peticion)]] la linea AE y [[prop-23|(por la 23 proposicion)]] hagase sobre la linea recta EC, en el puncto suyo E, el angulo CEZ ygual al angulo D, y [[prop-31|(por la proposicion 31)]] por el puncto A tirese, AI parallela a la EC, y, por la misma, por el puncto C, tirese CI parallela a la linea EZ, Sera pues parallelogramo ZECI, y doblo del triangulo AEC, [[prop-41|por la precedente]], y porque es ygual BE a la EC, el triangulo ABE, [[prop-38|por la 38]], es ygual al triangulo AEC, porque estan en las bases yguales BE, EC, y enlas mismas parallelas BC, AI, luego el triangulo ABC es el doblo del triangulo AEC, Y porque el parallelogramo ECIZ y el triangulo AEC, esta sobre vna misuia basis EC, y entre vnasmismas parallelas EC, AI, es doblado el parallelogramo ECIZ al triangulo AEC, [[prop-41|por la precedente)]] Luego el parallelogramo ZECI es ygual al mismo triangulo ABC y tiene el angulo CEZ ygual al angulo dado D, Luego diose el parallelogramo ZECI ygual al triangulo ABC sobre el angulo rectilineo CEZ que es ygual al angulo D lo qual conuino hazerse."
      },
      "e1774": {
        "num": "Proposición XLII. Problema",
        "pag": 37,
        "escaneo": 61,
        "enun": "Construir un paralelogramo igual á un triángulo dado, y que tenga un ángulo igual á un ángulo rectilineo dado.",
        "dem": "Sea el triángulo dado ABC, y el ángulo rectilineo dado D; y háyase de construir un paralelogramo igual al triángulo dado ABC, que tenga un ángulo igual al D. Divídase por medio [[prop-10|a 10. I.]] la linea BC en el punto E; tírese AE, y en el punto E de la recta EC constrúyase el ángulo CEF igual al D [[prop-23|b 23. I.]]: asimismo por el punto A tírese la linea AG paralela á EC, y por C la CG [[prop-31|c 31. I.]] paralela á EF: resultará FECG el paralelogramo que se pide: porque siendo la linea BE igual á EC, será el triángulo ABE igual [[prop-38|d 38. I.]] al AEC, por estár sobre las bases iguales BE, EC, y en las mismas paralelas BC, AG: luego el triángulo ABC es duplo del AEC: es así que tambien el paralelogramo FECG es duplo del triángulo AEC [[prop-41|e 41. I.]], por tener una misma base, y estár en unas mismas paralelas: resulta, pues, el paralelogramo FECG igual al triángulo ABC, y con el ángulo CEF igual al dado D. L. Q. D. H."
      },
      "facil": "Dado un triángulo y un ángulo, se puede construir un paralelogramo que tenga la misma área que el triángulo y uno de sus ángulos igual al ángulo dado.",
      "pasos": [
        [
          "ABC es el triángulo dado y D es el ángulo dado. Hay que construir un paralelogramo igual al triángulo, de la misma área, que tenga un ángulo igual a D.",
          []
        ],
        [
          "Parto BC por la mitad. Lo hago con la construcción de la proposición 10:",
          [
            "prop-10"
          ]
        ],
        [
          "Con centro B y radio BC, y con centro C y radio CB, trazo dos circunferencias. Se cortan, del lado contrario a A, en un punto: con B y C forma un triángulo equilátero (proposición 1).",
          [
            "post-3",
            "prop-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Parto por la mitad el ángulo de ese triángulo que está frente a BC, como en la proposición 9: con centro en su vértice trazo una circunferencia, que corta a los dos lados en dos puntos, y sobre el segmento que los une hago otro triángulo equilátero, del lado de BC.",
          [
            "prop-9",
            "post-3",
            "prop-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo la recta que va del vértice de abajo al vértice del triángulo chico: parte el ángulo por la mitad y corta a BC en un punto que la parte por la mitad. Lo llamo E.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Trazo AE.",
          [
            "post-1"
          ]
        ],
        [
          "En E, sobre EC y del lado de A, construyo un ángulo igual a D. Lo hago con la construcción de la proposición 23:",
          [
            "prop-23"
          ]
        ],
        [
          "Marco un punto en cada lado de D, los dos a la misma distancia de D, y los uno.",
          [
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro E y radio igual a esa distancia, trazo una circunferencia: corta a EC en un punto. Con centro en ese punto y radio igual al segmento que une los puntos de D, trazo otra. Las medidas se llevan con la proposición 2.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de A, en un punto. Trazo la recta que va de E a ese punto. El triángulo que quedó en E tiene los lados iguales a los del triángulo de D: por la proposición 8, el ángulo en E es igual a D.",
          [
            "post-1",
            "def-15",
            "prop-8"
          ],
          {
            "sub": true
          }
        ],
        [
          "Por A trazo la paralela a EC, con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "La proposición 31 toma un punto de EC y lo une con A: tomo C, que ya está unido con A. Copio en A, sobre AC y del lado contrario a E, el ángulo ACE: con centro A y radio igual a EC, y con centro C y radio igual a AE, trazo dos circunferencias.",
          [
            "prop-23",
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Se cortan, del lado de AC contrario a E, en un punto. Trazo la recta que va de A a ese punto, y la prolongo. Por la proposición 8, el ángulo que se formó en A es igual al ACE. Son alternos: por la proposición 27, la recta es paralela a EC.",
          [
            "post-1",
            "post-2",
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Prolongo la recta que salió de E hasta que corte a esa paralela: el punto donde la corta lo llamo F.",
          [
            "post-2"
          ]
        ],
        [
          "Por C trazo la paralela a EF, con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "Tomo F y lo uno con C. Copio en C, sobre CF y del lado contrario a E, el ángulo EFC: con centro C y radio igual a EF, y con centro F y radio igual a EC, trazo dos circunferencias.",
          [
            "post-1",
            "prop-23",
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Se cortan, del lado de CF contrario a E, en un punto. Trazo la recta que va de C a ese punto. Por la proposición 8 y la 27, como antes, es paralela a EF.",
          [
            "post-1",
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Esa paralela llega a la paralela que pasa por A: el punto donde la toca lo llamo G. FECG es un paralelogramo, y su ángulo CEF es igual a D.",
          []
        ],
        [
          "ABE y AEC tienen bases iguales, BE y EC, y están entre las mismas paralelas: por la proposición 38, son iguales. Entonces ABC es el doble de AEC.",
          [
            "prop-38"
          ]
        ],
        [
          "FECG y AEC tienen la misma base EC y están entre las mismas paralelas: por la proposición 41, FECG es el doble de AEC.",
          [
            "prop-41"
          ]
        ],
        [
          "FECG y ABC son los dos el doble de AEC: son iguales. FECG es el paralelogramo que se pedía.",
          []
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "prop-10",
        "post-3",
        "prop-1",
        "prop-9",
        "post-1",
        "prop-23",
        "prop-2",
        "def-15",
        "prop-8",
        "prop-31",
        "post-2",
        "prop-27",
        "prop-38",
        "prop-41"
      ],
      "historia": [
        "Es el primer paso de un plan que termina en la proposición 45: convertir cualquier figura de lados rectos en un paralelogramo de la misma área, con el ángulo que uno quiera. Si el ángulo dado es recto, el paralelogramo es un rectángulo, y medir el área de un triángulo se vuelve medir la de un rectángulo.",
        "La idea es partir la base por la mitad: el paralelogramo tiene la mitad de la base del triángulo y la misma altura. Mitad de base por altura es justamente el área del triángulo.",
        "Que el doble de cosas iguales es igual, en el último paso, no lo cita ninguna de las dos ediciones; queda sin enlace, como en la proposición 41.",
        "Zamorano escribe «rectilino» por rectilineo, «pallelogramo» por parallelogramo, «misuia» por misma y «vnasmismas» todo junto, y cierra un paréntesis que no abrió: «por la precedente)». Usa la coma como separador de las letras («la linea, B C, en dos yguales partes»), y su figura está al revés que la de 1774, con B a la derecha. Al punto que en 1774 es G lo llama I, y al F, Z.",
        "Como todo problema, termina con «L. Q. D. H.», lo que se debía hacer, y no con «L. Q. D. D.», lo que se debía demostrar."
      ],
      "enClase": [],
      "construccion": {
        "vb": "20 40 380 335",
        "puntos": {
          "A": [
            110.0,
            70.0
          ],
          "B": [
            40.0,
            190.0
          ],
          "C": [
            200.0,
            190.0
          ],
          "E": [
            120.0,
            190.0
          ],
          "F": [
            152.153903,
            70.0
          ],
          "G": [
            232.153903,
            70.0
          ],
          "D": [
            300.0,
            190.0
          ],
          "D1": [
            380.0,
            190.0
          ],
          "D2": [
            323.293714,
            103.066676
          ],
          "X": [
            350.0,
            190.0
          ],
          "Y": [
            312.940952,
            141.703709
          ],
          "X2": [
            170.0,
            190.0
          ],
          "Y2": [
            132.940952,
            141.703709
          ],
          "P1": [
            190.0,
            70.0
          ],
          "Q": [
            232.153903,
            70.0
          ],
          "K": [
            120.0,
            328.564065
          ],
          "L": [
            100.0,
            293.923048
          ],
          "M": [
            140.0,
            293.923048
          ],
          "N": [
            120.0,
            259.282032
          ]
        },
        "rotulos": {
          "A": [
            -4,
            -14
          ],
          "B": [
            -12,
            4
          ],
          "C": [
            12,
            4
          ],
          "E": [
            -10,
            16
          ],
          "F": [
            -6,
            -14
          ],
          "G": [
            6,
            -14
          ],
          "D": [
            -6,
            16
          ],
          "D1": null,
          "D2": null,
          "X": null,
          "Y": null,
          "X2": null,
          "Y2": null,
          "P1": null,
          "Q": null,
          "K": null,
          "L": null,
          "M": null,
          "N": null
        },
        "comprueba": {
          "alineados": [
            [
              "B",
              "E",
              "C"
            ],
            [
              "E",
              "X2",
              "C"
            ],
            [
              "K",
              "N",
              "E"
            ],
            [
              "E",
              "Y2",
              "F"
            ],
            [
              "A",
              "F",
              "P1"
            ],
            [
              "F",
              "P1",
              "G"
            ],
            [
              "D",
              "Y",
              "D2"
            ]
          ],
          "iguales": [
            [
              [
                "B",
                "E"
              ],
              [
                "E",
                "C"
              ]
            ],
            [
              [
                "B",
                "K"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "C",
                "K"
              ],
              [
                "B",
                "C"
              ]
            ],
            [
              [
                "X",
                "Y"
              ],
              [
                "X2",
                "Y2"
              ]
            ],
            [
              [
                "A",
                "P1"
              ],
              [
                "E",
                "C"
              ]
            ],
            [
              [
                "C",
                "P1"
              ],
              [
                "A",
                "E"
              ]
            ],
            [
              [
                "C",
                "Q"
              ],
              [
                "E",
                "F"
              ]
            ],
            [
              [
                "F",
                "Q"
              ],
              [
                "E",
                "C"
              ]
            ],
            [
              [
                "L",
                "M"
              ],
              [
                "K",
                "L"
              ]
            ],
            [
              [
                "L",
                "N"
              ],
              [
                "L",
                "M"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "hasta": 1
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "D1"
            },
            {
              "t": "punto",
              "p": "D2"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "D1",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "D2",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "D1",
              "b": "D2",
              "color": 1,
              "r": 26
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "C",
              "hasta": 2
            }
          ],
          [
            {
              "t": "circulo",
              "c": "B",
              "por": "C",
              "pasa": [
                "C",
                "K"
              ],
              "aux": 3
            },
            {
              "t": "circulo",
              "c": "C",
              "por": "B",
              "pasa": [
                "B",
                "K"
              ],
              "aux": 3
            },
            {
              "t": "punto",
              "p": "K",
              "aux": 5
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "B",
              "aux": 5
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "C",
              "aux": 5
            }
          ],
          [
            {
              "t": "circulo",
              "c": "K",
              "por": "L",
              "pasa": [
                "L",
                "M"
              ],
              "aux": 4
            },
            {
              "t": "punto",
              "p": "L",
              "aux": 5
            },
            {
              "t": "punto",
              "p": "M",
              "aux": 5
            },
            {
              "t": "circulo",
              "c": "L",
              "por": "M",
              "pasa": [
                "M",
                "N"
              ],
              "aux": 4
            },
            {
              "t": "circulo",
              "c": "M",
              "por": "L",
              "pasa": [
                "L",
                "N"
              ],
              "aux": 4
            },
            {
              "t": "punto",
              "p": "N",
              "aux": 5
            },
            {
              "t": "segmento",
              "a": "L",
              "b": "M",
              "aux": 5
            }
          ],
          [
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "E",
              "aux": 5
            },
            {
              "t": "igual",
              "seg": [
                [
                  "B",
                  "E"
                ],
                [
                  "E",
                  "C"
                ]
              ]
            }
          ],
          [
            {
              "t": "segmento",
              "a": "A",
              "b": "E"
            }
          ],
          [
            {
              "t": "destaca",
              "a": "E",
              "b": "C",
              "hasta": 7
            }
          ],
          [
            {
              "t": "punto",
              "p": "X",
              "aux": 10
            },
            {
              "t": "punto",
              "p": "Y",
              "aux": 10
            },
            {
              "t": "segmento",
              "a": "X",
              "b": "Y",
              "aux": 10
            }
          ],
          [
            {
              "t": "circulo",
              "c": "E",
              "por": "X2",
              "pasa": [
                "X2",
                "Y2"
              ],
              "aux": 9
            },
            {
              "t": "punto",
              "p": "X2",
              "aux": 10
            },
            {
              "t": "circulo",
              "c": "X2",
              "por": "Y2",
              "pasa": [
                "Y2"
              ],
              "aux": 9
            }
          ],
          [
            {
              "t": "punto",
              "p": "Y2",
              "aux": 10
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "Y2"
            },
            {
              "t": "segmento",
              "a": "X2",
              "b": "Y2",
              "aux": 10
            },
            {
              "t": "angulo",
              "v": "E",
              "a": "C",
              "b": "Y2",
              "color": 1,
              "r": 22
            }
          ],
          [
            {
              "t": "destaca",
              "a": "E",
              "b": "C",
              "hasta": 11
            }
          ],
          [
            {
              "t": "destaca",
              "a": "A",
              "b": "C",
              "hasta": 12
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "A",
              "b": "E",
              "color": 2,
              "r": 22,
              "hasta": 13
            },
            {
              "t": "circulo",
              "c": "A",
              "por": "P1",
              "pasa": [
                "P1"
              ],
              "aux": 12
            },
            {
              "t": "circulo",
              "c": "C",
              "por": "P1",
              "pasa": [
                "P1"
              ],
              "aux": 12
            }
          ],
          [
            {
              "t": "punto",
              "p": "P1",
              "aux": 13
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "P1"
            },
            {
              "t": "prolonga",
              "desde": "A",
              "por": "P1",
              "largo": 138.154
            },
            {
              "t": "igual",
              "seg": [
                [
                  "A",
                  "P1"
                ],
                [
                  "E",
                  "C"
                ]
              ],
              "hasta": 13
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "P1"
                ],
                [
                  "A",
                  "E"
                ]
              ],
              "rayas": 2,
              "hasta": 13
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "C",
              "b": "P1",
              "color": 2,
              "r": 22,
              "hasta": 13
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "E",
              "por": "Y2",
              "largo": 136.233
            },
            {
              "t": "punto",
              "p": "F"
            }
          ],
          [
            {
              "t": "destaca",
              "a": "E",
              "b": "F",
              "hasta": 15
            }
          ],
          [
            {
              "t": "segmento",
              "a": "F",
              "b": "C",
              "aux": 17
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "E",
              "b": "C",
              "color": 3,
              "r": 22,
              "hasta": 17
            },
            {
              "t": "circulo",
              "c": "C",
              "por": "Q",
              "pasa": [
                "Q"
              ],
              "aux": 16
            },
            {
              "t": "circulo",
              "c": "F",
              "por": "Q",
              "pasa": [
                "Q"
              ],
              "aux": 16
            }
          ],
          [
            {
              "t": "punto",
              "p": "Q",
              "aux": 17
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "Q"
            },
            {
              "t": "igual",
              "seg": [
                [
                  "C",
                  "Q"
                ],
                [
                  "E",
                  "F"
                ]
              ],
              "rayas": 2,
              "hasta": 17
            },
            {
              "t": "igual",
              "seg": [
                [
                  "F",
                  "Q"
                ],
                [
                  "E",
                  "C"
                ]
              ],
              "hasta": 17
            },
            {
              "t": "angulo",
              "v": "C",
              "a": "F",
              "b": "Q",
              "color": 3,
              "r": 22,
              "hasta": 17
            }
          ],
          [
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "relleno",
              "pts": [
                "F",
                "E",
                "C",
                "G"
              ],
              "hasta": 18
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "E"
              ],
              "aux": 19
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "E",
                "C"
              ],
              "tono": 2,
              "aux": 19
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "F",
                "E",
                "C",
                "G"
              ],
              "aux": 20
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "E",
                "C"
              ],
              "tono": 2,
              "aux": 20
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "F",
                "E",
                "C",
                "G"
              ]
            }
          ]
        ]
      }
    },
    {
      "id": "prop-43",
      "tipo": "proposicion",
      "n": 43,
      "clase": "teorema",
      "titulo": "Los complementos son iguales",
      "zam": {
        "num": "Theorema 32, Proposicion 43",
        "escaneo": 60,
        "enun": "Son yguales entre si los suplementos de aquellos parallelogramos que estan en la diagonal de todo parallelogramo.",
        "dem": "Sea el parallelogramo ABCD y su diagonal sea AC y en la diagonal AC esten los paralelogramos ET, IZ y los supplementos sean BK, KD. digo que el supplemento BK es ygual al supplemento KD. Pues porque es el parallelogramo ABCD y su diagonal AC el triangulo ABC [[prop-34|(por la 34 proposicion)]] es ygual al triangulo ADC. Item porque AEKT es parallelogramo y su diagonal es AK. Luego el triangnlo AEK es [[prop-34|por la misma]], ygual al triangulo ATK y por esto tambien el triangulo KZC es ygual al triangulo KIC y porque el triangulo AEK es ygual al triangulo ATK y el triangulo KZC es ygual al triangulo KIC Luego los triangulos AEK, KIC son yguales a los triangulos ATK, KZC. Y todo el triangulo ABC es ygual a todo el triangulo ADC. Luego el supplemento BK que resta [[nc-3|(por la 3 comun sentencia)]] es ygual al supplemento KD que resta. Luego son yguales entre si los supplementos de aquellos parallelogramos que estan en la diagonal de todo parallelogramo. Lo qual conuino demostrar."
      },
      "e1774": {
        "num": "Proposición XLIII. Teorema",
        "pag": 38,
        "escaneo": 62,
        "enun": "Los complementos de los paralelogramos, que están baxo de la diagonal de un paralelogramo, son iguales entre sí.",
        "dem": "Sea el paralelogramo ABCD, y su diagonal AC, baxo de la qual están los paralelogramos EH, FG, y son sus complementos BK, KD. Digo, que el complemento BK será igual al KD. Porque siendo ABCD un paralelogramo, y AC su diagonal, es el triángulo ABC igual al ADC [[prop-34|a 34. I.]]: además, siendo EKHA un paralelogramo, y su diagonal AK, es tambien el triángulo AEK igual [[prop-34|b 34. I.]] al AHK: asimismo el triángulo KGC será igual al KFC: pero siendo el triángulo AEK igual al AHK, y el KGC al KFC, resulta el triángulo AEK junto con el KGC igual al AHK junto con el KFC: es así que el triángulo ABC es igual al ADC: luego el complemento restante BK será igual al complemento restante KD. Por consiguiente los complementos, &c. L. Q. D. D."
      },
      "facil": "Si por un punto de la diagonal de un paralelogramo se trazan paralelas a los lados, el paralelogramo queda partido en cuatro. Los dos que la diagonal no atraviesa, los complementos, tienen la misma área.",
      "pasos": [
        [
          "ABCD es un paralelogramo y AC su diagonal. Por el punto K de la diagonal pasan EF, paralela a BC, y HG, paralela a AB. Quedan cuatro paralelogramos: AEKH y KGCF, que la diagonal atraviesa, y EBGK y HKFD, que son sus complementos. Hay que ver que los complementos son iguales.",
          []
        ],
        [
          "ABCD es un paralelogramo y AC su diagonal: por la proposición 34, la diagonal lo parte en dos triángulos iguales, ABC y ADC.",
          [
            "prop-34"
          ]
        ],
        [
          "AEKH también es un paralelogramo, y AK su diagonal: otra vez por la proposición 34, el triángulo AEK es igual al AHK.",
          [
            "prop-34"
          ]
        ],
        [
          "Lo mismo con el paralelogramo KGCF y su diagonal KC: el triángulo KGC es igual al KFC.",
          [
            "prop-34"
          ]
        ],
        [
          "Si a cosas iguales se suman cosas iguales, los todos son iguales: AEK junto con KGC es igual a AHK junto con KFC.",
          [
            "nc-2"
          ]
        ],
        [
          "Al triángulo ABC le saco AEK y KGC, y queda el complemento EBGK. Al ADC le saco AHK y KFC, y queda HKFD. Si de cosas iguales se sacan cosas iguales, los restos son iguales: EBGK es igual a HKFD.",
          [
            "nc-3"
          ]
        ]
      ],
      "cierre": "Lo que se quería demostrar.",
      "usa": [
        "prop-34",
        "nc-2",
        "nc-3"
      ],
      "historia": [
        "Es la herramienta de la proposición siguiente. Con ella, la 44 cambia un paralelogramo por otro de la misma área sobre una recta dada: la figura se arma de modo que el paralelogramo que se tiene sea un complemento, y el otro complemento es el que se busca.",
        "La demostración es una resta. De dos triángulos iguales, ABC y ADC, se sacan partes iguales, y lo que queda es igual. Por eso no importa dónde esté K sobre la diagonal: los complementos pueden tener formas muy distintas, como en la animación, y siempre tienen la misma área.",
        "La edición de 1774 dice «complementos» y Zamorano, en el enunciado, «suplementos»; dentro de la demostración escribe «supplementos», con doble p. Las dos nombran cada paralelogramo por dos esquinas opuestas: EH y FG en 1774, ET e IZ en Zamorano.",
        "Las citas son desparejas. La edición de 1774 cita la proposición 34 dos veces y no la tercera, en «asimismo el triángulo KGC será igual al KFC», y no cita ninguna noción común. Zamorano cita la 34 una vez y la remite con «por la misma»; para restar cita la «3 comun sentencia», pero para sumar no cita la 2.",
        "La figura de Zamorano está al revés que la de 1774: A arriba a la derecha y D arriba a la izquierda. Donde 1774 pone H, F y G, Zamorano pone T, Z e I. Se le escapó «triangnlo», con la u dada vuelta, y «paralelográmos» con una sola l, en la misma frase que «parallelogramo».",
        "En el ejemplar de Zamorano que escaneamos, un lector anotó a mano en el margen, junto a esta proposición, algo como «si de un paralelogramo se tira de un ángulo a su contrario una línea, esta se llamará diámetro». Es la palabra de Euclides: en griego la diagonal se llama diámetro, la recta que atraviesa la figura. Zamorano y la edición de 1774 ya dicen «diagonal»."
      ],
      "enClase": [],
      "construccion": {
        "vb": "30 45 330 200",
        "puntos": {
          "A": [
            90.0,
            70.0
          ],
          "B": [
            60.0,
            220.0
          ],
          "C": [
            300.0,
            220.0
          ],
          "D": [
            330.0,
            70.0
          ],
          "E": [
            78.0,
            130.0
          ],
          "F": [
            318.0,
            130.0
          ],
          "G": [
            156.0,
            220.0
          ],
          "H": [
            186.0,
            70.0
          ],
          "K": [
            174.0,
            130.0
          ]
        },
        "rotulos": {
          "A": [
            -6,
            -12
          ],
          "H": [
            0,
            -14
          ],
          "D": [
            6,
            -12
          ],
          "E": [
            -14,
            4
          ],
          "F": [
            14,
            4
          ],
          "K": [
            12,
            -8
          ],
          "B": [
            -6,
            16
          ],
          "G": [
            0,
            16
          ],
          "C": [
            6,
            16
          ]
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "K",
              "C"
            ],
            [
              "E",
              "K",
              "F"
            ],
            [
              "H",
              "K",
              "G"
            ],
            [
              "A",
              "E",
              "B"
            ],
            [
              "A",
              "H",
              "D"
            ],
            [
              "B",
              "G",
              "C"
            ],
            [
              "D",
              "F",
              "C"
            ]
          ],
          "iguales": [
            [
              [
                "A",
                "H"
              ],
              [
                "E",
                "K"
              ]
            ],
            [
              [
                "K",
                "F"
              ],
              [
                "G",
                "C"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "D",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "A",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "K"
            },
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "punto",
              "p": "H"
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "segmento",
              "a": "E",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "H",
              "b": "G",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "G",
                "K"
              ],
              "hasta": 1
            },
            {
              "t": "relleno",
              "pts": [
                "H",
                "K",
                "F",
                "D"
              ],
              "tono": 2,
              "hasta": 1
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "C"
              ],
              "aux": 2
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "D",
                "C"
              ],
              "tono": 2,
              "aux": 2
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "C",
              "hasta": 2
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "E",
                "K"
              ],
              "hasta": 5
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "H",
                "K"
              ],
              "tono": 2,
              "hasta": 5
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "K",
              "hasta": 3
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "K",
                "G",
                "C"
              ],
              "hasta": 5
            },
            {
              "t": "relleno",
              "pts": [
                "K",
                "F",
                "C"
              ],
              "tono": 2,
              "hasta": 5
            },
            {
              "t": "destaca",
              "a": "K",
              "b": "C",
              "hasta": 4
            }
          ],
          [],
          [
            {
              "t": "relleno",
              "pts": [
                "E",
                "B",
                "G",
                "K"
              ]
            },
            {
              "t": "relleno",
              "pts": [
                "H",
                "K",
                "F",
                "D"
              ]
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "C"
            }
          ]
        ]
      }
    },
    {
      "id": "prop-44",
      "tipo": "proposicion",
      "n": 44,
      "clase": "problema",
      "titulo": "Un paralelogramo sobre una recta dada",
      "zam": {
        "num": "Problema 12, Proposicion 44",
        "escaneo": 61,
        "enun": "Sobre vna linea recta dada en vn angulo dado rectilineo hazer vn parallelogramo ygual a vn triangulo dado.",
        "dem": "Sea AB la linea recta dada y sea C el triangulo dado, pero el angulo dado rectilineo sea D. conuiene pues sobre la linea recta AB hacer vn parellelogramo ygual al triangulo dado C en vn angulo ygual al angulo D. Hagase [[prop-42|(por la 42)]] el paralelogramo BEZI ygual al triangulo C en el angulo EBI que es ygual al angulo D. y [[post-2|(por la 2 peticion)]] hagase BE en derecho de la AB y estiendese ZI asta en T. y por el puncto A [[prop-31|por la 31 proposicion]], tirese la linea AT parallela a las dos BI, EZ. y tirese [[post-1|(por la primera peticion)]] TB. Y porque sobre las parallelas AT, EZ cae la linea recta TZ, luego los angulos ATZ, TZE, [[prop-29|(por la 29 proposicion)]] son yguales a dos rectos, y los angulos BTI, IZE son menores que dos rectos, y las lineas que haziendo menores que dos rectos, se estienden en infinito concurren [[post-5|(por la 5 peticion)]] Luego las TB, ZE estendidas en infinito concurran, Estiendanse pues y concurran en K. y, [[prop-31|por la proposicion 31]] por el puncto K tirese KL parallela a las dos EA, ZT y estiendanse, [[post-2|por la 2 peticion]] las lineas TA, IB asta en los punctos L, M. luego es parallelogramo TLKZ. y su diagonal es KT. y en la misma diagonal KT estan los parallelogramos AI, ME. y los supplementos son LB, BZ. Luego, [[prop-43|por la 43]] LB es ygual a BZ. y BZ, [[prop-42|por la 42]] es ygual al triangulo C. luego tambien LB es ygual al triangulo C. y porque el angulo IBE [[prop-15|por la 15]] es ygual al angulo ABM, y el angulo IBE es ygual al angulo D. luego el angulo ABM es ygual al mismo D. Luego sobre la linea recta dada AB esta hecho el pallelogramo AM ygual al triangulo dado C en el angulo ABM que es ygual al angulo D. lo qual conuino hazerse."
      },
      "e1774": {
        "num": "Proposición XLIV. Problema",
        "pag": 39,
        "escaneo": 63,
        "enun": "Sobre una recta dada construir un paralelogramo igual á un triángulo dado, y que tenga un ángulo igual á un ángulo rectilineo dado.",
        "dem": "Sea la recta dada AB, el triángulo dado C, y el ángulo rectilineo dado D; y háyase de construir sobre dicha recta con un ángulo igual al D un paralelogramo igual al triángulo C. Prolónguese AB hasta E, y sobre B constrúyase el paralelogramo BEFG igual al triángulo C, que tenga el ángulo EBG igual al D [[prop-42|a 42. I.]]: prolónguese FG hasta el punto H, tirando por A, AH [[prop-31|b 31. I.]] paralela á una de las dos BG, EF; y últimamente tírese la linea HB. Cayendo, pues, la recta HF sobre las paralelas AH, EF, los ángulos AHF, HFE serán iguales á dos rectos [[prop-29|c 29. I.]]: por conseqüencia los BHF, HFE menores que dos rectos: es así que prolongadas indefinidamente las lineas, que con una recta forman los ángulos internos ácia una misma parte menores que dos rectos, se encontrarán [[post-5|d Ax. 12.]]: luego las lineas HB, FE se encontrarán. Prolónguense, hasta que se encuentren en K; por este punto tirada KL paralela á una de las dos EA, FH, y las AH, GB prolongadas hasta los puntos L, M, resultará, que la figura HLKF es un paralelogramo, cuya diagonal es HK, baxo de la qual están los paralelogramos AG, ME; y que LB, BF son sus complementos; siendo por conseqüencia el primero igual [[prop-43|e 43. I.]] al segundo: pero se ha construido BF igual al triángulo C: luego LB será igual á C: y siendo el ángulo GBE igual al ABM [[prop-15|f 15. I.]], y al D, tambien será el ABM igual al D. Por consiguiente sobre la recta dada AB quedará construido, &c. L. Q. D. H."
      },
      "facil": "Dados una recta, un triángulo y un ángulo, construir un paralelogramo que tenga a esa recta como lado, la misma área que el triángulo y un ángulo igual al dado.",
      "pasos": [
        [
          "Están dados la recta AB, el triángulo C y el ángulo D. Hay que construir un paralelogramo que tenga a AB como lado, que sea igual al triángulo C, de la misma área, y que tenga un ángulo igual a D.",
          []
        ],
        [
          "Prolongo AB más allá de B.",
          [
            "post-2"
          ]
        ],
        [
          "Con la proposición 42 construyo un paralelogramo igual al triángulo C, con un ángulo igual a D, y lo pongo en B, con un lado sobre la prolongación de AB. Lo llamo BEFG: el ángulo EBG es igual a D.",
          [
            "prop-42"
          ]
        ],
        [
          "Prolongo FG más allá de G.",
          [
            "post-2"
          ]
        ],
        [
          "Por A trazo la paralela a BG, con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "La proposición 31 une A con un punto de BG: tomo B, que ya está unido con A. Hay que copiar en A, sobre AB y del lado contrario a G, el ángulo ABG, con la construcción de la proposición 23: marco un punto sobre BA y otro sobre BG, los dos a la misma distancia de B, y los uno.",
          [
            "prop-23",
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro A y radio igual a esa distancia, trazo una circunferencia: corta a AB en un punto. Con centro en ese punto y radio igual al segmento que une los dos puntos de B, trazo otra. Las medidas se llevan con la proposición 2.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de AB contrario a G, en un punto. Trazo la recta que va de A a ese punto, y la prolongo del otro lado de A. Por la proposición 8, el ángulo que se formó en A es igual al ABG. Son alternos: por la proposición 27, la recta es paralela a BG.",
          [
            "post-1",
            "post-2",
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "La paralela corta a FG prolongada en un punto: lo llamo H. Trazo HB.",
          [
            "post-1"
          ]
        ],
        [
          "HF corta a las paralelas AH y EF: por la proposición 29, los ángulos AHF y HFE suman dos rectos. BHF es una parte de AHF, así que BHF y HFE suman menos de dos rectos. Por el postulado 5, HB y FE, prolongadas, se encuentran de ese lado.",
          [
            "prop-29",
            "post-5"
          ]
        ],
        [
          "Prolongo HB y FE hasta que se encuentren: el punto donde se encuentran lo llamo K.",
          [
            "post-2"
          ]
        ],
        [
          "Por K trazo la paralela a EA, otra vez con la construcción de la proposición 31:",
          [
            "prop-31"
          ]
        ],
        [
          "Tomo E, que ya está unido con K. Copio en K, sobre KE y del lado contrario a A, el ángulo KEA: marco un punto sobre EK y otro sobre EA, los dos a la misma distancia de E, y los uno.",
          [
            "prop-23",
            "post-1"
          ],
          {
            "sub": true
          }
        ],
        [
          "Con centro K y radio igual a esa distancia, trazo una circunferencia: corta a KE en un punto. Con centro en ese punto y radio igual al segmento que une los dos puntos de E, trazo otra.",
          [
            "post-3",
            "prop-2"
          ],
          {
            "sub": true
          }
        ],
        [
          "Las circunferencias se cortan, del lado de KE contrario a A, en un punto. Trazo la recta que va de K a ese punto, y la prolongo del otro lado de K. Por la proposición 8 y la 27, como antes, es paralela a EA.",
          [
            "post-1",
            "post-2",
            "def-15",
            "prop-8",
            "prop-27"
          ],
          {
            "sub": true
          }
        ],
        [
          "Prolongo HA y GB hasta que corten a esa paralela: los puntos donde la cortan los llamo L y M.",
          [
            "post-2"
          ]
        ],
        [
          "HLKF es un paralelogramo y HK es su diagonal. La diagonal atraviesa los paralelogramos AG y ME, y LB y BF son sus complementos: por la proposición 43, LB es igual a BF.",
          [
            "prop-43"
          ]
        ],
        [
          "BF se construyó igual al triángulo C. Entonces LB, el paralelogramo ABML, también es igual al triángulo C.",
          [
            "nc-1"
          ]
        ],
        [
          "Los ángulos GBE y ABM son opuestos por el vértice: por la proposición 15, son iguales. Y GBE es igual a D: entonces ABM es igual a D. ABML es el paralelogramo que se pedía.",
          [
            "prop-15",
            "nc-1"
          ]
        ]
      ],
      "cierre": "Lo que se quería hacer.",
      "usa": [
        "post-2",
        "prop-42",
        "prop-31",
        "prop-23",
        "post-1",
        "post-3",
        "prop-2",
        "def-15",
        "prop-8",
        "prop-27",
        "prop-29",
        "post-5",
        "prop-43",
        "nc-1",
        "prop-15"
      ],
      "historia": [
        "Es la proposición 42 con una condición más: el paralelogramo tiene que tener un lado dado. Los griegos lo llamaban «aplicar» un área a una recta. Si el ángulo es recto, es como dividir: el rectángulo tiene un lado AB y el área del triángulo, y su otro lado es esa área dividida por AB.",
        "Proclo, que comentó el libro I en el siglo V, cuenta que esto de aplicar áreas es un descubrimiento antiguo de los pitagóricos, y que de aquí, mucho después, Apolonio tomó los nombres de la parábola, la elipse y la hipérbola: parábola, en griego, es «aplicación».",
        "Hay un hueco en el paso de la proposición 42. La 42 construye el paralelogramo al lado del triángulo, y las dos ediciones lo piden ya puesto en B, con BE en línea con AB, sin decir cómo se lleva hasta ahí. Zamorano cita la petición 2 para «hacer BE en derecho de la AB», pero prolongar una recta no mueve un paralelogramo. En la animación aparece ya hecho en B.",
        "La figura de Zamorano da una pista: tiene un triángulo de más, con un vértice en Z y la base sobre la recta IB, de la que I es más o menos el punto medio. Es el triángulo que usaría la 42 para hacer BEZI ahí mismo, si antes se copiara el triángulo C junto a B. El texto no lo nombra.",
        "Es la segunda vez en el libro que se usa el postulado 5 de forma directa: la primera fue la proposición 29. Acá sirve para asegurar que HB y FE se cortan, y sin eso no existiría K. La edición de 1774 lo cita como «Ax. 12», porque sigue la numeración de Simson, donde el postulado 5 es el axioma 12; Zamorano lo cita como «la 5 peticion».",
        "Las dos ediciones dibujan el ángulo D recto, y entonces todos los paralelogramos de la figura parecen rectángulos. En la animación D mide 65°, para que se vea que sirve para cualquier ángulo.",
        "En Zamorano, F, G y H se llaman Z, I y T. Escribe «parellelogramo», «paralelogramo» y, al final, «pallelogramo», con una sílaba de menos, como en la proposición 42."
      ],
      "enClase": [],
      "construccion": {
        "vb": "5 38 345 292",
        "puntos": {
          "A": [
            250.0,
            260.0
          ],
          "B": [
            250.0,
            180.0
          ],
          "C": [
            55.0,
            184.651736
          ],
          "C1": [
            20.0,
            300.0
          ],
          "C2": [
            130.0,
            300.0
          ],
          "D": [
            30.0,
            150.0
          ],
          "D1": [
            120.0,
            150.0
          ],
          "D2": [
            63.809461,
            77.495377
          ],
          "E": [
            250.0,
            110.0
          ],
          "F": [
            159.369221,
            67.738174
          ],
          "G": [
            159.369221,
            137.738174
          ],
          "H": [
            159.369221,
            217.738174
          ],
          "K": [
            329.301931,
            146.979098
          ],
          "L": [
            329.301931,
            296.979098
          ],
          "M": [
            329.301931,
            216.979098
          ],
          "X": [
            222.810766,
            167.321452
          ],
          "Y": [
            250.0,
            210.0
          ],
          "X2": [
            277.189234,
            272.678548
          ],
          "Y2": [
            250.0,
            230.0
          ],
          "U": [
            277.189234,
            122.678548
          ],
          "V": [
            250.0,
            140.0
          ],
          "U2": [
            302.112698,
            134.30055
          ],
          "V2": [
            329.301931,
            116.979098
          ]
        },
        "rotulos": {
          "A": [
            8,
            16
          ],
          "B": [
            13,
            -10
          ],
          "C": [
            13,
            75,
            "C"
          ],
          "C1": null,
          "C2": null,
          "D": [
            -6,
            14
          ],
          "D1": null,
          "D2": null,
          "E": [
            10,
            -12
          ],
          "F": [
            -6,
            -13
          ],
          "G": [
            -13,
            -4
          ],
          "H": [
            -11,
            13
          ],
          "K": [
            10,
            -12
          ],
          "L": [
            11,
            13
          ],
          "M": [
            13,
            5
          ],
          "X": null,
          "Y": null,
          "X2": null,
          "Y2": null,
          "U": null,
          "V": null,
          "U2": null,
          "V2": null
        },
        "comprueba": {
          "alineados": [
            [
              "A",
              "B",
              "E"
            ],
            [
              "F",
              "G",
              "H"
            ],
            [
              "X2",
              "A",
              "H"
            ],
            [
              "H",
              "A",
              "L"
            ],
            [
              "F",
              "E",
              "K"
            ],
            [
              "H",
              "B",
              "K"
            ],
            [
              "G",
              "B",
              "M"
            ],
            [
              "V2",
              "K",
              "M"
            ],
            [
              "K",
              "M",
              "L"
            ],
            [
              "B",
              "Y",
              "A"
            ],
            [
              "A",
              "Y2",
              "B"
            ],
            [
              "B",
              "X",
              "G"
            ],
            [
              "E",
              "U",
              "K"
            ],
            [
              "K",
              "U2",
              "E"
            ],
            [
              "E",
              "V",
              "B"
            ]
          ],
          "iguales": [
            [
              [
                "B",
                "X"
              ],
              [
                "B",
                "Y"
              ]
            ],
            [
              [
                "A",
                "X2"
              ],
              [
                "B",
                "X"
              ]
            ],
            [
              [
                "A",
                "Y2"
              ],
              [
                "B",
                "Y"
              ]
            ],
            [
              [
                "Y2",
                "X2"
              ],
              [
                "Y",
                "X"
              ]
            ],
            [
              [
                "E",
                "U"
              ],
              [
                "E",
                "V"
              ]
            ],
            [
              [
                "K",
                "U2"
              ],
              [
                "E",
                "U"
              ]
            ],
            [
              [
                "K",
                "V2"
              ],
              [
                "E",
                "V"
              ]
            ],
            [
              [
                "U2",
                "V2"
              ],
              [
                "U",
                "V"
              ]
            ],
            [
              [
                "B",
                "E"
              ],
              [
                "G",
                "F"
              ]
            ],
            [
              [
                "B",
                "G"
              ],
              [
                "E",
                "F"
              ]
            ]
          ]
        },
        "pasos": [
          [
            {
              "t": "punto",
              "p": "A"
            },
            {
              "t": "punto",
              "p": "B"
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "B",
              "sinRegla": true
            },
            {
              "t": "punto",
              "p": "C"
            },
            {
              "t": "punto",
              "p": "C1"
            },
            {
              "t": "punto",
              "p": "C2"
            },
            {
              "t": "segmento",
              "a": "C1",
              "b": "C2",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "C2",
              "b": "C",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "C",
              "b": "C1",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "C",
                "C1",
                "C2"
              ]
            },
            {
              "t": "punto",
              "p": "D"
            },
            {
              "t": "punto",
              "p": "D1"
            },
            {
              "t": "punto",
              "p": "D2"
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "D1",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "D",
              "b": "D2",
              "sinRegla": true
            },
            {
              "t": "angulo",
              "v": "D",
              "a": "D1",
              "b": "D2",
              "color": 1,
              "r": 20
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "A",
              "por": "B",
              "largo": 164.0
            },
            {
              "t": "destaca",
              "a": "A",
              "b": "B",
              "hasta": 2
            }
          ],
          [
            {
              "t": "punto",
              "p": "E"
            },
            {
              "t": "punto",
              "p": "G"
            },
            {
              "t": "punto",
              "p": "F"
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "G",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "G",
              "b": "F",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "F",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "segmento",
              "a": "B",
              "b": "E",
              "sinRegla": true
            },
            {
              "t": "relleno",
              "pts": [
                "B",
                "E",
                "F",
                "G"
              ],
              "hasta": 16
            },
            {
              "t": "angulo",
              "v": "B",
              "a": "E",
              "b": "G",
              "color": 1,
              "r": 20
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "F",
              "por": "G",
              "largo": 164.0
            }
          ],
          [
            {
              "t": "destaca",
              "a": "B",
              "b": "G",
              "hasta": 5
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "G",
              "color": 2,
              "r": 20,
              "hasta": 8
            },
            {
              "t": "punto",
              "p": "X",
              "aux": 7
            },
            {
              "t": "punto",
              "p": "Y",
              "aux": 7
            },
            {
              "t": "segmento",
              "a": "X",
              "b": "Y",
              "aux": 7
            }
          ],
          [
            {
              "t": "circulo",
              "c": "A",
              "por": "Y2",
              "pasa": [
                "Y2",
                "X2"
              ],
              "aux": 7
            },
            {
              "t": "punto",
              "p": "Y2",
              "aux": 7
            },
            {
              "t": "circulo",
              "c": "Y2",
              "por": "X2",
              "pasa": [
                "X2"
              ],
              "aux": 7
            }
          ],
          [
            {
              "t": "punto",
              "p": "X2",
              "aux": 7
            },
            {
              "t": "segmento",
              "a": "A",
              "b": "X2"
            },
            {
              "t": "prolonga",
              "desde": "X2",
              "por": "A",
              "largo": 144.0
            },
            {
              "t": "angulo",
              "v": "A",
              "a": "B",
              "b": "X2",
              "color": 2,
              "r": 20,
              "hasta": 8
            },
            {
              "t": "segmento",
              "a": "Y2",
              "b": "X2",
              "aux": 7
            }
          ],
          [
            {
              "t": "punto",
              "p": "H"
            },
            {
              "t": "segmento",
              "a": "H",
              "b": "B"
            }
          ],
          [
            {
              "t": "angulo",
              "v": "H",
              "a": "A",
              "b": "F",
              "color": 3,
              "r": 20,
              "hasta": 10
            },
            {
              "t": "angulo",
              "v": "F",
              "a": "H",
              "b": "E",
              "color": 4,
              "r": 20,
              "hasta": 10
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "H",
              "por": "B",
              "largo": 198.076
            },
            {
              "t": "prolonga",
              "desde": "F",
              "por": "E",
              "largo": 201.5
            },
            {
              "t": "punto",
              "p": "K"
            }
          ],
          [
            {
              "t": "destaca",
              "a": "E",
              "b": "A",
              "hasta": 12
            }
          ],
          [
            {
              "t": "angulo",
              "v": "E",
              "a": "K",
              "b": "B",
              "color": 2,
              "r": 20,
              "hasta": 15
            },
            {
              "t": "punto",
              "p": "U",
              "aux": 13
            },
            {
              "t": "punto",
              "p": "V",
              "aux": 13
            },
            {
              "t": "segmento",
              "a": "U",
              "b": "V",
              "aux": 13
            }
          ],
          [
            {
              "t": "circulo",
              "c": "K",
              "por": "U2",
              "pasa": [
                "U2",
                "V2"
              ],
              "aux": 13
            },
            {
              "t": "punto",
              "p": "U2",
              "aux": 13
            },
            {
              "t": "circulo",
              "c": "U2",
              "por": "V2",
              "pasa": [
                "V2"
              ],
              "aux": 13
            }
          ],
          [
            {
              "t": "punto",
              "p": "V2",
              "aux": 13
            },
            {
              "t": "segmento",
              "a": "K",
              "b": "V2"
            },
            {
              "t": "prolonga",
              "desde": "V2",
              "por": "K",
              "largo": 194.0
            },
            {
              "t": "angulo",
              "v": "K",
              "a": "E",
              "b": "V2",
              "color": 2,
              "r": 20,
              "hasta": 15
            },
            {
              "t": "segmento",
              "a": "U2",
              "b": "V2",
              "aux": 13
            }
          ],
          [
            {
              "t": "prolonga",
              "desde": "H",
              "por": "A",
              "largo": 201.5
            },
            {
              "t": "prolonga",
              "desde": "G",
              "por": "B",
              "largo": 201.5
            },
            {
              "t": "punto",
              "p": "L"
            },
            {
              "t": "punto",
              "p": "M"
            }
          ],
          [
            {
              "t": "destaca",
              "a": "H",
              "b": "K",
              "hasta": 17
            },
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "M",
                "L"
              ],
              "tono": 2,
              "hasta": 17
            },
            {
              "t": "relleno",
              "pts": [
                "B",
                "E",
                "F",
                "G"
              ],
              "hasta": 17
            }
          ],
          [
            {
              "t": "relleno",
              "pts": [
                "A",
                "B",
                "M",
                "L"
              ]
            }
          ],
          [
            {
              "t": "angulo",
              "v": "B",
              "a": "A",
              "b": "M",
              "color": 1,
              "r": 20
            }
          ]
        ]
      }
    }
  ]
};
