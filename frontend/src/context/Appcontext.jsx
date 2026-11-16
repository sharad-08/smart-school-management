import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api, { errorMessage } from "../api";

export const Appcontext = createContext();

export default function AppcontextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [teacherProfile, setTeacherProfile] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [studentsdata, setStudentsdata] = useState([]);
  const [teacherStudents, setTeacherStudents] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileVersion, setProfileVersion] = useState(0);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);
  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [role]);

  useEffect(() => {
    setTeacherProfile(null);
    setStudentProfile(null);
    setStudentsdata([]);
    setTeacherStudents([]);
    setProfileError("");
    if (!token || role === "admin") return;
    let active = true;
    setProfileLoading(true);
    api.get("/api/auth/profile").then(({ data }) => {
      if (!active) return;
      setTeacherProfile(data.teacher || null);
      setStudentProfile(data.student || null);
    }).catch((error) => {
      if (active) setProfileError(errorMessage(error));
    }).finally(() => {
      if (active) setProfileLoading(false);
    });
    return () => { active = false; };
  }, [token, role, profileVersion]);

  const refreshProfile = useCallback(() => setProfileVersion((value) => value + 1), []);
  const getAllStudents = useCallback(async () => {
    try {
      const { data } = await api.get("/api/marks/students");
      setStudentsdata(data.students || []);
      setTeacherStudents(data.students || []);
      return data.students || [];
    } catch (error) {
      toast.error(errorMessage(error));
      return [];
    }
  }, []);
  const saveAttendance = async (attendanceData, className, section, date) => {
    try {
      const { data } = await api.post("/api/attendance/save", { attendanceData, className, section, date });
      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(errorMessage(error));
      return false;
    }
  };
  const getDailyAttendance = async (className, section, date) => {
    try {
      return (await api.get("/api/attendance/daily", { params: { className, section, date } })).data;
    } catch (error) {
      toast.error(errorMessage(error));
      return [];
    }
  };
  const getMonthlyReport = async (studentId, month, year) =>
    (await api.get("/api/attendance/monthly", { params: { studentId, month, year } })).data;
  const getAttendancePercentage = async (studentId) =>
    (await api.get(`/api/attendance/percentage/${studentId}`)).data;
  const saveStudentMarks = async (examType, outOf, marksArray) => {
    try {
      const { data } = await api.post("/api/marks/save", { examType, outOf, marksArray });
      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(errorMessage(error));
      return false;
    }
  };
  const getExamMarks = async (examType) => (await api.get(`/api/marks/exam/${encodeURIComponent(examType)}`)).data.marks || [];
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    setTeacherProfile(null);
    setStudentProfile(null);
    setStudentsdata([]);
    setTeacherStudents([]);
  };

  return <Appcontext.Provider value={{
    token, setToken, role, setRole, teacherProfile, setTeacherProfile,
    studentProfile, setStudentProfile, studentsdata, setStudentsdata,
    teacherStudents, setTeacherStudents, profileLoading, profileError, refreshProfile,
    getTeacherProfile: refreshProfile, getStudentProfile: refreshProfile,
    getAllStudents, getTeacherStudents: getAllStudents, saveAttendance, getDailyAttendance,
    getMonthlyReport, getAttendancePercentage, saveStudentMarks, getExamMarks, logoutUser,
  }}>{children}</Appcontext.Provider>;
}
