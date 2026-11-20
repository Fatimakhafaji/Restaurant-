const express = require('express');
const router = express.Router();
const mealController = require('../Controllers/mealController');
const { protect, restrictTo } = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { createMealSchema , updateMealSchema} = require('../validations/mealValidation');



/**
 * @swagger
 * tags:
 *   name: Meals
 *   description: Meal management endpoints
 */

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Get all meals with optional filters
 *     tags: [Meals]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [appetizer, main course, dessert, beverage, side dish]
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: isVegetarian
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isVegan
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isGlutenFree
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isSpicy
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Filtered meals list
 *   post:
 *     summary: Create a new meal (Owner / Admin)
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, restaurant, description, price, category, ingredients, preparationTime]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mixed Grill Platter
 *               restaurant:
 *                 type: string
 *                 example: 6aff95b8db25306caa3fecf0
 *               description:
 *                 type: string
 *                 example: Grilled kebab and meat served with rice
 *               price:
 *                 type: number
 *                 example: 55
 *               category:
 *                 type: string
 *                 enum: [appetizer, main course, dessert, beverage, side dish]
 *                 example: main course
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["buharat", "meat", "rice"]
 *               calories:
 *                 type: number
 *                 example: 720
 *               isVegetarian:
 *                 type: boolean
 *                 example: false
 *               isVegan:
 *                 type: boolean
 *                 example: false
 *               isGlutenFree:
 *                 type: boolean
 *                 example: true
 *               isSpicy:
 *                 type: boolean
 *                 example: true
 *               preparationTime:
 *                 type: number
 *                 example: 20
 *               isAvailable:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *                 example: default-meal.jpg
 *     responses:
 *       201:
 *         description: Meal created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', mealController.getAllMeals);
router.post('/', protect, restrictTo('restaurant_owner', 'admin'), validate(createMealSchema), mealController.createMeal);



/**
 * @swagger
 * /api/meals/{id}:
 *   get:
 *     summary: Get meal by ID
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meal MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Meal details
 *       404:
 *         description: Meal not found
 *   put:
 *     summary: Update meal by ID (Owner / Admin)
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meal MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *                 enum: [appetizer, main course, dessert, beverage, side dish]
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               calories:
 *                 type: number
 *               isVegetarian:
 *                 type: boolean
 *               isVegan:
 *                 type: boolean
 *               isGlutenFree:
 *                 type: boolean
 *               isSpicy:
 *                 type: boolean
 *               preparationTime:
 *                 type: number
 *               isAvailable:
 *                 type: boolean
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meal updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Meal not found
 *   delete:
 *     summary: Delete meal by ID (Owner / Admin)
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meal MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Meal deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Meal not found
 */
router.get('/:id', mealController.getMealById);

router.put('/:id', protect, restrictTo('restaurant_owner', 'admin'), validate(updateMealSchema), mealController.updateMeal);
router.delete('/:id', protect, restrictTo('restaurant_owner', 'admin'), mealController.deleteMeal);

module.exports = router;