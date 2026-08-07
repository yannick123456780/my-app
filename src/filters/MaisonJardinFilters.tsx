import {
  RadioCheckboxGroup,
  CheckboxGroupCarre,
  CaracteristiquesFilter,
  RangeFilter,
} from "./BaseFilters";
import { FcDocument } from "react-icons/fc";
import { TbUserScreen } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";
import { AiOutlineEuro } from "react-icons/ai";
import { PiGasPump, PiSortAscending } from "react-icons/pi";

interface Props {
  draft: any;
  setFilter: (name: string, value: string) => void;
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  excludedFilterNames?: string[];
}

export default function MaisonJardinFilters({
  draft,
  setFilter,
  isValueSelected,
  handleCheckboxChange,
  excludedFilterNames = [],
}: Props) {
  // ===================== OPTIONS STATIQUES =====================
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

  const statutAnnonceOptions = [
    { value: "true", label: "Statut de l'annonce" },
  ];

  const matiereameublementOptions = [
    { value: "acier", label: "Acier" },
    { value: "bois", label: "Bois" },
    { value: "bois-massif", label: "Bois massif" },
    { value: "bronze", label: "Bronze" },
    { value: "céramique", label: "Céramique" },
    { value: "chêne", label: "Chêne" },
    { value: "cuir", label: "Cuir" },
    { value: "fer", label: "Fer" },
    { value: "formica", label: "Formica" },
    { value: "laqué", label: "Laqué" },
    { value: "marbre", label: "Marbre" },
    { value: "métal", label: "Métal" },
    { value: "pierre", label: "Pierre" },
    { value: "pin", label: "Pin" },
    { value: "plastique", label: "Plastique" },
    { value: "rotin-osier", label: "Rotin et osier" },
    { value: "tissu", label: "Tissu" },
    { value: "velours", label: "Velours" },
    { value: "verre", label: "Verre" },
    { value: "autre", label: "Autre" },
  ];

  const typeameublementOptions = [
    { value: "canapé", label: "Canapé" },
    {
      value: "canapé-convertible-clic-clac",
      label: "Canapé convertible clic clac",
    },
    { value: "canapé-2-places", label: "Canapé 2 places" },
    { value: "canapé-3-places", label: "Canapé 3 places" },
    {
      value: "canapé-4-places-plus",
      label: "Canapé 4 places et plus",
    },
    { value: "canapé-angle", label: "Canapé d'angle" },
    { value: "banquette", label: "Banquette" },
    { value: "méridienne", label: "Méridienne" },
    { value: "chauffeuse", label: "Chauffeuse" },
    { value: "fauteuil", label: "Fauteuil" },

    {
      value: "bibliothèque-étagère",
      label: "Bibliothèque et étagère",
    },
    { value: "meuble-rangement", label: "Meuble de rangement" },
    { value: "armoire", label: "Armoire" },
    { value: "buffet-bas", label: "Buffet bas" },
    { value: "bibliothèque", label: "Bibliothèque" },
    { value: "commode", label: "Commode" },
    { value: "etagère-sur-pied", label: "Etagère sur pied" },
    { value: "etagère-murale", label: "Etagère murale" },
    { value: "meuble-tv", label: "Meuble TV" },
    { value: "meuble-cuisine", label: "Meuble de cuisine" },
    { value: "meuble-jardin", label: "Meuble de jardin" },
    { value: "meuble-salle-bain", label: "Meuble de salle de bain" },
    { value: "meuble-chaussures", label: "Meuble à chaussures" },
    { value: "vaisselier", label: "Vaisselier" },
    { value: "coffre-malle", label: "Coffre et malle" },
    { value: "caisson-rangement", label: "Caisson de rangement" },
    { value: "meuble-bar", label: "Meuble bar" },
    { value: "dressing-penderie", label: "Dressing et penderie" },

    { value: "lit-pour-enfant", label: "Lit pour enfant" },
    { value: "lit", label: "Lit" },
    { value: "sommier", label: "Sommier" },
    { value: "pied-lit", label: "Pied de lit" },
    { value: "tête-lit", label: "Tête de lit" },
    { value: "matelas", label: "Matelas" },
    { value: "lit-matelas", label: "Lit + matelas" },
    {
      value: "lit-superposé-lit-mezzanine",
      label: "Lit superposé et lit mezzanine",
    },
    { value: "lit-gigogne", label: "Lit gigogne" },
    { value: "cadre-lit", label: "Cadre de lit" },

    { value: "table-salle-manger", label: "Table de salle à manger" },
    { value: "table-extensible", label: "Table extensible" },
    { value: "table-ronde", label: "Table ronde" },
    { value: "table-haute", label: "Table haute" },
    { value: "table-appoint", label: "Table d'appoint" },
    { value: "table-basse", label: "Table basse" },
    { value: "table-chevet", label: "Table de chevet" },
    { value: "table-pliante", label: "Table pliante" },
    { value: "table-bistrot", label: "Table bistrot" },
    { value: "console", label: "Console" },
    { value: "desserte", label: "Desserte" },
    {
      value: "ensemble-table-chaises",
      label: "Ensemble table et chaises",
    },
    { value: "bureau", label: "Bureau" },
    { value: "bureau-angle", label: "Bureau d'angle" },
    { value: "secrétaire", label: "Secrétaire" },
    { value: "coiffeuse", label: "Coiffeuse" },

    {
      value: "chaise-tabouret-banc",
      label: "Chaise, tabouret et banc",
    },
    { value: "chaise", label: "Chaise" },
    { value: "chaise-pliante", label: "Chaise pliante" },
    {
      value: "chaise-tabouret-bar",
      label: "Chaise et tabouret de bar",
    },
    { value: "chaise-bureau", label: "Chaise de bureau" },
    { value: "tabouret", label: "Tabouret" },
    { value: "banc", label: "Banc" },
    { value: "pouf-repose-pied", label: "Pouf et repose pied" },

    { value: "poubelle", label: "Poubelle" },
    { value: "etendoir-linge", label: "Etendoir à linge" },
    { value: "planche-repasser", label: "Planche à repasser" },
    { value: "porte-serviette", label: "Porte-serviette" },
    { value: "marche-pied", label: "Marche-pied" },
    { value: "panière-linge", label: "Panière à linge" },
    { value: "panier-linge", label: "Panier à linge" },
    { value: "porte-manteau", label: "Porte-manteau" },
    { value: "luminaire", label: "Luminaire" },
    { value: "bain-baignoire", label: "Bain et baignoire" },
    { value: "porte", label: "Porte" },
    { value: "tapis", label: "Tapis" },
    { value: "accessoire", label: "Accessoire" },

    { value: "autre", label: "Autre" },
  ];

  const couleurOptions = [
    { value: "argent", label: "Argent", color: "#C0C0C0" },
    { value: "beige", label: "Beige", color: "#F5F5DC" },
    { value: "blanc", label: "Blanc", color: "#FFFFFF" },
    { value: "bleu", label: "Bleu", color: "#0000FF" },
    { value: "bordeaux", label: "Bordeaux", color: "#800020" },
    { value: "dore", label: "Doré", color: "#FFD700" },
    { value: "gris", label: "Gris", color: "#808080" },
    { value: "ivoire", label: "Ivoire", color: "#FFFFF0" },
    { value: "jaune", label: "Jaune", color: "#FFFF00" },
    { value: "marron", label: "Marron", color: "#8B4513" },
    { value: "noir", label: "Noir", color: "#000000" },
    { value: "orange", label: "Orange", color: "#FFA500" },
    { value: "rose", label: "Rose", color: "#FFC0CB" },
    { value: "rouge", label: "Rouge", color: "#FF0000" },
    { value: "vert", label: "Vert", color: "#008000" },
    { value: "violet", label: "Violet", color: "#EE82EE" },
    { value: "autre", label: "Autre", color: "#CCCCCC" },
  ];
  const couleurOptionsWithIcon = couleurOptions.map((opt) => ({
    ...opt,
    icon: (
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: opt.color,
          border: "1px solid #ccc",
          marginRight: "8px",
        }}
      />
    ),
  }));

  const etatameublementOptions = [
    { value: "etat-neuf", label: "État neuf" },
    { value: "tres-bon-etat", label: "Très bon état" },
    { value: "bon-etat", label: "Bon état" },
    { value: "etat-satisfaisant", label: "État satisfaisant" },
    { value: "pour-pieces", label: "Pour pièces" },
  ];

  const marqueameublementOptions = [
    { value: "alinéa", label: "Alinéa" },
    { value: "am-pm", label: "AM.PM" },
    { value: "boconcept", label: "BoConcept" },
    { value: "bobochic", label: "Bobochic" },
    { value: "but", label: "But" },
    { value: "cinna", label: "Cinna" },
    { value: "conforama", label: "Conforama" },
    { value: "gautier", label: "Gautier" },
    { value: "habitat", label: "Habitat" },
    { value: "ikea", label: "Ikea" },
    { value: "la-redoute", label: "La Redoute" },
    { value: "ligne-roset", label: "Ligne Roset" },
    { value: "maisons-du-monde", label: "Maisons du Monde" },
    { value: "miliboo", label: "Miliboo" },
    { value: "nv-gallery", label: "NV Gallery" },
    { value: "roche-bobois", label: "Roche Bobois" },
    { value: "sklum", label: "Sklum" },
    { value: "westwing", label: "Westwing" },
    { value: "autre", label: "Autre" },
  ];

  const produitfournituresscolairesOptions = [
    { value: "agenda-scolaire", label: "Agenda scolaire" },
    { value: "calculatrice", label: "Calculatrice" },
    { value: "cahiers-carnets", label: "Cahiers et carnets" },
    { value: "carnet", label: "Carnet" },
    { value: "classeurs", label: "Classeurs" },
    {
      value: "crayons-papier-crayons-couleur",
      label: "Crayons à papier et crayons de couleur",
    },
    {
      value: "effaceurs-gommes-correcteurs",
      label: "Effaceurs, gommes, correcteurs",
    },
    { value: "feuilles", label: "Feuilles" },
    {
      value: "lot-fournitures-scolaires",
      label: "Lot de fournitures scolaires",
    },
    { value: "pochettes", label: "Pochettes" },
    {
      value: "règles-compas-équerres",
      label: "Règles, compas, équerres",
    },
    { value: "stylos-feutres", label: "Stylos & feutres" },
    { value: "trousses", label: "Trousses" },
    { value: "autre", label: "Autre" },
  ];

  const marquefournituresscolairesOptions = [
    { value: "auchan", label: "Auchan" },
    { value: "bic", label: "Bic" },
    { value: "bruneau", label: "Bruneau" },
    { value: "canson", label: "Canson" },
    { value: "carrefour", label: "Carrefour" },
    { value: "casio", label: "Casio" },
    { value: "clairefontaine", label: "Clairefontaine" },
    { value: "conquérant", label: "Conquérant" },
    { value: "eastpak", label: "Eastpak" },
    { value: "elba", label: "Elba" },
    { value: "esselte", label: "Esselte" },
    { value: "exacompta", label: "Exacompta" },
    { value: "faber-castell", label: "Faber-Castell" },
    { value: "leclerc", label: "Leclerc" },
    { value: "lidl", label: "Lidl" },
    { value: "maped", label: "Maped" },
    { value: "monoprix", label: "Monoprix" },
    { value: "oxford", label: "Oxford" },
    { value: "papermate", label: "Papermate" },
    { value: "pentel", label: "Pentel" },
    { value: "pilot", label: "Pilot" },
    { value: "pritt", label: "Pritt" },
    { value: "rhodia", label: "Rhodia" },
    { value: "scotch", label: "Scotch" },
    { value: "stabilo", label: "Stabilo" },
    { value: "staedtler", label: "Staedtler" },
    { value: "texas-instruments", label: "Texas Instruments" },
    { value: "tipp-ex", label: "Tipp-Ex" },
    { value: "uhu", label: "UHU" },
    { value: "uni-ball", label: "Uni-ball" },
    { value: "autre", label: "Autre" },
  ];

  const matieretableOptions = [
  { value: "acrylique", label: "Acrylique" },
  { value: "alu", label: "Alu" },
  { value: "ardoise", label: "Ardoise" },
  { value: "argenterie", label: "Argenterie" },
  { value: "bambou", label: "Bambou" },
  { value: "bois", label: "Bois" },
  { value: "caoutchouc", label: "Caoutchouc" },
  { value: "carton", label: "Carton" },
  { value: "céramique", label: "Céramique" },
  { value: "coton", label: "Coton" },
  { value: "cristal", label: "Cristal" },
  { value: "cuivre", label: "Cuivre" },
  { value: "email", label: "Email" },
  { value: "faïence", label: "Faïence" },
  { value: "fer-forgé", label: "Fer forgé" },
  { value: "fonte", label: "Fonte" },
  { value: "grès", label: "Grès" },
  { value: "inox", label: "Inox" },
  { value: "métal", label: "Métal" },
  { value: "papier", label: "Papier" },
  { value: "pierre", label: "Pierre" },
  { value: "plastique", label: "Plastique" },
  { value: "polyester", label: "Polyester" },
  { value: "porcelaine", label: "Porcelaine" },
  { value: "pvc", label: "PVC" },
  { value: "résine", label: "Résine" },
  { value: "silicone", label: "Silicone" },
  { value: "terre-cuite", label: "Terre cuite" },
  { value: "tôle-émaillée", label: "Tôle émaillée" },
  { value: "verre", label: "Verre" },
  { value: "zinc", label: "Zinc" },
  { value: "autre", label: "Autre" },
];

  const marqueartstableOptions = [
  { value: "alessi", label: "Alessi" },
  { value: "amefa", label: "Amefa" },
  { value: "arcopal", label: "Arcopal" },
  { value: "atmosphera", label: "Atmosphera" },
  { value: "bitossi-home", label: "Bitossi Home" },
  { value: "bloomingville", label: "Bloomingville" },
  { value: "bohemia-crystal", label: "Bohemia Crystal" },
  { value: "bormioli-rocco", label: "Bormioli Rocco" },
  { value: "carrefour-home", label: "Carrefour Home" },
  { value: "casa", label: "Casa" },
  { value: "chef-sommelier", label: "Chef&Sommelier" },
  { value: "conforama", label: "Conforama" },
  { value: "couzon", label: "Couzon" },
  { value: "cristal-arques", label: "Cristal d'Arques" },
  { value: "cristal-sevres", label: "Cristal de Sèvres" },
  { value: "degrenne", label: "Degrenne" },
  { value: "emile-henry", label: "Emile Henry" },
  { value: "ercuis", label: "Ercuis" },
  { value: "guzzini", label: "Guzzini" },
  { value: "hm-home", label: "H&M Home" },
  { value: "hkliving", label: "HKliving" },
  { value: "hay", label: "Hay" },
  { value: "house-doctor", label: "House Doctor" },
  { value: "ikea", label: "Ikea" },
  { value: "jean-dubost", label: "Jean Dubost" },
  { value: "la-rochere", label: "La Rochère" },
  { value: "leonardo", label: "Leonardo" },
  { value: "le-creuset", label: "Le Creuset" },
  { value: "luminarc", label: "Luminarc" },
  { value: "maisons-du-monde", label: "Maisons du Monde" },
  { value: "mauviel-1830", label: "Mauviel 1830" },
  { value: "meissen", label: "Meissen" },
  { value: "noritake", label: "Noritake" },
  { value: "peugeot", label: "Peugeot" },
  { value: "pillivuyt", label: "Pillivuyt" },
  { value: "revol", label: "Revol" },
  { value: "riedel", label: "Riedel" },
  { value: "rosenthal", label: "Rosenthal" },
  { value: "royal-doulton", label: "Royal Doulton" },
  { value: "sabre", label: "Sabre" },
  { value: "schott-zwiesel", label: "Schott Zwiesel" },
  { value: "serax", label: "Serax" },
  { value: "spiegelau", label: "Spiegelau" },
  { value: "tati", label: "Tati" },
  {
    value: "urban-nature-culture",
    label: "Urban Nature Culture",
  },
  { value: "villeroy-boch", label: "Villeroy & Boch" },
  { value: "wmf", label: "WMF" },
  { value: "wedgwood", label: "Wedgwood" },
  { value: "zara-home", label: "Zara Home" },
  { value: "autre", label: "Autre" },
];

  const typedeelectromenagerOptions = [
    {
      value: "gros-electromenager",
      label: "Gros électroménager",
    },
    {
      value: "cuisine-cuisson",
      label: "Cuisine et cuisson",
    },
    {
      value: "entretien-maison",
      label: "Entretien de la maison",
    },
    {
      value: "beaute-soin-personne",
      label: "Beauté et soin de la personne",
    },
    {
      value: "autre",
      label: "Autre",
    },
  ];

  const typeelectromenagerOptions = [
    { value: "aspirateur", label: "Aspirateur" },
    { value: "congélateur", label: "Congélateur" },
    { value: "four", label: "Four" },
    { value: "lave-linge", label: "Lave-linge" },
    { value: "lave-vaisselle", label: "Lave-vaisselle" },
    { value: "micro-ondes", label: "Micro-ondes" },
    { value: "réfrigérateur", label: "Réfrigérateur" },
  ];

  const typeartstableOptions = [
  { value: "assiette", label: "Assiette" },
  { value: "bol", label: "Bol" },
  { value: "carafe-pichet", label: "Carafe et pichet" },
  { value: "coquetier", label: "Coquetier" },
  { value: "coupe-coupelle", label: "Coupe et coupelle" },
  { value: "couvert", label: "Couvert" },
  { value: "flûte", label: "Flûte" },
  { value: "mazagran", label: "Mazagran" },
  { value: "plat-apéritif", label: "Plat apéritif" },
  { value: "plat-service", label: "Plat de service" },
  { value: "ramequin", label: "Ramequin" },
  { value: "saladier", label: "Saladier" },
  { value: "saucière", label: "Saucière" },
  {
    value: "service-café-thé",
    label: "Service à café ou à thé",
  },
  {
    value: "service-vaisselle",
    label: "Service de vaisselle",
  },
  { value: "soucoupe", label: "Soucoupe" },
  { value: "soupière", label: "Soupière" },
  { value: "tasse-mug", label: "Tasse et mug" },
  {
    value: "théière-tisanière",
    label: "Théière, tisanière",
  },
  { value: "verre", label: "Verre" },
  { value: "verrine", label: "Verrine" },

  { value: "beurrier", label: "Beurrier" },
  { value: "corbeille", label: "Corbeille" },
  { value: "dessous-plat", label: "Dessous de plat" },
  {
    value: "huilier-vinaigrier",
    label: "Huilier et vinaigrier",
  },
  { value: "plateau", label: "Plateau" },
  { value: "rond-serviette", label: "Rond de serviette" },
  {
    value: "salière-poivrière-sucrier",
    label: "Salière, poivrière et sucrier",
  },
  { value: "seau-glaçons", label: "Seau à glaçons" },
  { value: "set-table", label: "Set de table" },
  { value: "sous-verre", label: "Sous verre" },

  {
    value: "accessoire-pâtisserie",
    label: "Accessoire de pâtisserie",
  },
  { value: "casserole", label: "Casserole" },
  { value: "cocotte", label: "Cocotte" },
  { value: "couteaux", label: "Couteaux" },
  { value: "couvercle", label: "Couvercle" },
  { value: "moule", label: "Moule" },
  {
    value: "planche-découper",
    label: "Planche à découper",
  },
  {
    value: "plat-four-tarte",
    label: "Plat à four et à tarte",
  },
  { value: "poêle", label: "Poêle" },
  { value: "terrine", label: "Terrine" },
  { value: "tire-bouchon", label: "Tire-bouchon" },
  {
    value: "ustensile-cuisine",
    label: "Ustensile de cuisine",
  },

  { value: "bocaux-pots", label: "Bocaux et pots" },
  { value: "bonbonnière", label: "Bonbonnière" },
  {
    value: "boîte-conservation-boîte-métal",
    label: "Boîte de conservation et boîte en métal",
  },

  { value: "coffret", label: "Coffret" },
  { value: "gourde", label: "Gourde" },
  { value: "shaker", label: "Shaker" },

  { value: "autre", label: "Autre" },
];


