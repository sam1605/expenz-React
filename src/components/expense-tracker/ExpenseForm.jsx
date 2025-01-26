import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import axios from 'axios';
import './styles/ExpenseTracker.css';

const ExpenseForm = ({ categories, accounts }) => {
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'General',
    account: 'HDFC CC',
    date: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false); // State for loader
  const [error, setError] = useState(null); // State for errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    if (!newExpense.description || !newExpense.amount) {
      alert("Description and Amount are required!");
      return;
    }

    try {
      setLoading(true); // Show loader
      setError(null); // Reset error state

      // Make the API call to the backend
      const response = await axios.post('http://localhost:5001/api/expenses', {
        title: newExpense.description,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        account: newExpense.account,
        date: newExpense.date,
      });

      console.log('Expense added:', response.data);

      // Clear the form fields after successful submission
      setNewExpense({
        description: '',
        amount: '',
        category: 'General',
        account: 'HDFC CC',
        date: new Date().toISOString().split('T')[0],
      });

      alert('Expense added successfully!');
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Failed to add expense. Please try again later.');
    } finally {
      setLoading(false); // Hide loader
    }
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
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-input"
            placeholder="Enter amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Account</label>
          <select
            className="form-select"
            value={newExpense.account}
            onChange={(e) => setNewExpense({ ...newExpense, account: e.target.value })}
          >
            {accounts.map((account) => (
              <option key={account} value={account}>
                {account}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? 'Adding...' : <><PlusCircle className="h-5 w-5" /> Add Expense</>}
        </button>
      </form>

      {error && <p className="error-message mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ExpenseForm;
