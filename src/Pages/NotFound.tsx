// src/pages/404.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-white font-sans antialiased"
      style={{
        fontSize: "clamp(10px, 1.3vw, 15px)",
      }}
    >
      {/* Header with React Router Links */}
      <header
        className="border-b border-gray-200 bg-white"
        style={{
          fontSize: "clamp(10px, 1.3vw, 15px)",
        }}
      >
        <div
          className="container mx-auto px-4 py-4 flex justify-between items-center"
          style={{
            fontSize: "clamp(10px, 1.3vw, 15px)",
          }}
        >
          <Link
            to="/"
            className="text-2xl font-bold text-[#FF670A] tracking-tight"
            style={{
              fontSize: "clamp(10px, 1.3vw, 15px)",
            }}
          >
            Wazza
          </Link>
          <nav className="hidden md:block">
            <ul
              className="flex space-x-6 text-gray-700 font-medium"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              <li className=""
              style={{
                            fontSize: "clamp(10px, 1.3vw, 15px)",
                          }}>
                <Link
                  to="/"
                  className="hover:text-[#FF670A] transition-colors"
                  style={{
                    fontSize: "clamp(10px, 1.3vw, 15px)",
                  }}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/deposer"
                  className="hover:text-[#FF670A] transition-colors"
                  style={{
                    fontSize: "clamp(10px, 1.3vw, 15px)",
                  }}
                >
                  Déposer une annonce
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main 404 content */}
      <main
        className="container mx-auto px-4 py-16 md:py-24"
        style={{
          fontSize: "clamp(10px, 1.3vw, 15px)",
        }}
      >
        <div
          className="max-w-4xl mx-auto text-center"
          style={{
            fontSize: "clamp(10px, 1.3vw, 15px)",
          }}
        >
          {/* 404 heading */}
          <div
            className="mb-8"
            style={{
              fontSize: "clamp(10px, 1.3vw, 15px)",
            }}
          >
            <h1
              className="text-8xl md:text-9xl font-extrabold text-[#FF670A] tracking-tighter opacity-90"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              404
            </h1>
          </div>

          {/* Hero message */}
          <div
            className="mb-12"
            style={{
              fontSize: "clamp(10px, 1.3vw, 15px)",
            }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Perdu dans les RAYONS !
            </h2>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Désolé, on a cherché dans tous les coins, on n'a pas trouvé la
              bonne page. Vous aurez sûrement plus de chance en regardant par
              ici :
            </p>
          </div>

          {/* Category grid - all using Link */}
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16"
            style={{
              fontSize: "clamp(10px, 1.3vw, 15px)",
            }}
          >
            <Link
              to="/listings?category=immobilier"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Immobilier
            </Link>
            <Link
              to="/listings?category=vacances"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Vacances
            </Link>
            <Link
              to="/listings?category=vehicules"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Véhicules
            </Link>
            <Link
              to="/listings?category=emploi"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Emploi
            </Link>
            <Link
              to="/listings?category=mode"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Mode
            </Link>
            <Link
              to="/listings?category=maison-jardin"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Maison & Jardin
            </Link>
            <Link
              to="/listings?category=famille"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Famille
            </Link>
            <Link
              to="/listings?category=electronique"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Électronique
            </Link>
            <Link
              to="/listings?category=loisirs"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Loisirs
            </Link>
            <Link
              to="/listings?category=autres"
              className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium py-3 px-4 rounded-lg transition text-center shadow-sm hover:shadow-md"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Autres
            </Link>
          </div>

          {/* Return home link */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center text-[#FF670A] hover:text-[#FF8A3C] font-semibold text-lg transition-colors group"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform"
                style={{
                  fontSize: "clamp(10px, 1.3vw, 15px)",
                }}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t border-gray-200 bg-white mt-auto"
        style={{
          fontSize: "clamp(10px, 1.3vw, 15px)",
        }}
      >
        <div
          className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm"
          style={{
            fontSize: "clamp(10px, 1.3vw, 15px)",
          }}
        >
          <p
            className=""
            style={{
              fontSize: "clamp(10px, 1.3vw, 15px)",
            }}
          >
            &copy; 2026 leboncoin. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
