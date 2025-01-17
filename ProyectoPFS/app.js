require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');


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

module.exports = app;