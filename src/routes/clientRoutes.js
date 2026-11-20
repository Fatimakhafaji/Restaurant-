const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/clientController');
const { protect, restrictTo } = require('../middlewares/auth');

router.use(protect, restrictTo('client', 'admin'));

/**
 * @swagger
 * tags:
 *   name: Client
 *   description: Client browsing, search, and filtering endpoints (Client / Admin)
 */

/**
 * @swagger
 * /api/client/meals:
 *   get:
 *     summary: Browse and filter meals as a client
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
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
 *         description: Meals matching client filters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

router.get('/meals', clientController.getClientMeals);


/**
 * @swagger
 * /api/client/restaurants:
 *   get:
 *     summary: Browse and filter restaurants as a client
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurants matching client filters
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/restaurants', clientController.getClientRestaurants);

/**
 * @swagger
 * /api/client/restaurants/{id}:
 *   get:
 *     summary: Get a specific restaurant along with its meals
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Restaurant details and its meals
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Restaurant not found
 */
router.get('/restaurants/:id', clientController.getRestaurantWithMeals);


/**
 * @swagger
 * /api/client/categories:
 *   get:
 *     summary: Get available meal categories
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/categories', clientController.getCategories);

module.exports = router;