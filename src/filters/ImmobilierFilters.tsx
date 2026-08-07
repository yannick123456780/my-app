import {
  RangeFilter,
  CheckboxGroupCarre,
  PiecesRangeSelector,
  RadioCheckboxGroup,
  CaracteristiquesFilter,
} from "./BaseFilters";
import { LuSearchCheck } from "react-icons/lu";
import { TbSmartHomeOff } from "react-icons/tb";
import { TbHomeQuestion } from "react-icons/tb";
import { MdOutlineDeck } from "react-icons/md";
import { AiOutlineEuro } from "react-icons/ai";
import { RxAspectRatio } from "react-icons/rx";
import { MdGridView } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import { TfiAlarmClock } from "react-icons/tfi";
import { TbUserScreen } from "react-icons/tb";
import { FcDocument } from "react-icons/fc";
import { MdSettingsInputComposite } from "react-icons/md";

import {
  PiElevator,
  PiBuildingsLight,
} from "react-icons/pi";
import { PiSortAscending } from "react-icons/pi";
import { GiLaddersPlatform } from "react-icons/gi";
import { useEffect } from "react";

interface Props {
  draft: any;
  setFilter: (name: string, value: string) => void;
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  availableFilters?: any[];
  excludedFilterNames?: string[];
  currentCategory?: string;
  currentSubcategory?: string; // ← AJOUT
}

// Déplacez la map AVANT le composant (en haut du fichier, après les imports)
const caracteristiquesOptionsMap: Record<
  string,
  Record<string, { value: string; label: string; icon?: React.ReactNode }[]>
> = {
  immobilier: {
    "ventes-immobilieres": [
      { value: "places-de-parking", label: "Place(s) de parking" },
      { value: "cuisine-equipee", label: "Cuisine équipée" },
      { value: "cuisine-ouverte", label: "Cuisine ouverte" },
      { value: "baignoire", label: "Baignoire" },
      { value: "plusieurs-toilettes", label: "Plusieurs toilettes" },
      { value: "acces-pmr", label: "Accès PMR" },
      { value: "sous-sol", label: "Sous-sol" },
      { value: "cave", label: "Cave" },
      { value: "grenier", label: "Grenier" },
      { value: "actuellement-loue", label: "Actuellement loué" },
    ],
    locations: [
      { value: "places-de-parking", label: "Place(s) de parking" },
      { value: "cuisine-equipee", label: "Cuisine équipée" },
      { value: "cuisine-ouverte", label: "Cuisine ouverte" },
      { value: "baignoire", label: "Baignoire" },
      { value: "plusieurs-toilettes", label: "Plusieurs toilettes" },
      { value: "acces-pmr", label: "Accès PMR" },
      { value: "sous-sol", label: "Sous-sol" },
      { value: "cave", label: "Cave" },
      { value: "grenier", label: "Grenier" },
      {
        value: "certificat-de-logement-social",
        label: "Certificat de logement social",
      },
      { value: "eligible-a-la-colocation", label: "Éligible à la colocation" },
      { value: "animaux-autorises", label: "Animaux autorisés" },
    ],
    colocations: [
      { value: "places-de-parking", label: "Place(s) de parking" },
      { value: "cuisine-equipee", label: "Cuisine équipée" },
      { value: "cuisine-ouverte", label: "Cuisine ouverte" },
      { value: "baignoire", label: "Baignoire" },
      { value: "plusieurs-toilettes", label: "Plusieurs toilettes" },
      { value: "acces-pmr", label: "Accès PMR" },
      { value: "sous-sol", label: "Sous-sol" },
      { value: "cave", label: "Cave" },
      { value: "grenier", label: "Grenier" },
      {
        value: "certificat-de-logement-social",
        label: "Certificat de logement social",
      },
      { value: "eligible-a-la-colocation", label: "Éligible à la colocation" },
      { value: "animaux-autorises", label: "Animaux autorisés" },
    ],
    "bureaux-commerces": [
      { value: "cuisine", label: "Cuisine" },
      { value: "courant-haute-tension", label: "Courant haute tension" },
      { value: "climatisation", label: "Climatisation" },
      { value: "cablage-structure", label: "Câblage structuré" },
    ],
  },
};

