import Student from "../models/studentModel.js";

import Message from "../models/messageModel.js";
import Teacher from "../models/teacherModel.js";

// ✅ Send Message
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    const teacher = await Teacher.findById(req.user.id);

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    const newMessage = await Message.create({
      className: teacher.className,
      section: teacher.section,
      teacherId: teacher._id,
      message,
    });

    res.json({ success: true, message: "Message sent successfully", newMessage });

  } catch (error) {
    console.log("Send message error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Get Messages for Students
export const getMessagesForStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("Class Section");
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    const messages = await Message.find({
      className: student.Class,
      section: student.Section,
    }).sort({ createdAt: -1 });

    res.json({ success: true, messages });

  } catch (error) {
    console.log("Get message error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};