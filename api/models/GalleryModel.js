/** @module GalleryModel */

const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  caption: {
    type: String
  }
});

module.exports = mongoose.model("Gallery", gallerySchema);
