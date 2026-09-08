/**
 * Gammes PALMA MEUBLE — contenu de niveau famille.
 * Règle : aucun produit nominatif inventé, aucune dimension, aucun prix,
 * aucune certification. `typologies` décrit les familles d'articles habituelles
 * du mobilier professionnel ; références, dimensions et finitions sont confirmées
 * au devis, sur la base du catalogue réel de l'entreprise.
 */

/** Filtres = destination d'usage + matière dominante (sémantique B2B). */
export const categories = [
  {
    id: 'bureau',
    icon: 'building',
    fr: { name: 'Entreprise & tertiaire', text: 'Bureaux, réunion, accueil, rangement de bureau.' },
    ar: { name: 'المقاولات والقطاع الثالث', text: 'مكاتب، اجتماعات، استقبال، تخزين إداري.' },
    en: { name: 'Business & tertiary', text: 'Desks, meeting, reception, office storage.' },
  },
  {
    id: 'scolaire',
    icon: 'board',
    fr: { name: 'Établissements scolaires', text: 'Salles de classe, ateliers, locaux enseignants.' },
    ar: { name: 'المؤسسات التعليمية', text: 'أقسام، ورشات، فضاءات الأساتذة.' },
    en: { name: 'Schools & training', text: 'Classrooms, workshops, staff rooms.' },
  },
  {
    id: 'collectivite',
    icon: 'archive',
    fr: { name: 'Administrations & institutions', text: 'Accueil du public, archives, salles, résidences.' },
    ar: { name: 'الإدارات والمؤسسات', text: 'استقبال العموم، الأرشيف، القاعات.' },
    en: { name: 'Public sector & institutions', text: 'Public counters, archives, halls, residences.' },
  },
  {
    id: 'bois',
    icon: 'wood',
    fr: { name: 'Mobilier en bois', text: 'Plateaux, caissons, armoires et bibliothèques.' },
    ar: { name: 'أثاث خشبي', text: 'أسطح، خزائن ومكتبات.' },
    en: { name: 'Wood furniture', text: 'Tops, pedestals, cupboards and shelving.' },
  },
  {
    id: 'metal',
    icon: 'metal',
    fr: { name: 'Mobilier en métal', text: 'Vestiaires, casiers, archives, structures.' },
    ar: { name: 'أثاث معدني', text: 'خزائن شخصية، أدراج ملفات وهياكل.' },
    en: { name: 'Metal furniture', text: 'Lockers, filing, structures.' },
  },
]

/**
 * @typedef {Object} Range
 * @property {string} slug
 * @property {string[]} tags   ids de categories
 * @property {string} image
 * @property {number} ratio
 * @property {?Object} specs   null = communiqué au devis (jamais inventé)
 */
