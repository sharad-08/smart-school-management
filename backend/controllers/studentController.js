// backend/controllers/studentController.js
 import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import teacherModel from "../models/teacherModel.js";
import validator from "validator";
import Studentbyclass from "../models/Student.js";

export const getStudentsByClass = async (req, res) => {
  try {
    const { className, section } = req.params;
    const students = await Studentbyclass.find({ className, section });
    res.json(students);
    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};