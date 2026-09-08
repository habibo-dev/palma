/**
 * Contenus éditoriaux PALMA MEUBLE.
 * Aucun chiffre, aucune référence client, aucune certification : uniquement des
 * positions de travail et des capacités déclarées par l'entreprise.
 */

/** Profils d'acheteurs — chaque bloc part du problème de l'acheteur, pas du produit. */
export const sectors = [
  {
    id: 'entreprises',
    image: '/images/range-01.jpg',
    fr: {
      name: 'Entreprises & bureaux',
      problem: 'Un plateau à équiper ou à rénover sans arrêter l’activité.',
      text: 'Postes de travail, sièges, rangements et salle de réunion commandés ensemble, livrés par tranches et montés en horaires décalés. Le devis est établi poste par poste pour arbitrer sans tout changer.',
    },
    ar: {
      name: 'المقاولات والمكاتب',
      problem: 'تجهيز أو تجديد فضاء عمل دون إيقاف النشاط.',
      text: 'مناصب عمل، مقاعد، خزائن وقاعة اجتماعات تُطلب دفعة واحدة، وتُسلَّم على دفعات مع تركيب في أوقات مدروسة.',
    },
    en: {
      name: 'Companies & offices',
      problem: 'A floor to fit out or renew without stopping work.',
      text: 'Workstations, seating, storage and a meeting room ordered together, delivered in tranches and installed outside core hours. The quote is priced per workstation so you can arbitrate without redesigning.',
    },
  },
  {
    id: 'administrations',
    image: '/images/range-04.jpg',
    fr: {
      name: 'Administrations & collectivités',
      problem: 'Des guichets sollicités toute la journée et des archives qui s’accumulent.',
      text: 'Comptoirs et sièges d’attente conçus pour le public, armoires de classement et rayonnages métalliques pour les archives. Le même article est repris à l’identique d’une extension à l’autre.',
    },
    ar: {
      name: 'الإدارات والجماعات',
      problem: 'شبابيك تعمل طوال اليوم وأرشيف يتراكم.',
      text: 'طاولات استقبال ومقاعد انتظار مصمّمة للعموم، وخزائن وأرفف معدنية للأرشيف، تُعاد بنفس المواصفات في كل توسعة.',
    },
    en: {
      name: 'Public administration',
      problem: 'Counters busy all day and archives that keep growing.',
      text: 'Public counters and waiting seating built for traffic, filing cupboards and metal shelving for archives. The same item is repeated identically from one extension to the next.',
    },
  },
  {
    id: 'scolaire',
    image: '/images/range-06.jpg',
    fr: {
      name: 'Établissements scolaires',
      problem: 'Des salles hétérogènes, des niveaux différents, une rentrée à tenir.',
      text: 'Tables-élèves et pupitres choisis par niveau, mobilier des enseignants et salles spécialisées assortis. Nous chiffrons classe par classe, ce qui permet d’avancer bâtiment par bâtiment.',
    },
    ar: {
      name: 'المؤسسات التعليمية',
      problem: 'أقسام غير متجانسة ومستويات مختلفة وموعد دخول مدرسي.',
      text: 'طاولات ومقاعد مختارة حسب المستوى، وأثاث الأساتذة والقاعات المتخصصة. التسعير لكل قسم يسمح بالتقدّم مبنى بمبنى.',
    },
    en: {
      name: 'Schools & institutes',
      problem: 'Mixed rooms, different grade levels, one school year to hold.',
      text: 'Pupil desks and chair-desks matched by level, with staff and specialist-room furniture to suit. Priced room by room so you can move building by building.',
    },
  },
  {
    id: 'universites',
    image: '/images/apply-01.jpg',
    fr: {
      name: 'Universités & institutions',
      problem: 'Amphis, bibliothèques de travail et foyers à équiper en volume.',
      text: 'Pupitres d’amphithéâtre, tables de lecture, sièges en rangée et mobilier de résidence universitaire. Les quantités imposent une livraison échelonnée et un montage par salle.',
    },
    ar: {
      name: 'الجامعات والمؤسسات',
      problem: 'مدرجات وقاعات مطالعة وأحياء جاموية تحتاج تجهيزًا ضخمًا.',
      text: 'مقاعد مدرّجات، طاولات قراءة، كراسي في صفوف وأثاث الإقامات الجامعية، مع تسليم مجدول وتركيب لكل قاعة.',
    },
    en: {
      name: 'Universities & institutions',
      problem: 'Lecture halls, study libraries and residences to furnish at volume.',
      text: 'Lecture-hall tablet chairs, reading tables, row seating and residence furniture. Volumes call for scheduled delivery and install room by room.',
    },
  },
]

