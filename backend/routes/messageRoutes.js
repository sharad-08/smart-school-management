import express from "express";
import { sendMessage, getMessagesForStudent } from "../controllers/messageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendMessage);
router.get("/student", getMessagesForStudent);

export default router;