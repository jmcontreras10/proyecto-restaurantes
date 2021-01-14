const { Router } = require('express');
const { createProduct, getProducts } = require('./productController');
const router = Router();

//  api/products/
router.get('/', getProducts);

//  api/products/
router.post('/', createProduct);

module.exports = router;