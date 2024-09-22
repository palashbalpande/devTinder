const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello hello hello!");
});

app.use("/test", (req, res) => {
  res.send("Hello from Server!");
});

app.use("/", (req, res) => {
  res.send("This is Home page");
});

app.listen(7777, () => {
  console.log("Server listening on port 3000...");
});
