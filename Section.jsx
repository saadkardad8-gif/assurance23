import { useEffect, useRef, useState } from "react";

// Section avec revelation a l'entree dans le viewport
export default function Section({ id, fond = "blanc", children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit) return setVisible(true);

    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), obs.disconnect()),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fonds = { blanc: "bg-white", sable: "bg-sable", foret: "bg-foret" };

  return (
    <section id={id} ref={ref} className={`${fonds[fond]} py-20 sm:py-24 ${className}`}>
      <div className={"conteneur " + (visible ? "animate-apparition" : "opacity-0")}>{children}</div>
    </section>
  );
}
