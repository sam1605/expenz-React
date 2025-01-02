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
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <ExpenseSummary
        totalExpenses={totalExpenses}
        categories={categories}
        transactionCount={expenses.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExpenseForm
          onAddExpense={addExpense}
          categories={categories}
          accounts={accounts}
        />
        <ExpenseChart expenses={expenses} />
      </div>

      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpense}
      />
    </div>
  );
};

export default App;