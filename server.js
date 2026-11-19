import dotenv from "dotenv"
// import {AppDataSource} from "./src/config/database"
// import { name } from 'ajv/dist/compile/codegen/code';
// import { Column } from "typeorm";
import { connectDB } from './src/config/database.js';
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
dotenv.config(); 
//const PORT = process.env.PORT || 5000;

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

// 2. الوسائط الأساسية للحماية والبيانات
app.use(express.json());
app.use(cors());

// تحديد معدل الطلبات (Rate Limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'تجاوزت حد الطلبات المسموح به، يرجى المحاولة بعد 15 دقيقة'
});
app.use('/api', limiter);

// 3. ربط المسارات
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/restaurants', require('./src/routes/restaurantRoutes'));
app.use('/api/meals', require('./src/routes/mealRoutes'));
app.use('/api/client', require('./src/routes/clientRoutes'));

// 4. معالجة المسارات غير الموجودة (404)
app.all('*', (req, res, next) => {
  res.status(404).json({ status: 'fail', message: `المسار ${req.originalUrl} غير موجود على السيرفر` });
});

// 5. وسيط معالجة الأخطاء المركزي
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});