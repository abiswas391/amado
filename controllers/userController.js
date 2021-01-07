const catchAsync = require('./../utils/catchAsync');
const User = require('../models/userModel');

exports.getUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    data: {
      result: users.length,
      status: 'success',
      users
    }
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    data: {
      status: 'success',
      user: req.user
    }
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    data: {
      status: 'success',
      user
    }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  let name = req.user.name;
  let email = req.user.email;

  if (req.body.name) {
    name = req.body.name;
  }
  if (req.body.email) {
    email = req.body.email;
  }

  const newUser = await User.findByIdAndUpdate(req.user.id, { name, email });

  res.status(200).json({
    data: {
      status: 'success',
      user: newUser
    }
  });
});
