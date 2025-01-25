const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
},
{ collection: "expenses" } // Explicitly set the collection name
);

module.exports = mongoose.model("Expense", expenseSchema);
