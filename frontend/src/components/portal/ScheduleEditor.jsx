import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useResource from "../../hooks/useResource";
import api, { errorMessage } from "../../api";
import { PageHeader, ResourceState, EmptyState } from "./UI";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const slots = ["1st", "2nd", "3rd", "4th", "5th"];

function Editor({ selection, type, teachers, classes }) {
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const url = type === "class" ? `/api/classtimetable/${encodeURIComponent(selection)}` : `/api/teacher-timetable/${encodeURIComponent(selection.teacherId)}`;
    setLoading(true);
    api.get(url, { signal: controller.signal }).then(({ data }) => {
      setSchedule(data.schedule || {});
      setError("");
    }).catch((failure) => {
      if (controller.signal.aborted) return;
      if (failure.response?.status === 404) { setSchedule({}); setError(""); }
      else setError(errorMessage(failure));
    }).finally(() => {
      if (!controller.signal.aborted) setLoading(false);
    });
    return () => controller.abort();
  }, [selection, type, version]);

  function edit(day, slot, field, value) {
    setSchedule((previous) => ({
      ...previous,
      [day]: { ...previous[day], [slot]: { ...previous[day]?.[slot], [field]: value } },
    }));
  }
  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const cleaned = Object.fromEntries(days.map((day) => [day,
        Object.fromEntries(slots.map((slot) => [slot, {
          subject: schedule[day]?.[slot]?.subject || "",
          [type === "class" ? "teacher" : "class"]: schedule[day]?.[slot]?.[type === "class" ? "teacher" : "class"] || "",
        }]))
      ]));
      if (type === "class") await api.post("/api/classtimetable/save", { className: selection, schedule: cleaned });
      else await api.post("/api/teacher-timetable", { teacherId: selection._id, scheduleData: cleaned });
      toast.success("Timetable saved");
    } catch (failure) { setError(errorMessage(failure)); }
    finally { setBusy(false); }
  }

  return <ResourceState loading={loading} error={error && !busy ? error : ""} reload={() => { setError(""); setVersion(version + 1); }}><section className="panel"><form onSubmit={save}><fieldset disabled={busy}><div className="table-wrap"><table><thead><tr><th>Day</th>{slots.map((slot) => <th key={slot}>{slot} period</th>)}</tr></thead><tbody>{days.map((day) => <tr key={day}><th>{day}</th>{slots.map((slot) => <td key={slot} style={{ minWidth: 175 }}><input aria-label={`${day} ${slot} subject`} placeholder="Subject" maxLength={80} value={schedule[day]?.[slot]?.subject || ""} onChange={(event) => edit(day, slot, "subject", event.target.value)} /><select aria-label={`${day} ${slot} ${type === "class" ? "teacher" : "class"}`} style={{ marginTop: 8 }} value={schedule[day]?.[slot]?.[type === "class" ? "teacher" : "class"] || ""} onChange={(event) => edit(day, slot, type === "class" ? "teacher" : "class", event.target.value)}><option value="">Unassigned</option>{type === "class" ? [...new Set([...teachers.map((teacher) => teacher.fullName), schedule[day]?.[slot]?.teacher].filter(Boolean))].map((name) => <option key={name}>{name}</option>) : [...new Set([...classes, schedule[day]?.[slot]?.class].filter(Boolean))].map((name) => <option key={name}>{name}</option>)}</select></td>)}</tr>)}</tbody></table></div></fieldset><div className="panel-heading"><p className="muted">Review assignments before saving.</p><button className="button" disabled={busy}>{busy ? "Saving…" : "Save timetable"}</button></div></form></section></ResourceState>;
}

export default function ScheduleEditor({ type }) {
  const students = useResource("/api/admin/studentsdata");
  const teachers = useResource("/api/admin/teachersdata");
  const [selected, setSelected] = useState("");
  const teacherRecords = teachers.data?.teachers || [];
  const classes = [...new Set((students.data?.students || []).map((student) => student.Class))].sort();
  const selection = type === "class" ? selected : teacherRecords.find((teacher) => teacher._id === selected);
  return <><PageHeader eyebrow="Academic planning" title={type === "class" ? "Class timetable" : "Teacher schedules"} description="Create and update weekly assignments from school records." /><ResourceState loading={students.loading || teachers.loading} error={students.error || teachers.error} reload={() => { students.reload(); teachers.reload(); }}><label className="filter-label">{type === "class" ? "Choose a class" : "Choose a teacher"}<select value={selected} onChange={(event) => setSelected(event.target.value)}><option value="">Select…</option>{type === "class" ? classes.map((name) => <option key={name}>{name}</option>) : teacherRecords.map((teacher) => <option value={teacher._id} key={teacher._id}>{teacher.fullName} · {teacher.teacherId}</option>)}</select></label>{selection ? <Editor key={selected} selection={selection} type={type} teachers={teacherRecords} classes={classes} /> : <section className="panel"><EmptyState title={type === "class" ? "Choose a class to begin" : "Choose a teacher to begin"} description="Saved assignments will load automatically." /></section>}</ResourceState></>;
}
