 
import express from "express";
import cors from "cors";
import "dotenv/config"
import adminRouter from "./routes/adminRoutes.js";
import timetableRoute from "./routes/timetableRoutes.js";
import connectDB from "./config/db.js";
import classtimetableRouter from "./routes/classTimetableRoutes.js"
import uploadphotos from "./routes/uploadphotoRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import attendance from "./routes/attendanceRoutes.js"
import studentRoutes from "./routes/studentRoutes.js";
import MarksRoutes from "./routes/marksRoutes.js"
import messageRoutes from "./routes/messageRoutes.js";

import connectCloudinary from "./config/cloud.js"
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
connectCloudinary()

app.use("/api/admin", adminRouter);
app.use("/api/teacher-timetable",timetableRoute);
app.use("/api/classtimetable",classtimetableRouter);
app.use("/api/events",uploadphotos);
app.use("/api/auth", authRoutes);
app.use("/api/attendance",attendance);
app.use("/api/student", studentRoutes);
app.use("/api/marks",MarksRoutes);
app.use("/api/messages", messageRoutes);
// Start server
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
