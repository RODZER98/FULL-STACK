const navegacion = document.querySelector('#navegacion');

const crearNavHome = ()=>{
    navegacion.innerHTML = `
     <div class="max-w-7xl h-16 mx-auto flex items-center px-4 justify-between">

            <p class="text-blue-50 font-bold text-xl">Restaurant App</p>
    
            <!--movil-->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
    

            <!--pc-->
            <div class="hidden md:flex flex-row gap-4">
                <a href="/login/" class="text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition ease-in-out">Login</a>
                <a href="/registro/" class="text-black bg-white font-bold hover:bg-blue-700 px-4 py-2 rounded-lg transition ease-in-out">Registro</a>
            </div>


        </div>
`
}

//crearNavHome();
//agregar las validaciones para generar la barra de navegacion

if(window.location.pathname === '/'){
    crearNavHome();
}