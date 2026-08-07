// src/data/localisation.ts
export interface City {
  name: string;
  quarters: string[];
}

export interface CountryData {
  code: string;
  name: string;
  cities: City[];
}

export const countriesData: CountryData[] = [
  {
    code: "FR",
    name: "France",
    cities: [
      { name: "Paris", quarters: ["Marais", "Montmartre", "Saint-Germain"] },
      { name: "Lyon", quarters: ["Presqu'île", "Croix-Rousse", "Vieux Lyon"] },
      { name: "Marseille", quarters: ["Le Panier", "Cours Julien", "Endoume"] }
    ]
  },
  {
    code: "BE",
    name: "Belgique",
    cities: [
      { name: "Bruxelles", quarters: ["Centre", "Ixelles", "Uccle"] },
      { name: "Anvers", quarters: ["Centre historique", "Zurenborg", "Het Eilandje"] }
    ]
  },
  {
    code: "CH",
    name: "Suisse",
    cities: [
      { name: "Genève", quarters: ["Cité", "Eaux-Vives", "Plainpalais"] },
      { name: "Zurich", quarters: ["Altstadt", "Wiedikon", "Seefeld"] }
    ]
  },
  {
    code: "LU",
    name: "Luxembourg",
    cities: [
      { name: "Luxembourg-Ville", quarters: ["Grund", "Belair", "Clausen"] }
    ]
  }
];