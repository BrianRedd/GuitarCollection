const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (request, response) => {
  const tasks = await TaskModel.find();
  response.send(tasks);
};

module.exports.saveTask = (request, response) => {
  const { task } = request.body;

  TaskModel.create({ task })
    .then(data => {
      console.log("Saved Successfully...");
      response.status(201).send(data);
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};

module.exports.updateTask = (request, response) => {
  const { id } = request.params;
  const { task } = request.body;

  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => {
      response.send("Updated successfully");
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};

module.exports.deleteTask = (request, response) => {
  const { id } = request.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => {
      response.send("Deleted successfully");
    })
    .catch(error => {
      console.error(error);
      response.send({ error: error, message: "Something went wrong!" });
    });
};
