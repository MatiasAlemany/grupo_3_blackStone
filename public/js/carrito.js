function productosEnElCarrito() {
    if (localStorage.carrito) {
      return JSON.parse(localStorage.carrito).length;
    } else {
      return 0;
    }
  }
  
  window.addEventListener("load", function () {
    //  Animations initialization 
    //new WOW().init();
  

    /* Toastr Initialization */
    /*
    toastr.options = {
      positionClass: "toast-bottom-right",
      fadeIn: 300,
      fadeOut: 1000,
      timeOut: 5000,
      extendedTimeOut: 1000,
    };
    */
    /* Selecciono todos los productos de la página */
    let botonesComprar = document.querySelectorAll(".agregar_carrito");

    
  
    /* Creo un event listener por cada boton */
    botonesComprar.forEach((producto) => {
      // escuchar el click
      //console.log(botonesComprar);

      producto.addEventListener("click", function (e) {

        console.log(e);
     

    
        // ¿hay carrito en el localstorage?
        if (localStorage.carrito) {
          // veremos que hacemos si  ya hay carrito
          let carrito = JSON.parse(localStorage.carrito);// <-----------tenemos carrito
          // si mi producto esta en el carrito le sumo uno, sino lo agrego con push
          // lo hago con findindex que si encuentra un valor con esa propiedad devuelve el id de esa propiedad
          // y sinó devuelve -1
          let index = carrito.findIndex((prod) => prod.id == e.target.dataset.id); //
          
        

         


          //
          if (index != -1) {
            carrito[index].cantidad = carrito[index].cantidad + 1;   // le sumo uno al carrito
          } else {
            // sino lo agrego con push
            carrito.push({ id: e.target.dataset.id, cantidad: 1 });
          }
          localStorage.setItem("carrito", JSON.stringify(carrito)); 
        } else {
          localStorage.setItem(
            "carrito",
            JSON.stringify([{ id: e.target.dataset.id, cantidad: 1 }])// creamos el carrito con el primer producto
          );
        }
        cartNumber.innerText = productosEnElCarrito();
        //toastr.success("Se agregó este producto al carrito");
      });
    });
  
    /* Numero del carrito */
  
    let cartNumber = document.querySelector(".cart-number");
    cartNumber.innerText = productosEnElCarrito();
    
  });

/* ---------------------------------------------- */

  /* 
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





/*  AGREGAR ESTE CODIGO A LA VISTA DEL CARRITO PARA SUMAR EL ARTICULO

<table>
    <thead>
        <tr>
            <th>Producto</th>
            <th>Talle</th>
            <th>Cantidad</th>
            <th>Colores</th>
        </tr>
    </thead>
    <tbody id="itemsCarrito">
    </tbody>
</table>

*/ 