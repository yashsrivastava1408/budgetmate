import React, { useState } from "react";

export default function AllRecordsPage({ records, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    date: "",
    description: "",
    amount: 0,
  });

  const startEdit = (record) => {
    setEditingId(record.id);
    setEditData({
      date: record.date,
      description: record.description,
      amount: record.amount,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const saveEdit = () => {
    onUpdate(editingId, editData);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const deleteRecord = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      onDelete(id);
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={container}>
        <h2 style={heading}>📋 All Manual Records</h2>
        <div style={tableWrapper}>
          <table style={table}>
            <thead>
              <tr style={headerRow}>
                <th style={th}>Date</th>
                <th style={th}>Description</th>
                <th style={th}>Amount</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) =>
                editingId === record.id ? (
                  <tr key={record.id} style={editRow}>
                    <td style={td}>
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleChange}
                        style={input}
                      />
                    </td>
                    <td style={td}>
                      <input
                        type="text"
                        name="description"
                        value={editData.description}
                        onChange={handleChange}
                        style={input}
                      />
                    </td>
                    <td style={td}>
                      <input
                        type="number"
                        name="amount"
                        step="0.01"
                        value={editData.amount}
                        onChange={handleChange}
                        style={input}
                      />
                    </td>
                    <td style={td}>
                      <button onClick={saveEdit} style={btnPrimary}>Save</button>
                      <button onClick={cancelEdit} style={btnSecondary}>Cancel</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={record.id} style={row}>
                    <td style={td}>{record.date}</td>
                    <td style={td}>{record.description}</td>
                    <td
                      style={{
                        ...td,
                        color: record.amount < 0 ? "#c62828" : "#2e7d32",
                        fontWeight: "bold",
                      }}
                    >
                      {record.amount.toFixed(2)}
                    </td>
                    <td style={td}>
                      <button onClick={() => startEdit(record)} style={btnPrimary}>Edit</button>
                      <button onClick={() => deleteRecord(record.id)} style={btnDanger}>Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Full-page background wrapper
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

// Inner card/container
const container = {
  maxWidth: "900px",
  width: "100%",
  padding: "2rem",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', sans-serif",
};

const heading = {
  fontSize: "1.75rem",
  textAlign: "center",
  marginBottom: "1.5rem",
  color: "#333",
};

const tableWrapper = {
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "700px",
};

const headerRow = {
  backgroundColor: "#f4f4f4",
};

const row = {
  backgroundColor: "#fff",
  transition: "background 0.2s",
};

const editRow = {
  backgroundColor: "#fdfde8",
};

const th = {
  padding: "12px 16px",
  borderBottom: "2px solid #ccc",
  textAlign: "left",
  fontWeight: "bold",
  color: "#444",
};

const td = {
  padding: "12px 16px",
  borderBottom: "1px solid #eee",
};

const input = {
  width: "100%",
  padding: "6px 8px",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const btnPrimary = {
  padding: "6px 12px",
  marginRight: "6px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnSecondary = {
  padding: "6px 12px",
  backgroundColor: "#757575",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const btnDanger = {
  padding: "6px 12px",
  backgroundColor: "#d32f2f",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
