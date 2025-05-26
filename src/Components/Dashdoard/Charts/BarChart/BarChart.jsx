import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,

  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  return (
    <div >
      
      <Line
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              data: [80, 160, 140, 130, 90, 179, 100, 160, 70, 100, 60, 110],
              backgroundColor: "#D4A37336",
              height: "100%",
              borderRadius: 8,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              beginAtZero: true,
              grid: { display: false },
            },
          },
        }}
      />

    </div>
  );
}
