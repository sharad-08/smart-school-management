

import React, { useState, useContext, useEffect } from "react";
import { Appcontext } from "../../context/Appcontext";
import axios from "../../api";
import { toast } from "react-toastify";

const classesList = ["10A", "10B", "9A", "9B"];
const subjectsList = ["Math", "Science", "English", "History", "Physics"];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const lectureSlots = ["1st", "2nd", "3rd", "4th", "5th"];

const TeacherSchedule = () => {
  const { teachers, getTeachers, token } = useContext(Appcontext);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [schedule, setSchedule] = useState({});

  // ================= LOAD TEACHERS =================
  useEffect(() => {
    getTeachers();
  }, []);

  // ================= SEARCH =================
  
 const filteredTeachers = (teachers || []).filter((teacher) => {
  const name = teacher?.fullName?.toLowerCase() || "";
  const code = teacher?.employeeCode?.toString().toLowerCase() || "";
  const teacherId = teacher?.teacherId?.toLowerCase() || "";
  const searchValue = searchTerm?.toLowerCase() || "";

  return (
    name.includes(searchValue) ||
    code.includes(searchValue) ||
    teacherId.includes(searchValue)
  );
});
  // ================= LOAD EXISTING TIMETABLE =================
  const getTimetable = async (teacherId) => {
    try {
      const { data } = await axios.get(
        `/api/teacher-timetable/${teacherId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.schedule) {
        setSchedule((prev) => ({
          ...prev,
          [teacherId]: data.schedule,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (day, lecture, field, value) => {
    if (!selectedTeacher) return alert("Select teacher first!");

    setSchedule((prev) => ({
      ...prev,
      [selectedTeacher._id]: {
        ...prev[selectedTeacher._id],
        [day]: {
          ...prev[selectedTeacher._id]?.[day],
          [lecture]: {
            ...prev[selectedTeacher._id]?.[day]?.[lecture],
            [field]: value,
          },
        },
      },
    }));
  };

  // ================= SAVE =================
  const handleSave = async () => {
    if (!selectedTeacher) return alert("Select teacher first!");

    try {
      await axios.post(
        "/api/teacher-timetable",
        {
          teacherId: selectedTeacher._id,
          scheduleData: schedule[selectedTeacher._id],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Schedule Saved Successfully ✅");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Teacher Schedule</h2>

        {/* 🔍 SEARCH INPUT */}
        <input
          type="text"
          placeholder=" Employee Code..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedTeacher(null);
          }}
          className="w-full border px-3 py-2 rounded mb-3"
        />

        {/* 📋 FILTERED LIST */}
        {searchTerm && (
          <div className="border rounded mb-4 max-h-40 overflow-y-auto">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <div
                  key={teacher._id}
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    setSearchTerm("");
                    getTimetable(teacher._id);
                  }}
                  className="p-2 cursor-pointer hover:bg-blue-100 flex justify-between"
                >
                  <span className="font-medium">
                    {teacher.fullName}
                  </span>

                  <span className="text-gray-600">
                    ID: {teacher.teacherId}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">
                No teacher found
              </div>
            )}
          </div>
        )}

        {/* SHOW SELECTED TEACHER */}
        {selectedTeacher && (
          <div className="mb-4 font-semibold text-blue-600">
            Selected: {selectedTeacher.name} (ID: {selectedTeacher.employeeCode})
          </div>
        )}

        {/* ================= SCHEDULE ================= */}
        {selectedTeacher &&
          daysOfWeek.map((day) => (
            <div key={day} className="mb-6">
              <h3 className="font-semibold mb-2">{day}</h3>

              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Lecture</th>
                    <th className="border p-2">Class</th>
                    <th className="border p-2">Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {lectureSlots.map((slot) => (
                    <tr key={slot}>
                      <td className="border p-2">{slot}</td>

                      <td className="border p-2">
                        <select
                          className="w-full border p-1"
                          value={
                            schedule[selectedTeacher._id]?.[day]?.[
                              slot
                            ]?.class || ""
                          }
                          onChange={(e) =>
                            handleChange(
                              day,
                              slot,
                              "class",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select Class</option>
                          {classesList.map((cls) => (
                            <option key={cls} value={cls}>
                              {cls}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border p-2">
                        <select
                          className="w-full border p-1"
                          value={
                            schedule[selectedTeacher._id]?.[day]?.[
                              slot
                            ]?.subject || ""
                          }
                          onChange={(e) =>
                            handleChange(
                              day,
                              slot,
                              "subject",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Select Subject</option>
                          {subjectsList.map((subj) => (
                            <option key={subj} value={subj}>
                              {subj}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

        {selectedTeacher && (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save Schedule
          </button>
        )}
      </div>
    </div>
  );
};

export default TeacherSchedule;