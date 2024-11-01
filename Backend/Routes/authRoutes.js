const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login',  authController.loginUser);

router.get('/refresh', authController.refreshToken);

router.post('/logout', authController.logOutUser);

module.exports = router;