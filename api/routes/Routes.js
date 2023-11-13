/** @module Routes */

const { Router } = require("express");
const router = Router();
const multer = require("multer");

const {
  getGuitars,
  saveGuitar,
  updateGuitar,
  deleteGuitar
} = require("../controllers/GuitarControllers");
const {
  getBrands,
  saveBrand,
  deleteBrand,
  updateBrand
} = require("../controllers/BrandsControllers");

// image upload
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./images/brandLogos");
  },
  filename: function (request, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: storage
}).single("logo");

// Guitars
router.get("/get", getGuitars);
router.post("/save", saveGuitar);
router.put("/update/:id", updateGuitar);
router.delete("/delete/:id", deleteGuitar);

// Brands
router.get("/getbrands", getBrands);
router.post("/savebrand", upload, saveBrand);
router.put("/updatebrand/:id", upload, updateBrand);
router.delete("/deletebrand/:id", deleteBrand);

module.exports = router;
