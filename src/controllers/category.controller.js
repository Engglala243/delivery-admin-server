const Category = require('../models/Category.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const googleDriveService = require('../services/googleDrive.service');
const localStorageService = require('../services/localStorage.service');

const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  let imageUrl = null;
  if (req.file) {
    try {
      // Try Google Drive first
      if (process.env.GOOGLE_DRIVE_REFRESH_TOKEN && 
          process.env.GOOGLE_DRIVE_REFRESH_TOKEN !== 'YOUR_REFRESH_TOKEN_HERE' &&
          process.env.GOOGLE_DRIVE_FOLDER_ID && 
          process.env.GOOGLE_DRIVE_FOLDER_ID !== 'YOUR_FOLDER_ID_HERE') {
        imageUrl = await googleDriveService.uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
      } else {
        // Fallback to local storage
        imageUrl = await localStorageService.uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
      }
    } catch (error) {
      // If Google Drive fails, try local storage
      imageUrl = await localStorageService.uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
    }
  }

  const category = await Category.create({
    name,
    description,
    image: imageUrl
  });

  res.status(201).json(new ApiResponse(201, category, 'Category created successfully'));
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true });
  
  // Fix image URLs
  const categoriesWithFullUrls = categories.map(category => {
    const categoryObj = category.toObject();
    if (categoryObj.image && !categoryObj.image.startsWith('http') && !categoryObj.image.startsWith('/uploads/')) {
      categoryObj.image = `/uploads/${categoryObj.image}`;
    }
    return categoryObj;
  });
  
  res.json(new ApiResponse(200, categoriesWithFullUrls, 'Categories retrieved'));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const categoryId = req.params.id;
  
  // Check if category exists
  const existingCategory = await Category.findById(categoryId);
  if (!existingCategory) {
    throw new ApiError(404, 'Category not found');
  }
  
  // Check for duplicate name only if name is being changed
  if (name && name !== existingCategory.name) {
    const duplicateCategory = await Category.findOne({ name, _id: { $ne: categoryId } });
    if (duplicateCategory) {
      throw new ApiError(400, 'Category name already exists');
    }
  }
  
  const updateData = {};
  if (name) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  
  // Handle image upload
  if (req.file) {
    try {
      let imageUrl;
      if (process.env.GOOGLE_DRIVE_REFRESH_TOKEN && 
          process.env.GOOGLE_DRIVE_REFRESH_TOKEN !== 'YOUR_REFRESH_TOKEN_HERE' &&
          process.env.GOOGLE_DRIVE_FOLDER_ID && 
          process.env.GOOGLE_DRIVE_FOLDER_ID !== 'YOUR_FOLDER_ID_HERE') {
        imageUrl = await googleDriveService.uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
      } else {
        imageUrl = await localStorageService.uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
      }
      updateData.image = imageUrl;
    } catch (error) {
      try {
        const imageUrl = await localStorageService.uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
        updateData.image = imageUrl;
      } catch (fallbackError) {
        throw new ApiError(500, 'Failed to upload image');
      }
    }
  }
  
  const category = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
  res.json(new ApiResponse(200, category, 'Category updated successfully'));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  res.json(new ApiResponse(200, null, 'Category deleted'));
});

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };