const mongoose = require('mongoose')

// conexion a la bd

//definir el esquema para USUARIOS
const tareaSchema = new mongoose.Schema({
    texto: String,
    nombre: String
})


//configurar la respuesta del usuario en el schema
tareaSchema.set('toJSON',{
    transform: (document, returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
    }
})

//selecionar un nombre para registrar el modelo
const Task = mongoose.model('Task',tareaSchema)

//se exporta como modulo
module.exports = Task
//hola