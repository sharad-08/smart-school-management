// //  import React from "react";
// // import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // /* ================= ADMIN PAGES ================= */
// // import AdminLayout from "./pages/Admin/AdminLayout";
// // import AdminDashboard from "./pages/Admin/AdminDashboard";

// // import StudentList from "./pages/Admin/StudentList";
// // import AddStudent from "./pages/Admin/AddStudent";
// // import StudentFees from "./pages/Admin/StudentFees";

// // import TeacherList from "./pages/Admin/TeacherList";
// // import AddTeacher from "./pages/Admin/AddTeacher";
// // import TeacherSchedule from "./pages/Admin/TeacherSchedule";

// // import ClassTimetable from "./pages/Admin/ClassTimetable";
// // import ExamManagement from "./pages/Admin/ExamManagement";
// // import ScheduleTimetable from "./pages/Admin/ScheduleTimetable";

// // /* ================= MAIN APP ================= */

// // const App = () => {
// //   return (
// //     <Router>
// //       <Routes>

// //         {/* ================= ADMIN ROUTES ================= */}
// //         <Route path="/admin" element={<AdminLayout />}>
// //           <Route index element={<AdminDashboard />} />

// //           {/* Student Module */}
// //           <Route path="students" element={<StudentList />} />
// //           <Route path="add-student" element={<AddStudent />} />
// //           <Route path="fees" element={<StudentFees />} />

// //           {/* Teacher Module */}
// //           <Route path="teachers" element={<TeacherList />} />
// //           <Route path="add-teacher" element={<AddTeacher />} />
// //           <Route path="teacher-schedule" element={<TeacherSchedule />} />

// //           {/* Academic Module */}
// //           <Route path="timetable" element={<ClassTimetable />} />
// //           <Route path="exams" element={<ExamManagement />} />
// //           <Route path="schedule" element={<ScheduleTimetable />} />
// //         </Route>

// //         {/* Default Redirect */}
// //         <Route path="*" element={<Navigate to="/admin" />} />

// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;


// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// /* Login */
// import AdminLogin from "./pages/Admin/AdminLogin";

// /* Admin */
// import AdminLayout from "./pages/Admin/AdminLayout";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import StudentList from "./pages/Admin/StudentList";
// import AddStudent from "./pages/Admin/AddStudent";
// import StudentFees from "./pages/Admin/StudentFees";
// import TeacherList from "./pages/Admin/TeacherList";
// import AddTeacher from "./pages/Admin/AddTeacher";
// import TeacherSchedule from "./pages/Admin/TeacherSchedule";
// import ClassTimetable from "./pages/Admin/ClassTimetable";
// import ExamManagement from "./pages/Admin/ExamManagement";
// import ScheduleTimetable from "./pages/Admin/ScheduleTimetable";

// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   return (
//     <Routes>

//       <Route path="/" element={<AdminLogin />} />

//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<AdminDashboard />} />
//         <Route path="students" element={<StudentList />} />
//         <Route path="add-student" element={<AddStudent />} />
//         <Route path="fees" element={<StudentFees />} />
//         <Route path="teachers" element={<TeacherList />} />
//         <Route path="add-teacher" element={<AddTeacher />} />
//         <Route path="teacher-schedule" element={<TeacherSchedule />} />
//         <Route path="timetable" element={<ClassTimetable />} />
//         <Route path="exams" element={<ExamManagement />} />
//         <Route path="schedule" element={<ScheduleTimetable />} />
//       </Route>

//       <Route path="*" element={<Navigate to="/" />} />

//     </Routes>
//   );
// };

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
import AdminGallery from "./pages/Admin/AdminGallery";

const App = () => {
  return (
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
  );
};

export default App;
