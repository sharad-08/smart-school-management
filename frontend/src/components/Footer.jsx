import { Link } from "react-router-dom";
export default function Footer() {
  return <footer className="school-footer"><div><h2>Nimar Academy</h2><p>Learning, growing and building a future together.</p><p>Rahadkot, Madhya Pradesh · PIN 451113</p></div><nav aria-label="Footer"><Link to="/about">About the school</Link><Link to="/facilities">Our facilities</Link><Link to="/contact">Contact us</Link><Link to="/login">School portal</Link></nav><p>© {new Date().getFullYear()} Nimar Academy</p></footer>;
}
