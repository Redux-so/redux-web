import type { IconName } from "@/components/shared/Icon";

export type ToolkitItem = {
  name: string;
  description: string;
  icon: IconName;
};

/** Flat tool list — ordered by category adjacency, no visible category headers. */
export const TOOLKIT_ITEMS: ToolkitItem[] = [
  // Adjustments
  {
    name: "Exposure",
    description: "Brighten or darken the whole image.",
    icon: "Sun",
  },
  {
    name: "Contrast",
    description: "Add punch by deepening the tonal range.",
    icon: "Contrast01",
  },
  {
    name: "Blacks",
    description: "Deepen the darkest tones for richer shadows.",
    icon: "Moon01",
  },
  {
    name: "Whites",
    description: "Brighten the brightest tones for cleaner highlights.",
    icon: "SunSetting01",
  },
  {
    name: "Highlights",
    description: "Recover or adjust bright areas.",
    icon: "Zap",
  },
  {
    name: "Shadows",
    description: "Lift or adjust dark areas.",
    icon: "Moon02",
  },
  {
    name: "Auto Photo Enhance",
    description: "One-click AI-powered improvement.",
    icon: "MagicWand01",
  },
  {
    name: "Auto Tone Balance",
    description: "Let AI balance exposure and contrast for you.",
    icon: "Sliders02",
  },
  // Color Correction
  {
    name: "Vibrance",
    description: "Boost color intensity intelligently.",
    icon: "Colors",
  },
  {
    name: "Saturation",
    description: "Control overall color intensity.",
    icon: "Droplets01",
  },
  {
    name: "Temperature",
    description: "Shift the image warmer or cooler.",
    icon: "ThermometerWarm",
  },
  {
    name: "Tint",
    description: "Fine-tune the green/magenta balance.",
    icon: "Dropper",
  },
  {
    name: "Hue",
    description: "Shift the entire color spectrum.",
    icon: "Palette",
  },
  {
    name: "Smart Color Balance",
    description: "AI corrects unwanted color casts.",
    icon: "Sliders03",
  },
  {
    name: "Style Match",
    description: "Apply the look of any reference photo.",
    icon: "MagicWand02",
  },
  // Effects
  {
    name: "Sharpen",
    description: "Enhance edge definition and detail.",
    icon: "ZapFast",
  },
  {
    name: "Noise Reduction",
    description: "Remove grain and sensor noise.",
    icon: "FilterLines",
  },
  {
    name: "Vignette",
    description: "Darken the edges to draw focus inward.",
    icon: "Circle",
  },
  {
    name: "Grain",
    description: "Add authentic film texture.",
    icon: "DotsHorizontal",
  },
  {
    name: "Clarity",
    description: "Boost midtone contrast for extra depth.",
    icon: "Eye",
  },
  // Retouch
  {
    name: "Heal",
    description: "Remove blemishes and objects seamlessly.",
    icon: "MagicWand01",
  },
  {
    name: "Blur",
    description: "Soften distracting areas of the frame.",
    icon: "Drop",
  },
  {
    name: "Eraser",
    description: "Remove any part of an image.",
    icon: "Eraser",
  },
  // Transformation
  {
    name: "Crop",
    description: "Reframe your shot precisely.",
    icon: "Crop01",
  },
  {
    name: "Rotate/Flip",
    description: "Straighten or mirror an image.",
    icon: "FlipForward",
  },
  {
    name: "Straighten",
    description: "Auto-align tilted horizons.",
    icon: "RefreshCcw01",
  },
  {
    name: "Resize/Scale",
    description: "Resize for any platform.",
    icon: "Maximize02",
  },
  {
    name: "Generative Fill",
    description: "AI fills selected areas with context.",
    icon: "Expand04",
  },
  {
    name: "Remove Background",
    description: "AI extracts your subject instantly.",
    icon: "LayersTwo01",
  },
  // File Management
  {
    name: "Multi-Format Support",
    description: "Work in JPEG, PNG, or TIFF.",
    icon: "Image05",
  },
  {
    name: "Save/Export",
    description: "Save and export in one click.",
    icon: "Download01",
  },
  {
    name: "Upload",
    description: "Bring in images from anywhere.",
    icon: "Upload01",
  },
];
