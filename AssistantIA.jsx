import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Phone } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";
import { SITE } from "../data/site.js";

// Assistant de l'agence, hors ligne : il repond a partir d'une base de
// connaissances locale, sans appel reseau ni cle d'API. Il ne remplace pas
// un conseiller et ne traite aucune donnee personnelle.
//
// Pour le brancher sur un vrai modele de langage, remplacez `repondre`
// par un appel a votre backend (jamais directement au fournisseur depuis
// le navigateur : la cle d'API serait exposee a tous les visiteurs).
const BASE = [
  {
    cles: { fr: ["adresse", "situe", "situee", "ou etes", "trouve", "localis", "agence", "massira", "addoha", "carrefour"],
            ar: ["عنوان", "أين", "الوكالة", "المسيرة", "الضحى"] },
    rep: { fr: `Notre agence se trouve ${SITE.adresse}, à ${SITE.ville}. Le bouton « Itinéraire » de la section localisation vous y conduit.`,
           ar: `توجد وكالتنا ${SITE.adresse}، ${SITE.ville}. زر «الاتجاهات» في قسم الموقع يوصلكم إليها.` },
  },
  {
    cles: { fr: ["horaire", "ouvert", "ferme", "heure", "samedi", "dimanche"],
            ar: ["توقيت", "ساعات", "مفتوح", "السبت"] },
    rep: { fr: "L'agence est ouverte du lundi au vendredi de 8h30 à 18h, et le samedi de 9h à 13h.",
           ar: "الوكالة مفتوحة من الاثنين إلى الجمعة من 8:30 إلى 18:00، والسبت من 9:00 إلى 13:00." },
  },
  {
    cles: { fr: ["document", "papier", "piece", "carte grise", "permis", "cin", "voiture", "auto", "vehicule"],
            ar: ["وثائق", "أوراق", "البطاقة", "رخصة", "سيارة"] },
    rep: { fr: "Pour assurer un véhicule : la carte grise, votre CIN et le permis de conduire. Si le véhicule était déjà assuré, apportez aussi le relevé d'information de l'assureur précédent, il conserve votre bonus.",
           ar: "لتأمين سيارة: البطاقة الرمادية، البطاقة الوطنية ورخصة السياقة. إذا كانت مؤمنة سابقا، أحضروا كشف المعلومات من المؤمّن السابق للحفاظ على التخفيض." },
  },
  {
    cles: { fr: ["payer", "paiement", "prix", "regl", "especes", "cash", "tranche", "mensuel", "fractionne"],
            ar: ["أداء", "دفع", "ثمن", "نقدا", "تقسيط"] },
    rep: { fr: "Le règlement se fait en espèces à l'agence, en une fois ou de façon fractionnée (mensuel, trimestriel ou semestriel) selon le contrat. Un reçu vous est remis immédiatement. Aucun paiement n'est encaissé en ligne.",
           ar: "الأداء يتم نقدا بالوكالة، دفعة واحدة أو بالتقسيط (شهري، فصلي أو نصف سنوي) حسب العقد. يسلم لكم الوصل فورا. لا يتم أي أداء عبر الإنترنت." },
  },
  {
    cles: { fr: ["sinistre", "accident", "declar", "degat", "vol", "constat", "expert", "rembours"],
            ar: ["حادث", "تصريح", "خبير", "تعويض", "سرقة"] },
    rep: { fr: "Déclarez le sinistre dans les 5 jours ouvrables (2 jours en cas de vol), avec le constat et vos photos. Un expert est mandaté sous 72 heures, le règlement intervient sous 15 jours ouvrables après validation du rapport.",
           ar: "صرّحوا بالحادث خلال 5 أيام عمل (يومان في حالة السرقة)، مع المحضر والصور. يعيَّن خبير خلال 72 ساعة، والتعويض خلال 15 يوم عمل بعد المصادقة على التقرير." },
  },
  {
    cles: { fr: ["devis", "tarif", "estimation", "combien", "cout", "souscri"],
            ar: ["عرض سعر", "تسعيرة", "بكم", "اشتراك"] },
    rep: { fr: "Remplissez le formulaire « Demandez votre devis » sur cette page, ou appelez l'agence. Le tarif dépend de votre situation, un conseiller l'établit après étude du dossier.",
           ar: "املأوا استمارة «اطلب عرض السعر» في هذه الصفحة، أو اتصلوا بالوكالة. الثمن يتوقف على وضعيتكم، ويحدده مستشار بعد دراسة الملف." },
  },
  {
    cles: { fr: ["assurance", "produit", "propose", "offre", "moto", "habitation", "sante", "voyage", "professionnel"],
            ar: ["تأمين", "منتوج", "عروض", "دراجة", "سكن", "صحة", "سفر", "مهني"] },
    rep: { fr: "Nous proposons l'assurance automobile, moto, habitation, santé, accident, professionnelle et voyage, ainsi que la responsabilité civile et l'épargne.",
           ar: "نقدم تأمين السيارات، الدراجات، السكن، الصحة، الحوادث، المهني والسفر، إضافة إلى المسؤولية المدنية والادخار." },
  },
  {
    cles: { fr: ["convention", "far", "dgsn", "ocp", "fondation", "partenaire", "militaire", "police"],
            ar: ["اتفاقية", "شراكة", "الجيش", "الأمن"] },
    rep: { fr: "L'agence a des conventions signées avec les F.A.R, la DGSN, le groupe OCP, les Fondations Hassan II et Mohammed VI, et la F.N.R.C.P.C Cyclo. Si vous en dépendez, signalez-le à votre conseiller.",
           ar: "للوكالة اتفاقيات مع القوات المسلحة الملكية، الأمن الوطني، مجموعة المكتب الشريف للفوسفاط، مؤسستي الحسن الثاني ومحمد السادس، والجامعة الوطنية للدراجات. إن كنتم معنيين، أخبروا مستشاركم." },
  },
  {
    cles: { fr: ["telephone", "appeler", "numero", "whatsapp", "contact", "joindre", "email", "mail"],
            ar: ["هاتف", "اتصال", "رقم", "واتساب", "بريد"] },
    rep: { fr: `Téléphone et WhatsApp : ${SITE.telephone}. Autres lignes : ${SITE.mobile2} et ${SITE.fixe}. Email : ${SITE.email}.`,
           ar: `الهاتف وواتساب: ${SITE.telephone}. خطوط أخرى: ${SITE.mobile2} و ${SITE.fixe}. البريد: ${SITE.email}.` },
  },
];

