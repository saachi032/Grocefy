const express = require('express');
const router = express.Router();
const { getBudget, updateBudget } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

// Get budget for logged-in user
router.get('/', protect, getBudget);

// Update budget for logged-in user
router.put('/', protect, updateBudget);

module.exports = router;
