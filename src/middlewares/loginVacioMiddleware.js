

function loginVacioMiddleware (req, res, next){


    if (req.session.usuarioLogueado){
        
        res.locals.loginVacio = false;// hay alguien por loguearse   
        
        next();
    };
    res.locals.loginVacio = false;
        next(); // no hay nadie por loguerase sigo con next

}

module.exports = loginVacioMiddleware;