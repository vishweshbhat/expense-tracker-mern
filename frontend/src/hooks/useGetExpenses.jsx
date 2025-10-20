import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../redux/expenseSlice";

const useGetExpenses = () => {
  const dispatch = useDispatch();
  const { category, markAsDone } = useSelector((store) => store.expense);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        axios.defaults.withCredentials=true; //safety :)
        const res = await axios.get(`http://localhost:8000/api/v1/expense/getall?${category}&done=${markAsDone}`);
        if (res.data.success){
            dispatch(setExpenses(res.data.expenses));
        }
      } catch (error) {
        console.log(error);
        
      }
    };
    fetchExpenses();
  }, [dispatch, category, markAsDone]);
};

export default useGetExpenses;
