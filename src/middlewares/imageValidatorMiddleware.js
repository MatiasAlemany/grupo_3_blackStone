const path = require('path');
const { body } = require('express-validator');
const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
const ext = path.extname(req.file.originalname);

function imageValidatorMiddleware (req,res,next){

 if (!extensionesValidas.includes(ext)) {
   const error = new Error('Solo se permiten archivos JPG, JPEG, PNG Y GIF');
   error.status = 400;
   return next(error);

 }
else {
    // Si todo es correcto, continuar al siguiente middleware o ruta

    next();
} 
}

module.exports = imageValidatorMiddleware;