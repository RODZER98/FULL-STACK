//console.log('prueba')

const formulario = document.querySelector('#formulario');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const btnRegistro = document.querySelector('#form-btn');

//validar
//validaciones con regex
const emailVal = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/gm;
const nameVal = /^[a-zA-Z]+( [a-zA-Z]+)?$/g;

let valemail = false;
let valpass = false;
let valmatch = false;
let valname = false;

nameInput.addEventListener('input',e=>{
    valname = nameVal.test(e.target.value);
    validar(nameInput,valname);

    /*if(e.target.value === ''){
        nameInput.classList.remove('focus:outline-green-700','outline-4');
        nameInput.classList.remove('focus:outline-red-700','outline-4');
        nameInput.classList.add('focus:outline-blue-600');
    }else{
        nameInput.classList.remove('focus:outline-blue-600');
        nameInput.classList.add('focus:outline-green-700','outline-4');
        valname = true;
    }*/
})

emailInput.addEventListener('input',e=>{
    //console.log(e.target.value);
    valemail = emailVal.test(e.target.value);
    //console.log(valemail);
    validar(emailInput,valemail);
})

passwordInput.addEventListener('input',e=>{
    //console.log(e.target.value);
    valpass = passwordVal.test(e.target.value)
    //console.log(valpass)
    validar(passwordInput,valpass);
    validar(matchInput,valmatch);
})

matchInput.addEventListener('input',e=>{
    //console.log(e.target.value);
    valmatch = e.target.value === passwordInput.value;
    //console.log(valmatch)
    validar(matchInput,valmatch);
    validar(passwordInput,valpass);
})

formulario.addEventListener('submit',e=>{
    e.preventDefault();
    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }
    console.log(newUser);
})

const validar = (input, val) =>{
    btnRegistro.disabled = valname && valemail && valpass && valmatch ? false : false;

    //console.log(valname,valemail,valpass,valmatch);

    if(val){
        //caso de que el test sea true
        input.classList.remove('focus:outline-blue-600');
        input.classList.remove('focus:outline-red-700','outline-4');
        input.classList.add('focus:outline-green-700','outline-4');
    }else if(input.value === ''){
        //caso de que el campo este vacio nuevamente
        input.classList.remove('focus:outline-green-700','outline-4');
        input.classList.remove('focus:outline-red-700','outline-4');
        input.classList.add('focus:outline-blue-600');
    }else{
        //caso de que el test sea false
        input.classList.remove('focus:outline-blue-600');
        input.classList.remove('focus:outline-green-700','outline-4');
        input.classList.add('focus:outline-red-700','outline-4');
    }
}


