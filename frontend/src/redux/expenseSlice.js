import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
    name: "expense",
    initialState:{
        category:"",
        markAsDone:"",
    },
    reducers:{
        //actions
        setCategory:(state,action) => {
            state.category = action.payload;
        },
        setMarkAsDone :(state,action) => {
            state.markAsDone= action.payload;
        } 
    }
});
export const {
    setCategory,
    setMarkAsDone
} = expenseSlice.actions;

export default expenseSlice.reducer;
