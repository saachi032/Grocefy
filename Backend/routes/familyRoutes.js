const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  createFamily,
  getMyFamilies,
  joinFamily,
  getFamilyDetails,
} = require("../controllers/familyController");

// Create a family
router.post("/", protect, createFamily);

// Get all families created by the user
router.get("/", protect, getMyFamilies);

// Join family using code
router.post("/join", protect, joinFamily);

// Get specific family details
router.get("/:id", protect, getFamilyDetails);

module.exports = router;
