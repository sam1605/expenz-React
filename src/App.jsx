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
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Expenz</div>
          {/* Ellipsis Menu */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#x22EE;
          </button>
          <ul
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute bg-blue-500 text-white p-4 space-y-2 top-16 right-4 md:static md:flex md:space-y-0 md:space-x-4`}
          >
            <li>
              <a href="#summary" className="block hover:underline">
                Summary
              </a>
            </li>
            <li>
              <a href="#form" className="block hover:underline">
                Add Expense
              </a>
            </li>
            <li>
              <a href="#chart" className="block hover:underline">
                Chart
              </a>
            </li>
            <li>
              <a href="#list" className="block hover:underline">
                Expense List
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <section id="summary">
          <ExpenseSummary
            totalExpenses={totalExpenses}
            categories={categories}
            transactionCount={expenses.length}
          />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
