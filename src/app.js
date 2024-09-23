const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.use("/user", userAuth, (req, res) => {
  res.send("User Data sent");
})

app.get("/admin/getAllData", (req, res) => {
  res.send("ALl Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User Deleted");
});

app.listen(7777, () => {
  console.log("Server listening on port 7777...");
});
