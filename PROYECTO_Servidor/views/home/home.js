const formC = document.querySelector('#form-create')
const formL = document.querySelector('#form-login')
const createInput = document.querySelector('#create-input')
const notificacion = document.querySelector('.notification')


formC.addEventListener('submit',async e=>{
    e.preventDefault()
    const respuesta = await fetch('http://localhost:3000/usuarios',{
        method:'GET'
    })
    const users = respuesta.json()
    console.log(users)

    if(!createInput.value){
        //si el campo esta vacio
        console.log('el campo esta vacio')
        notificacion.innerHTML = "El campo no puede estar vacio"
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)
    }else{

    }
})