const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getLists,
  createList,
  getList,
  updateList,
  deleteList,
} = require("../controllers/listController");

// Get all lists for logged-in user
router.get("/", protect, getLists);

// Create a new list
router.post("/", protect, createList);

// Get a single list
router.get("/:id", protect, getList);

// Update a list
router.put("/:id", protect, updateList);

// Delete a list
router.delete("/:id", protect, deleteList);

module.exports = router;
