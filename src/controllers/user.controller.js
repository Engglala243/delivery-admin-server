const User = require('../models/User.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isActive: true });
  res.json(new ApiResponse(200, users, 'Users retrieved'));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(new ApiResponse(200, user, 'User retrieved'));
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  res.json(new ApiResponse(200, null, 'User deleted successfully'));
});

module.exports = { getUsers, getUserById, deleteUser };