const email = document.querySelector('#email-input');
const password = document.querySelector('#password-input');

//console.log(email);
email.addEventListener('input', (e) => {
  //valemail = e.target.value;
  console.log(e.target.value);
});
