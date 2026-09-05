import { MapPin, Phone, MessageCircle, Mail } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";
import BoutonAppel from "./BoutonAppel.jsx";

export default function Footer() {
  const { t } = useLangue();

  const liens = [
    ["#accueil", t.nav.accueil],
    ["#assurances", t.nav.assurances],
    ["#apropos", t.nav.apropos],
    ["#faq", t.nav.faq],
    ["#contact", t.nav.contact],
  ];

  return (
    <footer className="bg-foret-fonce pt-16 pb-10 text-white">
      <div className="conteneur grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <img
            src="/logo-ahl-al-khair.png"
            alt={SITE.nom + " — " + SITE.partenaire}
            width={550} height={172}
            className="h-14 w-auto rounded-lg bg-white/95 px-3 py-2"
          />
          <p className="mt-5 text-xs leading-relaxed text-white/55">{SITE.agrement}</p>
          <p className="mt-1 text-xs leading-relaxed text-white/55">{SITE.loi}</p>
        </div>

        <nav aria-label={t.pied.liens}>
          <h2 className="font-titre text-sm font-semibold uppercase tracking-wider text-white/50">
            {t.pied.liens}
          </h2>
          <ul className="mt-5 space-y-3">
            {liens.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-sm text-white/75 transition-colors hover:text-white">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-titre text-sm font-semibold uppercase tracking-wider text-white/50">
            {t.pied.coordonnees}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span>{SITE.adresse}<br />{SITE.ville}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span className="flex flex-wrap gap-x-2 gap-y-1" dir="ltr">
                <BoutonAppel className="underline-offset-4 hover:underline">{SITE.telephone}</BoutonAppel>
                <span className="text-white/40">/</span>
                <BoutonAppel numero={SITE.mobile2} lien={SITE.mobile2Lien} className="underline-offset-4 hover:underline">
                  {SITE.mobile2}
                </BoutonAppel>
                <span className="text-white/40">/</span>
                <BoutonAppel numero={SITE.fixe} lien={SITE.fixeLien} className="underline-offset-4 hover:underline">
                  {SITE.fixe}
                </BoutonAppel>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" dir="ltr">{SITE.whatsappNumero}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              <a href={SITE.emailLien} dir="ltr" className="break-all">{SITE.email}</a>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
               aria-label="WhatsApp"
               className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10">
              <MessageCircle size={18} aria-hidden="true" />
            </a>
            <a href={SITE.maps} target="_blank" rel="noopener noreferrer"
               aria-label="Google Maps"
               className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10">
              <MapPin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="conteneur mt-12 border-t border-white/10 pt-7">
        <p className="text-xs text-white/45">
          © {SITE.annee} {SITE.nom}. {t.pied.droits}
        </p>
      </div>
    </footer>
  );
}
