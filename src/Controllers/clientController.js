const Meal = require('../models/Meal');
const Restaurant = require('../models/Restaurant');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getClientMeals = catchAsync(async (req, res, next) => {
  const filter = { isAvailable: true };

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  if (req.query.isVegetarian) filter.isVegetarian = req.query.isVegetarian === 'true';
  if (req.query.isVegan) filter.isVegan = req.query.isVegan === 'true';
  if (req.query.isGlutenFree) filter.isGlutenFree = req.query.isGlutenFree === 'true';
  if (req.query.isSpicy) filter.isSpicy = req.query.isSpicy === 'true';

  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const meals = await Meal.find(filter).populate('restaurant', 'name cuisine address contact');

  res.status(200).json({
    status: 'success',
    results: meals.length,
    data: { meals }
  });
});

exports.getClientRestaurants = catchAsync(async (req, res, next) => {
  const filter = { isActive: true };

  if (req.query.city) {
    filter['address.city'] = { $regex: req.query.city, $options: 'i' };
  }

  if (req.query.cuisine) {
    filter.cuisine = req.query.cuisine;
  }

  if (req.query.search) {
    filter.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const restaurants = await Restaurant.find(filter).populate('owner', 'name email');

  res.status(200).json({
    status: 'success',
    results: restaurants.length,
    data: { restaurants }
  });
});

exports.getRestaurantWithMeals = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findById( req.params.id,).populate(
    'owner',
    'name email phone'
  );

  if (!restaurant) {
    return next(new AppError('Restaurant is not found', 404));
  }

  const meals = await Meal.find({ restaurant: req.params.id, isAvailable: true });

  res.status(200).json({
    status: 'success',
    data: {
      restaurant,
      mealsCount: meals.length,
      meals
    }
  });
});

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = ['appetizer', 'main course', 'dessert', 'beverage', 'side dish'];

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: { categories }
  });
});