const Product = require("../Domain/VOProduct");
const { getProducts, createProduct } = require("./productDAO");

/**
 * POST: Create a Product
 * @param {*} req
 * @param {*} res
 */
const createProducHandler = async (req, res) => {
  const { name, type, imageURL } = req.body;
  const newProduct = new Product('', name, type, imageURL);
  createProduct(newProduct).then(()=>{
    res.json({message:'Producto creado exitosamente'});
    res.status(201);
  }).catch(e =>{
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
};
