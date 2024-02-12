document.addEventListener("DOMContentLoaded", function () {
  cargarUsuarios();

  document.getElementById("ipartida").addEventListener("click", function (event) {
      event.preventDefault();
      //Aqui se extrae el valor del input ingresado por el usuario
      //Validaciones del Nombre
      var jugador1 = document.getElementById("nombre1").value;
      var jugador2 = document.getElementById("nombre2").value;
      var jugador3 = document.getElementById("nombre3").value;
      var jugador4 = document.getElementById("nombre4").value;

      if (
        jugador1 == "" ||
        jugador2 == "" ||
        jugador3 == "" ||
        jugador4 == ""
      ) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }
      alert("Inicio la partida, buena suerte!");
  });

  // Se agrega usuario en localStorage
  function agregarUsuarios(jugador1, jugador2, jugador3, jugador4) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    // Verificar si el jugador ya existe en la lista
    if (usuarios[jugador1]) {
      usuarios[jugador1]++;
    } else {
      usuarios[jugador1] = 1;
    }

    if (usuarios[jugador2]) {
      usuarios[jugador2]++;
    } else {
      usuarios[jugador2] = 1;
    }

    if (usuarios[jugador3]) {
      usuarios[jugador3]++;
    } else {
      usuarios[jugador3] = 1;
    }

    if (usuarios[jugador4]) {
      usuarios[jugador4]++;
    } else {
      usuarios[jugador4] = 1;
    }

    // Guardar la lista de usuarios actualizada en el localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    cargarUsuarios();
    // Mostrar un mensaje indicando que se han agregado los usuarios
    alert("Usuario agregado correctamente.");
  }

  function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const tablaBody = document.querySelector("#tablaVictorias tbody");
    tablaBody.innerHTML = ""; 

    for (const usuario in usuarios) {
      if (usuarios[usuario] > 0) {
        // Muestra los usuarios a medida que se van obteniendo las victorias
        const fila = document.createElement("tr");
        const celdaUsuario = document.createElement("td");
        celdaUsuario.textContent = usuario;
        fila.appendChild(celdaUsuario);
        const celdaVictorias = document.createElement("td");
        celdaVictorias.textContent = usuarios[usuario];
        fila.appendChild(celdaVictorias);
        tablaBody.appendChild(fila); 
      }
    }
  }

  function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generarCarton(opcion) {
    let N;

    switch (opcion) {
      case "b3":
        N = 3;
        break;
      case "b4":
        N = 4;
        break;
      case "b5":
        N = 5;
        break;
      default:
        console.error("Opción no válida");
        return null;
    }

    const cartones = [];

    for (let k = 0; k < 4; k++) {
      const carton = [];
      const numerosDisponibles = Array.from({ length: 50 }, (_, i) => i + 1);

      for (let i = 0; i < N; i++) {
        const fila = [];
        for (let j = 0; j < N; j++) {
          const index = Math.floor(Math.random() * numerosDisponibles.length);
          fila.push(numerosDisponibles[index]);
          numerosDisponibles.splice(index, 1);
        }
        carton.push(fila);
      }
      cartones.push(carton);
    }

    return cartones;
  }

  function mostrarCarton(carton, numero) {
    const cartonDiv = document.getElementById(`carton${numero}`);
    cartonDiv.innerHTML = "";
    cartonDiv.style.textAlign = "center";

    const tabla = document.createElement("table");
    const titulo = document.createElement("h2");
    titulo.textContent = `Cartón ${numero}`;
    titulo.style.margin= "auto"
    cartonDiv.appendChild(titulo);

    for (let i = 0; i < carton.length; i++) {
      const fila = document.createElement("tr");
      for (let j = 0; j < carton[i].length; j++) {
        const celda = document.createElement("td");
        celda.textContent = carton[i][j];
        fila.appendChild(celda);
      }
      tabla.appendChild(fila);
    }
    cartonDiv.appendChild(tabla);

    // Se seleccionan las celdas luego de que muestra el cartón
    const cartones = cartonDiv.querySelectorAll("td");
    cartones.forEach(function (celda) {
      if (numerosExtraidos.includes(parseInt(celda.textContent))) {
        celda.classList.add("numero-destacado");
        celda.style.fontWeight = "bold";
      }
    });
  }

  document.getElementById("mostrarCarton").addEventListener("click", function () {
      const opcionSeleccionada = this.dataset.opcion;
      const cartonesJugador = generarCarton(opcionSeleccionada);

      for (let i = 0; i < cartonesJugador.length; i++) {
        mostrarCarton(cartonesJugador[i], i + 1);
      }
  });

  document.getElementById("b3").addEventListener("click", function () {
    document.getElementById("mostrarCarton").dataset.opcion = "b3";
  });

  document.getElementById("b4").addEventListener("click", function () {
    document.getElementById("mostrarCarton").dataset.opcion = "b4";
  });

  document.getElementById("b5").addEventListener("click", function () {
    document.getElementById("mostrarCarton").dataset.opcion = "b5";
  });

  const numerosExtraidos = [];
  let salidaNumero = 0;

  // Cantidad de turnos del juego
  function saleNumero() {
    if (salidaNumero >= 25) {
      alert("Se acabó la partida!");
      document.getElementById("sacarNumero").removeEventListener("click", saleNumero);
      return;
  }

  let numero;
  do {
      numero = generarNumeroAleatorio(1, 50);
  } while (numerosExtraidos.includes(numero));

  salidaNumero++;

  //actualiza el turno 
  document.getElementById("turno").textContent = `Turno: ${salidaNumero}`;

  numerosExtraidos.push(numero);
  document.getElementById("numeroExtraido").textContent = `Número extraído: ${numero}`;
  statusCartones(numero);

  //se verifica si hay ganador 
  winner();
  }

  //Verifica el estado de los cartones
  function statusCartones(numero) {
    const cartones = document.querySelectorAll(".tabcontent table");
    cartones.forEach(function (carton) {
      const celdas = carton.querySelectorAll("td");
      celdas.forEach(function (celda) {
        if (parseInt(celda.textContent) === numero) {
          celda.style.textShadow = "2px 2px 5px rgba(0, 0, 255, 0.5)";
          celda.innerHTML = `<s>${numero}</s>`;
        }
      });
    });
  }

  // Saca el número de Bingo
  document.getElementById("sacarNumero").addEventListener("click", saleNumero);

  //Determina el ganador al completar la linea
  function winner() {
    const ganador = comprobarLinea();
    if (ganador) {
      let nombreGanador;
      let puntosGanador;
      switch (ganador) {
        case 1:
          nombreGanador = document.getElementById("nombre1").value;
          break;
        case 2:
          nombreGanador = document.getElementById("nombre2").value;
          break;
        case 3:
          nombreGanador = document.getElementById("nombre3").value;
          break;
        case 4:
          nombreGanador = document.getElementById("nombre4").value;
          break;
        default:
          alert("No se pudo determinar el nombre del ganador.");
          return null;
      }
      //muestra el nombre de quien gana
      alert(`¡El jugador ${nombreGanador} ha ganado!`);
      document.getElementById("sacarNumero").removeEventListener("click", saleNumero);
      
      agregarUsuarios(nombreGanador, "", "", "");
      return nombreGanador;
    }
    return null;
  }

  function comprobarLinea() {
    const cartones = document.querySelectorAll(".tabcontent table");
    let ganador = null;
    let filas;

    cartones.forEach(function (carton, index) {
      filas = carton.querySelectorAll("tr");
      const columnas = Array.from(
        { length: filas[0].children.length },
        (_, i) => i
      );

      filas.forEach(function (fila) {
        let countHorizontal = 0;

        fila.querySelectorAll("td").forEach(function (celda) {
          if (celda.innerHTML.includes("s")) {
            countHorizontal++;
          }
        });

        if (countHorizontal === filas[0].children.length) {
          ganador = index + 1;
        }
      });

      columnas.forEach(function (col) {
        let countVertical = 0;
        filas.forEach(function (fila) {
          const celda = fila.children[col];
          if (celda.innerHTML.includes("s")) {
            countVertical++;
          }
        });
        if (countVertical === filas.length) {
          ganador = index + 1;
        }
      });
    });

    // Verifica diagonales
    if (!ganador) {
      const primeraDiagonal = [];
      const segundaDiagonal = [];
      cartones.forEach(function (carton, index) {
        filas.forEach(function (fila, i) {
          fila.querySelectorAll("td").forEach(function (celda, j) {
            if (i === j && celda.innerHTML.includes("s")) {
              primeraDiagonal.push(celda);
            }
            if (i + j === filas.length - 1 && celda.innerHTML.includes("s")) {
              segundaDiagonal.push(celda);
            }
          });
        });
      });
      if (
        primeraDiagonal.length === filas.length ||
        segundaDiagonal.length === filas.length
      ) {
        ganador = index + 1;
      }
    }

    return ganador;
  }

  // Función de reinicio del juego
  function reiniciarJuego() {
    numerosExtraidos.length = 0;
    salidaNumero = 0;
    document.getElementById("numeroExtraido").textContent = "Número extraído:";
    document.getElementById("turno").textContent = "Turno: 0";

    const celdasCartones = document.querySelectorAll(".tabcontent table td");
    celdasCartones.forEach(function (celda) {
      celda.innerHTML = "";
    });

    document.getElementById("nombre1").value = "";
    document.getElementById("nombre2").value = "";
    document.getElementById("nombre3").value = "";
    document.getElementById("nombre4").value = "";

    document.getElementById("sacarNumero").addEventListener("click", saleNumero);

    const ganador = winner();
    if (ganador) {
      agregarUsuarios(ganador, "", "", "");
    }

    cargarUsuarios();
  }

  document.getElementById("reiniciarJuego").addEventListener("click", reiniciarJuego);
});

function openTab(evt, tecnologia) {
  document.getElementById("juga1").style.display = "none";
  document.getElementById("juga2").style.display = "none";
  document.getElementById("juga3").style.display = "none";
  document.getElementById("juga4").style.display = "none";

  document.getElementsByClassName("tablinks")[0].className = "tablinks";
  document.getElementsByClassName("tablinks")[1].className = "tablinks";
  document.getElementsByClassName("tablinks")[2].className = "tablinks";
  document.getElementsByClassName("tablinks")[3].className = "tablinks";

  document.getElementById(tecnologia).style.display = "block";
  evt.currentTarget.classList.add("active");
}
