import React from "react";

const schedule = [
  { time: "9:00 AM", class: "10-A", subject: "Maths" },
  { time: "10:00 AM", class: "9-B", subject: "Maths" },
  { time: "11:00 AM", class: "8-A", subject: "Maths" },
];

const TeacherSchedule = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-xl font-bold mb-4">Class Schedule</h2>

      {schedule.map((item, index) => (
        <div
          key={index}
          className="p-3 mb-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
        >
          <p><b>Time:</b> {item.time}</p>
          <p><b>Class:</b> {item.class}</p>
          <p><b>Subject:</b> {item.subject}</p>
        </div>
      ))}

    </div>
  );
};

export default TeacherSchedule;
