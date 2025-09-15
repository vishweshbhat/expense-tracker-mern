import React from 'react';
import Navbar from '../Navbar';
import CreateExpense from './CreateExpense';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-6 flex items-center justify-between mb-5 px-4">
        <h1 className="text-2xl font-bold">Expense</h1>
        <CreateExpense />
      </div>
    </div>
  );
};

export default Home;
