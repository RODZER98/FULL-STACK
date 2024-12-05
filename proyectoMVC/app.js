require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//conexion a BD
(async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Conexion a BD correcta')
    } catch(error) {
        console.log(error)
    }
})()