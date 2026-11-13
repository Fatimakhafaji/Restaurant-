import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

 const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength:2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/]
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false 
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'restaurant_owner', 'client'],
        message: 'role should be admin or owner or client'
      },
      default: 'client'
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    // createdAt: {
    //   type: "timestamp",
    //   createDate: true,  
    // },
  },
 
);
export const User = mongoose.model('User', userSchema);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


