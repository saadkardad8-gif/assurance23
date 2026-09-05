# Assurances Ahl Al Khair

Site vitrine de l'agence **Assurances Ahl Al Khair**, Agent Wafa Assurance
à **Addoha – Marrakech, Maroc**.

React 18 · Tailwind CSS 3 · Vite · Bilingue FR / AR avec bascule RTL.

---

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # génère dist/
npm run preview    # prévisualise le build
```

## Logo et publications

Le logo officiel de l'agence est en place dans `public/logo-ahl-al-khair.png`,
extrait de vos supports. Il apparaît dans la barre de navigation, le pied de
page, la page de connexion et les espaces connectés. Le pictogramme sert de
favicon (`public/favicon.png`).

Les publications se trouvent dans `public/flyers/`, en deux versions :
`nom.jpg` pour l'affichage plein écran et `nom-min.jpg` pour la vignette.
Pour en ajouter une, déposez les deux fichiers puis déclarez-la dans le
tableau `FLYERS` de `src/data/site.js`.

`FLYERS` est la source unique : la section « Nos publications » du site
public **et** l'onglet Publications de l'espace administration lisent le même
tableau. Une publication ajoutée apparaît des deux côtés sans autre
modification.

---

## Coordonnées

Toutes les informations de l'agence sont centralisées dans un seul fichier :
**`src/data/site.js`**. Modifiez-le pour changer le téléphone, le lien WhatsApp
ou le lien Google Maps partout sur le site d'un seul coup.

| Donnée | Valeur |
|---|---|
| Adresse | Massira 2 B n°823, en face Carrefour Abwab Addoha — Marrakech |
| Téléphone (appel principal) | 06 08 52 40 44 |
| Second mobile | 06 12 92 25 55 |
| Fixe | 05 24 49 09 94 |
| WhatsApp | 06 08 52 40 44 |
| Email | idlanhafida@gmail.com |

| Google Maps | https://maps.app.goo.gl/9g8jJwbsnBJim1AD9 |

Les boutons « Voir sur Google Maps », « Voir notre localisation » et l'icône
flottante ouvrent tous le lien officiel fourni. La carte intégrée en iframe
est centrée sur le Carrefour Abwab Addoha à Massira : les liens courts
`maps.app.goo.gl` ne sont pas incorporables directement, la carte sert donc de
repère visuel et le bouton renvoie vers le lieu exact.

Deux champs distincts dans `site.js` : `adresse` pour l'adresse complète
affichée dans les blocs contact, et `zone` pour le libellé court des badges
et titres de section.

---

## Palette

Les couleurs reprennent celles du logo Wafa Assurance. Elles sont définies
dans `tailwind.config.js` et utilisées partout via des noms lisibles :

| Jeton | Valeur | Usage |
|---|---|---|
| `vert` | #4C9C2E | Couleur principale, icônes, accents |
| `vert-fonce` | #37731F | Boutons pleins et texte vert (contraste AA) |
| `foret` | #1E3D18 | Titres et sections sombres |
| `jaune` | #F2B705 | Accents : pastilles, filets, soulignement |
| `sable` | #F6F5F0 | Fond des sections alternées |

Le vert clair sert aux surfaces et aux icônes, jamais au texte : sur fond
blanc son contraste tombe sous le seuil d'accessibilité. Tout texte vert
utilise `vert-fonce`.

---

## Vérification anti-robot

Le formulaire de devis et la connexion administration passent par
`components/Captcha.jsx`, qui fonctionne dans deux modes :

- **avec une clé** dans `.env` (`VITE_RECAPTCHA_SITE_KEY`) : vrai widget
  Google reCAPTCHA v2 « Je ne suis pas un robot ». Obtenez la clé sur
  https://www.google.com/recaptcha/admin ;
- **sans clé** : case à cocher simple, sans marque Google, qui bloque au moins
  les soumissions accidentelles.

**Une vérification côté navigateur ne protège de rien.** Un robot ignore
simplement le JavaScript et poste directement sur votre API. Le jeton renvoyé
par reCAPTCHA doit être validé par votre serveur auprès de
`https://www.google.com/recaptcha/api/siteverify` avant tout traitement.
Tant que le formulaire n'a pas de back-end, ce contrôle reste décoratif.

