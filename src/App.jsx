import React, { useState, useEffect } from 'react';
import ExpenseSummary from './components/expense-tracker/ExpenseSummary';
import ExpenseForm from './components/expense-tracker/ExpenseForm';
import ExpenseChart from './components/expense-tracker/ExpenseChart';
import ExpenseList from './components/expense-tracker/ExpenseList';

const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const categories = ['Bills', 'Grocery', 'Fuel', 'Subscriptions', 'Swiggy/Zomato', 'Online-Shopping', 'Eating Out'];
  const accounts = ['HDFC', 'HDFC CC', 'ICICI', 'Kotak', 'Cash'];
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div>
      {/* Floating Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-title">Expense Tracker</div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
            <div className={`line ${menuOpen ? 'open' : ''}`}></div>
          </button>
          <ul className={`menu ${menuOpen ? 'open' : ''}`}>
            <li><a href="#summary">Summary</a></li>
            <li><a href="#form">Add Expense</a></li>
            <li><a href="#chart">Chart</a></li>
            <li><a href="#list">Expense List</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <section id="summary">
          <ExpenseSummary
            totalExpenses={totalExpenses}
            categories={categories}
            transactionCount={expenses.length}
          />
        </section>

        <div className="grid-container">
          <section id="form">
            <ExpenseForm
              onAddExpense={addExpense}
              categories={categories}
              accounts={accounts}
            />
          </section>
          <section id="chart">
            <ExpenseChart expenses={expenses} />
          </section>
        </div>

        <section id="list">
          <ExpenseList
            expenses={expenses}
            onDeleteExpense={deleteExpense}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
