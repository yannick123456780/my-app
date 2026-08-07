import { useState, useEffect, useRef } from "react";
import { countriesData } from "@/data/localisation";

interface LocationBarProps {
  selectedCountries: string[];
  selectedCities: string[];
  selectedQuarters: string[];
  onCountriesChange: (codes: string[]) => void;
  onCitiesChange: (cities: string[]) => void;
  onQuartersChange: (quarters: string[]) => void;
}

export default function LocationBar({
  selectedCountries,
  selectedCities,
  selectedQuarters,
  onCountriesChange,
  onCitiesChange,
  onQuartersChange,
}: LocationBarProps) {
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableQuarters, setAvailableQuarters] = useState<string[]>([]);
  const [tempCountry, setTempCountry] = useState<string>(
    selectedCountries.length === 1 ? selectedCountries[0] : "",
  );
  const [tempCity, setTempCity] = useState<string>(
    selectedCities.length === 1 ? selectedCities[0] : "",
  );

  useEffect(() => {
    setTempCountry(selectedCountries.length === 1 ? selectedCountries[0] : "");
  }, [selectedCountries]);

  useEffect(() => {
    setTempCity(selectedCities.length === 1 ? selectedCities[0] : "");
  }, [selectedCities]);

  useEffect(() => {
    if (!tempCountry) {
      setAvailableCities([]);
      setTempCity("");
      return;
    }
    const country = countriesData.find((c) => c.code === tempCountry);
    const cities = country ? country.cities.map((c) => c.name) : [];
    setAvailableCities(cities);
    if (tempCity && !cities.includes(tempCity)) {
      setTempCity("");
    }
  }, [tempCountry]);

  useEffect(() => {
    if (!tempCountry || !tempCity) {
      setAvailableQuarters([]);
      return;
    }
    const country = countriesData.find((c) => c.code === tempCountry);
    const city = country?.cities.find((c) => c.name === tempCity);
    const quarters = city ? city.quarters : [];
    setAvailableQuarters(quarters);
  }, [tempCountry, tempCity]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newCountry = e.target.value;

  setTempCountry(newCountry);
  setTempCity("");

  onCitiesChange([]);     // ✅ IMPORTANT
  onQuartersChange([]);   // déjà ok

  if (newCountry) {
    onCountriesChange([newCountry]);
  } else {
    onCountriesChange([]);
  }

  setTimeout(() => window.dispatchEvent(new Event("locationChange")));
};

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setTempCity(newCity);
    if (newCity) {
      onCitiesChange([newCity]);
    } else {
      onCitiesChange([]);
    }
    onQuartersChange([]);
    setTimeout(() => window.dispatchEvent(new Event("locationChange")));
  };

  const handleQuarterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuarter = e.target.value;
    if (newQuarter) {
      onQuartersChange([newQuarter]);
    } else {
      onQuartersChange([]);
    }
    setTimeout(() => window.dispatchEvent(new Event("locationChange")));
  };

  // Trouve le nom du pays pour l'affichage du texte "Pays: France"
  const getCountryDisplayName = () => {
    if (!tempCountry) return "Tous les pays";
    const country = countriesData.find((c) => c.code === tempCountry);
    return country ? country.name : "Tous les pays";
  };


  const [showCountry, setShowCountry] = useState(false);
const [showCity, setShowCity] = useState(false);
const [showQuarter, setShowQuarter] = useState(false);

const countryRef = useRef<HTMLDivElement>(null);
const cityRef = useRef<HTMLDivElement>(null);
const quarterRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
      setShowCountry(false);
    }
    if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
      setShowCity(false);
    }
    if (quarterRef.current && !quarterRef.current.contains(e.target as Node)) {
      setShowQuarter(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  return (
  <div className="flex justify-between items-center mb-2">
    <div className="flex gap-2 flex-1">

      {/* ================== PAYS ================== */}
      <div className="relative flex-1" ref={countryRef}>
        <button
          onClick={() => setShowCountry(!showCountry)}
          className="border rounded p-2 text-sm bg-white w-full flex justify-between"
        >
          <span>
            {tempCountry
              ? `Pays : ${getCountryDisplayName()}`
              : "Pays"}
          </span>
          <span>{showCountry ? "▼" : "▲"}</span>
        </button>

        {showCountry && (
          <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10">
            {countriesData.map((c) => (
              <div
                key={c.code}
                onClick={() => {
                  handleCountryChange({
                    target: { value: c.code },
                  } as React.ChangeEvent<HTMLSelectElement>);
                  setShowCountry(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {c.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================== VILLE ================== */}
      <div className="relative flex-1" ref={cityRef}>
        <button
          onClick={() => tempCountry && setShowCity(!showCity)}
          disabled={!tempCountry}
          className="border rounded p-2 text-sm bg-white w-full flex justify-between disabled:bg-gray-100"
        >
          <span>
            {tempCity ? `Ville : ${tempCity}` : "Ville"}
          </span>
         <span>{showCity ? "▼" : "▲"}</span>
        </button>

        {showCity && (
          <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10">
            {availableCities.map((city) => (
              <div
                key={city}
                onClick={() => {
                  handleCityChange({
                    target: { value: city },
                  } as React.ChangeEvent<HTMLSelectElement>);
                  setShowCity(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================== QUARTIER ================== */}
      <div className="relative flex-1" ref={quarterRef}>
        <button
          onClick={() => tempCity && setShowQuarter(!showQuarter)}
          disabled={!tempCity}
          className="border rounded p-2 text-sm bg-white w-full flex justify-between disabled:bg-gray-100"
        >
          <span>
            {selectedQuarters.length === 1
              ? `Quartier : ${selectedQuarters[0]}`
              : "Quartier"}
          </span>
          <span>{showQuarter ? "▼" : "▲"}</span>
        </button>

        {showQuarter && (
          <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-10">
            {availableQuarters.map((q) => (
              <div
                key={q}
                onClick={() => {
                  handleQuarterChange({
                    target: { value: q },
                  } as React.ChangeEvent<HTMLSelectElement>);
                  setShowQuarter(false);
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {q}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
);
}
