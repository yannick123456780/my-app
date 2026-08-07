import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX, FiChevronRight } from "react-icons/fi";

// Composant RangeFilter pour les inputs min/max
export const RangeFilter = ({
  label,
  icon,
  minValue,
  maxValue,
  unit,
  onMinChange,
  onMaxChange,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
}: {
  label: string;
  icon?: React.ReactNode; // ✅ ajout ici
  minValue: string;
  maxValue: string;
  unit: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 mb-1">
      {icon && (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-700">
          {icon}
        </span>
      )}
      <p className="font-semibold">{label}</p>
    </div>

    <div className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="number"
          inputMode="numeric"
          placeholder={minPlaceholder}
          value={minValue || ""}
          onChange={(e) => onMinChange(e.target.value)}
          className="border p-2 pr-12 rounded w-full"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {unit}
        </span>
      </div>
      <div className="relative flex-1">
        <input
          type="number"
          inputMode="numeric"
          placeholder={maxPlaceholder}
          value={maxValue || ""}
          onChange={(e) => onMaxChange(e.target.value)}
          className="border p-2 pr-12 rounded w-full"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {unit}
        </span>
      </div>
    </div>
  </div>
);

export const RangeFilterAnnee = ({
  label,
  icon,
  minValue,
  maxValue,
  unit,
  onMinChange,
  onMaxChange,
  minPlaceholder = "Minimum",
  maxPlaceholder = "Maximum",
}: {
  label: string;
  icon?: React.ReactNode;
  minValue: string;
  maxValue: string;
  unit: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}) => (
  <div className="space-y-3">
    {/* Titre du filtre avec icône */}
    <div className="flex items-center gap-2">
      {icon && (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-700">
          {icon}
        </span>
      )}
      <p className="font-semibold text-gray-800">{label}</p>
    </div>

    {/* Inputs MIN et MAX */}
    <div className="flex gap-2">
      {/* MIN */}
      <div className="flex-1 flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{minPlaceholder}</label>
        <div className="relative">
          <input
            type="number"
            inputMode="numeric"
            value={minValue || ""}
            onChange={(e) => onMinChange(e.target.value)}
            className="border p-2 pr-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {unit}
          </span>
        </div>
      </div>

      {/* MAX */}
      <div className="flex-1 flex flex-col">
        <label className="text-sm text-gray-600 mb-1">{maxPlaceholder}</label>
        <div className="relative">
          <input
            type="number"
            inputMode="numeric"
            value={maxValue || ""}
            onChange={(e) => onMaxChange(e.target.value)}
            className="border p-2 pr-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
            {unit}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// Composant CheckboxGroup pour les filtres à cases à cocher
export const CheckboxGroupCarre = ({
  title,
  icon, // Icône principale du groupe (optionnelle)
  name,
  options,
  isValueSelected,
  handleCheckboxChange,
}: {
  title: string;
  icon?: React.ReactNode; // Icône principale (ex: PiBuildingsLight)
  name: string;
  options: { value: string; label: string; icon?: React.ReactNode }[]; // Chaque option peut avoir sa propre icône
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
}) => (
  <div className="border-t border-b  p-3">
    <p className="font-semibold mb-3 flex items-center gap-2">
      {icon && (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-700">
          {icon}
        </span>
      )}
      {title}
    </p>
    <div className="flex flex-col gap-2">
      {options.map((option) => {
        const checked = isValueSelected(name, option.value);
        return (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition ${
              checked ? "bg-blue-50" : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={(e) =>
                handleCheckboxChange(name, option.value, e.target.checked)
              }
            />
            <span
              className={`w-4 h-4 border rounded-sm flex items-center justify-center ${
                checked
                  ? "border-[#094171] bg-[#094171]"
                  : "border-gray-300 bg-white"
              }`}
            >
              {checked && (
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <path d="M10.28 2.28L4 8.56 1.72 6.28a1 1 0 00-1.41 1.41l3 3a1 1 0 001.41 0l7-7a1 1 0 00-1.41-1.41z" />
                </svg>
              )}
            </span>
            {/* Icône de l'option si elle existe */}
            {option.icon && (
              <span className="text-gray-600">{option.icon}</span>
            )}
            <span className="text-sm">{option.label}</span>
          </label>
        );
      })}
    </div>
  </div>
);

//CheckboxGroupRound
export const CheckboxGroupRound = ({
  title,
  icon,
  name,
  options,
  isValueSelected,
  handleCheckboxChange,
}: {
  title: string;
  icon?: React.ReactNode;
  name: string;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
}) => (
  <div className="border-t border-b p-3">
    <p className="font-semibold mb-3 flex items-center gap-2">
      {icon && (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-700">
          {icon}
        </span>
      )}
      {title}
    </p>

    <div className="flex flex-col gap-2">
      {options.map((option) => {
        const checked = isValueSelected(name, option.value);

        return (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition ${
              checked ? "bg-blue-50" : ""
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={(e) =>
                handleCheckboxChange(name, option.value, e.target.checked)
              }
            />

            {/* Cercle */}
            <span
              className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                checked
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-300 bg-white"
              }`}
            >
              {checked && (
                <span className="w-2 h-2 bg-white rounded-full"></span>
              )}
            </span>

            {option.icon && (
              <span className="text-gray-600">{option.icon}</span>
            )}

            <span className="text-sm">{option.label}</span>
          </label>
        );
      })}
    </div>
  </div>
);

// PiècesRangeSelector
export const PiecesRangeSelector = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  icon: Icon, // L'icône à afficher
  title, // Le titre personnalisé
  color = "blue", // Couleur par défaut
}: {
  minValue: string;
  maxValue: string;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
  icon: React.ElementType; // Le composant icône
  title: string; // Le titre
  color?: "blue" | "purple" | "green" | "orange"; // Optionnel
}) => {
  const pieces = [1, 2, 3, 4, 5, 6, 7, "8+"];

  // Mapping des couleurs
  const colorStyles = {
    blue: {
      selected:
        "bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-300",
      between: "bg-blue-100 text-blue-800 border border-blue-300",
      iconBg: "bg-blue-100",
      iconText: "text-blue-600",
    },
    purple: {
      selected:
        "bg-purple-600 text-white shadow-md scale-105 ring-2 ring-purple-300",
      between: "bg-purple-100 text-purple-800 border border-purple-300",
      iconBg: "bg-purple-100",
      iconText: "text-purple-600",
    },
    green: {
      selected:
        "bg-green-600 text-white shadow-md scale-105 ring-2 ring-green-300",
      between: "bg-green-100 text-green-800 border border-green-300",
      iconBg: "bg-green-100",
      iconText: "text-green-600",
    },
    orange: {
      selected:
        "bg-orange-600 text-white shadow-md scale-105 ring-2 ring-orange-300",
      between: "bg-orange-100 text-orange-800 border border-orange-300",
      iconBg: "bg-orange-100",
      iconText: "text-orange-600",
    },
  };

  const styles = colorStyles[color];

  // ... (gardez toute la logique handleSelect, getButtonState, etc.)

  const handleSelect = (piece: number | string) => {
    const pieceStr = piece.toString();

    // CAS 1: La pièce est déjà sélectionnée comme min ou max → désélection
    if (pieceStr === minValue) {
      if (maxValue) {
        onMinChange(maxValue);
        onMaxChange("");
      } else {
        onMinChange("");
      }
      return;
    }

    if (pieceStr === maxValue) {
      onMaxChange("");
      return;
    }

    // CAS 2: Aucune sélection
    if (!minValue && !maxValue) {
      onMinChange(pieceStr);
      return;
    }

    // CAS 3: Seulement le min est sélectionné
    if (minValue && !maxValue) {
      const pieceNum = piece === "8+" ? Infinity : parseInt(pieceStr, 10);
      const minNum = minValue === "8+" ? Infinity : parseInt(minValue, 10);

      if (pieceNum < minNum) {
        onMinChange(pieceStr);
      } else {
        onMaxChange(pieceStr);
      }
      return;
    }

    // CAS 4: Seulement le max est sélectionné
    if (!minValue && maxValue) {
      const pieceNum = piece === "8+" ? Infinity : parseInt(pieceStr, 10);
      const maxNum = maxValue === "8+" ? Infinity : parseInt(maxValue, 10);

      if (pieceNum > maxNum) {
        onMaxChange(pieceStr);
      } else {
        onMinChange(pieceStr);
      }
      return;
    }

    // CAS 5: Min et Max sont sélectionnés
    if (minValue && maxValue) {
      const pieceNum = piece === "8+" ? Infinity : parseInt(pieceStr, 10);
      const minNum = minValue === "8+" ? Infinity : parseInt(minValue, 10);
      const maxNum = maxValue === "8+" ? Infinity : parseInt(maxValue, 10);

      if (pieceNum < minNum) {
        onMinChange(pieceStr);
      } else if (pieceNum > maxNum) {
        onMaxChange(pieceStr);
      } else {
        onMinChange(pieceStr);
        onMaxChange("");
      }
      return;
    }
  };

  const getButtonState = (piece: number | string) => {
    const pieceStr = piece.toString();

    if (pieceStr === minValue || pieceStr === maxValue) return "selected";

    if (minValue && maxValue) {
      const minNum = minValue === "8+" ? 8 : parseInt(minValue, 10);
      const maxNum = maxValue === "8+" ? Infinity : parseInt(maxValue, 10);
      const pieceNum = piece === "8+" ? Infinity : parseInt(pieceStr, 10);

      if (pieceNum > minNum && pieceNum < maxNum) return "between";
    }

    return "none";
  };

  const getButtonStyle = (state: string) => {
    switch (state) {
      case "selected":
        return styles.selected;
      case "between":
        return styles.between;
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  return (
    <div className="border-t border-b p-3">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`flex items-center justify-center w-7 h-7 rounded-full ${styles.iconBg} ${styles.iconText}`}
        >
          <Icon className="text-sm" />
        </span>
        <p className="font-semibold">{title}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {pieces.map((piece) => {
          const state = getButtonState(piece);
          return (
            <button
              key={piece}
              onClick={() => handleSelect(piece)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                transition-all duration-200
                ${getButtonStyle(state)}
              `}
            >
              {piece}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const RadioCheckboxGroup = ({
  title,
  icon,
  name,
  options,
  isValueSelected,
  handleCheckboxChange,
}: Props) => {
  return (
    <div className="border-t border-b p-3">
      <p className="font-semibold mb-3 flex items-center gap-2">
        {icon && (
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200 text-slate-700">
            {icon}
          </span>
        )}
        {title}
      </p>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const checked = isValueSelected(name, option.value);

          return (
            <label
              key={option.value}
              className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 transition ${
                checked ? "bg-blue-50" : ""
              }`}
              onClick={() => handleCheckboxChange(name, option.value, true)}
            >
              <input
                type="radio"
                className="hidden"
                name={name}
                checked={checked}
                readOnly
              />
              <span
                className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                  checked
                    ? "border-[#094171] bg-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {checked && (
                  <svg
                    className="w-3 h-3 text-[#094171]"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <circle cx="6" cy="6" r="4" />
                  </svg>
                )}
              </span>
              {option.icon && (
                <span className="text-gray-600">{option.icon}</span>
              )}
              <span className="text-sm">{option.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

interface CaracteristiquesFilterProps {
  title: string;
  icon?: React.ReactNode;
  name: string;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  selectedClass?: string;
  unselectedClass?: string;
  iconClass?: string;
  labelSelectedClass?: string;
  iconWrapperClass?: string;
}

interface CaracteristiquesFilterProps {
  title: string;
  icon?: React.ReactNode;
  name: string;
  options: { value: string; label: string; icon?: React.ReactNode }[];
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  selectedClass?: string;
  unselectedClass?: string;
  iconClass?: string;
  labelSelectedClass?: string;
  iconWrapperClass?: string;
}

export const CaracteristiquesFilter: React.FC<CaracteristiquesFilterProps> = ({
  title,
  icon,
  name,
  options,
  isValueSelected,
  handleCheckboxChange,
  selectedClass = "border-[#094171] bg-[#094171]",
  unselectedClass = "border-gray-300 bg-white",
  iconClass = "text-white",
  labelSelectedClass = "bg-blue-50",
  iconWrapperClass = "bg-slate-200 text-slate-700",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fermer la modale si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrer les options selon la recherche
  const filteredOptions = options.filter((opt: any) => {
    // 🔥 toujours afficher les titres
    if (opt.type === "group") return true;

    return opt.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Récupérer les valeurs sélectionnées pour l'affichage
  const selectedValues = options.filter((opt) =>
    isValueSelected(name, opt.value),
  );

  // Générer le texte d'aperçu
  const getPreviewText = () => {
    if (selectedValues.length === 0) return "";
    const labels = selectedValues.map((opt) => opt.label);
    if (labels.length <= 4) return labels.join(", ");
    return `${labels.slice(0, 4).join(", ")} …`;
  };

  // Gérer la sélection/déselection
  const toggleOption = (value: string, checked: boolean) => {
    handleCheckboxChange(name, value, checked);
  };

  // Réinitialiser toutes les sélections
  const resetSelections = () => {
    options.forEach((option) => {
      if (isValueSelected(name, option.value)) {
        handleCheckboxChange(name, option.value, false);
      }
    });
  };

  return (
    <>
      {/* Aperçu avec structure : titre + aperçu + ligne "Tout >" */}
      <div
        className="border-t border-b p-3 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Ligne du titre avec icône */}
        <div className="flex items-center gap-2 mb-2">
          {icon && (
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-full ${iconWrapperClass}`}
            >
              {icon}
            </span>
          )}
          <span className="font-semibold">{title}</span>
        </div>

        {/* Aperçu textuel des valeurs sélectionnées */}
        {selectedValues.length > 0 && (
          <div className="text-sm text-gray-600 mb-3">{getPreviewText()}</div>
        )}

        {/* Ligne "Tout" avec flèche à droite */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Tout</span>
          <FiChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Modale (fenêtre flottante) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col"
          >
            {/* En-tête avec recherche */}
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 border-b">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094171]"
                />
              </div>
            </div>

            {/* Liste des options avec cases à cocher (scroll) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredOptions.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Aucune option trouvée
                </p>
              )}
              {filteredOptions.map((option: any, index: number) => {
                // 🔥 CAS 1 : TITRE (brand)
                if (option.type === "group") {
                  return (
                    <p
                      key={`group-${index}`}
                      className="font-semibold text-gray-800 mt-4 mb-2  pb-1"
                    >
                      {option.label}
                    </p>
                  );
                }

                // 🔥 CAS 2 : CHECKBOX (model)
                const checked = isValueSelected(name, option.value);

                return (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition ${
                      checked ? labelSelectedClass : ""
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={checked}
                      onChange={(e) =>
                        toggleOption(option.value, e.target.checked)
                      }
                    />

                    <span
                      className={`w-5 h-5 border rounded flex items-center justify-center ${
                        checked ? selectedClass : unselectedClass
                      }`}
                    >
                      {checked && (
                        <svg
                          className={`w-3 h-3 ${iconClass}`}
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path d="M10.28 2.28L4 8.56 1.72 6.28a1 1 0 00-1.41 1.41l3 3a1 1 0 001.41 0l7-7a1 1 0 00-1.41-1.41z" />
                        </svg>
                      )}
                    </span>

                    {option.icon && (
                      <span className="text-gray-600">{option.icon}</span>
                    )}

                    <span className="text-sm">{option.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Boutons : Réinitialiser à gauche, Valider à droite */}
            <div className="p-4 border-t flex justify-between items-center gap-3">
              <button
                onClick={resetSelections}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="px-4 py-2 bg-[#094171] text-white rounded-lg hover:bg-[#063a5e] transition"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// CaracteristiquesFilterRound
interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  type?: "group"; // optionnel pour les titres de groupe
}

interface CaracteristiquesFilterRoundProps {
  title: string;
  icon?: React.ReactNode;
  name: string;
  options: Option[];
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  selectedClass?: string; // cercle coché
  unselectedClass?: string; // cercle non coché
  iconClass?: string; // couleur du point central (optionnel)
  labelSelectedClass?: string; // fond de l'option quand sélectionnée
  iconWrapperClass?: string; // fond de l'icône du titre
}

export const CaracteristiquesFilterRound: React.FC<
  CaracteristiquesFilterRoundProps
> = ({
  title,
  icon,
  name,
  options,
  isValueSelected,
  handleCheckboxChange,
  selectedClass = "border-blue-600 bg-blue-600",
  unselectedClass = "border-gray-300 bg-white",
  iconClass = "bg-white",
  labelSelectedClass = "bg-blue-50",
  iconWrapperClass = "bg-slate-200 text-slate-700",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fermer la modale si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrer les options selon la recherche (les groupes sont toujours affichés)
  const filteredOptions = options.filter((opt) => {
    if (opt.type === "group") return true;
    return opt.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Récupérer les valeurs sélectionnées pour l'affichage
  const selectedValues = options.filter((opt) =>
    isValueSelected(name, opt.value),
  );

  // Texte d'aperçu
  const getPreviewText = () => {
    if (selectedValues.length === 0) return "";
    const labels = selectedValues.map((opt) => opt.label);
    if (labels.length <= 4) return labels.join(", ");
    return `${labels.slice(0, 4).join(", ")} …`;
  };

  // Basculer la sélection
  const toggleOption = (value: string, checked: boolean) => {
    handleCheckboxChange(name, value, checked);
  };

  // Réinitialiser toutes les sélections
  const resetSelections = () => {
    options.forEach((option) => {
      if (isValueSelected(name, option.value)) {
        handleCheckboxChange(name, option.value, false);
      }
    });
  };

  return (
    <>
      {/* Aperçu (identique à CaracteristiquesFilter) */}
      <div
        className="border-t border-b p-3 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-2 mb-2">
          {icon && (
            <span
              className={`flex items-center justify-center w-7 h-7 rounded-full ${iconWrapperClass}`}
            >
              {icon}
            </span>
          )}
          <span className="font-semibold">{title}</span>
        </div>

        {selectedValues.length > 0 && (
          <div className="text-sm text-gray-600 mb-3">{getPreviewText()}</div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Tout</span>
          <FiChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Modale avec recherche */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] flex flex-col"
          >
            {/* En-tête */}
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Barre de recherche */}
            <div className="p-4 border-b">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#094171]"
                />
              </div>
            </div>

            {/* Liste des options avec CERCLES (CheckboxGroupRound style) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredOptions.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Aucune option trouvée
                </p>
              )}
              {filteredOptions.map((option, index) => {
                // Groupes (titres)
                if (option.type === "group") {
                  return (
                    <p
                      key={`group-${index}`}
                      className="font-semibold text-gray-800 mt-4 mb-2 pb-1"
                    >
                      {option.label}
                    </p>
                  );
                }

                const checked = isValueSelected(name, option.value);

                return (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100 transition ${
                      checked ? labelSelectedClass : ""
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={checked}
                      onChange={(e) =>
                        toggleOption(option.value, e.target.checked)
                      }
                    />

                    {/* CERCLE (différence principale) */}
                    <span
                      className={`w-5 h-5 border rounded-full flex items-center justify-center ${
                        checked ? selectedClass : unselectedClass
                      }`}
                    >
                      {checked && (
                        <span className={`w-2 h-2 rounded-full ${iconClass}`} />
                      )}
                    </span>

                    {option.icon && (
                      <span className="text-gray-600">{option.icon}</span>
                    )}

                    <span className="text-sm">{option.label}</span>
                  </label>
                );
              })}
            </div>

            {/* Boutons */}
            <div className="p-4 border-t flex justify-between items-center gap-3">
              <button
                onClick={resetSelections}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="px-4 py-2 bg-[#094171] text-white rounded-lg hover:bg-[#063a5e] transition"
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
