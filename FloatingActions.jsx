import { useEffect, useState } from "react";
import { Phone, MessageCircle, MapPin, ArrowUp } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";
import BoutonAppel from "./BoutonAppel.jsx";

export default function FloatingActions() {
  const { t } = useLangue();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rond =
    "flex h-14 w-14 items-center justify-center rounded-full shadow-relief transition-transform duration-200 hover:scale-105";

  const liens = [
    { href: SITE.whatsapp, Icone: MessageCircle, label: t.flottant.whatsapp, classe: "bg-[#25D366] text-white" },
    { href: SITE.maps, Icone: MapPin, label: t.flottant.maps, classe: "bg-jaune text-foret" },
  ];

  return (
    <div className="fixed bottom-5 end-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:end-6">
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.flottant.haut}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-bord bg-white text-foret shadow-relief"
        >
          <ArrowUp size={19} aria-hidden="true" />
        </button>
      )}

      <a
        href={liens[0].href}
        aria-label={liens[0].label}
        target="_blank"
        rel="noopener noreferrer"
        className={rond + " " + liens[0].classe}
      >
        <MessageCircle size={22} aria-hidden="true" />
      </a>

      <BoutonAppel className={rond + " bg-vert text-white"} aria-label={t.flottant.appeler}>
        <Phone size={22} aria-hidden="true" />
      </BoutonAppel>

      <a
        href={liens[1].href}
        aria-label={liens[1].label}
        target="_blank"
        rel="noopener noreferrer"
        className={rond + " " + liens[1].classe}
      >
        <MapPin size={22} aria-hidden="true" />
      </a>
    </div>
  );
}
