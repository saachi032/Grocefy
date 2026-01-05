const Invitation = require("../models/invitationModel");
const Family = require("../models/familyModel");

// --- SEND INVITATION ---
const sendInvitation = async (req, res) => {
  try {
    const { familyId, email } = req.body;

    const family = await Family.findById(familyId);
    if (!family) {
      return res.status(404).json({ success: false, message: "Family not found" });
    }

    // Prevent duplicate invitations
    const exists = await Invitation.findOne({
      familyId,
      inviteeEmail: email,
      status: "pending",
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Invitation already sent to this email",
      });
    }

    const invitation = await Invitation.create({
      familyId,
      familyName: family.familyName,
      invitedBy: req.user._id,
      invitedByEmail: req.user.email,
      inviteeEmail: email,
    });

    res.status(201).json({
      success: true,
      message: "Invitation sent",
      invitation,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --- GET INVITATIONS FOR LOGGED-IN USER ---
const getMyInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({
      inviteeEmail: req.user.email,
      status: "pending",
    }).sort({ createdAt: -1 });

    res.json({ success: true, invitations });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// --- ACCEPT OR DECLINE INVITATION ---
const respondToInvitation = async (req, res) => {
  try {
    const { action } = req.body; // "accept" or "decline"
    const inviteId = req.params.id;

    const invitation = await Invitation.findById(inviteId);
    if (!invitation) {
      return res.status(404).json({ success: false, message: "Invitation not found" });
    }

    if (invitation.inviteeEmail !== req.user.email) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    if (action === "decline") {
      invitation.status = "declined";
      await invitation.save();
      return res.json({ success: true, message: "Invitation declined" });
    }

    if (action === "accept") {
      invitation.status = "accepted";
      await invitation.save();

      // Add user to family if not already
      const family = await Family.findById(invitation.familyId);

      const exists = family.members.find(
        m => m.userId?.toString() === req.user._id.toString()
      );

      if (!exists) {
        family.members.push({
          email: req.user.email,
          joined: true,
          userId: req.user._id,
        });
        await family.save();
      }

      return res.json({ success: true, message: "Invitation accepted", family });
    }

    return res.status(400).json({ success: false, message: "Invalid action" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  sendInvitation,
  getMyInvitations,
  respondToInvitation,
};
