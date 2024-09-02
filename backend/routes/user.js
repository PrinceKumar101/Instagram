const express = require("express");
const { register, login } = require("../controllers/user.controller");
const isLoggedIn = require("../middleware/isLoggedin");
const router = express.Router();
const userModel = require("../models/user");

router.get("/", function (req, res, next) {
  res.json({ message: "heyy bro got it?" });
});

router.get("/message", function (req, res, next) {
  res.json({ message: "heyy got it at message" });
});

router.post("/signup", register);

router.get("/profile", isLoggedIn, async function (req, res, next) {
  try {
    console.log('User object:', req.user);  // Debugging: Check if user object is present
    if (!req.user || !req.user.email) {
      return res.status(400).json({ error: "User not logged in or email missing" });
    }

    const foundUser = await userModel.findOne({ email: req.user.email }).select("-password -token");
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: foundUser });
  } catch (error) {
    console.error('Error fetching profile:', error);  // Log the full error
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login",login)
module.exports = router;
