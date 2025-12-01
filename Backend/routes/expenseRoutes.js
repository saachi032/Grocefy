const express = require("express");
const router = express.Router();
const { addExpense, getExpenses, deleteExpense, updateExpense } = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

// Add new expense
router.post("/", protect, addExpense);

// Get all expenses for logged-in user
router.get("/", protect, getExpenses);

// Delete a specific expense
router.delete("/:id", protect, deleteExpense);

// Update a specific expense
router.put("/:id", protect, updateExpense);

module.exports = router;
