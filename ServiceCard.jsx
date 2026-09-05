import { ArrowRight } from "lucide-react";

export default function ServiceCard({ Icone, titre, description, lienTexte, href = "#devis" }) {
  return (
    <article className="carte group flex flex-col">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-jaune-pale">
        <Icone size={22} strokeWidth={1.7} className="text-vert-fonce" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-titre text-lg font-semibold text-foret">{titre}</h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-encre-doux">{description}</p>
      <a
        href={href}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-vert-fonce"
      >
        {lienTexte}
        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </a>
    </article>
  );
}
