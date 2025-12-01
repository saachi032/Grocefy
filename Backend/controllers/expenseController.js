const Expense = require("../models/expenseModel");


// Add new expense
const addExpense = async (req, res) => {
  try {
    const { item, amount, date, method, category, paidBy, notes } = req.body;

    const expense = await Expense.create({
      userId: req.user._id,   // store ObjectId just like old data
      item,
      amount,
      date,
      method,
      category,
      paidBy,
      notes,
    });

    res.status(201).json({ success: true, expense });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Fetch all expenses that belong to logged-in user
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 
      userId: req.user._id   // matches your MongoDB documents
    }).sort({ date: -1 });

    res.json({ success: true, expenses });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    await expense.deleteOne();

    res.json({ success: true, message: "Expense deleted" });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Update expense
const updateExpense = async (req, res) => {
  try {
    const { item, amount, date, method, category, paidBy, notes } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { item, amount, date, method, category, paidBy, notes },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.json({ success: true, expense: updatedExpense });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};
