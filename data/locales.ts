/**
 * LANGUAGE LANDING PAGES
 * ======================
 *
 * One page per buyer language at /<code>, asked for by the owner on 16 November
 * 2026 to reach buyers in every country: German, French, Spanish, Arabic,
 * Italian, Dutch and Polish. Each is written in its language, not a word-for-word
 * copy of the English home page, and says only what the English site already
 * publishes: the manufacturer-and-partner model, the owner's team figures, the
 * documented apron export, FOB Port Qasim and the specification-first process.
 * No MOQ, price, lead time, certification or client.
 *
 * Product names link to the English product pages, and each page says so.
 * hreflang alternates join every language page and the English home page, with
 * the English home as x-default, so a search engine shows a buyer the page in
 * their language.
 *
 * Written by Claude on 16 November 2026 and not yet checked by native
 * speakers; `reviewed` stays false until one has read it.
 */

export type LocaleCode = "de" | "fr" | "es" | "ar" | "it" | "nl" | "pl";

export type LocalePage = {
  code: LocaleCode;
  /** BCP 47 tag for hreflang and the lang attribute. */
  hreflang: string;
  dir: "ltr" | "rtl";
  /** Language name in itself, for the language switcher. */
  native: string;
  reviewed: boolean;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  headline: [string, string, string];
  intro: string;
  cta: { quote: string; whatsapp: string; whatsappMessage: string };
  figures: { own: string; ownNote: string; partners: string; partnersNote: string; export: string; exportNote: string };
  productsHeading: string;
  productsNote: string;
  /** Family slug to its name in this language. */
  products: Record<string, string>;
  processHeading: string;
  process: { title: string; body: string }[];
  /** EU duty note; absent where it does not apply. */
  trade?: { heading: string; body: string };
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  contactHeading: string;
  contactBody: string;
  draftNote: string;
};

/** Families listed on every language page: the current-capability core. */
export const LOCALE_FAMILIES = [
  "aprons",
  "uniform-workwear",
  "polos-tshirts",
  "fleece-sweatshirts",
  "woven-shirts",
  "bottoms",
  "outerwear",
  "hospitality-food-service",
  "medical-scrubs",
  "caps-headwear",
  "bags-totes",
  "kidswear",
] as const;

