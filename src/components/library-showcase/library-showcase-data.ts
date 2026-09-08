import { BLANK_IMAGE_SRC } from "@/lib/blank-image";

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

export const SHOWCASE_SKYLINE_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "s1",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "s2",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "s3",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "s4",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "s5",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
];

export const SHOWCASE_MOUNTAIN_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "m1",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "m2",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "m3",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "m4",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
];

export const SHOWCASE_F1_RESULTS: LibraryShowcaseImage[] = [
  {
    id: "car1",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
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
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f2",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f3",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f4",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f5",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f6",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f7",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f8",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f9",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
  },
  {
    id: "f10",
    filename: "placeholder.svg",
    src: BLANK_IMAGE_SRC,
    alt: "",
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
