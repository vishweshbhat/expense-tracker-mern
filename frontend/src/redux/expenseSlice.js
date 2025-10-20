import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    category: "all",
    markAsDone: "Both",
    expenses: [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setMarkAsDone: (state, action) => {
      state.markAsDone = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const { setCategory, setMarkAsDone, setExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;
