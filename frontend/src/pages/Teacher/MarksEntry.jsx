
// // // import React, { useState, useRef } from "react";
// // // import { Bar } from "react-chartjs-2";
// // // import {
// // //   Chart as ChartJS,
// // //   CategoryScale,
// // //   LinearScale,
// // //   BarElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend,
// // // } from "chart.js";

// // // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // // // Classes and students
// // // const classes = {
// // //   "10-A": ["Sharad", "Amit", "Rahul"],
// // //   "10-B": ["Riya", "Sneha", "Karan"],
// // //   "10-C": ["Ankit", "Meera", "Pooja"],
// // // };

// // // const examTypes = ["Midterm", "Final", "Quiz"];

// // // const MarksEntry = () => {
// // //   const [selectedClass, setSelectedClass] = useState("");
// // //   const [examType, setExamType] = useState("");
  
// // //   // Marks DB structure: { class: { examType: { scored: { student: X }, outOf: Y } } }
// // //   const [marksDB, setMarksDB] = useState({});
  
// // //   // Editing status per class + exam
// // //   const [editingStatus, setEditingStatus] = useState({});
  
// // //   const inputRefs = useRef([]);

// // //   // Get students of selected class
// // //   const students = selectedClass ? classes[selectedClass] : [];

// // //   const currentMarks = (marksDB[selectedClass]?.[examType]) || { scored: {}, outOf: 100 };
// // //   const isEditing = editingStatus[`${selectedClass}_${examType}`] ?? true;

// // //   const handleChange = (student, value) => {
// // //     setMarksDB(prev => ({
// // //       ...prev,
// // //       [selectedClass]: {
// // //         ...prev[selectedClass],
// // //         [examType]: {
// // //           ...prev[selectedClass]?.[examType],
// // //           scored: {
// // //             ...prev[selectedClass]?.[examType]?.scored,
// // //             [student]: Number(value),
// // //           },
// // //           outOf: prev[selectedClass]?.[examType]?.outOf ?? 100,
// // //         }
// // //       }
// // //     }));
// // //   };

// // //   const handleOutOfChange = (value) => {
// // //     setMarksDB(prev => ({
// // //       ...prev,
// // //       [selectedClass]: {
// // //         ...prev[selectedClass],
// // //         [examType]: {
// // //           ...prev[selectedClass]?.[examType],
// // //           scored: prev[selectedClass]?.[examType]?.scored ?? {},
// // //           outOf: Number(value),
// // //         }
// // //       }
// // //     }));
// // //   };

// // //   const handleKeyDown = (e, idx) => {
// // //     if (e.key === "Enter") {
// // //       e.preventDefault();
// // //       const nextIndex = idx + 1;
// // //       if (nextIndex < students.length) inputRefs.current[nextIndex].focus();
// // //     }
// // //   };

// // //   const handleSave = () => {
// // //     if (!selectedClass || !examType) return alert("Select class and exam first!");
// // //     setEditingStatus(prev => ({ ...prev, [`${selectedClass}_${examType}`]: false }));
// // //     alert(`Marks saved for ${examType} (${selectedClass})`);
// // //   };

// // //   const handleEdit = () => {
// // //     if (!selectedClass || !examType) return alert("Select class and exam first!");
// // //     setEditingStatus(prev => ({ ...prev, [`${selectedClass}_${examType}`]: true }));
// // //   };

// // //   // Class average
// // //   const averageMarks = students.length > 0
// // //     ? (students.reduce((sum, s) => sum + (currentMarks.scored[s] ?? 0), 0) / students.length / currentMarks.outOf * 100).toFixed(2)
// // //     : 0;

// // //   // Chart data
// // //   const chartData = {
// // //     labels: students,
// // //     datasets: [
// // //       {
// // //         label: `${examType || "Exam"} (%)`,
// // //         data: students.map(s => currentMarks.scored[s] && currentMarks.outOf ? (currentMarks.scored[s]/currentMarks.outOf)*100 : 0),
// // //         backgroundColor: "rgba(79, 70, 229, 0.7)",
// // //       }
// // //     ]
// // //   };

// // //   return (
// // //     <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">

// // //       <h2 className="text-2xl font-bold">Marks Entry</h2>

// // //       {/* Select Class */}
// // //       <div className="mb-4">
// // //         <label className="mr-3 font-semibold">Select Class:</label>
// // //         <select
// // //           value={selectedClass}
// // //           onChange={e => setSelectedClass(e.target.value)}
// // //           className="border p-2 rounded"
// // //         >
// // //           <option value="">-- Select Class --</option>
// // //           {Object.keys(classes).map(cls => (
// // //             <option key={cls} value={cls}>{cls}</option>
// // //           ))}
// // //         </select>
// // //       </div>

