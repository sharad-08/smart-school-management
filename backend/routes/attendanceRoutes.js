import express from "express";
import {
  saveAttendance,
  getDailyAttendance,
  getMonthlyReport,
  getAttendancePercentage
} from "../controllers/attendanceController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import requireRole from "../middlewares/roleMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/save", requireRole("teacher"), saveAttendance);
router.get("/daily", requireRole("teacher"), getDailyAttendance);
router.get("/monthly", requireRole("student", "teacher"), getMonthlyReport);
router.get("/percentage/:studentId", requireRole("student", "teacher"), getAttendancePercentage);

export default router;