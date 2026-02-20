 import React, { useState } from "react";

const StudentTimetable = () => {

  const [activeTab, setActiveTab] = useState("class");

  // WEEKLY CLASS TIMETABLE
  const classTimetable = [
    { day: "Monday", subjects: ["Math", "English", "Science", "Computer"] },
    { day: "Tuesday", subjects: ["Physics", "Chemistry", "Math", "Sports"] },
    { day: "Wednesday", subjects: ["English", "Biology", "Math", "Art"] },
    { day: "Thursday", subjects: ["History", "Geography", "Computer", "Math"] },
    { day: "Friday", subjects: ["Science", "English", "Physics", "Library"] },
  ];

  // EXAM TIMETABLE
  const examTimetable = [
    { subject: "Mathematics", date: "20 March 2026", time: "9:00 AM - 12:00 PM", type: "Half Yearly" },
    { subject: "Science", date: "23 March 2026", time: "9:00 AM - 12:00 PM", type: "Half Yearly" },
    { subject: "English", date: "25 March 2026", time: "9:00 AM - 12:00 PM", type: "Half Yearly" },
  ];

  const upcomingExam = examTimetable[0];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
         Timetable
        </h1>
        <p className="text-gray-500">
          View class schedule and exam timetable
        </p>
      </div>

      {/* UPCOMING EXAM CARD */}
      {upcomingExam && (
        <div className="bg-blue-500  text-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Upcoming Exam</h2>
              <p className="mt-2 text-lg">{upcomingExam.subject}</p>
              <p className="text-sm opacity-90">
                {upcomingExam.date} | {upcomingExam.time}
              </p>
            </div>
            <i className="bx bx-alarm text-5xl opacity-70"></i>
          </div>
        </div>
      )}

      {/* TAB SWITCH */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("class")}
          className={`px-6 py-2 rounded-xl transition ${
            activeTab === "class"
              ? "bg-blue-600 text-white"
              : "bg-white shadow hover:bg-blue-100"
          }`}
        >
          Class Timetable
        </button>

        <button
          onClick={() => setActiveTab("exam")}
          className={`px-6 py-2 rounded-xl transition ${
            activeTab === "exam"
              ? "bg-blue-600 text-white"
              : "bg-white shadow hover:bg-blue-100"
          }`}
        >
          Exam Timetable
        </button>
      </div>

      {/* CLASS TIMETABLE */}
      {activeTab === "class" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classTimetable.map((day, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <i className="bx bx-calendar text-blue-500"></i>
                {day.day}
              </h2>

              <ul className="space-y-2">
                {day.subjects.map((subject, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <i className="bx bx-book text-green-500"></i>
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* EXAM TIMETABLE */}
      {activeTab === "exam" && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4">Subject</th>
                <th className="p-4">Exam Type</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {examTimetable.map((exam, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="p-4 flex items-center gap-2">
                    <i className="bx bx-book text-blue-500"></i>
                    {exam.subject}
                  </td>
                  <td className="p-4">{exam.type}</td>
                  <td className="p-4">{exam.date}</td>
                  <td className="p-4">{exam.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default StudentTimetable;
