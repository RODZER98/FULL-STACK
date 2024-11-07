function miprimerformulario(){
    var form = ""
    var usuario = document.form1.usuario.value
    console.log(usuario)
    var nombre = document.form1.nombre.value
    console.log(nombre)
    var apellido = document.form1.apellido.value
    console.log(apellido)
    var email = document.form1.email.value
    console.log(email)
    var contraseña = document.form1.contraseña.value
    console.log(contraseña)
    var contraseña2 = document.form1.contraseña2.value
    console.log(contraseña2)
    var hobbies = ""
    var pais = document.form1.pais.value
    console.log(pais)
    var sexo = document.form1.sexo.value
    console.log(sexo)
   var b = document.form1.hobby.length
   for(i=0;i<b;i++){
    if (document.form1.hobby[i].checked){
        hobbies+=document.form1.hobby[i].hobby+","
    }
   }

    console.log(hobbies)

    /*while (condition){

    }
    do {

    } while(condition);*/

}

