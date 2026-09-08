/**
 * Source de vérité : les informations de l'entreprise.
 * ⚠️ Toutes les valeurs marquées [À CONFIRMER] sont des données de présentation.
 * Elles doivent être remplacées par les informations officielles avant mise en ligne.
 * Aucune donnée factuelle (numéro, adresse, horaires, certifications) n'est inventée
 * par le code : tout se passe ici.
 */

export const company = {
  name: 'Palma',
  descriptor: { fr: 'Mobilier & aménagement', ar: 'الأثاث والتجهيز الداخلي', en: 'Furniture & fit-out' },
  founded: null, // [À CONFIRMER] année de création — masqué si null
  legalForm: null, // [À CONFIRMER] raison sociale complète pour les mentions légales

  // [À CONFIRMER] — format affiché / format tel: / format WhatsApp international
  phone: { display: '+213 555 00 00 00', tel: '+213555000000', whatsapp: '213555000000' },
  email: 'contact@palma.dz', // [À CONFIRMER]
  responseTime: { fr: 'Réponse sous 24 h ouvrées', ar: 'الرد خلال 24 ساعة عمل', en: 'Reply within 1 business day' },

  address: {
    street: "Zone d'activité de Rouiba", // [À CONFIRMER] — n° de rue / bâtiment à compléter
    city: 'Rouiba',
    region: 'Alger',
    country: 'DZ',
    label: {
      fr: "Zone d'activité de Rouiba — Alger",
      ar: 'منطقة روابية النشاطية — الجزائر',
      en: 'Rouiba industrial zone — Algiers',
    },
    mapsQuery: "Zone d'activite Rouiba Alger",
    osm: { lat: 36.7636, lon: 3.6003, zoom: 13 },
  },

  // Horaires : affichés uniquement si confirmés (règle : pas d'info non vérifiée)
  hours: null,
  hoursNote: {
    fr: 'Visite du showroom sur rendez-vous',
    ar: 'زيارة المعرض تتم بموعد مسبق',
    en: 'Showroom visits by appointment',
  },

  // Réseaux sociaux : laissés vides tant qu'aucun compte n'est confirmé
  socials: [],

  // Zones desservies (déclaratives, sans promesse de délai)
  areaServed: {
    fr: ['Alger', 'Blida', 'Boumerdès', 'Tipaza', 'Livraison nationale sur projet'],
    ar: ['الجزائر العاصمة', 'البليدة', 'بومرداس', 'تيبازة', 'تغطية وطنية حسب المشروع'],
    en: ['Algiers', 'Blida', 'Boumerdès', 'Tipaza', 'Nationwide on a project basis'],
  },

  demo: {
    enabled: true,
    label: {
      fr: 'Maquette de présentation — contenus à valider',
      ar: 'نموذج تقديمي — المحتوى بانتظار الموافقة',
      en: 'Presentation mock-up — content to be approved',
    },
  },
}

/** Construit un lien WhatsApp avec message pré-rempli. */
export function whatsappLink(message) {
  const text = encodeURIComponent(message || '')
  return `https://wa.me/${company.phone.whatsapp}${text ? `?text=${text}` : ''}`
}

export function telLink() {
  return `tel:${company.phone.tel}`
}

export function mailLink({ subject, body } = {}) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const q = params.toString()
  return `mailto:${company.email}${q ? `?${q}` : ''}`
}

export function mapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.mapsQuery)}`
}

export function osmEmbed() {
  const { lat, lon, zoom } = company.address.osm
  const d = 0.02
  const bbox = [lon - d, lat - d, lon + d, lat + d].join('%2C')
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}&zoom=${zoom}`
}
