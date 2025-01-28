//paso 1: hacer el router
//router: registrar POST, GET, DELETE
const userRouter = require('express').Router();
const User = require('../models/user'); 

//registrar la informacion que el usuario envia atraves del formulario
userRouter.post('/', (request, response) => {
  const { name, email, password, password2 } = request.body;
  console.log(name, email, password, password2);

  if (!name || !email || !password || !password2) {
    //console.log('si')
    return response
      .status(400)
      .json({ error: 'Todos los campos son requeridos' });
  } else {

    //guardar en la bd
    let usuario = new User();

    usuario.nombre = name;
    usuario.correo = email;
    usuario.password = password;

    async function guardarUsuario() {
        await usuario.save();
        const usuarios = await User.find();
        console.log(usuarios)
    }

    guardarUsuario().catch(console.error);


    return response
      .status(200)
      .json({ msg: 'Se ha creado el nuevo usuario correctamente' });
  }
});

//consultar usuario
userRouter.get('/consultar-user',async(req,res)=>{

})

//obtener lista de usuarios
userRouter.get('lista-users',async(req,res)=>{

})

//editar usuario
userRouter.post('edit-user',async(req,res)=>{

})

//eliminar usuario
userRouter.post('eliminar-user',async(req,res)=>{
  
})

module.exports = userRouter;
