const fs = require("fs");
const bcryptjs = require('bcryptjs'); //<--- para encriptar/desencriptar la clave
const { validationResult } = require('express-validator');

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

const devolucionesFilePath = path.join(__dirname, "../data/devoluciones.json");

const devoluciones = JSON.parse(fs.readFileSync(devolucionesFilePath, "utf-8"));

const userController = {

  verFormulario : (req, res) => {
    return res.render ("./usuarios/registroUsuario.ejs", );
},


crearUsuario: (req, res) => {
  const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

  const resultadosValidacion = validationResult(req);


  //console.log(resultadosValidacion.errors.length);
  //console.log("entro a crear usuario");

  if (resultadosValidacion.errors.length > 0) {
    //console.log("entro");
    return res.render("index.ejs", { 
      allProducts: remeras ,
      errors: resultadosValidacion.mapped(),
      oldData: req.body
    });
  }
  
  // primero chequeamos que no haya campos en blanco en blanco
  /*
  if (
    req.body.nombreUsuario == "" || req.body.nombreYapellido == "" || req.body.email == "" || req.body.clave == "") {
    return res.render("index.ejs", { allProducts: remeras ,
      errors:{ 
        pieForm: { msg: 'debe ingresar los datos requeridos'},
        email : { msg: 'debe ingresar email'},
        nombreYapellido: { msg: 'debe ingresar nombre y apellido'},
        clave : { msg: 'debe ingresar clave'},
        nombreUsuario:{ msg: 'debe confirmar clave'},
        confirmarClave:{ msg: 'debe ingresar los datos requeridos'},
      },
      oldData: req.body
       }) ; 
    } else {
 */
  //segundo  chequeamos que el usuario no exista, lo que no se debe repetir es el email
  for (let i = 0; i < usuariosJS.length; i++) {
    if (
      usuariosJS[i].email == req.body.email && usuariosJS[i].rol == "usuario") {

      return res.render("index.ejs", { allProducts: remeras ,
        errors:{ email: { msg: 'el usuario con este email ya existe'}}  }) ; 
    }
  }
  if (req.body.clave == req.body.confirmarClave) {
    // si clave y confirmar clave coinciden creamos el nuevo usuario
    //let id=usuariosJS.length + 1;// el id sera +1 de la longuitud actual
    let id = usuariosJS[usuariosJS.length - 1].id + 1; // para que no se reiptaid al eliminar y agregar

    let user = {
      id: id,
      nombreYapellido: req.body.nombreYapellido,
      nombreUsuario: req.body.nombreUsuario,
      imagenUsuario: req.file ? req.file.filename : " ",
      email: req.body.email,
      clave: bcryptjs.hashSync (req.body.clave, 10),  // <------------ se encripta la clave
      rol: "usuario",
    };

    usuariosJS.push(user); // agrego el usuario creado en el archivo js

    let usuariosJSON = JSON.stringify(usuariosJS, null, " "); 
    //convierto el js en JSON
    fs.writeFileSync("src/data/usuarios.json", usuariosJSON, "utf-8");
     // vuelvo a crear el archivo JSON
    return res.render("index.ejs", { allProducts: remeras ,
      errors:{ pieForm: { msg: 'el usuario ' + req.body.nombreYapellido +'  se creo correctamente'}},
      oldData: req.body }) ; 

  } else {
    return res.render("index.ejs", { allProducts: remeras ,
      errors:{ confirmarClave: { msg: 'la clave no coincide'}}  }) ; 
  }
    
  },

  crearAdmin: (req, res) => {
    
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));

    const resultadosValidacion = validationResult(req);
    //console.log(resultadosValidacion.errors.length);
    //console.log("entro a crear usuario");
    
    
    let todos = usuariosJS;


    if (resultadosValidacion.errors.length > 0) {
      console.log("entro crear admin");
			return res.render("./usuarios/listaTodosUsuarios", { 
        usuariosSolos: todos,
				errors: resultadosValidacion.mapped(),
				oldData: req.body
			});
		}

    //primero chequeamos que el usuario no exista, lo que no se debe repetir es el email
    for (let i = 0; i < usuariosJS.length; i++) {
      if (
        usuariosJS[i].email == req.body.email && usuariosJS[i].rol == "usuario") {
        //return res.send("el administrador con este email ya existe");
        return res.render("index.ejs", { allProducts: remeras ,
          errors:{ email: { msg: 'el administrador con este email ya existe'}}  }) ; 


      }
    }
    if (req.body.clave == req.body.confirmarClave) {
      // si clave y confirmar clave coinciden creamos el nuevo usuario
      //let id=usuariosJS.length + 1;// el id sera +1 de la longuitud actual
      let id = usuariosJS[usuariosJS.length - 1].id + 1; // para que no se reiptaid al eliminar y agregar

      
      let user = {
        id: id,
        nombreYapellido: req.body.nombreYapellido,
        nombreUsuario: req.body.nombreUsuario,
        imagenUsuario: req.file ? req.file.filename : " ",
        email: req.body.email,
        clave:bcryptjs.hashSync (req.body.clave, 10),  // <------------ se encripta la clave ,
        rol: "administrador",
      };

      usuariosJS.push(user); // agrego el usuario creado en el archivo js

      let usuariosJSON = JSON.stringify(usuariosJS, null, " "); 
      //convierto el js en JSON
      fs.writeFileSync("src/data/usuarios.json", usuariosJSON, "utf-8");
       // vuelvo a crear el archivo JSON
       return res.render("./usuarios/listaTodosUsuarios.ejs", { usuariosSolos: usuariosJS,
        errors:{ pieForm: { msg: 'el administrador '+req.body.nombreYapellido+' se creo correctamente'}},
        oldData : req.body}) ; 
      
    } else {
      return res.render("./usuarios/listaTodosUsuarios.ejs", { usuariosSolos: usuariosJS ,
        errors:{ confirmarClaveA: { msg: 'la clave no coincide'}}  }) ; 
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

    //console.log("entro en editar  " + id);

    let usuarioFiltrado = usuariosJS.find(user => {
         return user.id == id;
    });
   

    res.render("./usuarios/formUsuario.ejs", {'usuario': usuarioFiltrado})
},

    procesoEdicionUsuario: (req, res) => {
      const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
      let id = req.params.id;

      //console.log("entro en editar  " + id);

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
      //console.log(usuarioEditado);
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
  //console.log("entro en borrar  " + id);


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


    crearDevolucion: (req, res) => {

      const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
      const resultadosValidacion = validationResult(req);

       if (resultadosValidacion.errors.length > 0) { // <---- verificamos resultados de validacion
      return res.render("index.ejs", {               // con array en ruta usuarios o middleware de ruta
      allProducts: remeras ,
      errors: resultadosValidacion.mapped(),
      oldData: req.body
      });
      };

    //primero chequeamos que el usuario no exista, lo que no se debe repetir es el email
    for (let i = 0; i < usuariosJS.length; i++) {
       //console.log (usuariosJS [i].email, req.body.email);


       if (req.body.email == usuariosJS[i].email && req.body.clave == usuariosJS[i].clave && usuariosJS[i].rol == "usuario"){

        //console.log ("entro");
            // si clave y confirmar clave coinciden creamos la nueva devolucion
            //let id=usuariosJS.length + 1;// el id sera +1 de la longuitud actual
            let id = devoluciones[devoluciones.length - 1].id + 1; // para que no se reiptaid al eliminar y agregar
      
            //console.log(id);
      
            let user = {
              id: id,
              nombreYapellido: req.body.nombreYapellido,
              email: req.body.email,
              numeroDeFactura: req.body.numeroDeFactura,
              clave: req.body.clave,
              rol: "usuario",
            };
      
            //console.log(user);
      
            devoluciones.push(user); // agrego el usuario creado en el archivo js
      
            let devolucionesJSON = JSON.stringify(devoluciones, null, " "); 
            //convierto el js en JSON
            fs.writeFileSync("src/data/devoluciones.json", devolucionesJSON, "utf-8");
             // vuelvo a crear el archivo JSON
            return res.send("usuario guardado correctamente");
          } 
          
        }
        return res.send("el usuario con este email no existe");
    
  },
       
      listaDevolucion:

      (req, res) => {
        const devoluciones = JSON.parse(fs.readFileSync(devolucionesFilePath, "utf-8"));
    
        //hacemos array de las devoluciones solamente
        const devolucionesSolas = devoluciones.filter(
          (user) => user.rol == "administrador"
        );
    
        return res.render("./usuarios/listaUsuariosDevolucion.ejs", {
          devolucionesSolas: devolucionesSolas});

        //res.send(devoluciones);
      },

      claveIncorrecta: (req, res) => {
        const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
        for (let i = 0; i < usuariosJS.length; i++) {
        if (req.body.email == usuariosJS[i].email){

      //return res.render("./usuarios/formClaveIncorrecta.ejs")
      return res.render('formClaveIncorrecta')
           }    
}
}
}
module.exports = userController;