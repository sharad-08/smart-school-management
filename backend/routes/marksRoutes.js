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

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/students", authMiddleware, getStudentsForTeacher);
router.post("/save", authMiddleware, saveMarks);
router.get("/exam/:examType", authMiddleware, getMarksByExam);

export default router;