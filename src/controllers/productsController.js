const fs = require("fs");

// requerimos el archivo con la imagen y los datos de las remeras
//const data = require('../data/dataRemeras');

// requerimos path para poder enviar los archivos HTML
const path = require("path");
const { json } = require("express");

/* Requerimos propiedad validationResult para poder validar campos de form */
const {validationResult, body} = require('express-validator');

/* En la constante "remeras" ya tenemos los productos que están 
guardados en la carpeta data como Json (un array de objetos literales) */
const remerasFilePath = path.join(__dirname, "../data/dataRemeras.json");
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
const remeras = JSON.parse(fs.readFileSync(remerasFilePath, "utf-8"));
//const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

/* BASE DE DATOS */
  const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");
const Productos = db.Productos


//creamos el objeto literal con los metodos a exportar
const productsController = {
  // manejo del pedido get con ruta /

  detalleProd: (req, res) => {
    const { id } = req.params;
    //let idProd = req.params.id;

    //const listaProductos = data.filter((prod) => prod.id == id);
    const listaProductos = remeras.filter((prod) => prod.id == id);

    if (listaProductos.length)
      return res.render("./productos/productDetail", {
        allProducts: listaProductos,
      });
    res.send("Not Found");
  },

  detalleCarrito: (req, res) => {
    return res.render("./productos/product-cart", {
      usuario: "usuario no registrado",
    });
  },

  edicionProd: (req, res) => {
    const { id } = req.params;

    Productos.findByPk(req.params.id)
    .then(Productos => {
      res.render("./productos/edicionProduct", {Productos})
      
    });

  },

  procesoEdicion: async (req, res) => {
    let productoId = req.params.id;

    await Productos
    .update(
      {
      id: req.body.id,
      nombre: req.body.nombre,
      imagenUsuario: req.body.img,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      descuento: req.body.descuento,
      talle: req.body.talle,
      color: req.body.color,
      uri_foto2: req.body.uri_foto2,
      uri_foto3: req.body.uri_foto3
    },
    {
      where: {id: productoId}
    })
     return res.redirect("/")

  },
  
  buscarProd: (req, res) => {
    // en loBuscado esta la descripcion que viene del formulario html
    let loBuscado = req.query.buscar;
    //creo array vacio donde pondremos los productos encontrado
    let resultadoBuscar = [];
    // recorremos las remeras buscando coincidencia
    for (let i = 0; i < remeras.length; i++) {
      if (remeras[i].descripcion.includes(loBuscado)) {
        resultadoBuscar.push(remeras[i]);
      }
    }
    // si el array resultadoBuscar no es cero lo mostramos
    if (resultadoBuscar.length)
      return res.render("./productos/listarProdBuscado", {
        allProducts: resultadoBuscar,
      });
    // sinó indicamos que no hay productos que coincidan
    res.send("No hay productos que coincidan con la busqueda");
  },

  destroy: async (req, res) => {
    let id = req.params.id;

    await Productos
    .destroy({where: {id: id}, force: true}) // force: true es para asegurar que se ejecute la acción
    .then(()=>{
        return res.redirect('/')})

  },

  creacionProd: (req, res) => {
    return res.render("./productos/creacionProduct");
  },

  procesoCreacion: async (req, res) => {
    /* const remeras = JSON.parse(fs.readFileSync(remerasFilePath, "utf-8")); */
    let errors = validationResult(req);

    if(errors.isEmpty()){
 await Productos.create({
      nombre: req.body.nombre,
      img: req.body.img,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      descuento: req.body.descuento,
      talle: req.body.talle,
      color: req.body.color,
      uri_foto2: req.body.uri_foto2,
      uri_foto3: req.body.uri_foto3
    })
    .then
    res.redirect("/");
    } else {
      console.log(Productos.PRIMARY)
     return res.render("./productos/creacionProduct", 
			{errors: errors.array(),
			old: req.body })
    }
  },

  listaProduct: (req, res) => {
    //return res.render ('./productos/listadoProductos.ejs', {'allProducts':data} );
    return res.render("./productos/listadoProductos.ejs", {
      allProducts: remeras,
    });
  },

  listarProd: (req, res) => {
    //return res.render ('./productos/listadoProductos.ejs', {'allProducts':data} );
    return res.render("./productos/listadoProductos.ejs", {
      allProducts: remeras,
    });
  },

  listarProdBuscado: (req, res) => {
    //return res.render ('./productos/listadoProductos.ejs', {'allProducts':data} );
    return res.render("./productos/listarProdBuscado.ejs", {
      allProducts: remeras,
    });
  },
};

module.exports = productsController;
