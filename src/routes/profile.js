const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validation");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your Profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Change password (Authenticated user)
profileRouter.post("/profile/change-password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide both current and new passwords" });
    }

    const user = req.user;

    // Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password and update it
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error changing password: " + err.message });
  }
});

module.exports = profileRouter;
