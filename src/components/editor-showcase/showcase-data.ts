export const SHOWCASE_FILENAME = "mount-fuji.jpg";

export const SHOWCASE_ADJUSTMENTS = {
  exposure: -12,
  contrast: 24,
  blacks: -28,
  whites: -8,
  highlights: -16,
  shadows: -12,
  vibrance: 14,
  saturation: 8,
  temperature: -22,
  tint: 12,
  hue: 3,
  sharpen: 16,
  noiseReduction: 12,
  vignette: 14,
  grain: 3,
  clarity: 20,
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
      "I want this to feel more like blue hour — cool tones on the lake and sky, with Mount Fuji silhouetted against the twilight gradient.",
    timestamp: new Date("2026-06-05T14:28:00"),
  },
  {
    id: "2",
    role: "assistant" as const,
    content:
      "Got it. I've cooled temperature to -22 and pushed tint to +12 to bring out the purple and pink in the sky and its reflection in the water.",
    timestamp: new Date("2026-06-05T14:28:00"),
  },
  {
    id: "3",
    role: "user" as const,
    content:
      "Deepen the foreground reeds and hills — they should feel like silhouettes against the water.",
    timestamp: new Date("2026-06-05T14:30:00"),
  },
  {
    id: "4",
    role: "assistant" as const,
    content:
      "Blacks dropped to -28 and shadows to -12. The reeds along the lake shore and the forested hill should read much darker now.",
    timestamp: new Date("2026-06-05T14:30:00"),
  },
  {
    id: "5",
    role: "user" as const,
    content:
      "Add more separation between the mountain and the sky, but don't blow out the snow on the peak.",
    timestamp: new Date("2026-06-05T14:32:00"),
  },
  {
    id: "6",
    role: "assistant" as const,
    content:
      "Contrast is at +24, highlights pulled to -16, and whites at -8. The snow stays bright without losing detail.",
    timestamp: new Date("2026-06-05T14:32:00"),
  },
  {
    id: "7",
    role: "user" as const,
    content:
      "The blues in the sky could use a little more life. Smooth out any noise too.",
    timestamp: new Date("2026-06-05T14:34:00"),
  },
  {
    id: "8",
    role: "assistant" as const,
    content:
      "Vibrance +14, saturation +8, noise reduction +12. I also added clarity +20, sharpen +16, and a light vignette at +14 to frame Mount Fuji and the reflection. Exposure is at -12 for the twilight mood.",
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
    imagePreview: "/features/style-match-reference.jpg",
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
  { key: "temperature", label: "Temperature", from: 0, to: -22 },
  { key: "tint", label: "Tint", from: 0, to: 12 },
  { key: "blacks", label: "Blacks", from: 0, to: -28 },
  { key: "shadows", label: "Shadows", from: 0, to: -12 },
  { key: "contrast", label: "Contrast", from: 0, to: 24 },
  { key: "highlights", label: "Highlights", from: 0, to: -16 },
  { key: "whites", label: "Whites", from: 0, to: -8 },
  { key: "vibrance", label: "Vibrance", from: 0, to: 14 },
  { key: "saturation", label: "Saturation", from: 0, to: 8 },
  { key: "exposure", label: "Exposure", from: 0, to: -12 },
];

export const SHOWCASE_HISTORY_VERSIONS = [
  { id: "v3", label: "Blue hour finish", createdAt: "2026-06-05T14:33:00Z" },
  { id: "v2", label: "Auto-saved", createdAt: "2026-06-05T14:17:00Z" },
  { id: "v1", label: "Original import", createdAt: "2026-06-05T13:35:00Z" },
] as const;

export const REDUX_DOCS_URL = "https://github.com/Redux-so";
export const REDUX_HELP_FEEDBACK_URL = "https://discord.com/invite/gzHrud9nee";
