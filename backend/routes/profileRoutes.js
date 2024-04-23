const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

// Get Profile Route
router.get('/', profileController.getProfile);

// Edit Profile Route
router.put('/', profileController.editProfile);

module.exports = router;
