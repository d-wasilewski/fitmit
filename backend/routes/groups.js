const GroupSchema = require("../models/GroupSchema");
const UserSchema = require("../models/UserSchema");
const router = require("express").Router();

router.get("/groups", async (req, res) => {
  try {
    const user = await GroupSchema.find().populate("members", "username");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/groupsByUserId/:userId", async (req, res) => {
  try {
    const groupsOfGivenUser = await GroupSchema.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(groupsOfGivenUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/usersOfTheGroup", async (req, res) => {
  groups = req.body.members;
  populatedUsers = await UserSchema.find({ _id: { $in: groups } });
  // TODO: usunac zbedne pola
  res.json(populatedUsers);
});

// router.get("/groups/:userId", async (req, res) => {
//   try {
//     const user = await UserSchema.findById(req.params.userId).populate({
//       path: "groups",
//       select: ["name", "groupPicture", "members"],
//       // populate: { path: "members" },
//     });

//     res.status(200).json(user.groups);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get("/groups/:userId", async (req, res) => {
//   try {
//     const user = await GroupSchema.find({}).populate({
//       path: "members",
//       select: "username",
//       match: { username: "grupowy" },
//     });
//     console.log("user", user);

//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.post("/create/:userId", async (req, res) => {
  try {
    if (!(req.body.name && req.params.userId)) {
      return res.status(400).send("All input is required");
    }

    const group = await GroupSchema.create({
      name: req.body.name,
      creator: req.params.userId,
      members: req.params.userId,
    });

    await UserSchema.findByIdAndUpdate(req.params.userId, {
      $push: {
        groups: group._id,
      },
    });

    return res.status(201).json(group);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/:groupId/:userId", async (req, res) => {
  const exists = await GroupSchema.findByIdAndUpdate(req.params.groupId, {
    $push: {
      members: req.params.userId,
    },
  });
  console.log(exists);
  res.json(exists);
});

module.exports = router;
