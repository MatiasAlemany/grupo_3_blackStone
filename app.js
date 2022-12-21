const express = require('express');

const path = require('path');

const app = express();


app.use(express.static('public'))

app.listen(3030, () =>
console.log('Servidor corriendo en http://localhost:3030')
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/product-cart', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/product-cart.html'));
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/productDetail.html'));
});


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/register.html'));
 });
/*
app.get('/hopper', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/hopper.html'));
});

app.get('/lovelace', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/lovelace.html'));
});

app.get('/turing', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/turing.html'));
});
*/
