import Teacher from "../models/teacherModel.js";

export default async function teacherWriteAccess(req, res, next) {
  if (req.user?.role !== "teacher" || ["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const teacher = await Teacher.findById(req.user.id).select("status");
  if (!teacher) return res.status(401).json({ message: "Teacher account not found" });
  if (teacher.status?.trim().toLowerCase() === "inactive") {
    return res.status(403).json({ code: "TEACHER_READ_ONLY", message: "Your account is inactive. You can view records, but cannot make changes. Contact the school administrator." });
  }
  next();
}
