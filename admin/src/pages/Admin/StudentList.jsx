 
import React, { useState, useEffect, useContext } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Appcontext } from "../../context/Appcontext";

const AdminStudents = () => {
  const {
    students = [],
    getstudent,
    getSingleStudent,
    updateStudent,
  } = useContext(Appcontext);
   
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;
  
 
  useEffect(() => {
  getstudent();
}, []);

  /* ================= FILTER ================= */
  const filteredStudents = students.filter((student) =>
    student?.RollNumber?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirst,
    indexOfLast
  );
 
  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  /* ================= SAVE UPDATE ================= */
  const handleSave = async () => {
    await updateStudent(selectedStudent._id, selectedStudent);
    setSelectedStudent(null);
    setIsEditing(false);
    getstudent(); // refresh list
  };

  return (
    <div className="space-y-6 p-6">

      <h2 className="text-2xl font-bold text-gray-700">
        🎓 Student Management
      </h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by roll number..."
        className="border px-3 py-2 rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ================= MODAL ================= */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Student" : "Student Profile"}
              </h2>
              <button onClick={() => setSelectedStudent(null)}>✕</button>
            </div>

            {/* PROFILE IMAGE */}
            <div className="flex justify-center mb-6">
              <img
                src={selectedStudent.Profile}
                alt={selectedStudent.Name}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
              />
            </div>

            {/* ALL FIELDS */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {Object.keys(selectedStudent).map((key) =>
                key !== "_id" &&
                key !== "__v" &&
                key !== "Password" ? (
                  <Input
                    key={key}
                    label={key}
                    field={key}
                  />
                ) : null
              )}
            </div>

            {/* SAVE BUTTON */}
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

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-xl overflow-x-auto mt-4">
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
            {  filteredStudents.length > 0 ? (
               filteredStudents.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                    
                  <td className="px-6 py-4">
                    <img
                      src={student.Profile}
                      alt={student.Name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {student.Name}
                  </td>
                  <td className="px-6 py-4">
                    {student.RollNumber}
                  </td>
                  <td className="px-6 py-4">
                    {student.Class}
                  </td>
                  <td className="px-6 py-4">
                    {student.FeeStatus}
                  </td>
                  <td className="px-6 py-4">
                    {student.Status}
                  </td>

                  <td className="px-6 py-4 flex space-x-3">

                    {/* VIEW */}
                    <FaEye
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsEditing(false);
                      }}
                      className="cursor-pointer text-blue-600"
                    />

                    {/* EDIT */}
                    <FaEdit
                      onClick={async () => {
                        const fullData = await getSingleStudent(student._id);
                        setSelectedStudent(fullData); // must return student object
                        setIsEditing(true);
                      }}
                      className="cursor-pointer text-green-600"
                    />

                    {/* DELETE */}
                    <FaTrash
                      onClick={() => handleDelete(student._id)}
                      className="cursor-pointer text-red-600"
                    />

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
   
  {/* ================= PAGINATION ================= */}
<div className="flex justify-center mt-4 space-x-2">
  {Array.from(
    { length: Math.ceil(filteredStudents.length / studentsPerPage) },
    (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === index + 1
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        {index + 1}
      </button>
    )
  )}
</div>
  /* ================= REUSABLE INPUT ================= */
  function Input({ label, field }) {
    return (
      <div>
        <label className="font-semibold capitalize">
          {label}
        </label>
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