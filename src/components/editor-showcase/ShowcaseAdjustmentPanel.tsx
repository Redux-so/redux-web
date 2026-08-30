"use client";

import { useState, type ReactNode } from "react";

import { Icon, type IconName } from "@/components/shared/Icon";
import { BTN_PRIMARY_PANEL, BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { PANEL_HEADER, PANEL_TITLE } from "@/lib/panel-chrome";
import {
  SURFACE_BTN_ACTIVE,
  SURFACE_BTN_IDLE,
  SURFACE_SECONDARY_BTN,
} from "@/lib/surface-colors";
import { DiscordIcon, GithubIcon } from "@/lib/brand-social-icons";

import AdjustmentSlider, { type SliderTrackVariant } from "./AdjustmentSlider";
import ShowcaseHistoryVersionList from "./ShowcaseHistoryVersionList";
import {
  REDUX_DOCS_URL,
  REDUX_HELP_FEEDBACK_URL,
  type AdjustmentKey,
  type ShowcaseAdjustments,
} from "./showcase-data";

type ToolSection = "light" | "color" | "effects" | "retouch" | "transform" | "history";
type ActiveTool = "blur" | "eraser" | "heal" | null;

const TOOL_SECTIONS: {
  id: Exclude<ToolSection, "history">;
  label: string;
  title: string;
  iconName: IconName;
}[] = [
  { id: "light", label: "Light", title: "Light adjustments", iconName: "Sun" },
  { id: "color", label: "Color", title: "Color adjustments", iconName: "Colors" },
  { id: "effects", label: "Effects", title: "Effects adjustments", iconName: "Star04" },
  { id: "retouch", label: "Retouch", title: "Retouch tools", iconName: "Brush01" },
  { id: "transform", label: "Transform", title: "Crop and geometry", iconName: "Crop01" },
];

const RAIL_ICON_STROKE = 1.25;
const RAIL_ICON_SIZE = 24;
const RAIL_BRAND_ICON_SIZE = 22;
const RAIL_ICON_STROKE_OVERRIDES: Partial<Record<IconName, number>> = {
  Sun: 1.7,
};

const LIGHT_ADJUSTMENTS: { key: AdjustmentKey; label: string }[] = [
  { key: "exposure", label: "Exposure" },
  { key: "contrast", label: "Contrast" },
  { key: "blacks", label: "Blacks" },
  { key: "whites", label: "Whites" },
  { key: "highlights", label: "Highlights" },
  { key: "shadows", label: "Shadows" },
];

const COLOR_TRACK_VARIANTS: Partial<Record<AdjustmentKey, SliderTrackVariant>> = {
  temperature: "temperature",
  tint: "tint",
  hue: "hue",
};

const COLOR_ADJUSTMENTS: { key: AdjustmentKey; label: string }[] = [
  { key: "vibrance", label: "Vibrance" },
  { key: "saturation", label: "Saturation" },
  { key: "temperature", label: "Temperature" },
  { key: "tint", label: "Tint" },
  { key: "hue", label: "Hue" },
];

const EFFECTS_ADJUSTMENTS: { key: AdjustmentKey; label: string }[] = [
  { key: "sharpen", label: "Sharpen" },
  { key: "noiseReduction", label: "Noise Reduction" },
  { key: "vignette", label: "Vignette" },
  { key: "grain", label: "Grain" },
  { key: "clarity", label: "Clarity" },
];

type ShowcaseAdjustmentPanelProps = {
  adjustments: ShowcaseAdjustments;
  onPreview: (key: AdjustmentKey, value: number) => void;
  onCommit: (key: AdjustmentKey, value: number) => void;
};

function RailIcon({ iconName }: { iconName: IconName }) {
  return (
    <Icon
      name={iconName}
      size={RAIL_ICON_SIZE}
      strokeWidth={RAIL_ICON_STROKE_OVERRIDES[iconName] ?? RAIL_ICON_STROKE}
      aria-hidden
    />
  );
}

function RailBtn({
  active,
  title,
  onClick,
  children,
}: {
  active: boolean;
  title: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={[
        "flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border transition-colors",
        active ? `${SURFACE_BTN_ACTIVE} !text-white` : SURFACE_BTN_IDLE,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function RailLink({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      title={title}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#101010] text-[#888888] transition-colors hover:bg-[#1a1a1a] hover:text-white"
    >
      {children}
    </a>
  );
}

function AIButton({ label }: { label: string }) {
  return (
    <button type="button" className={`${BTN_PRIMARY_SOLID} w-full`}>
      <Icon name="Star01" size={16} aria-hidden />
      {label}
    </button>
  );
}

function ToolBtn({
  label,
  active,
  onClick,
}: {
  label: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? `${BTN_PRIMARY_SOLID} w-full capitalize`
          : `flex w-full items-center justify-center h-9 px-3 text-[13px] font-medium capitalize rounded-md text-white/80 ${SURFACE_SECONDARY_BTN}`
      }
    >
      {label}
    </button>
  );
}

export default function ShowcaseAdjustmentPanel({
  adjustments,
  onPreview,
  onCommit,
}: ShowcaseAdjustmentPanelProps) {
  const [activeSection, setActiveSection] = useState<ToolSection | null>("light");
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [showStraighten, setShowStraighten] = useState(false);
  const [straightenDeg, setStraightenDeg] = useState(0);
  const [showResize, setShowResize] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState(50);

  function toggleActiveSection(section: ToolSection) {
    setActiveSection((prev) => (prev === section ? null : section));
  }

  function toggleTool(tool: ActiveTool) {
    setActiveTool((prev) => (prev === tool ? null : tool));
  }

  const activeSectionMeta = TOOL_SECTIONS.find((s) => s.id === activeSection);
  const activeSectionLabel =
    activeSection === "history" ? "History" : activeSectionMeta?.label ?? "";

  return (
    <div className="flex h-full min-w-0 shrink-0">
      <div className="flex h-full w-[72px] shrink-0 flex-col items-center border-r border-[#2a2a2a] bg-[#101010]">
        <div className="flex flex-col items-center gap-4 py-4">
          {TOOL_SECTIONS.map(({ id, title, iconName }) => (
            <RailBtn
              key={id}
              active={activeSection === id}
              title={title}
              onClick={() => toggleActiveSection(id)}
            >
              <RailIcon iconName={iconName} />
            </RailBtn>
          ))}
          <RailBtn
            active={activeSection === "history"}
            title="Version history"
            onClick={() => toggleActiveSection("history")}
          >
            <RailIcon iconName="ClockRewind" />
          </RailBtn>
        </div>

        <div className="mt-auto flex w-full shrink-0 flex-col items-center gap-4 pb-4">
          <RailLink href={REDUX_DOCS_URL} title="GitHub">
            <GithubIcon className="h-[22px] w-[22px]" />
          </RailLink>
          <RailLink href={REDUX_HELP_FEEDBACK_URL} title="Help & Feedback">
            <DiscordIcon className="h-[22px] w-[22px]" />
          </RailLink>
          <button
            type="button"
            aria-label="Account menu"
            className="flex h-12 w-12 shrink-0 cursor-default items-center justify-center rounded-xl border border-[#101010] text-white/40 transition-colors hover:bg-[#1a1a1a] hover:text-white"
          >
            <div className="h-[36px] w-[36px] shrink-0 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]" />
          </button>
        </div>
      </div>

      <div
        className={[
          "flex h-full min-w-0 shrink-0 flex-col overflow-hidden bg-[#101010] transition-[width] duration-200 ease-out",
          activeSection
            ? "w-[360px] rounded-r-2xl border-r border-[#2a2a2a]"
            : "w-0 border-r-0",
        ].join(" ")}
      >
        {activeSection ? (
          <div className="flex h-full w-[360px] min-w-[360px] flex-col">
            <div className={`${PANEL_HEADER} px-8`}>
              <span className={PANEL_TITLE}>{activeSectionLabel}</span>
            </div>

            {activeSection === "history" ? (
              <ShowcaseHistoryVersionList />
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto" data-panel-scroll>
                {activeSection === "light" && (
                  <div className="pb-4 pt-4">
                    {LIGHT_ADJUSTMENTS.map(({ key, label }) => (
                      <AdjustmentSlider
                        key={key}
                        label={label}
                        value={adjustments[key]}
                        onChange={(v) => onPreview(key, v)}
                        onCommit={(v) => onCommit(key, v)}
                      />
                    ))}
                    <div className="flex flex-col gap-3 px-8 pb-3 pt-5">
                      <AIButton label="Auto Enhance" />
                      <AIButton label="Auto Tone Balance" />
                    </div>
                  </div>
                )}

                {activeSection === "color" && (
                  <div className="pb-4 pt-4">
                    {COLOR_ADJUSTMENTS.map(({ key, label }) => (
                      <AdjustmentSlider
                        key={key}
                        label={label}
                        value={adjustments[key]}
                        onChange={(v) => onPreview(key, v)}
                        onCommit={(v) => onCommit(key, v)}
                        trackVariant={COLOR_TRACK_VARIANTS[key] ?? "neutral"}
                      />
                    ))}
                    <div className="flex flex-col gap-3 px-8 pb-3 pt-5">
                      <AIButton label="Smart Color Balance" />
                      <AIButton label="Style Match" />
                    </div>
                  </div>
                )}

                {activeSection === "effects" && (
                  <div className="pb-4 pt-4">
                    {EFFECTS_ADJUSTMENTS.map(({ key, label }) => (
                      <AdjustmentSlider
                        key={key}
                        label={label}
                        value={adjustments[key]}
                        onChange={(v) => onPreview(key, v)}
                        onCommit={(v) => onCommit(key, v)}
                      />
                    ))}
                  </div>
                )}

                {activeSection === "retouch" && (
                  <div className="flex flex-col gap-3 px-8 pb-5 pt-4">
                    <ToolBtn
                      label="Blur"
                      active={activeTool === "blur"}
                      onClick={() => toggleTool("blur")}
                    />
                    {activeTool === "blur" && (
                      <div className="flex flex-col gap-3 pt-1">
                        <p className="text-[10px] leading-snug text-[#555555]">
                          Paint over the area to blur in yellow, then confirm.
                        </p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="shrink-0 text-[11px] text-[#888888]">
                            Intensity
                          </span>
                          <input
                            type="range"
                            min={1}
                            max={100}
                            step={1}
                            value={blurIntensity}
                            onChange={(e) => setBlurIntensity(Number(e.target.value))}
                            className="h-[3px] flex-1 cursor-pointer accent-[#794ADE]"
                          />
                          <span className="w-[24px] shrink-0 text-right text-[11px] text-[#888888]">
                            {blurIntensity}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveTool(null)}
                            className="h-[34px] flex-1 cursor-pointer rounded-md border border-[#2a2a2a] bg-[#1a1a1a] text-[13px] text-white transition-colors hover:border-[#363636]"
                          >
                            Cancel
                          </button>
                          <button type="button" className={BTN_PRIMARY_PANEL}>
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                    <ToolBtn
                      label="Eraser"
                      active={activeTool === "eraser"}
                      onClick={() => toggleTool("eraser")}
                    />
                    <ToolBtn
                      label="Heal"
                      active={activeTool === "heal"}
                      onClick={() => toggleTool("heal")}
                    />
                  </div>
                )}

                {activeSection === "transform" && (
                  <div className="flex flex-col gap-3 px-8 pb-5 pt-4">
                    <ToolBtn
                      label="Crop"
                      active={isCropping}
                      onClick={() => setIsCropping((v) => !v)}
                    />
                    <ToolBtn label="Rotate" active={false} onClick={() => {}} />
                    <ToolBtn
                      label="Straighten"
                      active={showStraighten}
                      onClick={() => setShowStraighten((v) => !v)}
                    />
                    {showStraighten && (
                      <AdjustmentSlider
                        label="Angle"
                        value={straightenDeg}
                        min={-45}
                        max={45}
                        step={0.5}
                        onChange={setStraightenDeg}
                        onCommit={setStraightenDeg}
                      />
                    )}
                    <ToolBtn
                      label="Resize"
                      active={showResize}
                      onClick={() => setShowResize((v) => !v)}
                    />
                    {showResize && (
                      <div className="flex flex-col gap-3 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-1 flex-col gap-1">
                            <label className="text-[11px] font-medium text-[#555555]">
                              Width
                            </label>
                            <input
                              readOnly
                              value={2788}
                              className="h-[30px] w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-2 text-[12px] text-white outline-none"
                            />
                          </div>
                          <div className="mt-4 shrink-0 text-[#555555]">
                            <Icon name="Lock01" size={16} aria-hidden />
                          </div>
                          <div className="flex flex-1 flex-col gap-1">
                            <label className="text-[11px] font-medium text-[#555555]">
                              Height
                            </label>
                            <input
                              readOnly
                              value={3717}
                              className="h-[30px] w-full rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-2 text-[12px] text-white outline-none"
                            />
                          </div>
                        </div>
                        <button type="button" className={`${BTN_PRIMARY_SOLID} w-full`}>
                          Apply
                        </button>
                      </div>
                    )}
                    <AIButton label="Generative Fill" />
                    <AIButton label="Remove Background" />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
