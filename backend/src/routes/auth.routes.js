const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/register', authController.register);
router.post('/user/login', authController.login);
router.post('/user/logout', protect, authController.logout);
router.get('/user/profile', protect, authController.profile);

module.exports = router;