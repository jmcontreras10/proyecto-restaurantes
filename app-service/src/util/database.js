const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

/**
 * Handles a transaction with the same connection of the pool
 * @param {function(Error,value} transactionCallback function to call after commit or rollback is invoked, is also called when a connection error ocurrs
 * function(error, response) => void
 * @param {function(Client, function():void, function():void):void} transactionFunction functionfunction(client, commit, rollback) => void
 */
const Transaction = (transactionCallback, transactionFunction) => {
  //Transaction start
  client.query("BEGIN", (error) => {
    //Transaction handling functions
    const rollback = (error) => {
      client.query("ROLLBACK", (rollbackError) => {
        if (rollbackError) {
          transactionCallback(rollbackError);
        } else {
          transactionCallback(error);
        }
      });
    };

    const commit = (value) => {
      client.query("COMMIT", (error) => {
        transactionCallback(error, value);
      });
    };

    //Transaction body execution
    let promise = new Promise((resolve, reject) => {
      transactionFunction(client, resolve, reject);
    });

    promise.then(
      (value) => {
        commit(value);
      },
      (error) => {
        rollback(error);
      }
    );
  });
};

module.exports = DatabaseClient = {
  connect: () => {
    return client.connect();
  },
  getClient: client,
  Transaction: Transaction
};
