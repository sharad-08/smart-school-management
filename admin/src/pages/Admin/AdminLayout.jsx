// import React from "react";
// import { NavLink, Outlet } from "react-router-dom";

// const AdminLayout = () => {
//   const menu = [
//     { name: "Dashboard", path: "/admin" },
//     { name: "Student List", path: "/admin/students" },
//     { name: "Add Student", path: "/admin/add-student" },
//     { name: "Student Fees", path: "/admin/fees" },
//     { name: "Teacher List", path: "/admin/teachers" },
//     { name: "Add Teacher", path: "/admin/add-teacher" },
//     { name: "Teacher Schedule", path: "/admin/teacher-schedule" },
//     { name: "Class Timetable", path: "/admin/timetable" },
//     { name: "Exam Management", path: "/admin/exams" },
//     { name: "Schedule Timetable", path: "/admin/schedule" },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-indigo-700 text-white p-5 space-y-3">
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//         {menu.map((item, i) => (
//           <NavLink
//             key={i}
//             to={item.path}
//             end={item.path === "/admin"}
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-lg transition ${
//                 isActive ? "bg-white text-indigo-700" : "hover:bg-indigo-600"
//               }`
//             }
//           >
//             {item.name}
//           </NavLink>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;



import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">

      <AdminSidebar />

      <div className="flex-1 ml-0 md:ml-64">
        <AdminNavbar />
        <div className="p-6 bg-gray-100 min-h-screen pt-20 md:pt-6">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;
