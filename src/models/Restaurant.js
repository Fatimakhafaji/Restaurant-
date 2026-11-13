import mongoose from 'mongoose';
 const restaurantSchema = new mongoose.Schema(
  {
   
     name: {
      type: String,
      required: [true, 'Enter Restaurant Name'],
      unique: true,
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name must not exceed 100 characters']
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Restaurant owner is required']
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
      default: 'default-restaurant.jpg'//عدلي مسار الصورة 
    }
    }
    
);

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);

