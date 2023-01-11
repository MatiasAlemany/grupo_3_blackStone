const express = require('express');
const path = require('path');
const app = express();

// MUY IMPORTANTE!!!  para usar el metodo POST
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// indicamos a express usar la plantilla EJS que esta en carpeta views.
app.set('view engine', 'ejs');

//si la ruta por defecto no es /views debemos decirle a node que la carpeta se encuentra
// en otra ruta, para ello usamos:
app.set('views', './src/views');

// o tambien asi :
//app.set('views', path.join(__dirname,'../src/views'));

// usando los recursos estaticos css,images,etc
app.use(express.static('public'));

//importamos los distintos enrutadores
let rutaIndex= require ('./routers/rutaIndex.js');
let rutaDetalleProd = require ('./routers/rutaDetalleProd.js');
let rutaCarritoProd = require ('./routers/rutaCarritoProd.js');
let rutaCreacionProd = require ('./routers/rutaCreacionProd.js');
let rutaEdicionProd = require ('./routers/rutaEdicionProd.js');
let rutaListadoProd = require ('./routers/rutaListadoProd.js');
let rutaLogin = require ('./routers/rutaLogin.js');
let rutaUsuarios = require('./routers/rutaUsuarios.js');
let rutaBuscarProd = require('./routers/rutaBuscarProd.js');
let rutaListarProdBuscado = require ('./routers/rutaListarProdBuscado.js');

// usando los enrutadores importados
app.use(rutaIndex);
app.use(rutaDetalleProd);
app.use(rutaCarritoProd);
app.use(rutaCreacionProd);
app.use(rutaEdicionProd);
app.use(rutaListadoProd);
app.use(rutaLogin);
app.use(rutaUsuarios);
app.use(rutaBuscarProd);
app.use(rutaListarProdBuscado);

// ponemos a escuchar el servidor
app.listen(3030, () =>
console.log('Servidor corriendo en http://localhost:3030')
);

