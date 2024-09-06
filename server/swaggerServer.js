const express = require("express");
const swaggerSetup = require("./swagger");

const app = express();

swaggerSetup(app);

app.listen(3001, () => {
  console.log("Swagger docs are running on http://localhost:3001/api-docs");
});
