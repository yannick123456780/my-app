export function extractTaxonomy(params: URLSearchParams) {
  const filters: Record<string, string> = {};

  params.forEach((value, key) => {
    filters[key] = value;
  });

  return {
    category: params.get("category") || "",
    subcategory: params.get("subcategory") || "",
    filters,
  };
}