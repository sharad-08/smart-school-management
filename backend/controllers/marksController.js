// import Marks from "../models/Marks.js";
// import studentModel from "../models/studentModel.js";
// import Teacher from "../models/teacherModel.js";


// // ✅ Get Students according to teacher class
// export const getStudentsForTeacher = async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.user.id);

//     const students = await studentModel.find({
//       className: teacher.className,
//       section: teacher.section,
//     });

//     res.json({ success: true, students });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // ✅ Save or Update Marks
// export const saveMarks = async (req, res) => {
//   try {
//     const { examType, outOf, marksArray } = req.body;

//     const teacher = await Teacher.findById(req.user.id);

//     for (let item of marksArray) {
//       await Marks.findOneAndUpdate(
//         {
//           student: item.studentId,
//           examType,
//           subject: teacher.subject,
//         },
//         {
//           className: teacher.className,
//           section: teacher.section,
//           subject: teacher.subject,
//           marksObtained: item.marks,
//           outOf,
//         },
//         { upsert: true, new: true }
//       );
//     }

//     res.json({ success: true, message: "Marks Saved Successfully" });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // ✅ Get Marks for Exam
// export const getMarksByExam = async (req, res) => {
//   try {
//     const { examType } = req.params;

//     const teacher = await Teacher.findById(req.user.id);

//     const marks = await Marks.find({
//       className: teacher.className,
//       section: teacher.section,
//       subject: teacher.subject,
//       examType,
//     });

//     res.json({ success: true, marks });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import Marks from "../models/Marks.js";
import studentModel from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";

// ✅ Get Students
export const getStudentsForTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    const students = await studentModel.find({
      Class: teacher.className,
      Section: teacher.section,
    });

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

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    for (let item of marksArray) {
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
        { upsert: true, new: true }
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

    if (!teacher)
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