export const localePages: LocalePage[] = [
  /* ------------------------------------------------------------ Deutsch */
  {
    code: "de",
    hreflang: "de",
    dir: "ltr",
    native: "Deutsch",
    reviewed: false,
    seoTitle: "Bekleidungshersteller in Pakistan",
    seoDescription:
      "AHM International, Karachi: Schürzen, Berufs- und Arbeitskleidung nach Ihrer Spezifikation gefertigt und FOB Port Qasim geliefert.",
    eyebrow: "Bekleidungshersteller · Karachi, Pakistan",
    headline: ["Ihre Spezifikation.", "Unsere Fertigung.", "FOB Karachi."],
    intro:
      "AHM International fertigt Schürzen, Berufsbekleidung, Arbeitskleidung und Private-Label-Bekleidung nach der Spezifikation des Einkäufers, in eigener Produktion und mit spezialisierten Partnerfabriken, und liefert FOB ab Port Qasim, Karachi.",
    cta: { quote: "FOB-Angebot anfragen", whatsapp: "WhatsApp", whatsappMessage: "Hallo AHM International, ich interessiere mich für eine Produktion." },
    figures: {
      own: "200+",
      ownNote: "eigene Mitarbeitende, davon 200 im Zuschnitt und in der Näherei",
      partners: "1.000+",
      partnersNote: "Beschäftigte in den Partnerfabriken, mit denen AHM produziert, getrennt ausgewiesen",
      export: "USA",
      exportNote: "dokumentierter FOB-Export von Latzschürzen aus Polyester-Baumwolle",
    },
    productsHeading: "Was wir fertigen",
    productsNote: "Die Produktseiten sind auf Englisch.",
    products: {
      aprons: "Schürzen",
      "uniform-workwear": "Berufs- und Arbeitskleidung",
      "polos-tshirts": "Poloshirts und T-Shirts",
      "fleece-sweatshirts": "Fleece und Sweatshirts",
      "woven-shirts": "Webhemden",
      bottoms: "Arbeitshosen und Shorts",
      outerwear: "Jacken und Westen",
      "hospitality-food-service": "Gastronomie- und Kochbekleidung",
      "medical-scrubs": "Medizinische Kasacks",
      "caps-headwear": "Caps und Kopfbedeckungen",
      "bags-totes": "Taschen und Beutel",
      kidswear: "Kinderbekleidung",
    },
    processHeading: "So läuft es ab",
    process: [
      { title: "Sie senden die Referenz", body: "Ein Tech Pack, ein Referenzteil oder eine schriftliche Anforderung, mit Menge und Bestimmungsort." },
      { title: "Wir prüfen die Konstruktion", body: "Stoff und Gewicht, Taschen, Verschlüsse, Verstärkungen, Etiketten und Verpackung werden aus der Referenz gelesen, nicht angenommen." },
      { title: "Offene Punkte werden geklärt", body: "Was die Referenz offenlässt, fragen wir vor der Kalkulation nach, damit der Preis Ihre Frage beantwortet." },
      { title: "Sie erhalten ein FOB-Angebot", body: "Auf derselben Grundlage wie Ihr heutiger Artikel, damit beide Positionen vergleichbar sind." },
    ],
    trade: {
      heading: "Zollvorteil in der EU",
      body: "Pakistan ist begünstigtes Land des EU-Präferenzsystems APS+ (GSP+). Bei Einhaltung der Ursprungsregeln können für viele Textilwaren ermäßigte oder keine Einfuhrzölle anfallen. Prüfen Sie den aktuellen Stand für Ihre Zolltarifnummer.",
    },
    faqHeading: "Häufige Fragen",
    faqs: [
      { question: "Wie hoch ist die Mindestbestellmenge?", answer: "Sie hängt vom Artikel, Stoff und der Veredelung ab und wird mit dem Angebot genannt, nicht pauschal." },
      { question: "Liefern Sie FOB?", answer: "Ja. AHM liefert FOB ab Port Qasim, Karachi. Fracht, Versicherung und Verzollung im Bestimmungsland organisiert der Käufer." },
      { question: "Produzieren Sie nach meinem Tech Pack?", answer: "Ja. Ein Tech Pack, ein Referenzteil oder eine schriftliche Beschreibung genügt für den Anfang." },
      { question: "In welcher Sprache kommunizieren Sie?", answer: "Die Geschäftskorrespondenz läuft auf Englisch, per E-Mail und WhatsApp." },
    ],
    contactHeading: "Schreiben Sie uns",
    contactBody: "E-Mail oder WhatsApp, auf Englisch. Wir antworten mit Fragen zur Konstruktion und einem FOB-Angebot.",
    draftNote: "Diese Seite wurde ins Deutsche übertragen; maßgeblich ist die englische Website.",
  },

  /* ----------------------------------------------------------- Français */
  {
    code: "fr",
    hreflang: "fr",
    dir: "ltr",
    native: "Français",
    reviewed: false,
    seoTitle: "Fabricant de vêtements au Pakistan",
    seoDescription:
      "AHM International, Karachi : tabliers, uniformes et vêtements de travail fabriqués selon votre cahier des charges, livrés FOB Port Qasim.",
    eyebrow: "Fabricant de vêtements · Karachi, Pakistan",
    headline: ["Votre cahier des charges.", "Notre fabrication.", "FOB Karachi."],
    intro:
      "AHM International fabrique des tabliers, des uniformes, des vêtements de travail et des vêtements en marque privée selon le cahier des charges de l'acheteur, dans ses propres ateliers et avec des usines partenaires spécialisées, et les livre FOB depuis Port Qasim, Karachi.",
    cta: { quote: "Demander un prix FOB", whatsapp: "WhatsApp", whatsappMessage: "Bonjour AHM International, je souhaite étudier une production." },
    figures: {
      own: "200+",
      ownNote: "salariés d'AHM, dont 200 à la coupe et à la couture",
      partners: "1 000+",
      partnersNote: "ouvriers dans les usines partenaires avec lesquelles AHM produit, comptés à part",
      export: "États-Unis",
      exportNote: "export FOB documenté de tabliers à bavette en polyester-coton",
    },
    productsHeading: "Ce que nous fabriquons",
    productsNote: "Les pages produits sont en anglais.",
    products: {
      aprons: "Tabliers",
      "uniform-workwear": "Uniformes et vêtements de travail",
      "polos-tshirts": "Polos et T-shirts",
      "fleece-sweatshirts": "Polaires et sweat-shirts",
      "woven-shirts": "Chemises",
      bottoms: "Pantalons et shorts de travail",
      outerwear: "Vestes et gilets",
      "hospitality-food-service": "Vêtements de cuisine et de service",
      "medical-scrubs": "Tenues médicales",
      "caps-headwear": "Casquettes et couvre-chefs",
      "bags-totes": "Sacs et tote bags",
      kidswear: "Vêtements pour enfants",
    },
    processHeading: "Comment nous travaillons",
    process: [
      { title: "Vous envoyez la référence", body: "Une fiche technique, un vêtement de référence ou un besoin écrit, avec la quantité et la destination." },
      { title: "Nous étudions la construction", body: "Tissu et grammage, poches, fermetures, renforts, étiquettes et emballage, lus dans la référence et non supposés." },
      { title: "Les points ouverts sont clarifiés", body: "Ce que la référence ne précise pas est demandé avant le chiffrage, pour que le prix réponde à votre question." },
      { title: "Vous recevez un prix FOB", body: "Sur la même base que l'article que vous achetez aujourd'hui, pour une comparaison ligne à ligne." },
    ],
    trade: {
      heading: "Avantage douanier dans l'UE",
      body: "Le Pakistan bénéficie du SPG+ de l'Union européenne. Lorsque les règles d'origine sont respectées, de nombreux textiles peuvent entrer avec des droits réduits ou nuls. Vérifiez la situation actuelle pour votre code douanier.",
    },
    faqHeading: "Questions fréquentes",
    faqs: [
      { question: "Quelle est la quantité minimale de commande ?", answer: "Elle dépend de l'article, du tissu et de la décoration, et figure dans le devis plutôt qu'en chiffre unique." },
      { question: "Livrez-vous en FOB ?", answer: "Oui, FOB Port Qasim, Karachi. Le fret, l'assurance et le dédouanement à destination sont organisés par l'acheteur." },
      { question: "Pouvez-vous produire d'après ma fiche technique ?", answer: "Oui. Une fiche technique, un vêtement de référence ou une description écrite suffit pour commencer." },
      { question: "Dans quelle langue échangez-vous ?", answer: "Les échanges commerciaux se font en anglais, par e-mail et WhatsApp." },
    ],
    contactHeading: "Écrivez-nous",
    contactBody: "Par e-mail ou WhatsApp, en anglais. Nous revenons avec nos questions sur la construction et un prix FOB.",
    draftNote: "Cette page est une adaptation en français ; le site en anglais fait foi.",
  },

  /* ------------------------------------------------------------ Español */
  {
    code: "es",
    hreflang: "es",
    dir: "ltr",
    native: "Español",
    reviewed: false,
    seoTitle: "Fabricante de ropa en Pakistán",
    seoDescription:
      "AHM International, Karachi: delantales, uniformes y ropa de trabajo fabricados según su especificación y entregados FOB Port Qasim.",
    eyebrow: "Fabricante de ropa · Karachi, Pakistán",
    headline: ["Su especificación.", "Nuestra fabricación.", "FOB Karachi."],
    intro:
      "AHM International fabrica delantales, uniformes, ropa de trabajo y prendas de marca propia según la especificación del comprador, con producción propia y fábricas asociadas especializadas, y las entrega FOB desde Port Qasim, Karachi.",
    cta: { quote: "Solicitar precio FOB", whatsapp: "WhatsApp", whatsappMessage: "Hola AHM International, me interesa una producción." },
    figures: {
      own: "200+",
      ownNote: "empleados propios, 200 de ellos en corte y costura",
      partners: "1.000+",
      partnersNote: "trabajadores en las fábricas asociadas con las que produce AHM, contados aparte",
      export: "EE. UU.",
      exportNote: "exportación FOB documentada de delantales de peto de poliéster-algodón",
    },
    productsHeading: "Lo que fabricamos",
    productsNote: "Las páginas de producto están en inglés.",
    products: {
      aprons: "Delantales",
      "uniform-workwear": "Uniformes y ropa de trabajo",
      "polos-tshirts": "Polos y camisetas",
      "fleece-sweatshirts": "Forros polares y sudaderas",
      "woven-shirts": "Camisas",
      bottoms: "Pantalones y bermudas de trabajo",
      outerwear: "Chaquetas y chalecos",
      "hospitality-food-service": "Ropa de cocina y hostelería",
      "medical-scrubs": "Uniformes sanitarios",
      "caps-headwear": "Gorras y prendas para la cabeza",
      "bags-totes": "Bolsas y totes",
      kidswear: "Ropa infantil",
    },
    processHeading: "Cómo trabajamos",
    process: [
      { title: "Usted envía la referencia", body: "Una ficha técnica, una prenda de referencia o un requisito por escrito, con cantidad y destino." },
      { title: "Revisamos la construcción", body: "Tejido y gramaje, bolsillos, cierres, refuerzos, etiquetas y embalaje, leídos de la referencia y no supuestos." },
      { title: "Aclaramos los puntos abiertos", body: "Lo que la referencia no define se pregunta antes de cotizar, para que el precio responda a su pregunta." },
      { title: "Recibe un precio FOB", body: "Sobre la misma base que el artículo que compra hoy, para compararlos línea por línea." },
    ],
    trade: {
      heading: "Ventaja arancelaria en la UE",
      body: "Pakistán es beneficiario del SPG+ de la Unión Europea. Si se cumplen las normas de origen, muchos textiles pueden entrar con aranceles reducidos o nulos. Compruebe la situación actual para su código arancelario.",
    },
    faqHeading: "Preguntas frecuentes",
    faqs: [
      { question: "¿Cuál es el pedido mínimo?", answer: "Depende del artículo, el tejido y la decoración, y se indica con la cotización, no como una cifra fija." },
      { question: "¿Entregan FOB?", answer: "Sí, FOB Port Qasim, Karachi. El flete, el seguro y el despacho en destino los organiza el comprador." },
      { question: "¿Fabrican según mi ficha técnica?", answer: "Sí. Una ficha técnica, una prenda de referencia o una descripción escrita basta para empezar." },
      { question: "¿En qué idioma se comunican?", answer: "La correspondencia comercial es en inglés, por correo electrónico y WhatsApp." },
    ],
    contactHeading: "Escríbanos",
    contactBody: "Por correo o WhatsApp, en inglés. Respondemos con preguntas sobre la construcción y un precio FOB.",
    draftNote: "Esta página es una adaptación al español; prevalece el sitio en inglés.",
  },

  /* ------------------------------------------------------------- العربية */
  {
    code: "ar",
    hreflang: "ar",
    dir: "rtl",
    native: "العربية",
    reviewed: false,
    seoTitle: "مصنع ملابس في باكستان",
    seoDescription:
      "إيه إتش إم إنترناشونال، كراتشي: مرايل وأزياء موحدة وملابس عمل تُصنع وفق مواصفاتكم وتُسلَّم فوب من ميناء قاسم.",
    eyebrow: "مصنع ملابس · كراتشي، باكستان",
    headline: ["مواصفاتكم.", "تصنيعنا.", "فوب كراتشي."],
    intro:
      "تصنّع إيه إتش إم إنترناشونال المرايل والأزياء الموحدة وملابس العمل والملابس بالعلامة الخاصة وفق مواصفات المشتري، في مرافق إنتاجها الخاصة ومع مصانع شريكة متخصصة، وتسلّمها بنظام فوب من ميناء قاسم في كراتشي.",
    cta: { quote: "اطلب عرض سعر فوب", whatsapp: "واتساب", whatsappMessage: "مرحباً إيه إتش إم إنترناشونال، أرغب في الاستفسار عن تصنيع." },
    figures: {
      own: "+200",
      ownNote: "موظف لدى الشركة، منهم 200 في القص والخياطة",
      partners: "+1,000",
      partnersNote: "عامل في المصانع الشريكة التي تنتج معها الشركة، ويُحتسبون بشكل منفصل",
      export: "الولايات المتحدة",
      exportNote: "تصدير موثّق بنظام فوب لمرايل الصدر من البوليستر والقطن",
    },
    productsHeading: "ما نصنعه",
    productsNote: "صفحات المنتجات باللغة الإنجليزية.",
    products: {
      aprons: "المرايل",
      "uniform-workwear": "الأزياء الموحدة وملابس العمل",
      "polos-tshirts": "قمصان البولو والتي شيرت",
      "fleece-sweatshirts": "الفليس والسويت شيرت",
      "woven-shirts": "القمصان المنسوجة",
      bottoms: "سراويل وشورتات العمل",
      outerwear: "الجاكيتات والسترات",
      "hospitality-food-service": "ملابس المطابخ والضيافة",
      "medical-scrubs": "الملابس الطبية",
      "caps-headwear": "القبعات وأغطية الرأس",
      "bags-totes": "الحقائب والأكياس",
      kidswear: "ملابس الأطفال",
    },
    processHeading: "كيف نعمل",
    process: [
      { title: "ترسلون المرجع", body: "ملف فني أو قطعة مرجعية أو متطلبات مكتوبة، مع الكمية ووجهة الشحن." },
      { title: "نراجع طريقة التصنيع", body: "القماش ووزنه والجيوب والإغلاقات والتقويات والملصقات والتغليف، كما وردت في المرجع لا كما نفترضها." },
      { title: "نوضّح النقاط المفتوحة", body: "ما لم يحدده المرجع نسأل عنه قبل التسعير، ليجيب السعر عن سؤالكم بالضبط." },
      { title: "تتلقون عرض سعر فوب", body: "على الأساس نفسه للقطعة التي تشترونها اليوم، لتتمكنوا من المقارنة بنداً بنداً." },
    ],
    faqHeading: "أسئلة شائعة",
    faqs: [
      { question: "ما الحد الأدنى للطلب؟", answer: "يعتمد على القطعة والقماش والتطريز أو الطباعة، ويُذكر مع عرض السعر وليس كرقم ثابت." },
      { question: "هل تسلّمون بنظام فوب؟", answer: "نعم، فوب ميناء قاسم في كراتشي. يتولى المشتري الشحن والتأمين والتخليص في بلد الوصول." },
      { question: "هل تصنعون وفق ملفي الفني؟", answer: "نعم. يكفي ملف فني أو قطعة مرجعية أو وصف مكتوب للبدء." },
      { question: "ما لغة التواصل؟", answer: "المراسلات التجارية باللغة الإنجليزية، عبر البريد الإلكتروني وواتساب." },
    ],
    contactHeading: "راسلونا",
    contactBody: "عبر البريد الإلكتروني أو واتساب، باللغة الإنجليزية. نرد بأسئلة حول التصنيع وعرض سعر فوب.",
    draftNote: "هذه الصفحة نسخة عربية؛ والمرجع هو الموقع باللغة الإنجليزية.",
  },

  /* ------------------------------------------------------------ Italiano */
  {
    code: "it",
    hreflang: "it",
    dir: "ltr",
    native: "Italiano",
    reviewed: false,
    seoTitle: "Produttore di abbigliamento in Pakistan",
    seoDescription:
      "AHM International, Karachi: grembiuli, divise e abbigliamento da lavoro prodotti su vostra specifica e consegnati FOB Port Qasim.",
    eyebrow: "Produttore di abbigliamento · Karachi, Pakistan",
    headline: ["La vostra specifica.", "La nostra produzione.", "FOB Karachi."],
    intro:
      "AHM International produce grembiuli, divise, abbigliamento da lavoro e capi a marchio privato sulla specifica dell'acquirente, con produzione propria e fabbriche partner specializzate, e li consegna FOB da Port Qasim, Karachi.",
    cta: { quote: "Richiedi un prezzo FOB", whatsapp: "WhatsApp", whatsappMessage: "Buongiorno AHM International, sono interessato a una produzione." },
    figures: {
      own: "200+",
      ownNote: "dipendenti di AHM, di cui 200 nel taglio e nella cucitura",
      partners: "1.000+",
      partnersNote: "lavoratori nelle fabbriche partner con cui AHM produce, conteggiati a parte",
      export: "USA",
      exportNote: "esportazione FOB documentata di grembiuli con pettorina in poliestere-cotone",
    },
    productsHeading: "Cosa produciamo",
    productsNote: "Le pagine prodotto sono in inglese.",
    products: {
      aprons: "Grembiuli",
      "uniform-workwear": "Divise e abbigliamento da lavoro",
      "polos-tshirts": "Polo e T-shirt",
      "fleece-sweatshirts": "Pile e felpe",
      "woven-shirts": "Camicie",
      bottoms: "Pantaloni e bermuda da lavoro",
      outerwear: "Giacche e gilet",
      "hospitality-food-service": "Abbigliamento per cucina e sala",
      "medical-scrubs": "Divise sanitarie",
      "caps-headwear": "Cappellini e copricapi",
      "bags-totes": "Borse e shopper",
      kidswear: "Abbigliamento per bambini",
    },
    processHeading: "Come lavoriamo",
    process: [
      { title: "Inviate il riferimento", body: "Una scheda tecnica, un capo di riferimento o un requisito scritto, con quantità e destinazione." },
      { title: "Esaminiamo la costruzione", body: "Tessuto e grammatura, tasche, chiusure, rinforzi, etichette e imballo, letti dal riferimento e non presunti." },
      { title: "Chiariamo i punti aperti", body: "Ciò che il riferimento non definisce viene chiesto prima del preventivo, perché il prezzo risponda alla vostra domanda." },
      { title: "Ricevete un prezzo FOB", body: "Sulla stessa base del capo che acquistate oggi, per un confronto voce per voce." },
    ],
    trade: {
      heading: "Vantaggio doganale nell'UE",
      body: "Il Pakistan beneficia dell'SPG+ dell'Unione europea. Se le regole di origine sono rispettate, molti tessili possono entrare con dazi ridotti o nulli. Verificate la situazione attuale per il vostro codice doganale.",
    },
    faqHeading: "Domande frequenti",
    faqs: [
      { question: "Qual è il quantitativo minimo d'ordine?", answer: "Dipende dal capo, dal tessuto e dalla decorazione, e viene indicato con il preventivo, non come cifra fissa." },
      { question: "Consegnate FOB?", answer: "Sì, FOB Port Qasim, Karachi. Nolo, assicurazione e sdoganamento a destinazione sono a cura dell'acquirente." },
      { question: "Producete sulla mia scheda tecnica?", answer: "Sì. Una scheda tecnica, un capo di riferimento o una descrizione scritta bastano per iniziare." },
      { question: "In che lingua comunicate?", answer: "La corrispondenza commerciale è in inglese, via e-mail e WhatsApp." },
    ],
    contactHeading: "Scriveteci",
    contactBody: "Via e-mail o WhatsApp, in inglese. Rispondiamo con domande sulla costruzione e un prezzo FOB.",
    draftNote: "Questa pagina è un adattamento in italiano; fa fede il sito in inglese.",
  },

  /* ----------------------------------------------------------- Nederlands */
  {
    code: "nl",
    hreflang: "nl",
    dir: "ltr",
    native: "Nederlands",
    reviewed: false,
    seoTitle: "Kledingfabrikant in Pakistan",
    seoDescription:
      "AHM International, Karachi: schorten, bedrijfskleding en werkkleding gemaakt volgens uw specificatie en geleverd FOB Port Qasim.",
    eyebrow: "Kledingfabrikant · Karachi, Pakistan",
    headline: ["Uw specificatie.", "Onze productie.", "FOB Karachi."],
    intro:
      "AHM International maakt schorten, bedrijfskleding, werkkleding en private-label kleding volgens de specificatie van de inkoper, in eigen productie en met gespecialiseerde partnerfabrieken, en levert FOB vanuit Port Qasim, Karachi.",
    cta: { quote: "FOB-prijs aanvragen", whatsapp: "WhatsApp", whatsappMessage: "Hallo AHM International, ik ben geïnteresseerd in een productie." },
    figures: {
      own: "200+",
      ownNote: "eigen medewerkers, van wie 200 in snijderij en naaiafdeling",
      partners: "1.000+",
      partnersNote: "werknemers in de partnerfabrieken waarmee AHM produceert, apart geteld",
      export: "VS",
      exportNote: "gedocumenteerde FOB-export van borstschorten van polyester-katoen",
    },
    productsHeading: "Wat we maken",
    productsNote: "De productpagina's zijn in het Engels.",
    products: {
      aprons: "Schorten",
      "uniform-workwear": "Bedrijfs- en werkkleding",
      "polos-tshirts": "Polo's en T-shirts",
      "fleece-sweatshirts": "Fleece en sweatshirts",
      "woven-shirts": "Overhemden",
      bottoms: "Werkbroeken en shorts",
      outerwear: "Jassen en bodywarmers",
      "hospitality-food-service": "Koks- en horecakleding",
      "medical-scrubs": "Medische kleding",
      "caps-headwear": "Petten en hoofddeksels",
      "bags-totes": "Tassen en totes",
      kidswear: "Kinderkleding",
    },
    processHeading: "Zo werken we",
    process: [
      { title: "U stuurt de referentie", body: "Een techpack, een referentiekledingstuk of een schriftelijke eis, met aantal en bestemming." },
      { title: "Wij bekijken de constructie", body: "Stof en gewicht, zakken, sluitingen, versterkingen, labels en verpakking, gelezen uit de referentie en niet aangenomen." },
      { title: "Open punten worden opgehelderd", body: "Wat de referentie openlaat, vragen we vóór de calculatie, zodat de prijs uw vraag beantwoordt." },
      { title: "U ontvangt een FOB-prijs", body: "Op dezelfde basis als het artikel dat u nu koopt, zodat u regel voor regel kunt vergelijken." },
    ],
    trade: {
      heading: "Douanevoordeel in de EU",
      body: "Pakistan is begunstigd onder het SAP+ (GSP+) van de Europese Unie. Als aan de oorsprongsregels wordt voldaan, kunnen veel textielproducten tegen verlaagd of nultarief worden ingevoerd. Controleer de actuele situatie voor uw goederencode.",
    },
    faqHeading: "Veelgestelde vragen",
    faqs: [
      { question: "Wat is de minimale bestelhoeveelheid?", answer: "Die hangt af van het artikel, de stof en de decoratie, en staat in de offerte in plaats van als vast getal." },
      { question: "Leveren jullie FOB?", answer: "Ja, FOB Port Qasim, Karachi. Vracht, verzekering en inklaring op de bestemming regelt de koper." },
      { question: "Produceren jullie volgens mijn techpack?", answer: "Ja. Een techpack, een referentiekledingstuk of een schriftelijke beschrijving is genoeg om te beginnen." },
      { question: "In welke taal communiceren jullie?", answer: "De zakelijke correspondentie is in het Engels, per e-mail en WhatsApp." },
    ],
    contactHeading: "Neem contact op",
    contactBody: "Per e-mail of WhatsApp, in het Engels. We antwoorden met vragen over de constructie en een FOB-prijs.",
    draftNote: "Deze pagina is een Nederlandse bewerking; de Engelse website is leidend.",
  },

  /* -------------------------------------------------------------- Polski */
  {
    code: "pl",
    hreflang: "pl",
    dir: "ltr",
    native: "Polski",
    reviewed: false,
    seoTitle: "Producent odzieży w Pakistanie",
    seoDescription:
      "AHM International, Karaczi: fartuchy, mundurki i odzież robocza szyte według Państwa specyfikacji, dostawa FOB Port Qasim.",
    eyebrow: "Producent odzieży · Karaczi, Pakistan",
    headline: ["Państwa specyfikacja.", "Nasza produkcja.", "FOB Karaczi."],
    intro:
      "AHM International produkuje fartuchy, odzież firmową, odzież roboczą i odzież pod marką własną według specyfikacji kupującego, we własnej produkcji i w wyspecjalizowanych fabrykach partnerskich, i dostarcza ją FOB z Port Qasim w Karaczi.",
    cta: { quote: "Zapytaj o cenę FOB", whatsapp: "WhatsApp", whatsappMessage: "Dzień dobry AHM International, interesuje mnie produkcja." },
    figures: {
      own: "200+",
      ownNote: "pracowników AHM, w tym 200 w krojowni i szwalni",
      partners: "1000+",
      partnersNote: "pracowników w fabrykach partnerskich, z którymi produkuje AHM, liczonych osobno",
      export: "USA",
      exportNote: "udokumentowany eksport FOB fartuchów z napierśnikiem z poliestru z bawełną",
    },
    productsHeading: "Co produkujemy",
    productsNote: "Strony produktów są w języku angielskim.",
    products: {
      aprons: "Fartuchy",
      "uniform-workwear": "Odzież firmowa i robocza",
      "polos-tshirts": "Koszulki polo i T-shirty",
      "fleece-sweatshirts": "Polary i bluzy",
      "woven-shirts": "Koszule",
      bottoms: "Spodnie i szorty robocze",
      outerwear: "Kurtki i kamizelki",
      "hospitality-food-service": "Odzież kucharska i gastronomiczna",
      "medical-scrubs": "Odzież medyczna",
      "caps-headwear": "Czapki i nakrycia głowy",
      "bags-totes": "Torby i torby bawełniane",
      kidswear: "Odzież dziecięca",
    },
    processHeading: "Jak pracujemy",
    process: [
      { title: "Przesyłają Państwo wzór", body: "Kartę techniczną, odzież wzorcową lub pisemne wymagania, z ilością i miejscem dostawy." },
      { title: "Analizujemy konstrukcję", body: "Tkaninę i gramaturę, kieszenie, zapięcia, wzmocnienia, etykiety i pakowanie, odczytane ze wzoru, a nie założone." },
      { title: "Wyjaśniamy otwarte kwestie", body: "O to, czego wzór nie określa, pytamy przed wyceną, aby cena odpowiadała na Państwa pytanie." },
      { title: "Otrzymują Państwo cenę FOB", body: "Na tej samej podstawie co obecnie kupowany artykuł, aby porównać pozycja po pozycji." },
    ],
    trade: {
      heading: "Korzyść celna w UE",
      body: "Pakistan jest beneficjentem systemu GSP+ Unii Europejskiej. Przy spełnieniu reguł pochodzenia wiele wyrobów tekstylnych może być importowanych z obniżonym lub zerowym cłem. Prosimy sprawdzić aktualną sytuację dla swojego kodu taryfy.",
    },
    faqHeading: "Najczęstsze pytania",
    faqs: [
      { question: "Jaka jest minimalna wielkość zamówienia?", answer: "Zależy od artykułu, tkaniny i zdobienia i jest podawana w ofercie, a nie jako stała liczba." },
      { question: "Czy dostarczacie FOB?", answer: "Tak, FOB Port Qasim, Karaczi. Fracht, ubezpieczenie i odprawę w kraju przeznaczenia organizuje kupujący." },
      { question: "Czy produkujecie według mojej karty technicznej?", answer: "Tak. Karta techniczna, odzież wzorcowa lub opis pisemny wystarczą, aby zacząć." },
      { question: "W jakim języku się komunikujecie?", answer: "Korespondencja handlowa odbywa się po angielsku, e-mailem i przez WhatsApp." },
    ],
    contactHeading: "Napisz do nas",
    contactBody: "E-mailem lub przez WhatsApp, po angielsku. Odpowiemy pytaniami o konstrukcję i ceną FOB.",
    draftNote: "Ta strona jest polską wersją; rozstrzygająca jest strona w języku angielskim.",
  },
];

export const localeCodes = localePages.map((l) => l.code);

export function getLocalePage(code: string): LocalePage | undefined {
  return localePages.find((l) => l.code === code);
}

/** hreflang map for every language page plus the English home, x-default English. */
export function hreflangAlternates(siteUrl: string): Record<string, string> {
  return {
    en: `${siteUrl}/`,
    ...Object.fromEntries(localePages.map((l) => [l.hreflang, `${siteUrl}/${l.code}`])),
    "x-default": `${siteUrl}/`,
  };
}
