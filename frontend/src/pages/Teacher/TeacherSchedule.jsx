// import React from "react";

// const schedule = [
//   { time: "9:00 AM", class: "10-A", subject: "Maths" },
//   { time: "10:00 AM", class: "9-B", subject: "Maths" },
//   { time: "11:00 AM", class: "8-A", subject: "Maths" },
// ];

// const TeacherSchedule = () => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg">

//       <h2 className="text-xl font-bold mb-4">Class Schedule</h2>

//       {schedule.map((item, index) => (
//         <div
//           key={index}
//           className="p-3 mb-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition"
//         >
//           <p><b>Time:</b> {item.time}</p>
//           <p><b>Class:</b> {item.class}</p>
//           <p><b>Subject:</b> {item.subject}</p>
//         </div>
//       ))}

//     </div>
//   );
// };

// export default TeacherSchedule;



import React, { useEffect, useState, useContext } from "react";
import axios from "../../api";
import { Appcontext } from "../../context/Appcontext";

const TeacherScheduleTable = () => {
  const { token, teacherProfile } = useContext(Appcontext);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);

  const periods = ["1st", "2nd", "3rd", "4th", "5th"]; // columns

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(
          `/api/teacher-timetable/${teacherProfile.teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSchedule(res.data.schedule || {});
      } catch (error) {
        console.log("Error fetching timetable:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (teacherProfile?.teacherId) {
      fetchSchedule();
    }
  }, [token, teacherProfile]);

  if (loading) return <p>Loading timetable...</p>;
  if (!schedule || Object.keys(schedule).length === 0) return <p>No timetable found.</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg overflow-auto">
      <h2 className="text-xl font-bold mb-4">Teacher Timetable</h2>

      <table className="table-auto border-collapse border border-gray-300 w-full text-center">
        <thead>
          <tr className="bg-indigo-100">
            <th className="border border-gray-300 px-4 py-2">Day</th>
            {periods.map((p) => (
              <th key={p} className="border border-gray-300 px-4 py-2">{p} Period</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(schedule).map(([day, dayPeriods]) => (
            <tr key={day}>
              <td className="border border-gray-300 px-4 py-2 font-semibold">{day}</td>
              {periods.map((p) => {
                const details = dayPeriods[p];
                return (
                  <td key={p} className="border border-gray-300 px-4 py-2">
                    {details ? `${details.class} - ${details.subject}` : "-"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherScheduleTable;