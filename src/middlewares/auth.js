const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  // Read the token from the request cookies
  // Validate the token
  // Find the user
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token not Valid!!!");
    }

    const decodedObj = await jwt.verify(token, "DEV@TINDER$790");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
