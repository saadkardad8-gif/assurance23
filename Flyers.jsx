import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";
import { FLYERS } from "../data/site.js";

export default function Flyers() {
  const { t, langue } = useLangue();
  const [actif, setActif] = useState(null);

  const suivant = (pas) =>
    setActif((i) => (i === null ? null : (i + pas + FLYERS.length) % FLYERS.length));

  useEffect(() => {
    if (actif === null) return;
    const clavier = (e) => {
      if (e.key === "Escape") setActif(null);
      if (e.key === "ArrowRight") suivant(1);
      if (e.key === "ArrowLeft") suivant(-1);
    };
    document.addEventListener("keydown", clavier);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", clavier);
      document.body.style.overflow = "";
    };
  }, [actif]);

  return (
    <Section id="publications" fond="sable">
      <h2 className="titre-section">{t.flyers.titre}</h2>
      <p className="sous-titre">{t.flyers.sous}</p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FLYERS.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActif(i)}
            className="group overflow-hidden rounded-xl2 border border-bord bg-white text-start shadow-douce transition-shadow hover:shadow-relief"
          >
            <span className="block overflow-hidden bg-sable-fonce">
              <img
                src={`/flyers/${f.fichier}-min.jpg`}
                alt={f.titre[langue]}
                loading="lazy"
                width={640}
                height={960}
                className="h-64 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </span>
            <span className="block p-5">
              <span className="block font-titre text-base font-semibold text-foret">{f.titre[langue]}</span>
              <span className="mt-2 block text-sm leading-relaxed text-encre-doux">{f.texte[langue]}</span>
              <span className="mt-4 block text-sm font-semibold text-vert-fonce">{t.flyers.agrandir}</span>
            </span>
          </button>
        ))}
      </div>

      {actif !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={FLYERS[actif].titre[langue]}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-foret-fonce/95 p-4"
          onClick={() => setActif(null)}
        >
          <button
            onClick={() => setActif(null)}
            aria-label={t.flyers.fermer}
            className="absolute end-5 top-5 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); suivant(-1); }}
            aria-label={t.flyers.precedent}
            className="absolute start-3 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:start-6"
          >
            <ChevronLeft size={22} className="rtl:rotate-180" aria-hidden="true" />
          </button>

          <figure onClick={(e) => e.stopPropagation()} className="max-h-full">
            <img
              src={`/flyers/${FLYERS[actif].fichier}.jpg`}
              alt={FLYERS[actif].titre[langue]}
              className="mx-auto max-h-[78vh] w-auto rounded-xl shadow-relief"
            />
            <figcaption className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-4 text-center">
              <span className="text-sm text-white/80">{FLYERS[actif].titre[langue]}</span>
              <a
                href={`/flyers/${FLYERS[actif].fichier}.jpg`}
                download
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Download size={14} aria-hidden="true" /> {t.flyers.telecharger}
              </a>
            </figcaption>
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); suivant(1); }}
            aria-label={t.flyers.suivant}
            className="absolute end-3 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:end-6"
          >
            <ChevronRight size={22} className="rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>
      )}
    </Section>
  );
}
