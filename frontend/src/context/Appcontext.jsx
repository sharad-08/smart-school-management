 

// // import React, { createContext, useState, useEffect } from "react";
// // import axios from "axios";

// // export const Appcontext = createContext();

// // const AppcontextProvider = ({ children }) => {

// //   // ===============================
// //   // STATES
// //   // ===============================

// //   const [token, setToken] = useState(localStorage.getItem("token") || null);
// //   const [role, setRole] = useState(localStorage.getItem("role") || null);

// //   const [studentsdata, setStudentsdata] = useState([]);
// //   const [teachersdata, setTeachersdata] = useState([]);
// //   const [teacherProfile, setTeacherProfile] = useState(null);
// //   // ===============================
// //   // SAVE TOKEN TO LOCAL STORAGE
// //   // ===============================

// //   useEffect(() => {
// //     if (token) {
// //       localStorage.setItem("token", token);
// //     } else {
// //       localStorage.removeItem("token");
// //     }
// //   }, [token]);

// //   // ===============================
// //   // SAVE ROLE TO LOCAL STORAGE
// //   // ===============================

// //   useEffect(() => {
// //     if (role) {
// //       localStorage.setItem("role", role);
// //     } else {
// //       localStorage.removeItem("role");
// //     }
// //   }, [role]);

// //   // ===============================
// //   // GET ALL STUDENTS
// //   // ===============================

// //   const getAllStudents = async () => {
// //     try {
// //       const res = await axios.get(
// //         "http://localhost:4000/api/admin/studentsdata"
// //       );

// //       if (res.data.success) {
// //         setStudentsdata(res.data.students);
// //         return res.data.students;
// //       }
// //     } catch (error) {
// //       console.log("Student fetch error:", error.message);
// //     }
// //   };

// //   // ===============================
// //   // GET ALL TEACHERS
// //   // ===============================

// //   const getAllTeachers = async () => {
// //     try {
// //       const res = await axios.get(
// //         "http://localhost:4000/api/admin/teachersdata"
// //       );

// //       if (res.data.success) {
// //         setTeachersdata(res.data.teachers);
// //       }
// //       console.log(res.data);
// //     } catch (error) {
// //       console.log("Teacher fetch error:", error.message);
// //     }
// //   };

// //   // ===============================
// //   // FETCH DATA BASED ON ROLE
// //   // ===============================

// //   useEffect(() => {

// //     if (role === "student") {
// //       getAllStudents();
// //     }


// //   }, [role]);

// //   useEffect(() => {
// //   if (role === "teacher" && token) {
// //     getTeacherProfile();
// //   }
// // }, [role, token]);

// //   const getTeacherProfile = async () => {
// //   try {
// //     const res = await axios.get(
// //       "http://localhost:4000/api/auth/profile",
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       }
// //     );

// //     if (res.data.success) {
// //       setTeacherProfile(res.data.teacher);
// //         return res.data.teacher;              // return teacher
// //     } 
// //     console.log(res.data)
       
// //   } catch (error) {
// //     console.log("Profile fetch error:", error.message);
// //   }
// // };


// // //--------------Attendance section ------------------
// // const saveAttendance = async (attendance, className, section, date) => {
// //   try {
// //     const res = await axios.post(
// //       "http://localhost:4000/api/attendance/save",
// //       {
// //         attendanceData: attendance,
// //         className,
// //         section,
// //         date
// //       }
// //     );

// //     alert(res.data.message);

// //   } catch (error) {
// //     console.log(error);
// //     alert("Error saving attendance");
// //   }
// // };


// // const getDailyAttendance = async (className, section, date) => {
// //   try {
// //     const res = await axios.get(
// //       "http://localhost:4000/api/attendance/daily",
// //       {
// //         params: { className, section, date }
// //       }
// //     );

// //     return res.data;

// //   } catch (error) {
// //     console.log(error);
// //   }
// // };


// // const getMonthlyReport = async (studentId, month, year) => {
// //   try {
// //     const res = await axios.get(
// //       "http://localhost:4000/api/attendance/monthly",
// //       {
// //         params: { studentId, month, year }
// //       }
// //     );

// //     return res.data;

// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
// // const getAttendancePercentage = async (studentId) => {
// //   try {
// //     const res = await axios.get(
// //       `http://localhost:4000/api/attendance/percentage/${studentId}`
// //     );

// //     return res.data;

// //   } catch (error) {
// //     console.log(error);
// //   }
// // };


// // //----------Marks-------------





// //   // ===============================
// //   // CONTEXT VALUE
// //   // ===============================