const typedecorationOptions = [
  { value: "abat-jour", label: "Abat-jour" },
  { value: "applique", label: "Applique" },
  { value: "bougeoir-photophore", label: "Bougeoir et photophore" },
  { value: "guirlande", label: "Guirlande" },
  { value: "lampadaire", label: "Lampadaire" },
  { value: "lampe-a-poser", label: "Lampe à poser" },
  { value: "lampe-sur-pied", label: "Lampe sur pied" },
  { value: "lustre", label: "Lustre" },
  { value: "suspension", label: "Suspension" },

  { value: "coussin", label: "Coussin" },
  { value: "rideaux-voilage-store", label: "Rideaux, voilage et store" },
  { value: "tapis", label: "Tapis" },

  { value: "rangement", label: "Rangement" },
  { value: "accessoire-salle-de-bain", label: "Accessoire de salle de bain" },
  { value: "cendrier-vide-poche", label: "Cendrier et vide-poche" },
  { value: "panier-boite", label: "Panier, boîte" },

  { value: "cadre-photo", label: "Cadre photo" },
  { value: "miroir", label: "Miroir" },
  { value: "pele-mele-photo", label: "Pêle-mêle photo" },
  { value: "poster", label: "Poster" },
  { value: "tableau-toile", label: "Tableau et toile" },

  { value: "bibelot", label: "Bibelot" },
  { value: "bouquet-plante-artificielle", label: "Bouquet et plante artificielle" },
  { value: "dame-jeanne-bonbonne", label: "Dame-jeanne et bonbonne" },
  { value: "horloge-pendule-reveil", label: "Horloge, pendule et réveil" },
  { value: "paravent", label: "Paravent" },
  { value: "sculpture-statue", label: "Sculpture et statue" },
  { value: "vase-cache-pot-ceramique", label: "Vase, cache pot et céramique" },

  { value: "autre", label: "Autre" },
];


