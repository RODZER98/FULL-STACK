const contenedor = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima)
})

function buscarClima(e){
    e.preventDefault()
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value
    //console.log(ciudad,pais)

    if(ciudad === "" || pais === "" ){
    mostrarError('Los campos son obligatorios')
    }else{
        //console.log('Los campos estan llenos')}
        consultarAPI(ciudad,pais)
    }
}

function consultarAPI(ciudad,pais){
    const appid = 'd4ed008ce4c7cf1b847d94c340be8f9c'
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`

    fetch(url)
    .then(respuesta=>{
        console.log(respuesta)
        return respuesta.json()
    })
    .then(datos=>{
        console.log(datos)

        console.log(datos.cod)

        if(datos.cod === '404'){
            mostrarError('La ciudad no se ha encontrado, ingrese una ciudad valida por favor')
        }else{
            mostrarHTML(datos)
        }    
    })
    .catch(error=>{
        console.log(error)
    })

}

function gradosKelvinaC(temperatura){
    return temperatura-273.15
}

function mostrarHTML(data){
    console.log(data)
    limpiarHTML()

    const{name,main:{temp,temp_max,temp_min}} = data

    //convertir a celsius
    const TA = Math.round(gradosKelvinaC(temp))
    const TMa = Math.round(gradosKelvinaC(temp_max))
    const TMi = Math.round(gradosKelvinaC(temp_min))
    //console.log(name,temp,temp_max,temp_min)

    const nCiudad = document.createElement('p')
    nCiudad.innerHTML =  `El clima en: ${name}`
    nCiudad.classList.add('text-white','text-center','text-3xl')

    const tempA = document.createElement('p')
    tempA.innerHTML = `TEMP: ${TA}&#176;`
    tempA.classList.add('text-white','text-center')

    const max = document.createElement('p')
    max.innerHTML = `TEMP MAX: ${TMa}&#176;`
    max.classList.add('text-white','text-center')

    const min = document.createElement('p')
    min.innerHTML = `TEMP MIN: ${TMi}&#176;`
    min.classList.add('text-white','text-center')

    resultado.appendChild(nCiudad)
    resultado.appendChild(tempA)
    resultado.appendChild(max)
    resultado.appendChild(min)
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100')

    console.log(alerta)

    if(!alerta){
        const alertaM = document.createElement('div')
        alertaM.innerHTML = `<strong>${mensaje}</strong>`
        alertaM.classList.add('bg-red-100','text-center','text-red-500','py-3','my-3','mt-4','max-w-md','mx-auto')

        contenedor.appendChild(alertaM)

        setTimeout(()=>{
            alertaM.remove()
        },3000)
    }
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

//para concluir el ejercicio falta agragarle el spinner o loader al ejercicio y se quiere agrgarle iconos al ejercicio en el mostrar HTML

//probando github