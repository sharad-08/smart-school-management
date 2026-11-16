import { useEffect, useState } from "react";

export default function SchoolClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(timer); }, []);
  return <time className="school-clock" dateTime={now.toISOString()} aria-label="Current date and time in India">
    <span>{now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric" })}</span>
    <strong>{now.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })} <small>IST</small></strong>
  </time>;
}
