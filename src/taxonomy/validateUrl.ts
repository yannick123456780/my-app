import { allowedKeys } from "./allowedKeys";
import { allowedValues } from "./allowedValues";

// Liste des clés pouvant contenir plusieurs valeurs séparées par des virgules
const MULTI_VALUE_KEYS = [
  //search
  "search",
  
  "typecontrat",
  "secteuractivite",
  "fonction",
  "niveauetude",
  "tempspleintempspartiel",
  "experience",
  "typebien",
  "typevente",
  "exterieur",
  "etatdubien",
  "typevendeurs",
  "domaineformation",
  "typeenseignement",
  "etendrelivraison",
  "univers",
  "universchaussures",
  "taille",
  "typevetement",
  "etatubien",
  "marquemode",
  "couleur",
  "pointure",
  "typechaussures",
  "marquechaussures",
  "produit",
  "universmontresbijoux",
  "marquemontresbijoux",
  "matieremontresbijoux",
  "produitaccessoiresbagagerie",
  "universaccessoiresbagagerie",
  "matieremontresbijoux",
  "marqueaccessoiresbagagerie",
  "matiereaccessoiresbagagerie",
  "typeameublement",
  "matiereameublement",
  "marqueameublement",
  "etatameublement",
  "produitfournituresscolaires",
  "marquefournituresscolaires",
  "typeelectromenager",
  "typedeelectromenager",
  "typeartstable",
  "marqueartstable",
  "matieretable",
  "typedecoration",
  "matieredecoration",
  "styledecoration",
  "typelinge",
  "familleproduit",
  "famillemarque",
  "familleetat",

  "mobilierenfantproduit",
  "mobilierenfantetat",
  "typevetementbebe",
  "vetementsbebetaille",

  //ElectroniqueFilters

  //ElectroniqueFilters-Ordinateurs
  "ordinateurgeneraletat",

  "ordinateurmarque",
  "ordinateurtype",
  "tailleecran",

  //ElectroniqueFilters-accessoires-informatique
  "accessoiresinformatiquemarque",
  "accessoiresinformatiqueproduit",
  "accessoiresinformatiqueetat",

  //ElectroniqueFilters-accessoires-tablettes-liseuses
  "tablettesliseusesproduit",
  "tablettesliseusesmarque",
  "tablettesliseusestailleecran",
  "tablettesliseusescapacitestockage",
  "tablettesliseusescouleur",
  "tablettesliseusesetat",

  //ElectroniqueFilters-photo-audio-video
   "photoaudiovideomarque",
   "photoaudiovideoproduit",
   "photoaudiovideocouleur",
   "photoaudiovideoetat",

   //ElectroniqueFilters-telephones-objets-connectes
   "telephonesobjetsconnectesmarque",
   "telephonesobjetsconnectesproduit",
   "telephonesobjetsconnectescapacitestockage",
   "telephonesobjetsconnectescouleur",
   "telephonesobjetsconnectesetat",
   "telephonesobjetsconnectesmodele",

   //ElectroniqueFilters-accessoires-téléphone-objets-connectés
   "accessoirestelephoneobjetsconnectesproduit",
   "accessoirestelephoneobjetsconnectescouleur",
   "accessoirestelephoneobjetsconnectesetat",

   //ElectroniqueFilters-consoles
   "consolestype",
   "consolesmarque",
   "consolesmodele",
   "consolescouleur",
   "consolesetat",
    //ElectroniqueFilters-jeux-video
   "jeuxvideoplatforme",
   "jeuxvideoetat",

   //losirs

   //loisirs-antiquité
   "loisirsproduit",
   "loisirsmaterie",
   "loisirsepoque",
"loisirsstyle",
"loisirsetat",

 //loisirs-billeterie
 "billeterietype",

 //loisirs-collection
 "collectionproduit",
"collectionepoque",
"collectionconditionnement",
"collectionetat",

//loisirs-cd-musique
"cdmusiquesupport",
"cdmusiquegenre",
"cdmusiqueetat",

//loisirs-dvd-films
"dvdfilmsupport",
"dvdfilmgenre",
"dvdfilmedition",
"dvdfilmpackaging",
"dvdfilmetat",

//loisirs-instruments de musique
"instrumentsunivers",
"instrumentsproduit",
"instrumentsmarque",
"instrumentsniveau",
"instrumentsetat",


//loisirs-livres
"livresformat",
"livresgenre",
"livreslangue",
"livresetat",


//loisirs-modelisme
"modelismeproduit",
"modelismeechelle",
"modelismemarque",
"modelismeetat",

//loisirs-vinsgastronomie
"vinsgastronomieunivers",
"vinsgastronomieetat",

//loisirs-jeuxjouets
"jeuxjouetsage",
"jeuxjouetsproduit",
"jeuxjouetsetat",
"jeuxjouetsmarque",

//loisirs-sportpleinair
"sportpleinairactivite",
"sportpleinairtat",

//loisirs-loisirs creatifs
"loisirscreatifsproduit",
"loisirscreatifscible",
"loisirscreatifsetat",

//loisirs-velos
"velosunivers",
"velostype",
"velostaillevelo",
"velostailletoue",
"velosmarque",
"veloscouleur",
"velosetat",

//loisirs-equipements-velos
"equipementvelosunivers",
"equipementvelosproduit",
"equipementvelosmarque",
"equipementvelostaille",
"equipementvelosetat",



];

export function validateUrlParams(params: URLSearchParams) {
  // 1. Vérification des clés
  for (const key of params.keys()) {
    if (!allowedKeys.includes(key)) {
      return { valid: false, reason: "invalid_key", key };
    }
  }

  // 2. Vérification des valeurs (version multi‑valeurs)
  for (const [key, value] of params.entries()) {
    const allowed = allowedValues[key as keyof typeof allowedValues];
    if (!allowed) continue; // pas de validation pour cette clé

    // Si c'est une clé multi‑valeurs et que la valeur contient une virgule
    if (MULTI_VALUE_KEYS.includes(key) && value.includes(",")) {
      const parts = value.split(",");
      for (const part of parts) {
        if (!allowed.includes(part)) {
          return { valid: false, reason: "invalid_value", key, value: part };
        }
      }
    } else {
      // Valeur simple
      if (!allowed.includes(value)) {
        return { valid: false, reason: "invalid_value", key, value };
      }
    }
  }

  return { valid: true };
}
