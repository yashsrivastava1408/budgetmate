import React from "react";

export default function UnmatchedBankPage({ unmatchedBankTransactions }) {
  return (
    <div style={pageWrapper}>
      <div style={container}>
        <h2 style={heading}>🔍 Unmatched Bank Transactions</h2>
        {unmatchedBankTransactions.length === 0 ? (
          <p style={message}>✅ All bank transactions have matching records.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr style={headerRow}>
                  <th style={th}>Date</th>
                  <th style={th}>Description</th>
                  <th style={th}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {unmatchedBankTransactions.map((rec, idx) => (
                  <tr key={idx} style={idx % 2 === 0 ? rowEven : rowOdd}>
                    <td style={td}>{rec.date}</td>
                    <td style={td}>{rec.description}</td>
                    <td style={{ ...td, color: rec.amount >= 0 ? "#2e7d32" : "#c62828", fontWeight: "bold" }}>
                      {rec.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Full page wrapper
const pageWrapper = {
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(to right, rgb(29, 96, 222), rgb(208, 70, 70))",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  boxSizing: "border-box",
};

// Styles inside the card
const container = {
  maxWidth: 900,
  width: "100%",
  padding: "2rem",
  backgroundColor: "#f9f9f9",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  fontFamily: "Segoe UI, Roboto, sans-serif",
};

const heading = {
  marginBottom: "1rem",
  fontSize: "1.8rem",
  color: "#2c3e50",
};

const message = {
  fontSize: "1rem",
  color: "#555",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "1rem",
  minWidth: "600px",
};

const headerRow = {
  backgroundColor: "#1976d2",
  color: "white",
};

const th = {
  padding: "0.75rem",
  textAlign: "left",
  fontSize: "1rem",
};

const td = {
  padding: "0.75rem",
  borderBottom: "1px solid #ddd",
};

const rowEven = {
  backgroundColor: "#ffffff",
};

const rowOdd = {
  backgroundColor: "#f1f1f1",
};
