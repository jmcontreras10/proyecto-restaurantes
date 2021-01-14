const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OrderedProduct = sequelize.define("order_product", {
  order_id: {
    type: Sequelize.INTEGER
  },
  product_id: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderedProduct;
  