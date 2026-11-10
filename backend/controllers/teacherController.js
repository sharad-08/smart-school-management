
import bcrypt from "bcrypt";
import { uploadImage } from "../config/cloud.js";
import teacherModel from "../models/teacherModel.js";
import validator from "validator";


/* ==============================
   ADD TEACHER
================================ */

const generateTeacherId = async (department, subject) => {
  const year = new Date().getFullYear();

  const count = await teacherModel.countDocuments({
    department,
    subject,
  });

  const nextNumber = count + 1;
  const paddedNumber = String(nextNumber).padStart(3, "0");

  const deptCode = department.substring(0, 3).toUpperCase();
  const subCode = subject.substring(0, 2).toUpperCase();

  return `${deptCode}${subCode}${year}${paddedNumber}`;
};

 

export const addteacher = async (req, res) => {
  try {
    const photo = req.file;

    if (!photo) {
      return res.json({ success: false, message: "Photo is required" });
    }

    const {
      
      fullName,
      gender,
      dob,
      contact,
      email,
      employeeCode,
      department,
      subject,
      qualification,
      experience,
      address,
      city,
      state,
      pincode,
      password,
      status,
      classTeacher,
className,
section,
    } = req.body;
  
    // Required fields check
    if (
        !fullName || !gender || !dob || !contact ||
      !email || !employeeCode || !department || !subject ||
      !qualification || !experience || !address || !city ||
      !state || !pincode  
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    // Check existing teacher
    const existingTeacher = await teacherModel.findOne({
      $or: [{ email }, { employeeCode },  ],
    });
// 🔥 Generate Teacher ID
const teacherId = await generateTeacherId(department, subject);
    if (existingTeacher) {
      return res.json({ success: false, message: "Teacher already exists" });
    }

    if (typeof password !== "string" || password.length < 12 || Buffer.byteLength(password) > 72) {
      return res.status(400).json({ success: false, message: "Provide a password with at least 12 characters and at most 72 bytes" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload photo to Cloudinary
    const imageUpload = await uploadImage(photo.buffer);

    const photoUrl = imageUpload.secure_url;

    // Save teacher
    const newTeacher = new teacherModel({
      teacherId,
      fullName,
      gender,
      dob,
      contact,
      email,
      employeeCode,
      department,
      subject,
      qualification,
      experience,
      address,
      city,
      state,
      pincode,
      password: hashedPassword,
      status,
      photo: photoUrl,
      classTeacher,
className,
section,
    });

    await newTeacher.save();

    res.json({
      success: true,
      message: "Teacher Added Successfully",
      teacher: { ...newTeacher.toObject(), password: undefined },
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


/* ==============================
   GET ALL TEACHERS
================================ */
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.find();

    res.json({
      success: true,
      teachers,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


/* ==============================
   GET SINGLE TEACHER
================================ */
export const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await teacherModel.findById(req.params.id);

    res.json({
      success: true,
      teacher: { ...teacher.toObject(), password: undefined },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


/* ==============================
   UPDATE TEACHER
================================ */
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await teacherModel.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    req.body ??= {};

    // Update fields only if provided
    teacher.fullName = req.body.fullName || teacher.fullName;
    teacher.email = req.body.email || teacher.email;
    teacher.contact = req.body.contact || teacher.contact;
    teacher.department = req.body.department || teacher.department;

    // Password update only if sent
    if (Object.hasOwn(req.body, "password")) {
      const { password } = req.body;
      if (typeof password !== "string" || password.length < 12 || Buffer.byteLength(password) > 72) {
        return res.status(400).json({ success: false, message: "Provide a password with at least 12 characters and at most 72 bytes" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      teacher.password = hashedPassword;
    }

    // Profile Image Update
    if (req.file) {
      teacher.photo = (await uploadImage(req.file.buffer)).secure_url;
    }

    await teacher.save();

    res.json({
      success: true,
      message: "Teacher Updated Successfully",
      teacher: { ...teacher.toObject(), password: undefined },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
   DELETE TEACHER
================================ */
export const deleteTeacher = async (req, res) => {
  try {
    await teacherModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Teacher Deleted Successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};