const fs = require("fs");

// requerimos el archivo con la imagen y los datos de las remeras
//const data = require('../data/dataRemeras');

// requerimos path para poder enviar los archivos HTML
const path = require("path");
const { json } = require("express");

/* En la constante "remeras" ya tenemos los productos que están 
guardados en la carpeta data como Json (un array de objetos literales) */
const remerasFilePath = path.join(__dirname, "../data/dataRemeras.json");
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
const remeras = JSON.parse(fs.readFileSync(remerasFilePath, "utf-8"));
const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

//creamos el objeto literal con los metodos a exportar
const indexController = {
  // manejo del pedido get con ruta /
  index: (req, res) => {
    //return res.render ('index.ejs', {'allProducts':data} ); // data es un archivo js
    return res.render("index.ejs", { allProducts: remeras }); // remeras es un js
  },

  login: (req, res) => {
    // debe ser usuario y contraseña igual a la de la de usuarios regitrados, si es admin va
    // a la pagina de listado de clientes, sino va a la pag. ppal.
    // si nos es admin puede ser usuario y si esta registrado va al carrito

    //console.log(req.body.email);
    for (let i = 0; i < usuariosJS.length; i++) {

      if ( req.body.email == "supervisor@supervisor" && req.body.clave == "supervisor"){
            return res.render ("./usuarios/listaTodosUsuarios.ejs", { 'usuariosSolos': usuariosJS});
      }
      else if (
        req.body.email == usuariosJS[i].email && req.body.clave == usuariosJS[i].clave && usuariosJS[i].rol == "administrador") {
        return res.render("./productos/listadoProductos.ejs", {allProducts: remeras,});
      } else if (
        req.body.email == usuariosJS[i].email && req.body.clave == usuariosJS[i].clave && usuariosJS[i].rol == "usuario") {
        //console.log("entro");
        return res.render("./productos/product-cart", {usuario: usuariosJS[i],}); 
        //devuelve mail de usuario para la pagina de carrito
      }
    }
    //console.log(" NO entro");
    return res.render("index.ejs", { allProducts: remeras });
  },

}
module.exports = indexController;
