const mongoose = require("mongoose");

const guitarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Guitar", guitarSchema);
