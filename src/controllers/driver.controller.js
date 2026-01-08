const Driver = require('../models/Driver.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const createDriver = asyncHandler(async (req, res) => {
  const driver = await Driver.create(req.body);
  res.status(201).json(new ApiResponse(201, driver, 'Driver created'));
});

const getDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({ isActive: true });
  res.json(new ApiResponse(200, drivers, 'Drivers retrieved'));
});

module.exports = { createDriver, getDrivers };