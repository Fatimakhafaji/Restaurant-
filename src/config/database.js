/*import "reflect-metadata"
import {DataSource} from "typeorm"
import {Restaurant} from "../models/Restaurant"
import {Meal} from "../models/Meal"
import {User} from "../models/User"
import { AppDataSource } from 'typeorm/commands/InitCommand.js';
  

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URL,
    useNewUrlParser : true,
    useUnifiedTopology :true,
    synchronize: true,
    logging: true,
    entities:[Restaurant,Meal,User],
    database :"restaurantDB"
});*/
import mongoose from "mongoose";
import {Restaurant} from "../models/Restaurant.js"
import {Meal} from "../models/Meal.js"
import {User} from "../models/User.js"

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
    //   await Restaurant.createCollection();
    //   await Meal.createCollection();
    //   await User.createCollection();
    
    // console.log("تم إنشاء الكيانات الثلاثة بنجاح!");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

