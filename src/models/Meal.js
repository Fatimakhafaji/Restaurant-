//const { string } = require('joi');
import mongoose from 'mongoose';

 const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: {
        values: ['appetizer', 'main course', 'dessert', 'beverage', 'side dish'],
        message: 'this is food category should be in the list'
      }
    },
    ingredients: {
      type: String,
      required: true,
      validate: array => array.length > 0
    },
    calories: {
      type: Number,
      min: 0
    },
    isVegetarian: {
      type: Boolean,
      default: false
    },
    isVegan: {
      type: Boolean,
      default: false
    },
    isGlutenFree: {
      type: Boolean,
      default: false
    },
    isSpicy: {
      type: Boolean,
      default: false
    },
    preparationTime: {
      type: Number,
      required: true,
      min: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      default: 'default-meal.jpg'//عدلي صورة 
    }
  },

);
export const Meal = mongoose.model('Meal', mealSchema);
