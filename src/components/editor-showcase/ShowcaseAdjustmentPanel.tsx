"use client";

import { useState, type MouseEvent } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Star01 } from "@untitledui/icons";

import { cn } from "@/lib/utils";

import AdjustmentSlider from "./AdjustmentSlider";
import type { ShowcaseAdjustments } from "./showcase-data";
import { SHOWCASE_TYPE } from "./showcase-typography";

const noop = (e: MouseEvent) => {
  e.preventDefault();
};

type SectionKey = "light" | "color" | "effects" | "retouch" | "transform";

function SectionHeader({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between px-6 py-2.5 transition-colors hover:bg-white/[0.04] first:pt-4"
    >
      <span className={cn("select-none", SHOWCASE_TYPE.sectionHeader)}>
        {label}
      </span>
      <ChevronDown
        size={12}
        className={cn(
          "text-[#555555] transition-transform",
          !open && "-rotate-90",
        )}
      />
    </button>
  );
}

function AIButton({
  label,
  looseSpacing,
}: {
  label: string;
  looseSpacing?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={noop}
      className={cn(
        "flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border border-[#682FBF]/30 bg-[#682FBF]/[0.1] px-3 transition-all duration-200 hover:border-[#682FBF]/50 hover:bg-[#682FBF]/[0.18] hover:shadow-glow-sm",
        looseSpacing ? "gap-1" : "gap-0",
        SHOWCASE_TYPE.aiButton,
      )}
    >
      <Star01
        className={cn(
          "size-[0.95em] shrink-0 text-[#9B6EE8]",
          !looseSpacing && "-mr-0.5",
        )}
      />
      <span
        className={cn(
          "inline-block origin-center scale-[0.8] truncate",
          !looseSpacing && "-ml-1",
        )}
      >
        {label}
      </span>
    </button>
  );
}

function ToolBtn({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={noop}
      className={cn(
        "flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 capitalize transition-colors hover:border-white/[0.15] hover:bg-white/[0.09]",
        SHOWCASE_TYPE.toolButton,
      )}
    >
      <span className="inline-block origin-center scale-[0.8] truncate">
        {label}
      </span>
    </button>
  );
}

type ShowcaseAdjustmentPanelProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  adjustments: ShowcaseAdjustments;
  onAdjustmentChange: (key: keyof ShowcaseAdjustments, value: number) => void;
};

