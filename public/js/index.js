const navToggle = document.querySelector(".abrir-menu");
const menu = document.querySelector(".menu");

navToggle.addEventListener("click", () => {
  menu.classList.toggle("menu_visible");

  if (menu.classList.contains("menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});