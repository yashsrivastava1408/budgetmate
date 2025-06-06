import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecordPage({ onAdd }) {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income"); // added state for type

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !amount) {
      alert("Date and amount are required.");
      return;
    }

    onAdd({
      date,
      amount: parseFloat(amount),
      description,
      type, // include type in record
    });

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div style={pageWrapper}>
      <div style={{ ...container, margin: 0 }}>
        <h2 style={heading}>➕ Add New Financial Record</h2>
        <form onSubmit={handleSubmit} style={form}>
          <div style={formGroup}>
            <label style={label}>📅 Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={input}
            />
          </div>

          <div style={formGroup}>
            <label style={label}>💰 Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={input}
            />
          </div>

          {/* New select for Income/Expense */}
          <div style={formGroup}>
            <label style={label}>🔁 Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              style={input}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div style={formGroup}>
            <label style={label}>📝 Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional note"
              style={input}
            />
          </div>

          <div style={buttonGroup}>
            <button type="submit" style={submitButton}>Add Record</button>
            <button type="button" onClick={handleCancel} style={cancelButton}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Full screen wrapper with background gradient and center alignment
const pageWrapper = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right,rgb(29, 96, 222),rgb(208, 70, 70))",
  padding: "2rem",
  boxSizing: "border-box",
};

// Form container styling (centered box)
const container = {
  maxWidth: "600px",
  padding: "2rem",
  backgroundColor: "#fdfdfd",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', sans-serif",
};

const heading = {
  marginBottom: "1.5rem",
  fontSize: "1.8rem",
  color: "#2c3e50",
  textAlign: "center",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
};

const label = {
  marginBottom: "0.5rem",
  fontWeight: "bold",
  color: "#555",
};

const input = {
  padding: "0.75rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1rem",
};

const buttonGroup = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "1rem",
};

const submitButton = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#2e7d32",
  color: "#fff",
  fontSize: "1rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelButton = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#c62828",
  color: "#fff",
  fontSize: "1rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
