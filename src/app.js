const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.use("/signup", async (req, res) => {
  //creating a new instance of User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(7777, () => {
      console.log("Server listening on port 7777...");
    });
  })
  .catch((err) => {
    console.err("Error connecting to MongoDB");
  });
