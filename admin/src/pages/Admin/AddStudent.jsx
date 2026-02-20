
import React, { useState, useEffect } from "react";

const AddStudent = () => {

  /* ================= AUTO ADMISSION ID ================= */

  const generateAdmissionId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `ADM${year}${random}`;
  };

  /* ================= STATE ================= */

  const [formData, setFormData] = useState({
    admissionId: "",
    status: "Active",

    // Student Basic
    fullName: "",
    photo: null,
    gender: "",
    dob: "",
    bloodGroup: "",
    aadhaar: "",
    category: "",
    religion: "",
    nationality: "Indian",

    // Academic
    rollNumber: "",
    className: "",
    section: "",
    session: "2025-26",
    admissionDate: "",
    previousSchool: "",
    previousClass: "",
    tc: null,

    // Parents
    fatherName: "",
    fatherOccupation: "",
    fatherContact: "",
    motherName: "",
    motherOccupation: "",
    motherContact: "",
    parentEmail: "",
    annualIncome: "",

    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",
    emergencyContact: "",

    // Fees
    admissionFee: "",
    tuitionFee: "",
    transportFee: "",
    hostelFee: "",
    feeStatus: "",
    scholarship: "No",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      admissionId: generateAdmissionId(),
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
    if (formData.aadhaar.length !== 12)
      return alert("Aadhaar must be 12 digits");
    if (!/^[0-9]{10}$/.test(formData.fatherContact))
      return alert("Invalid Father Contact");
    if (!/\S+@\S+\.\S+/.test(formData.parentEmail))
      return alert("Invalid Email");
    return true;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Student Data:", formData);

    alert("Student Admission Saved Successfully ✅");

    // Here you can send to backend:
    // axios.post("/api/students/add", formData)
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-6 text-gray-700">
          🎓 New Student Admission
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ================= STUDENT BASIC ================= */}
          <SectionTitle title="Student Basic Information" />

          <Grid>
            <Input label="Admission ID" value={formData.admissionId} disabled />
            <Input label="Full Name" name="fullName" onChange={handleChange} />
            <Select label="Gender" name="gender" onChange={handleChange} options={["Boy","Girl"]} />
            <Input type="date" label="Date of Birth" name="dob" onChange={handleChange} />
            <Input label="Blood Group" name="bloodGroup" onChange={handleChange} />
            <Input label="Aadhaar Number" name="aadhaar" onChange={handleChange} />
            <Input label="Category" name="category" onChange={handleChange} />
            <Input label="Religion" name="religion" onChange={handleChange} />
            <Input label="Nationality" name="nationality" onChange={handleChange} />
            <FileInput label="Profile Photo" name="photo" onChange={handleFileChange} />
          </Grid>

          {/* ================= ACADEMIC ================= */}
          <SectionTitle title="Academic Information" />

          <Grid>
            <Input label="Roll Number" name="rollNumber" onChange={handleChange} />
            <Input label="Class" name="className" onChange={handleChange} />
            <Input label="Section" name="section" onChange={handleChange} />
            <Input label="Session" name="session" onChange={handleChange} />
            <Input type="date" label="Admission Date" name="admissionDate" onChange={handleChange} />
            <Input label="Previous School" name="previousSchool" onChange={handleChange} />
            <Input label="Previous Class" name="previousClass" onChange={handleChange} />
            <FileInput label="Transfer Certificate (PDF)" name="tc" onChange={handleFileChange} />
          </Grid>

          {/* ================= PARENTS ================= */}
          <SectionTitle title="Parent Information" />

          <Grid>
            <Input label="Father Name" name="fatherName" onChange={handleChange} />
            <Input label="Father Occupation" name="fatherOccupation" onChange={handleChange} />
            <Input label="Father Contact" name="fatherContact" onChange={handleChange} />
            <Input label="Mother Name" name="motherName" onChange={handleChange} />
            <Input label="Mother Occupation" name="motherOccupation" onChange={handleChange} />
            <Input label="Mother Contact" name="motherContact" onChange={handleChange} />
            <Input label="Parent Email" name="parentEmail" onChange={handleChange} />
            <Input label="Annual Income" name="annualIncome" onChange={handleChange} />
          </Grid>

          {/* ================= ADDRESS ================= */}
          <SectionTitle title="Address Information" />

          <Grid>
            <Input label="Permanent Address" name="address" onChange={handleChange} />
            <Input label="City" name="city" onChange={handleChange} />
            <Input label="State" name="state" onChange={handleChange} />
            <Input label="Pincode" name="pincode" onChange={handleChange} />
            <Input label="Emergency Contact" name="emergencyContact" onChange={handleChange} />
          </Grid>

          {/* ================= FEES ================= */}
          <SectionTitle title="Fee Information" />

          <Grid>
            <Input label="Admission Fee" name="admissionFee" onChange={handleChange} />
            <Input label="Tuition Fee" name="tuitionFee" onChange={handleChange} />
            <Input label="Transport Fee" name="transportFee" onChange={handleChange} />
            <Input label="Hostel Fee" name="hostelFee" onChange={handleChange} />
            <Select label="Fee Status" name="feeStatus" onChange={handleChange} options={["Paid","Pending"]} />
            <Select label="Scholarship" name="scholarship" onChange={handleChange} options={["Yes","No"]} />
          </Grid>

          {/* ================= SUBMIT ================= */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Save Admission
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddStudent;

/* ================= REUSABLE COMPONENTS ================= */

const SectionTitle = ({ title }) => (
  <h3 className="text-xl font-semibold text-gray-600 border-b pb-2">
    {title}
  </h3>
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
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const FileInput = ({ label, ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="file"
      {...props}
      className="w-full border px-3 py-2 rounded-lg"
    />
  </div>
);
