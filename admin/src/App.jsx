

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";

import StudentList from "./pages/Admin/StudentList";
import AddStudent from "./pages/Admin/AddStudent";
import StudentFees from "./pages/Admin/StudentFees";

import TeacherList from "./pages/Admin/TeacherList";
import AddTeacher from "./pages/Admin/AddTeacher";
import TeacherSchedule from "./pages/Admin/TeacherSchedule";

import ClassTimetable from "./pages/Admin/ClassTimetable";
import ExamManagement from "./pages/Admin/ExamManagement";


import ProtectedRoute from "./components/ProtectedRoute";
import AdminGallery from "./pages/Admin/uploadphotos";

const App = () => {
  return (
    <> 
       <ToastContainer />
    <Routes>
      <Route path="/" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="students" element={<StudentList />} />
        <Route path="add-student" element={<AddStudent />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="Uploadphotos" element={<AdminGallery/>}/>

        <Route path="teachers" element={<TeacherList />} />
        <Route path="add-teacher" element={<AddTeacher />} />
        <Route path="teacher-schedule" element={<TeacherSchedule />} />

        <Route path="timetable" element={<ClassTimetable />} />
        <Route path="exams" element={<ExamManagement />} />
       
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>

    </>
  );
};

export default App;
