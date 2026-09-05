import { useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";

// Le clic LANCE TOUJOURS l'appel : aucun preventDefault, la navigation
// vers tel: se fait normalement. Sur mobile le composeur s'ouvre avec le
// numero pre-rempli. Sur ordinateur, le systeme passe la main au logiciel
// de telephonie installe (Telephone Windows, Skype, Teams, FaceTime...).
// Si aucun n'est installe, rien ne se passe cote navigateur : un rappel
// discret propose alors le numero a copier. Il n'empeche pas l'appel.
function surOrdinateur() {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/Android|iPhone|iPad|iPod|Windows Phone|Mobile/i.test(ua)) return false;
  return !(navigator.maxTouchPoints > 0 && window.matchMedia("(pointer: coarse)").matches);
}

export default function BoutonAppel({
  numero = SITE.telephone,
  lien = SITE.telephoneLien,
  className = "",
  children,
  "aria-label": ariaLabel,
}) {
  const { t } = useLangue();
  const [rappel, setRappel] = useState(false);

  const clic = () => {
    // On laisse l'evenement suivre son cours : l'appel part.
    if (surOrdinateur()) setTimeout(() => setRappel(true), 1400);
  };

  return (
    <>
      <a
        href={lien}
        onClick={clic}
        className={className}
        aria-label={ariaLabel || `${t.contact.appeler} ${numero}`}
      >
        {children}
      </a>

      {rappel && <RappelNumero numero={numero} onFermer={() => setRappel(false)} />}
    </>
  );
}

function RappelNumero({ numero, onFermer }) {
  const { t } = useLangue();
  const [copie, setCopie] = useState(false);

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(numero);
    } catch {
      const zone = document.createElement("textarea");
      zone.value = numero;
      zone.setAttribute("readonly", "");
      zone.style.position = "fixed";
      zone.style.opacity = "0";
      document.body.appendChild(zone);
      zone.select();
      try { document.execCommand("copy"); } catch { /* rien de plus a tenter */ }
      document.body.removeChild(zone);
    }
    setCopie(true);
    setTimeout(onFermer, 1600);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[70] flex w-[min(92vw,27rem)] -translate-x-1/2
                 items-center gap-3 rounded-2xl bg-foret px-5 py-4 text-white shadow-relief"
    >
      <span className="flex-1 text-sm leading-snug">
        <span className="block text-white/65">{t.appel.secours}</span>
        <span dir="ltr" className="mt-0.5 block text-base font-semibold">{numero}</span>
      </span>

      <button
        onClick={copier}
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-2
                   text-xs font-semibold transition-colors hover:bg-white/20"
      >
        {copie
          ? <><Check size={14} className="text-jaune" aria-hidden="true" /> {t.appel.copie}</>
          : <><Copy size={14} aria-hidden="true" /> {t.appel.copier}</>}
      </button>

      <button
        onClick={onFermer}
        aria-label={t.appel.fermer}
        className="shrink-0 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
