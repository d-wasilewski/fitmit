const UserSchema = require("../models/UserSchema");
const router = require("express").Router();
const auth = require("../middleware/auth");

module.exports = router;

//update user
router.put("/:id", async (req, res) => {
  console.log(req.body.userId, req.params.id);
  if (req.body.userId === req.params.id) {
    try {
      const user = await UserSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body,
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
    const { password, date, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a friend (?)
