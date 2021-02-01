const DatabaseClient = require('../../util/database');

const addElements = (elements, table) => {
  return new Promise((resolve, reject) => {
    const client = DatabaseClient.getClient;
    elements.forEach((element) => {
      client
        .query(`INSERT INTO ${table}(id, name) VALUES ($1, $2);`, [
          element.id,
          element.name,
        ])
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};

module.exports = { addElements: addElements };
