import { BadgeCheck } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";
import { CONVENTIONS } from "../data/site.js";

export default function Conventions() {
  const { t, langue } = useLangue();

  return (
    <Section id="conventions">
      <h2 className="titre-section">{t.conventions.titre}</h2>
      <p className="sous-titre">{t.conventions.sous}</p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CONVENTIONS.map((c) => (
          <li key={c.fr} className="flex items-start gap-3 rounded-2xl border border-bord bg-white p-5 shadow-douce">
            <BadgeCheck size={20} className="mt-0.5 shrink-0 text-vert-fonce" aria-hidden="true" />
            <span className="text-sm font-medium leading-snug text-foret">{c[langue]}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
