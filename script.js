document.addEventListener("DOMContentLoaded", function () {
  cargarUsuarios();

  document.getElementById("ipartida").addEventListener("click", function (event) {
      event.preventDefault();
      //Aqui se extrae el valor del input ingresado por el usuario
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
        //Alerta para que los campos no esten vacíos
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }

      const ganador = verificarGanador();
      
      if (ganador) {
        // Calcular los puntos ganados por el jugador
        const puntosGanador = calcularPuntos();

        // Llamar a la función agregarUsuarios con el nombre del ganador y los puntos obtenidos
        agregarUsuarios(ganador.nombre, puntosGanador);
        alert("El formulario se ha enviado correctamente.");

        // Mostrar puntaje en la tabla
        mostrarPuntaje(ganador.nombre, puntosGanador);

        // Actualizar la tabla con los usuarios existentes y sus victorias después de agregar un nuevo usuario
        cargarUsuarios();
      }
    });

  function agregarUsuarios(nombre, puntos) {
    // Obtener el objeto de usuarios del localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    // Incrementar el contador de victorias para el jugador ganador
    if (usuarios.hasOwnProperty(nombre)) {
      usuarios[nombre].victorias += 1; 
      usuarios[nombre].puntos += puntos; 
    } else {
      usuarios[nombre] = {
        victorias: 1, 
        puntos: puntos,
      };
    }

    // Guardar el objeto de usuarios actualizado en el localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Llamar a la función cargarUsuariosSelect para actualizar el select
    cargarUsuariosSelect();
  }

  // Función para cargar usuarios y sus victorias desde localStorage
  function cargarUsuariosSelect() {
    // Obtener el objeto de usuarios del localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    const selectUsuarios = document.getElementById("selectUsuarios");
    selectUsuarios.innerHTML = ""; // Limpiar contenido previo

    for (const usuario in usuarios) {
      const opcion = document.createElement("option");
      opcion.value = usuario;
      opcion.textContent = `${usuario} - Victorias: ${usuarios[usuario].victorias}, Puntos: ${usuarios[usuario].puntos}`;
      selectUsuarios.appendChild(opcion);
    }
  }

  // Resto del código...
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

document.addEventListener("DOMContentLoaded", function () {
  // Generación y visualización de cartones de bingo
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

    const tabla = document.createElement("table");
    const titulo = document.createElement("h2");
    titulo.textContent = `Cartón ${numero}`;
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

    // Ahora, selecciona las celdas después de mostrar el cartón
    const cartones = cartonDiv.querySelectorAll("td");
    cartones.forEach(function (celda) {
      if (numerosExtraidos.includes(parseInt(celda.textContent))) {
        celda.classList.add("numero-destacado");
        celda.style.fontWeight = "bold";
      }
    });
  }

  document
    .getElementById("mostrarCarton")
    .addEventListener("click", function () {
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

  // Sorteo de números de bingo y actualización de cartones
  const numerosExtraidos = [];

  // Definimos una variable para contar el número de veces que se ha extraído un número
  let contadorExtracciones = 0;

  // Definimos la función para extraer un número
  function extraerNumero() {
    // Verificamos si ya se han hecho 25 extracciones
    if (contadorExtracciones >= 25) {
      alert("Se acabó la partida!");
      // Desactivamos el event listener para evitar que se siga ejecutando la función
      document
        .getElementById("sacarNumero")
        .removeEventListener("click", extraerNumero);
      return;
    }

    let numero;
    do {
      numero = generarNumeroAleatorio(1, 50);
    } while (numerosExtraidos.includes(numero));

    // Incrementamos el contador de extracciones
    contadorExtracciones++;

    // Actualizamos el párrafo que muestra el turno actual
    document.getElementById(
      "turno"
    ).textContent = `Turno: ${contadorExtracciones}`;

    numerosExtraidos.push(numero);
    document.getElementById(
      "numeroExtraido"
    ).textContent = `Número extraído: ${numero}`;
    statusCartones(numero);

    // Verificar si hay un ganador después de cada extracción
    verificarGanador();
  }

  // Definimos la función para verificar el estado de los cartones
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

  // Agregamos el event listener al botón "Sacar Número de Bingo"
  document
    .getElementById("sacarNumero")
    .addEventListener("click", extraerNumero);

  function verificarGanador() {
    // Verificar si un jugador ha completado una línea
    const ganador = comprobarLinea();
    if (ganador) {
      let nombreGanador;
      let puntosGanador; // Variable para almacenar los puntos del ganador
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
          // Manejar el caso en el que no se encuentre el nombre del ganador
          alert("No se pudo determinar el nombre del ganador.");
          return null;
      }
      alert(`¡El jugador ${nombreGanador} ha ganado!`);
      // Desactivamos el event listener para evitar que se siga ejecutando la función
      document
        .getElementById("sacarNumero")
        .removeEventListener("click", extraerNumero);
      return nombreGanador;
    }
    return null;
  }

  function comprobarLinea() {
    const cartones = document.querySelectorAll(".tabcontent table");
    let ganador = null;

    // Declara la variable filas fuera del bucle forEach
    let filas;

    // Verificar líneas horizontales y verticales
    cartones.forEach(function (carton, index) {
      filas = carton.querySelectorAll("tr");
      const columnas = Array.from(
        { length: filas[0].children.length },
        (_, i) => i
      );

      filas.forEach(function (fila) {
        let countHorizontal = 0;
        let countVertical = 0;

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

    // Verificar diagonales
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
    // Reiniciar variables y elementos del juego
    numerosExtraidos.length = 0;
    contadorExtracciones = 0;
    document.getElementById("numeroExtraido").textContent = "Número extraído:";
    document.getElementById("turno").textContent = "Turno: 0";

    // Restaurar celdas de cartones
    const celdasCartones = document.querySelectorAll(".tabcontent table td");
    celdasCartones.forEach(function (celda) {
      celda.innerHTML = "";
    });

    // Limpiar nombres de los inputs
    document.getElementById("nombre1").value = "";
    document.getElementById("nombre2").value = "";
    document.getElementById("nombre3").value = "";
    document.getElementById("nombre4").value = "";

    // Reactivar el botón de "Sacar Número de Bingo"
    document
      .getElementById("sacarNumero")
      .addEventListener("click", extraerNumero);

    // Actualizar la tabla de usuarios y sus victorias después de reiniciar el juego
    cargarUsuarios();
  }

  // Agregar evento al botón de reinicio
  document
    .getElementById("reiniciarJuego")
    .addEventListener("click", reiniciarJuego);
});
