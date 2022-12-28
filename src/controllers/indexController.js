
// requerimos el archivo con la imagen y los datos de las remeras
const data = require('../data/dataRemeras');

// requerimos path para poder enviar los archivos HTML
const path = require("path");


//creamos el objeto literal con los metodos a exportar
const indexController = {
           // manejo del pedido get con ruta /
          index: (req, res) => {
                return res.render ('index.ejs', {'allProducts':data} );
                
           },

          detalleProd: (req, res) => {
               const { id } = req.params;

               const listaProductos = data.filter((prod) => prod.id == id);
    
               if(listaProductos.length) return res.render('productDetail', {'allProducts': data});
               res.send("Not Found"); 
               
          },

          detalleCarrito: (req, res) => {
               return res.render('product-cart');
          },



}

module.exports = indexController;