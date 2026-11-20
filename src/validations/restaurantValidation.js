const Joi = require('joi');


 const createRestaurantSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  cuisine: Joi.array().items(Joi.string()).min(1).required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required()
  }).required(),
  contact: Joi.object({
    phone: Joi.string().required(),
    email: Joi.string().email().required()
  }).required(),
  openingHours: Joi.object().optional(),
  image: Joi.string().optional()
});

 const updateRestaurantSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().min(10).max(500).optional(),
  cuisine: Joi.array().items(Joi.string()).min(1).optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional()
  }).optional(),
  contact: Joi.object({
    phone: Joi.string().optional(),
    email: Joi.string().email().optional()
  }).optional(),
  openingHours: Joi.object().optional(),
  isActive: Joi.boolean().optional(),
  image: Joi.string().optional()
});


module.exports={
  createRestaurantSchema,updateRestaurantSchema
}