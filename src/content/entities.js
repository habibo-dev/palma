/** Materiaux & finitions — nuancier presenté au showroom. */
export const materials = [
  {
    id: 'chene',
    texture: '/images/material-01.jpg',
    tint: '#cdae7e',
    fr: { name: 'Chêne huilé', text: 'Veinage franc, finition huilée mate qui se ravive.' },
    ar: { name: 'بلوط مزيّت', text: 'عروق واضحة ولمسة نهائية زيتية غير لامعة.' },
    en: { name: 'Oiled oak', text: 'Straight grain, matte oiled finish that can be refreshed.' },
  },
  {
    id: 'noyer',
    texture: '/images/material-01.jpg',
    tint: '#6b4a30',
    fr: { name: 'Noyer teinté', text: 'Fond chaud, profond, pour les pièces de réception.' },
    ar: { name: 'جوز مصبوغ', text: 'درجات دافئة وعميقة لصالونات الاستقبال.' },
    en: { name: 'Stained walnut', text: 'Warm, deep tone for reception pieces.' },
  },
  {
    id: 'frene',
    texture: '/images/material-01.jpg',
    tint: '#d9c8a8',
    fr: { name: 'Frêne clair', text: 'Léger et lumineux, idéal pour les bureaux.' },
    ar: { name: 'دردار فاتح', text: 'خفيف ومضيء، مناسب للمكاتب.' },
    en: { name: 'Light ash', text: 'Light and bright, best for workspaces.' },
  },
  {
    id: 'rotin',
    texture: '/images/material-02.jpg',
    tint: '#d8bf95',
    fr: { name: 'Rotin tressé', text: 'Tressage main, laisse passer l’air et la lumière.' },
    ar: { name: 'خيزران مضفور', text: 'ضفر يدوي يمرّر الهواء والضوء.' },
    en: { name: 'Woven rattan', text: 'Hand-woven; lets air and light through.' },
  },
  {
    id: 'cannage',
    texture: '/images/material-02.jpg',
    tint: '#c2a97f',
    fr: { name: 'Cannage', text: 'Fonds de caisses et panneaux muraux ajourés.' },
    ar: { name: 'قضبان مفرغة', text: 'خلفيات الخزائن والألواح الجدارية.' },
    en: { name: 'Cane webbing', text: 'Drawer backs and open wall panels.' },
  },
  {
    id: 'lin',
    texture: '/images/material-03.jpg',
    tint: '#cfc4b0',
    fr: { name: 'Lin lavé', text: 'Housses déhoussables, teintures naturelles.' },
    ar: { name: 'كتان مغسول', text: 'أغطية قابلة للإزالة وأصباغ طبيعية.' },
    en: { name: 'Washed linen', text: 'Removable covers, natural dye lots.' },
  },
  {
    id: 'laine',
    texture: '/images/material-03.jpg',
    tint: '#a8977c',
    fr: { name: 'Laine bouclée', text: 'Assises et têtes de lit, tissu à usage intensif.' },
    ar: { name: 'صوف ممجدل', text: 'لمقاعد ورؤوس الأسرّة، قماش متين.' },
    en: { name: 'Bouclé wool', text: 'Seats and headboards, heavy-duty cloth.' },
  },
  {
    id: 'acier',
    texture: '/images/material-04.jpg',
    tint: '#3b3a35',
    fr: { name: 'Acier thermolaqué', text: 'Piétements fins, noir mat ou vert profond.' },
    ar: { name: 'فولاذ مطلي', text: 'قواعد رفيعة، أسود مطفي أو أخضر داكن.' },
    en: { name: 'Powder-coated steel', text: 'Slim bases, matte black or deep green.' },
  },
]

