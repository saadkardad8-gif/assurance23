import { Car, Bike, Home, Users, Briefcase } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";

// Composition visuelle des univers couverts, construite en SVG/CSS
// plutot qu'en image lourde : nette sur tout ecran, chargement instantane.
export default function HeroVisuel() {
  const { t } = useLangue();

  const univers = [
    { Icone: Car, label: t.services.liste[0][0], taille: "grand" },
    { Icone: Bike, label: t.services.liste[3][0] },
    { Icone: Home, label: t.services.liste[1][0] },
    { Icone: Users, label: t.services.liste[2][0] },
    { Icone: Briefcase, label: t.services.liste[4][0] },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-jaune-pale via-white to-vert-pale" />
      <div className="rounded-[2rem] border border-bord bg-white p-6 shadow-relief sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-encre-tres">
          {t.hero.couverture}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {univers.map(({ Icone, label, taille }, i) => (
            <div
              key={label}
              className={
                "flex flex-col justify-between rounded-2xl p-4 " +
                (taille === "grand"
                  ? "col-span-2 bg-foret text-white sm:row-span-2 sm:min-h-[11rem]"
                  : "border border-bord bg-sable text-foret")
              }
            >
              <Icone
                size={taille === "grand" ? 34 : 24}
                strokeWidth={1.6}
                className={taille === "grand" ? "text-jaune" : "text-vert-fonce"}
                aria-hidden="true"
              />
              <span className={"mt-6 text-sm font-semibold leading-snug " + (taille === "grand" ? "" : "mt-4 text-xs")}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
