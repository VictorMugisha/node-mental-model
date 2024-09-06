const http = require("http");
const { readFile } = require("./controllers/readFile");
const { writeFile } = require("./controllers/writeFile");

const server = http.createServer(async (req, res) => {
  const { method } = req;

  if (method === "GET") {
    readFile(res);
  } else if (method === "POST") {
    // Getting body from the request
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      writeFile(body, res);
    });
  }
});

server.listen(3000, function () {
  console.log("Server is running on port 3000");
});
