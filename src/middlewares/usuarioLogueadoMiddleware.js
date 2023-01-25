const usuariosJS = require('../data/usuarios.js');

function usuarioLogueadoMiddleware (req, res,next){


    if (req.session  && req.session.usuarioLogueado){
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        console.log("entro a usuarioLogueadoMiddleware "+ req.session.usuarioLogueado.email);
        
    }else {
        res.locals.isLogged = false;
/*
        let emailDeCookie = req.cookies.usuarioEmail;
        let usuarioEncontrado = usuariosJS.find(oneUser => oneUser[email] === emailDeCookie);
        if (usuarioEncontrado) {
            req.session.usuarioLogueado = usuarioEncontrado;
        }

*/
    }
    next();
}


module.exports = usuarioLogueadoMiddleware;

