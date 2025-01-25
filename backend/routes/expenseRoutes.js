const express = require("express");
const router = express.Router();
const Expense = require("../models/expenseModel");

// Add a new expense
// POST /api/expenses
router.post('/', async (req, res) => {
  try {
    const { title, amount, date, category } = req.body; // Extract data from request body
    const newExpense = new Expense({ title, amount, date , category }); // Create a new expense document
    const savedExpense = await newExpense.save(); // Save to the database
    res.status(201).json(savedExpense); // Respond with the saved document
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


// curl -X POST http://localhost:5001/api/expenseRoutes \
// -H "Content-Type: application/json" \
// -d '{
//   "title": "Groceries",
//   "amount": 150,
//   "date": "2025-01-25"
//   "category":"test"
// }'