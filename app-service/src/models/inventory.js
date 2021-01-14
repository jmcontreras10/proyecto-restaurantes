const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Product = require("./product");

const Inventory = sequelize.define("inventory", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  stock: {
    type: Sequelize.INTEGER,
  },
  inventory_adquisition_date: {
    type: Sequelize.DATE,
  },
  inventory_expiry_date: {
    type: Sequelize.DATE,
  },
});

module.exports = Inventory;
