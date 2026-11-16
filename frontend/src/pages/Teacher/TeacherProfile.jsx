import { useContext } from "react";
import { Appcontext } from "../../context/Appcontext";
import { PageHeader, Badge } from "../../components/portal/UI";

export default function TeacherProfile() {
  const { teacherProfile: teacher } = useContext(Appcontext);
  const fields = [["Teacher ID", teacher.teacherId], ["Department", teacher.department], ["Subject", teacher.subject], ["Assigned class", teacher.className], ["Section", teacher.section], ["Email", teacher.email], ["Contact", teacher.contact], ["Qualification", teacher.qualification], ["Experience", `${teacher.experience ?? 0} years`], ["Address", [teacher.address, teacher.city, teacher.state].filter(Boolean).join(", ")]];
  return <><PageHeader eyebrow="School records" title="My profile" description="Your teaching details and school assignment." /><section className="panel profile-panel"><div className="profile-banner"><span className="avatar avatar-large avatar-text">{teacher.photo ? <img src={teacher.photo} alt={teacher.fullName} /> : teacher.fullName.slice(0, 1)}</span><div><h2>{teacher.fullName}</h2><p className="muted">{teacher.department} · {teacher.subject}</p><Badge>{teacher.status}</Badge></div></div><dl className="details-grid">{fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || "Not assigned"}</dd></div>)}</dl></section></>;
}
