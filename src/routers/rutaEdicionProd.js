let express = require ('express');

let router = express.Router();

//importamos el controlador de las rutas por defecto
const indexController = require ("../controllers/indexController.js");


//en vez de app.get , utilizamos router.get . Esto va guardando en router
//las distintas rutas, que luego exportamos

//Renderiza la pagina de editar producto 
router.get ('/edicionProduct/:id', indexController.edicionProd);
//Procesa la edicion del producto
router.put('/edicionProduct/:id', indexController.procesoEdicion);
//Elimina el producto
router.delete('/delete/:id', indexController.destroy);



//exportamos la variable router ya con todas las rutas guardadas, que se usará en app.js
module.exports = router;