const DatabaseClient = require("../../util/database");
const { Transaction } = require("../../util/database");

/**
 * With this method, it create new products
 */
const getOrderById = (orderId) => {
  return new Promise(async (resolve, reject) => {
    const client = DatabaseClient.getClient;
    try {
      const order = (
        await client.query(
          `SELECT * FROM restaurant_order WHERE id = ${orderId}`
        )
      ).rows[0];
      resolve(order);
    } catch (e) {
      reject(e);
    }
  });
};

/**
 * With this method, it create new products
 */
const createOrder = (order) => {
  return new Promise((resolve, reject) => {
    //  On End
    const onEnd = (error, response) => {
      if (error) return reject(error);
      resolve(response);
    };

    Transaction(onEnd, (client, commit, rollback) => {
      addOrder(client, order)
        .then((id) => {
          order.id = id;
          addOrderedProducts(client, order)
            .then(() => {
              commit(id);
            })
            .catch(rollback);
        })
        .catch(rollback);
    });
  });
};

const addOrder = (client, order) => {
  return new Promise((resolve, reject) => {
    client
      .query(
        "INSERT INTO restaurant_order(order_state, entry_hour, starting_hour, ending_hour, delivery_hour, in_charge, duration) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;",
        [
          order.orderState,
          order.entryHour,
          order.startingHour,
          order.endingHour,
          order.deliveryHour,
          order.inCharge,
          order.duration,
        ]
      )
      .then((res) => {
        resolve(res.rows[0].id);
      })
      .catch(reject);
  });
};

const addOrderedProducts = async (client, order) => {
  for (const prod of order.products) {
    await client.query(
      "INSERT INTO product_order(order_id, product_id, quantity) VALUES ($1, $2, $3);",
      [order.id, prod.id, prod.quantity]
    );
  }
};

const updateValues = async (orderId, columns, values) => {
  //await DatabaseClient.getClient.query(
  //  `UPDATE restaurant_order SET ${column} = $1 WHERE id=${orderId};`,
  //  [value]
  //);
  await DatabaseClient.getClient.query(
    getUpdateQuery(orderId, columns),
    values
  );
};

const getUpdateQuery = (orderId, columns) => {
  const query = ["UPDATE restaurant_order"];
  query.push("SET");

  // Create another array storing each set command
  // and assigning a number value for parameterized query
  const set = [];

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i];
    set.push(column + " = ($" + (i + 1) + ")");
  }

  query.push(set.join(", "));

  // Add the WHERE statement to look up by id
  query.push(`WHERE id=${orderId};`);

  // Return a complete query string
  return query.join(" ");
};

module.exports = {
  getOrderById: getOrderById,
  createOrder: createOrder,
  updateValues: updateValues,
};
