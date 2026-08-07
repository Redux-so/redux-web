"use client";

import { Icon } from "@/components/shared/Icon";
import { SURFACE_SECONDARY_BTN } from "@/lib/surface-colors";

import { SHOWCASE_HISTORY_VERSIONS } from "./showcase-data";

function formatRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ShowcaseHistoryVersionList() {
  const versions = SHOWCASE_HISTORY_VERSIONS;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto" data-panel-scroll>
      {versions.map((version, idx) => (
        <div
          key={version.id}
          className="group flex items-center justify-between border-b border-[#2e2e2e] px-6 py-3.5 transition-colors hover:bg-[#1d1d1d]"
        >
          <div className="flex min-w-0 flex-col gap-[2px]">
            <span className="text-[14px] text-[#e5e5e5]">
              {version.label ?? `Version ${versions.length - idx}`}
            </span>
            <span className="text-[12px] text-[#555555]">
              {formatRelative(version.createdAt)}
            </span>
          </div>
          <button
            type="button"
            className={`ml-3 flex shrink-0 items-center justify-center gap-1.5 h-9 px-3 text-[13px] font-medium capitalize rounded-md text-white/80 ${SURFACE_SECONDARY_BTN}`}
          >
            <Icon name="FlipBackward" size={16} aria-hidden />
            Restore
          </button>
        </div>
      ))}
    </div>
  );
}
