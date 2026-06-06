export const SHOWCASE_FILENAME = "mount-fuji-twilight.jpg";

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
      "Vibrance +14, saturation +8, noise reduction +12. I also added clarity +20, sharpen +16, and a light vignette at +14 to frame Mount Fuji and the reflection. Exposure is at -12 for the twilight mood. You're set.",
    timestamp: new Date("2026-06-05T14:35:00"),
  },
] as const;

export type ShowcaseChatMessage = (typeof SHOWCASE_CHAT_MESSAGES)[number];

export const SHOWCASE_USER = {
  name: "John Doe",
  credits: 1250,
  avatarUrl: null as string | null,
};
