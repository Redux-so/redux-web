export type LibraryShowcaseImage = {
  id: string;
  filename: string;
  src: string;
  alt: string;
};

export const SHOWCASE_LIBRARY_GREETING = "Good afternoon, Levi";

export type SmartSearchDemoScenario = {
  id: string;
  query: string;
  results: LibraryShowcaseImage[];
};

export const SHOWCASE_SKYLINE_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "s1",
    filename: "skyline-1.jpg",
    src: "/features/smart-search/skyline-1.jpg",
    alt: "Manhattan skyline with Empire State Building at golden hour",
  },
  {
    id: "s2",
    filename: "skyline-2.jpg",
    src: "/features/smart-search/skyline-2.jpg",
    alt: "Manhattan Bridge framed by brick buildings in Dumbo, Brooklyn",
  },
  {
    id: "s3",
    filename: "skyline-3.jpg",
    src: "/features/smart-search/skyline-3.jpg",
    alt: "Neon-lit Shibuya crossing at night, Tokyo",
  },
  {
    id: "s4",
    filename: "skyline-4.jpg",
    src: "/features/smart-search/skyline-4.jpg",
    alt: "Tokyo Tower illuminated above the city at dusk",
  },
  {
    id: "s5",
    filename: "skyline-5.jpg",
    src: "/features/smart-search/skyline-5.jpg",
    alt: "Motion-blurred pedestrians crossing an urban street at night",
  },
];

export const SHOWCASE_MOUNTAIN_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "m1",
    filename: "filler-3.jpg",
    src: "/features/smart-search/filler-3.jpg",
    alt: "Snow-capped mountain peaks above a sea of clouds",
  },
  {
    id: "m2",
    filename: "filler-4.jpg",
    src: "/features/smart-search/filler-4.jpg",
    alt: "Mount Fuji reflected in a lake at twilight",
  },
  {
    id: "m3",
    filename: "filler-7.jpg",
    src: "/features/smart-search/filler-7.jpg",
    alt: "Scottish highlands valley with mist and sunset light",
  },
  {
    id: "m4",
    filename: "filler-2.jpg",
    src: "/features/smart-search/filler-2.jpg",
    alt: "Desert canyon with sandstone cliffs",
  },
];

export const SHOWCASE_F1_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "car1",
    filename: "filler-6.jpg",
    src: "/features/smart-search/filler-6.jpg",
    alt: "Aston Martin Formula 1 racing car close-up",
  },
];

export const SHOWCASE_SEARCH_SCENARIOS: SmartSearchDemoScenario[] = [
  { id: "skyline", query: "skyline", results: SHOWCASE_SKYLINE_RESULTS },
  { id: "mountains", query: "mountains", results: SHOWCASE_MOUNTAIN_RESULTS },
  { id: "f1-car", query: "f1 car", results: SHOWCASE_F1_RESULTS },
];

export const SHOWCASE_LIBRARY_FILLER: LibraryShowcaseImage[] = [
  {
    id: "f1",
    filename: "filler-1.jpg",
    src: "/features/smart-search/filler-1.jpg",
    alt: "Full moon against a black sky",
  },
  {
    id: "f2",
    filename: "filler-2.jpg",
    src: "/features/smart-search/filler-2.jpg",
    alt: "Desert canyon with sandstone cliffs",
  },
  {
    id: "f3",
    filename: "filler-3.jpg",
    src: "/features/smart-search/filler-3.jpg",
    alt: "Snow-capped mountain peaks above a sea of clouds",
  },
  {
    id: "f4",
    filename: "filler-4.jpg",
    src: "/features/smart-search/filler-4.jpg",
    alt: "Mount Fuji reflected in a lake at twilight",
  },
  {
    id: "f5",
    filename: "filler-5.jpg",
    src: "/features/smart-search/filler-5.jpg",
    alt: "Coastal scene with concrete blocks at golden hour",
  },
  {
    id: "f6",
    filename: "filler-6.jpg",
    src: "/features/smart-search/filler-6.jpg",
    alt: "Aston Martin Formula 1 racing car close-up",
  },
  {
    id: "f7",
    filename: "filler-7.jpg",
    src: "/features/smart-search/filler-7.jpg",
    alt: "Scottish highlands valley with mist and sunset light",
  },
  {
    id: "f8",
    filename: "filler-8.jpg",
    src: "/features/smart-search/filler-8.jpg",
    alt: "Secluded beach with cliffs and turquoise water",
  },
  {
    id: "f9",
    filename: "filler-9.jpg",
    src: "/features/smart-search/filler-9.jpg",
    alt: "Minimal interior with open door and monstera plant",
  },
  {
    id: "f10",
    filename: "filler-10.jpg",
    src: "/features/smart-search/filler-10.jpg",
    alt: "Cozy bedroom with neutral tones and soft natural light",
  },
];

export const SHOWCASE_LIBRARY_ALBUMS = [
  { id: "a1", name: "Travel" },
  { id: "a2", name: "Cityscapes" },
] as const;

export const SHOWCASE_SEARCH_TYPE_MS = 52;
export const SHOWCASE_SEARCH_ERASE_MS = 28;
export const SHOWCASE_SEARCH_START_DELAY_MS = 240;
export const SHOWCASE_SEARCH_RESULTS_DELAY_MS = 160;
export const SHOWCASE_SEARCH_HOLD_MS = 3200;
export const SHOWCASE_SEARCH_IDLE_DELAY_MS = 300;

export type LibrarySearchDemoPhase = "idle" | "typing" | "results" | "erasing";
