import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const MarksChart = () => {

  const data = {
    labels: ["Math", "English", "Physics", "Chemistry"],
    datasets: [
      {
        label: "Marks",
        data: [85, 90, 78, 88],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="font-semibold mb-4">Subject Performance</h2>
      <Bar data={data} />
    </div>
  );
};

export default MarksChart;
