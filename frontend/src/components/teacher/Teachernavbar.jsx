import React, { useContext } from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";

const Teachernavbar = () => {
  const navigate = useNavigate();
  const { setToken, setRole } = useContext(Appcontext);

  // Dummy teacher data (later connect backend)
  const teacher = {
    name: "Mr. Amit Verma",
    subject: "Mathematics",
    profile: assets.upload_area,
  };

  const logout = () => {
    setToken(null);
    setRole("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sticky top-0 left-0 w-full bg-white shadow-md border-b flex items-center justify-between px-8 z-50">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        <img
          onClick={() => navigate("/teacher")}
          src={assets.logo}
          alt="school logo"
          className="w-32 cursor-pointer hover:scale-105 transition"
        />

        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
          Teacher
        </span>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <div className="relative cursor-pointer hover:scale-110 transition">
          <i className="bx bxs-bell text-2xl text-gray-700"></i>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Teacher Info */}
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg hover:shadow transition">

          <img
            src={teacher.profile}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />

          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold">{teacher.name}</p>
            <p className="text-xs text-gray-500">{teacher.subject}</p>
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

export default Teachernavbar;
