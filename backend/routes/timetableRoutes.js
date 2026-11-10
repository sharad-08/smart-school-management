import authMiddleware from "../middlewares/authMiddleware.js";
import requireRole from "../middlewares/roleMiddleware.js";
import express from "express";
import {
  saveTimetable,
  getTimetableByTeacher,
  deleteTimetable,
  
} from "../controllers/timetableController.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", requireRole("admin"), saveTimetable);
router.get("/:search", requireRole("admin", "teacher"), getTimetableByTeacher);
router.delete("/:teacherId", requireRole("admin"), deleteTimetable);

export default router;