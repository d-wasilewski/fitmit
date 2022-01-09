const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d",
    required: true,
  },
  steps: {
    type: Schema.Types.Number,
    required: true,
  },
  calories: {
    type: Schema.Types.Number,
    required: true,
  },
  time: {
    type: Schema.Types.Number,
    required: true,
  },
});

module.exports = mongoose.model("activity", ActivitySchema);
