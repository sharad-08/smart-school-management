import Timetable from "../models/timetable.js";
import Teacher from "../models/teacherModel.js";
import ClassTimetable from "../models/classModel.js";
/* ================= SAVE / UPDATE TIMETABLE ================= */
 

export const saveTimetable = async (req, res) => {
  try {
    const { teacherId, scheduleData } = req.body;

    // 1️⃣ Find teacher by Mongo _id
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // 2️⃣ Save timetable with correct fields
    const timetable = await Timetable.findOneAndUpdate(
      { teacher: teacher._id },
      {
        teacher: teacher._id,              // Mongo ObjectId
        teacherId: teacher.teacherId,      // TCH20261382
        employeeCode: teacher.employeeCode,// 0001
        fullName: teacher.fullName,        // sharad
        schedule: scheduleData,
      },
      { upsert: true, returnDocument: "after" }
    );

    res.status(200).json({
      message: "Timetable saved successfully ✅",
      timetable,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//----------searcch tachear -------------
/* ================= GET TIMETABLE BY TEACHER ================= */
 
export const getTimetableByTeacher = async (req, res) => {
  try {
    const { search } = req.params;
      console.log("Search value:", search);
    // 1️⃣ Find teacher by employeeCode OR name
   const teacher = await Teacher.findOne({
  $or: [
    { employeeCode: search },
    { teacherId: search },
    { fullName: { $regex: search, $options: "i" } }
  ]
});
 console.log("Teacher found:", teacher);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // 2️⃣ Find timetable using teacher _id
    const timetable = await Timetable.findOne({
      teacher: teacher._id
    }).populate("teacher");

    console.log("Timetable found:", timetable);
    if (!timetable) {
      return res.status(404).json({ message: "No timetable found" });
    }

    res.status(200).json(timetable);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= DELETE TIMETABLE ================= */
export const deleteTimetable = async (req, res) => {
  try {
    const { teacherId } = req.params;

    await Timetable.findOneAndDelete({ teacher: teacherId });

    res.json({ message: "Timetable deleted successfully 🗑️" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// /* ================= GENERATE CLASS TIMETABLE ================= */
// export const generateClassTimetable = async (req, res) => {
//   try {
//     const { className } = req.body;

//     if (!className) return res.status(400).json({ message: "Class is required" });

//     // 1️⃣ Get all teacher timetables
//     const allTimetables = await Timetable.find();

//     // 2️⃣ Prepare empty class schedule
//     const schedule = {};
//     const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const slots = ["1st", "2nd", "3rd", "4th", "5th"];

//     days.forEach((day) => {
//       schedule[day] = {};
//       slots.forEach((slot) => {
//         // 3️⃣ Find teacher who teaches this class & slot
//         const lectureEntry = allTimetables.find(
//           (tt) => tt.schedule?.[day]?.[slot]?.class === className
//         );

//         if (lectureEntry) {
//           schedule[day][slot] = {
//             teacher: lectureEntry.fullName || lectureEntry.teacherId,
//             subject: lectureEntry.schedule[day][slot]?.subject || "",
//           };
//         } else {
//           schedule[day][slot] = { teacher: "", subject: "" };
//         }
//       });
//     });

//     // 4️⃣ Upsert class timetable
//     const classTT = await ClassTimetable.findOneAndUpdate(
//       { className },
//       { className, schedule },
//       { upsert: true, returnDocument: "after" }
//     );

//     res.status(200).json({ message: "Class timetable generated ✅", classTimetable: classTT });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// /* ================= GET CLASS TIMETABLE ================= */
// export const getClassTimetable = async (req, res) => {
//   try {
//     const { className } = req.params;
//     const classTT = await ClassTimetable.findOne({ className });

//     if (!classTT) return res.status(404).json({ message: "Class timetable not found" });

//     res.status(200).json(classTT);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };