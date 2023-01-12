let express = require ('express');

let router = express.Router();

//importamos el controlador de las rutas por defecto
const indexController = require ("../controllers/indexController.js");


//en vez de app.get , utilizamos router.get . Esto va guardando en router
//las distintas rutas, que luego exportamos

//Renderiza la pagina creacion producto
router.get ('/creacionProduct', indexController.creacionProd);

//Procesa la creacion del producto
router.post ('/creacionProduct', indexController.procesoCreacion)

//exportamos la variable router ya con todas las rutas guardadas, que se usará en app.js
module.exports = router;