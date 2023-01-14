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
      if (
        req.body.email == usuariosJS[i].email && req.body.clave == usuariosJS[i].clave && usuariosJS[i].rol == "administrador") {
        return res.render("./productos/listadoProductos.ejs", {allProducts: remeras,});
      } else if (
        req.body.email == usuariosJS[i].email && req.body.clave == usuariosJS[i].clave && usuariosJS[i].rol == "usuario") {
        //console.log("entro");
        return res.render("./productos/product-cart", {usuario: usuariosJS[i].email,}); 
        //devuelve mail de usuario para la pagina de carrito
      }
    }
    //console.log(" NO entro");
    return res.render("index.ejs", { allProducts: remeras });
  },

  crearUsuario: (req, res) => {
    //primero chequeamos que el usuario no exista, lo que no se debe repetir es el email

    for (let i = 0; i < usuariosJS.length; i++) {
      if (
        usuariosJS[i].email == req.body.email && usuariosJS[i].rol == "usuario") {
        return res.send("el usuario con este email ya existe");
      }
    }
    if (req.body.clave == req.body.confirmarClave) {
      // si clave y confirmar clave coinciden creamos el nuevo usuario
      //let id=usuariosJS.length + 1;// el id sera +1 de la longuitud actual
      let id = usuariosJS[usuariosJS.length - 1] + 1; // para que no se reiptaid al eliminar y agregar

      let user = {
        id: id,
        nombreYapellido: req.body.nombreYapellido,
        nombreUsuario: req.body.nombreUsuario,
        fechaNacimiento: req.body.fechaNacimiento,
        email: req.body.email,
        clave: req.body.clave,
        rol: "usuario",
      };

      usuariosJS.push(user); // agrego el usuario creado en el archivo js

      let usuariosJSON = JSON.stringify(usuariosJS, null, " "); 
      //convierto el js en JSON
      fs.writeFileSync("src/data/usuarios.json", usuariosJSON, "utf-8");
       // vuelvo a crear el archivo JSON
      return res.send("usuario guardado correctamente");
    } else {
      return res.send("la clave no coincide");
    }
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

  listarUsuarios: (req, res) => {
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

    //hacemos array de usuarios solamente
    const usuariosSolos = usuariosJS.filter(
      (user) => user.rol != "administrador"
    );

    return res.render("./usuarios/listaUsuarios.ejs", {
      usuariosSolos: usuariosSolos,
    });
    //res.send(usuariosJS);
  },

  editarUsuario : (req, res) => {
               
    let id = req.params.id;
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

    console.log("entro en editar  " + id);

    let usuarioFiltrado = usuariosJS.find(user => {
         return user.id == id
    })
   

    res.render("./usuarios/formUsuario.ejs", {'usuario': usuarioFiltrado})
},

eliminarUsuario: (req, res) => {
               
  const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
  
  let id = req.params.id;
  console.log("entro en borrar  " + id);


  let usuariosFiltrados = usuariosJS.filter(user => {
       return user.id != id
  })
  
  fs.writeFileSync(usuariosFilePath, JSON.stringify(usuariosFiltrados, null, " "));

   res.redirect("/listaUsuarios"); 
  },



};

module.exports = indexController;
