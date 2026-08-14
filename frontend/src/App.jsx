

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Appcontext } from "./context/Appcontext";

// Normal Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Notification from "./pages/Notification";
import Facilities from "./pages/Facilities";
import Login from "./pages/Login";

// ================== STUDENT ==================
import Studentnavbar from "./components/student/Studentnavbar";
import Studentsidebar from "./components/student/Studentsidebar";

import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentAttendance from "./pages/Student/StudentAttendance";
import StudentMarks from "./pages/Student/StudentMarks";
import StudentFee from "./pages/Student/StudentFee";
import StudentProfile from "./pages/Student/StudentProfile";
import Studentteacher from "./pages/Student/Studentteacher";
import Studenttimetable from "./pages/Student/Studenttimetable";

// ================== TEACHER ==================
import Teachernavbar from "./components/teacher/Teachernavbar";
import Teachersidebar from "./components/teacher/Teachersidebar";

import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import StudentList from "./pages/Teacher/StudentList";
import AttendanceEntry from "./pages/Teacher/AttendanceEntry";
import MarksEntry from "./pages/Teacher/MarksEntry";
import MessageCenter from "./pages/Teacher/MessageCenter";
import TeacherSchedule from "./pages/Teacher/TeacherSchedule";
import TeacherProfile from "./pages/Teacher/TeacherProfile";

const App = () => {
  const { token, role } = useContext(Appcontext);

  return (
    <>
      {/* ================= STUDENT PANEL ================= */}
      {token && role === "student" ? (
        <>
          <Studentnavbar />
          <Studentsidebar />

          <div className="md:ml-64 mt-20 md:mt-16 p-6">
            <Routes>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/attendance" element={<StudentAttendance />} />
              <Route path="/student/marks" element={<StudentMarks />} />
              <Route path="/student/fees" element={<StudentFee />} />
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/teachers" element={<Studentteacher />} />
              <Route path="/student/timetable" element={<Studenttimetable />} />
            </Routes>
          </div>
        </>
      ) : token && role === "teacher" ? (
        /* ================= TEACHER PANEL ================= */
        <>
          <Teachernavbar />
          <Teachersidebar />
 <div className="md:ml-64 mt-20 md:mt-16 p-6">
      <Routes>

        {/* Default landing page: Teacher Profile */}
        <Route path="/teacher" element={<TeacherProfile />} />

        {/* Other Routes */}
        <Route path="/teacher/students" element={<StudentList />} />
        <Route path="/teacher/attendance" element={<AttendanceEntry />} />
        <Route path="/teacher/marks" element={<MarksEntry />} />
        <Route path="/teacher/messages" element={<MessageCenter />} />
        <Route path="/teacher/schedule" element={<TeacherSchedule />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />

      </Routes>
    </div>
          
        </>
      ) : (
        /* ================= NORMAL WEBSITE ================= */
        <>
          <ToastContainer />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/notification" element={<Notification />} /> */}
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/facilities/:type" element={<Facilities />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <Footer />
        </>
      )}
    </>
  );
};

export default App;
