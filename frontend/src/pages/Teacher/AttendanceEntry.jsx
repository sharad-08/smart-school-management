import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Appcontext } from "../../context/Appcontext";
import useResource from "../../hooks/useResource";
import api, { errorMessage } from "../../api";
import { PageHeader, ResourceState, EmptyState } from "../../components/portal/UI";

function AttendanceForm({ teacher }) {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const [date, setDate] = useState(today);
  const students = useResource("/api/marks/students");
  const records = useResource("/api/attendance/daily?" + new URLSearchParams({ className: teacher.className, section: teacher.section, date }));
  const [attendance, setAttendance] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setAttendance(Object.fromEntries((records.data || []).map((record) => [record.studentId?._id, record.status])));
    setError("");
  }, [records.data]);
  const rows = students.data?.students || [];
  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const attendanceData = Object.fromEntries(rows.map((student) => [student._id, attendance[student._id]]));
      await api.post("/api/attendance/save", { attendanceData, className: teacher.className, section: teacher.section, date });
      toast.success("Attendance saved");
      records.reload();
    } catch (failure) { setError(errorMessage(failure)); }
    finally { setBusy(false); }
  }

  return <><PageHeader eyebrow={`Class ${teacher.className} · Section ${teacher.section}`} title="Record attendance" description="Select a date, mark your students and save their daily attendance." /><label className="filter-label">Attendance date<input type="date" required max={today} value={date} disabled={busy} onChange={(event) => { if (event.target.value) setDate(event.target.value); }} /></label><ResourceState loading={students.loading || records.loading} error={students.error || records.error} reload={() => { students.reload(); records.reload(); }}><section className="panel">{rows.length ? <form onSubmit={save}><div className="table-wrap"><table><thead><tr><th>Student</th><th>Roll number</th><th>Status</th></tr></thead><tbody>{rows.map((student) => <tr key={student._id}><td>{student.Name}</td><td>{student.RollNumber}</td><td><select aria-label={`Attendance for ${student.Name}`} required disabled={busy} value={attendance[student._id] || ""} onChange={(event) => setAttendance({ ...attendance, [student._id]: event.target.value })}><option value="">Select status</option><option>Present</option><option>Absent</option></select></td></tr>)}</tbody></table></div>{error && <p className="inline-error" role="alert">{error}</p>}<div className="panel-heading"><p className="muted">Existing records for this date will be updated.</p><button className="button" disabled={busy}>{busy ? "Saving…" : "Save attendance"}</button></div></form> : <EmptyState title="No students in your class" description="Ask the school administrator to check your class and section assignment." />}</section></ResourceState></>;
}

export default function AttendanceEntry() {
  const { teacherProfile } = useContext(Appcontext);
  if (!teacherProfile?.classTeacher || !teacherProfile.className || !teacherProfile.section) {
    return <section className="panel"><EmptyState title="Class teacher assignment needed" description="The school administrator can assign you as a class teacher to enable attendance entry." /></section>;
  }
  return <AttendanceForm teacher={teacherProfile} />;
}
