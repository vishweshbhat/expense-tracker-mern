// src/components/ExpenseCharts.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF5C93"];

/**
 * Try to extract a YYYY-MM-DD string from several possible inputs:
 * - "YYYY-MM-DD"
 * - ISO string "YYYY-MM-DDTHH:MM:SS..."
 * - epoch number (ms)
 * - return null if invalid
 */
const toYmd = (raw) => {
  if (!raw && raw !== 0) return null;
  if (typeof raw === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    if (raw.includes("T")) return raw.split("T")[0];
    // fallback: try Date.parse
    const parsed = Date.parse(raw);
    if (!Number.isNaN(parsed)) {
      const d = new Date(parsed);
      return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
    }
    return null;
  }
  if (typeof raw === "number") {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return null;
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
  }
  return null;
};

const ymdToTimestampUTC = (ymd) => {
  if (!ymd) return NaN;
  const parts = ymd.split("-");
  if (parts.length !== 3) return NaN;
  const [y, m, d] = parts.map(Number);
  return Date.UTC(y, m - 1, d); // midnight UTC
};

const formatDateFromTsUTC = (ts) => {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
};

const ExpenseCharts = ({ expenses = [] }) => {
  if (!expenses || expenses.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No data to show graphs yet.</p>;
  }

  // --- Category aggregation ---
  const categoryData = expenses.reduce((acc, curr) => {
    const amount = Number(curr.amount) || 0;
    const found = acc.find((a) => a.category === curr.category);
    if (found) found.amount += amount;
    else acc.push({ category: curr.category || "Unknown", amount });
    return acc;
  }, []);

  // --- Date aggregation (accepts date, createdAt, created_at) ---
  const map = new Map(); // key: timestamp (UTC midnight), value: amount
  for (const e of expenses) {
    // prefer explicit date field but fallback to createdAt / created_at
    const rawDate = e.date ?? e.createdAt ?? e.created_at;
    const ymd = toYmd(rawDate);
    if (!ymd) continue; // skip invalid / missing date
    const ts = ymdToTimestampUTC(ymd);
    if (Number.isNaN(ts)) continue;
    const amount = Number(e.amount) || 0;
    map.set(ts, (map.get(ts) || 0) + amount);
  }

  const dateData = Array.from(map.entries())
    .map(([timestamp, amount]) => ({
      timestamp,
      date: formatDateFromTsUTC(timestamp),
      amount,
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  // If you want to force at least two sample points for visuals (not recommended in prod),
  // you could optionally pad the data — but it's better to show actual data only.

  // Debugging: if chart appears empty, temporarily uncomment:
  // console.log("Prepared dateData:", dateData, "categoryData:", categoryData);

  return (
    <div style={{ marginTop: "3rem" }}>
      <h2 style={{ textAlign: "center" }}>Expense Analytics</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {/* Pie Chart: Category distribution */}
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
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Amount"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart: Expenses over time */}
        <div style={{ width: "500px", height: "300px" }}>
          <h3 style={{ textAlign: "center" }}>Expenses Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                type="number"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(ts) => formatDateFromTsUTC(ts)}
                tick={{ fontSize: 12 }}
              />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                labelFormatter={(label) => formatDateFromTsUTC(label)}
                formatter={(value) => [value, "Amount"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#0088FE"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
                connectNulls={true}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
