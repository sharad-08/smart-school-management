// //  import React, { useContext } from 'react'
// // import assets from '../../assets/assets'
// // import { useNavigate } from 'react-router-dom'
// // import { Appcontext } from '../../context/Appcontext'

// // const Studentnavbar = () => {

// //   const navigate = useNavigate()
// //   const { setToken, setRole } = useContext(Appcontext)

// //   // Dummy student data (later you can fetch from API)
// //   const student = {
// //     name: "Rahul Sharma",
// //     className: "Class 10-A",
// //     profile: assets.upload_area
// //   }

// //   const logout = () => {
// //     setToken(null)
// //     setRole("")
// //     localStorage.removeItem("token")
// //     navigate("/")
// //   }

// //   return (
// //     <div className='sticky top-0 left-0 w-full bg-white shadow-md border-b flex items-center justify-between px-8 mb-0.5 z-50'>

// //       {/* LEFT SECTION */}
// //       <div className='flex items-center gap-4'>

// //         {/* School Logo */}
// //         <img
// //           onClick={() => navigate("/student")}
// //           src={assets.logo}
// //           alt="school logo"
// //           className='w-32 cursor-pointer'
// //         />

// //         {/* Role Badge */}
// //         <span className='text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium'>
// //           Student
// //         </span>
// //       </div>


// //       {/* RIGHT SECTION */}
// //       <div className='flex items-center gap-6'>

// //         {/* Notification Bell */}
// //         <div className='relative cursor-pointer'>
// //           <i className='bx bxs-bell text-2xl text-gray-700'></i>
// //           <span className='absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full'></span>
// //         </div>

// //         {/* Student Info */}
// //         <div className='flex items-center gap-3'>

// //           <img
// //             src={student.profile}
// //             alt="profile"
// //             className='w-10 h-10 rounded-full object-cover border'
// //           />

// //           <div className='flex flex-col leading-tight'>
// //             <p className='text-sm font-semibold'>{student.name}</p>
// //             <p className='text-xs text-gray-500'>{student.className}</p>
// //           </div>
// //         </div>

// //         {/* Logout Icon */}
// //         <i
// //           onClick={logout}
// //           className='bx bx-log-out text-2xl text-red-500 cursor-pointer hover:text-red-600'
// //         ></i>

// //       </div>
// //     </div>
// //   )
// // }

// // export default Studentnavbar


// import React, { useContext, useEffect, useState } from 'react'
// import assets from '../../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { Appcontext } from '../../context/Appcontext'

// const Studentnavbar = () => {

//   const navigate = useNavigate()
//   const { setToken, setRole } = useContext(Appcontext)

//   // 🕒 Time State
//   const [dateTime, setDateTime] = useState("")

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date()

//       const options = {
//         weekday: "short",
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//         second: "numeric",
//         hour12: true // 👈 AM/PM format
//       }

//       setDateTime(now.toLocaleString("en-IN", options))
//     }

//     updateTime()
//     const interval = setInterval(updateTime, 1000)

//     return () => clearInterval(interval)
//   }, [])

//   // Dummy student data
//   const student = {
//     name: "Rahul Sharma",
//     className: "Class 10-A",
//     profile: assets.upload_area
//   }

//   const logout = () => {
//     setToken(null)
//     setRole("")
//     localStorage.removeItem("token")
//     navigate("/")
//   }

//   return (
//     <div className='sticky top-0 left-0 w-full bg-white shadow-md border-b flex items-center justify-between px-8 mb-0.5 z-50'>

//       {/* LEFT SECTION */}
//       <div className='flex items-center gap-4'>
//         <img
//           onClick={() => navigate("/student")}
//           src={assets.logo}
//           alt="school logo"
//           className='w-32 cursor-pointer'
//         />

//         <span className='text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium'>
//           Student
//         </span>
//       </div>

//       {/* 🕒 CENTER SECTION (Date + Time) */}
//       <div className='text-center'>
//         <p className='text-sm font-semibold text-gray-700'>
//           {dateTime}
//         </p>
//       </div>

//       {/* RIGHT SECTION */}
//       <div className='flex items-center gap-6'>

//         <div className='relative cursor-pointer'>
//           <i className='bx bxs-bell text-2xl text-gray-700'></i>
//           <span className='absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full'></span>
//         </div>

//         <div className='flex items-center gap-3'>
//           <img
//             src={student.profile}
//             alt="profile"
//             className='w-10 h-10 rounded-full object-cover border'
//           />

//           <div className='flex flex-col leading-tight'>
//             <p className='text-sm font-semibold'>{student.name}</p>
//             <p className='text-xs text-gray-500'>{student.className}</p>
//           </div>
//         </div>

//         <i
//           onClick={logout}
//           className='bx bx-log-out text-2xl text-red-500 cursor-pointer hover:text-red-600'
//         ></i>

//       </div>
//     </div>
//   )
// }

// export default Studentnavbar


import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";

const Studentnavbar = () => {
  const navigate = useNavigate();

  const { setToken, setRole, studentProfile } = useContext(Appcontext);

  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };

      setDateTime(now.toLocaleString("en-IN", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    setToken(null);
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="sticky top-0 left-0 w-full bg-white shadow-md border-b flex items-center justify-between px-8 mb-0.5 z-50">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        <img
          onClick={() => navigate("/student")}
          src={assets.logo}
          alt="school logo"
          className="w-32 cursor-pointer"
        />

        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
          Student
        </span>
      </div>

      {/* CENTER SECTION */}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">{dateTime}</p>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <i className="bx bxs-bell text-2xl text-gray-700"></i>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={studentProfile?.Profile || studentProfile?.photo || assets.upload_area}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />

          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold">
              {studentProfile?.Name || studentProfile?.name || "Student Name"}
            </p>
            <p className="text-xs text-gray-500">
              {studentProfile?.Class && studentProfile?.Section
                ? `${studentProfile.Class}-${studentProfile.Section}`
                : studentProfile?.className || "Class not available"}
            </p>
          </div>
        </div>

        <i
          onClick={logout}
          className="bx bx-log-out text-2xl text-red-500 cursor-pointer hover:text-red-600"
        ></i>
      </div>
    </div>
  );
};

export default Studentnavbar;