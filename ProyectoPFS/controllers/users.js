//paso 1: hacer el router
//router: registrar POST, GET, DELETE
const userRouter = require('express').Router();

//registrar la informacion que el usuario envia atraves del formulario
userRouter.post('/',(request,response)=>{
    const {name,email,password} = request.body;
    console.log(name,email,password);
})

module.exports = userRouter;

