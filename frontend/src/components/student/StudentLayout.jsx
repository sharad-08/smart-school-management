import Studentnavbar from "./Studentnavbar";
import Studentsidebar from "./Studentsidebar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  return (
    <>
      <Studentnavbar />
      <Studentsidebar />

      <div className="md:ml-64 mt-20 md:mt-16 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default StudentLayout;
