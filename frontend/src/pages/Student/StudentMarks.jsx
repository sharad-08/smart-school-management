

import React, { useState } from "react";

const StudentMarks = () => {

  // 🔥 Some exams intentionally empty to test condition
  const examData = {
    "Weekly Test": [
      { subject: "Math", marks: 18, total: 20 },
      { subject: "Physics", marks: 17, total: 20 },
    ],
    "Quarterly Exam": [],
    "Half Yearly": [
      { subject: "Math", marks: 82, total: 100 },
      { subject: "Physics", marks: 80, total: 100 },
      { subject: "Chemistry", marks: 79, total: 100 },
    ],
    "Annual Exam": [],
    "Practical Exam": [
      { subject: "Physics Lab", marks: 45, total: 50 },
      { subject: "Chemistry Lab", marks: 48, total: 50 },
    ],
  };

  // ✅ Filter exams that have data
  const availableExams = Object.keys(examData).filter(
    (exam) => examData[exam] && examData[exam].length > 0
  );

  const [selectedExam, setSelectedExam] = useState(
    availableExams[0] || ""
  );

  const currentData = examData[selectedExam] || [];

  // 🔢 Calculations
  const totalMarks = currentData.reduce((sum, item) => sum + item.marks, 0);
  const totalMax = currentData.reduce((sum, item) => sum + item.total, 0);
  const percentage =
    totalMax > 0 ? Math.round((totalMarks / totalMax) * 100) : 0;

  const gpa = (percentage / 10).toFixed(2);

  const getGrade = (per) => {
    if (per >= 90) return "A+";
    if (per >= 80) return "A";
    if (per >= 70) return "B";
    if (per >= 60) return "C";
    return "D";
  };

  return (
    <div className="min-h-screen px-12">

      <h1 className="text-3xl font-bold text-indigo-700 mb-8">
        Examination Results
      </h1>

      {/* ================= FILTER DROPDOWN ================= */}
      {availableExams.length > 0 && (
        <div className="mb-8 max-w-xs">
          <label className="block mb-2 text-gray-600 font-medium">
            Select Exam
          </label>

          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300
              focus:ring-2 focus:ring-indigo-500
              shadow-sm hover:shadow-md transition-all"
          >
            {availableExams.map((exam, index) => (
              <option key={index} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* If No Exam Available */}
      {availableExams.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            No Exam Data Available
          </h2>
        </div>
      )}

      {/* ================= SUMMARY CARDS ================= */}
      {currentData.length > 0 && (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-gray-500">Total Marks</h3>
              <h2 className="text-3xl font-bold text-indigo-700 mt-2">
                {totalMarks} / {totalMax}
              </h2>
            </div>

            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-gray-500">Percentage</h3>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {percentage}%
              </h2>
            </div>

            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg
              hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-gray-500">GPA</h3>
              <h2 className="text-3xl font-bold text-purple-600 mt-2">
                {gpa}
              </h2>
            </div>

          </div>

          {/* ================= SUBJECT PERFORMANCE ================= */}
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg
            hover:shadow-2xl transition-all duration-300">

            <h2 className="text-xl font-semibold mb-6">
              {selectedExam} - Subject Performance
            </h2>

            <div className="space-y-6">
              {currentData.map((item, index) => {
                const per = Math.round((item.marks / item.total) * 100);

                return (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.subject}</span>
                      <span className="font-semibold text-indigo-600">
                        {item.marks}/{item.total} ({per}%)
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-500
                          h-3 rounded-full transition-all duration-700"
                        style={{ width: `${per}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ================= TABLE ================= */}
          <div className="mt-10 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg
            hover:shadow-2xl transition-all duration-300">

            <h2 className="text-xl font-semibold mb-6">
              Detailed Report
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-indigo-100 text-indigo-700">
                    <th className="p-3">Subject</th>
                    <th className="p-3">Marks</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">%</th>
                    <th className="p-3">Grade</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.map((item, index) => {
                    const per = Math.round(
                      (item.marks / item.total) * 100
                    );

                    return (
                      <tr
                        key={index}
                        className="hover:bg-indigo-50 transition-all duration-300"
                      >
                        <td className="p-3 font-medium">
                          {item.subject}
                        </td>
                        <td className="p-3">{item.marks}</td>
                        <td className="p-3">{item.total}</td>
                        <td className="p-3 text-indigo-600 font-semibold">
                          {per}%
                        </td>
                        <td className="p-3 font-bold">
                          {getGrade(per)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentMarks;
