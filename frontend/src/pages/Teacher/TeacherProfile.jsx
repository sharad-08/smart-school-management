 


import React from "react";

const TeacherProfile = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">

      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://via.placeholder.com/150"
          alt="teacher"
          className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover"
        />

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            Mr. Rajesh Kumar Sharma
          </h2>
          <p className="text-indigo-600 font-semibold">
            Mathematics Teacher
          </p>
          <p className="text-gray-500">
            Class Teacher: 10-A
          </p>
          <p className="text-gray-500">
            Teacher ID: TCH-1023
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-gray-700">Contact Number</p>
          <p>+91 9876543210</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-gray-700">Email</p>
          <p>rajesh.sharma@email.com</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-gray-700">Address</p>
          <p>
            45, Shanti Nagar, Near City Mall,<br/>
            Jaipur, Rajasthan - 302001
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-gray-700">Experience</p>
          <p>8 Years</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-gray-700">Qualification</p>
          <p>M.Sc Mathematics, B.Ed</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-semibold text-gray-700">Subjects Handling</p>
          <p>Mathematics (Class 9, 10, 11)</p>
        </div>

      </div>

      {/* ID Card Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800">
          Teacher ID Card
        </h3>

        <div className="bg-indigo-600 text-white p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-bold text-lg">ABC Public School</p>
            <p>Teacher ID: TCH-1023</p>
            <p>Name: Rajesh Kumar Sharma</p>
            <p>Department: Mathematics</p>
          </div>

          <img
            src="https://via.placeholder.com/80"
            alt="ID"
            className="w-20 h-20 rounded-md border-2 border-white"
          />
        </div>
      </div>

    </div>
  );
};

export default TeacherProfile;
