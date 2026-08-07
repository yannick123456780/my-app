import { AiOutlineEuro } from "react-icons/ai";
import {
  RadioCheckboxGroup,
  CheckboxGroupCarre,
  CaracteristiquesFilter,
  RangeFilter,
  CaracteristiquesFilterRound,
} from "./BaseFilters";
import { FcDocument } from "react-icons/fc";
import { PiSortAscending } from "react-icons/pi";
import { TbUserScreen } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";
import { useMemo } from "react";

interface Props {
    draft: any;
  setFilter: (name: string, value: string) => void;
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  excludedFilterNames?: string[];
}




// Produits par univers
const PRODUITS_BY_INSTRUMENTS_UNIVERS: Record<
  string,
  { value: string; label: string }[]
> = {
  "guitares-basses": [
    { value: "guitare-electrique", label: "Guitare électrique" },
    { value: "guitare-classique", label: "Guitare classique" },
    { value: "guitare-acoustique", label: "Guitare acoustique" },
    { value: "guitare-electro-acoustique", label: "Guitare électro acoustique" },
    { value: "basses", label: "Basses" },
    { value: "cordes", label: "Cordes" },
    { value: "effets", label: "Effets" },
    { value: "micro-guitare-basse", label: "Micro guitare et basse" },
    { value: "ampli-guitare-basse", label: "Ampli guitare et basse" },
    { value: "accessoires-pieces", label: "Accessoires et pièces" },
    { value: "autre", label: "Autre" },
  ],
  "instruments-a-cordes": [
    { value: "ukulele", label: "Ukulélé" },
    { value: "banjo", label: "Banjo" },
    { value: "violon", label: "Violon" },
    { value: "alto", label: "Alto" },
    { value: "violoncelle", label: "Violoncelle" },
    { value: "harpe", label: "Harpe" },
    { value: "accessoires-pieces", label: "Accessoires et pièces" },
    { value: "autre", label: "Autre" },
  ],
  "batteries-percussions": [
    { value: "batterie-electronique", label: "Batterie électronique" },
    { value: "batterie-acoustique", label: "Batterie acoustique" },
    { value: "ampli-batterie", label: "Ampli batterie" },
    { value: "xylophone", label: "Xylophone" },
    { value: "cymbale", label: "Cymbale" },
    { value: "tambour", label: "Tambour" },
    { value: "tambourins-maracas", label: "Tambourins et maracas" },
    { value: "djembe", label: "Djembe" },
    { value: "accessoires-pieces", label: "Accessoires et pièces" },
    { value: "autre", label: "Autre" },
  ],
  "pianos-claviers": [
    { value: "piano-numerique", label: "Piano numérique" },
    { value: "piano-traditionnel", label: "Piano traditionnel" },
    { value: "synthetiseur", label: "Synthétiseur" },
    { value: "orgue", label: "Orgue" },
    { value: "accessoires-pieces", label: "Accessoires et pièces" },
    { value: "autre", label: "Autre" },
  ],
  "instruments-a-vent": [
    { value: "flute-a-bec", label: "Flûte à bec" },
    { value: "flute-traversiere", label: "Flûte traversière" },
    { value: "clarinette", label: "Clarinette" },
    { value: "saxophone", label: "Saxophone" },
    { value: "trompette", label: "Trompette" },
    { value: "trombone", label: "Trombone" },
    { value: "tuba", label: "Tuba" },
    { value: "baryton", label: "Baryton" },
    { value: "clairon", label: "Clairon" },
    { value: "cor", label: "Cor" },
    { value: "accordéon", label: "Accordéon" },
    { value: "harmonica", label: "Harmonica" },
    { value: "accessoires-pieces", label: "Accessoires et pièces" },
    { value: "autre", label: "Autre" },
  ],
  "equipements-dj-home-studio": [
    { value: "platines", label: "Platines" },
    { value: "table-de-mixage", label: "Table de mixage" },
    { value: "looper", label: "Looper" },
    { value: "connectique", label: "Connectique" },
    { value: "controleur", label: "Contrôleur" },
    { value: "accessoires-pieces", label: "Accessoires et pièces" },
    { value: "autre", label: "Autre" },
  ],
  "partitions-methodes": [
    { value: "partitions", label: "Partitions" },
    { value: "methodes", label: "Méthodes" },
    { value: "autre", label: "Autre" },
  ],
  "accessoires-generiques": [
    { value: "micro", label: "Micro" },
    { value: "pied-micro", label: "Pied micro" },
    { value: "pupitre", label: "Pupitre" },
    { value: "metronome", label: "Métronome" },
    { value: "accordeur", label: "Accordeur" },
    { value: "autre", label: "Autre" },
  ],
  "autre": [], // pas de produits spécifiques pour "Autre"
};

export default function LoisirsFilters({
    draft,
  setFilter,
  isValueSelected,
  handleCheckboxChange,
  excludedFilterNames = [],
}: Props) {
  // ===================== OPTIONS =====================

 

  const triOptions = [
    { value: "pertinence", label: "Pertinence" },
    { value: "recent", label: "Plus récentes" },
    { value: "ancien", label: "Plus anciennes" },
    { value: "price-asc", label: "Prix croissants" },
    { value: "price-desc", label: "Prix décroissants" },
  ];

  const typeAnnonceOptions = [
    { value: "offres", label: "Offres" },
    { value: "demandes", label: "Demandes" },
  ];

  const typeVendeursOptions = [
    { value: "particuliers", label: "Particuliers" },
    { value: "professionnels", label: "Professionnels" },
  ];

  const annoncesUrgentesOptions = [
    { value: "true", label: "Annonces urgentes" },
  ];


  const handleSortChange = (name: string, value: string) => {
    setFilter(name, value);
  };

  const loisirsProduitOptions = [
  { value: "art-de-la-table", label: "Art de la table" },
  { value: "bijoux-anciens", label: "Bijoux anciens" },
  { value: "decor-objets-art", label: "Décor et objets d'art" },
  { value: "horloge-ancienne", label: "Horloge ancienne" },
  { value: "mobilier-ancien", label: "Mobilier ancien" },
  { value: "objets-religieux", label: "Objets religieux" },
  { value: "peinture-ancienne", label: "Peinture ancienne" },
  { value: "textiles-tapis-anciens", label: "Textiles et tapis anciens" },
  { value: "autre", label: "Autre" },
];

const loisirsMatiereOptions = [
  { value: "bois", label: "Bois (chêne, noyer, acajou, etc.)" },
  { value: "bronze", label: "Bronze" },
  { value: "fer-forge", label: "Fer forgé" },
  { value: "porcelaine", label: "Porcelaine" },
  { value: "faience", label: "Faïence" },
  { value: "argent", label: "Argent / Argent massif" },
  { value: "or", label: "Or" },
  { value: "marbre", label: "Marbre" },
  { value: "ceramique", label: "Céramique" },
  { value: "verre-cristal", label: "Verre / Cristal" },
  { value: "textile-lin-dentelle", label: "Textile / Lin / Dentelle" },
  { value: "papier-carton", label: "Papier / Carton" },
  { value: "autre", label: "Autre" },
];

// Époque
const loisirsEpoqueOptions = [
  { value: "avant-1700", label: "Avant 1700" },
  { value: "18e-siecle", label: "XVIIIᵉ siècle" },
  { value: "19e-siecle", label: "XIXᵉ siècle" },
  { value: "debut-20e-1900-1930", label: "Début XXᵉ (1900–1930)" },
  { value: "annees-1930", label: "Années 1930" },
  { value: "autre", label: "Autre" },
];

// Style
const loisirsStyleOptions = [
  { value: "louis-xiii-xiv-xv-xvi", label: "Louis XIII, XIV, XV, XVI" },
  { value: "empire-napoleon-iii", label: "Empire & Napoléon III" },
  { value: "art-nouveau", label: "Art nouveau" },
  { value: "art-deco", label: "Art déco" },
  { value: "autre", label: "Autre" },
];

// État
const loisirsEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];

