const mongoose = require("mongoose");

const guitarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  serialNo: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Guitar", guitarSchema);
