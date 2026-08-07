// taxonomy/useTaxonomy.ts
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { validateUrlParams } from "@/taxonomy/validateUrl";
import { extractTaxonomy } from "@/taxonomy/extractTaxonomy";

const rootFields = [
  "category",
  "subcategory",
  "priceMin",
  "priceMax",
  "surfaceMin",
  "surfaceMax",
  "surfaceterrainMin",
  "surfaceterrainMax",
  "roomsMin",
  "roomsMax",
  "chambresMin",
  "chambresMax",


  //"search",
  "search",

  "anneeMin",
  "anneeMax",
  "kilometrageMin",
  "kilometrageMax",
  "surfacebureauxcommercesMin",
  "surfacebureauxcommercesMax",
  "mensualitefinancementMin",
  "mensualitefinancementMax",
  "puissancedinMin",
  "puissancedinMax",
  "puissancefiscaleMin",
  "puissancefiscaleMax",
  "cylindreeMin",
  "cylindreeMax",
];

function extractParams(search: string) {
  const params = new URLSearchParams(search);
  const filters: Record<string, string> = {};

  params.forEach((value, key) => {
    filters[key] = value;
  });

  // 🔥 NOUVEAU : injecter le pays depuis localStorage si absent dans l'URL
  if (!filters.pays) {
    const savedCountry = localStorage.getItem("userCountry");
    if (savedCountry) {
      try {
        const { code } = JSON.parse(savedCountry);
        if (code) {
          filters.pays = code;
        }
      } catch (e) {
        console.warn("Erreur parsing userCountry", e);
      }
    }
  }

  const draft: any = { filters };

  rootFields.forEach((field) => {
    draft[field] = params.get(field) || "";
  });

  return draft;
}

export function useTaxonomy() {
  const location = useLocation();
  const navigate = useNavigate();





  // useTaxonomy.ts (ajout d’un useEffect)
useEffect(() => {
  const params = new URLSearchParams(location.search);
  let needUpdate = false;

  // Si pas de paramètre "pays" dans l'URL, on le prend depuis localStorage
  if (!params.has("pays")) {
    const savedCountry = localStorage.getItem("userCountry");
    if (savedCountry) {
      try {
        const { code } = JSON.parse(savedCountry);
        if (code) {
          params.set("pays", code);
          needUpdate = true;
        }
      } catch (e) {}
    }
  }

  if (needUpdate) {
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }
}, []); // ne s’exécute qu’au montage












  const [taxonomy, setTaxonomy] = useState(() =>
    extractTaxonomy(new URLSearchParams(location.search)),
  );

  const [draft, setDraft] = useState(() => extractParams(location.search));

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // 1. VALIDATION STRICTE
    const validation = validateUrlParams(params);

    // 2. SI ERREUR → 404 DIRECT
    if (!validation.valid) {
      navigate("/404", {
        replace: true,
        state: validation, // optionnel debug
      });
      return;
    }

    // 3. SI OK → UPDATE STATE
    setTaxonomy(extractTaxonomy(params));
  }, [location.search]);

  // Synchronisation quand l'URL change
  useEffect(() => {
    setDraft(extractParams(location.search));
  }, [location.search]);

 useEffect(() => {
  setDraft(extractParams(location.search));
}, [location.search]);

  function applyFilters() {
    const search = new URLSearchParams();

    // Champs racine
    rootFields.forEach((field) => {
      const value = draft[field];
      if (value) search.set(field, value);
    });

    // Filtres dynamiques
    Object.entries(draft.filters).forEach(([key, value]) => {
      if (value && !rootFields.includes(key)) {
        search.set(key, value);
      }
    });

    navigate("/listings?" + search.toString());
  }

  function setFilter(name: string, value: string) {
    setDraft((prev: any) => {
      if (rootFields.includes(name)) {
        return {
          ...prev,
          [name]: value,
          filters: prev.filters,
        };
      }

      return {
        ...prev,
        filters: { ...prev.filters, [name]: value },
      };
    });
  }

  function resetFilters() {
    setDraft((prev: any) => {
      // Réinitialiser tous les champs
      const cleared: any = { ...prev, filters: {} };
      rootFields.forEach((field) => {
        if (field !== "category" && field !== "subcategory") {
          cleared[field] = "";
        }
      });

      // Conserver uniquement le pays s'il existe
      if (prev.filters?.pays) {
        cleared.filters = { pays: prev.filters.pays };
      }

      // Construire l'URL avec le nouveau draft
      const search = new URLSearchParams();
      rootFields.forEach((field) => {
        const value = cleared[field];
        if (value) search.set(field, value);
      });
      Object.entries(cleared.filters).forEach(([key, value]) => {
        if (value && !rootFields.includes(key)) {
          search.set(key, value);
        }
      });

      // Navigation immédiate
      navigate("/listings?" + search.toString());

      return cleared;
    });
  }

  return { draft, setDraft, setFilter, applyFilters, resetFilters };
}
