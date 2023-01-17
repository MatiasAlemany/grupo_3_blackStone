const fs = require("fs");

// requerimos el archivo con la imagen y los datos de las remeras
//const data = require('../data/dataRemeras');

// requerimos path para poder enviar los archivos HTML
const path = require("path");
const { json } = require("express");

/* En la constante "remeras" ya tenemos los productos que están 
guardados en la carpeta data como Json (un array de objetos literales) */
//const remerasFilePath = path.join(__dirname, "../data/dataRemeras.json");
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");
//const remeras = JSON.parse(fs.readFileSync(remerasFilePath, "utf-8"));
const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

const userController = {

crearUsuario: (req, res) => {
    
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

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
      let id = usuariosJS[usuariosJS.length - 1].id + 1; // para que no se reiptaid al eliminar y agregar

      console.log(id);

      let user = {
        id: id,
        nombreYapellido: req.body.nombreYapellido,
        nombreUsuario: req.body.nombreUsuario,
        imagenUsuario: req.file ? req.file.filename : " ",
        email: req.body.email,
        clave: req.body.clave,
        rol: "usuario",
      };

      console.log(user);

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

  crearAdmin: (req, res) => {
    
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

    //primero chequeamos que el usuario no exista, lo que no se debe repetir es el email
    for (let i = 0; i < usuariosJS.length; i++) {
      if (
        usuariosJS[i].email == req.body.email && usuariosJS[i].rol == "usuario") {
        return res.send("el administrador con este email ya existe");
      }
    }
    if (req.body.clave == req.body.confirmarClave) {
      // si clave y confirmar clave coinciden creamos el nuevo usuario
      //let id=usuariosJS.length + 1;// el id sera +1 de la longuitud actual
      let id = usuariosJS[usuariosJS.length - 1].id + 1; // para que no se reiptaid al eliminar y agregar

      console.log(id);

      let user = {
        id: id,
        nombreYapellido: req.body.nombreYapellido,
        nombreUsuario: req.body.nombreUsuario,
        imagenUsuario: req.file ? req.file.filename : " ",
        email: req.body.email,
        clave: req.body.clave,
        rol: "administrador",
      };

      console.log(user);

      usuariosJS.push(user); // agrego el usuario creado en el archivo js

      let usuariosJSON = JSON.stringify(usuariosJS, null, " "); 
      //convierto el js en JSON
      fs.writeFileSync("src/data/usuarios.json", usuariosJSON, "utf-8");
       // vuelvo a crear el archivo JSON
      return res.send("administrador guardado correctamente");
    } else {
      return res.send("la clave no coincide");
    }
  },


  listarUsuarios: (req, res) => {
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

    //hacemos array de usuarios solamente
    const usuariosSolos = usuariosJS.filter(
      (user) => user.rol != "administrador"
    );

    return res.render("./usuarios/listaUsuarios.ejs", { 'usuariosSolos': usuariosSolos});
  },


  listarTodos: (req, res) => {
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));


    return res.render("./usuarios/listaTodosUsuarios.ejs", { 'usuariosSolos': usuariosJS});
  },




  editarUsuario : (req, res) => {
               
    let id = req.params.id;
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

    console.log("entro en editar  " + id);

    let usuarioFiltrado = usuariosJS.find(user => {
         return user.id == id;
    });
   

    res.render("./usuarios/formUsuario.ejs", {'usuario': usuarioFiltrado})
},

    procesoEdicionUsuario: (req, res) => {
      const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
      let id = req.params.id;

      console.log("entro en editar  " + id);

      let usuarioAnterior = usuariosJS.find( user => {
        return user.id == id;
      });

      console.log(usuarioAnterior);

      let usuarioEditado = {
        id: usuarioAnterior.id,
        nombreYapellido: req.body.nombreYapellido,
        nombreUsuario: req.body.nombreUsuario,
        imagenUsuario: req.file ? req.file.filename : usuarioAnterior.imagenUsuario,
        email: req.body.email,
        clave: req.body.clave,
        rol: "usuario"
      };
      console.log(usuarioEditado);
      /* "PUSHEANDO" El archivo editado */

      let indice = usuariosJS.findIndex((user) => {
        return user.id == id;
      });

    usuariosJS[indice] = usuarioEditado;

    /* Sobreescribir el archivo JSON */
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuariosJS, null, " "));
   
    res.redirect("/listaUsuarios"); 
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

  eliminarCualquiera: (req, res) => {          
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
    let id = req.params.id;
    console.log("entro en borrar  " + id);
    let usuariosFiltrados = usuariosJS.filter(user => {
         return user.id != id
    })
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuariosFiltrados, null, " "));
     res.redirect("/listaTodosUsuarios"); 
    },

};
module.exports = userController;