/** Ce que l'entreprise affirme : fabrication + distribution + suivi de projet. */
export const advantages = [
  {
    icon: 'factory',
    fr: {
      title: 'Fabricant et distributeur',
      text: 'Nous fabriquons les gammes courantes et complétons par un approvisionnement adapté quand un projet sort de la série. Un seul interlocuteur pour les deux volets.',
    },
    ar: {
      title: 'مصنّع وموزّع',
      text: 'نصنع التشكيلات الجارية ونكمل بما يلزم خارجها عند حاجة المشروع. جهة واحدة تتابع الجانبين.',
    },
    en: {
      title: 'Manufacturer and distributor',
      text: 'We build the standard ranges and source around them when a project steps outside the series. One contact covers both.',
    },
  },
  {
    icon: 'layers',
    fr: {
      title: 'Devis décomposé par lot',
      text: 'Un lot par nature d’ouvrage et par salle, avec quantités et désignations. Le document se lit tel quel en commission, en interne comme pour une consultation.',
    },
    ar: {
      title: 'عرض سعر مفصّل بالدفعات',
      text: 'دفعة لكل طبيعة عمل ولكل قاعة مع الكميات والتعيينات. الوثيقة تُقرأ مباشرة داخل اللجنة أو في طلب عرض.',
    },
    en: {
      title: 'Quote broken down by lot',
      text: 'One lot per type of work and per room, with quantities and descriptions. The document reads as-is in committee, internal or tendered.',
    },
  },
  {
    icon: 'wood-metal',
    fr: {
      title: 'Bois et métal dans la même commande',
      text: 'Mobilier de bureau en bois, vestiaires et archives en métal : une commande, une livraison, un montage, une réception.',
    },
    ar: {
      title: 'الخشب والمعدن في طلب واحد',
      text: 'أثاث مكتبي خشبي وخزائن وأرشيف معدني: طلب واحد، تسليم واحد، تركيب واحد.',
    },
    en: {
      title: 'Wood and metal on one order',
      text: 'Timber office furniture and steel lockers or archives: one order, one delivery, one install, one handover.',
    },
  },
  {
    icon: 'measure',
    fr: {
      title: 'Étude sur place avant chiffrage',
      text: 'Relevé des salles, des passages et des réservations avant le devis. Ce qui est validé sur place ne change plus en atelier.',
    },
    ar: {
      title: 'دراسة في المكان قبل التسعير',
      text: 'قياس القاعات والممرات قبل إعداد العرض. ما يُعتمد في المكان لا يتغيّر في الورشة.',
    },
    en: {
      title: 'Surveyed before it is priced',
      text: 'Rooms, access routes and clearances recorded before the quote. What is signed off on site does not change in the plant.',
    },
  },
  {
    icon: 'truck',
    fr: {
      title: 'Livraison sur site et montage',
      text: 'Livraison par tranches selon votre planning, montage et réglages assurés par nos équipes, enlèvement des emballages.',
    },
    ar: {
      title: 'التسليم والتركيب في المكان',
      text: 'تسليم على دفعات حسب برنامجكم، تركيب وضبط من طرف فرقنا، ورفع مواد التغليف.',
    },
    en: {
      title: 'Site delivery and assembly',
      text: 'Delivered in tranches to your schedule, assembled and adjusted by our crews, packing taken away.',
    },
  },
  {
    icon: 'archive',
    fr: {
      title: 'Références reproductibles',
      text: 'Une fois une référence validée, elle est reprise à l’identique sur les commandes suivantes — utile pour équiper un deuxième bâtiment dans dix-huit mois.',
    },
    ar: {
      title: 'مراجع قابلة للتكرار',
      text: 'المرجع المعتمد يُعاد بنفس المواصفات في الطلبيات اللاحقة — مفيد عند تجهيز مبنى ثانٍ بعد سنة ونصف.',
    },
    en: {
      title: 'Repeatable references',
      text: 'Once a reference is approved it is reproduced identically on later orders — useful for the second building in eighteen months.',
    },
  },
]