---

## Modalités de paiement

Actuellement affichés : **espèces à l'agence** (mis en avant) et **paiement
fractionné**. Le formulaire de devis comporte un champ « Mode de paiement
souhaité » alimenté par la même liste.

Le chèque et le virement bancaire ne sont pas supprimés : ils restent dans
`PAIEMENTS` (`src/data/site.js`) avec `affiche: false`. Passez le drapeau à
`true` pour les réafficher — ils reviendront d'un coup dans la section et
dans le formulaire.

Le site n'encaisse aucun paiement en ligne : c'est un choix, pas un manque.
Encaisser en ligne imposerait un contrat monétique, la conformité PCI-DSS et
un back-end sécurisé. Les règlements se font à l'agence ou par virement.

Pour modifier la liste, éditez `PAIEMENTS` dans `src/data/site.js`.

---

## Assistant en ligne

`components/AssistantIA.jsx` est un assistant de discussion accessible depuis
un bouton flottant. Il répond en français et en arabe sur l'adresse, les
horaires, les documents à fournir, les moyens de paiement, la déclaration de
sinistre, les conventions et les coordonnées.

Il fonctionne **hors ligne**, à partir d'une base de connaissances locale
(constante `BASE`) : aucun appel réseau, aucune clé d'API, aucune donnée
personnelle transmise. Quand il ne sait pas, il le dit et propose d'appeler
l'agence.

Pour le brancher sur un vrai modèle de langage, remplacez la fonction
`repondre` par un appel à **votre backend**, jamais directement au fournisseur
depuis le navigateur : une clé d'API placée dans le code front est visible par
tous les visiteurs.

### Et pour les appels téléphoniques

Un site web ne peut pas décrocher un téléphone : le navigateur n'a aucun accès
au réseau téléphonique. Un assistant vocal qui reçoit les appels est un projet
séparé, qui demande une chaîne serveur :

1. un numéro chez un opérateur programmable (Twilio, Vonage, ou un
   fournisseur marocain avec SIP) ;
2. la transcription de la voix en texte (speech-to-text) ;
3. un modèle de langage qui formule la réponse, avec la même base de
   connaissances que l'assistant du site ;
4. la synthèse vocale (text-to-speech) qui la renvoie à l'appelant ;
5. un transfert vers un conseiller dès que la demande sort du cadre.

Comptez un abonnement mensuel par numéro et une facturation à la minute.
Avant d'investir, une étape intermédiaire souvent suffisante : un message
d'accueil enregistré qui oriente vers WhatsApp et le site.

---

## Montants masqués

Les primes et les montants de devis n'apparaissent nulle part, ni sur le site
public ni dans l'espace administration. Les tarifs restent une affaire de
conseiller. Pour les réafficher, cherchez la fonction `dh()` dans
`src/pages/Espace.jsx`.

---

## Bilingue FR / AR

Tous les textes vivent dans **`src/i18n/textes.js`**, un objet par langue.
Pour corriger une formulation, modifiez-la à cet endroit uniquement.

La bascule dans la barre de navigation change `lang` et `dir` sur `<html>` :
la mise en page passe en RTL, la police devient Tajawal, les flèches et les
boutons flottants se retournent. Le choix est mémorisé dans le navigateur.

---

## Composants

