import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BankUploadPage({ onUpload }) {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.every(t => "date" in t && "amount" in t)) {
        onUpload(parsed);
        navigate("/");
      } else {
        alert("Invalid format. Please upload a JSON array with `date` and `amount` fields.");
      }
    } catch {
      alert("Invalid JSON.");
    }
  };

  const handleBack = () => navigate("/");

  return (
    <div style={pageWrapper}>
      <div style={{ ...container, margin: 0 }}>
        <h2 style={heading}>📤 Upload Bank Transactions</h2>
        <p style={subText}>
          Paste your transaction data in JSON format.
        </p>
        <form onSubmit={handleSubmit} style={formStyle}>
          <label htmlFor="json-input" style={labelStyle}>JSON Input</label>
          <textarea
            id="json-input"
            rows={10}
            placeholder='e.g. [{"date":"2025-06-05","description":"ATM","amount":-500}]'
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={textareaStyle}
            required
          />
          <div style={buttonRow}>
            <button type="submit" style={primaryButton}>Upload</button>
            <button type="button" onClick={handleBack} style={secondaryButton}>Back to Dashboard</button>
          </div>
        </form>
      </div>
    </div>
  );
}

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

const container = {
  maxWidth: "700px",
  padding: "2rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  fontFamily: "Segoe UI, Roboto, sans-serif",
};

const heading = {
  marginBottom: "0.5rem",
  fontSize: "1.8rem",
  color: "#2c3e50",
};

const subText = {
  color: "#6c757d",
  marginBottom: "1.5rem",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "0.5rem",
  color: "#333",
};

const textareaStyle = {
  padding: "1rem",
  fontSize: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  resize: "vertical",
  fontFamily: "monospace",
  backgroundColor: "#fff",
};

const buttonRow = {
  display: "flex",
  gap: "1rem",
  marginTop: "1rem",
};

const primaryButton = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const secondaryButton = {
  padding: "0.75rem 1.5rem",
  backgroundColor: "#f0f0f0",
  color: "#333",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
};
