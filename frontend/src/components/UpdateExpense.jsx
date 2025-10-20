import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "./ui/dialog.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.jsx";

import { Button } from './ui/button.jsx';
import { Label } from './ui/label.jsx';
import { Input } from './ui/input.jsx';
import { Loader2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { setExpenses } from '../redux/expenseSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const UpdateExpense = ({ expense }) => {
  const [formData, setFormData] = useState({
    description: expense.description || "",
    amount: expense.amount || "",
    category: expense.category || ""
  });

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { expenses } = useSelector(store => store.expense);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const changeCategoryHandler = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8000/api/v1/expense/update/${expense._id}`,
        formData,
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.data.success) {
        // Update the expense in the Redux state
        const updatedExpenses = expenses.map((exp) =>
          exp._id === expense._id ? res.data.expense : exp
        );
        dispatch(setExpenses(updatedExpenses));
        toast.success(res.data.message || "Expense updated successfully!");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
          variant="outline"
          onClick={() => setIsOpen(true)}
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-lg p-6 shadow-xl ring-1 ring-black ring-opacity-5">
        <DialogHeader>
          <DialogTitle>Update expense</DialogTitle>
          <DialogDescription>
            Make changes to your expense here. Click Update when done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={SubmitHandler} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={changeEventHandler}
              disabled={loading}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              placeholder="XXX in Rs."
              name="amount"
              value={formData.amount}
              onChange={changeEventHandler}
              disabled={loading}
            />
          </div>
          <div className="grid gap-3">
            <Label>Category</Label>
            <Select value={formData.category} onValueChange={changeCategoryHandler} disabled={loading}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md shadow-lg border border-gray-200">
                <SelectGroup>
                  <SelectItem
                    value="rent"
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    Rent
                  </SelectItem>
                  <SelectItem
                    value="food"
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    Food
                  </SelectItem>
                  <SelectItem
                    value="shopping"
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    Shopping
                  </SelectItem>
                  <SelectItem
                    value="travel"
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    Travel
                  </SelectItem>
                  <SelectItem
                    value="other"
                    className="hover:bg-gray-100 rounded-md px-2 py-1"
                  >
                    Other
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={loading}
                className="border-gray-400 text-gray-700 hover:bg-gray-100 rounded-md px-5 py-2 font-semibold"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin h-5 w-5" />}
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExpense;
