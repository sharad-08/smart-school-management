import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";

export const loginUser = async (req, res) => {
  const { id, password, role } = req.body ?? {};

  if (typeof id !== "string" || !id.trim() ||
      typeof password !== "string" || password.length < 12 ||
      Buffer.byteLength(password) > 72 || !["student", "teacher"].includes(role)) {
    return res.status(400).json({ success: false, message: "Provide a valid ID, password and role" });
  }

  const user = role === "student"
    ? await Student.findOne({ AdmissionID: id.trim() }).select("+Password")
    : await Teacher.findOne({ teacherId: id.trim() }).select("+password");
  const hash = role === "student" ? user?.Password : user?.password;

  if (!hash || !(await bcrypt.compare(password, hash))) {
    return res.status(401).json({ success: false, message: "Invalid ID or password" });
  }

  const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ success: true, token, role });
};

export const getProfile = async (req, res) => {
  const { id, role } = req.user;
  const profile = role === "teacher" ? await Teacher.findById(id) : await Student.findById(id);
  if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
  res.json({ success: true, [role]: profile });
};
