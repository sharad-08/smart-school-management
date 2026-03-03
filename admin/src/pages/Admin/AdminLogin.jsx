

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(Appcontext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (form.email === "admin@gmail.com" && form.password === "1234") {
  //     const demoToken = "admin-token-123";

  //     localStorage.setItem("token", demoToken);
  //     setToken(demoToken);

  //     navigate("/admin");
  //   } else {
  //     alert("Invalid Credentials");
  //   }
  // };

  //  const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const { data } = await axios.post(
  //       "http://localhost:4000/api/admin/login", // apna backend route yaha daalo
  //       form
  //     );
  //  console.log(data);
  //     if (data.success) {
  //       localStorage.setItem("token", data.token);
  //       setToken(data.token);
  //        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  //       toast.success("Login Successful ✅");

  //       navigate("/admin");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message || "Something went wrong ❌"
  //     );
  //   }
  // };
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:4000/api/admin/login",
      form
    );

    console.log(res.data); // 👈 check karo yaha

    if (res.data.success) {
      const token = res.data.token; // adjust if needed

      if (!token) {
        toast.error("Token not received from backend ❌");
        return;
      }

      localStorage.setItem("token", token);
      setToken(token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Login Successful ✅");
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error("Login Failed ❌");
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded mb-6"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
          Login
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Demo: admin@gmail.com / admin@123
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;