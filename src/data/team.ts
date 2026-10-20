export type DoctoralStudent = {
  id: string;
  name: string;
  year: number;
  thesis?: string;
  photo?: string;
};

export const doctoralStudents: DoctoralStudent[] = [
  {
    id: "ait-ahmed-nihad",
    name: "Ait Ahmed Nihad",
    year: 2022,
    photo: "/team/ait-ahmed-nihad.jpg",
    thesis: "Système d'aide à la décision et de prévention des risques de changement climatique sur l'écosystèmes agro-écologiques",
  },
  {
    id: "andaloussi-nihad",
    name: "Andaloussi Nihad",
    year: 2025,
    photo: "/team/andaloussi-nihad.png",
    thesis: "Intelligent Optimization of the Supply Chain in the Wiring Harness Industry using AI approaches and Scientific Perspectives",
  },
  {
    id: "jebari-sohaib",
    name: "Jebari Sohaib",
    year: 2024,
    photo: "/team/jebari-sohaib.jpg",
    thesis: "AI Decision Support Workflow for Match Optimization in Football : From Investigating to Match Gameplay",
  },
  {
    id: "ouahid-mariyam",
    name: "Ouahid Mariyam",
    year: 2025,
    photo: "/team/ouahid-mariyam.jpg",
    thesis: "Architecture souveraine et intelligente pour la gouvernance des données nationales : intégration, interopérabilité et protection intelligente",
  },
  {
    id: "ouhatna-jamal",
    name: "Ouhatna Jamal",
    year: 2023,
    photo: "/team/ouhatna-jamal.jpg",
    thesis: "L'impact de l'intégration de l'intelligence artificielle dans les systèmes de radiothérapie adaptative en temps réel pour une personnalisation dynamique des traitements de cancer",
  },
  {
    id: "sadouq-zouhair-abdelghani",
    name: "Sadouq Zouhair Abdelghani",
    year: 2025,
    photo: "/team/sadouq-zouhair-abdelghani.png",
    thesis: "Écosystème intelligent interconnecté et inclusive pour le dépistage, la surveillance et la lutte contre l'hydatidose au Maroc",
  },
  {
    id: "bousselham-khtiri-towayba",
    name: "Bousselham Khtiri Towayba",
    year: 2023,
    photo: "/team/bousselham-khtiri-towayba.jpg",
    thesis: "Optimisation et prédiction pilotée par l'intelligence artificielle pour une consommation énergétique intelligente et efficace dans des systèmes durables",
  },
  {
    id: "khrouch-sarah",
    name: "Khrouch Sarah",
    year: 2017,
    thesis: "Système intelligent de suivi de l'évolution du cancer du sein pour l'adaptation efficace et personnalisée des traitements",
  },
  {
    id: "safa-nadine",
    name: "Safa Nadine",
    year: 2022,
    thesis: "Système intelligent de modélisation et d'optimisation des composants de matières premières pour la fabrication de batteries de haute qualité",
  },
];
