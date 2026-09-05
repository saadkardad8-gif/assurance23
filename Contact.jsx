import { Phone, MessageCircle, MapPin, ExternalLink, Mail } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";
import BoutonAppel from "./BoutonAppel.jsx";

export default function Contact() {
  const { t } = useLangue();

  return (
    <Section id="contact" fond="sable">
      <h2 className="titre-section">{t.contact.titre}</h2>
      <p className="sous-titre">{t.contact.sous}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl2 border border-bord bg-white p-8 shadow-douce">
          <p className="font-titre text-xl font-semibold text-foret">{SITE.nom}</p>
          <p className="mt-1 text-lg text-vert-fonce" lang="ar" dir="rtl">{SITE.nomAr}</p>
          <p className="mt-3 text-sm text-encre-doux">{SITE.partenaire}</p>

          <dl className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <MapPin size={19} className="mt-0.5 shrink-0 text-vert-fonce" aria-hidden="true" />
              <dd className="text-sm leading-relaxed text-encre">
                {SITE.adresse}<br />{SITE.ville}, {SITE.pays}
              </dd>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={19} className="mt-0.5 shrink-0 text-vert-fonce" aria-hidden="true" />
              <dd className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-encre" dir="ltr">
                <BoutonAppel className="font-medium underline-offset-4 hover:underline">{SITE.telephone}</BoutonAppel>
                <span className="text-encre-tres">/</span>
                <BoutonAppel numero={SITE.mobile2} lien={SITE.mobile2Lien} className="underline-offset-4 hover:underline">
                  {SITE.mobile2}
                </BoutonAppel>
                <span className="text-encre-tres">/</span>
                <BoutonAppel numero={SITE.fixe} lien={SITE.fixeLien} className="underline-offset-4 hover:underline">
                  {SITE.fixe}
                </BoutonAppel>
              </dd>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={19} className="mt-0.5 shrink-0 text-vert-fonce" aria-hidden="true" />
              <dd className="break-all text-sm text-encre" dir="ltr">
                <a href={SITE.emailLien} className="underline-offset-4 hover:underline">{SITE.email}</a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-4 sm:grid-cols-1">
          <BoutonAppel className="flex items-center justify-between gap-4 rounded-xl2 bg-vert p-7 text-white transition-colors hover:bg-vert-fonce">
            <span className="flex items-center gap-4">
              <Phone size={22} aria-hidden="true" />
              <span className="text-base font-semibold">{t.contact.appeler}</span>
            </span>
            <span className="text-sm text-white/70" dir="ltr">{SITE.telephone}</span>
          </BoutonAppel>

          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
             className="flex items-center justify-between gap-4 rounded-xl2 bg-foret p-7 text-white transition-colors hover:bg-foret-fonce">
            <span className="flex items-center gap-4">
              <MessageCircle size={22} aria-hidden="true" />
              <span className="text-base font-semibold">{t.contact.whatsapp}</span>
            </span>
            <span className="text-sm text-white/70" dir="ltr">{SITE.whatsappNumero}</span>
          </a>

          <a href={SITE.maps} target="_blank" rel="noopener noreferrer"
             className="flex items-center justify-between gap-4 rounded-xl2 border border-bord bg-white p-7 text-foret transition-colors hover:border-vert">
            <span className="flex items-center gap-4">
              <MapPin size={22} className="text-vert-fonce" aria-hidden="true" />
              <span className="text-base font-semibold">{t.contact.maps}</span>
            </span>
            <ExternalLink size={16} className="text-encre-tres" />
          </a>
        </div>
      </div>
    </Section>
  );
}
