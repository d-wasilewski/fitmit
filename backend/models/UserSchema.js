const mongoose = require("mongoose");
const group = require("./GroupSchema");
// var group = null;
// process.nextTick(() => (group = require("./GroupSchema"))); //Circular reference!
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "",
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
  token: {
    type: String,
  },
  pushToken: {
    type: String,
  },
  groups: [{ type: Schema.Types.ObjectId, ref: group }],
  settings: {
    dontLogout: {
      type: Boolean,
      default: false,
    },
    notificationsOn: {
      type: Boolean,
      default: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", UserSchema);
