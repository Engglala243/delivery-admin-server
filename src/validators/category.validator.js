const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().trim()
});

const updateCategorySchema = Joi.object({
  name: Joi.string().trim(),
  description: Joi.string().trim(),
  isActive: Joi.boolean()
});

module.exports = { createCategorySchema, updateCategorySchema };