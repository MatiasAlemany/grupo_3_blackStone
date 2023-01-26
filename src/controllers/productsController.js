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
    const remeras = JSON.parse(fs.readFileSync(remerasFilePath, "utf-8"));
    const { id } = req.params;

    const listaProductos = remeras.find((prod) => {
      return prod.id == id;
    });

    res.render("./productos/edicionProduct", { allProducts: listaProductos });

    //return res.render('./productos/edicionProduct');
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

  
  procesoEdicion: (req, res) => {
    const remeras = JSON.parse(fs.readFileSync(remerasFilePath, "utf-8"));

    let id = req.params.id;
    let productoAnterior = remeras.find((producto) => {
      return producto.id == id;
    });

    let productoEditado = {
      id: productoAnterior.id,
      nombre: req.body.nombre,
      imagenUsuario: req.file ? req.file.filename : productoAnterior.img,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      descuento: req.body.descuento,
      cuotas: req.body.cuotas,
    };

    /* "PUSHEANDO" El archivo editado */

    let indice = remeras.findIndex((product) => {
      return product.id == id;
    });

    remeras[indice] = productoEditado;

    /* Sobreescribir el archivo JSON */
    fs.writeFileSync(remerasFilePath, JSON.stringify(remeras, null, " "));
    res.redirect("/login");
  },

  destroy: (req, res) => {
    let id = req.params.id;
    const remeras = JSON.parse(fs.readFileSync(remerasFilePath, "utf-8"));

    let productosFiltrados = remeras.filter((producto) => {
      return producto.id != id;
    });

    fs.writeFileSync(
      remerasFilePath,
      JSON.stringify(productosFiltrados, null, " ")
    );

    res.redirect("/login");
  },

  creacionProd: (req, res) => {
    return res.render("./productos/creacionProduct");
  },

  procesoCreacion: (req, res) => {
    const remeras = JSON.parse(fs.readFileSync(remerasFilePath, "utf-8"));
    let errors = validationResult(req);

    if(errors.isEmpty()){
    let productoNuevo = {
      id: remeras[remeras.length - 1].id + 1,
      nombre: req.body.nombre,
      imagenUsuario: req.file ? req.file.filename : "Carga tu foto",
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      descuento: req.body.descuento,
      cuotas: req.body.cuotas,
    };

    /* PUSHEANDO El archivo editado */
    remeras.push(productoNuevo);

    /* Sobreescribir el archivo JSON */
    fs.writeFileSync(remerasFilePath, JSON.stringify(remeras, null, " "));
    res.redirect("/login");
    }else {
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
