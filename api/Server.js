/** @module Server.js */

// imports
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/Routes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch(error => {
    console.error(error);
  });

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api", routes);

var publicDir = require('path').join(__dirname,'/images'); 
app.use(express.static(publicDir)); 

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
