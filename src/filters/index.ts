// filters/index.ts
import EmploiFilters from "./EmploiFilters";
import ImmobilierFilters from "./ImmobilierFilters";
import VehiculesFilters from "./VehiculesFilters";
import ModeFilters from "./ModeFilters";
import MaisonJardinFilters from "./MaisonJardinFilters";
import FamilleFilters from "./FamilleFilters";
import ElectroniqueFilters from "./ElectroniqueFilters";
import LoisirsFilters from "./LoisirsFilters";

// Exportez tous les filtres par catégorie
export const categoryFilters = {
  immobilier: ImmobilierFilters,
  vehicules: VehiculesFilters,
  // vacances: VacancesFilters,
  emploi: EmploiFilters,
  mode: ModeFilters,
  "maison-jardin": MaisonJardinFilters,
  famille: FamilleFilters,
  electronique: ElectroniqueFilters,
  loisirs: LoisirsFilters,
  // autres: AutresFilters,
};

// Réexportez les composants de base si nécessaire
export { RangeFilter, CheckboxGroupCarre, CheckboxGroupRound,RadioCheckboxGroup } from "./BaseFilters";