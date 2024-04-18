const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type:String,
  },
  passwordHash: {
    type: String,
  },
  cteatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  randomStr: {
    type: String
  },
  todos:[]
});

module.exports = mongoose.model("User", userschema, "users");
