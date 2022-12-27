
// requerimos el archivo con la imagen y los datos de las remeras
const data = require('../data/dataRemeras');

// requerimos path para poder enviar los archivos HTML
const path = require("path");


//creamos el objeto literal con los metodos a exportar
const mainController = {
           // manejo del pedido get con ruta /
           index: (req, res) => {
                return res.render ('index.ejs');
           },

           detalleProd: (req, res) => {
               return res.render('productDetail');
          },
          detalleCarrito: (req, res) => {
               return res.render('product-cart');
          },

          allProducts: (req, res) => {
               return res.render('index.ejs', {'allProducts':data});
          }


}

module.exports = mainController;