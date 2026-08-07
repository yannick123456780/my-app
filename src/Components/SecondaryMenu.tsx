import { Link } from "react-router-dom";
import { categoriesConfig } from "@/taxonomy/categoriesConfig";

export default function SecondaryMenu() {
  return (
    <div className="flex gap-6">
      {Object.entries(categoriesConfig).map(([slug, cat]) => (
        <div key={slug} className="group relative">
          <Link to={`/${slug}`}>
            {cat.label}
          </Link>

          <div className="absolute hidden group-hover:block bg-white shadow p-4">
            {Object.entries(cat.subcategories).map(([subSlug, sub]) => (
              <div key={subSlug}>
                <Link to={`/${slug}/${subSlug}`}>
                  {sub.label}
                </Link>
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}