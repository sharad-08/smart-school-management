//  import React, { useState } from "react";

// /* ================= SAMPLE DATA ================= */
// const classesList = ["10A", "10B", "9A", "9B"];
// const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const lectureSlots = ["1st", "2nd", "3rd", "4th", "5th"];
// const teachersList = [
//   { id: 1, name: "Rahul Sharma" },
//   { id: 2, name: "Priya Singh" },
//   { id: 3, name: "Suresh Patel" },
// ];

// const subjectsList = ["Math", "Science", "English", "History", "Physics"];

// /* ================= COMPONENT ================= */
// const ClassTimeTable = () => {
//   const [selectedClass, setSelectedClass] = useState("");
  
//   // Sample timetable state
//   const [timetable, setTimetable] = useState({});

//   /* ================= HANDLE CHANGE ================= */
//   const handleChange = (day, slot, field, value) => {
//     if (!selectedClass) return alert("Please select a class first!");

//     setTimetable((prev) => ({
//       ...prev,
//       [selectedClass]: {
//         ...prev[selectedClass],
//         [day]: {
//           ...((prev[selectedClass] && prev[selectedClass][day]) || {}),
//           [slot]: {
//             ...((prev[selectedClass] && prev[selectedClass][day] && prev[selectedClass][day][slot]) || {}),
//             [field]: value,
//           },
//         },
//       },
//     }));
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6">
//         <h2 className="text-3xl font-bold mb-6 text-gray-700">
//           🏫 Class Timetable
//         </h2>

//         {/* ================= SELECT CLASS ================= */}
//         <div className="mb-6">
//           <label className="block font-semibold mb-2">Select Class</label>
//           <select
//             className="border px-3 py-2 rounded w-64"
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//           >
//             <option value="">Select Class</option>
//             {classesList.map((cls) => (
//               <option key={cls} value={cls}>
//                 {cls}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* ================= TIMETABLE ================= */}
//         {selectedClass && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm text-left border">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-4 py-2 border">Day / Slot</th>
//                   {lectureSlots.map((slot) => (
//                     <th key={slot} className="px-4 py-2 border">
//                       {slot} Lecture
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {daysOfWeek.map((day) => (
//                   <tr key={day} className="border-b">
//                     <td className="px-4 py-2 font-semibold border">{day}</td>
//                     {lectureSlots.map((slot) => {
//                       const entry =
//                         timetable[selectedClass]?.[day]?.[slot] || {};
//                       return (
//                         <td key={slot} className="px-2 py-2 border">
//                           <div className="flex flex-col space-y-1">
//                             <select
//                               value={entry.subject || ""}
//                               onChange={(e) =>
//                                 handleChange(day, slot, "subject", e.target.value)
//                               }
//                               className="border px-2 py-1 rounded w-full text-sm"
//                             >
//                               <option value="">Select Subject</option>
//                               {subjectsList.map((subj) => (
//                                 <option key={subj} value={subj}>
//                                   {subj}
//                                 </option>
//                               ))}
//                             </select>
//                             <select
//                               value={entry.teacher || ""}
//                               onChange={(e) =>
//                                 handleChange(day, slot, "teacher", e.target.value)
//                               }
//                               className="border px-2 py-1 rounded w-full text-sm"
//                             >
//                               <option value="">Select Teacher</option>
//                               {teachersList.map((t) => (
//                                 <option key={t.id} value={t.name}>
//                                   {t.name}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* ================= SAVE BUTTON ================= */}
//         {selectedClass && (
//           <div className="mt-6 text-right">
//             <button
//               onClick={() => console.log("Saved Timetable:", timetable)}
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Save Timetable
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClassTimeTable;


import React, { useState, useContext, useEffect } from "react";
import { Appcontext } from "../../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";


/* ================= SAMPLE DATA ================= */
const classesList = ["10A", "10B", "9A", "9B"];
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const lectureSlots = ["1st", "2nd", "3rd", "4th", "5th"];

const ClassTimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= FETCH TIMETABLE FROM BACKEND ================= */
  useEffect(() => {
    if (!selectedClass) return;

    const fetchTimetable = async () => {
      setLoading(true);
      try {
        // 1️⃣ Generate class timetable (backend will use teacher schedules)
        await axios.post("http://localhost:4000/api/classtimetable/generate", {
          className: selectedClass,
        });

        // 2️⃣ Fetch class timetable
        const res = await axios.get(
          `http://localhost:4000/api/classtimetable/${selectedClass}`
        );

        setTimetable({
          [selectedClass]: res.data.schedule,
        });
      } catch (error) {
        console.log(error);
        alert("Failed to load timetable. Check backend!");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [selectedClass]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (day, slot, field, value) => {
    if (!selectedClass) return alert("Please select a class first!");

    setTimetable((prev) => ({
      ...prev,
      [selectedClass]: {
        ...prev[selectedClass],
        [day]: {
          ...((prev[selectedClass] && prev[selectedClass][day]) || {}),
          [slot]: {
            ...((prev[selectedClass] &&
              prev[selectedClass][day] &&
              prev[selectedClass][day][slot]) ||
              {}),
            [field]: value,
          },
        },
      },
    }));
  };



  const handleSave = async () => {
  try {
    await axios.post("http://localhost:4000/api/classtimetable/save", {
      className: selectedClass,
      schedule: timetable[selectedClass],
    });

    toast.success("Timetable Saved Successfully ✅");
  } catch (error) {
    console.log(error);
    toast.error("Failed to save timetable ❌");
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          🏫 Class Timetable
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

        {loading && <p className="text-blue-600 font-semibold mb-4">Loading timetable...</p>}

        {/* ================= TIMETABLE ================= */}
        {selectedClass && !loading && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Day / Slot</th>
                  {lectureSlots.map((slot) => (
                    <th key={slot} className="px-4 py-2 border">
                      {slot} Lecture
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {daysOfWeek.map((day) => (
                  <tr key={day} className="border-b">
                    <td className="px-4 py-2 font-semibold border">{day}</td>
                    {lectureSlots.map((slot) => {
                      const entry =
                        timetable[selectedClass]?.[day]?.[slot] || {};
                      return (
                        <td key={slot} className="px-2 py-2 border">
                          <div className="flex flex-col space-y-1">
                            <input
                              value={entry.subject || ""}
                              onChange={(e) =>
                                handleChange(day, slot, "subject", e.target.value)
                              }
                              placeholder="Subject"
                              className="border px-2 py-1 rounded w-full text-sm"
                            />
                            <input
                              value={entry.teacher || ""}
                              onChange={(e) =>
                                handleChange(day, slot, "teacher", e.target.value)
                              }
                              placeholder="Teacher"
                              className="border px-2 py-1 rounded w-full text-sm"
                            />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= SAVE BUTTON ================= */}
        {selectedClass && !loading && (
          <div className="mt-6 text-right">
            {/* <button
              onClick={() => console.log("Saved Timetable:", timetable)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save Timetable
            </button> */}
            <button
  onClick={handleSave}
  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
>
  Save Timetable
</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassTimeTable;