import { Routes, Route, Navigate } from "react-router-dom";
import SitePublic from "./pages/SitePublic.jsx";
import Connexion from "./pages/Connexion.jsx";
import Espace from "./pages/Espace.jsx";

export default function App() {
  return (
    <Routes>
      {/* Site public — ouvert a tous, sans compte */}
      <Route path="/" element={<SitePublic />} />

      {/* Administration — seul espace protege */}
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/admin" element={<Espace />} />

      {/* Toute autre adresse ramene au site public */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
