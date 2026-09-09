export type LibraryShowcaseImage = {
  id: string;
  filename: string;
  src: string;
  alt: string;
};

export const SHOWCASE_LIBRARY_GREETING = "Good afternoon, John";

export type SmartSearchDemoScenario = {
  id: string;
  query: string;
  results: LibraryShowcaseImage[];
};

const SEARCH_RESULTS_BASE = "/features/smart-search/results";

export const SHOWCASE_F1_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "f1-1",
    filename: "f1-1.jpg",
    src: `${SEARCH_RESULTS_BASE}/f1-1.jpg`,
    alt: "Formula One race car on track",
  },
];

export const SHOWCASE_MOUNTAIN_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "mountain-1",
    filename: "mountain-1.jpg",
    src: `${SEARCH_RESULTS_BASE}/mountain-1.jpg`,
    alt: "Mountain lake landscape",
  },
  {
    id: "mountain-2",
    filename: "mountain-2.jpg",
    src: `${SEARCH_RESULTS_BASE}/mountain-2.jpg`,
    alt: "Snowy mountain peaks",
  },
  {
    id: "mountain-3",
    filename: "mountain-3.jpg",
    src: `${SEARCH_RESULTS_BASE}/mountain-3.jpg`,
    alt: "Mountain range at sunrise",
  },
  {
    id: "mountain-4",
    filename: "mountain-4.jpg",
    src: `${SEARCH_RESULTS_BASE}/mountain-4.jpg`,
    alt: "Green mountain valley",
  },
];

export const SHOWCASE_URBAN_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "urban-1",
    filename: "urban-1.jpg",
    src: `${SEARCH_RESULTS_BASE}/urban-1.jpg`,
    alt: "Big Ben and the Palace of Westminster",
  },
  {
    id: "urban-2",
    filename: "urban-2.jpg",
    src: `${SEARCH_RESULTS_BASE}/urban-2.jpg`,
    alt: "New York City skyline",
  },
  {
    id: "urban-3",
    filename: "urban-3.jpg",
    src: `${SEARCH_RESULTS_BASE}/urban-3.jpg`,
    alt: "Modern waterfront city skyline",
  },
  {
    id: "urban-4",
    filename: "urban-4.jpg",
    src: `${SEARCH_RESULTS_BASE}/urban-4.jpg`,
    alt: "Tokyo street crossing at night",
  },
];

/** Fixed demo order: Mountain landscape → Urban city → Formula one car. */
export const SHOWCASE_SEARCH_SCENARIOS: SmartSearchDemoScenario[] = [
  {
    id: "mountains",
    query: "Mountain landscape",
    results: SHOWCASE_MOUNTAIN_RESULTS,
  },
  { id: "urban", query: "Urban city", results: SHOWCASE_URBAN_RESULTS },
  { id: "f1-car", query: "Formula one car", results: SHOWCASE_F1_RESULTS },
];

/** All showcase photos — source pool for the RECENT grid. */
export const SHOWCASE_LIBRARY_FILLER: LibraryShowcaseImage[] = [
  ...SHOWCASE_F1_RESULTS,
  ...SHOWCASE_MOUNTAIN_RESULTS,
  ...SHOWCASE_URBAN_RESULTS,
];

const RECENT_BLOCKED_FIRST_IDS = new Set([
  "f1-1",
  "mountain-1",
  "urban-1",
]);

function shuffleArray<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function ensureValidRecentLeadImage(
  images: LibraryShowcaseImage[],
): LibraryShowcaseImage[] {
  if (images.length === 0 || !RECENT_BLOCKED_FIRST_IDS.has(images[0].id)) {
    return images;
  }

  const swapIndex = images.findIndex(
    (image) => !RECENT_BLOCKED_FIRST_IDS.has(image.id),
  );
  if (swapIndex <= 0) {
    return images;
  }

  const reordered = [...images];
  [reordered[0], reordered[swapIndex]] = [
    reordered[swapIndex],
    reordered[0],
  ];
  return reordered;
}

/** One random pick per group, interleaved — Big Ben, F1, and Mount Fuji never lead. */
export function createMixedFillerGrid(): LibraryShowcaseImage[] {
  const pools = [
    shuffleArray(SHOWCASE_F1_RESULTS),
    shuffleArray(SHOWCASE_MOUNTAIN_RESULTS),
    shuffleArray(SHOWCASE_URBAN_RESULTS),
  ];
  const mixed: LibraryShowcaseImage[] = [];

  while (mixed.length < SHOWCASE_LIBRARY_FILLER.length) {
    const available = pools.filter((pool) => pool.length > 0);
    const pool = available[Math.floor(Math.random() * available.length)];
    mixed.push(pool.shift()!);
  }

  return ensureValidRecentLeadImage(mixed);
}

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
