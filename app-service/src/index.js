const app = require("./app");
const { connect } = require("./util/database");

console.log("Starting the Database connection");
connect().then(() => {
  console.log("Database Connection Started");
  app.listen(3500, () => {
    console.log("Server on port 3500");
  });
});