/** Secteurs d'application — chaque carte pose un probleme reel. */
export const sectors = [
  {
    id: 'bureaux',
    image: '/images/ambiance-01.jpg',
    fr: {
      name: 'Bureaux & espaces de travail',
      problem: 'Des plateaux mal zonés, câbles apparents, assises de récupération.',
      text: 'Zonage du plateau, postes assis-debout, salles de réunion insonorisées et vestiaires. Le mobilier est dimensionné sur place, pas au catalogue.',
    },
    ar: {
      name: 'مكاتب وفضاءات عمل',
      problem: 'مساحات غير مقسّمة، أسلاك ظاهرة، كراسي غير مريحة.',
      text: 'تقسيم الفضاء، مكاتب وقوف-جلوس، قاعات اجتماعات عازلة للصوت وخزائن.',
    },
    en: {
      name: 'Offices & workplaces',
      problem: 'Poorly zoned floors, exposed cabling, borrowed seating.',
      text: 'Floor zoning, sit-stand desks, quiet meeting rooms and lockers. Furniture sized on site, not from a catalogue.',
    },
  },
  {
    id: 'cafes',
    image: '/images/ambiance-02.jpg',
    fr: {
      name: 'Cafés, restos & salons de thé',
      problem: 'Turnover élevé, mobilier qui ne tient pas un service.',
      text: 'Banquettes au mur, tables à plateau résistant, chaises empilables. On pense le plan de salle pour rentabiliser chaque mètre carré.',
    },
    ar: {
      name: 'مقاهي ومطاعم',
      problem: 'ضغط كبير على التجهيز ومواد لا تتحمّل الخدمة.',
      text: 'كنبات على الجدار، طاولات متينة، كراسي قابلة للتكديس. دراسة توزيع الطاولات لتحسين كل متر مربع.',
    },
    en: {
      name: 'Cafés, restaurants & tea rooms',
      problem: 'High turnover, furniture that fails within a season.',
      text: 'Wall banquettes, hard-wearing table tops, stackable chairs. We plan the room to earn back every square metre.',
    },
  },
  {
    id: 'hotels',
    image: '/images/ambiance-03.jpg',
    fr: {
      name: 'Hôtellerie & résidences',
      problem: 'Chambres à meubler en série, entretiens fréquents.',
      text: 'Têtes de lit, bureaux, bagagers et minibars fabriqués en série avec un gabarit unique, pour que chaque chambre soit identique à la livraison.',
    },
    ar: {
      name: 'فنادق وإقامات',
      problem: 'غرف كثيرة يجب تجهيزها بنفس الجودة.',
      text: 'رؤوس أسرّة، مكاتب، حاملات حقائب وثلاجات صغيرة تُصنع ب نموذج موحّد.',
    },
    en: {
      name: 'Hotels & serviced residences',
      problem: 'Rooms to furnish in series, constant upkeep.',
      text: 'Headboards, desks, luggage racks and minis bars built from one master template so every room matches on handover.',
    },
  },
  {
    id: 'commerce',
    image: '/images/ambiance-04.jpg',
    fr: {
      name: 'Commerce & retail',
      problem: 'Un parcours client qui ne met rien en valeur.',
      text: 'Comptoirs, présentoirs, cabines, éclairage intégré des niches. Le mobilier devient l’outil de vente, pas son décor.',
    },
    ar: {
      name: 'محلات ونقاط بيع',
      problem: 'مسار زبون لا يبرز المنتوج.',
      text: 'مكاتب استقبال، رفوف عرض، غرف قياس، إضاءة مدمجة. الأثاث يصبح أداة بيع.',
    },
    en: {
      name: 'Retail & showrooms',
      problem: 'A customer path that flatters nothing.',
      text: 'Counters, display units, fitting rooms, lit niches. Furniture as the selling tool, not the backdrop.',
    },
  },
  {
    id: 'residentiel',
    image: '/images/ambiance-05.jpg',
    fr: {
      name: 'Habitat privé',
      problem: 'Meubles standard qui laissent des vides de 12 cm.',
      text: 'Bibliothèques au plafond, dressings d’angle, tables familiales, mobilier d’entrée. Chaque centimètre du plan est exploité.',
    },
    ar: {
      name: 'سكن خاص',
      problem: 'أثاث جاهز يترك فراغات غير مستغلة.',
      text: 'مكتبات حتى السقف، خزائن الزوايا، طاولات عائلية، أثاث المدخل.',
    },
    en: {
      name: 'Private homes',
      problem: 'Standard units that leave 12 cm gaps everywhere.',
      text: 'Ceiling-high libraries, corner wardrobes, family tables, entry furniture. Every centimetre of the plan gets used.',
    },
  },
]

