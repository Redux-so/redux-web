/** Typography scale matched to Redux editor reference */
export const SHOWCASE_TYPE = {
  /** Adjustments, Chat panel headers */
  panelHeader:
    "text-[14px] font-medium uppercase tracking-widest text-[#888888]",
  /** Light, Color, Effects section headers */
  sectionHeader:
    "text-[12px] font-medium uppercase tracking-[0.12em] text-[#666666]",
  /** Slider row labels */
  sliderLabel: "text-[12px] leading-none text-[#e5e5e5]",
  /** Slider row values */
  sliderValue: "text-[12px] tabular-nums leading-none text-white",
  /** Slider labels, button labels, chat body */
  body: "text-[13px] leading-normal",
  bodyPrimary: "text-[13px] leading-normal text-[#e5e5e5]",
  bodyMuted: "text-[13px] tabular-nums text-[#888888]",
  /** Filename, user name */
  uiLabel: "text-[13px] font-medium text-white",
  /** Auto-saved, credits, nav tabs */
  meta: "text-[12px] text-[#888888]",
  /** Placeholders, hints */
  hint: "text-[13px] leading-relaxed text-[#555555]",
  /** Toolbar / tool buttons */
  button: "text-[13px] font-medium leading-none",
  /** AI buttons in adjustment panel */
  aiButton: "text-[3px] font-medium leading-none text-[#C4A0F5]",
  /** Tool buttons in adjustment panel (Blur, Crop, etc.) */
  toolButton: "text-[3px] font-medium leading-none text-white/80",
  /** Edit / Expand sub-label */
  caption: "text-[11px] uppercase tracking-widest text-[#555555]",
} as const;
