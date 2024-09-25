/*
Realizar una calculadora para que tenga las opciones:
1.- Suma
2.- Resta
3.- Multiplicacion
4.- Dividir 
5.- Salir

Tener en cuenta que el menu se debe repetir hasta que el usuario indique la opcion para salir
*/

//Definir las variables
let op, n1, n2, resultado, res=true



do{
    op=parseInt(prompt("Calculadora: Ingrese una opcion \n1.suma\n2.resta\n3.multiplicar\n4.dividir\n5.salir"))
    console.log(op)
    switch(op){
    case "1":
        n1=
        //caso suma
        console.log('suma')
        break;

    case "2":
        //caso resta
        console.log('resta')
        break;

    case "3":
        //caso multiplicacion
        console.log('multiplicacion')
        break;

    case "4":
        //caso division
        console.log('division')
        break;
    
    case "5":
        //caso salir
        console.log('salir')
        res=false
        break;
    
    default:
        //caso default
        console.log('opcion invalida')
        break;
    }
}while(res)

/*if(op==1){
    else if(op==2){

    }else if(op==3){

    }else{
    }
}*/