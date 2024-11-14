const btnGuardarCliente = document.querySelector('#guardar-cliente')
const contenido = document.querySelector('#resumen .contenido')

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
    const hora = document.querySelector('#hora').value

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
        console.log('campos llenos')

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
    console.log('mostrar')
    console.log(menu)

    const contenido = document.querySelector('#menu .contenido')

    menu.forEach(i=>{
        const fila = document.createElement('div')
        fila.classList.add('row','border-top')

        const nombre = document.createElement('div')
        nombre.classList.add('col-md-3','py-3')
        nombre.textContent = i.nombre

        const precio = document.createElement('div')
        precio.classList.add('col-md-3','py-3')
        precio.textContent = `$${i.Precio}`

        const categoria = document.createElement('div')
        categoria.classList.add('col-md-3','py-3')
        categoria.textContent = categorias[i.Categoria]

        const inputCantidad = document.createElement('input')
        inputCantidad.type = 'number'
        inputCantidad.min = 0
        inputCantidad.value = 0
        inputCantidad.id = `producto-${i.id}`
        inputCantidad.classList.add('form-control')
        inputCantidad.onchange = function (){
            const cantidad = parseInt(inputCantidad.value)
            agregarOrden({...i,cantidad})
        }

        const agregar = document.createElement('div')
        agregar.classList.add('col-md-3','py-3')
        agregar.appendChild(inputCantidad)

        fila.appendChild(nombre)
        fila.appendChild(precio)
        fila.appendChild(categoria)
        fila.appendChild(agregar)

        contenido.appendChild(fila)
    })

}

function agregarOrden(producto){
    let {pedido} = cliente

    //console.log(pedido)
    console.log(producto)

    //cantidad>0
    //cantidad=0

    if(producto.cantidad > 0){
        //validar que el prducto este o exista
        if(pedido.some(i=>i.id === producto.id)){
            /*aqui se puede con some, porque some retorna con un booleano y debe ser con pedido, porque pedido es un arreglo y producto es un objeto*/
            const pedidoActualizado = pedido.map(i=>{
                if(i.id === producto.id){
                    i.cantidad = producto.cantidad
                }//else{
                    return i
                //}
            })
            console.log('pedido actualizado')
            cliente.pedido = [...pedidoActualizado]
        }else{
            //caso de que no exista el item
            //lo agregamos como un nuevo item
            console.log('no existe el producto')
            cliente.pedido = [...pedido,producto]
            console.log(cliente.pedido)

        }
    }else{
        const res = pedido.filter(i=>//{
            i.id !== producto.id
        //}
    )
        console.log(res)
        cliente.pedido = res
        //console.log(cliente.pedido)
    }

    limpiarHTML()

    if(cliente.pedido.length){
        actualizarResumen()
    }else{
        //pedido vacio
        mensajePedidoVacio()
    }
}

function actualizarResumen(){
    const resumen = document.createElement('div')
    resumen.classList.add('col-md-6','card','py-5','px-3','shadow')

    //mostrar la mesa
    const mesa = document.createElement('p')
    mesa.textContent = `Mesa: ${cliente.mesa}`
    mesa.classList.add('fw-bold')

    console.log(cliente.hora)
    const hora = document.createElement('p')
    hora.textContent = `Hora: ${cliente.hora}`
    hora.classList.add('fw-bold')

    //mostrar los items del menu consumidos
    const heading = document.createElement('h3')
    heading.textContent = `Pedidos:`
    heading.classList.add('fw-bold','my-4')

    //extraer pedido del objeto cliente
    const {pedido} = cliente
    const grupo = document.createElement('ul')
    grupo.classList.add('list-group')

    //producto pedido
    pedido.forEach(i=>{
        const {nombre,Precio,cantidad,id} = i

        const lista = document.createElement('li')
        lista.classList.add('list-group-item')

        const nombreP = document.createElement('h4')
        nombreP.classList.add('text-center','my-4')
        nombreP.textContent = `Nombre: ${nombre}`

        const precioP = document.createElement('p')
        precioP.classList.add('fw-bold')
        precioP.textContent = `Precio: ${Precio}`

        const cantidadP = document.createElement('p')
        cantidadP.classList.add('fw-bold')
        cantidadP.textContent = `Cantidad: ${cantidad}`

        const subtotalP = document.createElement('p')
        subtotalP.classList.add('fw-bold')
        subtotalP.textContent = `Subtotal: ${calcularSubtotal(i)}`

        //boton de eliminar
        const btnEliminar = document.createElement('button')
        btnEliminar.classList.add('btn','btn-danger')
        btnEliminar.textContent = 'Eliminar pedido'

        //funcion para eliminar el contenido
        btnEliminar.onclick = function(){
            eliminarProducto(id)
        }

        lista.appendChild(nombreP)
        lista.appendChild(precioP)
        lista.appendChild(cantidadP)
        lista.appendChild(subtotalP)
        lista.appendChild(btnEliminar)

        grupo.appendChild(lista)

    })

    resumen.appendChild(mesa)
    resumen.appendChild(hora)
    resumen.appendChild(heading)
    resumen.appendChild(grupo)

    //agregamos el contenido
    contenido.appendChild(resumen)

    //mostrar la calculadora de propinas
    formularioPropinas()
}

