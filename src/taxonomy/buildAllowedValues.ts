import { categoriesConfig } from "@/taxonomy/categoriesConfig";

export function buildAllowedCategoryValues() {
  return Object.keys(categoriesConfig);
}

export function buildAllowedSubcategoryValues() {
  const subs: string[] = [];

  for (const category of Object.values(categoriesConfig)) {
    if (category.subcategories) {
      subs.push(...Object.keys(category.subcategories));
    }
  }

  return subs;
}