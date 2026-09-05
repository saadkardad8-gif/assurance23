import { MapPin, Handshake, Phone, ArrowRight } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";
import BoutonAppel from "./BoutonAppel.jsx";

const ICONES = [MapPin, Handshake, Phone];

export default function AgenceLocale() {
  const { t } = useLangue();

  return (
    <Section fond="foret">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-titre text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {t.agence.titre}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            {t.agence.texte}
          </p>
          <a
            href={SITE.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fantome mt-8"
          >
            {t.agence.bouton}
            <ArrowRight size={16} className="rtl:rotate-180" />
          </a>
        </div>

        <ul className="space-y-3">
          {t.agence.points.map(([valeur, legende], i) => {
            const Icone = ICONES[i];
            return (
              <li
                key={valeur}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Icone size={20} strokeWidth={1.7} className="text-jaune" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-semibold text-white">{valeur}</span>
                  <span className="block text-xs text-white/55">{legende}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
