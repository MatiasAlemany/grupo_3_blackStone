let express = require ('express');
let router = express.Router();
let multer = require('multer');
let path = require('path')

//importamos el controlador de las rutas por defecto
const productsController = require ("../controllers/productsController.js");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

//en vez de app.get , utilizamos router.get . Esto va guardando en router
//las distintas rutas, que luego exportamos

//Renderiza la pagina creacion producto
router.get ('/creacionProduct', productsController.creacionProd);

//Procesa la creacion del producto
router.post ('/creacionProduct', upload.single("imagenProducto"),productsController.procesoCreacion)

//exportamos la variable router ya con todas las rutas guardadas, que se usará en app.js
module.exports = router;