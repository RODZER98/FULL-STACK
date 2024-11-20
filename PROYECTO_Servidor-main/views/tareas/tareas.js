const usuario = JSON.parse(localStorage.getItem('usuario'))
const formulario = document.querySelector('#form-todos')
const lista = document.querySelector('#todos-list')  
const inputF = document.querySelector('#form-input')
const cerrarBtn = document.querySelector('#cerrar-btn') 
const listaA = document.querySelector('#todos-list')
const notificacion = document.querySelector('.notification')  


if(!usuario){
    //no existe, no ha iniciado sesion
    window.location.href = '/'
}

const obtenerLista = async ()=> {
    const respuesta = await fetch('http://localhost:3000/tareas',{method:'GET'});
    const list = await respuesta.json();
    const userList = list.filter(lista => lista.nombre === usuario.nombre);
    console.log(userList)
        userList.forEach(lista => 
            {
            const listado = document.createElement('li');
            listado.innerHTML = `
            <li id=${lista.id} class="todo-item">
            <button class="delete-btn">&#10006;</button>
            <p class="${lista.checkend ? 'check-todo' : ''}">${lista.texto}</p>
            <button class="check-btn">&#10003;</button>
            </li>
            `
            console.log(lista.texto)
            listaA.appendChild(listado);
            inputF.value='';
        })
}

obtenerLista();

formulario.addEventListener('submit', async e=>{
    e.preventDefault()
    limpiarHTML()
    
    const respuesta = await fetch('http://localhost:3000/tareas',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
            //buscar cuales son los otros tipos de Content-Type
        },
        body:JSON.stringify({texto:inputF.value,nombre:usuario.nombre})
    })
    
    
    const newTask={
        texto:inputF.value,
        nombre:usuario.nombre
    }
    console.log(newTask)
    const response = await axios.post('/api/task',newTask)//axios da mejores facilidades para el backend
    console.log(response)

    notificacion.innerHTML = `la tarea se ha creado correctamente`
    notificacion.classList.add('show-notification')

    setTimeout(()=>{
        notificacion.classList.remove('show-notification')
    },2000)

    inputF.value = ''
    obtenerLista();
}
    //const users = await respuesta.json()

    //const user = users.find(i=>i.nombre===loginInput.value)
)

lista.addEventListener('click', async e=>{
    if(e.target.classList.contains('delete-btn')){
        const id = e.target.parentElement.id;
        //console.log(id)

        await fetch(`http://localhost:3000/tareas/${id}`,{
            method:'DELETE'})
            e.target.parentElement.remove();
    }else if(e.target.classList.contains('check-btn'));
        const id = e.target.parentElement.id;

        const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({checked:e.target.parentElement.classList.contains('check-todo')?false:true})
        })

        const response = await respuestaJSON.json();
        e.target.parentElement.classList.toggle('check-todo')

})


cerrarBtn.addEventListener('click',async e=>{
    localStorage.removeItem('usuario');
    window.location.href = '/'
})

function limpiarHTML(){
    while(listaA.firstChild){
        lista.removeChild(listaA.firstChild)
    }
}