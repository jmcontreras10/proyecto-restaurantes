const Product = require("../Domain/VOProduct");
const { addElements } = require('../../Shared/Infrastructure/enumDAO');

const {
  getProducts,
  createProducts
} = require("./productDAO");

/**
 * POST: Create a Product
 * @param {Request} req
 * @param {Response} res
 */
const createProducHandler = async (req, res) => {
  const data = req.body;
  const newProducts = data.map((element) =>
      Product(
        "",
        element.name,
        element.type,
        element.category,
        element.imageURL
      ) 
  );
  createProducts(newProducts)
    .then(() => {
      res.json({ message: "Productos creados exitosamente" });
      res.status(201);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500);
    });
};

/**
 * POST: Create new categories
 * @param {*} req
 * @param {*} res
 */
const createProductCategoriesHandler = async (req, res) => {
  const newCategories = req.body;
  addElements(newCategories, 'product_category')
    .then(() => {
      res.json({ message: "Categorias creadas exitosamente" });
      res.status(201);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500);
    });
};

/**
 * POST: Create new categories
 * @param {*} req
 * @param {*} res
 */
const createProductTypesHandler = async (req, res) => {
  const newTypes = req.body;
  addElements(newTypes, 'product_type')
    .then(() => {
      res.json({ message: "Tipos creados exitosamente" });
      res.status(201);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500);
    });
};

/**
 * GET: Get all products list
 * @param {*} req
 * @param {*} res
 */
const getProductsListHandler = async (req, res) => {
  getProducts()
    .then((products) => {
      res.json({
        message: "Hey, received!",
        products: products,
      });
      res.status(200);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = {
  createProduct: createProducHandler,
  getProducts: getProductsListHandler,
  createProductCategoriesHandler: createProductCategoriesHandler,
  createProductTypesHandler: createProductTypesHandler,
};