export default function ShowcaseAdjustmentPanel({
  collapsed,
  onToggleCollapse,
  adjustments,
  onAdjustmentChange,
}: ShowcaseAdjustmentPanelProps) {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    light: true,
    color: true,
    effects: true,
    retouch: true,
    transform: true,
  });

  const toggleSection = (key: SectionKey) => {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <aside
      className={cn(
        "flex h-full min-w-0 shrink-0 flex-col overflow-hidden border-r border-white/[0.07] bg-black/50 backdrop-blur-xl transition-[width] duration-200 ease-out",
        collapsed ? "w-[44px]" : "w-[400px]",
      )}
    >
      <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-white/[0.07] px-6">
        {!collapsed ? (
          <span className={SHOWCASE_TYPE.panelHeader}>Adjustments</span>
        ) : null}
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={
            collapsed ? "Expand adjustments panel" : "Collapse adjustments panel"
          }
          className={cn(
            "text-[#555555] transition-colors hover:text-[#888888]",
            collapsed && "mx-auto",
          )}
        >
          {collapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>
      </div>

      {!collapsed ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <SectionHeader
            label="Light"
            open={openSections.light}
            onToggle={() => toggleSection("light")}
          />
          {openSections.light ? (
            <div>
              <AdjustmentSlider
                label="Exposure"
                value={adjustments.exposure}
                onChange={(v) => onAdjustmentChange("exposure", v)}
              />
              <AdjustmentSlider
                label="Contrast"
                value={adjustments.contrast}
                onChange={(v) => onAdjustmentChange("contrast", v)}
              />
              <AdjustmentSlider
                label="Blacks"
                value={adjustments.blacks}
                onChange={(v) => onAdjustmentChange("blacks", v)}
              />
              <AdjustmentSlider
                label="Whites"
                value={adjustments.whites}
                onChange={(v) => onAdjustmentChange("whites", v)}
              />
              <AdjustmentSlider
                label="Highlights"
                value={adjustments.highlights}
                onChange={(v) => onAdjustmentChange("highlights", v)}
              />
              <AdjustmentSlider
                label="Shadows"
                value={adjustments.shadows}
                onChange={(v) => onAdjustmentChange("shadows", v)}
              />
              <div className="flex flex-col gap-2 px-6 pb-1.5 pt-2.5">
                <AIButton label="Auto Enhance" />
                <AIButton label="Auto Tone Balance" />
              </div>
            </div>
          ) : null}

          <SectionHeader
            label="Color"
            open={openSections.color}
            onToggle={() => toggleSection("color")}
          />
          {openSections.color ? (
            <div>
              <AdjustmentSlider
                label="Vibrance"
                value={adjustments.vibrance}
                onChange={(v) => onAdjustmentChange("vibrance", v)}
              />
              <AdjustmentSlider
                label="Saturation"
                value={adjustments.saturation}
                onChange={(v) => onAdjustmentChange("saturation", v)}
              />
              <AdjustmentSlider
                label="Temperature"
                value={adjustments.temperature}
                onChange={(v) => onAdjustmentChange("temperature", v)}
                variant="temperature"
              />
              <AdjustmentSlider
                label="Tint"
                value={adjustments.tint}
                onChange={(v) => onAdjustmentChange("tint", v)}
                variant="tint"
              />
              <AdjustmentSlider
                label="Hue"
                value={adjustments.hue}
                onChange={(v) => onAdjustmentChange("hue", v)}
                variant="hue"
              />
              <div className="flex flex-col gap-2 px-6 pb-1.5 pt-2.5">
                <AIButton label="Smart Color Balance" />
                <AIButton label="Style Match" />
              </div>
            </div>
          ) : null}

          <SectionHeader
            label="Effects"
            open={openSections.effects}
            onToggle={() => toggleSection("effects")}
          />
          {openSections.effects ? (
            <div className="pb-2">
              <AdjustmentSlider
                label="Sharpen"
                value={adjustments.sharpen}
                onChange={(v) => onAdjustmentChange("sharpen", v)}
                min={0}
                max={100}
              />
              <AdjustmentSlider
                label="Noise Reduction"
                value={adjustments.noiseReduction}
                onChange={(v) => onAdjustmentChange("noiseReduction", v)}
                min={0}
                max={100}
              />
              <AdjustmentSlider
                label="Vignette"
                value={adjustments.vignette}
                onChange={(v) => onAdjustmentChange("vignette", v)}
                min={0}
                max={100}
              />
              <AdjustmentSlider
                label="Grain"
                value={adjustments.grain}
                onChange={(v) => onAdjustmentChange("grain", v)}
                min={0}
                max={100}
              />
              <AdjustmentSlider
                label="Clarity"
                value={adjustments.clarity}
                onChange={(v) => onAdjustmentChange("clarity", v)}
                min={0}
                max={100}
              />
            </div>
          ) : null}

          <SectionHeader
            label="Retouch"
            open={openSections.retouch}
            onToggle={() => toggleSection("retouch")}
          />
          {openSections.retouch ? (
            <div className="flex flex-col gap-2 px-6 pb-3 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <AIButton label="Heal" looseSpacing />
                <ToolBtn label="Blur" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ToolBtn label="Eraser" />
              </div>
            </div>
          ) : null}

          <SectionHeader
            label="Transform"
            open={openSections.transform}
            onToggle={() => toggleSection("transform")}
          />
          {openSections.transform ? (
            <div className="flex flex-col gap-2 px-6 pb-4 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <ToolBtn label="Crop" />
                <ToolBtn label="Rotate" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ToolBtn label="Straighten" />
                <ToolBtn label="Resize" />
              </div>
              <p className={SHOWCASE_TYPE.caption}>
                Edit / Expand
              </p>
              <AIButton label="Generative Fill" />
              <AIButton label="Remove Background" />
            </div>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}
