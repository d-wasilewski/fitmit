const GroupSchema = require("../models/GroupSchema");
const UserSchema = require("../models/UserSchema");
const EventSchema = require("../models/EventSchema");
const router = require("express").Router();
const { cloudinary } = require("../utils/cloudinary");

router.get("/groups", async (req, res) => {
  try {
    const group = await GroupSchema.find().populate("members", "username");

    res.status(200).json(group);
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

  try {
    const exists = await GroupSchema.findByIdAndUpdate(req.params.groupId, {
      $push: {

  const exists = await GroupSchema.findByIdAndUpdate(req.params.groupId, {
    $push: {
      members: req.params.userId,
    },
  });
  const allMembers = await GroupSchema.findById(req.params.groupId);
  console.log("ALL: ", allMembers);
  res.json(allMembers);
});

router.delete("/:groupId/:userId", async (req, res) => {
  try {
    await GroupSchema.findByIdAndUpdate(req.params.groupId, {
      $pull: {

        members: req.params.userId,
      },
    });
    const allMembers = await GroupSchema.findById(req.params.groupId);

    console.log("ALL: ", allMembers);
    res.json(allMembers);
    return res.status(200).json(allMembers);
  } catch (err) {
    return res.status(500).json(err);

    if (allMembers.members.length == 0)
      await GroupSchema.findByIdAndRemove(req.params.groupId);

    res.status(200).json(allMembers);
  } catch (error) {
    res.status(500).json("norbert na skuterku");

  }
});

router.post("/uploadImage", async (req, res) => {
  const group = await GroupSchema.findById(req.body.groupId);
  if (group.profilePicture.url != "") {
    try {
      await cloudinary.uploader.destroy(group.profilePicture.public_id);
    } catch (e) {}
  }
  try {
    const uploadedResponse = await cloudinary.uploader.upload(
      req.body.profilePicture,
      {
        upload_preset: "dev_setups",
      }
    );

    const groupAfterUpdate = await GroupSchema.findByIdAndUpdate(
      req.body.groupId,
      {
        profilePicture: {
          url: uploadedResponse.secure_url,
          public_id: uploadedResponse.public_id,
        },
      },
      { new: true }
    );

    return res.status(201).json(groupAfterUpdate);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

router.get("/:id/events", async (req, res) => {
  const groupId = req.params.id;

  try {
    const events = await EventSchema.find({ group: groupId });
    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
