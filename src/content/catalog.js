/**
 * Catalogue produits — données structurées, séparées de la présentation.
 * Règle : aucune spécification technique inventée. `specs` reste null tant que
 * les fiches fournisseur / mesures réelles ne sont pas fournies.
 */

export const categories = [
  {
    id: 'assises',
    icon: 'chair',
    fr: { name: 'Assises & salon', text: 'Fauteuils, banquettes, canapés et chaises tressées.' },
    ar: { name: 'الجلسات والأرائك', text: 'فوتيات، كنب، مقاعد مضفورة.' },
    en: { name: 'Seating & lounge', text: 'Armchairs, benches, sofas and woven chairs.' },
  },
  {
    id: 'tables',
    icon: 'table',
    fr: { name: 'Tables & rangements', text: 'Tables à manger, bureaux, bibliothèques, dressings.' },
    ar: { name: 'الطاولات والخزائن', text: 'طاولات، مكاتب، مكتبات، خزائن.' },
    en: { name: 'Tables & storage', text: 'Dining tables, desks, shelving, wardrobes.' },
  },
  {
    id: 'terrasse',
    icon: 'palm',
    fr: { name: 'Terrasse & tressage', text: 'Rotin, osier et essences résistantes au plein air.' },
    ar: { name: 'التراس والمضفور', text: 'خيزران وقضبان وخشب مقاوم للخارج.' },
    en: { name: 'Terrace & weaving', text: 'Rattan, wicker and hardy outdoor timbers.' },
  },
  {
    id: 'contract',
    icon: 'building',
    fr: { name: 'Contract & agencement', text: 'Comptoirs, modules, tribunes et mobilier de commerce.' },
    ar: { name: 'التجهيز التجاري', text: 'طاولات الاستقبال، وحدات، تجهيز المحلات.' },
    en: { name: 'Contract & fit-out', text: 'Counters, modules, tiers and retail furniture.' },
  },
]

/**
 * @typedef {Object} Product
 * @property {string} slug
 * @property {string} category  id de categorie
 * @property {string} image
 * @property {number} ratio     1.25 = paysage, 0.8 = portrait
 * @property {?Object} specs    null = non communiqué (jamais inventé)
 */
