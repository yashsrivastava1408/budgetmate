import React, { useState } from "react";

export default function AddRecord({ onAdd }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !amount || !reason) return;

    onAdd({ date, amount: parseFloat(amount), reason });
    setDate("");
    setAmount("");
    setReason("");
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Add Record</button>
    </form>
  );
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxWidth: 400,
  margin: "0 auto"
};

const inputStyle = {
  padding: "0.8rem",
  fontSize: "1rem",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "0.8rem",
  fontSize: "1rem",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};
