 
// import React, { useState } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { Appcontext } from "../../context/Appcontext";
// const AdminTeachers = () => {
//   /* ================= AUTO ID ================= */
//   const generateTeacherId = () => {
//     return "TCH" + Math.floor(1000 + Math.random() * 9000);
//   };

//   /* ================= DUMMY DATA ================= */
//   const teachersData = [
//     {
//       id: 1,
//       teacherId: generateTeacherId(),
//       name: "Anjali Verma",
//       photo: "https://randomuser.me/api/portraits/women/45.jpg",
//       employeeCode: "EMP101",
//       department: "Mathematics",
//       subject: "Algebra & Geometry",
//       gender: "Female",
//       dob: "1985-07-15",
//       contact: "9876543210",
//       email: "anjali.verma@school.com",
//       qualification: "M.Sc Mathematics",
//       experience: "10 years",
//       address: "MG Road, Indore",
//       city: "Indore",
//       state: "MP",
//       pincode: "452001",
//       status: "Active",
//     },
//     {
//       id: 2,
//       teacherId: generateTeacherId(),
//       name: "Rohit Sharma",
//       photo: "https://randomuser.me/api/portraits/men/32.jpg",
//       employeeCode: "EMP102",
//       department: "Science",
//       subject: "Physics",
//       gender: "Male",
//       dob: "1982-03-20",
//       contact: "9876500001",
//       email: "rohit.sharma@school.com",
//       qualification: "M.Sc Physics",
//       experience: "12 years",
//       address: "Vijay Nagar, Indore",
//       city: "Indore",
//       state: "MP",
//       pincode: "452010",
//       status: "Active",
//     },
//   ];

//   const [teachers, setTeachers] = useState(teachersData);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const [search, setSearch] = useState("");

//   /* ================= FILTER ================= */
//   const filteredTeachers = teachers.filter((teacher) =>
//     teacher.name.toLowerCase().includes(search.toLowerCase()) ||
//     teacher.employeeCode.toLowerCase().includes(search.toLowerCase())
//   );

//   /* ================= DELETE ================= */
//   const handleDelete = (id) => {
//     setTeachers(teachers.filter((teacher) => teacher.id !== id));
//   };

//   /* ================= SAVE ================= */
//   const handleSave = () => {
//     setTeachers(
//       teachers.map((teacher) =>
//         teacher.id === selectedTeacher.id ? selectedTeacher : teacher
//       )
//     );
//     setIsEditing(false);
//     setSelectedTeacher(null);
//   };

//   return (
//     <div className="space-y-6 p-6">
//       {/* HEADER */}
//       <h2 className="text-2xl font-bold text-gray-700">
//         👩‍🏫 Teacher Management
//       </h2>

//       {/* FILTER */}
//       <div className="bg-white shadow rounded-xl p-4 grid md:grid-cols-2 gap-4">
//         <input
//           type="text"
//           placeholder="Search by name or employee code..."
//           className="border px-3 py-2 rounded-lg"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* TABLE */}
//       <div className="bg-white shadow rounded-xl overflow-x-auto">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-100 text-xs uppercase">
//             <tr>
//               <th className="px-6 py-3">Photo</th>
//               <th className="px-6 py-3">Name</th>
//               <th className="px-6 py-3">Employee Code</th>
//               <th className="px-6 py-3">Department</th>
//               <th className="px-6 py-3">Subject</th>
//               <th className="px-6 py-3">Contact</th>
//               <th className="px-6 py-3">Status</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredTeachers.map((teacher) => (
//               <tr key={teacher.id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4">
//                   <img
//                     src={teacher.photo}
//                     alt={teacher.name}
//                     className="w-10 h-10 rounded-full object-cover border"
//                   />
//                 </td>
//                 <td className="px-6 py-4 font-medium">{teacher.name}</td>
//                 <td className="px-6 py-4">{teacher.employeeCode}</td>
//                 <td className="px-6 py-4">{teacher.department}</td>
//                 <td className="px-6 py-4">{teacher.subject}</td>
//                 <td className="px-6 py-4">{teacher.contact}</td>
//                 <td className="px-6 py-4">{teacher.status}</td>
//                 <td className="px-6 py-4 flex space-x-3">
//                   <FaEye
//                     onClick={() => {
//                       setSelectedTeacher(teacher);
//                       setIsEditing(false);
//                     }}
//                     className="cursor-pointer text-blue-600"
//                   />
//                   <FaEdit
//                     onClick={() => {
//                       setSelectedTeacher(teacher);
//                       setIsEditing(true);
//                     }}
//                     className="cursor-pointer text-green-600"
//                   />
//                   <FaTrash
//                     onClick={() => handleDelete(teacher.id)}
//                     className="cursor-pointer text-red-600"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* MODAL */}
//       {selectedTeacher && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white w-11/12 md:w-3/4 rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

