const fs = require("fs").promises;
const http = require("http");

const server = http.createServer(async (req, res) => {
  const { method } = req;

  if (method === "GET") {
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
  } else if (method === "POST") {
    // Getting body from the request
    let body = '';
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      writeFile(body);
    });

    async function writeFile(body) {
      res.setHeader("Content-Type", "application/json");
      try {
        await fs.writeFile("output.txt", body);
        res.statusCode = 201;
        res.write(JSON.stringify({ message: "File written to.." }));
      } catch (error) {
        res.statusCode = 500;
        res.write(JSON.stringify({ message: "Failed to write file!" }));
      } finally {
        res.end();
      }
    }
  }
});

server.listen(3000, function () {
  console.log("Server is running on port 3000");
});
