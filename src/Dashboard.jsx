import React from "react";
import { useNavigate } from "react-router-dom";
import SummaryCharts from "./SummaryCharts";

export default function Dashboard({
  unmatchedRecordsCount,
  unmatchedBankCount,
  totalIncome,
  totalExpense,
}) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(to right,rgb(29, 96, 222),rgb(208, 70, 70))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        boxSizing: "border-box",
        margin: 0,
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#fff" }}>
        BudgetMate Dashboard
      </h1>

      <div style={cardContainer}>
        <div style={{ ...statCard, backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
          💰 Total Income: ₹{totalIncome.toFixed(2)}
        </div>
        <div style={{ ...statCard, backgroundColor: "#ffebee", color: "#c62828" }}>
          🧾 Total Expense: ₹{Math.abs(totalExpense).toFixed(2)}
        </div>
        <div style={{ ...statCard, backgroundColor: "#fffde7", color: "#f9a825" }}>
          ⚠️ Unmatched Records: {unmatchedRecordsCount}
        </div>
        <div style={{ ...statCard, backgroundColor: "#e3f2fd", color: "#1565c0" }}>
          🏦 Unmatched Bank Txns: {unmatchedBankCount}
        </div>
      </div>

      <div style={{ marginTop: "2rem", width: "100%", maxWidth: 500 }}>
        <button style={btnStyle} onClick={() => navigate("/add-record")}>
          ➕ Add Record
        </button>
        <button style={btnStyle} onClick={() => navigate("/bank-upload")}>
          🏦 Upload Bank Statement
        </button>
        <button style={btnStyle} onClick={() => navigate("/unmatched-records")}>
          🔍 View Unmatched Records
        </button>
        <button style={btnStyle} onClick={() => navigate("/unmatched-bank")}>
          🔍 View Unmatched Bank Transactions
        </button>
        <button style={btnStyle} onClick={() => navigate("/all-records")}>
          📄 View All Records
        </button>
      </div>

      {/* Summary Pie Chart */}
      <SummaryCharts totalIncome={totalIncome} totalExpense={totalExpense} />
    </div>
  );
}

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1rem",
  width: "100%",
  maxWidth: "900px",
  marginBottom: "2rem",
};

const statCard = {
  borderRadius: "12px",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1.2rem",
  fontWeight: "bold",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const btnStyle = {
  display: "block",
  width: "100%",
  padding: "1rem",
  marginBottom: "1rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  backgroundColor: "#2ecc71",
  color: "#fff",
  fontWeight: "bold",
};
