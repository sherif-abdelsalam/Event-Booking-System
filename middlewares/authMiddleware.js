const AppErrors = require('../utils/appErrors');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // check if there is a token or not
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppErrors('You are not logged in, Please log in!', 401));
  }
  console.log(token);

  // validate the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user is existed
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppErrors(
        'The user belonging to this token does no longer exist',
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppErrors('This user has changed his password recently', 401)
    );
  }

  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppErrors('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
