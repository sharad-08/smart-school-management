 


import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import studentModel from "../models/studentModel.js";
import validator from "validator";

// admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@gmail.com" || password !== "admin@123") {
    return res.json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const token = jwt.sign({ email }, "your_secret_key", { expiresIn: "1d" });

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

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Upload profile to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(Profile.path, {
      resource_type: "image",
    });

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

    res.json({ success: true, message: "Student Added", student: newStudent  });
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
    const updatedStudent = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Student Updated Successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};