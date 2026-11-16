import { FlaskConical, Monitor, Library, Trophy, Palette, Music, Bus, Utensils } from "lucide-react";

const facilities = [
  ["Science labs", "Practical learning in Physics, Chemistry and Biology.", FlaskConical],
  ["Computer lab", "A space to learn computing and explore technology.", Monitor],
  ["Library", "Books and reading resources for our students.", Library],
  ["Sports", "Time and space for games, practice and teamwork.", Trophy],
  ["Art room", "Drawing, painting and craft activities.", Palette],
  ["Music", "A place for students to practise and perform.", Music],
  ["Transport", "School bus services for the daily journey.", Bus],
  ["Cafeteria", "A shared space for meals and breaks.", Utensils],
];

export default function FacilitiesC() {
  return <section className="school-facilities" aria-labelledby="school-facilities-title">
    <h2 id="school-facilities-title">Around our school</h2>
    <p className="muted">Spaces for learning, activities and everyday school life.</p>
    <div className="facilities-grid">{facilities.map(([name, description, Icon]) => <article key={name} className="facility-card">
      <Icon size={25} aria-hidden="true" /><h3>{name}</h3><p>{description}</p>
    </article>)}</div>
  </section>;
}
