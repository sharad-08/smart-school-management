 import React, { useState, useEffect } from "react";

const AddTeacher = () => {

  /* ================= AUTO TEACHER ID ================= */
  const generateTeacherId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `TCH${year}${random}`;
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
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      teacherId: generateTeacherId(),
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Teacher Data:", formData);
    alert("Teacher Added Successfully ✅");

    // Here you can send to backend:
    // axios.post("/api/teachers/add", formData)
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
