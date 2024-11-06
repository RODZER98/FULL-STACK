const btnGuardarCliente = document.querySelector('#guardar-cliente')

//guardar infrmacion del cliente
let cliente = {
    mesa:'',
    hora:'',
    pedido:[]
}

const categorias = {
    1:"Pizzas",
    2:"Postres",
    3:"Jugos",
    4:"Combos",
    5:"Cafe"
}

btnGuardarCliente.addEventListener('click',guardarCliente)

function guardarCliente(){
    //console.log('hola')
    const mesa = document.querySelector('#mesa').value
    const hora = document.querySelector('#hora').Value

    const camposVacios = [mesa,hora].some(i=>i=='')

    if(camposVacios){
        //todos los campos estan vacios

        const existeAlerta = document.querySelector('.invalida')

        if(!existeAlerta){
            const alerta = document.createElement('div')
            alerta.textContent = "Los campos son obligatorios"
            alerta.classList.add('invalida')
            document.querySelector('.modal-body form').appendChild(alerta)

            setTimeout(()=>{
                alerta.remove();
            },3000)
        }
    }else{
        //caso de que esten los campos llenos
        //console.log('campos llenos')

        cliente = {...cliente,mesa,hora}


        //ocultar la ventana modal

        var modalFormulario = document.querySelector('#formulario')
        var modal = bootstrap.Modal.getInstance(modalFormulario)

        modal.hide()
        mostrarSecciones()
        obtenerMenu()
    }
}

function obtenerMenu(){
    const url = 'http://localhost:3000/menu'

    fetch(url).then(respuesta=>respuesta.json()).then(res=>mostrarMenu(res)).catch(error=>console.log(error))
}

function mostrarMenu(menu){
    //console.log('mostrar')
    //console.log(menu)

    const contenido = document.querySelector('#menu .contenido')

    menu.forEach(i=>{
        const fila = document.createElement('div')
        fila.classList.add('row','border-top')

        const nombre = document.createElement('div')
        nombre.classList.add('col-md-4','py-3')
        nombre.textContent = i.nombre

        const precio = document.createElement('div')
        precio.classList.add('col-md-4','py-3')
        precio.textContent = `$${i.Precio}`

        const categoria = document.createElement('div')
        categoria.classList.add('col-md-4','py-3')
        categoria.textContent = categorias[i.Categoria]

        fila.appendChild(nombre)
        fila.appendChild(precio)
        fila.appendChild(categoria)

        contenido.appendChild(fila)
    })

}

function mostrarSecciones(){
    const secciones = document.querySelectorAll('.d-none')

    //console.log(secciones)
    secciones.forEach(i=>i.classList.remove('d-none'))
}