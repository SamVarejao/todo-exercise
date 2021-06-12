const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  completion: {
    type: Number,
    require: true,
    default: 0,
  },
  start: {
    type: String,
    require: true,
  },
  due: {
    type: String,
    require: true,
  },
  priority: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    default: "Not started",
  },
  authorID: {
    type: String,
    required: true,
  },
});
const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