const matieredecorationOptions = [
  { value: "acier", label: "Acier" },
  { value: "bois", label: "Bois" },
  { value: "bois-massif", label: "Bois massif" },
  { value: "bronze", label: "Bronze" },
  { value: "ceramique", label: "Céramique" },
  { value: "chene", label: "Chêne" },
  { value: "cuir", label: "Cuir" },
  { value: "fer", label: "Fer" },
  { value: "formica", label: "Formica" },
  { value: "laque", label: "Laqué" },
  { value: "marbre", label: "Marbre" },
  { value: "metal", label: "Métal" },
  { value: "pierre", label: "Pierre" },
  { value: "pin", label: "Pin" },
  { value: "plastique", label: "Plastique" },
  { value: "rotin-osier", label: "Rotin et osier" },
  { value: "tissu", label: "Tissu" },
  { value: "velours", label: "Velours" },
  { value: "verre", label: "Verre" },
  { value: "autre", label: "Autre" },
];

const styledecorationOptions = [
  { value: "scandinave", label: "Scandinave" },
  { value: "industriel", label: "Industriel" },
  { value: "boheme-ethnique", label: "Bohème / ethnique" },
  { value: "vintage-retro", label: "Vintage / rétro" },
  { value: "art-deco", label: "Art déco" },
  { value: "moderne-contemporain", label: "Moderne / contemporain" },
  { value: "rustique", label: "Rustique" },
  { value: "minimaliste", label: "Minimaliste" },
  { value: "exotique", label: "Exotique" },
  { value: "autre", label: "Autre" },
];

