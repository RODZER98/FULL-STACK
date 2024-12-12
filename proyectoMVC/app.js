require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

//conexion a BD

    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('Conexion a BD correcta')
    } catch(error) {
        console.log(error)
    }



//crear rutas de front end

app.use('/', express.static(path.resolve('views','home')))
app.use('/login', express.static(path.resolve('views','login')))
app.use('/registro', express.static(path.resolve('views','registro')))
app.use('/components', express.static(path.resolve('views','components')))


module.exports = app