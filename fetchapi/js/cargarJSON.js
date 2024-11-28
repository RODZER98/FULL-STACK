const cargarJSONbtn = document.querySelector('#cargarJSON')
cargarJSONbtn.addEventListener('click',obtenerDatosJson)

function obtenerDatosJson(){
    const url = 'data/empleado.json'
    fetch(url)//conexion
    .then(respuesta=>{
        console.log(respuesta)
        return respuesta.json()//conversion
    }).then(datos=>{
        console.log(datos)
        mostrarHTML(datos)
    }).catch(error=>{//error
        console.log(error)
    })
}

function mostrarHTML(data){
    const{empresa,id,trabajo,nombre} = data

    const contenido = document.querySelector('#contenido')
    contenido.innerHTML = `
    <p>Empleado: ${nombre}</p>
    <p>Id: ${id}</p>
    <p>Empresa: ${empresa}</p>
    <p>Trabajo: ${trabajo}</p>
    `
}