function normaliser(txt) {
  return txt.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s\u0600-\u06FF]/g, " ");
}

function repondre(question, langue) {
  const q = normaliser(question);
  let meilleur = null, score = 0;
  for (const entree of BASE) {
    const n = (entree.cles[langue] || []).filter((c) => q.includes(normaliser(c))).length;
    if (n > score) { score = n; meilleur = entree; }
  }
  return meilleur ? meilleur.rep[langue] : null;
}

export default function AssistantIA() {
  const { t, langue } = useLangue();
  const [ouvert, setOuvert] = useState(false);
  const [saisie, setSaisie] = useState("");
  const [messages, setMessages] = useState([]);
  const fin = useRef(null);

  useEffect(() => {
    setMessages([{ de: "bot", texte: t.assistant.accueil }]);
  }, [langue, t.assistant.accueil]);

  useEffect(() => {
    if (ouvert) fin.current?.scrollIntoView({ block: "end" });
  }, [messages, ouvert]);

  const envoyer = (texte) => {
    const q = (texte ?? saisie).trim();
    if (!q) return;
    const r = repondre(q, langue);
    setMessages((m) => [...m, { de: "moi", texte: q }, { de: "bot", texte: r || t.assistant.inconnu, sansReponse: !r }]);
    setSaisie("");
  };

  return (
    <>
      <button
        onClick={() => setOuvert(true)}
        aria-label={t.assistant.ouvrir}
        className="fixed bottom-5 start-4 z-40 flex h-14 items-center gap-2.5 rounded-full bg-foret px-5 text-sm font-semibold text-white shadow-relief transition-transform duration-200 hover:scale-105 sm:bottom-6 sm:start-6"
      >
        <Bot size={22} aria-hidden="true" />
        <span className="hidden sm:inline">{t.assistant.ouvrir}</span>
      </button>

      {ouvert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.assistant.titre}
          className="fixed inset-0 z-[75] flex items-end justify-center bg-foret-fonce/50 p-0 sm:items-center sm:p-5"
        >
          <div className="flex h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-relief sm:h-[38rem] sm:max-w-md sm:rounded-3xl">
            <header className="flex items-center gap-3 bg-foret px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Bot size={20} className="text-jaune" aria-hidden="true" />
              </span>
              <span className="flex-1 leading-tight">
                <span className="block text-sm font-semibold text-white">{t.assistant.titre}</span>
                <span className="block text-xs text-white/60">{t.assistant.sous}</span>
              </span>
              <button
                onClick={() => setOuvert(false)}
                aria-label={t.assistant.fermer}
                className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-sable p-4">
              {messages.map((m, i) => (
                <div key={i} className={"flex " + (m.de === "moi" ? "justify-end" : "justify-start")}>
                  <div className={"max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed " +
                    (m.de === "moi" ? "bg-vert-fonce text-white" : "border border-bord bg-white text-encre")}>
                    {m.texte}
                    {m.sansReponse && (
                      <a href={SITE.telephoneLien} className="mt-3 flex items-center gap-2 text-sm font-semibold text-vert-fonce">
                        <Phone size={14} aria-hidden="true" /> {t.assistant.appeler}
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {t.assistant.suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => envoyer(s)}
                      className="rounded-full border border-bord bg-white px-3.5 py-2 text-xs font-medium text-foret transition-colors hover:border-vert hover:text-vert-fonce"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              <div ref={fin} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); envoyer(); }}
              className="flex items-center gap-2 border-t border-bord bg-white p-3"
            >
              <input
                value={saisie}
                onChange={(e) => setSaisie(e.target.value)}
                placeholder={t.assistant.placeholder}
                aria-label={t.assistant.placeholder}
                className="champ !rounded-full"
              />
              <button
                type="submit"
                aria-label={t.assistant.envoyer}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-vert-fonce text-white"
              >
                <Send size={17} className="rtl:-scale-x-100" aria-hidden="true" />
              </button>
            </form>

            <p className="bg-white px-4 pb-3 text-center text-[11px] leading-snug text-encre-tres">
              {t.assistant.avertissement}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
