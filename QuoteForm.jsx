import { useState } from "react";
import { CheckCircle2, Send, Phone, MessageCircle } from "lucide-react";
import Section from "./Section.jsx";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";
import BoutonAppel from "./BoutonAppel.jsx";
import Captcha from "./Captcha.jsx";
import { PAIEMENTS_VISIBLES } from "../data/site.js";

const VIDE = { nom: "", telephone: "", email: "", type: "", paiement: "", message: "" };

export default function QuoteForm() {
  const { t, langue } = useLangue();
  const [f, setF] = useState(VIDE);
  const [erreurs, setErreurs] = useState({});
  const [envoi, setEnvoi] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const [jetonCaptcha, setJetonCaptcha] = useState(null);

  const maj = (k) => (e) => {
    setF({ ...f, [k]: e.target.value });
    if (erreurs[k]) setErreurs({ ...erreurs, [k]: null });
  };

  const valider = () => {
    const e = {};
    if (f.nom.trim().length < 3) e.nom = t.devis.erreurs.nom;
    if (f.telephone.replace(/\D/g, "").length < 9) e.telephone = t.devis.erreurs.tel;
    if (f.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = t.devis.erreurs.email;
    if (!f.type) e.type = t.devis.erreurs.type;
    if (f.message.trim().length < 10) e.message = t.devis.erreurs.message;
    if (!jetonCaptcha) e.captcha = t.captcha.erreur;
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const soumettre = async (ev) => {
    ev.preventDefault();
    if (!valider()) return;
    setEnvoi(true);

    // Branchez ici votre backend ou un service de formulaire :
    // await fetch("/api/devis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    await new Promise((r) => setTimeout(r, 700));

    setEnvoi(false);
    setEnvoye(true);
    setF(VIDE);
    setJetonCaptcha(null);
  };

  const messageWhatsApp = encodeURIComponent(
    `Bonjour, je souhaite un devis ${f.type || ""}. Nom : ${f.nom || "—"}.`
  );

  return (
    <Section id="devis">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="titre-section">{t.devis.titre}</h2>
          <p className="sous-titre">{t.devis.sous}</p>

          <div className="mt-8 space-y-3">
            <BoutonAppel className="flex items-center gap-4 rounded-2xl border border-bord bg-sable p-5 transition-colors hover:border-vert">
              <Phone size={20} className="shrink-0 text-vert-fonce" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold text-foret" dir="ltr">{SITE.telephone}</span>
                <span className="block text-xs text-encre-tres">{t.contact.appeler}</span>
              </span>
            </BoutonAppel>
            <a
              href={`${SITE.whatsapp}?text=${messageWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-bord bg-sable p-5"
            >
              <MessageCircle size={20} className="shrink-0 text-vert-fonce" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold text-foret" dir="ltr">{SITE.whatsappNumero}</span>
                <span className="block text-xs text-encre-tres">WhatsApp</span>
              </span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          {envoye ? (
            <div
              role="status"
              className="rounded-xl2 border border-bord bg-white p-10 text-center shadow-douce"
            >
              <CheckCircle2 size={40} className="mx-auto text-vert-fonce" aria-hidden="true" />
              <h3 className="mt-5 font-titre text-xl font-semibold text-foret">{t.devis.succesTitre}</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-encre-doux">
                {t.devis.succesTexte}
              </p>
              <button onClick={() => setEnvoye(false)} className="btn-contour mt-7">
                {t.devis.autre}
              </button>
            </div>
          ) : (
            <form onSubmit={soumettre} noValidate className="rounded-xl2 border border-bord bg-white p-7 shadow-douce sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Champ id="nom" label={t.devis.nom} valeur={f.nom} onChange={maj("nom")} erreur={erreurs.nom} />
                <Champ id="telephone" label={t.devis.tel} type="tel" placeholder="+212 6 00 00 00 00"
                  valeur={f.telephone} onChange={maj("telephone")} erreur={erreurs.telephone} />
                <Champ id="email" label={t.devis.email} type="email" valeur={f.email}
                  onChange={maj("email")} erreur={erreurs.email} />

                <div>
                  <label htmlFor="type" className="mb-1.5 block text-sm font-medium text-foret">
                    {t.devis.type}
                  </label>
                  <select
                    id="type" value={f.type} onChange={maj("type")}
                    className={"champ " + (erreurs.type ? "champ-invalide" : "")}
                    aria-invalid={!!erreurs.type}
                  >
                    <option value="">{t.devis.typeVide}</option>
                    {t.devis.types.map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                  {erreurs.type && <p className="mt-1.5 text-xs text-vert-fonce">{erreurs.type}</p>}
                </div>

                <div>
                  <label htmlFor="mode-paiement" className="mb-1.5 block text-sm font-medium text-foret">
                    {t.paiement.champ}
                  </label>
                  <select id="mode-paiement" value={f.paiement} onChange={maj("paiement")} className="champ">
                    <option value="">{t.paiement.champVide}</option>
                    {PAIEMENTS_VISIBLES.map((m) => (
                      <option key={m.id} value={m.id}>{m.titre[langue]}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foret">
                    {t.devis.message}
                  </label>
                  <textarea
                    id="message" rows={4} value={f.message} onChange={maj("message")}
                    placeholder={t.devis.messagePlaceholder}
                    className={"champ resize-none " + (erreurs.message ? "champ-invalide" : "")}
                    aria-invalid={!!erreurs.message}
                  />
                  {erreurs.message && <p className="mt-1.5 text-xs text-vert-fonce">{erreurs.message}</p>}
                </div>
              </div>

              <div className="mt-6">
                <Captcha valide={jetonCaptcha} onChange={setJetonCaptcha} />
                {erreurs.captcha && <p className="mt-1.5 text-xs text-vert-fonce">{erreurs.captcha}</p>}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={envoi} className="btn-primaire disabled:opacity-60">
                  {envoi ? t.devis.envoi : <>{t.devis.envoyer} <Send size={15} className="rtl:-scale-x-100" /></>}
                </button>
                <p className="text-xs text-encre-tres">{t.devis.note}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}

function Champ({ id, label, valeur, onChange, erreur, type = "text", placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foret">{label}</label>
      <input
        id={id} type={type} value={valeur} onChange={onChange} placeholder={placeholder}
        className={"champ " + (erreur ? "champ-invalide" : "")}
        aria-invalid={!!erreur}
        aria-describedby={erreur ? id + "-erreur" : undefined}
      />
      {erreur && <p id={id + "-erreur"} className="mt-1.5 text-xs text-vert-fonce">{erreur}</p>}
    </div>
  );
}
