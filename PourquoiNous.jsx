import { MapPin, HandHeart, MessageSquareQuote, Zap } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";

const ICONES = [MapPin, HandHeart, MessageSquareQuote, Zap];

export default function PourquoiNous() {
  const { t } = useLangue();

  return (
    <Section id="pourquoi" fond="sable">
      <h2 className="titre-section">{t.pourquoi.titre}</h2>
      <p className="sous-titre">{t.pourquoi.sous}</p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.pourquoi.liste.map(([titre, texte], i) => {
          const Icone = ICONES[i];
          return (
            <article key={titre} className="carte">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-vert-pale">
                <Icone size={22} strokeWidth={1.7} className="text-foret" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-titre text-lg font-semibold text-foret">{titre}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-encre-doux">{texte}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
