import { obtenerproducto, editarproducto } from "./api.js";
import { mostrarAlerta } from "./mostrarAlerta.js";

(function(){
    const nombreinput = document.querySelector('#nombre');
    const precioinput = document.querySelector('#precio');
    const categoriainput = document.querySelector('#categoria');
    const idinput = document.querySelector('#id');
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', async ()=>{
        
        const parametrosURL = new URLSearchParams(window.location.search);
        console.log(window.location.search);
        
        const idProducto = parseInt(parametrosURL.get('id'));
        console.log(idProducto);
        
        const producto = await obtenerproducto(idProducto);
        console.log(producto);
        
        mostrarProducto(producto);

        //registro de la actualizacion del producto
        formulario.addEventListener('submit',validarProducto);

    });

    function mostrarProducto(producto){
        const {nombre, precio, categoria, id} = producto;

        nombreinput.value = nombre;
        precioinput.value = precio;
        categoriainput.value = categoria;
        idinput.value = id;
    }

    async function validarProducto(e){
        e.preventDefault();

        const producto = {
            nombre: nombreinput.value,
            precio: precioinput.value,
            categoria: categoriainput.value,
            id: parseInt(idinput.value)
        }

        if(validar(producto)){
            //console.log('Todos los campos son obligatorios');
            mostrarAlerta('Todos los campos son obligatorios');
            return;
        }else{
            await editarProducto(producto);
            window.location.href = 'index.html';
        }
    }

    function validar(obj){
        return !Object.values(obj).every(i => i!== '');
    }

})();

