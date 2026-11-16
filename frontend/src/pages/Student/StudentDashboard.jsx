import { useStudentPortal } from "../../context/StudentPortalContext";
import { PageHeader, StatCard, EmptyState, QuickLink, dateLabel } from "../../components/portal/UI";

export default function StudentDashboard() {
  const { data, reload } = useStudentPortal();
  const { student, attendance, marks, messages } = data;
  const present = attendance.filter((record) => record.status === "Present").length;
  const percentage = attendance.length ? Math.round(present / attendance.length * 100) : null;
  return <>
    <PageHeader eyebrow="Student overview" title={`Welcome, ${student.Name}`} description={`Class ${student.Class} · Section ${student.Section} · ${student.AdmissionID}`}><button className="button button-secondary" onClick={reload}>Refresh records</button></PageHeader>
    <div className="stats-grid"><StatCard label="Attendance" value={percentage === null ? "—" : `${percentage}%`} detail={`${present} present / ${attendance.length} recorded days`} /><StatCard label="Published results" value={marks.length} detail="Subject results entered by your teachers" /><StatCard label="Class notices" value={messages.length} detail="Latest messages from your teachers" /></div>
    <div className="dashboard-columns"><section className="panel"><div className="panel-heading"><h2>Class notices</h2><span className="badge">Latest 20</span></div>{messages.length ? <div className="notice-list">{messages.map((notice) => <article key={notice._id}><p>{notice.message}</p><small className="muted">{notice.teacherId?.fullName || "School teacher"} · {dateLabel(notice.createdAt)}</small></article>)}</div> : <EmptyState title="You’re all caught up" description="Messages from your class teachers will appear here." />}</section><section><h2 className="section-title">Your school day</h2><div className="quick-links"><QuickLink to="/student/timetable" title="Class timetable" description="See your subjects and teachers." /><QuickLink to="/student/marks" title="Examination results" description="View your published subject marks." /><QuickLink to="/student/profile" title="Student profile" description="Check your school records." /></div></section></div>
  </>;
}
