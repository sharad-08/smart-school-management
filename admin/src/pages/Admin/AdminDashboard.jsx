

// import React, { useState } from "react";
// import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

// const AdminDashboard = () => {
//   /* ================== DUMMY DATA ================== */

//   const [events, setEvents] = useState([
//     { title: "Unit Test Begins", date: "2026-02-25", type: "Exam" },
//     { title: "PTM Meeting", date: "2026-03-02", type: "Meeting" },
//     { title: "Monthly Fee Due", date: "2026-03-05", type: "Fees" },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "" });

//   const data = {
//     // Students
//     presentStudents: 450,
//     leftStudents: 50,
//     boys: 260,
//     girls: 190,

//     // Teachers
//     workingTeachers: 35,
//     leftTeachers: 5,
//     maleTeachers: 20,
//     femaleTeachers: 15,

//     // Fees
//     totalFeesCollected: "₹12,50,000",
//     pendingFees: "₹3,20,000",
//   };

//   const totalStudentAdmissions =
//     data.presentStudents + data.leftStudents;

//   const totalTeacherAdmissions =
//     data.workingTeachers + data.leftTeachers;

//   /* ================== ADD EVENT ================== */

//   const handleAddEvent = () => {
//     if (!newEvent.title || !newEvent.date) return;

//     setEvents([...events, newEvent]);
//     setNewEvent({ title: "", date: "", type: "" });
//     setShowModal(false);
//   };

//   /* ================== UI ================== */

//   return (
//     <div className="space-y-10">

//       {/* ================== STATS CARDS ================== */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

//         <StatCard
//           icon={<FaUserGraduate />}
//           title="Total Students"
//           value={totalStudentAdmissions}
//           color="bg-blue-500"
//         />

//         <StatCard
//           icon={<FaChalkboardTeacher />}
//           title="Total Teachers"
//           value={totalTeacherAdmissions}
//           color="bg-purple-500"
//         />

//         <StatCard
//           icon={<FaMoneyBillWave />}
//           title="Fees Collected"
//           value={data.totalFeesCollected}
//           color="bg-green-500"
//         />

//         <StatCard
//           icon={<FaCalendarAlt />}
//           title="Upcoming Events"
//           value={events.length}
//           color="bg-orange-500"
//         />

//       </div>

//       {/* ================== STUDENT + TEACHER BREAKDOWN ================== */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Student Overview */}
//         <SectionCard title="🎓 Student Overview">
//           <InfoRow label="Currently Studying" value={data.presentStudents} />
//           <InfoRow label="Students Left" value={data.leftStudents} />
//           <InfoRow label="Total Boys" value={data.boys} />
//           <InfoRow label="Total Girls" value={data.girls} />
//         </SectionCard>

//         {/* Teacher Overview */}
//         <SectionCard title="👩‍🏫 Teacher Overview">
//           <InfoRow label="Currently Working" value={data.workingTeachers} />
//           <InfoRow label="Teachers Left" value={data.leftTeachers} />
//           <InfoRow label="Male Teachers" value={data.maleTeachers} />
//           <InfoRow label="Female Teachers" value={data.femaleTeachers} />
//         </SectionCard>

//       </div>

//       {/* ================== CALENDAR + FEES ================== */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* ================== EVENT CALENDAR ================== */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">

//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-gray-700">
//               📅 School Events
//             </h2>

//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               + Add Event
//             </button>
//           </div>

//           <div className="space-y-3 max-h-64 overflow-y-auto">
//             {events.map((event, index) => (
//               <div
//                 key={index}
//                 className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
//               >
//                 <div>
//                   <p className="font-medium">{event.title}</p>
//                   <p className="text-sm text-gray-500">{event.type}</p>
//                 </div>
//                 <span className="text-blue-600 font-semibold">
//                   {event.date}
//                 </span>
//               </div>
//             ))}
//           </div>

//         </div>

//         {/* ================== FEES SECTION ================== */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">

//           <h2 className="text-lg font-semibold mb-4 text-gray-700">
//             💰 Fees Overview
//           </h2>

//           <div className="space-y-4">

//             <div className="flex justify-between bg-green-100 p-4 rounded-lg">
//               <span>Total Fees Collected</span>
//               <span className="font-bold text-green-700">
//                 {data.totalFeesCollected}
//               </span>
//             </div>

//             <div className="flex justify-between bg-red-100 p-4 rounded-lg">
//               <span>Pending Fees</span>
//               <span className="font-bold text-red-700">
//                 {data.pendingFees}
//               </span>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* ================== MODAL ================== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

//           <div className="bg-white p-6 rounded-xl w-96 space-y-4">
//             <h2 className="text-lg font-semibold">Add New Event</h2>

//             <input
//               type="text"
//               placeholder="Event Title"
//               value={newEvent.title}
//               onChange={(e) =>
//                 setNewEvent({ ...newEvent, title: e.target.value })
//               }
//               className="w-full border px-3 py-2 rounded-lg"
//             />

