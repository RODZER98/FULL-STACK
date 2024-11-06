require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
//const port = process.env.PORT||3000 //sirve para crear el puerto pero lo haremos de otra manera
const userRouter = require('./controllers/usuario')
const taskRouter = require('./controllers/tarea')
const mongoose = require('mongoose')

//conexion mongoDB
try{
    mongoose.connect(process.env.MONGO_URI)
    console.log('ya estas conectado a la bd')
}catch(error){
    console.log(error)
}

//crear rutas de front end localhost
app.use('/',express.static(path.resolve('views','home')))
app.use('/tareas',express.static(path.resolve('views','tareas')))


//IMPORTANTE
app.use(express.json())

//crear rutas de backend
app.use('/api/users', userRouter)
app.use('/api/task', taskRouter)

module.exports= app