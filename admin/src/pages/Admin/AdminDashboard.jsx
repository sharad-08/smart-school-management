// // // // import React from "react";

// // // // const AdminDashboard = () => {
// // // //   const cards = [
// // // //     { title: "Total Students", value: 520 },
// // // //     { title: "Total Teachers", value: 45 },
// // // //     { title: "Total Classes", value: 18 },
// // // //     { title: "Monthly Revenue", value: "₹3,50,000" },
// // // //   ];

// // // //   return (
// // // //     <div>
// // // //       <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

// // // //       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// // // //         {cards.map((card, i) => (
// // // //           <div key={i} className="bg-white p-6 rounded-xl shadow">
// // // //             <p className="text-gray-500">{card.title}</p>
// // // //             <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminDashboard;

// // // import React from "react";

// // // const AdminDashboard = () => {
// // //   return (
// // //     <div>
// // //       <h2 className="text-2xl font-bold mb-4">Welcome Admin 👋</h2>

// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <div className="bg-white p-6 rounded-lg shadow">
// // //           <h3 className="font-semibold">Total Students</h3>
// // //           <p className="text-2xl text-blue-600">520</p>
// // //         </div>

// // //         <div className="bg-white p-6 rounded-lg shadow">
// // //           <h3 className="font-semibold">Total Teachers</h3>
// // //           <p className="text-2xl text-green-600">35</p>
// // //         </div>

// // //         <div className="bg-white p-6 rounded-lg shadow">
// // //           <h3 className="font-semibold">Pending Fees</h3>
// // //           <p className="text-2xl text-red-600">₹1,20,000</p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;



// // import React from "react";

// // const AdminDashboard = () => {
// //   // Dummy Data (Replace with API data later)
// //   const data = {
// //     totalStudents: 500,
// //     boys: 280,
// //     girls: 220,
// //     totalTeachers: 40,
// //     maleTeachers: 22,
// //     femaleTeachers: 18,
// //     totalFeesCollected: "₹12,50,000",
// //     pendingFees: "₹3,20,000",
// //   };

// //   return (
// //     <div className="space-y-8">

// //       {/* ================= STATS CARDS ================= */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

// //         {/* Total Students */}
// //         <div className="bg-white shadow-lg rounded-2xl p-6">
// //           <h3 className="text-gray-500 text-sm">Total Students</h3>
// //           <p className="text-3xl font-bold text-blue-600 mt-2">
// //             {data.totalStudents}
// //           </p>
// //         </div>

// //         {/* Boys */}
// //         <div className="bg-white shadow-lg rounded-2xl p-6">
// //           <h3 className="text-gray-500 text-sm">Total Boys</h3>
// //           <p className="text-3xl font-bold text-indigo-600 mt-2">
// //             {data.boys}
// //           </p>
// //         </div>

// //         {/* Girls */}
// //         <div className="bg-white shadow-lg rounded-2xl p-6">
// //           <h3 className="text-gray-500 text-sm">Total Girls</h3>
// //           <p className="text-3xl font-bold text-pink-600 mt-2">
// //             {data.girls}
// //           </p>
// //         </div>

// //         {/* Total Teachers */}
      

// //       </div>



// //        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

// //         {/* Total Students */}
       

// //         {/* Total Teachers */}
// //         <div className="bg-white shadow-lg rounded-2xl p-6">
// //           <h3 className="text-gray-500 text-sm">Total Teachers</h3>
// //           <p className="text-3xl font-bold text-green-600 mt-2">
// //             {data.totalTeachers}
// //           </p>
// //         </div>

// //         {/* Male Teachers */}
// //         <div className="bg-white shadow-lg rounded-2xl p-6">
// //           <h3 className="text-gray-500 text-sm">Male Teachers</h3>
// //           <p className="text-3xl font-bold text-teal-600 mt-2">
// //             {data.maleTeachers}
// //           </p>
// //         </div>

