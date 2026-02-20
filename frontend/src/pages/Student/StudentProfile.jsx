 import React, { useState, useRef } from "react";

const StudentProfile = () => {
  const idCardRef = useRef();

  const [student, setStudent] = useState({
    firstName: "Sharad",
    middleName: "Kumar",
    lastName: "Singavniya",
    fatherName: "Ramesh Singh",
    motherName: "Sita Devi",
    className: "10th",
    section: "A",
    rollNumber: "23",
    phone: "9876543210",
    emergency: "9123456780",
    email: "sharad@email.com",
    address: "Jaipur, Rajasthan",
    aadhar: "1234 5678 9012",
    samagra: "SAM123456",
  });

  const downloadID = () => {
    window.print();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Student Profile
      </h1>

      {/* PROFILE CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* PROFILE PHOTO */}
          <div className="flex flex-col items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="student"
              className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover hover:scale-105 transition duration-300"
            />
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Upload Photo
            </button>
          </div>

          {/* STUDENT DETAILS */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

            {Object.entries(student).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-50 p-3 rounded-lg hover:bg-blue-50 transition"
              >
                <p className="text-sm text-gray-500 capitalize">{key}</p>
                <p className="font-semibold text-gray-800">{value}</p>
              </div>
            ))}

          </div>
        </div>

        {/* DOCUMENT UPLOAD */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition">
            <p className="font-semibold mb-2">Upload Aadhaar Card</p>
            <input type="file" className="w-full border p-2 rounded" />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition">
            <p className="font-semibold mb-2">Upload Samagra ID</p>
            <input type="file" className="w-full border p-2 rounded" />
          </div>
        </div>
      </div>

      {/* ================= ID CARD SECTION ================= */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">Student ID Card</h2>

        <div className="flex flex-wrap gap-8">

          {/* FRONT SIDE */}
          <div
            ref={idCardRef}
            className="w-80 h-48 bg-blue-500 text-white rounded-xl p-4 shadow-lg hover:scale-105 transition duration-300"
          >
            <h3 className="text-lg font-bold text-center">
            Nimar Acadmey School
            </h3>
            <p className="text-center text-sm">Rahadkot, Madhya Pradesh, PIN-451113</p>

            <div className="flex mt-4">
              <img
                src="https://via.placeholder.com/80"
                alt="student"
                className="w-20 h-20 rounded-lg border"
              />

              <div className="ml-4 text-sm">
                <p><b>Name:</b> {student.firstName} {student.lastName}</p>
                <p><b>Class:</b> {student.className}</p>
                <p><b>Section:</b> {student.section}</p>
                <p><b>Roll No:</b> {student.rollNumber}</p>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="w-80 h-48 bg-white border rounded-xl p-4 shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-lg font-bold text-center text-gray-800">
              School Information
            </h3>

            <div className="text-xs mt-3 text-gray-700 space-y-1">
              <p><b>Phone:</b> +91 9876543210</p>
              <p><b>Email:</b> nimaracadmey.com</p>
              <p><b>Address:</b> Rahadkot, Madhya Pradesh, PIN-451113</p>
              <p><b>Emergency:</b> {student.emergency}</p>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              This card is property of Nimar Acadmey School .
            </p>
          </div>

        </div>

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={downloadID}
          className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md"
        >
          Download ID Card
        </button>

      </div>

    </div>
  );
};

export default StudentProfile;
