require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');


//conexion a la bd
(async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI_TEST);
        console.log('Se conecto exitosamente a MongoDB');
    }catch(error){
        console.log(error);    
    }
})()

module.exports = app;