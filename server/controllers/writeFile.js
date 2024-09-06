const fs = require("fs").promises;

async function writeFile(body, req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    await fs.appendFile("output.txt", `\n${body}`);
    res.statusCode = 201;
    res.write(JSON.stringify({ message: "File written to.." }));
  } catch (error) {
    res.statusCode = 500;
    res.write(JSON.stringify({ message: "Failed to write file!" }));
  } finally {
    res.end();
  }
}

module.exports = { writeFile };
