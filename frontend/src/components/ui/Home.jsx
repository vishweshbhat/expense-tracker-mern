import React from 'react';
import Navbar from '../Navbar';
import CreateExpense from './CreateExpense';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';
import { setCategory, setMarkAsDone } from '../../redux/expenseSlice';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseTable from '../ExpenseTable';
import ExpenseCharts from '../ExpenseCharts';
import useGetExpenses from '../../hooks/useGetExpenses';

const Home = () => {
  // Fetch all expenses when component mounts
  useGetExpenses();
  const dispatch = useDispatch();

  // Get expenses from Redux store
  const { expenses } = useSelector((state) => state.expense);

  const changeCategoryHandler = (value) => {
    dispatch(setCategory(value));
  };

  const changeDoneHandler = (value) => {
    dispatch(setMarkAsDone(value));
  };

  return (
    <div>
      <Navbar />

      {/* Header + Create Expense Button */}
      <div className="max-w-6xl mx-auto mt-6 flex items-center justify-between mb-5 px-4">
        <h1 className="text-2xl font-bold">Expense</h1>
        <CreateExpense />
      </div>

      {/* Filters + Expense Table */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <h1 className="font-medium text-lg flex items-center gap-2">
          Filter By:
          <div className="flex items-center gap-2 my-5">
            {/* Category Filter */}
            <Select onValueChange={changeCategoryHandler} defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md shadow-lg border border-gray-200">
                <SelectGroup>
                  <SelectItem value="all" className="hover:bg-gray-100 rounded-md px-2 py-1">
                    All
                  </SelectItem>
                  <SelectItem value="rent" className="hover:bg-gray-100 rounded-md px-2 py-1">
                    Rent
                  </SelectItem>
                  <SelectItem value="food" className="hover:bg-gray-100 rounded-md px-2 py-1">
                    Food
                  </SelectItem>
                  <SelectItem value="shopping" className="hover:bg-gray-100 rounded-md px-2 py-1">
                    Shopping
                  </SelectItem>
                  <SelectItem value="travel" className="hover:bg-gray-100 rounded-md px-2 py-1">
                    Travel
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Mark As Done Filter */}
            <Select onValueChange={changeDoneHandler} defaultValue="Both">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mark As" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md shadow-lg border border-gray-200">
                <SelectGroup>
                  <SelectItem value="Both" className="hover:bg-gray-100 rounded-md px-2 py-1">
                    Both
                  </SelectItem>
                  <SelectItem value="done" className="hover:bg-gray-100 rounded-md px-2 py-1">
                    Done
                  </SelectItem>
                  <SelectItem value="Undone" className="hover:bg-gray-100 rounded-md px-2 py-1">
                    Undone
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </h1>

        {/* Expense List/Table */}
        <ExpenseTable />

        {/* 📊 Charts below the table */}
        <div className="mt-10">
          <ExpenseCharts expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Home;
