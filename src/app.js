const express = require("express");

const app = express();

app.use("/user", (req, res) => {
  res.send("HAHAHAHAHAH");
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Palash", lastName: "Balpande" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully added");
});

app.delete("/user", (req, res) => {
  res.send("Data successfully deleted");
});

app.use("/test", (req, res) => {
  res.send("Hello from the Server!");
});

app.listen(7777, () => {
  console.log("Server listening on port 3000...");
});
