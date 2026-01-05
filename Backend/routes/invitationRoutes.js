const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  sendInvitation,
  getMyInvitations,
  respondToInvitation,
} = require("../controllers/invitationController");

// Send an invite
router.post("/", protect, sendInvitation);

// Get all my invites
router.get("/", protect, getMyInvitations);

// Accept or decline
router.post("/:id", protect, respondToInvitation);

module.exports = router;
