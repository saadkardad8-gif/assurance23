import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";
import HeroVisuel from "./HeroVisuel.jsx";

export default function Hero() {
  const { t } = useLangue();

  return (
    <section id="accueil" className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-36 sm:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-jaune-pale blur-3xl"
      />
      <div className="conteneur relative grid items-center gap-14 lg:grid-cols-2">
        <div className="animate-apparition">
          <div className="flex flex-wrap gap-2">
            <span className="etiquette"><ShieldCheck size={14} className="text-jaune-fonce" /> {t.hero.badge}</span>
            <span className="etiquette"><MapPin size={14} className="text-vert-fonce" /> {t.hero.lieu}</span>
          </div>

          <h1 className="mt-7 font-titre text-4xl font-bold leading-[1.08] text-foret sm:text-5xl lg:text-[3.4rem]">
            {t.hero.titre1}
            <span className="relative inline-block text-vert-fonce">
              {t.hero.titre2}
              <span aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-2 rounded-full bg-jaune/60" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-encre-doux sm:text-lg">
            {t.hero.sous}
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#devis" className="btn-primaire">{t.hero.devis} <ArrowRight size={16} /></a>
            <a href="#contact" className="btn-contour">{t.hero.contact}</a>
          </div>
        </div>

        <HeroVisuel />
      </div>
    </section>
  );
}
