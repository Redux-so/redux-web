"use client";

import type { MouseEvent, ReactNode } from "react";
import {
  Columns2,
  History,
  Minus,
  Plus,
  Redo2,
  Undo2,
  Upload,
} from "lucide-react";

import { cn } from "@/lib/utils";

import AppChromeLogo from "./AppChromeLogo";
import { SHOWCASE_FILENAME } from "./showcase-data";
import { SHOWCASE_TYPE } from "./showcase-typography";

const noop = (e?: MouseEvent) => {
  e?.preventDefault();
};

function ToolbarBtn({
  children,
  label,
  active = false,
  disabled = false,
}: {
  children: ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={noop}
      className={cn(
        "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors",
        disabled && "cursor-not-allowed opacity-30",
        !disabled &&
          (active
            ? "border border-[#682FBF]/40 bg-[#682FBF]/25 text-[#B07EF0]"
            : "text-white/40 hover:bg-white/[0.07] hover:text-white"),
      )}
    >
      {children}
    </button>
  );
}

export default function ShowcaseToolbar() {
  return (
    <header className="grid h-16 shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-white/[0.08] bg-black/40 pl-3 pr-3 backdrop-blur-2xl">
      <div className="flex min-w-0 items-center pl-2">
        <div className="shrink-0">
          <AppChromeLogo />
        </div>
      </div>

      <div className="flex items-center gap-[2px]">
        <ToolbarBtn label="Zoom out">
          <Minus size={18} strokeWidth={2} />
        </ToolbarBtn>
        <button
          type="button"
          onClick={noop}
          className={cn(
            "flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-lg px-3 tabular-nums text-white transition-colors hover:bg-white/[0.07]",
            SHOWCASE_TYPE.body,
          )}
        >
          100%
        </button>
        <ToolbarBtn label="Zoom in">
          <Plus size={18} strokeWidth={2} />
        </ToolbarBtn>
        <div className="mx-1 h-5 w-px bg-white/[0.08]" />
        <ToolbarBtn label="Before and after">
          <Columns2 size={18} strokeWidth={1.75} />
        </ToolbarBtn>
        <ToolbarBtn label="Undo">
          <Undo2 size={18} strokeWidth={1.75} />
        </ToolbarBtn>
        <ToolbarBtn label="Redo" disabled>
          <Redo2 size={18} strokeWidth={1.75} />
        </ToolbarBtn>
      </div>

      <div className="flex min-w-0 items-center justify-end gap-3">
        <span className={cn("max-w-[22ch] truncate", SHOWCASE_TYPE.meta)}>
          {SHOWCASE_FILENAME}
        </span>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
          <span className={SHOWCASE_TYPE.meta}>Auto-saved</span>
        </div>
        <ToolbarBtn label="History">
          <History size={18} strokeWidth={1.75} />
        </ToolbarBtn>
        <button
          type="button"
          onClick={noop}
          className={cn(
            "inline-flex h-8 shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-[#8758ed] px-3 shadow-btn-primary transition-[background-color,box-shadow] duration-200 hover:bg-[#9a6ff2] hover:shadow-btn-primary-hover",
          )}
        >
          <Upload
            size={12}
            strokeWidth={2}
            className="shrink-0 -scale-x-100 -scale-y-100"
          />
          <span className={cn(SHOWCASE_TYPE.button, "text-white")}>Export</span>
        </button>
      </div>
    </header>
  );
}
