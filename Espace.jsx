import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  LogOut, AlertTriangle, FileText, Users, LayoutDashboard,
  Package, Download, Check, X, TrendingUp, Phone,
} from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";
import { useAuth } from "../lib/auth.jsx";
import BoutonAppel from "../components/BoutonAppel.jsx";
import { SITE, FLYERS } from "../data/site.js";

/* ---------- Donnees de demonstration (a remplacer par votre API) ---------- */
const DEVIS = [
  { id: 1041, client: "Youssef Amrani", tel: "06 61 22 44 88", produit: "Auto", statut: "nouveau", date: "02/09/2026" },
  { id: 1040, client: "Salma Bennani", tel: "06 78 90 12 34", produit: "Habitation", statut: "en_cours", date: "01/09/2026" },
  { id: 1039, client: "Omar Tazi", tel: "06 55 33 77 21", produit: "Santé", statut: "accepte", date: "29/08/2026" },
  { id: 1038, client: "Karim Ouazzani", tel: "06 12 45 89 03", produit: "Voyage", statut: "nouveau", date: "28/08/2026" },
];

const SINISTRES = [
  { id: 507, client: "Youssef Amrani", type: "Collision auto", date: "30/08/2026", statut: "declare" },
  { id: 506, client: "Salma Bennani", type: "Dégât des eaux", date: "24/08/2026", statut: "en_expertise" },
  { id: 505, client: "Omar Tazi", type: "Bris de glace", date: "12/08/2026", statut: "clos" },
];

const CLIENTS = [
  { nom: "Youssef Amrani", tel: "06 61 22 44 88", contrats: 3, statut: "actif" },
  { nom: "Salma Bennani", tel: "06 78 90 12 34", contrats: 1, statut: "actif" },
  { nom: "Omar Tazi", tel: "06 55 33 77 21", contrats: 2, statut: "actif" },
  { nom: "Karim Ouazzani", tel: "06 12 45 89 03", contrats: 0, statut: "a_renouveler" },
];

// 06 61 22 44 88 -> tel:+212661224488 (un lien tel: exige le format international)
function lienTel(numero) {
  const chiffres = String(numero).replace(/\D/g, "");
  if (chiffres.startsWith("212")) return "tel:+" + chiffres;
  if (chiffres.startsWith("0")) return "tel:+212" + chiffres.slice(1);
  return "tel:+212" + chiffres;
}

const BADGES = {
  actif: "bg-vert-pale text-vert-fonce", a_renouveler: "bg-jaune-pale text-jaune-fonce",
  nouveau: "bg-jaune-pale text-jaune-fonce", en_cours: "bg-foret-pale text-foret",
  accepte: "bg-vert-pale text-vert-fonce", refuse: "bg-red-50 text-red-800",
  declare: "bg-jaune-pale text-jaune-fonce", en_expertise: "bg-foret-pale text-foret",
  clos: "bg-vert-pale text-vert-fonce", suspendu: "bg-red-50 text-red-800",
};

function Badge({ statut, libelles }) {
  return (
    <span className={"inline-block rounded-full px-3 py-1 text-xs font-semibold " + (BADGES[statut] || "bg-sable text-encre-doux")}>
      {libelles[statut] || statut}
    </span>
  );
}

function Kpi({ label, valeur, sous }) {
  return (
    <div className="rounded-xl2 border border-bord bg-white p-6 shadow-douce">
      <p className="text-xs text-encre-doux">{label}</p>
      <p className="mt-1.5 font-titre text-2xl font-semibold text-foret">{valeur}</p>
      {sous && <p className="mt-1 text-xs text-encre-tres">{sous}</p>}
    </div>
  );
}

