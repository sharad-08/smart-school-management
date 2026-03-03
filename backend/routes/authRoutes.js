import express from "express";
import { loginUser,getTeacherProfile } from "../controllers/authController.js";
import teacherMiddleware from "../middlewares/teacherMiddleware.js";
const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", teacherMiddleware, getTeacherProfile);
export default router;