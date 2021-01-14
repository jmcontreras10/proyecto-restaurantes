const express = require('express');
var logger = require('morgan');


//  Importing Routers
const productRoute = require('./Product/Infrastructure/productsRouter');
const ordersRoute = require('./routes/orders');

const app = express();

//  Middleware
app.use(logger('dev'));
app.use(express.json());

//  Routes
app.use('/api/products', productRoute);
app.use('/api/orders', ordersRoute);

module.exports = app;