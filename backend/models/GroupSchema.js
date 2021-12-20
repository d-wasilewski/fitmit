const mongoose = require("mongoose");
const user = require("./UserSchema");
const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  groupPicture: {
    type: String,
    default: "",
  },
  members: [{ type: Schema.Types.ObjectId, ref: user }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("group", groupSchema);
