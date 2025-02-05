//la conexion para la base de datos
import { obtenerproductos, eliminarproducto } from "./api.js"

const listado = document.querySelector('#listado-Productos')

listado.addEventListener('click',confirmarEliminar);
document.addEventListener('DOMContentLoaded',mostrarProductos);

//sin el async await no da error pero no nos da el formato que queremos
async function mostrarProductos(){
    //console.log("hola")
    const productos = await obtenerproductos()
    console.log(productos)

    productos.forEach(i => {
        const { nombre, precio, categoria, id } = i
        const row = document.createElement('tr')
        row.innerHTML += `
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="font-bold text-sm leading-5 font-medium text-gray-700 text-lg ">${nombre}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="font-bold text-sm leading-5 font-medium text-gray-700 text-lg ">${precio}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <p class="font-bold text-sm leading-5 font-medium text-gray-700 text-lg ">${categoria}</p>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                <a class="text-teal-600 hover:text-teal-900 mr-5" href="editar-producto.html?id=${id}">Editar</a>
                <a class="text-red-600 hover:text-red-900 eliminar" href="#" data-producto="${id}">Eliminar</a>
            </td>
        `

        listado.appendChild(row);
    });
}

async function confirmarEliminar(e){
    if(e.target.classList.contains('eliminar')){
        const productoId = parseInt(e.target.dataset.producto)
        //console.log(productoId)

        const confirmar = confirm('Quieres elminar este producto')
        if(confirmar){
            await eliminarproducto(productoId)
        }
    }
}

