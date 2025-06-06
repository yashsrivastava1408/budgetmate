import React from "react";

export default function UnmatchedRecordsPage({ unmatchedRecords }) {
  return (
    <div style={container}>
      <h2 style={heading}>⚠️ Unmatched Manual Records</h2>
      {unmatchedRecords.length === 0 ? (
        <p style={successMsg}>✅ All records are matched with bank transactions.</p>
      ) : (
        <div style={tableWrapper}>
          <table style={table}>
            <thead>
              <tr style={tableHeaderRow}>
                <th style={th}>Date</th>
                <th style={th}>Description</th>
                <th style={th}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {unmatchedRecords.map((rec, idx) => (
                <tr key={idx} style={row}>
                  <td style={td}>{rec.date}</td>
                  <td style={td}>{rec.description}</td>
                  <td style={{ ...td, color: rec.amount >= 0 ? "#2e7d32" : "#c62828" }}>
                    {rec.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Styles

const container = {
  maxWidth: "800px",
  margin: "3rem auto",
  padding: "2rem",
  backgroundColor: "#fdfdfd",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', sans-serif",
};

const heading = {
  fontSize: "1.75rem",
  color: "#333",
  marginBottom: "1.5rem",
  textAlign: "center",
};

const successMsg = {
  color: "#2e7d32",
  fontWeight: "bold",
  textAlign: "center",
};

const tableWrapper = {
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px",
};

const tableHeaderRow = {
  backgroundColor: "#f1f1f1",
};

const th = {
  padding: "12px 16px",
  textAlign: "left",
  borderBottom: "2px solid #ccc",
  color: "#555",
};

const td = {
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
};

const row = {
  backgroundColor: "#fff",
  transition: "background 0.2s",
};
