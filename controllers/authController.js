const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');

const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    // if (password !== passwordConfirm) {
    //   return res.status(400).json({
    //     data: {
    //       status: 'fail',
    //       msg: 'Please confirm your password again'
    //     }
    //   });
    // }

    const token = await jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      data: {
        status: 'success',
        token
      }
    });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({
      data: {
        status: 'fail',
        msg: err.message
      }
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(
        new AppError('Please provide your email and password to login', 400)
      );

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(404).json({
        data: {
          status: 'fail',
          msg: 'No user found with this email'
        }
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        data: {
          status: 'fail',
          msg: 'Authentication failed, incorrect password'
        }
      });
    }

    const id = user.id;
    const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    // if (token) console.log(token);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };

    res.cookie('jwt', token, cookieOptions);

    localStorage.setItem('userName', user.name);
    // console.log(localStorage.getItem('userName'));

    user.password = undefined;
    // console.log(req.user);

    return res.status(200).json({
      data: {
        status: 'success',
        token,
        data: {
          user
        }
      }
    });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({
      data: {
        err
      }
    });
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token)
    return next(
      new AppError(
        'You are not authorised to access this route, please login again.',
        401
      )
    );

  // const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(
      new AppError(
        'The user belonging to the token is nolonger exists, please login again',
        401
      )
    );

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not authorised to access this route', 403)
      );
    }
    next();
  };
};

exports.logout = async (req, res, next) => {
  res.cookie('jwt', 'Logged out', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  localStorage.removeItem('userName');

  res.status(200).json({
    status: 'success'
  });
};