//             <div className="flex justify-between mb-6">
//               <h2 className="text-xl font-bold">
//                 {isEditing ? "Edit Teacher" : "Teacher Profile"}
//               </h2>
//               <button onClick={() => setSelectedTeacher(null)}>✕</button>
//             </div>

//             {/* Profile Photo */}
//             <div className="flex justify-center mb-6">
//               <img
//                 src={selectedTeacher.photo}
//                 alt={selectedTeacher.name}
//                 className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
//               />
//             </div>

//             {/* Upload Photo */}
//             {isEditing && (
//               <div className="mb-6">
//                 <label className="font-semibold">Change Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                       const imageUrl = URL.createObjectURL(file);
//                       setSelectedTeacher({
//                         ...selectedTeacher,
//                         photo: imageUrl,
//                       });
//                     }
//                   }}
//                   className="w-full border px-3 py-2 rounded mt-1"
//                 />
//               </div>
//             )}

//             {/* All Fields */}
//             <div className="grid md:grid-cols-2 gap-4 text-sm">
//               {Object.keys(selectedTeacher).map((key) =>
//                 key !== "id" ? (
//                   <Input key={key} label={key} field={key} />
//                 ) : null
//               )}
//             </div>

//             {isEditing && (
//               <div className="mt-6 text-right">
//                 <button
//                   onClick={handleSave}
//                   className="bg-blue-600 text-white px-6 py-2 rounded-lg"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   /* REUSABLE INPUT */
//   function Input({ label, field }) {
//     return (
//       <div>
//         <label className="font-semibold capitalize">{label}</label>
//         <input
//           type="text"
//           disabled={!isEditing}
//           value={selectedTeacher[field] || ""}
//           onChange={(e) =>
//             setSelectedTeacher({
//               ...selectedTeacher,
//               [field]: e.target.value,
//             })
//           }
//           className="w-full border px-3 py-2 rounded mt-1"
//         />
//       </div>
//     );
//   }
// };

// export default AdminTeachers;
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Appcontext } from "../../context/Appcontext";

const AdminTeachers = () => {

  const {
    teachers,
    getTeachers,
    updateTeacher,
    deleteTeacher,
  } = useContext(Appcontext);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");

  /* ================= LOAD TEACHERS ================= */
  useEffect(() => {
    getTeachers();
  }, []);

  /* ================= FILTER ================= */
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    teacher.employeeCode?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= SAVE UPDATE ================= */
  const handleSave = async () => {
    const formData = new FormData();

    for (let key in selectedTeacher) {
      formData.append(key, selectedTeacher[key]);
    }

    await updateTeacher(selectedTeacher._id, formData);

    setIsEditing(false);
    setSelectedTeacher(null);
  };

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <h2 className="text-2xl font-bold text-gray-700">
        👩‍🏫 Teacher Management
      </h2>

      {/* SEARCH */}
      <div className="bg-white shadow rounded-xl p-4">
        <input
          type="text"
          placeholder="Search by name or employee code..."
          className="border px-3 py-2 rounded-lg w-full md:w-1/2"
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
              <th className="px-6 py-3">Employee Code</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Subject</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={teacher.photo}
                    alt={teacher.fullName}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="px-6 py-4 font-medium">
                  {teacher.fullName}
                </td>
                <td className="px-6 py-4">{teacher.employeeCode}</td>
                <td className="px-6 py-4">{teacher.department}</td>
                <td className="px-6 py-4">{teacher.subject}</td>
                <td className="px-6 py-4">{teacher.contact}</td>
                <td className="px-6 py-4">{teacher.status}</td>
                <td className="px-6 py-4 flex space-x-3">

                  <FaEye
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setIsEditing(false);
                    }}
                    className="cursor-pointer text-blue-600"
                  />

                  <FaEdit
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setIsEditing(true);
                    }}
                    className="cursor-pointer text-green-600"
                  />

                  <FaTrash
                    onClick={() => deleteTeacher(teacher._id)}
                    className="cursor-pointer text-red-600"
                  />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Teacher" : "Teacher Profile"}
              </h2>
              <button onClick={() => setSelectedTeacher(null)}>✕</button>
            </div>

            {/* PHOTO */}
            <div className="flex justify-center mb-6">
              <img
                src={selectedTeacher.photo}
                alt={selectedTeacher.fullName}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
              />
            </div>

            {/* CHANGE PHOTO */}
            {isEditing && (
              <div className="mb-6">
                <label className="font-semibold">Change Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedTeacher({
                        ...selectedTeacher,
                        photo: file,
                      });
                    }
                  }}
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
            )}

            {/* FIELDS */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {Object.keys(selectedTeacher).map((key) =>
                key !== "_id" &&
                key !== "__v" &&
                key !== "photo" ? (
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
          value={selectedTeacher[field] || ""}
          onChange={(e) =>
            setSelectedTeacher({
              ...selectedTeacher,
              [field]: e.target.value,
            })
          }
          className="w-full border px-3 py-2 rounded mt-1"
        />
      </div>
    );
  }
};

export default AdminTeachers;