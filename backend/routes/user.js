const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "heyy bro got it?" });
});

router.get("/message", function (req, res, next) {
  res.json({ message: "heyy got it at message" });
});

module.exports = router;
