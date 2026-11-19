const express = require('express');
const router = express.Router();
const restaurantController = require('../Controllers/restaurantController');
const { protect, restrictTo } = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { createRestaurantSchema ,updateRestaurantSchema } = require('../validations/restaurantValidation');

router.get('/', restaurantController.getAllRestaurants);
router.get('/owner/my-restaurants', protect, restrictTo('restaurant_owner', 'admin'), restaurantController.getMyRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.get('/:id/meals', restaurantController.getRestaurantMeals);
router.post(
  '/',
  protect,
  restrictTo('restaurant_owner', 'admin'),
  validate(createRestaurantSchema),
  restaurantController.createRestaurant
);

router.put(
  '/:id',
  protect,
  restrictTo('restaurant_owner', 'admin'),
  validate(updateRestaurantSchema),
  restaurantController.updateRestaurant
);

router.delete(
  '/:id',
  protect,
  restrictTo('restaurant_owner', 'admin'),
  restaurantController.deleteRestaurant
);

module.exports = router;