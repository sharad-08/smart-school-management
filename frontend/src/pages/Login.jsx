
// // import React, { useContext, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Appcontext } from "../context/Appcontext";

// // const Login = () => {
// //   const { setRole } = useContext(Appcontext);
// //   const navigate = useNavigate();

// //   const [schoolId, setSchoolId] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [loginType, setLoginType] = useState("student"); // default student

// //   const handleLogin = (e) => {
// //     e.preventDefault();

// //     if (schoolId && password) {
// //       setRole(loginType);

// //       if (loginType === "student") {
// //         navigate("/student");
// //       } else {
// //         navigate("/teacher");
// //       }
// //     } else {
// //       alert("Please fill all fields");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-indigo-100">
// //       <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        
// //         {/* Dynamic Heading */}
// //         <h2 className="text-2xl font-bold text-center mb-6">
// //           {loginType === "student" ? "Student Login" : "Teacher Login"}
// //         </h2>

// //         <form onSubmit={handleLogin} className="space-y-4">
          
// //           {/* Dynamic ID Placeholder */}
// //           <input
// //             type="text"
// //             placeholder={
// //               loginType === "student"
// //                 ? "Enter Student School ID"
// //                 : "Enter Teacher ID"
// //             }
// //             value={schoolId}
// //             onChange={(e) => setSchoolId(e.target.value)}
// //             className="w-full p-2 border rounded-lg"
// //           />

// //           <input
// //             type="password"
// //             placeholder={
// //               loginType === "student"
// //                 ? "Enter Student Password"
// //                 : "Enter Teacher Password"
// //             }
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             className="w-full p-2 border rounded-lg"
// //           />

// //           <button
// //             type="submit"
// //             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
// //           >
// //             Login as {loginType === "student" ? "Student" : "Teacher"}
// //           </button>
// //         </form>

// //         {/* Switch Login */}
// //         <p className="text-center mt-4 text-sm">
// //           {loginType === "student" ? (
// //             <>
// //               Click here if login as{" "}
// //               <span
// //                 className="text-indigo-600 cursor-pointer font-semibold"
// //                 onClick={() => setLoginType("teacher")}
// //               >
// //                 Teacher
// //               </span>
// //             </>
// //           ) : (
// //             <>
// //               Click here if login as{" "}
// //               <span
// //                 className="text-indigo-600 cursor-pointer font-semibold"
// //                 onClick={() => setLoginType("student")}
// //               >
// //                 Student
// //               </span>
// //             </>
// //           )}
// //         </p>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Appcontext } from "../context/Appcontext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Login = () => {
//   const { setRole, setToken } = useContext(Appcontext);
//   const navigate = useNavigate();

//   const [schoolId, setSchoolId] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginType, setLoginType] = useState("student");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!schoolId || !password) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "http://localhost:4000/api/auth/login",
//         {
//           id: schoolId,
//           password: password,
//           role: loginType,
//         }
//       );

//       if (res.data.success) {
//         setRole(res.data.role);
//         setToken(res.data.token);

//         toast.success("Login Successful 🎉");

//         setTimeout(() => {
//           if (res.data.role === "student") {
//             navigate("/student");
//           } else {
//             navigate("/teacher");
//           }
//         }, 1500);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Login failed ❌"
//       );
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-indigo-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {loginType === "student" ? "Student Login" : "Teacher Login"}
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">
          
//           <input
//             type="text"
//             placeholder={
//               loginType === "student"
//                 ? "Enter Student School ID"
//                 : "Enter Teacher ID"
//             }
//             value={schoolId}
//             onChange={(e) => setSchoolId(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//           />

//           <input
//             type="password"
//             placeholder={
//               loginType === "student"
//                 ? "Enter Student Password"
//                 : "Enter Teacher Password"
//             }
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//           />

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//           >
//             Login as {loginType === "student" ? "Student" : "Teacher"}
//           </button>
//         </form>

//         <p className="text-center mt-4 text-sm">
//           {loginType === "student" ? (
//             <>
//               Click here if login as{" "}
//               <span
//                 className="text-indigo-600 cursor-pointer font-semibold"
//                 onClick={() => setLoginType("teacher")}
//               >
//                 Teacher
//               </span>
//             </>
//           ) : (
//             <>
//               Click here if login as{" "}
//               <span
//                 className="text-indigo-600 cursor-pointer font-semibold"
//                 onClick={() => setLoginType("student")}
//               >
//                 Student
//               </span>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setRole, setToken, setStudentProfile } = useContext(Appcontext);
  const navigate = useNavigate();

  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("student");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!schoolId || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        id: schoolId,
        password: password,
        role: loginType,
      });

      if (res.data.success) {
        setRole(res.data.role);
        setToken(res.data.token);

        // ✅ optional: if backend sends student data directly
        if (res.data.role === "student" && res.data.student) {
          setStudentProfile(res.data.student);
        }

        toast.success("Login Successful 🎉");

        setTimeout(() => {
          if (res.data.role === "student") {
            navigate("/student");
          } else {
            navigate("/teacher");
          }
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {loginType === "student" ? "Student Login" : "Teacher Login"}
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder={
              loginType === "student"
                ? "Enter Student School ID"
                : "Enter Teacher ID"
            }
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder={
              loginType === "student"
                ? "Enter Student Password"
                : "Enter Teacher Password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Login as {loginType === "student" ? "Student" : "Teacher"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {loginType === "student" ? (
            <>
              Click here if login as{" "}
              <span
                className="text-indigo-600 cursor-pointer font-semibold"
                onClick={() => setLoginType("teacher")}
              >
                Teacher
              </span>
            </>
          ) : (
            <>
              Click here if login as{" "}
              <span
                className="text-indigo-600 cursor-pointer font-semibold"
                onClick={() => setLoginType("student")}
              >
                Student
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;