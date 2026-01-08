const Joi = require('joi');

const createSubCategorySchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().trim(),
  category: Joi.string().required()
});

module.exports = { createSubCategorySchema };