/* ---------------------------- Coquille commune ---------------------------- */
export default function Espace() {
  const { t } = useLangue();
  const { utilisateur, deconnecter } = useAuth();
  const [onglet, setOnglet] = useState(0);

  if (!utilisateur) return <Navigate to="/connexion" replace />;

  const e = t.espace;
  const vues = [
    { label: e.tableauBord, Icone: LayoutDashboard, Vue: VueTableauBord },
    { label: e.demandes, Icone: FileText, Vue: VueDevis },
    { label: e.sinistres, Icone: AlertTriangle, Vue: VueSinistres },
    { label: e.clientsOnglet, Icone: Users, Vue: VueClients },
    { label: e.publications, Icone: Package, Vue: VuePublications },
  ];

  const Courante = vues[onglet].Vue;

  return (
    <div className="min-h-screen bg-sable">
      <header className="bg-foret px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo-ahl-al-khair.png" alt={SITE.nom} className="h-10 w-auto rounded bg-white/95 px-2 py-1" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-white/65 sm:block">
              {e.administration} · {utilisateur.prenom} {utilisateur.nom}
            </span>
            <Link to="/" onClick={deconnecter} className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
              <LogOut size={15} aria-hidden="true" /> {e.deconnexion}
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-foret-fonce px-5">
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto">
          {vues.map((v, i) => {
            const on = onglet === i;
            return (
              <button
                key={v.label}
                onClick={() => setOnglet(i)}
                className={"flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3.5 text-sm font-medium transition-colors " +
                  (on ? "border-jaune text-white" : "border-transparent text-white/55 hover:text-white/80")}
              >
                <v.Icone size={15} aria-hidden="true" /> {v.label}
              </button>
            );
          })}
        </nav>
      </div>

      <main className="mx-auto max-w-6xl px-5 py-9">
        <Courante e={e} utilisateur={utilisateur} />
      </main>
    </div>
  );
}

