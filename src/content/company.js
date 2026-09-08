/**
 * PALMA MEUBLE EURL — informations de l'entreprise.
 * Seules les données fournies par l'entreprise sont affirmées ici.
 * Les champs marqués [À CONFIRMER] restent vides volontairement : le site
 * masque ce qui n'est pas confirmé (horaires, e-mail, catalogue, garanties).
 */

export const company = {
  name: 'Palma Meuble',
  legalName: 'PALMA MEUBLE EURL',
  city: 'Constantine',
  descriptor: {
    fr: 'Mobilier de bureau & mobilier scolaire',
    ar: 'أثاث المكاتب والأثاث المدرسي',
    en: 'Office & school furniture',
  },
  legalForm: 'EURL',

  /** Coordonnées fournies par l'entreprise. */
  phones: [
    { label: { fr: 'Portables / WhatsApp', ar: 'الهاتف / واتساب', en: 'Mobile & WhatsApp' }, display: '+213 555 034 016', tel: '+213555034016', whatsapp: '213555034016' },
    { label: { fr: 'Fixe — standard', ar: 'الهاتف الثابت', en: 'Landline' }, display: '+213 31 606 806', tel: '+21331606806' },
  ],

  email: null, // [À CONFIRMER] — aucune adresse devinée ; le bloc s'affiche dès qu'elle est renseignée
  responseTime: null, // [À CONFIRMER] — pas de délai de réponse inventé

  address: {
    street: '17, Zone Industrielle Palma',
    district: 'Zone Industrielle Palma',
    city: 'Constantine',
    postalCode: '25000', // code postal de la wilaya de Constantine
    country: 'DZ',
    label: {
      fr: '17, Zone Industrielle Palma — Constantine 25000, Algérie',
      ar: '17، المنطقة الصناعية بالمَا — قسنطينة 25000، الجزائر',
      en: '17 Zone Industrielle Palma — Constantine 25000, Algeria',
    },
    mapsQuery: 'Zone Industrielle Palma, Constantine, Algérie',
    // Repère public « Zone Industrielle Palma » (Constantine) ; le lien Itinéraire
    // utilise l'adresse complète saisie, pas ce point.
    osm: { lat: 36.34668, lon: 6.61081, zoom: 14 },
  },

  hours: null, // [À CONFIRMER] — les horaires ne sont jamais affichés sans validation
  hoursNote: {
    fr: 'Accès sur rendez-vous — Zone Industrielle Palma',
    ar: 'الولوج بموعد — المنطقة الصناعية بالمَا',
    en: 'Access by appointment — Zone Industrielle Palma',
  },

  socials: [], // [À CONFIRMER] — aucun réseau social inventé

  /** Qualité déclarée par l'entreprise : fabrication ET distribution, projets B2B. */
  activity: {
    fr: ['Fabrication', 'Distribution', 'Projets professionnels'],
    ar: ['التصنيع', 'التوزيع', 'مشاريع مهنية'],
    en: ['Manufacturing', 'Distribution', 'Professional projects'],
  },

  areaServed: {
    // [À CONFIRMER] — extension géographique à valider avec l'entreprise
    fr: ['Constantine', 'Région Est', 'Livraison sur site, selon volumes'],
    ar: ['قسنطينة', 'الشرق الجزائري', 'التوصيل إلى المكان حسب الكميات'],
    en: ['Constantine', 'Eastern region', 'On-site delivery, volume dependent'],
  },

  /** Concept de présentation : assumé et visible, pas dissimulé. */
  demo: {
    enabled: true,
    ribbon: {
      fr: 'Concept de présentation réalisé pour PALMA MEUBLE EURL — site non officiel. Visuels et contenus provisoires.',
      ar: 'تصوّر مقترح مُنجَز لفائدة PALMA MEUBLE EURL — موقع غير رسمي. الصور والمحتويات مؤقتة.',
      en: 'Presentation concept prepared for PALMA MEUBLE EURL — not an official website. Interim imagery and copy.',
    },
    note: {
      fr: 'Document de travail : aucune référence client, aucun prix, aucune certification n’est affirmé sans validation de l’entreprise.',
      ar: 'وثيقة عمل: لا يُنسب أي عميل ولا سعر ولا شهادة دون موافقة المؤسسة.',
      en: 'Working document: no client reference, price or certification is asserted without the company’s approval.',
    },
  },
}

export const primaryPhone = company.phones[0]
export const landline = company.phones[1]

/** Construit un lien WhatsApp avec message pré-rempli (numéro portable). */
export function whatsappLink(message) {
  const text = encodeURIComponent(message || '')
  return `https://wa.me/${primaryPhone.whatsapp}${text ? `?text=${text}` : ''}`
}

export function telLink(index = 0) {
  return `tel:${company.phones[index]?.tel ?? company.phones[0].tel}`
}

export function mailLink({ subject, body } = {}) {
  if (!company.email) return null
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString()
  return `mailto:${company.email}${q ? `?${q}` : ''}`
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.address.street}, ${company.address.city}, Algérie`)}`
}

export function osmEmbed() {
  const { lat, lon, zoom } = company.address.osm
  const d = 0.012
  const bbox = [lon - d, lat - d, lon + d, lat + d].join('%2C')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}&zoom=${zoom}`
}

/** URL absolue (canonical, Open Graph) — inactive tant que le domaine n'est pas confirmé. */
export const siteUrl = import.meta.env?.VITE_SITE_URL || null // ex. 'https://…' [À CONFIRMER : domaine officiel]

/** Messages WhatsApp contextuels, par langue. */
export const whatsappMessages = {
  default: {
    fr: 'Bonjour, je souhaite des informations sur votre mobilier (référence, quantité, lieu de livraison).',
    ar: 'السلام، أرغب في معلومات حول أثاثكم (المرجع، الكميات، مكان التسليم).',
    en: 'Hello, I would like information about your furniture (reference, quantities, delivery site).',
  },
  quote: {
    fr: 'Bonjour, je souhaite un devis pour du mobilier professionnel.',
    ar: 'السلام، أرغب في عرض سعر لأثاث مهني.',
    en: 'Hello, I would like a quote for professional furniture.',
  },
  school: {
    fr: 'Bonjour, je souhaite un devis pour du mobilier scolaire (établissements scolaires).',
    ar: 'السلام، أرغب في عرض سعر للأثاث المدرسي.',
    en: 'Hello, I would like a quote for school furniture.',
  },
  catalogue: {
    fr: 'Bonjour, je souhaite recevoir votre catalogue et la liste des finitions.',
    ar: 'السلام، أرغب في تلقي الكتالوج وقائمة التشطيبات.',
    en: 'Hello, I would like your catalogue and the finishes list.',
  },
  piece: {
    fr: (n) => `Bonjour, je souhaite un devis pour : ${n}.`,
    ar: (n) => `السلام، أرغب في عرض سعر لـ: ${n}.`,
    en: (n) => `Hello, I would like a quote for: ${n}.`,
  },
}
