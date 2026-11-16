import { useStudentPortal } from "../../context/StudentPortalContext";
import { PageHeader, Badge, money } from "../../components/portal/UI";

export default function StudentFee() {
  const { data: { student } } = useStudentPortal();
  const fields = [["AdmissionFee", "Admission fee"], ["TuitionFee", "Tuition fee"], ["TransportFee", "Transport fee"], ["HostelFee", "Hostel fee"]];
  const total = fields.reduce((sum, [field]) => sum + (Number(student[field]) || 0), 0);
  return <><PageHeader eyebrow="School account" title="Fee details" description="Amounts and overall fee status recorded by the school administration." /><section className="panel"><div className="panel-heading"><div><h2>{student.Name}</h2><p className="muted">{student.AdmissionID} · Session {student.Session}</p></div><Badge>{student.FeeStatus}</Badge></div><div className="table-wrap"><table><thead><tr><th>Fee category</th><th>Recorded amount</th></tr></thead><tbody>{fields.map(([field, label]) => <tr key={field}><td>{label}</td><td>{money(student[field])}</td></tr>)}<tr><th>Total recorded fees</th><th>{money(total)}</th></tr></tbody></table></div><p className="panel-note">For payments, receipts or fee corrections, contact the school office.</p></section></>;
}
