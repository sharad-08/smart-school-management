 import SummaryCards from "../../components/student/SummaryCards";
import AttendanceCalendar from "../../components/student/AttendanceCalendar";
import MarksChart from "../../components/student/MarksChart";
import PerformanceCircle from "../../components/student/PerformanceCircle";
import FeeCard from "../../components/student/FeeCard";
import ProfileCard from "../../components/student/ProfileCard";

const StudentDashboard = () => {
  return (
    <div className="  min-h-screen p-4">

      <h1 className="text-2xl font-bold mb-6">
        Welcome back, Rahul 👋
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          <SummaryCards />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AttendanceCalendar />
            <MarksChart />
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <ProfileCard />
          <PerformanceCircle />
          <FeeCard />
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;