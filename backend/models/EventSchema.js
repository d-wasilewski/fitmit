const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  eventType: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("event", EventSchema);
