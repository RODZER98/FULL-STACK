//paso 1: hacer el router
//router: registrar POST, GET, DELETE
const userRouter = require('express').Router();

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
    return response
      .status(200)
      .json({ msg: 'Se ha creado el nuevo usuario correctamente' });
  }
});

module.exports = userRouter;