/** Deux familles de matières : ce que ces familles signifient sur un usage pro. */
export const materials = [
  {
    id: 'plateaux',
    texture: '/images/material-01.jpg',
    tint: '#c8b393',
    fr: { name: 'Plateaux & corps en bois', text: 'Surfaces de travail, caissons et habillages ; chants protégés pour les usages collectifs.' },
    ar: { name: 'أسطح وأجسام خشبية', text: 'مقاعد العمل والخزائن والأغطية مع حواف محمية للاستعمال الجماعي.' },
    en: { name: 'Wood tops & cases', text: 'Work surfaces, pedestals and panelling, with edges protected for shared use.' },
  },
  {
    id: 'structures',
    texture: '/images/material-02.jpg',
    tint: '#8d949b',
    fr: { name: 'Structures & piètements', text: 'Piétements et traverses métalliques : stabilité sur sol inégal, reprise de niveau en cours de montage.' },
    ar: { name: 'الهياكل والقواعد', text: 'قواعد وعوارض معدنية: ثبات على الأرض غير المستوية وضبط الارتفاع أثناء التركيب.' },
    en: { name: 'Frames & legs', text: 'Metal legs and rails: stable on uneven floors, levelled during assembly.' },
  },
  {
    id: 'metal',
    texture: '/images/material-03.jpg',
    tint: '#6e767e',
    fr: { name: 'Mobilier métallique', text: 'Vestiaires, casiers, armoires de classement et rayonnages — les volumes qui encaissent le passage continu.' },
    ar: { name: 'أثاث معدني', text: 'خزائن شخصية وأدراج ملفات وأرفف — الأحجام التي تتحمّل الاستعمال المستمر.' },
    en: { name: 'Metal furniture', text: 'Lockers, filing and shelving — the volumes that take continuous traffic.' },
  },
  {
    id: 'assises',
    texture: '/images/material-04.jpg',
    tint: '#4c5560',
    fr: { name: 'Assises & habillages', text: 'Mousses, habillages et mécaniques choisis selon la durée de présence au poste, du visiteur à l’opérateur.' },
    ar: { name: 'المقاعد والتنجيد', text: 'إسفنج وأقمشة وآليات تُختار حسب مدة الجلوس، من الزائر إلى الموظف.' },
    en: { name: 'Seating & covers', text: 'Foams, covers and mechanisms selected by hours-in-seat, from visitor to operator.' },
  },
]

/**
 * Applications — et non « réalisations » : nous n'affichons aucune référence
 * client tant qu'elle n'est pas autorisée par l'entreprise.
 */
export const ambiances = [
  {
    image: '/images/hero-01.jpg',
    span: 'wide',
    fr: { title: 'Open space & bureaux attitrés', text: 'Postes alignés, retours de table, rangements au même nuancier.' },
    ar: { title: 'مكاتب مفتوحة ومناصب فردية', text: 'مناصب مصطفّة وأسطح جانبية وخزائن بنفس السلسلة.' },
    en: { title: 'Open floor & private offices', text: 'Aligned stations, table returns, storage in one shade range.' },
  },
  {
    image: '/images/range-04.jpg',
    span: 'square',
    fr: { title: 'Guichet et salle d’attente', text: 'Comptoir, partie abaissée, sièges en rangée faciles à nettoyer.' },
    ar: { title: 'شباك وقاعة انتظار', text: 'طاولة استقبال، جزء منخفض، ومقاعد صفوف سهلة التنظيف.' },
    en: { title: 'Counter & waiting hall', text: 'Counter, lowered section, wipe-clean row seating.' },
  },
  {
    image: '/images/range-06.jpg',
    span: 'tall',
    fr: { title: 'Salle de classe', text: 'Tables-élèves par niveau, pupitre enseignant, circulation avant le tableau.' },
    ar: { title: 'قسم دراسي', text: 'طاولات حسب المستوى، مقعد الأستاذ، وممر أمام السبورة.' },
    en: { title: 'Classroom', text: 'Desks by level, teacher station, clear aisle to the board.' },
  },
  {
    image: '/images/apply-01.jpg',
    span: 'square',
    fr: { title: 'Bibliothèque de travail', text: 'Tables de lecture longues, sièges silencieux, rayonnages bas.' },
    ar: { title: 'قاعة مطالعة', text: 'طاولات قراءة طويلة، مقاعد صامتة وأرفف منخفضة.' },
    en: { title: 'Study library', text: 'Long reading tables, quiet chairs, low shelving.' },
  },
  {
    image: '/images/range-07.jpg',
    span: 'wide',
    fr: { title: 'Vestiaires & locaux techniques', text: 'Casiers métalliques aérés, bancs, meuble à clés — le mobilier qui ne se voit pas et ne tombe pas.' },
    ar: { title: 'خزائن شخصية ومحلات تقنية', text: 'خزائن معدنية مهواة، مقاعد ومفاتيح — الأثاث الذي لا يُرى ولا يتعطّل.' },
    en: { title: 'Lockers & technical rooms', text: 'Ventilated steel bays, benches, key cabinets — the furniture nobody notices and nothing breaks.' },
  },
]

