document.addEventListener("DOMContentLoaded", function () {
  //Consumo e API
async function obtenerJuegos() {
  try {
    let listaJuegos = [];
    // Esperar a que se resuelvan todas las promesas
    const juegos = await Promise.all(
      Array.from({ length: 30 }, (_, i) =>
        fetch(`https://bgg-json.azurewebsites.net/thing/${i + 1}`).then(
          (response) => response.json()
        )
      )
    );
    // Agregar los juegos a la lista filtrando la información que me sirve
    listaJuegos = juegos.map((juego) => {
      const {
        gameId,
        name,
        description,
        image,
        thumbnail,
        playingTime,
        minPlayers,
        maxPlayers,
      } = juego;
      return {
        gameId,
        name,
        description,
        image,
        thumbnail,
        playingTime,
        minPlayers,
        maxPlayers,
      };
    });
    // Return de la funcion
    return listaJuegos;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//Funcion para generar HTML
  function mostrarJuegos(juegos){
      const contenedorProd = document.getElementById("contenedor-grid");
      juegos.forEach((juego) => {
        const productoHTML = `
                  <div class="card">
                      <div class="titulo">${juego.name}</div>
                      <img src="${juego.thumbnail}" alt="${juego.name}">
                      <div class="descripcion">${juego.description}</div>
                      <div class="duracion"> Duracion: ${
                        juego.playingTime
                      } minutos</div>
                      <div class="cantJugadores"> De ${juego.minPlayers} a ${juego.maxPlayers} jugadores</div>
                      <button class="agregar-carrito" onclick="agregarAlCarrito('${juego.gameId}', '${juego.name}', '${juego.thumbnail}')">Agregar a deseados</button>
                  </div>
              `;
        contenedorProd.insertAdjacentHTML("beforeend", productoHTML);
      });
  };

//Funcion anonima para poner a funcionar todo
(async () => {
  try {
      const juegos = await obtenerJuegos();
      mostrarJuegos(juegos);
  } catch (error) {
      console.error('Error en la carga de productos y/ofertas:', error);
  }
})();
});

let entrada = document.querySelector(".input-footer");

entrada.addEventListener("keydown", function(e){
    if(e.key == "Enter" && entrada.value != ""){
        alert(`Enviaremos las novedades a: ${entrada.value}`);
    }
}) 

function agregarAlCarrito(gameId, name, thumbnail) {
  fetch('/agregar_al_carrito', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ gameId: gameId, name: name, thumbnail: thumbnail })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
  })
  .catch(error => console.error('Error:', error));
}


function actualizarCantidad(gameId, change) {
  fetch('/actualizarCantidad', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gameId: gameId, change: change })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      } else {
          alert('Error al actualizar la cantidad');
      }
  })
  .catch(error => console.error('Error:', error));
}

function deletear(gameId) {
  fetch('/deletear', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gameId: gameId })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          location.reload();
      } else {
          alert('Error al eliminar el juego');
      }
  })
  .catch(error => console.error('Error:', error));
}