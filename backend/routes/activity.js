const ActivitySchema = require("../models/ActivitySchema");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const activities = await ActivitySchema.find();
    res.status(200).json(activities);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await ActivitySchema.findById(activityId);
    res.status(200).json(activity);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await ActivitySchema.findByIdAndRemove(activityId);
    res.status(200).json(activity);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/add", async (req, res) => {
  try {
    const activityObject = req.body.activity;
    await ActivitySchema.create({
      ...activityObject,
    });

    res.status(200).json({ message: "norbert approves bloodTrail" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
