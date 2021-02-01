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
            Product(
              row.id,
              row.product_name,
              row.product_type,
              row.product_category,
              row.product_image
            )
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
const createProducts = (products) => {
  return new Promise((resolve, reject) => {
    const client = DatabaseClient.getClient;
    products.forEach((product) => {
      client
        .query(
          "INSERT INTO product(product_name, product_type, product_category, product_image) VALUES ($1, $2, $3, $4);",
          [
            product.productName,
            product.productType,
            product.productCategory,
            product.productImage,
          ]
        )
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};



module.exports = {
  getProducts: getProducts,
  createProducts: createProducts
};
