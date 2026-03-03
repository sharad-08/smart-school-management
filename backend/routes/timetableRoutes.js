import express from "express";
import {
  saveTimetable,
  getTimetableByTeacher,
  deleteTimetable,
  
} from "../controllers/timetableController.js";

const router = express.Router();

router.post("/", saveTimetable);
router.get("/:search", getTimetableByTeacher);
router.delete("/:teacherId", deleteTimetable);

export default router;