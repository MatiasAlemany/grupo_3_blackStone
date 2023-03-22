const path = require('path');
const { body } = require('express-validator');
const sequelize = require ("sequelize"); //<------------ para usar Op
const db = require('../database/models/index.js');
//const Op = sequelize.Op;

async function imageValidatorMiddleware (req,res,next){
 
  const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];
 
  var remerasTodas =  await db.Productos.findAll();

 if (!req.file){
    
  return res.render("index.ejs", { allProducts: remerasTodas ,
    errors:{ pieForm: { msg: 'Debe cargar una imagen'}},
     oldData : req.body}) ; 
 } 
  const ext = path.extname(req.file.originalname);

  if (!extensionesValidas.includes(ext)) {
 
 return res.render("index.ejs", { allProducts: remerasTodas ,
    errors:{ pieForm: { msg: 'Cargar archivos JPG, JPEG, PNG Y GIF'}},
     oldData : req.body}) ; 
 } 
    // Si todo es correcto, continuar al siguiente middleware o ruta

    next();

}

module.exports = imageValidatorMiddleware;