import { Link } from "react-router-dom";
import assets from "../assets/assets";
export default function Banner() {
  return <section className="school-hero"><div><p className="eyebrow">Welcome to Nimar Academy</p><h1>A place to learn.<br />A future to build.</h1><p>Discover a school community that supports curiosity, learning and the potential in every student.</p><div className="hero-actions"><Link className="button" to="/facilities">Explore our school ↗</Link><Link className="button button-secondary" to="/login">Enter school portal</Link></div><div className="hero-footnote"><span>Learning</span><span>Community</span><span>Opportunity</span></div></div><div className="hero-photo"><img src={assets.group} alt="Students learning together at school" /><span>Nimar Academy · Rahadkot</span></div></section>;
}
