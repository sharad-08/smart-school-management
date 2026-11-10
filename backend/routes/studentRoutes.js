import adminMiddleware from "../middlewares/adminMiddleware.js";
// backend/routes/studentRoutes.js
import express from "express";
import { getStudentsByClass } from "../controllers/studentController.js";

const router = express.Router();

// GET /api/student/class/:className/:section
router.get("/class/:className/:section", adminMiddleware, getStudentsByClass);

export default router;