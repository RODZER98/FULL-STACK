const mascotaInput = document.querySelector('#mascota')
const propietarioInput = document.querySelector('#propietario')
const telefonoInput = document.querySelector('#telefono')
const fechaInput = document.querySelector('#fecha')
const horaInput = document.querySelector('#hora')
const sintomasInput = document.querySelector('#sintomas')

const formulario = document.querySelector('#nueva-cita')
const contenedorCitas = document.querySelector('#citas')

let editar;

const objCitas = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '' ,
    sintomas: ''
}

eventos ()
function eventos(){
    formulario.addEventListener('submit',nuevaCita)
    mascotaInput.addEventListener('change',datosCita)
    propietarioInput.addEventListener('change',datosCita)
    telefonoInput.addEventListener('change',datosCita)
    fechaInput.addEventListener('change',datosCita)
    horaInput.addEventListener('change',datosCita)
    sintomasInput.addEventListener('change',datosCita)
}

//clases de javascript
class citas{
    //la clase principal simpre debe tener el metodo constructor
    constructor(){
        this.citas = []//apuntador para llamar a la misma clase this
    }

    agregarCita(cita){
        //objCitas.push(cita)
        //otra forma
        this.citas = [...this.citas,cita];
        console.log(this.citas);//para ir viendo como se van agregando las citas
    }

    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !== id);
    }

    editarCita(cita){
        this.citas = this.citas.map(citas => citas.id === cita.id ? cita : citas);
    }




    /*CRUD: operaciones que se van usar en la clase principal
    CREATE
    READ
    UPDATE
    DELETE
    */
}

//clase para el front
class ui{
    
    imprimirAlerta(mensaje,tipo){
        //vamos un div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //vemos el mensaje de error
        divMensaje.textContent = mensaje;

        //agregamos el mensaje
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

        setTimeout(()=>{
            divMensaje.remove();
        },5000);
    }
    
    imprimirCitas({citas}){
    this.limpiarHTML();

        citas.forEach(i => {
            const{mascota,propietario,telefono,fecha,hora,sintomas,id}=i;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            //ahora crearemos un atributo personalizado
            divCita.dataset.id = id;

            //generar textospara las fechas de citas
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">propietario:</span>${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `<span class="font-weight-bolder">telefono:</span>${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weight-bolder">fecha:</span>${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `<span class="font-weight-bolder">hora:</span>${hora}`;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weight-bolder">sintomas:</span>${sintomas}`;


            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info');
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(i);

            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const useri = new ui();

const administrarCitas = new citas()
//administrarCitas.

function nuevaCita(e){
    e.preventDefault()
    // console.log('nueva cita')

    const {mascota, propietario, telefono, fecha, sintomas, hora} = objCitas
    if(mascota==='' || propietario==='' || telefono==='' || fecha==='' || hora==='' || sintomas===''){
        //console.log('Todos los campos son obligatorios')
        useri.imprimirAlerta('Todos los campos son obligatorios','error')
        return;


    }
    if(editar){
        console.log('estoy editando');
        formulario.querySelector('button[type=submit]').textContent = 'Crear cita';
        editar = false;

        administrarCitas.editarCita({...objCitas});

        //mensaje datos correctos
        useri.imprimirAlerta('Se ha modificado la cita correctamente');
    }else{
        console.log('estoy creando una nueva cita');
        objCitas.id = Date.now();
        //console.log('Arreglar nueva cita')
        administrarCitas.agregarCita({...objCitas});

        useri.imprimirAlerta('Se ha agragado la cita correctamente')
    }

    formulario.reset();
    reiniciarObjeto();
    useri.imprimirCitas(administrarCitas);
}

function datosCita(e){
    //console.log(e.target.name)
    objCitas[e.target.name] = e.target.value
    //console.log(objCitas)
}

function reiniciarObjeto(){
    objCitas.mascota = '';
    objCitas.propietario = '';
    objCitas.telefono = '';
    objCitas.fecha = '';
    objCitas.hora = '';
    objCitas.sintomas = '';
}

function eliminarCita(id){
    //console.log(id);
    administrarCitas.eliminarCita(id);
    //mostramos el mensaje
    useri.imprimirAlerta('la cita se elimino correctamente');
    //actualizar el objeto
    useri.imprimirCitas(administrarCitas);
}

function cargarEdicion(cita){
    console.log(cita);

    const{mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    //llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //vamos a llenar el objeto
    objCitas.mascota = mascota;
    objCitas.propietario = propietario;
    objCitas.telefono = telefono;
    objCitas.fecha = fecha;
    objCitas.hora = hora;
    objCitas.sintomas = sintomas;
    objCitas.id = id;

    //vamos a cambiar el texto del boton
    formulario.querySelector('button[type=submit]').textContent = 'Guardar';

    editar = true;

}