const billeterieTypeOptions = [
  { value: "billets-train-transports", label: "Billets de train ou autres transports" },
  { value: "one-man-show-cabarets", label: "One-man show & cabarets" },
  { value: "bon-dachat", label: "Bon d'achat" },
  { value: "spectacles-enfants", label: "Spectacles pour enfants" },
  { value: "concerts", label: "Concerts" },
  { value: "sport", label: "Sport" },
  { value: "theatre-comedies-musicales", label: "Théâtre & comédies musicales" },
  { value: "autres", label: "Autres" },
];



// Produit
const collectionProduitOptions = [
  { value: "affiches-cinema", label: "Affiches de cinéma" },
  { value: "autographe", label: "Autographe" },
  { value: "cartes-postales", label: "Cartes postales" },
  { value: "drapeau", label: "Drapeau" },
  { value: "figurines", label: "Figurines" },
  { value: "image-sticker", label: "Image et sticker" },
  { value: "jeux-de-cartes", label: "Jeux de cartes" },
  { value: "kinder-surprise", label: "Kinder surprise" },
  { value: "miniaturess-vehicules", label: "Miniatures / Véhicules" },
  { value: "objet-publicitaire", label: "Objet publicitaire" },
  { value: "pichet-verres", label: "Pichet et verres" },
  { value: "piece-billet", label: "Pièce et billet" },
  { value: "pins", label: "Pins" },
  { value: "porcelaine", label: "Porcelaine" },
  { value: "poupee-accessoires", label: "Poupée et accessoires de poupée" },
  { value: "timbre", label: "Timbre" },
  { value: "autre", label: "Autre" },
];

// Époque
const collectionEpoqueOptions = [
  { value: "avant-1900", label: "Avant 1900" },
  { value: "1900-1945", label: "1900–1945" },
  { value: "1945-1970", label: "1945–1970" },
  { value: "1970-1990", label: "1970–1990" },
  { value: "1990-2010", label: "1990–2010" },
  { value: "apres-2010", label: "Après 2010" },
  { value: "autre", label: "Autre" },
];

// Conditionnement
const collectionConditionnementOptions = [
  { value: "sous-blister-scellement", label: "Sous blister / scellé" },
  { value: "avec-boite-origine", label: "Avec boîte d’origine" },
  { value: "sans-emballage", label: "Sans emballage" },
  { value: "lot-collection-groupee", label: "Lot / collection groupée" },
];

// État
const collectionEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
];


// Support
const cdmusiqueSupportOptions = [
  { value: "cd", label: "CD" },
  { value: "vinyles", label: "Vinyles" },
  { value: "cassette-audio", label: "Cassette audio" },
  { value: "coffrets-integrales", label: "Coffrets et Intégrales" },
  { value: "dvd-bluray-musicaux", label: "DVD et Blu-Ray musicaux" },
  { value: "bluray-audio", label: "Blu-Ray Audio" },
  { value: "autre", label: "Autre" },
];

// Genre
const cdmusiqueGenreOptions = [
  { value: "variete-francaise", label: "Variété française" },
  { value: "pop-rock-inde", label: "Pop, Rock, Indé" },
  { value: "k-pop", label: "K-pop" },
  { value: "musique-classique", label: "Musique classique" },
  { value: "jazz-blues", label: "Jazz, Blues" },
  { value: "rap", label: "Rap" },
  { value: "rnb-soul-funk", label: "R&B, Soul, Funk" },
  { value: "variete-internationale", label: "Variété internationale" },
  { value: "electro", label: "Electro" },
  { value: "hard-rock-metal", label: "Hard Rock, Metal" },
  { value: "musiques-monde", label: "Musiques du monde" },
  { value: "reggae-ragga-roots", label: "Reggae, Ragga, Roots" },
  { value: "albums-country", label: "Albums Country" },
  { value: "compilations-dance", label: "Compilations, Dance" },
  { value: "bo-musiques-films", label: "BO, Musiques de films, Comédies musicales" },
  { value: "musiques-jeux-video", label: "Musiques de Jeux Vidéo" },
  { value: "musique-enfants", label: "Musique enfants" },
  { value: "autre", label: "Autre" },
];

// État
const cdmusiqueEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
];

// DVD & Films - Support
const dvdfilmsSupportOptions = [
  { value: "dvd", label: "DVD" },
  { value: "blu-ray", label: "Blu-ray" },
  { value: "cassettes-video", label: "Cassettes vidéo" },
];

// DVD & Films - Genre
const dvdfilmsGenreOptions = [
  { value: "action-policier-aventure", label: "Action, Policier, Aventure" },
  { value: "angoisse-horreur", label: "Angoisse, Horreur" },
  { value: "animation-japonaise", label: "Animation japonaise" },
  { value: "comedie", label: "Comédie" },
  { value: "cinema-asiatique", label: "Cinéma asiatique" },
  { value: "documentaire-sport", label: "Documentaire, Sport" },
  { value: "drame-emotions", label: "Drame, émotions" },
  { value: "enfant", label: "Enfant" },
  { value: "fantastique-science-fiction", label: "Fantastique, Science-fiction" },
  { value: "films-musicaux", label: "Films musicaux" },
  { value: "grands-classiques", label: "Grands Classiques" },
  { value: "humour-theatre", label: "Humour, Théâtre" },
  { value: "series-tv", label: "Séries TV" },
  { value: "autre", label: "Autre" },
];

