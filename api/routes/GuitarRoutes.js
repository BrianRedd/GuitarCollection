const { Router } = require("express");
const router = Router();
const {
  getGuitars,
  //   saveGuitar,
  //   updateGuitar,
  deleteGuitar
} = require("../controllers/GuitarControllers");
const GuitarModel = require("../models/GuitarModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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
}).single("makeLogo");

router.get("/get", getGuitars);

router.post("/save", upload, (request, response) => {
  const guitar = new GuitarModel({
    ...request.body,
    makeLogo: request.file.filename
  });
  guitar
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

router.put("/update/:id", upload, (request, response) => {
  console.log("request.params", request.params);
  console.log("request.body", request.body);
  console.log("request.file", request.file);
  let id = request.params.id;
  let new_makeLogo = "";
  if (request.file) {
    new_makeLogo = request?.file?.filename;
    if (request?.body?.old_makeLogo) {
      try {
        fs.unlinkSync("./uploads/" + request.body.old_makeLogo);
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    new_makeLogo = request?.body?.old_makeLogo;
  }
  const guitarObject = {
    ...request.body
  };
  if (new_makeLogo) {
    guitarObject.makeLogo = new_makeLogo;
  }
  GuitarModel.findByIdAndUpdate(id, guitarObject)
    .then(data => {
      console.log("Updated Successfully");
      response.status(201).send({ ...data, makeLogo: new_makeLogo });
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
});
router.delete("/delete/:id", deleteGuitar);

module.exports = router;
