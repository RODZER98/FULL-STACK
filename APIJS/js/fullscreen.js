const abrirBTN = document.querySelector('#abrir-pantalla-completa')
const salirBTN = document.querySelector('#salir-pantalla-completa')

//evento
abrirBTN.addEventListener('click',pantallaCompleta)
salirBTN.addEventListener('click',salirPantalla)

function pantallaCompleta(){
    document.documentElement.requestFullscreen()
}

function salirPantalla(){
    document.exitFullscreen()
}
