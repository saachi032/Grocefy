const mongoose = require('mongoose');

const expenseSchema=mongoose.Schema(
    {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   item: {
      type: String,
      required: true,
    },

    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    date:
    {
        type: Date,
        required: true,

    },
    method: {
      type: String,
      enum: ["Cash", "Card", "UPI"],
      required: true,
    },
    category: {
        type: String,
        enum: ["Groceries", "Household", "Misc", "Dining"],
        required: true,
    },
    paidBy: {
        type: String,  
        required: true,
    },
    notes: {
        type: String,
        default: "",
    },
},
{ timestamps: true }

)
module.exports = mongoose.model("Expense", expenseSchema);