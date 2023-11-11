const { Router } = require("express");
const router = Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const GuitarModel = require("../models/GuitarModel");
const BrandModel = require("../models/BrandModel");
const {
  getGuitars,
  saveGuitar,
  updateGuitar,
  deleteGuitar
} = require("../controllers/GuitarControllers");
const {
  getBrands,
  saveBrand,
  deleteBrand
} = require("../controllers/BrandsControllers");

// image upload
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./uploads");
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
router.post("/savebrand", upload, (request, response) => {
  const brand = new BrandModel({
    ...request.body,
    logo: request.file.filename
  });
  brand
    .save()
    .then(data => {
      console.log("Updated Successfully");
      response.status(201).send(data);
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
});
router.put("/updatebrand/:id", upload, (request, response) => {
  console.log("request.params:\n", request.params);
  console.log("request.body:\n", request.body);
  console.log("request.file:\n", request.file);
  let id = request.params.id;
  let new_logo = "";
  if (request.file) {
    new_logo = request.file.filename;
    try {
      fs.unlinkSync("./uploads/" + request.body.old_logo);
    } catch (error) {
      console.error(error);
    }
  } else {
    new_logo = request.body.old_logo;
  }
  const brandObject = {
    ...request.body,
    logo: new_logo
  };
  BrandModel.findByIdAndUpdate(id, brandObject)
    .then(data => {
      console.log("Updated Successfully");
      response.status(201).send({data});
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
});
router.delete("/deletebrand/:id", deleteBrand);

module.exports = router;