const typelingeOptions = [
  { value: "equipement-lit", label: "Équipement du lit" },
  { value: "deco-textile", label: "Déco textile" },
  { value: "linge-bain", label: "Linge de bain" },
  { value: "linge-lit", label: "Linge de lit" },
  { value: "linge-table", label: "Linge de table" },
  { value: "autre", label: "Autre" },
];
  // ===================== DYNAMIC TAILLE OPTIONS =====================

  const handleSortChange = (name: string, value: string) => {
    setFilter(name, value);
  };

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
      {!excludedFilterNames.includes("typelinge") && (
  <CaracteristiquesFilter
    title="Type"
    icon={<TfiAlarmClock className="text-sm" />}
    name="typelinge"
    options={typelingeOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

      {!excludedFilterNames.includes("typedecoration") && (
  <CaracteristiquesFilter
    title="Type de décoration"
    icon={<TfiAlarmClock className="text-sm" />}
    name="typedecoration"
    options={typedecorationOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

      {!excludedFilterNames.includes("matieredecoration") && (
  <CaracteristiquesFilter
    title="Matière"
    icon={<TfiAlarmClock className="text-sm" />}
    name="matieredecoration"
    options={matieredecorationOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}


{!excludedFilterNames.includes("typeartstable") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="typeartstable"
    options={typeartstableOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{!excludedFilterNames.includes("styledecoration") && (
  <CaracteristiquesFilter
    title="Style"
    icon={<TfiAlarmClock className="text-sm" />}
    name="styledecoration"
    options={styledecorationOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}


{!excludedFilterNames.includes("marqueartstable") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="marqueartstable"
    options={marqueartstableOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{!excludedFilterNames.includes("matieretable") && (
  <CaracteristiquesFilter
    title="Matière"
    icon={<TfiAlarmClock className="text-sm" />}
    name="matieretable"
    options={matieretableOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}
      {/* Type ameublement */}
      {!excludedFilterNames.includes("typeameublement") && (
        <CaracteristiquesFilter
          title="Produit"
          icon={<TfiAlarmClock className="text-sm" />}
          name="typeameublement"
          options={typeameublementOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {/* Matire ameublement */}
      {!excludedFilterNames.includes("matiereameublement") && (
        <CaracteristiquesFilter
          title="Matière"
          icon={<TfiAlarmClock className="text-sm" />}
          name="matiereameublement"
          options={matiereameublementOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {!excludedFilterNames.includes("couleur") && (
        <CaracteristiquesFilter
          title="Couleur"
          name="couleur"
          icon={<PiGasPump />}
          options={couleurOptionsWithIcon}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {/*  /* Marque ameublement */}
      {!excludedFilterNames.includes("marqueameublement") && (
        <CaracteristiquesFilter
          title="Marque"
          icon={<TfiAlarmClock className="text-sm" />}
          name="marqueameublement"
          options={marqueameublementOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Produit fournitures scolaires */}
      {!excludedFilterNames.includes("produitfournituresscolaires") && (
        <CaracteristiquesFilter
          title="Produit"
          icon={<TfiAlarmClock className="text-sm" />}
          name="produitfournituresscolaires"
          options={produitfournituresscolairesOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Marque fournitures scolaires */}
      {!excludedFilterNames.includes("marquefournituresscolaires") && (
        <CaracteristiquesFilter
          title="Marque"
          icon={<TfiAlarmClock className="text-sm" />}
          name="marquefournituresscolaires"
          options={marquefournituresscolairesOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {!excludedFilterNames.includes("typedeelectromenager") && (
        <CheckboxGroupCarre
          title="Type"
          icon={<TfiAlarmClock className="text-sm" />}
          name="typedeelectromenager"
          options={typedeelectromenagerOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {!excludedFilterNames.includes("typeelectromenager") && (
        <CaracteristiquesFilter
          title="Produit"
          icon={<TfiAlarmClock className="text-sm" />}
          name="typeelectromenager"
          options={typeelectromenagerOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      
      {/* État ameublement papeterie aussi */}
      {!excludedFilterNames.includes("etatameublement") && (
        <CheckboxGroupCarre
          title="État"
          icon={<TfiAlarmClock className="text-sm" />}
          name="etatameublement"
          options={etatameublementOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Statut de l'annonce */}
      {!excludedFilterNames.includes("statutannonce") && (
        <CheckboxGroupCarre
          title="Statut de l'annonce"
          icon={<TfiAlarmClock className="text-sm" />}
          name="statutannonce"
          options={statutAnnonceOptions}
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
      {/* Type d'annonces */}
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
      {/* Annonces urgentes */}
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
