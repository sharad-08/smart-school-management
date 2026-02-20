
import React from "react";
import assets from "../assets/assets";

const Events_Activites = () => {
  return (
    <div className=" bg-slate-50 ">

      {/* ================= Stats Section ================= */}
      <div className="flex flex-col md:flex-row justify-evenly items-center gap-6 text-center py-4 bg-white  mb-9">

        <div>
          <p className="text-2xl font-bold text-blue-600">2500+</p>
          <p className="text-sm text-gray-600">Students Enrolled</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-blue-600">150+</p>
          <p className="text-sm text-gray-600">Expert Teachers</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-blue-600">95%</p>
          <p className="text-sm text-gray-600">Success Rate</p>
        </div>

        <div>
          <p className="text-2xl font-bold text-blue-600">15+</p>
          <p className="text-sm text-gray-600">Years Excellence</p>
        </div>

      </div>

      {/* ================= Title Section ================= */}
      <div className="text-center  bg-slate-50 mb-8 rounded-lg">
        <p className="text-2xl md:text-3xl font-bold">
          School Events & Activities
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Capturing memorable moments from our vibrant school community
        </p>
      </div>

      {/* ================= Images Section ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-16 py-9 bg-slate-50 rounded-lg">

        {/* ===== Large Image ===== */}
        <div className="relative overflow-hidden rounded-2xl group h-full">
          <img
            src={assets.annual}
            alt="Annual Day"
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>

          {/* Text */}
          <div className="absolute bottom-5 left-5 text-white">
            <p className="text-xl font-semibold">
              Annual Day Celebration
            </p>
            <p className="text-sm text-gray-200">
              Students showcase their talents
            </p>
          </div>
        </div>

        {/* ===== Small Grid ===== */}
        <div className="grid grid-cols-2 gap-6 h-full">

          {/* Card 1 */}
          <div className="relative overflow-hidden rounded-xl group h-full">
            <img
              src={assets.art}
              alt="Art"
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
            <p className="absolute bottom-3 left-3 text-white font-medium">
              Art Competition
            </p>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden rounded-xl group h-full">
            <img
              src={assets.sport}
              alt="Sports"
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
            <p className="absolute bottom-3 left-3 text-white font-medium">
              Sports Day
            </p>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden rounded-xl group h-full">
            <img
              src={assets.library}
              alt="Library"
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
            <p className="absolute bottom-3 left-3 text-white font-medium">
              Library Week
            </p>
          </div>

          {/* Card 4 */}
          <div className="relative overflow-hidden rounded-xl group h-full">
            <img
              src={assets.lab}
              alt="Lab"
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>
            <p className="absolute bottom-3 left-3 text-white font-medium">
              Science Lab
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Events_Activites;
