import dotenv from "dotenv"
// import {AppDataSource} from "./src/config/database"
// import { name } from 'ajv/dist/compile/codegen/code';
// import { Column } from "typeorm";
import { connectDB } from './src/config/database.js';


dotenv.config(); 
const PORT = process.env.PORT || 5000;

// AppDataSource.initialize()
// .then(async()=>{
//     console.log("Connected to MongoDB");
//     console.log("DataBase Name:" ,AppDataSource.options.database);
//     console.log("Entity metadates:" ,AppDataSource.entityMetadatas.map(
//         e=>({
//             name:e.name,
//             tableName:e.tableName,
//             Columns:e.columns.map(c=>c.propertyName)
//         })))
// })

// أو مسار ملفك

// تشغيل الاتصال
connectDB();