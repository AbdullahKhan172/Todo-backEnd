const AppError = require("../util/appError");

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleCasteErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.log("Error🔥🔥", err);
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong",
  });
};
module.exports = (err, req, res, next) => {
  console.log(err.name, "3333333");
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.name === "CastError") err = handleCasteErrorDB(err);

  sendErrorProd(err, req, res);
};
