import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Appcontext } from "../../context/Appcontext";
import useResource from "../../hooks/useResource";
import api, { errorMessage } from "../../api";
import { PageHeader, ResourceState, EmptyState } from "../../components/portal/UI";

function ExamForm({ exam, students, readOnly }) {
  const resource = useResource(`/api/marks/exam/${encodeURIComponent(exam)}`);
  const [values, setValues] = useState({});
  const [outOf, setOutOf] = useState(100);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const marks = resource.data?.marks || [];
    setValues(Object.fromEntries(marks.map((item) => [item.student, item.marksObtained])));
    setOutOf(marks[0]?.outOf ?? 100);
  }, [resource.data]);

  async function save(event) {
    event.preventDefault();
    if (readOnly) return;
    setBusy(true);
    setError("");
    try {
      const marksArray = students.map((student) => ({ studentId: student._id, marks: Number(values[student._id]) }));
      await api.post("/api/marks/save", { examType: exam, outOf: Number(outOf), marksArray });
      toast.success("Marks published to student accounts");
      resource.reload();
    } catch (failure) { setError(errorMessage(failure)); }
    finally { setBusy(false); }
  }

  return <ResourceState {...resource}><section className="panel"><form onSubmit={save}><div className="panel-heading"><h2>{exam} results</h2><label>Maximum marks<input aria-label="Maximum marks" required type="number" min="1" max="10000" value={outOf} disabled={busy || readOnly} onChange={(event) => setOutOf(event.target.value)} /></label></div><div className="table-wrap"><table><thead><tr><th>Student</th><th>Roll number</th><th>Marks obtained</th></tr></thead><tbody>{students.map((student) => <tr key={student._id}><td>{student.Name}</td><td>{student.RollNumber}</td><td><input aria-label={`Marks for ${student.Name}`} required type="number" min="0" max={outOf} step="any" disabled={busy || readOnly} value={values[student._id] ?? ""} onChange={(event) => setValues({ ...values, [student._id]: event.target.value })} /></td></tr>)}</tbody></table></div>{error && <p className="inline-error" role="alert">{error}</p>}<div className="panel-heading"><p className="muted">Saved marks appear in students’ Results pages.</p><button className="button" disabled={busy || readOnly}>{busy ? "Publishing…" : "Publish marks"}</button></div></form></section></ResourceState>;
}

export default function MarksEntry() {
  const { teacherProfile, teacherReadOnly } = useContext(Appcontext);
  const students = useResource("/api/marks/students");
  const [exam, setExam] = useState("Midterm");
  return <><PageHeader eyebrow={teacherProfile.subject} title="Enter marks" description="Publish subject results for your assigned class." /><label className="filter-label">Examination<select value={exam} onChange={(event) => setExam(event.target.value)}>{["Midterm", "Final", "Quiz"].map((name) => <option key={name}>{name}</option>)}</select></label><ResourceState {...students}>{students.data?.students?.length ? <ExamForm key={exam} exam={exam} readOnly={teacherReadOnly} students={students.data.students} /> : <div className="panel"><EmptyState title="No students assigned" description="Ask the school administrator to check your class and section." /></div>}</ResourceState></>;
}
