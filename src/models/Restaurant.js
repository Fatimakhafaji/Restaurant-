//  mongoose from 'mongoose';
const mongoose = require('mongoose');
 const restaurantSchema = new mongoose.Schema(
  {
   
     name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 500
    },
    cuisine: {
      type: [String],
      required:true,
      validate: array => array.length > 0
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true }
    },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true }
    },
    openingHours: {
      type: Object,
      default: {}
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      default: '/images/restaurant.jpg'
    }
    }
    
);

module.exports = mongoose.model('Restaurant', restaurantSchema);

