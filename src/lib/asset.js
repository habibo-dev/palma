/**
 * Résout un chemin d’asset public quel que soit le sous-répertoire d’hébergement.
 * Les données du site restent écrites en « /images/… » (lisibles, vérifiables) ;
 * c’est ici qu’on ajoute le préfixe d’URL de base (Vite `base`), ce qui permet de
 * publier le site sur `https://…/palma/` comme à la racine sans rien changer ailleurs.
 */
const base = import.meta.env.BASE_URL || '/'
export const withBase = (src) => {
  if (typeof src !== 'string' || !src.startsWith('/')) return src
  return base === '/' ? src : base.replace(/\/$/, '') + src
}
