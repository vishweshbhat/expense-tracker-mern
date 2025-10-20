import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: "expense",
    initialState:{
        category:"",
        markAsDone:"",
        expenses:[]
    },
    reducers:{
        //actions
        setCategory:(state,action) => {
            state.category = action.payload;
        },
        setMarkAsDone :(state,action) => {
            state.markAsDone= action.payload;
        }, 
        setExpenses:(state,actions) =>{
            state.expenses = actions.payload;

        }
    }
});
export const {
    setCategory,
    setMarkAsDone,
    setExpenses
} = expenseSlice.actions;

export default expenseSlice.reducer;
