 

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const Appcontext = createContext();

// const AppcontextProvider = ({ children }) => {

//   // ===============================
//   // STATES
//   // ===============================

//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [role, setRole] = useState(localStorage.getItem("role") || null);

//   const [studentsdata, setStudentsdata] = useState([]);
//   const [teachersdata, setTeachersdata] = useState([]);
//   const [teacherProfile, setTeacherProfile] = useState(null);
//   // ===============================
//   // SAVE TOKEN TO LOCAL STORAGE
//   // ===============================

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   // ===============================
//   // SAVE ROLE TO LOCAL STORAGE
//   // ===============================

//   useEffect(() => {
//     if (role) {
//       localStorage.setItem("role", role);
//     } else {
//       localStorage.removeItem("role");
//     }
//   }, [role]);

//   // ===============================
//   // GET ALL STUDENTS
//   // ===============================

//   const getAllStudents = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/api/admin/studentsdata"
//       );

//       if (res.data.success) {
//         setStudentsdata(res.data.students);
//         return res.data.students;
//       }
//     } catch (error) {
//       console.log("Student fetch error:", error.message);
//     }
//   };

//   // ===============================
//   // GET ALL TEACHERS
//   // ===============================

//   const getAllTeachers = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/api/admin/teachersdata"
//       );

//       if (res.data.success) {
//         setTeachersdata(res.data.teachers);
//       }
//       console.log(res.data);
//     } catch (error) {
//       console.log("Teacher fetch error:", error.message);
//     }
//   };

//   // ===============================
//   // FETCH DATA BASED ON ROLE
//   // ===============================

//   useEffect(() => {

//     if (role === "student") {
//       getAllStudents();
//     }


//   }, [role]);

//   useEffect(() => {
//   if (role === "teacher" && token) {
//     getTeacherProfile();
//   }
// }, [role, token]);

//   const getTeacherProfile = async () => {
//   try {
//     const res = await axios.get(
//       "http://localhost:4000/api/auth/profile",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (res.data.success) {
//       setTeacherProfile(res.data.teacher);
//         return res.data.teacher;              // return teacher
//     } 
//     console.log(res.data)
       
//   } catch (error) {
//     console.log("Profile fetch error:", error.message);
//   }
// };


// //--------------Attendance section ------------------
// const saveAttendance = async (attendance, className, section, date) => {
//   try {
//     const res = await axios.post(
//       "http://localhost:4000/api/attendance/save",
//       {
//         attendanceData: attendance,
//         className,
//         section,
//         date
//       }
//     );

//     alert(res.data.message);

//   } catch (error) {
//     console.log(error);
//     alert("Error saving attendance");
//   }
// };


// const getDailyAttendance = async (className, section, date) => {
//   try {
//     const res = await axios.get(
//       "http://localhost:4000/api/attendance/daily",
//       {
//         params: { className, section, date }
//       }
//     );

//     return res.data;

//   } catch (error) {
//     console.log(error);
//   }
// };


// const getMonthlyReport = async (studentId, month, year) => {
//   try {
//     const res = await axios.get(
//       "http://localhost:4000/api/attendance/monthly",
//       {
//         params: { studentId, month, year }
//       }
//     );

//     return res.data;

//   } catch (error) {
//     console.log(error);
//   }
// };
// const getAttendancePercentage = async (studentId) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:4000/api/attendance/percentage/${studentId}`
//     );

//     return res.data;

//   } catch (error) {
//     console.log(error);
//   }
// };


// //----------Marks-------------





//   // ===============================
//   // CONTEXT VALUE
//   // ===============================

//   const value = {
//     token,
//     setToken,
//     role,
//     setRole,
//     studentsdata,
//     teachersdata,
//     getAllStudents,
//     getAllTeachers,
//     getTeacherProfile,
//     teacherProfile,
//      saveAttendance,
//     getDailyAttendance,
//     getMonthlyReport,
//     getAttendancePercentage,
//   };

//   return (
//     <Appcontext.Provider value={value}>
//       {children}
//     </Appcontext.Provider>
//   );
// };

