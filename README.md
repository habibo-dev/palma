# Palma — site vitrine MVP

Site de présentation pour **Palma, mobilier & aménagement sur mesure (Rouiba, Alger)**.
Version de démonstration : architecture complète, design system, FR / AR / EN, catalogue structuré,
formulaire de devis fonctionnel. Les textes et coordonnées sont des **données de présentation** à valider
avec l'entreprise avant la mise en ligne.

```bash
npm install
npm run dev        # http://localhost:5173 (hôte 0.0.0.0)
npm run build      # dist/ statique
npm run verify     # contrôle contenu + rendu des 6 routes (x3 langues)
```

## Stack

Vite 8 · React 19 · Tailwind CSS 4 (tokens `@theme`) · react-router 7 · sharp (pipeline images local) ·
polices auto-hébergées (`@fontsource-variable` : Fraunces, Manrope, Noto Kufi Arabic).
Aucune dépendance d'animation : reveal au scroll via une `IntersectionObserver` partagée.

## Architecture

```
src/
  content/            ← TOUS les faits et tout le contenu éditorial
    company.js        raison sociale, téléphone, e-mail, adresse, zones, note de démo
    catalog.js        catégories + produits (structuré, prêt pour fiches & filtres)
    entities.js       secteurs, atouts, matériaux, processus, ambiances, FAQ
    i18n/{fr,ar,en}.js  chaînes d'interface (156 clés × 3 langues)
  lib/i18n.jsx        LangProvider — t() (clés), L() (entités), Ls() (chaînes localisées), dir=rtl
  lib/motion.js       reveal, in-view, scroll-lock, header scroll
  components/         Header, Footer, ProductCard, QuoteForm, MapBlock, Img, Seo, UI (Section, Button…)
  sections/           12 blocs de page (Hero, Position, Collections, Sectors, Advantages, Materials,
                      Ambiances, Process, CatalogueBand, Showroom, ContactSection+FAQ, FinalCta)
  pages/              Home, Products, ProductDetail, About, Contact, NotFound
scripts/
  optimize-images.mjs  .imgsrc/*.jpg → public/images/ recadrées au ratio exact des composants
  check-content.mjs    cohérence i18n, images référencées, entités traduites, poids JPEG
  smoke-render.mjs     rendu statique des 6 routes × 3 langues + assertions (h1 unique, alt, aria, JSON-LD)
```

### Contenu ≠ présentation

Chaque entité suit le même format multilingue, ce qui rend l'ajout de produits mécaniques :

```js
{ slug: 'fauteuil-casbah', category: 'assises', image: '/images/product-01.jpg', ratio: 0.82,
  fr: { name, desc, detail }, ar: { … }, en: { … }, materialsKey: [...], specs: null }
```

`specs: null` = fiche technique non communiquée. **Volontaire** : dimensions, prix, certifications,
références clients, horaires, effectifs et capacités de production ne sont jamais inventés.
Ils s'ajoutent dans `content/`, jamais dans les composants.

### Ce qui est déjà branché

- **CTA** : devis (ancre `#devis`), WhatsApp avec message pré-rempli selon la langue, `tel:` et `mailto:`.
- **Formulaire** : `QuoteForm` construit un message propre puis le transmet (WhatsApp / e-mail / presse-papiers).
  Pas de back-end sur cette version — donc zéro contact perdu et zéro serveur à maintenir.
- **Fiche produit → devis** : `/contact?piece=<slug>` pré-positionne la pièce dans la demande.
- **Catalogue** : zone dédiée « envoyé sur demande ». Aucun PDF fictif n'est généré.
- **SEO** : `<html lang>`, title/description par page et par langue, Open Graph, hreflang, canonical,
  JSON-LD `FurnitureStore` (adresse, zones desservies, langues parlées), balises `alt` systématiques.
- **Carte** : OpenStreetMap monté au clic (aucune requête tierce au premier affichage), lien itinéraire Google Maps.

### Langues

FR par défaut, AR (RTL complet, `dir` posé sur `<html>`, propriétés logiques partout), EN.
La langue est mémorisée (`localStorage`) et déduite de la navigateur. Pour une indexation séparée par
langue en production, passer le code langue dans l'URL (`/ar/...`) — la structure `t()`/`L()` ne change pas.

## Avant mise en ligne — 4 champs à remplacer

Dans `src/content/company.js` : `phone`, `email`, `address.street`, `hours` (laissé `null` : les horaires
ne s'affichent que si confirmés). Remplacer les visuels de substitution par les vraies photos
(voir ci-dessous), puis passer `demo.enabled` à `false` pour retirer le bandeau « maquette de présentation ».

## Images

10 visuels photographiés pour l'atelier (hero, 8 pièces du catalogue). Les 5 images d'ambiance et les
4 plans matière sont pour l'instant des **recadrages de ces photos** (le script les produit automatiquement,
le site ne casse jamais). Pour les remplacer : déposer `.imgsrc/ambiance-01.jpg` … `material-04.jpg`
puis `npm run images` — le manifeste préfère toujours le fichier source au recadrage de secours.

```bash
node scripts/optimize-images.mjs   # recadrage cover au ratio exact, aucune surexposition, ~1,1 Mo au total
```

## Étape suivante (après validation de la maquette)

1. Données réelles : gamme complète, prix « sur devis » ou fourchettes validées, fiches techniques.
2. PDF catalogue réel dans `public/` → remplacer l'appel « sur demande » par un lien de téléchargement direct.
3. Pages : `/secteurs/<id>`, `/methodologie`, `/mentions-legales`, `/realisations` (photos clients autorisées).
4. Routage par langue + sitemap + `robots.txt`, images en `avif/webp` si CDN.
5. Formulaire : endpoint (Resend / n8n / Google Forms) — le composant est déjà découpé pour ça.
6. Analytics respectueux du consentement (Matomo / Plausible) et données structuratives `Product` par fiche.

---

*FR/AR/EN demo build. Conçu pour être présenté directement au dirigeant : la page d'accueil est complète,
les données sont structurées pour la version définitive.*
