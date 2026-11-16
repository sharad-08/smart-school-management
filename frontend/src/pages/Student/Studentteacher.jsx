import { useState } from "react";
import { useStudentPortal } from "../../context/StudentPortalContext";
import { PageHeader, EmptyState, Badge } from "../../components/portal/UI";

export default function StudentTeachers() {
  const { data: { teachers } } = useStudentPortal();
  const [search, setSearch] = useState("");
  const records = teachers.filter((teacher) => `${teacher.fullName} ${teacher.subject}`.toLowerCase().includes(search.toLowerCase()));
  return <><PageHeader eyebrow="Your class" title="Teachers & subjects" description="Teachers assigned to your class and section." /><label className="filter-label">Find a teacher<input type="search" placeholder="Teacher name or subject" value={search} onChange={(event) => setSearch(event.target.value)} /></label><div className="teacher-grid">{records.map((teacher) => <article className="panel teacher-card" key={teacher._id}><span className="avatar avatar-text">{teacher.fullName.slice(0, 1)}</span><h2>{teacher.fullName}</h2><p className="muted">{teacher.subject}</p>{teacher.classTeacher && <Badge>Class teacher</Badge>}<p>{teacher.qualification}</p>{teacher.email && <a className="text-link" href={`mailto:${teacher.email}`}>{teacher.email}</a>}</article>)}</div>{!records.length && <div className="panel"><EmptyState title="No teachers found" description="Try another search or contact your school about class assignments." /></div>}</>;
}
