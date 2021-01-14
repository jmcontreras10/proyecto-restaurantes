const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Product = require("./product");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    order_state: {
      type: Sequelize.TEXT,
    },
    entry_hour: {
      type: Sequelize.DATE,
    },
    starting_hour: {
      type: Sequelize.DATE,
    },
    ending_hour: {
      type: Sequelize.DATE,
    },
    delivery_hour: {
      type: Sequelize.DATE,
    },
    duration: {
      type: Sequelize.INTEGER,
    },
    in_charge: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

Order.asociate = () => {
  Order.belongsToMany(Product, {
    through: "OrderedProduct",
    as: "product",
    foreignKey: "id_orden",
    otherKey: "id_producto",
  });
};

module.exports = Order;
