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


const db = require('../database/models/index.js');
const Op = db.sequelize.Op;


const userController = {

  verFormulario : (req, res) => {
    return res.render ("./usuarios/registroUsuario.ejs", );
},

   // ************************************************************************************************************************    
    crearUsuario : function (req,res) {
            db.Usuarios.create({
              nombre_y_apellido: req.body.nombreYapellido,
              nombre_usuario: req.body.nombreUsuario,
              uri_avatar: req.file ? req.file.filename : " ",
              email: req.body.email,
              clave: bcryptjs.hashSync (req.body.clave, 10),  // <------------ se encripta la clave
              rol: "usuario",
        }).then(() => {
        console.log("usuario creado");
        return res.render("index.ejs", { allProducts: remeras ,
          errors:{ pieForm: { msg: 'el usuario ' + req.body.nombreYapellido +'  se creo correctamente'}},
          oldData: req.body }) ;   
        
      })
        .catch(err => {
            res.send("el email ya existe")
        })
        
     },  
     
// ***************************************************************************************************************************
  crearAdmin: async (req, res) => {
    
    var usuariosBD = await db.Usuarios.findAll();

    const resultadosValidacion = validationResult(req);
    //console.log(resultadosValidacion.errors.length);
    //console.log("entro a crear usuario");
      
    let todos = usuariosBD;

    if (resultadosValidacion.errors.length > 0) {
      console.log("entro crear admin");
			return res.render("./usuarios/listaTodosUsuarios", { 
        usuariosSolos: todos,
				errors: resultadosValidacion.mapped(),
				oldData: req.body
			});
		}

    //primero chequeamos que el usuario no exista, lo que no se debe repetir es el email
    for (let i = 0; i < usuariosBD.length; i++) {
      if (
        usuariosBD[i].email == req.body.email && usuariosBD[i].rol == "administrador") {
        //return res.send("el administrador con este email ya existe");

        return res.render("./usuarios/listaTodosUsuarios.ejs", { usuariosSolos: usuariosBD,
          errors:{ pieForm: { msg: 'el administrador '+ req.body.nombreYapellido+' ya existe'}},
           oldData : req.body}) ; 


        //return res.render("index.ejs", { allProducts: remeras ,
          //errors:{ email: { msg: 'el administrador con este email ya existe'}}  }) ; 


      }
    }
    if (req.body.clave == req.body.confirmarClave) {
      // si clave y confirmar clave coinciden creamos el nuevo usuario
      //let id=usuariosJS.length + 1;// el id sera +1 de la longuitud actual
      //  ------>    let id = usuariosJS[usuariosJS.length - 1].id + 1; // para que no se repita al eliminar y agregar

      /*
      let user = {
        id: id,
        nombre_y_apellido: req.body.nombreYapellido,
        nombre_usuario: req.body.nombreUsuario,
        uri_avatar: req.file ? req.file.filename : " ",
        email: req.body.email,
        clave:bcryptjs.hashSync (req.body.clave, 10),  // <------------ se encripta la clave ,
        rol: "administrador",
      };
      */
      // creo el administrador
      //usuariosJS.push(user); // agrego el usuario creado en el archivo js

      //let usuariosJSON = JSON.stringify(usuariosJS, null, " "); 
      //convierto el js en JSON
      //fs.writeFileSync("src/data/usuarios.json", usuariosJSON, "utf-8");
       // vuelvo a crear el archivo JSON
       db.Usuarios.create({
        nombre_y_apellido: req.body.nombreYapellido,
        nombre_usuario: req.body.nombreUsuario,
        uri_avatar: req.file ? req.file.filename : " ",
        email: req.body.email,
        clave: bcryptjs.hashSync (req.body.clave, 10),  // <------------ se encripta la clave
        rol: "administrador",
       }).then(() => {
                  return res.render("./usuarios/listaTodosUsuarios.ejs", { usuariosSolos: usuariosBD,
                          errors:{ pieForm: { msg: 'el administrador '+ req.body.nombreYapellido+' se creo correctamente'}},
                           oldData : req.body}) ; 
       }).catch(err => {
        res.send(err);
    })
    } else {
      return res.render("./usuarios/listaTodosUsuarios.ejs", { usuariosSolos: usuariosJS ,
        errors:{ confirmarClaveA: { msg: 'la clave no coincide'}}  }) ; 
    }
  },

// ****************************************************************************************************************
  listarUsuarios: (req, res) => {
    db.Usuarios.findAll({
      where : { rol : "usuario"},  //<---- busco en la tabla usuarios si existe el mail que viene del body
      raw : true,      // <-------  se agrega para que no traiga todos los metadatos que no usamos
    }).then(usuarios => {
      
    return res.render("./usuarios/listaUsuarios.ejs", { 'usuariosSolos': usuarios});
  }) .catch(err => {  
    res.send(err)
    });
  },

  // ****************************************************************************************************************
  listarTodos: (req, res) => {
    //const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    db.Usuarios.findAll({
     // where : { rol : "usuario"},  //<---- busco en la tabla usuarios si existe el mail que viene del body
      raw : true      // <-------  se agrega para que no traiga todos los metadatos que no usamos
    }).then(usuariosTodos => {

    return res.render("./usuarios/listaTodosUsuarios.ejs", { 'usuariosSolos': usuariosTodos});
  }).catch(err => {  
    res.send(err)
    });
  },


