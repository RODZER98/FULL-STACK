require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./controllers/users');


//conexion a la bd
(async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Se conecto exitosamente a MongoDB');
    }catch(error){
        console.log(error);    
    }
})()


//rutas frontend localhost:3000/ es mi ruta raiz
app.use('/',express.static(path.resolve('views','home')));
app.use('/components',express.static(path.resolve('views','components')))
app.use('/registro',express.static(path.resolve('views','registro')))
app.use('/login',express.static(path.resolve('views','login')))
app.use('/images',express.static(path.resolve('img')))

//importante
app.use(express.json());

//rutas backend
app.use('/api/users',userRouter);



module.exports = app;