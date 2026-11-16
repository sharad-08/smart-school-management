import { useState } from "react";
import useResource from "../../hooks/useResource";
import { PageHeader, ResourceState, EmptyState } from "../../components/portal/UI";

export default function StudentList() {
  const resource = useResource("/api/marks/students");
  const [query, setQuery] = useState("");
  const students = (resource.data?.students || []).filter((student) => `${student.Name} ${student.RollNumber}`.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeader eyebrow="Class records" title="My students" description="Students in your assigned class and section." /><label className="filter-label">Search students<input type="search" placeholder="Name or roll number" value={query} onChange={(event) => setQuery(event.target.value)} /></label><ResourceState {...resource}><section className="panel">{students.length ? <div className="table-wrap"><table><thead><tr><th>Roll</th><th>Name</th><th>Class</th><th>Parent / guardian</th><th>Contact</th></tr></thead><tbody>{students.map((student) => <tr key={student._id}><td>{student.RollNumber}</td><td>{student.Name}</td><td>{student.Class} · {student.Section}</td><td>{student.FatherName}</td><td>{student.FatherContact}</td></tr>)}</tbody></table></div> : <EmptyState title="No students found" description="Try another name or check your class assignment with the school." />}</section></ResourceState></>;
}
