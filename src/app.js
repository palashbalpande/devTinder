const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// app.post("/signup", async (req, res) => {
//   //creating a new instance of User model
//   try {
//     const user = new User({
//       firstName: "Palash",
//       lastName: "Balpande",
//       emailId: "pal@bal.com",
//       password: "p@123",
//     });
//     await user.save();
//     res.send("User created successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating user");
//   }
// });

app.use("/signup", async (req, res) => {
  //creating a new instance of User model
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "vir@koh.com",
    password: "v@123",
  });
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