// //         {/* Female Teachers */}
// //         <div className="bg-white shadow-lg rounded-2xl p-6">
// //           <h3 className="text-gray-500 text-sm">Female Teachers</h3>
// //           <p className="text-3xl font-bold text-purple-600 mt-2">
// //             {data.femaleTeachers}
// //           </p>
// //         </div>

// //       </div>

// //       {/* ================= CALENDAR + FEES ================= */}
// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// //         {/* Calendar Section */}
// //         <div className="bg-white shadow-lg rounded-2xl p-6">
// //           <h2 className="text-lg font-semibold mb-4 text-gray-700">
// //             📅 School Calendar
// //           </h2>

// //           <div className="border rounded-lg p-4 text-center text-gray-500">
// //             {/* Simple HTML Calendar */}
// //             <input
// //               type="date"
// //               className="border px-4 py-2 rounded-lg w-full"
// //             />
// //           </div>
// //         </div>

// //         {/* Fees Section */}
// //         <div className="bg-white shadow-lg rounded-2xl p-6">
// //           <h2 className="text-lg font-semibold mb-4 text-gray-700">
// //             💰 Fees Overview
// //           </h2>

// //           <div className="space-y-4">

// //             <div className="flex justify-between bg-green-100 p-4 rounded-lg">
// //               <span>Total Fees Collected</span>
// //               <span className="font-bold text-green-700">
// //                 {data.totalFeesCollected}
// //               </span>
// //             </div>

// //             <div className="flex justify-between bg-red-100 p-4 rounded-lg">
// //               <span>Pending Fees</span>
// //               <span className="font-bold text-red-700">
// //                 {data.pendingFees}
// //               </span>
// //             </div>

// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;

// import React from "react";

// const AdminDashboard = () => {
//   // Dummy Data (Later replace with API)
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

//   return (
//     <div className="space-y-10">

//       {/* ================= STUDENT SECTION ================= */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-700 mb-4">
//           🎓 Student Overview
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

//           <StatCard title="Currently Studying" value={data.presentStudents} color="text-blue-600" />

//           <StatCard title="Students Left" value={data.leftStudents} color="text-red-500" />

//           <StatCard title="Total Admissions" value={totalStudentAdmissions} color="text-green-600" />

//           <StatCard title="Total Boys" value={data.boys} color="text-indigo-600" />

//           <StatCard title="Total Girls" value={data.girls} color="text-pink-600" />

//         </div>
//       </div>

//       {/* ================= TEACHER SECTION ================= */}
//       <div>
//         <h2 className="text-xl font-bold text-gray-700 mb-4">
//           👩‍🏫 Teacher Overview
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

//           <StatCard title="Currently Working" value={data.workingTeachers} color="text-purple-600" />

//           <StatCard title="Teachers Left" value={data.leftTeachers} color="text-red-500" />

//           <StatCard title="Total Teacher Admissions" value={totalTeacherAdmissions} color="text-green-600" />

//           <StatCard title="Male Teachers" value={data.maleTeachers} color="text-teal-600" />

//           <StatCard title="Female Teachers" value={data.femaleTeachers} color="text-pink-600" />

//         </div>
//       </div>

//       {/* ================= CALENDAR + FEES ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Calendar */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">
//             📅 School Calendar
//           </h2>

//           <input
//             type="date"
//             className="border px-4 py-2 rounded-lg w-full"
//           />
//         </div>

//         {/* Fees */}
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

//     </div>
//   );
// };

// /* ================= REUSABLE CARD COMPONENT ================= */

// const StatCard = ({ title, value, color }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300">
//       <h3 className="text-gray-500 text-sm">{title}</h3>
//       <p className={`text-3xl font-bold mt-2 ${color}`}>
//         {value}
//       </p>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

