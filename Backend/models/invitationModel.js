const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema(
  {
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Family',
      required: true,
    },

    familyName: {
      type: String,
      required: true,
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    invitedByEmail: {
      type: String,
      required: true,
    },

    inviteeEmail: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending',
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invitation', invitationSchema);
