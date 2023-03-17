window.addEventListener('load', function() {

  const navToggle = document.querySelector(".abrir-menu");
  const menu = document.querySelector(".menu");
  
  navToggle.addEventListener("click", () => {
    menu.classList.toggle("menu_visible");
  
    if (menu.classList.contains("menu_visible")) {
      navToggle.setAttribute("aria-label", "Cerrar menú");
    } else {
      navToggle.setAttribute("aria-label", "Abrir menú");
    }
  
  })
  
  let botonEnvio = document.querySelector("#btn-envio");
  let inputEmail =document.querySelector('#form-control');
  let inputClave = document.querySelector("#clave-login")
  let registerForm = document.querySelector(".form-login");
  let errorNombre = document.querySelector(".errorNombre");
  let errorClave = document.querySelector(".errorClave");
  
    botonEnvio.addEventListener('click', function(e){
              e.preventDefault();
              let errors = {}
              if(inputEmail.value.length < 1){
                  errors.email = 'Escriba su email';
              }
  
              if (inputClave.value.length < 1){
                errors.clave = "Escriba su contraseña";
              }
              if(Object.keys(errors).length >= 1){
                  errorNombre.innerText = (errors.email) ? errors.email : ''; 
                  errorClave.innerText = (errors.clave) ? errors.clave : '';
              } else {
              registerForm.submit();
              }
    })
  
  
  
  });