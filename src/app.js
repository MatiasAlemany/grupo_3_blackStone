const express = require('express');
const path = require('path');
const app = express();

// indicamos a express usar la plantilla EJS que esta en carpeta views
app.set('view engine', 'ejs');
//si la ruta por defecto no es /views/partials
//app.set('views', './carpeta/partials')

// usando los recursos estaticos css,images,etc
app.use(express.static('public'));

//importamos los distintos enrutadores
let rutaIndex= require ('./routers/rutaIndex.js');
let rutaDetalleProd = require ('./routers/rutaDetalleProd.js');
let rutaCarritoProd = require ('./routers/rutaCarritoProd.js');

// usando los enrutadores importados
app.use(rutaIndex);
app.use(rutaDetalleProd);
app.use(rutaCarritoProd);

// ponemos a escuchar el servidor
app.listen(3030, () =>
console.log('Servidor corriendo en http://localhost:3030')
);