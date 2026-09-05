import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Globe, LogIn } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";
import BoutonAppel from "./BoutonAppel.jsx";

export default function Navbar() {
  const { t, langue, basculer } = useLangue();
  const [ouvert, setOuvert] = useState(false);
  const [colle, setColle] = useState(false);

  useEffect(() => {
    const onScroll = () => setColle(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [ouvert]);

  const liens = [
    ["#accueil", t.nav.accueil],
    ["#assurances", t.nav.assurances],
    ["#apropos", t.nav.apropos],
    ["#publications", t.nav.publications],
    ["#paiement", t.nav.paiement],
    ["#faq", t.nav.faq],
    ["#contact", t.nav.contact],
  ];

  return (
    <header
      className={"fixed inset-x-0 top-0 z-50 transition-shadow duration-300 " +
        (colle ? "bg-white/95 shadow-douce backdrop-blur" : "bg-white")}
    >
      <div className="conteneur flex h-20 items-center justify-between gap-3">
        <a href="#accueil" className="shrink-0">
          <img
            src="/logo-ahl-al-khair.png"
            alt={SITE.nom + " — " + SITE.partenaire}
            width={550} height={172}
            className="h-11 w-auto sm:h-12 xl:h-14"
          />
        </a>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
          {liens.map(([href, label]) => (
            <a key={href} href={href} className="text-sm font-medium text-encre-doux transition-colors hover:text-vert-fonce">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <button
            onClick={basculer}
            className="flex items-center gap-1.5 rounded-full border border-bord px-3 py-2 text-xs font-semibold text-foret"
            aria-label={langue === "fr" ? "Passer en arabe" : "التبديل إلى الفرنسية"}
          >
            <Globe size={14} aria-hidden="true" /> {langue === "fr" ? "FR" : "ع"}
          </button>
          <Link
            to="/connexion"
            aria-label={t.nav.espace}
            title={t.nav.espace}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-bord px-3 py-2 text-xs font-semibold text-foret transition-colors hover:border-vert hover:text-vert-fonce"
          >
            <LogIn size={14} aria-hidden="true" />
            <span className="hidden 2xl:inline">{t.nav.espace}</span>
          </Link>
          <a href="#devis" className="btn-primaire whitespace-nowrap !px-5">{t.nav.devis}</a>
        </div>

        <button
          className="rounded-full border border-bord p-2.5 text-foret lg:hidden"
          onClick={() => setOuvert(!ouvert)}
          aria-expanded={ouvert}
          aria-label={ouvert ? t.nav.fermer : t.nav.menu}
        >
          {ouvert ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {ouvert && (
        <div className="border-t border-bord bg-white lg:hidden">
          <nav className="conteneur flex flex-col gap-1 py-4">
            {liens.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOuvert(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-encre-doux hover:bg-sable"
              >
                {label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <button onClick={basculer} className="btn-contour flex-1">
                <Globe size={15} /> {langue === "fr" ? "العربية" : "Français"}
              </button>
              <BoutonAppel className="btn-contour flex-1">
                <Phone size={15} aria-hidden="true" /> <span dir="ltr">{SITE.telephone}</span>
              </BoutonAppel>
            </div>
            <a href="#devis" onClick={() => setOuvert(false)} className="btn-primaire mt-2">{t.nav.devis}</a>
            <Link to="/connexion" className="btn-contour mt-2"><LogIn size={15} aria-hidden="true" /> {t.nav.espace}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
