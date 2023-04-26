 window.addEventListener("load", function () { 
    
    // Obtén el contenido del carrito del objeto localStorage y conviértelo en un arreglo
var carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Obtén la referencia a la tabla del carrito y su cuerpo (tbody)
var tablaCarrito = document.querySelector("#itemsCarrito");

// Crea una función que agregue un elemento del carrito a la tabla
function agregarElementoAlCarrito(item) {
   
  var fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${tablaCarrito.children.length + 1}</td>
    <td>${item.nombreProducto}</td>
    <td>${item.precio}</td>
    <td>${item.talle} - ${item.colores.join(", ")}</td>
    <td>${item.cantidad}</td>
    
    <td><button class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button></td>
  `;
  tablaCarrito.appendChild(fila);
}

// Agrega los elementos del carrito a la tabla
for (var i = 0; i < carrito.length; i++) {
  agregarElementoAlCarrito(carrito[i]);
}

});