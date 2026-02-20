import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const TeacherLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-700 to-blue-600 text-white p-5 space-y-6 shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Teacher Panel
        </h2>

        <nav className="space-y-3">

          {[
            { name: "Dashboard", path: "/teacher" },
            { name: "Profile", path: "profile" },
            { name: "Students", path: "students" },
            { name: "Attendance", path: "attendance" },
            { name: "Marks Entry", path: "marks" },
            { name: "Schedule", path: "schedule" },
            { name: "Messages", path: "messages" },
          ].map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition duration-300 ${
                  isActive
                    ? "bg-white text-indigo-700 font-semibold"
                    : "hover:bg-indigo-500"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Welcome, Teacher 👋
          </h1>
          <button className="bg-red-500 px-4 py-2 text-white rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>

        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default TeacherLayout;
