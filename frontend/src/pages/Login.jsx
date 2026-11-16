import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, BookOpen } from "lucide-react";
import { Appcontext } from "../context/Appcontext";
import assets from "../assets/assets";
import SchoolClock from "../components/SchoolClock";
import api, { errorMessage } from "../api";

export default function Login() {
  const { setRole, setToken } = useContext(Appcontext);
  const navigate = useNavigate();
  const [role, chooseRole] = useState("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const { data } = role === "admin"
        ? await api.post("/api/admin/login", { email: id.trim(), password })
        : await api.post("/api/auth/login", { id: id.trim(), password, role });
      if (!data.success || !data.token) throw new Error(data.message || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      setRole(role);
      setToken(data.token);
      navigate(`/${role}`, { replace: true });
    } catch (failure) {
      setError(failure.response ? errorMessage(failure) : failure.message);
    } finally {
      setBusy(false);
    }
  }

  return <div className="login-page">
    <header className="login-header"><Link to="/" className="login-school"><img src={assets.logo} alt="Nimar Academy" /><span>Rahadkot, Madhya Pradesh</span></Link><SchoolClock /></header>
    <main className="login-shell">
    <section className="login-form-panel"><div className="login-card">
      <p className="eyebrow">School portal</p><h1>Welcome back</h1><p className="muted">Sign in to your school account.</p>
      <div className="role-picker" aria-label="Choose account type">{["student", "teacher", "admin"].map((value) => <button key={value} type="button" disabled={busy} aria-pressed={role === value} className={role === value ? "chosen" : ""} onClick={() => { chooseRole(value); setId(""); setPassword(""); setError(""); }}>{value}</button>)}</div>
      <form onSubmit={handleLogin}>
        <label htmlFor="school-id">{role === "admin" ? "Admin email" : `${role === "student" ? "Admission" : "Teacher"} ID`}</label>
        <input id="school-id" type={role === "admin" ? "email" : "text"} autoComplete="username" required value={id} onChange={(event) => setId(event.target.value)} disabled={busy} />
        <label htmlFor="school-password">Password</label>
        <div className="password-input"><input id="school-password" type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} disabled={busy} /><button type="button" className="icon-button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
        {error && <p className="inline-error" role="alert">{error}</p>}
        <button className="button login-submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}<ArrowRight size={18} /></button>
      </form>
      <p className="login-help">Need help signing in? Contact your school administrator to reset your password.</p>
      <Link to="/" className="text-link">← Back to school website</Link>
    </div></section>
    <aside className="login-photo"><img src={assets.building} alt="Nimar Academy school building" /><div><BookOpen size={24} /><h2>Nimar Academy</h2><p>Your timetable, attendance and results — all in one place.</p></div></aside>
    </main><footer className="login-footer">Nimar Academy · Student, teacher &amp; administrator access</footer>
  </div>;
}
