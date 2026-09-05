import { MapPin, Navigation, ExternalLink } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";

export default function Localisation() {
  const { t } = useLangue();

  return (
    <Section id="localisation">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="titre-section">{t.localisation.titre}</h2>
          <p className="mt-3 flex items-center gap-2 text-base text-encre-doux">
            <MapPin size={17} className="text-vert-fonce" aria-hidden="true" />
            {t.localisation.sous}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="btn-primaire">
            {t.localisation.maps} <ExternalLink size={15} />
          </a>
          <a href={SITE.itineraire} target="_blank" rel="noopener noreferrer" className="btn-contour">
            {t.localisation.itineraire} <Navigation size={15} />
          </a>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-xl2 border border-bord shadow-relief">
        <iframe
          title={t.localisation.carte}
          src={SITE.mapsIframe}
          className="h-[26rem] w-full border-0 sm:h-[30rem]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
