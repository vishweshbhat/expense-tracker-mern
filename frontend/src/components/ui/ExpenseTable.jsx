import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import UpdateExpense from "./UpdateExpense";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { setExpenses } from "../redux/expenseSlice";

const ExpenseTable = () => {
  const { expenses, category, markAsDone } = useSelector((store) => store.expense);
  const [localExpense, setLocalExpense] = useState([]);
  const dispatch = useDispatch();

  // Calculate total amount
  const totalAmount = localExpense.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/expense/remove/${expenseId}`, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        const filteredExpenses = expenses.filter((expense) => expense._id !== expenseId);
        dispatch(setExpenses(filteredExpenses));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete expense");
    }
  };

  const handlerCheckboxChange = async (expenseId) => {
    try {
      const expenseToUpdate = expenses.find((exp) => exp._id === expenseId);
      const res = await axios.put(
        `http://localhost:8000/api/v1/expense/update/${expenseId}`,
        { ...expenseToUpdate, done: !expenseToUpdate.done },
        {
          headers: { 'Content-type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.data.success) {
        const updatedExpenses = expenses.map((exp) =>
          exp._id === expenseId ? { ...exp, done: !exp.done } : exp
        );
        dispatch(setExpenses(updatedExpenses));
        toast.success("Status updated successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    // Apply filters
    let filteredExpenses = [...expenses];

    // Filter by category
    if (category && category !== 'all') {
      filteredExpenses = filteredExpenses.filter((expense) => expense.category === category);
    }

    // Filter by mark as done status
    if (markAsDone) {
      if (markAsDone === 'done') {
        filteredExpenses = filteredExpenses.filter((expense) => expense.done === true);
      } else if (markAsDone === 'Undone') {
        filteredExpenses = filteredExpenses.filter((expense) => !expense.done || expense.done === false);
      }
      // If 'Both' is selected, show all (no filtering needed)
    }

    setLocalExpense(filteredExpenses);
  }, [expenses, category, markAsDone]);

  return (
    <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Mark As Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localExpense.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
              {category || markAsDone ? 'No expenses found for the selected filters' : 'Add your first expense'}
            </TableCell>
          </TableRow>
        ) : (
          localExpense.map((expense) => (
            <TableRow key={expense._id} className={expense.done ? 'bg-gray-50' : ''}>
              <TableCell>
                <Checkbox
                  id={`checkbox-${expense._id}`}
                  checked={expense.done || false}
                  onCheckedChange={() => handlerCheckboxChange(expense._id)}
                />
              </TableCell>
              <TableCell className={`font-medium ${expense.done ? 'line-through text-gray-400' : ''}`}>
                {expense.description}
              </TableCell>
              <TableCell className={expense.done ? 'line-through text-gray-400' : ''}>
                ₹{expense.amount}
              </TableCell>
              <TableCell className={`capitalize ${expense.done ? 'line-through text-gray-400' : ''}`}>
                {expense.category}
              </TableCell>
              <TableCell className={expense.done ? 'line-through text-gray-400' : ''}>
                {expense.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    size="icon"
                    className="rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    variant="outline"
                    onClick={() => removeExpenseHandler(expense._id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                  <UpdateExpense expense={expense} />
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-bold text-xl">
            Total
          </TableCell>
          <TableCell className="text-right font-bold text-xl">
            ₹{totalAmount.toLocaleString()}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseTable;
