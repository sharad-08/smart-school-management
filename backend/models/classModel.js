// import mongoose from "mongoose";

// const lectureSchema = new mongoose.Schema(
//   {
//     teacher: { type: String, default: "" }, // teacher name
//     subject: { type: String, default: "" }, // subject name
//   },
//   { _id: false }
// );

// const classTimetableSchema = new mongoose.Schema(
//   {
//     className: { type: String, required: true },
//     schedule: {
//       type: Map, // day => lecture slots
//       of: {
//         type: Map, // lecture number => lectureSchema
//         of: lectureSchema,
//       },
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("ClassTimetable", classTimetableSchema);

import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  subject: { type: String, default: "" },
  teacher: { type: String, default: "" },
});

const daySchema = new mongoose.Schema({
  Monday: { type: Map, of: lectureSchema, default: {} },
  Tuesday: { type: Map, of: lectureSchema, default: {} },
  Wednesday: { type: Map, of: lectureSchema, default: {} },
  Thursday: { type: Map, of: lectureSchema, default: {} },
  Friday: { type: Map, of: lectureSchema, default: {} },
  Saturday: { type: Map, of: lectureSchema, default: {} },
});

const classTimetableSchema = new mongoose.Schema(
  {
    className: { type: String, required: true, unique: true },
    schedule: { type: daySchema, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("ClassTimetable", classTimetableSchema);