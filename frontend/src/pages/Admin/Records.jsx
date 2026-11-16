import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import api, { errorMessage } from "../../api";
import useResource from "../../hooks/useResource";
import { PageHeader, ResourceState, EmptyState, Badge } from "../../components/portal/UI";

const definitions = {
  students: {
    title: "Students", list: "studentsdata", key: "students", id: "AdmissionID", name: "Name",
    classKey: "Class", status: "Status", add: "/admin/add-student", update: "update-student",
    fields: ["Name", "RollNumber", "Class", "Section", "Session", "Status", "FeeStatus", "Parentemail", "FatherContact", "MotherContact", "EmergencyNumber"],
    password: "Password",
  },
  teachers: {
    title: "Teachers", list: "teachersdata", key: "teachers", id: "teacherId", name: "fullName",
    classKey: "className", status: "status", add: "/admin/add-teacher", update: "update-teacher",
    fields: ["fullName", "email", "contact", "department", "subject", "qualification", "experience", "className", "section", "classTeacher", "status"],
    password: "password",
  },
};
const label = (field) => field.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase());

function exportRecords(records, config) {
  const fields = [config.id, ...config.fields];
  const cell = (value) => {
    let text = String(value ?? "");
    if (/^[\s]*[=+@-]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  const rows = [fields.map(label), ...records.map((record) => fields.map((field) => record[field]))];
  const url = URL.createObjectURL(new Blob(["\uFEFF" + rows.map((row) => row.map(cell).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${config.key}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function RecordDialog({ record, config, editing, close, saved }) {
  const [form, setForm] = useState(() => Object.fromEntries(config.fields.map((field) => [field, record[field] ?? ""])));
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    dialog.current.querySelector("button, input")?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function keydown(event) {
      if (event.key === "Escape" && !busy) close();
      if (event.key !== "Tab") return;
      const nodes = dialog.current.querySelectorAll("button:not(:disabled), input:not(:disabled), select:not(:disabled)");
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", keydown);
      previous?.focus();
    };
  }, [close, busy]);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload = { ...form };
      if (password) payload[config.password] = password;
      const { data } = await api.put(`/api/admin/${config.update}/${record._id}`, payload);
      if (!data.success) throw new Error(data.message);
      toast.success("Record updated");
      saved();
    } catch (failure) {
      setError(failure.response ? errorMessage(failure) : failure.message);
    } finally { setBusy(false); }
  }

  return <div className="modal-backdrop"><section ref={dialog} role="dialog" aria-modal="true" aria-labelledby="record-title" className="record-dialog"><div className="panel-heading"><div><p className="eyebrow">{record[config.id]}</p><h2 id="record-title">{editing ? "Edit record" : record[config.name]}</h2></div><button className="icon-button" aria-label="Close record" disabled={busy} onClick={close}>✕</button></div><form onSubmit={submit}><fieldset disabled={busy || !editing}><div className="form-grid">{config.fields.map((field) => <label key={field} htmlFor={field}>{label(field)}{["Status", "status"].includes(field) ? <select id={field} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })}><option>Active</option><option>Inactive</option></select> : field === "classTeacher" ? <select id={field} value={String(form[field])} onChange={(event) => setForm({ ...form, [field]: event.target.value === "true" })}><option value="">Not assigned</option><option value="true">Yes</option><option value="false">No</option></select> : <input id={field} value={form[field]} required={field === config.name} type={field.toLowerCase().includes("email") ? "email" : field === "experience" ? "number" : "text"} min={field === "experience" ? 0 : undefined} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />}</label>)}</div>{editing && <label htmlFor="reset-password" className="reset-password">Reset password (optional)<input id="reset-password" type="password" autoComplete="new-password" minLength={12} maxLength={72} value={password} onChange={(event) => setPassword(event.target.value)} /><small className="muted">Leave empty to keep the existing password.</small></label>}</fieldset>{error && <p className="inline-error" role="alert">{error}</p>}<div className="modal-actions"><button type="button" className="button button-secondary" disabled={busy} onClick={close}>Close</button>{editing && <button className="button" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button>}</div></form></section></div>;
}

export default function Records({ type }) {
  const config = definitions[type];
  const resource = useResource(`/api/admin/${config.list}`);
  const [query, setQuery] = useState("");
  const [className, setClassName] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState(null);
  const records = resource.data?.[config.key] || [];
  const filtered = records.filter((record) => {
    const text = [record[config.name], record[config.id], record.RollNumber, record.subject].join(" ").toLowerCase();
    return text.includes(query.toLowerCase()) && (!className || record[config.classKey] === className) && (!status || record[config.status] === status);
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / 10));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice((currentPage - 1) * 10, currentPage * 10);

  return <><PageHeader eyebrow="Administration" title={config.title} description="Find records, update details and manage class assignments."><button className="button button-secondary" disabled={!filtered.length} onClick={() => exportRecords(filtered, config)}>Export CSV</button><Link className="button" to={config.add}>Add {type === "students" ? "student" : "teacher"}</Link></PageHeader><ResourceState {...resource}><section className="panel"><div className="record-filters"><label>Search<input type="search" placeholder="Name, ID, roll or subject" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} /></label><label>Class<select value={className} onChange={(event) => { setClassName(event.target.value); setPage(1); }}><option value="">All classes</option>{[...new Set(records.map((record) => record[config.classKey]).filter(Boolean))].sort().map((value) => <option key={value}>{value}</option>)}</select></label><label>Status<select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option value="">All statuses</option>{[...new Set(records.map((record) => record[config.status]).filter(Boolean))].sort().map((value) => <option key={value}>{value}</option>)}</select></label></div>{rows.length ? <><div className="table-wrap"><table><thead><tr><th>Name</th><th>School ID</th><th>Class</th><th>{type === "students" ? "Fee status" : "Subject"}</th><th>Status</th><th>Actions</th></tr></thead><tbody>{rows.map((record) => <tr key={record._id}><td><strong>{record[config.name]}</strong></td><td>{record[config.id]}</td><td>{record[config.classKey] || "—"} {record.Section || record.section}</td><td>{record.FeeStatus || record.subject || "—"}</td><td><Badge>{record[config.status]}</Badge></td><td><div className="row-actions"><button onClick={() => setDialog({ record, editing: false })}>View</button><button onClick={() => setDialog({ record, editing: true })}>Edit</button></div></td></tr>)}</tbody></table></div><div className="pagination"><p className="muted">{filtered.length} matching records · Page {currentPage} of {totalPages}</p><div><button className="button button-secondary" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>Previous</button><button className="button button-secondary" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>Next</button></div></div></> : <EmptyState title="No matching records" description="Try another search or add a new record." />}</section></ResourceState>{dialog && <RecordDialog {...dialog} config={config} close={() => setDialog(null)} saved={() => { setDialog(null); resource.reload(); }} />}</>;
}
