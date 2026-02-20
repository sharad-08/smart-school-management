 import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { Appcontext}  from "../context/Appcontext";

const Login = () => {
  const  {setRole}  = useContext(Appcontext);
  const navigate = useNavigate();

  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("student"); // default

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy validation
    if (schoolId && password) {
      setRole(loginType);

      if (loginType === "student") {
        navigate("/student");
      } else {
        navigate("/teacher");
      }
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">School Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="School ID"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        {/* Switch Login */}
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



