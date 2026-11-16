import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Users, CalendarDays, BookOpen, UserRound, Wallet, Image, GraduationCap, MessageSquare, ShieldCheck } from "lucide-react";
import { Appcontext } from "../../context/Appcontext";
import assets from "../../assets/assets";

const navigation = {
  admin: [
    ["/admin", "Overview", LayoutDashboard], ["/admin/students", "Students", GraduationCap],
    ["/admin/add-student", "Add student", UserRound], ["/admin/teachers", "Teachers", Users],
    ["/admin/add-teacher", "Add teacher", UserRound], ["/admin/teacher-schedule", "Teacher schedules", CalendarDays],
    ["/admin/timetable", "Class timetable", BookOpen], ["/admin/uploadphotos", "Event photos", Image],
  ],
  teacher: [
    ["/teacher", "Overview", LayoutDashboard], ["/teacher/students", "My students", Users],
    ["/teacher/attendance", "Attendance", CalendarDays], ["/teacher/marks", "Marks", BookOpen],
    ["/teacher/messages", "Class messages", MessageSquare], ["/teacher/schedule", "My schedule", CalendarDays],
    ["/teacher/profile", "My profile", UserRound],
  ],
  student: [
    ["/student", "Overview", LayoutDashboard], ["/student/attendance", "Attendance", CalendarDays],
    ["/student/marks", "Results", BookOpen], ["/student/fees", "Fee details", Wallet],
    ["/student/teachers", "My teachers", Users], ["/student/timetable", "Timetable", CalendarDays],
    ["/student/profile", "My profile", UserRound],
  ],
};

export default function PortalLayout() {
  const { role, teacherProfile, studentProfile, logoutUser } = useContext(Appcontext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButton = useRef(null);
  const sidebar = useRef(null);
  const name = teacherProfile?.fullName || studentProfile?.Name || "Administrator";
  const photo = teacherProfile?.photo || studentProfile?.Profile;
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    sidebar.current?.querySelector("button")?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKey(event) {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
      if (event.key !== "Tab") return;
      const nodes = sidebar.current.querySelectorAll("a, button");
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return <div className="portal">
    <a href="#portal-content" className="skip-link">Skip to content</a>
    {open && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setOpen(false)} />}
    <aside ref={sidebar} className={`portal-sidebar ${open ? "is-open" : ""}`} aria-label="Portal navigation">
      <div className="sidebar-brand"><Link to={`/${role}`}><img src={assets.logo} alt="Nimar Academy" /></Link><button className="mobile-only icon-button" aria-label="Close navigation" onClick={() => { setOpen(false); menuButton.current?.focus(); }}><X size={20} /></button></div>
      <div className="sidebar-label">School workspace</div>
      <nav>{navigation[role].map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === `/${role}`} className={({ isActive }) => isActive ? "nav-item selected" : "nav-item"}><Icon size={19} /><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><ShieldCheck size={18} /><div><strong>Role-based access</strong><small>Your {role} workspace</small></div></div>
    </aside>
    <div className="portal-body">
      <header className="portal-topbar">
        <div className="topbar-title"><button ref={menuButton} className="mobile-only icon-button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={22} /></button><span className="role-tag">{role}</span><span className="desktop-date">{new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}</span></div>
        <div className="topbar-user">{photo ? <img className="avatar" src={photo} alt="" /> : <span className="avatar avatar-text">{name.slice(0, 1)}</span>}<span className="user-name">{name}</span><button className="icon-button" title="Sign out" aria-label="Sign out" onClick={logoutUser}><LogOut size={19} /></button></div>
      </header>
      <main id="portal-content" className="portal-content"><Outlet /></main>
      <footer className="portal-footer">© {new Date().getFullYear()} Nimar Academy · School portal</footer>
    </div>
  </div>;
}
