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
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Button } from "@/components/ui/button";
import { Trash2Icon, Edit2 } from "lucide-react";
import UpdateExpense from "./UpdateExpense.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ExpenseTable = () => {
  const { expenses } = useSelector((store) => store.expense);
  const [localExpense, setLocalExpense] = useState([]);

  // Calculate total amount
  const totalAmount = localExpense.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const removeExpenseHandler = async (expenseId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/expense/remove/${expenseId}`);
      if (res.data.success) {
        toast.success(res.data.message);
        const filteredExpenses = localExpense.filter((expense) => expense._id !== expenseId);
        setLocalExpense(filteredExpenses);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete expense");
    }
  };

  const handlerCheckboxChange = (expenseId) => {
    // Update the expense done status
    const updatedExpenses = localExpense.map((expense) => 
      expense._id === expenseId ? { ...expense, done: !expense.done } : expense
    );
    setLocalExpense(updatedExpenses);
  };

  useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]);

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
              Add your first expense
            </TableCell>
          </TableRow>
        ) : (
          localExpense.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell>
                <Checkbox
                  id={`checkbox-${expense._id}`}
                  checked={expense.done || false}
                  onCheckedChange={() => handlerCheckboxChange(expense._id)}
                />
              </TableCell>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell className="capitalize">{expense.category}</TableCell>
              <TableCell>{expense.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* <Button
                    size="icon"
                    className="rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    variant="outline"
                    onClick={() => removeExpenseHandler(expense._id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button> */}
                  {/* <Button
                    size="icon"
                    className="rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                    variant="outline"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button> */}
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

                  {/* <UpdateExpense/> */}
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
