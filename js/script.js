document.addEventListener("DOMContentLoaded", () => {
  let cartas = [
    {
      nombre: "llaves",
      imagen: "brackets.png",
    },
    {
      nombre: "llaves",
      imagen: "brackets.png",
    },
    {
      nombre: "comillasSimples",
      imagen: "comillaSimple.png",
    },
    {
      nombre: "comillasSimples",
      imagen: "comillaSimple.png",
    },
    {
      nombre: "comillasDobles",
      imagen: "comillaDoble.png",
    },
    {
      nombre: "comillasDobles",
      imagen: "comillaDoble.png",
    },
    {
      nombre: "corchetes",
      imagen: "corchetes.jpeg",
    },
    {
      nombre: "corchetes",
      imagen: "corchetes.jpeg",
    },
    {
      nombre: "parentesis",
      imagen: "parentesis.png",
    },
    {
      nombre: "parentesis",
      imagen: "parentesis.png",
    },
    {
      nombre: "puntoycoma",
      imagen: "puntoycoma.jpg",
    },
    {
      nombre: "puntoycoma",
      imagen: "puntoycoma.jpg",
    },
  ];

  //Ordena aleatoriamente un array
  cartas.sort(() => 0.5 - Math.random());

  //Inicializar valores
  const tablero = document.getElementById("tablero");
  const resultado = document.getElementById("puntos");
  const boton = document.getElementById("boton");

  let carta1 = "";
  let carta2 = "";
  let indice = -1;
  let puntuacion = 0;
  let score = 0;
  let Seleccionados = [];
  let PuntuacionesGuardadas = [];

  function muestraPuntuacion() {
    if (score < 0) {
      resultado.classList.add("rojo");
    } else {
      resultado.classList.remove("rojo");
    }
    resultado.textContent = score;
  } //Fin muestra puntuacion

  function muestraTablaPuntuacion() {
    const cuerpo = document.getElementById("body-score");
    cuerpo.textContent = "";
    for (index in PuntuacionesGuardadas) {
      const tr = document.createElement("tr");
      const posicion = parseInt(index) + 1;
      const datos = `
      <td>${posicion}</td>
      <td>${PuntuacionesGuardadas[index].nombre}</td>
      <td>${PuntuacionesGuardadas[index].puntos}</td>
      `;
      tr.innerHTML = datos;
      cuerpo.appendChild(tr);
    }
  }

  function InsertaJugador(jugador) {
    if (
      PuntuacionesGuardadas.length > 9 &&
      PuntuacionesGuardadas[9].puntos <= jugador.puntos
    ) {
      PuntuacionesGuardadas.pop();
    }
    PuntuacionesGuardadas.push(jugador);
    PuntuacionesGuardadas.sort(function (a, b) {
      if (a.puntos >= b.puntos) {
        return -1;
      }
      if (a.puntos < b.puntos) {
        return +1;
      }
    });
    console.log(PuntuacionesGuardadas);
    localStorage.setItem("puntuaciones", JSON.stringify(PuntuacionesGuardadas));
  }

  function pedirNombre() {
    jugador = prompt("¿Como te llamas?", "");
    if (jugador != "") {
      jugadorPuntos = {
        nombre: jugador,
        puntos: score,
      };
      InsertaJugador(jugadorPuntos);

      muestraTablaPuntuacion();
    }
  }

  function guardaPuntuacion() {
    if (
      PuntuacionesGuardadas.length < 10 ||
      score > PuntuacionesGuardadas[9].puntos
    ) {
      pedirNombre();
    }
  }

  function ComprobarCarta(id) {
    const Eleccion = document.getElementById(id);
    // console.log(cartas[id]);
    if (carta1 == "") {
      carta1 = cartas[id];
      indice = id;
    } else {
      carta2 = cartas[id];
      if (carta1.nombre == carta2.nombre) {
        score = score + 10;
        puntuacion++;
        muestraPuntuacion();
        if (puntuacion == cartas.length / 2) {
          alert("Enhorabuena!!! Lo conseguiste!!");
          guardaPuntuacion();
        } else {
          alert("Muy bien!!! Sigue asi");
        }
        Eleccion.setAttribute("src", "img/ok.png");
        document.getElementById(indice).setAttribute("src", "img/ok.png");
      } else {
        score--;
        muestraPuntuacion();
        resultado.textContent = score;
        setTimeout(() => {
          Eleccion.setAttribute("src", "img/reverso.jpg");
          document
            .getElementById(indice)
            .setAttribute("src", "img/reverso.jpg");
          Seleccionados = Seleccionados.filter(
            (elemento) => elemento != id && elemento != indice
          );
        }, 200);
      }
      carta1 = "";
      carta2 = "";
    }
  } //Fin comprobar cartas

  function reiniciarJuego() {
    console.log("Reiniciando partida!");
    crearTablero();
  } //Fin Reiniciar juego

  tablero.addEventListener("click", (e) => {
    if (e.target.getAttribute("class") != "tablero") {
      id = e.target.getAttribute("id");
      if (!Seleccionados.includes(id)) {
        Seleccionados.push(id);
        document
          .getElementById(id)
          .setAttribute("src", "img/" + cartas[id].imagen);
        setTimeout(() => {
          ComprobarCarta(id);
        }, 200);
      }
    }
  }); //Fin seleccionar Carta

  boton.addEventListener("click", () => {
    carta1 = "";
    carta2 = "";
    indice = -1;
    puntuacion = 0;
    score = 0;
    Seleccionados = [];
    resultado.classList.remove("rojo");
    reiniciarJuego();
  }); //Fin boton Reiniciar

  function crearTablero() {
    resultado.textContent = score;
    tablero.innerHTML = "";
    for (i = 0; i < cartas.length; i++) {
      const img = document.createElement("img");
      img.setAttribute("id", i);
      img.setAttribute("src", "img/reverso.jpg");
      tablero.appendChild(img);
    }
    if (localStorage.getItem("puntuaciones")) {
      PuntuacionesGuardadas = JSON.parse(localStorage.getItem("puntuaciones"));
      muestraTablaPuntuacion();
    }
  } //Fin crearTablero

  crearTablero();
}); //Fin DOMLoad
