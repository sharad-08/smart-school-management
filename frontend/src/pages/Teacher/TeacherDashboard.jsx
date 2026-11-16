import { useContext } from "react";
import { Appcontext } from "../../context/Appcontext";
import useResource from "../../hooks/useResource";
import { PageHeader, StatCard, ResourceState, QuickLink } from "../../components/portal/UI";

export default function TeacherDashboard() {
  const { teacherProfile } = useContext(Appcontext);
  const resource = useResource("/api/marks/students");
  return <><PageHeader eyebrow="Teacher overview" title={`Welcome, ${teacherProfile.fullName}`} description={`${teacherProfile.subject} · ${teacherProfile.department}`} /><ResourceState {...resource}><div className="stats-grid"><StatCard label="Assigned students" value={resource.data?.students?.length ?? 0} detail={`Class ${teacherProfile.className || "unassigned"} · Section ${teacherProfile.section || "—"}`} /><StatCard label="Teaching subject" value={teacherProfile.subject || "—"} detail="Your assigned subject" /><StatCard label="Class teacher" value={teacherProfile.classTeacher ? "Assigned" : "No"} detail={teacherProfile.classTeacher ? "You can record class attendance" : "Contact the school for an assignment"} /></div></ResourceState><h2 className="section-title">Your workspace</h2><div className="teacher-grid"><QuickLink to="/teacher/attendance" title="Record attendance" description="Save daily attendance for your class." /><QuickLink to="/teacher/marks" title="Enter marks" description="Publish subject results for students." /><QuickLink to="/teacher/messages" title="Message your class" description="Share an update with your students." /></div></>;
}
