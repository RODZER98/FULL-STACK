const express = require('express');
const app = express();
const mongoose = require('mongoose');


//conexion a la bd
(async()=>{
    try{
        await mongoose.connect()
    }catch(error){
        console.log(error);    
    }
})