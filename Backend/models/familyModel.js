const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    familyName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    budget: {
      type: Number,
      default: 0,
    },

    selectedEmoji: {
      type: String,
      default: "🏡",
    },

    visibility: {
      type: String,
      enum: ["Private", "Invite Only"],
      default: "Private",
    },

    familyCode: {
      type: String,
      unique: true,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        email: { type: String },
        joined: { type: Boolean, default: false },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Family", familySchema);