/** Le déroulé commercial d'un projet B2B, sans délai inventé. */
export const process = [
  {
    fr: {
      title: 'Cahier des besoins',
      text: 'Vous envoyez la liste des salles ou le bordereau existant. À défaut de plan, un relevé sur place suffit à démarrer.',
      step: 'Gratuit',
    },
    ar: {
      title: 'دفتر الاحتياجات',
      text: 'ترسلون قائمة القاعات أو الجدول الموجود. وعند غياب المخطط يكفي قياس في المكان.',
      step: 'بالمجان',
    },
    en: {
      title: 'Requirements list',
      text: 'You send the room schedule or your existing bill of quantities. Without a plan, a site survey is enough to start.',
      step: 'No charge',
    },
  },
  {
    fr: {
      title: 'Sélection & échantillons',
      text: 'Gammes proposées par usage, nuances et habillages présentés, articles hors série recherchés si nécessaire.',
      step: 'Sur place ou au bureau',
    },
    ar: {
      title: 'الاختيار والنماذج',
      text: 'تشكيلات مقترحة حسب الاستعمال، مع عرض الألوان والتنجيد والبحث عن المواد خارج السلسلة عند الحاجة.',
      step: 'في المكان أو لدينا',
    },
    en: {
      title: 'Selection & samples',
      text: 'Ranges proposed by use, shades and covers presented, non-series items sourced where needed.',
      step: 'On site or at our office',
    },
  },
  {
    fr: {
      title: 'Devis par lot',
      text: 'Quantitatif salle par salle, prix unitaire et par lot, options séparées. Documents complémentaires fournis sur demande pour votre dossier.',
      step: 'Écrit',
    },
    ar: {
      title: 'عرض السعر بالدفعات',
      text: 'كميات لكل قاعة، سعر للوحدة وللدفعة، مع فصل الخيارات. والوثائق المكمّلة تُوفَّر عند الطلب لملفكم.',
      step: 'مكتوب',
    },
    en: {
      title: 'Quote by lot',
      text: 'Room-by-room quantities, unit and lot prices, options kept separate. Supporting documents supplied on request for your file.',
      step: 'In writing',
    },
  },
  {
    fr: {
      title: 'Fabrication & approvisionnement',
      text: 'Lancement en production pour ce qui est fabriqué, approvisionnement pour le reste, avec un point d’avancement communiqué.',
      step: 'Selon planning',
    },
    ar: {
      title: 'التصنيع والتزوّد',
      text: 'إطلاق الإنتاج لما يُصنع لدى المؤسسة، وتزوّد لما تبقى، مع إعلام مستمر بالحالة.',
      step: 'حسب البرنامج',
    },
    en: {
      title: 'Manufacture & procurement',
      text: 'In-house items released to production, the rest procured, with a progress note issued as it moves.',
      step: 'To schedule',
    },
  },
  {
    fr: {
      title: 'Livraison, montage, réception',
      text: 'Livraison par tranches, montage et réglages, puis procès-verbal de réception avec les références reprises pour les commandes suivantes.',
      step: 'Sur site',
    },
    ar: {
      title: 'التسليم والتركيب والاستلام',
      text: 'تسليم على دفعات، تركيب وضبط، ثم محضر استلام بالمراجع المعتمدة للطلبيات القادمة.',
      step: 'في المكان',
    },
    en: {
      title: 'Delivery, assembly, handover',
      text: 'Tranche deliveries, assembly and adjustment, then a handover record with the references kept for reorders.',
      step: 'On site',
    },
  },
]

