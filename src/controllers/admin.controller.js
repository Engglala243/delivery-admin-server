const Admin = require('../models/Admin.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { comparePassword, generateToken } = require('../utils/helpers');

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError(400, 'Admin already exists');
  }

  const admin = await Admin.create({ name, email, password });
  const token = generateToken({ id: admin._id });
  
  res.status(201).json(new ApiResponse(201, {
    admin: { id: admin._id, name: admin.name, email: admin.email },
    token
  }, 'Admin registered successfully'));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || !await comparePassword(password, admin.password)) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateToken({ id: admin._id });
  
  res.json(new ApiResponse(200, {
    admin: { id: admin._id, name: admin.name, email: admin.email },
    token
  }, 'Login successful'));
});

const getProfile = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, req.admin, 'Profile retrieved'));
});

module.exports = { register, login, getProfile };