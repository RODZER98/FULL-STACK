const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');

const datosLogin={
  email:'',
  password:''
}

//console.log(email);
emailInput.addEventListener('input',e=>{
  //valemail = e.target.value;
  datosLogin.email=e.target.value;
  console.log(datosLogin.email);
});

//console.log(email);
passwordInput.addEventListener('input',e=>{
  //valemail = e.target.value;
  datosLogin.password=e.target.value;
  console.log(datosLogin.password);
});


