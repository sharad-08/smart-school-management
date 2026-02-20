 import React, { createContext, useState } from "react";

export const Appcontext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Appcontext.Provider value={{ token, setToken }}>
      {children}
    </Appcontext.Provider>
  );
};
