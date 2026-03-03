import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  AdmissionId:{
    type: String,
  },
  className: {
    type: String,
    required: true
  },

  section: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true
  }

}, { timestamps: true });


// 🔥 Prevent duplicate attendance for same student same date
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);