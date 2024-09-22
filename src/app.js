const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({ firstName: "Palash", lastName: "Balpande" });
});

app.listen(7777, () => {
  console.log("Server listening on port 3000...");
});