export const faq = [
  {
    fr: {
      q: 'Établissez-vous un devis pour un marché ou une consultation ?',
      a: 'Oui. Nous produisons un devis descriptif et quantitatif par lot, avec désignations et volumes séparés. Les pièces administratives demandées sont fournies sur demande ; dites-nous simplement lequel de vos documents nous devons compléter.',
    },
    ar: {
      q: 'هل تعدّون عرض سعر لصفقة أو استشارة؟',
      a: 'نعم. نُصدر عرض سعر وصفيًا وكمّيًا لكل دفعة، بتعيينات وكميات مفصولة. والوثائق الإدارية المطلوبة تُوفَّر عند الطلب.',
    },
    en: {
      q: 'Do you quote for a tender or consultation?',
      a: 'Yes. We issue a descriptive, quantified quote by lot with separated descriptions and volumes. Requested administrative documents are supplied on ask — just tell us which form must be completed.',
    },
  },
  {
    fr: {
      q: 'Publiez-vous des prix en ligne ?',
      a: 'Non. Le prix dépend du volume, de la finition et du lieu de livraison. Un tarif publié hors contexte serait une erreur pour vous comme pour nous : le devis chiffré sur votre liste est le seul document fiable.',
    },
    ar: {
      q: 'هل تنشرون الأسعار؟',
      a: 'لا. السعر مرتبط بالكمية والتشطيب ومكان التسليم. نشر سعر خارج هذا السياق يضرّ الطرفين، ولهذا يُسلَّم عرض سعر على قائمتكم.',
    },
    en: {
      q: 'Do you publish prices?',
      a: 'No. Price follows volume, finish and delivery point. A published rate out of context would mislead both sides, so the priced quote against your list is the only document we issue.',
    },
  },
  {
    fr: {
      q: 'Livrez-vous en dehors de Constantine ?',
      a: 'Nous sommes basés à la Zone Industrielle Palma, à Constantine, et nous livrons sur site. Pour un projet hors de la région, la logistique est étudiée et chiffrée avec le devis.',
    },
    ar: {
      q: 'هل توصلون خارج قسنطينة؟',
      a: 'مقرّنا بالمنطقة الصناعية بالمَا بقسنطينة، والتسليم يتم إلى المكان. وبالنسبة لمشاريع خارج الجهة تُدرس اللوجستيك وتُسعَّر مع العرض.',
    },
    en: {
      q: 'Do you deliver outside Constantine?',
      a: 'We are based in Zone Industrielle Palma, Constantine, and deliver on site. Outside the region, logistics are assessed and priced with the quote.',
    },
  },
  {
    fr: {
      q: 'Peut-on commander par tranches ?',
      a: 'Oui, et c’est souvent la bonne méthode pour un bâtiment ou une école : premier lot validé, extensions reprises sur les mêmes références tant que la série est disponible.',
    },
    ar: {
      q: 'هل يمكن الطلب على دفعات؟',
      a: 'نعم، وهو غالبًا الأنسب لمبنى أو مدرسة: دفعة أولى معتمدة، ثم إضافات بنفس المراجع ما دامت السلسلة متوفرة.',
    },
    en: {
      q: 'Can we order in tranches?',
      a: 'Yes — often the right method for a building or a school: first lot approved, extensions repeated on the same references while the series remains available.',
    },
  },
  {
    fr: {
      q: 'Assurez-vous le montage ?',
      a: 'Le montage et les réglages sont assurés par nos équipes lors de la livraison, y compris la reprise d’aplomb sur place. L’emballage est évacué.',
    },
    ar: {
      q: 'هل تتكفلون بالتركيب؟',
      a: 'التركيب والضبط من قيام فرقنا عند التسليم، مع إعادة التسوية في المكان، ورفع مواد التغليف.',
    },
    en: {
      q: 'Do you assemble on site?',
      a: 'Assembly and adjustment are handled by our crews at delivery, including re-levelling in place. Packing is removed.',
    },
  },
]
