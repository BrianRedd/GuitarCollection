/** @module BrandModel */

const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model("Brands", brandSchema);
