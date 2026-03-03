import express from "express";
import {
  generateTimetable,
  getTimetable,
  saveTimetable,
} from "../controllers/classTimetableController.js";

const router = express.Router();

// Generate timetable automatically (frontend calls this on class select)
router.post("/generate", generateTimetable);

// Get timetable for class
router.get("/:className", getTimetable);

// Save / update timetable
router.post("/save", saveTimetable);

export default router;