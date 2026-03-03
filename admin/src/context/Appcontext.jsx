

const API = "http://localhost:4000/api/admin";
import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Appcontext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [students, setstudents] = useState([]);
  const [numberofstudent,setnumberofstudent]=useState(0);
  const [numberofteacher,setnumberofteacher]=useState(0);





  // ================= GET ALL STUDENTS =================
  const getstudent = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/admin/studentsdata",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      

     
      if (data.success) {
        setstudents(data.students);
          setnumberofstudent(data.students.length)
          console.log(numberofstudent)
         
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };



  // Get singal student
  const getSingleStudent = async (id) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/admin/student/${id}`
  );
  return data.student;
};



  //updata student 

  const updateStudent = async (id, updatedData) => {
  const { data } = await axios.put(
    `http://localhost:4000/api/admin/update-student/${id}`,
    updatedData
  );

  if (data.success) {
    getstudent(); // refresh list
  }
};


 

// -------- ADD TEACHER --------
const addTeacher = async (formData) => {
  try {
    const { data } = await axios.post(
      `${API}/add-teacher`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      toast.success("Teacher Added Successfully");
      return true;
    } else {
      toast.error(data.message);
      return false;
    }

  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return false;
  }
};

//---------get all teachers data------
const [teachers, setTeachers] = useState([]);

const getTeachers = async () => {
  try {
    const { data } = await axios.get(
      `${API}/teachersdata`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // if (data.success) {
    //   setTeachers(data.teachers);
    // } 
    
     if (data.success) {
        setTeachers(data.teachers);
          setnumberofteacher(data.teachers.length)
          console.log(numberofteacher)
         
      }else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};



// --------get singal teacher data---------
const getSingleTeacher = async (id) => {
  try {
    const { data } = await axios.get(`${API}/teacher/${id}`);
    return data.teacher;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};



//---update teacher---------
const updateTeacher = async (id, formData) => {
  try {
    const { data } = await axios.put(
      `${API}/update-teacher/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      toast.success("Teacher Updated Successfully");
      getTeachers();
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};



const value = {
  token,
  setToken,
  students,
  numberofstudent,
  getstudent,
  getSingleStudent,
  updateStudent,

  // teachers
  teachers,
  numberofteacher,
  addTeacher,
  getTeachers,
  getSingleTeacher,
  updateTeacher,

};



  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
};
