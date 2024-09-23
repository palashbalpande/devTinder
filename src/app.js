const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
  console.log("Handline One");
  //res.send("Response One");
  next();
},
  (req, res, next) => {
    console.log("Handline Two");
    //res.send("Response Two");
    next();
  },
  (req, res, next) => {
    console.log("Handline Three");
    res.send("Response Three");
  }
); 

app.listen(7777, () => {
  console.log("Server listening on port 3000...");
});
