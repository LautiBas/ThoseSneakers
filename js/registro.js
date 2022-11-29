let nombre = document.getElementById(`nombre`);
let apellido = document.getElementById(`apellido`);
let email = document.getElementById(`email`);
let contraseña = document.getElementById(`contraseña`);
let btnEnviar = document.getElementById(`enviar`);

btnEnviar.addEventListener(`click`, () => {
  localStorage.setItem(`nombre`, nombre.value);
  localStorage.setItem(`apellido`, apellido.value);
  localStorage.setItem(`email`, email.value);
  localStorage.setItem(`contraseña`, contraseña.value);
});
