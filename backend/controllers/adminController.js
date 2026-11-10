 


import jwt from "jsonwebtoken";
import { timingSafeEqual } from "node:crypto";
import bcrypt from "bcrypt";
import { uploadImage } from "../config/cloud.js";
import studentModel from "../models/studentModel.js";
import validator from "validator";

// admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body ?? {};
  const { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
    return res.status(503).json({ success: false, message: "Admin login is unavailable" });
  }
  const supplied = Buffer.from(typeof password === "string" ? password : "");
  const expected = Buffer.from(ADMIN_PASSWORD);

  if (email !== ADMIN_EMAIL || supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "1d" });

  res.json({
    success: true,
    token,
  });
};

 // add-student 

export const addStudent = async (req, res) => {
  try {
    const Profile = req.file;

    if (!Profile) {
      return res.json({ success: false, message: "Profile is not defined" });
    }
   



    const {
      Name, AdmissionID, Password, Gender, DateofBirth, BloodGroup,
      Aadhaar, Category, Religion, Nationality, RollNumber, Class,
      Section, Session, AdmissionDate, PreviousSchool, PreviousClass,
      FatherName, FatherOccupation, FatherContact, MotherName,
      MotherOccupation, MotherContact, Parentemail, AnnualIncome,
      PermanentAddress, City, State, Pincode, EmergencyNumber,
      AdmissionFee, TuitionFee, TransportFee, HostelFee, FeeStatus,
      Scholership, Status, image,
    } = req.body;

    // Check required fields
    if (!Name || !AdmissionID || !Password || !Gender || !DateofBirth ||
        !BloodGroup || !Aadhaar || !Category || !Religion || !Nationality ||
        !RollNumber || !Class || !Section || !Session || !AdmissionDate ||
        !FatherName || !FatherOccupation || !FatherContact ||
        !MotherName || !MotherOccupation || !MotherContact ||
        !Parentemail || !AnnualIncome || !PermanentAddress || !City ||
        !State || !Pincode || !EmergencyNumber || !AdmissionFee ||
        !TuitionFee || !FeeStatus || !Status
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email
    if (!validator.isEmail(Parentemail)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    if (typeof Password !== "string" || Password.length < 12 || Buffer.byteLength(Password) > 72) {
      return res.status(400).json({ success: false, message: "Provide a password with at least 12 characters and at most 72 bytes" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Upload profile to Cloudinary
    const imageUpload = await uploadImage(Profile.buffer);

    const profileurl = imageUpload.secure_url;

    // Save student
    const newStudent = new studentModel({
      Name, AdmissionID, Password: hashedPassword, Gender, DateofBirth,
      BloodGroup, Aadhaar, Category, Religion, Nationality, RollNumber,
      Class, Section, Session, AdmissionDate, PreviousSchool, PreviousClass,
      FatherName, FatherOccupation, FatherContact, MotherName,
      MotherOccupation, MotherContact, Parentemail, AnnualIncome,
      PermanentAddress, City, State, Pincode, EmergencyNumber,
      AdmissionFee, TuitionFee, TransportFee, HostelFee, FeeStatus,
      Scholership, Status, Profile: profileurl, image,
    });

    await newStudent.save();

    res.json({ success: true, message: "Student Added", student: { ...newStudent.toObject(), Password: undefined }  });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



//get-student 


export const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find();

    res.json({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};



// GET SINGLE STUDENT
export const getSingleStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);

    res.json({
      success: true,
      student,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    for (const field of Object.keys(studentModel.schema.paths)) {
      if (["_id", "__v", "Password"].includes(field) || !Object.hasOwn(req.body, field)) continue;
      student.set(field, req.body[field]);
    }
    if (Object.hasOwn(req.body, "Password")) {
      const { Password } = req.body;
      if (typeof Password !== "string" || Password.length < 12 || Buffer.byteLength(Password) > 72) {
        return res.status(400).json({ success: false, message: "Provide a password with at least 12 characters and at most 72 bytes" });
      }
      student.Password = await bcrypt.hash(Password, 10);
    }
    await student.save();
    const updatedStudent = { ...student.toObject(), Password: undefined };

    res.json({
      success: true,
      message: "Student Updated Successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};