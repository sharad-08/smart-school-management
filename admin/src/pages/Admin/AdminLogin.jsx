// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Dummy Admin Credentials
//     if (form.email === "admin@gmail.com" && form.password === "1234") {
//       localStorage.setItem("adminAuth", "true");
//       navigate("/admin");
//     } else {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-xl shadow w-96"
//       >
//         <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-4"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full p-2 border rounded mb-6"
//           required
//         />

//         <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
//           Login
//         </button>

//         <p className="text-sm text-gray-500 mt-4 text-center">
//           Demo: admin@gmail.com / 1234
//         </p>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(Appcontext);

  const login = () => {
    localStorage.setItem("token", "admin123");
    setToken("admin123");
    navigate("/admin");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
