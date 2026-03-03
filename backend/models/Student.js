
// backend/models/Student.js
import mongoose from "mongoose";

const studentbyclassSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  rollNo: { type: Number, required: true },
  className: { type: String, required: true },
  section: { type: String, required: true },
  dob: { type: Date },
  contact: { type: String },
  email: { type: String },
  // Add more fields if needed
}, { timestamps: true });

// ✅ Check if model already exists
const Studentbyclass = mongoose.models.Studentbyclass || mongoose.model("Studentbyclass", studentbyclassSchema);

export default Studentbyclass;