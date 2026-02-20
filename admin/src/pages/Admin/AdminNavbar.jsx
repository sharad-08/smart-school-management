


import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";
import assets from "../../../../frontend/src/assets/assets";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(Appcontext);

  // Dummy Admin Data (Later connect backend)
  const admin = {
    name: "Mr. Sharad Singhavniya",
    role: "Administrator",
    profile: "https://i.pravatar.cc/150?img=12",
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sticky top-0 left-0 w-full bg-white shadow-md border-b flex items-center justify-between px-8 z-50 h-16">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        <img
          onClick={() => navigate("/admin")}
          src={assets.logo}
          alt="school logo"
          className="w-32 cursor-pointer hover:scale-105 transition"
        />

        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
          Admin
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <div className="relative cursor-pointer hover:scale-110 transition">
          <i className="bx bxs-bell text-2xl text-gray-700"></i>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Admin Info */}
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg hover:shadow transition">

          <img
            src={admin.profile}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />

          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold">{admin.name}</p>
            <p className="text-xs text-gray-500">{admin.role}</p>
          </div>
        </div>

        {/* Logout */}
        <i
          onClick={logout}
          className="bx bx-log-out text-2xl text-red-500 cursor-pointer hover:text-red-600 hover:scale-110 transition"
        ></i>
      </div>
    </div>
  );
};

export default AdminNavbar;