// ***********************************************************************************************************
    editarUsuario : (req, res) => {
      db.Usuarios.findByPk(req.params.id)
        .then(usuarioFiltrado => {
          res.render("./usuarios/formUsuario.ejs", {'usuario': usuarioFiltrado})
          });
},

// ************************************************************************************************************************
    procesoEdicionUsuario: (req, res) => {
         console.log(req.body);

      db.Usuarios.update({
            nombre_y_apellido: req.body.nombre_y_apellido,
            nombre_usuario: req.body.nombre_usuario,
            uri_avatar: req.body.uri_avatar,
            email: req.body.email,
            clave: bcryptjs.hashSync (req.body.clave, 10),  // <------------ se encripta la clave
            rol: "usuario"
            },
            {where : { id : req.params.id } //<--------- el id viene en la url 

      }).then(function(usuario){

        console.log(usuario);

        res.redirect("/listaUsuarios"); 

      }).catch(err => {
        res.send(err)
     })    
    },

// ***********************************************************************************************************************
  eliminarUsuario: function (req,res) {
    let usuarioId = req.params.id;
    db.Usuarios.destroy({where: {id: usuarioId}, force: true}) // force: true es para asegurar que se ejecute la acción
    .then(()=>{
        return res.redirect('/listaUsuarios')})
    .catch(error => res.send(error)) 
},

// *********************************************************************************************************************
  eliminarCualquiera: (req, res) => {          
    let usuarioId = req.params.id;
    db.Usuarios.destroy({where: {id: usuarioId}, force: true}) // force: true es para asegurar que se ejecute la acción
    .then(()=>{
     return res.redirect("/listaTodosUsuarios")}) 
     .catch(error => res.send(error)) 
    },

// **********************************************************************************************************************
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
            let id = devoluciones[devoluciones.length - 1].id + 1; // para que no se repita al eliminar y agregar
      
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
       

  // *****************************************************************************************************************
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

    // ********************************************************************************************************
      formClaveIncorrecta : (req, res) => {
        console.log(req.body.email);
        return res.render("./usuarios/formClaveIncorrecta.ejs")


      },

      // *******************************************************************************************************
      claveIncorrecta: (req, res) => {
        const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
        for (let i = 0; i < usuariosJS.length; i++) {
          console.log(req.body.email);
        if (req.body.email == usuariosJS[i].email){

      //return res.render("./usuarios/formClaveIncorrecta.ejs")
      return res.render('./usuarios/formClaveIncorrecta')
           }    
}
}
}
module.exports = userController;