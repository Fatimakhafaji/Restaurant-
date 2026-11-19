const Meal = require('../models/Meal');
const Restaurant = require('../models/Restaurant');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.getAllMeals = catchAsync(async (req, res, next) => {
  const filter = { isAvailable: true };

  // category filter
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // restaurant filter
  if (req.query.restaurant) {
    filter.restaurant = req.query.restaurant;
  }

  // price range filter
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  // dietary filters
  if (req.query.isVegetarian) filter.isVegetarian = req.query.isVegetarian === 'true';
  if (req.query.isVegan) filter.isVegan = req.query.isVegan === 'true';
  if (req.query.isGlutenFree) filter.isGlutenFree = req.query.isGlutenFree === 'true';
  if (req.query.isSpicy) filter.isSpicy = req.query.isSpicy === 'true';

  // name search filter
  if (req.query.search) {
    filter.name = { $regex: req.query.search, $options: 'i' };
  }

  const meals = await Meal.find(filter).populate('restaurant', 'name cuisine address');

  res.status(200).json({
    status: 'success',
    results: meals.length,
    data: { meals }
  });
});

// get details of a specific meal by ID
exports.getMealById = catchAsync(async (req, res, next) => {
  const meal = await Meal.findById(req.params.id).populate('restaurant', 'name contact address');
  if (!meal) {
    return next(new AppError('this meal is not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { meal }
  });
});


// create new meal 
exports.createMeal = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById(req.body.restaurant);
  if (!restaurant) {
    return next(new AppError('restaurant not found', 404));
  }
//check role 
  if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('you dont have permission to do this', 403));
  }

  const newMeal = await Meal.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { meal: newMeal }
  });
});

//update meal info
exports.updateMeal = catchAsync(async (req, res, next) => {
  let meal = await Meal.findById(req.params.id).populate('restaurant');
  if (!meal) {
    return next(new AppError('meal not found', 404));
  }

  const restaurant = await Restaurant.findById(meal.restaurant);
  if (restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('you dont have permission to do this', 403));
  }

  meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: { meal }
  });
});
//delete meal 
exports.deleteMeal = catchAsync(async (req, res, next) => {
  const meal = await Meal.findById(req.params.id);
  if (!meal) {
    return next(new AppError('meal is not found', 404));
  }

  const restaurant = await Restaurant.findById(meal.restaurant);
  if (restaurant && restaurant.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return next(new AppError('you dont have permission to do this', 403));
  }

  await Meal.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    message: 'Delete is done'
  });
});