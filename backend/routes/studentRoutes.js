import adminMiddleware from "../middlewares/adminMiddleware.js";
// backend/routes/studentRoutes.js
import express from "express";
import { getStudentsByClass } from "../controllers/studentController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import requireRole from "../middlewares/roleMiddleware.js";
import { getStudentPortal } from "../controllers/studentPortalController.js";

const router = express.Router();
router.get("/portal", authMiddleware, requireRole("student"), getStudentPortal);

// GET /api/student/class/:className/:section
router.get("/class/:className/:section", adminMiddleware, getStudentsByClass);

export default router;