import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setMarkAsDone } from '../redux/expenseSlice.js';

const FilterExpense = () => {
  const dispatch = useDispatch();
  const { category, markAsDone } = useSelector(store => store.expense);

  const categoryChangeHandler = (value) => {
    dispatch(setCategory(value));
  };

  const markAsDoneChangeHandler = (value) => {
    dispatch(setMarkAsDone(value));
  };

  return (
    <div className="flex items-center gap-4 my-4">
      <span className="font-semibold text-lg">Filter By:</span>
      
      {/* Category Filter */}
      <Select value={category} onValueChange={categoryChangeHandler}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-md shadow-lg border border-gray-200">
          <SelectGroup>
            <SelectItem value="all" className="hover:bg-gray-100 rounded-md px-2 py-1">
              All Categories
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
            <SelectItem value="other" className="hover:bg-gray-100 rounded-md px-2 py-1">
              Other
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Mark As Done Filter */}
      <Select value={markAsDone} onValueChange={markAsDoneChangeHandler}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Mark As" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-md shadow-lg border border-gray-200">
          <SelectGroup>
            <SelectItem value="all" className="hover:bg-gray-100 rounded-md px-2 py-1">
              All
            </SelectItem>
            <SelectItem value="done" className="hover:bg-gray-100 rounded-md px-2 py-1">
              Done
            </SelectItem>
            <SelectItem value="pending" className="hover:bg-gray-100 rounded-md px-2 py-1">
              Pending
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterExpense;
