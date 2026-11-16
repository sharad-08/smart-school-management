import { useNavigate } from "react-router-dom";



import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api";
import { Appcontext } from "../../context/Admincontext";
const AddStudent = () => {
  const navigate = useNavigate();
  const reject = (message) => { toast.error(message); return false; };
  const [saving, setSaving] = useState(false);
  const { getstudent } = useContext(Appcontext);

  useEffect(() => {
    getstudent().catch((error) => toast.error(error.message));
  }, []);

  /* ================= MAIN FORM STATE ================= */
  const [formData, setFormData] = useState({
    status: "Active",

    fullName: "",
    photo: null,
    gender: "",
    dob: "",
    bloodGroup: "",
    aadhaar: "",
    category: "",
    religion: "",
    nationality: "Indian",

    rollNumber: "",
    className: "",
    section: "",
    session: `${new Date().getFullYear()}-${String(new Date().getFullYear() + 1).slice(-2)}`,
    admissionDate: "",
    previousSchool: "",
    previousClass: "",

    fatherName: "",
    fatherOccupation: "",
    fatherContact: "",
    motherName: "",
    motherOccupation: "",
    motherContact: "",
    parentEmail: "",
    annualIncome: "",

    address: "",
    city: "",
    state: "",
    pincode: "",
    emergencyContact: "",

    admissionFee: "",
    tuitionFee: "",
    transportFee: "",
    hostelFee: "",
    feeStatus: "",
    scholarship: "No",
  });

  const [rollInfo, setRollInfo] = useState({ loading: false, error: "", count: null });
  useEffect(() => {
    const className = formData.className.trim(), section = formData.section.trim();
    setFormData((previous) => ({ ...previous, rollNumber: "" }));
    if (!className || !section) { setRollInfo({ loading: false, error: "", count: null }); return; }
    const controller = new AbortController();
    setRollInfo({ loading: true, error: "", count: null });
    const timer = setTimeout(() => {
      axios.get("/api/admin/next-roll-number", { params: { className, section }, signal: controller.signal }).then(({ data }) => {
        if (controller.signal.aborted) return;
        setFormData((previous) => ({ ...previous, rollNumber: data.nextRollNumber }));
        setRollInfo({ loading: false, error: "", count: data.count });
      }).catch((error) => { if (!controller.signal.aborted) setRollInfo({ loading: false, error: error.response?.data?.message || "Could not fetch roll number. Choose the class and section again.", count: null }); });
    }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [formData.className, formData.section]);

  const [admissionSuffix, setAdmissionSuffix] = useState(() => crypto.randomUUID().slice(0, 8).toUpperCase());
  const admissionId = formData.className && formData.section
    ? `${formData.className}${formData.section}${new Date().getFullYear()}${admissionSuffix}`
    : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!formData.fullName) return reject("Full Name is required");
    if (!formData.gender) return reject("Gender is required");
    if (formData.aadhaar.length !== 12) return reject("Aadhaar must be 12 digits");
    if (!/^[0-9]{10}$/.test(formData.fatherContact)) return reject("Invalid Father Contact");
    if (!/\S+@\S+\.\S+/.test(formData.parentEmail)) return reject("Invalid Email");
    return true;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving || rollInfo.loading || !formData.rollNumber) return;
    const passwordInput = e.currentTarget.elements.initialPassword;
    if (!validateForm()) return;

    setSaving(true);
    try {
      const data = new FormData();


      data.append("Name", formData.fullName);
      data.append("AdmissionID", admissionId);
      data.append("Password", passwordInput.value);
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

      if (formData.photo) data.append("Profile", formData.photo);

      const res = await axios.post(
        "/api/admin/add-student",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        passwordInput.value = "";
        setFormData((prev) => ({ ...prev, photo: null }));
        setAdmissionSuffix(crypto.randomUUID().slice(0, 8).toUpperCase());
        await getstudent();
        navigate("/admin/students");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not save student");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="admission-card max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">New student admission</h2>

        <form onSubmit={handleSubmit} className="space-y-8"><fieldset disabled={saving} className="space-y-8">
          <label className="block">
            Initial password
            <input type="password" name="initialPassword" minLength={12} maxLength={72} required
              className="block border rounded p-2" />
          </label>
          <SectionTitle title="Student Basic Information" />
          <Grid>
            <Input label="Admission ID" value={admissionId} disabled />
            <Select label="Status" name="status" options={["Active", "Inactive"]} onChange={handleChange} value={formData.status} />
            <Input label="Full Name" name="fullName" onChange={handleChange} value={formData.fullName} />
            <Select label="Gender" name="gender" onChange={handleChange} options={["Boy","Girl"]} value={formData.gender} />
            <Input type="date" label="Date of Birth" name="dob" onChange={handleChange} value={formData.dob} />
            <Input label="Blood Group" name="bloodGroup" onChange={handleChange} value={formData.bloodGroup} />
            <Input label="Aadhaar Number" name="aadhaar" onChange={handleChange} value={formData.aadhaar} />
            <Input label="Category" name="category" onChange={handleChange} value={formData.category} />
            <Input label="Religion" name="religion" onChange={handleChange} value={formData.religion} />
            <Input label="Nationality" name="nationality" onChange={handleChange} value={formData.nationality} />
            <FileInput label="Profile Photo" name="photo" onChange={handleFileChange} />
          </Grid>

          <SectionTitle title="Academic Information" />
          <Grid>
            <div><Input label="Roll number (automatic)" name="rollNumber" readOnly value={formData.rollNumber} placeholder={rollInfo.loading ? "Loading…" : "Choose class and section"} />
              <p className="field-help" role="status">{rollInfo.error || (rollInfo.count !== null ? `${rollInfo.count} students in this class and section. Final roll number is assigned when saved.` : "Numbering is separate for every class and section.")}</p></div>
            <Input label="Class" name="className" required onChange={handleChange} value={formData.className} />
            <Input label="Section" name="section" required onChange={handleChange} value={formData.section} />
            <Input label="Session" name="session" onChange={handleChange} value={formData.session} />
            <Input type="date" label="Admission Date" name="admissionDate" onChange={handleChange} value={formData.admissionDate} />
            <Input label="Previous School" name="previousSchool" onChange={handleChange} value={formData.previousSchool} />
            <Input label="Previous Class" name="previousClass" onChange={handleChange} value={formData.previousClass} />
          </Grid>

          <SectionTitle title="Parent Information" />
          <Grid>
            <Input label="Father Name" name="fatherName" onChange={handleChange} value={formData.fatherName} />
            <Input label="Father Occupation" name="fatherOccupation" onChange={handleChange} value={formData.fatherOccupation} />
            <Input label="Father Contact" name="fatherContact" onChange={handleChange} value={formData.fatherContact} />
            <Input label="Mother Name" name="motherName" onChange={handleChange} value={formData.motherName} />
            <Input label="Mother Occupation" name="motherOccupation" onChange={handleChange} value={formData.motherOccupation} />
            <Input label="Mother Contact" name="motherContact" onChange={handleChange} value={formData.motherContact} />
            <Input label="Parent Email" name="parentEmail" onChange={handleChange} value={formData.parentEmail} />
            <Input label="Annual Income" name="annualIncome" onChange={handleChange} value={formData.annualIncome} />
          </Grid>

          <SectionTitle title="Address Information" />
          <Grid>
            <Input label="Permanent Address" name="address" onChange={handleChange} value={formData.address} />
            <Input label="City" name="city" onChange={handleChange} value={formData.city} />
            <Input label="State" name="state" onChange={handleChange} value={formData.state} />
            <Input label="Pincode" name="pincode" onChange={handleChange} value={formData.pincode} />
            <Input label="Emergency Contact" name="emergencyContact" onChange={handleChange} value={formData.emergencyContact} />
          </Grid>

          <SectionTitle title="Fee Information" />
          <Grid>
            <Input type="number" min="0" label="Admission Fee" name="admissionFee" onChange={handleChange} value={formData.admissionFee} />
            <Input type="number" min="0" label="Tuition Fee" name="tuitionFee" onChange={handleChange} value={formData.tuitionFee} />
            <Input label="Transport Fee" name="transportFee" onChange={handleChange} value={formData.transportFee} />
            <Input label="Hostel Fee" name="hostelFee" onChange={handleChange} value={formData.hostelFee} />
            <Select label="Fee Status" name="feeStatus" onChange={handleChange} options={["Paid","Pending"]} value={formData.feeStatus} />
            <Select label="Scholarship" name="scholarship" onChange={handleChange} options={["Yes","No"]} value={formData.scholarship} />
          </Grid>

          <div className="text-right">
            <button type="submit" disabled={saving || rollInfo.loading || !formData.rollNumber} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Save Admission
            </button>
          </div>
        </fieldset></form>
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
    <label htmlFor={props.name} className="block font-medium mb-1">{label}</label>
    <input id={props.name} type={type} required={Boolean(props.name) && !["previousSchool", "previousClass", "transportFee", "hostelFee", "className", "section"].includes(props.name)} {...props} className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label htmlFor={props.name} className="block font-medium mb-1">{label}</label>
    <select id={props.name} required {...props} className="w-full border px-3 py-2 rounded-lg focus:outline-blue-500">
      <option value="">Select</option>
      {options.map((opt, i) => (
        <option key={i} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const FileInput = ({ label, ...props }) => (
  <div>
    <label htmlFor={props.name} className="block font-medium mb-1">{label}</label>
    <input id={props.name} type="file" required accept="image/png,image/jpeg,image/webp" {...props} className="w-full border px-3 py-2 rounded-lg" />
  </div>
);
