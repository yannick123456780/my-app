export function parseTaxonomy(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);

  return {
    category: parts[0] || "",
    subcategory: parts[1] || "",
  };
}