# Palma Meuble — site vitrine (proposition client)

Site de présentation de **PALMA MEUBLE EURL**, fabricant-distributeur de **mobilier de bureau** et de **mobilier scolaire**, 17 Zone Industrielle Palma, Constantine.

> ⚠️ **Statut : concept de présentation.** Ce n’est pas le site officiel de l’entreprise.
> Bandeau « PROPOSITION » en haut de page et mention en pied de page : à retirer à la mise en ligne.
> Les visuels sont des **illustrations provisoires** (aucune photo de produit réelle fournie) : ils sont
> isolés dans `public/images/` et référencés par nom de fichier, donc remplaçables un par un.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173
npm run verify     # contrôle contenu + rendu statique des 3 langues
npm run build      # bundle de production dans dist/
npm run preview    # sert dist/ sur http://localhost:4173
```

## Ce qui est vrai, ce qui ne l’est pas

| Élément | État |
| --- | --- |
| Raison sociale, adresse, ville, code postal | **Réel** — fourni par le client |
| +213 555 034 016 (mobile/WhatsApp), +213 31 606 806 (standard) | **Réel** — les deux numéros cliquables partout |
| Positionnement (bureau + scolaire, fabrication et distribution, bois et métal, B2B) | **Réel** — issu du brief |
| E-mail, horaires d’ouverture, délai de réponse, site web, réseaux | **Non fournis → volontairement absents** (`null` dans le modèle, jamais inventés) ; un encart « e-mail non communiqué » remplace le lien |
| Prix, dimensions, essences, certifications, références clients, statistiques | **Non inventés** — mentions « sur devis », « catalogue sur demande », « sur confirmation » |
| Photographies | **Illustrations provisoires** à remplacer par les visuels réels |
| Étapes de commande, secteurs, atouts, FAQ | **Factuels côté process** (comportements d’achat), formulés sans promesse chiffrée |

Aucun nom de client, aucun chiffre d’activité, aucune année d’existence, aucune certification ne figure sur le site :
ils seront ajoutés dès validation.

## Architecture

```
src/
├── content/            ← TOUT le contenu éditorial, aucun texte dans les composants
│   ├── company.js      identité, téléphones, adresse, WhatsApp, blocs horaires/zone desservie
│   ├── catalog.js      7 gammes (bureau, sièges, réunion, accueil, rangement, scolaire, métal) + filtres
│   ├── entities.js     secteurs, atouts, matériaux, applications, process, FAQ
│   └── i18n/{fr,ar,en}.js   dictionnaires d’interface (le FR est la référence)
├── lib/                i18n (LangProvider + useLang + bascule RTL) et hooks de motion
├── components/         Header, Footer, RangeCard, QuoteForm, MapBlock, Seo, UI, Img, Icons
├── sections/           un fichier par section de la page d’accueil
└── pages/              Home, Ranges, RangeDetail, About, Contact, NotFound
```

**Remplacer un visuel** : déposer le fichier sous le même nom dans `public/images/` (ou remplacer la source
dans `.imgsrc/` puis `npm run images` — les ratios et le poids sont recalculés par le script).

**Changer un texte** : `src/content/*` uniquement. Les clefs sont vérifiées par `npm run check`.

**Domaine et e-mail** : renseigner `company.js` → `siteUrl` (canonical/hreflang s’activent seuls) et `email`
(tous les champs e-mail, JSON-LD et blocs de contact apparaissent automatiquement).

## Conventions

- Stack : **Vite + React 19 + React Router 7 + Tailwind v4** (`@theme`, pas de `tailwind.config.js`), polices auto-hébergées, `sharp` pour les images.
- Palette et typographie centralisées dans `src/styles/global.css` (osier/chêne/acier/vert de fabrique, Fraunces + Manrope + Noto Kufi Arabic).
- CTA principal = **Demander un devis** ; secondaires = WhatsApp, appel, catalogue, appel de devis depuis une gamme.
- Le formulaire d’appel d’offres **n’invente pas de back-end** : il produit la demande complète, puis l’ouvre sur WhatsApp, l’e-mail (si renseigné) ou la copie au presse-papiers.
- SEO : `Seo.jsx` (un objet par page + JSON-LD `FurnitureStore`/`Product`), `index.html` (méta ouvertes, favicon SVG, récap HTML complet en `<noscript>`).
- Animations : `Reveal` + `mask-up` sur masque SVG, `drift` en boucle très lente, `useScrollLock` sur le menu mobile.
- **RTL arabe** : `dir` bascule sur `<html>`, marges logiques uniquement (`ms-`, `ps-`, `start/end`, `text-start`), aucune classe `left-/right-`.
- `prefers-reduced-motion` neutralise le fondu, le masque, le drift, le ping et le scroll fluide.

## Vérifications automatiques

`npm run verify` enchaîne deux scripts — ils constituent la preuve de non-régression :

1. `scripts/check-content.mjs`
   parité stricte des clefs FR/AR/EN (167 × 3), présence de tous les fichiers image référencés,
   couverture trilingue des 41 entités, **chasse aux résidus** de la maquette fictive écartée,
   budget de poids JPEG, et contrôle que `company.js` porte bien les coordonnées fournies
   (et laisse `null` ce qui n’est pas confirmé).
2. `scripts/smoke-render.mjs`
   rendu statique React des 8 routes × 3 langues : 404 pour un slug de gamme inconnu,
   longueur minimale de texte par langue, `dir="rtl"` et `aria-expanded`/`aria-pressed`/labels sur les
   contrôles, présence des **10 ancres** utilisées par la navigation, téléphone réel et mention
   « Sur devis » sur chaque page, **aucun prix publié**, aucun texte placeholder.

Dernier passage : 167 × 3 clés OK, 24 rendus (8 routes × 3 langues) sans problème, 14 visuels pour 917 Ko, aucun prix publié, aucun texte placeholder.

## Contrôle manuel restant

Aucun navigateur headless n’était disponible dans cet environnement : les audits ci-dessus sont
statiques (DOM rendu + assertions). Les points suivants sont à vérifier visuellement avant
présentation client : franges de survol sur la galerie d’applications, hauteur du bandeau de
filtres sticky sur `/gammes` en arabe (longueur des libellés), et rendu des photos sur un écran
de salon client.
