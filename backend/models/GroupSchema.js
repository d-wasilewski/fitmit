const mongoose = require("mongoose");
const user = require("./UserSchema");
// var user = null;
// process.nextTick(() => (user = require("./UserSchema")));

const Schema = mongoose.Schema;

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  profilePicture: {
    url: {
      type: String,
      default: "",
    },
    public_id: {
      type: String,
      default: "",
    },
  },
  members: [{ type: Schema.Types.ObjectId }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("group", GroupSchema);
