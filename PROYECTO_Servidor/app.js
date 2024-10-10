const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT||3000

//conexion mongoDB

//crear rutas de front end localhost
app.use('/',express.static(path.resolve('views','home')))
app.use('/tareas',express.static(path.resolve('views','tareas')))

module.exports= app