const AdminDashboard = () => {
  /* ================== DUMMY DATA ================== */

  const [events, setEvents] = useState([
    { title: "Unit Test Begins", date: "2026-02-25", type: "Exam" },
    { title: "PTM Meeting", date: "2026-03-02", type: "Meeting" },
    { title: "Monthly Fee Due", date: "2026-03-05", type: "Fees" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "" });

  const data = {
    // Students
    presentStudents: 450,
    leftStudents: 50,
    boys: 260,
    girls: 190,

    // Teachers
    workingTeachers: 35,
    leftTeachers: 5,
    maleTeachers: 20,
    femaleTeachers: 15,

    // Fees
    totalFeesCollected: "₹12,50,000",
    pendingFees: "₹3,20,000",
  };

  const totalStudentAdmissions =
    data.presentStudents + data.leftStudents;

  const totalTeacherAdmissions =
    data.workingTeachers + data.leftTeachers;

  /* ================== ADD EVENT ================== */

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    setEvents([...events, newEvent]);
    setNewEvent({ title: "", date: "", type: "" });
    setShowModal(false);
  };

  /* ================== UI ================== */

  return (
    <div className="space-y-10">

      {/* ================== STATS CARDS ================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          icon={<FaUserGraduate />}
          title="Total Students"
          value={totalStudentAdmissions}
          color="bg-blue-500"
        />

        <StatCard
          icon={<FaChalkboardTeacher />}
          title="Total Teachers"
          value={totalTeacherAdmissions}
          color="bg-purple-500"
        />

        <StatCard
          icon={<FaMoneyBillWave />}
          title="Fees Collected"
          value={data.totalFeesCollected}
          color="bg-green-500"
        />

        <StatCard
          icon={<FaCalendarAlt />}
          title="Upcoming Events"
          value={events.length}
          color="bg-orange-500"
        />

      </div>

      {/* ================== STUDENT + TEACHER BREAKDOWN ================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Student Overview */}
        <SectionCard title="🎓 Student Overview">
          <InfoRow label="Currently Studying" value={data.presentStudents} />
          <InfoRow label="Students Left" value={data.leftStudents} />
          <InfoRow label="Total Boys" value={data.boys} />
          <InfoRow label="Total Girls" value={data.girls} />
        </SectionCard>

        {/* Teacher Overview */}
        <SectionCard title="👩‍🏫 Teacher Overview">
          <InfoRow label="Currently Working" value={data.workingTeachers} />
          <InfoRow label="Teachers Left" value={data.leftTeachers} />
          <InfoRow label="Male Teachers" value={data.maleTeachers} />
          <InfoRow label="Female Teachers" value={data.femaleTeachers} />
        </SectionCard>

      </div>

      {/* ================== CALENDAR + FEES ================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================== EVENT CALENDAR ================== */}
        <div className="bg-white shadow-lg rounded-2xl p-6">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              📅 School Events
            </h2>

            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Add Event
            </button>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.type}</p>
                </div>
                <span className="text-blue-600 font-semibold">
                  {event.date}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* ================== FEES SECTION ================== */}
        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            💰 Fees Overview
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between bg-green-100 p-4 rounded-lg">
              <span>Total Fees Collected</span>
              <span className="font-bold text-green-700">
                {data.totalFeesCollected}
              </span>
            </div>

            <div className="flex justify-between bg-red-100 p-4 rounded-lg">
              <span>Pending Fees</span>
              <span className="font-bold text-red-700">
                {data.pendingFees}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* ================== MODAL ================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-96 space-y-4">
            <h2 className="text-lg font-semibold">Add New Event</h2>

            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg"
            />

            <input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg"
            />

            <select
              value={newEvent.type}
              onChange={(e) =>
                setNewEvent({ ...newEvent, type: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg"
            >
              <option value="">Select Type</option>
              <option value="Exam">Exam</option>
              <option value="Meeting">Meeting</option>
              <option value="Fees">Fees</option>
              <option value="Holiday">Holiday</option>
            </select>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

/* ================== REUSABLE COMPONENTS ================== */

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4 hover:shadow-xl transition">
    <div className={`p-4 rounded-full text-white ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const SectionCard = ({ title, children }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span>{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default AdminDashboard;
