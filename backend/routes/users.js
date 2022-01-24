const UserSchema = require("../models/UserSchema");
const router = require("express").Router();
const auth = require("../middleware/auth");
const { cloudinary } = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const ActivitySchema = require("../models/ActivitySchema");
const EventSchema = require("../models/EventSchema");
const GroupSchema = require("../models/GroupSchema");

router.get("/", async (req, res) => {
  try {
    const users = await UserSchema.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/refreshToken/:userId", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.userId);

    let token;
    if (user) {
      console.log("Satisfied");
      token = jwt.sign(
        { user_id: user._id, username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1000d",
        }
      );
      user.token = token;
    }
    return res.status(200).json(token);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/uploadImage", async (req, res) => {
  const user = await UserSchema.findById(req.body.userId);

  if (user.profilePicture.url != "") {
    try {
      await cloudinary.uploader.destroy(user.profilePicture.public_id);
    } catch (e) {}
  }

  try {
    const uploadedResponse = await cloudinary.uploader.upload(
      req.body.profilePicture,
      {
        upload_preset: "dev_setups",
      }
    );

    const userAfterUpdate = await UserSchema.findByIdAndUpdate(
      req.body.userId,
      {
        profilePicture: {
          url: uploadedResponse.secure_url,
          public_id: uploadedResponse.public_id,
        },
      },
      { new: true }
    );

    return res.status(201).json(userAfterUpdate);
  } catch (e) {
    return res.status(500).json(e);
  }
});

//update user
router.put("/:id", async (req, res) => {
  try {
    await UserSchema.findByIdAndUpdate(req.params.id, {
      $set: req.body.newData,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    return res.status(500).json(err);
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

// zwraca aktywnosci dla usera o danym id
router.get("/:id/activities", async (req, res) => {
  try {
    const userId = req.params.id;
    const activities = await ActivitySchema.find({ user: userId });
    res.status(200).json(activities);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.get("/:id/events", async (req, res) => {
  const groupId = req.params.id;

  try {
    // const events = await EventSchema.find({ group: groupId });
    const groups = await GroupSchema.find({
      members: { $in: [groupId] },
    });

    const groupIds = groups.map((val) => val._id);

    const events = await EventSchema.find({
      group: { $in: groupIds },
    }).sort({ date: 1 });
    console.log(events);

    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/:id/interests", async (req, res) => {
  const userId = req.params.id;
  try {
    const interests = await UserSchema.findById(userId);

    return res.status(200).json(interests);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.put("/:id/interests", async (req, res) => {
  const interests = req.body.interests;
  const userId = req.params.id;
  try {
    await UserSchema.findByIdAndUpdate(userId, {
      $set: { interests },
    });

    return res.status(200).json("gituwa ziomal");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// add a friend (?)
module.exports = router;
