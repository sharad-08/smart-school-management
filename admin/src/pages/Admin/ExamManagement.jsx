 import React, { useState } from "react";

/* ================= SAMPLE DATA ================= */
const classesList = ["10A", "10B", "9A", "9B"];
const subjectsList = ["Math", "Science", "English", "History", "Physics"];
const teachersList = [
  { id: 1, name: "Rahul Sharma" },
  { id: 2, name: "Priya Singh" },
  { id: 3, name: "Suresh Patel" },
];

const ExamSchedule = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [examSchedule, setExamSchedule] = useState({});

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (examIndex, field, value) => {
    setExamSchedule((prev) => {
      const classExams = prev[selectedClass] || [];
      const updatedExams = [...classExams];
      updatedExams[examIndex] = {
        ...updatedExams[examIndex],
        [field]: value,
      };
      return { ...prev, [selectedClass]: updatedExams };
    });
  };

  /* ================= ADD EXAM ================= */
  const addExam = () => {
    if (!selectedClass) return alert("Please select a class first!");
    const classExams = examSchedule[selectedClass] || [];
    setExamSchedule((prev) => ({
      ...prev,
      [selectedClass]: [
        ...classExams,
        { subject: "", date: "", time: "", teacher: "" },
      ],
    }));
  };

  /* ================= DELETE EXAM ================= */
  const deleteExam = (index) => {
    const classExams = examSchedule[selectedClass] || [];
    const updatedExams = classExams.filter((_, i) => i !== index);
    setExamSchedule((prev) => ({ ...prev, [selectedClass]: updatedExams }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          📝 Exam Schedule
        </h2>

        {/* ================= SELECT CLASS ================= */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Class</label>
          <select
            className="border px-3 py-2 rounded w-64"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classesList.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* ================= ADD EXAM BUTTON ================= */}
        {selectedClass && (
          <div className="mb-4">
            <button
              onClick={addExam}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add Exam
            </button>
          </div>
        )}

        {/* ================= EXAM TABLE ================= */}
        {selectedClass && examSchedule[selectedClass] && examSchedule[selectedClass].length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Subject</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Time</th>
                  <th className="px-4 py-2 border">Teacher</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {examSchedule[selectedClass].map((exam, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-2 py-2 border">
                      <select
                        className="border px-2 py-1 rounded w-full"
                        value={exam.subject}
                        onChange={(e) => handleChange(index, "subject", e.target.value)}
                      >
                        <option value="">Select Subject</option>
                        {subjectsList.map((subj) => (
                          <option key={subj} value={subj}>
                            {subj}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2 border">
                      <input
                        type="date"
                        className="border px-2 py-1 rounded w-full"
                        value={exam.date}
                        onChange={(e) => handleChange(index, "date", e.target.value)}
                      />
                    </td>
                    <td className="px-2 py-2 border">
                      <input
                        type="time"
                        className="border px-2 py-1 rounded w-full"
                        value={exam.time}
                        onChange={(e) => handleChange(index, "time", e.target.value)}
                      />
                    </td>
                    <td className="px-2 py-2 border">
                      <select
                        className="border px-2 py-1 rounded w-full"
                        value={exam.teacher}
                        onChange={(e) => handleChange(index, "teacher", e.target.value)}
                      >
                        <option value="">Select Teacher</option>
                        {teachersList.map((t) => (
                          <option key={t.id} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2 border">
                      <button
                        onClick={() => deleteExam(index)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= SAVE BUTTON ================= */}
            <div className="mt-4 text-right">
              <button
                onClick={() => console.log("Saved Exam Schedule:", examSchedule)}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save Schedule
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamSchedule;
