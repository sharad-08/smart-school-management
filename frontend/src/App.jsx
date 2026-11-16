import { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Appcontext } from "./context/Appcontext";
import { AppProvider } from "./context/Admincontext";
import { StudentPortalProvider } from "./context/StudentPortalContext";
import PortalLayout from "./components/portal/PortalLayout";
import { ResourceState } from "./components/portal/UI";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Facilities from "./pages/Facilities";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Records from "./pages/Admin/Records";
import AddStudent from "./pages/Admin/AddStudent";
import AddTeacher from "./pages/Admin/AddTeacher";
import ClassTimetable from "./pages/Admin/ClassTimetable";
import AdminTeacherSchedule from "./pages/Admin/TeacherSchedule";
import UploadPhotos from "./pages/Admin/uploadphotos";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentAttendance from "./pages/Student/StudentAttendance";
import StudentMarks from "./pages/Student/StudentMarks";
import StudentFee from "./pages/Student/StudentFee";
import StudentProfile from "./pages/Student/StudentProfile";
import StudentTeachers from "./pages/Student/Studentteacher";
import StudentTimetable from "./pages/Student/Studenttimetable";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import TeacherStudents from "./pages/Teacher/StudentList";
import AttendanceEntry from "./pages/Teacher/AttendanceEntry";
import MarksEntry from "./pages/Teacher/MarksEntry";
import MessageCenter from "./pages/Teacher/MessageCenter";
import TeacherSchedule from "./pages/Teacher/TeacherSchedule";
import TeacherProfile from "./pages/Teacher/TeacherProfile";

function RequireRole({ allowed, children }) {
  const { token, role, profileLoading, profileError, refreshProfile, teacherProfile, studentProfile } = useContext(Appcontext);
  if (!token || !["admin", "teacher", "student"].includes(role)) return <Navigate to="/login" replace />;
  if (role !== allowed) return <Navigate to={`/${role}`} replace />;
  if (role !== "admin") return <ResourceState loading={profileLoading || (!profileError && !(teacherProfile || studentProfile))} error={profileError} reload={refreshProfile}>{children}</ResourceState>;
  return children;
}

function LoginRoute() {
  const { token, role } = useContext(Appcontext);
  return token && ["admin", "teacher", "student"].includes(role) ? <Navigate to={`/${role}`} replace /> : <Login />;
}

function Contact() {
  return <section className="contact-page panel"><p className="eyebrow">Nimar Academy</p><h1>Contact the school</h1><p>Rahadkot, Madhya Pradesh · PIN 451113</p><a className="text-link" href="tel:9691428500">96914-28500</a><a className="text-link" href="mailto:nimaracademy@gmail.com">nimaracademy@gmail.com</a></section>;
}

export default function App() {
  return <><ToastContainer position="top-right" /><Routes>
    <Route element={<><Navbar /><main className="public-content"><Outlet /></main><Footer /></>}>
      <Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/facilities" element={<Facilities />} /><Route path="/facilities/:type" element={<Facilities />} /><Route path="/contact" element={<Contact />} />
    </Route>
    <Route path="/login" element={<LoginRoute />} />
    <Route path="/admin" element={<RequireRole allowed="admin"><AppProvider><PortalLayout /></AppProvider></RequireRole>}>
      <Route index element={<AdminDashboard />} /><Route path="students" element={<Records type="students" />} /><Route path="teachers" element={<Records type="teachers" />} /><Route path="add-student" element={<AddStudent />} /><Route path="add-teacher" element={<AddTeacher />} /><Route path="timetable" element={<ClassTimetable />} /><Route path="teacher-schedule" element={<AdminTeacherSchedule />} /><Route path="uploadphotos" element={<UploadPhotos />} /><Route path="fees" element={<Navigate to="/admin/students" replace />} /><Route path="*" element={<Navigate to="/admin" replace />} />
    </Route>
    <Route path="/student" element={<RequireRole allowed="student"><StudentPortalProvider><PortalLayout /></StudentPortalProvider></RequireRole>}>
      <Route index element={<StudentDashboard />} /><Route path="attendance" element={<StudentAttendance />} /><Route path="marks" element={<StudentMarks />} /><Route path="fees" element={<StudentFee />} /><Route path="profile" element={<StudentProfile />} /><Route path="teachers" element={<StudentTeachers />} /><Route path="timetable" element={<StudentTimetable />} /><Route path="*" element={<Navigate to="/student" replace />} />
    </Route>
    <Route path="/teacher" element={<RequireRole allowed="teacher"><PortalLayout /></RequireRole>}>
      <Route index element={<TeacherDashboard />} /><Route path="students" element={<TeacherStudents />} /><Route path="attendance" element={<AttendanceEntry />} /><Route path="marks" element={<MarksEntry />} /><Route path="messages" element={<MessageCenter />} /><Route path="schedule" element={<TeacherSchedule />} /><Route path="profile" element={<TeacherProfile />} /><Route path="*" element={<Navigate to="/teacher" replace />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></>;
}
