const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

module.exports = DatabaseClient = {
  connect: () => {
    return client.connect();
  },
  getClient: client,
  test: async () => {
    await connect();
    client
      .query("SELECT * FROM product")
      .then((result) => {
        console.table(result.rows); // Hello world!
        client.end();
      })
      .catch((error) => console.log(error));
  },
};
