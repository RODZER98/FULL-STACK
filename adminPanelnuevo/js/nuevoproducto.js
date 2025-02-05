import { nuevoproducto } from "./api.js";
import { mostrarAlerta } from "./mostrarAlerta.js";

const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit',validarProducto);

async function validarProducto(e){
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const precio = document.querySelector('#precio').value;
    const categoria = document.querySelector('#categoria').value;       

    const producto = {
            nombre,
            precio,
            categoria
        }
    
    if(validar(producto)){
        //console.log('Todos los campos son obligatorios');
        mostrarAlerta('Todos los campos son obligatorios');
        return;
    }else{
        await nuevoproducto(producto);
        window.location.href = 'index.html';
    }
    
}

function validar(obj){
    return !Object.values(obj).every(i => i!== '');
}