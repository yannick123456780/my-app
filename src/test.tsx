import { useMemo } from "react";
import {
  RadioCheckboxGroup,
  CheckboxGroupCarre,
  CaracteristiquesFilter,
  RangeFilter,
} from "./BaseFilters";
import {
  PiGasPump,
  PiGraduationCap,
  PiSortAscending,
  PiTruck,
  PiUser,
} from "react-icons/pi";
import { FcDocument } from "react-icons/fc";
import { TbUserScreen } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";
import { AiOutlineEuro } from "react-icons/ai";

interface Props {
  draft: any;
  setFilter: (name: string, value: string) => void;
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  excludedFilterNames?: string[];
}

export default function ModeFilters({
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

  const universOptions = [
    { value: "femme", label: "Femme" },
    { value: "maternite", label: "Maternité" },
    { value: "homme", label: "Homme" },
    { value: "enfant", label: "Enfant" },
  ];

  // Options de taille selon l'univers sélectionné
  const tailleOptions = useMemo(() => {
    const selectedUnivers = draft.filters?.univers;

    // Tailles pour femme
    const femmeTailles = [
      "taille-unique", "30-xxxs", "32-xxs", "34-xs", "36-s", "38-m", "40-l",
      "42-xl", "44-xxl", "46-xxxl", "48-4xl", "50-5xl", "52-6xl", "54-7xl", "56-8xl-et-plus"
    ];

    // Tailles pour maternité (identique à femme selon la demande)
    const materniteTailles = [...femmeTailles];

    // Tailles par défaut pour homme/enfant (à adapter selon besoin)
    const defaultTailles = [
      "taille-unique", "30-xxxs", "32-xxs", "34-xs", "36-s", "38-m", "40-l",
      "42-xl", "44-xxl", "46-xxxl", "48-4xl", "50-5xl", "52-6xl", "54-7xl", "56-8xl-et-plus"
    ];

    let tailles: string[] = [];
    if (selectedUnivers === "femme") {
      tailles = femmeTailles;
    } else if (selectedUnivers === "maternite") {
      tailles = materniteTailles;
    } else if (selectedUnivers === "homme" || selectedUnivers === "enfant") {
      tailles = defaultTailles;
    } else {
      return []; // aucun univers sélectionné → pas de filtre taille
    }

    return tailles.map(taille => ({
      value: taille,
      label: taille
        .replace(/-/g, ' ')
        .replace(/xxxs/i, 'XXXS')
        .replace(/xxs/i, 'XXS')
        .replace(/xs/i, 'XS')
        .replace(/s\b/i, 'S')
        .replace(/m\b/i, 'M')
        .replace(/l\b/i, 'L')
        .replace(/xl/i, 'XL')
        .replace(/xxl/i, 'XXL')
        .replace(/xxxl/i, 'XXXL')
        .replace(/4xl/i, '4XL')
        .replace(/5xl/i, '5XL')
        .replace(/6xl/i, '6XL')
        .replace(/7xl/i, '7XL')
        .replace(/8xl-et-plus/i, '8XL et plus')
        .replace(/taille-unique/i, 'Taille unique')
    }));
  }, [draft.filters?.univers]);

  const handleSortChange = (name: string, value: string) => {
    setFilter(name, value);
  };

  // ===================== RENDER =====================

  const showTailleFilter = draft.filters?.univers && tailleOptions.length > 0;

  return (
    <div className="space-y-4">
      {/* 💰 PRIX */}
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

      {/* Univers */}
      {!excludedFilterNames.includes("univers") && (
        <RadioCheckboxGroup
          title="Univers"
          name="univers"
          icon={<PiUser />}
          options={universOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleSortChange}
        />
      )}

      {/* Taille (dynamique) */}
      {showTailleFilter && !excludedFilterNames.includes("taille") && (
        <CheckboxGroupCarre
          title="Taille"
          name="taille"
          icon={<PiGasPump />} // à remplacer par une icône appropriée
          options={tailleOptions}
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












































import { useMemo } from "react";
import {
  RadioCheckboxGroup,
  CheckboxGroupCarre,
  CaracteristiquesFilter,
  RangeFilter,
} from "./BaseFilters";
import {
  PiGasPump,
  PiSortAscending,
  PiUser,
} from "react-icons/pi";
import { FcDocument } from "react-icons/fc";
import { TbUserScreen } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";
import { AiOutlineEuro } from "react-icons/ai";

interface Props {
  draft: any;
  setFilter: (name: string, value: string) => void;
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  excludedFilterNames?: string[];
}

export default function ModeFilters({
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

  const universOptions = [
    { value: "femme", label: "Femme" },
    { value: "maternite", label: "Maternité" },
    { value: "homme", label: "Homme" },
    { value: "enfant", label: "Enfant" },
  ];

  // ===================== DYNAMIC TAILLE OPTIONS =====================
  const tailleOptions = useMemo(() => {
    const selectedUnivers = draft.filters?.univers;
    if (!selectedUnivers) return [];

    // Définition des listes de tailles par univers
    const taillesParUnivers: Record<string, string[]> = {
      femme: [
        "taille-unique", "30-xxxs", "32-xxs", "34-xs", "36-s", "38-m", "40-l",
        "42-xl", "44-xxl", "46-xxxl", "48-4xl", "50-5xl", "52-6xl", "54-7xl", "56-8xl-et-plus"
      ],
      maternite: [
        "taille-unique", "30-xxxs", "32-xxs", "34-xs", "36-s", "38-m", "40-l",
        "42-xl", "44-xxl", "46-xxxl", "48-4xl", "50-5xl", "52-6xl", "54-7xl", "56-8xl-et-plus"
      ],
      homme: [
        "taille-unique", "30-xxxs", "32-xxs", "34-xs", "36-s", "38-m", "40-l",
        "42-xl", "44-xxl", "46-xxxl", "48-4xl", "50-5xl", "52-6xl", "54-7xl", "56-8xl-et-plus"
      ],
      enfant: [
        "taille-unique", "30-xxxs", "32-xxs", "34-xs", "36-s", "38-m", "40-l",
        "42-xl", "44-xxl", "46-xxxl"
      ],
    };

    const tailles = taillesParUnivers[selectedUnivers] || [];

    // Transformation en options avec labels lisibles
    return tailles.map((valeur) => ({
      value: valeur,
      label: valeur
        .replace(/-/g, " ")
        .replace(/xxxs/i, "XXXS")
        .replace(/xxs/i, "XXS")
        .replace(/xs/i, "XS")
        .replace(/\bs\b/i, "S")
        .replace(/\bm\b/i, "M")
        .replace(/\bl\b/i, "L")
        .replace(/xl/i, "XL")
        .replace(/xxl/i, "XXL")
        .replace(/xxxl/i, "XXXL")
        .replace(/4xl/i, "4XL")
        .replace(/5xl/i, "5XL")
        .replace(/6xl/i, "6XL")
        .replace(/7xl/i, "7XL")
        .replace(/8xl-et-plus/i, "8XL et plus")
        .replace(/taille-unique/i, "Taille unique"),
    }));
  }, [draft.filters?.univers]);

  // Réinitialisation des tailles quand l'univers change
  const handleUniversChange = (name: string, value: string) => {
    // Applique l'univers
    setFilter(name, value);
    // Réinitialise le filtre taille pour éviter les incohérences
    if (draft.filters?.taille) {
      setFilter("taille", "");
    }
  };

  const handleSortChange = (name: string, value: string) => {
    setFilter(name, value);
  };

  // ===================== RENDER =====================
  const showTaille = draft.filters?.univers && tailleOptions.length > 0;

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

      {/* Univers (radio) */}
      {!excludedFilterNames.includes("univers") && (
        <RadioCheckboxGroup
          title="Univers"
          name="univers"
          icon={<PiUser />}
          options={universOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleUniversChange} // ← propre handler avec réinit
        />
      )}

      {/* Taille (checkbox carrées) conditionnel */}
      {showTaille && !excludedFilterNames.includes("taille") && (
        <CaracteristiquesFilter
          title="Taille"
          name="taille"
          icon={<PiGasPump />} // remplace par une icône de taille si dispo (ex: PiRuler)
          options={tailleOptions}
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














 to={buildListingUrl("/listings/?category=mode&subcategory=montres-bijoux")}
L#btW!6c+Rp9JRv&é"'
L#btW!6c+Rp9JRv&é"'





{/* HEADER PRINCIPAL1 */} 
      <div
        className="flex mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 mb-1 "
        style={{
          fontSize: "clamp(14px, 1.1vw, 18px)", // Taille de base responsive
        }}
      >
        <div className="flex flex-wrap justify-center items-center gap-x-4 w-full ">
          {/* Logo + Hamburger */}
          <div className="flex items-center flex-1 md:flex-none justify-between md:justify-center md:w-auto">
            {/*  Hamburger Mobile */}
            <button className="md:hidden mt-3">
              <span
                className="material-symbols-outlined text-[#4b5f71] hover:text-[#3A3A3A] transition-colors"
                style={{
                  fontSize: "clamp(32px, 4vw, 40px)",
                }}
              >
                menu
              </span>
            </button>

            {/* Logo Desktop */}
            <Link
              to="/"
              className="hidden md:flex justify-center md:justify-center md:max-w-xl "
            >
              <span
                className="text-[#f56c2a] font-extrabold tracking-tighter hover:opacity-90 transition-opacity"
                style={{
                  padding: "clamp(0.25em, 0.5vw, 0.5em) clamp(0.5em, 1vw, 1em)",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  gap: "clamp(0.25em, 0.5vw, 0.5em)",
                }}
              >
                Wazza
              </span>
            </Link>

            {/* Logo Mobile/Tablette */}
            <Link
              to="/"
              className="flex justify-center md:justify-center md:max-w-xl md:hidden"
            >
              <span
                className="text-[#f56c2a] font-extrabold tracking-tighter hover:opacity-90 transition-opacity"
                style={{
                  padding: "clamp(0.25em, 0.5vw, 0.5em) clamp(0.5em, 1vw, 1em)",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                }}
              >
                Wazza
              </span>
            </Link>

            <div className="w-[clamp(30px, 4vw, 40px)] md:hidden"></div>
          </div>

          {/* Barre de recherche */}
          <div
            style={{
              height: "clamp(2em, 4vw, 3em)",
            }}
            className="w-full flex flex-col mt-2 md:flex-row md:flex-1 md:max-w-xl md:mx-4 mb-5 md:mb-0"
          >
            <div className="flex w-full ">
              <input
                id="search"
                name="search"
                autoComplete="search"
                type="text"
                placeholder="Rechercher sur Wazza"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="block w-full rounded-l-lg border border-gray-300 bg-gray-100 py-2.5 px-4 text-gray-700 placeholder-gray-700 focus:outline-none focus:ring-0 focus:border-gray-300"
                style={{
                  fontSize: "clamp(1.2em, 1vw, 0.9em)",
                  padding:
                    "clamp(0.5em, 1vw, 0.75em) clamp(0.75em, 1.5vw, 1em)",
                }}
              />
              <button
                onClick={handleSearch}
                className="bg-[#f56c2a] hover:bg-[#e55b19] text-white rounded-r-lg flex items-center justify-center transition-colors"
                style={{
                  padding: "0 clamp(0.75em, 1.5vw, 1em)",
                  fontSize: "clamp(0.9em, 1.2vw, 1em)",
                }}
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>

          {/* Bouton Ajouter un article */}
          <Link
            to="/adlisting"
            className="hidden md:flex mt-2 bg-[#f56c2a] text-white rounded-lg font-bold hover:bg-[#e55b19] transition-colors shadow-sm items-center gap-2"
            style={{
              padding:
                "clamp(0.375em, 0.75vw, 0.75em) clamp(0.75em, 1.5vw, 1.5em)",
              height: "clamp(2em, 4vw, 3em)",
              gap: "clamp(0.25em, 0.5vw, 0.5em)",
              fontSize: "clamp(0.75em, 1vw, 0.9em)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "1.2em",
              }}
            >
              add_box
            </span>
            <span className="whitespace-nowrap">Vendre tes articles</span>
          </Link>

          {/* Boutons + profil + dropdown */}
          <div className="hidden md:flex mt-4 w-full items-center gap-4 md:gap-6 flex-1 md:flex-none justify-end md:w-auto mb-2 ">
            {/* Favoris / Messages / Profil */}
            <div className="flex items-center gap-[clamp(0.5em, 1vw, 1em)] text-gray-900 ">
              <Link
                to="/favorite"
                className="flex flex-col items-center gap-[clamp(0.25em, 0.5vw, 0.5em)] group me-2"
              >
                <span
                  className="material-symbols-outlined transition-colors"
                  style={{
                    fontSize: "clamp(1.2em, 1.8vw, 1.5em)",
                  }}
                >
                  favorite
                </span>
                <span
                  className="border-b-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                  style={{
                    fontSize: "clamp(0.7em, 0.9vw, 0.85em)",
                  }}
                >
                  Favoris
                </span>
              </Link>

              <Link
                to="/messages"
                className="flex flex-col items-center gap-[clamp(0.25em, 0.5vw, 0.5em)] group me-2"
              >
                <span
                  className="material-symbols-outlined transition-colors"
                  style={{
                    fontSize: "clamp(1.2em, 1.8vw, 1.5em)",
                  }}
                >
                  chat
                </span>
                <span
                  className="border-b-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                  style={{
                    fontSize: "clamp(0.7em, 0.9vw, 0.85em)",
                  }}
                >
                  Messages
                </span>
              </Link>

              {user ? (
                <div
                  ref={userMenuRefProfil}
                  className="relative flex flex-col items-center gap-[clamp(0.25em, 0.5vw, 0.5em)] group me-2 "
                >
                  <button
                    className="flex flex-col items-center group pt-0.5 mb-[20%] mt-[15%] "
                    onClick={() => setShowUserMenu((v) => !v)}
                  >
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        className="rounded-full  object-cover border-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                        style={{
                          width: "clamp(1.6em, 2.2vw, 2em)",
                          height: "clamp(1.6em, 2.2vw, 2em)",
                        }}
                        alt={profile?.username || "Profil"}
                      />
                    ) : (
                      <div
                        className="text-white rounded-full   flex items-center justify-center font-bold border-2 border-transparent group-hover:border-[#f56c2a] transition-all  "
                        style={{
                          backgroundColor: profile?.color_code || "#f56c2a",
                          width: "clamp(1.1em, 1.7vw, 1.5em)",
                          height: "clamp(1.1em, 1.7vw, 1.5em)",
                          fontSize: "clamp(0.6em, 0.95vw, 0.9em)",
                        }}
                      >
                        {profile?.username?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <span
                      className="border-b-2 border-transparent group-hover:border-[#f56c2a] transition-all pt-[20%]  "
                      style={{
                        fontSize: "clamp(0.7em, 0.9vw, 0.82em)",
                        marginBottom: "8%",
                      }}
                    >
                      {profile?.username || "Profil"}
                    </span>
                  </button>

                  {showUserMenu && (
                    <div
                      className="absolute top-12 right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                      style={{
                        fontSize: "clamp(0.8em, 0.9vw, 0.85em)",
                      }}
                    >
                      <div className="px-4 py-3 border-b font-medium">
                        {profile?.username || user.email}
                      </div>
                      <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                        Mon profil
                      </button>
                      <button
                        onClick={async () => await supabase.auth.signOut()}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                      >
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/connexion"
                  className="flex flex-col items-center gap-[clamp(0.25em, 0.5vw, 0.5em)] group me-2 mb-[2%]"
                >
                  <span
                    className="material-symbols-outlined transition-colors"
                    style={{
                      fontSize: "clamp(1.2em, 1.8vw, 1.5em)",
                    }}
                  >
                    person
                  </span>
                  <span
                    className="border-b-2 border-transparent group-hover:border-[#f56c2a] transition-all pt-1"
                    style={{
                      fontSize: "clamp(0.7em, 0.9vw, 0.85em)",
                    }}
                  >
                    Se connecter
                  </span>
                </Link>
              )}
            </div>

            {/* Dropdown langue / devise */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={handleOpenDropdown}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-gray-100 transition-colors group mb-3"
                aria-label="Changer la langue et la devise"
                style={{
                  padding:
                    "clamp(0.25em, 0.5vw, 0.5em) clamp(0.5em, 0.8vw, 0.75em)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "clamp(1.2em, 1.8vw, 1.5em)",
                  }}
                >
                  Language
                </span>

                <span
                  className={`material-symbols-outlined text-gray-500 transition-transform duration-200 ${
                    showLanguageCurrency ? "rotate-180" : ""
                  }`}
                  style={{
                    fontSize: "clamp(1.2em, 1.8vw, 1.5em)",
                  }}
                >
                  expand_more
                </span>
              </button>

              {showLanguageCurrency && (
                <div
                  className="absolute right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-y-auto z-50"
                  style={{
                    width: "clamp(340px, 35vw, 450px)",
                    fontSize: "clamp(0.9em, 1vw, 1em)",
                    maxHeight: "clamp(480px, 85vh, 600px)",
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 text-base">
                        Langue, devise & pays
                      </h3>
                      <button
                        onClick={() => {
                          setShowLanguageCurrency(false);
                          setTempLanguage(selectedLanguage);
                          setTempCurrency(selectedCurrency);
                          setTempCountry(selectedCountry);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Fermer"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "1.2em" }}
                        >
                          close
                        </span>
                      </button>
                    </div>
                    {/* Pays */}
                    <div className="mb-5">
                      <h4 className="font-semibold text-gray-700 text-sm mb-2">
                        Pays
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => setTempCountry(country)}
                            className={`flex items-center justify-between px-2 py-2 rounded-lg transition-all ${
                              tempCountry.code === country.code
                                ? "bg-orange-50 border border-orange-500 text-orange-600"
                                : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                            style={{ fontSize: "0.9em" }}
                          >
                            <span>{country.name}</span>
                            {tempCountry.code === country.code && (
                              <span
                                className="material-symbols-outlined text-orange-500"
                                style={{ fontSize: "1.1em" }}
                              >
                                check
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Langue */}
                    <div className="mb-5">
                      <h4 className="font-semibold text-gray-700 text-sm mb-2">
                        Langue
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => setTempLanguage(language)}
                            className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-all ${
                              tempLanguage.code === language.code
                                ? "bg-orange-50 border border-orange-500 text-orange-600"
                                : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                            style={{ fontSize: "0.9em" }}
                          >
                            <span style={{ fontSize: "1.2em" }}>
                              {language.flag}
                            </span>
                            <span className="truncate">{language.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Devise */}
                    <div className="mb-5">
                      <h4 className="font-semibold text-gray-700 text-sm mb-2">
                        Devise
                      </h4>
                      <div className="grid grid-cols-2 gap-2 max-h-40  pr-1">
                        {currencies.map((currency) => (
                          <button
                            key={currency.code}
                            onClick={() => setTempCurrency(currency)}
                            className={`flex items-center justify-between px-2 py-2 rounded-lg transition-all ${
                              tempCurrency.code === currency.code
                                ? "bg-orange-50 border border-orange-500 text-orange-600"
                                : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                            style={{ fontSize: "0.9em" }}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {currency.symbol}
                              </span>
                              <span className="text-gray-600">
                                {currency.code}
                              </span>
                            </div>
                            {tempCurrency.code === currency.code && (
                              <span
                                className="material-symbols-outlined text-orange-500"
                                style={{ fontSize: "1.1em" }}
                              >
                                check
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sélection courante */}
                    <div className="border-t border-gray-200 pt-3 mt-2">
                      <div className="bg-gray-50 rounded-lg p-2 mb-3 text-sm">
                        <div className="font-medium text-gray-700 mb-1">
                          Sélection actuelle :
                        </div>
                        <div className="text-gray-600">
                          {tempLanguage.flag} {tempLanguage.code} •{" "}
                          {tempCurrency.symbol} {tempCurrency.code} •{" "}
                          {tempCountry.name}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setTempLanguage(selectedLanguage);
                            setTempCurrency(selectedCurrency);
                            setTempCountry(selectedCountry);
                            setShowLanguageCurrency(false);
                          }}
                          className="flex-1 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-2 rounded-lg"
                          style={{ fontSize: "0.9em" }}
                        >
                          Annuler
                        </button>
                        <button
                          onClick={handleSavePreferences}
                          disabled={
                            !hasChanges &&
                            tempCountry.code === selectedCountry.code
                          }
                          className={`flex-1 font-medium px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 ${
                            hasChanges ||
                            tempCountry.code !== selectedCountry.code
                              ? "bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          style={{ fontSize: "0.9em" }}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "1em" }}
                          >
                            save
                          </span>
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


 {/* HEADER PRINCIPAL2 */}
      <header className="w-full border-b border-gray-200 bg-[#f5f5f5]">
        <div
          className="
      mx-auto
      max-w-[1280px]

      flex
      items-center
      justify-between

      h-[clamp(62px,6vw,88px)]

      px-[clamp(12px,2vw,32px)]

      gap-[clamp(10px,1.5vw,28px)]

      transition-all
      duration-300
    "
        >
          {/* ========================================================= */}
          {/* LOGO */}
          {/* ========================================================= */}

          <Link
            to="/"
            className="
        flex-shrink-0
        flex
        items-center
      "
          >
            <span
              className="
          text-[#f56c2a]
          font-black
          tracking-tighter
          leading-none
          whitespace-nowrap
        "
              style={{
                fontSize: "clamp(2rem,3vw,3.6rem)",
              }}
            >
              Wazza
            </span>
          </Link>

          {/* ========================================================= */}
          {/* SEARCH BAR */}
          {/* ========================================================= */}

          <div
            className="
        flex-1
        min-w-0

        flex
        justify-center
      "
          >
            <div
              className="
          w-full
          max-w-[760px]

          flex
          items-center
        "
            >
              {/* INPUT */}
              <input
                type="text"
                placeholder="Rechercher sur Wazza"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="
            w-full
            min-w-0

            border
            border-gray-300

            bg-[#e9e9eb]

            rounded-l-[clamp(10px,1vw,16px)]

            outline-none

            transition-all
          "
                style={{
                  height: "clamp(42px,4.2vw,62px)",

                  paddingLeft: "clamp(14px,1.5vw,28px)",
                  paddingRight: "clamp(14px,1.5vw,28px)",

                  fontSize: "clamp(13px,1vw,20px)",
                }}
              />

              {/* BUTTON */}
              <button
                onClick={handleSearch}
                className="
            flex-shrink-0

            flex
            items-center
            justify-center

            bg-[#f56c2a]
            hover:bg-[#e45d1c]

            text-white

            rounded-r-[clamp(10px,1vw,16px)]

            transition-all
          "
                style={{
                  width: "clamp(52px,5vw,82px)",
                  height: "clamp(42px,4.2vw,62px)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "clamp(20px,1.7vw,34px)",
                  }}
                >
                  search
                </span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* ACTIONS */}
          {/* ========================================================= */}

          <div
            className="
        flex
        items-center

        flex-shrink-0

        gap-[clamp(10px,1.3vw,24px)]
      "
          >
            {/* ========================================================= */}
            {/* VENDRE */}
            {/* ========================================================= */}

            <Link
              to="/adlisting"
              className="
    hidden md:flex

    items-center
    justify-center

    bg-[#f56c2a]
    hover:bg-[#e55b19]

    text-white
    font-bold

    whitespace-nowrap

    flex-shrink

    transition-all
    duration-200
  "
              style={{
                height: "clamp(40px,4vw,54px)",

                paddingLeft: "clamp(10px,1.2vw,22px)",
                paddingRight: "clamp(10px,1.2vw,22px)",

                gap: "clamp(4px,0.5vw,10px)",

                borderRadius: "clamp(10px,1vw,16px)",

                fontSize: "clamp(10px,0.8vw,15px)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "clamp(16px,1.2vw,22px)",
                }}
              >
                add_box
              </span>

              <span className="whitespace-nowrap">Vendre tes articles</span>
            </Link>

            {/* ========================================================= */}
            {/* FAVORIS */}
            {/* ========================================================= */}

            <Link
              to="/favorite"
              className="
          flex
          flex-col
          items-center
          justify-center

          text-[#1f2937]

          whitespace-nowrap

          transition-all
        "
              style={{
                gap: "clamp(2px,0.3vw,6px)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "clamp(20px,1.5vw,30px)",
                }}
              >
                favorite
              </span>

              <span
                style={{
                  fontSize: "clamp(11px,0.8vw,15px)",
                }}
              >
                Favoris
              </span>
            </Link>

            {/* ========================================================= */}
            {/* MESSAGES */}
            {/* ========================================================= */}

            <Link
              to="/messages"
              className="
          flex
          flex-col
          items-center
          justify-center

          text-[#1f2937]

          whitespace-nowrap

          transition-all
        "
              style={{
                gap: "clamp(2px,0.3vw,6px)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "clamp(20px,1.5vw,30px)",
                }}
              >
                chat
              </span>

              <span
                style={{
                  fontSize: "clamp(11px,0.8vw,15px)",
                }}
              >
                Messages
              </span>
            </Link>

            {/* ========================================================= */}
            {/* PROFIL */}
            {/* ========================================================= */}

            {user ? (
              <div
                ref={userMenuRefProfil}
                className="
      relative

      flex
      flex-col
      items-center
      justify-center

      flex-shrink-0

      transition-all
    "
                style={{
                  gap: "clamp(2px,0.3vw,6px)",
                }}
              >
                <button
                  className="flex flex-col items-center group"
                  onClick={() => setShowUserMenu((v) => !v)}
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      className="
            rounded-full
            object-cover

            border-2
            border-transparent

            group-hover:border-[#f56c2a]

            transition-all
          "
                      style={{
                        width: "clamp(22px,1.8vw,34px)",
                        height: "clamp(22px,1.8vw,34px)",
                      }}
                      alt={profile?.username || "Profil"}
                    />
                  ) : (
                    <div
                      className="
            text-white
            rounded-full

            flex
            items-center
            justify-center

            font-bold

            border-2
            border-transparent

            group-hover:border-[#f56c2a]

            transition-all
          "
                      style={{
                        backgroundColor: profile?.color_code || "#f56c2a",

                        width: "clamp(22px,1.8vw,34px)",
                        height: "clamp(22px,1.8vw,34px)",

                        fontSize: "clamp(10px,0.8vw,14px)",
                      }}
                    >
                      {profile?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}

                  <span
                    className="
          whitespace-nowrap

          border-b-2
          border-transparent

          group-hover:border-[#f56c2a]

          transition-all
        "
                    style={{
                      fontSize: "clamp(10px,0.75vw,14px)",
                    }}
                  >
                    {profile?.username || "Profil"}
                  </span>
                </button>

                {showUserMenu && (
                  <div
                    className="
          absolute
          top-full
          right-0
          mt-2

          bg-white

          rounded-xl

          shadow-xl

          border
          border-gray-200

          overflow-hidden

          z-50
        "
                    style={{
                      width: "clamp(180px,18vw,240px)",
                      fontSize: "clamp(12px,0.85vw,15px)",
                    }}
                  >
                    <div className="px-4 py-3 border-b font-medium">
                      {profile?.username || user.email}
                    </div>

                    <button className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors">
                      Mon profil
                    </button>

                    <button
                      onClick={async () => await supabase.auth.signOut()}
                      className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/connexion"
                className="
      flex
      flex-col
      items-center
      justify-center

      whitespace-nowrap

      group

      transition-all
    "
                style={{
                  gap: "clamp(2px,0.3vw,6px)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "clamp(16px,1.3vw,26px)",
                  }}
                >
                  person
                </span>

                <span
                  className="
        whitespace-nowrap

        border-b-2
        border-transparent

        group-hover:border-[#f56c2a]

        transition-all
      "
                  style={{
                    fontSize: "clamp(10px,0.75vw,14px)",
                  }}
                >
                  Se connecter
                </span>
              </Link>
            )}
            {/* ========================================================= */}
            {/* LANGUAGE */}
            {/* ========================================================= */}

            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                onClick={handleOpenDropdown}
                className="
      flex
      items-center
      justify-center

      hover:bg-gray-100

      rounded-lg

      transition-all
      duration-200
    "
                style={{
                  gap: "clamp(2px,0.4vw,8px)",

                  padding: "clamp(4px,0.5vw,8px) clamp(6px,0.7vw,12px)",
                }}
                aria-label="Changer la langue et la devise"
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "clamp(18px,1.4vw,28px)",
                  }}
                >
                  language
                </span>

                <span
                  className={`material-symbols-outlined text-gray-500 transition-transform duration-200 ${
                    showLanguageCurrency ? "rotate-180" : ""
                  }`}
                  style={{
                    fontSize: "clamp(16px,1.1vw,22px)",
                  }}
                >
                  expand_more
                </span>
              </button>

              {showLanguageCurrency && (
                <div
                  className="
        absolute
        top-full
        right-0
        mt-2

        bg-white

        rounded-2xl

        shadow-2xl

        border
        border-gray-200

        overflow-y-auto

        z-[9999]
      "
                  style={{
                    width: "clamp(320px,34vw,450px)",
                    maxHeight: "clamp(420px,80vh,600px)",
                    fontSize: "clamp(12px,0.85vw,15px)",
                  }}
                >
                  <div className="p-[clamp(14px,1.2vw,22px)]">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-4">
                      <h3
                        className="font-semibold text-gray-900"
                        style={{
                          fontSize: "clamp(14px,1vw,18px)",
                        }}
                      >
                        Langue, devise & pays
                      </h3>

                      <button
                        onClick={() => {
                          setShowLanguageCurrency(false);
                          setTempLanguage(selectedLanguage);
                          setTempCurrency(selectedCurrency);
                          setTempCountry(selectedCountry);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Fermer"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: "clamp(18px,1.2vw,24px)",
                          }}
                        >
                          close
                        </span>
                      </button>
                    </div>

                    {/* ========================================================= */}
                    {/* PAYS */}
                    {/* ========================================================= */}

                    <div className="mb-5">
                      <h4
                        className="font-semibold text-gray-700 mb-2"
                        style={{
                          fontSize: "clamp(12px,0.9vw,15px)",
                        }}
                      >
                        Pays
                      </h4>

                      <div className="grid grid-cols-2 gap-2">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            onClick={() => setTempCountry(country)}
                            className={`flex items-center justify-between rounded-xl transition-all ${
                              tempCountry.code === country.code
                                ? "bg-orange-50 border border-orange-500 text-orange-600"
                                : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                            style={{
                              padding:
                                "clamp(8px,0.8vw,12px) clamp(10px,1vw,14px)",

                              fontSize: "clamp(11px,0.85vw,14px)",
                            }}
                          >
                            <span className="truncate">{country.name}</span>

                            {tempCountry.code === country.code && (
                              <span
                                className="material-symbols-outlined text-orange-500"
                                style={{
                                  fontSize: "clamp(16px,1vw,20px)",
                                }}
                              >
                                check
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* LANGUE */}
                    {/* ========================================================= */}

                    <div className="mb-5">
                      <h4
                        className="font-semibold text-gray-700 mb-2"
                        style={{
                          fontSize: "clamp(12px,0.9vw,15px)",
                        }}
                      >
                        Langue
                      </h4>

                      <div className="grid grid-cols-2 gap-2">
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => setTempLanguage(language)}
                            className={`flex items-center rounded-xl transition-all ${
                              tempLanguage.code === language.code
                                ? "bg-orange-50 border border-orange-500 text-orange-600"
                                : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                            style={{
                              gap: "clamp(6px,0.5vw,10px)",

                              padding:
                                "clamp(8px,0.8vw,12px) clamp(10px,1vw,14px)",

                              fontSize: "clamp(11px,0.85vw,14px)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "clamp(16px,1.1vw,20px)",
                              }}
                            >
                              {language.flag}
                            </span>

                            <span className="truncate">{language.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* DEVISE */}
                    {/* ========================================================= */}

                    <div className="mb-5">
                      <h4
                        className="font-semibold text-gray-700 mb-2"
                        style={{
                          fontSize: "clamp(12px,0.9vw,15px)",
                        }}
                      >
                        Devise
                      </h4>

                      <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                        {currencies.map((currency) => (
                          <button
                            key={currency.code}
                            onClick={() => setTempCurrency(currency)}
                            className={`flex items-center justify-between rounded-xl transition-all ${
                              tempCurrency.code === currency.code
                                ? "bg-orange-50 border border-orange-500 text-orange-600"
                                : "bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100"
                            }`}
                            style={{
                              padding:
                                "clamp(8px,0.8vw,12px) clamp(10px,1vw,14px)",

                              fontSize: "clamp(11px,0.85vw,14px)",
                            }}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-semibold">
                                {currency.symbol}
                              </span>

                              <span className="truncate">{currency.code}</span>
                            </div>

                            {tempCurrency.code === currency.code && (
                              <span
                                className="material-symbols-outlined text-orange-500"
                                style={{
                                  fontSize: "clamp(16px,1vw,20px)",
                                }}
                              >
                                check
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* SÉLECTION COURANTE */}
                    {/* ========================================================= */}

                    <div className="border-t border-gray-200 pt-4">
                      <div
                        className="bg-gray-50 rounded-xl mb-4"
                        style={{
                          padding: "clamp(10px,0.9vw,14px)",
                        }}
                      >
                        <div
                          className="font-semibold text-gray-700 mb-1"
                          style={{
                            fontSize: "clamp(11px,0.85vw,14px)",
                          }}
                        >
                          Sélection actuelle :
                        </div>

                        <div
                          className="text-gray-600"
                          style={{
                            fontSize: "clamp(11px,0.8vw,14px)",
                          }}
                        >
                          {tempLanguage.flag} {tempLanguage.code} •{" "}
                          {tempCurrency.symbol} {tempCurrency.code} •{" "}
                          {tempCountry.name}
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setTempLanguage(selectedLanguage);
                            setTempCurrency(selectedCurrency);
                            setTempCountry(selectedCountry);

                            setShowLanguageCurrency(false);
                          }}
                          className="
                flex-1

                font-medium

                text-gray-700
                bg-gray-100

                hover:bg-gray-200

                transition-colors

                rounded-xl
              "
                          style={{
                            padding:
                              "clamp(9px,0.8vw,13px) clamp(12px,1vw,16px)",

                            fontSize: "clamp(11px,0.85vw,14px)",
                          }}
                        >
                          Annuler
                        </button>

                        <button
                          onClick={handleSavePreferences}
                          disabled={
                            !hasChanges &&
                            tempCountry.code === selectedCountry.code
                          }
                          className={`
                flex-1

                font-medium

                rounded-xl

                transition-colors

                flex
                items-center
                justify-center

                ${
                  hasChanges || tempCountry.code !== selectedCountry.code
                    ? "bg-orange-500 text-white hover:bg-orange-600 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
                          style={{
                            gap: "clamp(4px,0.4vw,8px)",

                            padding:
                              "clamp(9px,0.8vw,13px) clamp(12px,1vw,16px)",

                            fontSize: "clamp(11px,0.85vw,14px)",
                          }}
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "clamp(15px,1vw,18px)",
                            }}
                          >
                            save
                          </span>
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>








 un nouveau filtre; Produit: 





Canapé

Canapé convertible et clic clac


Canapé 2 places


Canapé 3 places


Canapé 4 places et plus
11 991

Canapé d'angle
24 118

Banquette
7 021

Méridienne
3 514

Chauffeuse
2 825

Fauteuil
189 488

Fauteuil électrique
8 268
Meuble de rangement

Bibliothèque et étagère
97 170

Meuble de rangement
200 900

Armoire
95 758

Buffet bas
76 807

Bibliothèque
7 071

Commode
52 966

Etagère sur pied
9 137

Etagère murale
7 846

Meuble TV
131 246

Meuble de cuisine
68 147

Meuble de jardin
20 787

Meuble de salle de bain
33 423

Meuble à chaussures
5 116

Vaisselier
14 700

Coffre et malle
17 907

Caisson de rangement
6 267

Meuble bar
15 448

Dressing et penderie
27 069
Lit et matelas

Lit pour enfant
35 213

Lit
161 110

Sommier
43 114

Pied de lit
3 187

Tête de lit
6 944

Matelas
57 275

Lit + matelas
26 872

Lit superposé et lit mezzanine
7 094

Lit gigogne
786

Cadre de lit
5 720
Table et bureau

Table de salle à manger
210 984

Table extensible
22 640

Table ronde
19 265

Table haute
14 195

Table d'appoint
57 577

Table basse
221 674

Table de chevet
48 461

Table pliante
5 087

Table bistrot
3 695

Console
24 573

Desserte
2 455

Ensemble table et chaises
7 670

Bureau
158 275

Bureau d'angle
4 614

Secrétaire
3 368

Coiffeuse
13 081
Chaise et tabouret

Chaise, tabouret et banc
194 689

Chaise
116 333

Chaise pliante
9 558

Chaise et tabouret de bar
24 161

Chaise de bureau
16 323

Tabouret
18 776

Banc
3 051

Pouf et repose pied
4 390
Accessoire

Poubelle
5 116

Etendoir à linge
1 860

Planche à repasser
1 445

Porte-serviette
3 881

Marche-pied
568

Panière à linge
1 206

P

Porte-manteau

Luminaire


Bain et baignoire
[#f56c2a]

Porte


Tapis


Accessoire

Autre

