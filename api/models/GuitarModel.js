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
  makeParent: {
    type: String
  },
  makerLogo: {
    type: String
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
  },
  countyOfOrigin: {
    type: String,
    required: true
  },
  purchaseData: {
    type: Object
  },
  story: {
    type: String,
    required: true
  },
  specs: {
    type: Object
  },
  tuning: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  lastPlayed: {
    type: String
  },
  pictures: {
    type: Array
  },
  maintenance: {
    type: Array
  }
});

module.exports = mongoose.model("Guitar", guitarSchema);
