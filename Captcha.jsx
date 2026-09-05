import { useEffect, useId, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";

const CLE = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Deux modes :
//  - cle reCAPTCHA renseignee dans .env  -> vrai widget Google reCAPTCHA v2
//  - pas de cle                          -> case a cocher simple, sans marque Google
//
// IMPORTANT : une verification cote navigateur ne protege de rien.
// Le jeton renvoye par onChange doit etre valide par votre serveur via
// https://www.google.com/recaptcha/api/siteverify avant tout traitement.
export default function Captcha({ onChange, valide }) {
  const { t, langue } = useLangue();
  const conteneur = useRef(null);
  const idWidget = useRef(null);
  const [pret, setPret] = useState(false);
  const idCase = useId();

  useEffect(() => {
    if (!CLE) return;

    const rendre = () => {
      if (!conteneur.current || idWidget.current !== null) return;
      idWidget.current = window.grecaptcha.render(conteneur.current, {
        sitekey: CLE,
        hl: langue === "ar" ? "ar" : "fr",
        callback: (jeton) => onChange(jeton),
        "expired-callback": () => onChange(null),
        "error-callback": () => onChange(null),
      });
      setPret(true);
    };

    if (window.grecaptcha?.render) return rendre();

    const existant = document.querySelector("script[data-recaptcha]");
    if (!existant) {
      const s = document.createElement("script");
      s.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.dataset.recaptcha = "true";
      document.head.appendChild(s);
    }
    const minuteur = setInterval(() => {
      if (window.grecaptcha?.render) { clearInterval(minuteur); rendre(); }
    }, 250);
    return () => clearInterval(minuteur);
  }, [langue, onChange]);

  if (CLE) {
    return (
      <div>
        <div ref={conteneur} />
        {!pret && <p className="text-xs text-encre-tres">{t.captcha.chargement}</p>}
      </div>
    );
  }

  // Repli sans cle : case honnete, sans imiter la marque Google.
  return (
    <label
      htmlFor={idCase}
      className={"flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors " +
        (valide ? "border-vert bg-vert-pale" : "border-bord bg-white hover:border-vert-clair")}
    >
      <input
        id={idCase}
        type="checkbox"
        checked={!!valide}
        onChange={(e) => onChange(e.target.checked ? "case-cochee" : null)}
        className="h-5 w-5 shrink-0 accent-[#4C9C2E]"
      />
      <span className="flex-1 text-sm font-medium text-foret">{t.captcha.label}</span>
      <ShieldCheck size={20} className={valide ? "text-vert-fonce" : "text-encre-tres"} aria-hidden="true" />
    </label>
  );
}
