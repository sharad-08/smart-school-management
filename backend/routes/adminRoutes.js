 import express from "express";
import { 
  loginAdmin, 
  addStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent
} from "../controllers/adminController.js";

import { 
  addteacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
 
} from "../controllers/teacherController.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";
import multer from "multer";

const adminRouter = express.Router();
const upload = multer({ dest: "uploads/" });

// ----------- Admin Login -----------
adminRouter.post("/login", loginAdmin);


// ----------- Student Routes ----------
adminRouter.post("/add-student", upload.single("Profile"), addStudent);
adminRouter.get("/studentsdata", getAllStudents);
adminRouter.get("/student/:id", getSingleStudent);
adminRouter.put("/update-student/:id", updateStudent);


// ----------- Teacher Routes ----------
adminRouter.post("/add-teacher", upload.single("photo"), addteacher);
adminRouter.get("/teachersdata", getAllTeachers);
adminRouter.get("/teacher/:id", getSingleTeacher);
adminRouter.put("/update-teacher/:id", upload.single("photo"), updateTeacher);
 


export default adminRouter;