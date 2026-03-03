 import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    teacherId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
     
      default: "Active",
    },

    // Teacher Basic
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    photo: {
      type: String, // store image URL or path
      default: null,
    },

    gender: {
      type: String,
    
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Professional Info
    employeeCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number, // in years
      required: true,
       
    },

    // Address
    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    classTeacher: {
  type: Boolean,
  default: false
},

className: {
  type: String
},

section: {
  type: String
}
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.model("Teacher", teacherSchema);