// DVD & Films - Édition / Version
const dvdfilmsEditionOptions = [
  { value: "edition-standard", label: "Édition standard" },
  { value: "edition-collector", label: "Édition collector" },
  { value: "version-longue", label: "Version longue" },
  { value: "coffret-integral", label: "Coffret intégral, saga" },
  { value: "reedition-remaster", label: "Réédition, remaster" },
  { value: "autre", label: "Autre" },
];

// DVD & Films - Packaging / Boîtier
const dvdfilmsPackagingOptions = [
  { value: "steelbook", label: "SteelBook" },
  { value: "digipack", label: "Digipack" },
  { value: "sans-boitier", label: "Sans boîtier / pochette" },
  { value: "coffret-carton", label: "Coffret cartonné" },
  { value: "autre", label: "Autre" },
];

// DVD & Films - État
const dvdfilmsEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
];
// Univers (statique)
const instrumentsUniversOptions = [
  { value: "guitares-basses", label: "Guitares et basses" },
  { value: "instruments-a-cordes", label: "Instruments à cordes" },
  { value: "batteries-percussions", label: "Batteries et percussions" },
  { value: "pianos-claviers", label: "Pianos et claviers" },
  { value: "instruments-a-vent", label: "Instruments à vent" },
  { value: "equipements-dj-home-studio", label: "Équipements DJ et home studio" },
  { value: "partitions-methodes", label: "Partitions et Méthodes" },
  { value: "accessoires-generiques", label: "Accessoires génériques" },
  { value: "autre", label: "Autre" },
];

const instrumentsmarqueOptions = [
  { value: "casio", label: "Casio" },
  { value: "instruments-a-cordes", label: "Instruments à cordes" },
  { value: "d-addario", label: "D'addario" },
  { value: "elexir", label: "Elixir" },
  { value: "ernie-ball", label: "Ernie Ball" },
  { value: "fender", label: "Fender" },
  { value: "ginson", label: "Gibson" },
  { value: "ibanez", label: "Ibanez" },
  { value: "korg", label: "Korg"},
   { value: "marshall", label: "Marshall"},
    { value: "pearl", label: "Pearl"},
     { value: "pioneer-dj", label: "Pioneer DJ"},
      { value: "roland", label: "Roland"},
       { value: "savarez", label: "Savarez"},
        { value: "Shiver", label: "Shiver"},
        { value: "takamine", label: "Takamine"},
        { value: "vic-firth", label: "Vic Firth"},
        { value: "yamaha", label: "Yamaha"},
        { value: "autre", label: "Autre"},
        { value: "sans-marque", label: "Sans marque"},
];

const instrumentNiveauOptions = [
  { value: "debutant", label: "Débutant"},
        { value: "intermediaire", label: "Intermédiare"},
        { value: "professionnel", label: "Professionnel"},

];



// Dans le composant, après les autres useMemo, ajoutez :
const instrumentsProduitOptions = useMemo(() => {
  const selectedUnivers = draft.filters?.instrumentsunivers;
  if (!selectedUnivers) return [];
  return PRODUITS_BY_INSTRUMENTS_UNIVERS[selectedUnivers] || [];
}, [draft.filters?.instrumentsunivers]);

// Gestionnaire pour réinitialiser le produit quand l'univers change
const handleInstrumentsUniversChange = (name: string, value: string) => {
  setFilter(name, value);
  if (draft.filters?.instrumentsproduit) {
    setFilter("instrumentsproduit", "");
  }
};

// État désactivé du produit
const isInstrumentsProduitDisabled = !draft.filters?.instrumentsunivers;
const instrumentsetatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
  
];


// Livres - Format
const livresFormatOptions = [
  { value: "poche", label: "Poche" },
  { value: "grand-format", label: "Grand format" },
  { value: "relie", label: "Relié" },
  { value: "illustre", label: "Illustré" },
  { value: "collection-specifique", label: "Collection spécifique" },
  { value: "autre", label: "Autre" },
];

// Livres - Genre
const livresGenreOptions = [
  { value: "roman-litterature", label: "Roman / Littérature" },
  { value: "bd-manga", label: "Bande dessinée et manga" },
  { value: "policier", label: "Policier" },
  { value: "enfant-adolescent", label: "Livre pour enfant et adolescent" },
  { value: "essai-societe", label: "Essai et société" },
  { value: "cuisine", label: "Cuisine" },
  { value: "vie-pratique-loisirs", label: "Vie pratique et loisirs" },
  { value: "science-fiction", label: "Science-fiction" },
  { value: "art-culture", label: "Art et culture" },
  { value: "manuel-scolaire", label: "Manuel scolaire" },
  { value: "livre-ancien", label: "Livre ancien" },
  { value: "revue-magazine", label: "Revue et magazine" },
  { value: "developpement-personnel", label: "Développement personnel" },
  { value: "guide-voyage", label: "Guide de voyage" },
  { value: "autre", label: "Autre" },
];

// Livres - Langue
const livresLangueOptions = [
  { value: "allemand", label: "Allemand" },
  { value: "anglais", label: "Anglais" },
  { value: "arabe", label: "Arabe" },
  { value: "chinois", label: "Chinois" },
  { value: "espagnol", label: "Espagnol" },
  { value: "francais", label: "Français" },
  { value: "italien", label: "Italien" },
  { value: "japonais", label: "Japonais" },
  { value: "portugais", label: "Portugais" },
  { value: "russe", label: "Russe" },
  { value: "autre-multilingue", label: "Autre / Multilingue" },
];

// Livres - État
const livresEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
];


// Modélisme - Produit
const modelismeProduitOptions = [
  { value: "accessoires-decor-outillage", label: "Accessoires / Décor / Outillage" },
  { value: "avions-helicopteres", label: "Avions / Hélicoptères" },
  { value: "bateaux-sous-marins", label: "Bateaux / Sous-marins" },
  { value: "figurines", label: "Figurines" },
  { value: "maquettes-monter", label: "Maquettes à monter" },
  { value: "modeles-militaires", label: "Modèles militaires" },
  { value: "trains-miniatures", label: "Trains miniatures" },
  { value: "autre", label: "Autre" },
];

// Modélisme - Échelle
const modelismeEchelleOptions = [
  { value: "1-6-1-12-1-18-1-24-1-32-1-43", label: "1/6, 1/12, 1/18, 1/24, 1/32, 1/43" },
  { value: "1-35-1-48-1-72-1-100-1-144", label: "1/35, 1/48, 1/72, 1/100, 1/144" },
  { value: "1-87-ho-1-160-n", label: "1/87 (HO), 1/160(N)" },
  { value: "1-200-1-350-1-400-1-700-1-1000-plus", label: "1/200, 1/350, 1/400, 1/700, 1/1000+" },
  { value: "autre", label: "Autre" },
];

