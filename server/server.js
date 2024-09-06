const http = require("http");
const { readFile } = require("./controllers/readFile");
const { writeFile } = require("./controllers/writeFile");

const server = http.createServer(async (req, res) => {
  // setting CORS headers 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  const { method } = req;

  // Handle OPTIONS method
  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  /**
   * @swagger
   * /:
   *   get:
   *     summary: Read a file
   *     description: Reads content from a file and returns it.
   *     responses:
   *       200:
   *         description: Successfully read the file.
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *       500:
   *         description: Server error.
   */

  if (method === "GET") {
    readFile(res);
  }

  /**
   * @swagger
   * /:
   *   post:
   *     summary: Write to a file
   *     description: Writes content to a file.
   *     requestBody:
   *        required: true
   *        content:
   *          text/plain:
   *            schema:
   *              type: string
   *     responses:
   *       200:
   *          description: Successfully wrote to the file.
   *       500:
   *          description: Server error.
   */
  if (method === "POST") {
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
