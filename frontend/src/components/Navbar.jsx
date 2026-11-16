import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import assets from "../assets/assets";
import { Appcontext } from "../context/Appcontext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { token, role } = useContext(Appcontext);
  return <header className="public-nav"><Link to="/" className="public-brand"><img src={assets.logo} alt="Nimar Academy" /></Link><button className="icon-button mobile-only" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={open ? "public-links is-open" : "public-links"} aria-label="School navigation">{[["/", "Home"], ["/about", "About"], ["/facilities", "Facilities"], ["/contact", "Contact"]].map(([to, title]) => <NavLink key={to} to={to} end onClick={() => setOpen(false)}>{title}</NavLink>)}<Link className="button" onClick={() => setOpen(false)} to={token && role ? `/${role}` : "/login"}>{token && role ? "My dashboard" : "School login"}</Link></nav></header>;
}