// Modélisme - Marque
const modelismeMarqueOptions = [
  { value: "airfix", label: "Airfix" },
  { value: "altaya", label: "Altaya" },
  { value: "bandai", label: "Bandai" },
  { value: "bburago", label: "Bburago" },
  { value: "dinky-toys", label: "Dinky Toys" },
  { value: "dji", label: "DJI" },
  { value: "faller", label: "Faller" },
  { value: "fleischmann", label: "Fleischmann" },
  { value: "fujimi", label: "Fujimi" },
  { value: "heller", label: "Heller" },
  { value: "herpa", label: "Herpa" },
  { value: "hornby", label: "Hornby" },
  { value: "hpi-racing", label: "HPI Racing" },
  { value: "italeri", label: "Italeri" },
  { value: "jouef", label: "Jouef" },
  { value: "kyosho", label: "Kyosho" },
  { value: "lgb", label: "LGB" },
  { value: "lima", label: "Lima" },
  { value: "maisto", label: "Maisto" },
  { value: "märklin", label: "Märklin" },
  { value: "mehano", label: "Mehano" },
  { value: "minichamps", label: "Minichamps" },
  { value: "nikko", label: "Nikko" },
  { value: "norev", label: "Norev" },
  { value: "ottomobile", label: "Ottomobile" },
  { value: "piko", label: "Piko" },
  { value: "revell", label: "Revell" },
  { value: "roco", label: "Roco" },
  { value: "solido", label: "Solido" },
  { value: "t2m", label: "T2M" },
  { value: "tamiya", label: "Tamiya" },
  { value: "traxxas", label: "Traxxas" },
  { value: "autre", label: "Autre" },
  { value: "sans-marque", label: "Sans marque" },
];

// Modélisme - État
const modelismeEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];


// Vins & Gastronomie - Univers
const vinsgastronomieUniversOptions = [
  { value: "vins", label: "Vins" },
  { value: "gastronomie", label: "Gastronomie" },
  { value: "accessoires-stockage", label: "Accessoires et stockage" },
  { value: "autre", label: "Autre" },
];

// Vins & Gastronomie - État
const vinsgastronomieEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
];


// Jeux & Jouets - Âge
const jeuxjouetsAgeOptions = [
  { value: "0-3-ans", label: "De 0 à 3 ans" },
  { value: "4-6-ans", label: "De 4 à 6 ans" },
  { value: "7-12-ans", label: "De 7 à 12 ans" },
  { value: "12-ans-et-plus", label: "12 ans et +" },
];

// Jeux & Jouets - Produit
const jeuxjouetsProduitOptions = [
  { value: "cuisines-dinettes", label: "Cuisines et dinettes" },
  { value: "doudous-peluches", label: "Doudous et peluches" },
  { value: "jeux-construction", label: "Jeux de construction" },
  { value: "jeux-societe", label: "Jeux de société" },
  { value: "jeux-role", label: "Jeux de rôle" },
  { value: "jeux-imitation-deguisements", label: "Jeux d’imitation et déguisements" },
  { value: "jeux-educatifs", label: "Jeux éducatifs" },
  { value: "jeux-radiocommandes", label: "Jeux radiocommandés" },
  { value: "jouets-eveil", label: "Jouets d’éveil" },
  { value: "loisirs-creatifs", label: "Loisirs créatifs" },
  { value: "porteurs-trotteurs-draisiennes", label: "Porteurs, trotteurs et draisiennes" },
  { value: "poupees-accessoires", label: "Poupées et accessoires" },
  { value: "puzzle", label: "Puzzle" },
  { value: "trains-bateaux-avions", label: "Trains, bateaux et avions" },
  { value: "voitures-circuits", label: "Voitures et circuits" },
  { value: "autre", label: "Autre" },
];

// Jeux & Jouets - État
const jeuxjouetsEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
];

// Jeux & Jouets - Marque
const jeuxjouetsMarqueOptions = [
  { value: "asmodée", label: "Asmodée" },
  { value: "bandai", label: "Bandai" },
  { value: "chicco", label: "Chicco" },
  { value: "corolle", label: "Corolle" },
  { value: "djeco", label: "Djeco" },
  { value: "fisher-price", label: "Fisher-Price" },
  { value: "haba", label: "Haba" },
  { value: "hachette-jeunesse", label: "Hachette Jeunesse" },
  { value: "hasbro", label: "Hasbro" },
  { value: "janod", label: "Janod" },
  { value: "lego", label: "Lego" },
  { value: "mattel", label: "Mattel" },
  { value: "nathan-jeunesse", label: "Nathan Jeunesse" },
  { value: "oxybul", label: "Oxybul" },
  { value: "play-doh", label: "Play-Doh" },
  { value: "playmobil", label: "Playmobil" },
  { value: "ravensburger", label: "Ravensburger" },
  { value: "schleich", label: "Schleich" },
  { value: "smoby", label: "Smoby" },
  { value: "tonies", label: "Tonies" },
  { value: "ty", label: "TY" },
  { value: "v-tech", label: "V-Tech" },
  { value: "yoto", label: "Yoto" },
  { value: "sans-marque", label: "Sans marque" },
  { value: "autre", label: "Autre" },
];

