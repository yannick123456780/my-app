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

export default function FamilleFilters({
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

  const familleproduitOptions = [
    { value: "babyphone", label: "Babyphone" },
    { value: "bavoir", label: "Bavoir" },
    { value: "biberon", label: "Biberon" },
    { value: "chauffe-biberon", label: "Chauffe-biberon" },
    { value: "coussin-allaitement", label: "Coussin d'allaitement" },
    { value: "gigoteuse", label: "Gigoteuse" },
    { value: "humidificateur", label: "Humidificateur" },
    { value: "nid-ange", label: "Nid d'ange" },
    {
      value: "porte-bebe-echarpe-portage",
      label: "Porte-bébé & écharpe de portage",
    },
    { value: "poussette", label: "Poussette" },
    { value: "pot-siege-reducteur", label: "Pot & siège réducteur" },
    { value: "rehausseur", label: "Rehausseur" },
    { value: "robot-cuisine-bebe", label: "Robot de cuisine bébé" },
    { value: "sac-langer", label: "Sac à langer" },
    { value: "securite-exterieur", label: "Sécurité extérieur" },
    { value: "siege-auto", label: "Siège auto" },
    { value: "sterilisateur", label: "Stérilisateur" },
    { value: "sucette", label: "Sucette" },
    { value: "tetine", label: "Tétine" },
    { value: "thermometre", label: "Thermomètre" },
    { value: "tire-lait", label: "Tire-lait" },
    { value: "vaisselle", label: "Vaisselle" },
    { value: "autre", label: "Autre" },
  ];


  const famillemarqueOptions = [
  { value: "4moms", label: "4Moms" },
  { value: "abc-design", label: "ABC Design" },
  { value: "aden-by-aden-anais", label: "Aden by Aden+Anais" },
  { value: "allobebe", label: "Allobébé" },
  { value: "amadeus", label: "Amadeus" },
  { value: "angelcare", label: "Angelcare" },
  { value: "at4", label: "AT4" },
  { value: "avova", label: "Avova" },
  { value: "axkid", label: "Axkid" },
  { value: "babybjorn", label: "BabyBjörn" },
  { value: "baby-brezza", label: "Baby Brezza" },
  { value: "babycalin", label: "Babycalin" },
  { value: "babycare", label: "Babycare" },
  { value: "babydam", label: "BabyDam" },
  { value: "babyjogger", label: "Babyjogger" },
  { value: "babylonia", label: "Babylonia" },
  { value: "babymel", label: "Babymel" },
  { value: "baby-monsters", label: "Baby monsters" },
  { value: "babymoov", label: "Babymoov" },
  { value: "baby-on-board", label: "Baby on board" },
  { value: "babysun", label: "Babysun" },
  { value: "babytolove", label: "Babytolove" },
  { value: "babyzen", label: "Babyzen" },
  { value: "badabulle", label: "Badabulle" },
  { value: "bb-co", label: "BB&Co" },
  { value: "beaba", label: "Béaba" },
  { value: "bebe-compagnie", label: "Bébé & Compagnie" },
  { value: "bebe-confort", label: "Bébé Confort" },
  { value: "bebegavroche", label: "Bébégavroche" },
  { value: "bebe-lune", label: "Bébé Lune" },
  { value: "bemini", label: "Bemini" },
  { value: "benbat", label: "Benbat" },
  { value: "besafe", label: "Besafe" },
  { value: "biberon-francais", label: "Le biberon français" },
  { value: "bibs", label: "Bibs" },
  { value: "bkids", label: "Bkids" },
  { value: "bo-jungle", label: "Bo jungle" },
  { value: "boon", label: "Boon" },
  { value: "bosskids", label: "BossKids" },
  { value: "braun", label: "Braun" },
  { value: "britax-romer", label: "Britax Römer" },
  { value: "bugaboo", label: "Bugaboo" },
  { value: "bultex", label: "Bultex" },
  { value: "cam", label: "Cam" },
  { value: "candide", label: "Candide" },
  { value: "casualplay", label: "Casualplay" },
  { value: "cbx", label: "CBX" },
  { value: "charlie-crane", label: "Charlie Crane" },
  { value: "chicco", label: "Chicco" },
  { value: "childhome", label: "Childhome" },
  { value: "citron", label: "Citron" },
  { value: "cloud-b", label: "Cloud b" },
  { value: "cocoeko", label: "Cocoeko" },
  { value: "combelle", label: "Combelle" },
  { value: "concord", label: "Concord" },
  { value: "contours", label: "Contours" },
  { value: "cosatto", label: "Cosatto" },
  { value: "cybex", label: "Cybex" },
  { value: "cyrillus", label: "Cyrillus" },
  { value: "dbb-remond", label: "DBB Remond" },
  { value: "difrax", label: "Difrax" },
  { value: "diono", label: "Diono" },
  { value: "disney", label: "Disney" },
  { value: "dodie", label: "Dodie" },
  { value: "domiva", label: "Domiva" },
  { value: "done-by-deer", label: "Done by deer" },
  { value: "dooky", label: "Dooky" },
  { value: "doux-nid", label: "Doux nid" },
  { value: "dreambaby", label: "Dreambaby" },
  { value: "easywalker", label: "Easywalker" },
  { value: "ecus-kids", label: "Ecus Kids" },
  { value: "elodie-details", label: "Elodie Details" },
  { value: "emporio-armani", label: "Emporio Armani" },
  { value: "ergobaby", label: "Ergobaby" },
  { value: "ezpz", label: "EZPZ" },
  { value: "filibabba", label: "Filibabba" },
  { value: "formula-baby", label: "Formula baby" },
  { value: "freds-swim-academy", label: "Freds Swim Academy" },
  { value: "galipette", label: "Galipette" },
  { value: "gb", label: "GB" },
  { value: "geuther", label: "Geuther" },
  { value: "globber", label: "Globber" },
  { value: "gloop", label: "Gloop" },
  { value: "good-baby", label: "Good Baby" },
  { value: "graco", label: "Graco" },
  { value: "halo", label: "Halo" },
  { value: "hauck", label: "Hauck" },
  { value: "herschel", label: "Herschel" },
  { value: "homestyle4u", label: "HomeStyle4U" },
  { value: "infantino", label: "Infantino" },
  { value: "inglesina", label: "Inglesina" },
  { value: "jane", label: "Jane" },
  { value: "joie", label: "Joie" },
  { value: "kadolis", label: "Kadolis" },
  { value: "kaiser", label: "Kaiser" },
  { value: "kave-home", label: "Kave Home" },
  { value: "kidsleep", label: "Kid'sleep" },
  { value: "kidsme", label: "Kidsme" },
  { value: "kinderkraft", label: "KinderKraft" },
  { value: "la-redoute-interieur", label: "La Redoute Intérieur" },
  { value: "lascal", label: "Lascal" },
  { value: "lassig", label: "Lässig" },
  { value: "latch-munchkin", label: "Latch Munchkin" },
  { value: "lbs-medical", label: "LBS médical" },
  { value: "les-chatounets", label: "Les Chatounets" },
  { value: "lilikim", label: "Lilikim" },
  { value: "lilou-miaka", label: "Lilou Miaka" },
  { value: "lindam", label: "Lindam" },
  { value: "little-band", label: "Little Band" },
  { value: "little-dutch", label: "Little Dutch" },
  { value: "little-lights", label: "Little Lights" },
  { value: "love-radius", label: "Love Radius" },
  { value: "luc-et-lea", label: "Luc et Léa" },
  { value: "luma", label: "Luma" },
  { value: "lux4kids", label: "Lux4Kids" },
  { value: "maclaren", label: "Maclaren" },
  { value: "maika", label: "Maïka" },
  { value: "maison-nougatine", label: "Maison Nougatine" },
  { value: "maltex", label: "Maltex" },
  { value: "mam", label: "Mam" },
  { value: "manduca", label: "Manduca" },
  { value: "mastrad-baby", label: "Mastrad Baby" },
  { value: "maxi-cosi", label: "Maxi Cosi" },
  { value: "mifold", label: "Mifold" },
  { value: "migo", label: "Migo" },
  { value: "milk-sense", label: "Milk Sense" },
  { value: "mima", label: "Mima" },
  { value: "misioo", label: "Misioo" },
  { value: "modulit", label: "Modulit" },
  { value: "monsieur-bebe", label: "Monsieur bébé" },
  { value: "morphee", label: "Morphée" },
  { value: "motorolla", label: "Motorolla" },
  { value: "moulin-roty", label: "Moulin Roty" },
  { value: "mountain-buggy", label: "Mountain Buggy" },
  { value: "mr-maria", label: "Mr Maria" },
  { value: "mushie", label: "mushie" },
  { value: "mutsy", label: "Mutsy" },
  { value: "nado-migo", label: "Nado & Migo" },
  { value: "nania", label: "Nania" },
  { value: "nathalys", label: "Nathalys" },
  { value: "nattou", label: "Nattou" },
  { value: "neobulle", label: "Néobulle" },
  { value: "nidalys", label: "Nidalys" },
  { value: "nobodinoz", label: "Nobodinoz" },
  { value: "noukies", label: "Noukies" },
  { value: "nuk", label: "Nuk" },
  { value: "nuna", label: "Nuna" },
  { value: "okbaby", label: "Okbaby" },
  { value: "owlet", label: "Owlet" },
  { value: "pabobo", label: "Pabobo" },
  { value: "papa-maman-moi", label: "Papa, maman & moi" },
  { value: "peg-perego", label: "Peg perego" },
  { value: "pericles", label: "Périclès" },
  { value: "philips-avent", label: "Philips Avent" },
  { value: "phil-teds", label: "Phil & teds" },
  { value: "piou-piou-merveilles", label: "Piou Piou et Merveilles" },
  { value: "playshoes", label: "Playshoes" },
  { value: "premaman", label: "Prémaman" },
  { value: "ptit-lit", label: "P'tit lit" },
  { value: "qplay", label: "QPlay" },
  { value: "qtus", label: "Qtus" },
  { value: "quax", label: "Quax" },
  { value: "quinny", label: "Quinny" },
  { value: "recaro", label: "Recaro" },
  { value: "red-castle", label: "Red Castle" },
  { value: "renolux", label: "Renolux" },
  { value: "rive-droite", label: "Rive Droite" },
  { value: "safety-1st", label: "Safety 1st" },
  { value: "safety-baby", label: "Safety Baby" },
  { value: "sangenic", label: "Sangenic" },
  { value: "sauthon", label: "Sauthon" },
  { value: "schardt", label: "Schardt" },
  { value: "scoot-and-ride", label: "Scoot and Ride" },
  { value: "stokke", label: "Stokke" },
  { value: "storksak", label: "Storksak" },
  { value: "suavinex", label: "Suavinex" },
  { value: "supaflat", label: "SUPAflat" },
  { value: "tatou", label: "Tatou" },
  { value: "the-gro-company", label: "The Gro company" },
  { value: "theo-bebe", label: "Théo bébé" },
  { value: "theraline", label: "Theraline" },
  { value: "thermobaby", label: "Thermobaby" },
  { value: "tigex", label: "Tigex" },
  { value: "tineo", label: "Tinéo" },
  { value: "tiny-love", label: "Tiny love" },
  { value: "tommee-tippee", label: "Tommee Tippee" },
  { value: "top-beds", label: "Top beds" },
  { value: "trois-kilos-sept", label: "Trois Kilos Sept" },
  { value: "trousselier", label: "Trousselier" },
  { value: "twistshake", label: "Twistshake" },
  { value: "uppababy", label: "UPPAbaby" },
  { value: "vipack", label: "Vipack" },
  { value: "visiomed-baby", label: "Visiomed baby" },
  { value: "vox", label: "Vox" },
  { value: "vtech", label: "Vtech" },
  { value: "william-kent-1733", label: "William Kent 1733" },
  { value: "wookids", label: "Wookids" },
  { value: "autre", label: "Autre" },
];

 const familleetatOptions = [
  { value: "neuf-avec-etiquette", label: "Neuf avec étiquette" },
  { value: "neuf-sans-etiquette", label: "Neuf sans étiquette" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
];

 const mobilierenfantproduitOptions = [
  { value: "baignoire", label: "Baignoire" },
  { value: "barriere-securite", label: "Barrière de sécurité" },
  { value: "berceau", label: "Berceau" },
  { value: "chaise-haute", label: "Chaise haute" },
  { value: "chanceliere", label: "Chancelière" },
  { value: "couffin", label: "Couffin" },
  { value: "lit-bebe", label: "Lit bébé" },
  { value: "lit-parapluie", label: "Lit parapluie" },
  {
    value: "matelas-matelas-langer",
    label: "Matelas & matelas à langer",
  },
  { value: "nacelle", label: "Nacelle" },
  { value: "parc", label: "Parc" },
  { value: "poubelle-couches", label: "Poubelle à couches" },
  { value: "securite-domestique", label: "Sécurité domestique" },
  { value: "table-langer", label: "Table à langer" },
  { value: "tapis-eveil", label: "Tapis d'éveil" },
  { value: "transat-balancelle", label: "Transat & balancelle" },
  { value: "trotteur", label: "Trotteur" },
  { value: "veilleuse", label: "Veilleuse" },
  { value: "autre", label: "Autre" },
];

const vetementsbebetailleOptions = [
  { value: "premature-44cm", label: "Prématuré / 44 cm" },
  { value: "0-mois-50cm", label: "0 mois / 50 cm" },
  { value: "1-mois-56cm", label: "1 mois / 56 cm" },
  { value: "3-mois-62cm", label: "3 mois / 62 cm" },
  { value: "6-mois-68cm", label: "6 mois / 68 cm" },
  { value: "9-mois-74cm", label: "9 mois / 74 cm" },
  { value: "12-mois-80cm", label: "12 mois / 80 cm" },
  { value: "18-mois-86cm", label: "18 mois / 86 cm" },
  { value: "24-mois-92cm", label: "24 mois / 92 cm" },
  { value: "36-mois-98cm", label: "36 mois / 98 cm" },
];

const mobilierenfantetatOptions = [
  { value: "tres-bon-etat", label: "Très bon état" },
  { value: "etat-neuf", label: "État neuf" },
  { value: "reconditionne", label: "Reconditionné" },
  { value: "bon-etat", label: "Bon état" },
  { value: "etat-satisfaisant", label: "État satisfaisant" },
  { value: "pour-pieces", label: "Pour pièces" },
];


 const typevetementbebeOptions = [
  { value: "bodies", label: "Bodies" },
  { value: "t-shirt-brassieres", label: "T-shirt & brassières" },
  { value: "bermudas-shorts", label: "Bermudas & Shorts" },
  { value: "pantalons", label: "Pantalons" },
  { value: "jeans", label: "Jeans" },
  { value: "dors-bien-pyjamas", label: "Dors-bien & Pyjamas" },
  { value: "pull-gilets", label: "Pull & Gilets" },
  { value: "robes-jupes", label: "Robes & Jupes" },
  { value: "manteaux-vestes", label: "Manteaux & Vestes" },
  { value: "legging-collants", label: "Legging & collants" },
  { value: "deguisements", label: "Déguisements" },
  {
    value: "ensembles-combinaisons",
    label: "Ensembles & Combinaisons",
  },
  { value: "bonnets-chapeaux", label: "Bonnets & Chapeaux" },
  { value: "maillots-bain", label: "Maillots de bain" },
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
      {/* Type de vêtement bébé */}
{!excludedFilterNames.includes("typevetementbebe") && (
  <CaracteristiquesFilter
    title="Type de vêtement"
    icon={<TfiAlarmClock className="text-sm" />}
    name="typevetementbebe"
    options={typevetementbebeOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* Taille vêtements bébé */}
{!excludedFilterNames.includes("vetementsbebetaille") && (
  <CaracteristiquesFilter
    title="Taille"
    icon={<TfiAlarmClock className="text-sm" />}
    name="vetementsbebetaille"
    options={vetementsbebetailleOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

      {/* Produit mobilier enfant */}
{!excludedFilterNames.includes("mobilierenfantproduit") && (
  <CaracteristiquesFilter
    title="Produit"
    icon={<TfiAlarmClock className="text-sm" />}
    name="mobilierenfantproduit"
    options={mobilierenfantproduitOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

{/* État mobilier enfant */}
{!excludedFilterNames.includes("mobilierenfantetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="mobilierenfantetat"
    options={mobilierenfantetatOptions}
    isValueSelected={isValueSelected}
    handleCheckboxChange={handleCheckboxChange}
  />
)}

      {!excludedFilterNames.includes("familleproduit") && (
        <CaracteristiquesFilter
          title="Produit"
          icon={<TfiAlarmClock className="text-sm" />}
          name="familleproduit"
          options={familleproduitOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {!excludedFilterNames.includes("famillemarque") && (
  <CaracteristiquesFilter
    title="Marque"
    icon={<TfiAlarmClock className="text-sm" />}
    name="famillemarque"
    options={famillemarqueOptions}
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

{/* État famille */}
{!excludedFilterNames.includes("familleetat") && (
  <CheckboxGroupCarre
    title="État"
    icon={<TfiAlarmClock className="text-sm" />}
    name="familleetat"
    options={familleetatOptions}
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
