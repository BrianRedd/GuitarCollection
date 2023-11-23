/** @module GuitarControllers */

const GuitarModel = require("../models/GuitarModel");

const controllerType = "Guitar";

module.exports.getGuitars = async (request, response) => {
  const guitars = await GuitarModel.find();
  const message = `${guitars.length} ${controllerType}${
    guitars.length === 1 ? "" : "s"
  } Loaded Successfully`;
  response.send({data: guitars, message});
};

module.exports.saveGuitar = (request, response) => {
  console.log("request", request.body)
  GuitarModel.create(request.body)
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

module.exports.updateGuitar = (request, response) => {
  const { id } = request.params;

  GuitarModel.findByIdAndUpdate(id, request.body)
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

module.exports.deleteGuitar = (request, response) => {
  const { id } = request.params;

  GuitarModel.findByIdAndDelete(id)
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
