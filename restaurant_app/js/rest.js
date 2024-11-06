const btnGuardarCliente = document.querySelector('#guardar-cliente')

//guardar infrmacion del cliente
let cliente = {
    mesa:'',
    hora:'',
    pedido:[]
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
    }
}