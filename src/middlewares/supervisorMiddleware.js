

function supervisorMiddleware (req,res,next){
    
    console.log("entro a supervisorMiddleware");

    if (req.session  && req.session.usuarioLogueado){
           
        if (req.session.usuarioLogueado== "supervisor@supervisor" ){
                   
            next();  
        
    };
};
        return res.send ("No tienes los privilegios para ingresar");      
  
};

module.exports = supervisorMiddleware;