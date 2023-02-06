// middleware para verificar formulario de devolucion de producto


const path = require('path');
const { body } = require('express-validator');

	const devolverMiddleware = [
	body('nombreYapellido').notEmpty().withMessage('Escribe un nombre'),
	body('email').notEmpty().withMessage('Tienes que escribir tu mail').bail()
			   .isEmail().withMessage('Escribe un formato de correo válido'),
    body('numeroDeFactura').notEmpty().withMessage('Escribe el numero de la factura'),        
	body('clave').notEmpty().withMessage('Escribe tu clave'),
	body('confirmarClave').notEmpty().withMessage('Confirma tu clave')	
	
]
console.log("entro a devolverMiddleware");

module.exports = devolverMiddleware;