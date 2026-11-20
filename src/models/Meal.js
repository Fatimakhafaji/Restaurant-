const mongoose = require('mongoose');
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
      enum:  ['appetizer', 'main course', 'dessert', 'beverage', 'side dish'],
       
    },
    ingredients: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
        return Array.isArray(arr) && arr.length > 0;
    },
    message: 'Ingredients must be a non-empty array'
  }
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
      default: '/images/meals.jpg'
    }
  },

);
module.exports = mongoose.model('Meal', mealSchema);
