


import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Studentsidebar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/student", icon: "bx bx-home" },
    { name: "Attendance", path: "/student/attendance", icon: "bx bx-calendar" },
    { name: "Marks", path: "/student/marks", icon: "bx bx-book" },
    { name: "Fees", path: "/student/fees", icon: "bx bx-credit-card" },
    { name: "Teachers", path: "/student/teachers", icon: "bx bx-group" },
    { name: "Timetable", path: "/student/timetable", icon: "bx bx-time" },
    { name: "Profile", path: "/student/profile", icon: "bx bx-user" },
  ];

  return (
    <>
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden fixed top-16 w-full flex items-center justify-between p-4 bg-white shadow z-40">
        <h2 className="font-semibold">Student Panel</h2>
        <button onClick={() => setIsOpen(true)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* ===== OVERLAY ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* ===== SIDEBAR ===== */}
      <div
        className={`
          fixed  left-0 h-screen w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* Close button (mobile) */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-semibold">Student Panel</h2>
          <button onClick={() => setIsOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        {/* MENU */}
        <div className="p-6 flex flex-col gap-3 mt-6 md:mt-0">

          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/student"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                }`
              }
            >
              <i className={`${item.icon} text-lg`}></i>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}

        </div>

      </div>
    </>
  );
};

export default Studentsidebar;