// export default AppcontextProvider;


import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Appcontext = createContext();

const AppcontextProvider = ({ children }) => {

  // ===============================
  // STATES
  // ===============================

  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  const [studentsdata, setStudentsdata] = useState([]);
  const [teachersdata, setTeachersdata] = useState([]);
  const [teacherProfile, setTeacherProfile] = useState(null);

  // 🟢 Marks Section State
  const [teacherStudents, setTeacherStudents] = useState([]);

  // ===============================
  // SAVE TOKEN
  // ===============================

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // ===============================
  // SAVE ROLE
  // ===============================

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  // ===============================
  // GET ALL STUDENTS (ADMIN)
  // ===============================

  const getAllStudents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/studentsdata"
      );

      if (res.data.success) {
        setStudentsdata(res.data.students);
        return res.data.students;
      }
    } catch (error) {
      console.log("Student fetch error:", error.message);
    }
  };

  // ===============================
  // GET ALL TEACHERS (ADMIN)
  // ===============================

  const getAllTeachers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/admin/teachersdata"
      );

      if (res.data.success) {
        setTeachersdata(res.data.teachers);
      }
    } catch (error) {
      console.log("Teacher fetch error:", error.message);
    }
  };

  // ===============================
  // FETCH DATA BASED ON ROLE
  // ===============================

  useEffect(() => {
    if (role === "student") {
      getAllStudents();
    }
  }, [role]);

  useEffect(() => {
    if (role === "teacher" && token) {
      getTeacherProfile();
    }
  }, [role, token]);

  // ===============================
  // GET TEACHER PROFILE
  // ===============================

  const getTeacherProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setTeacherProfile(res.data.teacher);
     
        return res.data.teacher;
      }

    } catch (error) {
      console.log("Profile fetch error:", error.message);
    }
  };

  // ======================================================
  // ================== ATTENDANCE SECTION =================
  // ======================================================

  const saveAttendance = async (attendance, className, section, date) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/attendance/save",
        {
          attendanceData: attendance,
          className,
          section,
          date
        }
      );

      alert(res.data.message);

    } catch (error) {
      console.log(error);
      alert("Error saving attendance");
    }
  };

  const getDailyAttendance = async (className, section, date) => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/attendance/daily",
        {
          params: { className, section, date }
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMonthlyReport = async (studentId, month, year) => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/attendance/monthly",
        {
          params: { studentId, month, year }
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getAttendancePercentage = async (studentId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/attendance/percentage/${studentId}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // ================== MARKS SECTION ======================
  // ======================================================

  // 🔹 Get students of teacher's class
  const getTeacherStudents = async () => {
    try {
      if (!teacherProfile) return;

      const res = await axios.get(
        "http://localhost:4000/api/marks/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setTeacherStudents(res.data.students);
        console.log(res.data.students);
      }

    } catch (error) {
      console.log("Marks student fetch error:", error.message);
    }
  };

  // 🔹 Save or Update Marks
  const saveStudentMarks = async (examType, outOf, marksArray) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/marks/save",
        {
          examType,
          outOf,
          marksArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

    } catch (error) {
      console.log("Marks save error:", error.message);
    }
  };

  // 🔹 Get Marks by Exam Type
  const getExamMarks = async (examType) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/marks/exam/${examType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.marks;

    } catch (error) {
      console.log("Marks fetch error:", error.message);
      return [];
    }
  };

  // ======================================================
  // CONTEXT VALUE
  // ======================================================

  const value = {
    token,
    setToken,
    role,
    setRole,
    studentsdata,
    teachersdata,
    getAllStudents,
    getAllTeachers,
    getTeacherProfile,
    teacherProfile,

    // Attendance
    saveAttendance,
    getDailyAttendance,
    getMonthlyReport,
    getAttendancePercentage,

    // Marks
    teacherStudents,
    getTeacherStudents,
    saveStudentMarks,
    getExamMarks,
  };

  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
};

export default AppcontextProvider;