export default function ImmobilierFilters({
  draft,
  setFilter,
  isValueSelected,
  handleCheckboxChange,
  availableFilters = [],
  excludedFilterNames = [],
  currentCategory, // ← Ajoutez cette ligne
  currentSubcategory, // ← AJOUT
}: Props) {
  // Détecter les types de bien sélectionnés
  const isParkingSelected = isValueSelected("typebien", "parking");
  const isTerrainSelected = isValueSelected("typebien", "terrain");
  const isGarageSelected = isValueSelected("typebien", "garage");
  const isBoxSelected = isValueSelected("typebien", "box");
  const isMaisonSelected = isValueSelected("typebien", "maison");
  const isAppartementSelected = isValueSelected("typebien", "appartement");
  const isChambreSelected = isValueSelected("typebien", "chambre");
  const isStudioSelected = isValueSelected("typebien", "studio");

  // Liste des types de bien qui n'ont pas de pièces
  const typesWithoutRooms = ["parking", "terrain", "garage", "box"];

  // Types qui n'ont pas d'étage (maisons, terrains, parkings, etc.)
  const typesWithoutFloor = ["maison", "terrain", "parking", "garage", "box"];

  // Types qui n'ont pas d'ascenseur (maisons, terrains, etc.)
  const typesWithoutElevator = [
    "maison",
    "terrain",
    "parking",
    "garage",
    "box",
  ];

  // Types qui n'ont pas d'extérieur spécifique (parking, garage, box)
  const typesWithoutExterior = [
    "parking",
    "garage",
    "box",
    "chambre",
    "studio",
  ];

  // Types qui n'ont pas de terrain (appartement, studio, chambre, parking, garage, box)
  const typesWithoutLand = [
    "appartement",
    "studio",
    "chambre",
    "parking",
    "garage",
    "box",
  ];

  // Vérifier si un type sans pièces est sélectionné
  const hasTypeWithoutRooms = typesWithoutRooms.some((type) =>
    isValueSelected("typebien", type),
  );

  // Vérifier si un type sans étage est sélectionné
  const hasTypeWithoutFloor = typesWithoutFloor.some((type) =>
    isValueSelected("typebien", type),
  );

  // Vérifier si un type sans ascenseur est sélectionné
  const hasTypeWithoutElevator = typesWithoutElevator.some((type) =>
    isValueSelected("typebien", type),
  );

  // Vérifier si un type sans extérieur est sélectionné
  const hasTypeWithoutExterior = typesWithoutExterior.some((type) =>
    isValueSelected("typebien", type),
  );

  // Vérifier si un type sans terrain est sélectionné
  const hasTypeWithoutLand = typesWithoutLand.some((type) =>
    isValueSelected("typebien", type),
  );

  // Effets pour réinitialiser les filtres incompatibles
  useEffect(() => {
    if (hasTypeWithoutRooms) {
      // Réinitialiser les filtres de pièces
      if (draft.roomsMin || draft.roomsMax) {
        setFilter("roomsMin", "");
        setFilter("roomsMax", "");
      }
      if (draft.chambresMin || draft.chambresMax) {
        setFilter("chambresMin", "");
        setFilter("chambresMax", "");
      }
    }
  }, [
    draft.chambresMax,
    draft.chambresMin,
    draft.roomsMax,
    draft.roomsMin,
    hasTypeWithoutRooms,
    setFilter,
  ]);

  useEffect(() => {
    if (hasTypeWithoutFloor) {
      // Réinitialiser les sélections d'étage
      if (draft.filters?.etageappartement) {
        const etageValues = draft.filters.etageappartement.split(",");
        etageValues.forEach((value: string) => {
          handleCheckboxChange("etageappartement", value, false);
        });
      }
    }
  }, [
    draft.filters.etageappartement,
    handleCheckboxChange,
    hasTypeWithoutFloor,
  ]);

  useEffect(() => {
    if (hasTypeWithoutElevator) {
      // Réinitialiser les sélections d'ascenseur
      if (draft.filters?.avecascenseur) {
        handleCheckboxChange("avecascenseur", "true", false);
      }
    }
  }, [
    draft.filters?.avecascenseur,
    handleCheckboxChange,
    hasTypeWithoutElevator,
  ]);

  useEffect(() => {
    if (hasTypeWithoutExterior) {
      // Réinitialiser les sélections d'extérieur
      if (draft.filters?.exterieur) {
        const exterieurValues = draft.filters.exterieur.split(",");
        exterieurValues.forEach((value: string) => {
          handleCheckboxChange("exterieur", value, false);
        });
      }
    }
  }, [draft.filters.exterieur, handleCheckboxChange, hasTypeWithoutExterior]);

  useEffect(() => {
    if (hasTypeWithoutLand) {
      // Réinitialiser les filtres de surface terrain
      if (draft.surfaceterrainMin || draft.surfaceterrainMax) {
        setFilter("surfaceterrainMin", "");
        setFilter("surfaceterrainMax", "");
      }
    }
  }, [
    draft.surfaceterrainMax,
    draft.surfaceterrainMin,
    hasTypeWithoutLand,
    setFilter,
  ]);

  useEffect(() => {
    if (isParkingSelected || isGarageSelected || isBoxSelected) {
      // Réinitialiser l'état du bien pour parking, garage, box
      if (draft.filters?.etatdubien) {
        const etatValues = draft.filters.etatdubien.split(",");
        etatValues.forEach((value: string) => {
          handleCheckboxChange("etatdubien", value, false);
        });
      }
    }
  }, [
    isParkingSelected,
    isGarageSelected,
    isBoxSelected,
    draft.filters.etatdubien,
    handleCheckboxChange,
  ]);

  // Fonction pour vérifier si un filtre doit être désactivé
  const isFilterDisabled = (filterName: string): boolean => {
    // Filtres désactivés pour parking, garage, box
    if (isParkingSelected || isGarageSelected || isBoxSelected) {
      const disabledForParkingLike = [
        "rooms",
        "chambres",
        "surface",
        "surfaceterrain",
        "etageappartement",
        "avecascenseur",
        "exterieur",
        "etatdubien",
      ];
      if (disabledForParkingLike.includes(filterName)) return true;
    }

    // Filtres désactivés pour terrain
    if (isTerrainSelected) {
      const disabledForTerrain = [
        "rooms",
        "chambres",
        "etageappartement",
        "avecascenseur",
        "exterieur",
        "surface",
      ];
      if (disabledForTerrain.includes(filterName)) return true;
    }

    // Filtres désactivés pour maison
    if (isMaisonSelected) {
      const disabledForMaison = ["etageappartement", "avecascenseur"];
      if (disabledForMaison.includes(filterName)) return true;
    }

    // Filtres désactivés pour chambre
    if (isChambreSelected) {
      const disabledForChambre = [
        "rooms",
        "surfaceterrain",
        "exterieur",
        "etageappartement",
        "avecascenseur",
      ];
      if (disabledForChambre.includes(filterName)) return true;
    }

    // Filtres désactivés pour studio
    if (isStudioSelected) {
      const disabledForStudio = [
        "rooms",
        "chambres",
        "surfaceterrain",
        "exterieur",
        "etageappartement",
        "avecascenseur",
      ];
      if (disabledForStudio.includes(filterName)) return true;
    }

    // Filtres désactivés pour tout type sans pièces
    if (hasTypeWithoutRooms) {
      const disabledForNoRooms = ["rooms", "chambres"];
      if (disabledForNoRooms.includes(filterName)) return true;
    }

    // Filtres désactivés pour tout type sans étage
    if (hasTypeWithoutFloor) {
      if (filterName === "etageappartement") return true;
    }

    // Filtres désactivés pour tout type sans ascenseur
    if (hasTypeWithoutElevator) {
      if (filterName === "avecascenseur") return true;
    }

    // Filtres désactivés pour tout type sans extérieur
    if (hasTypeWithoutExterior) {
      if (filterName === "exterieur") return true;
    }

    // Filtres désactivés pour tout type sans terrain
    if (hasTypeWithoutLand) {
      if (filterName === "surfaceterrain") return true;
    }

    return false;
  };

  // Style pour filtre désactivé
  const getFilterClassName = (
    filterName: string,
    baseClassName: string = "",
  ) => {
    return `${baseClassName} ${isFilterDisabled(filterName) ? "opacity-50 pointer-events-none" : ""}`;
  };

  // Options pour l'extérieur
  const exterieurOptions = [
    { value: "balcon", label: "Balcon" },
    { value: "terrasse", label: "Terrasse" },
    { value: "jardin", label: "Jardin" },
    { value: "piscine", label: "Piscine" },
  ];

  // Options pour les différents filtres
  const typeBienOptions = [
    { value: "maison", label: "Maison" },
    { value: "appartement", label: "Appartement" },
    { value: "terrain", label: "Terrain" },
    { value: "parking", label: "Parking" },
    { value: "garage", label: "Garage" },
    { value: "box", label: "Box" },
    { value: "chambre", label: "Chambre" },
    { value: "studio", label: "Studio" },
    { value: "autre", label: "Autre" },
  ];

  const etatDuBienOptions = [
    { value: "tres-bon-etat", label: "Très bon état" },
    { value: "bon-etat", label: "Bon état" },
    { value: "renove", label: "Rénové" },
    { value: "a-rafraichir", label: "À rafraîchir" },
    { value: "travaux-a-prevoir", label: "Travaux à prévoir" },
  ];

  const meubleNONmeubleOptions = [
    { value: "meuble", label: "Meublé" },
    { value: "nonmeuble", label: "Non meublé" },
  ];

  const typeVenteOptions = [
    { value: "ancien", label: "Ancien" },
    { value: "neuf", label: "Neuf" },
    { value: "viager", label: "Viager" },
  ];

  const etageAppartementOptions = [
    { value: "rez-de-chaussee", label: "Rez-de-chaussée" },
    { value: "pas-rez-de-chaussee", label: "Pas de rez-de-chaussée" },
    { value: "dernier-etage", label: "Dernier étage" },
  ];

  const avecAscenseurOptions = [{ value: "true", label: "Avec ascenseur" }];
  const annoncesUrgentesOptions = [
    { value: "true", label: "Annonces urgentes" },
  ];

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

  const handleSortChange = (name: string, value: string, checked: boolean) => {
    setFilter(name, value);
  };

  const ventesETlocationsOptions = [
    { value: "ventes", label: "Ventes" },
    { value: "locations", label: "Locations" },
  ];

  // Message d'info quand certains filtres sont désactivés
  const showDisabledMessage =
    isParkingSelected ||
    isGarageSelected ||
    isBoxSelected ||
    isTerrainSelected ||
    isMaisonSelected ||
    isChambreSelected ||
    isStudioSelected ||
    hasTypeWithoutRooms ||
    hasTypeWithoutFloor ||
    hasTypeWithoutElevator ||
    hasTypeWithoutExterior ||
    hasTypeWithoutLand;

  return (
    <div className="space-y-4">
      {/* Message d'information sur les filtres désactivés */}
      {showDisabledMessage && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
          <p className="font-semibold mb-1">ℹ️ Filtres adaptés</p>
          <p>
            Certains filtres ont été désactivés car ils ne sont pas pertinents
            pour le type de bien sélectionné.
          </p>
        </div>
      )}

      {/* Type de bien (toujours actif) */}
      {!excludedFilterNames.includes("typebien") && (
        <div className={getFilterClassName("typebien")}>
          <CaracteristiquesFilter
            title="Type de bien"
            icon={<PiBuildingsLight className="text-sm" />}
            name="typebien"
            options={typeBienOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {/* Ventes et Locatons */}
      {!excludedFilterNames.includes("ventesetlocations") && (
        <div className={getFilterClassName("ventesetlocations")}>
          <RadioCheckboxGroup
            title="Ventes et Locatons"
            icon={<TbSmartHomeOff className="text-sm" />}
            name="ventesetlocations"
            options={ventesETlocationsOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleSortChange}
          />
        </div>
      )}

      {/* Prix (toujours actif) */}
      {!excludedFilterNames.includes("price") && (
        <RangeFilter
          label="Prix"
          minValue={draft.priceMin}
          maxValue={draft.priceMax}
          unit="€"
          icon={<AiOutlineEuro />} // ✅ ici
          onMinChange={(v) => setFilter("priceMin", v)}
          onMaxChange={(v) => setFilter("priceMax", v)}
        />
      )}

      {/* Surface Bureaux-Commerces */}
      {!excludedFilterNames.includes("surfacebureauxcommerces") && (
        <div className={getFilterClassName("surfacebureauxcommerces")}>
          <RangeFilter
            label="Surface "
            minValue={draft.surfacebureauxcommercesMin}
            maxValue={draft.surfacebureauxcommercesMax}
            unit="m²"
            icon= {<RxAspectRatio />}
            onMinChange={(v) => setFilter("surfacebureauxcommercesMin", v)}
            onMaxChange={(v) => setFilter("surfacebureauxcommercesMax", v)}
          />
        </div>
      )}

      {/* Loyer (uniquement pour les locations) */}
      {/* Loyer pour locations et colocations */}
      {(currentSubcategory === "locations" ||
        currentSubcategory === "colocations") && (
        <RangeFilter
          label="Loyer"
          minValue={draft.loyerMin}
          maxValue={draft.loyerMax}
          unit="€"
          onMinChange={(v) => setFilter("loyerMin", v)}
          onMaxChange={(v) => setFilter("loyerMax", v)}
        />
      )}

      {/* Surface habitable */}
      {!excludedFilterNames.includes("surface") && (
        <div className={getFilterClassName("surface")}>
          <RangeFilter
            label="Surface habitable"
            minValue={draft.surfaceMin}
            maxValue={draft.surfaceMax}
            unit="m²"
            icon= {<RxAspectRatio />}
            onMinChange={(v) => setFilter("surfaceMin", v)}
            onMaxChange={(v) => setFilter("surfaceMax", v)}
          />
        </div>
      )}

      {/* Type de vente */}
      {!excludedFilterNames.includes("typevente") && (
        <div className={getFilterClassName("typevente")}>
          <CheckboxGroupCarre
            title="Type de vente"
            icon={<TbHomeQuestion className="text-sm" />}
            name="typevente"
            options={typeVenteOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {/* Surface du terrain */}
      {!excludedFilterNames.includes("surfaceterrain") && (
        <div className={getFilterClassName("surfaceterrain")}>
          <RangeFilter
            label="Surface du terrain"
            minValue={draft.surfaceterrainMin}
            maxValue={draft.surfaceterrainMax}
            unit="m²"
            icon= {<RxAspectRatio />}

            onMinChange={(v) => setFilter("surfaceterrainMin", v)}
            onMaxChange={(v) => setFilter("surfaceterrainMax", v)}
          />
        </div>
      )}

      {/* Meublé / Non meublé(toujours actif) */}
      {!excludedFilterNames.includes("meuble") && (
        <div className={getFilterClassName("meuble")}>
          <CheckboxGroupCarre
            title="Meublé / Non meublé"
            icon={<PiBuildingsLight className="text-sm" />}
            name="meuble"
            options={meubleNONmeubleOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {/* Pièces - Sélecteur min/max */}
      {!excludedFilterNames.includes("rooms") && (
        <div className={getFilterClassName("rooms")}>
          <PiecesRangeSelector
            minValue={draft.roomsMin}
            maxValue={draft.roomsMax}
            onMinChange={(v) => setFilter("roomsMin", v)}
            onMaxChange={(v) => setFilter("roomsMax", v)}
            icon={MdGridView  }
            title="Pièces"
            color="blue"
          />
        </div>
      )}

      {/* Chambres - Sélecteur min/max */}
      {!excludedFilterNames.includes("chambres") && (
        <div className={getFilterClassName("chambres")}>
          <PiecesRangeSelector
            minValue={draft.chambresMin}
            maxValue={draft.chambresMax}
            onMinChange={(v) => setFilter("chambresMin", v)}
            onMaxChange={(v) => setFilter("chambresMax", v)}
            icon={IoBedOutline}
            title="Chambres"
            color="purple"
          />
        </div>
      )}

      {/* Extérieur */}
      {!excludedFilterNames.includes("exterieur") && (
        <div className={getFilterClassName("exterieur")}>
          <CheckboxGroupCarre
            title="Extérieur"
            icon={<MdOutlineDeck className="text-sm" />}
            name="exterieur"
            options={exterieurOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {/* Étage de l'appartement */}
      {!excludedFilterNames.includes("etageappartement") && (
        <div className={getFilterClassName("etageappartement")}>
          <CheckboxGroupCarre
            title="Étage de l'appartement"
            icon={<GiLaddersPlatform className="text-sm" />}
            name="etageappartement"
            options={etageAppartementOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {/* Avec ascenseur */}
      {!excludedFilterNames.includes("avecascenseur") && (
        <div className={getFilterClassName("avecascenseur")}>
          <CheckboxGroupCarre
            title="Avec ascenseur"
            icon={<PiElevator className="text-sm" />}
            name="avecascenseur"
            options={avecAscenseurOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {/* Filtre Caractéristiques (dynamique selon catégorie + sous‑catégorie) */}
      {currentCategory &&
        currentSubcategory &&
        caracteristiquesOptionsMap[currentCategory]?.[currentSubcategory] &&
        !excludedFilterNames.includes("caracteristiques") && (
          <CaracteristiquesFilter
            title="Caractéristiques"
            name="caracteristiques"
            icon={<MdSettingsInputComposite  className="rotate-90 text-sm text-gray-500" />}
            options={
              caracteristiquesOptionsMap[currentCategory][currentSubcategory]
            }
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}

      {/* État du bien */}
      {!excludedFilterNames.includes("etatdubien") && (
        <div className={getFilterClassName("etatdubien")}>
          <CheckboxGroupCarre
            title="État du bien"
            icon={<LuSearchCheck className="text-sm" />}
            name="etatdubien"
            options={etatDuBienOptions}
            isValueSelected={isValueSelected}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      )}

      {/* Tri */}
      {!excludedFilterNames.includes("sort") && (
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
          title="Type d'annonces"
          icon={<FcDocument className="text-sm" />}
          name="typeannonces"
          options={typeAnnonceOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleSortChange}
        />
      )}

      {/* Type de vendeurs */}
      {!excludedFilterNames.includes("typevendeurs") && (
        <CheckboxGroupCarre
          title="Type de vendeurs"
          icon={<TbUserScreen  className="text-sm" />}
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

      {/* Filtres dynamiques supplémentaires */}
      {availableFilters
        .filter(
          (filter) =>
            ![
              "typevente",
              "typebien",
              "etatdubien",
              "rooms",
              "price",
              "surface",
              "chambres",
              "surfaceterrain",
              "exterieur",
              "etageappartement",
              "avecascenseur",
              "sort",
              "typeannonces",
              "typevendeurs",
              "annoncesurgentes",
            ].includes(filter.name) &&
            !excludedFilterNames.includes(filter.name),
        )
        .map((filter) => {
          if (
            filter.type === "range" ||
            filter.type === "price" ||
            filter.type === "surface"
          ) {
            return (
              <div
                key={filter.name}
                className={getFilterClassName(filter.name)}
              >
                <RangeFilter
                  label={filter.label}
                  minValue={draft.filters?.[`${filter.name}Min`] || ""}
                  maxValue={draft.filters?.[`${filter.name}Max`] || ""}
                  unit={filter.unit || ""}
                  minPlaceholder={filter.placeholderMin || "Min"}
                  maxPlaceholder={filter.placeholderMax || "Max"}
                  onMinChange={(v) => setFilter(`${filter.name}Min`, v)}
                  onMaxChange={(v) => setFilter(`${filter.name}Max`, v)}
                />
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}
