const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    // const passwordHash = await bcrypt.hash(req.body.password, 10);

    // Generate a salt && Hash the password using the salt
    const salt = await bcrypt.genSalt(10); 
    const passwordHash = await bcrypt.hash(req.body.password, salt); 

    //creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // write a validation for emailId
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    } else {
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        throw new Error("Invalid Credentials");
      } else {
        // create a JWT token
        const token = await user.getJWT();

        // Add the token to cookie and send the response back to the user
        res.cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000),
        });
        res.send("Login successful!!");
      }
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout Successful!!");
});

module.exports = authRouter;
