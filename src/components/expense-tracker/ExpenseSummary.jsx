import React from 'react';
import { Wallet, TrendingUp,IndianRupee } from 'lucide-react';
import './styles/ExpenseTracker.css';

const ExpenseSummary = ({ totalExpenses, categories, transactionCount }) => {debugger
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="summary-card">
        <div className="summary-card-header">
          <h2 className="summary-card-title">Total Expenses</h2>
          <Wallet className="summary-card-icon h-5 w-5" />
        </div>
        <div className="summary-card-value">{totalExpenses.toFixed(2)}</div>
      </div>

      <div className="summary-card">
        <div className="summary-card-header">
          <h2 className="summary-card-title">Accounts</h2>
          <Wallet className="summary-card-icon h-5 w-5" />
        </div>
        <div className='summary-sub-card'>
          {/* <table>
            <thead><span>Credit Card</span></thead>
            <thead><span>Credit Card</span></thead>
          </table> */}
        <div className="summary-card-value">{totalExpenses.toFixed(2)}</div>
        <div className="summary-card-value">{totalExpenses.toFixed(2)}</div>
        <div className="summary-card-value">{totalExpenses.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="summary-card">
        <div className="summary-card-header">
          <h2 className="summary-card-title">Categories</h2>
          <TrendingUp className="summary-card-icon h-5 w-5" />
        </div>
        <div className="summary-card-value">{categories.length}</div>
      </div>

      <div className="summary-card">
        <div className="summary-card-header">
          <h2 className="summary-card-title">Transactions</h2>
          <IndianRupee className="summary-card-icon h-5 w-5" />
        </div>
        <div className="summary-card-value">{transactionCount}</div>
      </div>
    </div>
  );
};

export default ExpenseSummary;