// //   const value = {
// //     token,
// //     setToken,
// //     role,
// //     setRole,
// //     studentsdata,
// //     teachersdata,
// //     getAllStudents,
// //     getAllTeachers,
// //     getTeacherProfile,
// //     teacherProfile,
// //      saveAttendance,
// //     getDailyAttendance,
// //     getMonthlyReport,
// //     getAttendancePercentage,
// //   };

// //   return (
// //     <Appcontext.Provider value={value}>
// //       {children}
// //     </Appcontext.Provider>
// //   );
// // };

// // export default AppcontextProvider;


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
// //   const [teacherProfile, setTeacherProfile] = useState(null);

//   // 🟢 Marks Section State
//   const [teacherStudents, setTeacherStudents] = useState([]);

//   // ===============================
//   // SAVE TOKEN
//   // ===============================

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//     } else {
//       localStorage.removeItem("token");
//     }
//   }, [token]);

//   // ===============================
//   // SAVE ROLE
//   // ===============================

//   useEffect(() => {
//     if (role) {
//       localStorage.setItem("role", role);
//     } else {
//       localStorage.removeItem("role");
//     }
//   }, [role]);

//   // ===============================
//   // GET STUDENTS IN THE TEACHER’S CLASS
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
//   // GET ALL TEACHERS (ADMIN)
//   // ===============================

//   const getAllTeachers = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/api/admin/teachersdata"
//       );

//       if (res.data.success) {
//         setTeachersdata(res.data.teachers);
//       }
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
//     if (role === "teacher" && token) {
//       getTeacherProfile();
//     }
//   }, [role, token]);

//   // ===============================
//   // GET TEACHER PROFILE
//   // ===============================

//   const getTeacherProfile = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/api/auth/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         setTeacherProfile(res.data.teacher);
     
//         return res.data.teacher;
//       }

//     } catch (error) {
//       console.log("Profile fetch error:", error.message);
//     }
//   };

//   // ======================================================
//   // ================== ATTENDANCE SECTION =================
//   // ======================================================

//   const saveAttendance = async (attendance, className, section, date) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/attendance/save",
//         {
//           attendanceData: attendance,
//           className,
//           section,
//           date
//         }
//       );

//       alert(res.data.message);

//     } catch (error) {
//       console.log(error);
//       alert("Error saving attendance");
//     }
//   };

