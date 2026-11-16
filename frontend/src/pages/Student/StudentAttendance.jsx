import { useState } from "react";
import { useStudentPortal } from "../../context/StudentPortalContext";
import { PageHeader, StatCard, Badge, EmptyState, dateLabel } from "../../components/portal/UI";

export default function StudentAttendance() {
  const { data: { attendance } } = useStudentPortal();
  const [month, setMonth] = useState("");
  const records = attendance.filter((record) => !month || record.date.startsWith(month));
  const present = records.filter((record) => record.status === "Present").length;
  return <><PageHeader eyebrow="Your records" title="Attendance" description="Daily attendance recorded by your class teacher." /><label className="filter-label">Filter by month<input type="month" value={month} onChange={(event) => setMonth(event.target.value)} /></label>
    <div className="stats-grid"><StatCard label="Recorded days" value={records.length} detail="For the selected period" /><StatCard label="Present" value={present} detail={`${records.length - present} absent days`} /><StatCard label="Attendance rate" value={records.length ? `${Math.round(present / records.length * 100)}%` : "—"} detail="Calculated from recorded days" /></div>
    <section className="panel"><div className="panel-heading"><h2>Daily attendance</h2></div>{records.length ? <div className="table-wrap"><table><thead><tr><th>Date</th><th>Status</th></tr></thead><tbody>{records.map((record) => <tr key={record._id}><td>{dateLabel(record.date)}</td><td><Badge>{record.status}</Badge></td></tr>)}</tbody></table></div> : <EmptyState title="No attendance recorded" description="Try a different month or check again after your teacher records attendance." />}</section>
  </>;
}
