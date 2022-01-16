const EventSchema = require("../models/EventSchema");

const router = require("express").Router();

// wszystkie eventy
router.get("/", async (req, res) => {
  try {
    const events = await EventSchema.find({});
    res.status(200).json(events);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventSchema.findById(eventId);
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventSchema.findByIdAndRemove(eventId);
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/add", async (req, res) => {
  try {
    const eventObject = req.body.event;
    await EventSchema.create({
      ...eventObject,
      date: new Date(eventObject.date),
    });
    res.status(200).json(eventObject);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