// // //       {/* Select Exam */}
// // //       {selectedClass && (
// // //         <div className="mb-4">
// // //           <label className="mr-3 font-semibold">Select Exam Type:</label>
// // //           <select
// // //             value={examType}
// // //             onChange={e => setExamType(e.target.value)}
// // //             className="border p-2 rounded"
// // //           >
// // //             <option value="">-- Select Exam --</option>
// // //             {examTypes.map(exam => (
// // //               <option key={exam} value={exam}>{exam}</option>
// // //             ))}
// // //           </select>
// // //         </div>
// // //       )}

// // //       {/* Out Of */}
// // //       {selectedClass && examType && (
// // //         <div className="mb-4">
// // //           <label className="mr-3 font-semibold">Out Of:</label>
// // //           <input
// // //             type="number"
// // //             min={1}
// // //             value={currentMarks.outOf}
// // //             onChange={e => handleOutOfChange(e.target.value)}
// // //             className="border p-2 rounded w-24"
// // //             disabled={!isEditing}
// // //           />
// // //         </div>
// // //       )}

// // //       {/* Student Marks */}
// // //       {selectedClass && examType && (
// // //         <div className="space-y-3">
// // //           {students.map((student, idx) => (
// // //             <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
// // //               <span className="flex-1 font-semibold">{idx + 1}. {student}</span>
// // //               <input
// // //                 ref={el => inputRefs.current[idx] = el}
// // //                 type="number"
// // //                 min={0}
// // //                 max={currentMarks.outOf}
// // //                 placeholder="Marks"
// // //                 value={currentMarks.scored[student] ?? ""}
// // //                 onChange={e => handleChange(student, e.target.value)}
// // //                 onKeyDown={e => handleKeyDown(e, idx)}
// // //                 className="border p-2 rounded w-32"
// // //                 disabled={!isEditing}
// // //               />
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}

// // //       {/* Save/Edit */}
// // //       {selectedClass && examType && (
// // //         <div className="space-x-4 mt-4">
// // //           {isEditing ? (
// // //             <button
// // //               onClick={handleSave}
// // //               className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
// // //             >
// // //               Save
// // //             </button>
// // //           ) : (
// // //             <button
// // //               onClick={handleEdit}
// // //               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// // //             >
// // //               Edit
// // //             </button>
// // //           )}
// // //         </div>
// // //       )}

// // //       {/* Class Average */}
// // //       {selectedClass && examType && (
// // //         <div className="mt-4 font-semibold">
// // //           Class Average for {examType} ({selectedClass}): <span className="text-indigo-600">{averageMarks}%</span>
// // //         </div>
// // //       )}

// // //       {/* Chart */}
// // //       {selectedClass && examType && (
// // //         <div className="mt-6">
// // //           <Bar
// // //             data={chartData}
// // //             options={{
// // //               responsive: true,
// // //               plugins: {
// // //                 legend: { display: false },
// // //                 title: {
// // //                   display: true,
// // //                   text: `Student Marks (%) - ${examType} (${selectedClass})`,
// // //                   font: { size: 18 },
// // //                 },
// // //               },
// // //               scales: {
// // //                 y: { beginAtZero: true, max: 100 },
// // //               },
// // //             }}
// // //           />
// // //         </div>
// // //       )}

// // //     </div>
// // //   );
// // // };

// // // export default MarksEntry;


// import React, { useState, useRef, useEffect, useContext } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import { Appcontext } from "../../context/Appcontext";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const examTypes = ["Midterm", "Final", "Quiz"];

// const MarksEntry = () => {

//   const {
//     teacherStudents,
//     getTeacherStudents,
//     saveStudentMarks,
//     getExamMarks,
//     teacherProfile
//   } = useContext(Appcontext);

//   const [examType, setExamType] = useState("");
//   const [outOf, setOutOf] = useState(100);
//   const [marksData, setMarksData] = useState({});
//   const [isEditing, setIsEditing] = useState(true);

//   const inputRefs = useRef([]);

//   // 🔹 Fetch students when teacherProfile loads
//   useEffect(() => {
//     if (teacherProfile) {
//       getTeacherStudents();
//       console.log(teacherProfile);
//     }
//   }, [teacherProfile]);

//   // 🔹 Load marks when exam changes
//   useEffect(() => {
//     const loadMarks = async () => {
//       if (!examType) return;

