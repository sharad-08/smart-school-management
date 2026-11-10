import adminMiddleware from "../middlewares/adminMiddleware.js";
import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadEventPhotos } from "../controllers/uploadphotos.js";

const router = express.Router();

router.post("/upload", adminMiddleware, upload.array("photos", 10), uploadEventPhotos);

export default router;