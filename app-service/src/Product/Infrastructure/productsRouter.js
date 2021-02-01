const { Router } = require('express');
const { createProduct, getProducts, createProductCategoriesHandler, createProductTypesHandler } = require('./productController');
const router = Router();

//  api/products/
router.get('/', getProducts);

//  api/products/
router.post('/', createProduct);

//  api/products/categories
router.post('/categories', createProductCategoriesHandler);

//  api/products/types
router.post('/types', createProductTypesHandler);

module.exports = router;