import React from "react";
import { Bar } from "react-chartjs-2";

const ContributionChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.author),
    datasets: [
      {
        label: "Commits",
        data: data.map((entry) => 1), // Each commit counted as 1
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ContributionChart;
