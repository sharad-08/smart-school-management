import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "bx bx-home" },
    { name: "Students", path: "/admin/students", icon: "bx bx-group" },
    { name: "Add Student", path: "/admin/add-student", icon: "bx bx-user-plus" },
    { name: "Student Fees", path: "/admin/fees", icon: "bx bx-money" },
    { name: "Teachers", path: "/admin/teachers", icon: "bx bx-user" },
    { name: "Add Teacher", path: "/admin/add-teacher", icon: "bx bx-user-plus" },
    { name: "Teacher Schedule", path: "/admin/teacher-schedule", icon: "bx bx-time" },
    { name: "Class Timetable", path: "/admin/timetable", icon: "bx bx-calendar" },
    { name: "Exams", path: "/admin/exams", icon: "bx bx-edit" },
  
    {name : "Upload Photos",path:"/admin/uploadphotos",icon:"bx bx-image"},
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-16 w-full flex items-center justify-between p-4 bg-white shadow z-40">
        <h2 className="font-semibold">Admin Panel</h2>
        <button onClick={() => setIsOpen(true)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed left-0 h-screen w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* MOBILE CLOSE */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-semibold">Admin Panel</h2>
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
              end={item.path === "/admin"}
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

export default AdminSidebar;
