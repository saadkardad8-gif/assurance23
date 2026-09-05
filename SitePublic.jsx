import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import AgenceLocale from "../components/AgenceLocale.jsx";
import APropos from "../components/APropos.jsx";
import Conventions from "../components/Conventions.jsx";
import PourquoiNous from "../components/PourquoiNous.jsx";
import Flyers from "../components/Flyers.jsx";
import Paiement from "../components/Paiement.jsx";
import AssistantIA from "../components/AssistantIA.jsx";
import QuoteForm from "../components/QuoteForm.jsx";
import Localisation from "../components/Localisation.jsx";
import FAQ from "../components/FAQ.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import FloatingActions from "../components/FloatingActions.jsx";

export default function SitePublic() {
  return (
    <>
      <a
        href="#accueil"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-foret focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <AgenceLocale />
        <APropos />
        <Conventions />
        <PourquoiNous />
        <Flyers />
        <Paiement />
        <QuoteForm />
        <Localisation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <AssistantIA />
    </>
  );
}
