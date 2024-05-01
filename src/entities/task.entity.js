const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  titile: String,
  description: String,
  dueDate: Date,
  status: String,
});

module.exports = new mongoose.model("tasks", taskSchema);
