const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple Node.js API using http module",
      version: "1.0.0",
      description: "A simple API to read and write files",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./controllers/*.js", "./server.js"],
};


const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

module.exports = swaggerDocs