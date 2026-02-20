 import React, { useState } from "react";

const students = [
  { id: 1, name: "Sharad" },
  { id: 2, name: "Amit" },
  { id: 3, name: "Rahul" },
];

// Example previous attendance data
const previousAttendance = [
  { student: "Sharad", records: { Mon: "Present", Tue: "Absent", Wed: "Present" } },
  { student: "Amit", records: { Mon: "Absent", Tue: "Present", Wed: "Present" } },
  { student: "Rahul", records: { Mon: "Present", Tue: "Present", Wed: "Absent" } },
];

const AttendanceEntry = () => {
  const [attendance, setAttendance] = useState({});

  const handleChange = (id, status) => {
    setAttendance({ ...attendance, [id]: status });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">

      <h2 className="text-2xl font-bold">Attendance Entry</h2>

      {/* Attendance Entry */}
      <div className="space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
          >
            <span className="flex-1">
              <strong>{student.id}.</strong> {student.name}
            </span>
            <div className="space-x-3">
              <button
                onClick={() => handleChange(student.id, "Present")}
                className={`px-3 py-1 rounded text-white ${
                  attendance[student.id] === "Present"
                    ? "bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Present
              </button>
              <button
                onClick={() => handleChange(student.id, "Absent")}
                className={`px-3 py-1 rounded text-white ${
                  attendance[student.id] === "Absent"
                    ? "bg-red-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Absent
              </button>
            </div>
            <span className="ml-4 font-semibold">
              {attendance[student.id] || "-"}
            </span>
          </div>
        ))}
      </div>

      {/* Previous Attendance History */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Previous Attendance</h3>
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2">Roll No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Mon</th>
              <th className="p-2">Tue</th>
              <th className="p-2">Wed</th>
            </tr>
          </thead>
          <tbody>
            {previousAttendance.map((student) => (
              <tr key={student.student} className="text-center border-b hover:bg-gray-50">
                <td className="p-2">{students.find(s => s.name === student.student)?.id}</td>
                <td className="p-2">{student.student}</td>
                <td
                  className={`p-2 ${
                    student.records.Mon === "Present" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {student.records.Mon}
                </td>
                <td
                  className={`p-2 ${
                    student.records.Tue === "Present" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {student.records.Tue}
                </td>
                <td
                  className={`p-2 ${
                    student.records.Wed === "Present" ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {student.records.Wed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AttendanceEntry;
