const cargartxtBtn = document.querySelector("#cargarTxt");
cargartxtBtn.addEventListener("click", obtenerDatos);

function obtenerDatos() {
  const url = "data/datos.txt";
  fetch(url) //conexion
    .then((respuesta) => {
      console.log(respuesta);
      return respuesta.text(); //conversion
    })
    .then((datos) => {
      console.log(datos);
    })
    .catch((error) => {
      //error
      console.log(error);
    });
}

//si 404 no lo encontro, si es 400 no hay conexion y si es 200 es que esta conectado
