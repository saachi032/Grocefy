const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, changePassword } = require('../controllers/userController.js');
const { protect } = require('../middleware/authMiddleware.js');

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in a user
router.post('/login', loginUser);

// Route for getting user profile (protected)
router.get('/profile', protect, getUserProfile);

// Route for updating user profile (protected)
router.put('/profile', protect, updateUserProfile);

// Route for changing password (protected)
router.put('/change-password', protect, changePassword);

module.exports = router;

//POST → create something
//GET → fetch something
//PUT/PATCH → update something
//DELETE → delete something