import { createContext, useContext, useState } from "react";

// Acces reserve a l'administration de l'agence.
// Les clients et les visiteurs consultent le site public sans compte.
//
// Authentification de demonstration, entierement cote navigateur.
// Pour la production, remplacez `connecter` par un appel a votre API
// (POST /api/auth/connexion) qui renvoie un jeton JWT, et supprimez
// la constante ADMIN : un mot de passe ne doit jamais vivre dans le
// code envoye au navigateur.
const ADMIN = {
  email: "admin@ahlalkhair.ma",
  mdp: "Admin2026",
  role: "admin",
  prenom: "Saad",
  nom: "Kardad",
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem("utilisateur")); } catch { return null; }
  });

  const connecter = async (email, mdp) => {
    await new Promise((r) => setTimeout(r, 450));
    const ok =
      email.trim().toLowerCase() === ADMIN.email.toLowerCase() && mdp === ADMIN.mdp;
    if (!ok) throw new Error("identifiants");

    const u = { email: ADMIN.email, role: ADMIN.role, prenom: ADMIN.prenom, nom: ADMIN.nom };
    sessionStorage.setItem("utilisateur", JSON.stringify(u));
    setUtilisateur(u);
    return u;
  };

  const deconnecter = () => {
    sessionStorage.removeItem("utilisateur");
    setUtilisateur(null);
  };

  return (
    <AuthContext.Provider value={{ utilisateur, connecter, deconnecter, ADMIN }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
