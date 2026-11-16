import { useContext } from "react";
import { Appcontext } from "../../context/Appcontext";
import useResource from "../../hooks/useResource";
import { PageHeader, ResourceState, Timetable } from "../../components/portal/UI";

export default function TeacherSchedule() {
  const { teacherProfile } = useContext(Appcontext);
  const resource = useResource(`/api/teacher-timetable/${encodeURIComponent(teacherProfile.teacherId)}`);
  return <><PageHeader eyebrow="Your school week" title="Teaching schedule" description="Your weekly periods and class assignments." /><ResourceState {...resource}><section className="panel"><Timetable schedule={resource.data?.schedule || {}} /></section></ResourceState></>;
}
