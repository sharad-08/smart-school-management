import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  className: String,
  section: String,
  subject: String,
  examType: String,
  marksObtained: Number,
  outOf: Number,
}, { timestamps: true });

export default mongoose.model("Marks", marksSchema);