const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT||9000;
app.listen(port,()=> console.log('server listen on port',port))

//GET,POST,DELETE,UPDATE
//CRUD = CREATE,READ,UPDATE,DELETE
app.get('/',(req,res)=>{
    res.send('Bienvenido al servidor')
})

//conexion mongo db
mongoose
.connect(process.env.MONGODB_URI)
.then(()=>console.log('Te has conectado a Mongodb'))
.catch((error)=>console.error(error))