/** Pourquoi Palma — uniquement des capacites, aucun chiffre non verifie. */
export const advantages = [
  {
    icon: 'measure',
    fr: {
      title: 'Le métré avant le plan',
      text: 'Nous venons mesurer les murs, les prises, les seuils et la lumière. Ce qui est validé au métré ne change plus en atelier.',
    },
    ar: {
      title: 'القياس قبل التصميم',
      text: 'نأتي لقياس الجدران والمقابس والمستويات والإضاءة. ما يُعتمد في القياس لا يتغيّر في الورشة.',
    },
    en: {
      title: 'Measured before drawn',
      text: 'We come and record walls, sockets, thresholds and light. What is signed off on site does not change at the bench.',
    },
  },
  {
    icon: 'tool',
    fr: {
      title: 'Un atelier, pas un revendeur',
      text: 'Coupe, assemblage, tapisserie et finitions sortent du même lieu : un seul planning, une seule responsabilité.',
    },
    ar: {
      title: 'ورشة، لا محل بيع',
      text: 'القص والتجميع والتنجيد والتشطيب تخرج من نفس المكان: جدول واحد ومسؤولية واحدة.',
    },
    en: {
      title: 'A workshop, not a reseller',
      text: 'Cutting, joinery, upholstery and finishing leave the same building: one schedule, one responsibility.',
    },
  },
  {
    icon: 'layers',
    fr: {
      title: 'Matériaux documentés',
      text: 'Essence, provenance du panneau, type de tissu et finition sont écrits sur le devis. Vous savez ce que vous achetez.',
    },
    ar: {
      title: 'مواد موثّقة',
      text: 'نوع الخشب ومصدره والقماش والتشطيب تُكتب في العرض السعر. تعرف تمامًا ما تشتريه.',
    },
    en: {
      title: 'Documented materials',
      text: 'Timber species, board source, fabric type and finish are written into the quote. You know what you are buying.',
    },
  },
  {
    icon: 'hand',
    fr: {
      title: 'La pose par nos équipes',
      text: 'Nos équipes livrent, montent, ajustent et repartent avec les chutes. Vous récupérez la pièce prête à être vécue.',
    },
    ar: {
      title: 'التركيب من طرفنا',
      text: 'فريقنا يوصل ويركب ويعدّل وينظّف. تستلم المكان جاهزًا للاستعمال.',
    },
    en: {
      title: 'Installed by our own crew',
      text: 'Our team delivers, assembles, adjusts and takes the packing away. You get a room that is simply ready.',
    },
  },
  {
    icon: 'repair',
    fr: {
      title: 'Réparable par design',
      text: 'Tressage, coussins et habillages se refont sans jeter le bâti. Une chaise de dix ans se remet à neuf.',
    },
    ar: {
      title: 'قابل للإصلاح بالتصميم',
      text: 'الضفر والوسائد والأغطية يمكن تجديدها دون تغيير الهيكل.',
    },
    en: {
      title: 'Repairable by design',
      text: 'Weave, cushions and covers can be redone without discarding the frame. A ten-year-old chair comes back new.',
    },
  },
  {
    icon: 'clock',
    fr: {
      title: 'Un devis lisible',
      text: 'Prix par lot, délais annoncés poste par poste, et ce qui n’est pas compris écrit noir sur blanc.',
    },
    ar: {
      title: 'عرض سعر واضح',
      text: 'سعر لكل دفعة، آجال مبيّنة، وما ليس مشمولًا مكتوب بوضوح.',
    },
    en: {
      title: 'A quote you can read',
      text: 'Price per lot, lead time per line, and what is excluded stated in plain terms.',
    },
  },
]

