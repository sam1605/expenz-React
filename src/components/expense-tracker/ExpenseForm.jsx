import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import './styles/ExpenseTracker.css';

const ExpenseForm = ({ onAddExpense, categories }) => {
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'General',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;
    
    onAddExpense({
      ...newExpense,
      id: Date.now(),
      amount: parseFloat(newExpense.amount)
    });
    
    setNewExpense({
      description: '',
      amount: '',
      category: 'General',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter description"
            value={newExpense.description}
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-input"
            placeholder="Enter amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={newExpense.category}
            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={newExpense.date}
            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full flex items-center justify-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;