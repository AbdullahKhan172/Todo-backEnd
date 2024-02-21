const Users = require("../models/userModel");
const AppError = require("../util/appError");
const catchAsync = require("../util/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, status, res) => {
  const token = signToken(user._id);

  //remove passowrd from response
  user.password = undefined;
  res.status(status).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please enter both the feilds", 400));

  const user = await Users.findOne({ email }).select("+password");
  if (!user)
    return next(new AppError("No user with that email, Please signup", 400));

  if (!(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorect email or password", 400));

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access!!", 401)
    );
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await Users.findById(decode.id);
  req.user = user;
  next();
});
