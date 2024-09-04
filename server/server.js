const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === "GET" && url === "/") {
    const stream = fs.readFileSync("./input.txt");
    res.end(stream);
  }
});


server.listen(3000, function() {
    console.log("Server is running on port 3000");
})