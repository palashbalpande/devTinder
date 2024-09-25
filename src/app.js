const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating a new instance of User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user" + error.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  try {
    const users = await User.findOne({ emailId: req.body.emailId });
    if (!users) {
      res.status(404).send("User not found");
    } else res.send(users);
  } catch (err) {
    res.status(400).send("Error getting user" + err.message);
  }

  // try {
  //   const users = await User.find({ emailId: req.body.emailId });
  //   if(users.length === 0) {
  //     res.status(404).send("User not found");
  //   } else res.send(users);
  // } catch (err) {
  //   res.status(400).send("Error getting user" + err.message);
  // }
});

// Feed API - GET /feed - get all the users from the databse
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //const user = await User.findByIdAndDelete({ _id: userId });
    const user = await User.findByIdAndDelete(userId); // { _id: userId }
    if (!user) {
      res.status(404).send("User not found");
    } else res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

// Update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  console.log(data);
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });

    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED" + err.message);
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
