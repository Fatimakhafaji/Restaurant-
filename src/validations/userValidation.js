const Joi = require('joi');

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'restaurant_owner', 'client').default('client'),
  phone: Joi.string().optional().allow(''),
  address: Joi.string().optional().allow('')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