// Sport & Plein air - Activité (liste unique)
const sportpleinairActiviteOptions = [
  { value: "boxe", label: "Boxe" },
  { value: "escrime", label: "Escrime" },
  { value: "judo-aikido", label: "Judo, aïkido" },
  { value: "karate", label: "Karaté" },
  { value: "kung-fu", label: "Kung fu" },
  { value: "protections", label: "Protections" },
  { value: "taekwondo", label: "Taekwondo" },
  { value: "appareil-musculation", label: "Appareil de musculation" },
  { value: "gym-pilates-yoga", label: "Gym, pilates et yoga" },
  { value: "halteres-disques-poids", label: "Haltères, disques et poids" },
  { value: "montres-sport-pacer", label: "Montres de sport et pacer" },
  { value: "rameur", label: "Rameur" },
  { value: "tapis-course", label: "Tapis de course" },
  { value: "velo-appartement", label: "Vélo d'appartement" },
  { value: "velo-elliptique", label: "Vélo elliptique" },
  { value: "gyropode-gyroroue-hoverboard", label: "Gyropode, gyroroue et hoverboard" },
  { value: "patins-roulettes", label: "Patins à roulettes" },
  { value: "roller", label: "Roller" },
  { value: "skateboard", label: "Skateboard" },
  { value: "trottinette", label: "Trottinette" },
  { value: "billard", label: "Billard" },
  { value: "boomerang", label: "Boomerang" },
  { value: "bowling", label: "Bowling" },
  { value: "cerf-volant", label: "Cerf volant" },
  { value: "flechettes", label: "Fléchettes" },
  { value: "jeux-quilles", label: "Jeux de quilles" },
  { value: "petanque", label: "Pétanque" },
  { value: "slackline", label: "Slackline" },
  { value: "tir-arc", label: "Tir à l'arc" },
  { value: "trampoline", label: "Trampoline" },
  { value: "baseball", label: "Baseball" },
  { value: "basketball", label: "Basketball" },
  { value: "football", label: "Football" },
  { value: "handball", label: "Handball" },
  { value: "rugby", label: "Rugby" },
  { value: "volley-ball", label: "Volley-ball" },
  { value: "avion-ulm", label: "Avion ULM" },
  { value: "camping-randonnee", label: "Camping et randonnée" },
  { value: "chasse-peche", label: "Chasse et pêche" },
  { value: "equitation", label: "Equitation" },
  { value: "escalade", label: "Escalade" },
  { value: "karting", label: "Karting" },
  { value: "hockey-glace", label: "Hockey sur glace" },
  { value: "raquette", label: "Raquette" },
  { value: "ski", label: "Ski" },
  { value: "ski-fond-randonnee", label: "Ski de fond et de randonnée" },
  { value: "snowboard", label: "Snowboard" },
  { value: "badminton", label: "Badminton" },
  { value: "tennis", label: "Tennis" },
  { value: "tennis-table", label: "Tennis de table" },
  { value: "athletisme", label: "Athlétisme" },
  { value: "danse", label: "Danse" },
  { value: "golf", label: "Golf" },
  { value: "running", label: "Running" },
  { value: "aviron", label: "Aviron" },
  { value: "bodyboard-foilboard-wingfoil", label: "Bodyboard, foilboard, wingfoil" },
  { value: "canoe-kayak", label: "Canoe, kayak" },
  { value: "jet-ski", label: "Jet-ski" },
  { value: "kitesurf-wakeboard-wakesurf", label: "Kitesurf, wakeboard et wakesurf" },
  { value: "natation", label: "Natation" },
  { value: "paddle", label: "Paddle" },
  { value: "piscine", label: "Piscine" },
  { value: "planche-voile", label: "Planche à voile" },
  { value: "plongee", label: "Plongée" },
  { value: "ski-nautique", label: "Ski nautique" },
  { value: "surf", label: "Surf" },
  { value: "voile-bateau", label: "Voile, bateau" },
  { value: "autre", label: "Autre" },
];

// Sport & Plein air - État
const sportpleinairEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];


// Loisirs créatifs - Produit
const loisirscreatifsProduitOptions = [
  { value: "creation-bijoux", label: "Création de bijoux" },
  { value: "decoration-diy", label: "Décoration DIY" },
  { value: "fournitures-base", label: "Fournitures de base (papier, carton, tissu, perles...)" },
  { value: "livres-tutoriels-patrons", label: "Livres / tutoriels / patrons" },
  { value: "loisirs-creatifs-enfants", label: "Loisirs créatifs enfants" },
  { value: "materiel-couture-tricot-crochet-broderie", label: "Matériel de couture / tricot / crochet / broderie" },
  { value: "modelage-sculpture", label: "Modelage et sculpture" },
  { value: "peinture-dessin", label: "Peinture et dessin" },
  { value: "scrapbooking", label: "Scrapbooking" },
  { value: "autre", label: "Autre" },
];

// Loisirs créatifs - Cible
const loisirscreatifsCibleOptions = [
  { value: "adulte", label: "Adulte" },
  { value: "tout-public", label: "Tout public" },
];

// Loisirs créatifs - État
const loisirscreatifsEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];

// ===================== VÉLOS =====================

// Univers
const velosUniversOptions = [
  { value: "femme", label: "Femme" },
  { value: "homme", label: "Homme" },
  { value: "enfant", label: "Enfant" },
  { value: "mixte", label: "Mixte" },
];

// Type de vélo
const velosTypeOptions = [
  { value: "enfant", label: "Enfant" },
  { value: "vtt", label: "VTT" },
  { value: "velo-loisirs-vtc", label: "Vélo de loisirs / VTC" },
  { value: "velo-route", label: "Vélo de route" },
  { value: "bmx", label: "BMX" },
  { value: "velo-electrique", label: "Vélo électrique" },
  { value: "velo-pliant", label: "Vélo pliant" },
  { value: "velo-ville", label: "Vélo de ville" },
  { value: "velo-cargo", label: "Vélo cargo" },
  { value: "pignon-fixe", label: "Pignon fixe" },
  { value: "tandem", label: "Tandem" },
  { value: "velo-hollandais", label: "Vélo hollandais" },
  { value: "fatbike", label: "Fatbike" },
  { value: "adolescent", label: "Adolescent" },
  { value: "velo-triathlon", label: "Vélo de triathlon" },
  { value: "autre", label: "Autre" },
];

// Taille de vélo
const velosTailleVeloOptions = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
];

// Taille de roue
const velosTailleRoueOptions = [
  { value: "10-152", label: '10" (ETRTO 152)' },
  { value: "12-203", label: '12" (ETRTO 203)' },
  { value: "16-305", label: '16" (ETRTO 305)' },
  { value: "18-355", label: '18" (ETRTO 355)' },
  { value: "20-406", label: '20" (ETRTO 406)' },
  { value: "22-457", label: '22" (ETRTO 457)' },
  { value: "24-507", label: '24" (ETRTO 507)' },
  { value: "26-559", label: '26" (ETRTO 559)' },
  { value: "27-5-584", label: '27,5" (ETRTO 584)' },
  { value: "28-622", label: '28" (ETRTO 622)' },
  { value: "29-622", label: '29" (ETRTO 622)' },
  { value: "autre", label: "Autre" },
];

