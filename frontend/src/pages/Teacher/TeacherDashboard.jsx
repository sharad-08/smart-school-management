 import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TeacherDashboard = () => {
  const summaryCards = [
    { title: "Total Students", value: 120, color: "bg-indigo-600" },
    { title: "Present Today", value: 100, color: "bg-green-500" },
    { title: "Absent Today", value: 20, color: "bg-red-500" },
    { title: "Pending Attendance", value: 2, color: "bg-yellow-500" },
    { title: "Pending Marks Entry", value: 1, color: "bg-purple-500" },
  ];

  const attendancePercentage = Math.round(
    (summaryCards[1].value / summaryCards[0].value) * 100
  );

  const schedule = [
    { time: "9:00 - 10:00", subject: "Math", class: "8th A" },
    { time: "10:15 - 11:15", subject: "Science", class: "8th B" },
    { time: "11:30 - 12:30", subject: "English", class: "9th A" },
    { time: "1:30 - 2:30", subject: "History", class: "9th B" },
  ];

  const teacherProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    photo: "https://i.pravatar.cc/150?img=3",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-5 gap-6">
        {summaryCards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow hover:shadow-2xl hover:scale-105 transition duration-300 ${card.color} text-white`}
          >
            <h3 className="text-gray-100">{card.title}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Attendance Chart + Profile */}
      <div className="md:flex md:space-x-6 space-y-6 md:space-y-0">
        <div className="bg-white p-6 rounded-xl shadow flex-1">
          <h3 className="text-gray-500 mb-4 font-semibold">
            Attendance Today
          </h3>
          <div className="w-40 mx-auto">
            <CircularProgressbar
              value={attendancePercentage}
              text={`${attendancePercentage}%`}
              styles={buildStyles({
                textColor: "#4f46e5",
                pathColor: "#4f46e5",
                trailColor: "#d1d5db",
              })}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex-1 flex items-center space-x-4">
          <img
            src={teacherProfile.photo}
            alt="Teacher"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">{teacherProfile.name}</h3>
            <p className="text-gray-500">{teacherProfile.email}</p>
            <p className="text-gray-500 mt-2">
              Total Classes Today: {schedule.length}
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500 mb-4 font-semibold">Today's Schedule</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Time</th>
              <th className="py-2">Subject</th>
              <th className="py-2">Class</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-2">{item.time}</td>
                <td className="py-2">{item.subject}</td>
                <td className="py-2">{item.class}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Works */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500 mb-4 font-semibold">Pending Tasks</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Mark Attendance for Class 8th A</li>
          <li>Submit Marks for Science Class 9th B</li>
          <li>Approve Leave Requests</li>
          <li>Prepare Quiz for Math Class 10th</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
