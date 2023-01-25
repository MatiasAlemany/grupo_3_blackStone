const path = require('path');
const { body } = require('express-validator');

    module.exports = [
			body('nombreYapellido').notEmpty().withMessage('escribe un nombre'),
			body('nombreUsuario').notEmpty().withMessage('Escribe un nombre de usuario'),
			body('email').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
					.isEmail().withMessage('Escribe un formato de correo válido'),
			body('clave').notEmpty().withMessage('Escribe tu clave'),
			body('confirmarClave').notEmpty().withMessage('Confirma tu clave')
			
]

/*
	const validateRegisterMiddleware = [
	body('nombreYapellido').notEmpty().withMessage('escribe un nombre'),
	body('nombreUsuario').notEmpty().withMessage('Escribe un nombre de usuario'),
	body('email').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
			.isEmail().withMessage('Escribe un formato de correo válido'),
	body('clave').notEmpty().withMessage('Escribe tu clave'),
	body('confirmarClave').notEmpty().withMessage('Confirma tu clave')	
	
]
*/

//module.exports = validateRegisterMiddleware;