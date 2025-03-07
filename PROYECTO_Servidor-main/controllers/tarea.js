const taskRouter = require('express').Router()
const Task = require('../models/tareas')

taskRouter.post('/', (request, response)=>{
    const {texto, nombre} = request.body

    console.log(Task)
    //console.log(request.body)

    if(!texto){
        return response.status(400).json({error:'Todos los campos son obligatorios'})
    }else{
        //guardar en la bd
        let Objtarea = new Task();
        Objtarea.texto = texto
        Objtarea.nombre = nombre


        async function guardarTarea(){
            await Objtarea.save()

            const listTexto = await Task.find()
            console.log(listTareas)
        }

        guardarTarea().catch(console.error)

        return response.status(200).json({msg:'Se ha creado una nueva tarea'})
    }
})

taskRouter.get('/consultar-task',async(req,res)=>{
   
})

taskRouter.get('/eliminar-task',async (req,res)=>{
    try{
        const listado = req.params.id;
        const resultado = await Task.translateAliases.findByIdAndDelete(id)
    if(resultado)[
        res.status(200).send(`se elmino la tarea con id &{id}`)
    ]

}catch (error){
    console.log(error)
}
})

//obtener lista de usuarios
taskRouter.get('/lista-tasks',async(req,res)=>{
    try{
        const listado = await Task.find()
        return res.status(200).json(listado)

    }catch(error){
        return res.status(400).json({error:'Ha ocurrido un error'})
    }
})

module.exports = taskRouter