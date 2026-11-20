const express = require('express');
const router = express.Router();
const restaurantController = require('../Controllers/restaurantController');
const { protect, restrictTo } = require('../middlewares/auth');
const validate = require('../middlewares/validation');
const { createRestaurantSchema ,updateRestaurantSchema } = require('../validations/restaurantValidation');



/**
 * @swagger
 * tags:
 *   name: Restaurants
 *   description: Restaurant management endpoints
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: List of restaurants
 *   post:
 *     summary: Create a new restaurant (Owner / Admin)
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, cuisine, address, contact]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Al-Sham Grill
 *               description:
 *                 type: string
 *                 example: Authentic grilled dishes and traditional appetizers
 *               cuisine:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Middle Eastern", "Grills"]
 *               address:
 *                 $ref: '#/components/schemas/Address'
 *               contact:
 *                 $ref: '#/components/schemas/Contact'
 *               openingHours:
 *                 type: object
 *                 example:
 *                   monday:
 *                     open: "10:00"
 *                     close: "23:00"
 *               image:
 *                 type: string
 *                 example: default-restaurant.jpg
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (requires restaurant_owner or admin)
 */
router.get('/', restaurantController.getAllRestaurants);

router.post(
  '/',
  protect,
  restrictTo('restaurant_owner', 'admin'),
  validate(createRestaurantSchema),
  restaurantController.createRestaurant
);

/**
 * @swagger
 * /api/restaurants/owner/my-restaurants:
 *   get:
 *     summary: Get restaurants owned by the current user (Owner / Admin)
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Owner restaurants list
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/owner/my-restaurants', protect, restrictTo('restaurant_owner', 'admin'), restaurantController.getMyRestaurants);


/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Get restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Restaurant details
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Restaurant not found
 *   put:
 *     summary: Update restaurant by ID (Owner / Admin)
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant MongoDB ObjectId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Al-Sham Grill Updated
 *               description:
 *                 type: string
 *                 example: Updated description for the restaurant
 *               cuisine:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Middle Eastern"]
 *               address:
 *                 $ref: '#/components/schemas/Address'
 *               contact:
 *                 $ref: '#/components/schemas/Contact'
 *               openingHours:
 *                 type: object
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       400:
 *         description: Validation error or invalid ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Restaurant not found
 *   delete:
 *     summary: Delete restaurant by ID (Owner / Admin)
 *     tags: [Restaurants]
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
 *         description: Restaurant deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Restaurant not found
 */
router.get('/:id', restaurantController.getRestaurantById);

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

/**
 * @swagger
 * /api/restaurants/{id}/meals:
 *   get:
 *     summary: Get all meals belonging to a specific restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant MongoDB ObjectId
 *     responses:
 *       200:
 *         description: Meals for the specified restaurant
 *       404:
 *         description: Restaurant not found
 */
router.get('/:id/meals', restaurantController.getRestaurantMeals);




module.exports = router;