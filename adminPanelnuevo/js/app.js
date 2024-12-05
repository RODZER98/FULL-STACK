//la conexion para la base de datos
import { obtenerproductos } from "./api.js"

const listado = document.querySelector('#listado-Productos')

listado.addEventListener('DOMContentLoaded',mostrarProductos)

//sin el async await no da error pero no nos da el formato que queremos
async function mostrarProductos(){
    console.log("hola")
    const productos = await obtenerproductos()
    console.log(productos)
}