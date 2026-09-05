// Coordonnees officielles — relevees sur les supports de l'agence
export const SITE = {
  nom: "Assurances Ahl Al Khair",
  nomAr: "تأمينات أهل الخير",
  partenaire: "Agent Wafa Assurance",

  // Adresse complete de l'agence
  adresse: "Massira 2 B n°823, en face Carrefour Abwab Addoha",
  zone: "Massira 2 – Addoha, Marrakech",   // libelle court (badges, en-tetes)
  ville: "Marrakech",
  pays: "Maroc",

  // Numero d'appel principal — utilise par tous les boutons "Appeler"
  telephone: "06 08 52 40 44",
  telephoneLien: "tel:+212608524044",
  // Second mobile de l'agence
  mobile2: "06 12 92 25 55",
  mobile2Lien: "tel:+212612922555",
  // Ligne fixe
  fixe: "05 24 49 09 94",
  fixeLien: "tel:+212524490994",
  // WhatsApp — meme numero que l'appel principal
  whatsappNumero: "06 08 52 40 44",
  whatsapp: "https://wa.me/212608524044",

  email: "idlanhafida@gmail.com",
  emailLien: "mailto:idlanhafida@gmail.com",

  maps: "https://maps.app.goo.gl/9g8jJwbsnBJim1AD9",
  mapsIframe: "https://www.google.com/maps?q=Carrefour%20Market%20Abwab%20Addoha%20Massira%20Marrakech&hl=fr&z=16&output=embed",
  itineraire: "https://www.google.com/maps/dir/?api=1&destination=Carrefour%20Abwab%20Addoha%2C%20Massira%2C%20Marrakech",

  agrement: "Agrément n° AGT 5080 00000.11.C.2026.123 du 10 février 2026",
  loi: "Régie par la loi n° 17-99 portant code des assurances",
  annee: 2026,
};

// Publications et campagnes de l'agence
export const FLYERS = [
  {
    id: "concours-moto",
    fichier: "concours-moto",
    titre: { fr: "Jeu-concours : une moto à gagner", ar: "مسابقة: دراجة نارية للربح" },
    texte: { fr: "Toute souscription d'une assurance d'un an à l'agence donne droit de participer au tirage, avec plusieurs lots dont une moto. Scannez le QR du flyer pour nous localiser.", ar: "كل تأمين لمدة سنة بالوكالة يمنحكم حق المشاركة في السحب، مع عدة جوائز من بينها دراجة نارية. امسحوا رمز QR في الملصق لتحديد موقعنا." },
  },
  {
    id: "wafacash",
    fichier: "wafacash-services",
    titre: { fr: "Wafacash × Assurances Ahl Al Khair", ar: "وفاكاش × تأمينات أهل الخير" },
    texte: { fr: "Réglez vos factures Wifi, eau et électricité, achetez ou renouvelez votre vignette auto et rechargez vos lignes Maroc Telecom, Inwi, Orange et Méditel, directement à l'agence.", ar: "أدّوا فواتير الواي فاي والماء والكهرباء، اقتنوا أو جدّدوا وصل السيارة، واشحنوا خطوطكم اتصالات المغرب وإنوي وأورنج وميديتيل، مباشرة بالوكالة." },
  },
  {
    id: "wafapro",
    fichier: "wafapro-cafes-restaurants",
    titre: { fr: "WafaPro Spécial Cafés et Restaurants", ar: "وفا برو خاص بالمقاهي والمطاعم" },
    texte: { fr: "Multirisque professionnelle pour les cafés et restaurants, avec assistance 7j/7 et intervention sous 48 h.", ar: "تأمين متعدد الأخطار للمقاهي والمطاعم، مع مساعدة 7/7 وتدخل خلال 48 ساعة." },
  },
  {
    id: "conventions",
    fichier: "partenariats-conventions",
    titre: { fr: "Nos partenariats et conventions", ar: "شراكاتنا واتفاقياتنا" },
    texte: { fr: "Conventions signées avec les F.A.R, la DGSN, le groupe OCP, les Fondations Hassan II et Mohammed VI et la F.N.R.C.P.C Cyclo.", ar: "اتفاقيات موقعة مع القوات المسلحة الملكية، الأمن الوطني، مجموعة المكتب الشريف للفوسفاط ومؤسستي الحسن الثاني ومحمد السادس." },
  },
  {
    id: "voyage",
    fichier: "wafa-ima-assistance-voyage",
    titre: { fr: "Wafa IMA Assistance — Assurance voyage", ar: "وفا إما للإنجاد — تأمين السفر" },
    texte: { fr: "Conventions Schengen, étudiant, touristique et professionnelle. Couverture médicale à l'étranger et rapatriement.", ar: "اتفاقيات شنغن، الطلبة، السياحة والمهنيين. تغطية طبية بالخارج وإعادة إلى الوطن." },
  },
  {
    id: "presentation",
    fichier: "assurance-ahl-al-khair-ar",
    titre: { fr: "Nos assurances en un coup d'œil", ar: "تأميناتنا في لمحة" },
    texte: { fr: "Présentation de l'ensemble de nos branches et des conventions institutionnelles de l'agence.", ar: "عرض لجميع فروعنا واتفاقيات الوكالة المؤسساتية." },
  },
];

