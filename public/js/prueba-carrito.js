/* window.addEventListener("load", function () { 
    
    document.getElementById("agregarAlCarritoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se recargue la página
    agregarAlCarrito(); // Llamar a la función para agregar el item al carrito
    mostrarItemsCarrito(); // Actualizar la tabla de items en el carrito
});

  function mostrarItemsCarrito() {
    var carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Obtener los items del carrito del localStorage
    var itemsHtml = ""; // Variable para guardar el HTML de los items del carrito
    for (var i = 0; i < carrito.length; i++) {
        var item = carrito[i];
        var coloresHtml = ""; // Variable para guardar el HTML de los colores del item
        for (var j = 0; j < item.colores.length; j++) {
            coloresHtml += "<span class='color " + item.colores[j] + "'></span>";
        }
        itemsHtml += "<tr>";
        itemsHtml += "<td>" + item.producto + "</td>";
        itemsHtml += "<td>" + item.talle + "</td>";
        itemsHtml += "<td>" + item.cantidad + "</td>";
        itemsHtml += "<td>" + coloresHtml + "</td>";
        itemsHtml += "</tr>";
    }
    document.getElementById("itemsCarrito").innerHTML = itemsHtml; // Actualizar la tabla con los items del carrito
}

}); */