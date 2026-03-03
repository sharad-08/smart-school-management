// //  import React, { useState } from "react";

// // const students = [
// //   { id: 1, name: "Sharad" },
// //   { id: 2, name: "Amit" },
// //   { id: 3, name: "Rahul" },
// // ];

// // // Example previous attendance data
// // const previousAttendance = [
// //   { student: "Sharad", records: { Mon: "Present", Tue: "Absent", Wed: "Present" } },
// //   { student: "Amit", records: { Mon: "Absent", Tue: "Present", Wed: "Present" } },
// //   { student: "Rahul", records: { Mon: "Present", Tue: "Present", Wed: "Absent" } },
// // ];

// // const AttendanceEntry = () => {
// //   const [attendance, setAttendance] = useState({});

// //   const handleChange = (id, status) => {
// //     setAttendance({ ...attendance, [id]: status });
// //   };

// //   return (
// //     <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">

// //       <h2 className="text-2xl font-bold">Attendance Entry</h2>

// //       {/* Attendance Entry */}
// //       <div className="space-y-3">
// //         {students.map((student) => (
// //           <div
// //             key={student.id}
// //             className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
// //           >
// //             <span className="flex-1">
// //               <strong>{student.id}.</strong> {student.name}
// //             </span>
// //             <div className="space-x-3">
// //               <button
// //                 onClick={() => handleChange(student.id, "Present")}
// //                 className={`px-3 py-1 rounded text-white ${
// //                   attendance[student.id] === "Present"
// //                     ? "bg-green-700"
// //                     : "bg-green-500 hover:bg-green-600"
// //                 }`}
// //               >
// //                 Present
// //               </button>
// //               <button
// //                 onClick={() => handleChange(student.id, "Absent")}
// //                 className={`px-3 py-1 rounded text-white ${
// //                   attendance[student.id] === "Absent"
// //                     ? "bg-red-700"
// //                     : "bg-red-500 hover:bg-red-600"
// //                 }`}
// //               >
// //                 Absent
// //               </button>
// //             </div>
// //             <span className="ml-4 font-semibold">
// //               {attendance[student.id] || "-"}
// //             </span>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Previous Attendance History */}
// //       <div className="mt-6">
// //         <h3 className="text-xl font-semibold mb-3">Previous Attendance</h3>
// //         <table className="w-full border border-gray-200">
// //           <thead>
// //             <tr className="bg-indigo-600 text-white">
// //               <th className="p-2">Roll No</th>
// //               <th className="p-2">Name</th>
// //               <th className="p-2">Mon</th>
// //               <th className="p-2">Tue</th>
// //               <th className="p-2">Wed</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {previousAttendance.map((student) => (
// //               <tr key={student.student} className="text-center border-b hover:bg-gray-50">
// //                 <td className="p-2">{students.find(s => s.name === student.student)?.id}</td>
// //                 <td className="p-2">{student.student}</td>
// //                 <td
// //                   className={`p-2 ${
// //                     student.records.Mon === "Present" ? "bg-green-100" : "bg-red-100"
// //                   }`}
// //                 >
// //                   {student.records.Mon}
// //                 </td>
// //                 <td
// //                   className={`p-2 ${
// //                     student.records.Tue === "Present" ? "bg-green-100" : "bg-red-100"
// //                   }`}
// //                 >
// //                   {student.records.Tue}
// //                 </td>
// //                 <td
// //                   className={`p-2 ${
// //                     student.records.Wed === "Present" ? "bg-green-100" : "bg-red-100"
// //                   }`}
// //                 >
// //                   {student.records.Wed}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //     </div>
// //   );
// // };

// // export default AttendanceEntry;
// import React, { useState, useEffect, useContext } from "react";
// import { Appcontext } from "../../context/Appcontext";

// const AttendanceEntry = () => {
//   const {
//     saveAttendance,
//     getDailyAttendance,
//     getTeacherProfile,
//     teacherProfile,
//     getAllStudents,
//     studentsdata,
//   } = useContext(Appcontext);

//   const [students, setStudents] = useState([]);
//   const [attendance, setAttendance] = useState({});
//   const [previousAttendance, setPreviousAttendance] = useState([]);
//   const [teacher, setTeacher] = useState(null);

//   const today = new Date().toISOString().split("T")[0];

  
//     useEffect(() => {
//    {
//         getAllStudents();
        
//       }
  
  
//     }, []);
//   useEffect(() => {
//   const init = async () => {
//     const teacherData = await getTeacherProfile();
//     console.log("Teacher:", teacherData); // now this works

//     if (!teacherData?.classTeacher) {
//       alert("You are not assigned as class teacher");
//       return;
//     }

//     setTeacher(teacherData);

//     // Fetch students for teacher's class
//     const res = await fetch(
//       `http://localhost:4000/api/student/class/${teacherData.className}/${teacherData.section}`
//     );
//     const data = await res.json();
//     setStudents(data);

//     loadTodayAttendance(teacherData);
//   };

//   init();
// }, []);
//   // useEffect(() => {
//   //   const init = async () => {
//   //     const teacherData = await getTeacherProfile();
//   //       console.log(teacherData)
//   //     if (!teacherData?.classTeacher) {
//   //       alert("You are not assigned as class teacher");
//   //       return;
//   //     }
//   //     setTeacher(teacherData);

//   //     // 🔥 Fetch students based on teacher class
//   //     const res = await fetch(
//   //       `http://localhost:4000/api/student/class/${teacherData.className}/${teacherData.section}`
//   //     );

//   //     const data = await res.json();
//   //     setStudents(data);

//   //     loadTodayAttendance(teacherData);
//   //   };

//   //   init();
//   // }, []);

//   const loadTodayAttendance = async (teacherData) => {
//     const data = await getDailyAttendance(
//       teacherData.className,
//       teacherData.section,
//       today
//     );

