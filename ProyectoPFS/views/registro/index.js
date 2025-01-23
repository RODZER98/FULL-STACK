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

let valemail = false;
let valpass = false;
let valmatch = false;

emailInput.addEventListener('input',e=>{
    //console.log(e.target.value);
    valemail = emailVal.test(e.target.value)
    //console.log(valemail)

    validar(emailInput,valemail);
})

passwordInput.addEventListener('input',e=>{
    //console.log(e.target.value);
    valpass = passwordVal.test(e.target.value)

    validar(passwordInput,valpass);
    validar(matchInput,valmatch);
})

matchInput.addEventListener('input',e=>{
    //console.log(e.target.value);
    valmatch = e.target.value === passwordInput.value;
    validar(matchInput,valmatch);
    validar(passwordInput,valpass);
})

const validar = (input, val) =>{
    if(val){
        //caso de que el test sea true
        input.classList.remove('focus:outline-blue-600');
        input.classList.add('outline-green-700','outline-4');
    }else{
        //caso de que el test sea false
        input.classList.remove('focus:outline-blue-600');
        input.classList.remove('outline-green-700','outline-4');
        input.classList.add('outline-red-700','outline-4');
    }
}