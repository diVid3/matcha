// Form switch for login -> register and vice versa.
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginFormRegister = document.getElementsByClassName('login-form-register')[0];
const registerFormLogin = document.getElementsByClassName('register-form-login')[0];

loginFormRegister.addEventListener('click', () => {
  loginForm.classList.toggle('hide-form');
  registerForm.classList.toggle('hide-form');
});

registerFormLogin.addEventListener('click', () => {
  registerForm.classList.toggle('hide-form');
  loginForm.classList.toggle('hide-form');
});

// TODO: Front-end UX validation.
// TODO: Backend registration rejection.

// Register form constants.
// const firstNme = document.getElementById('first-name');
// const lastName = document.getElementById('last-name');
// const username = document.getElementById('username');
// const age = document.getElementById('age');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const registerForm = document.getElementById('register-form');

// registerForm.addEventListener('submit', (element) => {

//   element.preventDefault();
// });