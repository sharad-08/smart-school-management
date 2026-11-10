import express from "express";
import { sendMessage, getMessagesForStudent } from "../controllers/messageController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import requireRole from "../middlewares/roleMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/send", requireRole("teacher"), sendMessage);
router.get("/student", requireRole("student"), getMessagesForStudent);

export default router;