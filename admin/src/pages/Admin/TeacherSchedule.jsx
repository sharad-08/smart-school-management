 import React, { useState } from "react";

/* ================= SAMPLE DATA ================= */
const teachersList = [
  { id: 1, name: "Rahul Sharma" },
  { id: 2, name: "Priya Singh" },
  { id: 3, name: "Suresh Patel" },
];

const classesList = ["10A", "10B", "9A", "9B"];
const subjectsList = ["Math", "Science", "English", "History", "Physics"];

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const lectureSlots = ["1st", "2nd", "3rd", "4th", "5th"];

const TeacherSchedule = () => {
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [schedule, setSchedule] = useState({});

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (day, lecture, field, value) => {
    if (!selectedTeacher) return alert("Please select a teacher first!");

    setSchedule((prev) => ({
      ...prev,
      [selectedTeacher]: {
        ...prev[selectedTeacher],
        [day]: {
          ...prev[selectedTeacher]?.[day],
          [lecture]: {
            ...prev[selectedTeacher]?.[day]?.[lecture],
            [field]: value,
          },
        },
      },
    }));
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    if (!selectedTeacher) return alert("Select a teacher before saving!");
    console.log(`Schedule for ${selectedTeacher}:`, schedule[selectedTeacher]);
    alert(`Schedule for ${selectedTeacher} saved ✅`);
    // Save to backend
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">🗓 Teacher Schedule</h2>

        {/* ================= SELECT TEACHER ================= */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Teacher</label>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
          >
            <option value="">-- Select Teacher --</option>
            {teachersList.map((teacher) => (
              <option key={teacher.id} value={teacher.name}>
                {teacher.name} (ID: {teacher.id})
              </option>
            ))}
          </select>
        </div>

        {/* ================= SCHEDULE TABLES ================= */}
        {selectedTeacher &&
          daysOfWeek.map((day) => (
            <div key={day} className="mb-6">
              <h3 className="text-xl font-semibold mb-2 border-b pb-1">{day}</h3>

              <table className="min-w-full text-sm border rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2 border">Lecture</th>
                    <th className="px-4 py-2 border">Class</th>
                    <th className="px-4 py-2 border">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {lectureSlots.map((slot) => (
                    <tr key={slot} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{slot}</td>

                      <td className="px-4 py-2 border">
                        <select
                          className="w-full border px-2 py-1 rounded"
                          value={schedule[selectedTeacher]?.[day]?.[slot]?.class || ""}
                          onChange={(e) =>
                            handleChange(day, slot, "class", e.target.value)
                          }
                        >
                          <option value="">Select Class</option>
                          {classesList.map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </td>

                      <td className="px-4 py-2 border">
                        <select
                          className="w-full border px-2 py-1 rounded"
                          value={schedule[selectedTeacher]?.[day]?.[slot]?.subject || ""}
                          onChange={(e) =>
                            handleChange(day, slot, "subject", e.target.value)
                          }
                        >
                          <option value="">Select Subject</option>
                          {subjectsList.map((subj) => (
                            <option key={subj} value={subj}>{subj}</option>
                          ))}
                        </select>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

        <div className="text-right">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSchedule;