function formularioPropinas(){
    const formulario = document.createElement('div')
    formulario.classList.add('col-md-6','formulario')

    const heading = document.querySelector('h3')
    heading.classList.add('my-4')
    heading.textContent = 'Propina'

    //propina 10%
    //const checkBox10 = document.createElement('input')
    const checkBox10 = document.createElement('input')
    checkBox10.type = 'radio'
    checkBox10.name = 'propina'
    checkBox10.value = '10'

    checkBox10.classList.add('form-check-input')
    console.log('llamado a celular propina')
    console.log(checkBox10)


    checkBox10.onclick = calcularPropina


    const checkLabel10 = document.createElement('label')
    checkLabel10.textContent = '10%'
    checkLabel10.classList.add('form-check-label')

    const checkDiv10 = document.createElement('div')
    checkDiv10.classList.add('form-check')

    console.log(checkDiv10)
    checkDiv10.appendChild(checkBox10)
    checkDiv10.appendChild(checkLabel10)

    //propina 25%
    const checkBox25 = document.createElement('input')
    checkBox25.type = 'radio'
    checkBox25.name = 'propina'
    checkBox25.value = '25'
    checkBox25.classList.add('form-check-input')
    //console.log(checkBox25)
    checkBox25.onclick = calcularPropina

    const checkLabel25 = document.createElement('label')
    checkLabel25.textContent = '25%'
    checkLabel25.classList.add('form-check-label')

    const checkDiv25 = document.createElement('div')
    checkDiv25.classList.add('form-check')

    checkDiv25.appendChild(checkBox25)
    checkDiv25.appendChild(checkLabel25)

    formulario.appendChild(checkDiv10)
    formulario.appendChild(checkDiv25)
    formulario.appendChild(formulario)
    


}

function calcularPropina(){
    //revisar whatsapp
}

function calcularSubtotal(i){
    const {cantidad,Precio} = i
    return `$ ${cantidad*Precio}`
}

function eliminarProducto(id){
    const {pedido} = cliente
    cliente.pedido = pedido.filter(i=>i.id !== id)

    limpiarHTML()

    if(cliente.pedido.length){
        actualizarResumen()
    }else{
        mensajePedidoVacio
    }

    //ahora como eliminamos el producto debemos actualizar la cantidad a cero

    console.log(id)
    const productoEliminado = `#producto-${id}`
    const inputEliminado = document.querySelector(productoEliminado)
    inputEliminado.value = 0
}

function mensajePedidoVacio(){
    const texto = document.createElement('p')
    texto.textContent = "Agrega productos al pedido"
    texto.classList.add('text-center')

    contenido.appendChild(texto)
}

function limpiarHTML(){

    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild)
    }
}

function mostrarSecciones(){
    const secciones = document.querySelectorAll('.d-none')

    //console.log(secciones)
    secciones.forEach(i=>i.classList.remove('d-none'))
}

//ojo agregar mas funcionalidad: agregar las mesas en el json(se puede hacer con tab)
//para hacer lo del json, nos podemos guiar de los videos de node.js
//despues crear el MVC