/** @module BrandsControllers */

const fs = require("fs");

const BrandModel = require("../models/BrandModel");

const controllerType = "Brand";

module.exports.getBrands = async (request, response) => {
  const brands = await BrandModel.find();
  const message = `${brands.length} ${controllerType}${
    brands.length === 1 ? "" : "s"
  } Loaded Successfully`;
  response.send({data: brands, message});
};

module.exports.saveBrand = (request, response) => {
  const brand = new BrandModel({
    ...request.body,
    logo: request.file.filename
  });
  brand
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

module.exports.updateBrand = (request, response) => {
  console.log("request.params:\n", request.params);
  console.log("request.body:\n", request.body);
  console.log("request.file:\n", request.file);
  let id = request.params.id;
  let new_logo = "";
  if (request.file) {
    new_logo = request.file.filename;
    try {
      fs.unlinkSync("./images/brandLogos/" + request.body.old_logo);
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

module.exports.deleteBrand = (request, response) => {
  let id = request.params.id;
  try {
    fs.unlinkSync("./images/brandLogos/" + request.body.logo);
  } catch (error) {
    console.error(error);
  }

  BrandModel.findByIdAndDelete(id)
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