// Marque
const velosMarqueOptions = [
  { value: "bh", label: "BH" },
  { value: "bianchi", label: "Bianchi" },
  { value: "bmc", label: "BMC" },
  { value: "brompton", label: "Brompton" },
  { value: "cannondale", label: "Cannondale" },
  { value: "canyon", label: "Canyon" },
  { value: "cervelo", label: "Cervélo" },
  { value: "cube", label: "Cube" },
  { value: "decathlon-btwin", label: "Decathlon / Btwin" },
  { value: "elops", label: "Elops" },
  { value: "focus", label: "Focus" },
  { value: "gazelle", label: "Gazelle" },
  { value: "giant", label: "Giant" },
  { value: "gitane", label: "Gitane" },
  { value: "haibike", label: "Haibike" },
  { value: "kalkhoff", label: "Kalkhoff" },
  { value: "lapierre", label: "Lapierre" },
  { value: "look", label: "Look" },
  { value: "mc-sunn", label: "MC (Monocycle) ou Sunn" },
  { value: "merida", label: "Merida" },
  { value: "moustache", label: "Moustache" },
  { value: "nakamura", label: "Nakamura" },
  { value: "orbea", label: "Orbea" },
  { value: "peugeot-cycles", label: "Peugeot Cycles" },
  { value: "raleigh", label: "Raleigh" },
  { value: "riverside", label: "Riverside" },
  { value: "rockrider", label: "Rockrider" },
  { value: "scott", label: "Scott" },
  { value: "specialized", label: "Specialized" },
  { value: "trek", label: "Trek" },
  { value: "triban", label: "Triban" },
  { value: "van-rysel", label: "Van Rysel" },
  { value: "sans-marque", label: "Sans marque" },
  { value: "autre", label: "Autre" },
];

// Couleur (avec cercles)
const velosCouleurBaseOptions = [
  { value: "beige", label: "Beige", color: "#F5F5DC" },
  { value: "blanc", label: "Blanc", color: "#FFFFFF" },
  { value: "bleu", label: "Bleu", color: "#0000FF" },
  { value: "gris", label: "Gris", color: "#808080" },
  { value: "jaune", label: "Jaune", color: "#FFFF00" },
  { value: "marron", label: "Marron", color: "#8B4513" },
  { value: "multicolore", label: "Multicolore", color: "linear-gradient(90deg, red, orange, yellow, green, blue, purple)" },
  { value: "noir", label: "Noir", color: "#000000" },
  { value: "orange", label: "Orange", color: "#FFA500" },
  { value: "rose", label: "Rose", color: "#FFC0CB" },
  { value: "rouge", label: "Rouge", color: "#FF0000" },
  { value: "vert", label: "Vert", color: "#008000" },
  { value: "violet", label: "Violet", color: "#EE82EE" },
  { value: "autre", label: "Autre", color: "#CCCCCC" },
];

const velosCouleurOptions = velosCouleurBaseOptions.map((opt) => ({
  ...opt,
  icon: (
    <span
      style={{
        display: "inline-block",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: opt.color,
        border: "1px solid #ccc",
        marginRight: "8px",
      }}
    />
  ),
}));

// État
const velosEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];


// ===================== ÉQUIPEMENT VÉLO =====================

// Univers
const equipementvelosUniversOptions = [
  { value: "femme", label: "Femme" },
  { value: "homme", label: "Homme" },
  { value: "enfant", label: "Enfant" },
  { value: "mixte", label: "Mixte" },
];

// Produit
const equipementvelosProduitOptions = [
  { value: "antivol", label: "Antivol" },
  { value: "bequille", label: "Béquille" },
  { value: "bidon-porte-bidon", label: "Bidon et porte-bidon" },
  { value: "casque", label: "Casque" },
  { value: "compteur-gps-velo", label: "Compteur et GPS vélo" },
  { value: "eclairage", label: "Éclairage" },
  { value: "gants-cyclisme", label: "Gants de cyclisme" },
  { value: "garde-boue", label: "Garde-boue" },
  { value: "guidon", label: "Guidon" },
  { value: "housse-transport", label: "Housse de transport" },
  { value: "lunettes-masque", label: "Lunettes et masque" },
  { value: "objets-reflechissants", label: "Objets réfléchissants" },
  { value: "outils-kit-reparation", label: "Outils et Kit de réparation" },
  { value: "pompe-velo", label: "Pompe à vélo" },
  { value: "porte-bagages-panier", label: "Porte-bagages et panier" },
  { value: "racks-porte-velo", label: "Racks et porte-vélo" },
  { value: "roues-chambres-air", label: "Roues et chambres à air" },
  { value: "sacoche-bagagerie", label: "Sacoche et bagagerie" },
  { value: "selle", label: "Selle" },
  { value: "vetements-velo", label: "Vêtements vélo" },
  { value: "autre", label: "Autre" },
];

// Marque
const equipementvelosMarqueOptions = [
  { value: "abus", label: "Abus" },
  { value: "bianchi", label: "Bianchi" },
  { value: "bontrager", label: "Bontrager" },
  { value: "brompton", label: "Brompton" },
  { value: "brooks", label: "Brooks" },
  { value: "cannondale", label: "Cannondale" },
  { value: "canyon", label: "Canyon" },
  { value: "cervelo", label: "Cervélo" },
  { value: "cube", label: "Cube" },
  { value: "decathlon-btwin", label: "Decathlon / Btwin" },
  { value: "gazelle", label: "Gazelle" },
  { value: "giant", label: "Giant" },
  { value: "gitane", label: "Gitane" },
  { value: "haibike", label: "Haibike" },
  { value: "lapierre", label: "Lapierre" },
  { value: "look", label: "Look" },
  { value: "moustache", label: "Moustache" },
  { value: "orbea", label: "Orbea" },
  { value: "peugeot-cycles", label: "Peugeot Cycles" },
  { value: "raleigh", label: "Raleigh" },
  { value: "scott", label: "Scott" },
  { value: "selle-italia", label: "Selle Italia" },
  { value: "shimano", label: "Shimano" },
  { value: "sidi", label: "Sidi" },
  { value: "specialized", label: "Specialized" },
  { value: "sram", label: "SRAM" },
  { value: "trek", label: "Trek" },
  { value: "van-rysel", label: "Van Rysel" },
  { value: "sans-marque", label: "Sans marque" },
  { value: "autre", label: "Autre" },
];

// Taille
const equipementvelosTailleOptions = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
];

