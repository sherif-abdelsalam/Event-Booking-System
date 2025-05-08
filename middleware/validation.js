// middleware/validation.js
const { validationResult } = require("express-validator");
const AppErrors = require("../utils/appErrors");

// Validation error checking middleware
exports.validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppErrors(errors.array()[0].msg, 400));
  }

  next();
};
