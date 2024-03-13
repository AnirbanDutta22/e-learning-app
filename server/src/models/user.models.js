const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Enter your username"],
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Enter your email address"],
      unique: true,
      validate: {
        validator: function (value) {
          return !validator.isEmail(value);
        },
        message: "Enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
      minLength: [8, "Password must be of at least 8 characters"],
    },
    ph_no: {
      type: Number,
      unique: true,
      validate: {
        validator: function (value) {
          return !validator.isMobilePhone(value);
        },
        message: "Enter a valid phone number",
      },
    },
    avatar: {
      type: String, //cloudinary url
    },
    role: {
      type: String,
      default: "User",
    },
    courses: [
      {
        courseId: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordValid = async function () {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
