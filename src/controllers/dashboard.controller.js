const Order = require('../models/Order.model');
const User = require('../models/User.model');
const Product = require('../models/Product.model');
const Driver = require('../models/Driver.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalOrders, totalUsers, totalProducts, totalDrivers, recentOrders] = await Promise.all([
    Order.countDocuments(),
    User.countDocuments(),
    Product.countDocuments(),
    Driver.countDocuments(),
    Order.find().populate('user', 'name').sort({ createdAt: -1 }).limit(5)
  ]);

  const stats = {
    totalOrders,
    totalUsers,
    totalProducts,
    totalDrivers,
    recentOrders
  };

  res.json(new ApiResponse(200, stats, 'Dashboard stats retrieved'));
});

module.exports = { getDashboardStats };