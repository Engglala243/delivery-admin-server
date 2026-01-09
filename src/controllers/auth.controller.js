const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const logger = require('../utils/logger');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ 
    $or: [{ email }, { phone }] 
  });

  if (existingUser) {
    logger.logError('User registration failed - user already exists', null, {
      email,
      phone,
      action: 'REGISTER_USER'
    });
    throw new ApiError(400, 'User with this email or phone already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  logger.logSuccess('User registered successfully', {
    userId: user._id,
    email: user.email,
    action: 'REGISTER_USER'
  });

  res.status(201).json(
    new ApiResponse(201, {
      user: userResponse,
      token,
    }, 'User registered successfully')
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    logger.logError('Login failed - missing credentials', null, {
      email,
      action: 'LOGIN_USER'
    });
    throw new ApiError(400, 'Email and password are required');
  }

  // Find user by email
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    logger.logError('Login failed - user not found', null, {
      email,
      action: 'LOGIN_USER'
    });
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if password exists in database
  if (!user.password) {
    logger.logError('Login failed - password not found in database', null, {
      userId: user._id,
      email,
      action: 'LOGIN_USER'
    });
    throw new ApiError(500, 'User password not found. Please contact support.');
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    logger.logError('Login failed - invalid password', null, {
      userId: user._id,
      email,
      action: 'LOGIN_USER'
    });
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if user is active
  if (!user.isActive) {
    logger.logError('Login failed - account deactivated', null, {
      userId: user._id,
      email,
      action: 'LOGIN_USER'
    });
    throw new ApiError(401, 'Account is deactivated. Please contact support.');
  }

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  const userResponse = user.toObject();
  delete userResponse.password;

  logger.logSuccess('User logged in successfully', {
    userId: user._id,
    email: user.email,
    action: 'LOGIN_USER'
  });

  res.json(
    new ApiResponse(200, {
      user: userResponse,
      token,
    }, 'Login successful')
  );
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    logger.logError('Get profile failed - user not found', null, {
      userId: req.user.userId,
      action: 'GET_USER_PROFILE'
    });
    throw new ApiError(404, 'User not found');
  }

  logger.logSuccess('User profile retrieved successfully', {
    userId: user._id,
    action: 'GET_USER_PROFILE'
  });

  res.json(new ApiResponse(200, user, 'Profile retrieved successfully'));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;

  const user = await User.findById(req.user.userId);

  if (!user) {
    logger.logError('Update profile failed - user not found', null, {
      userId: req.user.userId,
      action: 'UPDATE_USER_PROFILE'
    });
    throw new ApiError(404, 'User not found');
  }

  // Update fields
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address) user.address = address;

  await user.save();

  logger.logSuccess('User profile updated successfully', {
    userId: user._id,
    updatedFields: { name: !!name, phone: !!phone, address: !!address },
    action: 'UPDATE_USER_PROFILE'
  });

  res.json(new ApiResponse(200, user, 'Profile updated successfully'));
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};