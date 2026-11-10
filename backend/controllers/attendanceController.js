import Attendance from "../models/attendanceModel.js";
import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";

const isDay = (date) =>
  typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) &&
  !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;

async function canManageClass(user, className, section) {
  if (typeof className !== "string" || !className || typeof section !== "string" || !section) {
    return false;
  }
  return Boolean(await Teacher.exists({
    _id: user.id,
    classTeacher: true,
    className,
    section,
  }));
}

async function canReadStudent(user, studentId) {
  if (typeof studentId !== "string" || !/^[a-f0-9]{24}$/i.test(studentId)) return false;
  if (user.role === "student") return user.id === studentId;

  const teacher = await Teacher.findById(user.id).select("className section");
  if (!teacher?.className || !teacher.section) return false;
  return Boolean(await Student.exists({
    _id: studentId,
    Class: teacher.className,
    Section: teacher.section,
  }));
}

export const saveAttendance = async (req, res) => {
  const { attendanceData, className, section, date } = req.body ?? {};
  if (!isDay(date) || !attendanceData || typeof attendanceData !== "object" || Array.isArray(attendanceData)) {
    return res.status(400).json({ message: "Invalid attendance data or date" });
  }
  const entries = Object.entries(attendanceData);
  if (!entries.length || entries.some(([id, status]) =>
    !/^[a-f0-9]{24}$/.test(id) || !["Present", "Absent"].includes(status))) {
    return res.status(400).json({ message: "Provide valid student IDs and attendance values" });
  }

  if (!(await canManageClass(req.user, className, section))) {
    return res.status(403).json({ message: "Access denied" });
  }
  const studentIds = entries.map(([id]) => id);
  const count = await Student.countDocuments({ _id: { $in: studentIds }, Class: className, Section: section });
  if (count !== entries.length) return res.status(403).json({ message: "Access denied" });

  await Attendance.bulkWrite(entries.map(([studentId, status]) => ({
    updateOne: {
      filter: { studentId, date: new Date(date) },
      update: { $set: { className, section, status } },
      upsert: true,
    },
  })));
  res.json({ message: "Attendance saved successfully" });
};

export const getDailyAttendance = async (req, res) => {
  const { className, section, date } = req.query;
  if (!isDay(date)) return res.status(400).json({ message: "Invalid date" });
  if (!(await canManageClass(req.user, className, section))) {
    return res.status(403).json({ message: "Access denied" });
  }

  const start = new Date(date);
  const end = new Date(start.getTime() + 86400000);
  const attendance = await Attendance.find({
    className,
    section,
    date: { $gte: start, $lt: end },
  }).populate("studentId", "Name RollNumber");
  res.json(attendance);
};

export const getMonthlyReport = async (req, res) => {
  const { studentId } = req.query;
  const month = Number(req.query.month);
  const year = Number(req.query.year);
  if (!Number.isInteger(month) || month < 1 || month > 12 ||
      !Number.isInteger(year) || year < 1900 || year > 9999) {
    return res.status(400).json({ message: "Invalid month or year" });
  }
  if (!(await canReadStudent(req.user, studentId))) {
    return res.status(403).json({ message: "Access denied" });
  }

  const records = await Attendance.find({
    studentId,
    date: { $gte: new Date(Date.UTC(year, month - 1, 1)), $lt: new Date(Date.UTC(year, month, 1)) },
  }).select("status");
  const present = records.filter((record) => record.status === "Present").length;
  res.json({ totalDays: records.length, present, absent: records.length - present });
};

export const getAttendancePercentage = async (req, res) => {
  const { studentId } = req.params;
  if (!(await canReadStudent(req.user, studentId))) {
    return res.status(403).json({ message: "Access denied" });
  }

  const records = await Attendance.find({ studentId }).select("status");
  const totalDays = records.length;
  const presentDays = records.filter((record) => record.status === "Present").length;
  const percentage = totalDays ? ((presentDays / totalDays) * 100).toFixed(2) : 0;
  res.json({ totalDays, presentDays, percentage: `${percentage}%` });
};
