const express = require('express');
const router = express.Router();
const mealController = require('../Controllers/mealController');
const { protect, restrictTo } = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { createMealSchema , updateMealSchema} = require('../validations/mealValidation');


router.get('/', mealController.getAllMeals);
router.get('/:id', mealController.getMealById);
router.post('/', protect, restrictTo('restaurant_owner', 'admin'), validate(createMealSchema), mealController.createMeal);
router.put('/:id', protect, restrictTo('restaurant_owner', 'admin'), validate(updateMealSchema), mealController.updateMeal);
router.delete('/:id', protect, restrictTo('restaurant_owner', 'admin'), mealController.deleteMeal);

module.exports = router;