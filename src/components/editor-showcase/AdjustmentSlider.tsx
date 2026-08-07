"use client";

import * as Slider from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

import { SHOWCASE_TYPE } from "./showcase-typography";

type AdjustmentSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  variant?: "neutral" | "temperature" | "tint" | "hue";
};

function parseHex(hex: string) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function lerpColor(from: string, to: string, amount: number) {
  const start = parseHex(from);
  const end = parseHex(to);
  const mix = Math.min(1, Math.max(0, amount));
  const r = Math.round(start.r + (end.r - start.r) * mix);
  const g = Math.round(start.g + (end.g - start.g) * mix);
  const b = Math.round(start.b + (end.b - start.b) * mix);
  return `rgb(${r}, ${g}, ${b})`;
}

function getThumbColor(
  variant: AdjustmentSliderProps["variant"],
  value: number,
  min: number,
  max: number,
) {
  const ratio = (value - min) / (max - min);

  switch (variant) {
    case "temperature":
      if (ratio <= 0.5) {
        return lerpColor("#3b82f6", "#e5e5e5", ratio * 2);
      }
      return lerpColor("#e5e5e5", "#f97316", (ratio - 0.5) * 2);
    case "tint":
      if (ratio <= 0.5) {
        return lerpColor("#22c55e", "#e5e5e5", ratio * 2);
      }
      return lerpColor("#e5e5e5", "#ec4899", (ratio - 0.5) * 2);
    case "hue":
      return `hsl(${(ratio * 360).toFixed(0)} 72% 52%)`;
    default:
      return "#e5e5e5";
  }
}

export default function AdjustmentSlider({
  label,
  value,
  onChange,
  min = -100,
  max = 100,
  variant = "neutral",
}: AdjustmentSliderProps) {
  const isColorVariant = variant !== "neutral";
  const thumbColor = getThumbColor(variant, value, min, max);

  const trackClass = cn(
    "relative w-full grow rounded-full",
    variant === "neutral" && "h-[2px] bg-brand-border",
    variant === "temperature" &&
      "h-[4px] bg-gradient-to-r from-[#3b82f6] via-[#d4d4d4] to-[#f97316]",
    variant === "tint" &&
      "h-[4px] bg-gradient-to-r from-[#22c55e] via-[#d4d4d4] to-[#ec4899]",
    variant === "hue" &&
      "h-[4px] bg-gradient-to-r from-[#ef4444] via-[#eab308] via-[#22c55e] via-[#3b82f6] to-[#a855f7]",
  );

  return (
    <div className="px-6 py-1.5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className={SHOWCASE_TYPE.sliderLabel}>{label}</span>
        <span className={SHOWCASE_TYPE.sliderValue}>{value}</span>
      </div>
      <Slider.Root
        className="relative flex h-3 w-full touch-none select-none items-center"
        value={[value]}
        onValueChange={([next]) => onChange(next)}
        min={min}
        max={max}
        step={1}
      >
        <Slider.Track className={trackClass}>
          {variant === "neutral" ? (
            <Slider.Range className="absolute h-full rounded-full bg-[#a3a3a3]" />
          ) : null}
        </Slider.Track>
        <Slider.Thumb
          className={cn(
            "block size-3 rounded-full border border-white/20 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40",
            !isColorVariant && "bg-[#e5e5e5]",
          )}
          style={isColorVariant ? { backgroundColor: thumbColor } : undefined}
          aria-label={label}
        />
      </Slider.Root>
    </div>
  );
}
