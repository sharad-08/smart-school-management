// import express from "express";
// import {
//   getStudentsForTeacher,
//   saveMarks,
//   getMarksByExam,
// } from "../controllers/marksController.js";



// const router = express.Router();

// router.post("/save",  saveMarks);
// router.get("/exam/:examType",getMarksByExam);

// export default router;


import express from "express";
import {
  getStudentsForTeacher,
  saveMarks,
  getMarksByExam,
} from "../controllers/marksController.js";

import teacherMiddleware from "../middlewares/teacherMiddleware.js";

const router = express.Router();

router.get("/students", teacherMiddleware, getStudentsForTeacher);
router.post("/save", teacherMiddleware, saveMarks);
router.get("/exam/:examType", teacherMiddleware, getMarksByExam);

export default router;