const url = 'http://localhost:3000/menu'

//CRUD

export const nuevoproducto = async producto =>{
    try{
        await fetch(url,{
            method: 'POST',
            body: JSON.stringify(producto),
            headers:{
                'Constent-Type':'application/json'
            }
        })
    }catch(error){
        console.log(error)
    }
}

export const obtenerproductos = async ()=>{
    //me retorna listado de productos que encuentran en el endpoint
    //localhost:3000
    try{
        const resultado = await fetch(url)
        const productos = await resultado.json()
        return productos
    }catch(error){
        console.log(error)
    }
}

export const obtenerproducto = async id=>{
    //me retorna 1 producto que se encuentran
    //en el endpoint de menu localhost:3000/menu/id dado un id
    try{
        const resultado = await fetch(`${url}/${id}`)
        const producto = await resultado.json()
        //console.log(producto)
        return producto
    }catch(error){
        console.log(error)
    }
}

export const editarproducto = async producto =>{
    try{
        const resultado = await fetch(`${url}/${producto.id}`,{
            method:'PUT',
            body: JSON.stringify(producto),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const resproducto = await resultado.json()
        return resproducto
    }catch(error){
        console.log(error)
    }
}

export const eliminarproducto = async id =>{
    try{
        await fetch(`${url}/${id}`,{
            method:'DELETE'
        })
    }catch(error){
        console.log(error)
    }
}