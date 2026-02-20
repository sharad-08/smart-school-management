 import React, { useState } from "react";

const StudentTeacher = () => {

  const [search, setSearch] = useState("");

  const teachers = [
    {
      id: 1,
      name: "Mr. Rajesh Kumar",
      subject: "Mathematics",
      className: "10th A",
      experience: "10 Years",
      email: "rajesh@school.com",
      phone: "+91 9876543210",
      photo: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      name: "Ms. Priya Sharma",
      subject: "Science",
      className: "10th A",
      experience: "8 Years",
      email: "priya@school.com",
      phone: "+91 9123456780",
      photo: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      name: "Mr. Amit Verma",
      subject: "English",
      className: "10th A",
      experience: "6 Years",
      email: "amit@school.com",
      phone: "+91 9988776655",
      photo: "https://randomuser.me/api/portraits/men/75.jpg"
    },
  ];

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Teachers & Subjects
        </h1>
        <p className="text-gray-500">
          View teacher information and subject details
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-10 relative md:w-1/2">
        <i className="bx bx-search absolute left-4 top-3 text-gray-400 text-xl"></i>
        <input
          type="text"
          placeholder="Search teacher or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TEACHER GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2 group relative"
          >

            {/* SUBJECT BADGE */}
            <span className="absolute top-4 right-4 bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
              {teacher.subject}
            </span>

            {/* PHOTO */}
            <div className="flex justify-center mb-4">
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-200 group-hover:scale-110 transition duration-300"
              />
            </div>

            {/* NAME */}
            <h2 className="text-xl font-semibold text-center text-gray-800">
              {teacher.name}
            </h2>

            <p className="text-center text-gray-500 text-sm mb-4">
              Class: {teacher.className}
            </p>

            {/* INFO SECTION */}
            <div className="space-y-2 text-sm text-gray-600">

              <p className="flex items-center gap-2">
                <i className="bx bx-book text-blue-500 text-lg"></i>
                Subject: {teacher.subject}
              </p>

              <p className="flex items-center gap-2">
                <i className="bx bx-briefcase text-green-500 text-lg"></i>
                Experience: {teacher.experience}
              </p>

              <p className="flex items-center gap-2">
                <i className="bx bx-envelope text-purple-500 text-lg"></i>
                {teacher.email}
              </p>

              <p className="flex items-center gap-2">
                <i className="bx bx-phone text-red-500 text-lg"></i>
                {teacher.phone}
              </p>

            </div>

            {/* BUTTON */}
            <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition duration-300">
              View Profile
            </button>

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {filteredTeachers.length === 0 && (
        <div className="text-center mt-16 text-gray-500 text-lg">
          No teacher found.
        </div>
      )}

    </div>
  );
};

export default StudentTeacher;
