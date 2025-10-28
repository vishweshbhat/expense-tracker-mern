// src/components/ExpenseCharts.jsx
import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF5C93"];

const ExpenseCharts = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No data to show graphs yet.</p>;
  }

  // Aggregate by category
  const categoryData = expenses.reduce((acc, curr) => {
    const found = acc.find((a) => a.category === curr.category);
    if (found) found.amount += curr.amount;
    else acc.push({ category: curr.category, amount: curr.amount });
    return acc;
  }, []);

  // Aggregate by date
  const dateData = expenses.reduce((acc, curr) => {
    const found = acc.find((a) => a.date === curr.date);
    if (found) found.amount += curr.amount;
    else acc.push({ date: curr.date, amount: curr.amount });
    return acc;
  }, []);

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2 style={{ textAlign: "center" }}>Expense Analytics</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: "2rem",
        marginTop: "2rem"
      }}>
        {/* Pie Chart */}
        <div style={{ width: "400px", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>Category-wise Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={{ width: "500px", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>Expenses Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