// Conventions institutionnelles
export const CONVENTIONS = [
  { fr: "Forces Armées Royales (F.A.R)", ar: "القوات المسلحة الملكية" },
  { fr: "Direction Générale de la Sûreté Nationale (DGSN)", ar: "المديرية العامة للأمن الوطني" },
  { fr: "Groupe OCP", ar: "مجموعة المكتب الشريف للفوسفاط" },
  { fr: "Fondation Hassan II pour l'éducation et la formation", ar: "مؤسسة الحسن الثاني للتعليم والتكوين" },
  { fr: "Fondation Mohammed VI Marrakech", ar: "مؤسسة محمد السادس مراكش" },
  { fr: "F.N.R.C.P.C Cyclo Marrakech", ar: "الجامعة الوطنية للدراجات مراكش" },
];

// Modes de reglement de l'agence.
//   affiche: true  -> visible sur le site et dans le formulaire de devis
//   affiche: false -> conserve ici mais masque partout
// Rien n'est supprime : basculez simplement le drapeau pour reafficher un mode.
export const PAIEMENTS = [
  {
    id: "especes",
    affiche: true,
    icone: "Banknote",
    titre: { fr: "Espèces", ar: "نقدا" },
    texte: { fr: "Réglez votre prime directement à l'agence, en une fois ou de façon fractionnée. Reçu remis immédiatement.", ar: "أداء القسط مباشرة بالوكالة، دفعة واحدة أو على أقساط. تسليم الوصل فورا." },
  },
  {
    id: "cheque",
    affiche: false,          // masque a la demande de l'agence
    icone: "FileCheck",
    titre: { fr: "Chèque", ar: "شيك" },
    texte: { fr: "Chèque à l'ordre de l'agence, remis au guichet lors de la signature du contrat.", ar: "شيك باسم الوكالة، يسلم بالشباك عند توقيع العقد." },
  },
  {
    id: "virement",
    affiche: false,          // masque a la demande de l'agence
    icone: "Landmark",
    titre: { fr: "Virement bancaire", ar: "تحويل بنكي" },
    texte: { fr: "Coordonnées bancaires communiquées par votre conseiller après validation du devis.", ar: "المعطيات البنكية يقدمها مستشاركم بعد المصادقة على العرض." },
  },
  {
    id: "fractionne",
    affiche: true,
    icone: "CalendarClock",
    titre: { fr: "Paiement fractionné", ar: "الأداء بالتقسيط" },
    texte: { fr: "Mensuel, trimestriel ou semestriel selon le contrat. Conditions à voir avec votre conseiller.", ar: "شهري، فصلي أو نصف سنوي حسب العقد. الشروط تحدد مع مستشاركم." },
  },
];

// Seuls les modes actives sont presentes aux visiteurs.
export const PAIEMENTS_VISIBLES = PAIEMENTS.filter((m) => m.affiche);
