const fs = require("fs");

// requerimos path para poder enviar los archivos HTML
const path = require("path");
const { json } = require("express");
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");

function adminMiddleware (req,res,next){
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    console.log("entro a adminMiddleware");
    //console.log(req.body.email);
    //console.log(req.session.usuarioLogueado);
    if (req.session.usuarioLogueado){
    for (let i = 0; i < usuariosJS.length; i++) {
         if (
             req.session.usuarioLogueado.email == usuariosJS[i].email && req.session.usuarioLogueado.clave == usuariosJS[i].clave && usuariosJS[i].rol == "administrador"){
             //console.log("cumplio condicion");        
            next();  
        };
    };
};
        return res.send ("No tienes los privilegios para ingresar");      
  
};

module.exports = adminMiddleware;