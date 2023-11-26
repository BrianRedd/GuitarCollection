/** @module UsersControllers */

const UserModel = require("../models/UserModel");

const controllerType = "User";

module.exports.getUser = (request, response) => {
  const id = request.params.id;
  UserModel.find()
    .then(users => {
      const user = users?.find(usr => usr.username === id);
      if (!user._id) {
        throw new Error();
      }
      const message = `${controllerType} ${id} Loaded Successfully`;
      response.send({
        message,
        data: user
      });
    })
    .catch(error => {
      const errorMsg = `User ${(id || "").toUpperCase()} Not Found`;
      console.error(errorMsg);
      response.send({
        error,
        message: errorMsg
      });
    });
};

module.exports.saveUser = (request, response) => {
  const user = new UserModel({
    ...request.body
  });
  user
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

module.exports.updateUser = (request, response) => {
  let id = request.params.id;
  const userObject = {
    ...request.body
  };
  UserModel.findByIdAndUpdate(id, userObject)
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

module.exports.deleteUser = (request, response) => {
  let id = request.params.id;

  UserModel.findByIdAndDelete(id)
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
