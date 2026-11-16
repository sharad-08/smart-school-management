import Student from "../models/studentModel.js";
import Attendance from "../models/attendanceModel.js";
import Marks from "../models/Marks.js";
import Teacher from "../models/teacherModel.js";
import ClassTimetable from "../models/classModel.js";
import Message from "../models/messageModel.js";

export async function getStudentPortal(req, res) {
  const student = await Student.findById(req.user.id).lean();
  if (!student) return res.status(404).json({ message: "Student record not found" });

  const classFilter = { className: student.Class, section: student.Section };
  const [attendance, marks, teachers, timetable, messages] = await Promise.all([
    Attendance.find({ studentId: student._id }).select("date status").sort({ date: -1 }).lean(),
    Marks.find({ student: student._id }).select("subject examType marksObtained outOf updatedAt").sort({ updatedAt: -1 }).lean(),
    Teacher.find(classFilter).select("fullName subject photo email qualification classTeacher").lean(),
    ClassTimetable.findOne({ className: student.Class }).select("schedule").lean(),
    Message.find(classFilter).select("message createdAt teacherId").populate("teacherId", "fullName").sort({ createdAt: -1 }).limit(20).lean(),
  ]);

  res.set("Cache-Control", "private, no-store");
  res.json({ student, attendance, marks, teachers, timetable: timetable?.schedule ?? {}, messages });
}
