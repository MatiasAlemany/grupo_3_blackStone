let express = require ('express');
let router = express.Router();
let multer = require('multer');
let path = require('path')



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/images")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

//importamos el controlador de las rutas por defecto 
const productsController = require ("../controllers/productsController.js");


// ******************* mostrar un producto ************************
//procesa el pedido get con ruta /buscarProd <------ ese nombre va en el action del HTML
router.get ('/buscarProd', productsController.buscarProd);
//procesa el pedido get con ruta /productDetail <------ ese nombre va en el action del HTML
router.get ('/productDetail/:id', productsController.detalleProd);

// *********************** Crear un producto **************************
//Renderiza la pagina creacion producto
router.get ('/creacionProduct', productsController.creacionProd);
//Procesa la creacion del producto
router.post ('/creacionProduct', upload.single("imagenProducto"),productsController.procesoCreacion)


// ********************* Devolver todos los productos *********************** 
//procesa el pedido get con ruta /
router.get ('/listadoProductos/:id', productsController.listarProd);
//procesa el pedido get con ruta /
router.get ('/listarProdBuscado', productsController.listarProdBuscado);


// ************************** Editar un producto **************************
//Renderiza la pagina de editar producto 
router.get ('/edicionProduct/:id', productsController.edicionProd);
//Renderiza la pagina de editar producto 
router.get ('/edicionProduct/:id', productsController.edicionProd);
//Procesa la edicion del producto
router.put('/edicionProduct/:id', upload.single("imagenProducto"), productsController.procesoEdicion);


// ************************** Eliminar un producto **************************
//Elimina el producto
router.delete('/delete/:id', productsController.destroy);

// ************************* muestra el carrito de compras *************************
//procesa el pedido get con ruta /product-cart  <------ ese nombre va en el action del HTML
router.get ('/product-cart', productsController.detalleCarrito);



//exportamos la variable router ya con todas las rutas guardadas, que se usará en app.js
module.exports = router;