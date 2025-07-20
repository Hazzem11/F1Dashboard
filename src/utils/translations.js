export const translations = {
  en: {
    // Header
    title: "Formula 1 Driver Statistics",
    selectYear: "Select Year",
    
    // DriverStats
    driverStats: "Driver Statistics",
    position: "Position",
    name: "Name",
    team: "Team",
    points: "Points",
    wins: "Wins",
    podiums: "Podiums",
    polePositions: "Pole Positions",
    fastestLaps: "Fastest Laps",
    
    // DriverComparison
    pointsComparison: "Points Comparison",
    view: "View",
    drivers: "Drivers",
    teams: "Teams",
    racesToInclude: "Races to include",
    selectAll: "Select All",
    deselectAll: "Deselect All",
    race: "Race",
    driverPointsAcrossRaces: "Driver Points across selected races",
    teamPointsAcrossRaces: "Team Points across selected races",
    
    // DriverScatterPlot
    driverPerformanceQuadrants: "Driver Performance Quadrants: Qualifying vs Race Finish",
    averageQualifyingPosition: "Average Qualifying Position",
    averageRaceFinishPosition: "Average Race Finish Position",
    lowerIsBetter: "(Lower = Better)",
    elite: "ELITE",
    goodQualifying: "Good Qualifying",
    goodRacing: "Good Racing",
    qualifyingSpecialist: "QUALIFYING SPECIALIST",
    poorRacing: "Poor Racing",
    raceCraftMaster: "RACE CRAFT MASTER",
    poorQualifying: "Poor Qualifying",
    struggling: "STRUGGLING",
    poorQualifyingPoorRacing: "Poor Qualifying Poor Racing",
    quadrantsDividedByMedian: "Quadrants are divided by median qualifying and race finish positions",
    hoverForDetails: "Hover over points to see detailed driver information and category",
    medianQual: "Median Qual",
    medianFinish: "Median Finish",
    
    // RaceEvolutionGraph
    raceEvolution: "Race Evolution",
    selectRace: "Select Race",
    australia: "Australia",
    china: "China",
    bahrain: "Bahrain",
    jeddah: "Jeddah",
    japan: "Japan",
    monaco: "Monaco",
    lap: "Lap",
    position: "Position",
    
    // Tooltips
    avgQualifying: "Avg Qualifying",
    avgRaceFinish: "Avg Race Finish",
    championshipPosition: "Championship Position",
    totalPoints: "Total Points",
    category: "Category",
    
    // Loading and Error states
    loading: "Loading F1 driver statistics...",
    error: "Error",
    failedToLoad: "Failed to load driver data. Please try again later.",
    retry: "Retry"
  },
  
  fr: {
    // Header
    title: "Statistiques des Pilotes de Formule 1",
    selectYear: "Sélectionner l'Année",
    
    // DriverStats
    driverStats: "Statistiques des Pilotes",
    position: "Position",
    name: "Nom",
    team: "Équipe",
    points: "Points",
    wins: "Victoires",
    podiums: "Podiums",
    polePositions: "Poles",
    fastestLaps: "Tours Rapides",
    
    // DriverComparison
    pointsComparison: "Comparaison des Points",
    view: "Vue",
    drivers: "Pilotes",
    teams: "Équipes",
    racesToInclude: "Courses à inclure",
    selectAll: "Tout Sélectionner",
    deselectAll: "Tout Désélectionner",
    race: "Course",
    driverPointsAcrossRaces: "Points des pilotes sur les courses sélectionnées",
    teamPointsAcrossRaces: "Points des équipes sur les courses sélectionnées",
    
    // DriverScatterPlot
    driverPerformanceQuadrants: "Quadrants de Performance des Pilotes: Qualification vs Arrivée",
    averageQualifyingPosition: "Position Moyenne en Qualification",
    averageRaceFinishPosition: "Position Moyenne d'Arrivée",
    lowerIsBetter: "(Plus Bas = Mieux)",
    elite: "ÉLITE",
    goodQualifying: "Bonne Qualification",
    goodRacing: "Bonne Course",
    qualifyingSpecialist: "SPÉCIALISTE DE QUALIFICATION",
    poorRacing: "Mauvaise Course",
    raceCraftMaster: "MAÎTRE DE LA COURSE",
    poorQualifying: "Mauvaise Qualification",
    struggling: "EN DIFFICULTÉ",
    poorQualifyingPoorRacing: "Mauvaise Qualification Mauvaise Course",
    quadrantsDividedByMedian: "Les quadrants sont divisés par les médianes de qualification et d'arrivée",
    hoverForDetails: "Survolez les points pour voir les détails du pilote et la catégorie",
    medianQual: "Médiane Qual",
    medianFinish: "Médiane Arrivée",
    
    // RaceEvolutionGraph
    raceEvolution: "Évolution de la Course",
    selectRace: "Sélectionner la Course",
    australia: "Australie",
    china: "Chine",
    bahrain: "Bahreïn",
    jeddah: "Djeddah",
    japan: "Japon",
    monaco: "Monaco",
    lap: "Tour",
    position: "Position",
    
    // Tooltips
    avgQualifying: "Moy. Qualification",
    avgRaceFinish: "Moy. Arrivée",
    championshipPosition: "Position au Championnat",
    totalPoints: "Points Totaux",
    category: "Catégorie",
    
    // Loading and Error states
    loading: "Chargement des statistiques F1...",
    error: "Erreur",
    failedToLoad: "Échec du chargement des données. Veuillez réessayer plus tard.",
    retry: "Réessayer"
  }
};

export const getTranslation = (key, language) => {
  return translations[language]?.[key] || translations.en[key] || key;
}; 