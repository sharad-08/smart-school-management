


import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Appcontext } from "../../context/Appcontext";
const AddStudent = () => {
  const{numberofstudent,getstudent}=useContext(Appcontext)
  /* ================= ROLL STATE ================= */
  const [roll, setRoll] = useState(1);
  const [size,setsize]=useState(0);


   
  /* ================= MAIN FORM STATE ================= */
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

  /* ================= GENERATE ADMISSION ID ================= */
  // const generateAdmissionId = (className, section) => {
  //   const year = new Date().getFullYear();
  //   console.log(numberofstudent);
  //   console.log('ji')

  //   setRoll((prev) => prev + 1);
  //   return `${className}${section}${year}${"000"+numberofstudent}`;
  // };
  const generateAdmissionId = (className, section) => {
  const year = new Date().getFullYear();

  // next student number
  const nextNumber = numberofstudent + 1;

  // pad number to 3 digits (001, 002, 003...)
  const paddedNumber = String(nextNumber).padStart(3, "0");

  return `${className}${section}${year}${paddedNumber}`;
};

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name === "className" || name === "section") {
        if (updated.className && updated.section) {
          updated.admissionId = generateAdmissionId(
            updated.className,
            updated.section
          );
        }
      }

      return updated;
    });
  };

  /* ================= HANDLE FILE CHANGE ================= */
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    if (!formData.fullName) return alert("Full Name is required");
    if (!formData.gender) return alert("Gender is required");
    if (formData.aadhaar.length !== 12) return alert("Aadhaar must be 12 digits");
    if (!/^[0-9]{10}$/.test(formData.fatherContact)) return alert("Invalid Father Contact");
    if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) return alert("Invalid Email");
    return true;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await getstudent(); // refresh total student count
    if (!validateForm()) return;

    try {
      const data = new FormData();
     

      // Map frontend fields to backend fields
      data.append("Name", formData.fullName);
      data.append("AdmissionID", formData.admissionId);
      data.append("Password", formData.dob); // temporary password
      data.append("Gender", formData.gender);
      data.append("DateofBirth", formData.dob);
      data.append("BloodGroup", formData.bloodGroup);
      data.append("Aadhaar", formData.aadhaar);
      data.append("Category", formData.category);
      data.append("Religion", formData.religion);
      data.append("Nationality", formData.nationality);

      data.append("RollNumber", formData.rollNumber);
      data.append("Class", formData.className);
      data.append("Section", formData.section);
      data.append("Session", formData.session);
      data.append("AdmissionDate", formData.admissionDate);
      data.append("PreviousSchool", formData.previousSchool);
      data.append("PreviousClass", formData.previousClass);

      data.append("FatherName", formData.fatherName);
      data.append("FatherOccupation", formData.fatherOccupation);
      data.append("FatherContact", formData.fatherContact);
      data.append("MotherName", formData.motherName);
      data.append("MotherOccupation", formData.motherOccupation);
      data.append("MotherContact", formData.motherContact);
      data.append("Parentemail", formData.parentEmail);
      data.append("AnnualIncome", formData.annualIncome);

      data.append("PermanentAddress", formData.address);
      data.append("City", formData.city);
      data.append("State", formData.state);
      data.append("Pincode", formData.pincode);
      data.append("EmergencyNumber", formData.emergencyContact);
                                     
      data.append("AdmissionFee", formData.admissionFee);
      data.append("TuitionFee", formData.tuitionFee);
      data.append("TransportFee", formData.transportFee);
      data.append("HostelFee", formData.hostelFee);
      data.append("FeeStatus", formData.feeStatus);
      data.append("Scholership", formData.scholarship);
      data.append("Status", formData.status);
      
      // Files
      if (formData.photo) data.append("Profile", formData.photo);
      if (formData.tc) data.append("TC", formData.tc);
      
      // Send to backend
      const res = await axios.post(
        "http://localhost:4000/api/admin/add-student",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData((prev) => ({ ...prev, photo: null, tc: null }));
        setRoll((prev) => prev + 1);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding student");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">🎓 New Student Admission</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
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

          <SectionTitle title="Address Information" />
          <Grid>
            <Input label="Permanent Address" name="address" onChange={handleChange} />
            <Input label="City" name="city" onChange={handleChange} />
            <Input label="State" name="state" onChange={handleChange} />
            <Input label="Pincode" name="pincode" onChange={handleChange} />
            <Input label="Emergency Contact" name="emergencyContact" onChange={handleChange} />
          </Grid>

          <SectionTitle title="Fee Information" />
          <Grid>
            <Input label="Admission Fee" name="admissionFee" onChange={handleChange} />
            <Input label="Tuition Fee" name="tuitionFee" onChange={handleChange} />
            <Input label="Transport Fee" name="transportFee" onChange={handleChange} />
            <Input label="Hostel Fee" name="hostelFee" onChange={handleChange} />
            <Select label="Fee Status" name="feeStatus" onChange={handleChange} options={["Paid","Pending"]} />
            <Select label="Scholarship" name="scholarship" onChange={handleChange} options={["Yes","No"]} />
          </Grid>

          <div className="text-right">
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
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
  <h3 className="text-xl font-semibold text-gray-600 border-b pb-2">{title}</h3>
);

const Grid = ({ children }) => <div className="grid md:grid-cols-2 gap-4">{children}</div>;

const Input = ({ label, type = "text", ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input type={type} {...props} className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <select {...props} className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500">
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