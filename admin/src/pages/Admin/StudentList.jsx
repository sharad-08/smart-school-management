
import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const AdminStudents = () => {
  /* ================= AUTO ID ================= */
  const generateAdmissionId = () => {
    return "ADM" + Math.floor(10000 + Math.random() * 90000);
  };

  /* ================= DUMMY DATA ================= */
  const studentsData = [
    {
      id: 1,
      admissionId: generateAdmissionId(),
      name: "Rahul Sharma",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      roll: "101",
      class: "10A",
      section: "A",
      gender: "Boy",
      dob: "2008-05-12",
      bloodGroup: "O+",
      aadhaar: "123456789012",
      category: "General",
      religion: "Hindu",
      nationality: "Indian",
      admissionDate: "2023-04-10",
      session: "2025-26",
      previousSchool: "ABC School",
      previousClass: "9",
      father: "Ramesh Sharma",
      fatherOccupation: "Business",
      fatherContact: "9876543210",
      mother: "Sunita Sharma",
      motherOccupation: "Teacher",
      motherContact: "9876500000",
      parentEmail: "parent@gmail.com",
      annualIncome: "300000",
      address: "MG Road",
      city: "Indore",
      state: "MP",
      pincode: "452001",
      emergency: "9998887776",
      admissionFee: "5000",
      tuitionFee: "20000",
      transportFee: "3000",
      hostelFee: "",
      scholarship: "No",
      feeStatus: "Paid",
      status: "Active",
    },
    {
      id: 2,
      admissionId: generateAdmissionId(),
      name: "Priya Singh",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      roll: "102",
      class: "10A",
      section: "A",
      gender: "Girl",
      dob: "2008-07-22",
      bloodGroup: "B+",
      aadhaar: "987654321012",
      category: "OBC",
      religion: "Hindu",
      nationality: "Indian",
      admissionDate: "2023-04-12",
      session: "2025-26",
      previousSchool: "XYZ School",
      previousClass: "9",
      father: "Suresh Singh",
      fatherOccupation: "Engineer",
      fatherContact: "9876543211",
      mother: "Meena Singh",
      motherOccupation: "Housewife",
      motherContact: "9876500001",
      parentEmail: "parent2@gmail.com",
      annualIncome: "400000",
      address: "Vijay Nagar",
      city: "Indore",
      state: "MP",
      pincode: "452010",
      emergency: "9998881111",
      admissionFee: "5000",
      tuitionFee: "20000",
      transportFee: "3000",
      hostelFee: "",
      scholarship: "Yes",
      feeStatus: "Pending",
      status: "Active",
    },
  ];

  const [students, setStudents] = useState(studentsData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = "";

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  /* ================= FILTER ================= */
  // const filteredStudents = students.filter((student) => {
  //   return (
  //     student.name.toLowerCase().includes(search.toLowerCase()) &&
  //     (classFilter ? student.class === classFilter : true) &&
  //     (statusFilter ? student.status === statusFilter : true)
  //   );
  // });
  const filteredStudents = students.filter((student) => {
  return (
    student.roll.toLowerCase().includes(search.toLowerCase()) &&
    (classFilter ? student.class === classFilter : true) &&
    (statusFilter ? student.status === statusFilter : true)
  );
});


  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    setStudents(
      students.map((student) =>
        student.id === selectedStudent.id ? selectedStudent : student
      )
    );
    setIsEditing(false);
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-700">
        🎓 Student Management
      </h2>

      {/* FILTER */}
      <div className="bg-white shadow rounded-xl p-4 grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by roll number..."
          className="border px-3 py-2 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Photo</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Roll</th>
              <th className="px-6 py-3">Class</th>
              <th className="px-6 py-3">Fee</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{student.name}</td>
                <td className="px-6 py-4">{student.roll}</td>
                <td className="px-6 py-4">{student.class}</td>
                <td className="px-6 py-4">{student.feeStatus}</td>
                <td className="px-6 py-4">{student.status}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <FaEye
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsEditing(false);
                    }}
                    className="cursor-pointer text-blue-600"
                  />
                  <FaEdit
                    onClick={() => {
                      setSelectedStudent(student);
                      setIsEditing(true);
                    }}
                    className="cursor-pointer text-green-600"
                  />
                  <FaTrash
                    onClick={() => handleDelete(student.id)}
                    className="cursor-pointer text-red-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Admission" : "Student Profile"}
              </h2>
              <button onClick={() => setSelectedStudent(null)}>✕</button>
            </div>

            {/* Profile Photo */}
            <div className="flex justify-center mb-6">
              <img
                src={selectedStudent.photo}
                alt={selectedStudent.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
              />
            </div>

            {/* Upload Photo */}
            {isEditing && (
              <div className="mb-6">
                <label className="font-semibold">Change Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setSelectedStudent({
                        ...selectedStudent,
                        photo: imageUrl,
                      });
                    }
                  }}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
            )}

            {/* All Fields */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {Object.keys(selectedStudent).map((key) =>
                key !== "id" ? (
                  <Input key={key} label={key} field={key} />
                ) : null
              )}
            </div>

            {isEditing && (
              <div className="mt-6 text-right">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  /* REUSABLE INPUT */
  function Input({ label, field }) {
    return (
      <div>
        <label className="font-semibold capitalize">{label}</label>
        <input
          type="text"
          disabled={!isEditing}
          value={selectedStudent[field] || ""}
          onChange={(e) =>
            setSelectedStudent({
              ...selectedStudent,
              [field]: e.target.value,
            })
          }
          className="w-full border px-3 py-2 rounded mt-1"
        />
      </div>
    );
  }
};

export default AdminStudents;
