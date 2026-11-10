import "dotenv/config";
import express from "express";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import timetableRoute from "./routes/timetableRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import connectDB from "./config/db.js";
import classtimetableRouter from "./routes/classTimetableRoutes.js";
import uploadphotos from "./routes/uploadphotoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import attendance from "./routes/attendanceRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import marksRoutes from "./routes/marksRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connectCloudinary from "./config/cloud.js";

const app = express();
const origins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",").map((origin) => origin.trim());

app.use(cors({ origin: origins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectCloudinary();

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api", (req, res, next) => {
  if (req.method === "POST" && ["/admin/login", "/auth/login"].includes(req.path)) return next();
  authMiddleware(req, res, next);
});

app.use("/api", async (req, res, next) => {
  if (req.method === "POST" && req.path === "/admin/login") return next();

  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection unavailable:", error.name);
    return res.status(503).json({ message: "Database unavailable" });
  }

  next();
});

app.use("/api/admin", adminRouter);
app.use("/api/teacher-timetable", timetableRoute);
app.use("/api/classtimetable", classtimetableRouter);
app.use("/api/events", uploadphotos);
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendance);
app.use("/api/student", studentRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/messages", messageRoutes);

app.use((error, _req, res, _next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "Image exceeds the 4 MB file limit" });
  }
  if (error.name === "MulterError" || error.status === 400) {
    return res.status(400).json({ message: "Invalid request or image upload" });
  }
  console.error("API error:", error.name);
  res.status(500).json({ message: "Server error" });
});

if (!process.env.VERCEL) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
