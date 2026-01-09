const Joi = require('joi');
const ApiError = require('../utils/ApiError');

const validateUserRegistration = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }
  
  next();
};

const validateUserLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }
  
  next();
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
};