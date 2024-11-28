const cargarAPI = document.querySelector('#cargarAPI')
cargarAPI.addEventListener('click',cargarDatosAPI)
    
    function cargarDatosAPI(){
        const url = 'https://picsum.photos/list'
        fetch(url)
        .then(respuesta=>{
            console.log(respuesta)
            return respuesta.json()//es un arreglo
        }).then(datos=>{
            console.log(datos)
            mostrarHTMLAF(datos)
        }).catch(error=>{
            console.log(error)
        })
    }

    
    function mostrarHTMLAF(data){
        const contenido = document.querySelector('#contenido')
        let texto = ''
        data.forEach(i=>{
            const{author,post_url} = i
    
        texto += `
        <p>Autor: ${author}</p>
        <a href=${post_url}>Ver Imagen</a>
        `
        })
    
        contenido.innerHTML = texto
    }