//     if (data) {
//       const formatted = {};
//       data.forEach((item) => {
//         formatted[item.studentId._id] = item.status;
//       });

//       setAttendance(formatted);
//       setPreviousAttendance(data);
//     }
//   };

//   const handleChange = (id, status) => {
//     setAttendance({ ...attendance, [id]: status });
//   };

//   const handleSave = async () => {
//     if (!teacher) return;

//     await saveAttendance(
//       attendance,
//       teacher.className,
//       teacher.section,
//       today
//     );

//     loadTodayAttendance(teacher);
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">

//       <h2 className="text-2xl font-bold">
//         Attendance - Class {teacher?.className}{teacher?.section}
//       </h2>

//       {/* Attendance Entry */}
//       <div className="space-y-3">
//         {students.map((student, index) => (
//           <div
//             key={student._id}
//             className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
//           >
//             <span className="flex-1">
//               <strong>{index + 1}.</strong> {student.fullName}
//             </span>

//             <div className="space-x-3">
//               <button
//                 onClick={() => handleChange(student._id, "Present")}
//                 className={`px-3 py-1 rounded text-white ${
//                   attendance[student._id] === "Present"
//                     ? "bg-green-700"
//                     : "bg-green-500 hover:bg-green-600"
//                 }`}
//               >
//                 Present
//               </button>

//               <button
//                 onClick={() => handleChange(student._id, "Absent")}
//                 className={`px-3 py-1 rounded text-white ${
//                   attendance[student._id] === "Absent"
//                     ? "bg-red-700"
//                     : "bg-red-500 hover:bg-red-600"
//                 }`}
//               >
//                 Absent
//               </button>
//             </div>

//             <span className="ml-4 font-semibold">
//               {attendance[student._id] || "-"}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Save Button */}
//       <button
//         onClick={handleSave}
//         className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
//       >
//         Save Attendance
//       </button>

//       {/* Today Attendance */}
//       <div className="mt-6">
//         <h3 className="text-xl font-semibold mb-3">
//           Today Attendance History
//         </h3>

//         <table className="w-full border border-gray-200">
//           <thead>
//             <tr className="bg-indigo-600 text-white">
//               <th className="p-2">Roll No</th>
//               <th className="p-2">Name</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {previousAttendance.map((item, index) => (
//               <tr key={item._id} className="text-center border-b">
//                 <td className="p-2">{index + 1}</td>
//                 <td className="p-2">{item.studentId.fullName}</td>
//                 <td
//                   className={`p-2 ${
//                     item.status === "Present"
//                       ? "bg-green-100"
//                       : "bg-red-100"
//                   }`}
//                 >
//                   {item.status}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AttendanceEntry;

import React, { useState, useEffect, useContext } from "react";
import { Appcontext } from "../../context/Appcontext";

const AttendanceEntry = () => {
  const {
    saveAttendance,
    getDailyAttendance,
    teacherProfile,
    getAllStudents,
    studentsdata: allStudents,
  } = useContext(Appcontext);

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [previousAttendance, setPreviousAttendance] = useState([]);
  const [teacher, setTeacher] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  // ✅ Load all students
  useEffect(() => {
    getAllStudents();
  }, []);

  // ✅ Filter students class & section wise
  useEffect(() => {
    if (!teacherProfile || allStudents.length === 0) return;

    if (!teacherProfile.classTeacher) {
      alert("You are not assigned as class teacher");
      return;
    }

    setTeacher(teacherProfile);

    const filteredStudents = allStudents.filter(
      (student) =>
        student.Class === teacherProfile.className &&
        student.Section === teacherProfile.section
    );

    setStudents(filteredStudents);

    loadTodayAttendance(teacherProfile);

  }, [teacherProfile, allStudents]);

   
  const loadTodayAttendance = async (teacherData) => {
  const data = await getDailyAttendance(
    teacherData.className,
    teacherData.section,
    today
  );

  console.log("TODAY ATTENDANCE:", data); // 👈 ADD THIS

  if (data) {
    const formatted = {};
    data.forEach((item) => {
      formatted[item.studentId?._id] = item.status;
    });

    setAttendance(formatted);
    setPreviousAttendance(data);
  }
};

  const handleChange = (id, status) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleSave = async () => {
    if (!teacher) return;

    await saveAttendance(
      attendance,
      teacher.className,
      teacher.section,
      today
    );

    loadTodayAttendance(teacher);
  };

  if (!teacher) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">

      <h2 className="text-2xl font-bold">
        Attendance - Class {teacher.className}{teacher.section}
      </h2>

      {/* Student List */}
      <div className="space-y-3">
        {students.length === 0 ? (
          <p>No students found for this class</p>
        ) : (
          students.map((student, index) => (
            <div
              key={student._id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <span className="flex-1">
                <strong>{index + 1}.</strong> {student.Name}
              </span>

              <div className="space-x-3">
                <button
                  onClick={() => handleChange(student._id, "Present")}
                  className={`px-3 py-1 rounded text-white ${
                    attendance[student._id] === "Present"
                      ? "bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  Present
                </button>

                <button
                  onClick={() => handleChange(student._id, "Absent")}
                  className={`px-3 py-1 rounded text-white ${
                    attendance[student._id] === "Absent"
                      ? "bg-red-700"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  Absent
                </button>
              </div>

              <span className="ml-4 font-semibold">
                {attendance[student._id] || "-"}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Save Attendance
      </button>

      {/* Today Attendance */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">
          Today Attendance History
        </h3>

        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2">Roll No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {previousAttendance.map((item, index) => (
              
              <tr key={item._id} className="text-center border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.studentId.Name}</td>
                <td
                  className={`p-2 ${
                    item.status === "Present"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {item.status}
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