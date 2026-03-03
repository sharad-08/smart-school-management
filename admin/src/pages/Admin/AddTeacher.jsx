 import React, { useState, useEffect } from "react";
 import { useContext } from "react";
import { Appcontext } from "../../context/Appcontext"; // path adjust karo

const AddTeacher = () => {
   const { addTeacher,numberofteacher,getTeachers } = useContext(Appcontext);
  
const generateTeacherId = async (department, subject) => {
  const year = new Date().getFullYear();

  // Count teachers of same department
  const numberOfTeachers = await teacherModel.countDocuments({ department });

  const nextNumber = numberOfTeachers + 1;
  const paddedNumber = String(nextNumber).padStart(3, "0");

  const deptCode = department.substring(0, 3).toUpperCase();
  const subCode = subject.substring(0, 2).toUpperCase();

  return `${deptCode}${subCode}${year}${paddedNumber}`;
};
  /* ================= STATE ================= */
  const [formData, setFormData] = useState({
    teacherId: "",
    status: "Active",

    // Teacher Basic
    fullName: "",
    photo: null,
    gender: "",
    dob: "",
    contact: "",
    email: "",

    // Professional Info
    employeeCode: "",
    department: "",
    subject: "",
    qualification: "",
    experience: "",

    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",

    password:"",


    classTeacher:"",
    className:"",
    section:"",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      // teacherId: generateTeacherId(),
    }));
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (!formData.fullName) return alert("Full Name is required");
    if (!formData.gender) return alert("Gender is required");
    if (!/^[0-9]{10}$/.test(formData.contact))
      return alert("Invalid Contact Number");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return alert("Invalid Email");
    if (!formData.employeeCode) return alert("Employee Code is required");
    if (!formData.department) return alert("Department is required");
    if (!formData.subject) return alert("Subject is required");
    return true;
  };

  /* ================= SUBMIT ================= */

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const data = new FormData();

  // Format dob to YYYY-MM-DD only
  const formattedDob = formData.dob ? new Date(formData.dob).toISOString().split("T")[0] : "";

  data.append("teacherId", formData.teacherId);
  data.append("status", formData.status);
  data.append("fullName", formData.fullName);
  data.append("gender", formData.gender);
  data.append("dob", formattedDob);   // 👈 fixed here
  data.append("contact", formData.contact);
  data.append("email", formData.email);
  data.append("employeeCode", formData.employeeCode);
  data.append("department", formData.department);
  data.append("subject", formData.subject);
  data.append("qualification", formData.qualification);
  data.append("experience", formData.experience);
  data.append("address", formData.address);
  data.append("city", formData.city);
  data.append("state", formData.state);
  data.append("pincode", formData.pincode);
  data.append("password", formData.dob);
  data.append("classTeacher",formData.classTeacher);
  data.append("className",formData.className);
  data.append("section",formData.section);

  if (formData.photo) {
    data.append("photo", formData.photo);
  }

  const success = await addTeacher(data);

  if (success) {
    alert("Teacher Added Successfully ✅");
    setFormData({
      teacherId: "",
      status: "Active",
      fullName: "",
      photo: null,
      gender: "",
      dob: "",
      contact: "",
      email: "",
      employeeCode: "",
      department: "",
      subject: "",
      qualification: "",
      experience: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      classTeacher:"",
    className:"",
    section:"",
    });
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          👩‍🏫 Add New Teacher
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ================= TEACHER BASIC ================= */}
          <SectionTitle title="Teacher Basic Information" />

          <Grid>
            <Input label="Teacher ID" value={formData.teacherId} disabled />
            <Input label="Full Name" name="fullName" onChange={handleChange} />
            <Select label="Gender" name="gender" onChange={handleChange} options={["Male","Female"]} />
            <Input type="date" label="Date of Birth" name="dob" onChange={handleChange} />
            <Input label="Contact Number" name="contact" onChange={handleChange} />
            <Input label="Email" name="email" onChange={handleChange} />
            <FileInput label="Profile Photo" name="photo" onChange={handleFileChange} />
             <Select label="classTeacher" name="classTeacher" onChange={handleChange} options={["false","true"]} />
            <Input label="className" name="className" onChange={handleChange}/>
            <Input label="section" name="section" onChange={handleChange}/>

          </Grid>

          {/* ================= PROFESSIONAL INFO ================= */}
          <SectionTitle title="Professional Information" />

          <Grid>
            <Input label="Employee Code" name="employeeCode" onChange={handleChange} />
            <Input label="Department" name="department" onChange={handleChange} />
            <Input label="Subject" name="subject" onChange={handleChange} />
            <Input label="Qualification" name="qualification" onChange={handleChange} />
            <Input label="Experience" name="experience" onChange={handleChange} />
          </Grid>

          {/* ================= ADDRESS ================= */}
          <SectionTitle title="Address Information" />

          <Grid>
            <Input label="Permanent Address" name="address" onChange={handleChange} />
            <Input label="City" name="city" onChange={handleChange} />
            <Input label="State" name="state" onChange={handleChange} />
            <Input label="Pincode" name="pincode" onChange={handleChange} />
          </Grid>

          {/* ================= SUBMIT ================= */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Save Teacher
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTeacher;

/* ================= REUSABLE COMPONENTS ================= */
const SectionTitle = ({ title }) => (
  <h3 className="text-xl font-semibold text-gray-600 border-b pb-2">{title}</h3>
);

const Grid = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-4">{children}</div>
);

const Input = ({ label, type = "text", ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type={type}
      {...props}
      className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <select
      {...props}
      className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500"
    >
      <option value="">Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const FileInput = ({ label, ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input type="file" {...props} className="w-full border px-3 py-2 rounded-lg" />
  </div>
);
