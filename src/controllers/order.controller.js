const Order = require('../models/Order.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, deliveryAddress, paymentMethod } = req.body;
  
  const orderNumber = 'ORD' + Date.now();
  
  const order = await Order.create({
    orderNumber,
    user: req.user.userId,
    items,
    totalAmount,
    deliveryAddress,
    paymentMethod,
    status: 'pending'
  });
  
  const populatedOrder = await Order.findById(order._id)
    .populate('user', 'name email')
    .populate('items.product', 'name price');
  
  res.status(201).json(new ApiResponse(201, populatedOrder, 'Order created successfully'));
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
    .populate('items.product', 'name price images')
    .sort({ createdAt: -1 });
  res.json(new ApiResponse(200, orders, 'User orders retrieved'));
});

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

module.exports = { createOrder, getUserOrders, getOrders, updateOrderStatus };