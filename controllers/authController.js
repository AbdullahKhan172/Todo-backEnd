exports.signUp = (req, res, next) => {
  res.status(200).json({
    status: "succes",
    data: {
      user: "Sign Up User",
    },
  });
};
exports.login = (req, res, next) => {
  res.status(200).json({
    status: "succes",
    data: {
      user: "Login User",
    },
  });
};
exports.protect = (req, res, next) => {
  res.status(200).json({
    status: "succes",
    data: {
      user: "Protected Route",
    },
  });
};
