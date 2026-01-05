const Budget = require('../models/budgetModel');

// Get or create budget for user
const getBudget = async (req, res) => {
  try {
    let budget = await Budget.findOne({ userId: req.user._id });

    if (!budget) {
      // Create a default budget if none exists
      budget = await Budget.create({
        userId: req.user._id,
        monthlyBudget: 0,
      });
    }

    res.json({ success: true, budget });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update budget for user
const updateBudget = async (req, res) => {
  try {
    const { monthlyBudget } = req.body;

    let budget = await Budget.findOne({ userId: req.user._id });

    if (!budget) {
      budget = await Budget.create({
        userId: req.user._id,
        monthlyBudget: monthlyBudget || 0,
      });
    } else {
      if (monthlyBudget !== undefined) budget.monthlyBudget = monthlyBudget;
      await budget.save();
    }

    res.json({ success: true, budget });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBudget,
  updateBudget,
};
