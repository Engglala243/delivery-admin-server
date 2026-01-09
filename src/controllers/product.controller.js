const Product = require('../models/Product.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const googleDriveService = require('../services/googleDrive.service');
const localStorageService = require('../services/localStorage.service');

const createProduct = asyncHandler(async (req, res) => {
  const productData = { ...req.body };
  
  // Handle image uploads
  if (req.files && req.files.length > 0) {
    const imageUrls = [];
    
    for (const file of req.files) {
      try {
        let imageUrl;
        if (process.env.GOOGLE_DRIVE_REFRESH_TOKEN && 
            process.env.GOOGLE_DRIVE_REFRESH_TOKEN !== 'YOUR_REFRESH_TOKEN_HERE' &&
            process.env.GOOGLE_DRIVE_FOLDER_ID && 
            process.env.GOOGLE_DRIVE_FOLDER_ID !== 'YOUR_FOLDER_ID_HERE') {
          imageUrl = await googleDriveService.uploadFile(file.buffer, file.originalname, file.mimetype);
        } else {
          imageUrl = await localStorageService.uploadFile(file.buffer, file.originalname, file.mimetype);
        }
        imageUrls.push(imageUrl);
      } catch (error) {
        try {
          const imageUrl = await localStorageService.uploadFile(file.buffer, file.originalname, file.mimetype);
          imageUrls.push(imageUrl);
        } catch (fallbackError) {
          throw new ApiError(500, 'Failed to upload image');
        }
      }
    }
    
    if (imageUrls.length > 0) {
      productData.images = imageUrls;
    }
  }
  
  const product = await Product.create(productData);
  res.status(201).json(new ApiResponse(201, product, 'Product created'));
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true }).populate('category subCategory');
  res.json(new ApiResponse(200, products, 'Products retrieved'));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category subCategory');
  if (!product || !product.isActive) {
    throw new ApiError(404, 'Product not found');
  }
  res.json(new ApiResponse(200, product, 'Product retrieved'));
});

const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  
  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    throw new ApiError(404, 'Product not found');
  }
  
  const updateData = { ...req.body };
  
  // Handle image uploads
  if (req.files && req.files.length > 0) {
    const imageUrls = [];
    
    for (const file of req.files) {
      try {
        let imageUrl;
        if (process.env.GOOGLE_DRIVE_REFRESH_TOKEN && 
            process.env.GOOGLE_DRIVE_REFRESH_TOKEN !== 'YOUR_REFRESH_TOKEN_HERE' &&
            process.env.GOOGLE_DRIVE_FOLDER_ID && 
            process.env.GOOGLE_DRIVE_FOLDER_ID !== 'YOUR_FOLDER_ID_HERE') {
          imageUrl = await googleDriveService.uploadFile(file.buffer, file.originalname, file.mimetype);
        } else {
          imageUrl = await localStorageService.uploadFile(file.buffer, file.originalname, file.mimetype);
        }
        imageUrls.push(imageUrl);
      } catch (error) {
        try {
          const imageUrl = await localStorageService.uploadFile(file.buffer, file.originalname, file.mimetype);
          imageUrls.push(imageUrl);
        } catch (fallbackError) {
          throw new ApiError(500, 'Failed to upload image');
        }
      }
    }
    
    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }
  }
  
  const product = await Product.findByIdAndUpdate(productId, updateData, { new: true }).populate('category subCategory');
  res.json(new ApiResponse(200, product, 'Product updated successfully'));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  res.json(new ApiResponse(200, null, 'Product deleted successfully'));
});

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };