import { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import api, { errorMessage } from "../api";
import { Appcontext as SessionContext } from "./Appcontext";

export const Appcontext = createContext();

export function AppProvider({ children }) {
  const { token, setToken } = useContext(SessionContext);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const getstudent = useCallback(async () => {
    const { data } = await api.get("/api/admin/studentsdata");
    if (!data.success) throw new Error(data.message);
    setStudents(data.students);
    return data.students;
  }, []);
  const getTeachers = useCallback(async () => {
    const { data } = await api.get("/api/admin/teachersdata");
    if (!data.success) throw new Error(data.message);
    setTeachers(data.teachers);
    return data.teachers;
  }, []);
  const addTeacher = async (formData) => {
    try {
      const { data } = await api.post("/api/admin/add-teacher", formData);
      if (!data.success) throw new Error(data.message);
      await getTeachers();
      return true;
    } catch (error) {
      toast.error(error.response ? errorMessage(error) : error.message);
      return false;
    }
  };
  return <Appcontext.Provider value={{
    token, setToken, students, teachers, totalStudents: students.length,
    getstudent, getTeachers, addTeacher,
  }}>{children}</Appcontext.Provider>;
}
