// AnnoncesPage.tsx (version simplifiée)
import { useTaxonomy } from "@/taxonomy/useTaxonomy";
import { fetchListings } from "@/lib/fetchListings";
import { useEffect, useState } from "react";
import { PiSlidersHorizontalThin } from "react-icons/pi";
import { categoriesConfig } from "@/taxonomy/categoriesConfig";
import { useLocation } from "react-router-dom";
import { categoryFilters } from "@/filters";
import LocationBar from "@/Components/LocationBar";
import NavBar from "@/Components/NavBar";

// À remplacer dans AnnoncesPage.tsx
interface Listing {
  id: string;
  title: string;
  description?: string;
  price: number;
  category_slug: string;
  subcategory_slug: string | null;
  typevente?: string | null; // ← changement (minuscules)
  typebien?: string | null; // ← changement (minuscules)
  etatdubien?: string | null; // ← changement (minuscules)
  surface?: number | null;
  pieces?: number | null; // ← ajout
  meuble?: boolean | null; // ← ajout
  annee?: number | null; // ← ajout
  kilometrage?: number | null; // ← ajout
  carburant?: string | null; // ← ajout
  boite?: string | null; // ← ajout
  rooms?: number | null; // ← ajout
  chambres?: number | null; // ← ajout
  user_id?: string | null; // ← ajout
  created_at: string;
}