/* -------------------------------- Client -------------------------------- */
function VueDevis({ e }) {
  const [devis, setDevis] = useState(DEVIS);
  const changer = (id, statut) => setDevis((d) => d.map((x) => (x.id === id ? { ...x, statut } : x)));

  return (
    <>
      <h1 className="font-titre text-2xl font-semibold text-foret">{e.demandes}</h1>
      <p className="mt-1.5 text-sm text-encre-doux">
        {devis.filter((d) => d.statut === "nouveau").length} {e.enAttente}
      </p>
      <div className="mt-7 space-y-3">
        {devis.map((d) => (
          <article key={d.id} className="rounded-xl2 border border-bord bg-white p-5 shadow-douce">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foret">#{d.id} · {d.client} — {d.produit}</p>
                <p className="mt-1 text-xs text-encre-doux" dir="ltr">{d.tel} · {d.date}</p>
              </div>
              <Badge statut={d.statut} libelles={e.statuts} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-bord pt-4">
              <button onClick={() => changer(d.id, "en_cours")} className="btn-contour !px-4 !py-2 !text-xs">{e.prendreEnCharge}</button>
              <button onClick={() => changer(d.id, "accepte")} className="btn-primaire !px-4 !py-2 !text-xs"><Check size={13} aria-hidden="true" /> {e.accepter}</button>
              <button onClick={() => changer(d.id, "refuse")} className="btn-contour !px-4 !py-2 !text-xs"><X size={13} aria-hidden="true" /> {e.refuser}</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function VueSinistres({ e }) {
  const [liste, setListe] = useState(SINISTRES);
  const changer = (id, statut) => setListe((l) => l.map((x) => (x.id === id ? { ...x, statut } : x)));

  return (
    <>
      <h1 className="font-titre text-2xl font-semibold text-foret">{e.sinistres}</h1>
      <p className="mt-1.5 text-sm text-encre-doux">
        {liste.filter((s) => s.statut !== "clos").length} {e.dossiersOuverts}
      </p>
      <div className="mt-7 space-y-3">
        {liste.map((s) => (
          <article key={s.id} className="rounded-xl2 border border-bord bg-white p-5 shadow-douce">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-foret">#{s.id} · {s.client} — {s.type}</p>
                <p className="mt-1 text-xs text-encre-doux">{s.date}</p>
              </div>
              <Badge statut={s.statut} libelles={e.statuts} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 border-t border-bord pt-4">
              <button onClick={() => changer(s.id, "en_expertise")} className="btn-contour !px-4 !py-2 !text-xs">{e.mandater}</button>
              <button onClick={() => changer(s.id, "clos")} className="btn-primaire !px-4 !py-2 !text-xs">{e.cloturer}</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* -------------------------------- Admin --------------------------------- */
function VueTableauBord({ e }) {
  const parProduit = Object.entries(DEVIS.reduce((m, d) => ({ ...m, [d.produit]: (m[d.produit] || 0) + 1 }), {}));
  const max = Math.max(...parProduit.map(([, n]) => n), 1);

  return (
    <>
      <h1 className="font-titre text-2xl font-semibold text-foret">{e.tableauBord}</h1>
      <p className="mt-1.5 text-sm text-encre-doux">{e.vueEnsemble}</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <Kpi label={e.demandes} valeur={DEVIS.length} sous={DEVIS.filter((d) => d.statut === "nouveau").length + " " + e.enAttente} />
        <Kpi label={e.sinistres} valeur={SINISTRES.filter((s) => s.statut !== "clos").length} sous={SINISTRES.length + " " + e.auTotal} />
        <Kpi label={e.clients} valeur={CLIENTS.length} />
      </div>

      <div className="mt-6 rounded-xl2 border border-bord bg-white p-6 shadow-douce">
        <h2 className="flex items-center gap-2 font-titre text-base font-semibold text-foret">
          <TrendingUp size={17} className="text-vert-fonce" aria-hidden="true" /> {e.parProduit}
        </h2>
        <div className="mt-5 space-y-3">
          {parProduit.map(([nom, n]) => (
            <div key={nom}>
              <div className="flex justify-between text-xs text-encre-doux"><span>{nom}</span><span>{n}</span></div>
              <div className="mt-1.5 h-2 w-full rounded-full bg-sable">
                <div className="h-2 rounded-full bg-vert" style={{ width: Math.round((n / max) * 100) + "%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function VueClients({ e }) {
  return (
    <>
      <h1 className="font-titre text-2xl font-semibold text-foret">{e.clientsOnglet}</h1>
      <p className="mt-1.5 text-sm text-encre-doux">{CLIENTS.length} {e.fiches}</p>

      <div className="mt-7 overflow-x-auto rounded-xl2 border border-bord bg-white shadow-douce">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-sable text-encre-doux">
              <th className="px-5 py-3.5 text-start font-semibold">{e.nom}</th>
              <th className="px-5 py-3.5 text-start font-semibold">{e.telephone}</th>
              <th className="px-5 py-3.5 text-start font-semibold">{e.contrats}</th>
              <th className="px-5 py-3.5 text-end font-semibold">{e.action}</th>
            </tr>
          </thead>
          <tbody>
            {CLIENTS.map((c) => (
              <tr key={c.nom} className="border-t border-bord">
                <td className="px-5 py-3.5 font-medium text-foret">{c.nom}</td>
                <td className="px-5 py-3.5 text-encre-doux" dir="ltr">{c.tel}</td>
                <td className="px-5 py-3.5 text-encre-doux">{c.contrats}</td>
                <td className="px-5 py-3.5 text-end">
                  <BoutonAppel
                    numero={c.tel}
                    lien={lienTel(c.tel)}
                    className="btn-contour !px-4 !py-2 !text-xs"
                    aria-label={e.appeler + " " + c.nom}
                  >
                    <Phone size={13} aria-hidden="true" /> {e.appeler}
                  </BoutonAppel>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function VuePublications({ e }) {
  const { langue } = useLangue();
  return (
    <>
      <h1 className="font-titre text-2xl font-semibold text-foret">{e.publications}</h1>
      <p className="mt-1.5 text-sm text-encre-doux">
        {FLYERS.length} {e.enLigne} · {e.publicationsTexte}
      </p>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FLYERS.map((f) => (
          <article key={f.id} className="overflow-hidden rounded-xl2 border border-bord bg-white shadow-douce">
            <a href={`/flyers/${f.fichier}.jpg`} target="_blank" rel="noreferrer">
              <img
                src={`/flyers/${f.fichier}-min.jpg`}
                alt={f.titre[langue]}
                loading="lazy"
                className="h-48 w-full object-cover object-top"
              />
            </a>
            <div className="space-y-2 p-4">
              <p className="text-sm font-semibold leading-snug text-foret">{f.titre[langue]}</p>
              <p className="truncate text-xs text-encre-tres" dir="ltr">{f.fichier}.jpg</p>
              <Badge statut="actif" libelles={e.statuts} />
            </div>
          </article>
        ))}
      </div>
      <p className="mt-6 rounded-xl2 border border-dashed border-bord bg-white p-6 text-center text-sm text-encre-doux">
        {e.publicationsNote}
      </p>
    </>
  );
}
