const Product = require("../Domain/VOProduct");
const DatabaseClient = require("../../util/database");

/**
 * With this method, it get all products in the Database
 */
const getProducts = () => {
  return new Promise((resolve, reject) => {
    DatabaseClient.getClient
      .query("SELECT * FROM product;")
      .then((results) => {
        products = [];
        results.rows.map((row) => {
          products.push(
            new Product(row.id, row.product_name, row.product_type, row.product_image)
          );
        });
        resolve(products);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * With this method, it create new products
 */
const createProduct = (product) => {
  return new Promise((resolve, reject) => {
    DatabaseClient.getClient
      .query(
        "INSERT INTO product(product_name, product_type, product_image) VALUES ($1, $2, $3);",
        [product.productName, product.productType, product.productImage]
      ).then(()=>{
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
};

module.exports = {
  getProducts: getProducts,
  createProduct: createProduct,
};
