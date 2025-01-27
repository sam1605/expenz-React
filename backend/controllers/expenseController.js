const Expense = require("../models/expenseModel");

// Add a new expense
const addExpense = async (req, res) => {
  const { title, amount, date, category } = req.body;
  if (!title || !amount || !date || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all expenses
const getExpenses = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const expenses = await Expense.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  addExpense,
  getExpenses,
};