export default function AnnoncesPage() {
  const { draft, setDraft, setFilter, applyFilters, resetFilters } =
    useTaxonomy();
  const location = useLocation();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentCategory = draft.category;
  const currentSubcategory = draft.subcategory;

  // FILTRES DYNAMIQUES

  let availableFilters: any[] = [];
  if (currentCategory && categoriesConfig[currentCategory]) {
    const categoryFilters = categoriesConfig[currentCategory].filters || [];
    const subcategoryFilters =
      currentSubcategory &&
      categoriesConfig[currentCategory].subcategories[currentSubcategory]
        ?.filters
        ? categoriesConfig[currentCategory].subcategories[currentSubcategory]
            .filters
        : [];
    availableFilters = [...categoryFilters, ...subcategoryFilters];
  }

  const excludedFilterNames =
    currentSubcategory &&
    categoriesConfig[currentCategory]?.subcategories[currentSubcategory]
      ?.excludeFilters
      ? categoriesConfig[currentCategory].subcategories[currentSubcategory]
          .excludeFilters
      : [];

  // FONCTIONS DE GESTION DES FILTRES
  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean,
  ) => {
    console.log("🟢 handleCheckboxChange", name, value, checked);
    const currentValues = draft.filters?.[name]
      ? draft.filters[name].split(",")
      : [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((v) => v !== value);

    setFilter(name, newValues.join(","));
  };

  const isValueSelected = (name: string, value: string): boolean => {
    const values = draft.filters?.[name] ? draft.filters[name].split(",") : [];
    return values.includes(value);
  };

  const handleApply = () => {
    console.log("🟢 Application des filtres");
    applyFilters();
    setShowFilters(false);
  };

  const handleOpenFilters = () => {
    setShowFilters(true);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      applyFilters(); // recharge immédiatement les annonces
    };
    window.addEventListener("locationChange", handleLocationChange);
    return () =>
      window.removeEventListener("locationChange", handleLocationChange);
  }, [applyFilters]);

  const SCROLL_TOP_OFFSET = 0; // ← modifie cette valeur comme tu veux
  const scrollToListingsTop = () => {
    window.scrollTo({
      top: SCROLL_TOP_OFFSET,
      behavior: "smooth", // ou "auto"
    });
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      // 🔥 Scroll automatique
      scrollToListingsTop();

      try {
        console.log(
          "🔵 Chargement listings avec URL:",
          location.pathname + location.search,
        );
        // ⏱️ AJOUT : Délai artificiel de 3000ms
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await fetchListings(draft);
        setListings(data || []);
      } catch (err) {
        console.error("❌ Erreur chargement listings:", err);
        setError("Erreur lors du chargement des annonces");
        setListings([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [location.pathname, location.search]);

  // Récupère le composant de filtres pour la catégorie courante
  const FiltersComponent = currentCategory
    ? categoryFilters[currentCategory as keyof typeof categoryFilters]
    : null;

  // Skeleton dynamique qui reproduit la structure exacte des annonces
  const ListingSkeleton = () => {
    // Fonction pour générer un nombre aléatoire de lignes (entre 3 et 10)
    const getRandomLineCount = () => Math.floor(Math.random() * 8) + 3;

    // Largeurs réalistes pour chaque type de champ
    const getRandomWidth = () => {
      const widths = ["w-1/3", "w-2/5", "w-1/2", "w-3/5", "w-2/3"];
      return widths[Math.floor(Math.random() * widths.length)];
    };

    return (
      <div className="border p-4 rounded shadow animate-pulse">
        {/* Titre */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

        {/* Description (parfois présente, parfois non) */}
        {Math.random() > 0.3 && (
          <>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
          </>
        )}

        <div className="mt-3 space-y-2">
          {/* Catégorie (toujours présente) */}
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>

          {/* Sous-catégorie (souvent présente) */}
          {Math.random() > 0.2 && (
            <div className="h-3 bg-gray-200 rounded w-2/5"></div>
          )}

          {/* Prix (toujours présent) */}
          <div className="h-5 bg-gray-200 rounded w-1/4 mt-2"></div>

          {/* Champs conditionnels - nombre variable */}
          {Array(getRandomLineCount())
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={`h-3 bg-gray-200 rounded ${getRandomWidth()}`}
              ></div>
            ))}
        </div>
      </div>
    );
  };

  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="p-4">
      <NavBar hasShadow={hasScrolled} />

      <div className="mx-auto mb-3 max-w-[1280px] justify-center px-4 sm:px-6 lg:px-8 ">
         {/* Pannneau Publicitaire*/}
      <div className="w-100 h-[200px] bg-[#e9e9eb]  mt-[120px] mb-2"
       style={{
                       // height: "clamp(20px,1.5vw,30px)",
                      }}>
        <span>Panneau Publicitaire</span>
        
      </div>
      {/* filtres pays et boutton filtres */}
      <div className="flex items-center gap-4 mb-4">
        {/* filtres pays  */}
        <div className="flex-grow">
          <LocationBar
            selectedCountries={
              draft.filters?.pays?.split(",").filter(Boolean) || []
            }
            selectedCities={
              draft.filters?.ville?.split(",").filter(Boolean) || []
            }
            selectedQuarters={
              draft.filters?.quartier?.split(",").filter(Boolean) || []
            }
            onCountriesChange={(codes) => setFilter("pays", codes.join(","))}
            onCitiesChange={(cities) => setFilter("ville", cities.join(","))}
            onQuartersChange={(quarters) =>
              setFilter("quartier", quarters.join(","))
            }
          />
        </div>

        {/* Boutton filtres */}
        <button
          onClick={handleOpenFilters}
          className="p-2 rounded bg-gray-200 hover:bg-gray-300 flex-shrink-0 mb-2"
        >
          <PiSlidersHorizontalThin size={20} />
        </button>
      </div>

      {/* Titre avec compteur (décalé en dessous) */}
      <h1 className="text-2xl mb-4">
        Annonces {!loading && listings.length > 0 && `(${listings.length})`}
      </h1>

      {/* OFFCANVAS */}
      <div
        className={`fixed top-0 right-0 h-full  bg-white shadow-lg  sm:w-full md:w-[62vw] lg:w-[38vw] max-w-md
          transform transition-transform duration-300 flex flex-col
          ${showFilters ? "translate-x-0" : "translate-x-full"} z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b flex-shrink-0">
          <h2 className="text-lg font-bold">Tous les Filtres</h2>
          <button onClick={() => setShowFilters(false)} className="text-xl">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 flex flex-col gap-4">
            {/* Catégorie */}
            <select
              value={draft.category || ""}
              onChange={(e) =>
                setDraft((d) => {
                  const currentFilters = d.filters || {};
                  // Conserver uniquement les filtres de localisation
                  const preservedFilters = {
                    pays: currentFilters.pays,
                  };
                  return {
                    ...d,
                    category: e.target.value,
                    subcategory: "",
                    filters: preservedFilters,
                    search: "",   // ← efface le paramètre search
                  };
                })
              }
              className="border p-2 rounded w-full"
            >
              <option value="">Toutes les catégories</option>  
              {Object.entries(categoriesConfig).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Sous-catégorie */}
            {draft.category && (
              <select
                value={draft.subcategory || ""}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, subcategory: e.target.value }))
                }
                className="border p-2 rounded w-full  "
              >
                <option value="">Tout</option>
                {Object.entries(
                  categoriesConfig[draft.category].subcategories,
                ).map(([key, sub]) => (
                  <option key={key} value={key}>
                    {sub.label}
                  </option>
                ))}
              </select>
            )}

            {/* FILTRES SPÉCIFIQUES À LA CATÉGORIE */}
            {FiltersComponent && (
              <FiltersComponent
                draft={draft}
                setFilter={setFilter}
                isValueSelected={isValueSelected}
                handleCheckboxChange={handleCheckboxChange}
                availableFilters={availableFilters}
                excludedFilterNames={excludedFilterNames} // ← nouvelle prop
              />
            )}
          </div>
        </div>

        {/* Boutons */}
        <div className="p-4 border-t flex-shrink-0">
          <div
            className="flex gap-2"
            style={{
              fontSize: "clamp(0.75em, 1.4vw, 2em)",
            }}
          >
            <button dir="ltr"
              onClick={resetFilters}
              className="px-4 py-2 rounded-s-lg border border-[#094171] text-[#094171] bg-white hover:bg-gray-100 transition flex-1"
            >
              Réinitialiser
            </button>
            <button dir="rtl"
              onClick={handleApply}
              className="flex-1 bg-[#f56c2a] text-white px-4 py-2 rounded-s-lg hover:bg-[#e55b19] transition"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {showFilters && (
        <div
          onClick={() => setShowFilters(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}

      {/* Listings */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {[...Array(6)].map((_, index) => (
            <ListingSkeleton key={index} />
          ))}
        </div>
      ) : !loading && listings.length === 0 && !error ? (
        <p className="text-center py-8 text-gray-500">
          Aucune annonce trouvée.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {listings.map((listing) => (
            <li
              key={listing.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="font-bold text-lg">{listing.title}</h2>
              {listing.description && (
                <p className="text-gray-600 mt-1">{listing.description}</p>
              )}

              <div className="mt-3 space-y-1">
                {/* Infos de base toujours affichées */}
                <p className="text-sm">
                  <span className="font-semibold">Catégorie:</span>{" "}
                  {listing.category_slug}
                </p>
                {listing.subcategory_slug && (
                  <p className="text-sm">
                    <span className="font-semibold">Sous-catégorie:</span>{" "}
                    {listing.subcategory_slug}
                  </p>
                )}

                {/* Prix */}
                <p className="text-lg font-bold text-blue-600 mt-2">
                  {listing.price?.toLocaleString("fr-FR")} €
                </p>

                {/* Champs conditionnels - n'apparaissent que s'ils ont une valeur */}
                {listing.typevente && (
                  <p className="text-sm">
                    <span className="font-semibold">Type de vente:</span>{" "}
                    {listing.typevente}
                  </p>
                )}

                {listing.typebien && (
                  <p className="text-sm">
                    <span className="font-semibold">Type de bien:</span>{" "}
                    {listing.typebien}
                  </p>
                )}

                {listing.etatdubien && (
                  <p className="text-sm">
                    <span className="font-semibold">État du bien:</span>{" "}
                    {listing.etatdubien}
                  </p>
                )}

                {listing.surface && (
                  <p className="text-sm">
                    <span className="font-semibold">Surface:</span>{" "}
                    {listing.surface} m²
                  </p>
                )}

                {listing.pieces && (
                  <p className="text-sm">
                    <span className="font-semibold">Pièces:</span>{" "}
                    {listing.pieces}
                  </p>
                )}

                {listing.rooms && (
                  <p className="text-sm">
                    <span className="font-semibold">Nombre de pièces:</span>{" "}
                    {listing.rooms}
                  </p>
                )}

                {listing.meuble !== null && listing.meuble !== undefined && (
                  <p className="text-sm">
                    <span className="font-semibold">Meublé:</span>{" "}
                    {listing.meuble ? "Oui" : "Non"}
                  </p>
                )}

                {listing.annee && (
                  <p className="text-sm">
                    <span className="font-semibold">Année:</span>{" "}
                    {listing.annee}
                  </p>
                )}

                {listing.kilometrage && (
                  <p className="text-sm">
                    <span className="font-semibold">Kilométrage:</span>{" "}
                    {listing.kilometrage.toLocaleString("fr-FR")} km
                  </p>
                )}

                {listing.carburant && (
                  <p className="text-sm">
                    <span className="font-semibold">Carburant:</span>{" "}
                    {listing.carburant}
                  </p>
                )}

                {listing.boite && (
                  <p className="text-sm">
                    <span className="font-semibold">Boîte:</span>{" "}
                    {listing.boite}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>

     
    </div>
  );
}
