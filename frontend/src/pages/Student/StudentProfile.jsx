import { useStudentPortal } from "../../context/StudentPortalContext";
import { PageHeader, Badge } from "../../components/portal/UI";

export default function StudentProfile() {
  const { data: { student } } = useStudentPortal();
  const fields = [["Admission ID", student.AdmissionID], ["Roll number", student.RollNumber], ["Class / section", `${student.Class} / ${student.Section}`], ["Session", student.Session], ["Date of birth", student.DateofBirth], ["Parent email", student.Parentemail], ["Father / guardian", student.FatherName], ["Mother / guardian", student.MotherName], ["Emergency contact", student.EmergencyNumber], ["Address", [student.PermanentAddress, student.City, student.State, student.Pincode].filter(Boolean).join(", ")]];
  return <><PageHeader eyebrow="School records" title="My profile" description="Contact the school office to correct your details." /><section className="panel profile-panel"><div className="profile-banner"><div className="avatar avatar-large avatar-text">{student.Profile ? <img src={student.Profile} alt={student.Name} /> : student.Name.slice(0, 1)}</div><div><h2>{student.Name}</h2><p className="muted">Class {student.Class} · Section {student.Section}</p><Badge>{student.Status}</Badge></div></div><dl className="details-grid">{fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || "—"}</dd></div>)}</dl></section></>;
}
