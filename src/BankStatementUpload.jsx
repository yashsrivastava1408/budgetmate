import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
      ← Back to Dashboard
    </button>
  );
}

import React, { useState } from 'react';
import Papa from 'papaparse';

export default function BankStatementUpload({ onUpload }) {
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // You can customize parsing based on your bank's CSV columns
        // For example, look for columns: Date, Amount, Description
        const data = results.data.map(row => ({
          date: row.Date || row.TransactionDate || row['Booking Date'], // example
          amount: parseFloat(row.Amount || row.Value || row['Debit'] || row['Credit']),
          description: row.Description || row['Transaction Details'] || '',
        })).filter(t => t.date && !isNaN(t.amount));

        onUpload(data);
        setError('');
      },
      error: (err) => {
        setError('Error parsing CSV file');
        console.error(err);
      }
    });
  };

  return (
    <div>
      <label>Upload Bank Statement CSV:</label>
      <input type="file" accept=".csv,text/csv" onChange={handleFile} />
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}
