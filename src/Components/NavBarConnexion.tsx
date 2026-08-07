import { useState, useEffect } from "react";
import "./NavBarConnexion.css";
import { Link } from "react-router-dom";

// Interface pour les props
interface NavBarProps {
  hasShadow?: boolean;
}

function NavBarConnexion({ hasShadow = false }: NavBarProps) {
  const [internalHasScrolled, setInternalHasScrolled] =
    useState<boolean>(false);

  useEffect(() => {
    if (hasShadow === undefined || hasShadow === false) {
      const handleScroll = () => {
        setInternalHasScrolled(window.scrollY > 10);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [hasShadow]);

  const showShadow = hasShadow !== undefined ? hasShadow : internalHasScrolled;

  return (
    <div>
      <header
        className={`fixed top-0 z-50 w-full border-b border-gray-200 bg-white transition-shadow duration-300 ${
          showShadow ? "shadow-lg" : "shadow-sm"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 h-16 items-center">
            
            {/* Flèche à gauche */}
            <div className="flex justify-start">
              <Link
                to="/"
                className="flex items-center gap-3 group focus:outline-none"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor"
                  className="w-8 h-8 text-[#f56c2a] group-hover:-translate-x-1 transition-transform duration-200"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
                  />
                </svg>
              </Link>
            </div>

            {/* Logo au centre */}
            <div className="flex justify-center">
              <span className="text-[#f56c2a] text-3xl font-extrabold tracking-tighter">
                Wazza
              </span>
            </div>

            {/* Espace vide à droite pour équilibrer */}
            <div className="flex justify-end">
              {/* Vous pouvez ajouter d'autres éléments ici si besoin */}
            </div>
            
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBarConnexion;