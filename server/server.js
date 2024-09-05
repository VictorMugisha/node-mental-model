const fs = require("fs").promises;
const http = require("http");

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/") {
    async function readFile() {
      try {
        const data = await fs.readFile("input.txt", "utf8");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.write(data);
        res.end();
      } catch (error) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.write(
          JSON.stringify({ message: "Error happened during reading file!" })
        );
        res.end();
      }
    }
    readFile();
  }
  
});

server.listen(3000, function () {
  console.log("Server is running on port 3000");
});
