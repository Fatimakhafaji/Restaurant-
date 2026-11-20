const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const validate = require('../middlewares/validation');
const { registerSchema, loginSchema } = require('../validations/userValidation');
const { protect } = require('../middlewares/auth');


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and current user profile
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: Fatima Khafaji
 *               email:
 *                 type: string
 *                 format: email
 *                 example: fatima@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: Secret123
 *               role:
 *                 type: string
 *                 enum: [admin, restaurant_owner, client]
 *                 default: client
 *                 example: restaurant_owner
 *               phone:
 *                 type: string
 *                 example: "+963912345678"
 *               address:
 *                 type: string
 *                 example: Latakia
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or duplicate email
 */
router.post('/register', validate(registerSchema), authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: fatima@example.com
 *               password:
 *                 type: string
 *                 example: Secret123
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get currently authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Unauthorized or invalid token
 */
router.get('/me', protect, authController.getMe);

module.exports = router;