const fs = require("fs");

// requerimos path para poder enviar los archivos HTML
const path = require("path");
const { json } = require("express");
const usuariosFilePath = path.join(__dirname, "../data/usuarios.json");

function supervisorMiddleware (req,res,next){
    const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, "utf-8"));
    console.log("entro a supervisorMiddleware");

    if (req.session.usuarioLogueado){
    for (let i = 0; i < usuariosJS.length; i++) {
         if (usuarioLogueado.email == "supervisor@supervisor" 
             && usuarioLogueado.clave == "supervisor"){
                   
            next();  
        };
    };
};
        return res.send ("No tienes los privilegios para ingresar");      
  
};

module.exports = supervisorMiddleware;