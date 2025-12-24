const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world, Jenkins Pipeline with Node.js from GitHub!");
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on port ${PORT}`);
});
