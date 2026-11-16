import { Link } from "react-router-dom";

export function PageHeader({ eyebrow, title, description, children }) {
  return <header className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description && <p className="muted">{description}</p>}</div><div className="heading-actions">{children}</div></header>;
}

export function ResourceState({ loading, error, reload, children }) {
  if (loading) return <div className="panel state-panel" role="status"><span className="spinner" />Loading your records…</div>;
  if (error) return <div className="panel state-panel" role="alert"><h2>We couldn’t load this page</h2><p className="muted">{error}</p><button className="button" onClick={reload}>Try again</button></div>;
  return children;
}

export function EmptyState({ title = "No records yet", description = "Your records will appear here when they are available." }) {
  return <div className="state-panel"><div className="empty-icon" aria-hidden="true">◇</div><h2>{title}</h2><p className="muted">{description}</p></div>;
}

export function StatCard({ label, value, detail }) {
  return <div className="panel stat-card"><p className="muted">{label}</p><strong>{value}</strong><p className="stat-detail">{detail}</p></div>;
}

export function Badge({ children }) {
  const positive = ["Active", "Paid", "Present"].includes(children);
  return <span className={`badge ${positive ? "badge-positive" : ""}`}>{children || "Not set"}</span>;
}

export function Timetable({ schedule = {} }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const slots = ["1st", "2nd", "3rd", "4th", "5th"];
  const populated = days.some((day) => slots.some((slot) => schedule[day]?.[slot]?.subject));
  if (!populated) return <EmptyState title="Timetable not published" description="Your school will publish the class timetable here." />;
  return <div className="table-wrap"><table><thead><tr><th>Day</th>{slots.map((slot) => <th key={slot}>{slot} period</th>)}</tr></thead><tbody>{days.map((day) => <tr key={day}><th>{day}</th>{slots.map((slot) => {
    const lesson = schedule[day]?.[slot];
    return <td key={slot}><strong>{lesson?.subject || "—"}</strong><small className="block muted">{lesson?.teacher || lesson?.class || ""}</small></td>;
  })}</tr>)}</tbody></table></div>;
}

export function QuickLink({ to, title, description }) {
  return <Link to={to} className="panel quick-link"><div><h3>{title}</h3><p className="muted">{description}</p></div><span aria-hidden="true">↗</span></Link>;
}

export const money = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(amount) || 0);
export const dateLabel = (date) => new Date(date).toLocaleDateString("en-IN", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" });
