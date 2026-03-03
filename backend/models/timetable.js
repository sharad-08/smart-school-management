 
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    class: { type: String, default: "" },
    subject: { type: String, default: "" },
  },
  { _id: false }
);
 const timetableSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      unique: true,
    },

    teacherId: String,      // TCH20261382
    employeeCode: String,   // 0001
    fullName: String,       // sharad

    schedule: {
      type: Map,
      of: {
        type: Map,
        of: lectureSchema,
      },
    },
  },
  { timestamps: true }
);
export default mongoose.model("Timetable", timetableSchema);
