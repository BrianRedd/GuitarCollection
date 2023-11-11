const BrandModel = require("../models/BrandModel");

module.exports.getBrands = async (request, response) => {
  const brands = await BrandModel.find();
  response.send(brands);
};

module.exports.saveBrand = (request, response) => {
  BrandModel.create(request.body)
    .then(data => {
      console.log("Saved Successfully");
      response.status(201).send(data);
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};

module.exports.updateBrand = (request, response) => {
  const { id } = request.params;

  BrandModel.findByIdAndUpdate(id, request.body)
    .then(data => {
      console.log("Updated Successfully");
      response.status(201).send(data);
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};

module.exports.deleteBrand = (request, response) => {
  const { id } = request.params;

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
