const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UserSchema = require("../models/UserSchema");

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, salt);

  const registerUser = new UserSchema({
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });
  registerUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
