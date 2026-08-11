import { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/Contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { HiOutlineHome } from "react-icons/hi";
import { IoCarOutline } from "react-icons/io5";
import { GiSurferVan } from "react-icons/gi";
import { MdWorkOutline } from "react-icons/md";
import { GiClothes } from "react-icons/gi";
import { MdOutlineChair } from "react-icons/md";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";

interface Country {
  code: string;
  name: string;
}

// Interface pour les props
interface NavBarProps {
  hasShadow?: boolean;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface NavBarProps {
  hasShadow?: boolean;
}

function NavBar({ hasShadow = false }: NavBarProps) {
  // Dans le composant NavBar, après les states existants
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    const savedCountry = localStorage.getItem("userCountry");
    if (savedCountry) {
      try {
        return JSON.parse(savedCountry);
      } catch {
        return { code: "FR", name: "France" }; // 🔁 ici
      }
    }
    // 🔥 écrire la valeur par défaut dans localStorage
    const defaultCountry = { code: "FR", name: "France" }; // 🔁 ici
    localStorage.setItem("userCountry", JSON.stringify(defaultCountry));
    return defaultCountry;
  });

  const [tempCountry, setTempCountry] = useState<Country>(selectedCountry);

  const countries: Country[] = [
    { code: "FR", name: "France" },
    { code: "BE", name: "Belgique" },
    { code: "CH", name: "Suisse" },
    { code: "LU", name: "Luxembourg" },
  ];

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

  const [searchQuery, setSearchQuery] = useState("");

  const { user, profile } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRefProfil = useRef<HTMLDivElement>(null);

  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenMenu = (menuId: number) => {
    setOpenMenu(menuId);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRefProfil.current &&
        !userMenuRefProfil.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Langue & devise
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("userLanguage");
    if (savedLanguage) {
      try {
        return JSON.parse(savedLanguage);
      } catch {
        return { code: "fr", name: "Français", flag: "🇫🇷" };
      }
    }
    return { code: "fr", name: "Français", flag: "🇫🇷" };
  });

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => {
    const savedCurrency = localStorage.getItem("userCurrency");
    if (savedCurrency) {
      try {
        return JSON.parse(savedCurrency);
      } catch {
        return { code: "EUR", symbol: "€", name: "Euro" };
      }
    }
    return { code: "EUR", symbol: "€", name: "Euro" };
  });

  const [tempLanguage, setTempLanguage] = useState<Language>(selectedLanguage);
  const [tempCurrency, setTempCurrency] = useState<Currency>(selectedCurrency);
  const [showLanguageCurrency, setShowLanguageCurrency] =
    useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hasChanges =
    tempLanguage.code !== selectedLanguage.code ||
    tempCurrency.code !== selectedCurrency.code;

  const languages: Language[] = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  const currencies: Currency[] = [
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "RUB", symbol: "₽", name: "Russian Ruble" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguageCurrency(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dans la fonction handleSavePreferences, ajouter la sauvegarde du pays
  const handleSavePreferences = () => {
    if (!hasChanges && tempCountry.code === selectedCountry.code) return;
    setSelectedLanguage(tempLanguage);
    setSelectedCurrency(tempCurrency);
    setSelectedCountry(tempCountry);
    localStorage.setItem("userLanguage", JSON.stringify(tempLanguage));
    localStorage.setItem("userCurrency", JSON.stringify(tempCurrency));
    localStorage.setItem("userCountry", JSON.stringify(tempCountry));
    setShowLanguageCurrency(false);

    // Déclencher un événement personnalisé pour informer les autres composants
    window.dispatchEvent(new Event("countryChanged"));

    console.log("Préférences sauvegardées:", {
      language: tempLanguage,
      currency: tempCurrency,
      country: tempCountry,
    });

    // Après avoir sauvegardé dans localStorage
    const currentPath = location.pathname;
    const currentSearch = new URLSearchParams(location.search);
    currentSearch.set("pays", tempCountry.code);
    navigate(`${currentPath}?${currentSearch.toString()}`, { replace: true });
  };

  // ... (après les useEffect existants)

  const handleOpenDropdown = () => {
    setTempLanguage(selectedLanguage);
    setTempCurrency(selectedCurrency);
    setTempCountry(selectedCountry);
    setShowLanguageCurrency(!showLanguageCurrency);
  };

  // ... (le reste du composant)

  const buildListingUrl = (baseUrl: string) => {
    const savedCountry = localStorage.getItem("userCountry");

    if (!savedCountry) return baseUrl;

    try {
      const country = JSON.parse(savedCountry);
      if (!country.code) return baseUrl;

      const url = new URL(baseUrl, window.location.origin);

      // 🔥 on ajoute le pays
      url.searchParams.set("pays", country.code);

      return url.pathname + url.search;
    } catch {
      return baseUrl;
    }
  };

  // ========== NOUVEAUX ÉTATS POUR LE MENU MOBILE ==========
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileLangCurrency, setShowMobileLangCurrency] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fermeture du menu mobile au clic extérieur
  useEffect(() => {
    const handleClickOutsideMobile = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        isMobileMenuOpen
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMobile);
  }, [isMobileMenuOpen]);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSearchQuery(params.get("search") || "");
  }, [location.search]);

  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  useEffect(() => {
    console.log("Historique chargé :", searchHistory);
  }, [searchHistory]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");

    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch {
        setSearchHistory([]);
      }
    }
  }, []);

  const saveSearchToHistory = (query: string) => {
    if (!query.trim()) return;

    const normalized = query.trim();

    const updatedHistory = [
      normalized,
      ...searchHistory.filter(
        (item) => item.toLowerCase() !== normalized.toLowerCase(),
      ),
    ].slice(0, 10); // max 10 suggestions

    setSearchHistory(updatedHistory);
    console.log("Historique sauvegardé :", updatedHistory);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const removeSearchHistoryItem = (itemToRemove: string) => {
    const updatedHistory = searchHistory.filter(
      (item) => item !== itemToRemove,
    );

    setSearchHistory(updatedHistory);

    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleSearch = () => {
    const currentParams = new URLSearchParams(location.search);
    const newParams = new URLSearchParams();

    let pays = currentParams.get("pays");

    if (!pays) {
      const savedCountry = localStorage.getItem("userCountry");

      if (savedCountry) {
        try {
          const { code } = JSON.parse(savedCountry);

          if (code) pays = code;
        } catch (e) {}
      }
    }

    if (pays) {
      newParams.set("pays", pays);
    }

    if (searchQuery.trim()) {
      newParams.set("search", searchQuery.trim());

      // 🔥 sauvegarde historique
      saveSearchToHistory(searchQuery);
    }

    setShowSuggestions(false);

    navigate({
      pathname: "/listings",
      search: newParams.toString(),
    });
  };

  const filteredSuggestions =
    searchQuery.trim() === ""
      ? searchHistory
      : searchHistory.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(searchHistory);

  return (
    <header
      className={`fixed top-0 z-30 w-full left-0 border-b border-[#0940715f] bg-white transition-shadow duration-300 ${
        showShadow ? "shadow-lg" : "shadow-sm"
      }`}
    >
      {/* ========== HEADER DESKTOP (≥ md) ========== */}
      <div className="hidden md:block w-full mb-2 items-center ">
        <div className=" mx-auto max-w-[1280px] flex items-center justify-between h-[clamp(62px,6vw,88px)] px-[clamp(12px,2vw,32px)] gap-[clamp(10px,1.5vw,28px)] transition-all duration-300">
          {/* LOGO */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span
              className="text-[#f56c2a] font-black tracking-tighter leading-none whitespace-nowrap"
              style={{ fontSize: "clamp(2rem,3vw,3.6rem)" }}
            >
              Wazza
            </span>
          </Link>

          {/* BARRE DE RECHERCHE DESKTOP */}
          <div className="flex-1 min-w-0 flex justify-center">
            <div
              ref={searchRef}
              className="w-full max-w-[760px] flex items-center relative"
            >
              <input
                type="text"
                placeholder="Rechercher sur Wazza"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => setShowSuggestions(true)}
                onClick={() => setShowSuggestions(true)}
                className="w-full min-w-0 border  border-gray-300 bg-[#e9e9eb] rounded-l-[clamp(10px,1vw,16px)] outline-none transition-all focus:outline-none focus:ring-0 focus:border-gray-300"
                style={{
                  height: "clamp(42px,4.2vw,62px)",
                  paddingLeft: "clamp(14px,1.5vw,28px)",
                  paddingRight: "clamp(14px,1.5vw,28px)",
                  fontSize: "clamp(13px,1vw,20px)",
                  
                }}
              />

              <button
                onClick={handleSearch}
                className="flex-shrink-0 flex items-center justify-center bg-[#f56c2a] hover:bg-[#e45d1c] text-white rounded-r-[clamp(10px,1vw,16px)] transition-all"
                style={{
                  width: "clamp(52px,5vw,82px)",
                  height: "clamp(42px,4.2vw,62px)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "clamp(20px,1.7vw,34px)" }}
                >
                  search
                </span>
              </button>
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-2 overflow-hidden z-50">
                  {filteredSuggestions.map((item, index) => (
                    <div
                      key={index}
                      role="button"
                      tabIndex={0}
                      onMouseDown={(e) => {
                        e.preventDefault();

                        setSearchQuery(item);
                        setShowSuggestions(false);

                        const currentParams = new URLSearchParams(
                          location.search,
                        );

                        let pays = currentParams.get("pays");

                        if (!pays) {
                          const savedCountry =
                            localStorage.getItem("userCountry");

                          if (savedCountry) {
                            try {
                              pays = JSON.parse(savedCountry).code;
                            } catch {}
                          }
                        }

                        const newParams = new URLSearchParams();

                        if (pays) {
                          newParams.set("pays", pays);
                        }

                        newParams.set("search", item);

                        navigate({
                          pathname: "/listings",
                          search: newParams.toString(),
                        });
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-gray-500">
                          history
                        </span>

                        <span className="text-gray-700">{item}</span>
                      </div>

                      <button
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();

                          const updated = searchHistory.filter(
                            (historyItem) => historyItem !== item,
                          );

                          setSearchHistory(updated);

                          localStorage.setItem(
                            "searchHistory",
                            JSON.stringify(updated),
                          );
                          removeSearchHistoryItem(item);
                        }}
                        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <span className="material-symbols-outlined text-gray-500 text-[20px]">
                          close
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS DESKTOP (inchangées) */}
          <div className="flex items-center flex-shrink-0 gap-[clamp(10px,1.3vw,24px)]">
            {/* VENDRE */}
            <Link
              to="/adlisting"
              className="hidden md:flex items-center justify-center bg-[#f56c2a] hover:bg-[#e55b19] text-white font-bold whitespace-nowrap flex-shrink transition-all duration-200"
              style={{
                height: "clamp(40px,4vw,54px)",
                paddingLeft: "clamp(10px,1.2vw,22px)",
                paddingRight: "clamp(10px,1.2vw,22px)",
                gap: "clamp(4px,0.5vw,10px)",
                borderRadius: "clamp(10px,1vw,16px)",
                fontSize: "clamp(10px,0.8vw,15px)",
              }}
            >
              {/* Cercle blanc avec + */}
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span
                  className="material-symbols-outlined text-[#f24d3d]"
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  add
                </span>
              </div>

              {/* Texte */}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                }}
                className="whitespace-nowrap font-semibold"
              >
                Publier une annonce
              </span>
            </Link>

            {/* FAVORIS */}
            <Link
              to="/favorite"
              className="flex flex-col items-center justify-center text-[#1f2937] whitespace-nowrap group transition-all "
              style={{ gap: "clamp(2px,0.3vw,6px)" }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "clamp(20px,1.5vw,30px)" }}
              >
                favorite
              </span>
              <span
                className="whitespace-nowrap  border-b-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                style={{ fontSize: "clamp(11px,0.8vw,15px)" }}
              >
                Favoris
              </span>
            </Link>

            {/* MESSAGES */}
            <Link
              to="/messages"
              className="flex flex-col items-center justify-center text-[#1f2937] whitespace-nowrap group transition-all"
              style={{ gap: "clamp(2px,0.3vw,6px)" }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "clamp(20px,1.5vw,30px)" }}
              >
                chat
              </span>
              <span
                className="whitespace-nowrap  border-b-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                style={{ fontSize: "clamp(11px,0.8vw,15px)" }}
              >
                Messages
              </span>
            </Link>

            {/* PROFIL (connecté) */}
            {user ? (
              <div
                ref={userMenuRefProfil}
                className="relative flex flex-col items-center justify-center flex-shrink-0 transition-all"
                style={{ gap: "clamp(2px,0.3vw,6px)" }}
              >
                <button
                  className="flex flex-col items-center group"
                  onClick={() => setShowUserMenu((v) => !v)}
                >
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      className="rounded-full object-cover border-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                      style={{
                        width: "clamp(20px,1.5vw,30px)",
                        height: "clamp(20px,1.5vw,30px)",
                      }}
                      alt={profile?.username || "Profil"}
                    />
                  ) : (
                    <div
                      className="text-white rounded-full flex items-center justify-center font-bold border-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                      style={{
                        backgroundColor: profile?.color_code || "#f56c2a",
                        width: "clamp(20px,1.5vw,30px)",
                        height: "clamp(20px,1.5vw,30px)",
                        fontSize: "clamp(11px,0.8vw,15px)", // taille de police pour la lettre
                      }}
                    >
                      {profile?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span
                    className="whitespace-nowrap border-b-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                    style={{ fontSize: "clamp(11px,0.8vw,15px)" }}
                  >
                    {profile?.username || "Profil"}
                  </span>
                </button>
                {showUserMenu && (
                  <div
                    className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
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
                className="flex flex-col items-center justify-center whitespace-nowrap group transition-all"
                style={{ gap: "clamp(2px,0.3vw,6px)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "clamp(20px,1.5vw,30px)" }}
                >
                  person
                </span>
                <span
                  className="whitespace-nowrap border-b-2 border-transparent group-hover:border-[#f56c2a] transition-all"
                  style={{ fontSize: "clamp(11px,0.8vw,15px)" }}
                >
                  Se connecter
                </span>
              </Link>
            )}

            {/* LANGUE PAYS DEVISE / DEVISE DESKTOP */}
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                onClick={handleOpenDropdown}
                className="flex items-center justify-center hover:bg-gray-100 rounded-lg transition-all duration-200"
                style={{
                  gap: "clamp(2px,0.4vw,8px)",
                  padding: "clamp(4px,0.5vw,8px) clamp(6px,0.7vw,12px)",
                }}
                aria-label="Changer la langue et la devise"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "clamp(18px,1.4vw,28px)" }}
                >
                  language
                </span>
                <span
                  className={`material-symbols-outlined text-gray-500 transition-transform duration-200 ${
                    showLanguageCurrency ? "rotate-180" : ""
                  }`}
                  style={{ fontSize: "clamp(16px,1.1vw,22px)" }}
                >
                  expand_more
                </span>
              </button>

              {showLanguageCurrency && (
                <div
                  className="absolute top-full right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-y-auto z-[9999]"
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
                        style={{ fontSize: "clamp(14px,1vw,18px)" }}
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
                          style={{ fontSize: "clamp(18px,1.2vw,24px)" }}
                        >
                          close
                        </span>
                      </button>
                    </div>

                    {/* PAYS */}
                    <div className="mb-4">
                      <label
                        className="block font-medium text-gray-700 mb-2"
                        style={{ fontSize: "clamp(12px,0.9vw,15px)" }}
                      >
                        Pays
                      </label>
                      <select
                        id="pet-select"
                        value={tempCountry.code}
                        onChange={(e) => {
                          const selected = countries.find(
                            (c) => c.code === e.target.value,
                          );
                          if (selected) setTempCountry(selected);
                        }}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500"
                        style={{ fontSize: "clamp(12px,0.85vw,14px)" }}
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* LANGUE */}
                    <div className="mb-4">
                      <label
                        className="block font-medium text-gray-700 mb-2"
                        style={{ fontSize: "clamp(12px,0.9vw,15px)" }}
                      >
                        Langue
                      </label>
                      <select
                        id="pet-select"
                        value={tempLanguage.code}
                        onChange={(e) => {
                          const selected = languages.find(
                            (l) => l.code === e.target.value,
                          );
                          if (selected) setTempLanguage(selected);
                        }}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500"
                        style={{ fontSize: "clamp(12px,0.85vw,14px)" }}
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* DEVISE */}
                    <div className="mb-5">
                      <label
                        className="block font-medium text-gray-700 mb-2"
                        style={{ fontSize: "clamp(12px,0.9vw,15px)" }}
                      >
                        Devise
                      </label>
                      <select
                        id="pet-select"
                        value={tempCurrency.code}
                        onChange={(e) => {
                          const selected = currencies.find(
                            (c) => c.code === e.target.value,
                          );
                          if (selected) setTempCurrency(selected);
                        }}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500"
                        style={{ fontSize: "clamp(12px,0.85vw,14px)" }}
                      >
                        {currencies.map((curr) => (
                          <option key={curr.code} value={curr.code}>
                            {curr.symbol} {curr.code} - {curr.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* SÉLECTION COURANTE */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="bg-gray-50 rounded-xl mb-4 p-3">
                        <div
                          className="font-semibold text-gray-700 mb-1"
                          style={{ fontSize: "clamp(11px,0.85vw,14px)" }}
                        >
                          Sélection actuelle :
                        </div>
                        <div
                          className="text-gray-600"
                          style={{ fontSize: "clamp(11px,0.8vw,14px)" }}
                        >
                          {tempCountry.name} • {tempLanguage.flag}{" "}
                          {tempLanguage.name} • {tempCurrency.symbol}{" "}
                          {tempCurrency.code}
                        </div>
                      </div>

                      {/* BOUTONS */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setTempLanguage(selectedLanguage);
                            setTempCurrency(selectedCurrency);
                            setTempCountry(selectedCountry);
                            setShowLanguageCurrency(false);
                          }}
                          className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                          style={{ fontSize: "clamp(11px,0.85vw,14px)" }}
                        >
                          Annuler
                        </button>
                        <button
                          onClick={handleSavePreferences}
                          className="flex-1 py-2 px-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors"
                          style={{ fontSize: "clamp(11px,0.85vw,14px)" }}
                        >
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

      {/* ========== HEADER MOBILE (< md) ========== */}
      <div className="block md:hidden w-full mb-2">
        {/* Ligne hamburger + logo centré */}
        <div className="relative flex items-center justify-center px-4 py-3">
          {/* Hamburger en absolute à gauche */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="absolute left-4 flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          {/* Logo centré */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-[#f56c2a] font-black tracking-tighter leading-none text-3xl">
              Wazza
            </span>
          </Link>
        </div>
        {/* Barre de recherche en dessous */}
        <div className="px-4 pb-3">
          <div ref={searchRef} className="flex items-center w-full relative">
            <input
              type="text"
              placeholder="Rechercher sur Wazza"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => setShowSuggestions(true)}
              onClick={() => setShowSuggestions(true)}
              className="w-full min-w-0 border border-gray-300 bg-[#e9e9eb] rounded-l-[clamp(10px,1vw,16px)] focus:outline-none focus:ring-0 focus:border-gray-300 outline-none transition-all"
              style={{
                height: "clamp(42px,4.2vw,62px)",
                paddingLeft: "clamp(14px,1.5vw,28px)",
                paddingRight: "clamp(14px,1.5vw,28px)",
                fontSize: "clamp(13px,1vw,20px)",
              }}
            />

            <button
              onClick={handleSearch}
              className="flex-shrink-0 flex items-center justify-center bg-[#f56c2a] hover:bg-[#e45d1c] text-white rounded-r-[clamp(10px,1vw,16px)] transition-all"
              style={{
                width: "clamp(52px,5vw,82px)",
                height: "clamp(42px,4.2vw,62px)",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "clamp(20px,1.7vw,34px)" }}
              >
                search
              </span>
            </button>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-2 overflow-hidden z-50">
                {filteredSuggestions.map((item, index) => (
                  <div
                    key={index}
                    role="button"
                    tabIndex={0}
                    onMouseDown={(e) => {
                      e.preventDefault();

                      setSearchQuery(item);
                      setShowSuggestions(false);

                      const currentParams = new URLSearchParams(
                        location.search,
                      );

                      let pays = currentParams.get("pays");

                      if (!pays) {
                        const savedCountry =
                          localStorage.getItem("userCountry");

                        if (savedCountry) {
                          try {
                            pays = JSON.parse(savedCountry).code;
                          } catch {}
                        }
                      }

                      const newParams = new URLSearchParams();

                      if (pays) {
                        newParams.set("pays", pays);
                      }

                      newParams.set("search", item);

                      navigate({
                        pathname: "/listings",
                        search: newParams.toString(),
                      });
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-gray-500">
                        history
                      </span>

                      <span className="text-gray-700">{item}</span>
                    </div>

                    <button
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        const updated = searchHistory.filter(
                          (historyItem) => historyItem !== item,
                        );

                        setSearchHistory(updated);

                        localStorage.setItem(
                          "searchHistory",
                          JSON.stringify(updated),
                        );
                        removeSearchHistoryItem(item);
                      }}
                      className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <span className="material-symbols-outlined text-gray-500 text-[20px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== MENU LATÉRAL MOBILE (drawer) ========== */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            ref={mobileMenuRef}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-xl overflow-y-auto transform transition-transform duration-300 md:hidden"
          >
            <div className="p-5">
              {/* Bouton fermeture */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Actions du menu mobile */}
              <div className="flex flex-col gap-5">
                {/* VENDRE */}
                <Link
                  to="/adlisting"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full gap-3 p-3 rounded-xl bg-[#f56c2a] text-white font-bold"
                >
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-[#f24d3d]"
                      style={{ fontSize: "18px", fontWeight: 700 }}
                    >
                      add
                    </span>
                  </div>
                  <span
                    style={{ fontSize: "20px", fontWeight: 700 }}
                    className="whitespace-nowrap font-semibold"
                  >
                    Publier une annonce
                  </span>
                </Link>

                {/* FAVORIS */}
                <Link
                  to="/favorite"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors "
                >
                  <span className="material-symbols-outlined text-black">
                    favorite
                  </span>
                  <span className="">Favoris</span>
                </Link>

                {/* MESSAGES */}
                <Link
                  to="/messages"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-black">
                    chat
                  </span>
                  <span>Messages</span>
                </Link>

                {/* PROFIL / CONNEXION */}
                {user ? (
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-3 mb-3">
                      {profile?.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          className="w-12 h-12 rounded-full object-cover"
                          alt={profile.username ?? "Profil utilisateur"}
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                          style={{
                            backgroundColor: profile?.color_code || "#f56c2a",
                          }}
                        >
                          {profile?.username?.[0]?.toUpperCase() || "U"}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold">
                          {profile?.username || user.email}
                        </div>
                        <button
                          onClick={async () => {
                            await supabase.auth.signOut();
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-sm text-red-600"
                        >
                          Se déconnecter
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        /* redirection profil */ setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-xl hover:bg-gray-100"
                    >
                      Mon profil
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/connexion"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors border-t pt-4"
                  >
                    <span className="material-symbols-outlined text-black">
                      person
                    </span>
                    <span>Se connecter</span>
                  </Link>
                )}

                {/* LANGUE & DEVISE (sous-menu intégré) - Version avec selects */}
                <div className="border-t pt-4">
                  <button
                    onClick={() =>
                      setShowMobileLangCurrency(!showMobileLangCurrency)
                    }
                    className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-black">
                        language
                      </span>
                      <span>Langue & devise</span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400">
                      {showMobileLangCurrency ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {showMobileLangCurrency && (
                    <div className="mt-3 pl-2 space-y-4">
                      {/* PAYS */}
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">
                          Pays
                        </label>
                        <select
                          value={tempCountry.code}
                          onChange={(e) => {
                            const selected = countries.find(
                              (c) => c.code === e.target.value,
                            );
                            if (selected) setTempCountry(selected);
                          }}
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        >
                          {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* LANGUE */}
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">
                          Langue
                        </label>
                        <select
                          value={tempLanguage.code}
                          onChange={(e) => {
                            const selected = languages.find(
                              (l) => l.code === e.target.value,
                            );
                            if (selected) setTempLanguage(selected);
                          }}
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        >
                          {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.flag} {lang.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* DEVISE */}
                      <div>
                        <label className="block font-medium text-gray-700 mb-2 text-sm">
                          Devise
                        </label>
                        <select
                          value={tempCurrency.code}
                          onChange={(e) => {
                            const selected = currencies.find(
                              (c) => c.code === e.target.value,
                            );
                            if (selected) setTempCurrency(selected);
                          }}
                          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        >
                          {currencies.map((curr) => (
                            <option key={curr.code} value={curr.code}>
                              {curr.symbol} {curr.code} - {curr.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* SÉLECTION COURANTE */}
                      <div className="bg-gray-50 rounded-xl p-3 mt-2">
                        <div className="font-semibold text-gray-700 mb-1 text-xs">
                          Sélection actuelle :
                        </div>
                        <div className="text-gray-600 text-xs">
                          {tempCountry.name} • {tempLanguage.flag}{" "}
                          {tempLanguage.name} • {tempCurrency.symbol}{" "}
                          {tempCurrency.code}
                        </div>
                      </div>

                      {/* BOUTONS */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            setTempLanguage(selectedLanguage);
                            setTempCurrency(selectedCurrency);
                            setTempCountry(selectedCountry);
                            setShowMobileLangCurrency(false);
                          }}
                          className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors text-sm"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={() => {
                            handleSavePreferences();
                            setShowMobileLangCurrency(false);
                          }}
                          className="flex-1 py-2 px-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition-colors text-sm"
                        >
                          Sauvegarder
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* HEADER SECONDAIRE - Menu des catégories */}
      <nav
        ref={menuRef}
        className=" hidden md:flex mx-auto mb-3 max-w-[1280px] justify-center  "
        style={{
          fontSize: "clamp(12px, 1vw, 16px)",
        }}
      >
        <ul className="flex justify-around items-  flex-wrap gap-4 w-full h-auto text-gray-700">
          {/* MENU IMMOBILIER */}
          <div
            className="group "
            onMouseEnter={() => handleOpenMenu(1)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Immobilier
            </button>
            {openMenu === 1 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-5 gap-6  text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col items-start gap-4 h-auto bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <HiOutlineHome
                        className="mb-2"
                        size={20}
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      />
                      <span
                        className="font-semibold text-gray-900 text-base mb-1"
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      >
                        Immobilier
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="mb-3">
                      <Link
                        to={buildListingUrl("/listings/?category=immobilier")}
                        className=" hover:text-[#f56c2a] font-semibold text-gray-900 "
                        style={{
                          height: "clamp(42px,4.2vw,62px)",
                          fontSize: "clamp(13px,1.2vw,20px)",
                          marginBottom: "clamp(13px,1.2vw,20px)",
                        }}
                      >
                        Tout Immobilier
                      </Link>
                    </h4>
                    <Link
                      to={buildListingUrl(
                        "/listings/?category=immobilier&subcategory=ventes-immobilieres",
                      )}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a] "
                      style={{
                        height: "clamp(42px,4.2vw,62px)",
                        fontSize: "clamp(13px,1.2vw,20px)",
                        marginBottom: "clamp(13px,1.2vw,20px)",
                      }}
                    >
                      Ventes immobilières
                    </Link>
                    <ul className="space-y-3 mt-3">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=ventes-immobilieres&typebien=appartement",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Appartement
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=ventes-immobilieres&typebien=maison",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Maison
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=ventes-immobilieres&typebien=terrain",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Terrain
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl(
                        "/listings/?category=immobilier&subcategory=immobilier-neuf",
                      )}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                      }}
                    >
                      Immobilier Neuf
                    </Link>
                    <ul className="space-y-3 mt-3">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=immobilier-neuf&typebien=appartement",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Appartement
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=immobilier-neuf&typebien=maison",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Maison
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=immobilier-neuf&typebien=programmes-logements-neufs",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Programmes logements neufs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=immobilier-neuf&typebien=promoteurs-immobiliers",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Promoteurs immobiliers
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl(
                        "/listings/?category=immobilier&subcategory=locations",
                      )}
                      className="font-semibold text-gray-900  hover:text-[#f56c2a]"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                      }}
                    >
                      Locations
                    </Link>
                    <ul className="space-y-3 mt-3">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=locations&typebien=chambre",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Chambre
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=locations&typebien=studio",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Studio
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=locations&typebien=appartement",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Appartement
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=locations&typebien=maison",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Maison
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=locations&typebien=parking",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Parking
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=immobilier&subcategory=locations&typebien=terrain",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Terrain
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <ul className="space-y-6">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=immobilier&subcategory=colocations",
                          )}
                          className="hover:text-[#f56c2a] font-semibold text-gray-900"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Colocations
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=immobilier&subcategory=bureaux-commerces",
                          )}
                          className="hover:text-[#f56c2a] font-semibold text-gray-900"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Bureaux & Commerces
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=autres&subcategory=services&typeservices=services-de-demenagement",
                          )}
                          className="hover:text-[#f56c2a] font-semibold text-gray-900"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Services de déménagement
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MENU VÉHICULES */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(2)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Véhicules
            </button>

            {openMenu === 2 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-a1 border-r pr-4 flex flex-col gap-4 bg-slate-100 ">
                    <div className="flex items-center gap-3 mt-5 px-3 ">
                      <IoCarOutline
                        className="mb-1"
                        size={20}
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      />
                      <span
                        className="font-semibold text-gray-900 text-base mb-1"
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      >
                        Véhicules
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="mb-3">
                      <Link
                        to={buildListingUrl("/listings/?category=vehicules")}
                        className="font-semibold text-gray-900 hover:text-[#f56c2a] "
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      >
                        Tout Véhicules
                      </Link>
                    </h4>

                    <Link
                      to={buildListingUrl(
                        "/listings/?category=vehicules&subcategory=voitures",
                      )}
                      className="font-semibold text-gray-900 mb-3 hover:text-[#f56c2a]"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                      }}
                    >
                      Voitures
                    </Link>
                    <ul className="space-y-3 mt-3">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=voitures&marque=toyota",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Toyota
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=voitures&marque=hyundai",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Hyundai
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=voitures&marque=bmw",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          BMW
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=voitures&marque=mercedes",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Mercedes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=voitures&marque=nissan",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Nissan
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=voitures&marque=volkswagen",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Volkswagen
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900 hover:text-[#f56c2a]">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=vehicules&subcategory=motos",
                        )}
                      >
                        Motos
                      </Link>
                    </h4>
                    <ul className="space-y-3 mt-3">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=motos&marque=bmw",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          BMW
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=motos&marque=honda",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Honda
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=motos&marque=kawasaki",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Kawasaki
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=motos&marque=suzuki",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Suzuki
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vehicules&subcategory=motos&marque=yamaha",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Yamaha
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <ul className="space-y-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=vehicules&subcategory=caravaning",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Caravaning
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=vehicules&subcategory=utilitaires",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Utilitaires
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=vehicules&subcategory=camions",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Camions
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=vehicules&subcategory=nautisme",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Nautisme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=velos",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Vélos
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <ul className="space-y-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=vehicules&subcategory=equipement-auto",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Équipement auto
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=vehicules&subcategory=equipement-moto",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Équipement moto
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=vehicules&subcategory=equipement-caravaning",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Équipement caravaning
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=vehicules&subcategory=equipement-nautisme",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Équipement nautisme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=equipements-velos",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Équipements vélos
                        </Link>
                      </li>
                      <li className="pt-3">
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=autres&subcategory=services&typeservices=reparations-mecaniques",
                          )}
                          className="font-semibold hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Services de réparations mécaniques
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MENU VACANCES */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(3)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Vacances
            </button>
            {openMenu === 3 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col gap-4 bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <GiSurferVan
                        className="mb-1"
                        size={20}
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      />
                      <span
                        className="font-semibold text-gray-900 text-base mb-1"
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      >
                        Vacances
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <Link
                      to={buildListingUrl("/listings/?category=vacances")}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                      }}
                    >
                      Tout Hébergements
                    </Link>

                    <Link
                      to={buildListingUrl(
                        "/listings/?category=vacances&subcategory=types-hebergements",
                      )}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a] block mt-5"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                      }}
                    >
                      Types d'hébergements
                    </Link>
                    <ul className="space-y-3 mt-3">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=types-hebergements&typebien=maisons-villas",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Maisons & Villas
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=types-hebergements&typebien=appartements",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Appartements
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=types-hebergements&typebien=chalets",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Chalets
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=types-hebergements&typebien=chambres-hotes",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Chambres d'hôtes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=types-hebergements&typebien=campings",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Campings
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl(
                        "/listings/?category=vacances&subcategory=caracteristiques",
                      )}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                      }}
                    >
                      Caractéristiques recherchées
                    </Link>
                    <ul className="space-y-3 mt-3">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=caracteristiques&typebien=piscine",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Piscine
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=caracteristiques&typebien=jardin",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Jardin
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=caracteristiques&typebien=animaux-acceptes",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Animaux acceptés
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl(
                        "/listings/?category=vacances&subcategory=voyageurs",
                      )}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                      }}
                    >
                      Nombre de voyageurs
                    </Link>
                    <ul className="space-y-3 mt-3">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=voyageurs&typebien=solo",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Solo
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=voyageurs&typebien=deux",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          À deux
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=voyageurs&typebien=quatre",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          À quatre
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=voyageurs&typebien=six",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          À six
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings?category=vacances&subcategory=voyageurs&typebien=plus-de-six",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                        >
                          Plus de six
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MENU EMPLOI */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(4)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Emploi
            </button>
            {openMenu === 4 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col gap-4 bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <MdWorkOutline
                        className="mb-1"
                        size={20}
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      />
                      <span
                        className="font-semibold text-gray-900 text-base mb-1"
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      >
                        Emploi
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl("/listings/?category=emploi")}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                      }}
                    >
                      Tout Emploi
                    </Link>

                    <div className="mt-11">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=emploi&subcategory=offres",
                        )}
                        className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      >
                        Offres d'emploi
                      </Link>
                      <ul className="space-y-3 mt-3">
                        <li>
                          <Link
                            to={buildListingUrl(
                              "/listings?category=emploi&subcategory=offres&typecontrat=interim",
                            )}
                            className="hover:text-[#f56c2a]"
                            style={{
                              fontSize: "clamp(10px, 1.3vw, 15px)",
                            }}
                          >
                            Intérim
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={buildListingUrl(
                              "/listings?category=emploi&subcategory=offres&typecontrat=cdi",
                            )}
                            className="hover:text-[#f56c2a]"
                            style={{
                              fontSize: "clamp(10px, 1.3vw, 15px)",
                            }}
                          >
                            CDI
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={buildListingUrl(
                              "/listings?category=emploi&subcategory=offres&typecontrat=cdd",
                            )}
                            className="hover:text-[#f56c2a]"
                            style={{
                              fontSize: "clamp(10px, 1.3vw, 15px)",
                            }}
                          >
                            CDD
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={buildListingUrl(
                              "/listings?category=emploi&subcategory=offres&typecontrat=benevolat",
                            )}
                            className="hover:text-[#f56c2a]"
                            style={{
                              fontSize: "clamp(10px, 1.3vw, 15px)",
                            }}
                          >
                            Bénévolat
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={buildListingUrl(
                              "/listings?category=emploi&subcategory=offres&typecontrat=autre",
                            )}
                            className="hover:text-[#f56c2a]"
                            style={{
                              fontSize: "clamp(10px, 1.3vw, 15px)",
                            }}
                          >
                            Autre (indépendant, apprentissage, stage...)
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5">
                    <ul className="space-y-5">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=emploi&subcategory=formations-professionnelles",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                         style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                        >
                          Formations professionnelles
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=emploi&subcategory=profil-candidat",
                          )}
                          className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                          style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                        >
                          Profil Candidat
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mode */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(5)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Mode
            </button>
            {openMenu === 5 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col gap-4 bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <GiClothes
                        className="mb-2"
                        size={20}
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      />
                      <span
                        className="font-semibold text-gray-900 text-base mb-1"
                        style={{
                          fontSize: "clamp(10px, 1.3vw, 15px)",
                        }}
                      >
                        Mode
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl("/listings/?category=mode")}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                    >
                      Tout Mode
                    </Link>

                    <ul className="space-y-4 mt-5">
                      <h4 className="font-semibold text-gray-900 ">
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=vetements",
                          )}
                          className="hover:text-[#f56c2a] "
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Vêtements
                        </Link>
                      </h4>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=vetements&univers=femme",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Femme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=vetements&univers=maternite",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Maternité
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=vetements&univers=homme",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Homme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=vetements&univers=enfant",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Enfant
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=mode&subcategory=chaussures",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Chaussures
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=chaussures&universchaussures=femme",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Femme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=chaussures&universchaussures=homme",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Homme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=chaussures&universchaussures=enfant",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Enfant
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=mode&subcategory=montres-bijoux",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Montres & Bijoux
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=montres-bijoux&universmontresbijoux=femme",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Femme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=montres-bijoux&universmontresbijoux=homme",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Homme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=montres-bijoux&universmontresbijoux=enfant",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Enfant
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=montres-bijoux&universmontresbijoux=mixte",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Mixte
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=mode&subcategory=accessoires-bagagerie",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Accessoires & Bagagerie
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=accessoires-bagagerie&universaccessoiresbagagerie=femme",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Femme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=accessoires-bagagerie&universaccessoiresbagagerie=homme",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Homme
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=accessoires-bagagerie&universaccessoiresbagagerie=enfant",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Enfant
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=accessoires-bagagerie&universaccessoiresbagagerie=mixte",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Mixte
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Maison & Jardin */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(6)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Maison & Jardin
            </button>
            {openMenu === 6 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col gap-4 bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <MdOutlineChair
                        size={20}
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      />
                      <span
                        className="font-semibold text-gray-900"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Maison & Jardin
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl("/listings/?category=maison-jardin")}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                    >
                      Tout Maison & Jardin
                    </Link>

                    <ul className="space-y-4 mt-5">
                      <h4 className="font-semibold text-gray-900">
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Ameublement
                        </Link>
                      </h4>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement&typeameublement=armoire",
                          )}
                        >
                          Armoire
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement&typeameublement=buffet",
                          )}
                        >
                          Buffet
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement&typeameublement=canapé",
                          )}
                        >
                          Canapé
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement&typeameublement=chaise-tabouret-banc",
                          )}
                        >
                          Chaise, tabouret & banc
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement&typeameublement=fauteuil",
                          )}
                        >
                          Fauteuil
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement&typeameublement=lit",
                          )}
                        >
                          Lit
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement&typeameublement=meuble-cuisine",
                          )}
                        >
                          Meuble de cuisine
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a] "
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=ameublement&typeameublement=table-salle-manger",
                          )}
                        >
                          Table de salle à manger
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="font-semibold hover:text-[#f56c2a] "
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=papeterie-fournitures-scolaires",
                          )}
                        >
                          Papeterie & Fournitures scolaires
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        to={buildListingUrl(
                          "/listings/?category=maison-jardin&subcategory=electromenager",
                        )}
                        className="hover:text-[#f56c2a]"
                      >
                        Électroménager
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=electromenager&typeelectromenager=aspirateur",
                          )}
                        >
                          Aspirateur
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=electromenager&typeelectromenager=congelateur",
                          )}
                        >
                          Congélateur
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=electromenager&typeelectromenager=four",
                          )}
                        >
                          Four
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=electromenager&typeelectromenager=lave-linge",
                          )}
                        >
                          Lave-linge
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=electromenager&typeelectromenager=lave-vaisselle",
                          )}
                        >
                          Lave-vaisselle
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=electromenager&typeelectromenager=micro-ondes",
                          )}
                        >
                          Micro-ondes
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=electromenager&typeelectromenager=refrigerateur",
                          )}
                        >
                          Réfrigérateur
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a] font-semibold"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=arts-table",
                          )}
                        >
                          Arts de la table
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=arts-table&typeartstable=assiette",
                          )}
                        >
                          Assiette
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=arts-table&typeartstable=service-vaisselle",
                          )}
                        >
                          Service de vaisselle
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          className="hover:text-[#f56c2a]"
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=arts-table&typeartstable=verre",
                          )}
                        >
                          Verre
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        to={buildListingUrl(
                          "/listings/?category=maison-jardin&subcategory=decoration",
                        )}
                        className="hover:text-[#f56c2a]"
                      >
                        Décoration
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=applique",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Applique
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=horloge-pendule-reveil",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Horloge, pendule et réveil
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=lampadaire",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Lampadaire
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=lampe-a-poser",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Lampe à poser
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=lustre",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Lustre
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=miroir",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Miroir
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=rideaux-voilage-store",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Rideaux, voilage et store
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=sculpture-statue",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Sculpture et statue
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=suspension",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Suspension
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=tableau-toile",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Tableau et toile
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=tapis",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Tapis
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=decoration&typedecoration=vase-cache-pot-ceramique",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Vase, cache pot et céramique
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        to={buildListingUrl(
                          "/listings/?category=maison-jardin&subcategory=linge-maison",
                        )}
                        className="hover:text-[#f56c2a]"
                      >
                        Linge de maison
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=linge-maison&typelinge=equipement-lit",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Équipement du lit
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=linge-maison&typelinge=deco-textile",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Déco textile
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=linge-maison&typelinge=linge-bain",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Linge de bain
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=linge-maison&typelinge=linge-lit",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Linge de lit
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=linge-maison&typelinge=linge-table",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Linge de table
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=linge-maison&typelinge=autre",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Autre
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=bricolage",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Bricolage
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=jardin-plantes",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Jardin & Plantes
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=maison-jardin&subcategory=services-jardinerie-bricolage",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Services de jardinerie & bricolage
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Famille */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(7)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Famille
            </button>
            {openMenu === 7 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col gap-4 bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <MdOutlineFamilyRestroom
                        size={20}
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      />
                      <span
                        className="font-semibold text-gray-900"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Famille
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl("/listings/?category=famille")}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                    >
                      Tout Famille
                    </Link>

                    <ul className="space-y-4 mt-5">
                      <h4 className="font-semibold text-gray-900">
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=equipement-bebe",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Équipement bébé
                        </Link>
                      </h4>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=equipement-bebe&familleproduit=poussette",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Poussette
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=equipement-bebe&familleproduit=siege-auto",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Siège auto
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=famille&subcategory=mobilier-enfant",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Mobilier enfant
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=mobilier-enfant&mobilierenfantproduit=baignoire",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Baignoire
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=mobilier-enfant&mobilierenfantproduit=chaise-haute",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Chaise haute
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=mobilier-enfant&mobilierenfantproduit=lit-bebe",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Lit bébé
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=famille&subcategory=vetements-bebe",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Vêtements bébé
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=vetements-bebe&vetementsbebetaille=0-mois-50cm",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          0 mois / 50 cm
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=vetements-bebe&vetementsbebetaille=1-mois-56cm",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          1 mois / 56 cm
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=vetements-bebe&vetementsbebetaille=3-mois-62cm",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          3 mois / 62 cm
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=vetements-bebe&vetementsbebetaille=6-mois-68cm",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          6 mois / 68 cm
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=vetements-bebe&vetementsbebetaille=9-mois-74cm",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          9 mois / 74 cm
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=vetements-bebe&vetementsbebetaille=12-mois-80cm",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          12 mois / 80 cm
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=famille&subcategory=vetements-bebe&vetementsbebetaille=18-mois-86cm",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          18 mois / 86 cm
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=mode&subcategory=vetements&univers=enfant",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Vêtements enfants
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=vetements&univers=maternite",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Vêtements maternité
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=chaussures&universchaussures=enfant",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Chaussures enfants
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=montres-bijoux&universmontresbijoux=enfant",
                          )}
                          className="font-semibold hover:text-[#f56c2a]"
                        >
                          Montres & bijoux enfants
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=mode&subcategory=accessoires-bagagerie",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Accessoires & bagagerie
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=loisirs&subcategory=jeux-jouets",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Jeux & Jouets
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=autres&subcategory=baby-sitting",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Baby-Sitting
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Électronique */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(8)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Électronique
            </button>
            {openMenu === 8 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col gap-4 bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <HiOutlineDevicePhoneMobile
                        size={20}
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      />
                      <span
                        className="font-semibold text-gray-900"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Électronique
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4>
                      <Link
                        to={buildListingUrl("/listings/?category=electronique")}
                        className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Tout Électronique
                      </Link>
                    </h4>

                    <ul className="space-y-10 mt-5">
                      <h4>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=ordinateurs",
                          )}
                          className="hover:text-[#f56c2a] font-semibold text-gray-900"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Ordinateurs
                        </Link>
                      </h4>
                      <h4>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=accessoires-informatique",
                          )}
                          className="hover:text-[#f56c2a] font-semibold text-gray-900"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Accessoires informatique
                        </Link>
                      </h4>
                      <h4>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=tablettes-liseuses",
                          )}
                          className="hover:text-[#f56c2a] font-semibold text-gray-900"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Tablettes & Liseuses
                        </Link>
                      </h4>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=electronique&subcategory=photo-audio-video",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Photo, audio & vidéo
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=photo-audio-video&photoaudiovideoproduit=television",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Télévision
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=photo-audio-video&photoaudiovideoproduit=enceintes",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Enceintes
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=photo-audio-video&photoaudiovideoproduit=appareil-photo",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Appareil photo
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=photo-audio-video&photoaudiovideoproduit=casque",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Casque
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=photo-audio-video&photoaudiovideoproduit=videoprojecteur",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Vidéoprojecteur
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=photo-audio-video&photoaudiovideoproduit=accessoires",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Accessoires
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=photo-audio-video&photoaudiovideoproduit=ecouteurs",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Écouteurs
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=electronique&subcategory=telephones-objets-connectes",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Téléphones & objets connectés
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=telephones-objets-connectes&telephonesobjetsconnectesmarque=apple",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Apple
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=telephones-objets-connectes&telephonesobjetsconnectesmarque=samsung",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Samsung
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=telephones-objets-connectes&telephonesobjetsconnectesmarque=huawei",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Huawei
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=telephones-objets-connectes&telephonesobjetsconnectesmarque=techno",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Techno
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=telephones-objets-connectes&telephonesobjetsconnectesmarque=oneplus",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          OnePlus
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=telephones-objets-connectes&telephonesobjetsconnectesmarque=google",
                          )}
                          className="hover:text-[#f56c2a]"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Google
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=electronique&subcategory=accessoires-téléphone-objets-connectés",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Accessoires téléphone & Objets connectés
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=consoles",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Consoles
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=electronique&subcategory=jeux-video",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Jeux vidéo
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=maison-jardin&subcategory=electromenager",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Électroménager
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          to={buildListingUrl(
                            "/listings/?category=autres&subcategory=services&servicestype=servives-reparations-electroniques",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                        >
                          Services de réparations électroniques
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Loisirs */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(9)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Loisirs
            </button>
            {openMenu === 9 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col gap-4 bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <MdOutlineSportsBasketball
                        size={20}
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      />
                      <span
                        className="font-semibold text-gray-900"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Loisirs
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl("/listings/?category=loisirs")}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                    >
                      Tout Loisirs
                    </Link>

                    <ul className="space-y-4 mt-5">
                      <li>
                        <h4 className="font-semibold text-gray-900">
                          <Link
                            to={buildListingUrl(
                              "/listings/?category=loisirs&subcategory=loisirs-creatifs",
                            )}
                            className="hover:text-[#f56c2a] font-semibold"
                            style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          >
                            Loisirs créatifs
                          </Link>
                        </h4>
                      </li>

                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=antiquites",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Antiquités
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=artistes-musiciens",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Artistes & Musiciens
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=billeterie",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Billetterie
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=collection",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Collection
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=loisirs&subcategory=culture",
                        )}
                        className="hover:text-[#f56c2a] font-semibold"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Culture
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=cd-musique",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          CD - Musique
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=dvd-films",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          DVD - Films
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=instruments-de-musique",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Instruments de musique
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=livres",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Livres
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=modelisme",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Modélisme
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=vins-gastronomie",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Vins & Gastronomie
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=loisirs&subcategory=jeux-jouets",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Jeux & Jouets
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=jeux-jouets&jeuxjouetsproduit=jeux-societe",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Jeux de société
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=jeux-jouets&jeuxjouetsproduit=poupees-accessoires",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Poupées et accessoires
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=jeux-jouets&jeuxjouetsproduit=porteurs-trotteurs-draisiennes",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Porteurs, trotteurs et draisiennes
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=jeux-jouets&jeuxjouetsproduit=jouets-eveil",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Jouets d’éveil
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=jeux-jouets&jeuxjouetsproduit=cuisines-dinettes",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Cuisines et dînettes
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=jeux-jouets&jeuxjouetsproduit=jeux-construction",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Jeux de construction
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=jeux-jouets&jeuxjouetsproduit=voitures-circuits",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Voitures et circuits
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=jeux-jouets&jeuxjouetsproduit=puzzle",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Puzzle
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=loisirs&subcategory=sport-plein-air",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Sport & Plein air
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=velos",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Vélos
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=velos&velostype=velo-route",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Vélo de route
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=velos&velostype=vtt",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          VTT
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=velos&velostype=velo-electrique",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Vélo électrique
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=velos&velostype=enfant",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Vélo enfant
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=velos&velostype=velo-loisirs-vtc",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          VTC
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=velos&velostype=velo-ville",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Vélo de ville
                        </Link>
                      </li>

                      <li>
                        <Link
                          style={{
                            height: "clamp(42px,4.2vw,62px)",
                            fontSize: "clamp(13px,1.2vw,20px)",
                            marginBottom: "clamp(13px,1.2vw,20px)",
                          }}
                          to={buildListingUrl(
                            "/listings/?category=loisirs&subcategory=equipements-velos",
                          )}
                          className="hover:text-[#f56c2a] font-semibold"
                        >
                          Équipements vélos
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Autres */}
          <div
            className="group"
            onMouseEnter={() => handleOpenMenu(10)}
            onMouseLeave={handleCloseMenu}
          >
            <button
              className="border-b-2 border-transparent group-hover:border-[#1a1919] transition-all"
              style={{
                fontSize: "clamp(10px, 1.3vw, 15px)",
              }}
            >
              Autres
            </button>
            {openMenu === 10 && (
              <div className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200">
                <div className="mx-auto max-w-[1280px] grid grid-cols-6 gap-6 text-sm text-gray-700">
                  <div className="col-span-1 border-r pr-4 flex flex-col gap-4 bg-slate-100">
                    <div className="flex items-center gap-3 mt-5 px-3">
                      <HiDotsHorizontal
                        size={20}
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      />
                      <span
                        className="font-semibold text-gray-900"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Autres
                      </span>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      to={buildListingUrl("/materiel-professionnel")}
                      className="font-semibold text-gray-900 hover:text-[#f56c2a]"
                      style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                    >
                      Matériel professionnel
                    </Link>

                    <ul
                      className="space-y-4 mt-5"
                      style={{
                        fontSize: "clamp(10px, 1.3vw, 15px)",
                        marginTop: "clamp(10px, 1vw, 15px)",
                      }}
                    >
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/tracteurs",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Tracteurs
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/materiel-agricole",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Matériel agricole
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/btp-gros-oeuvre",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          BTP - Chantier gros-œuvre
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/poids-lourds",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Poids lourds
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/manutention-levage",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Manutention - Levage
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/equipements-industriels",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Équipements industriels
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/equipements-restaurants-hotels",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Restaurants & hôtels
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/fournitures-bureau",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Fournitures de bureau
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/equipements-commerces-marches",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Commerces & marchés
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/materiel-professionnel/materiel-medical",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Matériel médical
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl(
                          "/listings/?category=autres&subcategory=services",
                        )}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Services
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/listings/?category=autres&subcategory=services&typeservices=services-de-demenagement",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Services de déménagement
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/services/reparations-mecaniques",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Réparations mécaniques
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/jardinerie-bricolage")}
                          className="hover:text-[#f56c2a]"
                        >
                          Jardinerie & bricolage
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/a-la-personne")}
                          className="hover:text-[#f56c2a]"
                        >
                          Services à la personne
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/aux-animaux")}
                          className="hover:text-[#f56c2a]"
                        >
                          Services aux animaux
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/baby-sitting")}
                          className="hover:text-[#f56c2a]"
                        >
                          Baby-Sitting
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/artistes-musiciens")}
                          className="hover:text-[#f56c2a]"
                        >
                          Artistes & Musiciens
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/evenementiels")}
                          className="hover:text-[#f56c2a]"
                        >
                          Services évènementiels
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl(
                            "/services/reparations-electroniques",
                          )}
                          className="hover:text-[#f56c2a]"
                        >
                          Réparations électroniques
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/entraide-voisins")}
                          className="hover:text-[#f56c2a]"
                        >
                          Entraide entre voisins
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/billetterie")}
                          className="hover:text-[#f56c2a]"
                        >
                          Billetterie
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/evenements")}
                          className="hover:text-[#f56c2a]"
                        >
                          Évènements
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/covoiturage")}
                          className="hover:text-[#f56c2a]"
                        >
                          Covoiturage
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/cours-particuliers")}
                          className="hover:text-[#f56c2a]"
                        >
                          Cours particuliers
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/services/autres")}
                          className="hover:text-[#f56c2a]"
                        >
                          Autres services
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-gray-900">
                      <Link
                        to={buildListingUrl("/animaux")}
                        className="hover:text-[#f56c2a]"
                        style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                      >
                        Animaux
                      </Link>
                    </h4>

                    <ul className="space-y-4 mt-4">
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/animaux")}
                          className="hover:text-[#f56c2a]"
                        >
                          Animaux
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/animaux/accessoires")}
                          className="hover:text-[#f56c2a]"
                        >
                          Accessoires animaux
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/animaux/animaux-perdus")}
                          className="hover:text-[#f56c2a]"
                        >
                          Animaux perdus
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/animaux/dons")}
                          className="hover:text-[#f56c2a]"
                        >
                          Dons
                        </Link>
                      </li>
                      <li>
                        <Link
                          style={{ fontSize: "clamp(10px, 1.3vw, 15px)" }}
                          to={buildListingUrl("/animaux/autres")}
                          className="hover:text-[#f56c2a]"
                        >
                          Autres
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
