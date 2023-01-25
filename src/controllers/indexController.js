const fs = require("fs");
const bcryptjs = require('bcryptjs'); //<--- para encriptar/desencriptar la clave
// requerimos el archivo con la imagen y los datos de las remeras
//const data = require('../data/dataRemeras');

// requerimos path para poder enviar los archivos HTML
const path = require("path");
const { json } = require("express");

const { validationResult } = require('express-validator');

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

  verLogin : (req, res) => {

    //console.log(req.cookie.usuarioEmail)

    return res.render ("./usuarios/loginUsuario.ejs", );
    },




  login: (req, res) => {
    // debe ser usuario y contraseña igual a la de la de usuarios regitrados, si es admin va
    // a la pagina de listado de clientes, sino va a la pag. ppal.
    // si nos es admin puede ser usuario y si esta registrado va al carrito

    // <---------------------- para hacerlo con express-validator --------------------------------------------
    const validacionLogin = validationResult(req);
      


    if (validacionLogin.errors.length > 0 ){
  
        return res. render('index.ejs', {
          allProducts: remeras,
          errors: validacionLogin.mapped(),
          oldData: req.body
      });  
    }

     //<-----------------------------------------------------------------------------------------------------
     for (let i = 0; i < usuariosJS.length; i++) {
      
      const usuarioLogueado = req.body;
    
      // *******************  supervisor  ********************************************
      if (  usuarioLogueado.email == "supervisor@supervisor" && usuarioLogueado.clave == "supervisor"){

        //console.log("entro a supervisor");

            return res.render ("./usuarios/listaTodosUsuarios.ejs", { usuariosSolos: usuariosJS});
      }
      // ************************  administrador  ******************************
      else if (
        usuarioLogueado.email == usuariosJS[i].email && usuarioLogueado.clave == usuariosJS[i].clave && usuariosJS[i].rol == "administrador") {

          //console.log("entro a admin "+ usuarioLogueado.email);

          req.session.usuarioLogueado=usuariosJS[i];
          
        return res.render("./productos/listadoProductos.ejs", {allProducts: remeras});

      //  *******************************  usuario  ******************************
      } else if ( usuarioLogueado.email == usuariosJS[i].email  && usuariosJS[i].rol == "usuario") {

          let comparacion = bcryptjs.compareSync(usuarioLogueado.clave , usuariosJS[i].clave);


          
          
            if (comparacion){  //<----------- comparo claves encriptadas
              
                if(req.body.recordarme) {
                    res.cookie('usuarioEmail', req.body.email, { maxAge: (1000 * 60) * 60 });
                    console.log(req.body.email);
              }
              
            //console.log("entro a usuario  " + usuarioLogueado.email);

             req.session.usuarioLogueado=usuariosJS[i]
        
            //delete req.session.usuarioLogueado.clave; // si no quiero conservar la clave

            return res.redirect ("/" ); //  <--------si ponemos el res.render de abajo  la pagina no actualiza
                                    //devuelve mail de usuario para la pagina ppal
      };
    };
    };
    // *************************  ninguno ****************************

      //console.log("no esta registrado");
      //return res.redirect ("/#inicio-sesion"); // <------------- vuelve al modal login pero sin mensaje
      return res.render("index.ejs", { allProducts: remeras ,
        errors:{ email: { msg: 'Los datos del usuario ingresados antes no son correctos'}}  }) ; 
  },

  logout: (req,res) => {
      //console.log("se borra sesion " );
     res.clearCookie('usuarioEmail');
     req.session.destroy();
      return res.redirect('/');
}


}


module.exports = indexController;
