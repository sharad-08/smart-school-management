import { useState } from "react";
import { useStudentPortal } from "../../context/StudentPortalContext";
import { PageHeader, StatCard, EmptyState } from "../../components/portal/UI";

export default function StudentMarks() {
  const { data: { marks } } = useStudentPortal();
  const [exam, setExam] = useState("");
  const exams = [...new Set(marks.map((result) => result.examType))];
  const records = marks.filter((result) => !exam || result.examType === exam);
  const obtained = records.reduce((sum, result) => sum + result.marksObtained, 0);
  const total = records.reduce((sum, result) => sum + result.outOf, 0);
  return <><PageHeader eyebrow="Academic records" title="Examination results" description="Published marks from your subject teachers." /><label className="filter-label">Examination<select value={exam} onChange={(event) => setExam(event.target.value)}><option value="">All examinations</option>{exams.map((name) => <option key={name}>{name}</option>)}</select></label><div className="stats-grid"><StatCard label="Marks obtained" value={obtained} detail={`Out of ${total} published marks`} /><StatCard label="Percentage" value={total ? `${(obtained / total * 100).toFixed(1)}%` : "—"} detail="Across the selected results" /><StatCard label="Subject results" value={records.length} detail="Published by your teachers" /></div>
    <section className="panel">{records.length ? <div className="table-wrap"><table><thead><tr><th>Examination</th><th>Subject</th><th>Marks</th><th>Percentage</th></tr></thead><tbody>{records.map((result) => <tr key={result._id}><td>{result.examType}</td><td>{result.subject}</td><td>{result.marksObtained} / {result.outOf}</td><td>{result.outOf > 0 ? `${(result.marksObtained / result.outOf * 100).toFixed(1)}%` : "—"}</td></tr>)}</tbody></table></div> : <EmptyState title="Results not published yet" description="Results appear here after a teacher saves them." />}</section>
  </>;
}
