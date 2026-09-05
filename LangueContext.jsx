import { createContext, useContext, useEffect, useState } from "react";
import { TEXTES } from "./textes.js";

const LangueContext = createContext(null);

export function LangueProvider({ children }) {
  const [langue, setLangue] = useState(() => localStorage.getItem("langue") || "fr");

  useEffect(() => {
    const t = TEXTES[langue];
    document.documentElement.lang = langue;
    document.documentElement.dir = t.dir;
    localStorage.setItem("langue", langue);
  }, [langue]);

  const basculer = () => setLangue((l) => (l === "fr" ? "ar" : "fr"));

  return (
    <LangueContext.Provider value={{ langue, setLangue, basculer, t: TEXTES[langue], rtl: langue === "ar" }}>
      {children}
    </LangueContext.Provider>
  );
}

export const useLangue = () => useContext(LangueContext);
