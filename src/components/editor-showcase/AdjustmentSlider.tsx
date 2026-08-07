"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

export type SliderTrackVariant = "neutral" | "temperature" | "tint" | "hue";

interface AdjustmentSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  onCommit: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  trackVariant?: SliderTrackVariant;
}

const NEUTRAL_CENTER = "#888888";

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function lerpColor(from: string, to: string, amount: number): string {
  const t = clamp01(amount);
  const [fr, fg, fb] = hexToRgb(from);
  const [tr, tg, tb] = hexToRgb(to);
  return rgbToHex(fr + (tr - fr) * t, fg + (tg - fg) * t, fb + (tb - fb) * t);
}

function getTrackGradient(variant: SliderTrackVariant): string | null {
  switch (variant) {
    case "temperature":
      return `linear-gradient(to right, #5b8fd4 0%, ${NEUTRAL_CENTER} 50%, #e8a454 100%)`;
    case "tint":
      return `linear-gradient(to right, #6db87a 0%, ${NEUTRAL_CENTER} 50%, #c96db8 100%)`;
    case "hue":
      return "linear-gradient(to right, hsl(0,72%,58%), hsl(60,72%,58%), hsl(120,72%,58%), hsl(180,72%,58%), hsl(240,72%,58%), hsl(300,72%,58%), hsl(360,72%,58%))";
    default:
      return null;
  }
}

function getSliderAccentColor(
  variant: SliderTrackVariant,
  value: number,
  min: number,
  max: number,
): string {
  const t = clamp01((value - min) / (max - min));

  switch (variant) {
    case "temperature":
      if (t <= 0.5) return lerpColor("#5b8fd4", NEUTRAL_CENTER, t / 0.5);
      return lerpColor(NEUTRAL_CENTER, "#e8a454", (t - 0.5) / 0.5);
    case "tint":
      if (t <= 0.5) return lerpColor("#6db87a", NEUTRAL_CENTER, t / 0.5);
      return lerpColor(NEUTRAL_CENTER, "#c96db8", (t - 0.5) / 0.5);
    case "hue":
      return `hsl(${t * 360}, 72%, 58%)`;
    default:
      return "#e5e5e5";
  }
}

function formatSignedAdjustmentValue(value: number): string {
  const formatted = Number.isInteger(value)
    ? String(Math.abs(value))
    : Math.abs(value).toFixed(1);
  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return "0";
}

export default function AdjustmentSlider({
  label,
  value,
  onChange,
  onCommit,
  min = -100,
  max = 100,
  step = 1,
  trackVariant = "neutral",
}: AdjustmentSliderProps) {
  const defaultValue = Math.max(min, Math.min(max, 0));
  const isColorTrack = trackVariant !== "neutral";
  const trackGradient = getTrackGradient(trackVariant);
  const accentColor = getSliderAccentColor(trackVariant, value, min, max);

  function resetToDefault() {
    onChange(defaultValue);
    onCommit(defaultValue);
  }

  return (
    <div className="flex flex-col gap-3 px-8 py-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-medium text-[#e5e5e5] leading-none select-none">
          {label}
        </span>
        <span
          className="text-[15px] text-[#888888] leading-none tabular-nums cursor-default select-none"
          onDoubleClick={resetToDefault}
        >
          {formatSignedAdjustmentValue(value)}
        </span>
      </div>

      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        onValueCommit={([v]) => onCommit(v)}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track
          className={[
            "relative w-full grow rounded-full",
            isColorTrack ? "h-[5px]" : "h-[3px] bg-white/[0.08]",
          ].join(" ")}
          style={trackGradient ? { background: trackGradient } : undefined}
        >
          {isColorTrack ? (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[12px] w-px -translate-x-1/2 -translate-y-1/2 bg-white/25"
              />
              <SliderPrimitive.Range className="absolute h-full rounded-full bg-transparent" />
            </>
          ) : (
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-neutral-400" />
          )}
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          title="Double-click to reset"
          className={[
            "block h-[14px] w-[14px] rounded-full outline-none cursor-pointer transition-transform hover:scale-110",
            isColorTrack
              ? "shadow-[0_0_0_2px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.2)]"
              : "bg-[#e5e5e5] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]",
          ].join(" ")}
          style={isColorTrack ? { backgroundColor: accentColor } : undefined}
          onDoubleClick={(e) => {
            e.stopPropagation();
            resetToDefault();
          }}
        />
      </SliderPrimitive.Root>
    </div>
  );
}
