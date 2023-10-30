const GuitarModel = require("../models/GuitarModel");

module.exports.getGuitars = async (request, response) => {
  const guitars = await GuitarModel.find();
  response.send(guitars);
};

module.exports.saveGuitar = (request, response) => {
  GuitarModel.create(request.body)
    .then(data => {
      console.log("Saved Successfully");
      response.status(201).send(data);
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};

module.exports.updateGuitar = (request, response) => {
  const { id } = request.params;

  GuitarModel.findByIdAndUpdate(id, request.body)
    .then(() => {
      response.send("Updated Successfully");
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};

module.exports.deleteGuitar = (request, response) => {
  const { id } = request.params;

  GuitarModel.findByIdAndDelete(id)
    .then(() => {
      response.send("Deleted Successfully");
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};
