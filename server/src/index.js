const express = require("express");
const mongoose = require("mongoose");
const DB_NAME = require("./constants");
const dotenv = require("dotenv");
const path = require("path");

//express app
const app = express();
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
app.use(express.json());

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

//routes

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}
