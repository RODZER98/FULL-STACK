//key:referencia a lo que voy a utilizar para tener acceso al campo donde voy a guardar
//value: campo donde voy a colocar los valores

//sintaxis para agregar elementos al LS
localStorage.setItem('test','datos de prueba')
sessionStorage.setItem('nombre','rodney')

//si tenemos un objeto
const producto = {
    nombre: 'telefono',
    precio: 300
}

//convertir a string
const productoAString = JSON.stringify(producto)
console.log(productoAString)

localStorage.setItem('producto',productoAString)

//agregar un arreglo al LS
const meses = ['enero','febrero','marzo','abril']

const mesesAString = JSON.stringify(meses)
console.log(mesesAString)
localStorage.setItem('arreglo',mesesAString)