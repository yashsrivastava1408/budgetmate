import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SummaryCharts({ totalIncome, totalExpense }) {
  // Convert expense to positive number for chart
  const incomeValue = Number(totalIncome) || 0;
  const expenseValue = Math.abs(Number(totalExpense)) || 0;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Income vs Expense",
        data: [incomeValue, expenseValue],
        backgroundColor: ["#4caf50", "#f44336"],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: { size: 14 },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "400px", margin: "2rem auto" }}>
      <h3 style={{ textAlign: "center", color: "#fff" }}>Income vs Expense</h3>
      <Pie data={data} options={options} />
    </div>
  );
}
