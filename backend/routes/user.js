const express = require("express");
const { register } = require("../controllers/user.controller");
const isLoggedIn = require("../middleware/isLoggedin");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "heyy bro got it?" });
});

router.get("/message", function (req, res, next) {
  res.json({ message: "heyy got it at message" });
});

router.post("/signup", register);

router.get("/profile", isLoggedIn, async function (req, res, next) {
  const found_user = await userModel.findOne({email: req.user.email});
  res.json({found_user});
});

module.exports = router;
