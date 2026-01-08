const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const Admin = require("../models/Admin.model");

const auth = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      throw new ApiError(401, "Invalid token.");
    }

    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token.");
  }
});

module.exports = auth;
