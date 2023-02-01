const usuariosJS = require('../data/usuarios.js');

function usuarioLogueadoMiddleware (req, res,next){

    if (req.session  && req.session.usuarioLogueado){ 
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
        
    }else {
        res.locals.isLogged = false;
        let emailDeCookie = req.cookies.usuarioEmail;

        for (let i = 0; i < usuariosJS.length; i++) {

            if ( emailDeCookie == usuariosJS[i].email  && usuariosJS[i].rol == "usuario") {

                res.locals.isLogged = true; //<------------- ahora hay un usuario logeado , el que esta en la cookie 

                req.session.usuarioLogueado = usuariosJS[i] ; //<--------  debo cargar el usuario que encontré
                res.locals.usuarioLogueado = req.session.usuarioLogueado; //  en locals para que lo muestre el ejs
            
             };
        };  
    };
    next();
}


module.exports = usuarioLogueadoMiddleware;

