const express = require ('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')

//importamos el controlador de las rutas por defecto
const productsController = require('../controllers/productsController.js');

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

//Renderiza la pagina de editar producto 
router.get ('/edicionProduct/:id', productsController.edicionProd);
//Procesa la edicion del producto
router.put('/edicionProduct/:id', upload.single("imagenProducto"), productsController.procesoEdicion);
//Elimina el producto
router.delete('/delete/:id', productsController.destroy);



//exportamos la variable router ya con todas las rutas guardadas, que se usará en app.js
module.exports = router;