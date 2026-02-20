 import React from "react";

const students = [
  {
    id: 1,
    fullName: "Sharad Singavniya",
    fatherName: "Rajesh Singavniya",
    address: "123, MG Road, Jaipur",
    contact: "+91 9876543210",
    classSection: "10-A",
    performance: "A",
    attendance: "95%",
    photo: "https://i.pravatar.cc/50?img=1",
  },
  {
    id: 2,
    fullName: "Amit Kumar",
    fatherName: "Ramesh Kumar",
    address: "45, Civil Lines, Jaipur",
    contact: "+91 9123456780",
    classSection: "10-A",
    performance: "B+",
    attendance: "90%",
    photo: "https://i.pravatar.cc/50?img=2",
  },
  {
    id: 3,
    fullName: "Rahul Sharma",
    fatherName: "Suresh Sharma",
    address: "78, Jaipur Road, Jaipur",
    contact: "+91 9988776655",
    classSection: "10-A",
    performance: "A-",
    attendance: "92%",
    photo: "https://i.pravatar.cc/50?img=3",
  },
];

const StudentList = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Student List</h2>

      <table className="w-full border border-gray-200 min-w-[900px]">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="p-2">Roll No</th>
            <th className="p-2">Photo</th>
            <th className="p-2">Full Name</th>
            <th className="p-2">Father's Name</th>
            <th className="p-2">Address</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Class & Section</th>
            <th className="p-2">Performance</th>
            <th className="p-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="text-center hover:bg-gray-100 transition"
            >
              <td className="p-2">{student.id}</td>
              <td className="p-2">
                <img
                  src={student.photo}
                  alt={student.fullName}
                  className="w-12 h-12 rounded-full mx-auto"
                />
              </td>
              <td className="p-2">{student.fullName}</td>
              <td className="p-2">{student.fatherName}</td>
              <td className="p-2">{student.address}</td>
              <td className="p-2">{student.contact}</td>
              <td className="p-2">{student.classSection}</td>
              <td className="p-2">{student.performance}</td>
              <td className="p-2">{student.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
