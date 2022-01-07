const UserSchema = require("../models/UserSchema");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.put("/refreshToken/:userId", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.userId);

    if (user && user.settings.dontLogout) {
      console.log("Satisfied");
      const token = jwt.sign(
        { user_id: user._id, username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1000d",
        }
      );
      user.token = token;
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//update user
router.put("/:id", async (req, res) => {
  console.log(req.body.newData, req.params.id);
  if (req.body.newData.userId === req.params.id) {
    try {
      await UserSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body.newData,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only update your account");
  }
});

// delete user (nie wiadomo czy bedzie)

// get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    const { password, date, members, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a friend (?)
module.exports = router;
