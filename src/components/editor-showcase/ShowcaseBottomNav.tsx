"use client";

import type { MouseEvent } from "react";
import { LayoutGrid, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

import { SHOWCASE_USER } from "./showcase-data";
import { SHOWCASE_TYPE } from "./showcase-typography";

const noop = (e: MouseEvent) => {
  e.preventDefault();
};

export default function ShowcaseBottomNav() {
  return (
    <nav className="grid h-16 shrink-0 grid-cols-[168px_1fr_168px] items-center border-t border-white/[0.08] bg-black/40 px-3 backdrop-blur-2xl">
      <div className="flex w-[168px] min-w-0 items-center gap-2.5">
        <div
          className="h-9 w-9 shrink-0 rounded-lg border border-white/[0.08] bg-white/[0.06]"
          aria-hidden
        />
        <div className="min-w-0">
          <p className={cn("truncate leading-[1.3]", SHOWCASE_TYPE.uiLabel)}>
            {SHOWCASE_USER.name}
          </p>
          <p className={cn("leading-[1.3]", SHOWCASE_TYPE.meta)}>
            {SHOWCASE_USER.credits.toLocaleString()} Credits
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-[3px]">
        <button
          type="button"
          onClick={noop}
          className="flex min-w-[72px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-transparent px-5 py-2 text-[#888888] transition-colors hover:bg-white/[0.05] hover:text-[#cccccc]"
        >
          <LayoutGrid size={20} strokeWidth={1.5} />
          <span className={cn("leading-none tracking-tight", SHOWCASE_TYPE.meta)}>
            Library
          </span>
        </button>
        <button
          type="button"
          onClick={noop}
          className={cn(
            "flex min-w-[72px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border px-5 py-2 transition-colors",
            "border-[#682FBF]/40 bg-[#682FBF]/20 text-[#B07EF0]",
          )}
        >
          <SlidersHorizontal size={20} strokeWidth={1.5} />
          <span className={cn("leading-none tracking-tight", SHOWCASE_TYPE.meta)}>
            Editor
          </span>
        </button>
      </div>

      <div className="w-[168px] shrink-0 justify-self-end" aria-hidden />
    </nav>
  );
}
