const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const config = require('./src/config/config');
const connectDB = require('./src/config/database');

const AppError = require('./src/utils/AppError');
const errorHandler = require('./src/middlewares/errorHandling');

const authRoutes = require('./src/routes/authRoutes');
const restaurantRoutes = require('./src/routes/restaurantRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const clientRoutes = require('./src/routes/clientRoutes');

const app = express();
connectDB();


app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'the user has sent too many requests in a given amount of time (100 requests per 15 minutes). Please try again later.',
});
app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/client', clientRoutes);


app.all('/*splat', (req, res, next) => {
  next(new AppError(` Sorry the path${req.originalUrl} is not found on server`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server= app.listen(PORT, () => {
  console.log(`Server running in ${config.env} mode on port ${PORT}`);
});