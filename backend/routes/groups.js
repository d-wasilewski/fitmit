const GroupSchema = require("../models/GroupSchema");
const router = require("express").Router();

router.get("/groups", async (req, res) => {
  try {
    const user = await GroupSchema.find().populate("members", "username");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create/:userId", async (req, res) => {
  try {
    if (!(req.body.username && req.params.userId)) {
      return res.status(400).send("All input is required");
    }

    const group = await GroupSchema.create({
      username: req.body.username,
      members: req.params.userId,
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
});

module.exports = router;
