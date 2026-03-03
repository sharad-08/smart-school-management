import Attendance from "../models/attendanceModel.js";

export const saveAttendance = async (req, res) => {
  try {
    const { attendanceData, className, section, date,AdmissionId } = req.body;

    const records = [];

    for (const studentId in attendanceData) {
      records.push({
        studentId,
        className,
        section,
        date: new Date(date),
        status: attendanceData[studentId],
       AdmissionId,
      });
    }

    await Attendance.insertMany(records, { ordered: false });

    res.status(200).json({ message: "Attendance Saved Successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Some records may already exist for this date",
      error: error.message
    });
  }
};



// export const getDailyAttendance = async (req, res) => {
//   try {
//     const { className, section, date } = req.query;

//     const attendance = await Attendance.find({
//       className,
//       section,
//       date: new Date(date),
//      AdmissionId,
//     }).populate("studentId", "fullName rollNumber");

//     res.status(200).json(attendance);

//   } catch (error) {
//     res.status(500).json({ message: "Error fetching attendance" });
//   }
// };

export const getDailyAttendance = async (req, res) => {
  try {
    const { className, section, date } = req.query;

    if (!className || !section || !date) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 🔥 Important: Date range filter
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const attendance = await Attendance.find({
      className,
      section,
      date: { $gte: start, $lte: end },
    }).populate("studentId");

    res.status(200).json(attendance);

  } catch (error) {
    console.log("Daily Attendance Error:", error);  // 👈 VERY IMPORTANT
    res.status(500).json({ message: error.message });
  }
};



export const getMonthlyReport = async (req, res) => {
  try {
    const { studentId, month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const records = await Attendance.find({
      studentId,
      date: { $gte: startDate, $lte: endDate }
    });

    const present = records.filter(r => r.status === "Present").length;
    const absent = records.filter(r => r.status === "Absent").length;

    res.status(200).json({
      totalDays: records.length,
      present,
      absent
    });

  } catch (error) {
    res.status(500).json({ message: "Error generating monthly report" });
  }
};



export const getAttendancePercentage = async (req, res) => {
  try {
    const { studentId } = req.params;

    const records = await Attendance.find({ studentId });

    const totalDays = records.length;
    const presentDays = records.filter(r => r.status === "Present").length;

    const percentage =
      totalDays === 0 ? 0 : ((presentDays / totalDays) * 100).toFixed(2);

    res.status(200).json({
      totalDays,
      presentDays,
      percentage: `${percentage}%`
    });

  } catch (error) {
    res.status(500).json({ message: "Error calculating percentage" });
  }
};