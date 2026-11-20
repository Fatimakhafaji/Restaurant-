const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

//generat Token first 
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, role, phone, address } = req.body;

  const newUser = await User.create({ name, email, password, role, phone, address });
  const token = generateToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError('Email or Password is wrong', 401));
  }

  const token = generateToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    }
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: { user: req.user }
  });
});