export const products = [
  {
    slug: 'bureaux-postes-de-travail',
    tags: ['bureau', 'bois'],
    image: '/images/range-01.jpg',
    ratio: 1.32,
    mark: { fr: 'Poste de travail', ar: 'منصب عمل', en: 'Workstation' },
    fr: {
      name: 'Bureaux & postes de travail',
      desc: 'Bureaux individuels, angles, caissons et retours — de l’open space au bureau de direction.',
      detail:
        'Une gamme pensée par poste : plan de travail, caisson mobile, retour de table et passage des câbles. Nous chiffrons poste par poste, ce qui permet de comparer les options sans redessiner l’implantation.',
      typologies: [
        'Bureau simple et bureau d’angle',
        'Bureau de direction',
        'Caisson mobile et meuble d’apport',
        'Retour de table et surface latérale',
        'Plan de travail informatique',
      ],
    },
    ar: {
      name: 'مكاتب مناصب العمل',
      desc: 'مكاتب فردية وبزايا ووحدات تخزين، من المكاتب المفتوحة إلى مكاتب الإدارة.',
      detail: 'التسعير لكل منصب عمل يسمح بمقارنة الخيارات دون تغيير توزيع الفضاء.',
      typologies: ['مكتب مفرد ومكتب بزاوية', 'مكتب إدارة', 'وحدة تخزين متنقلة', 'سطح جانبي', 'مكتب إعلام آلي'],
    },
    en: {
      name: 'Desks & workstations',
      desc: 'Single and corner desks, pedestals and returns — open floor to management office.',
      detail: 'Priced per workstation, so options can be compared without redrawing the layout.',
      typologies: ['Single & corner desk', 'Executive desk', 'Mobile pedestal', 'Table return', 'IT worktop'],
    },
    specs: null,
  },
  {
    slug: 'chaises-et-sieges-de-travail',
    tags: ['bureau', 'collectivite'],
    image: '/images/range-02.jpg',
    ratio: 1.32,
    mark: { fr: 'Assises', ar: 'الجلسات', en: 'Seating' },
    fr: {
      name: 'Chaises & sièges de travail',
      desc: 'Sièges opérateur, chaises visiteurs, sièges de réunion et assises empilables pour les salles.',
      detail:
        'L’assise est le poste le plus sollicité d’un plateau. Nous séparons l’usage intensif du poste attitré, le siège visiteur et l’assise de salle, choisie pour le volume commandé et le type de sol.',
      typologies: [
        'Siège opérateur à réglages',
        'Chaise visiteur sur piètement ou 4 pieds',
        'Siège de réunion',
        'Assise empilable pour salle et amphithéâtre',
        'Tabouret d’atelier',
      ],
    },
    ar: {
      name: 'كراسي ومقاعد العمل',
      desc: 'مقاعد إدارية، كراسي زوار، مقاعد قاعات ومقاعد قابلة للتكديس.',
      detail: 'نميّز بين الاستعمال المكثف والمنصب الخفيف ومقعد القاعة، حسب الكميات ونوع الأرضية.',
      typologies: [
        'مقعد إداري قابل للتعديل',
        'كرسي زوار',
        'مقعد قاعات',
        'مقعد قابل للتكديس',
        'مقعد ورشة',
      ],
    },
    en: {
      name: 'Chairs & task seating',
      desc: 'Operator chairs, visitor chairs, meeting seats and stackable hall seating.',
      detail: 'We separate intensive-duty seats, light visitor chairs and hall seating, matched to quantity and floor type.',
      typologies: ['Adjustable operator chair', 'Visitor chair', 'Meeting chair', 'Stackable hall seat', 'Workshop stool'],
    },
    specs: null,
  },
  {
    slug: 'tables-reunion-formation',
    tags: ['bureau', 'collectivite', 'bois'],
    image: '/images/range-03.jpg',
    ratio: 1.32,
    fr: {
      name: 'Tables de réunion & formation',
      desc: 'Tables de conférence, tables de formation modulables et tables rabattables pour salles polyvalentes.',
      detail:
        'Des formats qui bougent : les tables se groupent pour une conférence, se séparent pour quatre salles de formation le lendemain. Piètement et habillage choisis selon la fréquence de manipulation.',
      typologies: [
        'Table de réunion rectangulaire',
        'Table de conférence ovale',
        'Table de formation modulable',
        'Table rabattable à roulettes',
        'Tableau et support de présentation',
      ],
    },
    ar: {
      name: 'طاولات الاجتماعات والتكوين',
      desc: 'طاولات مؤتمرات وطاولات تكوين قابلة للتركيب وطاولات طي للقاعات متعددة الاستعمال.',
      detail: 'تُجمَّع الطاولات للاجتماع وتُفرَّق للقاعات حسب اليوم.',
      typologies: [
        'طاولة اجتماعات مستطيلة',
        'طاولة مؤتمرات بيضاوية',
        'طاولة تكوين قابلة للتركيب',
        'طاولة طي بعجلات',
        'سبورة وحامل عروض',
      ],
    },
    en: {
      name: 'Meeting & training tables',
      desc: 'Conference tables, modular training tables and folding tables for multi-purpose rooms.',
      detail: 'Tables cluster for a conference and split into four training rooms the next morning.',
      typologies: ['Rectangular meeting table', 'Oval conference table', 'Modular training table', 'Folding table on castors', 'Board & presentation stand'],
    },
    specs: null,
  },
  {
    slug: 'reception-et-salle-dattente',
    tags: ['bureau', 'collectivite'],
    image: '/images/range-04.jpg',
    ratio: 1.32,
    mark: { fr: 'Accueil du public', ar: 'استقبال العموم', en: 'Public counter' },
    fr: {
      name: 'Accueil & salles d’attente',
      desc: 'Comptoirs d’accueil, guichets, banquettes et tables basses pour les zones ouvertes au public.',
      detail:
        'Un accueil se conçoit du côté du visiteur : hauteur de comptoir, distance d’échange, assises qui se nettoient vite et circulations qui restent libres.',
      typologies: [
        'Comptoir d’accueil et guichet',
        'Comptoir avec partie abaissée accessible',
        'Banquette et sièges d’attente en rangée',
        'Table basse et meuble d’appoint',
        'Séparatif et aménagement de file',
      ],
    },
    ar: {
      name: 'الاستقبال وقاعات الانتظار',
      desc: 'طاولات استقبال وشبابيك وكنبات انتظار للمناطق المفتوحة للعموم.',
      detail: 'يُصمَّم الاستقبال من جهة الزائر: ارتفاع الشباك، مسافة التبادل، وتنظيف سريع للمقاعد.',
      typologies: [
        'طاولة استقبال وشباك',
        'شباك بجزء منخفض في متناول الجميع',
        'كنبة ومقاعد انتظار متصلة',
        'طاولة منخفضة ووحدة مساندة',
        'فواصل وتنظيم الطوابير',
      ],
    },
    en: {
      name: 'Reception & waiting areas',
      desc: 'Reception counters, service windows, benches and low tables for public-facing zones.',
      detail: 'A reception is designed from the visitor’s side: counter height, exchange distance, seating that wipes clean, clear circulation.',
      typologies: ['Reception counter & window', 'Lowered accessible counter section', 'Waiting bench & row seating', 'Low table & side unit', 'Partition & queue layout'],
    },
    specs: null,
  },
  {
    slug: 'rangements-et-armoires',
    tags: ['bureau', 'collectivite', 'bois'],
    image: '/images/range-05.jpg',
    ratio: 1.32,
    fr: {
      name: 'Rangements & armoires',
      desc: 'Armoires de bureau, bibliothèques, meubles fermés et modules de classement pour documents et matériel.',
      detail:
        'Le rangement est ce qui fait tenir un service dans ses murs. Nous composons avec des modules de même hauteur et de même profondeur, pour que les extensions commandées dans deux ans s’alignent encore.',
      typologies: [
        'Armoire battante et armoire coulissante',
        'Bibliothèque et étagère de magasinage',
        'Meuble de rangement vitré',
        'Caisson de classement et bacs',
        'Meuble bas de séparation',
      ],
    },
    ar: {
      name: 'خزائن وأثاث تخزين',
      desc: 'خزائن مكتبية، مكتبات ووحدات مغلقة للوثائق والعتاد.',
      detail: 'نركّب من وحدات بالارتفاع والعمق نفسيهما لتتطابق الإضافات لاحقًا.',
      typologies: [
        'خزانة أبواب وسحّابات',
        'مكتبة ورفوف تخزين',
        'خزانة بواجهة زجاجية',
        'حاويات وأدراج فرز',
        'وحدة منخفضة فاصلة',
      ],
    },
    en: {
      name: 'Storage & cupboards',
      desc: 'Office cupboards, bookcases, closed units and filing modules for documents and equipment.',
      detail: 'Built from modules sharing one height and depth, so units ordered two years later still line up.',
      typologies: ['Swing & sliding door cupboard', 'Bookcase & storage shelving', 'Glazed display unit', 'Filing pedestal & bins', 'Low divider unit'],
    },
    specs: null,
  },
  {
    slug: 'mobilier-scolaire',
    tags: ['scolaire', 'bois', 'collectivite'],
    image: '/images/range-06.jpg',
    ratio: 1.32,
    mark: { fr: 'Salles de classe', ar: 'الأقسام', en: 'Classroom' },
    fr: {
      name: 'Mobilier scolaire',
      desc: 'Tables-élèves, pupitres avec range-books, tables enseignants et chaises de classe.',
      detail:
        'Une salle de classe se juge après trois années d’usage : chants protégés, visserie accessible pour les resserrements, hauteur d’assise adaptée au niveau. Nous chiffrons par salle, puis par bâtiment.',
      typologies: [
        'Table élève simple et double',
        'Pupitre avec range-book',
        'Table et chaise adaptées par niveau scolaire',
        'Bureau et chaise de l’enseignant',
        'Table de travail manuel et atelier',
        'Pupitre d’amphithéâtre',
      ],
    },
    ar: {
      name: 'الأثاث المدرسي',
      desc: 'طاولات التلاميذ، مقاعد بدرج كتب، طاولات الأساتذة وكراسي الأقسام.',
      detail: 'نسعّر لكل قسم ثم لكل مبنى، مع اختيار ارتفاع المقعد حسب المستوى الدراسي.',
      typologies: [
        'طاولة تلميذ مفردة ومزدوجة',
        'مقعد بدرج كتب',
        'طاولة وكرسي حسب المستوى',
        'مكتب وكرسي الأستاذ',
        'طاولة أشغال يدوية وورشات',
        'مقعد مدرّج',
      ],
    },
    en: {
      name: 'School furniture',
      desc: 'Pupil desks, chair-desks with book storage, teacher desks and classroom chairs.',
      detail:
        'A classroom is judged after three years: protected edges, hardware you can re-tighten, seat height matched to the grade level. Priced per room, then per building.',
      typologies: ['Single & double pupil desk', 'Chair-desk with book box', 'Grade-matched table and chair', 'Teacher desk & chair', 'Craft and workshop table', 'Lecture hall tablet chair'],
    },
    specs: null,
  },
  {
    slug: 'mobilier-metal-vestiaires-archives',
    tags: ['metal', 'collectivite', 'scolaire'],
    image: '/images/range-07.jpg',
    ratio: 1.32,
    fr: {
      name: 'Mobilier métallique — vestiaires & archives',
      desc: 'Casiers de vestiaire, armoires de classement, bacs et rayonnages métalliques.',
      detail:
        'Le métal répond là où le bois fatigue : vestiaire d’atelier ou de cantine, local de rangement, salle d’archives. Aération, fermeture et nombre de colonnes sont décidés avec vous, puis repris à l’identique lors des extensions.',
      typologies: [
        'Casier de vestiaire 1 à 4 portes',
        'Banc de vestiaire et porte-effets',
        'Armoire de classement et à plans',
        'Rayonnage métallique de magasin',
        'Meuble à clés et local technique',
      ],
    },
    ar: {
      name: 'أثاث معدني — خزائن وأرشيف',
      desc: 'خزائن شخصية، خزائن حفظ الوثائق، حاويات وأرفف معدنية.',
      detail: 'المعدن حيث يتعب الخشب: خزائن الورشات والمطاعم والأرشيف. تُحدَّد التهوية والإغلاق وعدد الأبواب معًا.',
      typologies: [
        'خزانة شخصية من باب إلى أربعة',
        'مقعد خزائن وحامل معاطف',
        'خزانة ملفات ووثائق',
        'أرفف معدنية للمستودع',
        'خزانة مفاتيح ووحدة تقنية',
      ],
    },
    en: {
      name: 'Metal furniture — lockers & archives',
      desc: 'Locker banks, filing cabinets, tubs and metal shelving.',
      detail:
        'Steel goes where wood tires: workshop and canteen lockers, storage rooms, archives. Ventilation, locking and bay count are set with you and repeated on extension orders.',
      typologies: ['1–4 door locker bay', 'Locker bench & coat stand', 'Filing & plan cabinet', 'Warehouse metal shelving', 'Key cabinet & technical unit'],
    },
    specs: null,
  },
]

export const byCategory = (id) => (id === 'all' ? products : products.filter((p) => (p.tags || []).includes(id)))
export const findProduct = (slug) => products.find((p) => p.slug === slug)
export const tagCount = (id) => (id === 'all' ? products.length : products.filter((p) => (p.tags || []).includes(id)).length)
