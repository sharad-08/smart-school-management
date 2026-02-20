import React from "react";

const StudentAttendance = () => {
  const attendanceData = [
    { subject: "Mathematics", present: 22, total: 25 },
    { subject: "Physics", present: 20, total: 25 },
    { subject: "Chemistry", present: 23, total: 25 },
    { subject: "English", present: 24, total: 25 },
  ];

  const overallPercentage = 92;

  return (
    <div className="min-h-screen px-12">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
         Attendance Overview
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SIDE - Percentage Card */}
        <div className="bg-white/70 backdrop-blur-lg 
          p-8 rounded-2xl shadow-lg 
          hover:shadow-2xl transition-all duration-300 
          hover:-translate-y-2 flex flex-col items-center">

          <h2 className="text-lg font-semibold mb-6">
            Overall Attendance
          </h2>

          {/* Circular Design */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute w-40 h-40 rounded-full border-8 border-indigo-200"></div>

            <div
              className="absolute w-40 h-40 rounded-full border-8 border-indigo-600 border-t-transparent rotate-45"
              style={{ transform: `rotate(${overallPercentage * 3.6}deg)` }}
            ></div>

            <span className="text-3xl font-bold text-indigo-700">
              {overallPercentage}%
            </span>
          </div>

          <p className="mt-4 text-gray-600">
            Keep it above 90% to maintain eligibility.
          </p>
        </div>

        {/* RIGHT SIDE - Subject Attendance */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg 
          p-8 rounded-2xl shadow-lg 
          hover:shadow-2xl transition-all duration-300 
          hover:-translate-y-2">

          <h2 className="text-lg font-semibold mb-6">
            Subject-wise Attendance
          </h2>

          <div className="space-y-6">
            {attendanceData.map((item, index) => {
              const percentage = Math.round(
                (item.present / item.total) * 100
              );

              return (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">
                      {item.subject}
                    </span>
                    <span className="font-semibold text-indigo-600">
                      {percentage}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 
                        h-3 rounded-full transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Attendance Table */}
      <div className="mt-10 bg-white/70 backdrop-blur-lg 
        p-8 rounded-2xl shadow-lg 
        hover:shadow-2xl transition-all duration-300">

        <h2 className="text-lg font-semibold mb-6">
          Detailed Attendance Record
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-100 text-indigo-700">
                <th className="p-3">Subject</th>
                <th className="p-3">Present</th>
                <th className="p-3">Total Classes</th>
                <th className="p-3">Percentage</th>
              </tr>
            </thead>

            <tbody>
              {attendanceData.map((item, index) => {
                const percentage = Math.round(
                  (item.present / item.total) * 100
                );

                return (
                  <tr
                    key={index}
                    className="hover:bg-indigo-50 transition-all duration-300"
                  >
                    <td className="p-3 font-medium">
                      {item.subject}
                    </td>
                    <td className="p-3">
                      {item.present}
                    </td>
                    <td className="p-3">
                      {item.total}
                    </td>
                    <td className="p-3 font-semibold text-indigo-600">
                      {percentage}%
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default StudentAttendance;
