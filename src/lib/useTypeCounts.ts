// hooks/useTypeCounts.ts
import { useState, useEffect } from "react";
import { fetchTypeCounts } from "@/lib/fetchTypeCounts";

export function useTypeCounts(
  category: string | null,
  subcategory: string | null,
  filters: Record<string, string>,
  currentType: string | null
) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category || !subcategory) {
      setCounts({});
      return;
    }

    let isMounted = true;

    async function loadCounts() {
      setLoading(true);
      try {
        const data = await fetchTypeCounts(
          category,
          subcategory,
          filters,
          currentType
        );
        if (isMounted) {
          setCounts(data);
        }
      } catch (error) {
        console.error("Erreur chargement comptes:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCounts();

    return () => {
      isMounted = false;
    };
  }, [category, subcategory, filters, currentType]);

  return { counts, loading };
}