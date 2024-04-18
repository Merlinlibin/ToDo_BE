const mongoose = require("mongoose");

const todoModel = mongoose.Schema(
  {
    todoName: { type: String, trim: true },
    user: { type: String, trim: true },
    todoDescription: { type: String, trim: true },
    todoStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ToDo = mongoose.model("ToDO", todoModel);

module.exports = ToDo;
