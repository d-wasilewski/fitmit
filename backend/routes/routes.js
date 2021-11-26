const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UserSchema = require("../models/UserSchema");

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, salt);

  const registerUser = await new UserSchema({
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });
  await registerUser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserSchema.findOne({ username: req.body.username });
    !user && res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong password");

    res.status(200).json(user);
    console.log(user.password);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
