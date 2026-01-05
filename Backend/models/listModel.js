const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { _id: true });

const listSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  items: [listItemSchema],
  status: {
    type: String,
    enum: ["Active", "Completed"],
    default: "Active",
  },
  isShared: {
    type: Boolean,
    default: false,
  },
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family",
    default: null,
  },
  color: {
    type: String,
    default: '#10B981',
  },
  icon: {
    type: String,
    default: 'ShoppingCart',
  },
}, { timestamps: true });

module.exports = mongoose.model("List", listSchema);
