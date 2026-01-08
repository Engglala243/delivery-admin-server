const Order = require('../models/Order.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .populate('driver', 'name')
    .populate('items.product', 'name price')
    .sort({ createdAt: -1 });
  res.json(new ApiResponse(200, orders, 'Orders retrieved'));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status, ...(status === 'delivered' && { deliveredAt: new Date() }) },
    { new: true }
  );
  res.json(new ApiResponse(200, order, 'Order status updated'));
});

module.exports = { getOrders, updateOrderStatus };