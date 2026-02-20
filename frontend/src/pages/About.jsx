
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Facilitysidebar from "../components/Facilitiesidebar";
import Gallery from "../components/gallery";
import Ourgoal from "../components/Ourgoal";
import Aboutus from "../components/Aboutus"
import assets from "../assets/assets"

const About = () => {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Facilitysidebar />

      {/* Right Content */}

      <div className="flex-1 md:ml-64">

        <div >

          {/* titel */}
          <div className="text-center mb-10 m-8">

            <div className="border-b-2 pb-4">

              <p className="text-2xl md:text-3xl text-blue-600 font-bold">
                Message from The Principal
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Building a foundation for lifelong success
              </p>
            </div>



            {/* principal Section */}
            <div className="flex bg-white py-10 px-4 sm:px-8 lg:px-16 items-center ">

              <div className=" w-full lg:w-1/2 m-4">
                {/* Principal message */}
                <p className="text-2xl md:text-3xl font-bold">
                  Mrs. Amita Mundra

                </p>

                <p className="text-sm md:text-base text-gray-600 mt-4">
                  " Welcome to our school. We believe in inspiring students to learn, grow, and achieve their dreams through hard work and strong values.
                </p>

                <p className="text-sm md:text-base text-gray-600 mt-4">
                  With the support of teachers and parents, I am confident that together we will build a bright and successful future "
                </p>

              </div>
              <div className="w-full lg:w-1/2 flex justify-center shadow-black shadow-md rounded-2xl ">
                <img
                  src={assets.principal}
                  alt="building"
                  className="rounded-2xl w-full max-w-md lg:max-w-full "
                />
              </div>
            </div>

          </div>



        </div>




        {/* DIrector section  */}
        <div >

          {/* titel */}
          <div className="text-center mb-10 m-8">

            <div className="border-b-2 pb-4">

              <p className="text-2xl md:text-3xl text-blue-600 font-bold">
                Message from The Director
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Building a foundation for lifelong success
              </p>
            </div>



            {/* principal Section */}
            <div className="flex bg-white py-10 px-4 sm:px-8 lg:px-16 items-center ">


              <div className="w-full lg:w-1/2 flex justify-center shadow-black shadow-md rounded-2xl ">
                <img
                  src={assets.director}
                  alt="building"
                  className="rounded-2xl w-full max-w-md lg:max-w-full "
                />
              </div>

              <div className=" w-full lg:w-1/2 m-4">
                {/* Principal message */}
                <p className="text-2xl md:text-3xl font-bold">
                  Mr. Om Birla

                </p>

                <p className="text-sm md:text-base text-gray-600 mt-4">
                  " Welcome to our school. We believe in inspiring students to learn, grow, and achieve their dreams through hard work and strong values.
                </p>

                <p className="text-sm md:text-base text-gray-600 mt-4">
                  With the support of teachers and parents, I am confident that together we will build a bright and successful future "
                </p>

              </div>
            </div>

          </div>



        </div>
        <Aboutus />
        <Ourgoal />

     
        <div className="relative flex px-8 sm:px-8 lg:px-16 items-center border-t-2 h-auto py-8">
  {/* Background image with blur */}
  <div
    className="absolute inset-0 bg-cover bg-center filter blur-sm"
    style={{ backgroundImage: `url(${assets.building})` }}
  ></div>

  {/* Optional: semi-transparent overlay for better text visibility */}
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Content on top */}
  <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center">
    {/* Google Map */}
    <div className="w-full my-4 lg:w-48 flex justify-center shadow-black shadow-sm overflow-hidden">
      <iframe
        src="https://www.google.com/maps?q=Nimar%20Academy%20Rahadkot&output=embed"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        className="h-44"
      ></iframe>
    </div>

    {/* Address info */}
    <div className="w-full lg:w-1/2 m-4 text-center lg:text-left">
      <p className="text-2xl md:text-3xl font-bold text-white">
        School Address
      </p>
      <p className="text-sm md:text-base text-gray-200 mt-4">
        Nimar Academy Rahadkot PIN-451113, Near Rahadkot, Madhya Pradesh
      </p>
    </div>
  </div>
</div>










      </div>

    </div>
  );
};

export default About;
