//crear selectores
const moneda = document.querySelector('#moneda');
const selectCripto = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

//crear poder guardar
const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

//Eventos
document.addEventListener('DOMContentLoaded',()=>{
    consultarCripto();

    moneda.addEventListener('input', obtenerValores);
    selectCripto.addEventListener('change',obtenerValores);
    formulario.addEventListener('submit',cotizar);
})

const obtenerCripto = criptomoneda => new Promise(resolve=>{
    resolve(criptomoneda);
})

function consultarCripto(){
    //URL toplist del market cap API
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    
    fetch(url)
        .then(respuesta=>respuesta.json())//respuesta fue exitosa
        .then(resultado=>obtenerCripto(resultado.Data))
        .then(criptomonedas=> selectCriptomonedas(criptomonedas))
        .catch(error=>console.log(error))
}

function obtenerValores(e){
    console.log(e.target.value)
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda)
}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const{Name,FullName} = cripto.CoinInfo;;
        const option = document.createElement('option');
        option.textContent = FullName;
        option.value = Name;
        //insertar en el HTML
        selectCripto.appendChild(option)
    });
}

function cotizar(e){
    e.preventDefault();

    mostrarSpinner()

    //consultar los valores guardado en el objeto
    const {modena, criptomoneda} = objBusqueda;
    if(moneda === '' || criptomoneda === ''){
        //validar que los campos no sean vacios 
        console.log('Los campos son obligatorios')
        mostrarError('Los campos son obligatorios')
        return
    }

    consultarAPI();
}

function mostrarError(mensaje){
    limpiarHTML()
    const mensajeError = document.querySelector('.resultado')
    if(mensajeError){
        mensajeError.remove()
    }
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');

    //mostrar el mensaje de error
    divMensaje.textContent = mensaje;

    //insertar en el html
    formulario.appendChild(divMensaje)

    //bloque de error va a desaparecer luego de 5 segundos 
    setTimeout(()=>{
        divMensaje.remove();
    },5000);
}

function consultarAPI(){
    const {moneda,criptomoneda} = objBusqueda;
    //url multiple symbol full data
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    mostrarSpinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(cotizar=>{
            mostrarResultado(cotizar.DISPLAY[criptomoneda][moneda])
        })
}

function mostrarResultado(cotizacion){
    limpiarHTML();

    const {CHANGEPCT24HOUR,PRICE,HIGHDAY,LOWDAY,LASTUPDATE} = cotizacion;

    const ult24horas = document.createElement('p');
    ult24horas.innerHTML = `<p>Variacion ultimas 24 horas: ${CHANGEPCT24HOUR}</p>`

    const precio = document.createElement('p');
    precio.innerHTML = `<p>El precio es: ${PRICE}</p>`

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `<p>El precio mas alto del dia es: ${HIGHDAY}</p>`
    
    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `<p>El precio mas bajo del dia es: ${LOWDAY}</p>`

    const ultAct = document.createElement('p');
    ultAct.innerHTML = `<p>La ultima actualizacion es: ${LASTUPDATE}</p>`

    resultado.appendChild(ult24horas);
    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultAct);

    formulario.appendChild(resultado);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function mostrarSpinner(){
    limpiarHTML()
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class=""bounce1></div>
        <div class=""bounce2></div>
        <div class=""bounce3></div>
    `
    //mostramos el spinner en el html
    resultado.appendChild(spinner)
}

