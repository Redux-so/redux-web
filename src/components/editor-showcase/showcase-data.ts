export const SHOWCASE_FILENAME = "mount-fuji.jpg";
export const SHOWCASE_CANVAS_IMAGE = "/showcase/mount-fuji.jpg";
export const SHOWCASE_CANVAS_ALT =
  "Mount Fuji and Chureito Pagoda in winter";
export const SHOWCASE_STYLE_MATCH_REFERENCE_IMAGE =
  "/features/style-match-reference.jpg";
export const SHOWCASE_STYLE_MATCH_REFERENCE_ALT =
  "Mountain range at sunrise above a sea of clouds";
export const SHOWCASE_CANVAS_WIDTH = 682;
export const SHOWCASE_CANVAS_HEIGHT = 1024;

export const SHOWCASE_ADJUSTMENTS = {
  exposure: -8,
  contrast: 20,
  blacks: -20,
  whites: -6,
  highlights: -14,
  shadows: -10,
  vibrance: 22,
  saturation: 10,
  temperature: -18,
  tint: 6,
  hue: 0,
  sharpen: 14,
  noiseReduction: 10,
  vignette: 12,
  grain: 0,
  clarity: 18,
} as const;

export type ShowcaseAdjustments = {
  [K in keyof typeof SHOWCASE_ADJUSTMENTS]: number;
};

export type AdjustmentKey = keyof ShowcaseAdjustments;

export const SHOWCASE_CHAT_MESSAGES = [
  {
    id: "1",
    role: "user" as const,
    content:
      "Make the pagoda red pop against the snow and sky without making Mount Fuji look unnatural.",
    timestamp: new Date("2026-06-05T14:28:00"),
  },
  {
    id: "2",
    role: "assistant" as const,
    content:
      "Pushed vibrance to +22 and saturation to +10 so the pagoda reads richer. Contrast is at +20 to separate the red structure from the valley below.",
    timestamp: new Date("2026-06-05T14:28:00"),
  },
  {
    id: "3",
    role: "user" as const,
    content:
      "Cool down the sky and valley a touch, but keep that crisp winter feeling.",
    timestamp: new Date("2026-06-05T14:30:00"),
  },
  {
    id: "4",
    role: "assistant" as const,
    content:
      "Temperature is at -18 with tint +6 for a clean blue-gray sky while preserving the warm light hitting the left side of Fuji.",
    timestamp: new Date("2026-06-05T14:30:00"),
  },
  {
    id: "5",
    role: "user" as const,
    content:
      "Bring out detail in the snow on Fuji but don't clip the bright peak.",
    timestamp: new Date("2026-06-05T14:32:00"),
  },
  {
    id: "6",
    role: "assistant" as const,
    content:
      "Highlights pulled to -14, whites to -6, and clarity to +18. The ridgelines and snow texture should look sharper without blowing the summit.",
    timestamp: new Date("2026-06-05T14:32:00"),
  },
  {
    id: "7",
    role: "user" as const,
    content:
      "Deepen the city and tree line at the bottom so the mountain feels more dramatic.",
    timestamp: new Date("2026-06-05T14:34:00"),
  },
  {
    id: "8",
    role: "assistant" as const,
    content:
      "Blacks are at -20 and shadows at -10 to anchor the foreground. Exposure is at -8 for a moodier finish, with noise reduction +10, sharpen +14, and a light vignette at +12 to draw the eye to Fuji and the pagoda.",
    timestamp: new Date("2026-06-05T14:35:00"),
  },
] as const;

export type ShowcaseChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  imagePreview?: string;
};

export type ShowcasePendingChange = {
  key: string;
  label: string;
  from: number;
  to: number;
};

export const SHOWCASE_STYLE_MATCH_ADJUSTMENTS = {
  exposure: 5,
  contrast: 28,
  blacks: -12,
  whites: -6,
  highlights: -14,
  shadows: -18,
  vibrance: 18,
  saturation: 12,
  temperature: 22,
  tint: 8,
  hue: 0,
  sharpen: 10,
  noiseReduction: 8,
  vignette: 8,
  grain: 0,
  clarity: 12,
} as const satisfies ShowcaseAdjustments;

export const SHOWCASE_STYLE_MATCH_CANVAS_FILTER =
  "brightness(1.05) contrast(1.22) saturate(1.18) sepia(0.1) hue-rotate(12deg)";

export const SHOWCASE_STYLE_MATCH_CHAT_MESSAGES: ShowcaseChatMessage[] = [
  {
    id: "sm-1",
    role: "user",
    content:
      "Match the style of this reference and apply it to my photo on the canvas.",
    imagePreview: SHOWCASE_STYLE_MATCH_REFERENCE_IMAGE,
  },
  {
    id: "sm-2",
    role: "assistant",
    content:
      "I've applied Style Match from your reference. Temperature +22 for warm peach highlights on the sky and peak, tint +8, contrast +28 to emphasize the silhouette, saturation +12 and vibrance +18 for richer color, highlights -14 and shadows -18 with a cool blue offset in the darker areas, and a soft atmospheric haze in the lower third to match the misty valley look.",
  },
];

export const SHOWCASE_STYLE_MATCH_PENDING_CHANGES: ShowcasePendingChange[] = [
  { key: "temperature", label: "Temperature", from: 0, to: 22 },
  { key: "tint", label: "Tint", from: 0, to: 8 },
  { key: "contrast", label: "Contrast", from: 0, to: 28 },
  { key: "saturation", label: "Saturation", from: 0, to: 12 },
  { key: "vibrance", label: "Vibrance", from: 0, to: 18 },
];

export const SHOWCASE_PENDING_CHANGES: ShowcasePendingChange[] = [
  { key: "vibrance", label: "Vibrance", from: 0, to: 22 },
  { key: "saturation", label: "Saturation", from: 0, to: 10 },
  { key: "contrast", label: "Contrast", from: 0, to: 20 },
  { key: "temperature", label: "Temperature", from: 0, to: -18 },
  { key: "tint", label: "Tint", from: 0, to: 6 },
  { key: "highlights", label: "Highlights", from: 0, to: -14 },
  { key: "whites", label: "Whites", from: 0, to: -6 },
  { key: "clarity", label: "Clarity", from: 0, to: 18 },
  { key: "blacks", label: "Blacks", from: 0, to: -20 },
  { key: "shadows", label: "Shadows", from: 0, to: -10 },
  { key: "exposure", label: "Exposure", from: 0, to: -8 },
  { key: "noiseReduction", label: "Noise Reduction", from: 0, to: 10 },
  { key: "sharpen", label: "Sharpen", from: 0, to: 14 },
  { key: "vignette", label: "Vignette", from: 0, to: 12 },
];

export const SHOWCASE_HISTORY_VERSIONS = [
  {
    id: "v3",
    label: "Winter pagoda finish",
    createdAt: "2026-06-05T14:33:00Z",
  },
  { id: "v2", label: "Auto-saved", createdAt: "2026-06-05T14:17:00Z" },
  { id: "v1", label: "Original import", createdAt: "2026-06-05T13:35:00Z" },
] as const;

export const REDUX_DOCS_URL = "https://github.com/Redux-so";
export const REDUX_HELP_FEEDBACK_URL = "https://discord.com/invite/gzHrud9nee";
