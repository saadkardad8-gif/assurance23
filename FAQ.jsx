import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";

export default function FAQ() {
  const { t } = useLangue();
  const [ouvert, setOuvert] = useState(0);

  return (
    <Section id="faq" fond="sable">
      <h2 className="titre-section">{t.faq.titre}</h2>
      <p className="sous-titre">{t.faq.sous}</p>

      <div className="mt-12 overflow-hidden rounded-xl2 border border-bord bg-white shadow-douce">
        {t.faq.liste.map(([question, reponse], i) => {
          const actif = ouvert === i;
          return (
            <div key={question} className={i ? "border-t border-bord" : ""}>
              <h3>
                <button
                  onClick={() => setOuvert(actif ? -1 : i)}
                  aria-expanded={actif}
                  aria-controls={"faq-" + i}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-start sm:px-8"
                >
                  <span className="font-titre text-base font-semibold text-foret">{question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-jaune-pale text-jaune-fonce">
                    {actif ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
              </h3>
              {actif && (
                <div id={"faq-" + i} className="px-6 pb-6 sm:px-8">
                  <p className="max-w-3xl text-sm leading-relaxed text-encre-doux">{reponse}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
