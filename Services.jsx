import { Car, Home, HeartPulse, ShieldAlert, Briefcase, Plane } from "lucide-react";
import Section from "./Section.jsx";
import ServiceCard from "./ServiceCard.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";

const ICONES = [Car, Home, HeartPulse, ShieldAlert, Briefcase, Plane];

export default function Services() {
  const { t } = useLangue();

  return (
    <Section id="assurances" fond="sable">
      <h2 className="titre-section">{t.services.titre}</h2>
      <p className="sous-titre">{t.services.sous}</p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.services.liste.map(([titre, description], i) => (
          <ServiceCard
            key={titre}
            Icone={ICONES[i]}
            titre={titre}
            description={description}
            lienTexte={t.services.plus}
          />
        ))}
      </div>
    </Section>
  );
}
