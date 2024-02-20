const mongoose = require("mongoose");
const validator = require("validator");

const userShcema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
});

const Users = mongoose.model("Users", userShcema);

module.exports = Users;
