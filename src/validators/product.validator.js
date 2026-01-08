const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  category: Joi.string().required(),
  subCategory: Joi.string(),
  stock: Joi.number().min(0)
});

module.exports = { createProductSchema };