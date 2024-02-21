const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    minlength: 8,
    select: false,
  },
});

userShcema.pre("save", async function (next) {
  //Hash the passwrod with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userShcema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = mongoose.model("Users", userShcema);

module.exports = Users;
