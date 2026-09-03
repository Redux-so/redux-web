"use client";

import { useState } from "react";

import { Icon } from "@/components/shared/Icon";
import { BTN_BRAND_SOLID } from "@/lib/button-styles";
import { SURFACE_BTN_ACTIVE, SURFACE_BTN_IDLE } from "@/lib/surface-colors";

import { SHOWCASE_FILENAME } from "./showcase-data";

function ToolbarBtn({
  onClick,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={[
        "flex shrink-0 items-center justify-center h-9 w-9 rounded-md transition-colors cursor-pointer",
        "disabled:opacity-30 disabled:cursor-not-allowed",
        "text-white/40 hover:bg-[#1d1d1d] hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-white/[0.08]" />;
}

export default function ShowcaseToolbar() {
  const [zoom, setZoom] = useState(1);
  const [showBefore, setShowBefore] = useState(false);

  const zoomPercent = `${Math.round(zoom * 100)}%`;

  return (
    <div className="grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-[#2e2e2e] bg-[#121212] pl-3 pr-3">
      <div className="flex min-w-0 shrink-0 items-center justify-self-start gap-3">
        <button
          type="button"
          aria-label="Back to Library"
          title="Back to Library"
          className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#888888] transition-colors hover:bg-[#1d1d1d] hover:text-white"
        >
          <Icon name="ChevronLeft" size={28} aria-hidden />
        </button>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-[2px]">
        <ToolbarBtn
          onClick={() => setZoom((z) => Math.max(0.25, z - 0.1))}
          title="Zoom out"
        >
          <Icon name="Minus" size={20} aria-hidden />
        </ToolbarBtn>

        <button
          type="button"
          title="Reset zoom"
          onClick={() => setZoom(1)}
          className="flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-md px-3 text-[14px] tabular-nums text-white transition-colors hover:bg-[#1d1d1d]"
        >
          {zoomPercent}
        </button>

        <ToolbarBtn
          onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
          title="Zoom in"
        >
          <Icon name="Plus" size={20} aria-hidden />
        </ToolbarBtn>

        <Divider />

        <button
          type="button"
          title={showBefore ? "Show after" : "Show before"}
          aria-pressed={showBefore}
          onClick={() => setShowBefore((v) => !v)}
          className={[
            "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors",
            showBefore
              ? `${SURFACE_BTN_ACTIVE} !text-white`
              : SURFACE_BTN_IDLE,
          ].join(" ")}
        >
          <Icon name="Columns02" size={20} aria-hidden />
        </button>

        <Divider />

        <ToolbarBtn onClick={() => undefined} disabled title="Undo">
          <Icon name="FlipBackward" size={20} aria-hidden />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => undefined} disabled title="Redo">
          <Icon name="FlipForward" size={20} aria-hidden />
        </ToolbarBtn>
      </div>

      <div className="flex min-w-0 w-full max-w-full items-center justify-end gap-6 pl-3">
        <span
          title={SHOWCASE_FILENAME}
          className="min-w-0 max-w-[22ch] shrink truncate text-left text-[13px] text-[#888888]"
        >
          {SHOWCASE_FILENAME}
        </span>

        <div className="flex shrink-0 items-center gap-[5px]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
          <span className="whitespace-nowrap text-[13px] text-[#888888]">
            Auto-saved
          </span>
        </div>

        <button
          type="button"
          title="Export / share"
          className={`${BTN_BRAND_SOLID} shrink-0`}
        >
          <Icon name="Download01" size={16} aria-hidden />
          Export
        </button>
      </div>
    </div>
  );
}