//       const existingMarks = await getExamMarks(examType);

//       let tempMarks = {};
//       let total = 100;

//       existingMarks?.forEach(item => {
//         tempMarks[item.student] = item.marksObtained;
//         total = item.outOf;
//       });

//       setMarksData(tempMarks);
//       setOutOf(total);
//       setIsEditing(existingMarks.length === 0); // if marks exist → disable editing
//     };

//     loadMarks();
//   }, [examType]);

//   // 🔹 Handle marks change
//   const handleChange = (studentId, value) => {
//     setMarksData(prev => ({
//       ...prev,
//       [studentId]: Number(value)
//     }));
//   };

//   // 🔹 Save Marks
//   const handleSave = async () => {

//     if (!examType) return alert("Select Exam Type");

//     const marksArray = teacherStudents.map(student => ({
//       studentId: student._id,
//       marks: marksData[student._id] || 0
//     }));

//     await saveStudentMarks(examType, outOf, marksArray);

//     setIsEditing(false);
//   };

//   // 🔹 Edit Mode
//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   // 🔹 Average Calculation
//   const averageMarks =
//     teacherStudents.length > 0
//       ? (
//           teacherStudents.reduce(
//             (sum, student) => sum + (marksData[student._id] || 0),
//             0
//           ) /
//           teacherStudents.length /
//           outOf *
//           100
//         ).toFixed(2)
//       : 0;

//   // 🔹 Chart Data
//   const chartData = {
//     labels: teacherStudents.map(s => s.fullName),
//     datasets: [
//       {
//         label: `${examType || "Exam"} (%)`,
//         data: teacherStudents.map(s =>
//           marksData[s._id]
//             ? (marksData[s._id] / outOf) * 100
//             : 0
//         ),
//         backgroundColor: "rgba(79, 70, 229, 0.7)",
//       }
//     ]
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">

//       <h2 className="text-2xl font-bold">
//         Marks Entry - {teacherProfile?.className} ({teacherProfile?.section})
//       </h2>

//       {/* Exam Select */}
//       <div>
//         <label className="mr-3 font-semibold">Select Exam Type:</label>
//         <select
//           value={examType}
//           onChange={e => setExamType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">-- Select Exam --</option>
//           {examTypes.map(exam => (
//             <option key={exam} value={exam}>{exam}</option>
//           ))}
//         </select>
//       </div>

//       {/* Out Of */}
//       {examType && (
//         <div>
//           <label className="mr-3 font-semibold">Out Of:</label>
//           <input
//             type="number"
//             min={1}
//             value={outOf}
//             onChange={e => setOutOf(Number(e.target.value))}
//             className="border p-2 rounded w-24"
//             disabled={!isEditing}
//           />
//         </div>
//       )}

//       {/* Student Marks */}
//       {examType && (
//         <div className="space-y-3">
//           {teacherStudents.map((student, idx) => (
//             <div key={student._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
//               <span className="flex-1 font-semibold">
//                 {idx + 1}. {student.fullName}
//               </span>
//               <input
//                 ref={el => inputRefs.current[idx] = el}
//                 type="number"
//                 min={0}
//                 max={outOf}
//                 placeholder="Marks"
//                 value={marksData[student._id] || ""}
//                 onChange={e => handleChange(student._id, e.target.value)}
//                 className="border p-2 rounded w-32"
//                 disabled={!isEditing}
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Save/Edit Buttons */}
//       {examType && (
//         <div className="space-x-4">
//           {isEditing ? (
//             <button
//               onClick={handleSave}
//               className="px-4 py-2 bg-green-500 text-white rounded"
//             >
//               Save
//             </button>
//           ) : (
//             <button
//               onClick={handleEdit}
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Edit
//             </button>
//           )}
//         </div>
//       )}

//       {/* Average */}
//       {examType && (
//         <div className="font-semibold">
//           Class Average: <span className="text-indigo-600">{averageMarks}%</span>
//         </div>
//       )}

//       {/* Chart */}
//       {examType && (
//         <div>
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { display: false },
//                 title: {
//                   display: true,
//                   text: `Student Marks (%) - ${examType}`,
//                   font: { size: 18 },
//                 },
//               },
//               scales: {
//                 y: { beginAtZero: true, max: 100 },
//               },
//             }}
//           />
//         </div>
//       )}

//     </div>
//   );
// };

// export default MarksEntry;


import React, { useState, useRef, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Appcontext } from "../../context/Appcontext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const examTypes = ["Midterm", "Final", "Quiz"];

