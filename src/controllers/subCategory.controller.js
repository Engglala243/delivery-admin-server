// SubCategory Controller
const SubCategory = require('../models/SubCategory.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const createSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.create(req.body);
  res.status(201).json(new ApiResponse(201, subCategory, 'SubCategory created'));
});

const getSubCategories = asyncHandler(async (req, res) => {
  const subCategories = await SubCategory.find({ isActive: true }).populate('category');
  res.json(new ApiResponse(200, subCategories, 'SubCategories retrieved'));
});

module.exports = { createSubCategory, getSubCategories };