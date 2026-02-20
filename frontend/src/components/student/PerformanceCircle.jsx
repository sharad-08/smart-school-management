import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PerformanceCircle = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center">
      <h2 className="font-semibold mb-4">Overall Performance</h2>
      <div className="w-32 mx-auto">
        <CircularProgressbar value={85} text={`85%`} />
      </div>
    </div>
  );
};

export default PerformanceCircle;
