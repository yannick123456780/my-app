import {
  RadioCheckboxGroup,
  CheckboxGroupCarre,
  CaracteristiquesFilter,
} from "./BaseFilters";
import { PiGasPump, PiGraduationCap, PiSortAscending } from "react-icons/pi";
import { FcDocument } from "react-icons/fc";
import { TbUserScreen } from "react-icons/tb";
import { TfiAlarmClock } from "react-icons/tfi";

interface Props {
  setFilter: (name: string, value: string) => void;
  isValueSelected: (name: string, value: string) => boolean;
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
  excludedFilterNames?: string[];
}

export default function EmploiFilters({
  setFilter,
  isValueSelected,
  handleCheckboxChange,
  excludedFilterNames = [],
}: Props) {
  // ===================== OPTIONS =====================

  const niveauEtudeOptions = [
    { value: "sans-diplome", label: "Sans diplôme" },
    { value: "bep-cap", label: "BEP / CAP" },
    {
      value: "employe-ouvrier-specialise-bac",
      label: "Employé / Ouvrier spécialisé / Bac",
    },
    {
      value: "technicien-employe-bac-plus-2",
      label: "Technicien / Employé / Bac+2",
    },
    {
      value: "agent-de-maitrise-bac-plus-3",
      label: "Agent de maîtrise / Bac+3",
    },
    {
      value: "ingenieur-cadre-bac-plus-5",
      label: "Ingénieur / Cadre / Bac+5 ou plus",
    },
  ];

  const experienceOptions = [
    { value: "0-2", label: "0 à 2 ans" },
    { value: "2-5", label: "2 à 5 ans" },
    { value: "5+", label: "5 ans et plus" },
  ];

  const fonctionOptions = [
    {
      value: "administration-services-generaux",
      label: "Administration / Services généraux",
    },
    { value: "commercial-vente", label: "Commercial / Vente" },
    {
      value: "comptabilite-gestion-finance",
      label: "Comptabilité / Gestion / Finance",
    },
    { value: "conseil-audit", label: "Conseil / Audit" },
    { value: "direction-generale", label: "Direction Générale" },
    {
      value: "securite-defense-gardiennage",
      label: "Sécurité / Défense / Gardiennage",
    },
    { value: "hotellerie-restauration", label: "Hôtellerie / Restauration" },
    { value: "informatique-internet", label: "Informatique / Internet" },
    { value: "juridique", label: "Juridique" },
    {
      value: "logistique-achat-transport",
      label: "Logistique / Achat / Transport",
    },
    { value: "marketing-communication", label: "Marketing / Communication" },
    { value: "menage-entretien", label: "Ménage / Entretien" },
    {
      value: "ressources-humaines-formation",
      label: "Ressources Humaines / Formation",
    },
    { value: "services-a-la-personne", label: "Services à la personne" },
    { value: "formation-education", label: "Formation / Éducation" },
    {
      value: "etudes-recherches-ingenieries",
      label: "Études / Recherches / Ingénieries",
    },
    { value: "ouvrier-artisan", label: "Ouvrier / Artisan" },
    { value: "medecine-sante", label: "Médecine / Santé" },
    { value: "production-operations", label: "Production / Opérations" },
    { value: "service-client-accueil", label: "Service Client / Accueil" },
  ];

  const secteurActiviteOptions = [
    { value: "agriculture", label: "Agriculture" },
    { value: "automobile", label: "Automobile" },
    { value: "btp-construction", label: "BTP & construction" },
    { value: "commerce-distribution", label: "Commerce & distribution" },
    { value: "banque-assurance-finance", label: "Banque, assurance & finance" },
    { value: "industrie-environnement", label: "Industrie & environnement" },
    { value: "immobilier", label: "Immobilier" },
    {
      value: "services-publics-administrations",
      label: "Services publics & administrations",
    },
    { value: "medecine-sante", label: "Médecine & santé" },
    { value: "services", label: "Services" },
    { value: "telecom-internet-medias", label: "Télécom, internet & médias" },
    { value: "transport-logistique", label: "Transport & logistique" },
    {
      value: "restauration-hotellerie-tourisme",
      label: "Restaurant, hôtellerie & tourisme",
    },
    { value: "textile-mode-luxe", label: "Textile, mode & luxe" },
    { value: "sport", label: "Sport" },
    { value: "service-a-la-personne", label: "Service à la personne" },
    { value: "autre", label: "Autre" },
  ];
  const tempsTravailOptions = [
    { value: "tempsplein", label: "Temps plein" },
    { value: "tempspartiel", label: "Temps partiel" },
    {
      value: "tempspleinoutempspartiel",
      label: "Temps plein ou temps partiel",
    },
  ];

  const typeContratOptions = [
    { value: "cdd", label: "CDD" },
    { value: "cdi", label: "CDI" },
    { value: "interim", label: "Intérim" },
    { value: "independant-franchise", label: "Indépendant / Franchise" },
    { value: "apprentissage-alternance", label: "Apprentissage / Alternance" },
    { value: "stage", label: "Stage" },
    { value: "benevolat", label: "Bénévolat" },
  ];

  const eligibleCPFOptions = [
    { value: "true", label: "Formations éligibles CPF" },
  ];

  const triOptions = [
    { value: "pertinence", label: "Pertinence" },
    { value: "recent", label: "Plus récentes" },
    { value: "ancien", label: "Plus anciennes" },
    { value: "price-asc", label: "Prix croissants" },
    { value: "price-desc", label: "Prix décroissants" },
  ];

  const typeAnnonceOptions = [
    { value: "offres", label: "Offres" },
    { value: "demandes", label: "Demandes" },
  ];

  const typeVendeursOptions = [
    { value: "particuliers", label: "Particuliers" },
    { value: "professionnels", label: "Professionnels" },
  ];

  const annoncesUrgentesOptions = [
    { value: "true", label: "Annonces urgentes" },
  ];

  const domaineFormationOptions = [
    { value: "achat-vente", label: "Achat / Vente" },
    { value: "aeroportuaire", label: "Aéroportuaire" },
    { value: "agroalimentaire", label: "Agroalimentaire" },
    { value: "aide-a-la-personne", label: "Aide à la personne" },
    { value: "architecture", label: "Architecture" },
    { value: "artisanat", label: "Artisanat" },
    { value: "audit", label: "Audit" },
    { value: "banque-assurance", label: "Banque / Assurance" },
    { value: "beaute", label: "Beauté" },
    { value: "btp", label: "BTP" },
    { value: "bureautique", label: "Bureautique" },
    { value: "commerce", label: "Commerce" },
    { value: "communication", label: "Communication" },
    { value: "comptabilite-finance", label: "Comptabilité / Finance" },
    { value: "edition", label: "Edition" },
    { value: "electricite", label: "Electricité" },
    { value: "enseignement", label: "Enseignement" },
    { value: "fonction-publique", label: "Fonction publique" },
    { value: "gestion", label: "Gestion" },
    { value: "graphisme", label: "Graphisme" },
    { value: "hotellerie-restauration", label: "Hôtellerie / Restauration" },
    { value: "immobilier", label: "Immobilier" },
    { value: "informatique", label: "Informatique" },
    { value: "juridique", label: "Juridique" },
    { value: "langues", label: "Langues" },
    { value: "logistique-transport", label: "Logistique / Transport" },
    { value: "marketing", label: "Marketing" },
    { value: "production", label: "Production" },
    { value: "qualite", label: "Qualité" },
    { value: "ressources-humaines", label: "Ressources humaines" },
    { value: "sante", label: "Santé" },
    { value: "secretariat", label: "Secrétariat" },
    { value: "securite", label: "Sécurité" },
    { value: "autre", label: "Autre" },
  ];
  const typeEnseignementOptions = [
    { value: "en-centre", label: "En centre" },
    { value: "en-entreprise", label: "En entreprise" },
    { value: "a-distance", label: "À distance" },
    { value: "en-alternance", label: "En alternance" },
    { value: "en-centre-et-a-distance", label: "En centre et à distance" },
  ];
  const handleSortChange = (name: string, value: string) => {
    setFilter(name, value);
  };

  // ===================== RENDER =====================

  return (
    <div className="space-y-4">
      {/* Type contrat */}
      {!excludedFilterNames.includes("typecontrat") && (
        <CaracteristiquesFilter
          title="Type de contrat"
          name="typecontrat"
          icon={<PiGasPump />}
          options={typeContratOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Secteur activité */}
      {!excludedFilterNames.includes("secteuractivite") && (
        <CaracteristiquesFilter
          title="Secteur d’activité"
          name="secteuractivite"
          icon={<PiGasPump />}
          options={secteurActiviteOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Fonction */}
      {!excludedFilterNames.includes("fonction") && (
        <CaracteristiquesFilter
          title="Fonction"
          name="fonction"
          icon={<PiGasPump />}
          options={fonctionOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Expérience */}
      {!excludedFilterNames.includes("experience") && (
        <CheckboxGroupCarre
          title="Expérience"
          name="experience"
          icon={<PiGasPump />}
          options={experienceOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Niveau d’étude */}
      {!excludedFilterNames.includes("niveauetude") && (
        <CheckboxGroupCarre
          title="Niveau d’étude"
          name="niveauetude"
          icon={<PiGasPump />}
          options={niveauEtudeOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* "Temps plein Temps partiel"*/}
      {!excludedFilterNames.includes("tempspleintempspartiel") && (
        <CheckboxGroupCarre
          title="Temps plein / Temps partiel"
          name="tempspleintempspartiel"
          icon={<PiGasPump />}
          options={tempsTravailOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Éligible CPF*/}
      {!excludedFilterNames.includes("eligiblecpf") && (
        <CheckboxGroupCarre
          title="Éligible CPF"
          name="eligiblecpf"
          icon={<PiGasPump />}
          options={eligibleCPFOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Domaine de formation*/}
      {!excludedFilterNames.includes("domaineformation") && (
        <CaracteristiquesFilter
          title="Domaine de formation"
          name="domaineformation"
          icon={<PiGasPump />}
          options={domaineFormationOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
   {!excludedFilterNames.includes("typeenseignement") && (
      <CheckboxGroupCarre
        title="Type d’enseignement"
        name="typeenseignement"
        icon={<PiGraduationCap />} // choisis une icône adaptée
        options={typeEnseignementOptions}
        isValueSelected={isValueSelected}
        handleCheckboxChange={handleCheckboxChange}
      />
      )}

      {/* Tri */}
      {!excludedFilterNames.includes("tri") && (
        <RadioCheckboxGroup
          title="Tri"
          icon={<PiSortAscending className="text-sm" />}
          name="tri"
          options={triOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleSortChange}
        />
      )}

      {/* Type annonces */}
      {!excludedFilterNames.includes("typeannonces") && (
        <RadioCheckboxGroup
          title="Type d’annonces"
          icon={<FcDocument className="text-sm" />}
          name="typeannonces"
          options={typeAnnonceOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleSortChange}
        />
      )}

      {/* Vendeurs */}
      {!excludedFilterNames.includes("typevendeurs") && (
        <CheckboxGroupCarre
          title="Type de vendeurs"
          icon={<TbUserScreen className="text-sm" />}
          name="typevendeurs"
          options={typeVendeursOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}

      {/* Urgentes */}
      {!excludedFilterNames.includes("annoncesurgentes") && (
        <CheckboxGroupCarre
          title="Annonces urgentes"
          icon={<TfiAlarmClock className="text-sm" />}
          name="annoncesurgentes"
          options={annoncesUrgentesOptions}
          isValueSelected={isValueSelected}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
    </div>
  );
}
