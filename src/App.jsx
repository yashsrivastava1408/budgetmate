import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./Dashboard";
import AddRecordPage from "./AddRecordPage";
import BankUploadPage from "./BankUploadPage";
import UnmatchedRecordsPage from "./UnmatchedRecordsPage";
import UnmatchedBankPage from "./UnmatchedBankPage";
import LoginPage from "./LoginPage";
import AllRecordsPage from "./AllRecordsPage";

const findUnmatched = (records, bankTransactions) =>
  records.filter(
    (record) =>
      !bankTransactions.some(
        (bankTx) => bankTx.date === record.date && bankTx.amount === record.amount
      )
  );

const findUnmatchedBank = (bankTransactions, records) =>
  bankTransactions.filter(
    (bankTx) =>
      !records.some(
        (record) => record.date === bankTx.date && record.amount === bankTx.amount
      )
  );

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [records, setRecords] = useState([]);
  const [bankTransactions, setBankTransactions] = useState([]);

  // Find unmatched records & bank transactions
  const unmatchedRecords = useMemo(() => findUnmatched(records, bankTransactions), [records, bankTransactions]);
  const unmatchedBankTransactions = useMemo(() => findUnmatchedBank(bankTransactions, records), [bankTransactions, records]);

  // Calculate total income and expense
  const totalIncome = useMemo(
    () => records.filter((r) => r.amount > 0).reduce((sum, r) => sum + r.amount, 0),
    [records]
  );

  const totalExpense = useMemo(
    () => records.filter((r) => r.amount < 0).reduce((sum, r) => sum + r.amount, 0),
    [records]
  );

  // Handlers
  const handleAddRecord = (newRecord) => {
    setRecords((prev) => [...prev, { ...newRecord, id: Date.now() }]);
  };

  const handleUpdateRecord = (id, updatedRecord) => {
    setRecords((prev) =>
      prev.map((record) => (record.id === id ? { ...record, ...updatedRecord } : record))
    );
  };

  const handleDeleteRecord = (id) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const handleBankUpload = (uploaded) => {
    setBankTransactions(uploaded);
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />

        {isLoggedIn ? (
          <>
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <Dashboard
                  unmatchedRecordsCount={unmatchedRecords.length}
                  unmatchedBankCount={unmatchedBankTransactions.length}
                  totalIncome={totalIncome}
                  totalExpense={totalExpense}
                />
              }
            />
            <Route path="/add-record" element={<AddRecordPage onAdd={handleAddRecord} />} />
            <Route path="/bank-upload" element={<BankUploadPage onUpload={handleBankUpload} />} />
            <Route
              path="/unmatched-records"
              element={<UnmatchedRecordsPage unmatchedRecords={unmatchedRecords} />}
            />
            <Route
              path="/unmatched-bank"
              element={<UnmatchedBankPage unmatchedBankTransactions={unmatchedBankTransactions} />}
            />
            <Route
              path="/all-records"
              element={
                <AllRecordsPage
                  records={records}
                  onUpdate={handleUpdateRecord}
                  onDelete={handleDeleteRecord}
                />
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}
