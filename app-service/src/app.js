const express = require('express');
var logger = require('morgan');


//  Importing Routers
const productRoute = require('./Product/Infrastructure/productsRouter');
const ordersRoute = require('./Order/Infrastructure/ordersRouter');

const app = express();

//  Middleware
//  Cors middelware [ Done ]
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    }
    else {
        next()
    }
});

app.use(logger('dev'));
app.use(express.json());

//  Routes
app.use('/api/products', productRoute);
app.use('/api/orders', ordersRoute);

module.exports = app;