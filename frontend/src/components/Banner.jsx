



import React from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-600 rounded-xl px-6 md:px-16 py-10 md:py-16 flex flex-col-reverse md:flex-row items-center gap-10">

      {/* ===== Left Content ===== */}
      <div className="w-full md:w-2/3 text-center md:text-left">

        <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Welcome to Bright <br /> Future School
        </p>

        <p className="text-base sm:text-lg text-gray-200 py-6">
          Empowering minds, Building futures, Creating leaders of tomorrow
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

          <button className="flex items-center justify-center gap-2 text-base font-medium text-blue-600 bg-white  py-3 rounded-xl w-full sm:w-44 hover:scale-105 transition duration-300">
            <i className="bx bxs-book-reader"></i>
            Explore Program
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="flex items-center justify-center gap-2 text-base font-medium text-white bg-blue-400 py-3 rounded-xl w-full sm:w-44 hover:bg-blue-500 hover:scale-105 transition duration-300"
          >
            <i className="bx bxs-phone"></i>
            Contact Us
          </button>

        </div>
      </div>

      {/* ===== Right Image ===== */}
      <div className="w-full md:w-1/2">
        <img
          className="rounded-3xl w-full h-64 sm:h-80 md:h-[350px] object-cover hover:scale-105 transition duration-500"
          src={assets.group}
          alt="group"
        />
      </div>

    </div>
  );
};

export default Banner;
