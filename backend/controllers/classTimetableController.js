import ClassTimetable from "../models/classModel.js";

/* ================= GENERATE TIMETABLE ================= */
export const generateTimetable = async (req, res) => {
  try {
    const { className } = req.body;

    if (!className) return res.status(400).json({ message: "Class name required" });

    const schedule = Object.fromEntries(
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => [
        day,
        Object.fromEntries(["1st", "2nd", "3rd", "4th", "5th"].map((slot) => [
          slot, { subject: "", teacher: "" },
        ])),
      ])
    );

    const timetable = await ClassTimetable.findOneAndUpdate(
      { className },
      { $setOnInsert: { className, schedule } },
      { upsert: true, returnDocument: "after" }
    );

    res.status(200).json({ message: "Timetable generated", timetable });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

/* ================= GET TIMETABLE ================= */
export const getTimetable = async (req, res) => {
  try {
    const { className } = req.params;

    const timetable = await ClassTimetable.findOne({ className });

    if (!timetable) return res.status(404).json({ message: "No timetable found" });

    res.status(200).json({ schedule: timetable.schedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= SAVE/UPDATE TIMETABLE ================= */
export const saveTimetable = async (req, res) => {
  try {
    const { className, schedule } = req.body;

    const timetable = await ClassTimetable.findOneAndUpdate(
      { className },
      { schedule },
      { upsert: true, returnDocument: "after" }
    );

    res.status(200).json({ message: "Timetable saved", timetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};