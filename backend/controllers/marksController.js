import Marks from "../models/Marks.js";
import studentModel from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";

// ✅ Get Students
export const getStudentsForTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id);

    if (!teacher?.className || !teacher.section)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    const students = await studentModel.find({
      Class: teacher.className,
      Section: teacher.section,
    }).select("Name RollNumber Profile FatherName FatherContact Class Section");

    res.json({ success: true, students });

  } catch (error) {
    console.log("Get students error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Save Marks
export const saveMarks = async (req, res) => {
  try {
    const { examType, outOf, marksArray } = req.body;

    const teacher = await Teacher.findById(req.user.id);

    if (!teacher?.className || !teacher.section)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    if (typeof examType !== "string" || !examType || !Number.isFinite(outOf) || outOf <= 0 ||
        !Array.isArray(marksArray) || !marksArray.length || marksArray.some((item) =>
          !item || typeof item.studentId !== "string" || !/^[a-f0-9]{24}$/.test(item.studentId) ||
          !Number.isFinite(item.marks) || item.marks < 0 || item.marks > outOf)) {
      return res.status(400).json({ success: false, message: "Invalid exam marks" });
    }

    const studentIds = [...new Set(marksArray.map((item) => item.studentId))];
    const count = await studentModel.countDocuments({
      _id: { $in: studentIds },
      Class: teacher.className,
      Section: teacher.section,
    });
    if (count !== studentIds.length) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    for (const item of marksArray) {
      await Marks.findOneAndUpdate(
        {
          student: item.studentId,
          examType,
          subject: teacher.subject,
        },
        {
          student: item.studentId,
          className: teacher.className,
          section: teacher.section,
          subject: teacher.subject,
          examType,
          marksObtained: item.marks,
          outOf,
        },
        { upsert: true, returnDocument: "after" }
      );
    }

    res.json({ success: true, message: "Marks Saved Successfully" });

  } catch (error) {
    console.log("Save marks error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get Marks
export const getMarksByExam = async (req, res) => {
  try {
    const { examType } = req.params;

    const teacher = await Teacher.findById(req.user.id);

    if (!teacher?.className || !teacher.section)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    const marks = await Marks.find({
      className: teacher.className,
      section: teacher.section,
      subject: teacher.subject,
      examType,
    });

    res.json({ success: true, marks });

  } catch (error) {
    console.log("Get marks error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};