//   const getDailyAttendance = async (className, section, date) => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/api/attendance/daily",
//         {
//           params: { className, section, date }
//         }
//       );
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getMonthlyReport = async (studentId, month, year) => {
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/api/attendance/monthly",
//         {
//           params: { studentId, month, year }
//         }
//       );
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAttendancePercentage = async (studentId) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:4000/api/attendance/percentage/${studentId}`
//       );
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // ======================================================
//   // ================== MARKS SECTION ======================
//   // ======================================================

//   // 🔹 Get students of teacher's class
//   const getTeacherStudents = async () => {
//     try {
//       if (!teacherProfile) return;

//       const res = await axios.get(
//         "http://localhost:4000/api/marks/students",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         setTeacherStudents(res.data.students);
//         console.log(res.data.students);
//       }

//     } catch (error) {
//       console.log("Marks student fetch error:", error.message);
//     }
//   };

//   // 🔹 Save or Update Marks
//   const saveStudentMarks = async (examType, outOf, marksArray) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/marks/save",
//         {
//           examType,
//           outOf,
//           marksArray,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert(res.data.message);

//     } catch (error) {
//       console.log("Marks save error:", error.message);
//     }
//   };

//   // 🔹 Get Marks by Exam Type
//   const getExamMarks = async (examType) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:4000/api/marks/exam/${examType}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return res.data.marks;

//     } catch (error) {
//       console.log("Marks fetch error:", error.message);
//       return [];
//     }
//   };

//   // ======================================================
//   // CONTEXT VALUE
//   // ======================================================

//   const value = {
//     token,
//     setToken,
//     role,
//     setRole,
//     studentsdata,
//     teachersdata,
//     getAllStudents,
// //     getTeacherProfile,
//     teacherProfile,

//     // Attendance
//     saveAttendance,
//     getDailyAttendance,
//     getMonthlyReport,
//     getAttendancePercentage,

//     // Marks
//     teacherStudents,
//     getTeacherStudents,
//     saveStudentMarks,
//     getExamMarks,
//   };

//   return (
//     <Appcontext.Provider value={value}>
//       {children}
//     </Appcontext.Provider>
//   );
// };

// export default AppcontextProvider;



import React, { createContext, useState, useEffect } from "react";
import axios from "../api";

export const Appcontext = createContext();

const AppcontextProvider = ({ children }) => {
  // ===============================
  // STATES
  // ===============================
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const authHeaders = { Authorization: `Bearer ${token}` };

  const [studentsdata, setStudentsdata] = useState([]);

  const [teacherProfile, setTeacherProfile] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);

  // Marks section
  const [teacherStudents, setTeacherStudents] = useState([]);

  // ===============================
  // SAVE TOKEN TO LOCAL STORAGE
  // ===============================
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // ===============================
  // SAVE ROLE TO LOCAL STORAGE
  // ===============================
  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  // ===============================
  // GET STUDENTS IN THE TEACHER’S CLASS
  // ===============================
  const getAllStudents = async () => {
    try {
      const res = await axios.get("/api/marks/students", { headers: authHeaders });

      if (res.data.success) {
        setStudentsdata(res.data.students);
        return res.data.students;
      }
    } catch (error) {
      console.log("Student fetch error:", error.message);
    }
  };

  // ===============================
  // GET TEACHER PROFILE
  // ===============================
  const getTeacherProfile = async () => {
    try {
      const res = await axios.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setTeacherProfile(res.data.teacher);
        return res.data.teacher;
      }
    } catch (error) {
      if (error.response?.status === 401) logoutUser();
      console.log("Teacher profile fetch error:", error.message);
    }
  };

  // ===============================
  // GET STUDENT PROFILE
  // ===============================
  const getStudentProfile = async () => {
    try {
      const res = await axios.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setStudentProfile(res.data.student);
        return res.data.student;
      }
    } catch (error) {
      if (error.response?.status === 401) logoutUser();
      console.log("Student profile fetch error:", error.message);
    }
  };

  // ===============================
  // FETCH PROFILE BASED ON ROLE
  // ===============================
  useEffect(() => {
    if (role === "teacher" && token) {
      getTeacherProfile();
    }
  }, [role, token]);

  useEffect(() => {
    if (role === "student" && token) {
      getStudentProfile();
    }
  }, [role, token]);

  // ===============================
  // ATTENDANCE SECTION
  // ===============================
  const saveAttendance = async (attendance, className, section, date) => {
    try {
      const res = await axios.post("/api/attendance/save", {
        attendanceData: attendance,
        className,
        section,
        date,
      }, { headers: authHeaders });

      alert(res.data.message);
    } catch (error) {
      console.log("Save attendance error:", error.message);
      alert("Error saving attendance");
    }
  };

  const getDailyAttendance = async (className, section, date) => {
    try {
      const res = await axios.get("/api/attendance/daily", {
        params: { className, section, date },
        headers: authHeaders,
      });

      return res.data;
    } catch (error) {
      console.log("Daily attendance error:", error.message);
    }
  };

  const getMonthlyReport = async (studentId, month, year) => {
    try {
      const res = await axios.get("/api/attendance/monthly", {
        params: { studentId, month, year },
        headers: authHeaders,
      });

      return res.data;
    } catch (error) {
      console.log("Monthly report error:", error.message);
    }
  };

  const getAttendancePercentage = async (studentId) => {
    try {
      const res = await axios.get(
        `/api/attendance/percentage/${studentId}`,
        { headers: authHeaders }
      );

      return res.data;
    } catch (error) {
      console.log("Attendance percentage error:", error.message);
    }
  };

  // ===============================
  // MARKS SECTION
  // ===============================
  const getTeacherStudents = async () => {
    try {
      const res = await axios.get("/api/marks/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setTeacherStudents(res.data.students);
        return res.data.students;
      }
    } catch (error) {
      console.log("Marks student fetch error:", error.message);
    }
  };

  const saveStudentMarks = async (examType, outOf, marksArray) => {
    try {
      const res = await axios.post(
        "/api/marks/save",
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
      alert("Error saving marks");
    }
  };

  const getExamMarks = async (examType) => {
    try {
      const res = await axios.get(
        `/api/marks/exam/${examType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.marks || [];
    } catch (error) {
      console.log("Marks fetch error:", error.message);
      return [];
    }
  };

  // ===============================
  // LOGOUT HELPER
  // ===============================
  const logoutUser = () => {
    setToken(null);
    setRole(null);
    setTeacherProfile(null);
    setStudentProfile(null);
    setTeacherStudents([]);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // ===============================
  // CONTEXT VALUE
  // ===============================
  const value = {
    token,
    setToken,

    role,
    setRole,

    studentsdata,
    setStudentsdata,

    teacherProfile,
    setTeacherProfile,
    getTeacherProfile,

    studentProfile,
    setStudentProfile,
    getStudentProfile,

    getAllStudents,

    // Attendance
    saveAttendance,
    getDailyAttendance,
    getMonthlyReport,
    getAttendancePercentage,

    // Marks
    teacherStudents,
    setTeacherStudents,
    getTeacherStudents,
    saveStudentMarks,
    getExamMarks,

    // Logout
    logoutUser,
  };

  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

export default AppcontextProvider;