const express = require("express");
const mongoose = require("mongoose");
const DB_NAME = require("./constants");
const dotenv = require("dotenv");
const path = require("path");
const app = require("./app");

//env config
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

//database connectivity
(async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
      });
    })
    .catch((err) => console.log(err));
})();

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}
