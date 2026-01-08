const User = require('../models/User.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isActive: true });
  res.json(new ApiResponse(200, users, 'Users retrieved'));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(new ApiResponse(200, user, 'User retrieved'));
});

module.exports = { getUsers, getUserById };