
const fs = require('fs');

// requerimos el archivo con la imagen y los datos de las remeras
//const data = require('../data/dataRemeras');

// requerimos path para poder enviar los archivos HTML
const path = require("path");
const { json } = require('express');

/* En la constante "remeras" ya tenemos los productos que están 
guardados en la carpeta data como Json (un array de objetos literales) */
const remerasFilePath = path.join(__dirname, '../data/dataRemeras.json');
const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const remeras = JSON.parse(fs.readFileSync(remerasFilePath, 'utf-8'));
const usuariosJS = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

//creamos el objeto literal con los metodos a exportar
const indexController = {
           // manejo del pedido get con ruta /
          index: (req, res) => {
                //return res.render ('index.ejs', {'allProducts':data} ); // data es un archivo js
                return res.render ('index.ejs', {'allProducts':remeras} ); // remeras es un js
           },

          detalleProd: (req, res) => {
               const { id } = req.params;
               //let idProd = req.params.id;

               //const listaProductos = data.filter((prod) => prod.id == id);
               const listaProductos = remeras.filter((prod) => prod.id == id);
    
               if(listaProductos.length) return res.render('./productos/productDetail', {'allProducts': listaProductos});
               res.send("Not Found"); 
               
          },
          login: (req, res) => {
               // debe ser usuario y contraseña igual a la de la de usuarios regitrados, si es admin va
               // a la pagina de listado de clientes, sino va a la pag. ppal.    
                // si nos es admin puede ser usuario y si esta registrado va al carrito

                 //console.log(req.body.email);
               for (let i=0; i<usuariosJS.length; i++){            
                    if(req.body.email==usuariosJS[i].email && req.body.clave==usuariosJS[i].clave && usuariosJS[i].rol=="administrador" ){
                         return res.render('./productos/listadoProductos.ejs', {'allProducts':remeras} );             
                    }else if (req.body.email==usuariosJS[i].email && req.body.clave==usuariosJS[i].clave && usuariosJS[i].rol=="usuario"){
                         //console.log("entro");
                         return res.render('./productos/product-cart',{usuario:usuariosJS[i].email});  //devuelve mail de usuario para la pagina de carrito  
                    } 
                 }  
                 //console.log(" NO entro");   
                 return res.render('index.ejs', {'allProducts':remeras}); 
               },

               
          crearUsuario : (req, res) => {
               //primero chequeamos que el usuario no exista, lo que no se debe repetir es el email
               
               for (let i=0; i<usuariosJS.length; i++){            
                    if(usuariosJS[i].email==req.body.email && usuariosJS[i].rol=="usuario" ){
                         return res.send("el usuario con este email ya existe");
                    } 
               }                   
               if(req.body.clave == req.body.confirmarClave){
                    // si clave y confirmar clave coinciden creamos el nuevo usuario   
                    let id=usuariosJS.length + 1;// el id sera +1 de la longuitud actual
                   
                    let user={"id":id,
                              "nombreYapellido":req.body.nombreYapellido,
                              "nombreUsuario":req.body.nombreUsuario,
                              "fechaNacimiento":req.body.fechaNacimiento,
                              "email":req.body.email,
                              "clave":req.body.clave,
                              "rol":"usuario"};   
                  
                    usuariosJS.push(user);// agrego el usuario creado en el archivo js

                    let usuariosJSON= JSON.stringify(usuariosJS);//convierto el js en JSON
                    fs.writeFileSync('src/data/usuarios.json', usuariosJSON, 'utf-8');// vuelvo a crear el archivo JSON
                    
                    return res.send("usuario guardado correctamente");                   
               } else {
                    return res.send ("la clave no coincide");
               }     
          },


          buscarProd: (req, res) => {
               // en loBuscado esta la descripcion que viene del formulario html
               let loBuscado = req.query.buscar;
               //creo array vacio donde pondremos los productos encontrado
               let resultadoBuscar = [];
               // recorremos las remeras buscando coincidencia
               for (let i=0; i<remeras.length; i++){
                    if (remeras[i].descripcion.includes(loBuscado)){
                         resultadoBuscar.push(remeras[i]);
                    }
               }
               // si el array resultadoBuscar no es cero lo mostramos    
               if(resultadoBuscar.length) return res.render('./productos/listarProdBuscado', {'allProducts': resultadoBuscar});
               // sinó indicamos que no hay productos que coincidan
               res.send("No hay productos que coincidan con la busqueda");             
          },




          detalleCarrito: (req, res) => {
               return res.render('./productos/product-cart', {usuario:"usuario no registrado"});
          },

          edicionProd: (req, res) => {
               const remeras = JSON.parse(fs.readFileSync(remerasFilePath, 'utf-8'));
               const { id } = req.params;

               const listaProductos = remeras.find(prod => {
                    return prod.id == id
                    });
               
               res.render('./productos/edicionProduct', {'allProducts': listaProductos});
               

               //return res.render('./productos/edicionProduct');
          },

          procesoEdicion: (req, res) => {
               const remeras = JSON.parse(fs.readFileSync(remerasFilePath, 'utf-8'));

		     let id = req.params.id;
		     let productoAnterior = remeras.find(producto => {
			return producto.id == id
		})

               let productoEditado = {
                         id: productoAnterior.id,
                         nombre: req.body.nombre,
                         img: productoAnterior.img,
                         descripcion: req.body.descripcion,
                         precio: req.body.precio,
                         descuento: req.body.descuento,
                         cuotas: req.body.cuotas,
                 }
               
               /* "PUSHEANDO" El archivo editado */
               
               let indice = remeras.findIndex(product => {
                    return product.id == id
               })

               remeras[indice] = productoEditado;

               /* Sobreescribir el archivo JSON */
               fs.writeFileSync(remerasFilePath, JSON.stringify(remeras, null, " "));
		     res.redirect("/login");

          },

          destroy: (req, res) => {
          let id = req.params.id;
		const remeras = JSON.parse(fs.readFileSync(remerasFilePath, 'utf-8'));
          
		let productosFiltrados = remeras.filter(producto => {
			return producto.id != id
		})
          
		fs.writeFileSync(remerasFilePath, JSON.stringify(productosFiltrados, null, " "));

		 res.redirect("/login"); 
          },

          creacionProd: (req, res) => {
               return res.render('./productos/creacionProduct');
          },
          listarProd: (req, res) => {
               //return res.render ('./productos/listadoProductos.ejs', {'allProducts':data} );
               return res.render ('./productos/listadoProductos.ejs', {'allProducts':remeras} );

          },

          listarProdBuscado: (req, res) => {
               //return res.render ('./productos/listadoProductos.ejs', {'allProducts':data} );
               return res.render ('./productos/listarProdBuscado.ejs', {'allProducts':remeras} );


          }



}

module.exports = indexController;