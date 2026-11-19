const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const validate = require('../middlewares/validation');
const { registerSchema, loginSchema } = require('../validations/userValidation');
const { protect } = require('../middlewares/auth');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router;