const MarksEntry = () => {
 
  const {
  studentsdata,
  getAllStudents,
  saveStudentMarks,
  getExamMarks,
  teacherProfile
} = useContext(Appcontext);

  const [students, setStudents] = useState([]);
  const [examType, setExamType] = useState("");
  const [outOf, setOutOf] = useState(100);
  const [marksData, setMarksData] = useState({});
  const [isEditing, setIsEditing] = useState(true);

  const inputRefs = useRef([]);

  // ✅ Load all students once
  useEffect(() => {
    getAllStudents();
  }, []);

  // ✅ Filter students based on teacher class & section
  useEffect(() => {
    if (!teacherProfile || !studentsdata?.length) return;

    if (!teacherProfile.classTeacher) {
      alert("You are not assigned as class teacher");
      return;
    }

    const filteredStudents = studentsdata.filter(
      (student) =>
        String(student.Class).trim() === String(teacherProfile.className).trim() &&
        String(student.Section).trim() === String(teacherProfile.section).trim()
    );

    console.log("Filtered Students:", filteredStudents);

    setStudents(filteredStudents);

  }, [teacherProfile,studentsdata]);

  // ✅ Load marks when exam changes
  useEffect(() => {
    const loadMarks = async () => {
      if (!examType) return;

      const existingMarks = await getExamMarks(examType);

      let tempMarks = {};
      let total = 100;

      existingMarks?.forEach(item => {
        tempMarks[item.student] = item.marksObtained;
        total = item.outOf;
      });

      setMarksData(tempMarks);
      setOutOf(total);
      setIsEditing(existingMarks.length === 0);
    };

    loadMarks();
  }, [examType]);

  // Handle change
  const handleChange = (studentId, value) => {
    setMarksData(prev => ({
      ...prev,
      [studentId]: Number(value)
    }));
  };

  // Save marks
  const handleSave = async () => {

    if (!examType) return alert("Select Exam Type");

    const marksArray = students.map(student => ({
      studentId: student._id,
      marks: marksData[student._id] || 0
    }));

    await saveStudentMarks(examType, outOf, marksArray);

    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // Average
  const averageMarks =
    students.length > 0
      ? (
          students.reduce(
            (sum, student) => sum + (marksData[student._id] || 0),
            0
          ) /
          students.length /
          outOf *
          100
        ).toFixed(2)
      : 0;

  // Chart
  const chartData = {
    labels: students.map(s => s.fullName),
    datasets: [
      {
        label: `${examType || "Exam"} (%)`,
        data: students.map(s =>
          marksData[s._id]
            ? (marksData[s._id] / outOf) * 100
            : 0
        ),
        backgroundColor: "rgba(79, 70, 229, 0.7)",
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">

      <h2 className="text-2xl font-bold">
        Marks Entry - {teacherProfile?.className} ({teacherProfile?.section})
      </h2>

      {/* Exam Select */}
      <div>
        <label className="mr-3 font-semibold">Select Exam Type:</label>
        <select
          value={examType}
          onChange={e => setExamType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">-- Select Exam --</option>
          {examTypes.map(exam => (
            <option key={exam} value={exam}>{exam}</option>
          ))}
        </select>
      </div>

      {/* Out Of */}
      {examType && (
        <div>
          <label className="mr-3 font-semibold">Out Of:</label>
          <input
            type="number"
            min={1}
            value={outOf}
            onChange={e => setOutOf(Number(e.target.value))}
            className="border p-2 rounded w-24"
            disabled={!isEditing}
          />
        </div>
      )}

      {/* Students */}
      {examType && (
        <div className="space-y-3">
          {students.map((student, idx) => (
            <div key={student._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="flex-1 font-semibold">
                {idx + 1}. {student.Name}
              </span>
              <input
                ref={el => inputRefs.current[idx] = el}
                type="number"
                min={0}
                max={outOf}
                value={marksData[student._id] || ""}
                onChange={e => handleChange(student._id, e.target.value)}
                className="border p-2 rounded w-32"
                disabled={!isEditing}
              />
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      {examType && (
        <div className="space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
          )}
        </div>
      )}

      {/* Average */}
      {examType && (
        <div className="font-semibold">
          Class Average: <span className="text-indigo-600">{averageMarks}%</span>
        </div>
      )}

      {/* Chart */}
      {examType && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: `Student Marks (%) - ${examType}`,
                font: { size: 18 },
              },
            },
            scales: {
              y: { beginAtZero: true, max: 100 },
            },
          }}
        />
      )}

    </div>
  );
};

export default MarksEntry;