/** Processus — etapes numerotees. */
export const process = [
  {
    fr: {
      title: 'Prise de contact',
      text: 'Un appel, un message WhatsApp ou une visite au showroom. Vous envoyez photos, plan ou simples mesures de la pièce.',
      step: '1 à 2 jours',
    },
    ar: {
      title: 'أول تواصل',
      text: 'اتصال أو رسالة واتساب أو زيارة المعرض. ترسل صورًا أو مخططًا أو قياسات المكان.',
      step: '1–2 أيام',
    },
    en: {
      title: 'First contact',
      text: 'A call, a WhatsApp message or a showroom visit. You send photos, plans or simply the room’s measurements.',
      step: '1–2 days',
    },
  },
  {
    fr: {
      title: 'Visite & métrés',
      text: 'Relevé sur place à Alger et environs : dimensions, contraintes, prises, passages de livraison.',
      step: 'Sur rendez-vous',
    },
    ar: {
      title: 'الزيارة والقياس',
      text: 'قياس في المكان بالجزائر والمناطق القريبة: الأبعاد، المنافذ، ممرات الإدخال.',
      step: 'بموعد',
    },
    en: {
      title: 'Site visit & measures',
      text: 'On-site survey in Algiers and nearby: dimensions, constraints, sockets, delivery routes.',
      step: 'By appointment',
    },
  },
  {
    fr: {
      title: 'Esquisse & devis',
      text: 'Plan d’implantation, choix des essences et tissus, devis chiffré par lot avec délais. Modifications incluses avant lancement.',
      step: 'Une semaine type',
    },
    ar: {
      title: 'التصميم والعرض المالي',
      text: 'مخطط التوزيع، اختيار الأخشاب والأقمشة، وعرض سعر مفصّل مع الآجال.',
      step: 'أسبوع تقني',
    },
    en: {
      title: 'Sketch & quote',
      text: 'Layout plan, timber and fabric selection, itemised quote with lead times. Revisions included before release.',
      step: 'Typically one week',
    },
  },
  {
    fr: {
      title: 'Fabrication',
      text: 'Lancement en atelier, contrôle à chaque poste, photos d’avancement envoyées avant la livraison.',
      step: 'Annoncé au devis',
    },
    ar: {
      title: 'الصنع',
      text: 'إنتاج في الورشة، مراقبة عند كل مرحلة، وصور تقدم تُرسل قبل التسليم.',
      step: 'حسب العرض',
    },
    en: {
      title: 'Fabrication',
      text: 'Released to the shop floor, checked at each station, progress photos sent before delivery.',
      step: 'As quoted',
    },
  },
  {
    fr: {
      title: 'Livraison & pose',
      text: 'Montage sur place, réglages, nettoyage, remise d’un carnet d’entretien des finitions.',
      step: 'Journée dédiée',
    },
    ar: {
      title: 'التسليم والتركيب',
      text: 'تركيب في المكان، ضبط، تنظيف، وتسليم دليل العناية بالتشطيبات.',
      step: 'يوم مخصص',
    },
    en: {
      title: 'Delivery & install',
      text: 'Assembled on site, adjusted, cleaned, and a finish-care sheet handed over.',
      step: 'Dedicated day',
    },
  },
]

/**
 * Ambiances & mises en situation.
 * ⚠️ Section volontairement presentee comme des references de style :
 * les photos de reales livraisons clients sont ajoutrees des qu'elles sont autorisees.
 */
export const ambiances = [
  {
    image: '/images/ambiance-01.jpg',
    span: 'wide',
    fr: { title: 'Plateau de travail, Alger Centre', text: 'Chêne clair, cannage et feutre acoustique.' },
    ar: { title: 'فضاء عمل — وسط العاصمة', text: 'بلوط فاتح، قضبان ولباد عازل.' },
    en: { title: 'Open floor, central Algiers', text: 'Light oak, cane webbing and acoustic felt.' },
  },
  {
    image: '/images/ambiance-02.jpg',
    span: 'tall',
    fr: { title: 'Terrasse ombragée', text: 'Rotin synthétique, lin lavé, sol en pierre.' },
    ar: { title: 'تراس مظلّل', text: 'خيزران صناعي، كتان مغسول وأرضية حجرية.' },
    en: { title: 'Shaded terrace', text: 'Synthetic rattan, washed linen, stone floor.' },
  },
  {
    image: '/images/ambiance-03.jpg',
    span: 'square',
    fr: { title: 'Coin lecture, lumière de fin de journée', text: 'Fauteuil tressé, lin lavé, ombre portée au mur.' },
    ar: { title: 'ركن قراءة — ضوء آخر النهار', text: 'كرسي مضفور، كتان مغسول وظل على الجدار.' },
    en: { title: 'Reading corner, late light', text: 'Woven chair, washed linen, shadow raked on the wall.' },
  },
  {
    image: '/images/ambiance-04.jpg',
    span: 'square',
    fr: { title: 'Comptoir de boutique', text: 'Noyer, laiton, niches éclairées.' },
    ar: { title: 'طاولة متجر', text: 'جوز ونحاس ورفوف مضيئة.' },
    en: { title: 'Boutique counter', text: 'Walnut, brass and lit niches.' },
  },
  {
    image: '/images/ambiance-05.jpg',
    span: 'wide',
    fr: { title: 'Salon familial', text: 'Banquette d’angle, table noyer, bibliothèque au plafond.' },
    ar: { title: 'صالون عائلي', text: 'كنبة زاوية، طاولة جوز ومكتبة حتى السقف.' },
    en: { title: 'Family living room', text: 'Corner bench, walnut table, ceiling-high library.' },
  },
]

