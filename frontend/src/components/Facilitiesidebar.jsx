import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const items = [
  ["Annual Function", "annual"], ["Sports", "sports"], ["Art Class", "art"],
  ["Science Labs", "labs"], ["Transport", "transport"], ["Library", "libraryPhotos"],
];

export default function Facilitiesidebar() {
  const [open, setOpen] = useState(false);
  const button = useRef(null), drawer = useRef(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", onResize);
    return () => media.removeEventListener("change", onResize);
  }, []);
  function close() { setOpen(false); button.current?.focus(); }
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawer.current?.querySelector("button")?.focus();
    function onKey(event) {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key !== "Tab") return;
      const nodes = drawer.current.querySelectorAll("button, a");
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", onKey); };
  }, [open]);

  return <>
    <div className="facilities-toolbar"><span>Explore our facilities</span><button ref={button} type="button" className="button button-secondary" aria-label="Open facilities menu" aria-controls="facilities-navigation" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={20} />Categories</button></div>
    {open && <button type="button" className="facilities-backdrop" aria-label="Close facilities menu" onClick={close} />}
    <aside ref={drawer} id="facilities-navigation" className={`facilities-sidebar ${open ? "is-open" : ""}`} role={open ? "dialog" : undefined} aria-modal={open ? true : undefined} aria-labelledby="facilities-title">
      <div className="facilities-sidebar-heading"><h2 id="facilities-title">Facilities</h2><button type="button" className="icon-button facilities-close" aria-label="Close facilities menu" onClick={close}><X size={22} /></button></div>
      <nav aria-label="Facility categories">{items.map(([label, path]) => <NavLink key={path} to={`/facilities/${path}`} onClick={close} className={({ isActive }) => isActive ? "facility-link selected" : "facility-link"}>{label}</NavLink>)}</nav>
      <p className="field-help">A closer look at life at Nimar Academy.</p>
    </aside>
  </>;
}
