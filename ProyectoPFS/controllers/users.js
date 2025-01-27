//paso 1: hacer el router
//router: registrar POST, GET, DELETE
const userRouter = require('express').Router();

//registrar la informacion que el usuario envia atraves del formulario
userRouter.post('/',(request,response)=>{
    const {name,email,password} = request.body;
    console.log(name,email,password);

    if(!name || !email || !password){
        //console.log('si')
        return response.status(400).json({error:'Todos los campos son requeridos'});
    }
})

module.exports = userRouter;

