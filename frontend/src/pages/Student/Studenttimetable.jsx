import { useStudentPortal } from "../../context/StudentPortalContext";
import { PageHeader, Timetable } from "../../components/portal/UI";

export default function StudentTimetable() {
  const { data: { student, timetable } } = useStudentPortal();
  return <><PageHeader eyebrow="Your school week" title="Class timetable" description={`Published schedule for class ${student.Class}.`} /><section className="panel"><Timetable schedule={timetable} /></section></>;
}
