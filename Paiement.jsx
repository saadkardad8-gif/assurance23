import { Banknote, FileCheck, Landmark, CalendarClock, Info } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";
import { PAIEMENTS_VISIBLES } from "../data/site.js";

const ICONES = { Banknote, FileCheck, Landmark, CalendarClock };

export default function Paiement() {
  const { t, langue } = useLangue();

  return (
    <Section id="paiement">
      <h2 className="titre-section">{t.paiement.titre}</h2>
      <p className="sous-titre">{t.paiement.sous}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {PAIEMENTS_VISIBLES.map((m) => {
          const Icone = ICONES[m.icone] || Banknote;
          const principal = m.id === "especes";
          return (
            <article
              key={m.id}
              className={"rounded-xl2 p-6 shadow-douce " +
                (principal ? "border-2 border-vert bg-vert-pale" : "border border-bord bg-white")}
            >
              <span className={"flex h-12 w-12 items-center justify-center rounded-2xl " +
                (principal ? "bg-white" : "bg-jaune-pale")}>
                <Icone size={22} strokeWidth={1.7} className="text-vert-fonce" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-titre text-base font-semibold text-foret">{m.titre[langue]}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-encre-doux">{m.texte[langue]}</p>
            </article>
          );
        })}
      </div>

      <p className="mt-6 flex items-start gap-3 rounded-2xl border border-bord bg-sable p-5 text-sm leading-relaxed text-encre-doux">
        <Info size={18} className="mt-0.5 shrink-0 text-vert-fonce" aria-hidden="true" />
        {t.paiement.note}
      </p>
    </Section>
  );
}
