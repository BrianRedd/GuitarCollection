/** @module BrandsControllers */

const fs = require("fs");

const BrandModel = require("../models/BrandModel");

module.exports.getBrands = async (request, response) => {
  const brands = await BrandModel.find();
  response.send(brands);
};

module.exports.saveBrand = (request, response) => {
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
      console.log("Updated Successfully");
      response.status(201).send({ data });
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
      console.log("Deleted Successfully");
      response.status(201).send(data);
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};
