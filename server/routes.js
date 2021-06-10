
const express = require("express");
const router = express.Router();

const User = require("./models/User");

router.post("/register", (req, res) => {
  console.log(req.body);
  return res.status(201).send("Welcome !");
});


router.post("/login", (req, res, next) => {
  console.log(req.body);
  return res.status(202).send("Login successful");
});
module.exports = router;