 import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Appcontext } from "../context/Appcontext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(Appcontext);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
