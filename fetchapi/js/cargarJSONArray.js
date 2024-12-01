const cargarJSONA = document.querySelector("#cargarJSONArray");
cargarJSONA.addEventListener("click", obtenerDatosjsonA);

function obtenerDatosjsonA() {
  const url = "data/empleados.js";
  fetch(url) //conexion
    .then((respuesta) => {
      console.log(respuesta);
      return respuesta.json(); //conversion
    })
    .then((datos) => {
      console.log(datos);
      mostrarHTMLA(datos);
    })
    .catch((error) => {
      //error
      console.log(error);
    });
}

function mostrarHTMLA(data) {
  const contenido = document.querySelector("#contenido");
  let texto = "";
  data.forEach((i) => {
    const { empresa, id, trabajo, nombre } = i;

    texto += `
    <p>Empleado: ${nombre}</p>
    <p>Id: ${id}</p>
    <p>Empresa: ${empresa}</p>
    <p>Trabajo: ${trabajo}</p>
    `;
  });

  contenido.innerHTML = texto;
}
