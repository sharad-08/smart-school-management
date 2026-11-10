import express from "express";
import { loginUser, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import requireRole from "../middlewares/roleMiddleware.js";

const router = express.Router();
router.post("/login", loginUser);
router.get("/profile", authMiddleware, requireRole("teacher", "student"), getProfile);

export default router;
