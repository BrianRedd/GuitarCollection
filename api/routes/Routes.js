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
const {
  getGallery,
  saveGalleryImage,
  updateGalleryImage,
  deleteGalleryImage
} = require("../controllers/GalleryControllers");
const {
  getUser,
  saveUser,
  updateUser,
  deleteUser
} = require("../controllers/UsersControllers");

// image upload
var brandStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./images/brandLogos");
  },
  filename: function (request, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var galleryStorage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./images/gallery");
  },
  filename: function (request, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var brandUpload = multer({
  storage: brandStorage
}).single("logo");

var galleryUpload = multer({
  storage: galleryStorage
}).single("image");

// Guitars
router.get("/get", getGuitars);
router.post("/save", saveGuitar);
router.put("/update/:id", updateGuitar);
router.delete("/delete/:id", deleteGuitar);

// Brands
router.get("/getbrands", getBrands);
router.post("/savebrand", brandUpload, saveBrand);
router.put("/updatebrand/:id", brandUpload, updateBrand);
router.delete("/deletebrand/:id", deleteBrand);

// GalleryImages
router.get("/getgallery", getGallery);
router.post("/saveimage", galleryUpload, saveGalleryImage);
router.put("/updateimage/:id", galleryUpload, updateGalleryImage);
router.delete("/deleteimage/:id", deleteGalleryImage);

// Users
router.get("/getuser/:id", getUser);
router.post("/saveuser", saveUser);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

module.exports = router;
