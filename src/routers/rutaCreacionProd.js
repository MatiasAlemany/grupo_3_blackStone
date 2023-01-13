let express = require ('express');

let router = express.Router();

//importamos el controlador de las rutas por defecto
const productsController = require ("../controllers/productsController.js");


//en vez de app.get , utilizamos router.get . Esto va guardando en router
//las distintas rutas, que luego exportamos

//Renderiza la pagina creacion producto
router.get ('/creacionProduct', productsController.creacionProd);

//Procesa la creacion del producto
router.post ('/creacionProduct', productsController.procesoCreacion)

//exportamos la variable router ya con todas las rutas guardadas, que se usará en app.js
module.exports = router;