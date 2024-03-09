const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorHandler = require("./middlewares/common/errorHandler");

//express app
const app = express();

//cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set static folder
app.use(express.static(path.resolve(__dirname, "./public")));

//default error
app.use(errorHandler);

module.exports = app;
