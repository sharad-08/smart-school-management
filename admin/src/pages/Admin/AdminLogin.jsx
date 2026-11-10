import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../context/Appcontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api";

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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", form);
      if (!data.success || !data.token) {
        toast.error(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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

      </form>
    </div>
  );
};

export default AdminLogin;