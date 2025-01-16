const navegavion = document.querySelector('#navegacion')

const crearNavLogin = ()=>{
    navegavion.innerHTML = `
    <div class="flex text-white font-bold items-center h-16  justify-between px-4" >
            <p>restaurant app</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 md:hidden">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              


            <!--menu pc-->

            <div class="md:flex gap-4 hidden">
               
                <a href="/registro/" class="text-black font-bold bg-white hover:bg-blue-700 py-2 px-4 rounded-lg hover:text-white">Registro</a>
            </div>

            <!--menu movil-->
            <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 items-center justify-center flex-col hidden">
                
                <a href="/registro/" class="text-black font-bold bg-white hover:bg-blue-700 py-2 px-4 rounded-lg hover:text-white">Registro</a>
            </div>
        </div>
`
}

const crearNavHome = ()=>{
    navegavion.innerHTML = `
    <div class="flex text-white font-bold items-center h-16  justify-between px-4" >
            <p>restaurant app</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 md:hidden">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              


            <!--menu pc-->

            <div class="md:flex gap-4 hidden">
                <a href="/login/" class="text-white font-bold hover:bg-blue-700 py-2 px-4 rounded-lg">Login</a>
                <a href="/registro/" class="text-black font-bold bg-white hover:bg-blue-700 py-2 px-4 rounded-lg hover:text-white">Registro</a>
            </div>

            <!--menu movil-->
            <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 items-center justify-center flex-col hidden">
                <a href="/login/" class="text-white font-bold hover:bg-blue-700 py-2 px-4 rounded-lg">Login</a>
                <a href="/registro/" class="text-black font-bold bg-white hover:bg-blue-700 py-2 px-4 rounded-lg hover:text-white">Registro</a>
            </div>
        </div>
`
}

const crearNavRegistro = ()=>{
    navegavion.innerHTML = `
    <div class="flex text-white font-bold items-center h-16  justify-between px-4" >
            <p>restaurant app</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 md:hidden">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              


            <!--menu pc-->

            <div class="md:flex gap-4 hidden">
                <a href="/login/" class="text-white font-bold hover:bg-blue-700 py-2 px-4 rounded-lg">Login</a>
                
            </div>

            <!--menu movil-->
            <div class="bg-blue-900/60 fixed top-16 right-0 left-0 bottom-0 items-center justify-center flex-col hidden">
                <a href="/login/" class="text-white font-bold hover:bg-blue-700 py-2 px-4 rounded-lg">Login</a>
                
            </div>
        </div>
`
}

//agregar la ruta para los componentes
if(window.location.pathname === '/'){
    //crear la barra de navegacion para la pagina del home
    crearNavHome()
}else if(window.location.pathname === '/login/'){
    crearNavLogin()
}else if(window.location.pathname === '/registro/'){
    crearNavRegistro()
}