const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("Something went wrong");
  }
});

app.use("/getUserData", (req, res) => {
  //try {
    throw new Error("User Data not sent");
    res.send("User Data sent");
  //} catch (error) {
    //res.status(500).send("Some Error, Please Contact Suport team");
  //}
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("Something went wrong");
  }
});


app.listen(7777, () => {
  console.log("Server listening on port 7777...");
});
