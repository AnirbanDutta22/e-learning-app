const asyncHandler = require("../utils/asyncErrorHandler");

const registerUser = asyncHandler((req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

module.exports = registerUser;
