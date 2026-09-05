import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useLangue } from "../i18n/LangueContext.jsx";
import { useAuth } from "../lib/auth.jsx";
import { SITE } from "../data/site.js";
import Captcha from "../components/Captcha.jsx";

export default function Connexion() {
  const { t } = useLangue();
  const { utilisateur, connecter, ADMIN } = useAuth();
  const navigate = useNavigate();

  const [f, setF] = useState({ email: "", mdp: "" });
  const [voirMdp, setVoirMdp] = useState(false);
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [jetonCaptcha, setJetonCaptcha] = useState(null);

  if (utilisateur) return <Navigate to="/admin" replace />;

  const valider = async (e) => {
    e.preventDefault();
    if (!f.email.trim()) return setErreur(t.connexion.erreurEmail);
    if (f.mdp.length < 4) return setErreur(t.connexion.erreurMdp);
    if (!jetonCaptcha) return setErreur(t.captcha.erreur);

    setErreur(""); setEnvoi(true);
    try {
      await connecter(f.email, f.mdp);
      navigate("/admin", { replace: true });
    } catch {
      setErreur(t.connexion.erreurIdentifiants);
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center bg-foret px-5 py-10">
      <div className="mx-auto w-full max-w-md">
        <Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
          <ArrowLeft size={16} className="rtl:rotate-180" aria-hidden="true" /> {t.connexion.retour}
        </Link>

        <div className="rounded-xl2 bg-white p-7 shadow-relief sm:p-9">
          <img src="/logo-ahl-al-khair.png" alt={SITE.nom} width={550} height={172} className="h-14 w-auto" />

          <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-vert-pale px-3 py-1.5 text-xs font-semibold text-vert-fonce">
            <ShieldCheck size={14} aria-hidden="true" /> {t.connexion.reserve}
          </span>

          <h1 className="mt-4 font-titre text-2xl font-semibold text-foret">{t.connexion.titre}</h1>
          <p className="mt-2 text-sm leading-relaxed text-encre-doux">{t.connexion.sous}</p>

          <form onSubmit={valider} noValidate className="mt-7 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foret">
                {t.connexion.email}
              </label>
              <input
                id="email" type="email" autoComplete="username" dir="ltr"
                value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })}
                className="champ" placeholder="admin@ahlalkhair.ma"
              />
            </div>

            <div>
              <label htmlFor="mdp" className="mb-1.5 block text-sm font-medium text-foret">
                {t.connexion.motDePasse}
              </label>
              <div className="relative">
                <input
                  id="mdp" type={voirMdp ? "text" : "password"} autoComplete="current-password" dir="ltr"
                  value={f.mdp} onChange={(e) => setF({ ...f, mdp: e.target.value })}
                  className="champ pe-12"
                />
                <button
                  type="button"
                  onClick={() => setVoirMdp(!voirMdp)}
                  aria-label={voirMdp ? t.connexion.masquer : t.connexion.afficher}
                  className="absolute inset-y-0 end-0 flex w-12 items-center justify-center text-encre-tres"
                >
                  {voirMdp ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
                </button>
              </div>
            </div>

            <Captcha valide={jetonCaptcha} onChange={setJetonCaptcha} />

            {erreur && (
              <p role="alert" className="rounded-xl bg-jaune-pale px-4 py-3 text-sm text-jaune-fonce">
                {erreur}
              </p>
            )}

            <button type="submit" disabled={envoi} className="btn-primaire w-full disabled:opacity-60">
              {envoi ? t.connexion.envoi : t.connexion.seConnecter}
            </button>
          </form>

          <div className="mt-7 rounded-2xl border border-bord bg-sable p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-encre-tres">
              {t.connexion.demoTitre}
            </p>
            <dl className="mt-3 space-y-1 text-sm" dir="ltr">
              <div className="flex gap-2"><dt className="text-encre-tres">Email :</dt><dd className="font-medium text-foret">{ADMIN.email}</dd></div>
              <div className="flex gap-2"><dt className="text-encre-tres">Mot de passe :</dt><dd className="font-medium text-foret">{ADMIN.mdp}</dd></div>
            </dl>
          </div>

          <p className="mt-6 text-center text-sm text-encre-doux">
            {t.connexion.pasDeCompte}{" "}
            <Link to="/" className="font-semibold text-vert-fonce underline-offset-4 hover:underline">
              {t.connexion.retourSite}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