//             <input
//               type="date"
//               value={newEvent.date}
//               onChange={(e) =>
//                 setNewEvent({ ...newEvent, date: e.target.value })
//               }
//               className="w-full border px-3 py-2 rounded-lg"
//             />

//             <select
//               value={newEvent.type}
//               onChange={(e) =>
//                 setNewEvent({ ...newEvent, type: e.target.value })
//               }
//               className="w-full border px-3 py-2 rounded-lg"
//             >
//               <option value="">Select Type</option>
//               <option value="Exam">Exam</option>
//               <option value="Meeting">Meeting</option>
//               <option value="Fees">Fees</option>
//               <option value="Holiday">Holiday</option>
//             </select>

//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-400 text-white rounded-lg"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleAddEvent}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//               >
//                 Add
//               </button>
//             </div>
//           </div>

//         </div>
//       )}

//     </div>
//   );
// };

// /* ================== REUSABLE COMPONENTS ================== */

// const StatCard = ({ icon, title, value, color }) => (
//   <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4 hover:shadow-xl transition">
//     <div className={`p-4 rounded-full text-white ${color}`}>
//       {icon}
//     </div>
//     <div>
//       <h3 className="text-gray-500 text-sm">{title}</h3>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   </div>
// );

// const SectionCard = ({ title, children }) => (
//   <div className="bg-white shadow-lg rounded-2xl p-6">
//     <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
//     <div className="space-y-3">{children}</div>
//   </div>
// );

// const InfoRow = ({ label, value }) => (
//   <div className="flex justify-between border-b pb-2">
//     <span>{label}</span>
//     <span className="font-semibold">{value}</span>
//   </div>
// );

// export default AdminDashboard;


import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../../context/Appcontext";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCalendarAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const {
    totalStudents,
    totalTeachers,
    activeStudents,
    inactiveStudents,
    boys,
    girls,
    activeTeachers,
    inactiveTeachers,
    maleTeachers,
    femaleTeachers,
    getstudent,
    getTeachers,
  } = useContext(Appcontext);

  const [events, setEvents] = useState([
    { title: "Unit Test Begins", date: "2026-02-25", type: "Exam" },
    { title: "PTM Meeting", date: "2026-03-02", type: "Meeting" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "" });

  // ================= LOAD DATA =================
  useEffect(() => {
    getstudent();
    getTeachers();
  }, []);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    setEvents([...events, newEvent]);
    setNewEvent({ title: "", date: "", type: "" });
    setShowModal(false);
  };

  return (
    <div className="space-y-10">

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FaUserGraduate />} title="Total Students" value={totalStudents} color="bg-blue-500" />
        <StatCard icon={<FaChalkboardTeacher />} title="Total Teachers" value={totalTeachers} color="bg-purple-500" />
        <StatCard icon={<FaMoneyBillWave />} title="Fees Collected" value="₹12,50,000" color="bg-green-500" />
        <StatCard icon={<FaCalendarAlt />} title="Events" value={events.length} color="bg-orange-500" />
      </div>

      {/* ===== OVERVIEW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* STUDENTS */}
        <SectionCard title="🎓 Student Overview">
          <InfoRow label="Currently Studying" value={activeStudents} />
          <InfoRow label="Students Left" value={inactiveStudents} />
          <InfoRow label="Total Boys" value={boys} />
          <InfoRow label="Total Girls" value={girls} />
        </SectionCard>

        {/* TEACHERS */}
        <SectionCard title="👩‍🏫 Teacher Overview">
          <InfoRow label="Currently Working" value={activeTeachers} />
          <InfoRow label="Teachers Left" value={inactiveTeachers} />
          <InfoRow label="Male Teachers" value={maleTeachers} />
          <InfoRow label="Female Teachers" value={femaleTeachers} />
        </SectionCard>

      </div>

      {/* ===== EVENTS ===== */}
      <div className="bg-white shadow-lg rounded-2xl p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">📅 School Events</h2>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Event
          </button>
        </div>

        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex justify-between bg-gray-100 p-3 rounded-lg">
              <div>
                <p>{event.title}</p>
                <p className="text-sm text-gray-500">{event.type}</p>
              </div>
              <span>{event.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl space-y-4">

            <input
              type="text"
              placeholder="Event Title"
              className="border p-2 w-full"
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />

            <input
              type="date"
              className="border p-2 w-full"
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />

            <button
              onClick={handleAddEvent}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Event
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

/* ===== COMPONENTS ===== */

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4">
    <div className={`p-4 text-white rounded-full ${color}`}>{icon}</div>
    <div>
      <p>{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6">
    <h2 className="mb-4 font-semibold">{title}</h2>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b py-2">
    <span>{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default AdminDashboard;