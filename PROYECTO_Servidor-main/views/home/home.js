const formC = document.querySelector('#form-create')
const formL = document.querySelector('#form-login')
const createInput = document.querySelector('#create-input')
const notificacion = document.querySelector('.notification')
const loginInput = document.querySelector('#login-input')


formC.addEventListener('submit',async e=>{
    e.preventDefault()
    const respuesta = await fetch('http://localhost:3000/usuarios',{
        method:'GET'
    })
    const users = await respuesta.json()
    console.log(users)

    //validar
    const user = users.find(i=>i.nombre===createInput.value)
    console.log(user)

    if(!createInput.value){
        //si el campo esta vacio
        console.log('el campo esta vacio')
        notificacion.innerHTML = "El campo no puede estar vacio"
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)
    }else if(user){
        //si existe el usuario, ya esta registrado
        notificacion.innerHTML = "el usuario ya existe"
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)
    }else{
        //caso: no existe el usuario, vamos a agregarlo
        await fetch('http://localhost:3000/usuarios',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
                //buscar cuales son los otros tipos de Content-Type
            },
            body:JSON.stringify({nombre:createInput.value})
        })

        const newUser={
            nombre:createInput.value
        }

        const response = await axios.post('/api/users',newUser)//axios da mejores facilidades para el backend
        console.log(response)

        notificacion.innerHTML = `el usuario ${createInput.value} se ha creado correctamente`
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)

        createInput.value = ""
    }
})

formL.addEventListener('submit',async e=>{
    e.preventDefault()

    const respuesta = await fetch('http://localhost:3000/usuarios',{
        method:'GET'
    })
    const users = await respuesta.json()
    //console.log(user)

    const user = users.find(i=>i.nombre===loginInput.value)
    //console.log(user)

    if(!user){
        notificacion.innerHTML = "el usuario no existe"
        notificacion.classList.add('show-notification')

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2000)
    }else{
        localStorage.setItem('usuario',JSON.stringify(user))
        window.location.href = '/tareas'
    }
})