export const products = [
  {
    slug: 'fauteuil-casbah',
    category: 'assises',
    image: '/images/product-01.jpg',
    ratio: 0.82,
    badge: { fr: 'Signature Palma', ar: 'من توقيع بالمَا', en: 'Palma signature' },
    fr: {
      name: 'Fauteuil Casbah',
      desc: 'Assise basse en rotin tressé main sur bâti chêne, coussin déhoussable en laine.',
      detail:
        'Le fauteuil qui a lancé l’atelier : une coque tressée à la main, posée sur un bâti en chêne assemblé à tenons. Le coussin se retire pour le nettoyage, et le tressage peut être refait après plusieurs années d’usage.',
    },
    ar: {
      name: 'كرسي كسبة',
      desc: 'مقعد منخفض من الخيزران المضفور يدويًا على هيكل من خشب البلوط، مع وسادة قابلة للإزالة.',
      detail: 'القطعة التي أطلقت الورشة: هيكل مضفور يدويًا على قاعدة بلوط بإعشاب تقليدية.',
    },
    en: {
      name: 'Casbah Armchair',
      desc: 'Low hand-woven rattan seat on an oak frame, with a removable wool cushion.',
      detail:
        'The piece that started the workshop: a hand-woven shell on a mortise-and-tenon oak frame. The cushion unzips, and the weave can be redone after years of use.',
    },
    materialsKey: ['rotin', 'chene', 'laine'],
    specs: null,
  },
  {
    slug: 'canape-tlemcen',
    category: 'assises',
    image: '/images/product-02.jpg',
    ratio: 1.28,
    fr: {
      name: 'Canapé Tlemcen',
      desc: 'Trois places en chêne massif et coussins lin, accotoirs bas, assise profonde.',
      detail:
        'Pensé pour les salons familiaux comme pour les salles d’attente : assise profonde, mousse haute résilience, housses confectionnées dans notre atelier de tapisserie.',
    },
    ar: {
      name: 'كنزة تلمسان',
      desc: 'ثلاثة مقاعد من خشب البلوط مع وسائد من الكتان وذراعين منخفضتين.',
      detail: 'مصمم لصالونات العائلات وقاعات الانتظار على حد سواء.',
    },
    en: {
      name: 'Tlemcen Sofa',
      desc: 'Three-seat solid oak frame with linen cushions, low arms, deep seat.',
      detail:
        'Built for family living rooms and waiting rooms alike: deep seat, high-resilience foam, covers made in our own upholstery bench.',
    },
    materialsKey: ['chene', 'lin'],
    specs: null,
  },
  {
    slug: 'table-alfour',
    category: 'tables',
    image: '/images/product-03.jpg',
    ratio: 1.28,
    fr: {
      name: 'Table Alfour',
      desc: 'Plateau noyer sur piétement traversant, jusqu’à dix convives.',
      detail:
        'Un plateau en noyer massif, deux pieds traversants pour libérer les genoux. Le format est ajusté à votre pièce — longueur, largeur et hauteur sont décidées au métré.',
    },
    ar: {
      name: 'طاولة الفرض',
      desc: 'سطح من خشب الجوز على قواعد عابرة، تتسع لعشرة أشخاص.',
      detail: 'الأبعاد تُحدَّد بعد قياس المكان لديك.',
    },
    en: {
      name: 'Alfour Table',
      desc: 'Walnut top on trestle legs, seats up to ten.',
      detail:
        'A solid walnut top on two through-trestles to free up knee space. Length, width and height are set at the site measure.',
    },
    materialsKey: ['noyer'],
    specs: null,
  },
  {
    slug: 'bibliotheque-medina',
    category: 'tables',
    image: '/images/product-04.jpg',
    ratio: 0.82,
    fr: {
      name: 'Bibliothèque Medina',
      desc: 'Module mural en frêne, fonds en cannage, hauteur sur mesure.',
      detail:
        'Une grille de modules que l’on compose au mur : étagères hautes pour les livres, niches basses fermées, fond en cannage qui laisse passer la lumière.',
    },
    ar: {
      name: 'مكتبة المدينة',
      desc: 'وحدات جدارية من خشب الدردار مع خلفية من القصب.',
      detail: 'تُركَّب حسب ارتفاع وجدار المكان.',
    },
    en: {
      name: 'Medina Library',
      desc: 'Ash wall modules with caned backs, built to your ceiling height.',
      detail:
        'A grid of modules composed on your wall: tall shelves for books, low closed niches, caned backs that let light through.',
    },
    materialsKey: ['frene', 'cannage'],
    specs: null,
  },
  {
    slug: 'bureau-atlas',
    category: 'contract',
    image: '/images/product-05.jpg',
    ratio: 1.28,
    badge: { fr: 'Tertiaire', ar: 'مكتبي', en: 'Workplace' },
    fr: {
      name: 'Bureau Atlas',
      desc: 'Plan de travail frêne, goulotte de câbles intégrée, version double poste.',
      detail:
        'Conçu pour les plateaux ouverts : passage de câbles intégré, pieds réglables sur sol inégal, et une version face-à-face pour les bureaux partagés.',
    },
    ar: {
      name: 'مكتب أطلس',
      desc: 'سطح عمل من الدردار مع قناة أسلاك مدمجة.',
      detail: 'مناسب للمكاتب المفتوحة والمكاتب المزدوجة.',
    },
    en: {
      name: 'Atlas Desk',
      desc: 'Ash worktop with integrated cable trough, two-person version available.',
      detail:
        'Made for open floors: built-in cable management, levelling feet for uneven floors, and a bench version for shared offices.',
    },
    materialsKey: ['frene', 'acier'],
    specs: null,
  },
  {
    slug: 'chaise-zitoun',
    category: 'terrasse',
    image: '/images/product-06.jpg',
    ratio: 0.82,
    fr: {
      name: 'Chaise Zitoun',
      desc: 'Assise tressée sur tube d’acier thermolaqué, empilable.',
      detail:
        'La chaise des terrasses : tressage synthétique qui ne craint ni la pluie ni le soleil du littoral, structure acier traitée contre la corrosion, empilable par six.',
    },
    ar: {
      name: 'كرس زيتون',
      desc: 'مقعد مضفور على هيكل فولاذي مطلي، قابل للتكديس.',
      detail: 'مصممة للتراس والمقاهي المطلة على البحر.',
    },
    en: {
      name: 'Zitoun Chair',
      desc: 'Woven seat on powder-coated steel tube, stackable.',
      detail:
        'The terrace chair: a synthetic weave that ignores sea air and salt sun, coated steel frame, stacks six high.',
    },
    materialsKey: ['rotin', 'acier'],
    specs: null,
  },
  {
    slug: 'banquette-caftan',
    category: 'contract',
    image: '/images/product-07.jpg',
    ratio: 1.28,
    badge: { fr: 'Cafés & restos', ar: 'مقاهي ومطاعم', en: 'Cafés & restaurants' },
    fr: {
      name: 'Banquette Caftan',
      desc: 'Banquette continue dossier haut, mousse dense, tissu à usage intensif.',
      detail:
        'Le long des murs d’un café ou d’un restaurant : dossier haut pour l’intimité entre les tables, assise dense qui ne s’affaisse pas, coutures doublées pour tenir le rythme du service.',
    },
    ar: {
      name: 'كنبة قفطان',
      desc: 'كنبة متصلة بظهر عالٍ وإسفنج كثيف وقماش للاستعمال المكثف.',
      detail: 'لمقاهي والمطاعم التي تعمل طوال اليوم.',
    },
    en: {
      name: 'Caftan Bench',
      desc: 'Continuous high-back banquette, dense foam, heavy-duty contract fabric.',
      detail:
        'Run along the wall of a café or restaurant: a high back for privacy between tables, dense foam that keeps its shape, double-stitched seams for service hours.',
    },
    materialsKey: ['lin', 'acier'],
    specs: null,
  },
  {
    slug: 'comptoir-sahel',
    category: 'contract',
    image: '/images/product-08.jpg',
    ratio: 0.82,
    fr: {
      name: 'Comptoir Sahel',
      desc: 'Compte d’accueil en noyer et tressage, façade lumineuse optionnelle.',
      detail:
        'Un comptoir qui se voit depuis la rue : panneaux de tressage ajourés, plateau noyer, et un bandeau lumineux en option pour éclairer la façade le soir.',
    },
    ar: {
      name: 'مكتب استقبال ساحل',
      desc: 'طاولة استقبال من الجوز والقصب مع واجهة مضيئة اختيارية.',
      detail: 'تصميم يظهر من الشارع ويجذب الزبون.',
    },
    en: {
      name: 'Sahel Counter',
      desc: 'Walnut and woven reception counter, optional lit façade.',
      detail:
        'A counter designed to be seen from the street: open woven panels, walnut top, and an optional light band for the evening front.',
    },
    materialsKey: ['noyer', 'rotin'],
    specs: null,
  },
]

export const byCategory = (id) => (id === 'all' ? products : products.filter((p) => p.category === id))
export const findProduct = (slug) => products.find((p) => p.slug === slug)
