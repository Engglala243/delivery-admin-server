const Order = require('../models/Order.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, deliveryAddress, paymentMethod } = req.body;
  
  console.log('Creating order for user:', req.user.userId);
  console.log('Order data:', { items, totalAmount, deliveryAddress, paymentMethod });
  
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
  
  console.log('Order created with ID:', order._id);
  
  const populatedOrder = await Order.findById(order._id)
    .populate('user', 'name email')
    .populate('items.product', 'name price');
  
  res.status(201).json(new ApiResponse(201, populatedOrder, 'Order created successfully'));
});

const getUserOrders = asyncHandler(async (req, res) => {
  console.log('getUserOrders called for user:', req.user.userId);
  console.log('User object:', req.user);
  
  const orders = await Order.find({ user: req.user.userId })
    .populate('items.product', 'name price images')
    .sort({ createdAt: -1 });
    
  console.log('Found orders count:', orders.length);
  console.log('Orders:', orders);
  
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

const getOrderById = asyncHandler(async (req, res) => {
  console.log('getOrderById called for order:', req.params.id);
  console.log('User:', req.user.userId);
  
  const order = await Order.findOne({ 
    _id: req.params.id, 
    user: req.user.userId 
  })
    .populate('user', 'name email')
    .populate('items.product', 'name price images')
    .populate('driver', 'name phone');
    
  if (!order) {
    throw new ApiError(404, 'Order not found');
  }
  
  console.log('Found order:', order);
  res.json(new ApiResponse(200, order, 'Order retrieved'));
});

module.exports = { createOrder, getUserOrders, getOrders, updateOrderStatus, getOrderById };