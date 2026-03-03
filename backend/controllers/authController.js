import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { id, password, role } = req.body;

    if (!id || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide ID, password and role",
      });
    }

    let user;

    // ✅ Student Login
    if (role === "student") {
      user = await Student.findOne({
        AdmissionID: id,
        AdmissionDate: password,
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid Student ID or Admission Date",
        });
      }
    }

    // ✅ Teacher Login
 // ✅ TEACHER LOGIN
if (role === "teacher") {

  const user = await Teacher.findOne({ teacherId: id });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Teacher not found",
    });
  }

  // Convert DB date to YYYY-MM-DD
  const dbDob = new Date(user.dob).toISOString().split("T")[0];
  console.log("Entered DOB:", password);
console.log("DB DOB:", dbDob);
  if (dbDob !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid Teacher ID or DOB",
    });
  }

  // Generate token
  const token = jwt.sign(
    { id: user._id, role :"teacher"},
    process.env.JWT_SECRET ,
    { expiresIn: "1d" }
  );

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    role,
  });
}

    // ✅ Generate Token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET ,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getTeacherProfile = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.user.id).select("-password");

    res.json({
      success: true,
      teacher,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};