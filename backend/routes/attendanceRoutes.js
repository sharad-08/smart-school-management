import express from "express";
import {
  saveAttendance,
  getDailyAttendance,
  getMonthlyReport,
  getAttendancePercentage
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/save", saveAttendance);
router.get("/daily", getDailyAttendance);
router.get("/monthly", getMonthlyReport);
router.get("/percentage/:studentId", getAttendancePercentage);

export default router;