// État
const equipementvelosEtatOptions = [
  { value: "neuf", label: "État neuf" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];
  // ===================== RENDER =====================

  return (
    <div className="space-y-4">
    {/* Prix */}
          {!excludedFilterNames.includes("price") && (
            <RangeFilter
              label="Prix"
              minValue={draft.priceMin}
              maxValue={draft.priceMax}
              unit="€"
              icon={<AiOutlineEuro />}
              onMinChange={(v) => setFilter("priceMin", v)}
              onMaxChange={(v) => setFilter("priceMax", v)}
            />
          )}


          {/* Équipement vélo - Univers */}
{!excludedFilterNames.includes("equipementvelosunivers") && (
  <RadioCheckboxGroup
    title="Univers"
    icon={<TfiAlarmClock className="text-sm" />}
    name="equipementvelosunivers"
    options={equipementvelosUniversOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Équipement vélo - Produit */}
{!excludedFilterNames.includes("equipementvelosproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="equipementvelosproduit"
    options={equipementvelosProduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Équipement vélo - Marque */}
{!excludedFilterNames.includes("equipementvelosmarque") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="equipementvelosmarque"
    options={equipementvelosMarqueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Équipement vélo - Taille */}
{!excludedFilterNames.includes("equipementvelostaille") && (
  <CaracteristiquesFilter
    title="Taille"
    icon={<TfiAlarmClock className="text-sm" />}
    name="equipementvelostaille"
    options={equipementvelosTailleOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Équipement vélo - État */}
{!excludedFilterNames.includes("equipementvelosetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="equipementvelosetat"
    options={equipementvelosEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* Vélos - Univers */}
{!excludedFilterNames.includes("velosunivers") && (
  <RadioCheckboxGroup
    title="Univers"
    icon={<TfiAlarmClock className="text-sm" />}
    name="velosunivers"
    options={velosUniversOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Vélos - Type de vélo */}
{!excludedFilterNames.includes("velostype") && (
  <CaracteristiquesFilter
    title="Type de vélo"
    icon={<TfiAlarmClock className="text-sm" />}
    name="velostype"
    options={velosTypeOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Vélos - Taille de vélo */}
{!excludedFilterNames.includes("velostaillevelo") && (
  <CheckboxGroupCarre
    title="Taille de vélo"
    icon={<TfiAlarmClock className="text-sm" />}
    name="velostaillevelo"
    options={velosTailleVeloOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Vélos - Taille de roue */}
{!excludedFilterNames.includes("velostailletoue") && (
  <CaracteristiquesFilter
    title="Taille de roue"
    icon={<TfiAlarmClock className="text-sm" />}
    name="velostailletoue"
    options={velosTailleRoueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Vélos - Marque */}
{!excludedFilterNames.includes("velosmarque") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="velosmarque"
    options={velosMarqueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Vélos - Couleur */}
{!excludedFilterNames.includes("veloscouleur") && (
  <CaracteristiquesFilter
    title="Couleur"
    icon={<TfiAlarmClock className="text-sm" />}
    name="veloscouleur"
    options={velosCouleurOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Vélos - État */}
{!excludedFilterNames.includes("velosetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="velosetat"
    options={velosEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* Loisirs créatifs - Produit */}
{!excludedFilterNames.includes("loisirscreatifsproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="loisirscreatifsproduit"
    options={loisirscreatifsProduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Loisirs créatifs - Cible */}
{!excludedFilterNames.includes("loisirscreatifscible") && (
  <CheckboxGroupCarre
    title="Cible"
    icon={<TfiAlarmClock className="text-sm" />}
    name="loisirscreatifscible"
    options={loisirscreatifsCibleOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Loisirs créatifs - État */}
{!excludedFilterNames.includes("loisirscreatifsetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="loisirscreatifsetat"
    options={loisirscreatifsEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* Sport & Plein air - Activité */}
{!excludedFilterNames.includes("sportpleinairactivite") && (
  <CaracteristiquesFilter
    title="Activité"
    icon={<TfiAlarmClock className="text-sm" />}
    name="sportpleinairactivite"
    options={sportpleinairActiviteOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Sport & Plein air - État */}
{!excludedFilterNames.includes("sportpleinairtat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="sportpleinairtat"
    options={sportpleinairEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}


          {/* Jeux & Jouets - Âge */}
{!excludedFilterNames.includes("jeuxjouetsage") && (
  <CaracteristiquesFilter
    title="Âge"
    icon={<TfiAlarmClock className="text-sm" />}
    name="jeuxjouetsage"
    options={jeuxjouetsAgeOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Jeux & Jouets - Produit */}
{!excludedFilterNames.includes("jeuxjouetsproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="jeuxjouetsproduit"
    options={jeuxjouetsProduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Jeux & Jouets - État */}
{!excludedFilterNames.includes("jeuxjouetsetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="jeuxjouetsetat"
    options={jeuxjouetsEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Jeux & Jouets - Marque */}
{!excludedFilterNames.includes("jeuxjouetsmarque") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="jeuxjouetsmarque"
    options={jeuxjouetsMarqueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* Vins & Gastronomie - Univers */}
{!excludedFilterNames.includes("vinsgastronomieunivers") && (
  <CheckboxGroupCarre
    title="Univers"
    icon={<TfiAlarmClock className="text-sm" />}
    name="vinsgastronomieunivers"
    options={vinsgastronomieUniversOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Vins & Gastronomie - État */}
{!excludedFilterNames.includes("vinsgastronomieetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="vinsgastronomieetat"
    options={vinsgastronomieEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* Modélisme - Produit */}
{!excludedFilterNames.includes("modelismeproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="modelismeproduit"
    options={modelismeProduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Modélisme - Échelle */}
{!excludedFilterNames.includes("modelismeechelle") && (
  <CheckboxGroupCarre
    title="Échelle"
    icon={<TfiAlarmClock className="text-sm" />}
    name="modelismeechelle"
    options={modelismeEchelleOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Modélisme - Marque */}
{!excludedFilterNames.includes("modelismemarque") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="modelismemarque"
    options={modelismeMarqueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Modélisme - État */}
{!excludedFilterNames.includes("modelismeetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="modelismeetat"
    options={modelismeEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* Livres - Format */}
{!excludedFilterNames.includes("livresformat") && (
  <CheckboxGroupCarre
    title="Format"
    icon={<TfiAlarmClock className="text-sm" />}
    name="livresformat"
    options={livresFormatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Livres - Genre */}
{!excludedFilterNames.includes("livresgenre") && (
  <CaracteristiquesFilter
    title="Genre"
    icon={<TfiAlarmClock className="text-sm" />}
    name="livresgenre"
    options={livresGenreOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Livres - Langue */}
{!excludedFilterNames.includes("livreslangue") && (
  <CaracteristiquesFilter
    title="Langue"
    icon={<TfiAlarmClock className="text-sm" />}
    name="livreslangue"
    options={livresLangueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Livres - État */}
{!excludedFilterNames.includes("livresetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="livresetat"
    options={livresEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* Instruments de musique - Univers */}
{!excludedFilterNames.includes("instrumentsunivers") && (
  <CaracteristiquesFilterRound
    title="Univers"
    icon={<TfiAlarmClock className="text-sm" />}
    name="instrumentsunivers"
    options={instrumentsUniversOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleInstrumentsUniversChange}
  />
)}

{/* Instruments de musique - Produit (dynamique) */}
{!excludedFilterNames.includes("instrumentsproduit") && (
  <div className={isInstrumentsProduitDisabled ? "opacity-60 pointer-events-none" : ""}>
    <CaracteristiquesFilter
      title="Produit"
      icon={<TfiAlarmClock className="text-sm" />}
      name="instrumentsproduit"
      options={instrumentsProduitOptions}
      isValueSelected={isValueSelected}
      handleCheckboxChange={handleCheckboxChange}
      disabled={isInstrumentsProduitDisabled}
    />
    {isInstrumentsProduitDisabled && (
      <p className="text-xs text-gray-400 mt-1">
        Sélectionnez un univers pour voir les produits disponibles
      </p>
    )}
  </div>
)}

         {/* * Instruments de musique - Marque */}
{!excludedFilterNames.includes("instrumentsmarque") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="instrumentsmarque"
    options={instrumentsmarqueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

       {/* * Instruments de musique - Niveau*/}
{!excludedFilterNames.includes("instrumentsniveau") && (
  <CheckboxGroupCarre
    title="Niveau"
    icon={<TfiAlarmClock className="text-sm" />}
    name="instrumentsniveau"
    options={instrumentNiveauOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

   {/* * Instruments de musique - etat*/}
{!excludedFilterNames.includes("instrumentsetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="instrumentsetat"
    options={instrumentsetatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* DVD & Films - Support */}
{!excludedFilterNames.includes("dvdfilmsupport") && (
  <CaracteristiquesFilter
    title="Support"
    icon={<TfiAlarmClock className="text-sm" />}
    name="dvdfilmsupport"
    options={dvdfilmsSupportOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* DVD & Films - Genre */}
{!excludedFilterNames.includes("dvdfilmgenre") && (
  <CaracteristiquesFilter
    title="Genre"
    icon={<TfiAlarmClock className="text-sm" />}
    name="dvdfilmgenre"
    options={dvdfilmsGenreOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* DVD & Films - Édition / Version */}
{!excludedFilterNames.includes("dvdfilmedition") && (
  <CaracteristiquesFilter
    title="Édition / Version"
    icon={<TfiAlarmClock className="text-sm" />}
    name="dvdfilmedition"
    options={dvdfilmsEditionOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* DVD & Films - Packaging / Boîtier */}
{!excludedFilterNames.includes("dvdfilmpackaging") && (
  <CaracteristiquesFilter
    title="Packaging / Boîtier"
    icon={<TfiAlarmClock className="text-sm" />}
    name="dvdfilmpackaging"
    options={dvdfilmsPackagingOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* DVD & Films - État */}
{!excludedFilterNames.includes("dvdfilmetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="dvdfilmetat"
    options={dvdfilmsEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Support CD & Musique */}
{!excludedFilterNames.includes("cdmusiquesupport") && (
  <CaracteristiquesFilter
    title="Support"
    icon={<TfiAlarmClock className="text-sm" />}
    name="cdmusiquesupport"
    options={cdmusiqueSupportOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Genre CD & Musique */}
{!excludedFilterNames.includes("cdmusiquegenre") && (
  <CaracteristiquesFilter
    title="Genre"
    icon={<TfiAlarmClock className="text-sm" />}
    name="cdmusiquegenre"
    options={cdmusiqueGenreOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État CD & Musique */}
{!excludedFilterNames.includes("cdmusiqueetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="cdmusiqueetat"
    options={cdmusiqueEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}
          {/* Collection : Produit */}
{!excludedFilterNames.includes("collectionproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="collectionproduit"
    options={collectionProduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Collection : Époque */}
{!excludedFilterNames.includes("collectionepoque") && (
  <CaracteristiquesFilter
    title="Époque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="collectionepoque"
    options={collectionEpoqueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Collection : Conditionnement */}
{!excludedFilterNames.includes("collectionconditionnement") && (
  <CheckboxGroupCarre
    title="Conditionnement"
    icon={<TfiAlarmClock className="text-sm" />}
    name="collectionconditionnement"
    options={collectionConditionnementOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Collection : État */}
{!excludedFilterNames.includes("collectionetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="collectionetat"
    options={collectionEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}





          {/* Type billeterie */}
{!excludedFilterNames.includes("billeterietype") && (
  <CaracteristiquesFilter
    title="Type"
    icon={<TfiAlarmClock className="text-sm" />}
    name="billeterietype"
    options={billeterieTypeOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

          {/* Produit loisirs */}
{!excludedFilterNames.includes("loisirsproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="loisirsproduit"
    options={loisirsProduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Matière loisirs */}
{!excludedFilterNames.includes("loisirsmaterie") && (
  <CaracteristiquesFilter
    title="Matière"
    icon={<TfiAlarmClock className="text-sm" />}
    name="loisirsmaterie"
    options={loisirsMatiereOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}
  {/* Époque loisirs */}
{!excludedFilterNames.includes("loisirsepoque") && (
  <CheckboxGroupCarre
    title="Époque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="loisirsepoque"
    options={loisirsEpoqueOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Style loisirs */}
{!excludedFilterNames.includes("loisirsstyle") && (
  <CheckboxGroupCarre
    title="Style"
    icon={<TfiAlarmClock className="text-sm" />}
    name="loisirsstyle"
    options={loisirsStyleOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État loisirs */}
{!excludedFilterNames.includes("loisirsetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="loisirsetat"
    options={loisirsEtatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

      {/* Tri */}
      {!excludedFilterNames.includes("tri") && (
        <RadioCheckboxGroup
          title="Tri"
          icon={<PiSortAscending className="text-sm" />}
          name="tri"
          options={triOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleSortChange}
        />
      )}

      {/* Type annonces */}
      {!excludedFilterNames.includes("typeannonces") && (
        <RadioCheckboxGroup
          title="Type d’annonces"
          icon={<FcDocument className="text-sm" />}
          name="typeannonces"
          options={typeAnnonceOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleSortChange}
        />
      )}

      {/* Vendeurs */}
      {!excludedFilterNames.includes("typevendeurs") && (
        <CheckboxGroupCarre
          title="Type de vendeurs"
          icon={<TbUserScreen className="text-sm" />}
          name="typevendeurs"
          options={typeVendeursOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Urgentes */}
      {!excludedFilterNames.includes("annoncesurgentes") && (
        <CheckboxGroupCarre
          title="Annonces urgentes"
          icon={<TfiAlarmClock className="text-sm" />}
          name="annoncesurgentes"
          options={annoncesUrgentesOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
    </div>
  );
}
