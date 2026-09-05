export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Vert du logo Wafa Assurance — couleur principale
        vert:  { DEFAULT: "#4C9C2E", fonce: "#37731F", clair: "#6CBF4A", pale: "#EFF7E9" },
        // Vert profond — sections sombres et titres
        foret: { DEFAULT: "#1E3D18", fonce: "#142B10", clair: "#335C2A", pale: "#F0F5EE" },
        // Jaune du logo — accents et mises en avant
        jaune: { DEFAULT: "#F2B705", fonce: "#C99503", clair: "#FFD34E", pale: "#FEF7E2" },
        sable: { DEFAULT: "#F6F5F0", fonce: "#ECEAE1" },
        encre: { DEFAULT: "#1A1C19", doux: "#565B54", tres: "#8B9088" },
        bord:  "#E4E6E1",
      },
      fontFamily: {
        titre: ["Bricolage Grotesque", "Georgia", "serif"],
        texte: ["Inter", "system-ui", "sans-serif"],
        arabe: ["Tajawal", "Inter", "sans-serif"],
      },
      boxShadow: {
        douce: "0 1px 2px rgba(30,61,24,.05), 0 8px 24px rgba(30,61,24,.07)",
        relief: "0 2px 4px rgba(30,61,24,.07), 0 18px 40px rgba(30,61,24,.11)",
      },
      borderRadius: { xl2: "1.25rem" },
      keyframes: {
        apparition: { "0%": { opacity: 0, transform: "translateY(14px)" }, "100%": { opacity: 1, transform: "none" } },
      },
      animation: { apparition: "apparition .6s cubic-bezier(.22,1,.36,1) both" },
    },
  },
  plugins: [],
};
