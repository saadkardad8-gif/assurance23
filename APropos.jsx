import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";

export default function APropos() {
  const { t } = useLangue();

  return (
    <Section id="apropos">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="titre-section">{t.apropos.titre}</h2>
          <div className="mt-6 h-1 w-16 rounded-full bg-jaune" />
        </div>

        <div className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-encre">{t.apropos.p1}</p>
          <p className="mt-5 text-base leading-relaxed text-encre-doux">{t.apropos.p2}</p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-encre-tres">Agence</dt>
              <dd className="mt-1.5 text-sm font-semibold text-foret">{SITE.nom}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-encre-tres">Partenaire</dt>
              <dd className="mt-1.5 text-sm font-semibold text-foret">{SITE.partenaire}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-encre-tres">Zone</dt>
              <dd className="mt-1.5 text-sm font-semibold text-foret">{SITE.zone}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