/** Questions frequentes — reponses honnetes, sans engagement invente. */
export const faq = [
  {
    fr: {
      q: 'Publiez-vous des prix en ligne ?',
      a: 'Non. Chaque pièce étant fabriquée au format et dans la finition que vous choisissez, le prix dépend du bois, du tissu et du lieu de pose. Le devis détaillé par lot vous est envoyé après le relevé.',
    },
    ar: {
      q: 'هل تنشرون الأسعار؟',
      a: 'لا. بما أن كل قطعة تُصنع بالمقاس والتشطيب الذي تختاره، فإن السعر يعتمد على الخشب والقماش ومكان التركيب. يصلك عرض سعر مفصّل بعد القياس.',
    },
    en: {
      q: 'Do you publish prices?',
      a: 'No. Each piece is built to your size and finish, so price follows timber, fabric and install location. An itemised quote follows the site survey.',
    },
  },
  {
    fr: {
      q: 'Quel est le délai moyen ?',
      a: 'Il dépend des volumes et des approvisionnements du moment, c’est pourquoi il est écrit sur chaque devis plutôt qu’annoncé en moyenne. Un projet de quelques pièces et un plateau de 40 postes n’ont pas le même calendrier.',
    },
    ar: {
      q: 'ما هي مدة الإنجاز؟',
      a: 'تعتمد على الكميات وتوفر المواد، ولهذا تُكتب في كل عرض سعر بدل الإعلان عن متوسط ثابت.',
    },
    en: {
      q: 'What is the lead time?',
      a: 'It depends on volumes and current supply, which is why it is written into each quote rather than averaged. A few pieces and a 40-desk floor are not the same schedule.',
    },
  },
  {
    fr: {
      q: 'Peut-on voir la matière avant de commander ?',
      a: 'Oui. Nuancier de bois, échantillons de tissu et chutes de finition sont disponibles au showroom, et une planche matière est montée pour les projets sur mesure.',
    },
    ar: {
      q: 'هل يمكن رؤية المواد قبل الطلب؟',
      a: 'نعم. نماذج الأخشاب والأقمشة متوفرة في المعرض، وتُجهَّز لوحة مواد لمشاريع التخصيص.',
    },
    en: {
      q: 'Can I see the materials first?',
      a: 'Yes. Timber samples, fabric swatches and finish off-cuts are at the showroom, and a material board is assembled for bespoke projects.',
    },
  },
  {
    fr: {
      q: 'Livrez-vous en dehors d’Alger ?',
      a: 'Oui, sur projet, dans les wilayas limitrophes et partout en Algérie pour les volumes importants. Le transport est chiffré avec le devis.',
    },
    ar: {
      q: 'هل توصلون خارج الجزائر العاصمة؟',
      a: 'نعم، حسب المشروع إلى الولايات المجاورة، وإلى كل التراب الوطني للكميات الكبيرة. النقل يُسعَّر ضمن العرض.',
    },
    en: {
      q: 'Do you deliver outside Algiers?',
      a: 'Yes, project by project across neighbouring wilayas, and nationwide for larger volumes. Transport is priced within the quote.',
    },
  },
  {
    fr: {
      q: 'Réparez-vous du mobilier existant ?',
      a: 'Oui : tressage refait, coussins regarnis, plateaux retravaillés. Envoyez une photo, nous disons franchement si cela vaut la peine.',
    },
    ar: {
      q: 'هل تصلحون الأثاث القديم؟',
      a: 'نعم: إعادة الضفر، تجديد الوسائد، وإعادة معالجة الأسطح. أرسل صورة وسنخبرك بصراحة إن كان الإصلاح مجديًا.',
    },
    en: {
      q: 'Do you restore existing furniture?',
      a: 'Yes: re-woven seats, re-padded cushions, reworked tops. Send a photo and we will tell you straight if it is worth saving.',
    },
  },
]
