const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Signup Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

// OAuth Routes (Google, Facebook, Twitter, GitHub)
// Implement OAuth login functionality here

module.exports = router;
