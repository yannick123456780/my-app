import { supabase } from "./supabase";

export async function fetchListings(taxonomy: any) {
  console.log("🔍 DONNÉES REÇUES:", taxonomy);

  try {
    if (!supabase) {
      console.error("❌ Supabase client non initialisé");
      return [];
    }

    let query = supabase.from("listings").select("*");

    // -----------------------------
    // FILTRES ÉGALITÉ SIMPLE
    // -----------------------------
    const applyEqFilter = (column: string, value?: string) => {
      if (!value) return;
      query = query.eq(column, value);
      console.log(`📁 Filtre ${column}:`, value);
    };

    applyEqFilter("category_slug", taxonomy.category);
    applyEqFilter("subcategory_slug", taxonomy.subcategory);

    // -----------------------------
    // FILTRES MULTI VALEURS
    // -----------------------------
    const applyFilter = (column: string, value?: string) => {
      if (!value) return;

      const values = value.split(",").filter(Boolean);

      if (values.length > 1) {
        query = query.in(column, values);
      } else if (values.length === 1) {
        query = query.eq(column, values[0]);
      }

      console.log(`🔎 Filtre ${column} appliqué:`, value);
    };

    applyFilter("typebien", taxonomy.filters?.typebien);
    applyFilter("typevente", taxonomy.filters?.typevente);
    applyFilter("etatdubien", taxonomy.filters?.etatdubien);
    applyFilter("etageappartement", taxonomy.filters?.etageappartement);
    applyFilter("avecascenseur", taxonomy.filters?.avecascenseur);
    applyFilter("typevendeurs", taxonomy.filters?.typevendeurs);
    applyFilter("typeservices", taxonomy.filters?.typeservices);
    applyFilter("typecontrat", taxonomy.filters?.typecontrat);
    applyFilter("secteuractivite", taxonomy.filters?.secteuractivite);
    applyFilter("fonction", taxonomy.filters?.fonction);
    applyFilter("niveauetude", taxonomy.filters?.niveauetude);
    applyFilter("experience", taxonomy.filters?.experience);
    applyFilter("exterieur", taxonomy.filters?.exterieur);
    applyFilter(
      "tempspleintempspartiel",
      taxonomy.filters?.tempspleintempspartiel,
    );
    applyFilter("domaine_formation", taxonomy.filters?.domaine_formation);
    applyFilter("typeenseignement", taxonomy.filters?.typeenseignement);
    applyFilter("etendrelivraison", taxonomy.filters?.etendrelivraison);
    applyFilter("univers", taxonomy.filters?.univers);
    applyFilter("universchaussures", taxonomy.filters?.universchaussures);

    applyFilter("taille", taxonomy.filters?.taille);
    applyFilter("typevetement", taxonomy.filters?.typevetement);
    applyFilter("marque", taxonomy.filters?.marque);
    applyFilter("pointure", taxonomy.filters?.pointure);
    applyFilter("produit", taxonomy.filters?.produit);

    applyFilter("typechaussures", taxonomy.filters?.typechaussures);
    applyFilter("marquechaussures", taxonomy.filters?.marquechaussures);

    applyFilter("marquemode", taxonomy.filters?.marquemode);
    applyFilter("couleur", taxonomy.filters?.couleur);
    applyFilter("universmontresbijoux", taxonomy.filters?.universmontresbijoux);
    applyFilter(
      "universaccessoiresbagagerie",
      taxonomy.filters?.universaccessoiresbagagerie,
    );
    applyFilter("marquemontresbijoux", taxonomy.filters?.marquemontresbijoux);
    applyFilter(
      "produitaccessoiresbagagerie",
      taxonomy.filters?.produitaccessoiresbagagerie,
    );
    applyFilter(
      "marqueaccessoiresbagagerie",
      taxonomy.filters?.marqueaccessoiresbagagerie,
    );

    applyFilter(
      "matiereaccessoiresbagagerie",
      taxonomy.filters?.matiereaccessoiresbagagerie,
    );
    applyFilter("matieremontresbijoux", taxonomy.filters?.matieremontresbijoux);
    // Nouveau filtre Ameublement
    applyFilter("typeameublement", taxonomy.filters?.typeameublement);
    applyFilter("matiereameublement", taxonomy.filters?.matiereameublement);
    applyFilter("marqueameublement", taxonomy.filters?.marqueameublement);

    applyFilter("etatameublement", taxonomy.filters?.etatameublement);

    applyFilter(
      "produitfournituresscolaires",
      taxonomy.filters?.produitfournituresscolaires,
    );

    applyFilter(
      "marquefournituresscolaires",
      taxonomy.filters?.marquefournituresscolaires,
    );

    applyFilter("typeelectromenager", taxonomy.filters?.typeelectromenager);

    applyFilter("typedeelectromenager", taxonomy.filters?.typedeelectromenager);

    applyFilter("typeartstable", taxonomy.filters?.typeartstable);
    applyFilter("marqueartstable", taxonomy.filters?.marqueartstable);

    applyFilter("matieretable", taxonomy.filters?.matieretable);

    applyFilter("typedecoration", taxonomy.filters?.typedecoration);

    applyFilter("matieredecoration", taxonomy.filters?.matieredecoration);
    applyFilter("styledecoration", taxonomy.filters?.styledecoration);

    applyFilter("typelinge", taxonomy.filters?.typelinge);

    applyFilter("familleproduit", taxonomy.filters?.familleproduit);

    applyFilter("famillemarque", taxonomy.filters?.famillemarque);

    applyFilter("familleetat", taxonomy.filters?.familleetat);

    applyFilter(
      "mobilierenfantproduit",
      taxonomy.filters?.mobilierenfantproduit,
    );

    applyFilter("mobilierenfantetat", taxonomy.filters?.mobilierenfantetat);
    applyFilter("typevetementbebe", taxonomy.filters?.typevetementbebe);

    applyFilter("vetementsbebetaille", taxonomy.filters?.vetementsbebetaille);

    //ElectroniqueFilters

    // FILTRE protectionpanne (checkbox unique)
    if (taxonomy.filters?.protectionpanne) {
      // Si la checkbox est cochée, "protectionpanne" contient "true"
      const values = taxonomy.filters.protectionpanne
        .split(",")
        .filter(Boolean);

      if (values.includes("true")) {
        query = query.eq("protectionpanne", true);
        console.log("🛗 Filtre protectionpanne: protectionpanne");
      }
    }

    //ElectroniqueFilters-Ordinateurs

    applyFilter("ordinateurmarque", taxonomy.filters?.ordinateurmarque);

    applyFilter("ordinateurtype", taxonomy.filters?.ordinateurtype);

    applyFilter("tailleecran", taxonomy.filters?.tailleecran);

    applyFilter(
      "ordinateurgeneraletat",
      taxonomy.filters?.ordinateurgeneraletat,
    );

    //ElectroniqueFilters-accessoires-informatique
    applyFilter(
      "accessoiresinformatiquemarque",
      taxonomy.filters?.accessoiresinformatiquemarque,
    );
    applyFilter(
      "accessoiresinformatiqueproduit",
      taxonomy.filters?.accessoiresinformatiqueproduit,
    );
    applyFilter(
      "accessoiresinformatiqueetat",
      taxonomy.filters?.accessoiresinformatiqueetat,
    );

    //ElectroniqueFilters-accessoires-tablettes-liseuses
    applyFilter(
      "tablettesliseusesproduit",
      taxonomy.filters?.tablettesliseusesproduit,
    );
    applyFilter(
      "tablettesliseusesmarque",
      taxonomy.filters?.tablettesliseusesmarque,
    );
    applyFilter(
      "tablettesliseusestailleecran",
      taxonomy.filters?.tablettesliseusestailleecran,
    );
    applyFilter(
      "tablettesliseusescapacitestockage",
      taxonomy.filters?.tablettesliseusescapacitestockage,
    );
    applyFilter(
      "tablettesliseusescouleur",
      taxonomy.filters?.tablettesliseusescouleur,
    );
    applyFilter(
      "tablettesliseusesetat",
      taxonomy.filters?.tablettesliseusesetat,
    );

    //ElectroniqueFilters-photo-audio-video
    applyFilter(
      "photoaudiovideomarque",
      taxonomy.filters?.photoaudiovideomarque,
    );
    applyFilter(
      "photoaudiovideoproduit",
      taxonomy.filters?.photoaudiovideoproduit,
    );
    applyFilter(
      "photoaudiovideocouleur",
      taxonomy.filters?.photoaudiovideocouleur,
    );
    applyFilter("photoaudiovideoetat", taxonomy.filters?.photoaudiovideoetat);

    //ElectroniqueFilters-telephones-objets-connectes
    applyFilter(
      "telephonesobjetsconnectesmarque",
      taxonomy.filters?.telephonesobjetsconnectesmarque,
    );
    applyFilter(
      "telephonesobjetsconnectesproduit",
      taxonomy.filters?.telephonesobjetsconnectesproduit,
    );
    applyFilter(
      "telephonesobjetsconnectescapacitestockage",
      taxonomy.filters?.telephonesobjetsconnectescapacitestockage,
    );
    applyFilter(
      "telephonesobjetsconnectescouleur",
      taxonomy.filters?.telephonesobjetsconnectescouleur,
    );
    applyFilter(
      "telephonesobjetsconnectesetat",
      taxonomy.filters?.telephonesobjetsconnectesetat,
    );

    applyFilter(
      "telephonesobjetsconnectesmodele",
      taxonomy.filters?.telephonesobjetsconnectesmodele,
    );

    //ElectroniqueFilters-accessoires-téléphone-objets-connectés
    applyFilter(
      "accessoirestelephoneobjetsconnectesproduit",
      taxonomy.filters?.accessoirestelephoneobjetsconnectesproduit,
    );
    applyFilter(
      "accessoirestelephoneobjetsconnectescouleur",
      taxonomy.filters?.accessoirestelephoneobjetsconnectescouleur,
    );
    applyFilter(
      "accessoirestelephoneobjetsconnectesetat",
      taxonomy.filters?.accessoirestelephoneobjetsconnectesetat,
    );
    //ElectroniqueFilters-consoles
    applyFilter("consolestype", taxonomy.filters?.consolestype);
    applyFilter("consolesmarque", taxonomy.filters?.consolesmarque);
    applyFilter("consolesmodele", taxonomy.filters?.consolesmodele);
    applyFilter("consolescouleur", taxonomy.filters?.consolescouleur);

    applyFilter("consolesetat", taxonomy.filters?.consolesetat);

    //ElectroniqueFilters-jeux-video
    applyFilter("jeuxvideoplatforme", taxonomy.filters?.jeuxvideoplatforme);
    applyFilter("jeuxvideoetat", taxonomy.filters?.jeuxvideoetat);

    //losirs

    //loisirs-antiquité
    applyFilter("loisirsproduit", taxonomy.filters?.loisirsproduit);
    applyFilter("loisirsmaterie", taxonomy.filters?.loisirsmaterie);
    applyFilter("loisirsepoque", taxonomy.filters?.loisirsepoque);
    applyFilter("loisirsstyle", taxonomy.filters?.loisirsstyle);
    applyFilter("loisirsetat", taxonomy.filters?.loisirsetat);

 //loisirs-billeterie
    applyFilter("billeterietype", taxonomy.filters?.billeterietype);

    //loisirs-collection
    applyFilter("collectionproduit", taxonomy.filters?.collectionproduit);
applyFilter("collectionepoque", taxonomy.filters?.collectionepoque);
applyFilter("collectionconditionnement", taxonomy.filters?.collectionconditionnement);
applyFilter("collectionetat", taxonomy.filters?.collectionetat);


//loisirs-cd-musique
applyFilter("cdmusiquesupport", taxonomy.filters?.cdmusiquesupport);
applyFilter("cdmusiquegenre", taxonomy.filters?.cdmusiquegenre);
applyFilter("cdmusiqueetat", taxonomy.filters?.cdmusiqueetat);

//loisirs-dvd-films
applyFilter("dvdfilmsupport", taxonomy.filters?.dvdfilmsupport);
applyFilter("dvdfilmgenre", taxonomy.filters?.dvdfilmgenre);
applyFilter("dvdfilmedition", taxonomy.filters?.dvdfilmedition);
applyFilter("dvdfilmpackaging", taxonomy.filters?.dvdfilmpackaging);
applyFilter("dvdfilmetat", taxonomy.filters?.dvdfilmetat);


//loisirs-instruments de musique
applyFilter("instrumentsunivers", taxonomy.filters?.instrumentsunivers);
applyFilter("instrumentsproduit", taxonomy.filters?.instrumentsproduit);
applyFilter("instrumentsmarque", taxonomy.filters?.instrumentsmarque);
applyFilter("instrumentsniveau", taxonomy.filters?.instrumentsniveau);
applyFilter("instrumentsetat", taxonomy.filters?.instrumentsetat);

 //loisirs-livres
 applyFilter("livresformat", taxonomy.filters?.livresformat);
applyFilter("livresgenre", taxonomy.filters?.livresgenre);
applyFilter("livreslangue", taxonomy.filters?.livreslangue);
applyFilter("livresetat", taxonomy.filters?.livresetat);


//loisirs-modelisme
applyFilter("modelismeproduit", taxonomy.filters?.modelismeproduit);
applyFilter("modelismeechelle", taxonomy.filters?.modelismeechelle);
applyFilter("modelismemarque", taxonomy.filters?.modelismemarque);
applyFilter("modelismeetat", taxonomy.filters?.modelismeetat);

//loisirs-vinsgastronomie
applyFilter("vinsgastronomieunivers", taxonomy.filters?.vinsgastronomieunivers);
applyFilter("vinsgastronomieetat", taxonomy.filters?.vinsgastronomieetat);

//loisirs-jeuxjouets
applyFilter("jeuxjouetsage", taxonomy.filters?.jeuxjouetsage);
applyFilter("jeuxjouetsproduit", taxonomy.filters?.jeuxjouetsproduit);
applyFilter("jeuxjouetsetat", taxonomy.filters?.jeuxjouetsetat);
applyFilter("jeuxjouetsmarque", taxonomy.filters?.jeuxjouetsmarque);

//loisirs-sportpleinair
applyFilter("sportpleinairactivite", taxonomy.filters?.sportpleinairactivite);
applyFilter("sportpleinairtat", taxonomy.filters?.sportpleinairtat);

//loisirs-loisirs-creatifs
applyFilter("loisirscreatifsproduit", taxonomy.filters?.loisirscreatifsproduit);
applyFilter("loisirscreatifscible", taxonomy.filters?.loisirscreatifscible);
applyFilter("loisirscreatifsetat", taxonomy.filters?.loisirscreatifsetat);


//loisirs-velos
applyFilter("velosunivers", taxonomy.filters?.velosunivers);
applyFilter("velostype", taxonomy.filters?.velostype);
applyFilter("velostaillevelo", taxonomy.filters?.velostaillevelo);
applyFilter("velostailletoue", taxonomy.filters?.velostailletoue);
applyFilter("velosmarque", taxonomy.filters?.velosmarque);
applyFilter("veloscouleur", taxonomy.filters?.veloscouleur);
applyFilter("velosetat", taxonomy.filters?.velosetat);


//loisirs-velos
applyFilter("equipementvelosunivers", taxonomy.filters?.equipementvelosunivers);
applyFilter("equipementvelosproduit", taxonomy.filters?.equipementvelosproduit);
applyFilter("equipementvelosmarque", taxonomy.filters?.equipementvelosmarque);
applyFilter("equipementvelostaille", taxonomy.filters?.equipementvelostaille);
applyFilter("equipementvelosetat", taxonomy.filters?.equipementvelosetat);




    // Filtres localisation
    applyFilter("pays", taxonomy.filters?.pays);
    applyFilter("ville", taxonomy.filters?.ville);
    applyFilter("quartier", taxonomy.filters?.quartier);

    // -----------------------------
    // FILTRES MIN / MAX NUMÉRIQUES
    // -----------------------------
    const applyRangeFilter = (
      column: string,
      min?: string,
      max?: string,
      label?: string,
    ) => {
      if (min && min !== "") {
        const value = parseFloat(min);
        if (!isNaN(value)) {
          query = query.gte(column, value);
          console.log(`📏 Filtre ${label || column} min appliqué:`, value);
        }
      }

      if (max && max !== "") {
        const value = parseFloat(max);
        if (!isNaN(value)) {
          query = query.lte(column, value);
          console.log(`📏 Filtre ${label || column} max appliqué:`, value);
        }
      }
    };

    applyRangeFilter(
      "surface",
      taxonomy.surfaceMin,
      taxonomy.surfaceMax,
      "surface",
    );

    applyRangeFilter(
      "surfaceterrain",
      taxonomy.surfaceterrainMin,
      taxonomy.surfaceterrainMax,
      "surface terrain",
    );

    applyRangeFilter("price", taxonomy.priceMin, taxonomy.priceMax, "prix");

    // -----------------------------
    // FILTRES ROOMS / CHAMBRES
    // -----------------------------
    const applyRoomsFilter = (column: string, min?: string, max?: string) => {
      if (!min && !max) return;

      console.log(`🛏️ Filtre ${column} - min:`, min, "max:", max);

      if (min) {
        if (min === "8+") {
          query = query.gte(column, 8);
          console.log(`🛏️ Filtre ${column} min 8+ → ${column} >= 8`);
        } else {
          const value = parseInt(min, 10);
          if (!isNaN(value)) {
            query = query.gte(column, value);
            console.log(`🛏️ Filtre ${column} min appliqué:`, value);
          }
        }
      }

      if (max) {
        if (max === "8+") {
          console.log(
            `🛏️ Filtre ${column} max 8+ ignoré (pas de limite supérieure)`,
          );
        } else {
          const value = parseInt(max, 10);
          if (!isNaN(value)) {
            query = query.lte(column, value);
            console.log(`🛏️ Filtre ${column} max appliqué:`, value);
          }
        }
      }
    };

    applyRoomsFilter("rooms", taxonomy.roomsMin, taxonomy.roomsMax);
    applyRoomsFilter("chambres", taxonomy.chambresMin, taxonomy.chambresMax);

    // -----------------------------
    // TRI
    // -----------------------------
    if (taxonomy.filters?.tri) {
      const sort = taxonomy.filters.tri;
      switch (sort) {
        case "price-asc":
          query = query.order("price", { ascending: true });
          break;
        case "price-desc":
          query = query.order("price", { ascending: false });
          break;
        case "recent":
          query = query.order("created_at", { ascending: false });
          break;
        case "ancien":
          query = query.order("created_at", { ascending: true });
          break;
        case "pertinence":
          // Soit on ignore, soit on utilise un fallback (ex: recent)
          query = query.order("created_at", { ascending: false });
          break;
      }
    }

    // FILTRE ASCENSEUR (checkbox unique)
    if (taxonomy.filters?.avecascenseur) {
      // Si la checkbox est cochée, "avecascenseur" contient "true"
      const values = taxonomy.filters.avecascenseur.split(",").filter(Boolean);

      if (values.includes("true")) {
        query = query.eq("avecascenseur", true);
        console.log("🛗 Filtre ascenseur: avec ascenseur");
      }
    }

    // FILTRE Annonces urgentes (checkbox unique)
    if (taxonomy.filters?.annoncesurgentes) {
      // Si la checkbox est cochée, "annoncesurgentes" contient "true"
      const values = taxonomy.filters.annoncesurgentes
        .split(",")
        .filter(Boolean);

      if (values.includes("true")) {
        query = query.eq("annoncesurgentes", true);
        console.log("🛗 Filtre annoncesurgentes: annonces urgentes");
      }
    }

    // FILTRE Statu de l'Anonnce (checkbox unique)
    if (taxonomy.filters?.statutannonce) {
      // Si la checkbox est cochée, "statutannonce" contient "true"
      const values = taxonomy.filters.statutannonce.split(",").filter(Boolean);

      if (values.includes("true")) {
        query = query.eq("statutannonce", true);
        console.log("🛗 Filtre statutannonce: statut de l'annonce");
      }
    }

    // FILTRE Eligible cpf (checkbox unique)
    if (taxonomy.filters?.eligiblecpf) {
      // Si la checkbox est cochée, "eligiblecpf" contient "true"
      const values = taxonomy.filters.eligiblecpf.split(",").filter(Boolean);

      if (values.includes("true")) {
        query = query.eq("eligiblecpf", true);
        console.log("🛗 Filtre eligiblecpf: eligiblecpf");
      }
    }

    // FILTRE TypeAnnonce (checkbox unique)
    if (taxonomy.filters?.typeannonces) {
      const type = taxonomy.filters.typeannonces;
      query = query.eq("typeannonces", type); // Assure-toi que la colonne existe dans Supabase
      console.log("📌 Filtre Type d’annonces appliqué:", type);
    }

    // -----------------------------
    // EXÉCUTION
    // -----------------------------

    // -----------------------------
    // RECHERCHE TEXTE
    // -----------------------------
    if (taxonomy.search?.trim()) {
      const search = taxonomy.search.trim();
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
      console.log(
        "🔍 Recherche OR:",
        `title.ilike.%${search}%,description.ilike.%${search}%`,
      );
      console.log("🔍 DONNÉES REÇUES:", JSON.stringify(taxonomy, null, 2));
    }

    console.log("📤 Exécution de la requête Supabase...");
    const { data, error } = await query;

    if (error) {
      console.error("❌ ERREUR SUPABASE DÉTAILLÉE:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      if (error.code === "42703") {
        console.error(
          "🔧 Colonne manquante dans la table. Vérifiez le nom des colonnes dans Supabase.",
        );
      }

      return [];
    }

    console.log(`✅ ${data?.length || 0} annonces trouvées`);
    return data || [];
  } catch (error) {
    console.error("💥 ERREUR CRITIQUE:", error);
    return [];
  }
}
