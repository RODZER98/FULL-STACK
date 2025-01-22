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

emailInput.addEventListener('input',e=>{
    console.log(e.target.value);
    valemail = emailVal.test(e.target.value)
    console.log(valemail)
})

passwordInput.addEventListener('input',e=>{
    console.log(e.target.value);
})

matchInput.addEventListener('input',e=>{
    console.log(e.target.value);
})