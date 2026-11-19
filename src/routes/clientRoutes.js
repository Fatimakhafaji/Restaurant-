const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/clientController');
const { protect, restrictTo } = require('../middlewares/auth');

router.use(protect, restrictTo('client', 'admin'));

router.get('/meals', clientController.getClientMeals);

router.get('/restaurants', clientController.getClientRestaurants);

router.get('/restaurants/:id', clientController.getRestaurantWithMeals);

router.get('/categories', clientController.getCategories);

module.exports = router;