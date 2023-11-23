/** @module GalleryController */

const fs = require("fs");

const GalleryModel = require("../models/GalleryModel");

const controllerType = "Image";

module.exports.getGallery = async (request, response) => {
  const galleryImages = await GalleryModel.find();
  const message = `${galleryImages.length} ${controllerType}${
    galleryImages.length === 1 ? "" : "s"
  } Loaded Successfully`;
  response.send({ data: galleryImages, message });
};

module.exports.saveGalleryImage = (request, response) => {
  const galleryImage = new GalleryModel({
    ...request.body,
    image: request.file.filename
  });
  galleryImage
    .save()
    .then(data => {
      const message = `${controllerType} Saved Successfully`;
      console.log(message);
      response.status(201).send({
        message,
        data
      });
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};

module.exports.updateGalleryImage = (request, response) => {
  console.log("request.params:\n", request.params);
  console.log("request.body:\n", request.body);
  console.log("request.file:\n", request.file);
  let id = request.params.id;
  let new_image = "";
  if (request.file) {
    new_image = request.file.filename;
    try {
      fs.unlinkSync("./images/gallery/" + request.body.old_image);
    } catch (error) {
      console.error(error);
    }
  } else {
    new_image = request.body.old_image;
  }
  const galleryImageObject = {
    ...request.body,
    image: new_image
  };
  GalleryModel.findByIdAndUpdate(id, galleryImageObject)
    .then(data => {
      const message = `${controllerType} Updated Successfully`;
      console.log(message);
      response.status(201).send({
        message,
        data
      });
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};

module.exports.deleteGalleryImage = (request, response) => {
  let id = request.params.id;
  try {
    fs.unlinkSync("./images/gallery/" + request.body.image);
  } catch (error) {
    console.error(error);
  }

  GalleryModel.findByIdAndDelete(id)
    .then(data => {
      const message = `${controllerType} Deleted Successfully`;
      console.log(message);
      response.status(201).send({
        message,
        data
      });
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};
