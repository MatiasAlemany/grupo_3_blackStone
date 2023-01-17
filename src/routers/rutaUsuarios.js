let express = require ('express');
let multer = require('multer');
let router = express.Router();
let path = require('path');

//importamos el controlador de las rutas por defecto
const userController = require ("../controllers/userController.js");


//********************** usamos multer para archivos,imagenes,etc ********************

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images/usuarios")// se parte siempre de la raiz del proyecto a donde se guardaran los archivos
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage})


//en vez de app.get , utilizamos router.get . Esto va guardando en router
//las distintas rutas, que luego exportamos

// ****************** mostrar un usuario ***********************


// ************** listar todos los usuarios ********************
//procesa el pedido get con ruta /listaUsuarios  <------ ese nombre va en el action del HTML
router.get ('/listaUsuarios', userController.listarUsuarios);



// *************** crear un usuario *************
//procesa el pedido post con ruta /listaUsuarios    <------ ese nombre va en el action del HTML
router.post ('/listaUsuarios/', upload.single("imagenUsuario"), userController.crearUsuario);
//procesa el pedido post con ruta /formUsuario ------> ese nombre va en el action del HTML
router.put ('/listaUsuarios/:id', userController.editarUsuario);

// ******************* crear administrador *********************
router.post ('/listaTodosUsuarios',upload.single("imagenUsuario"), userController.crearAdmin);
//procesa el pedido post con ruta /listaTodosUsuarios    <------ ese nombre va en el action del HTML
router.get ('/listaTodosUsuarios', userController.listarTodos);


// ************ editar un usuario ***********************
//procesa el pedido get con ruta /formUsuario ------> ese nombre va en el action del HTML
router.get ('/formUsuario/:id', userController.editarUsuario);
//procesa el pedido post con ruta /formUsuario ------> ese nombre va en el action del HTML
router.put ('/formUsuario/:id', upload.single("imagenUsuarioEditada"), userController.procesoEdicionUsuario);


// *************** eliminar un usuario *********************
//procesa el pedido delete con ruta /listaUsuarios  <------ ese nombre va en el action del HTML
router.delete ('/listaUsuarios/:id', userController.eliminarUsuario);

// *************** eliminar un administrador o usuario *********************
//procesa el pedido delete con ruta /listaTodosUsuarios  <------ ese nombre va en el action del HTML
router.delete ('/listaTodosUsuarios/:id', userController.eliminarCualquiera);


//exportamos la variable router ya con todas las rutas guardadas, que se usará en app.js
module.exports = router;