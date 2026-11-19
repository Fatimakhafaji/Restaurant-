const Restaurant = require('../models/Restaurant');
const Meal = require('../models/Meal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

// all restaurants 
exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find({ isActive: true }).populate('owner', 'name email');
  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    data: { restaurants }
  });
});
// restaurant by id 
exports.getRestaurantById = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id).populate('owner', 'name email phone');
  if (!restaurant) {
    return next(new AppError('there is no restaurant', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { restaurant }
  });
});

// list of meals for each reastaurant
exports.getRestaurantMeals = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return next(new AppError('restaurant unavailable', 404));
  }

  const meals = await Meal.find({ restaurant: req.params.id, isAvailable: true });
  res.status(200).json({
    status: 'success',
    results: meals.length,
    data: { meals }
  });
});

// create restaurant 
exports.createRestaurant = catchAsync(async (req, res, next) => {
  const restaurantData = {
      ...req.body,
      owner: req.user._id 
    }; 
  const newRestaurant = await Restaurant.create(restaurantData);

  res.status(201).json({
    status: 'success',
    data: { restaurant: newRestaurant }
  });
});

// update restaurant informayion
exports.updateRestaurant = catchAsync(async (req, res, next) => {
  let restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return next(new AppError('there is no restaurant', 404));
  }

  // auth check
  if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('you are not the owner of this restaurant', 403));
  }

  restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: { restaurant }
  });
});

// delete restaurant and all his meals
exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) {
    return next(new AppError('there is no restaurant to delete', 404));
  }
  if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('you cant delete ', 403));
  }
  await Meal.deleteMany({ restaurant: req.params.id });
  await Restaurant.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'delete done'
  });
});
//ownre's restaurent
exports.getMyRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find({ owner: req.user._id });
  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    data: { restaurants }
  });
});