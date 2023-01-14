let express = require ('express');

let router = express.Router();

//importamos el controlador de las rutas por defecto
const indexController = require ("../controllers/indexController.js");

//en vez de app.get , utilizamos router.get . Esto va guardando en router
//las distintas rutas, que luego exportamos

//procesa el pedido get con ruta /listaUsuarios  <------ ese nombre va en el action del HTML
router.get ('/listaUsuarios', indexController.listarUsuarios);
//router.get ('/listaUsuarios' , indexController.editarUsuario);
//procesa el pedido post con ruta /listaUsuarios    <------ ese nombre va en el action del HTML
router.post ('/listaUsuarios', indexController.crearUsuario);

//procesa el pedido delete con ruta /
//router.get ('/listaUsuarios' , indexController.editarUsuario);
//router.put ('/editarUsuario/:id', indexController.editarUsuario);


//procesa el pedido delete con ruta /
router.delete ('/listaUsuarios/:id', indexController.eliminarUsuario);



//exportamos la variable router ya con todas las rutas guardadas, que se usará en app.js
module.exports = router;