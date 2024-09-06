const fs = require("fs").promises;

async function readFile(res) {
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

module.exports = { readFile };