```
src/
├── data/site.js              Coordonnées de l'agence
├── i18n/
│   ├── textes.js             Traductions FR et AR
│   └── LangueContext.jsx     Contexte de langue + gestion RTL
└── components/
    ├── Navbar.jsx            Navigation collante, menu mobile, bascule FR/AR
    ├── Hero.jsx              Titre, badges et boutons
    ├── HeroVisuel.jsx        Composition des univers couverts
    ├── Services.jsx          Grille des six assurances
    ├── ServiceCard.jsx       Carte de service réutilisable
    ├── AgenceLocale.jsx      Section « Une agence proche de vous à Addoha »
    ├── APropos.jsx           Présentation de l'agence
    ├── PourquoiNous.jsx      Quatre engagements
    ├── QuoteForm.jsx         Devis avec validation et notification de succès
    ├── Localisation.jsx      Carte Google Maps et boutons
    ├── FAQ.jsx               Accordéon accessible
    ├── Contact.jsx           Coordonnées, Appeler, WhatsApp, Maps
    ├── Footer.jsx            Pied de page
    ├── FloatingActions.jsx   Boutons flottants fixes
    └── Section.jsx           Section avec révélation au défilement
```

---

## Bouton « Appeler »

Le clic **lance toujours l'appel** : `BoutonAppel.jsx` ne bloque jamais la
navigation vers `tel:`. Sur mobile, le composeur s'ouvre avec le numéro
pré-rempli. Sur ordinateur, le système passe la main au logiciel de téléphonie
installé (Téléphone Windows, Skype, Teams, FaceTime via Handoff).

Si aucun logiciel n'est installé, le navigateur ne fait rien : un rappel
discret apparaît alors au bout d'une seconde et demie pour proposer le numéro
à copier. Il n'empêche pas l'appel, il ne fait que compenser son absence.

Le composant accepte `numero` et `lien` en propriétés, ce qui permet de
l'utiliser aussi bien pour le mobile que pour la ligne fixe.

---

## Espace administration

Le site public est **entièrement ouvert** : aucun compte n'est nécessaire pour
consulter les assurances, les publications, demander un devis ou joindre
l'agence. Clients et visiteurs y accèdent librement.

Un seul espace est protégé, réservé à l'équipe de l'agence :

| Accès | Adresse | Email | Mot de passe |
|---|---|---|---|
| Administration | `/connexion` | admin@ahlalkhair.ma | Admin2026 |

Le nom affiché dans l'en-tête de l'espace (Saad Kardad) se modifie dans la constante `ADMIN` de `src/lib/auth.jsx`.

Il donne accès au tableau de bord, aux demandes de devis, aux sinistres, à
l'annuaire clients et aux publications.

Les anciennes adresses `/client` et `/employe` n'existent plus et redirigent
vers l'accueil.

**Cette authentification est une démonstration côté navigateur.** Les
identifiants vivent dans `src/lib/auth.jsx` : acceptable pour une maquette,
jamais pour un site en production. Pour la mettre en service, remplacez la
fonction `connecter` par un appel à votre API qui renvoie un jeton JWT et
supprimez la constante `ADMIN`. Un back-end Express + MySQL complet est fourni
dans le projet `ahl-al-khair`.

---

## Formulaire de devis

La validation est en place côté client : nom, téléphone marocain, email
facultatif mais vérifié, type d'assurance et longueur du message. Une
notification de succès s'affiche après l'envoi.

L'envoi est actuellement simulé. Pour le brancher, ouvrez `QuoteForm.jsx`
et remplacez la ligne marquée par un appel à votre backend, ou par un
service de formulaire comme Formspree ou EmailJS :

```js
await fetch("/api/devis", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(f),
});
```

---

## Référencement

Titre, description, balises Open Graph, lien canonique et données
structurées `InsuranceAgency` sont dans `index.html`. Avant la mise en
ligne, remplacez `https://www.ahlalkhair.ma/` par votre domaine réel dans
la balise canonique et dans `public/robots.txt`.

---

## Accessibilité et performance

Lien d'évitement vers le contenu, contours de focus visibles, attributs
`aria-expanded` sur le menu et l'accordéon, libellés sur tous les champs,
icônes décoratives masquées aux lecteurs d'écran, `prefers-reduced-motion`
respecté. Le visuel du hero est construit en CSS plutôt qu'en image, la
carte Google est en chargement différé : le build pèse environ 58 Ko
compressés en JavaScript et 5 Ko en CSS.

---

## Déploiement

Vercel ou Netlify : commande de build `npm run build`, dossier de sortie `dist`.
