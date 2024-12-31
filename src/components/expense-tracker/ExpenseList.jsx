import React from 'react';
import './styles/ExpenseTracker.css';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const getCategoryBadgeClass = (category) => {
    return `category-badge category-badge-${category.toLowerCase()}`;
  };

  return (
    <div className="card">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        <div className="overflow-x-auto">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense.id} className="expense-row">
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.description}</td>
                  <td>
                    <span className={getCategoryBadgeClass(expense.category)}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="amount-display">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td>
                    <button
                      onClick={() => onDeleteExpense(expense.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;